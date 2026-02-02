# Demo 2: AI Prompt Template Workflow

## Demo Overview

**Duration:** 3-4 minutes
**Goal:** Demonstrate how structured AI prompts enable consistent, high-quality component generation

## Pre-Demo Setup

### Prerequisites Checklist

- [ ] Cursor IDE open with FastLane project
- [ ] Create component template ready (`docs/pages/for-developers/component-development/ai-prompts/templates/create-component.md`)
- [ ] Component documentation file prepared (e.g., `hero-banner.md`)
- [ ] Core requirements file accessible (`core-requirements.md`)

### Files to Have Open

1. `create-component.md` template
2. `core-requirements.md` (for reference)
3. `components/` folder visible in file explorer

---

## Demo Script

### Step 1: Introduce the Template System (30 seconds)

**Narrator Script:**
> "While direct Figma-to-code is powerful, FastLane provides structured AI prompt templates that ensure consistent, production-ready output every time. Let me show you our Create Component template - this is the secret sauce behind our rapid development."

**Actions:**
1. Open `docs/pages/for-developers/component-development/ai-prompts/templates/create-component.md`
2. Scroll through to show the structure:
   - Customization section at the top
   - Standard instructions below the separator
   - Pattern references and examples

---

### Step 2: Show the Template Structure (45 seconds)

**Narrator Script:**
> "The template has two main parts. First, a customization section where you specify your component details - name, features, fields. Second, the standard instructions that the AI follows every time - these ensure consistency across all generated components."

**Actions:**
1. Highlight the customization section:

```markdown
## CUSTOMIZATION SECTION - EDIT THESE VALUES

**Component Name:** {ComponentName}
**Component Documentation:** @{component-name}.md
**File Location:** `src/components/{ComponentName}.tsx`

**Required Features:**
- [Feature 1 description]
- [Feature 2 description]
```

2. Show the standard instructions:
   - Contentstack SDK integration requirements
   - CMSImage and CMSLink usage
   - Live Preview editable tags
   - Multilingual support requirements

---

### Step 3: Customize the Template (1 minute)

**Narrator Script:**
> "Let's customize this template for a NewsSection component. I'll edit the customization section with our specific requirements while leaving the standard instructions unchanged."

**Actions:**
1. Copy the template content
2. Edit the customization section:

```markdown
## CUSTOMIZATION SECTION - EDIT THESE VALUES

**Component Name:** NewsSection
**Component Documentation:** @news-section.md
**File Location:** `components/NewsSection.tsx`

**Required Features:**
- Display list of news articles
- Support for featured news item
- Grid layout with responsive columns
- Category filtering
- Load more functionality

**Required Parameters:**
- newsItems: Array of news article references
- layout: 'grid' | 'list'
- showFeatured: boolean
- maxItems: number

**Required Fields:**
- title: Single line text
- description: Rich text
- image: File (image)
- publication_date: Date
- category: Reference to category content type
- author: Reference to author content type
```

---

### Step 4: Execute the Prompt (1 minute)

**Narrator Script:**
> "Now I'll paste this customized template into the AI chat. Watch how it follows all the patterns - it will use Figma MCP for design details, create the proper TypeScript interface, implement Contentstack integration, and follow our coding standards."

**Actions:**
1. Open Cursor AI chat
2. Paste the customized template
3. Execute and observe the AI:
   - Reading component documentation
   - Using Figma MCP tools (if Figma link provided)
   - Generating TypeScript interfaces
   - Creating the component with all patterns

---

### Step 5: Review the Generated Component (45 seconds)

**Narrator Script:**
> "Let's look at what was generated. The AI has created a complete NewsSection component with TypeScript types, Contentstack integration, responsive design, and all the features we specified. Notice the editable tags for Live Preview - content authors will be able to edit this directly in Contentstack."

**Actions:**
1. Show the generated code structure:

```typescript
// Generated NewsSection component

import React from 'react';
import { CMSImage } from '@/core/atoms/Image';
import { CMSLink } from '@/core/atoms/Link';
import { cn } from '@/core/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card';

interface NewsSectionProps {
  newsSection: {
    content: {
      title: string;
      description: string;
      news_items: NewsItem[];
      $?: Record<string, any>;
    };
    rendering_options: {
      layout: 'grid' | 'list';
      show_featured: boolean;
      max_items: number;
    };
  };
  page: any;
}

interface NewsItem {
  title: string;
  description: string;
  image: CMSImageField;
  publication_date: string;
  category: CategoryReference;
  url: string;
  $?: Record<string, any>;
}

export default function NewsSection(props: NewsSectionProps) {
  const { content, rendering_options } = props.newsSection;
  const { title, description, news_items } = content;
  const { layout, show_featured, max_items } = rendering_options;
  
  // Editable tags for Live Preview
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-3xl font-bold text-foreground mb-4"
          {...(content?.$?.title ?? {})}
        >
          {title}
        </h2>
        {/* Rest of component... */}
      </div>
    </section>
  );
}
```

2. Highlight key patterns:
   - TypeScript interfaces
   - Editable tag pattern: `{...(content?.$?.title ?? {})}`
   - CMSImage and CMSLink usage
   - Semantic color tokens

---

## Key Talking Points

### Why Templates Work Better Than Ad-Hoc Prompts

| Ad-Hoc Prompts | Structured Templates |
|----------------|---------------------|
| Inconsistent results | Consistent patterns |
| Missing integrations | Complete CMS integration |
| Varies by developer | Team-wide standards |
| Requires deep knowledge | Self-documenting |

### Template Benefits

1. **Reproducibility:** Same template produces consistent results
2. **Knowledge Capture:** Best practices encoded in template
3. **Onboarding:** New developers get quality output immediately
4. **Maintenance:** Update template once, benefit everywhere

---

## Additional Templates to Mention

**Available Templates in FastLane:**

1. **Create Component** - New components from Figma
2. **Enhance Component** - Modify existing components while preserving functionality
3. **Create Unit Test** - Generate comprehensive Vitest tests
4. **PR Description** - Automated pull request documentation

**Example: Enhance Component Template**
```markdown
**Component Name:** ContentCard
**Files to analyze:**
- @ContentCard.tsx (main wrapper)

**New features to add:**
1. verticalwide orientation option
2. HideImage boolean parameter
3. HideBorder boolean parameter
```

---

## Troubleshooting

### Common Issues During Demo

**Issue: AI doesn't follow all patterns**
```
Solution:
1. Ensure @core-requirements.md is in the prompt
2. Be explicit about Contentstack integration
3. Reference specific patterns if missing
```

**Issue: Generated code has TypeScript errors**
```
Solution:
1. Ask AI to fix the specific error
2. Provide more context about existing types
3. Reference existing similar components
```

**Issue: Missing features in output**
```
Solution:
1. Check that features were in customization section
2. Ask AI to add the specific missing feature
3. Provide examples from existing components
```

---

## Demo Recovery Scripts

If something goes wrong, use these pre-tested prompts:

### Quick Component Generation
```
Generate a NewsSection React component for FastLane with:
- Grid layout for news articles
- Featured news item support
- Contentstack Live Preview integration
- Responsive design with Tailwind CSS
- TypeScript interfaces

Follow these patterns:
- Use CMSImage from @/core/atoms/Image
- Use CMSLink from @/core/atoms/Link
- Add editable tags using {...(field?.$?.fieldName ?? {})}
- Use semantic colors from Tailwind config
```

### Fix Missing Patterns
```
Update this component to add:
1. Contentstack Live Preview editable tags on all text fields
2. CMSImage for all images instead of img tags
3. CMSLink for all internal links
4. Proper TypeScript interfaces
```

---

## Post-Demo Transition

**Narrator Script:**
> "These AI prompt templates ensure that every component generated follows FastLane's patterns and best practices. Now let's see how we complete the loop by creating the content type in Contentstack using the Contentstack MCP Server."

**Transition to Demo 3:** Contentstack MCP
