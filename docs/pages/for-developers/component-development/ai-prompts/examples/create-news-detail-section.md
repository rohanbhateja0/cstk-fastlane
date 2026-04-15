# Complete Guide: Create News Detail Section Component with ContentStack Integration

This comprehensive guide covers the complete workflow for creating a news detail page component from Figma design to deployed ContentStack entries.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Explore Figma Design](#phase-1-explore-figma-design)
3. [Phase 2: Create React Component](#phase-2-create-react-component)
4. [Phase 3: Create ContentStack Content Type](#phase-3-create-contentstack-content-type)
5. [Phase 4: Update Page Content Type](#phase-4-update-page-content-type)
6. [Phase 5: Create Content Entries](#phase-5-create-content-entries)
7. [Phase 6: Add to Page & Publish](#phase-6-add-to-page--publish)
8. [Phase 7: Verify & Test](#phase-7-verify--test)

---

## Prerequisites

> **See:** [Common Prerequisites](../common/common-prerequisites.md)

Ensure you have:
- ✅ Development server running at `http://localhost:3000`
- ✅ ContentStack MCP server started
- ✅ Figma access configured
- ✅ Existing NewsBanner component (already exists in the project)

---

## Phase 1: Explore Figma Design

> **See:** [Common Figma Exploration Workflow](../common/retrieve-design-details.md)

### Component-Specific Figma Details

**Figma Design URL:**
```
https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7734
```

**Extract node-id:** `14076-7734`

### Step 1.1: Analyze Figma Design

Based on the Figma design, the NewsDetailSection is a **simple, clean article page** with:

1. **Banner Section** (top)
   - Blue gradient background
   - Small category label (e.g., "Company News")
   - Large white headline
   - White description/subtitle text

2. **Article Content** (below banner)
   - Clean white background
   - Publish date at the top
   - Long-form article body text
   - Professional typography
   - Single-column layout

### News Detail Section Specifications

**Typography:**
- Date: Satoshi, 16px, weight 400, zinc-950
- Body Text: Satoshi, 16px, weight 400, line-height relaxed, zinc-950
- Headings: Satoshi, normal weight, zinc-950
- Links: blue-700, no underline (underline on hover)

**Colors:**
- Background: white (#ffffff)
- Text: zinc-950 (#18181b)
- Links: blue-700

**Layout:**
- Content max-width: 896px (max-w-4xl)
- Container: centered with horizontal padding
- Section padding: 48px vertical

**Spacing:**
- Date margin bottom: 32px (mb-8)
- Paragraph spacing: 24px (mb-6)
- Section padding: px-4, py-12

**Components:**
- **Banner**: Use existing NewsBanner component (shows category, title, description)
- **Date Display**: Simple formatted date
- **Article Body**: Rich text content with proper typography

### Step 1.2: Identify Content Structure

From the Figma design (node `14076-7734`), the structure is:

```
NewsDetailSection
├── Banner (NewsBanner component)
│   ├── Category label
│   ├── Main headline
│   └── Description
└── Article Content
    ├── Publish Date
    └── Article Body (rich text)
```

**Key Insight:** This is a **minimal design** focused on content readability. No author avatars, no image galleries, no tags, no social sharing buttons in the base design.

---

## Phase 2: Create React Component

> **See:** [Common React Component Creation](../common/create-react-component.md)

### Step 2.1: Create TypeScript Types

**File:** `core/types/components/NewsDetailSection.ts`

### Step 2.2: Update Props.ts

**File:** `core/types/Props.ts`

### Step 2.3: Create Component File

**File:** `components/NewsDetailSection.tsx`

### Step 2.4: Add Helper Function

**File:** `helper/index.js`

### Step 2.5: Register Component in render-components.tsx

**File:** `components/render-components.tsx`

### Step 2.6: Update Component Type

**File:** `core/types/Component.ts`

---

## Phase 3: Create ContentStack Content Type

> **See:** [Common ContentStack Content Type Creation](../common/create-contentstack-contenttype.md)

### Step 3.1: Create Schema File

**File:** `contentstack-schemas/news-detail-section-schema.json`

```json
{
  "content_type": {
    "uid": "news_detail_section",
    "title": "News Detail Section",
    "description": "News article detail page component with banner and article content",
    "schema": [
      {
        "display_name": "Title",
        "uid": "title",
        "data_type": "text",
        "mandatory": true,
        "unique": false,
        "field_metadata": {
          "_default": true,
          "version": 3,
          "description": "Internal CMS identifier for this news article"
        }
      },
      {
        "display_name": "Banner",
        "uid": "banner",
        "data_type": "reference",
        "reference_to": ["news_banner"],
        "field_metadata": {
          "ref_multiple": false,
          "description": "Reference to existing news banner component"
        },
        "mandatory": false
      },
      {
        "display_name": "Content",
        "uid": "content",
        "data_type": "group",
        "mandatory": true,
        "schema": [
          {
            "display_name": "Publish Date",
            "uid": "publish_date",
            "data_type": "isodate",
            "mandatory": true,
            "field_metadata": {
              "description": "Article publication date"
            }
          },
          {
            "display_name": "Article Body",
            "uid": "article_body",
            "data_type": "text",
            "field_metadata": {
              "rich_text_type": "advanced",
              "multiline": true,
              "description": "Main article content with rich text formatting"
            },
            "mandatory": true
          }
        ]
      }
    ],
    "options": {
      "title": "title",
      "publishable": true,
      "is_page": false,
      "singleton": false,
      "sub_title": [],
      "url_pattern": "/:title",
      "url_prefix": "/news/"
    }
  }
}
```

### Step 3.2: Create Content Type via API

Use the ContentStack API to create the content type:

```bash
POST http://localhost:3000/api/contentstack
Content-Type: application/json

{
  "action": "create",
  "type": "content_type",
  "data": {
    // Paste the schema from above
  }
}
```

Or use PowerShell:

```powershell
$schema = Get-Content -Path "contentstack-schemas/news-detail-section-schema.json" -Raw | ConvertFrom-Json
$body = @{
    action = "create"
    type = "content_type"
    data = $schema
} | ConvertTo-Json -Depth 20

Invoke-WebRequest -Method POST -Uri "http://localhost:3000/api/contentstack" -Body $body -ContentType "application/json"
```

---

## Phase 4: Update Page Content Type

> **See:** [Common Page Content Type Update](../common/update-page-content-type.md)

### Step 4.1: Add News Detail Section to Page Modular Blocks

Add `news_detail_section` to the `fastlane_components` modular blocks in the `page` content type.

Use the ContentStack API or UI to add the new block reference.

---

## Phase 5: Create Content Entries

### Step 5.1: Create News Detail Entry

Create a sample news article entry:

**Sample Entry Data:**

```json
{
  "title": "Sample News Article",
  "banner": [
    {
      "uid": "blt_news_banner_uid",
      "_content_type_uid": "news_banner"
    }
  ],
  "content": {
    "publish_date": "2025-02-27T10:00:00Z",
    "article_body": "<p>We recognize that this is a time of unprecedented uncertainties for our professionals, trainees, and those in preparation. As a certifying body, we are reassured by the fact that delivering excellence amid uncertainty, weighing complex factors, and staying focused on our responsibilities is a hallmark of professional practice across all disciplines.</p><p>Our mission — to define standards, certify professionals, and promote continuous learning to enhance knowledge, practice, and professionalism — serves as our guiding principle as we support our community in serving the public with integrity and expertise.</p><h2>Core principles of professionalism</h2><p>Core principles of professionalism — including respect, integrity, empathy, accountability, and acting in the best interests of those we serve — should continue to guide our practice. These values are the foundation of our shared commitment to public trust and professional excellence.</p>"
  }
}
```

### Step 5.2: Create Entry via ContentStack UI

1. Go to ContentStack → Content Types → News Detail Section
2. Click "Add Entry"
3. Fill in the fields:
   - **Title:** "Sample News Article"
   - **Banner:** Select an existing news banner
   - **Content:**
     - **Publish Date:** 2025-02-27
     - **Article Body:** Add the article content (use rich text editor)
4. **Save** the entry
5. Note the entry UID (e.g., `blt_news_detail_123`)

---

## Phase 6: Add to Page & Publish

### Step 6.1: Add Component to Page Entry

1. Go to ContentStack → Entries → Pages
2. Open the target page (e.g., "FastLane Product Launch")
3. In **FastLane Components**, add a new block:
   - **Select:** News Detail Section
   - **Reference:** Select the news detail entry you created
4. **Save** the page entry
5. **Publish** the page

---

## Phase 7: Verify & Test

### Step 7.1: Visual Verification Checklist

Open the page in your browser (e.g., `http://localhost:3000/en-us/news/fastlane-product-launch`) and verify:

- ✅ Banner displays correctly (category, title, description with blue background)
- ✅ Date is formatted correctly ("February 27, 2025")
- ✅ Article body renders with proper typography
- ✅ Layout is single-column, centered, max-width 896px
- ✅ White background
- ✅ Text color is zinc-950 (black)
- ✅ Font family is Satoshi for body text
- ✅ Paragraph spacing is correct (~24px)
- ✅ Links are styled correctly (blue-700, no underline, underline on hover)

### Step 7.2: Compare with Figma

1. Open Figma design at node-id 14076-7734 side-by-side with browser
2. ✅ Banner matches Figma design
3. ✅ Date placement matches Figma
4. ✅ Typography matches Figma (Satoshi, 16px)
5. ✅ Spacing matches Figma
6. ✅ Layout matches Figma (single column, centered)

### Step 7.3: Test Responsive Behavior

- ✅ Desktop (1440px+): Content centered, max-width 896px
- ✅ Tablet (768px-1024px): Content width adjusts, padding maintained
- ✅ Mobile (< 768px): Single column, reduced padding

### Step 7.4: Test ContentStack Live Edit

1. Open the page with `?live_preview=true` query parameter
2. Verify editable tags appear when hovering over content
3. ✅ Date is editable
4. ✅ Article body is editable
5. ✅ Banner content is editable (if using NewsBanner)

---

## ✅ Success Criteria

Your News Detail Section is complete when:

1. ✅ Component renders correctly in all viewports
2. ✅ ContentStack content type is created
3. ✅ Sample entry is created and published
4. ✅ Component displays on a page
5. ✅ Typography matches Figma design exactly
6. ✅ Layout matches Figma design exactly
7. ✅ ContentStack Live Edit works properly
8. ✅ Banner integration works correctly

---

## 🎉 Next Steps

- Create additional news article entries in ContentStack
- Add the component to other pages as needed
- Customize the banner for different articles
- Consider adding optional features (author info, related articles) if needed in the future

---

## 📚 Related Documentation

- [Common Prerequisites](../common/common-prerequisites.md)
- [Figma Exploration Workflow](../common/retrieve-design-details.md)
- [React Component Creation](../common/create-react-component.md)
- [ContentStack Content Type Creation](../common/create-contentstack-contenttype.md)
- [Create News Banner Example](./create-news-banner.md)
