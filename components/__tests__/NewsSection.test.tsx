import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsSection from '../NewsSection';
import { NewsSectionProps } from '@/core/types/Props';

// Mock Next.js components
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('next/image', () => {
  return ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  );
});

// Mock RichText component
jest.mock('../rich-text', () => {
  return function RichText({ content }: { content: string }) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };
});

const mockNewsSectionProps: NewsSectionProps = {
  newsSection: {
    content: {
      title: "Test News Title",
      description: "Test news description",
      detail_text: "<p>Test detailed content</p>",
      image: {
        url: "/test-image.jpg",
        alt: "Test image",
        $: {}
      },
      $: {}
    },
    rendering_options: {
      image_order: "left",
      header_tag: "h2",
      link_type: "Button",
      colspan: "1",
      hide_image: false,
      hide_border: false,
      use_title_as_link_text: false,
      swap_image: false,
      $: {}
    },
    call_to_action: {
      link: {
        href: "/test-article",
        title: "Read More",
        $: {}
      },
      secondary_link: {
        href: "/test-category",
        title: "View All",
        $: {}
      },
      $: {}
    },
    $: {}
  },
  pages: []
};

describe('NewsSection Component', () => {
  it('renders news section with title', () => {
    render(<NewsSection {...mockNewsSectionProps} />);
    expect(screen.getByText('Test News Title')).toBeInTheDocument();
  });

  it('renders news section with description', () => {
    render(<NewsSection {...mockNewsSectionProps} />);
    expect(screen.getByText('Test news description')).toBeInTheDocument();
  });

  it('renders news section with image when not hidden', () => {
    render(<NewsSection {...mockNewsSectionProps} />);
    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('hides image when hide_image is true', () => {
    const propsWithHiddenImage = {
      ...mockNewsSectionProps,
      newsSection: {
        ...mockNewsSectionProps.newsSection,
        rendering_options: {
          ...mockNewsSectionProps.newsSection.rendering_options,
          hide_image: true
        }
      }
    };
    
    render(<NewsSection {...propsWithHiddenImage} />);
    expect(screen.queryByAltText('Test image')).not.toBeInTheDocument();
  });

  it('renders primary call to action button', () => {
    render(<NewsSection {...mockNewsSectionProps} />);
    const primaryLink = screen.getByText('Read More');
    expect(primaryLink).toBeInTheDocument();
    expect(primaryLink.closest('a')).toHaveAttribute('href', '/test-article');
  });

  it('renders secondary call to action link', () => {
    render(<NewsSection {...mockNewsSectionProps} />);
    const secondaryLink = screen.getByText('View All');
    expect(secondaryLink).toBeInTheDocument();
    expect(secondaryLink.closest('a')).toHaveAttribute('href', '/test-category');
  });

  it('uses correct header tag', () => {
    render(<NewsSection {...mockNewsSectionProps} />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Test News Title');
  });

  it('applies correct CSS classes for responsive grid', () => {
    const { container } = render(<NewsSection {...mockNewsSectionProps} />);
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
  });

  it('renders without border when hide_border is true', () => {
    const propsWithoutBorder = {
      ...mockNewsSectionProps,
      newsSection: {
        ...mockNewsSectionProps.newsSection,
        rendering_options: {
          ...mockNewsSectionProps.newsSection.rendering_options,
          hide_border: true
        }
      }
    };
    
    const { container } = render(<NewsSection {...propsWithoutBorder} />);
    const card = container.querySelector('.bg-white.rounded-lg');
    expect(card).not.toHaveClass('border');
  });

  it('uses title as link text when configured', () => {
    const propsWithTitleAsLink = {
      ...mockNewsSectionProps,
      newsSection: {
        ...mockNewsSectionProps.newsSection,
        rendering_options: {
          ...mockNewsSectionProps.newsSection.rendering_options,
          use_title_as_link_text: true
        }
      }
    };
    
    render(<NewsSection {...propsWithTitleAsLink} />);
    const linkWithTitle = screen.getByText('Test News Title');
    expect(linkWithTitle.closest('a')).toHaveAttribute('href', '/test-article');
  });
});
