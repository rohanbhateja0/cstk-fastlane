# Contentstack MCP Server Integration

This guide explains how to integrate the **Contentstack MCP Server** with Cursor and use it effectively in the development workflow. Follow these steps to ensure the MCP server works correctly on your machine.

## What is Contentstack MCP Server?

The **Contentstack MCP Server** acts as a bridge between Contentstack APIs and AI tools like Cursor or Claude. It enables you to perform content operations using natural language prompts.

- Create, update, publish, and retrieve content using natural language prompts
- Interact with multiple Contentstack services (Delivery, Management, Analytics, Personalize, etc.)
- Automate workflows and content operations via AI

In simple terms, instead of calling APIs manually, you can **ask Cursor to perform content operations for you**.

## Prerequisites

Before setup, ensure:

- You have access to the following Contentstack credentials:
  - **Stack API Key**
  - **Stack Delivery Token**
  - **Stack Management Token**
- You have installed Node.js

### Getting Your Contentstack Credentials

1. **Stack API Key**: Go to Contentstack Dashboard -> Settings -> Stack -> Copy the API Key
2. **Stack Management Token**: Go to Settings -> Tokens -> Management Tokens -> Create or use existing
3. **Stack Delivery Token** (optional): Go to Settings -> Tokens -> Delivery Tokens -> Create new

## Contentstack MCP Server Setup

### Step 1 - Project Setup

Ensure your project contains the following file:

```markdown
.cursor/mcp.json
```

#### Example Configuration

```json
{
  "mcpServers": {
    ... // other MCP servers configuration
    "contentstack": {
      "command": "npx",
      "args": ["-y", "@contentstack/mcp"],
      "env": {
        "CONTENTSTACK_API_KEY": "${env:CONTENTSTACK_API_KEY}",
        "CONTENTSTACK_DELIVERY_TOKEN": "${env:CONTENTSTACK_DELIVERY_TOKEN}",
        "CONTENTSTACK_MANAGEMENT_TOKEN": "${env:CONTENTSTACK_MANAGEMENT_TOKEN}"
      }
    }
    ... // other MCP servers configuration
  }
}
```

### Step 2 - Set Environment Variables (Required)

You must configure the following environment variables:

- CONTENTSTACK_API_KEY
- CONTENTSTACK_DELIVERY_TOKEN
- CONTENTSTACK_MANAGEMENT_TOKEN

#### Windows

Run in PowerShell:

```powershell
setx CONTENTSTACK_API_KEY "<your_api_key>"
setx CONTENTSTACK_DELIVERY_TOKEN "<your_delivery_token>"
setx CONTENTSTACK_MANAGEMENT_TOKEN "<your_management_token>"
```

#### MacOS (Zsh)

```bash
echo 'export CONTENTSTACK_API_KEY="your_api_key"' >> ~/.zshrc
echo 'export CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token"' >> ~/.zshrc
echo 'export CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token"' >> ~/.zshrc
source ~/.zshrc
```

#### Linux (Bash)

```bash
echo 'export CONTENTSTACK_API_KEY="your_api_key"' >> ~/.bashrc
echo 'export CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token"' >> ~/.bashrc
echo 'export CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token"' >> ~/.bashrc
source ~/.bashrc
```

### Step 3 - Authenticate Contentstack MCP Server

OAuth configuration step is required for Content Management API. Run the following command in terminal to authenticate the Contentstack MCP Server using OAuth:

```bash
npx @contentstack/mcp --auth -y
```

#### Follow the steps to authenticate the Contentstack MCP Server using OAuth

- Select **Authorization** action from the list
- Select **Login** from the list of Authorization actions
- Select the **Contentstack region** from the list of regions
- You will be redirected to the browser to authenticate your Contentstack account. Select the **Organization** and authenticate your account
- Once done, you will get the success message in the terminal

### Step 4 - Restart Cursor

After completing all the steps, fully restart Cursor to ensure the MCP server picks up the configuration. The Contentstack MCP Server will be available in the MCP servers list in Cursor. You can verify the same by checking the list of MCP servers in Cursor.

- Open Cursor settings
- Go to the **Tools & MCP** section
- You will see the Contentstack MCP Server in the list of MCP servers
- Click on the Contentstack MCP Server to view the list of all the available tools provided by the MCP server

## Troubleshooting

Below are some of the common issues that you may encounter while setting up the Contentstack MCP Server and how to fix them.

### Error: "Please provide the Contentstack API key"

- **Cause:** Environment variables not set correctly
- **Fix:** Re-run env setup and restart Cursor

### Error: "Unexpected token ... not valid JSON"

- **Cause:** MCP process received invalid output (usually missing env vars)
- **Fix:** Ensure variables are set using persistent method (`setx` / `.zshrc`) and restart Cursor

### Error: "MCP not responding"

- **Cause:** MCP process is not responding
- **Fix:** Run auth command again, check Node.js is installed, restart Cursor and verify the environment variables are set correctly.

### Error: "OAuth configuration is required for Content Management API"

- **Cause:** MCP server is not authenticated
- **Fix:** Run the instructions mentioned in [Step 3](#step-3---authenticate-contentstack-mcp-server) to authenticate the Contentstack MCP Server using OAuth
