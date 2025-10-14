# Example: Enhance ContentCard Component

This is an example of how to use the [Enhance Existing Component Prompt Template](../templates/enhance-existing-component.md) for adding features to the ContentCard component.

## Prompt Used

```markdown
# Enhance ContentCard Component from Figma Design

## ENHANCEMENT TASK - READ FIRST
You are enhancing the EXISTING ContentCard component, not creating a new one.

CRITICAL: Ensure ALL Figma variants are accounted for in all of the options available
CRITICAL: FIRST!!!! use the Figma MCP Server to explore the designs. The Figma Design Reference links are in the @content-card.md file
CRITICAL: For each Figma URL, execute the figma mcp server tool get_code
 
Files to analyze:
- @ContentCard.tsx  (main wrapper)
- Any sub-components used by ContentCard
 
New features to add:
1. verticalwide orientation option
2. HideImage boolean parameter  
3. HideBorder boolean parameter
4. UseTitleAsLinkText parameter
5. SwapImage parameter

## CONTENTSTACK INTEGRATION
Whenever new props/fields are added:
1. Map each new prop to a Contentstack field:
   - `HideImage` → `hide_image` (Boolean)
   - `HideBorder` → `hide_border` (Boolean)
   - `UseTitleAsLinkText` → `use_title_as_link_text` (Boolean)
   - `SwapImage` → `swap_image` (Boolean)

2. Start ContentStack MCP server (PowerShell example):

$env:CONTENTSTACK_API_KEY="your_api_key_here"
$env:CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token_here"
$env:CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token_here"
npx -y @contentstack/mcp

3. Confirm Content Type UID
Verify the content type you want to update exists:
UID: content_card
Check this through the MCP server call get_a_single_content_type or get_a_single_global_field

4. Validate that the new fields appear in Contentstack UI and the component renders correctly based on the response of the above MCP server calls.

5. Integrate in enhance_content_card Prompt
Detect if Content Type exists using above MCP server calls
Else, generate a scheme to update the global field through API using the route /api/contentstack and pass appropriate parameters and schema.
Preserve existing fields.

6. Verify the updated global field via MCP commands in Cursor.

PRESERVE all existing functionality while adding these enhancements.

CRITICAL: Follow guidelines @core-requirements.md documentation.
CRITICAL: Reference the documentation for the ContentCard component at @content-card.md
```

## Context

This example demonstrates enhancing an existing content card component with:
- **New Orientation**: Adding `verticalwide` to existing orientation options
- **Visibility Controls**: Hide image and border options for flexible layouts
- **UX Enhancement**: Using title as link text for better accessibility
- **Layout Control**: Swapping image and content positions

The key aspects of this enhancement:
- **Preserve Existing**: All current orientations (vertical, horizontal-flex, horizontal-equal) remain unchanged
- **Add New Features**: Five new parameters that extend capabilities
- **Component Analysis**: AI analyzes main wrapper and discovers sub-components automatically
- **Backward Compatible**: All existing content continues working exactly as before

## Implementation Notes

This enhancement required:
1. **ContentStack Changes**: Added new parameters to rendering definition
2. **Type Updates**: Extended interfaces for new parameters 
3. **Logic Integration**: Added new conditional logic alongside existing patterns
4. **Component Discovery**: AI automatically found and updated CardItem.tsx and ContentCardBtn.tsx
5. **Documentation Updates**: Added new features to component documentation with Figma references
