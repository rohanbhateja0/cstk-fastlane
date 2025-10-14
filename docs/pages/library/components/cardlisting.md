# Card Listing Component

A responsive grid component that displays multiple content cards in a flexible layout. Based on the Figma design, this component supports various card orientations, responsive breakpoints, and comprehensive rendering options.

## Features

- **Responsive Grid Layout**: Configurable cards per row for desktop, tablet, and mobile
- **Flexible Card Orientations**: Vertical, Horizontal Equal, Horizontal Flex, and Vertical Wide
- **Rich Content Support**: Title, category, description, image, and icon support
- **Multiple CTA Options**: Primary and secondary call-to-action buttons
- **Comprehensive Rendering Options**: Image order, header tags, link types, and more
- **Accessibility**: Proper semantic markup and keyboard navigation

## Usage

The Card Listing component is used to display collections of content cards in a grid format. It's particularly useful for:

- News article listings
- Product showcases
- Team member directories
- Feature highlights
- Blog post collections

## Component Structure

### Main Fields

- **Title**: Optional section title
- **Description**: Optional section description (rich text)
- **Cards**: Array of content cards using the `content_card` global field

### Card Content Fields

Each card includes:

**Content Group:**
- **Title**: Main card title
- **Category**: Optional tag/label (used as earmark in Figma design)
- **Intro Text**: Card description (rich text)
- **Image**: Featured image with 16:9 aspect ratio
- **Icon**: Optional card icon

**Call to Action Group:**
- **Link**: Primary action button
- **Secondary Link**: Secondary action button

**Rendering Options Group:**
- **Card Orientation**: Layout direction (Vertical, Horizontal Equal, Horizontal Flex, Vertical Wide)
- **Image Order**: Image position (left, right)
- **Header Tag**: HTML heading level (H1-H6)
- **Link Type**: CTA display type (Button, Card, Link)
- **Colspan**: Grid column span (2-11)
- **Hide Image**: Boolean to hide card image
- **Hide Border**: Boolean to hide card border
- **Use Title As Link Text**: Boolean for title-based links
- **Swap Image**: Boolean for image swapping

## Responsive Behavior

The component automatically adjusts the number of cards per row based on screen size:

- **Mobile**: 1 card per row (default)
- **Tablet**: 2 cards per row (default)
- **Desktop**: 4 cards per row (default)

These values can be customized through the rendering options.

## Design System Integration

The component follows the established design system:

- **Typography**: Satoshi font family with proper weight hierarchy
- **Colors**: Zinc color palette for text and borders
- **Spacing**: Consistent 16px gaps and 24px padding
- **Border Radius**: 8px for cards, 6px for buttons and images
- **Shadows**: Subtle card shadows for depth

## Accessibility Features

- Semantic HTML structure with proper heading hierarchy
- Keyboard navigation support
- Screen reader friendly markup
- Alt text support for images
- Focus management for interactive elements

## Examples

### Basic Card Listing

```tsx
<CardListing
  cardListing={{
    title: "Latest Articles",
    description: "Stay updated with our latest insights",
    cards: [
      {
        content: {
          title: "Article Title",
          category: "Technology",
          intro_text: "Article description...",
          image: { /* image data */ }
        },
        call_to_action: {
          link: { title: "Read More", href: "/article" }
        },
        rendering_options: {
          card_orientation: "Vertical",
          link_type: "Button"
        }
      }
    ]
  }}
/>
```

### Horizontal Card Layout

```tsx
<CardListing
  cardListing={{
    cards: [
      {
        content: { /* content */ },
        call_to_action: { /* CTA */ },
        rendering_options: {
          card_orientation: "Horizontal Equal",
          image_order: "left",
          link_type: "Card"
        }
      }
    ],
    rendering_options: {
      cards_per_row: {
        desktop: 2,
        tablet: 1,
        mobile: 1
      }
    }
  }}
/>
```

## Implementation Notes

- The component uses the existing `content_card` global field structure
- Cards support both individual and card-level linking
- Image aspect ratios are maintained at 16:9 for consistency
- The component is fully responsive and mobile-optimized
- All Contentstack edit tags are properly implemented for Visual Builder support
