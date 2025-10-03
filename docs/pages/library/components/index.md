# Components Overview

This section contains documentation for all Catalyst components built for ContentStack, including both custom Catalyst components and ContentStack components. Each component includes:

- **Sitecore Configuration**: Template paths, field definitions, and rendering parameters
- **Design Specifications**: Figma links and visual variants
- **Implementation Details**: Props, styling options, and usage examples
- **Technical Notes**: Performance, accessibility, and browser compatibility

## Available Components

### Media Components

| Component | Description | Status |
|-----------|-------------|--------|
| [Carousel](./components/carousel) | Horizontal slider for rich, slide-based content | ✅ Complete |
| [Image](./components/image-sxa) | Image display component with responsive behavior and optimization | ✅ Complete |
| [Video Player](./components/video-player) | Video wrapper component supporting YouTube and Vimeo with Plyr library | ✅ Complete |
| [Article Date](./components/articledate) | Component for displaying publication dates on news articles | ✅ Complete |
| [Page Title Banner](./components/pagetitlebanner) | Flexible hero section component with background media and CTAs | ✅ Complete |

### Navigation Components

| Component | Description | Status |
|-----------|-------------|--------|
| [Breadcrumb](./components/breadcrumb) | Page hierarchy navigation component | ✅ Complete |
| [LinkList](./components/linklist-sxa) | Link collection component with various list styles and formats | ✅ Complete |
| [MegaMenu Navigation](./components/megamenu-navigation-meganav-meganavitem) | Expandable multi-level navigation menu with MegaNav and MegaNavItem | ✅ Complete |
| [MegaNavLinkList](./components/meganavlinklist) | Grouped navigation links component for mega menu structures | ✅ Complete |
| [Navigation](./components/navigation) | Core sidebar navigation using ContentStack with enhanced styling | ✅ Complete |
| [Social Links](./components/social-links) | Social media icons linking to external profiles | ✅ Complete |

### PageContent Components

| Component | Description | Status |
|-----------|-------------|--------|
| [Article Date](./components/articledate) | Component for displaying publication dates on news articles | ✅ Complete |
| [Content Card](./components/content-card) | Flexible card component for showcasing structured content with images and CTAs | ✅ Complete |
| [Content Section](./components/content-section) | Flexible layout-aware section component for rich content with optional media | ✅ Complete |
| [CTA Button](./components/cta-button) | Versatile button component with multiple styles and behaviors | ✅ Complete |
| [Alert/Notification Banner](./components/alertnotification-banner) | Alert component for displaying important messages and warnings | ✅ Complete |
| [PageContent](./components/pagecontent-sxa) | Content placeholder component for page-level content management | ✅ Complete |
| [Page Title Banner](./components/pagetitlebanner) | Flexible hero section component with background media and CTAs | ✅ Complete |
| [Promo](./components/promo-sxa) | Promotional content component with icon, text, and optional links | ✅ Complete |
| [RichText](./components/richtext-sxa) | Rich text rendering component with HTML formatting support | ✅ Complete |
| [Social Share](./components/social-share) | Content sharing component for social media platforms | ✅ Complete |
| [Title](./components/title-sxa) | Text display component with configurable styling and HTML tag options | ✅ Complete |

### PageStructure Components

| Component | Description | Status |
|-----------|-------------|--------|
| [Container](./components/container-sxa) | Structural wrapper component with flexible layout options and background support | ✅ Complete |
| [Column Splitter](./components/column-splitter-sxa) | Layout component for dividing content into configurable columns with responsive widths | ✅ Complete |
| [Modal](./components/modal) | Popup overlay component with dynamic content placeholder | ✅ Complete |
| [Row Splitter](./components/row-splitter-sxa) | Layout component for creating multiple horizontal rows with customizable styling | ✅ Complete |
| [Tabs](./components/tabs) | Tabbed interface component with flexible content areas | ✅ Complete |
| [Theme Selector](./components/theme-selector) | Component for switching between light and dark themes | ✅ Complete |
| [Accordion](./components/accordion) | Expandable/collapsible panels for FAQs and progressive disclosure | ✅ Complete |

## Component Structure

Each component documentation follows this structure:

1. **Summary**: Overview and use cases
2. **Implementation Overview**: Visual variants and patterns
3. **Figma Design References**: Direct links to design specifications
4. **Field Details**: ContentStack content type and field configuration
5. **Advanced Styling Options**: Component parameters and customization
6. **Styling Options**: Visual styling and spacing controls
7. **Technical Implementation**: Code patterns and best practices
8. **Usage Guidelines**: When and how to use the component

## Additional Resources

- **[Global Styling Guide](./components/global-styling-guide)**: System-wide design standards and CSS patterns
- **[Component Documentation Template](./components/component-documentation-template)**: Template for creating new component documentation

## Contributing

To add a new component:

1. Create a new `.md` file in this directory
2. Follow the [component documentation template](./components/component-documentation-template)
3. Update the sidebar navigation in `.vitepress/config.mjs`
   (Use `pages/library/components/_meta.ts` in this Nextra setup)
4. Add the component to the appropriate category table above

### Adding ContentStack Components

When adding new ContentStack components:

1. **File naming**: Use the format `componentname-contentstack.md` to distinguish from custom components
2. **Content type path**: Use the ContentStack content type format: `component_name`
3. **Field structure**: Follow ContentStack field naming conventions and types
4. **Component category**: Add to the "ContentStack Components" section

## Design System Integration

All components are built with:

- **ShadCN UI**: Base component library
- **Tailwind CSS**: Utility-first styling
- **Figma Variables**: Design tokens and color system
- **Accessibility**: WCAG 2.1 AA compliance
- **ContentStack**: Base ContentStack component library for out-of-the-box functionality 
