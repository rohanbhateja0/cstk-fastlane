# Common AI Prompts

This section contains reusable prompt templates for component development workflows. These templates are referenced in the example guides to avoid duplication and ensure consistency.

## Available Common Prompts

### [Prerequisites](./common-prerequisites)
Standard setup requirements for development server, ContentStack MCP server, and Figma access.

### [Retrieve Design Details](./retrieve-design-details)
Workflow for extracting design specifications from Figma including node identification, MCP tools usage, and specification extraction.

### [Create React Component](./create-react-component)
Steps for creating React components including TypeScript interfaces, helper functions, and component implementation requirements.

### [Create ContentStack Content Type](./create-contentstack-contenttype)
Workflow for creating ContentStack content types including schema definition, API calls, and verification.

### [Update Page Content Type](./update-contenttype)
Steps for updating the Page content type to include new component blocks in the modular blocks field.

### [Publish Entry](./publish-entry)
Workflow for creating, updating, and publishing ContentStack entries including environment and locale configuration.

### [Verify Component](./verify-component)
Standard verification checklists and testing procedures for validating component implementation.

## Usage in Examples

These common prompts are referenced in the example guides using the following syntax:

```markdown
## Phase 1: Prerequisites

> **See:** [Common Prerequisites](../common/common-prerequisites.md)

### Component-Specific Setup
- Additional setup step 1
- Additional setup step 2
```

This approach:
- **Reduces duplication** - Write once, reference many times
- **Ensures consistency** - All guides follow the same patterns
- **Simplifies maintenance** - Update once, applies everywhere
- **Improves clarity** - Separates common workflows from component-specific details

