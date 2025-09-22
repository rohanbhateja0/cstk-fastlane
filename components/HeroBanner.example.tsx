import React from 'react';
import HeroBanner from './HeroBanner';
import { HeroBannerFields } from '@/core/types/components/HeroBanner';

// Example usage of HeroBanner component
const HeroBannerExample = () => {
  const exampleHeroBanner: HeroBannerFields = {
    content: {
      title: "Welcome to Our Platform",
      subtitle: "Innovation at its finest",
      description: "Discover our cutting-edge technology and revolutionary solutions that will transform your business.",
      background_image: {
        url: "/hero-bg.jpg",
        filename: "Hero background image",
        height: 1080,
        width: 1920,
        $: {}
      },
      call_to_action: {
        title: "Learn More",
        href: "/learn-more",
        $: {}
      },
      $: {}
    },
    rendering_options: {
      content_alignment: "center",
      background_overlay: "true",
      overlay_opacity: "medium",
      $: {}
    },
    $: {}
  };

  const examplePage = {
    // Mock page object - replace with actual page data
    title: "Example Page",
    url: "/example",
    // ... other page properties
  };

  return (
    <div>
      <h2>HeroBanner Component Examples</h2>
      
      {/* Basic Hero Banner */}
      <div className="mb-8">
        <h3>Basic Hero Banner (Center Aligned)</h3>
        <HeroBanner 
          heroBanner={exampleHeroBanner} 
          page={examplePage} 
        />
      </div>

      {/* Left Aligned Hero Banner */}
      <div className="mb-8">
        <h3>Left Aligned Hero Banner</h3>
        <HeroBanner 
          heroBanner={{
            ...exampleHeroBanner,
            rendering_options: {
              ...exampleHeroBanner.rendering_options,
              content_alignment: "left"
            }
          }} 
          page={examplePage} 
        />
      </div>

      {/* Right Aligned Hero Banner */}
      <div className="mb-8">
        <h3>Right Aligned Hero Banner</h3>
        <HeroBanner 
          heroBanner={{
            ...exampleHeroBanner,
            rendering_options: {
              ...exampleHeroBanner.rendering_options,
              content_alignment: "right"
            }
          }} 
          page={examplePage} 
        />
      </div>

      {/* Hero Banner with Dark Overlay */}
      <div className="mb-8">
        <h3>Hero Banner with Dark Overlay</h3>
        <HeroBanner 
          heroBanner={{
            ...exampleHeroBanner,
            rendering_options: {
              ...exampleHeroBanner.rendering_options,
              overlay_opacity: "dark"
            }
          }} 
          page={examplePage} 
        />
      </div>

      {/* Hero Banner without Overlay */}
      <div className="mb-8">
        <h3>Hero Banner without Overlay</h3>
        <HeroBanner 
          heroBanner={{
            ...exampleHeroBanner,
            rendering_options: {
              ...exampleHeroBanner.rendering_options,
              background_overlay: "false"
            }
          }} 
          page={examplePage} 
        />
      </div>
    </div>
  );
};

export default HeroBannerExample;
