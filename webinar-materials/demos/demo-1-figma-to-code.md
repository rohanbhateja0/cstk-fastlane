# Demo 1: Figma to Code with MCP Server

## Demo Overview

**Duration:** 3-4 minutes
**Goal:** Demonstrate the Figma MCP Server integration for design-to-code generation

## Pre-Demo Setup

### Prerequisites Checklist

- [ ] Figma Desktop App running with design file open
- [ ] Dev Mode MCP Server enabled in Figma preferences
- [ ] Cursor IDE open with FastLane project loaded
- [ ] MCP server connection verified (check Tools & Integrations)
- [ ] Sample component selected in Figma (e.g., HeroBanner frame)

### Environment Verification

```bash
# Verify Figma MCP server is accessible
curl http://127.0.0.1:3845/sse
# Should return SSE stream or connection established
```

---

## Demo Script

### Step 1: Show the Design in Figma (30 seconds)

**Narrator Script:**
> "Let's start with our Figma design. Here we have a HeroBanner component that our designers have created. Notice the structure - we have a background image, overlay, title, subtitle, description, and a call-to-action button."

**Actions:**
1. Open Figma Desktop App
2. Navigate to the FastLane design file
3. Select the HeroBanner frame
4. Point out key elements:
   - Background image layer
   - Text layers (title, subtitle, description)
   - CTA button component
   - Responsive variants (if available)

---

### Step 2: Connect to Figma MCP Server in Cursor (30 seconds)

**Narrator Script:**
> "Now let's switch to Cursor IDE where we have our FastLane project open. The Figma MCP Server is already configured and connected - you can see it in our Tools & Integrations panel."

**Actions:**
1. Switch to Cursor IDE
2. Open Settings > Tools & Integrations
3. Show the Figma MCP server listed with available tools:
   - `get_code`
   - `get_variable_defs`
   - `get_code_connect_map`
   - `get_image`
4. Close settings panel

---

### Step 3: Extract Design Information (1 minute)

**Narrator Script:**
> "With the component selected in Figma, I'll ask the AI to extract information about the design. Watch how it uses the Figma MCP tools to understand the structure, colors, spacing, and layout."

**Actions:**
1. Open Cursor AI chat (Cmd/Ctrl + L)
2. Type the following prompt:

```
Analyze my current Figma selection and extract:
1. The component structure
2. Design tokens (colors, fonts, spacing)
3. Layout patterns used

Use the Figma MCP tools to get this information.
```

3. Show the AI using:
   - `get_code` tool call
   - `get_variable_defs` tool call
4. Review the extracted information:
   - Component hierarchy
   - Color variables (e.g., `--color-primary`, `--color-background`)
   - Spacing values
   - Typography settings

---

### Step 4: Generate React Component (1 minute)

**Narrator Script:**
> "Now here's the magic. I'll ask the AI to generate a production-ready React component based on the Figma design, following our FastLane patterns."

**Actions:**
1. Continue in Cursor AI chat with this prompt:

```
Based on the Figma design analysis, generate a React component that:
1. Uses ShadCN UI components
2. Follows FastLane's Contentstack integration patterns
3. Includes Live Preview editable tags
4. Uses Tailwind CSS with semantic tokens

Reference @core-requirements.md for the patterns to follow.
```

2. Watch as the AI generates:
   - TypeScript interface for props
   - React component with proper structure
   - CMSImage and CMSLink usage
   - Editable tags for Live Preview
   - Responsive classes

---

### Step 5: Review Generated Code (30 seconds)

**Narrator Script:**
> "Let's review what the AI generated. Notice how it follows all our patterns - we have the CMSImage component for background images, editable tags for Live Preview, semantic color tokens, and responsive design. This would have taken a developer 30-60 minutes to write manually."

**Actions:**
1. Show the generated component code
2. Highlight key patterns:

```typescript
// Contentstack integration
import { CMSImage } from '@/core/atoms/Image';
import { CMSLink } from '@/core/atoms/Link';

// Editable tags for Live Preview
{...(content?.$?.title ?? {})}

// Semantic design tokens
className="text-foreground bg-background"

// Responsive design
className="text-4xl sm:text-5xl lg:text-6xl"
```

---

## Key Talking Points

### Time Savings

| Traditional Approach | AI-Powered Approach |
|---------------------|---------------------|
| 30-60 minutes | 3-5 minutes |
| Multiple context switches | Single workflow |
| Manual pattern application | Automatic pattern adherence |
| Error-prone translation | Consistent output |

### Quality Guarantees

- **Pattern Compliance:** AI knows FastLane patterns from documentation
- **Accessibility:** ShadCN components include ARIA attributes
- **Responsiveness:** Mobile-first approach with breakpoints
- **Live Preview Ready:** Editable tags included automatically

---

## Troubleshooting

### Common Issues During Demo

**Issue: MCP server not connecting**
```
Solution: 
1. Check Figma Desktop App is running
2. Verify Dev Mode MCP Server is enabled in Figma preferences
3. Restart both Figma and Cursor
```

**Issue: No design selected**
```
Solution:
1. Select a frame/component in Figma before running tools
2. Use a specific Figma URL if selection doesn't work
```

**Issue: Generated code has errors**
```
Solution:
1. Ensure @core-requirements.md is referenced in prompt
2. Specify TypeScript and Contentstack patterns explicitly
3. Ask AI to fix specific errors
```

---

## Demo Recovery Scripts

If something goes wrong, use these pre-tested prompts:

### Quick Design Extraction
```
Use the Figma MCP get_code tool on this Figma URL:
[paste Figma frame link]

Show me the component structure and generate React code.
```

### Generate from Description (backup if MCP fails)
```
Generate a HeroBanner React component with:
- Full-width background image with overlay
- Title (h1), subtitle, and description text
- Call-to-action button
- Responsive design (mobile, tablet, desktop)
- Contentstack Live Preview integration using editable tags
- Follow the patterns in @core-requirements.md
```

---

## Post-Demo Transition

**Narrator Script:**
> "That's the power of Figma MCP integration - we went from design to production-ready code in under 5 minutes. But this is just step one. Next, let's look at how our AI prompt templates take this even further with comprehensive component generation workflows."

**Transition to Demo 2:** AI Prompt Workflow
