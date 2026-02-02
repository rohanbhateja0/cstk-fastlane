/**
 * HeroBanner Component - Code Sample for Webinar
 * 
 * This is an example of a production-ready FastLane component that demonstrates:
 * 1. Contentstack Live Preview integration with editable tags
 * 2. CMSImage and CMSLink usage for CMS-managed assets
 * 3. Responsive design with Tailwind CSS
 * 4. TypeScript interfaces for type safety
 * 5. Semantic color tokens from design system
 * 
 * Key patterns to highlight during presentation:
 * - Editable tags: {...(content?.$?.title ?? {})}
 * - CMSImage for background images
 * - CMSLink for call-to-action buttons
 * - Responsive text sizing: text-4xl sm:text-5xl lg:text-6xl
 * - Overlay opacity options
 */

import React from 'react';
import { CMSImage } from '@/core/atoms/Image';
import { CMSLink } from '@/core/atoms/Link';
import Heading from '@/core/atoms/Heading';
import { cn } from '@/core/lib/utils';
import { HeroBannerProps as HeroBannerPropsType } from '@/core/types/Props';
import { CMSImageField } from '@/core/types/Fields';

// ============================================
// TypeScript Interface Definition
// ============================================
interface HeroBannerProps {
  heroBanner: HeroBannerPropsType['heroBanner'];
  page: HeroBannerPropsType['page'];
}

// ============================================
// Helper Functions
// ============================================

/**
 * Validates if an image field has valid data
 * Important for conditional rendering of background images
 */
const hasValidImage = (imageField: CMSImageField): boolean => {
  if (!imageField) return false;
  const hasSrc = imageField.url;
  const hasAlt = imageField.filename;
  const srcIsValid = hasSrc && hasSrc !== '';
  return !!(srcIsValid || hasAlt);
};

/**
 * Maps overlay opacity settings to Tailwind classes
 * Uses semantic opacity values that can be themed
 */
const getOverlayOpacity = (opacity: string): string => {
  switch (opacity) {
    case 'light':
      return 'bg-black/20';
    case 'medium':
      return 'bg-black/40';
    case 'dark':
      return 'bg-black/60';
    default:
      return 'bg-black/40';
  }
};

/**
 * Maps content alignment to Tailwind utility classes
 * Supports left, center, and right alignment
 */
const getAlignmentClasses = (alignment: string): string => {
  switch (alignment) {
    case 'left':
      return 'text-left items-start';
    case 'right':
      return 'text-right items-end';
    case 'center':
    default:
      return 'text-center items-center';
  }
};

// ============================================
// Main Component
// ============================================
export default function HeroBanner(props: HeroBannerProps) {
  // Destructure content and rendering options from props
  const { content, rendering_options } = props.heroBanner;
  const { title, subtitle, description, background_image, call_to_action } = content;
  
  // Extract rendering options with defaults
  const contentAlignment = rendering_options?.content_alignment || 'center';
  const backgroundOverlay = rendering_options?.background_overlay === 'true' || rendering_options?.background_overlay === '1';
  const overlayOpacity = rendering_options?.overlay_opacity || 'medium';
  
  // Computed values
  const imageExists = background_image ? hasValidImage(background_image) : false;
  const hasOverlay = backgroundOverlay && imageExists;
  
  return (
    <section
      className={cn(
        'relative w-full min-h-screen flex items-center justify-center overflow-hidden',
        'px-4 sm:px-6 lg:px-8'
      )}
    >
      {/* ====================================
          Background Image Layer
          Uses CMSImage for Contentstack integration
          ==================================== */}
      {imageExists && (
        <div 
          className="absolute inset-0 z-0" 
          {...(background_image?.$ ?? {})}  // Editable tag for Live Preview
        >
          <CMSImage
            image={background_image}
            className="w-full h-full object-cover"
            alt={background_image.filename || 'Hero background'}
          />
        </div>
      )}

      {/* ====================================
          Overlay Layer
          Conditionally rendered based on rendering options
          ==================================== */}
      {hasOverlay && (
        <div 
          className={cn(
            'absolute inset-0 z-10',
            getOverlayOpacity(overlayOpacity)
          )}
        />
      )}

      {/* ====================================
          Content Layer
          All text content with editable tags
          ==================================== */}
      <div
        className={cn(
          'relative z-20 w-full max-w-7xl mx-auto',
          'flex flex-col justify-center min-h-screen py-20',
          getAlignmentClasses(contentAlignment)
        )}
      >
        <div className="max-w-4xl">
          {/* Subtitle with editable tag */}
          {subtitle && (
            <div 
              className={cn(
                'text-sm sm:text-base lg:text-lg font-medium mb-4',
                'text-white/90'
              )}
              {...(content?.$?.subtitle ?? {})}  // KEY PATTERN: Editable tag
            >
              {subtitle}
            </div>
          )}

          {/* Title with editable tag - uses semantic Heading component */}
          {title && (
            <Heading
              level="1"
              className={cn(
                'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6',
                'text-white leading-tight'
              )}
              {...(content?.$?.title ?? {})}  // KEY PATTERN: Editable tag
            >
              {title}
            </Heading>
          )}

          {/* Description with HTML rendering and editable tag */}
          {description && (
            <div
              className={cn(
                'text-lg sm:text-xl lg:text-2xl mb-8',
                'text-white/90 leading-relaxed'
              )}
              {...(content?.$?.description ?? {})}  // KEY PATTERN: Editable tag
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {/* Call to Action using CMSLink for automatic locale handling */}
          {call_to_action && call_to_action.href && (
            <div className="mt-8">
              <CMSLink
                link={call_to_action}
                href={call_to_action.href}
                className={cn(
                  'inline-flex items-center px-8 py-4 text-lg font-semibold',
                  'bg-primary text-primary-foreground rounded-lg',  // Semantic colors
                  'hover:bg-primary/90 transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  'shadow-lg hover:shadow-xl'
                )}
                {...(call_to_action.$?.title ?? {})}  // KEY PATTERN: Editable tag
              >
                {call_to_action.title || 'Learn More'}
              </CMSLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   KEY PATTERNS SUMMARY FOR PRESENTERS:
   
   1. EDITABLE TAGS:
      {...(content?.$?.fieldName ?? {})}
      - Enables Live Preview editing in Contentstack
      - The $?.fieldName pattern is standard across all fields
   
   2. CMSIMAGE USAGE:
      <CMSImage image={imageField} alt="..." />
      - Handles Contentstack image transformations
      - Supports responsive images
   
   3. CMSLINK USAGE:
      <CMSLink link={linkField} href={linkField.href}>
      - Automatically adds locale prefix
      - Never use raw <a> tags for internal links
   
   4. SEMANTIC COLORS:
      'bg-primary text-primary-foreground'
      - Use design system tokens, not raw colors
      - Enables theming support
   
   5. RESPONSIVE DESIGN:
      'text-4xl sm:text-5xl lg:text-6xl'
      - Mobile-first approach
      - Consistent breakpoint usage
   
   ============================================ */
