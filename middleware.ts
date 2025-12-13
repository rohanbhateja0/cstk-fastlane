import { NextResponse, NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n';
import Personalize from '@contentstack/personalize-edge-sdk';

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Ignore requests for static files, API routes, manifest, and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('/manifest.webmanifest') ||
    pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|webmanifest)$/)
  ) {
    return NextResponse.next();
  }

  // Strip personalize_variants from visible URL if present (use rewrite, not redirect)
  // But keep Visual Builder params (entry_uid, content_type_uid, live_preview, builder)
  const hasPersonalizeParam = searchParams.has('personalize_variants');
  let cleanUrl = request.nextUrl.clone();
  if (hasPersonalizeParam) {
    // Only remove personalize_variants, keep everything else
    cleanUrl.searchParams.delete('personalize_variants');
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
    // Check if we're in Visual Builder mode
    const isVisualBuilder = searchParams.has('builder') || searchParams.has('live_preview');
    
    // For Visual Builder, use rewrite instead of redirect to avoid reload loop
    if (isVisualBuilder) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = `/${defaultLocale}${pathname}`;
      rewriteUrl.searchParams.delete('personalize_variants');
      
      const response = NextResponse.rewrite(rewriteUrl);
      if (variantParam) {
        response.cookies.set('personalize_variants', variantParam, {
          httpOnly: false,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60,
        });
      }
      return response;
    }
    
    // For normal navigation, use redirect
    const redirectUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    
    // Preserve Visual Builder query parameters (entry_uid, content_type_uid, live_preview, builder)
    const visualBuilderParams = ['entry_uid', 'content_type_uid', 'live_preview', 'builder'];
    visualBuilderParams.forEach(param => {
      const value = searchParams.get(param);
      if (value) {
        redirectUrl.searchParams.set(param, value);
      }
    });
    
    // Remove personalize_variants from URL, only use cookies
    redirectUrl.searchParams.delete('personalize_variants');

    const response = NextResponse.redirect(redirectUrl, { status: 307 }); // 307 preserves method

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

  // ---------- Set cookie for variant param (NO URL manipulation) ----------
  // Check if we're in Visual Builder mode - never rewrite in Visual Builder
  const isInBuilder = searchParams.has('builder') || searchParams.has('live_preview');
  
  // In Visual Builder: Just set cookie and pass through, NO rewrites!
  // Visual Builder detects rewrites as navigation and triggers the warning dialog
  if (isInBuilder) {
    const response = NextResponse.next();
    if (variantParam) {
      response.cookies.set('personalize_variants', variantParam, {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60,
      });
    }
    response.headers.set('cache-control', 'no-store');
    return response;
  }
  
  // Outside Visual Builder: Can safely clean URL if needed
  if (hasPersonalizeParam) {
    const response = NextResponse.rewrite(cleanUrl);
    if (variantParam) {
      response.cookies.set('personalize_variants', variantParam, {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60,
      });
    }
    response.headers.set('cache-control', 'no-store');
    return response;
  }
  
  if (variantParam) {
    const response = NextResponse.next();
    response.cookies.set('personalize_variants', variantParam, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });
    response.headers.set('cache-control', 'no-store');

    return response;
  }

  // No personalize needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|webp)$).*)',
  ],
};
