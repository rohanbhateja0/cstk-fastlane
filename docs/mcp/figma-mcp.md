# Figma MCP Server Integration

This guide explains how to integrate the **Figma MCP Server** with Cursor and use it effectively in the development workflow. Follow these steps to ensure the MCP server works correctly on your machine.

## What is Figma MCP Server?

The **Figma MCP Server** acts as a bridge between Figma APIs and AI tools like Cursor or Claude. It enables you to perform design operations using natural language prompts.

- Create, update, and retrieve designs using natural language prompts
- Interact with multiple Figma services (Design, Code, Assets, etc.)
- Automate workflows and design operations via AI

In simple terms, instead of calling APIs manually, you can **ask Cursor to perform design operations for you**.

## Prerequisites

Before setup, make sure you have **Figma Desktop App** installed and running. You will also require **Figma Dev Mode** access for the design file you want to use with the Figma MCP server.

## Figma MCP Server Setup

### Step 1 - Enable Figma MCP Server

Ensure your project contains the following file:

```markdown
.cursor/mcp.json
```

#### Example Configuration

```json
{
  "mcpServers": {
    ... // other MCP servers configuration
    "Figma Desktop": {
      "url": "http://127.0.0.1:3845/mcp",
      "headers": {}
    }
    ... // other MCP servers configuration
  }
}
```

### Step 2 - Restart Cursor

After completing all the steps, fully restart Cursor to ensure the MCP server picks up the configuration. The Figma MCP Server will be available in the MCP servers list in Cursor. You can verify the same by checking the list of MCP servers in Cursor.

- Open Cursor settings
- Go to the **Tools & MCP** section
- You will see the Figma MCP Server in the list of MCP servers
- Click on the Figma MCP Server to view the list of all the available tools provided by the MCP server

## Troubleshooting

Below are some of the common issues that you may encounter while setting up the Figma MCP Server and how to fix them.

### Error: "Figma MCP Server is not responding" / "No server info found"

- **Cause:** Figma desktop app is not open or the design file is not selected
- **Fix:** Open the Figma desktop app and select the design file you want to use with the Figma MCP Server.
