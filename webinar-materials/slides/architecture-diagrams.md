# Architecture Diagrams for Webinar

## Collection of Mermaid diagrams for use in the AI in SDLC webinar slides

---

## Diagram 1: Complete AI-Powered SDLC Flow

This diagram shows the complete flow from design to deployment with AI integration at each phase.

```mermaid
flowchart TB
    subgraph design [Design Phase]
        Figma[Figma Designs]
        FigmaMCP[Figma MCP Server]
    end
    
    subgraph dev [Development Phase]
        AIPrompts[AI Prompt Templates]
        Cursor[Cursor IDE]
        Components[React Components]
    end
    
    subgraph cms [Content Management]
        CSMCP[Contentstack MCP]
        ContentTypes[Content Types]
        Entries[Entries]
    end
    
    subgraph test [Testing Phase]
        UnitTests[Unit Tests]
        BrowserMCP[Browser MCP]
        LivePreview[Live Preview]
    end
    
    subgraph deploy [Deployment]
        GitHub[GitHub Actions]
        Vercel[Vercel]
        Security[Security Scans]
    end
    
    Figma --> FigmaMCP
    FigmaMCP --> Cursor
    AIPrompts --> Cursor
    Cursor --> Components
    Components --> CSMCP
    CSMCP --> ContentTypes
    CSMCP --> Entries
    Components --> UnitTests
    Components --> BrowserMCP
    Entries --> LivePreview
    Components --> GitHub
    GitHub --> Security
    Security --> Vercel
```

---

## Diagram 2: MCP Server Architecture

This diagram shows how MCP servers connect the IDE to external tools.

```mermaid
flowchart LR
    subgraph ide [Cursor IDE]
        AIAssistant[AI Assistant]
        MCPClient[MCP Client]
    end
    
    subgraph servers [MCP Servers]
        FigmaSrv[Figma MCP<br/>127.0.0.1:3845<br/>Requires Setup]
        CSSrv[Contentstack MCP<br/>npx @contentstack/mcp<br/>Requires Setup]
        BrowserSrv[Browser MCP<br/>cursor-ide-browser<br/>Built-in to Cursor]
    end
    
    subgraph tools [External Tools]
        FigmaApp[Figma Desktop App]
        CSAPI[Contentstack API]
        Browser[Web Browser]
    end
    
    AIAssistant --> MCPClient
    MCPClient --> FigmaSrv
    MCPClient --> CSSrv
    MCPClient --> BrowserSrv
    
    FigmaSrv --> FigmaApp
    CSSrv --> CSAPI
    BrowserSrv --> Browser
```

---

## Diagram 3: Component Development Workflow

This diagram shows the step-by-step process for creating a new component.

```mermaid
flowchart TD
    Start([Start: New Component Request])
    
    Step1[1. Open Figma Design<br/>Select Component Frame]
    Step2[2. Figma MCP Extracts<br/>Design Tokens & Structure]
    Step3[3. Customize Create<br/>Component Template]
    Step4[4. AI Generates<br/>React Component]
    Step5[5. Contentstack MCP<br/>Creates Content Type]
    Step6[6. Create Sample Entry<br/>& Publish]
    Step7[7. AI Generates<br/>Unit Tests]
    Step8[8. Test in Browser<br/>with Live Preview]
    
    EndSuccess([Done: Component Ready])
    
    Start --> Step1
    Step1 --> Step2
    Step2 --> Step3
    Step3 --> Step4
    Step4 --> Step5
    Step5 --> Step6
    Step6 --> Step7
    Step7 --> Step8
    Step8 --> EndSuccess
```

---

## Diagram 4: Contentstack Integration Pattern

This diagram shows how components integrate with Contentstack CMS.

```mermaid
flowchart TB
    subgraph client [Client Browser]
        Page[Next.js Page]
        Component[React Component]
        LiveEdit[Live Preview Mode]
    end
    
    subgraph server [Next.js Server]
        ServerComp[Server Component]
        Query[Content Query]
        EditTags[addEditableTags]
    end
    
    subgraph cms [Contentstack CMS]
        DeliveryAPI[Delivery API]
        PreviewAPI[Preview API]
        VisualBuilder[Visual Builder]
    end
    
    Page --> ServerComp
    ServerComp --> Query
    Query --> DeliveryAPI
    Query --> PreviewAPI
    EditTags --> Component
    Component --> LiveEdit
    LiveEdit <--> VisualBuilder
```

---

## Diagram 5: AI Prompt Template System

This diagram shows how AI prompt templates ensure consistent code generation.

```mermaid
flowchart LR
    subgraph inputs [Context Inputs]
        Template[Prompt Template]
        CompDoc[Component Docs]
        CoreReqs[Core Requirements]
        FigmaDesign[Figma Design]
    end
    
    subgraph ai [AI Processing]
        AIEngine[Claude AI Engine]
    end
    
    subgraph outputs [Generated Outputs]
        TSInterface[TypeScript Interface]
        ReactComp[React Component]
        Styles[Tailwind Classes]
        CMSInteg[CMS Integration]
    end
    
    Template --> AIEngine
    CompDoc --> AIEngine
    CoreReqs --> AIEngine
    FigmaDesign --> AIEngine
    
    AIEngine --> TSInterface
    AIEngine --> ReactComp
    AIEngine --> Styles
    AIEngine --> CMSInteg
```

---

## Diagram 6: Personalization Architecture

This diagram shows the Lytics and Contentstack Personalize integration.

```mermaid
flowchart TB
    subgraph user [User Journey]
        Visit[User Visits Site]
        Browse[Browses Pages]
        Actions[Takes Actions]
    end
    
    subgraph tracking [Tracking Layer]
        LyticsSDK[Lytics SDK]
        Events[Behavioral Events]
        Profile[User Profile]
    end
    
    subgraph personalization [Personalization]
        CSPersonalize[Contentstack Personalize]
        Variants[Content Variants]
        ABTest[A/B Testing]
    end
    
    subgraph delivery [Content Delivery]
        VariantParam[Variant Parameter]
        PersonalizedContent[Personalized Content]
    end
    
    Visit --> LyticsSDK
    Browse --> LyticsSDK
    Actions --> LyticsSDK
    
    LyticsSDK --> Events
    Events --> Profile
    Profile --> CSPersonalize
    
    CSPersonalize --> Variants
    CSPersonalize --> ABTest
    Variants --> VariantParam
    ABTest --> VariantParam
    VariantParam --> PersonalizedContent
```

---

## Diagram 7: CI/CD Pipeline

This diagram shows the automated deployment pipeline with security checks.

```mermaid
flowchart LR
    subgraph trigger [Trigger]
        PR[Pull Request]
        Push[Push to Branch]
    end
    
    subgraph checks [Security Checks]
        Talisman[Talisman<br/>Secrets Scan]
        Snyk[Snyk<br/>SCA Scan]
        Policy[Policy Scan<br/>Compliance]
    end
    
    subgraph build [Build & Deploy]
        Build[Next.js Build]
        Vercel[Vercel Deploy]
    end
    
    subgraph notify [Notifications]
        Jira[Jira Ticket]
        Status[PR Status]
    end
    
    PR --> Talisman
    PR --> Snyk
    PR --> Policy
    Push --> Jira
    
    Talisman --> Build
    Snyk --> Build
    Policy --> Build
    
    Build --> Vercel
    Vercel --> Status
```

---

## Diagram 8: Traditional vs AI-Powered SDLC Comparison

This diagram compares the traditional workflow with the AI-powered approach.

```mermaid
flowchart TB
    subgraph traditional [Traditional Approach]
        direction TB
        T1[1. Review Figma Design<br/>30 min]
        T2[2. Write Component Code<br/>60-120 min]
        T3[3. Create Content Type<br/>30 min]
        T4[4. Create Test Entry<br/>15 min]
        T5[5. Write Unit Tests<br/>45 min]
        T6[6. Debug & Fix<br/>30-60 min]
        
        T1 --> T2 --> T3 --> T4 --> T5 --> T6
    end
    
    subgraph aipowered [AI-Powered Approach]
        direction TB
        A1[1. Select Figma Frame<br/>1 min]
        A2[2. AI Generates Component<br/>3 min]
        A3[3. AI Creates Content Type<br/>2 min]
        A4[4. AI Creates Entry<br/>1 min]
        A5[5. AI Generates Tests<br/>2 min]
        A6[6. Review & Refine<br/>5 min]
        
        A1 --> A2 --> A3 --> A4 --> A5 --> A6
    end
```

**Time Comparison:**
- Traditional: 3.5 - 5.5 hours
- AI-Powered: 15 - 20 minutes

---

## Diagram 9: FastLane Technology Stack

This diagram shows the complete technology stack used in FastLane.

```mermaid
flowchart TB
    subgraph frontend [Frontend Layer]
        NextJS[Next.js 14+<br/>App Router]
        React[React 18]
        TypeScript[TypeScript]
        Tailwind[Tailwind CSS]
        ShadCN[ShadCN UI]
    end
    
    subgraph cms [CMS Layer]
        Contentstack[Contentstack CMS]
        LivePreview[Live Preview SDK]
        Personalize[Personalize SDK]
    end
    
    subgraph ai [AI Layer]
        Cursor[Cursor IDE]
        FigmaMCP[Figma MCP]
        CSMCP[Contentstack MCP]
        Prompts[AI Prompt Templates]
    end
    
    subgraph analytics [Analytics Layer]
        Lytics[Lytics CDP]
        Tracking[Behavioral Tracking]
        Segments[Audience Segments]
    end
    
    subgraph devops [DevOps Layer]
        GitHub[GitHub Actions]
        Vercel[Vercel]
        Security[Security Scanning]
    end
    
    NextJS --> React
    React --> TypeScript
    TypeScript --> Tailwind
    Tailwind --> ShadCN
    
    Contentstack --> LivePreview
    Contentstack --> Personalize
    
    Cursor --> FigmaMCP
    Cursor --> CSMCP
    Cursor --> Prompts
    
    Lytics --> Tracking
    Tracking --> Segments
    
    GitHub --> Vercel
    GitHub --> Security
```

---

## Usage Instructions

### Converting to Slides

1. **Mermaid Live Editor:**
   - Go to https://mermaid.live
   - Paste diagram code
   - Export as PNG or SVG

2. **VS Code Extension:**
   - Install "Markdown Preview Mermaid Support"
   - Preview diagrams in editor
   - Screenshot for slides

3. **Presentation Tools:**
   - Marp (Markdown to slides)
   - Slidev (Vue-based slides)
   - Reveal.js (HTML slides)

### Customization

- Adjust node text for different audiences
- Add company branding to exported images
- Simplify for high-level overviews
- Expand for technical deep-dives

---

## Color Reference

When exporting diagrams, consider applying consistent colors:

| Element | Suggested Color |
|---------|----------------|
| Design Phase | Blue (#3B82F6) |
| Development Phase | Green (#10B981) |
| CMS Phase | Purple (#8B5CF6) |
| Testing Phase | Orange (#F59E0B) |
| Deployment Phase | Red (#EF4444) |

---

*These diagrams can be rendered using any Mermaid-compatible tool or exported as images for presentation software.*
