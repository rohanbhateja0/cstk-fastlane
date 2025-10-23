# 🌍 Multilingual Setup Guide

This guide explains how to implement and manage multilingual support in your ContentStack + Next.js application.

## 📋 Overview

Your application now supports multiple languages with the following features:
- **SEO-friendly URLs** with locale prefixes (`/en-us/about`, `/es/about`)
- **Automatic locale detection** based on user preferences
- **ContentStack native localization** support
- **Language switcher** component
- **Multilingual sitemaps** for SEO

## 🚀 Quick Start

### 1. ContentStack Setup

First, you need to configure your ContentStack stack to support multiple locales:

1. **Add Locales in ContentStack:**
   - Go to your ContentStack dashboard
   - Navigate to Settings → Locales
   - Add the following locales:
     - `en-us` (English - United States) - Default
     - `es` (Spanish)
     - `fr` (French)
     - `de` (German)

2. **Configure Content Types:**
   - For each content type, enable localization
   - Set the default locale to `en-us`
   - Configure fallback locales if needed

### 2. Environment Variables

Add these environment variables to your `.env.local`:

```bash
# Base URL for your application
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# ContentStack configuration (already configured)
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
CONTENTSTACK_ENVIRONMENT=your_environment
```

### 3. Content Creation

When creating content in ContentStack:

1. **Create entries in the default locale first** (`en-us`)
2. **Localize entries** to other languages
3. **Use the same URL structure** across all locales
4. **Ensure all required fields are translated**

## 🛠️ Implementation Details

### File Structure

```
├── lib/
│   └── i18n.ts                 # Locale configuration and utilities
├── hooks/
│   └── useLocale.ts           # Locale management hook
├── components/
│   └── LanguageSwitcher.tsx   # Language switcher component
├── middleware.ts              # Locale routing middleware
└── app/
    ├── layout.tsx             # Updated with language switcher
    ├── sitemap.ts             # Multilingual sitemap
    └── [locale]/              # Locale-based routing (future)
```

### Key Components

#### 1. Locale Configuration (`lib/i18n.ts`)

```typescript
export const locales = ['en-us', 'es', 'fr', 'de'] as const;
export const defaultLocale = 'en-us' as const;

// Utility functions for locale management
export function getLocaleFromPath(pathname: string): Locale
export function removeLocaleFromPath(pathname: string): string
```

#### 2. Language Switcher (`components/LanguageSwitcher.tsx`)

A dropdown component that allows users to switch between languages:
- Shows current language with flag
- Updates URL with new locale
- Maintains current page path

#### 3. Middleware (`middleware.ts`)

Handles automatic locale detection and routing:
- Redirects users to appropriate locale
- Maintains clean URLs
- Supports browser language detection

### ContentStack Integration

#### Updated Queries

All ContentStack queries now support locale parameter:

```typescript
// Before
const page = await GetPage('/about');

// After
const page = await GetPage('/about', 'es');
```

#### Locale-Aware Components

Update your components to use the locale:

```typescript
import { useLocale } from '@/hooks/useLocale';

export default function MyComponent() {
  const { locale } = useLocale();
  
  // Use locale in your ContentStack queries
  const data = await GetPage('/about', locale);
}
```

## 🎨 Customization

### Adding New Languages

1. **Update `lib/i18n.ts`:**
   ```typescript
   export const locales = ['en-us', 'es', 'fr', 'de', 'it'] as const;
   
   export const localeNames: Record<Locale, string> = {
     'en-us': 'English',
     'es': 'Español',
     'fr': 'Français',
     'de': 'Deutsch',
     'it': 'Italiano', // Add new language
   };
   ```

2. **Add locale in ContentStack:**
   - Go to Settings → Locales
   - Add the new locale (e.g., `it` for Italian)

3. **Update Next.js config:**
   ```javascript
   // next.config.mjs
   i18n: {
     locales: ['en-us', 'es', 'fr', 'de', 'it'],
     defaultLocale: 'en-us',
   }
   ```

### Styling the Language Switcher

The language switcher uses Tailwind CSS classes. Customize it by modifying `components/LanguageSwitcher.tsx`:

```typescript
// Example: Different styling
<button className="custom-language-button">
  <span>{localeFlags[currentLocale]}</span>
  <span>{localeNames[currentLocale]}</span>
</button>
```

## 🔍 SEO Features

### Multilingual Sitemaps

The sitemap automatically generates entries for all locales with:
- **Alternate language URLs** for each page
- **Proper hreflang attributes**
- **Locale-specific URLs**

### Meta Tags

Update your page components to include locale-specific meta tags:

```typescript
export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: `Page Title - ${localeNames[params.locale]}`,
    alternates: {
      languages: {
        'en-us': '/en-us/page',
        'es': '/es/page',
        'fr': '/fr/page',
        'de': '/de/page',
      }
    }
  };
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Content not showing in different languages:**
   - Check if content is localized in ContentStack
   - Verify locale parameter is passed to queries
   - Ensure ContentStack stack supports the locale

2. **Language switcher not working:**
   - Check if middleware is properly configured
   - Verify locale routing is set up correctly
   - Ensure all locales are defined in `lib/i18n.ts`

3. **SEO issues:**
   - Verify sitemap includes all locales
   - Check hreflang attributes are correct
   - Ensure proper canonical URLs

### Debug Mode

Enable debug logging by adding to your environment:

```bash
DEBUG=i18n:*
```

## 📚 Best Practices

### Content Management

1. **Always create content in default locale first**
2. **Use consistent URL structure across locales**
3. **Translate all user-facing content**
4. **Test all locales before publishing**

### Performance

1. **Use static generation** for better performance
2. **Implement proper caching** for ContentStack queries
3. **Optimize images** for different regions

### SEO

1. **Use proper hreflang attributes**
2. **Create locale-specific sitemaps**
3. **Implement proper canonical URLs**
4. **Test with Google Search Console**

## 🔄 Migration from Existing Content

If you have existing content:

1. **Export current content** from ContentStack
2. **Create localized versions** in ContentStack
3. **Update URLs** to include locale prefixes
4. **Test all functionality** in each locale

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review ContentStack localization docs
3. Check Next.js i18n documentation
4. Contact your development team

---

**Happy localizing! 🌍✨**
