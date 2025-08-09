import NextLink from 'next/link';
import { JSX } from 'react';
import CardItem from '@/core/molecules/ContentCard/CardItem';
import { ContentCardProps } from '@/core/types/Props';
import { CMSLinkField } from '@/core/types/Fields';

export default function ContentCard(props: ContentCardProps) {
  
  const contentCard = props.contentCard;
  
  const card = (
    <CardItem
      call_to_action={contentCard.call_to_action}
      rendering_options={contentCard.rendering_options}
      content={contentCard.content}
      $={contentCard.$}
    />
  );

  const linkField = contentCard.call_to_action.link as CMSLinkField | undefined;

  return (
    <div {...(props.contentCard.call_to_action.$.link ?? {} )}>
      {contentCard.rendering_options.link_type === 'Card' && linkField?.href ? (
        <NextLink href={linkField?.href}>{card}</NextLink>
      ) : (
        card
      )}
    </div>
  );
};
