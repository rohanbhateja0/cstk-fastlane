# Carousel Component

A responsive carousel component based on Figma designs that displays multiple slides with navigation controls and indicators. The component features a dark sky-blue background with centered content overlay and precise typography matching the design system.

## Features

- **Responsive Design**: Adapts to different screen sizes
- **Auto-play**: Automatically cycles through slides (pauses on hover)
- **Navigation Controls**: Previous/next arrow buttons
- **Dot Indicators**: Clickable dots to jump to specific slides
- **Touch Support**: Swipe gestures for mobile devices
- **Accessibility**: Keyboard navigation and ARIA labels
- **Smooth Transitions**: CSS transitions for slide changes

## Content Fields

### Carousel Object Structure
The carousel component receives a carousel object with the following structure:
```json
{
  "carousels": [
    {
      "uid": "blt39d9e14b9597a078",
      "_content_type_uid": "carousel",
      "$": { ... }
    }
  ],
  "_metadata": { ... },
  "$": { ... }
}
```

### Main Fields
- **Title** (Text, optional): Main heading for the carousel
- **Description** (Rich Text, optional): Description text below the title
- **Slides** (Reference): Array of carousel slide entries

### Slide Content Fields
- **Title** (Text, optional): Slide title
- **Tag** (Text, optional): Small tag/label for the slide
- **Description** (Rich Text, optional): Slide description text
- **Image** (File, required): Slide background image
- **Call to Action 1** (Link, optional): Primary action button
- **Call to Action 2** (Link, optional): Secondary action button

## Rendering Options

- **Show Navigation** (Checkbox): Display previous/next arrow buttons
- **Show Dots** (Checkbox): Display dot indicators at the bottom
- **Colspan** (String): Grid column span for responsive layout

## Usage

The carousel component automatically renders when added to a page through the ContentStack CMS. It supports:

1. **Auto-play**: Slides change automatically every 5 seconds
2. **User Interaction**: Auto-play pauses when user hovers or interacts
3. **Keyboard Navigation**: Arrow keys for navigation
4. **Mobile Support**: Touch/swipe gestures

## Styling

The component uses Tailwind CSS classes and follows the Figma design specifications:
- **Background**: Dark sky-blue (sky-900) background
- **Typography**: Satoshi and Zodiak font families with precise sizing
- **Navigation**: White chevron arrows positioned at 1.11% from edges
- **Buttons**: Dark (zinc-900) and light (zinc-200) button styles
- **Dots**: White circular indicators with proper spacing
- **Content**: Centered overlay with specific gap spacing (16px)
- **Responsive**: Adapts to different screen sizes while maintaining design integrity

## Accessibility

- ARIA labels for navigation buttons
- Keyboard navigation support
- Screen reader friendly
- Proper focus management
- Semantic HTML structure

## Example

```tsx
// The component is automatically rendered through the CMS
// No manual implementation needed in pages
```

## Technical Details

- Built with React and TypeScript
- Uses 'use client' directive for client-side interactivity
- Integrates with ContentStack SDK
- Follows the project's component architecture
- Includes proper TypeScript types and interfaces
- **Data Fetching**: Automatically resolves carousel references using `getCarouselRes()` helper function
- **Reference Support**: Handles both full carousel objects and UID references
- **Array Support**: Processes the first carousel from the `carousels` array
- **Loading States**: Includes loading indicator while fetching carousel data
- **Error Handling**: Graceful fallback if carousel data cannot be fetched