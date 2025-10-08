# ContentStack MCP Server Setup Guide

## Overview

The ContentStack MCP (Model Context Protocol) Server enables direct integration between your ContentStack instance and AI assistants, allowing for automated content management, content type creation, and data operations through natural language commands.

🎯 **What You'll Achieve**: Direct AI access to your ContentStack instance for content management, content type operations, and automated content workflows.

## Prerequisites

- **ContentStack Account** with API access
- **ContentStack API Keys** (Management API required, Delivery API optional)
- **Cursor IDE** with MCP support enabled
- **Node.js 18+** installed

## Step 1: Install the ContentStack MCP Server

### 1.1 Global Installation
```bash
npm install -g @contentstack/mcp
```

### 1.2 Verify Installation
```bash
npx @contentstack/mcp --help
```

✅ **Success Indicator**: You should see the help message with available options.

## Step 2: Get Your ContentStack Credentials

### 2.1 Stack API Key
1. **Log into ContentStack Dashboard**
2. **Navigate to Settings → Stack**
3. **Copy the API Key** from the stack settings

### 2.2 Management Token
1. **Go to Settings → Tokens → Management Tokens**
2. **Create a new token** or use an existing one
3. **Set appropriate permissions** for your use case:
   - Content Types: Read/Write
   - Entries: Read/Write
   - Assets: Read/Write
   - Environments: Read
4. **Copy the Management Token**

### 2.3 Delivery Token (Optional)
1. **Go to Settings → Tokens → Delivery Tokens**
2. **Create a new token** for content delivery operations
3. **Copy the Delivery Token**

### 2.4 Region Information
1. **Check your ContentStack region** in Settings → Stack
2. **Note the region code**:
   - `NA` - North America
   - `EU` - Europe
   - `AZURE_NA` - Azure North America
   - `AZURE_EU` - Azure Europe

## Step 3: Configure Environment Variables

### 3.1 Windows (PowerShell)
```powershell
$env:CONTENTSTACK_API_KEY="your_api_key_here"
$env:CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token_here"
$env:CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token_here"
```

### 3.2 Windows (Command Prompt)
```cmd
set CONTENTSTACK_API_KEY=your_api_key_here
set CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token_here
set CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
set CONTENTSTACK_REGION=NA
```

### 3.3 macOS/Linux (Bash)
```bash
export CONTENTSTACK_API_KEY="your_api_key_here"
export CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token_here"
export CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token_here"
export CONTENTSTACK_REGION="NA"
```

## Step 4: Configure Cursor for ContentStack MCP

### 4.1 Access Cursor MCP Settings
1. **Open Cursor IDE**
2. **Navigate to Settings**:
   - Mac: `Cursor → Settings → Cursor Settings` or `⌘,`
   - Windows/Linux: `File → Preferences → Settings` or `Ctrl+,`
3. **Go to the MCP tab** in the settings panel

### 4.2 Add ContentStack MCP Server
1. **Click "+ Add new global MCP server"**
2. **Enter the server configuration**:
   ```json
   {
     "mcpServers": {
       "contentstack": {
         "command": "npx",
         "args": ["-y", "@contentstack/mcp"],
         "env": {
           "CONTENTSTACK_API_KEY": "your_api_key_here",
           "CONTENTSTACK_MANAGEMENT_TOKEN": "your_management_token_here",
           "CONTENTSTACK_DELIVERY_TOKEN": "your_delivery_token_here"
         }
       }
     }
   }
   ```
3. **Save the configuration**

### 4.3 Verify Connection
1. **Restart Cursor** to ensure the configuration loads properly
2. **Check Tools & Integrations** in Cursor settings
3. **Confirm ContentStack MCP tools are available**:
   - Content type operations
   - Entry management
   - Asset operations
   - Environment management

✅ **Success Indicator**: You should see the ContentStack MCP server listed as "Connected" with available tools.

## Step 5: Test the Integration

### 5.1 Basic Connection Test
1. **Start a chat session** in Cursor
2. **Prompt the AI**: "List all content types in my ContentStack instance"
3. **Verify**: The AI should access your ContentStack and return content type information

### 5.2 Content Operations Test
1. **Prompt the AI**: "Show me all entries for the 'blog_post' content type"
2. **Verify**: The AI should fetch and display your blog entries

### 5.3 Content Creation Test
1. **Prompt the AI**: "Create a new blog post entry with title 'Test Post' and content 'This is a test'"
2. **Verify**: The AI should create the entry in your ContentStack instance

## Available MCP Operations

The ContentStack MCP Server provides several specialized operations:

### Content Type Operations
- **List Content Types** - Get all content types in your stack
- **Get Content Type** - Retrieve specific content type details
- **Create Content Type** - Create new content types
- **Update Content Type** - Modify existing content types
- **Delete Content Type** - Remove content types

### Entry Operations
- **List Entries** - Get all entries for a content type
- **Get Entry** - Retrieve specific entry details
- **Create Entry** - Create new entries
- **Update Entry** - Modify existing entries
- **Delete Entry** - Remove entries
- **Publish Entry** - Publish entries to environments

### Asset Operations
- **List Assets** - Get all assets in your stack
- **Get Asset** - Retrieve specific asset details
- **Upload Asset** - Upload new assets
- **Update Asset** - Modify existing assets
- **Delete Asset** - Remove assets

### Environment Operations
- **List Environments** - Get all environments
- **Get Environment** - Retrieve specific environment details
- **Publish to Environment** - Publish content to specific environments

## Best Practices for Optimal Results

### Content Management
- **Use specific content type UIDs** when referencing content types
- **Include environment names** when publishing content
- **Specify locale codes** for multilingual content
- **Use proper field names** as defined in your content types

### Effective Prompting
- **Be specific about operations**: "Create a new blog post entry" vs "add content"
- **Include required fields**: "Create a blog post with title 'My Post' and content 'Hello World'"
- **Specify environments**: "Publish the 'hero-banner' entry to the 'production' environment"
- **Use content type UIDs**: "Show me all entries for content type 'blog_post'"

### Security Considerations
- **Use read-only tokens** for content delivery operations
- **Limit management token permissions** to only what's needed
- **Regularly rotate tokens** for security
- **Monitor API usage** through ContentStack dashboard

## Troubleshooting

### Common Issues and Solutions

#### MCP Server Not Connecting
- **Verify environment variables** are set correctly
- **Check ContentStack credentials** are valid and have proper permissions
- **Restart Cursor** after configuration changes
- **Test server manually**: `npx @contentstack/mcp`

#### Permission Errors
- **Check Management Token permissions** in ContentStack dashboard
- **Verify API Key** is correct and active
- **Ensure token has required scopes** for the operations you're trying to perform

#### Content Not Found
- **Verify content type UIDs** are correct
- **Check environment names** are spelled correctly
- **Ensure content exists** in the specified environment
- **Verify locale codes** for multilingual content

#### Connection Drops
- **Check ContentStack service status** at status.contentstack.com
- **Verify network connectivity** to ContentStack APIs
- **Restart the MCP server** if needed

## Security and Privacy

- **Local Processing**: MCP operations are processed through your local machine
- **Token Security**: Store credentials securely and rotate regularly
- **API Limits**: Be aware of ContentStack API rate limits
- **Audit Logs**: Monitor ContentStack audit logs for MCP operations

## Next Steps

Once you have the ContentStack MCP Server properly configured:

1. **Practice with simple operations** to understand the workflow
2. **Set up content type templates** for common content patterns
3. **Create automated workflows** for content management
4. **Establish team guidelines** for AI-assisted content operations

---

**Related Resources:**
- [ContentStack Management API Documentation](https://www.contentstack.com/docs/developers/apis/content-management-api)
- [ContentStack Delivery API Documentation](https://www.contentstack.com/docs/developers/apis/content-delivery-api)
- [MCP Protocol Documentation](https://modelcontextprotocol.io/)

📋 **Pro Tip**: The ContentStack MCP Server enables powerful AI-assisted content management workflows. Start with simple operations and gradually build more complex automation patterns!
