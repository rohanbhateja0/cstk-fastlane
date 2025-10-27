## Requirements

### Core Development Standards
- **Do NOT** reuse or reference any existing implementation of this component
- Use the `cn` helper from `@core/lib/utils.tsx` for className merging
- All styling must use Tailwind classes, referencing variables from the project's Tailwind config
- Reference and compose as many ShadCN UI primitives as possible (e.g., Button, Card, Input, etc.) to maximize re-use, accessibility, and themability: `@/core/ui`

### Contentstack CMS Integration
- All Contentstack fields must be editable using **Contentstack Live Preview** from `@contentstack/live-preview-utils`
- Use `CMSImage` from `@/core/atoms/Image` and `CMSLink` from `@/core/atoms/Link` for images and links
- Use `addEditableTags` from `@contentstack/utils` for Live Preview editing experience
- Import locale from `@/lib/i18n` for multilingual support
- Include proper TypeScript interfaces for all Contentstack field types
- Pass locale parameter to content queries for localized content

### Contentstack Live Preview
Live Preview integration enables content editing directly in the browser. The `onEntryChange` listener from `@contentstack-sdk` handles real-time updates.

**Important**: Editable tags are added using `addEditableTags()` from Contentstack utils:
- Fields are automatically editable when in Live Preview mode
- Components use the `$.` (dollar) property for metadata and editable attributes
- Example: `{...(field.$?.title ?? {})}` adds edit attributes to an element

### Business Logic & Documentation
- Reference the `@{ComponentName}.MD` file for all business logic, field definitions, and variant/option details
- The component must support all visual and interactive states shown in the Figma design(s) and described in the requirements MD file

### Design & Accessibility
- You should prefer themability - and always use the semantic colors and semantic fonts as defined in the `tailwind.config.ts` - never the raw tailwind colors
- The component must be fully responsive and accessible
- Place the file in `components/{ComponentName}.tsx`
- Include locale support where needed (use CMSLink for automatic locale prefixing)

## Critical Implementation Patterns

### Contentstack Field Access
```typescript
// Access Contentstack fields directly from entry data
const { title, description, image, link } = entryData;

// Add editable tags for Live Preview
<CMSImage image={image} alt={title} />

// For links, use CMSLink which automatically handles locale
<CMSLink link={link}>{link.title}</CMSLink>
```

### Live Preview Integration
```typescript
// Import onEntryChange for live updates
import { onEntryChange } from '@/contentstack-sdk';
import { addEditableTags } from '@contentstack/utils';

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

// Add editable tags to entry data
liveEdit && addEditableTags(entry, "content_type_uid", true);
```

### Multilingual & RTL Support
```typescript
// Import locale utilities
import { Locale } from '@/lib/i18n';
import { useLocale } from '@/hooks/useLocale';
import { isRTL } from '@/lib/i18n';

// Client components
const { locale, isRTL } = useLocale();

// Server components
export default function Component({ locale }: { locale: Locale }) {
  const direction = isRTL(locale) ? 'rtl' : 'ltr';
  // Use locale for content queries
  const data = await GetContent(locale);
  
  // Apply RTL-aware classes
  const containerClass = cn(
    'flex gap-2',
    isRTL(locale) ? 'flex-row-reverse' : 'flex-row'
  );
}
```

**CRITICAL RTL Rules:**
- Use `isRTL()` function to check current locale direction
- Apply `flex-row-reverse` for RTL layouts that need mirroring
- Use CSS logical properties (`margin-inline-start` vs `margin-left`)
- Test with Arabic locale to verify RTL rendering
- Reference @multilingual-architecture.md for detailed patterns

### Checkbox Field Handling
```typescript
// Contentstack boolean fields come as actual booleans
interface RenderingOptions {
  hideImage?: boolean;
  hideBorder?: boolean;
  swapImage?: boolean;
}

// Use boolean values directly
const hideImage = renderingOptions?.hideImage || false;
const hideBorder = renderingOptions?.hideBorder || false;

const cardClasses = cn(
  'base-card-styles',
  !hideBorder && 'border border-border',
  // ... other conditional classes
);
```

### Button/Link Implementation (MUST FOLLOW)

#### Button Variant Logic
```typescript
// CRITICAL: Analyze Figma designs to determine correct button variants
const buttonVariant = [analyze your specific design conditions] ? 'outline' : 'default';
```

#### Full Width Elements Implementation
```typescript
// CRITICAL: Both wrapper AND child element need w-full for true full-width
const isFullWidth = [your condition logic];

<Button
    variant={buttonVariant}
    className={cn('your-classes', isFullWidth && 'w-full')}
>
  <CMSLink link={linkField} className={isFullWidth ? 'w-full' : ''}>
    {linkField.title}
  </CMSLink>
</Button>
```

### CMSLink Component Usage
**CRITICAL**: Shows correct usage in buttons

```typescript
// ✅ Correct usage in buttons
<Button asChild>
  <CMSLink link={linkField}>
    {linkField.title}
  </CMSLink>
</Button>

// ✅ For href strings
<CMSLink href="about">About Us</CMSLink>
// Automatically adds locale: /en-us/about

// ❌ NEVER do this
<a href={linkField.href}>{linkField.title}</a>
// Won't have locale prefix!
```

**Rules:**
- **Both** wrapper element AND child element need `w-full` class for full-width behavior
- Use `CMSLink` for all internal links to get automatic locale prefixing
- Never use raw `<a>` tags for internal navigation

### Contentstack Link Handling
```typescript
// CRITICAL: CMSLink automatically handles locale and links
const hasLink = linkField?.href;

return hasLink ? (
  <CMSLink link={linkField}>
    <ComponentContent />
  </CMSLink>
) : (
  <ComponentContent />
);
```

### Container Layout Logic
```typescript
// CRITICAL: Conditional container layout for proper element behavior
<div
  className={cn(
    'flex gap-2 w-full',
    hasMultipleElements ? 'justify-between' : ''
  )}
>
  {renderElements()}
</div>
```

### Layout Implementation (MUST FOLLOW)

#### Conditional Layout Classes
```typescript
// CRITICAL: Layout must adapt based on parameters and content
const layoutClasses = cn(
  baseClasses,
  condition1 ? 'conditional-class-1' : 'conditional-class-2',
  condition2 && 'additional-class'
);
```

#### Responsive Element Handling
```typescript
// CRITICAL: Proper responsive behavior and aspect ratios
<div className="relative w-full" style={{ aspectRatio: '16/9' }}>
  <CMSImage 
    image={imageField} 
    className="w-full h-full object-cover" 
    fill={true}
  />
</div>
```

### Typography Implementation (MUST FOLLOW)

#### Dynamic Heading Tags
```typescript
// CRITICAL: Constrain to valid heading elements for accessibility
const HeadingTag = (headerTag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') || 'h2';

<HeadingTag className="semantic-text-classes" {...(field.$?.title ?? {})}>
  {title}
</HeadingTag>
```

#### Semantic Design Tokens
```typescript
// CRITICAL: Use semantic design tokens, not raw values
const semanticClasses = cn(
  'text-foreground',        // Not text-gray-900
  'bg-card',                // Not bg-white
  'border-border',          // Not border-gray-200
  'text-muted-foreground'   // Not text-gray-500
);
```

### RTL Implementation (MUST FOLLOW)

#### Direction-Aware Layouts
```typescript
import { isRTL } from '@/lib/i18n';

// CRITICAL: Use logical properties and RTL-aware flex
const { locale } = useLocale();
const rtl = isRTL(locale);

// Flex direction based on locale
const flexClasses = cn(
  'flex gap-2',
  rtl ? 'flex-row-reverse' : 'flex-row'
);

// Margins and padding
const spacingClasses = cn(
  rtl ? 'mr-4' : 'ml-4',      // ❌ Physical properties
  'ms-4'                       // ✅ Logical property (margin-inline-start)
);
```

#### Icon and Arrow Direction
```typescript
// CRITICAL: Mirror icons and directional elements for RTL
const arrowIcon = rtl ? <ArrowLeft /> : <ArrowRight />;

// Or use transform for automatic mirroring
<img 
  src="arrow.svg" 
  className={cn(rtl && 'scale-x-[-1]')}  // Horizontal flip
  alt="next" 
/>
```

#### Navigation and List Order
```typescript
// CRITICAL: Lists that display horizontally need RTL handling
const navClasses = cn(
  'flex gap-4',
  rtl && 'flex-row-reverse'
);

// Or use CSS logical properties
const navClasses = 'flex gap-4'; // Flex automatically respects RTL

// For breadcrumbs and progress indicators
const items = rtl ? [...items].reverse() : items;
```

### Testing with Contentstack
```typescript
// CRITICAL: Mock Contentstack properly
import { vi } from 'vitest';

vi.mock('@/contentstack-sdk', () => ({
  onEntryChange: vi.fn(),
}));

vi.mock('@contentstack/utils', () => ({
  addEditableTags: vi.fn(),
}));
```

## Common Pitfalls to Avoid

### 1. Contentstack Integration Issues
- ❌ Not adding editable tags for Live Preview
- ❌ Using raw field data without proper typing
- ❌ Missing locale parameter in content queries
- ❌ Not handling locale in components that need it

### 2. Width and Layout Issues
- ❌ Only applying `w-full` to child elements but not wrapper elements
- ❌ Using layout classes that constrain desired behavior (e.g., `justify-between` with single elements)
- ❌ Not considering parent-child width relationships
- ❌ Hard-coding layout orientations instead of making them configurable

### 3. Button/Interactive Element Issues
- ❌ Not analyzing Figma designs for proper variant usage
- ❌ Using generic button styles instead of design-specific variants
- ❌ Missing hover, focus, and active states
- ❌ Poor touch target sizes on mobile

### 4. Typography and Design Token Issues
- ❌ Using hard-coded HTML tags instead of dynamic elements
- ❌ Not using semantic color tokens from design system
- ❌ Inconsistent font families and sizing
- ❌ Missing responsive typography considerations

### 5. Contentstack Integration Issues
- ❌ Missing Live Preview integration with editable tags
- ❌ Not handling locale in content queries
- ❌ Forgetting to add `$.` (metadata) attributes for editable fields
- ❌ Not handling missing/undefined fields gracefully

### 6. Link and Locale Issues
- ❌ Using raw `<a>` tags instead of CMSLink
- ❌ Not passing locale to server components
- ❌ Forgetting that CMSLink adds locale prefix automatically
- ❌ Hard-coding URLs without locale consideration

### 8. RTL and Multilingual Issues
- ❌ Not checking `isRTL()` when component has directional elements
- ❌ Using physical CSS properties instead of logical properties (margin-left vs margin-inline-start)
- ❌ Hard-coding flex directions that break in RTL
- ❌ Not testing with Arabic locale
- ❌ Forgetting to mirror icons and navigation for RTL

### 7. Accessibility Issues
- ❌ Missing alt text for images
- ❌ Improper heading hierarchy
- ❌ No keyboard navigation support
- ❌ Insufficient color contrast
- ❌ Missing ARIA labels for complex interactions

### CRITICAL: Contentstack Link Pitfalls to Avoid

❌ **NEVER DO**:
- `<a href={linkField.href}>` (no locale prefix, not editable)  
- `<CMSImage image={image} />` without alt text or editable attributes
- Missing locale prop in server components
- Not using addEditableTags for Live Preview

✅ **ALWAYS DO**:
- Use `CMSLink` for all internal links
- Add editable attributes: `{...(field.$?.title ?? {})}`
- Pass locale to content queries
- Use proper fallbacks for missing content
- Reference @multilingual-architecture.md for details

## Design Pattern Analysis Framework

### Before Implementation, Analyze:

1. **Visual Hierarchy**: What are the primary, secondary, and tertiary elements?
2. **Interactive Elements**: What button styles, hover states, and variants are shown?
3. **Layout Patterns**: How do elements flow in different screen sizes and orientations?
4. **Spacing System**: What consistent gaps, padding, and margins are used?
5. **Typography Patterns**: What heading levels, text sizes, and font weights are applied?
6. **Responsive Behavior**: How does the design adapt across different breakpoints?
7. **Multilingual & RTL Needs**: Does the component have directional elements that need RTL support?

### Implementation Planning Template

| Design Variant | Layout Type | Key Elements | Interactive Patterns | Special Considerations |
|----------------|-------------|--------------|---------------------|----------------------|
| Variant 1 | [layout] | [elements] | [interactions] | [notes] |

## Implementation Checklist

### Pre-Implementation
- [ ] Analyze all Figma variants for patterns and edge cases
- [ ] Identify button/link variants and states for each design
- [ ] Map layout patterns and responsive behavior
- [ ] Define typography hierarchy and semantic class usage
- [ ] Plan conditional logic for different variants and states
- [ ] Review `@{ComponentName}.MD` for business requirements
- [ ] Determine if locale prop is needed for the component
- [ ] Identify which fields need editable tags

### During Implementation
- [ ] Use proper Contentstack field access patterns
- [ ] Add Live Preview editable tags using `$` metadata
- [ ] Pass locale to content queries when needed
- [ ] Implement conditional styling based on design analysis
- [ ] Apply semantic design tokens consistently
- [ ] Handle full-width elements correctly (wrapper + child)
- [ ] Include proper field validation and null checks
- [ ] Use CMSLink for all internal links
- [ ] Add RTL support for directional layouts (flex-row-reverse when needed)
- [ ] Use logical CSS properties for better RTL support
- [ ] Test responsive behavior across breakpoints

### Post-Implementation Validation
- [ ] Test all Figma design variants match implementation
- [ ] Verify interactive states work correctly
- [ ] Confirm responsive behavior is appropriate
- [ ] Validate accessibility compliance (keyboard, screen readers, contrast)
- [ ] Test in Contentstack Live Preview mode and ensure fields are editable
- [ ] Check that conditional logic handles edge cases properly
- [ ] Verify all links have locale prefix
- [ ] Test with different locales to ensure proper localization
- [ ] Test with Arabic locale to verify RTL rendering
- [ ] Verify directional layouts (icons, flex, margins) work in RTL

## Deliverable
Output a single, production-ready file with all necessary imports, types, and logic. The component should match the Figma designs as closely as possible while supporting all required variants and maintaining full Contentstack CMS integration with Live Preview support and proper multilingual handling.

## Usage Instructions

### 1. Replace Placeholders
- `{ComponentName}` with your actual component name (e.g., "HeroBanner", "ProductCard", "Testimonial")
- `[Figma URL 1]`, `[Figma URL 2]`, etc. with actual Figma URLs
- `@{ComponentName}.MD` with the actual markdown file name

### 2. Analyze Figma Designs First
- Study all variants before coding
- Map visual patterns, interactions, and responsive behavior
- Identify conditional logic requirements
- Plan semantic class usage

### 3. Follow Contentstack Patterns
- Use CMSLink and CMSImage for media and links
- Add Live Preview editable tags
- Handle locale properly
- Use proper TypeScript interfaces

### 4. Follow Implementation Patterns
- Use the provided patterns for width, layout, and typography
- Reference the pitfalls list to avoid common mistakes
- Apply the validation checklist before considering complete

### 5. Example Usage
```markdown
# Create a new HeroBanner component using ShadCN and Tailwind CSS, based on the Figma design(s) at the following URL(s):
@https://www.figma.com/design/.../HeroBanner?node-id=123-456

# Requirements:
[rest of template with HeroBanner.MD reference]
```

## Key Benefits

1. **Contentstack Integration**: Updated for Contentstack CMS with Live Preview
2. **Prevents Common Issues**: Includes patterns to avoid width, layout, and interaction problems
3. **Design Analysis Framework**: Systematic approach to understanding Figma designs
4. **Quality Assurance**: Comprehensive validation checklist for consistent results
5. **Best Practices**: Enforces proper use of ShadCN, Tailwind, and Contentstack CMS
6. **Accessibility Focus**: Ensures components meet accessibility standards
7. **Design System Compliance**: Promotes consistent use of semantic tokens
8. **Multilingual Support**: Automatic locale handling through CMSLink
9. **Live Preview**: Editable fields in browser for content authors
10. **RTL Support**: Built-in patterns for right-to-left languages like Arabic

This template helps create high-quality components that match Figma designs exactly while avoiding common implementation pitfalls and leveraging Contentstack CMS capabilities with proper multilingual and RTL support.
