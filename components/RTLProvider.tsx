"use client";

import { useEffect } from 'react';
import { Locale, isRTL, getTextDirection } from '@/lib/i18n';

interface RTLProviderProps {
  children: React.ReactNode;
  locale: Locale;
}

/**
 * RTLProvider - Handles RTL/LTR direction for dynamic locale changes
 * 
 * Note: Initial render uses attributes from layout.tsx (server-side)
 * This component only updates when locale changes client-side
 */
export default function RTLProvider({ children, locale }: RTLProviderProps) {
  const direction = getTextDirection(locale);
  const isRTLValue = isRTL(locale);

  useEffect(() => {
    // Only update if different from current (prevents hydration issues on mount)
    const currentDir = document.documentElement.getAttribute('dir');
    const currentLang = document.documentElement.getAttribute('lang');
    
    if (currentDir !== direction) {
      document.documentElement.setAttribute('dir', direction);
    }
    
    if (currentLang !== locale) {
      document.documentElement.setAttribute('lang', locale);
    }
    
    // Update body class for CSS targeting
    if (isRTLValue) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [locale, direction, isRTLValue]);

  return <>{children}</>;
}
