/**
 * Unit Test Example - Code Sample for Webinar
 * 
 * This file demonstrates comprehensive unit testing patterns for FastLane components:
 * 1. Vitest testing framework setup
 * 2. Mocking Contentstack SDK and utilities
 * 3. Testing rendering options and variants
 * 4. Testing component features and interactions
 * 5. Mock data patterns for Contentstack content
 * 
 * Key patterns to highlight during presentation:
 * - Vitest mock setup for CMS integrations
 * - Testing all component variants
 * - Mock props structure matching Contentstack schema
 * - Testing conditional rendering
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContentCard from '../ContentCard';
import { ContentCardProps } from '@/core/types/Props';

// ============================================
// Mock Setup - Required for Contentstack Integration
// ============================================

/**
 * Mock the CardItem sub-component
 * This allows us to test the ContentCard wrapper independently
 * and verify that props are passed correctly
 */
vi.mock('@/core/molecules/ContentCard/CardItem', () => ({
  default: ({ rendering_options, content, call_to_action }: any) => (
    <div data-testid="card-item">
      <div data-testid="orientation">{rendering_options.card_orientation}</div>
      <div data-testid="hide-image">{rendering_options.hide_image ? 'hidden' : 'visible'}</div>
      <div data-testid="hide-border">{rendering_options.hide_border ? 'hidden' : 'visible'}</div>
      <div data-testid="use-title-as-link">{rendering_options.use_title_as_link_text ? 'enabled' : 'disabled'}</div>
      <div data-testid="swap-image">{rendering_options.swap_image ? 'enabled' : 'disabled'}</div>
      <div data-testid="title">{content.title}</div>
    </div>
  )
}));

/**
 * Mock Next.js Link component
 * Required for testing components that use internal navigation
 */
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>
}));

/**
 * KEY PATTERN: Mock Contentstack SDK
 * These mocks are essential for testing components with CMS integration
 */
vi.mock('@/contentstack-sdk', () => ({
  onEntryChange: vi.fn(),
}));

vi.mock('@contentstack/utils', () => ({
  addEditableTags: vi.fn(),
}));

// ============================================
// Test Suite
// ============================================

describe('ContentCard Component', () => {
  
  // ====================================
  // Mock Props Definition
  // KEY PATTERN: Structure matches Contentstack schema
  // ====================================
  const mockProps: ContentCardProps = {
    contentCard: {
      content: {
        title: 'Test Title',
        category: 'Test Category',
        intro_text: 'Test intro text',
        image: { url: 'test-image.jpg' },
        icon: { url: 'test-icon.jpg' },
        $: {}  // Editable tags metadata placeholder
      },
      rendering_options: {
        card_orientation: 'Vertical',
        image_order: 'left',
        header_tag: 'h2',
        link_type: 'Button',
        colspan: '1',
        hide_image: false,
        hide_border: false,
        use_title_as_link_text: false,
        swap_image: false,
        $: {}  // Editable tags metadata placeholder
      },
      call_to_action: {
        link: { href: 'https://example.com', title: 'Test Link' },
        $: {}
      },
      $: {}  // Top-level editable tags metadata
    }
  };

  // ====================================
  // Reset mocks before each test
  // ====================================
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ====================================
  // Basic Rendering Tests
  // ====================================
  
  it('should render with default props', () => {
    render(<ContentCard {...mockProps} />);
    
    // Verify component renders
    expect(screen.getByTestId('card-item')).toBeInTheDocument();
    
    // Verify default rendering options
    expect(screen.getByTestId('orientation')).toHaveTextContent('Vertical');
    expect(screen.getByTestId('hide-image')).toHaveTextContent('visible');
    expect(screen.getByTestId('hide-border')).toHaveTextContent('visible');
    expect(screen.getByTestId('use-title-as-link')).toHaveTextContent('disabled');
    expect(screen.getByTestId('swap-image')).toHaveTextContent('disabled');
    
    // Verify content
    expect(screen.getByTestId('title')).toHaveTextContent('Test Title');
  });

  // ====================================
  // Orientation Variant Tests
  // KEY PATTERN: Test all possible values
  // ====================================
  
  it('should handle verticalwide orientation', () => {
    const propsWithVerticalWide = {
      ...mockProps,
      contentCard: {
        ...mockProps.contentCard,
        rendering_options: {
          ...mockProps.contentCard.rendering_options,
          card_orientation: 'Vertical Wide'
        }
      }
    };

    render(<ContentCard {...propsWithVerticalWide} />);
    expect(screen.getByTestId('orientation')).toHaveTextContent('Vertical Wide');
  });

  // ====================================
  // Boolean Option Tests
  // ====================================
  
  it('should handle hide_image option', () => {
    const propsWithHiddenImage = {
      ...mockProps,
      contentCard: {
        ...mockProps.contentCard,
        rendering_options: {
          ...mockProps.contentCard.rendering_options,
          hide_image: true
        }
      }
    };

    render(<ContentCard {...propsWithHiddenImage} />);
    expect(screen.getByTestId('hide-image')).toHaveTextContent('hidden');
  });

  it('should handle hide_border option', () => {
    const propsWithHiddenBorder = {
      ...mockProps,
      contentCard: {
        ...mockProps.contentCard,
        rendering_options: {
          ...mockProps.contentCard.rendering_options,
          hide_border: true
        }
      }
    };

    render(<ContentCard {...propsWithHiddenBorder} />);
    expect(screen.getByTestId('hide-border')).toHaveTextContent('hidden');
  });

  it('should handle use_title_as_link_text option', () => {
    const propsWithTitleAsLink = {
      ...mockProps,
      contentCard: {
        ...mockProps.contentCard,
        rendering_options: {
          ...mockProps.contentCard.rendering_options,
          use_title_as_link_text: true
        }
      }
    };

    render(<ContentCard {...propsWithTitleAsLink} />);
    expect(screen.getByTestId('use-title-as-link')).toHaveTextContent('enabled');
  });

  it('should handle swap_image option', () => {
    const propsWithSwapImage = {
      ...mockProps,
      contentCard: {
        ...mockProps.contentCard,
        rendering_options: {
          ...mockProps.contentCard.rendering_options,
          swap_image: true
        }
      }
    };

    render(<ContentCard {...propsWithSwapImage} />);
    expect(screen.getByTestId('swap-image')).toHaveTextContent('enabled');
  });

  // ====================================
  // Combined Features Test
  // KEY PATTERN: Test all features together
  // ====================================
  
  it('should handle all new features combined', () => {
    const propsWithAllFeatures = {
      ...mockProps,
      contentCard: {
        ...mockProps.contentCard,
        rendering_options: {
          ...mockProps.contentCard.rendering_options,
          card_orientation: 'Vertical Wide',
          hide_image: true,
          hide_border: true,
          use_title_as_link_text: true,
          swap_image: true
        }
      }
    };

    render(<ContentCard {...propsWithAllFeatures} />);
    
    // Verify all features are applied correctly
    expect(screen.getByTestId('orientation')).toHaveTextContent('Vertical Wide');
    expect(screen.getByTestId('hide-image')).toHaveTextContent('hidden');
    expect(screen.getByTestId('hide-border')).toHaveTextContent('hidden');
    expect(screen.getByTestId('use-title-as-link')).toHaveTextContent('enabled');
    expect(screen.getByTestId('swap-image')).toHaveTextContent('enabled');
  });
  
  // ====================================
  // Edge Cases
  // ====================================
  
  it('should handle missing optional fields gracefully', () => {
    const propsWithMissingFields = {
      contentCard: {
        content: {
          title: 'Minimal Card',
          $: {}
        },
        rendering_options: {
          card_orientation: 'Vertical',
          $: {}
        },
        $: {}
      }
    } as ContentCardProps;

    // Should not throw an error
    expect(() => render(<ContentCard {...propsWithMissingFields} />)).not.toThrow();
  });

  it('should handle empty string values', () => {
    const propsWithEmptyStrings = {
      ...mockProps,
      contentCard: {
        ...mockProps.contentCard,
        content: {
          ...mockProps.contentCard.content,
          title: '',
          intro_text: ''
        }
      }
    };

    render(<ContentCard {...propsWithEmptyStrings} />);
    // Component should still render without errors
    expect(screen.getByTestId('card-item')).toBeInTheDocument();
  });
});

/* ============================================
   KEY PATTERNS SUMMARY FOR PRESENTERS:
   
   1. VITEST MOCKING:
      vi.mock('@/contentstack-sdk', () => ({
        onEntryChange: vi.fn(),
      }));
      - Mock CMS SDK functions
      - Essential for isolated unit tests
   
   2. MOCK PROPS STRUCTURE:
      const mockProps: ContentCardProps = {
        contentCard: {
          content: { ... },
          rendering_options: { ... },
          $: {}  // Always include $ for editable tags
        }
      };
      - Match exact Contentstack schema structure
      - Include editable tags placeholders
   
   3. TEST PATTERNS:
      - Test default rendering
      - Test each variant/option individually
      - Test combinations of options
      - Test edge cases (empty, missing fields)
   
   4. MOCK COMPONENTS:
      vi.mock('@/core/molecules/...', () => ({
        default: (props) => <div data-testid="...">{...}</div>
      }));
      - Simplify nested component testing
      - Use data-testid for assertions
   
   5. BEST PRACTICES:
      - beforeEach(() => vi.clearAllMocks())
      - Test all rendering option values
      - Test conditional rendering logic
      - Test error boundaries
   
   ============================================ */
