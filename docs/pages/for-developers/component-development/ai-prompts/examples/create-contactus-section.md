# Complete Guide: Create ContactUs Section Listing Component with ContentStack Integration

This comprehensive guide covers the complete workflow for creating a ContactUs component from Figma design to deployed ContentStack entries.

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
10. [Phase 9: Verify Design with Figma](#phase-9-verify-design-with-figma)
11. [Phase 10: Fix Design Issues](#phase-10-fix-design-issues)

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
- Section container: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-8169`
- ContactUs cards grid: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-8170`
- Overall layout: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-8087`

**Extract node-ids:** `14076:8169`, `14076:8170`, and `14076:8087` 

### ContactUs Section Specifications

After following the common Figma exploration workflow, document these ContactUs Section-specific specs:

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

### Step 1.4: Identify Individual ContactUs Cards

From the Figma metadata (node `14076:8170`), identify each individual ContactUs card and extract:
- Card title
- Category/tag
- Description
- Image
- Primary call-to-action link
- Secondary link (if applicable)

---

## Phase 2: Create React Component

> **See:** [Common React Component Creation Workflow](../common/create-react-component.md)

Follow the common workflow, then implement ContactUs Section-specific features:

### Step 2.1: Create TypeScript Interface

### Step 2.2: Create Helper Function

### Step 2.3: Create React Component

### Step 2.4: Register Component

### Step 2.5: Update GetPage Query

---

## Phase 3: Create ContentStack Content Type

> **See:** [Common ContentStack Content Type Creation Workflow](../common/create-contentstack-contenttype.md)

### Step 3.1: Check if Content Type Exists

**Using MCP:**
```typescript
mcp_contentstack_get_all_content_types({
  branch: "main"
})
```

Search response for `"contactus_section"`.

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

```bash
POST http://localhost:3000/api/contentstack
Content-Type: application/json

{
  "title": "ContactUs Section",
  "uid": "contactus_section",
  "description": "A card component for displaying contact options in a grid layout",
  "globalFieldFallback": false,
  "schema": [
    // Include complete schema array here (see common workflow)
  ],
  "options": {
    "is_page": false,
    "singleton": false,
    "title": "title",
    "sub_title": []
  }
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Content type 'contactus_section' created successfully",
  "uid": "contactus_section"
}
```

### Step 3.4: Verify Content Type Creation

**Using MCP:**
```typescript
mcp_contentstack_get_a_single_content_type({
  content_type_uid: "contactus_section",
  branch: "main"
})
```

**Checklist:**
- ✅ UID is `contactus_section`
- ✅ Title is "ContactUs Section"
- ✅ All schema fields are present
- ✅ Field types match requirements
- ✅ Field descriptions are helpful for content authors

---

## Phase 4: Update Page Content Type

> **See:** [Common Page Content Type Update Workflow](../common/update-contenttype.md)

### Step 4.1: Get Current Page Content Type

**Using MCP:**
```typescript
mcp_contentstack_get_a_single_content_type({
  content_type_uid: "page",
  branch: "main"
})
```

**Save the complete schema** - you'll need to modify it and send it back.

### Step 4.2: Add ContactUs Section Block

Add the following block definition to the `fastlane_components.blocks` array:

```json
{
  "title": "ContactUs Section",
  "uid": "contactus_section",
  "schema": [
    {
      "data_type": "reference",
      "display_name": "ContactUs Sections",
      "uid": "contactus_sections",
      "reference_to": ["contactus_section"],
      "field_metadata": {
        "description": "Select multiple contact us section entries",
        "ref_multiple": true,
        "ref_multiple_content_types": false
      },
      "mandatory": false,
      "multiple": true,
      "non_localizable": false,
      "unique": false
    }
  ]
}
```

**Then update the page content type via API:**

```bash
PUT http://localhost:3000/api/contentstack
Content-Type: application/json

{
  "uid": "page",
  "title": "Page",
  "description": "Page content type with modular components",
  "schema": [
    // Complete schema including updated fastlane_components field
  ],
  "options": {
    // Existing options from the content type
  }
}
```

### Step 4.3: Verify Page Update

**Using MCP:**
```typescript
mcp_contentstack_get_a_single_content_type({
  content_type_uid: "page",
  branch: "main"
})
```

**Checklist:**
- ✅ `fastlane_components.blocks` contains `contactus_section` block
- ✅ Reference field is set to `multiple: true` (array of references)
- ✅ Reference field UID is `contactus_sections` (plural)
- ✅ `reference_to` points to `["contactus_section"]`
- ✅ `ref_multiple` is set to `true` in field_metadata

---

## Phase 5: Create Multiple Entries

> **See:** [Common Entry Publishing Workflow](../common/publish-entry.md) for base workflow

### Step 5.1: Extract ContactUs Cards from Figma

Use Figma MCP to get metadata for node `14076:8170` and identify all ContactUs cards in the design.

**Typical structure:**
- Card 1: General Inquiry
- Card 2: Support Request
- Card 3: Sales Contact
- Card 4: Partnership Opportunities
- Card 5: Media Relations
- Card 6: Career Inquiries
- (... more cards as designed)

### Step 5.2: Locate Assets in ContentStack

**Match Figma images to ContentStack assets:**
- Search by filename
- Note down asset UIDs for each image
- Map images to corresponding ContactUs cards

### Step 5.3: Create Entries for Each Card

Repeat for all cards found in Figma.

**Example - Create First Entry:**

```typescript
mcp_contentstack_create_an_entry({
  content_type_uid: "contactus_section",
  branch: "main",
  locale: "en-us",
  entry_data: {
    entry: {
      title: "General Inquiry Contact",
      content: {
        title: "General Inquiries",
        category: "GENERAL",
        description: "Have a question or need assistance? Our team is here to help.",
        image: {
          uid: "blt_general_inquiry_image_uid"
        }
      },
      call_to_action: {
        link: {
          title: "Contact Us",
          href: "/contact/general"
        }
      },
      rendering_options: {
        header_tag: "h3",
        link_type: "Button",
        hide_image: false,
        hide_border: false
      }
    }
  }
})
```

**Save the returned UID for each entry!**

**Repeat for all cards:**
- General Inquiry → `blt_contactus_entry_1`
- Support Request → `blt_contactus_entry_2`
- Sales Contact → `blt_contactus_entry_3`
- Partnership → `blt_contactus_entry_4`
- (... continue for all cards)

### Step 5.4: Collect All Entry UIDs

Save the UIDs from each creation response for later use:

```javascript
const contactUsEntries = [
  "blt_contactus_entry_1",  // General Inquiry
  "blt_contactus_entry_2",  // Support Request
  "blt_contactus_entry_3",  // Sales Contact
  "blt_contactus_entry_4",  // Partnership
  "blt_contactus_entry_5",  // Media Relations
  "blt_contactus_entry_6",  // Career Inquiries
  // ... add all entry UIDs
];
```

---

## Phase 6: Map Images from Figma to Entries

### Step 6.1: Create Figma Asset Mapping

Match Figma images to ContentStack assets:

**Using MCP:**
```typescript
mcp_contentstack_get_all_assets({
  branch: "main",
  limit: "100"
})
```

**Create mapping table:**

| Figma Image | Figma Filename | ContentStack Asset UID |
|-------------|----------------|------------------------|
| Image 1 | general-inquiry.png | blt_asset_1 |
| Image 2 | support-request.png | blt_asset_2 |
| Image 3 | sales-contact.png | blt_asset_3 |
| Image 4 | partnership.png | blt_asset_4 |

### Step 6.2: Update Entries with Correct Images

If images were mapped incorrectly initially, update each entry.

**Example - Update Entry with Correct Image:**

```typescript
mcp_contentstack_update_an_entry({
  content_type_uid: "contactus_section",
  entry_id: "blt_contactus_entry_1",
  branch: "main",
  locale: "en-us",
  entry_data: {
    entry: {
      content: {
        image: {
          uid: "blt_correct_image_uid"  // Use correct asset UID from mapping table
        }
      }
    }
  }
})
```

**Repeat for all entries that need image updates.**

### Step 6.3: Publish All Entries

**Publish each entry individually:**

```typescript
// Publish first entry
mcp_contentstack_publish_an_entry({
  content_type_uid: "contactus_section",
  entry_uid: "blt_contactus_entry_1",
  locales: "en-us",
  master_locale: "en-us",
  environment_uids: "development",
  publish_with_reference: true,
  branch: "main"
})

// Repeat for all entries: entry_2, entry_3, etc.
```

**Important Note:** Match the order of images in Figma code with the order of cards to ensure correct mapping!

---

## Phase 7: Add to Page & Publish

> **See:** [Common Entry Publishing Workflow](../common/publish-entry.md)

### Step 7.1: Get Existing ContactUs Page Entry

**Using MCP:**
```typescript
mcp_contentstack_get_single_entry({
  content_type_uid: "page",
  entry_id: "blt_contactus_page_uid",  // Your ContactUs page entry UID
  branch: "main",
  locale: "en-us"
})
```

### Step 7.2: Update Page with ContactUs Section Block

**Add ContactUs Section block to the page:**

```typescript
mcp_contentstack_update_an_entry({
  content_type_uid: "page",
  entry_id: "blt_contactus_page_uid",
  branch: "main",
  locale: "en-us",
  entry_data: {
    entry: {
      fastlane_components: [
        // ... existing components
        {
          contactus_section: {
            contactus_sections: [  // Array of references
              {
                uid: "blt_contactus_entry_1",
                _content_type_uid: "contactus_section"
              },
              {
                uid: "blt_contactus_entry_2",
                _content_type_uid: "contactus_section"
              }
              // ... add all contactus entries
            ]
          }
        }
      ]
    }
  }
})
```

### Step 7.3: Publish Page Entry

**Publish the page with all references:**

```typescript
mcp_contentstack_publish_an_entry({
  content_type_uid: "page",
  entry_uid: "blt_contactus_page_uid",
  locales: "en-us",
  master_locale: "en-us",
  environment_uids: "development",
  publish_with_reference: true,  // Important: publishes all referenced entries
  branch: "main"
})
```

---

## Phase 8: Verify & Test

> **See:** [Common Verification & Testing Workflow](../common/verify-component.md)

### Step 8.1: Verify in ContentStack

**Using MCP:**
```typescript
mcp_contentstack_get_single_entry({
  content_type_uid: "page",
  entry_id: "blt_contactus_page_uid",
  include_publish_details: true,
  branch: "main",
  locale: "en-us"
})
```

**Checklist:**
- ✅ Page entry is published
- ✅ `fastlane_components` contains `contactus_section` block
- ✅ `contactus_sections` array contains all entry UIDs
- ✅ All referenced contactus_section entries are published
- ✅ All images are correctly mapped from Figma
- ✅ Image filenames match Figma asset filenames
- ✅ Publish details show successful deployment

### Step 8.2: Test in Browser

**URL:** `http://localhost:3000/contactus`

**All URL variations should work (case-insensitive routing):**
- `http://localhost:3000/contactus`
- `http://localhost:3000/ContactUs`
- `http://localhost:3000/CONTACTUS`

**Visual Verification:**
1. ✅ ContactUs Banner appears at top
2. ✅ ContactUs Section grid displays below banner
3. ✅ All ContactUs cards are visible (expected: 8+ cards)
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
2. Navigate to any contactus_section entry
3. Click "Live Preview" button (top right)
4. Make changes to title/description
5. ✅ Changes reflect immediately in the preview
6. ✅ Edit tags are visible (hover over elements)
7. ✅ Can click on elements to edit them
8. Change rendering options (header tag, link type)
9. ✅ Rendering changes apply in real-time
10. Save and publish
11. ✅ Changes persist on live site after publish

---

## Phase 9: Verify Design with Figma

**Critical:** After initial implementation, always verify the actual rendered output against the Figma design to catch discrepancies early.

### Step 9.1: Connect to Figma MCP

**Enable Figma MCP Server:**
1. Open **Figma Desktop App** (not web version)
2. Open the design file containing your component
3. Navigate to: **Figma menu** → **Preferences**
4. Enable **"Dev Mode MCP Server"**
5. Verify server is running at: `http://127.0.0.1:3845/sse`
6. Keep Figma Desktop App **open** while working

**Verify Figma MCP is connected in Cursor:**
1. Go to: **Cursor** → **Settings** → **MCP**
2. Verify `figma` server is listed
3. Check that status shows **"Connected"** (green indicator)

### Step 9.2: Fetch Complete Design from Figma

**Get the full section design with all cards:**

### Step 9.3: Compare Implementation vs Figma

**Create a checklist comparing what's implemented vs what's in Figma:**

### Step 9.4: Extract Exact Specifications

**From the Figma MCP response, document:**

### Step 9.5: Document All Discrepancies

**Create a list of all issues found:**

---

## Phase 10: Fix Design Issues

After identifying discrepancies, systematically fix each issue to match Figma exactly.

