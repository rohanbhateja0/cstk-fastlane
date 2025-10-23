import { NextResponse, NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('Middleware processing:', pathname);

  // Ignore requests for static files and internal Next.js routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  // Check if pathname has en-us locale (remove it)
  if (pathname === "/en-us" || pathname.startsWith("/en-us/")) {
    const cleanPath = pathname.replace("/en-us", "") || "/";
    console.log('Redirecting en-us to:', cleanPath);
    return NextResponse.redirect(new URL(cleanPath, request.url));
  }

  // Check if pathname has other locales (keep them but rewrite to clean path)
  const hasOtherLocale = locales.slice(1).some(locale => 
    pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasOtherLocale) {
    // Extract locale and clean path
    const locale = locales.slice(1).find(locale => 
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    );
    
    if (locale) {
      const cleanPath = pathname.replace(`/${locale}`, "") || "/";
      console.log('Rewriting:', pathname, 'to:', cleanPath, 'with locale:', locale);
      // Rewrite to the clean path and add locale as query parameter
      const url = new URL(cleanPath, request.url);
      url.searchParams.set('locale', locale);
      const response = NextResponse.rewrite(url);
      // Set header with locale information for server components
      response.headers.set('x-locale', locale);
      response.headers.set('x-pathname', pathname);
      return response;
    }
  }

  // No locale present - default to defaultLocale (but don't show in URL)
  console.log('No locale detected, continuing with:', pathname);
  const response = NextResponse.next();
  response.headers.set('x-locale', defaultLocale);
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ]
};
