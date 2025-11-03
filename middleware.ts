import { NextResponse, NextRequest } from 'next/server';
import Personalize from '@contentstack/personalize-edge-sdk';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$/)
  ) {
    return NextResponse.next();
  }

  const projectUid = process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID;
  if (!projectUid) {
    console.warn('⚠️ PERSONALIZE: Project UID not configured');
    return NextResponse.next();
  }

  try {
    // Set custom Edge API URL if provided
    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
      Personalize.setEdgeApiUrl(process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL);
    }

    // Initialize the Personalize SDK
    const personalizeSdk = await Personalize.init(projectUid, {
      request,
    } as any);

    // Get the variant parameter
    const variantParam = personalizeSdk.getVariantParam();

    // Add variant parameter to URL
    const parsedUrl = new URL(request.url);
    parsedUrl.searchParams.set(Personalize.VARIANT_QUERY_PARAM, 'variantParam');

    // Rewrite the request
    const response = NextResponse.rewrite(parsedUrl);

    // Add state to response (cookies for user identification)
    personalizeSdk.addStateToResponse(response);

    // Set variant param in a cookie for client-side access
    response.cookies.set('personalize_variants', variantParam, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    response.headers.set('cache-control', 'no-store');

    return response;
  } catch (error) {
    console.error('❌ PERSONALIZE middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

