"use client";

import { useLocale } from '@/hooks/useLocale';
import { useEffect } from 'react';

interface RTLProviderProps {
  children: React.ReactNode;
}

export default function RTLProvider({ children }: RTLProviderProps) {
  const { locale, isRTL, direction } = useLocale();

  useEffect(() => {
    // Set the document direction based on the current locale
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', locale);
    
    // Add RTL class to body for CSS targeting
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [locale, isRTL, direction]);

  return <>{children}</>;
}
