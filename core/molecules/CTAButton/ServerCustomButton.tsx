import React from 'react';
import { Button } from '@/core/ui/button';
import { CustomButtonFields } from '@/core/types/components/CustomButton';
import { ServerLink } from '@/core/atoms/ServerLink';
import { CMSImage } from '@/core/atoms/Image';
import { cn } from '@/core/lib/utils';
import { Locale } from '@/lib/i18n';

const allowedVariants = ['link', 'primary', 'outline', 'secondary'] as const;

type ButtonVariant = (typeof allowedVariants)[number];

interface ServerCustomButtonProps extends CustomButtonFields {
  locale: Locale;
}

const ServerCustomButton = (props: ServerCustomButtonProps) => {
  const { locale, ...buttonProps } = props;
  
  const btnVariant = allowedVariants.includes(buttonProps.button_style as ButtonVariant)
    ? (buttonProps.button_style as ButtonVariant)
    : 'default';
  const btnDirection = buttonProps.button_direction;

  return (
    <ServerLink href={buttonProps.button_link.href || '#'} locale={locale}>
      <Button asChild size="lg" variant={btnVariant} className={cn('my-2 max-w-80 w-full')}>
        <div
          className={cn('flex items-center', {
            'flex-row-reverse gap-4': btnDirection == 'position-right',
            'flex-col py-4 h-auto gap-3': btnDirection == 'position-center',
            'gap-4': btnDirection !== 'position-right' && btnDirection !== 'position-center',
          })}
        >
          {buttonProps?.button_image && (
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
                image={buttonProps.button_image}
                alt={`Button-Image`}
                className="w-full h-full aspect-square object-cover"
              />
            </div>
          )}
          <span>
            {buttonProps.button_link.title.trim()}
          </span>
        </div>
      </Button>
    </ServerLink>
  );
};

export default ServerCustomButton;
