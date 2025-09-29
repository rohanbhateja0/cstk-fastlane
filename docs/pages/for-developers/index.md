# Developer Overview

Welcome to the FastLane developer documentation! This **workflow-based guide** takes you from setup through advanced development, ensuring you have everything you need to build high-quality, content-managed websites using **FastLane** and the **Sitecore Content SDK**.

## 🚀 Workflow-Based Navigation

Our documentation is organized to guide you through a logical development progression:

## 🏁 [Start Here](./for-developers/start-here/)
**Essential setup and prerequisites - begin your FastLane journey**

Complete development environment setup and comprehensive workflow guides. Start here to ensure proper configuration before diving into component development.

**What you'll get:**
- Development environment setup (Node.js, Git, dependencies)
- Sitecore component prerequisites and configuration  
- Step-by-step workflow guides for creating and enhancing components
- Troubleshooting and common setup issues

**Key Workflows:**
- [Development Prerequisites](./for-developers/start-here/workflows/sitecore-component-prerequisites) - Complete setup checklist
- [Create New Component](./for-developers/start-here/workflows/create-new-component) - Step-by-step creation process
- [Enhance Existing Component](./for-developers/start-here/workflows/enhance-existing-component) - Customization workflow

---

## 🔧 [Component Development](./for-developers/component-development/)
**AI-powered development and FastLane patterns - build amazing components**

The heart of FastLane development: AI-assisted component generation, FastLane patterns, testing strategies, and architectural guidance.

**What you'll master:**
- AI prompts and templates for rapid component development
- FastLane-specific atomic design patterns and component structure
- Comprehensive testing with Content SDK integration
- Design Library integration and component showcase

**AI-Powered Development:**
- [Create Component Guide](./for-developers/component-development/ai-prompts/guide-using-create-component-prompt) - AI-assisted component generation
- [Enhancement Guide](./for-developers/component-development/ai-prompts/guide-using-enhance-component-prompt) - AI-assisted component customization  
- [Prompt Templates](./for-developers/component-development/ai-prompts/templates/) - Ready-to-use AI templates

**FastLane Patterns:**
- [Component Development](./for-developers/component-development/fastlane/component-development) - FastLane component patterns
- [Testing Guide](./for-developers/component-development/fastlane/testing) - Comprehensive testing strategies
- [Design Library](./for-developers/component-development/fastlane/design-library) - Component showcase integration
- [Core Architecture](./for-developers/component-development/fastlane/core-architecture) - Project structure and patterns

---

## 🚀 [Tools & Advanced](./for-developers/tools-and-advanced/)
**Advanced tools and deeper technical knowledge - enhance your workflow**

Advanced development tools, design integrations, and deep architectural concepts for experienced developers and complex scenarios.

**What you'll explore:**
- Figma MCP Server for AI-powered design-to-code workflows
- Advanced Content SDK patterns and migration concepts
- Development utilities and automation tools

**Development Tools:**
- [Figma MCP Server Setup](./for-developers/tools-and-advanced/tools/figma-mcp-server-setup) - AI-powered design integration
- [Development Tools Overview](./for-developers/tools-and-advanced/tools/) - Complete toolkit

**Advanced Concepts:**
- [Content SDK Architecture](./for-developers/tools-and-advanced/content-sdk/component-architecture) - Deep architectural patterns
- [Content SDK Overview](./for-developers/tools-and-advanced/content-sdk/) - Advanced Content SDK concepts

## 🚀 Recommended Learning Path

**New to FastLane development?** Follow this progressive workflow:

### 1. 🏁 **Start with Setup** 
Complete [Start Here](./for-developers/start-here/) to establish your foundation:
- Set up your development environment
- Complete Sitecore component prerequisites  
- Understand the step-by-step workflows
- Get your first component running

### 2. 🔧 **Master Component Development**
Move to [Component Development](./for-developers/component-development/) for core skills:
- Learn AI-assisted component generation
- Master FastLane atomic design patterns
- Implement comprehensive testing strategies
- Integrate with Design Library showcase

### 3. 🚀 **Enhance with Advanced Tools**
Explore [Tools & Advanced](./for-developers/tools-and-advanced/) for productivity:
- Set up Figma MCP Server for design integration
- Understand advanced Content SDK patterns
- Implement automation and development utilities

## 🎯 When to Use Each Section

Understanding the purpose of each section:

### 🏁 **Start Here** - When you're:
- 🆕 New to FastLane development
- 🛠️ Setting up your development environment  
- 📋 Need step-by-step workflow guidance
- ❓ Troubleshooting setup issues

### 🔧 **Component Development** - When you're:
- 🎯 Building or customizing FastLane components
- 🤖 Using AI for component generation
- 🧪 Testing components with Content SDK
- 🎭 Working with FastLane's atomic design patterns

### 🚀 **Tools & Advanced** - When you're:
- 🔧 Setting up development tools and integrations
- 🎨 Connecting Figma designs to code workflows
- 🏛️ Learning advanced Content SDK architectural concepts
- ⚡ Optimizing workflows and automation

## ⚡ Quick Start

**Want to jump right in?** Here's your express path:

1. **Environment Setup** → [Start Here](./for-developers/start-here/) for complete development environment setup
2. **First Component** → [Create Component Workflow](./for-developers/start-here/workflows/create-new-component) for your first component  
3. **AI Generation** → [AI Prompt Templates](./for-developers/component-development/ai-prompts/templates/) for rapid development

### Essential Commands
```bash
# Clone and set up FastLane
git clone [repository-url]
cd xmc-fast-lane

# Install dependencies and bootstrap
npm install
npm run bootstrap

# Start development server
npm run dev
```

*Full setup instructions available in [Start Here](./for-developers/start-here/)*

## 🎨 Development Principles

### 1. **Atomic Design First**
- Build from atoms → molecules → organisms → templates
- Compose higher-level components from lower-level ones
- Maintain clear separation of concerns

### 2. **Content SDK Integration**
- Use `useSitecore()` hook for CMS context
- Implement proper field rendering patterns
- Handle page modes (editing, Design Library, preview)

### 3. **Test-Driven Development**
- Write comprehensive unit tests
- Mock Content SDK appropriately
- Test both happy path and edge cases

### 4. **Responsive & Accessible**
- Mobile-first responsive design
- WCAG 2.1 AA compliance
- Semantic HTML and proper ARIA attributes

### 5. **Performance Optimization**
- Lazy loading and code splitting
- Efficient re-rendering patterns
- Bundle size optimization

## 🚀 Advanced Development Workflows

### AI-Accelerated Development

1. **Design Analysis**: Use [Figma MCP Server](./for-developers/tools-and-advanced/tools/figma-mcp-server-setup) to analyze designs
2. **Component Generation**: Apply [Create Component Prompt](./for-developers/component-development/ai-prompts/templates/create-component)
3. **Test Generation**: Generate comprehensive tests with AI
4. **Integration**: Add to FastLane project and iterate

### Component Library Workflow

1. **Create Atoms**: Build foundational UI elements
2. **Compose Molecules**: Combine atoms into reusable patterns
3. **Build Components**: Create Sitecore-integrated components
4. **Document in Design Library**: Showcase in component library
5. **Test Comprehensively**: Ensure quality and reliability

## 📚 Additional Resources

### External Documentation
- **[Sitecore Content SDK Documentation](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html)** - Official Content SDK docs
- **[XM Cloud Starter Kit](https://github.com/Sitecore/xmcloud-starter-js)** - Reference implementation
- **[Content SDK Repository](https://github.com/Sitecore/content-sdk)** - Source code and examples

### Internal Resources
- **[Getting Started](../getting-started/)** - Project setup and team workflows
- **[Component Library](../library/components/)** - Available FastLane components
- **[Templates](../library/templates/)** - Page layout templates

## 🎯 Need Help?

### Finding the Right Guide

**Just Getting Started?**
- Begin with [Start Here](./for-developers/start-here/) for environment setup and workflows

**Building Components?**  
- Explore [Component Development](./for-developers/component-development/) for AI prompts and FastLane patterns

**Need Advanced Tools?**
- Check [Tools & Advanced](./for-developers/tools-and-advanced/) for integrations and deeper concepts

### Getting Support

- 📖 Follow the workflow-based documentation progression
- 🧪 Review test examples in FastLane testing guides
- 🛠️ Set up development tools for enhanced productivity
- 🤖 Use AI prompts for code generation and guidance

---

**Ready to build amazing FastLane applications?** Start with [Start Here](./for-developers/start-here/) to set up your environment, then move through [Component Development](./for-developers/component-development/) and [Tools & Advanced](./for-developers/tools-and-advanced/) as you grow! 🚀 
