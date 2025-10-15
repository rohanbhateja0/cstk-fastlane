# Complete Guide: Create News Section Listing Component with Contentstack Integration

This comprehensive guide covers the complete workflow for creating a news listing component from Figma design to deployed Contentstack entries.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Explore Figma Design](#phase-1-explore-figma-design)
3. [Phase 2: Create React Component](#phase-2-create-react-component)
4. [Phase 3: Create Contentstack Content Type](#phase-3-create-contentstack-content-type)
5. [Phase 4: Update Page Content Type](#phase-4-update-page-content-type)
6. [Phase 5: Create Multiple Entries](#phase-5-create-multiple-entries)
7. [Phase 6: Map Images from Figma to Entries](#phase-6-map-images-from-figma-to-entries)
8. [Phase 7: Add to Page & Publish](#phase-7-add-to-page--publish)
9. [Phase 8: Verify & Test](#phase-8-verify--test)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools & Setup

**1. Development Server Running:**
```bash
npm run dev
# Expected: http://localhost:3000
```

**2. Contentstack MCP Server Started (PowerShell):**
```powershell
$env:CONTENTSTACK_API_KEY="your_api_key_here"
$env:CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token_here"
$env:CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token_here"
npx -y @contentstack/mcp
```

**3. Figma Access:**
- Ensure you have access to the Figma design
- Figma MCP integration is enabled

---

## Phase 1: Explore Figma Design

### Step 1.1: Get Design Details

**Figma Design URLs:**
- Section container: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7448`
- News cards grid: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7447`
- Overall layout: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7435`

Extract node-ids from URLs (format: `node-id=14076-7448` → use as `14076:7448`)

### Step 1.2: Use Figma MCP Tools

Execute these Figma MCP calls for **each node**:

1. Get Section Container Code 
2. Get News Cards Grid 
3. Get Screenshots
4. Get Design Variables
5. Get Metadata to see all cards

### Step 1.3: Extract Design Specifications

From Figma, extract the **exact** specifications:

**Card Typography:**
- Title: Font family, size, weight, line-height, letter-spacing
- Category/Earmark: Font family, size, weight, line-height
- Description: Font family, size, weight, line-height
- Button/Link: Font family, size, weight

**Card Colors:**
- Card background (e.g., white)
- Card border (e.g., zinc-300)
- Text primary (e.g., zinc-950)
- Text secondary (e.g., zinc-500)
- Button colors

**Card Spacing:**
- Card padding
- Gap between cards
- Internal card spacing
- Image dimensions

**Grid Layout:**
- Desktop: columns per row
- Tablet: columns per row
- Mobile: columns per row
- Container max-width

### Step 1.4: Identify Individual News Cards

From the Figma metadata (node `14076:7447`), identify each individual news card and extract:
- Card title
- Category/tag
- Description
- Image
- Call-to-action link

---

## Phase 2: Create React Component

### Step 2.1: Create TypeScript Interface

**File:** `core/types/components/NewsSection.ts`

### Step 2.2: Create Helper Function for Reference Fetching

**File:** `helper/index.js`

### Step 2.3: Create React Component

**File:** `components/NewsSection.tsx`

**Key Implementation Requirements:**

1. **Add 'use client' directive**
2. **Handle Multiple References:**
3. **Grid Layout Rendering:**
4. **Individual News Card Component:**
5. **Use Exact Figma Styling:**
   - Extract exact pixel values from Figma
   - Use Tailwind arbitrary values: `text-[24px]`, `p-[24px]`
   - Match font families: `font-['Satoshi']`, `font-['Zodiak']`
   - Use exact colors: `text-[#hex]`

### Step 2.4: Register Component in Render System

**File:** `components/render-components.tsx`

### Step 2.5: Update GetPage Query

**File:** `core/ContentQueries/GetPage.ts`

### Step 2.6: Create Component Documentation

**File:** `docs/pages/library/components/news-section.md`

Create comprehensive documentation including:
- Component overview
- Props interface
- Grid layout options
- Usage examples
- Figma design links
- Content type schema reference

---

## Phase 3: Create Contentstack Content Type

### Step 3.1: Check if Content Type Exists

```typescript
mcp_contentstack_get_all_content_types({
  branch: "main"
})

// Search response for uid: "news_section"
```

### Step 3.2: Create Content Type Schema, in schema keep "Title" as "Default field"
**ContentStack Structure:**

Title (Default Field) - CMS identifier

**Content Group:**
- Title: Single-Line Text (optional) - Main card title
- Category: Single-Line Text (optional) - Can be used as earmark/tag
- Description: Rich Text (optional) - Card description text
- Image: Image (optional) - Card featured image

**Call to Action Group:**
- Link: General Link (optional) - Primary action button
- Secondary Link: General Link (optional) - Secondary action button

**Rendering Options Group:**
- Image Order: Dropdown (left, right)
- Header Tag: Dropdown (H1-H6)
- Link Type: Dropdown (Button, Card, Link)
- Hide Image: Boolean
- Hide Border: Boolean

```json
{
  "title": "News Section",
  "uid": "news_section",
  "description": "Individual news card for news listings",
  "schema": [],
  "options": {
    "is_page": false,
    "singleton": false,
    "title": "title",
    "sub_title": []
  }
}
```

### Step 3.3: Create Content Type via API

**Using Local API Endpoint:**

```bash
POST http://localhost:3000/api/contentstack
Content-Type: application/json

{
  "title": "News Section",
  "description": "Individual news card for news listings",
  "uid": "news_section",
  "globalFieldFallback": false,
  "schema": [/* schema array from above */],
  "options": {/* options object from above */}
}
```

### Step 3.4: Verify Content Type Creation

```typescript
mcp_contentstack_get_a_single_content_type({
  content_type_uid: "news_section",
  branch: "main"
})
```

**Checklist:**
- ✅ UID is `news_section`
- ✅ Title is "News Section"
- ✅ All schema fields are present
- ✅ Field types match requirements

---

## Phase 4: Update Page Content Type

### Step 4.1: Get Current Page Content Type

```typescript
mcp_contentstack_get_a_single_content_type({
  content_type_uid: "page",
  branch: "main"
})
```

### Step 4.2: Add News Section Block

Add this block to the `fastlane_components.blocks` array:

### Step 4.3: Verify Page Update

```typescript
mcp_contentstack_get_a_single_content_type({
  content_type_uid: "page",
  branch: "main"
})
```

**Checklist:**
- ✅ `fastlane_components.blocks` contains `news_section`
- ✅ Reference field is set to `multiple: true` (array of references)
- ✅ Grid rendering options are present

---

## Phase 5: Create Multiple Entries

### Step 5.1: Extract News Cards from Figma

### Step 5.2: Locate Assets in Contentstack

### Step 5.3: Create Entries for Each Card

**Repeat for all cards found in Figma**

### Step 5.4: Collect All Entry UIDs

Save the UIDs from each creation response for the next steps.

## Phase 6: Map Images from Figma to Entries

### Step 6.1: Create Figma Asset Mapping

### Step 6.2: Update Entries with Correct Images

### Step 6.3: Republish All Entries

**Important Note:** Match the order of images in Figma code with the order of cards to ensure correct mapping!

---

## Phase 7: Add to Page & Publish

### Step 7.1: Get Existing News Page Entry

```typescript
mcp_contentstack_get_all_entries({
  content_type_uid: "page",
  branch: "main",
  include_count: true,
  limit: "20"
})
```

Find the News page entry (usually title: "News")

### Step 7.2: Update Page with News Section Block

### Step 7.3: Publish Page Entry
## Phase 8: Verify & Test

### Step 8.1: Verify in Contentstack

**Checklist:**
- ✅ Page entry is published
- ✅ `fastlane_components` contains `news_section` block
- ✅ `news_sections` array contains all entry UIDs
- ✅ All referenced news_section entries are published
- ✅ All images are correctly mapped from Figma
- ✅ Image filenames match Figma asset filenames

### Step 8.2: Test in Browser

**URL:**
- `http://localhost:3000/news`

**Visual Verification:**
1. ✅ News Banner appears at top
2. ✅ News Section grid displays below banner
3. ✅ All 8 news cards are visible
4. ✅ Grid layout matches Figma (1-3 columns depending on viewport)
5. ✅ Cards have proper spacing and styling
6. ✅ **Images match exactly with Figma design** (critical!)
7. ✅ Category tags display correctly
8. ✅ Titles and descriptions are readable
9. ✅ Call-to-action links work
10. ✅ Responsive: 2 columns on tablet, 1 on mobile

### Step 8.3: Verify Image Mapping

Compare each card with Figma:
1. Open Figma design side-by-side with browser
2. Check that each card's image matches the Figma design
3. Verify image order matches Figma card order
4. ✅ All images are correctly assigned to their respective cards

### Step 8.4: Test Hover & Interactions

1. ✅ Cards have hover effect (shadow/scale)
2. ✅ Links are clickable
3. ✅ Images have proper alt text
4. ✅ Keyboard navigation works

### Step 8.5: Test Live Preview

1. Open Contentstack CMS
2. Navigate to any news_section entry
3. Click "Live Preview"
4. Make changes to title/description
5. ✅ Changes reflect in the grid
6. ✅ Edit tags are visible

---
