"use client";

import Link from 'next/link';
import { CMSLinkField } from '../types/Fields';
import { useLocale } from '@/hooks/useLocale';
import { Locale, defaultLocale } from '@/lib/i18n';
import { getLocalizedHref } from '@/core/lib/utils';

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

  const localizedHref = getLocalizedHref(effectiveHref, locale);

  return (
    <Link href={localizedHref} className={props.className} {...additionalProps} {...props}>
      {linkText}
    </Link>
  );
};
