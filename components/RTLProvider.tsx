"use client";

import { useLocale } from '@/hooks/useLocale';
import { useEffect } from 'react';
import { Locale, isRTL, getTextDirection } from '@/lib/i18n';

interface RTLProviderProps {
  children: React.ReactNode;
  locale?: Locale;
}

export default function RTLProvider({ children, locale: propLocale }: RTLProviderProps) {
  const { locale: hookLocale, isRTL: hookIsRTL, direction: hookDirection } = useLocale();
  
  // Use prop locale if provided, otherwise fall back to hook
  const locale = propLocale || hookLocale;
  const isRTLValue = propLocale ? isRTL(propLocale) : hookIsRTL;
  const direction = propLocale ? getTextDirection(propLocale) : hookDirection;

  useEffect(() => {
    // Set the document direction based on the current locale
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', locale);
    
    // Add RTL class to body for CSS targeting
    if (isRTLValue) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [locale, isRTLValue, direction]);

  return <>{children}</>;
}
