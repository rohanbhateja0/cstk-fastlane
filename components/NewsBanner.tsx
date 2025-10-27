'use client';
import React, { useState, useEffect } from 'react';
import { CMSImage } from '@/core/atoms/Image';
import { CMSLink } from '@/core/atoms/Link';
import Heading from '@/core/atoms/Heading';
import { cn } from '@/core/lib/utils';
import { NewsBannerProps as NewsBannerPropsType } from '@/core/types/Props';
import { CMSLinkField } from '@/core/types/Fields';
import { getNewsBannerRes } from '@/helper';

interface NewsBannerProps {
  newsBanner: {
    news_banner?: any[];
    content?: any;
    rendering_options?: any;
    call_to_action?: any;
    _metadata?: any;
  };
  page: NewsBannerPropsType['page'];
}

// Message Square Plus Icon Component
const MessageSquarePlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 7H11M8 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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

const getHeaderTag = (headerTag: string): keyof JSX.IntrinsicElements => {
  const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  return validTags.includes(headerTag.toLowerCase()) ? headerTag.toLowerCase() as keyof JSX.IntrinsicElements : 'h2';
};

export default function NewsBanner(props: NewsBannerProps) {
  const [newsBannerData, setNewsBannerData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch news banner data if it's a reference
  useEffect(() => {
    const fetchNewsBannerData = async () => {
      try {
        // Get the first news_banner from the news_banner array
        const currentNewsBanner = props.newsBanner.news_banner?.[0];
        
        if (!currentNewsBanner) {
          // If no news_banner array, check if the data is already embedded
          if (props.newsBanner.content) {
            setNewsBannerData(props.newsBanner);
          } else {
            setNewsBannerData(null);
          }
          setLoading(false);
          return;
        }

        // Check if news_banner is a reference object with UID
        if (currentNewsBanner.uid && currentNewsBanner._content_type_uid === 'news_banner') {
          const data = await getNewsBannerRes(currentNewsBanner.uid);
          setNewsBannerData(data[0]);
        } else {
          // If it's already the full news_banner data
          setNewsBannerData(currentNewsBanner);
        }
      } catch (error) {
        console.error('Error fetching news banner data:', error);
        setNewsBannerData(props.newsBanner.news_banner?.[0] || props.newsBanner);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsBannerData();
  }, [props.newsBanner]);

  if (loading) {
    return <div className="news-banner-loading py-12 text-center">Loading news banner...</div>;
  }

  if (!newsBannerData || !newsBannerData.content) {
    return null;
  }

  const { content, rendering_options, call_to_action } = newsBannerData;
  const { title, description, detail_text, image } = content;
  
  const contentAlignment = rendering_options?.content_alignment || 'left';
  const headerTag = rendering_options?.header_tag || 'h2';
  const linkType = rendering_options?.link_type || 'Button';
  
  const HeaderTag = getHeaderTag(headerTag);
  
  const linkField = call_to_action?.link as CMSLinkField | undefined;
  const secondaryLinkField = call_to_action?.secondary_link as CMSLinkField | undefined;

  return (
    <section
      className="bg-sky-950 w-full flex items-center pb-[32px]"
    >
      <div className="flex-1 flex gap-[32px] items-center p-[48px]">
        {/* Content Section */}
        <div className={cn(
          'flex-1 flex flex-col gap-[16px] max-w-[700px]',
          contentAlignment === 'center' && 'mx-auto items-center text-center',
          contentAlignment === 'right' && 'ml-auto items-end text-right'
        )}>
          {/* Title Section with border */}
          <div className="border-b border-solid border-zinc-300 pb-[8px] w-full flex gap-[8px] items-center">
            <HeaderTag 
              className="font-['Zodiak'] text-[48px] leading-[48px] text-[#fafafa] tracking-[-0.4px] not-italic grow basis-0 min-w-0"
              style={{ fontWeight: 540 }}
              {...(content?.$?.title ?? {})}
            >
              {title}
            </HeaderTag>
          </div>
          
          {/* Description */}
          {description && (
            <div className="pt-[24px] w-full flex gap-[8px] items-center">
              <p 
                className="font-['Zodiak'] font-normal text-[16px] leading-[24px] text-[#fafafa] not-italic grow basis-0 min-w-0"
                {...(content?.$?.description ?? {})}
              >
                {description}
              </p>
            </div>
          )}
          
          {/* Detail Text (Rich Text) */}
          {detail_text && (
            <div className="w-full flex gap-[8px] items-center">
              <div 
                className="font-['Zodiak'] font-normal text-[16px] leading-[24px] text-[#fafafa] not-italic grow basis-0 min-w-0"
                dangerouslySetInnerHTML={{ __html: detail_text }}
                {...(content?.$?.detail_text ?? {})}
              />
            </div>
          )}
          
          {/* Call to Action Button */}
          {linkField?.href && (
            <div className="flex gap-[16px] items-start">
              <CMSLink 
                link={linkField}
                className="bg-sky-900 rounded-[6px] px-[12px] py-[8px] h-[36px] flex items-center justify-center gap-[8px] hover:bg-sky-800 transition-colors"
              >
                <div className="w-[16px] h-[16px] flex-shrink-0 text-neutral-50">
                  <MessageSquarePlusIcon />
                </div>
                <div className="flex flex-col justify-center leading-[0] not-italic">
                  <p className="font-['Satoshi'] font-medium text-[14px] leading-[20px] text-neutral-50 whitespace-nowrap">
                    {linkField.title || 'Subscribe to receive news posts'}
                  </p>
                </div>
              </CMSLink>
            </div>
          )}
        </div>
        
        {/* Image Section (if provided) */}
        {image?.url && (
          <div className="relative w-[314px] rounded-[6px] overflow-hidden flex-shrink-0">
            <CMSImage
              image={image}
              className="w-full object-cover"
              alt={image.filename || title || 'News banner image'}
              {...(image?.$ ?? {})}
            />
          </div>
        )}
      </div>
    </section>
  );
}
