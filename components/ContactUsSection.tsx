'use client';
import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ContactUsSectionProps } from '@/core/types/Props';
import { CMSLinkField } from '@/core/types/Fields';
import { getContactUsSectionRes } from '@/helper';
import Personalize from '@contentstack/personalize-edge-sdk';
import { usePersonalize } from '@/components/context/PersonalizeContext';

// Icon Components matching Figma design
const BellRingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M24 10.6667C24 8.54492 23.1571 6.51009 21.6569 5.00981C20.1566 3.50952 18.1217 2.66666 16 2.66666C13.8783 2.66666 11.8434 3.50952 10.3431 5.00981C8.84286 6.51009 8 8.54492 8 10.6667C8 20 4 22.6667 4 22.6667H28C28 22.6667 24 20 24 10.6667Z" stroke="#18181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.3067 28C18.0764 28.3753 17.7569 28.691 17.3767 28.9194C16.9965 29.1477 16.5673 29.2817 16.1267 29.2817C15.686 29.2817 15.2568 29.1477 14.8766 28.9194C14.4964 28.691 14.1769 28.3753 13.9467 28" stroke="#18181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MegaphoneIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M28 8L4 14.6667V20L28 26.6667V8Z" stroke="#18181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.6667 22.6667L8 30.6667L4 28L6.66667 20" stroke="#18181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MailIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M5.33334 5.33334H26.6667C28 5.33334 29.3333 6.66668 29.3333 8.00001V24C29.3333 25.3333 28 26.6667 26.6667 26.6667H5.33334C4 26.6667 2.66667 25.3333 2.66667 24V8.00001C2.66667 6.66668 4 5.33334 5.33334 5.33334Z" stroke="#18181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M29.3333 8L16 17.3333L2.66667 8" stroke="#18181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ContactIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M28 28V25.3333C28 23.9188 27.4381 22.5623 26.4379 21.5621C25.4377 20.5619 24.0812 20 22.6667 20H9.33333C7.91885 20 6.56229 20.5619 5.5621 21.5621C4.5619 22.5623 4 23.9188 4 25.3333V28" stroke="#18181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 14.6667C18.9455 14.6667 21.3333 12.2789 21.3333 9.33333C21.3333 6.38781 18.9455 4 16 4C13.0545 4 10.6667 6.38781 10.6667 9.33333C10.6667 12.2789 13.0545 14.6667 16 14.6667Z" stroke="#18181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Helper function to get icon based on category
const getIconForCategory = (category?: string) => {
  switch (category?.toUpperCase()) {
    case 'SUPPORT':
      return <BellRingIcon />;
    case 'SOCIAL':
      return <MegaphoneIcon />;
    case 'MAIL':
      return <MailIcon />;
    case 'PRESS':
      return <ContactIcon />;
    default:
      return <BellRingIcon />;
  }
};

// Individual ContactUs Card Component - Matching Figma Design
const ContactUsCard = ({ contactUsItem, renderingOptions }: { contactUsItem: any, renderingOptions: any }) => {
  // Extract data from Contentstack structure
  const {
    title,
    description,
    image,
    category
  } = contactUsItem;

  const {
    header_tag = 'h3',
    hide_image = false,
    hide_border = false
  } = renderingOptions;

  // Determine the header tag dynamically
  const HeaderTag = header_tag as keyof JSX.IntrinsicElements;

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
      className={`w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-white ${hide_border ? '' : 'border border-[#d4d4d8]'} rounded-lg relative`}
      {...getEditableProps(contactUsItem.$)}
    >
      <div className="flex flex-col gap-[24px] p-[24px] w-full">
        {/* Header Section - Icon, Title, Description */}
        <div className="flex flex-col gap-[6px] w-full">
          {/* Icon */}
          <div className="overflow-clip shrink-0 w-[32px] h-[32px]">
            {getIconForCategory(category)}
          </div>
          
          {/* Title */}
          <HeaderTag 
            className="font-['Zodiak'] font-bold text-[24px] leading-none tracking-[-0.4px] text-[#09090b] w-full shrink-0"
            {...getEditableProps(contactUsItem.$?.title)}
          >
            {title}
          </HeaderTag>
          
          {/* Description */}
          {description && (
            <p 
              className="font-['Satoshi'] font-normal text-[14px] leading-[20px] text-[#71717a] w-full shrink-0"
              {...getEditableProps(contactUsItem.$?.description)}
            >
              {description}
            </p>
          )}
        </div>
        
        {/* Image Section */}
        {!hide_image && image?.url && (
          <div 
            className="flex flex-col items-start overflow-clip rounded-md shrink-0 w-full relative h-[240px]"
            {...getEditableProps(contactUsItem.$?.image)}
          >
            <Image
              src={image.url}
              alt={image.filename || title || 'Contact us image'}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default function ContactUsSection(props: ContactUsSectionProps) {
  const { contactUsSection, page } = props;
  const searchParams = useSearchParams();
  const personalizeSdk = usePersonalize();
  
  // Get variant parameter from cookie (set by middleware)
  // Client components can't read server-side URL rewrites, so we use cookies
  let variantParam = undefined;
  if (typeof document !== 'undefined') {
      const cookieValue = document.cookie.split('; ').find(row => row.startsWith('personalize_variants='))?.split('=')[1];
      // Decode URL-encoded value (e.g., "0_0%2C1_null" -> "0_0,1_null")
      variantParam = cookieValue ? decodeURIComponent(cookieValue) : undefined;
  }
  
  const [contactUsSectionData, setContactUsSectionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch contactus section data if it's a reference
  useEffect(() => {
    const fetchContactUsSectionData = async () => {
      try {
        // Get the contactus_sections array from the props
        const contactUsSections = contactUsSection.contactus_sections;
        
        if (!contactUsSections || contactUsSections.length === 0) {
          setContactUsSectionData([]);
          setLoading(false);
          return;
        }

        // Fetch all contactus_section entries
        const fetchedData = await Promise.all(
          contactUsSections.map(async (section: any) => {
            // Check if it's a reference object with UID
            if (section.uid && section._content_type_uid === 'contactus_section') {
              // Pass variant parameter to helper function
              const data = await getContactUsSectionRes(section.uid, variantParam);
              // ContentStack returns an array, extract the first element
              const contactUsItem = Array.isArray(data) ? data[0] : data;
              return contactUsItem;
            }
            // If it's already the full data
            return section;
          })
        );

        setContactUsSectionData(fetchedData);
      } catch (error) {
        console.error('Error fetching contactus section data:', error);
        setContactUsSectionData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContactUsSectionData();
  }, [contactUsSection, variantParam]);

  // Trigger impression events when personalized content is shown
  useEffect(() => {
    if (!personalizeSdk || !variantParam) return;

    // Parse the variant parameter to get experience short UIDs
    // Format: "0_0,1_null" where 0 and 1 are experience short UIDs
    const experiences = variantParam.split(',').map(pair => {
      const [expShortUid] = pair.split('_');
      return expShortUid;
    }).filter(uid => uid && uid !== 'null');

    // Trigger impression for each experience
    experiences.forEach(async (expShortUid) => {
      try {
        await personalizeSdk.triggerImpression(expShortUid);
        console.log(`📊 Impression triggered for experience: ${expShortUid}`);
      } catch (error) {
        console.error('Error triggering impression:', error);
      }
    });
  }, [personalizeSdk, variantParam]);

  if (loading) {
    return <div className="contactus-section-loading py-12 text-center">Loading contact options...</div>;
  }

  if (!contactUsSectionData || contactUsSectionData.length === 0) {
    return null;
  }

  const rendering_options = contactUsSection.rendering_options || {};
  // Use page title from ContentStack (e.g., "Contact Us")
  const pageTitle = page?.title || 'Contact Us';

  return (
    <section className="component row-splitter basis-full">
      <div className="lg:px-12 px-4 container mx-auto">
        <div className="py-12">
          {/* Header Section - Uses page title with live edit support */}
          <div className="mb-8">
            <h1 
              className="font-['Zodiak'] font-bold text-[48px] leading-[1.2] tracking-[-0.96px] text-[#09090b] mb-4"
              {...(page?.$ && page.$?.title ? page.$?.title : {})}
            >
              {pageTitle}
            </h1>
            <div className="border-b border-[#e4e4e7] w-full"></div>
          </div>
          
          {/* Cards Section - Matching Figma's flex-wrap layout - 4 cards in a row on desktop */}
          <div className="flex flex-wrap gap-[24px] items-start w-full mt-8">
            {contactUsSectionData.map((contactUsItem, index) => (
              <ContactUsCard 
                key={index} 
                contactUsItem={contactUsItem} 
                renderingOptions={rendering_options}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


