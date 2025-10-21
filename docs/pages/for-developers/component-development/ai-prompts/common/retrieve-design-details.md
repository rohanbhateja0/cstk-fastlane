# Common Figma Exploration Workflow

This workflow guides you through extracting design specifications from Figma for component implementation.

## Step 1: Get Design Details

### Extract Node ID from Figma URL

Figma URLs contain node IDs that uniquely identify design elements:

**URL Format:**
```
https://www.figma.com/design/{file-id}/{file-name}?node-id=14076-7445
```

**Node ID Extraction:**
- Format in URL: `node-id=14076-7445`
- Format for MCP tools: `14076:7445` (replace hyphen with colon)

**Example:**
```
URL: https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane?node-id=14076-7445
Node ID: 14076:7445
```

---

## Step 2: Use Figma MCP Tools

Execute these Figma MCP calls in the specified order to gather complete design information:

### 2.1 Get UI Code & Structure

Extract the component structure and code representation:

```typescript
// Use Figma MCP tool to get code
// This provides the structural breakdown of the design
```

**What to extract:**
- Component hierarchy
- Element relationships
- Layout structure
- Text content

### 2.2 Get Screenshot

Capture visual reference of the design:

```typescript
// Use Figma MCP tool to get screenshot
// This provides visual context for implementation
```

**What to use it for:**
- Visual verification during development
- Reference for styling details
- Comparison with final implementation

### 2.3 Get Design Variables

Extract design tokens and variables:

```typescript
// Use Figma MCP tool to get design variables
// This provides semantic tokens like colors, spacing, typography
```

**What to extract:**
- Color tokens (e.g., `--color-primary-500`)
- Spacing tokens (e.g., `--spacing-md`)
- Typography tokens (e.g., `--font-heading-lg`)
- Border radius tokens
- Shadow tokens

### 2.4 Get Metadata Structure

Get detailed metadata about the design element:

```typescript
// Use Figma MCP tool to get metadata
// This provides comprehensive information about layers, properties, and children
```

**What to extract:**
- Layer names and IDs
- Dimensions (width, height)
- Absolute positions
- Child elements
- Applied effects

---

## Step 3: Extract Design Specifications

Organize extracted information into implementation-ready specifications:

### Typography Specifications

Extract font properties for all text elements:

**For Each Text Element, Document:**

| Property | Example | Notes |
|----------|---------|-------|
| Font Family | `'Zodiak', serif` | Include fallback fonts |
| Font Size | `48px` | Use exact pixel values |
| Font Weight | `540` | Use numeric values |
| Line Height | `1.2` or `57.6px` | Relative or absolute |
| Letter Spacing | `-0.02em` or `-0.96px` | Negative for tight spacing |
| Text Transform | `none`, `uppercase`, `capitalize` | If applicable |
| Text Alignment | `left`, `center`, `right` | Default alignment |

**Example Extraction:**
```typescript
// Title Typography
{
  fontFamily: "'Zodiak', serif",
  fontSize: "48px",
  fontWeight: "540",
  lineHeight: "57.6px",
  letterSpacing: "-0.96px"
}

// Description Typography
{
  fontFamily: "'Satoshi', sans-serif",
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "24px",
  letterSpacing: "0"
}
```

---

### Color Specifications

Extract all color values used in the design:

**Categories to Document:**

1. **Background Colors:**
   - Primary background (e.g., `#ffffff`, `#fafafa`)
   - Secondary background (e.g., `#f4f4f5`)
   - Accent backgrounds

2. **Text Colors:**
   - Primary text (e.g., `#18181b` - zinc-950)
   - Secondary text (e.g., `#71717a` - zinc-500)
   - Link colors
   - Button text colors

3. **Border Colors:**
   - Border color (e.g., `#d4d4d8` - zinc-300)
   - Divider colors
   - Focus ring colors

4. **Interactive Colors:**
   - Hover states
   - Active states
   - Disabled states

**Example Extraction:**
```typescript
// Colors
{
  background: {
    primary: "#ffffff",
    secondary: "#fafafa",
    dark: "#0c4a6e" // sky-950
  },
  text: {
    primary: "#18181b", // zinc-950
    secondary: "#71717a", // zinc-500
    light: "#fafafa"
  },
  border: {
    default: "#d4d4d8", // zinc-300
    focus: "#3b82f6" // blue-500
  }
}
```

---

### Spacing Specifications

Extract padding, margin, and gap values:

**Categories to Document:**

1. **Padding:**
   - Container padding
   - Card padding
   - Button padding
   - Section padding

2. **Margin:**
   - Element margins
   - Section margins
   - Stack spacing

3. **Gap:**
   - Grid gap
   - Flex gap
   - Stack gap

**Example Extraction:**
```typescript
// Spacing
{
  padding: {
    container: "40px",
    card: "24px",
    button: "12px 24px"
  },
  gap: {
    grid: "24px",
    cardInternal: "16px"
  },
  margin: {
    sectionBottom: "80px"
  }
}
```

---

### Layout Specifications

Extract layout and sizing information:

**Properties to Document:**

| Property | What to Extract |
|----------|----------------|
| Container max-width | e.g., `1280px`, `1440px` |
| Grid columns | e.g., `3 columns` desktop, `2` tablet, `1` mobile |
| Grid gap | e.g., `24px` horizontal, `32px` vertical |
| Element dimensions | Width, height, aspect ratio |
| Border radius | e.g., `8px`, `12px`, `9999px` (full) |
| Shadows | Box shadow values |

**Example Extraction:**
```typescript
// Layout
{
  container: {
    maxWidth: "1280px",
    padding: "0 24px"
  },
  grid: {
    columns: {
      desktop: 3,
      tablet: 2,
      mobile: 1
    },
    gap: "24px"
  },
  card: {
    borderRadius: "12px",
    shadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  image: {
    width: "314px",
    height: "auto",
    borderRadius: "8px"
  }
}
```

---

### Image & Asset Specifications

Extract asset requirements:

**For Each Image/Asset:**

| Property | What to Document |
|----------|-----------------|
| Dimensions | Width × height in pixels |
| Aspect ratio | e.g., `16:9`, `4:3`, `1:1` |
| Format | JPG, PNG, SVG, WebP |
| Optimization | Responsive sizes needed |
| Alt text | Accessibility description |
| Object fit | `cover`, `contain`, `fill` |

**Example Extraction:**
```typescript
// Images
{
  featuredImage: {
    width: 314,
    height: 314,
    aspectRatio: "1:1",
    objectFit: "cover",
    borderRadius: "8px"
  },
  icon: {
    width: 24,
    height: 24,
    format: "SVG"
  }
}
```

---

## Step 4: Organize Specifications

Create a comprehensive specification document:

```typescript
export const ComponentSpecifications = {
  name: "ComponentName",
  figmaUrl: "https://www.figma.com/...",
  nodeId: "14076:7445",
  
  typography: {
    // All typography specs
  },
  
  colors: {
    // All color specs
  },
  
  spacing: {
    // All spacing specs
  },
  
  layout: {
    // All layout specs
  },
  
  images: {
    // All image specs
  },
  
  interactions: {
    hover: "...",
    active: "...",
    focus: "..."
  },
  
  responsive: {
    mobile: { /* breakpoint specs */ },
    tablet: { /* breakpoint specs */ },
    desktop: { /* breakpoint specs */ }
  }
};
```

---

## Tailwind CSS Mapping

Convert specifications to Tailwind CSS classes:

### Direct Tailwind Classes

```typescript
// Example mappings
fontSize: "48px" → "text-[48px]" or "text-5xl"
padding: "24px" → "p-6" or "p-[24px]"
gap: "16px" → "gap-4" or "gap-[16px]"
color: "#18181b" → "text-zinc-950" or "text-[#18181b]"
```

### Arbitrary Values

Use when exact Figma values don't match Tailwind scale:

```typescript
// Use arbitrary values for pixel-perfect implementation
text-[48px]      // Exact font size
p-[24px]         // Exact padding
gap-[16px]       // Exact gap
text-[#18181b]   // Exact color
leading-[57.6px] // Exact line height
tracking-[-0.96px] // Exact letter spacing
```

---

## Verification Checklist

Before proceeding to implementation:

- ✅ All typography properties documented
- ✅ All colors extracted with hex values
- ✅ All spacing values recorded in pixels
- ✅ Layout structure understood
- ✅ Grid behavior defined for all breakpoints
- ✅ Image dimensions and formats documented
- ✅ Interactive states (hover, active, focus) identified
- ✅ Responsive breakpoints defined
- ✅ Accessibility considerations noted

---

## Common Pitfalls

### ❌ Don't:
- Round pixel values to Tailwind scale arbitrarily
- Skip extracting hover/focus states
- Forget mobile/tablet variations
- Ignore z-index layering
- Miss animation/transition specifications

### ✅ Do:
- Use exact pixel values from Figma
- Document all interactive states
- Extract specifications for all breakpoints
- Note z-index relationships
- Document animations with duration and easing

---

## Next Steps

With specifications extracted, proceed to:
- [Create React Component](./create-react-component.md) - Build the component
- [Create ContentStack Content Type](./create-contentstack-contenttype.md) - Create content model

