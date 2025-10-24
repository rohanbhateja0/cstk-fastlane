"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { CMSLink } from '@/core/atoms/Link';
import { ArrowLeft } from 'lucide-react';
import { generateSlug } from '@/core/lib/utils';
import RichText from '@/components/rich-text';
import ImageComponent from '@/components/image';
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
    };
    icon?: {
      uid: string;
      url: string;
      filename: string;
      title: string;
      description: string;
      height: number;
      width: number;
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
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale } = useLocale();
  
  const [blogPost, setBlogPost] = useState<ContentCardModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const livePreviewSetup = useRef(false);



  // Fetch blog post by slug
  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      console.log('Fetching blog post with:', { slug, locale });
      
      const blogPost = await GetContentCardBySlug(slug, locale);
      
      if (blogPost) {
        console.log('Blog post found:', blogPost.uid);
        setBlogPost(blogPost);
      } else {
        console.log('Blog post not found for slug:', slug);
        setError('Blog post not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug && locale) {
      fetchBlogPost();
    }
  }, [slug, locale]);

  // Set up live preview - only once per component mount
  useEffect(() => {
    if (!livePreviewSetup.current) {
      livePreviewSetup.current = true;
      onEntryChange(() => {
        fetchBlogPost();
      });
    }
  }, [slug]);

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

  return (
    <div className="min-h-screen bg-white">
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
      <div className="relative bg-sky-900 min-h-[400px] flex items-center">
        {/* Background Image Overlay */}
        {!blogPost.rendering_options.hide_image && blogPost.content.image && (
          <div className="absolute inset-0">
            <img 
              src={blogPost.content.image.url} 
              alt={blogPost.content.image.title || blogPost.content.title}
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-16 w-full">
          <div className="max-w-4xl">
            {/* Category */}
            <div className="mb-2">
              <span className="text-sm font-medium text-white">
                {blogPost.content.category}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
              {blogPost.content.title}
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
            <div className="mb-4">
              <span className="text-sm font-medium text-zinc-900">
                {new Date(blogPost.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            
            {/* Rich Text Content */}
            <div className="prose prose-lg max-w-none">
              <RichText 
                richText={{
                  content: blogPost.content.intro_text,
                  rendering_options: {
                    colspan: '1'
                  },
                  $: {}
                }}
              />
            </div>
          </div>
          
          {/* Sidebar Image */}
          {!blogPost.rendering_options.hide_image && blogPost.content.image && (
            <div className="w-80 flex-shrink-0">
              <div className="aspect-[502/282] relative">
                <img 
                  src={blogPost.content.image.url} 
                  alt={blogPost.content.image.title || blogPost.content.title}
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
