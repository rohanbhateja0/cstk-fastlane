# Complete Guide: Create News Banner Component with ContentStack Integration

This comprehensive guide covers the complete workflow for creating a News Banner component from Figma design to deployed ContentStack entry.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Explore Figma Design](#phase-1-explore-figma-design)
3. [Phase 2: Create React Component](#phase-2-create-react-component)
4. [Phase 3: Create ContentStack Content Type](#phase-3-create-contentstack-content-type)
5. [Phase 4: Update Page Content Type](#phase-4-update-page-content-type)
6. [Phase 5: Create & Publish Entry](#phase-5-create--publish-entry)
7. [Phase 6: Verify & Test](#phase-6-verify--test)

---

## Prerequisites

> **See:** [Common Prerequisites](../common/common-prerequisites.md)

Ensure you have:
- ✅ Development server running at `http://localhost:3000`
- ✅ ContentStack MCP server started
- ✅ Figma access configured

---

## Phase 1: Explore Figma Design

> **See:** [Common Figma Exploration Workflow](../common/retrieve-design-details.md)

### Component-Specific Figma Details

**Figma Design URLs:**
- Main design: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7445`
- Section view: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7435`

**Extract node-ids:** `14076:7445` and `14076:7435`

### News Banner Specifications

After following the common Figma exploration workflow, document these News Banner-specific specs:

**Typography:**
- Title: Zodiak, 48px, weight 540, line-height 57.6px, letter-spacing -0.96px
- Description: Satoshi, 16px, weight 400, line-height 24px
- Button: Satoshi, 14px, weight 500

**Colors:**
- Background: `#0c4a6e` (sky-950)
- Text: `#fafafa` (light gray)
- Button: Blue-600 with hover state

**Layout:**
- Container: max-width 1280px
- Padding: 40px vertical, 24px horizontal
- Image: 314px width, rounded corners
- Gap: 24px between elements

---

## Phase 2: Create React Component

> **See:** [Common React Component Creation Workflow](../common/create-react-component.md)

Follow the common workflow, then implement News Banner-specific features:

### Step 2.1: Create TypeScript Interface

### Step 2.2: Create React Component

### Step 2.3: Register Component

Add to switch statement:

### Step 2.4: Update GetPage Query

---

## Phase 3: Create ContentStack Content Type

> **See:** [Common ContentStack Content Type Creation Workflow](../common/create-contentstack-contenttype.md)

### Step 3.1: Check if Content Type Exists

Search response for `"news_banner"`.

### Step 3.2: Create Content Type Schema

**ContentStack Structure:**

- **Title** (Default Field) - CMS identifier
- **Content Group:**
  - Title: Single-Line Text (optional) - Main card title
  - Description: Single-Line Text (optional) - Card description text
  - Detail Text: Rich Text (optional) - Card detail text
  - Image: Image (optional) - Card featured image
- **Call to Action Group:**
  - Link: General Link (optional) - Primary action button
  - Secondary Link: General Link (optional) - Secondary action button
- **Rendering Options Group:**
  - Header Tag: Dropdown (H1-H6)
  - Link Type: Dropdown (Button, Card, Link)
  - Content Alignment: Boolean

### Step 3.3: Create Content Type via API

**Using Local API Endpoint:**

### Step 3.4: Verify Content Type Creation

**Checklist:**
- ✅ UID is `news_banner`
- ✅ Title is "News Banner"
- ✅ All schema fields are present
- ✅ Field types match requirements
- ✅ Mandatory fields are marked correctly

---

## Phase 4: Update Page Content Type

> **See:** [Common Page Content Type Update Workflow](../common/update-contenttype.md)

### Step 4.1: Get Current Page Content Type

### Step 4.2: Add News Banner Block

### Step 4.3: Update Page Content Type

### Step 4.4: Verify Page Update

**Checklist:**
- ✅ `fastlane_components.blocks` contains `news_banner`
- ✅ Reference field points to `["news_banner"]` content type
- ✅ `ref_multiple` is false (single reference)

---

## Phase 5: Create & Publish Entry

> **See:** [Common Entry Publishing Workflow](../common/publish-entry.md)

### Step 5.1: Create News Banner Entry

### Step 5.2: Publish News Banner Entry

### Step 5.3: Update Page Entry

### Step 5.4: Publish Page Entry

---

## Phase 6: Verify & Test

> **See:** [Common Verification & Testing Workflow](../common/verify-component.md)

### Step 6.1: Verify Entry in ContentStack

**Checklist:**
- ✅ Entry is published
- ✅ `fastlane_components` contains `news_banner` block
- ✅ Reference UID matches created news banner entry
- ✅ Publish details show successful deployment

### Step 6.2: Test in Browser

**Visual Verification:**
1. ✅ News Banner appears at top of page
2. ✅ Title uses correct font (Zodiak, 48px, weight 540)
3. ✅ Colors match Figma (#fafafa text on sky-950 background)
4. ✅ Spacing matches exact pixel values from Figma
5. ✅ Image displays correctly (314px width, rounded corners)
6. ✅ Button styling matches Figma
7. ✅ Responsive behavior works on mobile/tablet

### Step 6.3: Test Live Preview

1. Open ContentStack CMS
2. Navigate to the News Banner entry
3. Click "Live Preview"
4. Make changes to title/description
5. ✅ Changes reflect immediately in preview
6. ✅ Edit tags are visible (hover over elements)

### Step 6.4: Test Content Updates

1. Update News Banner entry in ContentStack
2. Publish changes
3. Refresh page
4. ✅ Changes appear in frontend

---

## Summary

You've successfully created a News Banner component with full ContentStack integration! The component:

- ✅ Matches Figma design exactly
- ✅ Integrates with ContentStack CMS
- ✅ Supports live preview editing
- ✅ Includes responsive design
- ✅ Follows accessibility best practices
- ✅ Uses proper TypeScript types

**Next Steps:**
- Create additional news components (News Section, News Subscription Form)
- Add to more pages
- Customize styling for different themes
- Add analytics tracking
