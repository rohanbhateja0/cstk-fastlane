# For Designers

Welcome to the FastLane design resources! This section provides design system guidelines and tools for creating consistent, brand-compliant user interfaces.

## 🎨 Design System Guides

### [Design Theming & Color Mapping](./for-designers/guide-design-theming-color-mapping-in-figma.md)
Comprehensive guide for using Figma Token Studio to map customer brand colors into Tailwind-compatible tokens. Learn how to:
- Set up Token Studio collections properly
- Map brand colors to Tailwind tokens
- Export clean CSS variables for development
- Maintain design system consistency

## 🎯 Design Workflow

1. **Brand Analysis**: Analyze customer brand guidelines and color requirements
2. **Token Setup**: Configure Token Studio collections (TailwindCss → Theme → Mode)
3. **Mapping**: Map customer colors to Tailwind semantic tokens
4. **Export**: Generate CSS variables for developer handoff
5. **Validation**: Use Token Studio inspect mode to verify token links

## 🛠️ Design Tools Integration

### **Figma Token Studio**
- **TailwindCss Collection**: Store raw customer brand colors
- **Theme Collection**: Map to Tailwind color tokens and define extra intents
- **Mode Collection**: Define base tokens for CSS export

### **Design System Components**
- All FastLane components are designed with Token Studio integration
- Components use semantic tokens for consistent theming
- Brand customization through token overrides, not component modifications

## 📋 Quality Checklist

Before handoff to development, ensure:
- ✅ All raw colors defined in TailwindCss collection
- ✅ Theme/color tokens properly mapped to customer colors
- ✅ Extra-intents only used when necessary
- ✅ All base tokens defined in Mode collection
- ✅ No broken or unresolved tokens in Token Studio
- ✅ Component overrides use only base tokens

## 📚 Additional Resources

- [Component Library](../library/components/) - Design specifications and usage guidelines
- [Global Styling Guide](../library/components/global-styling-guide.md) - System-wide design standards
- [Page Templates](../library/templates/) - Layout patterns and structures

## 🎨 Design Principles

### **Consistency First**
- Reuse existing Tailwind tokens before creating new ones
- Keep the design system clean and scalable
- Preserve portability and flexibility across projects

### **Brand Adaptation**
- Start with Theme/color tokens for standard mappings
- Use extra-intents sparingly for unique requirements
- Always provide base token definitions for custom intents

### **Developer Collaboration**
- Export tokens in developer-friendly formats
- Document any custom token usage
- Maintain clear handoff documentation

---

*For technical implementation details, refer to the [For Developers](../for-developers/) section.* 
