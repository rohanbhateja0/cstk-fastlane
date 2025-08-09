import React from 'react';
import { CMSImage } from '@/core/atoms/Image';
import { cn } from '@/core/lib/utils';
import PageTitleContent from './PageTitleContent';
import { ContentSectionFields } from '@/core/types/components/ContentSection';
import { CMSImageField } from '@/core/types/Fields';

interface PlaceholderBannerProps {
  contentSection: ContentSectionFields;

}

type BackgroundColor = 'bg-primary' | 'bg-secondary' | 'bg-tertiary';

const getBgColor = (styles?: string): BackgroundColor | undefined => {
  return styles?.match(/\bbg-[^\s]+/g)?.[0] as BackgroundColor | undefined;
};

const hasValidImage = (imageField: CMSImageField): boolean => {
  if (!imageField) return false;

  const hasSrc = imageField.url;
  const hasAlt = imageField.filename;

  const srcIsValid = hasSrc && hasSrc !== '';

  return !!(srcIsValid || hasAlt);
};

const PlaceholderBanner: React.FC<PlaceholderBannerProps> = (props) => {

  const { rendering_options, content, call_to_action } = props.contentSection;
  const Image = content.background_image;

  const VerticalAlignment = rendering_options.alignment || 'center';
  const BackgroundColor = getBgColor("");
  const ImageOrder = rendering_options.image_order || 'left';
  const CardOrientation = rendering_options.card_orientation;
  const hasPlaceholder = false;
  const imageExists = Image ? hasValidImage(Image) : false;
  
  const isCentered = rendering_options.alignment === "centered";
  const isRight = rendering_options.alignment === "right";
  const isLeft = rendering_options.alignment === "left";

  const isFullWidth = false;

  return (
    <section
      className={cn('w-full relative flex justify-center items-center overflow-hidden', {
        'lg:min-h-96': imageExists || BackgroundColor,
        'px-12': imageExists || BackgroundColor || hasPlaceholder,
      })}
    >
      {imageExists && (
        <div className="absolute inset-0 z-0" {...(content.$?.background_image ?? {})}>
          <CMSImage
            image={content.background_image}
            className="w-full h-full object-cover"            
          />
        </div>
      )}

      <div
        className={cn('absolute inset-0 z-5', {
          'bg-primary': BackgroundColor === 'bg-primary',
          'bg-secondary': BackgroundColor === 'bg-secondary',
          'bg-tertiary': BackgroundColor === 'bg-tertiary',
        })}
        style={{
          opacity: imageExists ? 0.7 : 1,
          backgroundColor: !BackgroundColor && imageExists ? 'var(--accent-foreground)' : undefined,
        }}
      />

      <div
        className={cn('relative z-10 flex w-full h-full gap-8', {
          'py-12': imageExists || BackgroundColor,
          'py-6': !imageExists && !BackgroundColor,
          'flex-col items-center justify-center': isFullWidth,
          'flex-col items-center lg:flex-row max-md:flex-col': !isFullWidth,
          'text-center justify-center': isCentered,
          'text-left justify-start': isLeft && !isCentered,
          'text-right justify-end': isRight && !isCentered,
        })}
      >
        <div
          className={cn('flex flex-col z-20 max-w-full', {
            'w-full': isFullWidth,
            'w-full lg:w-1/2': !isFullWidth,
            'text-primary-foreground': BackgroundColor === 'bg-primary',
            'text-secondary-foreground': BackgroundColor === 'bg-secondary',
            'text-tertiary-foreground': BackgroundColor === 'bg-tertiary',
            'text-background': !BackgroundColor && imageExists,
            'text-card-foreground': !BackgroundColor && !imageExists,
            'justify-center': VerticalAlignment === 'center',
            'justify-end pb-7': VerticalAlignment === 'bottom',
            'justify-start pt-7': VerticalAlignment === 'top',
            'order-last': ImageOrder === 'left' && !isFullWidth,
            'order-first': ImageOrder !== 'left' && !isFullWidth,
          })}
        >
          <PageTitleContent
             contentSection={props.contentSection}
          />
        </div>


        {props.contentSection.content.image && !isFullWidth && (
          <div
            className={cn(
              'w-full lg:h-full lg:w-1/2 relative flex items-center justify-center z-10',
              {
                'basis-1/2': CardOrientation === 'Horizontal Flex',
                'w-full': CardOrientation === 'Vertical',
              }
            )}
          >
            <div
              className={cn('w-full rounded-sm overflow-hidden [&_img]:w-full [&_video]:w-full', {
                'basis-1/2': CardOrientation === 'Horizontal Flex',
                'w-full': CardOrientation === 'Vertical',
              })}
            >
              <div className='component image basis-full'>
              <CMSImage image={props.contentSection.content.image} />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default PlaceholderBanner;
