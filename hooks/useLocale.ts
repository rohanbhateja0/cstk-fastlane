"use client";

import { usePathname } from 'next/navigation';
import { Locale, isRTL, getTextDirection, defaultLocale, isValidLocale } from '@/lib/i18n';
import { useState, useEffect } from 'react';

export function useLocale() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  
  useEffect(() => {
    // Extract locale from pathname: /[lang]/...
    const segments = pathname.split('/').filter(Boolean);
    const langSegment = segments[0];
    
    if (langSegment && isValidLocale(langSegment)) {
      setLocale(langSegment as Locale);
    } else {
      setLocale(defaultLocale);
    }
  }, [pathname]);

  // Clean path removes the locale segment
  const cleanPath = '/' + pathname.split('/').slice(2).join('/');

  return {
    locale,
    cleanPath,
    pathname,
    isRTL: isRTL(locale),
    direction: getTextDirection(locale),
  };
}
