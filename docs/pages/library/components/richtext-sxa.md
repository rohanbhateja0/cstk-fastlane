# RichText (SXA)

**RichText -** The RichText component is a **Sitecore SXA (Sitecore Experience Accelerator) component** that renders rich text content with comprehensive HTML formatting and styling options. It's designed to display formatted content from Sitecore with consistent typography and responsive behavior.

**Description:** A dynamic rich text component that renders formatted text content from Sitecore's content with consistent formatting, performance optimization, and editing support for content managers.

**Functionality:** Dynamically renders rich text content based on field configuration, supporting various HTML formatting options, custom styling, and responsive design patterns.

## Component Details

**Template Name:** JSON Rendering  
**Item Path:** `/sitecore/layout/Renderings/Feature/JSS Experience Accelerator/Page Content/RichText`

## Field Details

| Field Name | Sitecore Field Type | Description | Required |
| :-- | :-- | :-- | :-- |
| `Text` | Rich Text | The formatted text content to display | Yes |

## Advanced Display Options

### 1. Rich Text Formatting

The `Text` field supports various HTML formatting options:

| Format | HTML Tag | Use Case |
| :-- | :-- | :-- |
| **Bold** | `<strong>` or `<b>` | Emphasis, important text |
| **Italic** | `<em>` or `<i>` | Foreign words, emphasis |
| **Underline** | `<u>` | Links, emphasis |
| **Strikethrough** | `<s>` or `<del>` | Removed content, discounts |
| **Subscript** | `<sub>` | Chemical formulas, footnotes |
| **Superscript** | `<sup>` | Mathematical expressions, citations |

### 2. Typography Elements

| Element | HTML Tag | Description |
| :-- | :-- | :-- |
| **Headings** | `<h1>` through `<h6>` | Content hierarchy and structure |
| **Paragraphs** | `<p>` | Body text and content blocks |
| **Lists** | `<ul>`, `<ol>`, `<li>` | Bulleted and numbered lists |
| **Blockquotes** | `<blockquote>` | Quotations and citations |
| **Code** | `<code>`, `<pre>` | Code snippets and examples |

### 3. Link and Media Support

| Feature | Description | Use Case |
|---------|-------------|----------|
| **Internal Links** | Sitecore internal link resolution | Navigation between pages |
| **External Links** | External URL linking | References and resources |
| **Embedded Media** | Images and media integration | Rich content presentation |
| **Personalization** | Dynamic content based on user context | Personalized experiences |

## Styling Options

### 1. Component Wrapper Styles

Use the **`styles`** field to apply global classes to the root container. Common uses include:
- Margin utilities: `my-4`, `mt-5`
- Background colors: `bg-light`, `bg-secondary`
- Border utilities: `border`, `border-top`
- Spacing: `p-4`, `py-3`

### 2. Content Layout Modes

Different rendering modes for various use cases and styling needs.

| Mode | Description | CSS Classes |
|------|-------------|-------------|
| **Standard Rich Text** | Basic rich text formatting | `component rich-text` |
| **Inline Display** | Compact inline styling | `component rich-text inline-block` |
| **Content Block** | Full-width content display | `component rich-text w-full` |
| **Card Layout** | Enhanced card styling | `component rich-text shadow-lg rounded-lg` |

### 3. Content Styling

Styling applied to the rich text content area for consistent layout and appearance.

| Class | Purpose | Result |
|-------|---------|--------|
| `component-content` | Content wrapper | Proper spacing and layout |
| `field-text` | Text content area | Text layout and styling |
| `[&_h1]:font-bold [&_h1]:mb-6` | H1 styling | Large, bold headings with spacing |
| `[&_h2]:mb-4 [&_h2]:border-b` | H2 styling | Medium headings with bottom border |
| `[&_p]:my-4 [&_p]:leading-relaxed` | Paragraph styling | Well-spaced, readable paragraphs |
| `[&_ul]:list-disc [&_ul]:list-inside` | List styling | Properly formatted bullet lists |
| `[&_a]:underline [&_a:hover]:text-blue-800` | Link styling | Underlined links with hover effects |

## Screenshots

1. **RichText Component Overview**
   ![screenshot](/images/components/component-rich-text.png "screenshot")
