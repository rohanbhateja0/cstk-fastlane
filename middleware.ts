import { NextResponse, NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n';
import Personalize from '@contentstack/personalize-edge-sdk';

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Ignore requests for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$/)
  ) {
    return NextResponse.next();
  }

  // ---------- i18n Locale Handling ----------
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Initialize Personalize once
  let variantParam = '';
  const projectUid = process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID;

  if (projectUid) {
    try {
      if (process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
        Personalize.setEdgeApiUrl(process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL);
      }

      const personalizeSdk = await Personalize.init(projectUid, { request } as any);
      variantParam = personalizeSdk.getVariantParam();

      // Prepare cookie to set later
      personalizeSdk.addStateToResponse(NextResponse.next());
    } catch (error) {
      console.error('❌ PERSONALIZE middleware error:', error);
    }
  } else {
    console.warn('⚠️ PERSONALIZE: Project UID not configured');
  }

  // ---------- Handle missing locale ----------
  if (!pathnameHasLocale) {
    const redirectUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    if (variantParam) {
      redirectUrl.searchParams.set(Personalize.VARIANT_QUERY_PARAM, variantParam);
    }

    const response = NextResponse.redirect(redirectUrl, { status: 301 });

    if (variantParam) {
      response.cookies.set('personalize_variants', variantParam, {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60, // 1 hour
      });
    }

    return response;
  }

  // ---------- Rewrite only if variant param missing ----------
  if (variantParam && !searchParams.has(Personalize.VARIANT_QUERY_PARAM)) {
    const rewriteUrl = new URL(request.url);
    rewriteUrl.searchParams.set(Personalize.VARIANT_QUERY_PARAM, variantParam);

    const response = NextResponse.rewrite(rewriteUrl);
    response.cookies.set('personalize_variants', variantParam, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });
    response.headers.set('cache-control', 'no-store');

    return response;
  }

  // No rewrite needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|webp)$).*)',
  ],
};
