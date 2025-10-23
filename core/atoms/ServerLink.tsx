import Link from 'next/link';
import { headers } from 'next/headers';
import { Locale, locales, defaultLocale, isValidLocale } from '@/lib/i18n';

interface ServerLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const ServerLink = async ({ href, children, className, ...props }: ServerLinkProps) => {
  // Ensure we have a valid href
  if (!href || typeof href !== 'string') {
    console.warn('ServerLink: Invalid or missing href prop:', href);
    return (
      <Link href="#" className={className} {...props}>
        {children}
      </Link>
    );
  }

  // Function to add locale prefix to href
  const getLocalizedHref = (href: string, currentLocale: Locale): string => {
    // Handle undefined or null href
    if (!href || typeof href !== 'string') {
      return '#';
    }
    
    // If it's already a full URL, return as is
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return href;
    }
    
    // If it's an anchor link, return as is
    if (href.startsWith('#')) {
      return href;
    }
    
    // If it's the default locale, don't add prefix
    if (currentLocale === defaultLocale) {
      return href;
    }
    
    // For other locales, add the locale prefix
    return `/${currentLocale}${href}`;
  };

  // Get locale from headers
  const getLocaleFromHeaders = async (): Promise<Locale> => {
    try {
      const headersList = await headers();
      const locale = headersList.get('x-locale');
      
      if (locale && isValidLocale(locale)) {
        return locale;
      }
      
      return defaultLocale;
    } catch (error) {
      return defaultLocale;
    }
  };

  const locale = await getLocaleFromHeaders();
  const localizedHref = getLocalizedHref(href, locale);

  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  );
};
