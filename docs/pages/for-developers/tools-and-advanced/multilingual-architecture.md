# Multilingual Architecture & Setup

## Overview

The FastLane project implements a comprehensive multilingual architecture that supports multiple languages and locales while maintaining a clean, type-safe approach to content management. This document covers the architectural decisions, implementation details, and setup procedures for multilingual support.

## Architecture Overview

### Key Concepts

1. **Locale-based Routing**: All routes are prefixed with a locale code (e.g., `/en-us/`, `/fr-fr/`)
2. **Automatic Localization**: Links and URLs are automatically localized based on the current context
3. **Content Type Awareness**: Different content types are handled appropriately with correct URL structures
4. **Shared Utilities**: Common localization logic is centralized in utility functions

### Folder Structure

```
app/
├── [lang]/                    # Locale-based routing
│   ├── [...slug]/            # Catch-all route for dynamic pages
│   │   └── page.tsx          # Dynamic page handler
│   ├── blogs/                # Blog section
│   │   ├── page.tsx          # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx      # Blog detail
│   ├── providers/             # Provider section
│   │   ├── page.tsx          # Provider listing
│   │   └── [slug]/
│   │       └── page.tsx      # Provider detail
│   ├── search/               # Search functionality
│   │   └── page.tsx
│   ├── layout.tsx            # Layout with locale-aware header/footer
│   └── page.tsx              # Home page

core/
├── lib/
│   └── utils.tsx             # Shared utilities (including getLocalizedHref)
├── atoms/
│   ├── Link.tsx              # Client-side link component (CMSLink)
│   └── ServerLink.tsx         # Server-side link component
├── ContentQueries/
│   ├── GetHeader.ts          # Header with locale support
│   └── GetFooter.ts         # Footer with locale support

components/
├── header.tsx                # Header component with locale prop
├── footer.tsx                # Footer component with locale prop
├── render-components.tsx     # Component renderer
└── SearchResultCard.tsx      # Search results with localized URLs

lib/
├── algolia.ts                # Algolia search configuration
└── i18n.ts                   # Locale definitions and utilities

hooks/
└── useLocale.ts              # Locale hook for client components
```

## Core Components

### 1. Locale Management (`lib/i18n.ts`)

Defines available locales, validation, and utility functions:

```typescript
export const locales = ['en-us', 'fr-fr'] as const;
export type Locale = typeof locales[number];

export function isValidLocale(lang: string): boolean {
  return locales.includes(lang as Locale);
}

export function isRTL(locale: Locale): boolean {
  // Returns true for RTL languages
}

export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}
```

### 2. Localization Utilities (`core/lib/utils.tsx`)

Central utility function for URL localization:

```typescript
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
```

**Key Features:**
- Handles paths with or without leading slash
- Preserves external URLs, mailto, tel links
- Special handling for root path
- Automatically adds locale prefix

### 3. Link Components

#### CMSLink (Client Component)
Located in `core/atoms/Link.tsx`:

```typescript
export const CMSLink = (props: LinkProps) => {
  const { locale } = useLocale(); // Gets locale from URL
  const effectiveHref = props.link?.href || props.href || '#';
  const localizedHref = getLocalizedHref(effectiveHref, locale);
  
  return <Link href={localizedHref} {...props} />;
};
```

**Usage:**
```tsx
<CMSLink href="about">About</CMSLink>
// Renders as: /en-us/about (when on en-us locale)

<CMSLink href="blogs/tutorial">
// Renders as: /en-us/blogs/tutorial
```

#### ServerLink (Server Component)
Located in `core/atoms/ServerLink.tsx`:

```typescript
export const ServerLink = async ({ href, locale, ...props }: ServerLinkProps) => {
  const currentLocale = locale || defaultLocale;
  const localizedHref = getLocalizedHref(href, currentLocale);
  
  return <Link href={localizedHref} {...props} />;
};
```

**Usage:**
```tsx
<ServerLink href="about" locale="en-us">
// Renders as: /en-us/about
```

### 4. Layout Components

#### Header Component (`components/header.tsx`)

Accepts `locale` prop and passes it to child components:

```typescript
interface HeaderProps {
  locale: Locale;
}

export default async function Header({ locale }: HeaderProps) {
  const header = await GetHeader();
  
  return (
    <header>
      {/* Logo with localized home link */}
      <CMSLink href={`/${locale}/`}>
        <CMSImage image={header.logo} />
      </CMSLink>
      
      {/* Navigation with locale */}
      <ServerMegaNav items={header.mega_menu} locale={locale} />
      
      {/* Language switcher */}
      <LanguageSwitcher />
    </header>
  );
}
```

#### Footer Component (`components/footer.tsx`)

Accepts `locale` prop and localizes all links:

```typescript
interface FooterProps {
  locale: Locale;
}

export default async function Footer({ locale }: FooterProps) {
  const footer = await GetFooter(locale);
  
  // All links are automatically localized
  const topLinks = footer?.top_links || [];
  
  return (
    <footer>
      {topLinks.map((item, index) => (
        <a href={getLocalizedHref(item.href, locale)}>
          {item.title}
        </a>
      ))}
    </footer>
  );
}
```

### 5. Content Queries

#### GetHeader (`core/ContentQueries/GetHeader.ts`)

Currently doesn't accept locale, but can be enhanced:

```typescript
export const GetHeader = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "header",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  });
  return response[0][0];
};
```

#### GetFooter (`core/ContentQueries/GetFooter.ts`)

Accepts locale for locale-specific content:

```typescript
export const GetFooter = async (locale?: Locale) => {
  const response = await Stack.getEntry({
    contentTypeUid: "footer",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
    locale, // Pass locale to Contentstack
  });
  return response[0][0];
};
```

### 6. RTL (Right-to-Left) Support

The project includes comprehensive support for RTL languages like Arabic (ar-sa).

#### RTL Configuration (`lib/i18n.ts`)

```typescript
// RTL languages configuration
export const rtlLocales: Locale[] = ['ar-sa'];

// Check if a locale is RTL
export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

// Get text direction for a locale
export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}
```

#### RTL Provider Component (`components/RTLProvider.tsx`)

Manages RTL layout and direction attributes:

```typescript
export default function RTLProvider({ children, locale }: RTLProviderProps) {
  const { locale: hookLocale, isRTL, direction } = useLocale();
  
  useEffect(() => {
    // Set the document direction based on the current locale
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', locale);
    
    // Add RTL class to body for CSS targeting
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [locale, isRTL, direction]);

  return <>{children}</>;
}
```

#### Layout Integration (`app/[lang]/layout.tsx`)

RTL support is integrated at the layout level:

```typescript
export default async function LangLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isValidLocale(lang) ? lang as Locale : defaultLocale;
  const direction = getTextDirection(locale);
  
  return (
    <html 
      lang={locale} 
      dir={direction} 
      className={isRTL(locale) ? 'rtl' : 'ltr'}
    >
      <body className={`${fontClasses} ${isRTL(locale) ? 'rtl' : 'ltr'}`}>
        <RTLProvider locale={locale}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </RTLProvider>
      </body>
    </html>
  );
}
```

**Key Features:**
- ✅ Automatic `dir` attribute on `<html>` and `<body>` elements
- ✅ RTL class applied to body for CSS targeting
- ✅ Direction-based conditional styling
- ✅ Font variable support for RTL layouts

**CSS Styling:**
```css
/* RTL-specific styles */
.rtl {
  direction: rtl;
}

/* LTR-specific styles */
.ltr {
  direction: ltr;
}

/* Content-specific RTL adjustments */
.rtl .menu {
  /* Right-aligned menu items */
  text-align: right;
}

.rtl .button {
  /* Mirror icon positions */
  flex-direction: row-reverse;
}
```

### 7. Middleware (`middleware.ts`)

Handles locale detection and routing:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { isValidLocale, defaultLocale } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = pathname.split('/')[1];
  
  // If pathname has a valid locale, continue
  if (isValidLocale(pathnameLocale)) {
    return NextResponse.next();
  }
  
  // Redirect to default locale if no locale in pathname
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
```

### 8. Search Integration

#### Algolia Configuration (`lib/algolia.ts`)

Retrieves URL and content type information:

```typescript
export const searchConfig = {
  hitsPerPage: 6,
  attributesToRetrieve: [
    'title',
    'content',
    'uid',
    'url',              // Indexed page URL
    'created_at',
    'updated_at',
    '_content_type',     // Content type
    '_content_type_uid'  // Content type UID
  ],
  facets: ['_content_type', '_content_type_uid'],
};
```

#### Search Result Card (`components/SearchResultCard.tsx`)

Uses indexed URLs or generates slugs:

```typescript
export default function SearchResultCard({ hit, viewMode = 'list' }: SearchResultCardProps) {
  let blogDetailUrl = '';
  
  if (hit.url) {
    // Use the indexed URL (e.g., "news", "blogs/tutorial")
    blogDetailUrl = hit.url.startsWith('/') ? hit.url.substring(1) : hit.url;
  } else if (hit.title) {
    // Fallback to generating slug
    const slug = generateSlug(hit.title);
    const contentType = hit._content_type || hit._content_type_uid;
    
    if (contentType === 'content_card_model') {
      blogDetailUrl = `blogs/${slug}`;
    } else if (contentType === 'news_section') {
      blogDetailUrl = `news/${slug}`;
    } else {
      blogDetailUrl = slug;
    }
  }
  
  return (
    <CMSLink href={blogDetailUrl}>
      {/* Content */}
    </CMSLink>
  );
}
```

## Implementation Details

### 1. Locale Embedding in Components

All components that render links should use either `CMSLink` or `ServerLink`:

```typescript
// Client components
<CMSLink href="about">About</CMSLink>

// Server components
<ServerLink href="about" locale={locale}>About</ServerLink>

// With CMS link data
<CMSLink link={linkField}>{linkField.title}</CMSLink>
```

### 2. Layout Integration

The main layout (`app/[lang]/layout.tsx`) passes locale to header and footer:

```typescript
export default async function LangLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isValidLocale(lang) ? lang as Locale : defaultLocale;
  
  return (
    <html lang={locale} dir={direction}>
      <body>
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
```

### 3. Content Type Handling

Different content types use different URL prefixes:

- **Blogs** (`content_card_model`): `/en-us/blogs/[slug]`
- **News** (`news_section`): `/en-us/news/[slug]`
- **Pages**: `/en-us/[slug]`
- **Providers**: `/en-us/providers/[slug]`

### 4. Search Results Localization

Search results are automatically localized:

1. Use indexed `url` field if available
2. Generate slug from title if URL not available
3. Add content type prefix based on `_content_type`
4. `CMSLink` adds locale prefix automatically

## Setup Instructions

### 1. Environment Configuration

Ensure locale support is enabled in `lib/i18n.ts`:

```typescript
export const locales = ['en-us', 'fr-fr', 'ar-sa'] as const;
export const defaultLocale = 'en-us';

// RTL languages configuration
export const rtlLocales: Locale[] = ['ar-sa'];
```

**Supported Locales:**
- `en-us` - English (United States) - LTR
- `es-es` - Spanish (Spain) - LTR
- `fr-fr` - French (France) - LTR
- `de-de` - German - LTR
- `ar-sa` - Arabic (Saudi Arabia) - **RTL**

### 2. Contentstack Setup

1. Create locales in Contentstack:
   - English (en-us) - Master locale - LTR
   - French (fr-fr) - Additional locale - LTR
   - Arabic (ar-sa) - Additional locale - **RTL**

**Important for RTL:**
- Ensure Arabic locale content is properly configured in Contentstack
- Use appropriate fonts that support Arabic characters
- Test content rendering in RTL mode

2. Create localized content types:
   - `header` - With locale-specific navigation
   - `footer` - With locale-specific links
   - `page` - With locale-specific content
   - `blog` - With locale-specific posts

3. Configure locales to enable translation/localization

### 3. Component Implementation

For any new component that needs links:

```typescript
// In client components
import { CMSLink } from '@/core/atoms/Link';

<CMSLink href="your-path">Link Text</CMSLink>

// In server components
import { ServerLink } from '@/core/atoms/ServerLink';

<ServerLink href="your-path" locale={locale}>Link Text</ServerLink>
```

### 4. Testing Localization

1. Navigate to different locales:
   - `/en-us/about` (English - LTR)
   - `/fr-fr/about` (French - LTR)
   - `/ar-sa/about` (Arabic - RTL)

2. Verify links work correctly in all locales

3. Test RTL functionality:
   - Navigate to `/ar-sa/about`
   - Verify `dir="rtl"` is set on `<html>` element
   - Check that `.rtl` class is applied to `<body>`
   - Verify content flows right-to-left
   - Check icon and layout mirroring

4. Test search functionality:
   - `/en-us/search` (LTR)
   - `/ar-sa/search` (RTL)
   - Results should have proper locale prefix

5. Verify header/footer:
   - Navigation should reflect current locale
   - Links should include locale prefix
   - RTL styling should be applied

## Important Files

### Configuration Files

- `lib/i18n.ts` - Locale definitions, RTL configuration, and utilities
- `middleware.ts` - Locale detection and routing
- `core/lib/utils.tsx` - Localization utilities
- `lib/algolia.ts` - Search configuration

### Component Files

- `core/atoms/Link.tsx` - Client link component
- `core/atoms/ServerLink.tsx` - Server link component
- `components/header.tsx` - Header with locale support
- `components/footer.tsx` - Footer with locale support
- `components/RTLProvider.tsx` - **RTL provider for direction management**
- `components/SearchResultCard.tsx` - Search results
- `app/[lang]/layout.tsx` - Main layout with RTL support

### Query Files

- `core/ContentQueries/GetHeader.ts` - Header data
- `core/ContentQueries/GetFooter.ts` - Footer data with locale

### Hooks

- `hooks/useLocale.ts` - Client-side locale hook (includes RTL detection)

## Best Practices

1. **Always use CMSLink or ServerLink** for internal navigation
2. **Pass locale prop** to components that need to build localized URLs
3. **Use indexed URLs** in search for better accuracy
4. **Handle missing locale data** gracefully with fallbacks
5. **Test all locales** to ensure proper navigation
6. **Consider RTL layouts** when designing components
7. **Use logical CSS properties** for better RTL support (margin-inline-start vs margin-left)
8. **Test with actual RTL content** to ensure proper rendering
9. **Apply RTL-specific styling** when needed for icons and layouts

## Common Patterns

### Pattern 1: Simple Page Link

```typescript
<CMSLink href="about">About Us</CMSLink>
// Outputs: /en-us/about (when on en-us locale)
```

### Pattern 2: Blog Post Link

```typescript
<CMSLink href="blogs/my-article">Read More</CMSLink>
// Outputs: /en-us/blogs/my-article
```

### Pattern 3: Provider Link

```typescript
<CMSLink href={`providers/${generateSlug(provider.name)}`}>
  {provider.name}
</CMSLink>
// Outputs: /en-us/providers/john-doe
```

### Pattern 4: Dynamic Content Type Handling

```typescript
const url = contentType === 'blog' 
  ? `blogs/${slug}` 
  : slug;

<CMSLink href={url}>{title}</CMSLink>
```

## Troubleshooting

### Issue: Links don't have locale prefix

**Solution**: Use `CMSLink` or `ServerLink` instead of regular `<a>` tags

### Issue: Search results show wrong URLs

**Solution**: Ensure Algolia index includes `url` field and content type information

### Issue: Missing content in different locale

**Solution**: Check Contentstack has content for that locale, use fallback handling

### Issue: RTL layout not working

**Solution**: 
1. Verify `isRTL()` function in `lib/i18n.ts` includes the locale
2. Check `dir` attribute on `<html>` tag
3. Ensure RTLProvider is wrapping the layout
4. Verify `.rtl` class is added to body
5. Check CSS for RTL-specific styles

### Issue: Content doesn't flow correctly in RTL

**Solution**: 
1. Use `direction: rtl` or the `.rtl` class
2. Use logical CSS properties (margin-inline-start instead of margin-left)
3. Test with Arabic content to verify layout
4. Ensure fonts support Arabic characters

## Migration Notes

### Previous Implementation

- Hardcoded `/blogs` prefix in search results
- No locale in footer links
- Header used locale but wasn't consistently applied

### Current Implementation

- URLs use content type from index
- All links include locale prefix
- Footer and header consistently use locale
- Shared utility functions prevent duplication

## RTL Considerations

### CSS Logical Properties

For better RTL support, use logical CSS properties instead of directional ones:

```css
/* ❌ Avoid */
.menu {
  margin-left: 16px;
  padding-right: 8px;
}

/* ✅ Use */
.menu {
  margin-inline-start: 16px;
  padding-inline-end: 8px;
}
```

### Component RTL Awareness

Components should consider RTL when positioning elements:

```typescript
const styles = {
  container: cn(
    'flex items-center',
    isRTL ? 'flex-row-reverse' : 'flex-row'
  )
};
```

### Icons and Navigation

Mirror icons and navigation for RTL:

```tsx
<nav className={cn(
  'flex items-center',
  isRTL ? 'flex-row-reverse' : 'flex-row'
)}>
  {/* Icons will be mirrored automatically in RTL */}
  <Icon />
  <span>{title}</span>
</nav>
```

## Additional Resources

- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n-routing)
- [Contentstack Multilingual Content](https://www.contentstack.com/docs/developers/content-types/about-localization-and-internationalization/)
- [Algolia Faceting](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/)
- [CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [RTL Best Practices](https://rtlstyling.com/)
- [Accessibility for RTL](https://www.w3.org/International/questions/qa-html-dir)

