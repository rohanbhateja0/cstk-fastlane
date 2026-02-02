# AI in SDLC Webinar Materials

## Accelerating SDLC with AI: A Deep Dive into Contentstack FastLane

This folder contains all materials for delivering the AI in SDLC webinar, including slides, demo scripts, code samples, and handouts.

---

## Webinar Overview

**Title:** Accelerating SDLC with AI: A Deep Dive into Contentstack FastLane  
**Duration:** 60-75 minutes  
**Target Audience:** Developers, Technical Architects, DevOps Engineers, Content Teams

### Key Topics Covered

1. AI Revolution in Software Development
2. Model Context Protocol (MCP) Architecture
3. Design-to-Code Workflow with Figma MCP
4. AI Prompt Templates for Component Generation
5. Contentstack MCP for Content Management
6. Personalization with Lytics & Contentstack Personalize
7. CI/CD and Security Automation

---

## Folder Structure

```
webinar-materials/
├── README.md                           # This file
├── slides/
│   ├── ai-sdlc-webinar-marp.md        # Marp-formatted slides (recommended)
│   ├── ai-sdlc-webinar-marp.pptx      # PowerPoint via Marp
│   ├── ai-sdlc-webinar-slides.md      # Full slide deck in Markdown
│   ├── ai-sdlc-webinar.pptx           # PowerPoint via Python script
│   ├── architecture-diagrams.md      # Mermaid diagrams for slides
│   └── generate-powerpoint.py         # Alternative Python PPT generator
├── demos/
│   ├── demo-1-figma-to-code.md        # Demo script: Figma MCP
│   ├── demo-2-ai-prompt-workflow.md   # Demo script: AI Templates
│   ├── demo-3-contentstack-mcp.md     # Demo script: Contentstack MCP
│   └── demo-environment-setup.md      # Complete demo environment guide
├── handouts/
│   ├── quick-start-guide.md           # Attendee quick start
│   ├── mcp-setup-checklist.md         # MCP configuration checklist
│   └── ai-prompt-reference.md         # AI prompt template reference
└── code-samples/
    ├── hero-banner-example.tsx        # Example component with annotations
    ├── content-query-example.ts       # Contentstack query patterns
    └── unit-test-example.tsx          # Vitest test patterns
```

---

## Quick Start

### 1. Review Materials

Start by reading through the materials in this order:

1. `slides/ai-sdlc-webinar-slides.md` - Full slide deck
2. `demos/demo-environment-setup.md` - Environment setup
3. `demos/demo-1-figma-to-code.md` through `demo-3-contentstack-mcp.md` - Demo scripts

### 2. Set Up Demo Environment

Follow the guide in `demos/demo-environment-setup.md`:

- Configure Contentstack stack
- Prepare Figma design file
- Set up Cursor IDE with MCP servers
- Test all demos

### 3. Practice Demos

Run through each demo at least 2-3 times:

- Demo 1: Figma to Code (~4 minutes)
- Demo 2: AI Prompt Workflow (~4 minutes)
- Demo 3: Contentstack MCP (~4 minutes)

### 4. Prepare Handouts

Print or share digitally:

- `handouts/quick-start-guide.md`
- `handouts/mcp-setup-checklist.md`
- `handouts/ai-prompt-reference.md`

---

## Slides Conversion to PowerPoint

**Recommended: Use Marp** (the slides are already converted; regenerate if you edit the source):

### Option 1: Marp (Recommended)

The Marp-formatted source is `slides/ai-sdlc-webinar-marp.md`. The PowerPoint output is `slides/ai-sdlc-webinar-marp.pptx`.

```bash
# Install Marp CLI (one-time)
npm install -g @marp-team/marp-cli

# Regenerate PowerPoint from Marp markdown (run from project root)
marp --no-stdin webinar-materials/slides/ai-sdlc-webinar-marp.md -o webinar-materials/slides/ai-sdlc-webinar-marp.pptx

# Or convert to PDF
marp --no-stdin webinar-materials/slides/ai-sdlc-webinar-marp.md -o webinar-materials/slides/ai-sdlc-webinar-marp.pdf
```

Use `--no-stdin` so Marp doesn't wait for stdin when run from a script or non-interactive terminal.

### Option 2: Python script

```bash
pip install python-pptx
python webinar-materials/slides/generate-powerpoint.py
```

Produces `slides/ai-sdlc-webinar.pptx`.

### Option 3: Manual conversion

Copy content from `ai-sdlc-webinar-slides.md` into PowerPoint, Google Slides, or Keynote.

---

## Diagrams

The `architecture-diagrams.md` file contains Mermaid diagrams. To export:

### Mermaid Live Editor

1. Go to https://mermaid.live
2. Paste diagram code
3. Export as PNG/SVG

### VS Code

1. Install "Markdown Preview Mermaid Support" extension
2. Preview and screenshot diagrams

---

## Code Samples Usage

The code samples in `code-samples/` are annotated for presentation:

- **Comments** explain key patterns
- **Sections** are clearly marked for discussion
- **Patterns** are highlighted with comments like `// KEY PATTERN:`

Use these during the presentation to:
- Show real code examples
- Explain integration patterns
- Highlight best practices

---

## Demo Timing Guide

| Section | Duration | Notes |
|---------|----------|-------|
| Introduction | 10 min | Set context |
| AI Architecture | 15 min | MCP explanation |
| Design-to-Code | 15 min | Figma MCP focus |
| Content Management | 10 min | Contentstack MCP |
| Personalization | 10 min | Lytics overview |
| Live Demo | 10 min | All 3 demos |
| Q&A | 5 min | Wrap up |
| **Total** | **75 min** | |

---

## Pre-Webinar Checklist

### 1 Week Before
- [ ] Review all materials
- [ ] Set up demo Contentstack stack
- [ ] Prepare Figma designs
- [ ] Test MCP connections

### 1 Day Before
- [ ] Fresh clone of repository
- [ ] All environment variables configured
- [ ] Run through all demos
- [ ] Prepare backup recordings

### 30 Minutes Before
- [ ] All applications running
- [ ] MCP servers connected
- [ ] Screen layout configured
- [ ] Notifications disabled

---

## Backup Plans

If live demos fail, use:

1. **Pre-recorded demo videos** (record before webinar)
2. **Static screenshots** of expected outputs
3. **Fallback prompts** in demo scripts

---

## Customization

Feel free to customize these materials:

- Add company branding to slides
- Adjust timing based on audience
- Add/remove sections as needed
- Update code samples with your examples

---

## Support

For questions about these materials:

- Review the FastLane documentation in `/docs/`
- Check the example components in `/components/`
- Reference the AI prompt templates in `/docs/pages/for-developers/component-development/ai-prompts/`

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-02-02 | 1.0 | Initial creation |

---

*Good luck with your webinar!*
