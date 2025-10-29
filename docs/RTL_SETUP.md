# 🌍 RTL (Right-to-Left) Support Guide

This guide explains how to implement and manage RTL support for Arabic and other right-to-left languages in your ContentStack + Next.js application.

## 📋 Overview

Your application now supports RTL languages with the following features:
- **Arabic (ar-sa) language support** with proper RTL layout
- **Automatic RTL detection** based on locale
- **RTL-specific CSS styles** for proper layout
- **RTL-aware components** that adapt to text direction
- **ContentStack RTL support** in the JSON Rich Text Editor

## 🚀 Quick Start

### 1. ContentStack Setup

Contentstack has built-in RTL support for Arabic and other RTL languages:

1. **Add Arabic Locale in ContentStack:**
   - Go to your ContentStack dashboard
   - Navigate to Settings → Locales
   - Add `ar-sa` (Arabic - Saudi Arabia) locale
   - Set up fallback language if needed

2. **Configure RTL in ContentStack:**
   - When creating content in Arabic, the JSON Rich Text Editor automatically switches to RTL mode
   - The cursor will appear on the right side for RTL content entry
   - You can paste Arabic content from any source into text fields

3. **Content Creation:**
   - Create entries in the default locale first (`en-us`)
   - Localize entries to Arabic (`ar-sa`)
   - Use the same URL structure across all locales
   - Ensure all required fields are translated

### 2. RTL Configuration

The RTL support is automatically configured in your application:

```typescript
// lib/i18n.ts
export const locales = ['en-us', 'es-es', 'fr-fr', 'de-de', 'ar-sa'] as const;
export const rtlLocales: Locale[] = ['ar-sa'];

// RTL utility functions
export function isRTL(locale: Locale): boolean
export function getTextDirection(locale: Locale): 'ltr' | 'rtl'
```

## 🛠️ Implementation Details

### File Structure

```
├── lib/
│   └── i18n.ts                 # RTL configuration and utilities
├── hooks/
│   └── useLocale.ts           # RTL detection in locale hook
├── components/
│   ├── RTLProvider.tsx        # RTL context provider
│   ├── RTLWrapper.tsx         # RTL wrapper component
│   └── LanguageSwitcher.tsx   # RTL-aware language switcher
├── app/
│   ├── layout.tsx             # RTL provider integration
│   └── globals.css            # RTL-specific styles
```

### Key Components

#### 1. RTL Provider (`components/RTLProvider.tsx`)

Automatically sets document direction and RTL classes:

```typescript
export default function RTLProvider({ children }: RTLProviderProps) {
  const { locale, isRTL, direction } = useLocale();

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', locale);
    
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [locale, isRTL, direction]);

  return <>{children}</>;
}
```

#### 2. RTL Wrapper (`components/RTLWrapper.tsx`)

Use this component to wrap content that needs RTL support:

```typescript
import RTLWrapper from '@/components/RTLWrapper';

export default function MyComponent() {
  return (
    <RTLWrapper className="my-content">
      <p>This content will automatically adapt to RTL</p>
    </RTLWrapper>
  );
}
```

#### 3. Enhanced useLocale Hook

The `useLocale` hook now includes RTL information:

```typescript
const { locale, isRTL, direction, cleanPath, pathname } = useLocale();
```

### RTL CSS Styles

Comprehensive RTL styles are included in `app/globals.css`:

```css
/* RTL Support Styles */
[dir="rtl"] {
  text-align: right;
}

/* RTL Layout adjustments */
[dir="rtl"] .position-left {
  @apply justify-end;
}

[dir="rtl"] .position-right {
  @apply justify-start;
}

/* RTL Text alignment */
[dir="rtl"] .text-left {
  text-align: right;
}

[dir="rtl"] .text-right {
  text-align: left;
}

/* RTL Carousel adjustments */
[dir="rtl"] .slick-prev {
  left: auto;
  right: 10px;
}

[dir="rtl"] .slick-next {
  right: auto;
  left: 10px;
}
```

## 🎨 Usage Examples

### 1. Basic RTL Content

```typescript
import { useLocale } from '@/hooks/useLocale';

export default function MyComponent() {
  const { isRTL, direction } = useLocale();
  
  return (
    <div dir={direction}>
      <h1>Welcome / مرحباً</h1>
      <p>This content adapts to RTL automatically</p>
    </div>
  );
}
```

### 2. RTL-Aware Layout

```typescript
import RTLWrapper from '@/components/RTLWrapper';

export default function LayoutComponent() {
  return (
    <RTLWrapper className="flex justify-between items-center">
      <div>Left content / المحتوى الأيسر</div>
      <div>Right content / المحتوى الأيمن</div>
    </RTLWrapper>
  );
}
```

### 3. RTL Form Elements

```typescript
export default function ContactForm() {
  const { isRTL } = useLocale();
  
  return (
    <form className={isRTL ? 'text-right' : 'text-left'}>
      <input 
        type="text" 
        placeholder={isRTL ? 'الاسم' : 'Name'}
        className="w-full p-2 border rounded"
      />
    </form>
  );
}
```

## 🔧 Customization

### Adding More RTL Languages

To add more RTL languages, update the configuration:

```typescript
// lib/i18n.ts
export const locales = ['en-us', 'es-es', 'fr-fr', 'de-de', 'ar-sa', 'he-il'] as const;
export const rtlLocales: Locale[] = ['ar-sa', 'he-il']; // Add Hebrew

export const localeNames: Record<Locale, string> = {
  // ... existing locales
  'he-il': 'עברית',
};

export const localeFlags: Record<Locale, string> = {
  // ... existing flags
  'he-il': '🇮🇱',
};
```

### Custom RTL Styles

Add custom RTL styles in `app/globals.css`:

```css
/* Custom RTL component styles */
[dir="rtl"] .my-custom-component {
  margin-right: 1rem;
  margin-left: 0;
}

[dir="rtl"] .my-custom-component::before {
  content: '←'; /* RTL arrow */
}
```

### RTL-Aware Components

When creating new components, consider RTL support:

```typescript
import { useLocale } from '@/hooks/useLocale';

export default function MyComponent() {
  const { isRTL, direction } = useLocale();
  
  return (
    <div 
      className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
      dir={direction}
    >
      <div>Content 1</div>
      <div>Content 2</div>
    </div>
  );
}
```

## 🚨 Troubleshooting

### Common Issues

1. **RTL not applying:**
   - Check if the locale is in the `rtlLocales` array
   - Verify the RTLProvider is wrapping your content
   - Ensure the `dir` attribute is set correctly

2. **Layout issues in RTL:**
   - Use the RTL-specific CSS classes
   - Test with both LTR and RTL content
   - Check flexbox and grid layouts

3. **ContentStack RTL content not displaying:**
   - Verify the locale is properly configured in ContentStack
   - Check if content is localized to the Arabic locale
   - Ensure the JSON RTE is used for rich text content

### Testing RTL

1. **Switch to Arabic locale:**
   - Use the language switcher to change to Arabic
   - Navigate to `/ar-sa/` URLs
   - Check that content displays right-to-left

2. **Test RTL components:**
   - Verify text alignment
   - Check navigation menus
   - Test form elements
   - Verify carousel/slider behavior

## 📚 Additional Resources

- [Contentstack RTL Documentation](https://www.contentstack.com/docs/developers/json-rich-text-editor/right-to-left-content-writing-within-the-json-rte)
- [MDN RTL Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Writing_Modes)
- [W3C RTL Best Practices](https://www.w3.org/International/articles/inline-bidi-markup/)

## 🎯 Best Practices

1. **Always test with real RTL content** - Don't rely on placeholder text
2. **Use semantic HTML** - Proper heading hierarchy and structure
3. **Test with different screen sizes** - RTL can affect responsive layouts
4. **Consider cultural differences** - Colors, images, and content may need adaptation
5. **Use RTL-aware libraries** - When adding third-party components, ensure they support RTL

Your application now fully supports RTL languages with proper Arabic language support! 🎉
