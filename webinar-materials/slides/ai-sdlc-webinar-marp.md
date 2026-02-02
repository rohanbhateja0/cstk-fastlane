---
marp: true
theme: default
paginate: true
backgroundColor: #ffffff
color: #1e3a8a
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
  }
  section.lead {
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    color: white;
    text-align: center;
  }
  section.lead h1 {
    color: white;
    font-size: 2.5em;
  }
  section.lead h2 {
    color: #bfdbfe;
    font-size: 1.5em;
    font-weight: normal;
  }
  h1 {
    color: #1e3a8a;
    border-bottom: 3px solid #3b82f6;
    padding-bottom: 10px;
  }
  h2 {
    color: #3b82f6;
  }
  table {
    font-size: 0.85em;
  }
  th {
    background-color: #1e3a8a;
    color: white;
  }
  code {
    background-color: #f1f5f9;
    padding: 2px 6px;
    border-radius: 4px;
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
---

<!-- _class: lead -->

# Accelerating SDLC with AI

## A Deep Dive into Contentstack FastLane

**Webinar Presentation**

---

# Agenda

1. **The AI Revolution in SDLC** (10 min)
   - Traditional vs AI-augmented workflows

2. **AI Integration Architecture** (15 min)
   - MCP Servers and the AI Bridge

3. **Design-to-Code Workflow** (15 min)
   - Figma + AI Prompts = Production Code

4. **Content Management Automation** (10 min)
   - Contentstack MCP Server in Action

5. **Personalization & Analytics** (10 min)

6. **Live Demo** (10 min)

---

# The Problem We're Solving

| Traditional Challenge | Impact |
|----------------------|--------|
| Manual design translation | Hours of tedious work |
| Inconsistent implementations | Technical debt |
| Slow content type creation | Bottlenecks |
| Repetitive testing code | Developer fatigue |
| Context switching | Lost productivity |

### The AI Solution

> **AI doesn't replace developers - it accelerates them**

---

# What is FastLane?

## Next.js + Contentstack Starter Kit with AI Integration

<div class="columns">
<div>

### Core Technologies
- Next.js 14+ (App Router)
- Contentstack CMS
- ShadCN UI Components
- Tailwind CSS
- TypeScript

</div>
<div>

### AI Integrations
- Figma MCP Server
- Contentstack MCP Server
- Browser MCP (Built-in)
- AI Prompt Templates

</div>
</div>

---

<!-- _class: lead -->

# AI Integration Architecture

## Model Context Protocol (MCP)

---

# MCP - The AI Bridge

**Three MCP Servers in FastLane:**

| Server | Purpose | Setup |
|--------|---------|-------|
| **Figma MCP** | Design extraction, code generation | Requires configuration |
| **Contentstack MCP** | Content type CRUD, entry management | Requires configuration |
| **Browser MCP** | Frontend testing, visual verification | Built-in to Cursor |

All servers connect through Cursor IDE's MCP client, enabling AI to interact with external tools seamlessly.

---

# Figma MCP Server

**Available Tools:**

| Tool | Purpose |
|------|---------|
| `get_code` | Generate React + Tailwind from Figma selection |
| `get_variable_defs` | Extract design tokens (colors, spacing, fonts) |
| `get_code_connect_map` | Map Figma components to codebase |
| `get_image` | Extract images and assets |

**Local Server:** `http://127.0.0.1:3845/sse`

---

# Contentstack MCP Server

**Available Operations:**

| Category | Operations |
|----------|------------|
| **Content Types** | List, Get, Create, Update, Delete |
| **Entries** | CRUD, Publish, Unpublish |
| **Assets** | Upload, Manage, Organize |
| **Environments** | List, Publish to environments |

**Run via:** `npx @contentstack/mcp`

---

<!-- _class: lead -->

# Design-to-Code Workflow

## AI Prompt Templates

---

# Context is King

**Why FastLane AI Prompts Work:**

- **Comprehensive Documentation** - Field definitions, patterns, examples
- **Figma Design Integration** - Direct access via MCP with node IDs
- **Proven Code Patterns** - Contentstack SDK, ShadCN UI composition
- **Anti-Pattern Awareness** - Built-in knowledge of common pitfalls
- **Testing Patterns** - Comprehensive test generation

### Result
Production-ready components that work immediately

---

# Available AI Prompt Templates

<div class="columns">
<div>

### Creation Templates
- **Create Component** - New from Figma
- **Create Unit Test** - Vitest tests
- **PR Description** - Documentation

</div>
<div>

### Enhancement Templates
- **Enhance Component** - Modify existing
- **Add Personalization** - A/B testing
- **Core Requirements** - Standards ref

</div>
</div>

---

# Template Structure

```markdown
# Create {ComponentName} Component

## CUSTOMIZATION SECTION - EDIT THESE VALUES
**Component Name:** HeroBanner
**Component Documentation:** @hero-banner.md

**Required Features:**
- Background image with overlay
- Title, subtitle, description
- Call-to-action button

---
## STANDARD INSTRUCTIONS
CRITICAL: Use Figma MCP Server to analyze designs
CRITICAL: Follow @core-requirements.md patterns
```

---

<!-- _class: lead -->

# Content Management Automation

## Contentstack Integration

---

# SDK Integration Patterns

**Dual SDK Approach:**
- **Legacy SDK** (contentstack v3.x) - Established queries
- **Modern SDK** (@contentstack/delivery-sdk v4.x) - New features

**Key Patterns:**

```typescript
// Locale fallback
const entry = await GetPage(url, locale);

// Live Preview editable tags
liveEdit && addEditableTags(entry, "page", true);

// Variant parameters for personalization
variantParam: variantParam
```

---

# Live Preview for Content Authors

**Real-time editing in Contentstack Visual Builder**

```typescript
// Add editable tags to any field
<h1 {...(content?.$?.title ?? {})}>
  {title}
</h1>

// Use CMSImage for images
<CMSImage image={image} alt="..." />

// Use CMSLink for links (auto locale prefix)
<CMSLink link={cta}>{cta.title}</CMSLink>
```

Content authors can edit directly in the browser!

---

<!-- _class: lead -->

# Personalization & Analytics

## Lytics + Contentstack Personalize

---

# Personalization Stack

<div class="columns">
<div>

### Lytics CDP
- Behavioral tracking
- User identification
- Audience segmentation
- Campaign attribution
- E-commerce tracking

</div>
<div>

### Contentstack Personalize
- A/B testing
- Content variants
- Real-time delivery
- Conversion tracking
- Experience optimization

</div>
</div>

---

<!-- _class: lead -->

# Live Demo

## End-to-End Component Creation

---

# Demo: Create a HeroBanner

| Step | Tool | Time |
|------|------|------|
| 1. Design Extraction | Figma MCP | 1 min |
| 2. Component Generation | AI Prompt Template | 3 min |
| 3. Content Type Creation | Contentstack MCP | 2 min |
| 4. Entry Creation | Contentstack MCP | 1 min |
| 5. Unit Test Generation | AI Prompt Template | 2 min |
| 6. Live Preview Test | Browser | 1 min |

**Traditional: 3-5 hours** vs **AI-Powered: ~10 minutes**

---

# Key Takeaways

1. **AI as a Development Accelerator**
   Not replacement, but augmentation

2. **Context-Rich Development**
   Documentation-driven AI prompts

3. **End-to-End Integration**
   From Figma design to deployed code

4. **Content-First Architecture**
   Contentstack as the foundation

5. **Security by Design**
   Automated scanning in CI/CD

---

# Resources & Next Steps

**Documentation:**
- FastLane Docs: `/docs/`
- AI Prompts: `/docs/.../ai-prompts/`
- MCP Setup: `/docs/.../tools/`

**External Resources:**
- Contentstack: contentstack.com/docs
- Figma MCP: help.figma.com
- Lytics: docs.lytics.com

---

<!-- _class: lead -->

# Questions?

## Thank you for attending!

---

# Appendix: Time Comparison

| Phase | Traditional | AI-Powered |
|-------|-------------|------------|
| Design Analysis | 30 min | 2 min |
| Component Coding | 60-120 min | 5 min |
| Content Type Setup | 30 min | 2 min |
| Sample Entry | 15 min | 1 min |
| Unit Tests | 45 min | 3 min |
| Debug & Fix | 30-60 min | 5 min |
| **Total** | **3.5-5.5 hours** | **~20 min** |
