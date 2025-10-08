# Example: Create Carousel Component

This is an example of how to use the [Create Component Prompt Template](../templates/create-component.md) for a Carousel component.

## Prompt Used

```markdown
# Create Carousel Component from Figma Design

## Figma Design Referencess
https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=15709-1974&m=dev
https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=15709-2000&m=dev

## COMPONENT CREATION TASK - READ FIRST
You are creating a NEW Carousel component from scratch based on Figma designs.

CRITICAL: Ensure ALL Figma variants are accounted for in all of the options available
CRITICAL: FIRST!!!! use the Figma MCP Server to explore the designs. 
CRITICAL: For each Figma URL, execute the figma mcp server tool get_code

IMPORTANT: The expectation is that the developer is running `npm run dev` while this prompt is being executed

## Component Information
**Component Name:** Carousel
**File Location:** `src/components/Carousel.tsx`
**Documentation:** `docs/pages/library/components/carousel.md`

## Implementation Requirements

### Required Features:
- Responsive carousel layout with multiple slide support
- Navigation controls (dots indicators)
- Touch/swipe support for mobile devices

### Required Parameters:
- ShowNavigation: Checkbox for navigation buttons
- ShowDots: Checkbox for dot indicators

### Required Fields:
- Title: Single-Line Text (optional)
- Description: Rich Text (optional)
- Slides: Reference to carousel slides content type entries

### Slide Content Fields:
- Title: Single-Line Text (optional)
- Tag: Single-Line Text (optional)
- Description: Rich Text (optional)
- Image: Image (required)
- CallToAction1: General Link (optional)
- CallToAction2: General Link (optional)

CRITICAL: Follow guidelines @core-requirements.md documentation.
```

## Context

This example demonstrates creating a responsive carousel component with:
- Navigation controls and indicators
- Touch/swipe support
- Smooth transitions
- Accessibility features

The key aspects customized from the template:
- **Component Name**: Carousel
- **Features**: Slide management, navigation, touch support
- **Fields**: Carousel content and slide-specific fields
- **Accessibility**: Keyboard navigation, screen reader support

## Implementation Notes

The carousel component should handle:
1. **Slide Management**: Dynamic rendering based on content
2. **Navigation**: Previous/next buttons and dot indicators
4. **Responsive Design**: Different slide counts per breakpoint
5. **Touch Support**: Swipe gestures for mobile devices
6. **Accessibility**: Keyboard navigation and ARIA labels
7. **Performance**: Optimized rendering and smooth animations

## Content stack sdk improvements
- Each field should have the edit tags for example  {...(call_to_action.$?.title ?? {})} is added for cta field
- 'use client'; on top of the component file if useState hook is needed
- Add the component to the (@components\render-components.tsx)
- use (@helper\index.js) to create the getentry funtion in case of reference is used