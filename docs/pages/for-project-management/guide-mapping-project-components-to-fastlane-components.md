# Guide: Mapping Project Components to Catalyst Components

## 📋 Overview

This guide is designed for **Project Managers**, **Business Analysts**, and **Delivery Teams** to understand how to identify project requirements and map them to existing Catalyst components or determine when new components need to be developed.

## 🎯 Purpose

- **Accelerate Development**: Leverage existing Catalyst components to reduce development time
- **Ensure Consistency**: Maintain design system standards across all projects
- **Optimize Resources**: Avoid rebuilding components that already exist
- **Facilitate Communication**: Provide clear mapping between business requirements and technical implementation

## 🔍 Component Assessment Process

### Step 1: Requirements Analysis
Before mapping components, gather:

#### **Functional Requirements**
- What does the component need to do?
- What user interactions are required?
- What data needs to be displayed?
- What are the content management requirements?

#### **Design Requirements**
- Are there specific brand guidelines?
- What are the responsive design needs?
- Are there accessibility requirements?
- What are the visual specifications?

### Step 2: Catalyst Component Inventory

#### **✅ Available Content Components**
| Component | Use Case | ContentStack Fields | Complexity |
|-----------|----------|------------------|------------|
| **[Content Card](../library/components/content-card.md)** | Feature highlights, news items, product cards | Title, Category, IntroText, Image, CTA Links | Medium |
| **[Content Section](../library/components/content-section.md)** | Large content blocks, article sections | Title, Content, Background options | Low |
| **[CTA Button](../library/components/cta-button.md)** | Call-to-action elements, form submissions | Button Text, Link, Style variants | Low |
| **[Video Player](../library/components/video-player.md)** | Media content, embedded videos | Video source, thumbnail, controls | Medium |
| **[Article Date](../library/components/articledate.md)** | News articles, blog posts | Date, format options | Low |
| **[Page Title Banner](../library/components/pagetitlebanner.md)** | Page headers, hero sections | Title, subtitle, background image | Medium |

#### **✅ Available Navigation Components**
| Component | Use Case | ContentStack Fields | Complexity |
|-----------|----------|------------------|------------|
| **[Navigation](../library/components/navigation.md)** | Main site navigation | Menu items, structure | High |
| **[Breadcrumb](../library/components/breadcrumb.md)** | Page hierarchy, user orientation | Path structure, links | Low |
| **[MegaMenu Navigation](../library/components/megamenu-navigation-meganav-meganavitem.md)** | Complex navigation with submenus | Multi-level structure | High |
| **[MegaNavLinkList](../library/components/meganavlinklist.md)** | Grouped navigation links | Link groups, categories | Medium |

#### **✅ Available Interactive Components**
| Component | Use Case | ContentStack Fields | Complexity |
|-----------|----------|------------------|------------|
| **[Modal](../library/components/modal.md)** | Overlays, popups, confirmations | Content, trigger, styling | Medium |
| **[Tabs](../library/components/tabs.md)** | Content organization, panels | Tab titles, content areas | Medium |
| **[Theme Selector](../library/components/theme-selector.md)** | Brand customization | Theme options | Medium |
| **[Alert/Notification Banner](../library/components/alertnotification-banner.md)** | System messages, announcements | Message, type, dismissible | Low |

#### **✅ Available Social Components**
| Component | Use Case | ContentStack Fields | Complexity |
|-----------|----------|------------------|------------|
| **[Social Links](../library/components/social-links.md)** | Social media connections | Platform links, icons | Low |
| **[Social Share](../library/components/social-share.md)** | Content sharing functionality | Share options, content | Medium |

### Step 3: Mapping Process

#### **🔄 Component Mapping Workflow**

1. **Identify Requirement**
   - Extract component needs from wireframes/mockups
   - Define functional and visual requirements
   - Determine content management needs

2. **Check Catalyst Inventory**
   - Review available components above
   - Assess functional alignment (80%+ match recommended)
   - Evaluate customization possibilities

3. **Decision Matrix**
   
   | Scenario | Recommendation | Action Required |
   |----------|---------------|-----------------|
   | **Exact Match** (95%+ alignment) | ✅ Use existing component | Configure in ContentStack |
   | **Good Match** (80-95% alignment) | ✅ Use with minor customization | Theme/style adjustments |
   | **Partial Match** (60-80% alignment) | ⚠️ Evaluate effort vs. custom build | Technical assessment needed |
   | **Poor Match** (<60% alignment) | ❌ Build new component | Add to development backlog |

4. **Documentation Requirements**
   - Document mapping decisions
   - Note any customizations needed
   - Update project component inventory

## 📊 Project Planning Templates

### **Component Mapping Worksheet**

```
Project: ________________
Page/Section: ___________
Date: ___________________

REQUIREMENT ANALYSIS:
□ Functional needs documented
□ Design requirements captured
□ Content management needs defined
□ Accessibility requirements noted

COMPONENT MAPPING:
Catalyst Component: _________________
Match Percentage: _____%
Customization Required: □ Yes □ No
Complexity Level: □ Low □ Medium □ High

DECISION:
□ Use existing component
□ Use with customization
□ Build new component
□ Require technical assessment

NOTES:
_________________________________
_________________________________
```

### **Project Component Inventory Template**

| Page/Section | Component Need | Catalyst Match | Decision | Priority | Effort |
|--------------|----------------|-----------------|----------|----------|--------|
| Homepage Hero | Hero banner with CTA | Page Title Banner | Use existing | High | 1 day |
| News Section | Article listing | Content Card | Use existing | Medium | 0.5 days |
| Contact Form | Form submission | Custom needed | Build new | High | 5 days |

## 🚦 Decision Guidelines

### **When to Use Existing Components**
- ✅ Functional requirements align 80%+
- ✅ Visual customization is achievable through theming
- ✅ ContentStack field structure meets content needs
- ✅ Component supports required user interactions

### **When to Build New Components**
- ❌ Unique business logic required
- ❌ Specialized data structures needed
- ❌ Complex custom interactions
- ❌ Regulatory/compliance specific requirements

### **Risk Assessment**
| Risk Level | Description | Mitigation |
|------------|-------------|------------|
| **Low** | Direct component reuse | Standard configuration |
| **Medium** | Minor customization needed | Theme adjustments, CSS overrides |
| **High** | Significant modifications required | Technical spike, effort estimation |
| **Critical** | New component development | Full development cycle planning |

## 📅 Implementation Planning

### **Timeline Considerations**
- **Existing Component**: 0.5-1 day (configuration only)
- **Light Customization**: 1-2 days (theme/style changes)
- **Heavy Customization**: 3-5 days (component modifications)
- **New Component**: 5-15 days (full development cycle)

### **Resource Requirements**
- **PM/BA**: Requirements documentation, stakeholder communication
- **Designer**: Visual specifications, interaction design
- **Developer**: Technical implementation, testing
- **Content Editor**: Field configuration, content strategy

## 📚 Resources and Tools

### **Documentation References**
- [Component Library Documentation](../library/components/) - Complete component specs
- [Page Templates](../library/templates/) - Pre-built layouts
- [Design System Guide](../for-designers/guide-design-theming-color-mapping-in-figma.md) - Brand customization

### **Communication Templates**
- Component mapping worksheets
- Technical assessment requests
- Stakeholder decision documents
- Development effort estimates

## 🎯 Success Metrics

Track these KPIs for component reuse:
- **Reuse Rate**: % of requirements met by existing components
- **Development Velocity**: Time saved through component reuse
- **Quality Consistency**: Reduced bugs through proven components
- **Brand Alignment**: Consistent visual standards across projects

## 📞 Escalation Process

**When Technical Assessment Needed:**
1. Document specific requirements not met by existing components
2. Submit technical assessment request to development team
3. Include business justification for custom development
4. Review effort estimates and timeline impact

**Stakeholder Communication:**
- Keep stakeholders informed of component decisions
- Explain impact on timeline and budget
- Document any compromises or alternatives chosen

---

*This guide should be used in conjunction with the Catalyst component documentation and regularly updated as new components are added to the library.* 
