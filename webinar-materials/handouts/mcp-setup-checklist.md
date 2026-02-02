# MCP Server Setup Checklist

## Complete Setup Guide for AI-Powered Development

Use this checklist to ensure all MCP (Model Context Protocol) servers are properly configured for FastLane development.

---

## Figma MCP Server

### Prerequisites

- [ ] Figma Desktop App installed (latest version)
- [ ] Figma account with Dev or Full seat (Professional/Organization/Enterprise plan)
- [ ] Cursor IDE installed with MCP support

### Setup Steps

- [ ] **Step 1:** Download and install [Figma Desktop App](https://www.figma.com/downloads/)

- [ ] **Step 2:** Launch Figma Desktop and sign in

- [ ] **Step 3:** Open any Figma Design file

- [ ] **Step 4:** Enable MCP Server:
  - Go to Figma menu (upper-left)
  - Select "Preferences"
  - Enable "Dev Mode MCP Server"
  - Confirm activation message appears

- [ ] **Step 5:** Verify server is running at `http://127.0.0.1:3845/sse`

- [ ] **Step 6:** Configure Cursor IDE:
  - Open Settings > MCP
  - Add server configuration:
  ```json
  {
    "mcpServers": {
      "figma": {
        "url": "http://127.0.0.1:3845/sse"
      }
    }
  }
  ```

- [ ] **Step 7:** Restart Cursor IDE

- [ ] **Step 8:** Verify in Settings > Tools & Integrations:
  - `get_code` tool available
  - `get_variable_defs` tool available
  - `get_code_connect_map` tool available
  - `get_image` tool available

### Verification Test

- [ ] Select a component in Figma
- [ ] Open Cursor AI chat
- [ ] Type: "Analyze my current Figma selection"
- [ ] Confirm AI accesses design information

---

## Contentstack MCP Server

### Prerequisites

- [ ] Contentstack account with stack access
- [ ] API Key for your stack
- [ ] Management Token with write permissions
- [ ] Delivery Token (optional, for read operations)

### Getting Credentials

- [ ] **API Key:**
  - Go to Contentstack Dashboard
  - Navigate to Settings > Stack
  - Copy the API Key

- [ ] **Management Token:**
  - Go to Settings > Tokens > Management Tokens
  - Create new token with appropriate permissions:
    - [ ] Content Types: Read/Write
    - [ ] Entries: Read/Write/Publish
    - [ ] Assets: Read/Write
  - Copy the token

- [ ] **Delivery Token:**
  - Go to Settings > Tokens > Delivery Tokens
  - Create token for your environment
  - Copy the token

- [ ] **Region:**
  - Check your Contentstack URL:
    - `app.contentstack.com` = NA
    - `eu-app.contentstack.com` = EU
    - `azure-na-app.contentstack.com` = AZURE_NA
    - `azure-eu-app.contentstack.com` = AZURE_EU

### Environment Configuration

- [ ] Set environment variables:

**Windows (PowerShell):**
```powershell
$env:CONTENTSTACK_API_KEY="your_api_key_here"
$env:CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token_here"
$env:CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token_here"
$env:CONTENTSTACK_REGION="NA"
```

**macOS/Linux (Bash):**
```bash
export CONTENTSTACK_API_KEY="your_api_key_here"
export CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token_here"
export CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token_here"
export CONTENTSTACK_REGION="NA"
```

**Or add to `.env.local`:**
```
CONTENTSTACK_API_KEY=your_api_key_here
CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token_here
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
CONTENTSTACK_REGION=NA
```

### Setup Steps

- [ ] **Step 1:** Configure Cursor MCP settings:
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

- [ ] **Step 2:** Restart Cursor IDE

- [ ] **Step 3:** Verify in Settings > Tools & Integrations:
  - Content type operations available
  - Entry operations available
  - Asset operations available

### Verification Test

- [ ] Open Cursor AI chat
- [ ] Type: "Using the Contentstack MCP, list all content types in my stack"
- [ ] Confirm content types are listed

---

## Browser MCP Server (Built-in to Cursor)

### Purpose

Frontend testing and visual verification directly from the IDE.

### No Setup Required

The Browser MCP (`cursor-ide-browser`) is a **built-in feature of Cursor IDE** - it comes pre-configured and ready to use. Unlike Figma MCP and Contentstack MCP, you don't need to install or configure anything.

### Available Tools

| Tool | Purpose |
|------|---------|
| `browser_navigate` | Open URLs in browser |
| `browser_snapshot` | Capture page screenshots |
| `browser_click` | Click page elements |
| `browser_type` | Enter text in fields |
| `browser_tabs` | Manage browser tabs |

### Verification Test

- [ ] Open Cursor AI chat
- [ ] Type: "Navigate to http://localhost:3000 and take a screenshot"
- [ ] Confirm browser opens and screenshot is captured

---

## Troubleshooting Checklist

### Figma MCP Not Connecting

- [ ] Figma Desktop App is running (not web version)
- [ ] Design file is open in Figma
- [ ] Dev Mode MCP Server is enabled in preferences
- [ ] Server URL is `http://127.0.0.1:3845/sse` (not https)
- [ ] Cursor has been restarted after configuration
- [ ] No firewall blocking port 3845

### Contentstack MCP Not Working

- [ ] Environment variables are set correctly
- [ ] Management token has required permissions
- [ ] Region is correct for your stack
- [ ] Token hasn't expired
- [ ] `npx @contentstack/mcp` runs without errors

### General MCP Issues

- [ ] Cursor IDE is latest version
- [ ] MCP configuration JSON is valid
- [ ] No syntax errors in configuration
- [ ] IDE has been restarted after changes

---

## Quick Reference

### Figma MCP Tools

| Tool | Purpose |
|------|---------|
| `get_code` | Generate React + Tailwind code |
| `get_variable_defs` | Extract design tokens |
| `get_code_connect_map` | Map Figma to code components |
| `get_image` | Extract images/assets |
| `create_design_system_rules` | Generate design guidelines |

### Contentstack MCP Operations

| Category | Operations |
|----------|------------|
| Content Types | list, get, create, update, delete |
| Entries | list, get, create, update, delete, publish, unpublish |
| Assets | list, get, upload, delete |

---

## Support Resources

- **Figma MCP Documentation:** https://help.figma.com/hc/en-us/articles/32132100833559
- **Contentstack Documentation:** https://www.contentstack.com/docs/
- **FastLane Documentation:** `npm run dev:docs`

---

## Checklist Summary

| Server | Status | Notes |
|--------|--------|-------|
| Figma MCP | [ ] Complete | Requires Figma Desktop + configuration |
| Contentstack MCP | [ ] Complete | Requires API tokens + configuration |
| Browser MCP | [x] Built-in | No setup needed - comes with Cursor |

**All MCP servers configured:** [ ]

---

*Keep this checklist handy for team onboarding and troubleshooting!*
