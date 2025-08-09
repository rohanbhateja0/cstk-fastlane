import React from 'react';
import { ConentSectionProps } from "@/core/types/Props" ;
import PlaceholderBanner from '@/core/molecules/PageTitleBanner/PlaceholderBanner';

export default function ContentSection(props: ConentSectionProps) {

  const contentSection = props.contentSection;
  
  return (
     <div>
      <PlaceholderBanner
        contentSection={contentSection}
      />
    </div>
  );
}
