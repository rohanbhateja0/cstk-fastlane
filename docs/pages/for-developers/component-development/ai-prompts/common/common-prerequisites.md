# Common Prerequisites

This section outlines the standard prerequisites required for component development with ContentStack integration.

## Required Tools & Setup

### 1. Development Server Running

Start your local development server:

```bash
npm run dev
# Expected: http://localhost:3000
```

**Verification:**
- ✅ Server starts without errors
- ✅ Site accessible at `http://localhost:3000`
- ✅ Hot reload works when making changes

---

### 2. ContentStack MCP Server Started

The ContentStack MCP (Model Context Protocol) server enables programmatic access to ContentStack APIs.

**PowerShell:**
```powershell
$env:CONTENTSTACK_API_KEY="your_api_key_here"
$env:CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token_here"
$env:CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token_here"
$env:CONTENTSTACK_REGION="NA"  # or EU, AZURE_NA, AZURE_EU
npx -y @contentstack/mcp
```

**Bash/macOS/Linux:**
```bash
export CONTENTSTACK_API_KEY="your_api_key_here"
export CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token_here"
export CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token_here"
export CONTENTSTACK_REGION="NA"  # or EU, AZURE_NA, AZURE_EU
npx -y @contentstack/mcp
```

**Verification:**
- ✅ MCP server starts without errors
- ✅ Environment variables are set correctly
- ✅ Can execute MCP commands (test with `mcp_contentstack_get_all_content_types`)

#### Getting ContentStack Credentials

1. **Stack API Key:**
   - Go to ContentStack Dashboard → Settings → Stack
   - Copy the API Key

2. **Management Token:**
   - Go to Settings → Tokens → Management Tokens
   - Create a new token with appropriate permissions
   - Copy the token

3. **Delivery Token:**
   - Go to Settings → Tokens → Delivery Tokens
   - Create a new token for the target environment
   - Copy the token

4. **Region:**
   - Check your ContentStack region in Settings → Stack
   - Common values: `NA`, `EU`, `AZURE_NA`, `AZURE_EU`

---

### 3. Figma Access

Ensure you have the necessary Figma access and integration:

**Requirements:**
- ✅ Access to the Figma project/file
- ✅ Figma MCP integration is enabled in your IDE
- ✅ Can retrieve Figma node information via MCP tools

**Common Figma Project:**
- URL: `https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version`
- Ensure you have viewer or editor access

---

## Environment Variables

Create a `.env.local` file in your project root (if not already exists):

```bash
# ContentStack Configuration
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
CONTENTSTACK_ENVIRONMENT=your_environment
CONTENTSTACK_REGION=NA
CONTENTSTACK_BRANCH=main

# ContentStack Live Preview
CONTENTSTACK_LIVE_PREVIEW=true
CONTENTSTACK_PREVIEW_TOKEN=your_preview_token
CONTENTSTACK_PREVIEW_HOST=your_preview_host
CONTENTSTACK_APP_HOST=app.contentstack.com
CONTENTSTACK_LIVE_EDIT_TAGS=true

# Public Environment Variables (available to browser)
NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_api_key
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=your_environment
NEXT_PUBLIC_CONTENTSTACK_REGION=NA
NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW=true
NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN=your_preview_token
NEXT_PUBLIC_CONTENTSTACK_APP_HOST=app.contentstack.com
NEXT_PUBLIC_CONTENTSTACK_LIVE_EDIT_TAGS=true
NEXT_PUBLIC_CONTENTSTACK_BRANCH=main
```

**Important Notes:**
- Never commit `.env.local` to version control
- Use `.env.example` to document required variables
- Restart dev server after changing environment variables

---

## Troubleshooting

### Development Server Issues

**Problem:** Port 3000 is already in use
```bash
# Solution: Kill the process or use a different port
PORT=3001 npm run dev
```

**Problem:** Module not found errors
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### MCP Server Issues

**Problem:** MCP commands not working
- Verify environment variables are set in the current terminal session
- Check that your ContentStack credentials are valid
- Ensure you have the correct permissions for the stack

**Problem:** Authentication errors
- Verify Management Token has required permissions
- Check that API Key matches the stack
- Confirm region is correct

### Figma Access Issues

**Problem:** Cannot access Figma designs
- Ensure you're logged in to Figma
- Verify you have access to the specific file
- Check that Figma MCP integration is properly configured

---

## Next Steps

Once all prerequisites are met, you can proceed with:
1. [Retrieve Design Details](./retrieve-design-details.md) - Extract design specifications
2. [Create React Component](./create-react-component.md) - Build the component
3. [Create ContentStack Content Type](./create-contentstack-contenttype.md) - Create content model

