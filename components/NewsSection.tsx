'use client';
import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { NewsSectionProps } from '@/core/types/Props';
import { CMSLinkField } from '@/core/types/Fields';
import RichText from './rich-text';
import { getNewsSectionRes } from '@/helper';

// Arrow Right Icon Component
const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Individual News Card Component
const NewsCard = ({ newsItem, renderingOptions }: { newsItem: any, renderingOptions: any }) => {
  // Extract data from Contentstack structure - title is now at root level
  const {
    title,
    description,
    image,
    category
  } = newsItem;

  const {
    image_order = 'left',
    header_tag = 'h2',
    link_type = 'Button'
  } = renderingOptions;

  const linkField = newsItem.call_to_action?.link as CMSLinkField | undefined;

  // Determine the header tag dynamically
  const HeaderTag = header_tag as keyof JSX.IntrinsicElements;

  // Image order classes
  const imageOrderClass = image_order === 'right' ? 'order-2' : 'order-1';
  const contentOrderClass = image_order === 'right' ? 'order-1' : 'order-2';

  // Safe getter for $ properties to avoid spreading arrays and objects with numeric keys
  const getEditableProps = (props: any) => {
    if (!props) return {};
    if (Array.isArray(props)) return {};
    if (typeof props === 'object') {
      // Check if object has numeric keys (like {0: {...}})
      const keys = Object.keys(props);
      if (keys.length > 0 && keys.every(key => !isNaN(Number(key)))) {
        return {}; // Skip objects with only numeric keys
      }
      return props;
    }
    return {};
  };

  return (
    <div 
      className="bg-white border border-zinc-300 rounded-lg overflow-hidden"
      {...getEditableProps(newsItem.$)}
    >
      <div className="flex gap-6 p-6">
        {/* Image Section */}
        {image?.url ? (
          <div 
            className={`relative w-[314px] h-[177px] rounded-md overflow-hidden flex-shrink-0 ${imageOrderClass}`}
            {...getEditableProps(newsItem.$?.image)}
          >
            <Image
              src={image.url}
              alt={image.filename || title || 'News image'}
              fill
              className="object-cover"
              sizes="314px"
            />
          </div>
        ) : (
          <div className={`relative w-[314px] h-[177px] rounded-md overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center ${imageOrderClass}`}>
            <div className="text-center text-gray-500 px-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm">Image placeholder</p>
            </div>
          </div>
        )}
        
        {/* Content Section */}
        <div className={`flex flex-col gap-4 flex-1 min-w-0 ${contentOrderClass}`}>
          {/* Header Section */}
          <div className="flex flex-col gap-1.5 min-h-[114px]">
            {/* Category/Earmark */}
            {category && (
              <div className="flex items-center">
                <p 
                  className="font-['Satoshi'] font-medium text-sm leading-5 text-zinc-900"
                  {...getEditableProps(newsItem.$?.category)}
                >
                  {category}
                </p>
              </div>
            )}
            
            {/* Title */}
            <HeaderTag 
              className="font-['Satoshi'] font-bold text-2xl leading-none text-zinc-950 tracking-[-0.4px]"
              {...getEditableProps(newsItem.$?.title)}
            >
              {title}
            </HeaderTag>
            
            {/* Description */}
            {description && (
              <p 
                className="font-['Satoshi'] font-normal text-base leading-6 text-zinc-500"
                {...getEditableProps(newsItem.$?.description)}
              >
                {description}
              </p>
            )}
          </div>
          
          {/* Footer Section */}
          <div className="flex gap-2.5">
            {linkField?.href && (
              <a 
                href={linkField.href}
                className="bg-white border border-zinc-200 rounded-md px-3 py-2 h-9 flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors"
                {...getEditableProps(newsItem.call_to_action?.$?.link)}
              >
                <div className="flex flex-col font-['Satoshi'] font-medium text-sm leading-5 text-zinc-900 whitespace-nowrap">
                  <p className="leading-5">{linkField.title || 'Read the Article'}</p>
                </div>
                <div className="w-4 h-4 flex-shrink-0">
                  <ArrowRightIcon />
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function NewsSection(props: NewsSectionProps) {
  const { newsSection } = props;
  const [newsSectionData, setNewsSectionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch news section data if it's a reference
  useEffect(() => {
    const fetchNewsSectionData = async () => {
      try {
        // Get the news_sections array from the props
        const newsSections = newsSection.news_sections;
        
        if (!newsSections || newsSections.length === 0) {
          setNewsSectionData([]);
          setLoading(false);
          return;
        }

        // Fetch all news_section entries
        const fetchedData = await Promise.all(
          newsSections.map(async (section: any) => {
            // Check if it's a reference object with UID
            if (section.uid && section._content_type_uid === 'news_section') {
              const data = await getNewsSectionRes(section.uid);
              // ContentStack returns an array, extract the first element
              const newsItem = Array.isArray(data) ? data[0] : data;
              return newsItem;
            }
            // If it's already the full data
            return section;
          })
        );

        setNewsSectionData(fetchedData);
      } catch (error) {
        console.error('Error fetching news section data:', error);
        setNewsSectionData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsSectionData();
  }, [newsSection]);

  if (loading) {
    return <div className="news-section-loading py-12 text-center">Loading news section...</div>;
  }

  if (!newsSectionData || newsSectionData.length === 0) {
    return null;
  }

  const rendering_options = newsSection.rendering_options || {};
  const colspan = rendering_options.colspan || '1';

  // Get colspan class
  const getColspanClass = (colspan: string) => {
    const colspanNum = parseInt(colspan) || 1;
    return colspanNum === 1 ? '' : `col-span-${colspanNum}`;
  };

  return (
    <section className="component row-splitter basis-full">
      <div className="lg:px-12 px-4 container mx-auto">
        <div className="py-12">
          <div className="flex flex-col gap-4">
            {newsSectionData.map((newsItem, index) => (
              <NewsCard 
                key={index} 
                newsItem={newsItem} 
                renderingOptions={rendering_options}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
