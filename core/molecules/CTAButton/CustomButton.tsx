import React from 'react';
import { Button } from '@/core/ui/button';
import { CustomButtonFields } from '@/core/types/components/CustomButton';
import { CMSLink } from '@/core/atoms/Link';
import { CMSImage } from '@/core/atoms/Image';
import { cn } from '@/core/lib/utils';

const allowedVariants = ['link', 'primary', 'outline', 'secondary'] as const;

type ButtonVariant = (typeof allowedVariants)[number];

const CustomButton = (props: CustomButtonFields) => {
  
  const btnVariant = allowedVariants.includes(props.button_style as ButtonVariant)
    ? (props.button_style as ButtonVariant)
    : 'default';
  const btnDirection = props.button_direction;

  return (
    <CMSLink link={props.button_link}>
      <Button asChild size="lg" variant={btnVariant} className={cn('my-2 max-w-80 w-full')}>
        <div
          className={cn('flex items-center', {
            'flex-row-reverse gap-4': btnDirection == 'position-right',
            'flex-col py-4 h-auto gap-3': btnDirection == 'position-center',
            'gap-4': btnDirection !== 'position-right' && btnDirection !== 'position-center',
          })}
        >
          {props?.button_image && (
            <div
              className={cn(
                'flex items-center justify-center flex-shrink-0 rounded-md overflow-hidden',
                {
                  'w-4 h-4': btnDirection !== 'position-center',
                  'w-6 h-6': btnDirection === 'position-center',
                }
              )}
            >
              <CMSImage 
                image={props.button_image}
                alt={`Button-Image`}
                className="w-full h-full aspect-square object-cover"
              />
            </div>
          )}
          <span>
            {props.button_link.title.trim()}
          </span>
        </div>
      </Button>
    </CMSLink>
  );
};

export default CustomButton;
