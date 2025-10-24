"use client";

import Link from 'next/link';
import { CMSLinkField } from '../types/Fields';
import { useLocale } from '@/hooks/useLocale';
import { Locale, defaultLocale } from '@/lib/i18n';

interface LinkProps {
  link?: CMSLinkField;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const CMSLink = (props: LinkProps) => {
  const { locale } = useLocale();
  
  // Support both CMS link objects and direct href strings
  const effectiveHref = props.link?.href || props.href || '#';
  const linkText = props.children || props.link?.title || effectiveHref;
  const additionalProps = props.link?.$?.title || {};

  // Ensure we have a valid href
  if (!effectiveHref || typeof effectiveHref !== 'string') {
    console.warn('CMSLink: Invalid or missing href:', effectiveHref);
    return (
      <Link href="#" className={props.className} {...additionalProps} {...props}>
        {linkText}
      </Link>
    );
  }

  // Function to add locale prefix to href
  const getLocalizedHref = (href: string, currentLocale: Locale): string => {
    // If it's already a full URL, return as is
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return href;
    }
    
    // If it's an anchor link, return as is
    if (href.startsWith('#')) {
      return href;
    }
    
    // Handle root path specially
    if (href === '/') {
      return `/${currentLocale}/`;
    }
    
    // Always add locale prefix: /[lang]/path
    return `/${currentLocale}${href}`;
  };

  const localizedHref = getLocalizedHref(effectiveHref, locale);

  return (
    <Link href={localizedHref} className={props.className} {...additionalProps} {...props}>
      {linkText}
    </Link>
  );
};
