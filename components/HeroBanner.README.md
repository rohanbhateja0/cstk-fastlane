# HeroBanner Component

A full-screen hero banner component with background image support, content alignment options, and overlay controls for enhanced readability.

## Features

- **Full-screen hero layout** with background image support
- **Multiple content alignment options** (left, center, right)
- **Overlay support** with opacity controls for text readability
- **Responsive design** with mobile-first approach
- **Call-to-action button** support
- **ContentStack CMS integration** with proper field rendering
- **Accessibility features** including semantic HTML and keyboard navigation

## Component Structure

```
HeroBanner
├── Background Image (optional)
├── Overlay (optional, based on settings)
└── Content Container
    ├── Subtitle (optional)
    ├── Title (required)
    ├── Description (optional, rich text)
    └── Call to Action (optional)
```

## Props

### HeroBannerProps

| Property | Type | Description |
|----------|------|-------------|
| `heroBanner` | `HeroBannerFields` | The hero banner data from ContentStack |
| `page` | `Page` | The current page data |

### HeroBannerFields

| Property | Type | Description |
|----------|------|-------------|
| `content` | `HeroBannerContent` | The main content data |
| `rendering_options` | `HeroBannerRenderingOptions` | Rendering configuration |
| `$` | `any` | ContentStack metadata |

### HeroBannerContent

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Main heading text |
| `subtitle` | `string` | No | Optional subtitle text |
| `description` | `string` | No | Optional description (rich text) |
| `background_image` | `CMSImageField` | Yes | Background image |
| `call_to_action` | `CMSLinkField` | No | Optional CTA button |

### HeroBannerRenderingOptions

| Parameter | Type | Options | Default | Description |
|-----------|------|---------|---------|-------------|
| `content_alignment` | `string` | left, center, right | center | Content alignment |
| `background_overlay` | `string` | true/false | false | Enable background overlay |
| `overlay_opacity` | `string` | light, medium, dark | medium | Overlay opacity level |

## Usage Examples

### Basic Usage

```tsx
import HeroBanner from '@/components/HeroBanner';

const MyPage = () => {
  const heroData = {
    content: {
      title: "Welcome to Our Platform",
      background_image: {
        url: "/hero-bg.jpg",
        filename: "Hero background",
        height: 1080,
        width: 1920,
        $: {}
      },
      $: {}
    },
    rendering_options: {
      content_alignment: "center",
      background_overlay: "true",
      overlay_opacity: "medium",
      $: {}
    },
    $: {}
  };

  return (
    <HeroBanner 
      heroBanner={heroData} 
      page={pageData} 
    />
  );
};
```

### With All Fields

```tsx
const fullHeroData = {
  content: {
    title: "Revolutionary Solutions",
    subtitle: "Innovation at its finest",
    description: "Discover our cutting-edge technology that will transform your business.",
    background_image: {
      url: "/tech-bg.jpg",
      filename: "Technology background",
      height: 1080,
      width: 1920,
      $: {}
    },
    call_to_action: {
      title: "Get Started",
      href: "/get-started",
      $: {}
    },
    $: {}
  },
  rendering_options: {
    content_alignment: "left",
    background_overlay: "true",
    overlay_opacity: "dark",
    $: {}
  },
  $: {}
};
```

## ContentStack Integration

The component is fully integrated with ContentStack CMS and will automatically render based on the content structure defined in your ContentStack stack.

### Content Type Structure

When setting up your ContentStack content type, use this structure:

```
Hero Banner Content Type
├── Title (Single Line Textbox) - Required
├── Subtitle (Single Line Textbox) - Optional
├── Description (RTE) - Optional
├── Background Image (File) - Required
├── Call to Action (Link) - Optional
└── Rendering Options
    ├── Content Alignment (Dropdown: left, center, right)
    ├── Background Overlay (Checkbox)
    └── Overlay Opacity (Dropdown: light, medium, dark)
```

## Styling

The component uses Tailwind CSS classes and follows the design system tokens:

- **Text Colors**: `text-white`, `text-white/90`
- **Background**: `bg-primary`, `bg-black/20`, `bg-black/40`, `bg-black/60`
- **Spacing**: Responsive padding and margins
- **Typography**: Responsive text sizing from mobile to desktop

## Responsive Behavior

- **Mobile**: Content stacks vertically with appropriate spacing
- **Tablet**: Maintains alignment while adjusting text sizes
- **Desktop**: Full-width layout with optimal text scaling

## Accessibility

- Semantic HTML structure with proper heading hierarchy
- High contrast text on overlay backgrounds
- Keyboard navigation support for interactive elements
- Screen reader friendly content structure
- Focus management for CTA buttons

## Best Practices

1. **Image Optimization**: Use high-quality images optimized for web
2. **Text Contrast**: Always use overlay when text readability is compromised
3. **Content Length**: Keep titles concise and descriptions scannable
4. **Call-to-Action**: Use clear, action-oriented button text
5. **Mobile First**: Test on mobile devices to ensure proper responsive behavior

## Component Variants

The component supports multiple variants through the rendering options:

- **Default**: Center-aligned with medium overlay
- **Left Aligned**: Content aligned to the left
- **Right Aligned**: Content aligned to the right
- **With Overlay**: Background overlay enabled
- **Without Overlay**: No background overlay
- **Light Overlay**: 20% black overlay
- **Medium Overlay**: 40% black overlay (default)
- **Dark Overlay**: 60% black overlay
