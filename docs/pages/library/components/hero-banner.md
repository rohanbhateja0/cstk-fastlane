# HeroBanner Component

A full-screen hero banner component with background image support, content alignment options, and overlay controls for enhanced readability.

## Figma Design Reference

- **Design URL**: https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=16847-18910&m=dev
- **Component Name**: Content Section - With Image

## Features

- Full-screen hero layout with background image support
- Multiple content alignment options (left, center, right)
- Overlay support with opacity controls for text readability
- Responsive text scaling and layout adaptation
- Call-to-action button support
- Sitecore Content SDK integration

## Parameters

| Parameter | Type | Options | Default | Description |
|-----------|------|---------|---------|-------------|
| ContentAlignment | Droplist | left, center, right | center | Controls the horizontal alignment of content |
| BackgroundOverlay | Checkbox | true/false | false | Enables background overlay for better text readability |
| OverlayOpacity | Droplist | light, medium, dark | medium | Controls the opacity of the background overlay |

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Title | Single-Line Text | Yes | Main heading text for the hero banner |
| Subtitle | Single-Line Text | No | Optional subtitle text displayed above the title |
| Description | Rich Text | No | Optional description text displayed below the title |
| BackgroundImage | Image | Yes | Background image for the hero banner |
| CallToAction | General Link | No | Optional call-to-action button link |

## Usage Examples

### Basic Hero Banner
```typescript
// Default center-aligned hero banner
<HeroBanner
  fields={{
    Title: { value: "Welcome to Our Platform" },
    BackgroundImage: { value: { src: "/hero-bg.jpg", alt: "Hero background" } }
  }}
  params={{
    ContentAlignment: "center"
  }}
/>
```

### Hero Banner with Overlay
```typescript
// Hero banner with dark overlay for better text contrast
<HeroBanner
  fields={{
    Title: { value: "Revolutionary Solutions" },
    Subtitle: { value: "Innovation at its finest" },
    Description: { value: "Discover our cutting-edge technology" },
    BackgroundImage: { value: { src: "/tech-bg.jpg", alt: "Technology background" } },
    CallToAction: { value: { href: "/learn-more", text: "Learn More" } }
  }}
  params={{
    ContentAlignment: "left",
    BackgroundOverlay: "1",
    OverlayOpacity: "dark"
  }}
/>
```

### Right-Aligned Hero Banner
```typescript
// Right-aligned hero banner with light overlay
<HeroBanner
  fields={{
    Title: { value: "Your Success Story" },
    BackgroundImage: { value: { src: "/success-bg.jpg", alt: "Success background" } },
    CallToAction: { value: { href: "/get-started", text: "Get Started" } }
  }}
  params={{
    ContentAlignment: "right",
    BackgroundOverlay: "1",
    OverlayOpacity: "light"
  }}
/>
```

## Responsive Behavior

- **Mobile**: Content stacks vertically with appropriate spacing
- **Tablet**: Maintains alignment while adjusting text sizes
- **Desktop**: Full-width layout with optimal text scaling

## Accessibility Features

- Semantic HTML structure with proper heading hierarchy
- High contrast text on overlay backgrounds
- Keyboard navigation support for interactive elements
- Screen reader friendly content structure

## Design Tokens

The component uses semantic design tokens from the project's design system:

- `text-white` for primary text color
- `text-white/90` for secondary text color
- `bg-primary` for button background
- `text-primary-foreground` for button text
- Overlay opacity classes: `bg-black/20`, `bg-black/40`, `bg-black/60`

## Sitecore Integration

- Fully compatible with Sitecore Content SDK
- Supports page mode detection (editing, preview, normal)
- Uses `withDatasourceCheck()` for proper datasource validation
- Integrates with Sitecore's styling system via `styles` parameter

## Component Variants

The component exports multiple variants for different use cases:

- `Default`: Standard hero banner
- `WithOverlay`: Hero banner with background overlay
- `LeftAligned`: Left-aligned content variant
- `RightAligned`: Right-aligned content variant

## Best Practices

1. **Image Optimization**: Use high-quality images optimized for web
2. **Text Contrast**: Always use overlay when text readability is compromised
3. **Content Length**: Keep titles concise and descriptions scannable
4. **Call-to-Action**: Use clear, action-oriented button text
5. **Mobile First**: Test on mobile devices to ensure proper responsive behavior
