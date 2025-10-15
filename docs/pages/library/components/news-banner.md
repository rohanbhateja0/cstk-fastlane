# News Banner Component

A responsive banner component designed to showcase news content with a prominent title, description, and call-to-action button.

## Figma Design Reference

[View Figma Design](https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7445&t=lMm7r1fLHRWo37EB-4)

## Overview

The News Banner component provides a visually striking way to present news content with:
- Prominent title display with customizable header tags
- Descriptive text content
- Call-to-action button with icon
- Responsive layout that adapts to different screen sizes
- Content alignment options (left, center, right)

## Component Structure

```tsx
<NewsBanner 
  newsBanner={newsBannerData} 
  page={pageData} 
/>
```

## Props

### NewsBannerProps

| Property | Type | Description |
|----------|------|-------------|
| `newsBanner` | `NewsBannerFields` | The news banner data object |
| `page` | `Page` | Page context data |

### NewsBannerFields

| Property | Type | Description |
|----------|------|-------------|
| `content` | `NewsBannerContent` | Main content data |
| `rendering_options` | `NewsBannerRenderingOptions` | Display and layout options |
| `call_to_action` | `CTAFields` | Call-to-action configuration |
| `$` | `any` | Visual Builder parameters |

### NewsBannerContent

| Property | Type | Description |
|----------|------|-------------|
| `title` | `string` | Main banner title |
| `description` | `string` | Banner description text |
| `detail_text` | `string` | Additional detailed text content |
| `image` | `CMSImageField` | Banner image |
| `$` | `any` | Visual Builder parameters |

### NewsBannerRenderingOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `header_tag` | `string` | `"h2"` | HTML header tag (H1-H6) |
| `link_type` | `string` | `"Button"` | Link display type (Button, Card, Link) |
| `content_alignment` | `string` | `"left"` | Content alignment (left, center, right) |
| `$` | `any` | - | Visual Builder parameters |

## ContentStack Integration

### Content Type: `news_banner`

#### Content Fields

**Title Group:**
- `title`: Single-Line Text - Main banner title

**Content Group:**
- `description`: Single-Line Text - Banner description
- `detail_text`: Rich Text - Additional detailed content
- `image`: Image - Banner image

**Call to Action Group:**
- `subscribe_link`: General Link (optional) - Primary action button
- `secondary_link`: General Link (optional) - Secondary action button

**Rendering Options Group:**
- `header_tag`: Dropdown (H1-H6) - HTML header tag selection
- `link_type`: Dropdown (Button, Card, Link) - Link display type
- `content_alignment`: Dropdown (left, center, right) - Content alignment

## Design System

### Typography
- **Title**: Zodiak Bold, 36px, line-height 36px, tracking -0.4px
- **Description**: Zodiak Regular, 16px, line-height 24px
- **Button Text**: Satoshi Medium, 14px, line-height 20px

### Colors
- **Background**: Sky-950 (#082f49)
- **Title Text**: Zinc-900 (#18181b)
- **Description Text**: Zinc-900 (#18181b)
- **Button Background**: Sky-900 (#0c4a6e)
- **Button Text**: Neutral-50 (#fafafa)
- **Border**: Zinc-300 (#d4d4d8)

### Spacing
- **Container Padding**: 48px (desktop), 24px (tablet), 16px (mobile)
- **Content Gap**: 32px between elements
- **Button Padding**: 12px horizontal, 8px vertical

### Layout
- **Max Width**: 700px for content section
- **Image Size**: 314px × 177px
- **Border Radius**: 6px for buttons and images

## Usage Examples

### Basic Usage

```tsx
import NewsBanner from '@/components/NewsBanner';

const newsBannerData = {
  content: {
    title: "Recent News",
    description: "Stay updated with the latest developments and announcements.",
    detail_text: "",
    image: {
      url: "/images/news-banner.jpg",
      filename: "news-banner.jpg",
      alt: "News banner image"
    }
  },
  rendering_options: {
    header_tag: "h2",
    link_type: "Button",
    content_alignment: "left"
  },
  call_to_action: {
    link: {
      title: "Subscribe to receive news posts",
      href: "/subscribe"
    }
  }
};

<NewsBanner newsBanner={newsBannerData} page={pageData} />
```

### With Custom Alignment

```tsx
const newsBannerData = {
  // ... content data
  rendering_options: {
    header_tag: "h1",
    link_type: "Button",
    content_alignment: "center"
  }
  // ... rest of data
};
```

## Responsive Behavior

- **Desktop**: Full layout with image on the right
- **Tablet**: Adjusted spacing and sizing
- **Mobile**: Stacked layout with optimized spacing

## Accessibility Features

- Semantic HTML structure with proper heading hierarchy
- Alt text support for images
- Keyboard navigation support
- Screen reader friendly content structure
- Proper color contrast ratios

## Performance Considerations

- Optimized image loading with Next.js Image component
- Efficient re-rendering with React.memo patterns
- Minimal bundle size impact

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [News Section](./news-section.md) - For displaying multiple news items
- [Hero Banner](./hero-banner.md) - For main page banners
- [Content Card](./content-card.md) - For individual content items
