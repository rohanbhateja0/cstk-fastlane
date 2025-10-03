# ContentStack MCP Server Configuration

## Environment Variables Setup

Set these environment variables in your system or terminal:

### Windows (PowerShell)
```powershell
$env:CONTENTSTACK_API_KEY="your_api_key_here"
$env:CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token_here"
$env:CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token_here"
```

### Windows (Command Prompt)
```cmd
set CONTENTSTACK_API_KEY=your_api_key_here
set CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token_here
set CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
set CONTENTSTACK_REGION=NA
```

### macOS/Linux (Bash)
```bash
export CONTENTSTACK_API_KEY="your_api_key_here"
export CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token_here"
export CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token_here"
```

## Getting Your Credentials

1. **Stack API Key**: 
   - Go to ContentStack Dashboard
   - Navigate to Settings → Stack
   - Copy the API Key

2. **Management Token**:
   - Go to Settings → Tokens → Management Tokens
   - Create a new token or use existing one
   - Copy the token

3. **Delivery Token** (optional):
   - Go to Settings → Tokens → Delivery Tokens
   - Create a new token for content delivery

4. **Region**:
   - Check your ContentStack region in Settings → Stack
   - Common values: NA, EU, AZURE_NA, AZURE_EU

## Testing the MCP Server

Once environment variables are set, test the server:

```bash
npx @contentstack/mcp
```

The server should start and show available operations.
