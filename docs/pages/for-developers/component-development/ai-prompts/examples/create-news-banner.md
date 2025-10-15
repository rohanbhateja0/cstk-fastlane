# Complete Guide: Create News Banner Component with Contentstack Integration

This comprehensive guide covers the complete workflow for creating a new component from Figma design to deployed Contentstack entry.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Explore Figma Design](#phase-1-explore-figma-design)
3. [Phase 2: Create React Component](#phase-2-create-react-component)
4. [Phase 3: Create Contentstack Content Type](#phase-3-create-contentstack-content-type)
5. [Phase 4: Update Page Content Type](#phase-4-update-page-content-type)
6. [Phase 5: Create & Publish Entry](#phase-5-create--publish-entry)
7. [Phase 6: Verify & Test](#phase-6-verify--test)
8. [Troubleshooting](#troubleshooting)

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
- Main design: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7445`
- Section view: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7435`

Extract node-id from URLs (format: `node-id=14076-7445` → use as `14076:7445`)

### Step 1.2: Use Figma MCP Tools

Execute these Figma MCP calls in order:

```javascript
// 1. Get UI Code & Structure
mcp_figma_get_code({
  nodeId: "14076:7445",
  clientLanguages: "typescript,javascript",
  clientFrameworks: "react,nextjs"
})

// 2. Get Screenshot
mcp_figma_get_screenshot({
  nodeId: "14076:7445",
  clientLanguages: "typescript",
  clientFrameworks: "react"
})

// 3. Get Design Variables
mcp_figma_get_variable_defs({
  nodeId: "14076:7445",
  clientLanguages: "typescript",
  clientFrameworks: "react"
})

// 4. Get Metadata Structure
mcp_figma_get_metadata({
  nodeId: "14076:7445",
  clientLanguages: "typescript",
  clientFrameworks: "react"
})
```

### Step 1.3: Extract Design Specifications

From Figma, extract the **exact** specifications:

**Typography:**
- Title: Font family, size, weight, line-height, letter-spacing
- Description: Font family, size, weight, line-height
- Button/CTA: Font family, size, weight

**Colors:**
- Background colors (hex values)
- Text colors (hex values)
- Border colors

**Spacing:**
- Padding values (px)
- Gap values (px)
- Margin values (px)

**Layout:**
- Container max-width
- Image dimensions
- Border radius values

---

## Phase 2: Create React Component

### Step 2.1: Create TypeScript Interface

**File:** `core/types/components/NewsBanner.ts`

### Step 2.2: Create Helper Function for Reference Fetching

**File:** `helper/index.js`

### Step 2.3: Create React Component

**File:** `components/NewsBanner.tsx`

**Key Implementation Requirements:**

1. **Add 'use client' directive** (if using hooks)
2. **Handle Reference vs. Embedded Data:**
3. **Add Contentstack Live Preview Tags:**
4. **Use Exact Figma Styling:**
5. **Handle Header Tag Dynamically:**

### Step 2.4: Register Component in Render System

**File:** `components/render-components.tsx`

Add the component registration:

### Step 2.5: Update GetPage Query

**File:** `core/ContentQueries/GetPage.ts`

Add reference path for news_banner:

### Step 2.6: Create Component Documentation

**File:** `docs/pages/library/components/news-banner.md`

Create comprehensive documentation including:
- Component overview
- Props interface
- Usage examples
- Figma design links
- Content type schema reference
- Accessibility notes

---

## Phase 3: Create Contentstack Content Type

### Step 3.1: Check if Content Type Exists

```typescript
// Use MCP to check
mcp_contentstack_get_all_content_types({
  branch: "main"
})

// Search response for uid: "news_banner"
```

### Step 3.2: Create Content Type Schema

**ContentStack Structure:**

Title (Default Field) - CMS identifier

**Content Group:**
- Title: Single-Line Text (optional) - Main card title
- Description: Single-Line Text (optional) - Card description text
- Detail Text: Rich Text (optional) - Care detail text
- Image: Image (optional) - Card featured image

**Call to Action Group:**
- Link: General Link (optional) - Primary action button
- Secondary Link: General Link (optional) - Secondary action button

**Rendering Options Group:**
- Header Tag: Dropdown (H1-H6)
- Link Type: Dropdown (Button, Card, Link)
- Content Alignment: Boolean

```json
{
  "title": "News Banner",
  "uid": "news_banner",
  "description": "A prominent banner component for news and announcements",
  "schema" : ["generate the schema as per the get content type"],
  "options": {
    "is_page": false,
    "singleton": false,
    "title": "title",
    "sub_title": []
  }
}
```

**Using Local API Endpoint**

```bash
POST http://localhost:3000/api/contentstack
Content-Type: application/json

{
  "title": "News Banner",
  "description": "A prominent banner component for news and announcements",
  "uid": "news_banner",
  "globalFieldFallback": false,
  "schema": [/* schema array */],
  "options": {/* options object */}
}
```

### Step 3.4: Verify Content Type Creation

```typescript
mcp_contentstack_get_a_single_content_type({
  content_type_uid: "news_banner",
  branch: "main"
})
```

**Checklist:**
- ✅ UID is `news_banner`
- ✅ Title is "News Banner"
- ✅ All schema fields are present
- ✅ Field types match requirements
- ✅ Mandatory fields are marked correctly

---

## Phase 4: Update Page Content Type

### Step 4.1: Get Current Page Content Type

```typescript
mcp_contentstack_get_a_single_content_type({
  content_type_uid: "page",
  branch: "main"
})
```

### Step 4.2: Locate Fastlane Components Field

Find the modular blocks field (usually `fastlane_components`) in the schema:

```json
{
  "data_type": "blocks",
  "display_name": "Fastlane Components",
  "uid": "fastlane_components",
  "blocks": [
    {
      "title": "Hero Banner",
      "uid": "hero_banner",
      "schema": [/* fields */]
    },
    {
      "title": "Carousel",
      "uid": "carousel",
      "schema": [/* fields */]
    }
    // Add News Banner here
  ]
}
```

### Step 4.3: Add News Banner Block

Add this block to the `blocks` array in `fastlane_components`:

### Step 4.4: Update Page Content Type

**Using MCP:**

```typescript
mcp_contentstack_update_a_content_type({
  content_type_uid: "page",
  branch: "main",
  content_type: {
    // Full updated schema with news_banner block added
  }
})
```

**Using Local API:**

```bash
PUT http://localhost:3000/api/contentstack
Content-Type: application/json

{
  "uid": "page",
  "title": "Page",
  "schema": [/* updated schema with news_banner block */],
  "options": {/* existing options */}
}
```

### Step 4.5: Verify Page Update

```typescript
mcp_contentstack_get_a_single_content_type({
  content_type_uid: "page",
  branch: "main"
})
```

**Checklist:**
- ✅ `fastlane_components.blocks` contains `news_banner`
- ✅ Reference field points to `["news_banner"]` content type
- ✅ `ref_multiple` is set appropriately

---

## Phase 5: Create & Publish Entry

### Step 5.1: Create News Banner Entry

**Using MCP:**

### Step 5.2: Create or Update Page Entry

**Option A: Update Existing Page**

Get existing entry:
```typescript
mcp_contentstack_get_all_entries({
  content_type_uid: "page",
  branch: "main",
  query: [{"url": "/news"}]
})
```
Update with News Banner:

**Option B: Create New Page**

### Step 5.3: Publish News Banner Entry

### Step 5.4: Publish Page Entry

---

## Phase 6: Verify & Test

### Step 6.1: Verify Entry in Contentstack

**Checklist:**
- ✅ Entry is published
- ✅ `fastlane_components` contains `news_banner` block
- ✅ Reference UID matches created news banner entry
- ✅ Publish details show successful deployment

### Step 6.2: Test in Browser

**URL Variations (all should work due to case-insensitive routing):**
- `http://localhost:3000/news`
- `http://localhost:3000/News`
- `http://localhost:3000/NEWS`

**Visual Verification:**
1. ✅ News Banner appears at top of page
2. ✅ Title uses correct font (Zodiak, 48px, weight 540)
3. ✅ Colors match Figma (#fafafa text on sky-950 background)
4. ✅ Spacing matches exact pixel values from Figma
5. ✅ Image displays correctly (314px width, rounded corners)
6. ✅ Button styling matches Figma
7. ✅ Responsive behavior works on mobile/tablet

### Step 6.3: Test Live Preview

1. Open Contentstack CMS
2. Navigate to the News Banner entry
3. Click "Live Preview"
4. Make changes to title/description
5. ✅ Changes reflect immediately in preview
6. ✅ Edit tags are visible (hover over elements)

### Step 6.4: Test Content Updates

1. Update News Banner entry in Contentstack
2. Publish changes
3. Refresh page
4. ✅ Changes appear in frontend

---