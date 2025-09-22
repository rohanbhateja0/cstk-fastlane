# LinkList (SXA)

**LinkList -** The LinkList component is a flexible, highly customizable SXA (Sitecore Experience Accelerator) component that displays collections of links in various formats and layouts. It's designed to render lists of links with configurable styling, responsive behavior, and multiple display variants.

**Description:** A dynamic link list component that renders collections of links from Sitecore's content with consistent formatting, performance optimization, and editing support for content managers.

**Functionality:** Dynamically renders link lists based on field configuration, supporting various list styles, optional link text and descriptions, and responsive design patterns.

## Component Details

**Template Name:** Link List Folder
**Item Path:** `/sitecore/templates/Feature/JSS Experience Accelerator/Navigation/Datasource/Link List`

## Field Details

| Field Name | Sitecore Field Type | Description | Required |
| :-- | :-- | :-- | :-- |
| Title | Single-Line Text | The display title for the link list | No |


**Child Item Template:** Link List Item
**Item Path:** `/sitecore/templates/Feature/JSS Experience Accelerator/Navigation/Datasource/Link`


| Field Name | Sitecore Field Type | Description | Required |
| :-- | :-- | :-- | :-- |
| Link | General Link | The URL or Sitecore item to link to | Yes |
| Title | Single-Line Text | The display text for the link | No |
| Source | Single-Line Text | Data source for link (advanced use cases) | No |

## Advanced Display Options

### 1. Hierarchical Link Grouping

Supports grouping of links into logical folders for organization such as footer columns, main navigation panels, and multi-level categories.


| Structure | Description | Use Case |
| :-- | :-- | :-- |
| **Link List Folder** | Main grouping of related links | Footer links, main nav |
| **Link List Item** | Individual link item with URL and title | Each menu or footer link |

### 2. Link Types

Supports various link types directly through the General Link field editor:


| Type | Description | Result |
| :-- | :-- | :-- |
| Internal | Sitecore item linking | Navigation within site |
| External | URL to external site | Links to other domains |
| Email | `mailto:` links | Email contacts |
| Anchor | Section navigation within the page | Jump to content |
| Media | Download files from media library | PDFs, images, docs |
| JavaScript | Custom scripts | Advanced interactions |
### 1. Link List Structure
The component renders a structured list of links with a title and individual link items.

| Element | Description | Use Case |
|---------|-------------|----------|
| **Title** | Heading displayed above the link list | Section headers, navigation labels |
| **Link Items** | Individual links within the list | Navigation menus, related content |
| **List Container** | Wrapper for organizing links | Consistent layout and styling |

### 2. Link Display Options
The component provides flexible control over how links are presented.

| Option | Description | Effect |
|--------|-------------|---------|
| Link Text | Display link text from link field | Shows descriptive text for each link |
| Link URLs | Navigate to target destinations | Functional navigation functionality |
| Link Styling | Custom CSS classes for appearance | Consistent visual presentation |

### 3. Responsive Behavior
Automatic responsive link list handling through modern CSS and responsive design patterns.

| Feature | Description | Benefit |
|---------|-------------|---------|
| **Flexible Layouts** | Responsive grid and flexbox layouts | Optimized for all screen sizes |
| **Mobile Optimization** | Stack and reflow on small screens | Better mobile user experience |
| **Touch Friendly** | Appropriate touch targets | Improved mobile navigation |

## Styling Options

### 1. Component Wrapper Styles
Use the **`styles`** field to apply global classes to the root container. Common uses include:
- Margin utilities: `my-4`, `mt-5`
- Background colors: `bg-light`, `bg-secondary`
- Border utilities: `border`, `border-top`
- Spacing: `p-4`, `py-3`

### 2. List Display Modes
Different rendering modes for various use cases and styling needs.

| Mode | Description | CSS Classes |
|------|-------------|-------------|
| **Standard List** | Basic list with title and links | `component link-list` |
| **Navigation Links** | Horizontal link display | `component link-list flex gap-5` |
| **Vertical Stack** | Vertical link arrangement | `component link-list flex flex-col` |
| **Responsive Grid** | Grid-based link presentation | `component link-list grid` |

### 3. Content Styling
Styling applied to the link list content area for consistent layout and appearance.

| Class | Purpose | Result |
|-------|---------|--------|
| `component-content` | Content wrapper | Proper spacing and layout |
| `link-list` | Main component class | Base component styling |
| `flex gap-5` | Horizontal layout | Links displayed in a row with spacing |
| `flex flex-col` | Vertical layout | Links stacked vertically |
| `list-none p-0 m-0` | List reset | Removes default list styling |

## Screenshots

1. **LinkList Component Overview**
   ![screenshot](/images/components/component-linklist-item.png "screenshot")