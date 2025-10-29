// Internationalization configuration (4-letter format only)
export const locales = ['en-us', 'es-es', 'fr-fr', 'de-de', 'ar-sa'] as const;
export const defaultLocale = 'en-us' as const;

export type Locale = typeof locales[number];

// RTL languages configuration
export const rtlLocales: Locale[] = ['ar-sa'];

// Locale display names
export const localeNames: Record<Locale, string> = {
  'en-us': 'English',
  'es-es': 'Español',
  'fr-fr': 'Français',
  'de-de': 'Deutsch',
  'ar-sa': 'العربية',
};

// Locale flags for UI
export const localeFlags: Record<Locale, string> = {
  'en-us': '🇺🇸',
  'es-es': '🇪🇸',
  'fr-fr': '🇫🇷',
  'de-de': '🇩🇪',
  'ar-sa': '🇸🇦',
};

// Check if locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get locale from URL path
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }
  
  return defaultLocale;
}

// Remove locale from path
export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && isValidLocale(firstSegment)) {
    return '/' + segments.slice(1).join('/');
  }
  
  return pathname;
}

// Check if a locale is RTL
export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

// Get text direction for a locale
export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}
