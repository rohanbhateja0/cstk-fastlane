# Create Component Command

Create a new component from scratch based on Figma designs.

**Usage:** `/create-component <ComponentName>` or `/create-component <ComponentName> --figma-url=<FigmaURL>`

**Examples:**

- `/create-component hero-banner`
- `/create-component carousel --figma-url=<link_to_figma_design>`

## Instructions

### Step 1: Parse Input

Extract the component name and Figma URL from the command argument.

- If no component name is provided, ask the user: "Which component would you like to create?"
- To list available components, use: `component-map.ts`
- If Figma URL is provided:
  - Store it as `overrideFigmaUrl`
  - This URL must take precedence over any Figma URLs found later in prompts or referenced files
- If Figma URL is not provided, use the component name to search for the create component prompt

### Step 2: Search for the create component prompt

All create component prompts files are in the `docs/pages/for-developers/component-development/ai-prompts/templates/` folder starting with `create-`.

- Option A: Scoped search (recommended)
  - Search for the create component prompt in the `docs/pages/for-developers/component-development/ai-prompts/templates/` folder starting with `create-`.
- Option B: Fallback search
  - If the create component prompt is not found, try searching for a file matching `create-{ComponentName}.md` or similar pattern in the `docs/` folder.

### Step 3: Filter Results

From the search results, identify valid create component prompts:

**Include files where:**

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
Present the options to the user using AskQuestion:

```markdown
Which create component prompt would you like to use for creating "[ComponentName]"?

1. [Create Component Prompt 1] - [Brief description from prompt]
2. [Create Component Prompt 2] - [Brief description from prompt]
...
```

Wait for user selection, then proceed to Step 5 with the chosen prompt.

### Step 5: Fetch the create component prompt

Fetch the selected create component prompt:

```markdown
[Create Component Prompt Text]
```

### Step 6: Check if the component is already created

Check if the component is already created:

If the component is already created, ask the user if they would like to replace the existing component or create a new version of the component:

> The component "[ComponentName]" is already created.
>
> Would you like to replace the existing component, create a new version of the component, or cancel the operation?
>
> 1. Replace the existing component
> 2. Create a new version of the component
> 3. Cancel the operation
>
> Please select an option:

Wait for user selection:

**If the user selects option 1 or 2:**
Proceed to Step 7 with the chosen option.

**If the user selects option 3:**
Report to the user:

> Component creation cancelled.
>
> Please try again with a different component name.

**If the user does not select an option:**
Report to the user:

> Please select an option from the list above to continue.

### Step 7: Execute the create component prompt

Execute the selected create component prompt:

```markdown
[Create Component Prompt] Read the prompt and execute it.
```

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

#### Fetch all the referenced files

Fetch all the referenced files and their respective contents mentioned in the create component prompt:

```markdown
[Referenced Files and Contents]
```

#### Create a list of steps to be executed

Create a list of steps to be executed based on the create component prompt and the referenced files and contents:

```markdown
1. [Step 1]
2. [Step 2]
3. [Step 3]
...
```

#### Execute the steps

Execute the steps one by one based on the create component prompt and the referenced files and contents:

```markdown
1. [Step 1]
2. [Step 2]
3. [Step 3]
...
```

### Step 8: Create the component

Create the component based on the create component prompt and the referenced files and contents:

```markdown
[Component Code]
```

### Step 9: Save the component

Save all the files created while creating the component to the `src/components/{ComponentName}.tsx` file:

```markdown
[Files Created]
```

### Step 10: Update the component-map.ts file

Update the component-map.ts file with the new component:

```markdown
[Component-map.ts Code]
```

## Error Handling

**Required MCP server(s) not available:**

> The required MCP servers are not connected. Check that the following servers are connected:
> mcp-figma-desktop
> mcp-contentstack

**Create component prompt not found:**

> No create component prompt found for "[ComponentName]".
>
> To see all available create component prompts, I can list them for you.

**Error executing the create component prompt:**

> Error executing the create component prompt. Please check the prompt and try again.
>
> Error: [Error Message]

**Error creating the component:**

> Error creating the component. Please check the component code and try again.
>
> Error: [Error Message]

**Update component-map.ts file failed:**

> Failed to update the component-map.ts file. Please check the component-map.ts file and try again.
>
> Error: [Error Message]

**Unknown error:**

> An unknown error occurred. Please check the error message and try again.
>
> Error: [Error Message]

## Additional Resources

For detailed search patterns and page structure, see:

- Skill: `.cursor/skills/create-component/SKILL.md`
