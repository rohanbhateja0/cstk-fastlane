"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { locales, localeNames, localeFlags, isRTL } from '@/lib/i18n';
import { Locale, defaultLocale } from '@/lib/i18n';
import { useLocale } from '@/hooks/useLocale';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const router = useRouter();
  const { locale: currentLocale, cleanPath } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const isCurrentRTL = isRTL(currentLocale);

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    
    // Always include locale in URL: /[lang]/path
    const newPath = `/${newLocale}${cleanPath}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          isCurrentRTL ? 'space-x-reverse space-x-2' : 'space-x-2'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        dir={isCurrentRTL ? 'rtl' : 'ltr'}
      >
        <span className="text-lg">{localeFlags[currentLocale]}</span>
        <span>{localeNames[currentLocale]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop to ensure dropdown is on top */}
          <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
          <div className={`absolute z-[9999] mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg ${
            isCurrentRTL ? 'left-0' : 'right-0'
          }`}>
            <div className="py-1">
              {locales.map((locale) => {
                const isLocaleRTL = isRTL(locale);
                return (
                  <button
                    key={locale}
                    onClick={() => handleLanguageChange(locale)}
                    className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 ${
                      locale === currentLocale ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    } ${
                      isLocaleRTL ? 'space-x-reverse space-x-3 text-right' : 'space-x-3 text-left'
                    }`}
                    dir={isLocaleRTL ? 'rtl' : 'ltr'}
                  >
                    <span className="text-lg">{localeFlags[locale]}</span>
                    <span>{localeNames[locale]}</span>
                    {locale === currentLocale && (
                      <svg className={`w-4 h-4 ${isLocaleRTL ? 'mr-auto' : 'ml-auto'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
