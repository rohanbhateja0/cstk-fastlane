# News Section

## Summary

The News Section component is a flexible, responsive grid-based component designed to display news articles and content in an organized, visually appealing layout. It supports multiple content alignment options, responsive design across mobile, tablet, and desktop devices, and provides extensive customization options for layout and styling.

## Implementation Overview

The NewsSection component features:
- **Responsive Grid Layout**: Automatically adjusts from 1 column on mobile to 4 columns on desktop
- **Flexible Content Structure**: Supports title, description, detailed text, and images
- **Multiple Layout Options**: Configurable image positioning and content alignment
- **Advanced Styling**: Customizable borders, spacing, and visual effects
- **Call-to-Action Support**: Primary and secondary action buttons with flexible display options

## Figma Design References

- [News Section Design 1](https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7448&m=dev)
- [News Section Design 2](https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7447&m=dev)

## Field Details

**Content Type:** News Section  
**Content Type UID:** `news_section`

### Content Group

| Field Name | ContentStack Field Type | Description |
|------------|------------------------|-------------|
| Title | Text | The main headline for the news item |
| Description | Text | Brief description or summary of the news content |
| Detail Text | Rich Text | Detailed content with rich text formatting support |
| Image | File | Main image associated with the news item |

### Call to Action Group

| Field Name | ContentStack Field Type | Description |
|------------|------------------------|-------------|
| Link | Link | Primary call-to-action button or link |
| Secondary Link | Link | Optional secondary action button or link |

### Rendering Options Group

| Field Name | ContentStack Field Type | Description |
|------------|------------------------|-------------|
| Image Order | Dropdown | Position of image relative to content (left, right) |
| Header Tag | Dropdown | HTML heading level (H1-H6) |
| Link Type | Dropdown | Display style for call-to-action (Button, Card, Link) |
| Colspan | Dropdown | Number of grid columns to span (1-11) |
| Hide Image | Boolean | Option to hide the image |
| Hide Border | Boolean | Option to hide the card border |
| Use Title As Link Text | Boolean | Use title as link text instead of link title |
| Swap Image | Boolean | Option to swap with alternative image |

## Responsive Behavior

The component automatically adapts to different screen sizes:

- **Mobile (default)**: 1 column layout
- **Tablet (md)**: 2 columns
- **Desktop (lg)**: 3 columns  
- **Large Desktop (xl)**: 4 columns

## Usage Examples

### Basic News Section
```tsx
<NewsSection
  newsSection={{
    content: {
      title: "Breaking News: Technology Advances",
      description: "Latest developments in AI and machine learning",
      detail_text: "<p>Detailed content about the news story...</p>",
      image: {
        url: "/images/news-image.jpg",
        alt: "News image"
      },
      $: {}
    },
    rendering_options: {
      image_order: "left",
      header_tag: "h2",
      link_type: "Button",
      colspan: "1",
      hide_image: false,
      hide_border: false,
      use_title_as_link_text: false,
      swap_image: false,
      $: {}
    },
    call_to_action: {
      link: {
        href: "/news/article-1",
        title: "Read More",
        $: {}
      },
      secondary_link: {
        href: "/news/category",
        title: "View All News",
        $: {}
      },
      $: {}
    },
    $: {}
  }}
/>
```

### Card Layout with Right Image
```tsx
<NewsSection
  newsSection={{
    content: {
      title: "Industry Insights",
      description: "Expert analysis on market trends",
      detail_text: "<p>Comprehensive analysis...</p>",
      image: { url: "/images/insights.jpg", alt: "Insights" },
      $: {}
    },
    rendering_options: {
      image_order: "right",
      header_tag: "h3",
      link_type: "Card",
      colspan: "2",
      hide_image: false,
      hide_border: true,
      use_title_as_link_text: true,
      swap_image: false,
      $: {}
    },
    call_to_action: {
      link: { href: "/insights", title: "Learn More", $: {} },
      $: {}
    },
    $: {}
  }}
/>
```

## Styling and Customization

### CSS Classes
The component uses Tailwind CSS classes for styling:
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` - Responsive grid
- `bg-white rounded-lg shadow-sm hover:shadow-md` - Card styling
- `transition-shadow duration-300` - Hover effects
- `object-cover rounded-t-lg` - Image styling

### Customization Options
- **Border Control**: Use `hide_border` to remove card borders
- **Image Positioning**: Control image placement with `image_order`
- **Link Styling**: Choose between Button, Card, or Link display types
- **Grid Spanning**: Control how many columns each item spans
- **Content Hierarchy**: Set appropriate heading levels for SEO

## Accessibility Features

- Semantic HTML structure with proper heading hierarchy
- Alt text support for images
- Keyboard navigation support for links
- Screen reader friendly content structure
- Focus management for interactive elements

## Performance Considerations

- Images are optimized with Next.js Image component
- Responsive image sizing with appropriate `sizes` attribute
- Lazy loading support for images
- Efficient CSS transitions and animations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works across all device sizes
- Graceful degradation for older browsers
