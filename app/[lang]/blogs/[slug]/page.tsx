"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { CMSLink } from '@/core/atoms/Link';
import { ArrowLeft } from 'lucide-react';
import { generateSlug } from '@/core/lib/utils';
import RichText from '@/components/rich-text';
import ImageComponent from '@/components/image';
import { CMSImage } from '@/core/atoms/Image';
// import LivePreview from '@/components/LivePreview';
import { onEntryChange } from '@/contentstack-sdk';
import { GetContentCardBySlug } from '@/core/ContentQueries/GetContentCard';
import { useLocale } from '@/hooks/useLocale';

// Content Card Model type based on the MCP data
type ContentCardModel = {
  title: string;
  content: {
    title: string;
    category: string;
    intro_text: string;
    image: {
      uid: string;
      url: string;
      filename: string;
      title: string;
      description: string;
      height: number;
      width: number;
      $?: {
        url?: any;
        [key: string]: any;
      };
    };
    icon?: {
      uid: string;
      url: string;
      filename: string;
      title: string;
      description: string;
      height: number;
      width: number;
      $?: {
        url?: any;
        [key: string]: any;
      };
    };
    $?: {
      title?: any;
      category?: any;
      intro_text?: any;
      image?: any;
      [key: string]: any;
    };
  };
  call_to_action: {
    link: {
      title: string;
      href: string;
    };
    secondary_link: {
      title: string;
      href: string;
    };
  };
  rendering_options: {
    card_orientation: string;
    link_type: string;
    hide_image: boolean;
    hide_border: boolean;
    use_title_as_link_text: boolean;
    swap_image: boolean;
    colspan?: string;
    header_tag?: string;
    image_order?: string;
  };
  uid: string;
  locale: string;
  created_at: string;
  updated_at: string;
  $?: {
    [key: string]: any;
  };
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale } = useLocale();
  const [variantParam, setVariantParam] = useState<string>('');
  
  const [blogPost, setBlogPost] = useState<ContentCardModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get variant parameter from cookie (set by middleware)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const cookieValue = document.cookie.split('; ').find(row => row.startsWith('personalize_variants='))?.split('=')[1];
      // Decode URL-encoded value (e.g., "0_0%2C1_null" -> "0_0,1_null")
      const decoded = cookieValue ? decodeURIComponent(cookieValue) : '';
      setVariantParam(decoded);
    }
  }, []);

  // Fetch blog post by slug - memoized to prevent infinite loops
  const fetchBlogPost = useCallback(async () => {
    if (!slug || !locale) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const blogPost = await GetContentCardBySlug(slug, locale, variantParam);
      
      if (blogPost) {
        setBlogPost(blogPost);
      } else {
        setError('Blog post not found');
        setBlogPost(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching blog post:', err);
      setBlogPost(null);
    } finally {
      setLoading(false);
    }
  }, [slug, locale, variantParam]);

  useEffect(() => {
    fetchBlogPost();
  }, [fetchBlogPost]);

  // Set up live preview
  useEffect(() => {
    if (typeof onEntryChange === 'function' && slug && locale) {
      const unsubscribe = (onEntryChange as any)(() => {
        fetchBlogPost();
      });
      
      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    }
  }, [fetchBlogPost, slug, locale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                <div className="ml-6 space-y-2">
                  <div className="h-6 bg-gray-300 rounded w-64"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CMSLink 
            href={`/${locale}/blogs`} 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </CMSLink>
          <div className="text-center py-12">
            <div className="text-red-500 text-xl font-semibold mb-2">
              {error || 'Blog post not found'}
            </div>
            <p className="text-gray-600 mb-4">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <CMSLink 
              href={`/${locale}/blogs`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Blogs
            </CMSLink>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to safely get editable props - filters out invalid DOM attributes
  const getEditableProps = (props: any) => {
    if (!props) return {};
    if (Array.isArray(props)) return {};
    if (typeof props === 'object') {
      const keys = Object.keys(props);
      if (keys.length > 0 && keys.every(key => !isNaN(Number(key)))) {
        return {}; // Skip objects with only numeric keys
      }
      
      // Filter out invalid DOM attributes (like ACL, uppercase props, etc.)
      // Only keep valid HTML attributes (lowercase, kebab-case) and data-* attributes
      const filtered: any = {};
      for (const key of keys) {
        // Allow data-* attributes (Contentstack uses these for editable tags)
        if (key.startsWith('data-')) {
          filtered[key] = props[key];
        }
        // Allow valid lowercase/kebab-case HTML attributes
        else if (key === key.toLowerCase() && /^[a-z][a-z0-9-]*$/.test(key)) {
          filtered[key] = props[key];
        }
        // Skip invalid attributes (uppercase, special chars, etc.)
      }
      return filtered;
    }
    return {};
  };

  return (
    <div className="min-h-screen bg-white" {...getEditableProps(blogPost.$)}>
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <CMSLink 
          href={`/${locale}/blogs`} 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </CMSLink>
      </div>

      {/* Hero Section with Background Image */}
      <div className="relative bg-sky-900 min-h-[400px] flex items-center" {...getEditableProps(blogPost.content?.$)}>
        {/* Background Image Overlay */}
        {!blogPost.rendering_options?.hide_image && blogPost.content?.image && (
          <div className="absolute inset-0" {...getEditableProps(blogPost.content.image?.$?.url)}>
            <CMSImage 
              image={{ ...blogPost.content.image, $: blogPost.content.image.$ || {} } as any}
              alt={blogPost.content.image?.title || blogPost.content?.title || blogPost.title || ''}
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-16 w-full">
          <div className="max-w-4xl">
            {/* Category */}
            {blogPost.content?.category && (
              <div className="mb-2" {...getEditableProps(blogPost.content?.$?.category)}>
                <span className="text-sm font-medium text-white">
                  {blogPost.content.category}
                </span>
              </div>
            )}
            
            {/* Title */}
            <h1 
              className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4"
              {...getEditableProps(blogPost.content?.$?.title)}
            >
              {blogPost.content?.title || blogPost.title || ''}
            </h1>
            
            {/* Intro Text */}
            {/* <p className="text-lg text-white max-w-3xl leading-relaxed">
              {blogPost.content.intro_text}
            </p> */}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Date */}
            {blogPost.created_at && (
              <div className="mb-4">
                <span className="text-sm font-medium text-zinc-900">
                  {new Date(blogPost.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            )}
            
            {/* Rich Text Content */}
            {blogPost.content?.intro_text && (
              <div className="prose prose-lg max-w-none" {...getEditableProps(blogPost.content?.$?.intro_text)}>
                <RichText 
                  richText={{
                    content: blogPost.content.intro_text,
                    rendering_options: {
                      colspan: '1'
                    },
                    $: blogPost.content?.$?.intro_text || {}
                  }}
                />
              </div>
            )}
          </div>
          
          {/* Sidebar Image */}
          {!blogPost.rendering_options?.hide_image && blogPost.content?.image && (
            <div className="w-80 flex-shrink-0" {...getEditableProps(blogPost.content.image?.$?.url)}>
              <div className="aspect-[502/282] relative">
                <CMSImage 
                  image={{ ...blogPost.content.image, $: blogPost.content.image.$ || {} } as any}
                  alt={blogPost.content.image?.title || blogPost.content?.title || blogPost.title || ''}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
