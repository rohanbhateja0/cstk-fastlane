# Example: Create Card Listing Component

This is an example of how to use the [Create Component Prompt Template](../templates/create-component.md) for a Card Listing component.

## Prompt Used

```markdown
# Create Card Listings Component from Figma Design

## Figma Design References
https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=17600-3669&m=dev

## COMPONENT CREATION TASK - READ FIRST
You are creating a NEW Card Listing component from scratch based on Figma designs.

CRITICAL: Ensure ALL Figma variants are accounted for in all of the options available
CRITICAL: FIRST!!!! use the Figma MCP Server to explore the designs. 
CRITICAL: For each Figma URL, execute the figma mcp server tool get_code , get_screenshot, get_metadata and all required function

IMPORTANT: The expectation is that the developer is running `npm run dev` while this prompt is being executed

## Component Information
**Component Name:** CardListing
**File Location:** `/components/CardListing.tsx`
**Documentation:** `docs/pages/library/components/cardlisting.md`

## Implementation Requirements

### Required Features:
- Responsive grid layout with flexible card arrangement
- Card hover effects and interactions
- Consistent card sizing and spacing
- Mobile-responsive design with proper breakpoints
- CTA field click should navigate to the detail page


### Required Parameters:
- CardsPerRow: Number (desktop: 4, tablet: 2, mobile: 1)
- ShowCardBorders: Checkbox for card border visibility
- CardSpacing: Number (default: 16px)

### Required Fields:
- Title: Single-Line Text (optional)
- Description: Rich Text (optional)
- Cards: Reference to content_card global field entries

### Card Content Fields (content_card global field - available):
**Content Group:**
- Title: Single-Line Text (optional) - Main card title
- Category: Single-Line Text (optional) - Can be used as earmark/tag
- Intro Text: Rich Text (optional) - Card description text
- Image: Image (optional) - Card featured image
- Icon: Image (optional) - Card icon

**Call to Action Group:**
- Link: General Link (optional) - Primary action button
- Secondary Link: General Link (optional) - Secondary action button

**Rendering Options Group:**
- Card Orientation: Dropdown (Horizontal Equal, Horizontal Flex, Vertical, Vertical Wide)
- Image Order: Dropdown (left, right)
- Header Tag: Dropdown (H1-H6)
- Link Type: Dropdown (Button, Card, Link)
- Colspan: Dropdown (2-11)
- Hide Image: Boolean
- Hide Border: Boolean
- Use Title As Link Text: Boolean
- Swap Image: Boolean

### Design System Variables:
- Font Family: Satoshi (sans-serif), Zodiak (serif)
- Typography: 
  - Earmark: Satoshi Medium, 14px, line-height 20px
  - Title: Satoshi Bold, 24px, line-height normal, tracking -0.4px
  - Description: Satoshi Regular, 14px, line-height 20px
- Colors: 
  - Card Background: White
  - Card Border: Zinc-300
  - Text Primary: Zinc-950
  - Text Secondary: Zinc-500
  - Button Border: Zinc-200
- Spacing: 16px gaps, 24px padding, 48px container padding
- Border Radius: 8px for cards, 6px for buttons and images

CRITICAL: Follow guidelines @core-requirements.md documentation.
```

## Context

This example demonstrates creating a responsive card listing component with:
- Grid-based layout with flexible card arrangement
- Consistent card design and spacing
- Responsive breakpoints for different screen sizes
- Accessibility features

The key aspects customized from the template:
- **Component Name**: CardListing
- **Features**: Grid layout, card management, responsive design
- **Fields**: Card content with earmark, title, description, image, and CTA
- **Accessibility**: Proper semantic markup and keyboard navigation

## Implementation Notes

The card listing component should handle:
1. **Grid Layout**: Responsive grid with configurable cards per row
2. **Card Management**: Dynamic rendering based on content entries
3. **Responsive Design**: Different card counts per breakpoint (4/2/1)
4. **Card Structure**: Consistent layout with earmark, title, description, image, and CTA
5. **Accessibility**: Proper semantic markup, alt text, and keyboard navigation
6. **Performance**: Optimized rendering and image loading
7. **Design System**: Consistent typography, colors, and spacing

## Content stack sdk improvements
- Each field should have the edit tags for example  {...(call_to_action.$?.title ?? {})} is added for cta field
- 'use client'; on top of the component file if useState hook is needed
- Add the component to the (@components\render-components.tsx)
- use (@helper\index.js) to create the getentry funtion in case of reference is used