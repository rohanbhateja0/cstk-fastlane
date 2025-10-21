# Common Entry Publishing Workflow

This workflow covers creating, updating, and publishing ContentStack entries for your components.

## Overview

After creating content types and updating the page builder, you need to:
1. Create entries for your component
2. Add component references to pages
3. Publish entries to make them live

---

## Step 1: Create Component Entry

Create an entry for your component with appropriate content.

### Using MCP

```typescript
mcp_contentstack_create_an_entry({
  content_type_uid: "news_banner",
  branch: "main",
  locale: "en-us",
  entry_data: {
    entry: {
      title: "Breaking News Banner",
      content: {
        title: "Major Announcement",
        description: "Important company update",
        image: {
          uid: "blt_image_uid"  // Reference to uploaded asset
        }
      },
      call_to_action: {
        link: {
          title: "Read More",
          href: "/news/announcement"
        }
      },
      rendering_options: {
        header_tag: "h1",
        link_type: "Button"
      }
    }
  }
})
```

**Response includes:**
- `uid` - Entry UID (save this for later steps)
- `locale` - Entry locale
- `version` - Entry version number

---

### Entry Data Structure

Follow this pattern for entry data:

```json
{
  "entry": {
    "title": "CMS Identifier (required)",
    "content": {
      // Content group fields
      "title": "Display Title",
      "description": "Description text",
      "image": {
        "uid": "blt_asset_uid"
      }
    },
    "call_to_action": {
      "link": {
        "title": "Button Text",
        "href": "/path/to/page"
      },
      "secondary_link": {
        "title": "Secondary Text",
        "href": "/path/to/other"
      }
    },
    "rendering_options": {
      "header_tag": "h2",
      "link_type": "Button",
      "hide_image": false
    }
  }
}
```

**Important:**
- Wrap all data in an `entry` object
- Use asset UIDs for images (not URLs)
- Include only fields that exist in your content type
- Match field UIDs exactly as defined in schema

---

## Step 2: Upload and Reference Assets

If your component uses images, you need to upload them to ContentStack first.

### Upload Asset Using MCP

```typescript
// Note: Asset upload via MCP may require direct API calls
// Check ContentStack API documentation for asset upload endpoints
```

### Get Existing Assets

```typescript
mcp_contentstack_get_all_assets({
  branch: "main",
  limit: "100"
})
```

**Search for:**
- Asset filename
- Asset UID
- Asset URL

**Use the UID** when referencing in entry data:

```json
"image": {
  "uid": "blt1234567890abcdef"  // Asset UID from get_all_assets
}
```

---

## Step 3: Add Component to Page

Update an existing page or create a new page that includes your component.

### Get Existing Page Entry

```typescript
mcp_contentstack_get_single_entry({
  content_type_uid: "page",
  entry_id: "blt_page_uid",
  branch: "main",
  locale: "en-us"
})
```

---

### Update Page with Component Block

#### For Single Reference Components:

```typescript
mcp_contentstack_update_an_entry({
  content_type_uid: "page",
  entry_id: "blt_page_uid",
  branch: "main",
  locale: "en-us",
  entry_data: {
    entry: {
      fastlane_components: [
        // ... existing components
        {
          news_banner: {
            uid: "blt_news_banner_entry_uid",
            _content_type_uid: "news_banner"
          }
        }
      ]
    }
  }
})
```

#### For Multiple Reference Components:

```typescript
mcp_contentstack_update_an_entry({
  content_type_uid: "page",
  entry_id: "blt_page_uid",
  branch: "main",
  locale: "en-us",
  entry_data: {
    entry: {
      fastlane_components: [
        // ... existing components
        {
          news_section: {
            news_sections: [  // Array of references
              {
                uid: "blt_entry_1",
                _content_type_uid: "news_section"
              },
              {
                uid: "blt_entry_2",
                _content_type_uid: "news_section"
              },
              {
                uid: "blt_entry_3",
                _content_type_uid: "news_section"
              }
            ]
          }
        }
      ]
    }
  }
})
```

**Important:**
- Preserve existing `fastlane_components` blocks
- Add your component block to the array
- Use correct UID for single vs. plural references
- Include `_content_type_uid` for each reference

---

## Step 4: Publish Component Entry

Publish the component entry to make it available.

### Using MCP

```typescript
mcp_contentstack_publish_an_entry({
  content_type_uid: "news_banner",
  entry_uid: "blt_news_banner_entry_uid",
  locales: "en-us",
  master_locale: "en-us",
  environment_uids: "development",  // or "production", "staging"
  publish_with_reference: true,
  branch: "main"
})
```

**Parameters:**

| Parameter | Description | Example |
|-----------|-------------|---------|
| `content_type_uid` | Content type UID | `"news_banner"` |
| `entry_uid` | Entry UID to publish | `"blt123..."` |
| `locales` | Target locale(s) | `"en-us"` or `"en-us,fr-fr"` |
| `master_locale` | Primary locale | `"en-us"` |
| `environment_uids` | Target environment(s) | `"development"` |
| `publish_with_reference` | Publish referenced entries | `true` |

---

### Get Available Environments

```typescript
mcp_contentstack_get_all_environments({
  include_count: true
})
```

**Common environments:**
- `development` - Development environment
- `staging` - Staging environment
- `production` - Production environment

---

### Get Available Locales

```typescript
mcp_contentstack_get_all_languages({
  branch: "main"
})
```

**Common locales:**
- `en-us` - English (US)
- `en-gb` - English (UK)
- `fr-fr` - French
- `de-de` - German
- `es-es` - Spanish

---

## Step 5: Publish Page Entry

Publish the page to make all components visible.

### Using MCP

```typescript
mcp_contentstack_publish_an_entry({
  content_type_uid: "page",
  entry_uid: "blt_page_entry_uid",
  locales: "en-us",
  master_locale: "en-us",
  environment_uids: "development",
  publish_with_reference: true,  // Important: publishes all referenced components
  branch: "main"
})
```

**Why `publish_with_reference: true`?**
- Automatically publishes all referenced component entries
- Ensures consistency across page and components
- Prevents broken references

---

## Step 6: Verify Publication

Confirm entries are published successfully.

### Check Entry Publication Status

```typescript
mcp_contentstack_get_single_entry({
  content_type_uid: "news_banner",
  entry_id: "blt_news_banner_entry_uid",
  include_publish_details: true,
  branch: "main",
  locale: "en-us"
})
```

**Look for:**
- `publish_details` object in response
- `published` status
- `version` number
- `environment` published to

---

## Publishing Workflows

### Workflow 1: Single Component + Page

1. Create component entry
2. Publish component entry
3. Add component reference to page
4. Publish page entry

**Use case:** Simple components, one instance per page

---

### Workflow 2: Multiple Components + Page

1. Create all component entries
2. Publish all component entries
3. Add all component references to page
4. Publish page entry

**Use case:** List/grid components, multiple instances

---

### Workflow 3: Scheduled Publishing

```typescript
mcp_contentstack_publish_an_entry({
  content_type_uid: "news_banner",
  entry_uid: "blt_entry_uid",
  locales: "en-us",
  master_locale: "en-us",
  environment_uids: "production",
  scheduled_at: "2024-12-31 23:59:59",  // Schedule publication
  branch: "main"
})
```

**Use case:** Time-sensitive content, planned releases

---

## Unpublishing Entries

Remove entries from published environments.

### Using MCP

```typescript
mcp_contentstack_unpublish_an_entry({
  content_type_uid: "news_banner",
  entry: "blt_entry_uid",
  locales: "en-us",
  master_locale: "en-us",
  environment_uids: "production",
  branch: "main"
})
```

**Use case:** Remove outdated content, take down temporarily

---

## Multi-Locale Publishing

Publish content to multiple locales simultaneously.

### Publish to All Locales

```typescript
mcp_contentstack_publish_an_entry({
  content_type_uid: "news_banner",
  entry_uid: "blt_entry_uid",
  locales: "en-us,fr-fr,de-de",  // Multiple locales
  master_locale: "en-us",
  environment_uids: "production",
  branch: "main"
})
```

### Localize Entry First

```typescript
mcp_contentstack_localize_an_entry({
  content_type_uid: "news_banner",
  entry_id: "blt_entry_uid",
  locale: "fr-fr",
  branch: "main",
  entry_data: {
    entry: {
      content: {
        title: "Titre en français",
        description: "Description en français"
      }
    }
  }
})
```

---

## Verification Checklist

Before considering publishing complete:

### Entry Creation
- ✅ Entry created successfully
- ✅ Entry UID saved
- ✅ All required fields populated
- ✅ Assets referenced correctly
- ✅ No validation errors

### Page Updates
- ✅ Component added to page's fastlane_components
- ✅ Reference UIDs are correct
- ✅ `_content_type_uid` included
- ✅ Existing components preserved

### Publishing
- ✅ Component entry published
- ✅ Page entry published
- ✅ `publish_with_reference: true` used
- ✅ Correct environment targeted
- ✅ Correct locale(s) specified

### Publication Status
- ✅ Entry shows as published in ContentStack
- ✅ Version number incremented
- ✅ Publish details show correct environment
- ✅ No errors in publish queue

---

## Troubleshooting

### Entry Creation Fails
- Verify content type exists
- Check required fields are provided
- Validate JSON structure
- Ensure asset UIDs are valid

### Publishing Fails
- Check environment exists
- Verify locale is available
- Ensure entry is valid (no errors)
- Check permissions for publishing

### References Not Working
- Verify referenced entries are published
- Check UID spelling is exact
- Ensure `_content_type_uid` matches
- Verify reference path in GetPage query

### Content Not Appearing on Site
- Clear browser cache
- Check development server is running
- Verify entry is published to correct environment
- Check ContentStack environment variables in .env.local
- Look for errors in browser console

---

## Best Practices

### Entry Management
- Use descriptive titles for easy identification
- Organize entries with consistent naming
- Add tags/categories for filtering
- Document entry relationships

### Publishing Strategy
- Test in development before production
- Use `publish_with_reference` for consistency
- Schedule publishing for time-sensitive content
- Document publishing workflows

### Multi-Environment
- Publish to development first
- Test thoroughly before staging
- Final verification before production
- Keep environments synchronized

---

## Next Steps

With entries published, proceed to:
- [Verify Component](./verify-component.md) - Verify complete implementation
- Test live preview functionality
- Verify responsive behavior
- Check accessibility

