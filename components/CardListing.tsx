'use client';

import React, { useState, useEffect } from 'react';
import { JSX } from 'react';
import { cn } from '@/core/lib/utils';
import { Card } from '@/core/ui/card';
import { CMSImage } from '@/core/atoms/Image';
import ContentCardBtn from '@/core/molecules/ContentCard/ContentCardBtn';
import parse from 'html-react-parser';
import Heading from '@/core/atoms/Heading';
import { CMSLink } from '@/core/atoms/Link';
import { CMSLinkField } from '@/core/types/Fields';
import { getContentCardRes } from '@/helper';
import { generateSlug } from '@/core/lib/utils';

export interface CardListingProps {
  cardListing: {
    title?: string;
    description?: string;
    cards: Array<{
      content: {
        title: string;
        category?: string;
        intro_text?: string;
        image?: any;
        icon?: any;
        $: any;
      };
      call_to_action: {
        link?: CMSLinkField;
        secondary_link?: CMSLinkField;
        $: any;
      };
      rendering_options: {
        card_orientation?: string;
        image_order?: string;
        header_tag?: string;
        link_type?: string;
        colspan?: string;
        hide_image?: boolean;
        hide_border?: boolean;
        use_title_as_link_text?: boolean;
        swap_image?: boolean;
        $: any;
      };
      $: any;
    }>;
    rendering_options?: {
      cards_per_row?: {
        desktop?: number;
        tablet?: number;
        mobile?: number;
      };
      show_card_borders?: boolean;
      card_spacing?: number;
      $: any;
    };
    $: any;
  };
  page?: any;
}

const CardListing = (props: CardListingProps): JSX.Element => {
  const { cardListing } = props;
  const [populatedCards, setPopulatedCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch card data - cards are always references
  useEffect(() => {
    const fetchCardData = async () => {
      if (!cardListing?.cards || cardListing.cards.length === 0) {
        setPopulatedCards([]);
        setLoading(false);
        return;
      }

      try {
        const cardPromises = cardListing.cards.map(async (card: any) => {
          // Cards are always references, so always fetch the full data
          if (card.uid && card._content_type_uid === 'content_card_model') {
            try {
              const cardData = await getContentCardRes(card.uid);
              const fetchedCard = cardData[0]; // getContentCardRes returns an array, we need the first item
              // Add the content type identifier to the fetched card
              return {
                ...fetchedCard,
                _content_type_uid: 'content_card_model'
              };
            } catch (error) {
              console.error('Error fetching card data for UID:', card.uid, error);
              // Return a placeholder card if fetching fails
              return {
                uid: card.uid,
                title: 'Card data unavailable',
                _content_type_uid: 'content_card_model',
                content: {
                  title: 'Card data unavailable',
                  category: '',
                  intro_text: 'Unable to load card content',
                  $: {}
                },
                call_to_action: {
                  link: { title: 'Learn More', href: '#', $: {} },
                  $: {}
                },
                rendering_options: {
                  card_orientation: 'Vertical',
                  link_type: 'Button',
                  hide_image: true,
                  hide_border: false,
                  use_title_as_link_text: false,
                  swap_image: false,
                  $: {}
                },
                $: {}
              };
            }
          }
          // Fallback for unexpected card structure
          return card;
        });

        const resolvedCards = await Promise.all(cardPromises);
        setPopulatedCards(resolvedCards);
      } catch (error) {
        console.error('Error fetching cards data:', error);
        setPopulatedCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [cardListing?.cards]);
  
  // Default responsive grid classes
  const getGridClasses = () => {
    const cardsPerRow = cardListing.rendering_options?.cards_per_row || {
      desktop: 4,
      tablet: 2,
      mobile: 1
    };
    
    return cn(
      'grid gap-4',
      `grid-cols-${cardsPerRow.mobile}`,
      `md:grid-cols-${cardsPerRow.tablet}`,
      `lg:grid-cols-${cardsPerRow.desktop}`
    );
  };

  const getCardSpacing = () => {
    const spacing = cardListing.rendering_options?.card_spacing || 16;
    return {
      gap: `${spacing}px`
    };
  };

  const renderCard = (card: any, index: number) => {
    const { content, call_to_action, rendering_options } = card;
    
    const CardOrientation = rendering_options?.card_orientation || 'Vertical';
    const LinkType = rendering_options?.link_type || 'Button';
    const ImageOrder = rendering_options?.image_order || 'left';
    const HideImage = rendering_options?.hide_image || false;
    const HideBorder = rendering_options?.hide_border || false;
    const UseTitleAsLinkText = rendering_options?.use_title_as_link_text || false;
    
    // Get heading level from header_tag
    const HeadingLevel = rendering_options?.header_tag?.[1] || '3';

    const isVertical = CardOrientation === 'Vertical';
    const isHorizontal = CardOrientation === 'Horizontal Equal';
    const isHorizontalFlex = CardOrientation === 'Horizontal Flex';
    const shouldRenderButton = LinkType !== 'Card';

    const buttonComponent = shouldRenderButton ? (
      <ContentCardBtn 
        CalltoActionLinkMain={call_to_action.link} 
        LinkType={LinkType} 
      />
    ) : null;

    const cardContent = (
      <Card 
        className={cn(
          'font-satoshi overflow-hidden p-6 bg-white rounded-lg shadow-sm',
          'border border-zinc-300',
          {
            'border-none': HideBorder
          }
        )}
      >
        {content.icon && (
          <CMSImage 
            image={content.icon} 
            className="object-cover w-8 h-8 mb-1" 
            {...(content.$?.icon ?? {})} 
          />
        )}
        
        <div
          className={cn('flex w-full gap-6', {
            'flex-col md:items-start': isVertical,
            'flex-row': isHorizontal || isHorizontalFlex,
          })}
        >
          {content.image && !HideImage && (
            <div
              className={cn('relative', {
                'w-full order-2': isVertical,
                'flex-1 basis-1/2': isHorizontal,
                'flex-1 basis-3/12': isHorizontalFlex,
                'order-1': ImageOrder === 'right',
              })}
              {...(content?.$?.image ?? {})}
            >
              <CMSImage
                image={content.image}
                className="object-cover rounded-lg w-full h-full aspect-[16/9]"
              />
            </div>
          )}

          <div
            className={cn('flex flex-col w-full', {
              'flex-1 order-1': isVertical,
              'basis-1/2 gap-4': isHorizontal,
              'basis-3/4 gap-4': isHorizontalFlex,
            })}
          >
            <div>
              {content.category && (
                <div
                  className="gap-2 inline-flex h-6 items-center rounded-lg leading-7 text-zinc-900 text-sm font-medium mb-1"
                  {...(content?.$?.category ?? {})}
                >
                  {content.category}
                </div>
              )}

              <Heading level={HeadingLevel} {...(content?.$?.title ?? {})}>
                {content.title}
              </Heading>

              {/* {content.intro_text && (
                <div 
                  className="mt-3 text-zinc-500 text-sm leading-5" 
                  {...(content?.$?.intro_text ?? {})}
                >
                  {parse(content.intro_text)}
                </div>
              )} */}
            </div>

            {(isHorizontal || isHorizontalFlex || !isVertical) && shouldRenderButton && (
              <div className="flex w-max" {...(call_to_action?.$?.link ?? {})}>
                {buttonComponent}
              </div>
            )}
          </div>

          {isVertical && shouldRenderButton && (
            <div className="flex order-3 w-full" {...(call_to_action?.$?.link ?? {})}>
              {buttonComponent}
            </div>
          )}
        </div>
      </Card>
    );

    const linkField = call_to_action.link as CMSLinkField | undefined;
    
    // For Content Card Model entries, always link to blog detail page
    const blogDetailUrl = `/blogs/${generateSlug(card.title)}`;
    
    // Determine if this should be a clickable card
    const shouldBeClickable = LinkType === 'Card' && linkField?.href;
    const isContentCardModel = card._content_type_uid === 'content_card_model';

    return (
      <div key={`card-${index}`} {...(card.$ ?? {})}>
        {shouldBeClickable ? (
          <CMSLink href={linkField!.href} className="block">
            {cardContent}
          </CMSLink>
        ) : isContentCardModel ? (
          <CMSLink href={blogDetailUrl} className="block hover:shadow-lg transition-shadow duration-300">
            {cardContent}
          </CMSLink>
        ) : (
          cardContent
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="card-listing-loading">Loading cards...</div>;
  }

  if (!populatedCards || populatedCards.length === 0) {
    return <></>;
  }

  return (
    <div className="w-full" {...(cardListing.$ ?? {})}>
      {/* Section Header */}
      {(cardListing.title || cardListing.description) && (
        <div className="mb-8">
          {cardListing.title && (
            <Heading level="2" className="mb-4" {...(cardListing.$?.title ?? {})}>
              {cardListing.title}
            </Heading>
          )}
          {cardListing.description && (
            <div className="text-zinc-600" {...(cardListing.$?.description ?? {})}>
              {parse(cardListing.description)}
            </div>
          )}
        </div>
      )}

      {/* Cards Grid */}
      <div 
        className={getGridClasses()}
        style={getCardSpacing()}
      >
        {populatedCards?.map((card, index) => renderCard(card, index))}
      </div>
    </div>
  );
};

export default CardListing;
