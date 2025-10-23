"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { getLocaleFromPath, removeLocaleFromPath, Locale, isValidLocale, isRTL, getTextDirection } from '@/lib/i18n';
import { useState, useEffect } from 'react';

export function useLocale() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState<Locale>('en-us');
  
  useEffect(() => {
    // First try to get locale from query parameters (set by middleware)
    const queryLocale = searchParams.get('locale');
    if (queryLocale && isValidLocale(queryLocale)) {
      setLocale(queryLocale as Locale);
    } else {
      // Fallback: get locale from URL path
      const pathLocale = getLocaleFromPath(pathname);
      if (pathLocale) {
        setLocale(pathLocale);
      }
    }
  }, [searchParams, pathname]);

  const cleanPath = removeLocaleFromPath(pathname);

  return {
    locale,
    cleanPath,
    pathname,
    isRTL: isRTL(locale),
    direction: getTextDirection(locale),
  };
}
