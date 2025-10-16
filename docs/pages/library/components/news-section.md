# News Section Component

A responsive news section component that displays multiple news articles in a vertical list layout, designed to match the Figma design specifications.

## Overview

The News Section component displays a collection of news articles with consistent styling and layout. Each news card features an image, title, description, and call-to-action button, following the design system specifications.

## Design System

### Typography
- **Earmark**: Satoshi Medium, 14px, line-height 20px
- **Title**: Satoshi Bold, 24px, line-height normal, tracking -0.4px
- **Description**: Satoshi Regular, 16px, line-height 24px

### Colors
- **Card Background**: White (#ffffff)
- **Card Border**: Zinc-300 (#d4d4d8)
- **Text Primary**: Zinc-950 (#0a0a0a)
- **Text Secondary**: Zinc-500 (#71717a)
- **Button Border**: Zinc-200 (#e4e4e7)

### Spacing
- **Card Padding**: 24px
- **Container Padding**: 48px
- **Gap Between Cards**: 16px
- **Image Width**: 314px
- **Image Height**: 177px

### Border Radius
- **Cards**: 8px
- **Images**: 6px
- **Buttons**: 6px

## Component Structure

```tsx
<NewsSection 
  newsSection={newsSectionData} 
  page={pageData} 
/>
```

## Props

### NewsSectionProps

| Property | Type | Description |
|----------|------|-------------|
| `newsSection` | `NewsSectionFields` | The news section data from Contentstack |
| `page` | `Page` | Page data for context |

### NewsSectionFields

| Property | Type | Description |
|----------|------|-------------|
| `content` | `NewsSectionContent` | Main content fields |
| `rendering_options` | `NewsSectionRenderingOptions` | Display and layout options |
| `call_to_action` | `CTAFields` | Call-to-action configuration |

### NewsSectionContent

| Property | Type | Description |
|----------|------|-------------|
| `title` | `string` | News section title |
| `description` | `string` | News section description |
| `detail_text` | `string` | Rich text content |
| `image` | `CMSImageField` | Featured image |

### NewsSectionRenderingOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `image_order` | `'left' \| 'right'` | `'left'` | Image position relative to content |
| `header_tag` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h2'` | HTML heading tag for titles |
| `link_type` | `'Button' \| 'Card' \| 'Link'` | `'Button'` | Call-to-action display type |
| `colspan` | `string` | `'1'` | Grid column span (1-11) |

## Content Type Schema

The News Section component uses the `news_section` content type with the following schema:

### Fields

1. **Title** (Text, Required)
   - Single-line text field for the news section title

2. **Description** (Text, Optional)
   - Single-line text field for the news section description

3. **Detail Text** (Rich Text, Optional)
   - Rich text field for detailed content

4. **Image** (File, Optional)
   - Image field for the featured image

5. **Call to Action** (Group, Optional)
   - **Link** (Link, Optional): Primary action button
   - **Secondary Link** (Link, Optional): Secondary action button

6. **Rendering Options** (Group, Optional)
   - **Image Order** (Select): Left or Right positioning
   - **Header Tag** (Select): H1-H6 heading tags
   - **Link Type** (Select): Button, Card, or Link display
   - **Colspan** (Select): Grid column span (1-11)

## Usage Examples

### Basic News Section

```tsx
const newsSectionData = {
  content: {
    title: "Recent News",
    description: "Stay updated with our latest news and announcements",
    detail_text: "<p>Additional content here</p>",
    image: {
      url: "https://example.com/image.jpg",
      alt: "News image"
    }
  },
  rendering_options: {
    image_order: "left",
    header_tag: "h2",
    link_type: "Button",
    colspan: "1"
  },
  call_to_action: {
    link: {
      href: "/news",
      title: "Read More"
    }
  }
};

<NewsSection newsSection={newsSectionData} page={pageData} />
```

### Right-aligned Image

```tsx
const newsSectionData = {
  // ... other fields
  rendering_options: {
    image_order: "right",
    header_tag: "h3",
    link_type: "Link",
    colspan: "2"
  }
};
```

## Responsive Behavior

The News Section component is designed to be responsive:

- **Desktop**: Full-width layout with proper spacing
- **Tablet**: Maintains layout with adjusted spacing
- **Mobile**: Stacks content vertically with optimized spacing

## Accessibility Features

- Semantic HTML structure with proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- Screen reader friendly markup
- Proper color contrast ratios

## Design System Integration

The component follows the established design system:

- Uses Satoshi font family for consistent typography
- Implements zinc color palette for text and borders
- Follows 8px grid system for spacing
- Maintains consistent border radius values
- Uses proper focus states and hover effects

## Contentstack Integration

The component integrates with Contentstack CMS:

- Supports live preview with edit tags
- Handles content references and relationships
- Implements proper field validation
- Supports multi-locale content

## Figma Design References

- [Main News Section Design](https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7447&t=lMm7r1fLHRWo37EB-4)
- [Individual News Card](https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7448&m=dev)
- [Top Section Header](https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7445&t=lMm7r1fLHRWo37EB-4)

## Development Notes

- Component uses 'use client' directive for client-side functionality
- Implements proper TypeScript types for all props
- Includes proper error handling and fallbacks
- Optimized for performance with proper image sizing
- Follows Next.js best practices for image optimization