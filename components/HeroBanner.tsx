import React from 'react';
import { CMSImage } from '@/core/atoms/Image';
import { CMSLink } from '@/core/atoms/Link';
import Heading from '@/core/atoms/Heading';
import { cn } from '@/core/lib/utils';
import { HeroBannerProps as HeroBannerPropsType } from '@/core/types/Props';
import { CMSImageField } from '@/core/types/Fields';

interface HeroBannerProps {
  heroBanner: HeroBannerPropsType['heroBanner'];
  page: HeroBannerPropsType['page'];
}

const hasValidImage = (imageField: CMSImageField): boolean => {
  if (!imageField) return false;
  const hasSrc = imageField.url;
  const hasAlt = imageField.filename;
  const srcIsValid = hasSrc && hasSrc !== '';
  return !!(srcIsValid || hasAlt);
};

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

export default function HeroBanner(props: HeroBannerProps) {
  const { content, rendering_options } = props.heroBanner;
  const { title, subtitle, description, background_image, call_to_action } = content;
  
  const contentAlignment = rendering_options?.content_alignment || 'center';
  const backgroundOverlay = rendering_options?.background_overlay === 'true' || rendering_options?.background_overlay === '1';
  const overlayOpacity = rendering_options?.overlay_opacity || 'medium';
  
  const imageExists = background_image ? hasValidImage(background_image) : false;
  const hasOverlay = backgroundOverlay && imageExists;
  
  return (
    <section
      className={cn(
        'relative w-full min-h-screen flex items-center justify-center overflow-hidden',
        'px-4 sm:px-6 lg:px-8'
      )}
    >
      {/* Background Image */}
      {imageExists && (
        <div className="absolute inset-0 z-0" {...(background_image?.$ ?? {})}>
          <CMSImage
            image={background_image}
            className="w-full h-full object-cover"
            alt={background_image.filename || 'Hero background'}
          />
        </div>
      )}

      {/* Overlay */}
      {hasOverlay && (
        <div 
          className={cn(
            'absolute inset-0 z-10',
            getOverlayOpacity(overlayOpacity)
          )}
        />
      )}

      {/* Content */}
      <div
        className={cn(
          'relative z-20 w-full max-w-7xl mx-auto',
          'flex flex-col justify-center min-h-screen py-20',
          getAlignmentClasses(contentAlignment)
        )}
      >
        <div className="max-w-4xl">
          {/* Subtitle */}
          {subtitle && (
            <div 
              className={cn(
                'text-sm sm:text-base lg:text-lg font-medium mb-4',
                'text-white/90'
              )}
              {...(content?.$?.subtitle ?? {})}
            >
              {subtitle}
            </div>
          )}

          {/* Title */}
          {title && (
            <Heading
              level="1"
              className={cn(
                'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6',
                'text-white leading-tight'
              )}
              {...(content?.$?.title ?? {})}
            >
              {title}
            </Heading>
          )}

          {/* Description */}
          {description && (
            <div
              className={cn(
                'text-lg sm:text-xl lg:text-2xl mb-8',
                'text-white/90 leading-relaxed'
              )}
              {...(content?.$?.description ?? {})}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {/* Call to Action */}
          {call_to_action && call_to_action.href && (
            <div className="mt-8">
              <CMSLink
                link={call_to_action}
                href={call_to_action.href}
                className={cn(
                  'inline-flex items-center px-8 py-4 text-lg font-semibold',
                  'bg-primary text-primary-foreground rounded-lg',
                  'hover:bg-primary/90 transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  'shadow-lg hover:shadow-xl'
                )}
                {...(call_to_action.$?.title ?? {})}
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
