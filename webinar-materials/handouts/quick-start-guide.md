# FastLane Quick Start Guide

## AI in SDLC with Contentstack - Getting Started

Welcome to FastLane! This guide will help you set up your development environment with AI-powered tools for rapid component development.

---

## Prerequisites

Before you begin, ensure you have:

- [ ] **Node.js 18+** installed
- [ ] **Cursor IDE** (recommended) or VS Code
- [ ] **Figma Desktop App** (for design-to-code workflow)
- [ ] **Contentstack Account** with API access
- [ ] **Git** installed

---

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd contentstack-fast-lane
npm install
```

---

## Step 2: Environment Configuration

Create a `.env.local` file in the project root:

```bash
# Contentstack Configuration
CONTENTSTACK_API_KEY=your_api_key_here
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
CONTENTSTACK_ENVIRONMENT=development
CONTENTSTACK_REGION=NA

# Live Preview (optional but recommended)
CONTENTSTACK_PREVIEW_TOKEN=your_preview_token_here
CONTENTSTACK_PREVIEW_HOST=rest-preview.contentstack.com
CONTENTSTACK_LIVE_PREVIEW=true
CONTENTSTACK_LIVE_EDIT_TAGS=true

# Management API (for content type sync)
CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token_here

# Lytics (optional)
NEXT_PUBLIC_LYTICS_ACCOUNT_ID=your_lytics_account_id
```

### Getting Your Contentstack Credentials

1. **API Key:** Dashboard > Settings > Stack > Copy API Key
2. **Delivery Token:** Settings > Tokens > Delivery Tokens > Create/Copy
3. **Management Token:** Settings > Tokens > Management Tokens > Create/Copy
4. **Region:** Check your URL (app.contentstack.com = NA, eu-app.contentstack.com = EU)

---

## Step 3: MCP Server Setup

### Figma MCP Server (Requires Setup)

1. **Enable in Figma:**
   - Open Figma Desktop App
   - Go to Menu > Preferences
   - Enable "Dev Mode MCP Server"
   - Server runs at `http://127.0.0.1:3845/sse`

2. **Configure in Cursor:**
   - Open Settings > MCP
   - Add new server:
   ```json
   {
     "mcpServers": {
       "figma": {
         "url": "http://127.0.0.1:3845/sse"
       }
     }
   }
   ```

### Contentstack MCP Server (Requires Setup)

1. **Configure in Cursor:**
   ```json
   {
     "mcpServers": {
       "contentstack": {
         "command": "npx",
         "args": ["@contentstack/mcp"]
       }
     }
   }
   ```

2. **Verify environment variables are set** (from Step 2)

### Browser MCP Server (Built-in - No Setup Required)

The Browser MCP (`cursor-ide-browser`) comes built-in with Cursor IDE. It allows AI to:
- Navigate web pages
- Take screenshots
- Interact with page elements
- Test your application

No configuration needed - it's ready to use out of the box.

---

## Step 4: Start Development

```bash
# Start the development server
npm run dev

# The app will be available at http://localhost:3000
```

---

## Step 5: Test AI Integration

### Test Figma MCP

1. Open a Figma design file
2. Select a component
3. In Cursor chat, type:
   ```
   Analyze my current Figma selection and show me the component structure.
   ```

### Test Contentstack MCP

In Cursor chat, type:
```
Using the Contentstack MCP, list all content types in my stack.
```

---

## Your First AI-Generated Component

### Using the Create Component Template

1. **Open the template:**
   ```
   docs/pages/for-developers/component-development/ai-prompts/templates/create-component.md
   ```

2. **Customize the template:**
   ```markdown
   **Component Name:** MyComponent
   **Component Documentation:** @my-component.md
   **File Location:** `components/MyComponent.tsx`
   
   **Required Features:**
   - Feature 1
   - Feature 2
   ```

3. **Execute in Cursor AI chat:**
   - Copy the customized template
   - Paste into chat
   - AI generates production-ready component

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `components/` | React components |
| `core/atoms/` | Basic UI elements (CMSImage, CMSLink) |
| `core/ContentQueries/` | Contentstack data fetching |
| `contentstack-sdk/` | SDK configuration |
| `docs/` | Full documentation site |

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter

# Documentation
npm run dev:docs     # Start docs server
npm run build:docs   # Build docs

# Testing
npm run test         # Run tests
```

---

## Troubleshooting

### MCP Server Not Connecting

1. Verify Figma Desktop App is running
2. Check server URL is correct
3. Restart Cursor IDE

### Content Not Loading

1. Verify environment variables
2. Check API key permissions
3. Verify delivery token is for correct environment

### Live Preview Not Working

1. Ensure `CONTENTSTACK_LIVE_PREVIEW=true`
2. Ensure `CONTENTSTACK_LIVE_EDIT_TAGS=true`
3. Use preview token, not delivery token

---

## Next Steps

1. **Read the Documentation:** `/docs/`
2. **Explore AI Prompts:** `/docs/pages/for-developers/component-development/ai-prompts/`
3. **Try the Enhance Component Workflow:** Modify an existing component
4. **Generate Unit Tests:** Use the test generation template

---

## Resources

- **FastLane Documentation:** `npm run dev:docs`
- **Contentstack Docs:** https://www.contentstack.com/docs/
- **Figma MCP Docs:** https://help.figma.com/hc/en-us/articles/32132100833559
- **Lytics Docs:** https://docs.lytics.com/

---

## Getting Help

- Check the `/docs/` folder for detailed guides
- Review example components in `/components/`
- Reference the AI prompt templates for patterns

---

*Welcome to AI-powered development with FastLane!*
