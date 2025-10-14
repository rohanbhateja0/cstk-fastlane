import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { NewsSectionProps } from '@/core/types/Props';
import { CMSLinkField } from '@/core/types/Fields';
import { RichText } from './rich-text';

export default function NewsSection(props: NewsSectionProps) {
  const { newsSection } = props;
  const { content, rendering_options, call_to_action } = newsSection;
  
  const {
    title,
    description,
    detail_text,
    image
  } = content;

  const {
    image_order,
    header_tag = 'h2',
    link_type = 'Button',
    hide_image = false,
    hide_border = false,
    use_title_as_link_text = false,
    swap_image = false
  } = rendering_options;

  const linkField = call_to_action.link as CMSLinkField | undefined;
  const secondaryLinkField = call_to_action.secondary_link as CMSLinkField | undefined;

  // Determine the header tag dynamically
  const HeaderTag = header_tag as keyof JSX.IntrinsicElements;

  // Image order classes
  const imageOrderClass = image_order === 'right' ? 'order-2' : 'order-1';
  const contentOrderClass = image_order === 'right' ? 'order-1' : 'order-2';

  // Grid layout classes for responsive design
  const gridClasses = `
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
    ${hide_border ? '' : 'border border-gray-200 rounded-lg p-6'}
  `;

  // Card classes
  const cardClasses = `
    bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300
    ${hide_border ? '' : 'border border-gray-200'}
  `;

  const renderContent = () => (
    <div className={cardClasses}>
      {!hide_image && image?.url && (
        <div className={`relative h-48 w-full ${imageOrderClass}`}>
          <Image
            src={image.url}
            alt={image.alt || title}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      )}
      
      <div className={`p-6 ${contentOrderClass}`}>
        <HeaderTag className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </HeaderTag>
        
        {description && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>
        )}
        
        {detail_text && (
          <div className="text-gray-700 mb-4">
            <RichText content={detail_text} />
          </div>
        )}
        
        {linkField?.href && (
          <div className="mt-4">
            {link_type === 'Button' ? (
              <NextLink
                href={linkField.href}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                {use_title_as_link_text ? title : linkField.title || 'Read More'}
              </NextLink>
            ) : link_type === 'Link' ? (
              <NextLink
                href={linkField.href}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {use_title_as_link_text ? title : linkField.title || 'Read More'}
              </NextLink>
            ) : null}
          </div>
        )}
        
        {secondaryLinkField?.href && (
          <div className="mt-2">
            <NextLink
              href={secondaryLinkField.href}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              {secondaryLinkField.title || 'Learn More'}
            </NextLink>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className={gridClasses}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
