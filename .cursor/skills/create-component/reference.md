# Reference: Create Component

## MCP Server Setup

This skill requires the **Figma Desktop** and **contentstack** MCP servers, configured in `.cursor/mcp.json`.

### 1. Setup Figma MCP Server

- Follow the steps in [Figma MCP Server Setup Guide](../../../docs/mcp/figma-mcp.md) to setup the Figma MCP Server.

### 2. Setup Contentstack MCP Server

- Follow the steps in [Contentstack MCP Server Setup Guide](../../../docs/mcp/contentstack-mcp.md) to setup the Contentstack MCP Server.

`.cursor/mcp.json` is already configured in this repo. Restart Cursor after setting up the Figma and Contentstack MCP servers — the `Figma Desktop` and `contentstack` servers will appear as connected in the MCP panel.

---

## Project Structure

### Key Directories and Files

| Path                               | Purpose                                                |
|------------------------------------|--------------------------------------------------------|
| `components/`                      | All component implementations (`.tsx` files)           |
| `component-map.ts`                 | Maps content type UIDs to component imports            |
| `components/render-components.tsx` | Renders components based on page data                  |
| `core/types/Component.ts`          | Union type of all component field types                |
| `core/types/components/`           | Individual type definitions per component              |
| `core/atoms/`                      | Atomic UI elements (Heading, Image, Link, HtmlComment) |
| `core/molecules/`                  | Reusable composite components                          |
| `core/lib/utils.tsx`               | Utility functions including `cn` class merger          |
| `helper/index.js`                  | Contentstack SDK helpers (getEntry, etc.)              |
| `contentstack-sdk/index.js`        | Contentstack SDK initialization                        |

### Template Files

All create component prompt templates are located in:

```markdown
docs/pages/for-developers/component-development/ai-prompts/templates/
```

| File                                        | Purpose                                                |
|---------------------------------------------|--------------------------------------------------------|
| `create-component.md`                       | Generic template for creating new components           |
| `enhance-existing-component.md`             | Template for enhancing existing components             |
| `create-unit-test.md`                       | Template for creating unit tests                       |
| `create-sitecore-graphql-list-component.md` | Sitecore-specific list component template              |
| `core-requirements.md`                      | Core development standards referenced by all templates |
| `index.md`                                  | Overview and usage guide for all templates             |

---

## Component File Structure

When creating a new component, the following files are typically involved:

### 1. Component File

Location: `components/{ComponentName}.tsx`

```typescript
// Example structure
'use client'; // Only if useState or other client hooks are needed

import React from 'react';
// ... imports

export default function ComponentName({ ... }) {
  return (
    // Component JSX
  );
}
```

### 2. Type Definition

Location: `core/types/components/{ComponentName}.ts`

```typescript
export type ComponentNameFields = {
  // Field definitions matching Contentstack content type
};
```

### 3. Component Type Registration

Location: `core/types/Component.ts`

Add the new component fields to the `Component` union type:

```typescript
import { ComponentNameFields } from "./components/ComponentName";

export type Component = {
  // ... existing components
  component_name: ComponentNameFields;
}
```

### 4. Render Components Registration

Location: `components/render-components.tsx`

Add the component import and its rendering case.

### 5. Component Map Entry

Location: `component-map.ts`

```typescript
import ComponentName from './components/ComponentName';

export const componentMap = {
  // ... existing mappings
  'component_name': ComponentName,
};
```

---

## Create Component Prompt Structure

All create component prompts follow this structure:

### Customization Section (Top)

Developer-editable values:

- **Component Name** — The name of the component
- **Component Documentation** — Reference to the component's spec file
- **File Location** — Where the component file will be saved
- **Required Features** — List of features the component must support
- **Required Parameters** — Component parameters with types
- **Required Fields** — Contentstack field definitions

### Standard Instructions (Below separator)

Non-editable instructions that include:

- **Component Creation Task** — Instructions to use Figma MCP for design exploration
- **Core Requirements** — Reference to `core-requirements.md` for coding standards
- **Contentstack SDK Integration** — Edit tags, client directives, render-components registration, helper usage

---

## Contentstack SDK Integration Patterns

### Edit Tags

Each field should have edit tags for live preview support:

```typescript
{...(call_to_action.$?.title ?? {})}
```

### Client Directive

Add `'use client';` at the top of the component file if `useState` or other client hooks are needed.

### Helper Functions

Use `helper/index.js` to create `getEntry` functions when references are used:

```typescript
import Stack from "../contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";

export const getComponentRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "content_type_uid",
    referenceFieldPath: ["reference_field"],
    jsonRtePath: ["rich_text_field"],
  });
  liveEdit && addEditableTags(response[0][0], "content_type_uid", true);
  return response[0][0];
};
```

---

## Existing Components

Current components registered in `component-map.ts`:

| Content Type UID | Component   | File                         |
|------------------|-------------|------------------------------|
| `hero_banner`    | HeroBanner  | `components/HeroBanner.tsx`  |
| `user_list`      | UserList    | `components/UserList.tsx`    |
| `news_section`   | NewsSection | `components/NewsSection.tsx` |

Additional components in `render-components.tsx`:

| Component      | File                             |
|----------------|----------------------------------|
| ContentSection | `components/content-section.tsx` |
| ImageComponent | `components/image.tsx`           |
| RichText       | `components/rich-text.tsx`       |
| FlexGrid       | `components/flex-grid.tsx`       |
| ContentCard    | `components/ContentCard.tsx`     |
| NewsBanner     | `components/NewsBanner.tsx`      |
| Accordion      | `components/Accordion.tsx`       |
| Breadcrumb     | `components/Breadcrumb.tsx`      |
| Carousel       | `components/Carousel.tsx`        |
| CardListing    | `components/CardListing.tsx`     |

---

## Search Patterns for Finding Prompts

### Scoped Search (Recommended)

Search for create component prompts in the templates folder:

```markdown
docs/pages/for-developers/component-development/ai-prompts/templates/create-*.md
```

### Fallback Search

Search for files matching `create-{ComponentName}.md` or similar patterns in:

```markdown
docs/
```

### Filtering Criteria

**Include** files where:

- File name starts with `create-`
- File name contains the component name
- File content has `# Create {ComponentName} Component from Figma Design` or similar heading

---

## Implementation Checklist

### Pre-Implementation

- [ ] Search for the create component prompt in the templates folder
- [ ] Read the prompt and all referenced files (component documentation, `core-requirements.md`)
- [ ] Check if the component already exists in `components/` and `component-map.ts`
- [ ] Resolve Figma URL priority:
- [ ] Use Figma MCP to explore designs (execute `get_code` using the resolved Figma URL)

### During Implementation

- [ ] Create component file in `components/{ComponentName}.tsx`
- [ ] Create type definition in `core/types/components/{ComponentName}.ts`
- [ ] Add edit tags for all Contentstack fields
- [ ] Add `'use client'` directive if client hooks are used
- [ ] Use Tailwind CSS for all styling
- [ ] Ensure component is fully responsive and accessible

### Post-Implementation

- [ ] Add component to `components/render-components.tsx`
- [ ] Register component in `component-map.ts`
- [ ] Register field types in `core/types/Component.ts`
- [ ] Add helper function in `helper/index.js` if references are used
- [ ] Verify `npm run dev` runs without errors

---

## Related Files

- **Skill file**: `.cursor/skills/create-component/SKILL.md`
- **Command file**: `.cursor/commands/create-component.md`
- **MCP config guide**: `contentstack-mcp-config.md`
- **Core requirements**: `docs/pages/for-developers/component-development/ai-prompts/templates/core-requirements.md`
- **Templates index**: `docs/pages/for-developers/component-development/ai-prompts/templates/index.md`
