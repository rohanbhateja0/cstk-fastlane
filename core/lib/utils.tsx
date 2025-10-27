import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Locale } from '@/lib/i18n';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a URL-friendly slug from a given text string
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Adds locale prefix to an href string
 * @param href - The href to localize
 * @param locale - The current locale
 * @returns A localized href string
 */
export function getLocalizedHref(href: string, locale: Locale): string {
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
  
  // Handle root path specially
  if (href === '/') {
    return `/${locale}/`;
  }
  
  // Ensure path starts with / for proper locale prefixing
  const normalizedPath = href.startsWith('/') ? href : `/${href}`;
  
  // Always add locale prefix: /[lang]/path
  return `/${locale}${normalizedPath}`;
}