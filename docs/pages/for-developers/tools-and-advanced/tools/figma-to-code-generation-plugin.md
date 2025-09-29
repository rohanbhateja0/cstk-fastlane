# Guide: Using the Figma to Code Generation Plugin

**For using this plugin you need to have the dev access of figma**

This document outlines the steps to export design tokens (variables) from Figma and integrate them into your Next.js project using the custom plugin developed by Fastlane team.

**📁 Project Setup**

Ensure your project has the following structure:

```
your-nextjs-project/
├── figma/
├── src/
│   └── styles/
└── tailwind.config.ts
```

## Step 1: Install the Figma Plugin

1. **Access the Plugin**: [Figma to Code Generation (Private)](https://www.figma.com/community/plugin/1335742650145393962)
   
2. **Install the Plugin** in your Figma workspace.

## Step 2: Run the Plugin in Figma

1. **Open your Figma design file** that contains the design tokens/variables you want to extract.

2. **Navigate to the design tokens/variables section** of your Figma file.

3. **Launch the plugin**:
   - Go to `Plugins` in the Figma menu
   - Select "Figma to Code Generation"

4. **Configure the plugin settings**:
   - Set output format to match your project needs
   - Choose which tokens to export (colors, typography, spacing, etc.)

5. **Run the extraction** to generate the design tokens.

## Step 3: Export Design Tokens

1. **Download the generated files** from the plugin output.

2. **Place the exported files** in your project's `figma/` directory:
   ```
   figma/
   ├── all-variables.json
   ├── colors.json
   ├── typography.json
   └── spacing.json
   ```

## Step 4: Configure Tailwind CSS

Update your `tailwind.config.ts` to use the exported design tokens:

```typescript
import type { Config } from 'tailwindcss';
import figmaTokens from './figma/all-variables.json';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: figmaTokens.colors,
      fontSize: figmaTokens.typography.fontSize,
      fontFamily: figmaTokens.typography.fontFamily,
      spacing: figmaTokens.spacing,
      borderRadius: figmaTokens.borderRadius,
      boxShadow: figmaTokens.shadows,
    },
  },
  plugins: [],
};

export default config;
```

## Step 5: Integration Examples

### Using Design Tokens in Components

```typescript
// Example: Using exported color tokens
<div className="bg-primary-500 text-primary-foreground">
  Primary colored section
</div>

// Example: Using typography tokens
<h1 className="text-heading-xl font-heading">
  Main Title
</h1>

// Example: Using spacing tokens  
<div className="p-spacing-md m-spacing-lg">
  Consistent spacing
</div>
```

### Custom CSS Variables

If you prefer CSS custom properties, create a CSS file from the tokens:

```css
/* styles/design-tokens.css */
:root {
  --color-primary-500: #3b82f6;
  --color-primary-foreground: #ffffff;
  --font-size-heading-xl: 2.25rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
}
```

## Step 6: Validation & Testing

1. **Build your project** to ensure all tokens are properly imported:
   ```bash
   npm run build
   ```

2. **Test token usage** in your components to verify correct application.

3. **Check for missing tokens** or naming conflicts.

## Troubleshooting

### Common Issues

**Token naming conflicts:**
- Ensure Figma variable names follow consistent conventions
- Use prefixes for different token categories (color-, spacing-, etc.)

**Missing tokens:**
- Verify all required tokens are published in Figma
- Check that the plugin has access to the design file

**Build errors:**
- Validate JSON syntax in exported token files
- Ensure all referenced tokens exist in the configuration

### Best Practices

1. **Consistent Naming**: Use kebab-case for token names in Figma
2. **Token Organization**: Group related tokens in Figma collections
3. **Version Control**: Include exported token files in your repository
4. **Regular Updates**: Re-export tokens when design system changes
5. **Documentation**: Document custom token usage patterns

## Integration with FastLane

This plugin works seamlessly with FastLane's component development workflow:

1. **Design Tokens First**: Export tokens before creating components
2. **Component Generation**: Use tokens in [AI component prompts](../../component-development/ai-prompts/templates/create-component)
3. **Consistency**: Ensure all components use the exported design system

## Related Tools

- **[Figma MCP Server](./figma-mcp-server-setup)** - For direct AI access to Figma designs
- **[Create Component Prompt](../../component-development/ai-prompts/templates/create-component)** - For AI-powered component generation

---

**Ready to streamline your design-to-code workflow?** This plugin bridges Figma design systems with FastLane development for consistent, maintainable styling! 🎨 