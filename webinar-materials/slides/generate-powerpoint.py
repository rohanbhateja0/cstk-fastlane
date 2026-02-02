"""
PowerPoint Generator for AI in SDLC Webinar
============================================

This script generates a PowerPoint presentation from the webinar content.

Requirements:
    pip install python-pptx

Usage:
    python generate-powerpoint.py

Output:
    ai-sdlc-webinar.pptx
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor as RgbColor  # RGB color class
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import os

def create_presentation():
    """Create the AI in SDLC webinar PowerPoint presentation."""
    
    prs = Presentation()
    prs.slide_width = Inches(13.333)  # 16:9 aspect ratio
    prs.slide_height = Inches(7.5)
    
    # Color scheme
    DARK_BLUE = RgbColor(30, 58, 138)      # Primary
    LIGHT_BLUE = RgbColor(59, 130, 246)    # Accent
    DARK_GRAY = RgbColor(31, 41, 55)       # Text
    WHITE = RgbColor(255, 255, 255)
    LIGHT_GRAY = RgbColor(243, 244, 246)   # Background
    GREEN = RgbColor(16, 185, 129)         # Success
    PURPLE = RgbColor(139, 92, 246)        # Highlight
    
    # Slide layouts
    title_slide_layout = prs.slide_layouts[6]  # Blank
    content_slide_layout = prs.slide_layouts[6]  # Blank
    
    def add_title_slide(title, subtitle):
        """Add a title slide."""
        slide = prs.slides.add_slide(title_slide_layout)
        
        # Background
        background = slide.shapes.add_shape(
            MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height
        )
        background.fill.solid()
        background.fill.fore_color.rgb = DARK_BLUE
        background.line.fill.background()
        
        # Title
        title_box = slide.shapes.add_textbox(Inches(0.5), Inches(2.5), Inches(12.333), Inches(1.5))
        title_frame = title_box.text_frame
        title_para = title_frame.paragraphs[0]
        title_para.text = title
        title_para.font.size = Pt(44)
        title_para.font.bold = True
        title_para.font.color.rgb = WHITE
        title_para.alignment = PP_ALIGN.CENTER
        
        # Subtitle
        subtitle_box = slide.shapes.add_textbox(Inches(0.5), Inches(4.2), Inches(12.333), Inches(1))
        subtitle_frame = subtitle_box.text_frame
        subtitle_para = subtitle_frame.paragraphs[0]
        subtitle_para.text = subtitle
        subtitle_para.font.size = Pt(24)
        subtitle_para.font.color.rgb = RgbColor(191, 219, 254)
        subtitle_para.alignment = PP_ALIGN.CENTER
        
        return slide
    
    def add_section_slide(title):
        """Add a section divider slide."""
        slide = prs.slides.add_slide(title_slide_layout)
        
        # Background
        background = slide.shapes.add_shape(
            MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height
        )
        background.fill.solid()
        background.fill.fore_color.rgb = LIGHT_BLUE
        background.line.fill.background()
        
        # Title
        title_box = slide.shapes.add_textbox(Inches(0.5), Inches(3), Inches(12.333), Inches(1.5))
        title_frame = title_box.text_frame
        title_para = title_frame.paragraphs[0]
        title_para.text = title
        title_para.font.size = Pt(40)
        title_para.font.bold = True
        title_para.font.color.rgb = WHITE
        title_para.alignment = PP_ALIGN.CENTER
        
        return slide
    
    def add_content_slide(title, bullets, notes=None):
        """Add a content slide with title and bullet points."""
        slide = prs.slides.add_slide(content_slide_layout)
        
        # Title bar
        title_bar = slide.shapes.add_shape(
            MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, Inches(1.2)
        )
        title_bar.fill.solid()
        title_bar.fill.fore_color.rgb = DARK_BLUE
        title_bar.line.fill.background()
        
        # Title text
        title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(12.333), Inches(0.8))
        title_frame = title_box.text_frame
        title_para = title_frame.paragraphs[0]
        title_para.text = title
        title_para.font.size = Pt(32)
        title_para.font.bold = True
        title_para.font.color.rgb = WHITE
        
        # Content
        content_box = slide.shapes.add_textbox(Inches(0.75), Inches(1.5), Inches(11.833), Inches(5.5))
        content_frame = content_box.text_frame
        content_frame.word_wrap = True
        
        for i, bullet in enumerate(bullets):
            if i == 0:
                para = content_frame.paragraphs[0]
            else:
                para = content_frame.add_paragraph()
            
            para.text = bullet
            para.font.size = Pt(20)
            para.font.color.rgb = DARK_GRAY
            para.space_after = Pt(12)
            para.level = 0
        
        # Add notes if provided
        if notes:
            notes_slide = slide.notes_slide
            notes_slide.notes_text_frame.text = notes
        
        return slide
    
    def add_two_column_slide(title, left_title, left_items, right_title, right_items):
        """Add a slide with two columns."""
        slide = prs.slides.add_slide(content_slide_layout)
        
        # Title bar
        title_bar = slide.shapes.add_shape(
            MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, Inches(1.2)
        )
        title_bar.fill.solid()
        title_bar.fill.fore_color.rgb = DARK_BLUE
        title_bar.line.fill.background()
        
        # Title text
        title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(12.333), Inches(0.8))
        title_frame = title_box.text_frame
        title_para = title_frame.paragraphs[0]
        title_para.text = title
        title_para.font.size = Pt(32)
        title_para.font.bold = True
        title_para.font.color.rgb = WHITE
        
        # Left column title
        left_title_box = slide.shapes.add_textbox(Inches(0.75), Inches(1.5), Inches(5.5), Inches(0.5))
        left_title_frame = left_title_box.text_frame
        left_title_para = left_title_frame.paragraphs[0]
        left_title_para.text = left_title
        left_title_para.font.size = Pt(24)
        left_title_para.font.bold = True
        left_title_para.font.color.rgb = LIGHT_BLUE
        
        # Left column content
        left_content_box = slide.shapes.add_textbox(Inches(0.75), Inches(2.1), Inches(5.5), Inches(4.5))
        left_content_frame = left_content_box.text_frame
        left_content_frame.word_wrap = True
        
        for i, item in enumerate(left_items):
            if i == 0:
                para = left_content_frame.paragraphs[0]
            else:
                para = left_content_frame.add_paragraph()
            para.text = f"• {item}"
            para.font.size = Pt(18)
            para.font.color.rgb = DARK_GRAY
            para.space_after = Pt(8)
        
        # Right column title
        right_title_box = slide.shapes.add_textbox(Inches(7), Inches(1.5), Inches(5.5), Inches(0.5))
        right_title_frame = right_title_box.text_frame
        right_title_para = right_title_frame.paragraphs[0]
        right_title_para.text = right_title
        right_title_para.font.size = Pt(24)
        right_title_para.font.bold = True
        right_title_para.font.color.rgb = LIGHT_BLUE
        
        # Right column content
        right_content_box = slide.shapes.add_textbox(Inches(7), Inches(2.1), Inches(5.5), Inches(4.5))
        right_content_frame = right_content_box.text_frame
        right_content_frame.word_wrap = True
        
        for i, item in enumerate(right_items):
            if i == 0:
                para = right_content_frame.paragraphs[0]
            else:
                para = right_content_frame.add_paragraph()
            para.text = f"• {item}"
            para.font.size = Pt(18)
            para.font.color.rgb = DARK_GRAY
            para.space_after = Pt(8)
        
        return slide
    
    # =========================================
    # CREATE SLIDES
    # =========================================
    
    # Slide 1: Title
    add_title_slide(
        "Accelerating SDLC with AI",
        "A Deep Dive into Contentstack FastLane"
    )
    
    # Slide 2: Agenda
    add_content_slide(
        "Agenda",
        [
            "1. The AI Revolution in SDLC (10 min)",
            "2. AI Integration Architecture - MCP Servers (15 min)",
            "3. Design-to-Code Workflow with Figma MCP (15 min)",
            "4. Content Management Automation (10 min)",
            "5. Personalization & Analytics (10 min)",
            "6. Live Demo - End-to-End Component Creation (10 min)",
            "7. Q&A (5 min)"
        ]
    )
    
    # Slide 3: The Problem
    add_two_column_slide(
        "The Problem We're Solving",
        "Traditional SDLC Challenges",
        [
            "Manual design translation - hours of work",
            "Inconsistent implementations",
            "Slow content type creation",
            "Repetitive testing code",
            "Context switching between tools"
        ],
        "The AI Solution",
        [
            "Design-to-code in minutes",
            "Consistent, pattern-compliant code",
            "Automated content management",
            "AI-generated tests",
            "Unified IDE workflow"
        ]
    )
    
    # Slide 4: What is FastLane
    add_two_column_slide(
        "What is FastLane?",
        "Core Technologies",
        [
            "Next.js 14+ (App Router)",
            "Contentstack CMS",
            "ShadCN UI Components",
            "Tailwind CSS",
            "TypeScript"
        ],
        "AI Integrations",
        [
            "Figma MCP Server",
            "Contentstack MCP Server",
            "Browser MCP (Built-in to Cursor)",
            "AI Prompt Templates",
            "Automated Testing"
        ]
    )
    
    # Slide 5: Section - AI Architecture
    add_section_slide("AI Integration Architecture")
    
    # Slide 6: MCP Overview
    add_content_slide(
        "Model Context Protocol (MCP) - The AI Bridge",
        [
            "MCP enables AI assistants to interact with external tools and services",
            "",
            "Three MCP Servers in FastLane:",
            "  • Figma MCP - Design extraction, code generation (requires setup)",
            "  • Contentstack MCP - Content type CRUD, entry management (requires setup)", 
            "  • Browser MCP - Frontend testing, visual verification (built-in to Cursor)",
            "",
            "All servers connect through Cursor IDE's MCP client"
        ]
    )
    
    # Slide 7: MCP Server Details
    add_two_column_slide(
        "MCP Server Capabilities",
        "Figma MCP Server",
        [
            "get_code - Generate React + Tailwind",
            "get_variable_defs - Extract design tokens",
            "get_code_connect_map - Component mapping",
            "get_image - Extract assets",
            "Runs at http://127.0.0.1:3845/sse"
        ],
        "Contentstack MCP Server",
        [
            "Content type operations (CRUD)",
            "Entry management & publishing",
            "Asset upload and organization",
            "Environment management",
            "Runs via npx @contentstack/mcp"
        ]
    )
    
    # Slide 8: Section - Design to Code
    add_section_slide("Design-to-Code Workflow")
    
    # Slide 9: AI Prompt Templates
    add_content_slide(
        "AI Prompt Templates - Context is King",
        [
            "Why FastLane AI Prompts Work:",
            "",
            "• Comprehensive Documentation - Field definitions, patterns, examples",
            "• Figma Design Integration - Direct access via MCP with node IDs",
            "• Proven Code Patterns - Contentstack SDK, ShadCN UI composition",
            "• Anti-Pattern Awareness - Built-in knowledge of common pitfalls",
            "• Testing Patterns - Comprehensive test generation",
            "",
            "Result: Production-ready components that work immediately"
        ]
    )
    
    # Slide 10: Template Types
    add_two_column_slide(
        "Available AI Prompt Templates",
        "Creation Templates",
        [
            "Create Component - New from Figma",
            "Create Unit Test - Vitest tests",
            "PR Description - Documentation"
        ],
        "Enhancement Templates",
        [
            "Enhance Component - Modify existing",
            "Add Personalization - A/B testing",
            "Core Requirements - Standards ref"
        ]
    )
    
    # Slide 11: Section - Content Management
    add_section_slide("Content Management Automation")
    
    # Slide 12: Contentstack Integration
    add_content_slide(
        "Contentstack SDK Integration Patterns",
        [
            "Dual SDK Approach:",
            "  • Legacy SDK (contentstack v3.x) - Established queries",
            "  • Modern SDK (@contentstack/delivery-sdk v4.x) - New features",
            "",
            "Key Patterns:",
            "  • Locale fallback (requested locale → en-us)",
            "  • Reference field resolution for nested content",
            "  • Live Preview with addEditableTags()",
            "  • Variant parameters for personalization"
        ]
    )
    
    # Slide 13: Live Preview
    add_content_slide(
        "Live Preview for Content Authors",
        [
            "Real-time editing experience in Contentstack Visual Builder",
            "",
            "Implementation Pattern:",
            "  • Add editable tags: {...(content?.$?.title ?? {})}",
            "  • Use CMSImage for images",
            "  • Use CMSLink for internal links (auto locale prefix)",
            "",
            "Content authors can edit directly in the browser",
            "Changes reflect immediately without page refresh"
        ]
    )
    
    # Slide 14: Section - Personalization
    add_section_slide("Personalization & Analytics")
    
    # Slide 15: Lytics + Personalize
    add_two_column_slide(
        "Personalization Stack",
        "Lytics CDP",
        [
            "Behavioral tracking",
            "User identification",
            "Audience segmentation",
            "Campaign attribution",
            "E-commerce tracking"
        ],
        "Contentstack Personalize",
        [
            "A/B testing",
            "Content variants",
            "Real-time delivery",
            "Conversion tracking",
            "Experience optimization"
        ]
    )
    
    # Slide 16: Section - Demo
    add_section_slide("Live Demo")
    
    # Slide 17: Demo Overview
    add_content_slide(
        "Demo: End-to-End Component Creation",
        [
            "We'll create a HeroBanner component in ~10 minutes:",
            "",
            "1. Design Extraction - Figma MCP analyzes design",
            "2. Component Generation - AI creates React component",
            "3. Content Type Creation - Contentstack MCP creates schema",
            "4. Entry Creation - Sample content published",
            "5. Test Generation - Unit tests created",
            "6. Live Preview - Test in browser",
            "",
            "Traditional approach: 3-5 hours → AI approach: 15-20 minutes"
        ]
    )
    
    # Slide 18: Key Takeaways
    add_content_slide(
        "Key Takeaways",
        [
            "1. AI as a Development Accelerator - Not replacement, but augmentation",
            "",
            "2. Context-Rich Development - Documentation-driven AI prompts",
            "",
            "3. End-to-End Integration - From Figma to deployed code",
            "",
            "4. Content-First Architecture - Contentstack as the foundation",
            "",
            "5. Security by Design - Automated scanning in CI/CD",
            "",
            "6. Personalization at Scale - Lytics + Contentstack Personalize"
        ]
    )
    
    # Slide 19: Resources
    add_content_slide(
        "Resources & Next Steps",
        [
            "Documentation:",
            "  • FastLane Docs: /docs/",
            "  • AI Prompts: /docs/.../ai-prompts/",
            "  • MCP Setup: /docs/.../tools/",
            "",
            "External Resources:",
            "  • Contentstack: contentstack.com/docs",
            "  • Figma MCP: help.figma.com",
            "  • Lytics: docs.lytics.com",
            "",
            "Questions? Let's discuss!"
        ]
    )
    
    # Slide 20: Q&A
    add_title_slide(
        "Questions?",
        "Thank you for attending!"
    )
    
    # Save presentation
    output_path = os.path.join(os.path.dirname(__file__), "ai-sdlc-webinar.pptx")
    prs.save(output_path)
    print(f"Presentation saved to: {output_path}")
    return output_path

if __name__ == "__main__":
    create_presentation()
