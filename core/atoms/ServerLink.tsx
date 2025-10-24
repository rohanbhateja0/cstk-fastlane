import Link from 'next/link';
import { Locale, locales, defaultLocale, isValidLocale } from '@/lib/i18n';

interface ServerLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  locale?: Locale;
  [key: string]: any;
}

export const ServerLink = async ({ href, children, className, locale: propLocale, ...props }: ServerLinkProps) => {
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
    
    // Always add locale prefix: /[lang]/path
    return `/${currentLocale}${href}`;
  };

  // Use provided locale or fallback to default
  const locale = propLocale || defaultLocale;
  const localizedHref = getLocalizedHref(href, locale);

  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  );
};
