import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContentCard from '../ContentCard';
import { ContentCardProps } from '@/core/types/Props';

// Mock the CardItem component
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

// Mock NextLink
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>
}));

describe('ContentCard Component', () => {
  const mockProps: ContentCardProps = {
    contentCard: {
      content: {
        title: 'Test Title',
        category: 'Test Category',
        intro_text: 'Test intro text',
        image: { url: 'test-image.jpg' },
        icon: { url: 'test-icon.jpg' },
        $: {}
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
        $: {}
      },
      call_to_action: {
        link: { href: 'https://example.com', title: 'Test Link' },
        $: {}
      },
      $: {}
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with default props', () => {
    render(<ContentCard {...mockProps} />);
    
    expect(screen.getByTestId('card-item')).toBeInTheDocument();
    expect(screen.getByTestId('orientation')).toHaveTextContent('Vertical');
    expect(screen.getByTestId('hide-image')).toHaveTextContent('visible');
    expect(screen.getByTestId('hide-border')).toHaveTextContent('visible');
    expect(screen.getByTestId('use-title-as-link')).toHaveTextContent('disabled');
    expect(screen.getByTestId('swap-image')).toHaveTextContent('disabled');
    expect(screen.getByTestId('title')).toHaveTextContent('Test Title');
  });

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
    expect(screen.getByTestId('orientation')).toHaveTextContent('Vertical Wide');
    expect(screen.getByTestId('hide-image')).toHaveTextContent('hidden');
    expect(screen.getByTestId('hide-border')).toHaveTextContent('hidden');
    expect(screen.getByTestId('use-title-as-link')).toHaveTextContent('enabled');
    expect(screen.getByTestId('swap-image')).toHaveTextContent('enabled');
  });
});

