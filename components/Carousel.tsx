'use client';

import React, { useState, useEffect } from 'react';
import { CarouselFields } from '@/core/types/components/Carousel';
import { Page } from '@/core/types/Page';
import ImageComponent from './image';
import RichText from './rich-text';
import { CMSLink } from '@/core/atoms/Link';
import { getCarouselRes } from '@/helper';

interface CarouselProps {
  carousel: {
    carousels: CarouselFields[];
    _metadata?: any;
    $: any;
  };
  page: Page;
}

export default function Carousel({ carousel, page }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [carouselData, setCarouselData] = useState<CarouselFields | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch carousel data if it's a reference
  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        // Get the first carousel from the carousels array
        const currentCarousel = carousel.carousels?.[0];
        
        if (!currentCarousel) {
          setCarouselData(null);
          setLoading(false);
          return;
        }

        // Check if carousel is a reference object with UID
        if (currentCarousel.uid && currentCarousel._content_type_uid === 'carousel') {
          const data = await getCarouselRes(currentCarousel.uid);
          setCarouselData(data[0]);
        } else {
          // If it's already the full carousel data
          setCarouselData(currentCarousel);
        }
      } catch (error) {
        console.error('Error fetching carousel data:', error);
        setCarouselData(carousel.carousels?.[0] || null); // Fallback to first carousel
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, [carousel]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !carouselData?.slides || carouselData.slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (carouselData.slides?.length || 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselData?.slides]);

  if (loading) {
    return <div className="carousel-loading">Loading carousel...</div>;
  }

  if (!carouselData?.slides || carouselData.slides.length === 0) {
    return null;
  }

  const { title, description, slides, rendering_options } = carouselData;
  const { show_navigation, show_dots } = rendering_options || {};

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Stop auto-play when user interacts
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div 
      className="carousel-container relative w-full bg-sky-900 min-h-[400px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Wrapper */}
      <div className="carousel-wrapper relative overflow-hidden min-h-[400px]">
        {/* Slides Container */}
        <div 
          className="carousel-slides flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className="carousel-slide w-full flex-shrink-0 min-h-[400px]"
            >
              <div className="slide-content relative min-h-[400px] bg-sky-900">
                {/* Slide Image */}
                {slide.image && (
                  <div className="slide-image absolute inset-0">
                    <ImageComponent 
                      image={{ image: slide.image, rendering_options: { colspan: "1" } }} 
                      page={page}
                    />
                  </div>
                )}

                {/* Slide Content - Centered like Figma design */}
                <div className="slide-content absolute inset-0 flex items-center justify-center z-10">
                  <div className="slide-text text-white text-center flex flex-col gap-4 items-center max-w-2xl">
                    {slide.tag && (
                      <div 
                        className="font-['Satoshi:Bold',_sans-serif] text-[14px] leading-[14px] text-center text-white"
                        {...(slide.$?.tag ?? {})}
                      >
                        {slide.tag}
                      </div>
                    )}
                    
                    {slide.title && (
                      <div 
                        className="font-['Zodiak:Bold',_sans-serif] text-[36px] leading-[36px] text-center text-white tracking-[-0.4px] pb-2 border-b border-zinc-300"
                        {...(slide.$?.title ?? {})}
                      >
                        {slide.title}
                      </div>
                    )}
                    
                    {slide.description && (
                      <div 
                        className="font-['Satoshi:Regular',_sans-serif] text-[16px] leading-[24px] text-center text-white max-w-[145px]"
                        {...(slide.$?.description ?? {})}
                      >
                        <RichText richText={{ content: slide.description, rendering_options: { colspan: "1" }, $: slide.$?.description ?? {} }} />
                      </div>
                    )}

                    {/* Call to Action Buttons - Matching Figma design */}
                    {(slide.calltoaction1 || slide.calltoaction2) && (
                      <div className="slide-actions flex gap-4 items-center">
                        {slide.calltoaction1 && (
                          <CMSLink 
                            link={slide.calltoaction1}
                            className="bg-zinc-900 text-neutral-50 px-4 py-2 rounded-md h-10 flex items-center justify-center font-['Satoshi:Medium',_sans-serif] text-[14px] leading-[20px] transition-colors"
                            {...(slide.$?.call_to_action_1 ?? {})}
                          >
                            {slide.calltoaction1.title || 'Button'}
                          </CMSLink>
                        )}
                        {slide.calltoaction2 && (
                          <CMSLink 
                            link={slide.calltoaction2}
                            className="bg-zinc-200 text-zinc-900 px-4 py-2 rounded-md h-10 flex items-center justify-center font-['Satoshi:Medium',_sans-serif] text-[14px] leading-[20px] transition-colors"
                            {...(slide.$?.call_to_action_2 ?? {})}
                          >
                            {slide.calltoaction2.title || 'Button'}
                          </CMSLink>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Matching Figma positioning */}
        {show_navigation && slides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="carousel-nav carousel-nav-prev absolute left-[1.11%] top-[46%] w-[48px] h-[48px] flex items-center justify-center overflow-clip"
              aria-label="Previous slide"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </button>
            <button
              onClick={goToNext}
              className="carousel-nav carousel-nav-next absolute right-[1.11%] top-[46%] w-[48px] h-[48px] flex items-center justify-center overflow-clip"
              aria-label="Next slide"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </>
        )}

        {/* Dot Indicators - Matching Figma positioning and style */}
        {show_dots && slides.length > 1 && (
          <div className="carousel-dots absolute bottom-[4%] left-1/2 transform -translate-x-1/2 flex gap-6 items-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`carousel-dot w-4 h-4 transition-all ${
                  index === currentSlide 
                    ? 'opacity-100' 
                    : 'opacity-50 hover:opacity-75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className="w-4 h-4 rounded-full bg-white" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
