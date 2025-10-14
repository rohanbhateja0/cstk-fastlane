# Create News section Component from Figma design

## Figma Design References
https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7448&m=dev
https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7447&m=dev

## Prompt Used

```markdown
# Create News Section Component from Figma Design

## COMPONENT CREATION TASK - READ FIRST
You are creating a NEW News Section component from scratch based on Figma designs.

CRITICAL: Ensure ALL Figma variants are accounted for in all of the options available
CRITICAL: FIRST!!!! use the Figma MCP Server to explore the designs. 
CRITICAL: For each Figma URL, execute the figma mcp server tool get_code , get_screenshot, get_metadata and all required function

IMPORTANT: The expectation is that the developer is running `npm run dev` while this prompt is being executed

## Component Information
**Component Name:** NewsSection
**File Location:** `src/components/NewsSection.tsx`
**Documentation:** `docs/pages/library/components/news-section.md`
 
## Implementation Requirements

### Required Features:
- Responsive grid layout with flexible card arrangement
- Multiple content alignment options (left, center, right)
- Consistent news section sizing and spacing
- Responsive text scaling and layout adaptation for mobile, tablet and desktop

### Required Parameters:
- News section per page (desktop 8, tablet 4, mobile 2)
- For spacing and alignment refer the figma design

### Required Fields:
- Title: Single-Line Text
- Description: Single-Line Text  
- DetailText: Rich Text
- Image: Image
- CallToAction: General Link

CRITICAL: Follow guidelines @core-requirements.md documentation.
CRITICAL: Reference the component documentation at @hero-banner.md for all business logic, field definitions, and Figma design links.
```

### CONTENTSTACK INTEGRATION
**Content Group:**
- Title: Single-Line Text
- Description: Single-Line Text  
- DetailText: Rich Text
- Image: Image
- CallToAction: General Link

**Call to Action Group:**
- Link: General Link (optional) - Primary action button
- Secondary Link: General Link (optional) - Secondary action button

**Rendering Options Group:**
- Image Order: Dropdown (left, right)
- Header Tag: Dropdown (H1-H6)
- Link Type: Dropdown (Button, Card, Link)
- Colspan: Dropdown (1-11)

1. Create the new Content Type "News Section" 

2. Start ContentStack MCP server (PowerShell example):
$env:CONTENTSTACK_API_KEY="your_api_key_here"
$env:CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token_here"
$env:CONTENTSTACK_DELIVERY_TOKEN="your_delivery_token_here"
npx -y @contentstack/mcp

3. Confirm Content Type UID
Verify the content type you want to update exists:
UID: news_section
Check this through the MCP server call get_a_single_content_type or get_a_single_global_field

4. Integrate in create content type Prompt
Detect if Content Type exists using above MCP server calls
Else, generate an appropriate scheme and call `lib/syncContentTypeOrGlobalField.ts` with below parameters
    name: News Section
    uid: news_section,
    schema: generate schema as per the sections defined above
    globalFieldFallback: false

5. Verify the new content type via MCP commands in Cursor.

6. Create a new Entry using the MCP command and add multiple news section as per the Figma https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=14076-7447&m=dev
