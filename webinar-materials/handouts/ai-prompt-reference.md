# AI Prompt Reference Card

## FastLane AI Prompt Templates - Quick Reference

This reference card provides a quick overview of all available AI prompt templates and common usage patterns.

---

## Available Templates

### 1. Create Component Template

**Location:** `docs/pages/for-developers/component-development/ai-prompts/templates/create-component.md`

**Purpose:** Generate new React components from Figma designs

**When to Use:**
- Creating a new component from scratch
- Implementing a Figma design
- Need full Contentstack integration

**Quick Template:**
```markdown
# Create {ComponentName} Component from Figma Design

## CUSTOMIZATION SECTION
**Component Name:** HeroBanner
**Component Documentation:** @hero-banner.md
**File Location:** `components/HeroBanner.tsx`

**Required Features:**
- Background image with overlay
- Title, subtitle, description
- Call-to-action button

---

## STANDARD INSTRUCTIONS
CRITICAL: Use Figma MCP Server to analyze designs
CRITICAL: Follow @core-requirements.md patterns
```

---

### 2. Enhance Component Template

**Location:** `docs/pages/for-developers/component-development/ai-prompts/templates/enhance-existing-component.md`

**Purpose:** Modify existing components while preserving functionality

**When to Use:**
- Adding new features to existing component
- Applying customer branding
- Adding new rendering options

**Quick Template:**
```markdown
# Enhance {ComponentName} Component

## CUSTOMIZATION SECTION
**Component Name:** ContentCard
**Files to analyze:**
- @ContentCard.tsx (main wrapper)

**New features to add:**
1. verticalwide orientation option
2. HideImage boolean parameter
3. HideBorder boolean parameter

---

## STANDARD INSTRUCTIONS
- Preserve all existing functionality
- Add new parameters to TypeScript interface
- Update rendering logic for new options
```

---

### 3. Create Unit Test Template

**Location:** `docs/pages/for-developers/component-development/ai-prompts/templates/create-unit-test.md`

**Purpose:** Generate comprehensive Vitest unit tests

**When to Use:**
- After creating a new component
- Adding tests to existing component
- Testing new features

**Quick Template:**
```markdown
# Create Unit Tests for {ComponentName}

## CUSTOMIZATION SECTION
**Component:** @ContentCard.tsx
**Test File:** `components/__tests__/ContentCard.test.tsx`

**Test Scenarios:**
- Default rendering
- All rendering options
- Edge cases (empty fields, missing data)

---

## STANDARD INSTRUCTIONS
- Use Vitest and React Testing Library
- Mock Contentstack SDK
- Test all variants and options
```

---

### 4. PR Description Template

**Location:** `docs/pages/for-developers/component-development/ai-prompts/templates/pr-description.md`

**Purpose:** Generate structured pull request descriptions

**When to Use:**
- Creating a pull request
- Documenting changes
- Team handoff

---

## Key Patterns Reference

### Contentstack Live Preview Editable Tags

```typescript
// Pattern: {...(field?.$?.fieldName ?? {})}

// Title field
<h1 {...(content?.$?.title ?? {})}>
  {title}
</h1>

// Image field
<div {...(image?.$ ?? {})}>
  <CMSImage image={image} />
</div>

// Link field
<CMSLink 
  link={cta} 
  {...(cta.$?.title ?? {})}
>
  {cta.title}
</CMSLink>
```

### CMSImage Usage

```typescript
import { CMSImage } from '@/core/atoms/Image';

// Basic usage
<CMSImage
  image={imageField}
  alt={imageField.filename || 'Description'}
  className="w-full h-full object-cover"
/>

// With fill for responsive containers
<div className="relative aspect-video">
  <CMSImage
    image={imageField}
    fill={true}
    className="object-cover"
  />
</div>
```

### CMSLink Usage

```typescript
import { CMSLink } from '@/core/atoms/Link';

// From link field
<CMSLink link={linkField}>
  {linkField.title}
</CMSLink>

// With href string (auto locale prefix)
<CMSLink href="about">
  About Us
</CMSLink>

// In button
<Button asChild>
  <CMSLink link={linkField}>
    {linkField.title}
  </CMSLink>
</Button>
```

### Semantic Color Tokens

```typescript
// Use these semantic tokens (NOT raw colors)
className="text-foreground"        // Main text
className="text-muted-foreground"  // Secondary text
className="bg-background"          // Page background
className="bg-card"                // Card background
className="bg-primary"             // Primary actions
className="text-primary-foreground" // Text on primary
className="border-border"          // Borders
```

### Responsive Design

```typescript
// Mobile-first breakpoints
className="text-base sm:text-lg lg:text-xl"
className="px-4 sm:px-6 lg:px-8"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### RTL Support

```typescript
import { useLocale } from '@/hooks/useLocale';
import { isRTL } from '@/lib/i18n';

// In component
const { locale } = useLocale();
const rtl = isRTL(locale);

// Conditional classes
className={cn(
  'flex gap-4',
  rtl ? 'flex-row-reverse' : 'flex-row'
)}

// Use logical properties
className="ms-4"  // margin-inline-start (not ml-4)
className="ps-2"  // padding-inline-start (not pl-2)
```

---

## Common Prompts

### Quick Component Generation

```
Generate a [ComponentName] React component with:
- Contentstack Live Preview integration
- CMSImage and CMSLink usage
- Responsive Tailwind CSS
- TypeScript interfaces
Following @core-requirements.md patterns.
```

### Add Editable Tags

```
Update this component to add Contentstack Live Preview editable tags
to all text fields using the pattern {...(field?.$?.fieldName ?? {})}.
```

### Fix Contentstack Integration

```
This component is missing proper Contentstack integration. Please:
1. Add editable tags to all content fields
2. Use CMSImage for images
3. Use CMSLink for internal links
4. Add TypeScript interfaces
```

### Generate Content Type

```
Using Contentstack MCP, create a content type for [ComponentName] with:
- title: Single line text (required)
- description: Rich text
- image: File
- cta: Link
Make it compatible with FastLane modular blocks.
```

### Generate Unit Tests

```
Generate Vitest unit tests for @[ComponentName].tsx:
- Test default rendering
- Test all rendering options
- Test edge cases
- Mock Contentstack SDK properly
```

---

## Anti-Patterns to Avoid

### DON'T DO THIS:

```typescript
// Raw anchor tags (no locale prefix)
<a href="/about">About</a>

// Raw img tags (no CMS integration)
<img src={image.url} />

// Missing editable tags
<h1>{title}</h1>

// Hard-coded colors
className="text-gray-900 bg-white"

// Physical CSS properties for RTL
className="ml-4 pl-2"
```

### DO THIS INSTEAD:

```typescript
// CMSLink with automatic locale
<CMSLink href="about">About</CMSLink>

// CMSImage with CMS integration
<CMSImage image={image} alt="..." />

// Editable tags for Live Preview
<h1 {...(content?.$?.title ?? {})}>{title}</h1>

// Semantic color tokens
className="text-foreground bg-background"

// Logical CSS properties for RTL
className="ms-4 ps-2"
```

---

## Template Files Quick Access

| Template | Path |
|----------|------|
| Create Component | `docs/.../ai-prompts/templates/create-component.md` |
| Enhance Component | `docs/.../ai-prompts/templates/enhance-existing-component.md` |
| Create Unit Test | `docs/.../ai-prompts/templates/create-unit-test.md` |
| PR Description | `docs/.../ai-prompts/templates/pr-description.md` |
| Core Requirements | `docs/.../ai-prompts/templates/core-requirements.md` |

---

## Quick Workflow

1. **New Component:**
   - Use Create Component template
   - Customize with your requirements
   - AI generates component

2. **Enhance Existing:**
   - Use Enhance Component template
   - Specify features to add
   - AI preserves existing functionality

3. **Add Tests:**
   - Use Unit Test template
   - Specify test scenarios
   - AI generates comprehensive tests

4. **Create Content Type:**
   - Use Contentstack MCP
   - AI creates matching content type
   - Create sample entries

---

*Keep this reference card handy for quick lookups during development!*
