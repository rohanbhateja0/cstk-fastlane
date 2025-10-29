import { JSX } from 'react';
import { cn } from '@/core/lib/utils';
import { Card } from '@/core/ui/card';
import { ContentCardFields } from '@/core/types/components/ContentCard';
import { CMSImage } from '@/core/atoms/Image';
import { CMSLink } from '@/core/atoms/Link';
import ContentCardBtn from './ContentCardBtn';
import parse from 'html-react-parser';
import Heading from '@/core/atoms/Heading';

const CardItem = (props: ContentCardFields): JSX.Element => {
  
  const CardOrientation = props.rendering_options.card_orientation;
  const LinkType = props.rendering_options.link_type;
  const ImageOrder = props.rendering_options.image_order;
  const HideImage = props.rendering_options.hide_image;
  const HideBorder = props.rendering_options.hide_border;
  const UseTitleAsLinkText = props.rendering_options.use_title_as_link_text;
  const SwapImage = props.rendering_options.swap_image;
  
  //number is second char
  const HeadingLevel = props.rendering_options.header_tag[1];


  const isVertical = CardOrientation === 'Vertical';
  const isVerticalWide = CardOrientation === 'Vertical Wide';
  const isHorizontal = CardOrientation === 'Horizontal Equal';
  const isHorizontalFlex = CardOrientation === 'Horizontal Flex';
  const shouldRenderButton = LinkType !== 'Card';
  const shouldRenderImage = props.content.image && !HideImage;
  const buttonComponent = shouldRenderButton ? (
    <ContentCardBtn CalltoActionLinkMain={props.call_to_action.link} LinkType={LinkType} />
  ) : null;

  return (
    <Card className={cn(
      "font-satoshi overflow-hidden p-6 bg-base-card rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] gap-6",
      {
        "outline-1 outline-offset-[-1px] outline-border": !HideBorder
      }
    )}>
      {props.content.icon && (
        <CMSImage image={props.content.icon} className="object-cover w-8 h-8 mb-1" {...(props.content.$?.icon ?? {} )} />
      )}
      <div
        className={cn('flex w-full gap-6', {
          'flex-col md:items-start': isVertical || isVerticalWide,
          'flex-row': isHorizontal || isHorizontalFlex,
        })}
      >
        {shouldRenderImage && (
          <div
            className={cn('relative', {
              'w-full order-2': isVertical,
              'w-full order-1': isVerticalWide,
              'flex-1 basis-1/2': isHorizontal,
              'flex-1 basis-3/12': isHorizontalFlex,
              'order-1': ImageOrder === 'right' || (isVerticalWide && SwapImage),
              'order-2': isVerticalWide && !SwapImage,
            })}
            {...(props.content?.$?.image ?? {} )}
          >
            <CMSImage
             image={props.content.image}
              className="object-cover rounded-lg w-full h-full"
            />
          </div>
        )}

        <div
          className={cn('flex flex-col w-full', {
            'flex-1 order-1': isVertical || (isVerticalWide && SwapImage),
            'flex-1 order-2': isVerticalWide && !SwapImage,
            'basis-1/2 gap-4': isHorizontal,
            'basis-3/4 gap-4': isHorizontalFlex,
          })}
        >
          <div>
            {props.content.category && (
              <div
                className="gap-2 inline-flex h-6 items-center rounded-lg leading-7 text-foreground text-sm font-medium"
                {...(props.content?.$?.category ?? {} )}
              >
                {props.content.category}
              </div>
            )}

            {UseTitleAsLinkText && props.call_to_action.link?.href ? (
              <Heading level={HeadingLevel} {...(props.content?.$?.title ?? {} )}>
                <CMSLink link={props.call_to_action.link} className="hover:underline">
                  {props.content.title}
                </CMSLink>
              </Heading>
            ) : (
              <Heading level={HeadingLevel} {...(props.content?.$?.title ?? {} )}>
                {props.content.title}  
              </Heading>
            )}
            
            {props.content.intro_text && (
              <div className="mt-3 text-muted-foreground text-sm" {...(props.content?.$?.intro_text ?? {} )}>
              {parse(props.content.intro_text)}
              </div>
            )}

          </div>
          {(isHorizontal || isHorizontalFlex || (!isVertical && !isVerticalWide)) && shouldRenderButton && (
            <div className="flex w-max" {...(props.call_to_action?.$?.link ?? {} )}>{buttonComponent}</div>
          )}
        </div>

        {(isVertical || isVerticalWide) && shouldRenderButton && (
          <div className="flex order-3 w-full" {...(props.call_to_action?.$?.link ?? {} )}>{buttonComponent}</div>
        )}
      </div>
    </Card>
  );
};

export default CardItem;
