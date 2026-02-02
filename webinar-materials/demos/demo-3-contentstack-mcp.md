# Demo 3: Contentstack MCP Server

## Demo Overview

**Duration:** 3-4 minutes
**Goal:** Demonstrate automated content type creation and entry management using the Contentstack MCP Server

## Pre-Demo Setup

### Prerequisites Checklist

- [ ] Contentstack account with API access
- [ ] Environment variables configured:
  - `CONTENTSTACK_API_KEY`
  - `CONTENTSTACK_MANAGEMENT_TOKEN`
  - `CONTENTSTACK_DELIVERY_TOKEN`
  - `CONTENTSTACK_REGION`
- [ ] Cursor IDE with MCP server connected
- [ ] Contentstack dashboard open in browser (for verification)

### Environment Verification

```powershell
# Verify environment variables are set
echo $env:CONTENTSTACK_API_KEY
echo $env:CONTENTSTACK_MANAGEMENT_TOKEN
```

---

## Demo Script

### Step 1: Show Current Contentstack State (30 seconds)

**Narrator Script:**
> "Let's start by looking at our Contentstack dashboard. We have our existing content types here - pages, headers, footers. Now we want to add a new NewsSection content type that matches the React component we just generated."

**Actions:**
1. Open Contentstack dashboard in browser
2. Navigate to Content Models section
3. Show existing content types:
   - page
   - header
   - footer
   - carousel
4. Highlight that NewsSection doesn't exist yet

---

### Step 2: Connect to Contentstack MCP (30 seconds)

**Narrator Script:**
> "In Cursor, we have the Contentstack MCP Server connected. This gives our AI direct access to create and manage content types, entries, and assets - all without leaving the IDE."

**Actions:**
1. Switch to Cursor IDE
2. Show Settings > Tools & Integrations
3. Point out Contentstack MCP server with available tools:
   - `list_content_types`
   - `get_content_type`
   - `create_content_type`
   - `update_content_type`
   - `create_entry`
   - `publish_entry`

---

### Step 3: Create Content Type via AI (1.5 minutes)

**Narrator Script:**
> "Now I'll ask the AI to create a content type that matches our NewsSection component. I'll provide the fields and structure, and the AI will use the Contentstack MCP to create it directly in our stack."

**Actions:**
1. Open Cursor AI chat
2. Enter the following prompt:

```
Using the Contentstack MCP server, create a new content type called "news_section" with the following structure:

Content Fields:
- title: Single line text (required)
- description: Rich text editor
- news_items: Reference field (multiple, to news_article content type)

Rendering Options:
- layout: Select field with options "grid" and "list"
- show_featured: Boolean
- max_items: Number

Make this content type compatible with FastLane's modular blocks pattern so it can be added to pages.
```

3. Watch the AI execute:
   - `list_content_types` to check existing types
   - `create_content_type` with the schema

4. Show the response confirming creation

---

### Step 4: Verify in Contentstack Dashboard (30 seconds)

**Narrator Script:**
> "Let's verify this in Contentstack. I'll refresh the Content Models page, and we should see our new news_section content type."

**Actions:**
1. Switch to browser with Contentstack dashboard
2. Refresh the Content Models page
3. Click on the new `news_section` content type
4. Show the fields that were created:
   - title field
   - description field
   - news_items reference
   - layout select field
   - show_featured boolean
   - max_items number

---

### Step 5: Create Sample Entry (1 minute)

**Narrator Script:**
> "Now let's create a sample entry so we can test our component. Again, we'll use the Contentstack MCP to do this directly from the AI."

**Actions:**
1. Switch back to Cursor AI chat
2. Enter the following prompt:

```
Using the Contentstack MCP server, create a new entry for the news_section content type with:

Content:
- title: "Latest Technology News"
- description: "Stay updated with the latest developments in technology and innovation."

Rendering Options:
- layout: "grid"
- show_featured: true
- max_items: 6

Then publish the entry to the development environment.
```

3. Watch the AI execute:
   - `create_entry` with the data
   - `publish_entry` to development environment

4. Show the confirmation of entry creation and publishing

---

### Step 6: Show Entry in Dashboard (30 seconds)

**Narrator Script:**
> "And there it is in our Contentstack dashboard - the entry is created and published, ready to be rendered by our React component. From design to deployed content in about 15 minutes."

**Actions:**
1. Navigate to Entries in Contentstack dashboard
2. Filter by `news_section` content type
3. Show the newly created entry
4. Click into it to show the populated fields
5. Show the publishing status (published to development)

---

## Key Talking Points

### Content Management Automation Benefits

| Manual Approach | MCP-Powered Approach |
|-----------------|---------------------|
| Login to dashboard | Stay in IDE |
| Click through UI | Single prompt |
| Manual field creation | AI creates schema |
| Copy-paste content | AI populates data |
| Multiple clicks to publish | Automated publishing |

### Use Cases for Contentstack MCP

1. **Rapid Prototyping:** Create content types matching new components
2. **Content Migration:** Bulk create entries from external data
3. **Testing:** Generate sample entries for development
4. **Schema Updates:** Add fields to existing content types
5. **Publishing Workflows:** Automate publish/unpublish operations

---

## Available MCP Operations

### Content Type Operations

```
list_content_types     - Get all content types in stack
get_content_type       - Get specific content type schema
create_content_type    - Create new content type
update_content_type    - Modify existing content type
delete_content_type    - Remove content type
```

### Entry Operations

```
list_entries           - Get entries of a content type
get_entry              - Get specific entry by UID
create_entry           - Create new entry
update_entry           - Modify existing entry
delete_entry           - Remove entry
publish_entry          - Publish to environment
unpublish_entry        - Unpublish from environment
```

### Asset Operations

```
list_assets            - Get all assets
upload_asset           - Upload new asset
get_asset              - Get specific asset
delete_asset           - Remove asset
```

---

## Troubleshooting

### Common Issues During Demo

**Issue: MCP server not connecting**
```
Solution:
1. Verify environment variables are set
2. Check API key and management token are valid
3. Restart Cursor IDE
```

**Issue: Permission denied errors**
```
Solution:
1. Verify management token has write permissions
2. Check stack permissions for API access
3. Ensure correct region is configured
```

**Issue: Content type creation fails**
```
Solution:
1. Check if content type UID already exists
2. Verify field UIDs are valid (no spaces, lowercase)
3. Check for required field dependencies
```

---

## Demo Recovery Scripts

If something goes wrong, use these alternatives:

### Manual Content Type Creation (backup)
```
Show the content type schema that should be created:

{
  "content_type": {
    "uid": "news_section",
    "title": "News Section",
    "schema": [
      {
        "uid": "title",
        "data_type": "text",
        "display_name": "Title",
        "mandatory": true
      },
      {
        "uid": "description",
        "data_type": "json",
        "display_name": "Description",
        "field_metadata": {
          "rich_text_type": "advanced"
        }
      }
    ]
  }
}
```

### Quick Entry Creation
```
Create a test entry for news_section with sample content using the Contentstack MCP server.
```

---

## Full Demo Flow Summary

### Complete End-to-End Timeline

| Step | Duration | Tool Used | Output |
|------|----------|-----------|--------|
| 1. Design in Figma | Pre-demo | Figma | Component design |
| 2. Extract design | 2 min | Figma MCP | Design tokens, structure |
| 3. Generate component | 3 min | AI Prompt Template | React component |
| 4. Create content type | 2 min | Contentstack MCP | Content type schema |
| 5. Create entry | 1 min | Contentstack MCP | Sample content |
| 6. Test in browser | 2 min | npm run dev | Working page |

**Total Time:** ~10 minutes (vs. 2-4 hours traditionally)

---

## Post-Demo Wrap-up

**Narrator Script:**
> "We've now completed the full cycle - from Figma design to generated React component to Contentstack content type and published entry. This is the power of AI in the SDLC: not replacing developers, but amplifying their capabilities. What used to take hours now takes minutes, with consistent quality and full integration."

**Key Takeaways to Emphasize:**
1. AI tools work together seamlessly
2. Context-rich prompts produce production-ready code
3. Content management is automated, not manual
4. The developer stays in their IDE throughout
5. Quality is consistent across the team

---

## Appendix: Configuration Reference

### Environment Variables

```bash
# Required for Contentstack MCP
CONTENTSTACK_API_KEY="your_stack_api_key"
CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token"
CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token"
CONTENTSTACK_REGION="NA"  # or EU, AZURE_NA, AZURE_EU
```

### Cursor MCP Configuration

```json
{
  "mcpServers": {
    "contentstack": {
      "command": "npx",
      "args": ["@contentstack/mcp"]
    }
  }
}
```

### Getting Credentials

1. **API Key:** Contentstack Dashboard > Settings > Stack
2. **Management Token:** Settings > Tokens > Management Tokens
3. **Delivery Token:** Settings > Tokens > Delivery Tokens
4. **Region:** Check your Contentstack URL (app.contentstack.com = NA)
