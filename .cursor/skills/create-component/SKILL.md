---
name: create-component
description: Create a new component from scratch based on Figma designs. Use when the user asks about creating a new component like Modal, Hero, Card, Accordion, etc.
---

# Create Component from Figma Designs

Creates a new component from scratch based on Figma designs.

## Prerequisites

This skill requires the **mcp-figma** MCP and **mcp-contentstack** MCP servers, configured in `.cursor/mcp.json`.

**Required environment variables** (set in your shell profile, e.g. `~/.zshrc`):

- `CONTENTSTACK_API_KEY` — your Contentstack API key
- `CONTENTSTACK_DELIVERY_TOKEN` — your Contentstack delivery token
- `CONTENTSTACK_MANAGEMENT_TOKEN` — your Contentstack management token

## Quick Start

When the user asks for creating a new component (e.g., "create the Modal component", "create the Hero component"):

1. Extract the component name and optional Figma URL from the request
2. Search for the create component prompt in the templates folder
3. Filter and identify the correct prompt file
4. Fetch the create component prompt
5. Check if the component is already created
6. Execute the create component prompt (respecting Figma URL priority if provided)
7. Create and save the component files
8. Update the `component-map.ts` file

## Search Instructions

### Step 1: Parse Input

Extract the component name and optional Figma URL from the user's request.

- If no component name is provided, ask the user: "Which component would you like to create?"
- To list available components, check the `component-map.ts` file.
- If a Figma URL is provided:
  - Store it as `overrideFigmaUrl`
  - This URL must take precedence over any Figma URLs found later in prompts or referenced files

### Step 2: Search for the Create Component Prompt

All create component prompt files are located in `docs/pages/for-developers/component-development/ai-prompts/templates/` and start with `create-`.

#### Option A: Scoped search (recommended)

Search for the create component prompt in the templates folder:

```markdown
docs/pages/for-developers/component-development/ai-prompts/templates/create-*.md
```

#### Option B: Fallback search

If the create component prompt is not found, try searching for a file matching `create-{ComponentName}.md` or similar pattern in the `docs/` folder.

### Step 3: Filter Results

From the search results, identify valid create component prompts:

Include files where:

- The file name starts with `create-`
- The file name contains the component name
- The file content has `# Create {ComponentName} Component from Figma Design` or similar text that indicates it is a create `{ComponentName}` component prompt

### Step 4: Handle Results

**If no valid results:**
Report to the user:

> No create component prompt found for "[ComponentName]".
>
> To see all available create component prompts, I can list them for you.

**If exactly one valid result:**
Proceed to Step 5.

**If multiple valid results:**
Present the options to the user:

> Which create component prompt would you like to use for creating "[ComponentName]"?
>
> 1. [Create Component Prompt 1] - [Brief description from prompt]
> 2. [Create Component Prompt 2] - [Brief description from prompt]

Wait for user selection, then proceed to Step 5 with the chosen prompt.

### Step 5: Fetch the Create Component Prompt

Read and load the selected create component prompt file.

### Step 6: Check if the Component is Already Created

Check if the component already exists (in `components/` and `component-map.ts`).

If the component already exists, ask the user:

> The component "[ComponentName]" is already created.
>
> Would you like to:
>
> 1. Replace the existing component
> 2. Create a new version of the component
> 3. Cancel the operation

Wait for user selection:

- **Option 1 or 2:** Proceed to Step 7.
- **Option 3:** Report "Component creation cancelled."

### Step 7: Execute the Create Component Prompt

Execute the selected create component prompt:

#### Resolve Figma Sources (Hybrid Strategy)

- Define:
  - `primaryFigmaUrl` = overrideFigmaUrl (if provided)
  - `secondaryFigmaUrls` = all Figma URLs from prompt and referenced files

#### Node Priority Rule

- When both sources contain the same node/component:
  - Match by name or structure
  - Prefer node from `primaryFigmaUrl`

#### Confidence-Based Merge (Optional)

- Assign confidence score:
  - overrideFigmaUrl -> HIGH
  - prompt Figma URLs -> MEDIUM

- Prefer higher confidence when merging nodes

#### Execution Rules

1. If `primaryFigmaUrl` exists:
   - Use it as the main design source

2. Attempt to extract:
   - Layout structure
   - Components
   - Variants
   - Assets

3. If any required data is missing or incomplete:
   - Fallback to `secondaryFigmaUrls` for:
     - Missing nodes
     - Sub-components
     - Edge cases (e.g., variants, states)

4. Merge results:
   - Prefer primary design output
   - Use secondary only to fill gaps

5. Conflict Resolution:
   - If same component exists in both:
     - Prefer primary (overrideFigmaUrl)

#### Execution Steps

1. **Fetch all referenced files** — Read all referenced files and their contents mentioned in the create component prompt (e.g., component documentation, `core-requirements.md`)
2. **Create a list of steps** — Break down the prompt into actionable steps based on the prompt and referenced files
3. **Execute the steps** — Execute each step sequentially to build the component

### Step 8: Create and Save the Component

Save all files created during the component creation process:

- Component file: `components/{ComponentName}.tsx`
- Type definitions (if needed): `core/types/components/{ComponentName}.ts`
- Any additional supporting files

### Step 9: Update the component-map.ts File

Add the new component to the `component-map.ts` file with the appropriate import and mapping entry.

## List All Available Create Component Prompts

To get a list of all available create component prompts, list the files in:

```markdown
docs/pages/for-developers/component-development/ai-prompts/templates/create-*.md
```

## Example Workflow

**User request:** "Create the Modal component"

**Actions:**

1. Parse input: Extract component name "Modal"
2. Search: Look for `create-modal.md` or `create-Modal.md`
3. Fetch: Load the prompt
4. Execute: Follow prompt + resolve Figma URL priority (if provided)
5. Save: Write files
6. Update: component-map.ts

## Error Handling

- **Required MCP server(s) not available:** Report which servers need to be connected (`mcp-figma`, `mcp-contentstack`).
- **Create component prompt not found:** Report that no prompt was found and offer to list available prompts.
- **Error executing the prompt:** Report the error message and suggest checking the prompt.
- **Error creating the component:** Report the error message and suggest checking the component code.
- **Update component-map.ts failed:** Report the error and suggest checking the `component-map.ts` file.

## Additional Resources

For detailed command usage and step-by-step instructions, see: `.cursor/commands/create-component.md`
