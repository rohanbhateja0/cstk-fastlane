"use client";

import { useEffect, useRef } from 'react';
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
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip updates on initial mount to prevent hydration mismatches
    // The server already sets these attributes correctly
    if (isInitialMount.current) {
      isInitialMount.current = false;
      
      // Only verify and update if there's a mismatch (shouldn't happen, but safety check)
      const currentDir = document.documentElement.getAttribute('dir');
      const currentLang = document.documentElement.getAttribute('lang');
      
      // If values don't match, update them (this handles edge cases)
      if (currentDir !== direction || currentLang !== locale) {
        if (currentDir !== direction) {
          document.documentElement.setAttribute('dir', direction);
        }
        if (currentLang !== locale) {
          document.documentElement.setAttribute('lang', locale);
        }
      }
      
      // Set body class on mount if needed
      const bodyHasRTL = document.body.classList.contains('rtl');
      if (isRTLValue && !bodyHasRTL) {
        document.body.classList.add('rtl');
      } else if (!isRTLValue && bodyHasRTL) {
        document.body.classList.remove('rtl');
      }
      
      return;
    }

    // For subsequent updates (locale changes), update attributes
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
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.remove('rtl');
      document.body.classList.add('ltr');
    }
  }, [locale, direction, isRTLValue]);

  return <>{children}</>;
}
