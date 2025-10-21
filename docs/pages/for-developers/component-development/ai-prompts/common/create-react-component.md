# Common React Component Creation Workflow

This workflow covers the standard steps for creating React components with ContentStack integration.

## Step 1: Create TypeScript Interface

Define TypeScript types for your component props and ContentStack data structure.

### Component Type Structure

```typescript
// File: core/types/components/ComponentName.ts

import { CMSImageField, CTAFields, CMSComponent } from '../Fields';

/**
 * Content fields for the component
 */
export type ComponentNameContent = {
  title: string;
  description?: string;
  image?: CMSImageField;
  // ... other content fields
};

/**
 * Rendering options for the component
 */
export type ComponentNameRenderingOptions = {
  header_tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  link_type?: 'Button' | 'Card' | 'Link';
  // ... other rendering options
  $?: any;  // ContentStack edit tags
};

/**
 * Complete component fields including ContentStack metadata
 */
export type ComponentNameFields = {
  title: string;  // Default ContentStack title field
  content?: ComponentNameContent;
  call_to_action?: CTAFields;
  rendering_options?: ComponentNameRenderingOptions;
  
  // ContentStack metadata
  uid: string;
  _content_type_uid?: string;
  $?: any;  // ContentStack edit tags
};

/**
 * Component props for React component
 */
export type ComponentNameProps = CMSComponent<ComponentNameFields>;
```

### Common Field Types

Use these standard types from `core/types/Fields.ts`:

```typescript
// Image field
CMSImageField = {
  uid: string;
  url: string;
  filename: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}

// Call-to-action fields
CTAFields = {
  link?: {
    title: string;
    href: string;
  };
  secondary_link?: {
    title: string;
    href: string;
  };
}

// Base component props
CMSComponent<T> = {
  entry: T;
  contentTypeUid: string;
  locale: string;
}
```

---

## Step 2: Create Helper Function for Reference Fetching

If your component uses ContentStack references, create a helper function to fetch referenced entries.

### Helper Function Pattern

```typescript
// File: core/ContentQueries/GetComponentName.ts

import Stack from "@/contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

/**
 * Fetch referenced entries for the component
 * @param references - Array of reference objects from ContentStack
 * @returns Resolved entries with full data
 */
export const GetComponentNameReferences = async (references: any[]) => {
  if (!references || references.length === 0) return [];

  try {
    // Extract UIDs from references
    const uids = references.map(ref => ref.uid);

    // Fetch all referenced entries
    const response = await Stack.getEntry({
      contentTypeUid: "referenced_content_type",
      referenceFieldPath: [], // Add nested references if needed
      jsonRtePath: ["field_with_rich_text"], // Add rich text fields
    });

    // Filter to get only the referenced entries
    const referencedEntries = response[0].filter((entry: any) =>
      uids.includes(entry.uid)
    );

    // Add live edit tags if enabled
    if (liveEdit) {
      referencedEntries.forEach((entry: any) => {
        addEditableTags(entry, "referenced_content_type", true);
      });
    }

    // Preserve original order
    return uids.map(uid =>
      referencedEntries.find((entry: any) => entry.uid === uid)
    ).filter(Boolean);

  } catch (error) {
    console.error('Error fetching references:', error);
    return [];
  }
};
```

---

## Step 3: Create React Component

Build the component following these implementation requirements:

### Component File Structure

```typescript
// File: components/ComponentName.tsx

'use client';  // Add if using hooks

import React, { useState, useEffect } from 'react';
import ImageComponent from '@/components/image';
import Link from 'next/link';
import { ComponentNameProps } from '@/core/types/components/ComponentName';
import { GetComponentNameReferences } from '@/core/ContentQueries/GetComponentName';

export default function ComponentName({ entry, contentTypeUid, locale }: ComponentNameProps) {
  // State for referenced data (if applicable)
  const [referencedData, setReferencedData] = useState<any[]>([]);

  // Fetch references on mount (if applicable)
  useEffect(() => {
    const fetchReferences = async () => {
      if (entry.references) {
        const data = await GetComponentNameReferences(entry.references);
        setReferencedData(data);
      }
    };
    fetchReferences();
  }, [entry.references]);

  // Extract data with fallbacks
  const title = entry.content?.title || entry.title;
  const description = entry.content?.description;
  const image = entry.content?.image;
  const headerTag = entry.rendering_options?.header_tag || 'h2';
  const linkType = entry.rendering_options?.link_type || 'Button';

  // Render header dynamically
  const HeaderTag = headerTag as keyof JSX.IntrinsicElements;

  return (
    <div className="component-container" {...entry.$?.container}>
      {/* Use exact Figma styling with arbitrary Tailwind values */}
      <div className="max-w-[1280px] mx-auto px-[24px] py-[40px]">
        
        {/* Image with live edit tags */}
        {image && (
          <div {...image.$?.url}>
            <ImageComponent
              src={image.url}
              alt={image.title || image.filename}
              width={image.width || 800}
              height={image.height || 600}
              className="w-full h-auto rounded-[8px]"
            />
          </div>
        )}

        {/* Title with live edit tags and dynamic header tag */}
        {title && (
          <HeaderTag 
            className="font-['Zodiak'] text-[48px] font-[540] leading-[57.6px] tracking-[-0.96px] text-zinc-950"
            {...entry.content?.$?.title}
          >
            {title}
          </HeaderTag>
        )}

        {/* Description with live edit tags */}
        {description && (
          <p 
            className="font-['Satoshi'] text-[16px] font-[400] leading-[24px] text-zinc-500 mt-[16px]"
            {...entry.content?.$?.description}
          >
            {description}
          </p>
        )}

        {/* Call to action */}
        {entry.call_to_action?.link?.href && (
          <div className="mt-[24px]">
            <Link
              href={entry.call_to_action.link.href}
              className="inline-flex items-center px-[24px] py-[12px] bg-blue-600 text-white rounded-[8px] hover:bg-blue-700 transition-colors"
              {...entry.call_to_action.$?.link}
            >
              {entry.call_to_action.link.title || 'Learn More'}
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
```

---

## Key Implementation Requirements

### 1. Add 'use client' Directive

Add `'use client'` at the top of the file if your component:
- Uses React hooks (`useState`, `useEffect`, etc.)
- Handles user interactions
- Uses browser APIs
- Has client-side state management

```typescript
'use client';

import React, { useState } from 'react';
// ... rest of component
```

### 2. Handle Reference vs. Embedded Data

ContentStack can return data in two formats:

**Embedded Data (direct):**
```typescript
entry.content = {
  title: "Title here",
  description: "Description here"
}
```

**Reference Data (needs fetching):**
```typescript
entry.reference = [
  { uid: "blt123", _content_type_uid: "news_section" }
]
```

**Implementation:**
```typescript
// Check if data is embedded or referenced
const hasEmbeddedData = entry.content && typeof entry.content === 'object';
const hasReferences = entry.references && entry.references.length > 0;

if (hasReferences) {
  // Fetch referenced data
  const data = await GetReferences(entry.references);
} else if (hasEmbeddedData) {
  // Use embedded data directly
  const data = entry.content;
}
```

### 3. Add ContentStack Live Preview Tags

ContentStack's live preview system requires special `$` tags:

```typescript
// Container tags
<div {...entry.$?.container}>

// Field tags
<h2 {...entry.content?.$?.title}>{title}</h2>
<p {...entry.content?.$?.description}>{description}</p>

// Image tags
<div {...image.$?.url}>
  <ImageComponent src={image.url} ... />
</div>

// CTA tags
<Link {...entry.call_to_action.$?.link}>
```

**Why:** These tags enable inline editing in ContentStack's preview mode.

### 4. Use Exact Figma Styling

Use Tailwind arbitrary values for pixel-perfect implementation:

```typescript
// ✅ Exact Figma values
className="text-[48px] leading-[57.6px] tracking-[-0.96px]"

// ❌ Rounded to Tailwind scale (loses precision)
className="text-5xl leading-tight"

// Font families
className="font-['Zodiak']"  // Serif font
className="font-['Satoshi']" // Sans-serif font

// Exact colors
className="text-[#18181b]"   // If not in Tailwind
className="text-zinc-950"    // If matches Tailwind color
```

### 5. Handle Header Tag Dynamically

Allow content authors to choose heading levels:

```typescript
// Get header tag from rendering options
const headerTag = entry.rendering_options?.header_tag || 'h2';

// Cast to JSX element type
const HeaderTag = headerTag as keyof JSX.IntrinsicElements;

// Render dynamically
<HeaderTag className="...">
  {title}
</HeaderTag>
```

**Why:** This is crucial for SEO and accessibility - allows proper heading hierarchy per page.

---

## Step 4: Register Component in Render System

Add your component to the render system so it can be used in pages.

**File:** `components/render-components.tsx`

```typescript
import ComponentName from './ComponentName';

// ... existing imports

export default function RenderComponents({ components, contentTypeUid, entryUid, locale }: RenderComponentsProps) {
  return (
    <>
      {components?.map((component: any, index: number) => {
        const componentType = component._content_type_uid || component.component_name;

        switch (componentType) {
          // ... existing cases
          
          case 'component_name':  // Match ContentStack content type UID
            return (
              <ComponentName
                key={`${componentType}-${index}`}
                entry={component}
                contentTypeUid={componentType}
                locale={locale}
              />
            );

          default:
            console.warn(`Unknown component type: ${componentType}`);
            return null;
        }
      })}
    </>
  );
}
```

---

## Step 5: Update GetPage Query

Add reference path for your component to ensure data is fetched correctly.

**File:** `core/ContentQueries/GetPage.ts`

```typescript
export const GetPage = async (entryUrl: string) => {
  const normalizedUrl = entryUrl.toLowerCase();
  
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "page",
    entryUrl: normalizedUrl,
    referenceFieldPath: [
      // ... existing references
      "fastlane_components.component_name.references",  // Add your component
    ],
    jsonRtePath: [
      // Add rich text fields if needed
      "fastlane_components.component_name.content.rich_text_field",
    ],
  });
  
  liveEdit && addEditableTags(response[0], "page", true);
  return response[0];
};
```

---

## Step 6: Create Component Documentation

Create comprehensive documentation for developers and content authors.

**File:** `docs/pages/library/components/component-name.md`

```markdown
# Component Name

Description of what the component does and when to use it.

## Overview

- **Content Type:** `component_name`
- **Figma Design:** [View in Figma](https://figma.com/...)
- **Used In:** Page builder, custom layouts

## Props

### ComponentNameFields

| Property | Type | Description |
|----------|------|-------------|
| `title` | `string` | Component title |
| `content` | `ComponentNameContent` | Content fields |
| `call_to_action` | `CTAFields` | CTA buttons |
| `rendering_options` | `ComponentNameRenderingOptions` | Display options |

## Usage Example

```typescript
const componentData = {
  title: "Example Title",
  content: {
    title: "Main Title",
    description: "Description text"
  },
  rendering_options: {
    header_tag: "h2"
  }
};
```

## ContentStack Configuration

See [Create ContentStack Content Type](../../for-developers/component-development/ai-prompts/common/create-contentstack-contenttype.md) for setup instructions.

## Accessibility

- Supports dynamic heading tags for proper hierarchy
- Includes ARIA labels where appropriate
- Keyboard navigation support
```

---

## Verification Checklist

Before moving to ContentStack configuration:

- ✅ TypeScript types created and exported
- ✅ Component file created with proper structure
- ✅ Reference fetching helper created (if needed)
- ✅ 'use client' directive added (if using hooks)
- ✅ ContentStack `$` tags added for live preview
- ✅ Exact Figma styling implemented
- ✅ Dynamic header tag support added
- ✅ Component registered in render-components.tsx
- ✅ GetPage query updated with reference paths
- ✅ Component documentation created
- ✅ Component renders without errors in development

---

## Next Steps

With component created, proceed to:
- [Create ContentStack Content Type](./create-contentstack-contenttype.md) - Create content model
- [Update Page Content Type](./update-contenttype.md) - Add to page builder

