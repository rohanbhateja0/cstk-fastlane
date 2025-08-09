import React from 'react';
import { Button } from '../../ui/button';
import { cn } from '../../lib/utils';
import { CMSLink } from '../../atoms/Link';
import { ContentSectionFields } from '@/core/types/components/ContentSection';
import parse from 'html-react-parser';

interface PageTitleContentProps {
  contentSection: ContentSectionFields;

}

const PageTitleContent: React.FC<PageTitleContentProps> = (props) => {
  
  const { rendering_options, content, call_to_action } = props.contentSection;
  const isPageTitle = rendering_options.header_tag === 'H1';
  const isCentered = rendering_options.alignment === "centered";
  const isRight = rendering_options.alignment === "right";
  const isLeft = rendering_options.alignment === "left";

  const alignmentClass = cn({
    'items-center': isCentered,
    'items-end': !isCentered && isRight,
    'items-left': !isCentered && !isRight && isLeft,
  });
  const textAlignmentClass = cn({
    'text-center': isCentered,
    'text-right': isRight && !isCentered,
    'text-left': isLeft && !isCentered && !isRight,
  });

  return (
    <div className={cn('w-full gap-4 flex flex-col', alignmentClass)}>
      {content.category && <p className="text-sm font-medium" {...(content.$?.category ?? {})}>{content.category}</p>}
      <div className={textAlignmentClass}>
        {content.title && (
          <h1
            className={cn('leading-tight', {
              'text-h1': rendering_options.header_tag === 'H1',
              'text-h2': rendering_options.header_tag === 'H2',
              'text-h3': rendering_options.header_tag === 'H3',
              'text-h4': rendering_options.header_tag === 'H4',
              'text-h5': rendering_options.header_tag === 'H5',
              'text-h6': rendering_options.header_tag === 'H6',
            })} {...(content.$?.title ?? {})}
          >{content.title}</h1>
        )}
        {!isPageTitle && <hr className="mt-2 border-t border-t-border" />}
      </div>

      {content.intro_text && (
        <div className="text-p [&_*]:font-satoshi leading-relaxed prose dark:prose-invert" {...(content.$?.intro_text ?? {})}>
          {parse(content.intro_text)}
        </div>
      )}

      {(call_to_action.link?.href || call_to_action.secondary_link?.href) && (
        <div className={cn('flex flex-wrap gap-4')}>
          {call_to_action.link?.href && (
            <span {...(call_to_action.$?.link ?? {})}>
            <Button
              asChild
              variant="default"
              className="bg-primary text-primary-foreground hover:no-underline px-3 py-2 h-9 rounded-md flex items-center gap-2"
            >
              <CMSLink link={call_to_action.link} className="bg-primary text-primary-foreground hover:no-underline px-3 py-2 h-9 rounded-md flex items-center gap-2" />
            </Button>
            </span>
          )}

          {call_to_action.secondary_link?.href && (
            <span {...(call_to_action.$?.secondary_link ?? {})}>
            <Button
              asChild
              variant="secondary"
              className="bg-secondary rounded-md text-accent-foreground px-3 py-2 h-9 flex items-center gap-2 hover:no-underline"
            >
              <CMSLink link={call_to_action.secondary_link} className='bg-secondary rounded-md text-accent-foreground px-3 py-2 h-9 flex items-center gap-2 hover:no-underline'  {...(call_to_action.$?.secondary_link ?? {})} />
            </Button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PageTitleContent;
