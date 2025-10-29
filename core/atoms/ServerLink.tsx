import Link from 'next/link';
import { Locale, locales, defaultLocale, isValidLocale } from '@/lib/i18n';
import { getLocalizedHref } from '@/core/lib/utils';

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

  // Use provided locale or fallback to default
  const locale = propLocale || defaultLocale;
  const localizedHref = getLocalizedHref(href, locale);

  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  );
};
