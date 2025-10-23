'use client';

import React from 'react';
import { CMSLink } from '@/core/atoms/Link';
import { Highlight } from 'react-instantsearch';
import { generateSlug } from '@/core/lib/utils';
import ImageComponent from '@/components/image';
import RichText from '@/components/rich-text';


interface SearchResultCardProps {
  hit: {
    objectID: string;
    __position: number;
    __queryID?: string;
    title?: string;
    content?: {
      title?: string;
      category?: string;
      intro_text?: string | {
        content: string;
        rendering_options?: any;
        $?: any;
      };
      image?: {
        uid?: string;
        url?: string;
        filename?: string;
        title?: string;
        description?: string;
        height?: number;
        width?: number;
      };
    };
    uid?: string;
    created_at?: string;
    updated_at?: string;
    _content_type_uid?: string;
  };
  viewMode?: 'list' | 'grid';
}

export default function SearchResultCard({ hit, viewMode = 'list' }: SearchResultCardProps) {
  // Generate slug safely
  const blogDetailUrl = hit.title ? `/blogs/${generateSlug(hit.title)}` : '#';
  
  // Grid view layout
  if (viewMode === 'grid') {
    return (
      <div className="bg-white border border-zinc-300 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
        {/* Image */}
        {hit.content?.image?.url && (
          <div className="w-full h-48 relative rounded-md overflow-hidden mb-4">
            <img
              src={hit.content.image.url}
              alt={hit.content.image.title || hit.content.title || hit.title || 'Content image'}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Header with Icon and Category */}
          <div className="flex flex-col gap-1">
            {/* Icon */}
            <div className="w-6 h-6 text-zinc-900">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
              </svg>
            </div>
            
            {/* Category */}
            {hit.content?.category && (
              <div className="text-sm font-medium text-zinc-900">
                {hit.content.category}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-zinc-950 leading-tight tracking-tight">
            <CMSLink 
              href={blogDetailUrl}
              className="hover:text-sky-900 transition-colors"
            >
              {hit.content?.title ? (
                <Highlight 
                  attribute="title" 
                  hit={hit}
                  classNames={{
                    highlighted: 'bg-yellow-200 font-semibold'
                  }}
                />
              ) : (
                hit.title || 'Untitled'
              )}
            </CMSLink>
          </h3>

          {/* Description */}
          {hit.content?.intro_text && (
            <div 
              className="text-sm text-zinc-500 leading-5 line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: typeof hit.content.intro_text === 'string' 
                  ? hit.content.intro_text 
                  : hit.content.intro_text.content
              }}
            />
          )}

          {/* Action Button */}
          <div className="mt-auto pt-2">
            <CMSLink 
              href={blogDetailUrl}
              className="inline-flex items-center gap-2 bg-white border border-zinc-200 text-zinc-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors"
            >
              Read the Article
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </CMSLink>
          </div>
        </div>
      </div>
    );
  }

  // List view layout (default)
  return (
    <div className="bg-white border border-zinc-300 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-6">
        {/* Image */}
        {hit.content?.image?.url && (
          <div className="flex-shrink-0 w-80 h-48 relative rounded-md overflow-hidden">
            <img
              src={hit.content.image.url}
              alt={hit.content.image.title || hit.content.title || hit.title || 'Content image'}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Header with Icon and Category */}
          <div className="flex flex-col gap-1.5">
            {/* Icon */}
            <div className="w-8 h-8 text-zinc-900">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
              </svg>
            </div>
            
            {/* Category */}
            {hit.content?.category && (
              <div className="text-sm font-medium text-zinc-900">
                {hit.content.category}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-zinc-950 leading-tight tracking-tight">
            <CMSLink 
              href={blogDetailUrl}
              className="hover:text-sky-900 transition-colors"
            >
              {hit.content?.title ? (
                <Highlight 
                  attribute="title" 
                  hit={hit}
                  classNames={{
                    highlighted: 'bg-yellow-200 font-semibold'
                  }}
                />
              ) : (
                hit.title || 'Untitled'
              )}
            </CMSLink>
          </h3>

          {/* Description */}
          {hit.content?.intro_text && (
            <div 
              className="text-base text-zinc-500 leading-6 line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: typeof hit.content.intro_text === 'string' 
                  ? hit.content.intro_text 
                  : hit.content.intro_text.content
              }}
            />
          )}

          {/* Action Button */}
          <div className="mt-auto">
            <CMSLink 
              href={blogDetailUrl}
              className="inline-flex items-center gap-2 bg-white border border-zinc-200 text-zinc-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors"
            >
              Read the Article
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </CMSLink>
          </div>
        </div>
      </div>
    </div>
  );
}
