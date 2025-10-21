# Common Page Content Type Update Workflow

This workflow covers adding new component blocks to the Page content type's modular blocks field (`fastlane_components`).

## Overview

The Page content type in ContentStack uses a modular blocks field to allow content authors to build pages by selecting and arranging components. When you create a new component, you must add it to this modular blocks field to make it available in the page builder.

---

## Step 1: Get Current Page Content Type

Retrieve the current Page content type schema to understand its structure.

### Using MCP

```typescript
mcp_contentstack_get_a_single_content_type({
  content_type_uid: "page",
  branch: "main"
})
```

### Using Local API

```bash
GET http://localhost:3000/api/contentstack?uid=page
```

**Save the response** - you'll need to modify and send it back.

---

## Step 2: Locate Fast Lane Components Field

Find the modular blocks field in the schema (usually named `fastlane_components`).

### Typical Structure

```json
{
  "data_type": "blocks",
  "display_name": "FastLane Components",
  "uid": "fastlane_components",
  "field_metadata": {
    "instruction": "",
    "description": "Page builder components"
  },
  "blocks": [
    // Existing component blocks
    {
      "title": "Hero Banner",
      "uid": "hero_banner",
      "schema": [
        {
          "data_type": "reference",
          "display_name": "Hero Banner",
          "uid": "hero_banner",
          "reference_to": ["hero_banner"],
          "mandatory": false,
          "multiple": false
        }
      ]
    },
    // ... more blocks
  ],
  "mandatory": false,
  "multiple": true,
  "non_localizable": false,
  "unique": false
}
```

---

## Step 3: Create Component Block Definition

Define how your component appears in the modular blocks field.

### Single Reference Block

For components that appear once (e.g., banner, hero):

```json
{
  "title": "News Banner",
  "uid": "news_banner",
  "schema": [
    {
      "data_type": "reference",
      "display_name": "News Banner",
      "uid": "news_banner",
      "reference_to": ["news_banner"],
      "field_metadata": {
        "description": "Select a news banner entry",
        "ref_multiple": false,
        "ref_multiple_content_types": false
      },
      "mandatory": false,
      "multiple": false,
      "non_localizable": false,
      "unique": false
    }
  ]
}
```

**Key Properties:**
- `title`: Display name in page builder
- `uid`: Unique identifier (match content type UID)
- `reference_to`: Array with content type UID
- `multiple`: `false` for single reference
- `ref_multiple`: `false` for single reference

---

### Multiple References Block

For components that can have multiple items (e.g., listing, carousel):

```json
{
  "title": "News Section",
  "uid": "news_section",
  "schema": [
    {
      "data_type": "reference",
      "display_name": "News Sections",
      "uid": "news_sections",  // Note: plural for multiple
      "reference_to": ["news_section"],
      "field_metadata": {
        "description": "Select multiple news section entries",
        "ref_multiple": true,
        "ref_multiple_content_types": false
      },
      "mandatory": false,
      "multiple": true,  // Enable multiple references
      "non_localizable": false,
      "unique": false
    }
  ]
}
```

**Key Differences:**
- `uid`: Often plural (e.g., `news_sections`)
- `multiple`: `true` to allow array of references
- `ref_multiple`: `true` to enable multi-selection

---

### Block with Additional Options

For components with rendering options:

```json
{
  "title": "Card Listing",
  "uid": "card_listing",
  "schema": [
    {
      "data_type": "reference",
      "display_name": "Cards",
      "uid": "cards",
      "reference_to": ["content_card_model"],
      "field_metadata": {
        "ref_multiple": true,
        "ref_multiple_content_types": false
      },
      "mandatory": false,
      "multiple": true
    },
    {
      "data_type": "select",
      "display_name": "Grid Columns",
      "uid": "grid_columns",
      "field_metadata": {
        "description": "Number of columns for the grid layout"
      },
      "choices": [
        { "value": "1" },
        { "value": "2" },
        { "value": "3" },
        { "value": "4" }
      ],
      "mandatory": false,
      "multiple": false
    }
  ]
}
```

**Additional Fields:**
- Add rendering options directly in the block schema
- Content authors configure these when adding the block to a page

---

## Step 4: Add Block to Page Content Type

Insert your new block into the `blocks` array of the `fastlane_components` field.

### Update Process

1. **Copy existing schema** from Step 1
2. **Locate `fastlane_components.blocks` array**
3. **Add your new block** to the array
4. **Preserve existing blocks** (don't remove them)
5. **Send updated schema** back to ContentStack

### Example: Adding News Banner Block

```json
{
  "data_type": "blocks",
  "display_name": "FastLane Components",
  "uid": "fastlane_components",
  "blocks": [
    // ... existing blocks (keep all of these)
    {
      "title": "Hero Banner",
      "uid": "hero_banner",
      "schema": [...]
    },
    {
      "title": "Card Listing",
      "uid": "card_listing",
      "schema": [...]
    },
    
    // ADD YOUR NEW BLOCK HERE
    {
      "title": "News Banner",
      "uid": "news_banner",
      "schema": [
        {
          "data_type": "reference",
          "display_name": "News Banner",
          "uid": "news_banner",
          "reference_to": ["news_banner"],
          "field_metadata": {
            "ref_multiple": false
          },
          "mandatory": false,
          "multiple": false
        }
      ]
    }
    
    // ... any remaining blocks
  ]
}
```

---

## Step 5: Update Page Content Type

Send the modified schema back to ContentStack.

### Using Local API Endpoint

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

**Important:**
- Include the **entire schema**, not just the changed field
- Preserve all **existing blocks**
- Maintain correct **JSON formatting**
- Include all **field metadata**

---

## Step 6: Verify Page Update

Confirm the block was added successfully.

### Using MCP

```typescript
mcp_contentstack_get_a_single_content_type({
  content_type_uid: "page",
  branch: "main"
})
```

### Using ContentStack Dashboard

1. Go to ContentStack → Content Models → Page
2. Find the "FastLane Components" field
3. Verify your new block appears in the blocks list
4. Check that clicking "Add Block" shows your component

---

## Verification Checklist

Confirm the following:

### Block Definition
- ✅ Block UID matches component content type UID
- ✅ Block title is descriptive and clear
- ✅ Reference field points to correct content type
- ✅ `ref_multiple` is set correctly (true for arrays, false for single)
- ✅ `multiple` property matches expected behavior

### Schema Integrity
- ✅ All existing blocks are preserved
- ✅ No duplicate UIDs in blocks array
- ✅ JSON is valid and properly formatted
- ✅ Field metadata is complete

### ContentStack Dashboard
- ✅ Block appears in FastLane Components field
- ✅ Block is selectable when editing a page
- ✅ Reference field shows available entries
- ✅ Can add and remove the block

---

## Common Block Patterns

### Pattern 1: Simple Single Reference

```json
{
  "title": "Component Name",
  "uid": "component_name",
  "schema": [
    {
      "data_type": "reference",
      "display_name": "Component Name",
      "uid": "component_name",
      "reference_to": ["component_name"],
      "mandatory": false,
      "multiple": false
    }
  ]
}
```

**Use for:** Banners, heroes, single instance components

---

### Pattern 2: Multiple References

```json
{
  "title": "Component Name",
  "uid": "component_name",
  "schema": [
    {
      "data_type": "reference",
      "display_name": "Components",
      "uid": "components",
      "reference_to": ["component_name"],
      "field_metadata": {
        "ref_multiple": true
      },
      "multiple": true
    }
  ]
}
```

**Use for:** Listings, grids, carousels

---

### Pattern 3: Reference with Grid Options

```json
{
  "title": "Component Listing",
  "uid": "component_listing",
  "schema": [
    {
      "data_type": "reference",
      "display_name": "Items",
      "uid": "items",
      "reference_to": ["component_name"],
      "field_metadata": {
        "ref_multiple": true
      },
      "multiple": true
    },
    {
      "data_type": "select",
      "display_name": "Columns",
      "uid": "columns",
      "choices": [
        { "value": "2" },
        { "value": "3" },
        { "value": "4" }
      ]
    }
  ]
}
```

**Use for:** Configurable layouts, dynamic grids

---

### Pattern 4: Multiple Content Types

```json
{
  "title": "Mixed Content",
  "uid": "mixed_content",
  "schema": [
    {
      "data_type": "reference",
      "display_name": "Content Items",
      "uid": "content_items",
      "reference_to": ["news_section", "content_card_model", "product"],
      "field_metadata": {
        "ref_multiple": true,
        "ref_multiple_content_types": true
      },
      "multiple": true
    }
  ]
}
```

**Use for:** Flexible content areas, mixed media sections

---

## Troubleshooting

### Block Not Appearing in Dashboard
- Clear browser cache
- Refresh ContentStack dashboard
- Verify block was added to correct content type
- Check that UID is unique

### Reference Field Empty
- Verify referenced content type exists
- Check that `reference_to` array contains correct UID
- Ensure entries exist for the referenced content type
- Verify permissions allow viewing referenced content

### Cannot Add Multiple Items
- Check `multiple: true` is set
- Verify `ref_multiple: true` in field_metadata
- Ensure array handling in component code

### Block Appears but Doesn't Work
- Verify component is registered in render-components.tsx
- Check GetPage query includes reference path
- Ensure component code handles data structure correctly
- Check browser console for errors

---

## Best Practices

### Block Organization
- Group related blocks together
- Use clear, descriptive titles
- Add helpful descriptions in field_metadata
- Maintain alphabetical order for easier management

### Reference Configuration
- Use plural UIDs for multiple references (e.g., `news_sections`)
- Use singular UIDs for single references (e.g., `news_banner`)
- Set `ref_multiple` consistently with `multiple` property
- Add descriptions to guide content authors

### Schema Maintenance
- Document all changes
- Test in development before production
- Back up schema before modifications
- Version control schema files

---

## Next Steps

With page content type updated, proceed to:
- [Publish Entry](./publish-entry.md) - Create and publish entries
- [Verify Component](./verify-component.md) - Verify implementation

