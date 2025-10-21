# Common ContentStack Content Type Creation Workflow

This workflow covers creating ContentStack content types for components using both MCP tools and local API endpoints.

## Step 1: Check if Content Type Exists

Before creating a new content type, verify it doesn't already exist.

### Using MCP

```typescript
mcp_contentstack_get_all_content_types({
  branch: "main"
})
```

**What to check:**
- Search response for your desired `uid` (e.g., `"news_banner"`)
- If found, use `mcp_contentstack_get_a_single_content_type` to view full schema
- If not found, proceed with creation

### Using Local API

```bash
GET http://localhost:3000/api/contentstack?uid=your_content_type_uid
```

**Response codes:**
- `200` - Content type exists
- `404` - Content type does not exist (can proceed with creation)

---

## Step 2: Define Content Type Schema

Create a JSON schema following ContentStack's structure and your component requirements.

### Schema Structure Template

```json
{
  "title": "Component Display Name",
  "uid": "component_uid",
  "description": "Clear description of component purpose",
  "schema": [
    {
      "data_type": "text",
      "display_name": "Title",
      "uid": "title",
      "field_metadata": {
        "_default": true,
        "version": 3
      },
      "mandatory": true,
      "unique": false,
      "multiple": false,
      "non_localizable": false
    },
    // ... additional fields
  ],
  "options": {
    "is_page": false,
    "singleton": false,
    "title": "title",
    "sub_title": []
  }
}
```

---

## Common Field Patterns

### Default Title Field

Every content type must have a default title field:

```json
{
  "data_type": "text",
  "display_name": "Title",
  "uid": "title",
  "field_metadata": {
    "_default": true,
    "version": 3
  },
  "mandatory": true,
  "unique": false,
  "multiple": false,
  "non_localizable": false
}
```

**Purpose:** CMS identifier (not necessarily displayed on frontend)

---

### Content Group

Group related content fields:

```json
{
  "data_type": "group",
  "display_name": "Content",
  "uid": "content",
  "field_metadata": {
    "description": "Main content fields for the component",
    "instruction": ""
  },
  "schema": [
    {
      "data_type": "text",
      "display_name": "Title",
      "uid": "title",
      "field_metadata": {
        "description": "Main component title",
        "default_value": ""
      },
      "mandatory": false,
      "multiple": false,
      "non_localizable": false,
      "unique": false
    },
    {
      "data_type": "text",
      "display_name": "Description",
      "uid": "description",
      "field_metadata": {
        "description": "Component description text",
        "default_value": ""
      },
      "mandatory": false,
      "multiple": false,
      "non_localizable": false,
      "unique": false
    },
    {
      "data_type": "text",
      "display_name": "Detail Text",
      "uid": "detail_text",
      "field_metadata": {
        "allow_rich_text": true,
        "description": "Rich text content",
        "multiline": false,
        "rich_text_type": "advanced",
        "options": [],
        "version": 3
      },
      "mandatory": false,
      "multiple": false,
      "non_localizable": false,
      "unique": false
    },
    {
      "data_type": "file",
      "display_name": "Image",
      "uid": "image",
      "field_metadata": {
        "description": "Featured image",
        "rich_text_type": "standard"
      },
      "mandatory": false,
      "multiple": false,
      "non_localizable": false,
      "unique": false
    }
  ],
  "mandatory": false,
  "multiple": false,
  "non_localizable": false,
  "unique": false
}
```

---

### Call to Action Group

Standard CTA fields:

```json
{
  "data_type": "group",
  "display_name": "Call to Action",
  "uid": "call_to_action",
  "field_metadata": {
    "description": "Primary and secondary action buttons"
  },
  "schema": [
    {
      "data_type": "link",
      "display_name": "Link",
      "uid": "link",
      "field_metadata": {
        "description": "Primary action button"
      },
      "mandatory": false,
      "multiple": false,
      "non_localizable": false,
      "unique": false
    },
    {
      "data_type": "link",
      "display_name": "Secondary Link",
      "uid": "secondary_link",
      "field_metadata": {
        "description": "Secondary action button"
      },
      "mandatory": false,
      "multiple": false,
      "non_localizable": false,
      "unique": false
    }
  ],
  "mandatory": false,
  "multiple": false,
  "non_localizable": false,
  "unique": false
}
```

---

### Rendering Options Group

Component display options:

```json
{
  "data_type": "group",
  "display_name": "Rendering Options",
  "uid": "rendering_options",
  "field_metadata": {
    "description": "Component display and styling options"
  },
  "schema": [
    {
      "data_type": "select",
      "display_name": "Header Tag",
      "uid": "header_tag",
      "field_metadata": {
        "description": "HTML heading tag for SEO and accessibility",
        "default_value": "h2"
      },
      "choices": [
        { "value": "h1" },
        { "value": "h2" },
        { "value": "h3" },
        { "value": "h4" },
        { "value": "h5" },
        { "value": "h6" }
      ],
      "mandatory": false,
      "multiple": false,
      "non_localizable": false,
      "unique": false
    },
    {
      "data_type": "select",
      "display_name": "Link Type",
      "uid": "link_type",
      "field_metadata": {
        "description": "How CTAs should be displayed",
        "default_value": "Button"
      },
      "choices": [
        { "value": "Button" },
        { "value": "Card" },
        { "value": "Link" }
      ],
      "mandatory": false,
      "multiple": false,
      "non_localizable": false,
      "unique": false
    },
    {
      "data_type": "boolean",
      "display_name": "Hide Image",
      "uid": "hide_image",
      "field_metadata": {
        "description": "Hide the image if checked"
      },
      "mandatory": false,
      "multiple": false,
      "non_localizable": false,
      "unique": false
    }
  ],
  "mandatory": false,
  "multiple": false,
  "non_localizable": false,
  "unique": false
}
```

---

## Step 3: Create Content Type

Use either MCP or local API endpoint to create the content type.

### Method A: Using MCP

```typescript
// Note: MCP currently doesn't support content type creation directly
// Use the local API endpoint instead
```

### Method B: Using Local API Endpoint (Recommended)

```bash
POST http://localhost:3000/api/contentstack
Content-Type: application/json

{
  "title": "News Banner",
  "uid": "news_banner",
  "description": "A prominent banner component for news and announcements",
  "globalFieldFallback": false,
  "schema": [
    // Paste complete schema array here
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
  "message": "Content type 'news_banner' created successfully",
  "uid": "news_banner"
}
```

---

## Step 4: Verify Content Type Creation

Confirm the content type was created correctly.

### Using MCP

```typescript
mcp_contentstack_get_a_single_content_type({
  content_type_uid: "news_banner",
  branch: "main"
})
```

### Using Local API

```bash
GET http://localhost:3000/api/contentstack?uid=news_banner
```

---

## Verification Checklist

Ensure your content type has:

### Required Fields
- ✅ UID matches expected value (e.g., `news_banner`)
- ✅ Title is descriptive and clear
- ✅ Default title field exists with `_default: true`
- ✅ Description explains component purpose

### Schema Validation
- ✅ All required fields are present
- ✅ Field types match requirements (text, file, group, etc.)
- ✅ Field UIDs follow snake_case convention
- ✅ Mandatory fields are marked correctly
- ✅ Default values are set where appropriate
- ✅ Dropdown choices are complete (for select fields)

### Structure Validation
- ✅ Content group contains main fields
- ✅ Call to Action group has link fields
- ✅ Rendering Options group has display settings
- ✅ Field descriptions are helpful for content authors

### Options Validation
- ✅ `is_page` is `false` (unless creating a page type)
- ✅ `singleton` is set correctly
- ✅ `title` field is specified
- ✅ `sub_title` is configured (if needed)

---

## Common Field Types Reference

### Text Field
```json
{
  "data_type": "text",
  "display_name": "Field Name",
  "uid": "field_name",
  "mandatory": false,
  "multiple": false
}
```

### Rich Text Field
```json
{
  "data_type": "text",
  "display_name": "Rich Text",
  "uid": "rich_text",
  "field_metadata": {
    "allow_rich_text": true,
    "rich_text_type": "advanced"
  }
}
```

### Image/File Field
```json
{
  "data_type": "file",
  "display_name": "Image",
  "uid": "image",
  "mandatory": false
}
```

### Link Field
```json
{
  "data_type": "link",
  "display_name": "Link",
  "uid": "link",
  "mandatory": false
}
```

### Select/Dropdown Field
```json
{
  "data_type": "select",
  "display_name": "Option",
  "uid": "option",
  "choices": [
    { "value": "option1" },
    { "value": "option2" }
  ]
}
```

### Boolean Field
```json
{
  "data_type": "boolean",
  "display_name": "Flag",
  "uid": "flag"
}
```

### Group Field
```json
{
  "data_type": "group",
  "display_name": "Group",
  "uid": "group",
  "schema": [ /* nested fields */ ]
}
```

### Reference Field
```json
{
  "data_type": "reference",
  "display_name": "Referenced Content",
  "uid": "referenced_content",
  "reference_to": ["content_type_uid"],
  "multiple": true
}
```

---

## Troubleshooting

### Error: Content Type Already Exists
- Check if UID is already in use
- Use a different UID or update existing content type

### Error: Invalid Schema
- Validate JSON syntax
- Check field types are valid
- Ensure required properties are present

### Error: API Endpoint Not Found
- Verify development server is running
- Check API route exists at `/api/contentstack`
- Ensure route file has correct HTTP methods

### Warning: Field Not Appearing in CMS
- Check field is not marked as `hidden`
- Verify field is in correct group
- Refresh ContentStack dashboard

---

## Best Practices

### Naming Conventions
- **UIDs:** Use `snake_case` (e.g., `news_banner`)
- **Display Names:** Use Title Case (e.g., `News Banner`)
- **Descriptions:** Be clear and helpful for content authors

### Field Organization
- Group related fields together
- Use logical field order (top to bottom importance)
- Add descriptions for complex fields

### Mandatory Fields
- Only mark truly required fields as mandatory
- Provide default values where sensible
- Consider author experience when setting requirements

### Localization
- Set `non_localizable: true` for technical fields
- Allow localization for content fields
- Consider multi-market requirements

---

## Next Steps

With content type created, proceed to:
- [Update Page Content Type](./update-contenttype.md) - Add to page builder
- [Publish Entry](./publish-entry.md) - Create and publish entries

