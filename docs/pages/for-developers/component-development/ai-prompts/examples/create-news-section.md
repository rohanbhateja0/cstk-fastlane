# Complete Guide: Create News Section Listing Component with ContentStack Integration

This comprehensive guide covers the complete workflow for creating a news listing component from Figma design to deployed ContentStack entries.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Explore Figma Design](#phase-1-explore-figma-design)
3. [Phase 2: Create React Component](#phase-2-create-react-component)
4. [Phase 3: Create ContentStack Content Type](#phase-3-create-contentstack-content-type)
5. [Phase 4: Update Page Content Type](#phase-4-update-page-content-type)
6. [Phase 5: Create Multiple Entries](#phase-5-create-multiple-entries)
7. [Phase 6: Map Images from Figma to Entries](#phase-6-map-images-from-figma-to-entries)
8. [Phase 7: Add to Page & Publish](#phase-7-add-to-page--publish)
9. [Phase 8: Verify & Test](#phase-8-verify--test)

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
- Section container: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7448`
- News cards grid: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7447`
- Overall layout: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7435`

**Extract node-ids:** `14076:7448`, `14076:7447`, and `14076:7435`

### News Section Specifications

After following the common Figma exploration workflow, document these News Section-specific specs:

**Card Typography:**
- Title: Satoshi, 20px, weight 500, line-height 28px
- Category/Earmark: Satoshi, 12px, weight 500, uppercase
- Description: Satoshi, 14px, weight 400, line-height 20px
- Link: Satoshi, 14px, weight 500

**Card Colors:**
- Card background: white
- Card border: zinc-300
- Text primary: zinc-950
- Text secondary: zinc-500
- Category: blue-700 on blue-100 background

**Card Spacing:**
- Card padding: 24px
- Gap between cards: 24px
- Internal card spacing: 16px
- Image dimensions: auto width, 200px height

**Grid Layout:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Container max-width: 1280px

### Step 1.4: Identify Individual News Cards

From the Figma metadata (node `14076:7447`), identify each individual news card and extract:
- Card title
- Category/tag
- Description
- Image
- Call-to-action link

---

## Phase 2: Create React Component

> **See:** [Common React Component Creation Workflow](../common/create-react-component.md)

Follow the common workflow, then implement News Section-specific features:

### Step 2.1: Create TypeScript Interface

### Step 2.2: Create Helper Function

### Step 2.3: Create React Component

### Step 2.4: Register Component

### Step 2.5: Update GetPage Query

---

## Phase 3: Create ContentStack Content Type

> **See:** [Common ContentStack Content Type Creation Workflow](../common/create-contentstack-contenttype.md)

### Step 3.1: Check if Content Type Exists

Search response for `"news_section"`.

### Step 3.2: Create Content Type Schema

**ContentStack Structure:**

- **Title** (Default Field) - CMS identifier
- **Content Group:**
  - Title: Single-Line Text (optional) - Main card title
  - Category: Single-Line Text (optional) - Can be used as earmark/tag
  - Description: Rich Text (optional) - Card description text
  - Image: Image (optional) - Card featured image
- **Call to Action Group:**
  - Link: General Link (optional) - Primary action button
  - Secondary Link: General Link (optional) - Secondary action button
- **Rendering Options Group:**
  - Image Order: Dropdown (left, right)
  - Header Tag: Dropdown (H1-H6)
  - Link Type: Dropdown (Button, Card, Link)
  - Hide Image: Boolean
  - Hide Border: Boolean

### Step 3.3: Create Content Type via API

**Using Local API Endpoint:**

### Step 3.4: Verify Content Type Creation

**Checklist:**
- ✅ UID is `news_section`
- ✅ Title is "News Section"
- ✅ All schema fields are present
- ✅ Field types match requirements

---

## Phase 4: Update Page Content Type

> **See:** [Common Page Content Type Update Workflow](../common/update-contenttype.md)

### Step 4.1: Get Current Page Content Type

### Step 4.2: Add News Section Block

### Step 4.3: Verify Page Update

**Checklist:**
- ✅ `fastlane_components.blocks` contains `news_section`
- ✅ Reference field is set to `multiple: true` (array of references)
- ✅ Grid rendering options are present

---

## Phase 5: Create Multiple Entries

> **See:** [Common Entry Publishing Workflow](../common/publish-entry.md) for base workflow

### Step 5.1: Extract News Cards from Figma

Use Figma MCP to get metadata for node `14076:7447` and identify all news cards in the design.

**Typical structure:**
- Card 1: Latest Product Launch
- Card 2: Industry News
- Card 3: Company Update
- Card 4: Event Announcement
- (... more cards)

### Step 5.2: Locate Assets in ContentStack

**Match Figma images to ContentStack assets:**
- Search by filename
- Note down asset UIDs for each image
- Map images to corresponding news cards

### Step 5.3: Create Entries for Each Card

Repeat for all cards found in Figma:

### Step 5.4: Collect All Entry UIDs

Save the UIDs from each creation response:

---

## Phase 6: Map Images from Figma to Entries

### Step 6.1: Create Figma Asset Mapping

Match Figma images to ContentStack assets:

| Figma Image | Figma Filename | ContentStack Asset UID |
|-------------|----------------|------------------------|
| Image 1 | product-launch.png | blt_asset_1 |
| Image 2 | industry-news.png | blt_asset_2 |
| Image 3 | company-update.png | blt_asset_3 |

### Step 6.2: Update Entries with Correct Images

If images were mapped incorrectly initially, update each entry:

### Step 6.3: Publish All Entries

**Important Note:** Match the order of images in Figma code with the order of cards to ensure correct mapping!

---

## Phase 7: Add to Page & Publish

> **See:** [Common Entry Publishing Workflow](../common/publish-entry.md)

### Step 7.1: Get Existing News Page Entry

### Step 7.2: Update Page with News Section Block

### Step 7.3: Publish Page Entry

---

## Phase 8: Verify & Test

> **See:** [Common Verification & Testing Workflow](../common/verify-component.md)

### Step 8.1: Verify in ContentStack

**Checklist:**
- ✅ Page entry is published
- ✅ `fastlane_components` contains `news_section` block
- ✅ `news_sections` array contains all entry UIDs
- ✅ All referenced news_section entries are published
- ✅ All images are correctly mapped from Figma
- ✅ Image filenames match Figma asset filenames

### Step 8.2: Test in Browser

**URL:** `http://localhost:3000/news`

**Visual Verification:**
1. ✅ News Banner appears at top
2. ✅ News Section grid displays below banner
3. ✅ All news cards are visible (expected: 8+ cards)
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

1. Open ContentStack CMS
2. Navigate to any news_section entry
3. Click "Live Preview"
4. Make changes to title/description
5. ✅ Changes reflect in the grid
6. ✅ Edit tags are visible

---

## Summary

You've successfully created a News Section listing component with multiple entries! The component:

- ✅ Displays multiple news cards in a responsive grid
- ✅ Matches Figma design exactly
- ✅ Integrates with ContentStack CMS
- ✅ Supports live preview editing
- ✅ Handles multiple referenced entries
- ✅ Includes responsive design
- ✅ Images are correctly mapped from Figma

**Next Steps:**
- Add pagination for large numbers of cards
- Implement filtering by category
- Add search functionality
- Create related news recommendations
