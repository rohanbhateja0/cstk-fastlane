# Demo Environment Setup Guide

## Complete Setup for Webinar Live Demonstrations

This guide covers everything needed to prepare a clean demo environment for the AI in SDLC webinar.

---

## Pre-Webinar Checklist

### 1 Week Before

- [ ] Create dedicated Contentstack stack for demo
- [ ] Prepare Figma design file with demo components
- [ ] Test all MCP server connections
- [ ] Verify Lytics account (if demonstrating)
- [ ] Review and practice all demo scripts

### 1 Day Before

- [ ] Clone fresh repository for demo
- [ ] Configure all environment variables
- [ ] Test each demo end-to-end
- [ ] Prepare backup recording of demos
- [ ] Clear browser cache and IDE history

### 30 Minutes Before

- [ ] Start all applications (Figma, Cursor, Browser)
- [ ] Verify MCP server connections
- [ ] Open all relevant files
- [ ] Test screen sharing
- [ ] Disable notifications

---

## Contentstack Stack Setup

### Create Demo Stack

1. **Create New Stack:**
   - Log in to Contentstack
   - Create new stack: "FastLane Webinar Demo"
   - Select appropriate region

2. **Import Base Content Types:**
   ```bash
   # From project root
   npx @contentstack/cli cm:stacks:import \
     --alias demo-stack \
     --folder ./stack/main
   ```

3. **Create Required Content Types:**

   **Page Content Type:**
   - Already included in base import
   - Contains modular blocks for components

   **HeroBanner (for demo):**
   - title: Single line text
   - subtitle: Single line text
   - description: Rich text
   - background_image: File
   - call_to_action: Link

   **NewsSection (for demo):**
   - title: Single line text
   - description: Rich text
   - news_items: Reference (multiple)
   - layout: Select (grid, list)
   - show_featured: Boolean
   - max_items: Number

4. **Create Sample Entries:**

   **Home Page:**
   - Title: "FastLane Demo Home"
   - URL: /
   - Add HeroBanner block with sample content

   **HeroBanner Entry:**
   - Title: "Welcome to FastLane"
   - Subtitle: "AI-Powered Development"
   - Description: "Experience the future of SDLC with Contentstack"
   - Upload a demo background image

5. **Configure Environments:**
   - Development (for demos)
   - Production (optional)

6. **Generate API Tokens:**
   - Delivery Token for development
   - Management Token with full permissions
   - Preview Token for Live Preview

---

## Figma Design Setup

### Prepare Demo Design File

1. **Create/Copy FastLane Design File:**
   - Open Figma Desktop App
   - Create new file: "FastLane Webinar Demos"
   - Copy component frames from main design

2. **Required Component Frames:**

   **HeroBanner Frame:**
   - Background image layer
   - Text layers (title, subtitle, description)
   - CTA button
   - Name: "HeroBanner"
   - Include multiple variants if possible

   **NewsSection Frame:**
   - Grid layout of news cards
   - Featured news item
   - Name: "NewsSection"

   **ContentCard Frame:**
   - Image
   - Title
   - Description
   - CTA link
   - Multiple orientation variants

3. **Organize Layers:**
   - Use semantic naming (no "Rectangle 1")
   - Group related elements
   - Use Auto Layout where possible
   - Set up design variables (colors, spacing)

4. **Enable Dev Mode:**
   - Switch to Dev Mode view
   - Verify component selection works
   - Test getting code snippets

5. **Get Frame URLs:**
   - Right-click each demo frame
   - "Copy link to frame"
   - Save URLs in demo notes

---

## IDE Setup

### Cursor IDE Configuration

1. **Clone Fresh Repository:**
   ```bash
   git clone <repository-url> fastlane-demo
   cd fastlane-demo
   npm install
   ```

2. **Configure Environment:**
   Create `.env.local`:
   ```bash
   # Contentstack Demo Stack
   CONTENTSTACK_API_KEY=demo_stack_api_key
   CONTENTSTACK_DELIVERY_TOKEN=demo_delivery_token
   CONTENTSTACK_ENVIRONMENT=development
   CONTENTSTACK_REGION=NA
   
   # Live Preview
   CONTENTSTACK_PREVIEW_TOKEN=demo_preview_token
   CONTENTSTACK_PREVIEW_HOST=rest-preview.contentstack.com
   CONTENTSTACK_LIVE_PREVIEW=true
   CONTENTSTACK_LIVE_EDIT_TAGS=true
   
   # Management API
   CONTENTSTACK_MANAGEMENT_TOKEN=demo_management_token
   
   # Lytics (optional)
   NEXT_PUBLIC_LYTICS_ACCOUNT_ID=demo_lytics_id
   ```

3. **Configure MCP Servers:**
   
   Open Cursor Settings > MCP and add:
   ```json
   {
     "mcpServers": {
       "figma": {
         "url": "http://127.0.0.1:3845/sse"
       },
       "contentstack": {
         "command": "npx",
         "args": ["@contentstack/mcp"]
       }
     }
   }
   ```
   
   **Note:** The Browser MCP (`cursor-ide-browser`) is built-in to Cursor and requires no configuration.

4. **Verify Connections:**
   - Restart Cursor
   - Check Tools & Integrations
   - Verify Figma and Contentstack MCP tools are available
   - Browser MCP tools are automatically available

5. **Pre-Open Files:**
   - `docs/.../ai-prompts/templates/create-component.md`
   - `docs/.../ai-prompts/templates/core-requirements.md`
   - `components/HeroBanner.tsx` (for reference)
   - `components/render-components.tsx`

---

## Browser Setup

### Development Server

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Verify Pages Load:**
   - http://localhost:3000/en-us (home page)
   - Check components render correctly

3. **Test Live Preview:**
   - Open Contentstack Visual Builder
   - Navigate to demo page
   - Verify editable tags work

### Browser Configuration

1. **Open Required Tabs:**
   - Tab 1: localhost:3000 (demo site)
   - Tab 2: Contentstack Dashboard
   - Tab 3: Figma Design (web backup)

2. **Clear Data:**
   - Clear cache for localhost
   - Clear any saved form data
   - Disable browser extensions that might interfere

3. **Bookmark Key Pages:**
   - Content Types list
   - Entries list
   - Visual Builder for demo page

---

## Demo Script Preparation

### Demo 1: Figma to Code

**Pre-Demo State:**
- [ ] Figma Desktop App open with design file
- [ ] HeroBanner frame visible and ready to select
- [ ] Cursor IDE open with empty chat
- [ ] Dev Mode MCP Server enabled

**Reset Between Runs:**
- Close and reopen Figma file
- Clear Cursor chat history
- Select the demo frame again

### Demo 2: AI Prompt Workflow

**Pre-Demo State:**
- [ ] Create component template open in Cursor
- [ ] Core requirements file accessible
- [ ] Components folder visible in file explorer
- [ ] Empty chat ready

**Reset Between Runs:**
- Close any generated files
- Clear chat history
- Reopen template file

### Demo 3: Contentstack MCP

**Pre-Demo State:**
- [ ] Contentstack dashboard open to Content Types
- [ ] Demo content type NOT created yet (or delete before demo)
- [ ] Environment variables verified
- [ ] Cursor chat ready

**Reset Between Runs:**
- Delete created content type from Contentstack
- Delete created entries
- Clear chat history

---

## Backup Plans

### If Figma MCP Fails

**Backup Option 1: Use Figma URL**
```
Use the Figma MCP to analyze this design URL:
[paste frame URL]
```

**Backup Option 2: Describe Component**
```
Generate a HeroBanner component with:
- Full-width background image with overlay
- Title, subtitle, description text
- Call-to-action button
- Following @core-requirements.md patterns
```

### If Contentstack MCP Fails

**Backup Option 1: Show API Route**
- Open `app/api/contentstack/route.ts`
- Explain the sync function
- Show manual content type creation in dashboard

**Backup Option 2: Pre-Created Content**
- Have content type pre-created as backup
- Skip creation, show entry creation only

### If Dev Server Fails

**Backup Option 1: Static Screenshots**
- Prepare screenshots of working components
- Show code and explain output

**Backup Option 2: Pre-Recorded Demo**
- Record all demos beforehand
- Have video ready to play if live demo fails

---

## Demo Environment Verification Script

Run this script before the webinar to verify everything works:

```bash
#!/bin/bash
# demo-verify.sh

echo "=== FastLane Demo Environment Verification ==="

# 1. Check Node.js
echo "Checking Node.js..."
node --version

# 2. Check npm dependencies
echo "Checking dependencies..."
npm list @contentstack/delivery-sdk
npm list next

# 3. Check environment variables
echo "Checking environment variables..."
if [ -z "$CONTENTSTACK_API_KEY" ]; then
  echo "WARNING: CONTENTSTACK_API_KEY not set"
fi

# 4. Test Figma MCP
echo "Testing Figma MCP..."
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3845/sse

# 5. Start dev server
echo "Starting dev server..."
npm run dev &
sleep 10

# 6. Test localhost
echo "Testing localhost..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000

# 7. Kill dev server
kill %1

echo "=== Verification Complete ==="
```

---

## Screen Layout for Demo

### Recommended Window Arrangement

**Single Monitor:**
```
┌─────────────────────────────────────────┐
│                                         │
│              Cursor IDE                 │
│            (Full Screen)                │
│                                         │
├─────────────────────────────────────────┤
│ Figma (Alt+Tab) │ Browser (Alt+Tab)     │
└─────────────────────────────────────────┘
```

**Dual Monitor:**
```
Monitor 1 (Shared)           Monitor 2 (Private)
┌────────────────────┐       ┌────────────────────┐
│                    │       │                    │
│    Cursor IDE      │       │   Presenter Notes  │
│                    │       │   Demo Scripts     │
│                    │       │   Backup Content   │
└────────────────────┘       └────────────────────┘
```

### Font Sizes for Presentation

- IDE Font: 16-18px (readable on screen share)
- Terminal Font: 14-16px
- Browser Zoom: 125-150%
- Figma Zoom: Fit component in viewport

---

## Post-Demo Cleanup

After the webinar:

1. **Document Any Issues:**
   - Note what worked well
   - Note any problems for future improvement

2. **Save Demo State:**
   - Export Contentstack content types created
   - Save any useful generated components

3. **Reset Environment:**
   - Delete test entries/content types
   - Reset repository to clean state
   - Clear sensitive tokens

4. **Share Materials:**
   - Upload recording to specified location
   - Share slides with attendees
   - Provide link to FastLane repository

---

## Quick Reference Card

### Key URLs
| Resource | URL |
|----------|-----|
| Dev Server | http://localhost:3000 |
| Figma MCP | http://127.0.0.1:3845/sse |
| Contentstack | https://app.contentstack.com |

### Key Commands
```bash
npm run dev          # Start dev server
npm run build        # Build project
npm run lint         # Check for errors
```

### Emergency Contacts
- Technical Support: [Contact Info]
- Backup Presenter: [Name]
- Recording Backup: [Location]

---

*Complete this setup at least 24 hours before the webinar to allow time for troubleshooting.*
