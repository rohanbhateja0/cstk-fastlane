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

2. **Use the helper function `syncContentTypeOrGlobalField` from `lib/syncContentTypeOrGlobalField.ts`**.  
   This helper automatically:
   - Updates the Content Type if it exists
   - Falls back to updating the corresponding Global Field if the Content Type does not exist
   - Creates a new Content Type if neither exists

3. Prefilled schema & options:

```ts
import { syncContentTypeOrGlobalField } from '@/lib/syncContentTypeOrGlobalField';

const schema = [
  { display_name: "Title", uid: "title", data_type: "text", mandatory: true },
  { display_name: "Category", uid: "category", data_type: "text" },
  { display_name: "IntroText", uid: "intro_text", data_type: "rich_text" },
  { display_name: "Icon", uid: "icon", data_type: "file" },
  { display_name: "Image", uid: "image", data_type: "file" },
  { display_name: "CalltoActionLinkMain", uid: "cta_main", data_type: "link" },
  { display_name: "CalltoActionLinkSecondary", uid: "cta_secondary", data_type: "link" },
  // New fields for this enhancement
  { display_name: "Hide Image", uid: "hide_image", data_type: "boolean", field_metadata: { default_value: false } },
  { display_name: "Hide Border", uid: "hide_border", data_type: "boolean", field_metadata: { default_value: false } },
  { display_name: "Use Title As Link Text", uid: "use_title_as_link_text", data_type: "boolean", field_metadata: { default_value: false } },
  { display_name: "Swap Image", uid: "swap_image", data_type: "boolean", field_metadata: { default_value: false } },
];

const options = {
  title: "title",
  publishable: true,
  is_page: false,
  singleton: false
};

// Apply the Contentstack update
await syncContentTypeOrGlobalField("content_card", schema, options);
4. Ensure that existing content entries are preserved and not broken.

5. Validate that the new fields appear in Contentstack UI and the component renders correctly.


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
