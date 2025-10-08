## Prerequisites
- **Cursor IDE** with MCP support enabled

## Step 1: Enable MCP Server

### 1.1 Enable the MCP Server
1. **Enable "Dev Mode MCP Server"** option
2. **Confirm activation** - You should see a confirmation message at the bottom of the screen

✅ **Success Indicator**: The server will run locally at `http://127.0.0.1:3845/sse`

### 1.3 Verify Server Status
Check that the MCP server is running properly:
- The confirmation message should indicate the server is "enabled and running"

## Step 2: Configure Cursor for MCP Integration

### 2.1 Access Cursor MCP Settings
1. **Open Cursor IDE**
2. **Navigate to Settings**:
   - Mac: `Cursor → Settings → Cursor Settings` or `⌘,`
   - Windows/Linux: `File → Preferences → Settings` or `Ctrl+,`
3. **Go to the MCP tab** in the settings panel

### 2.2 Add CMA MCP Server
1. **Click "+ Add new global MCP server"**
2. **Enter the server configuration**:
   ```json
   {
     "mcpServers": {
       "cma": {
         "url": "http://127.0.0.1:3845/sse"
       }
     }
   }
   ```
3. **Save the configuration**

*Cursor MCP configuration showing the server setup with the correct URL*

