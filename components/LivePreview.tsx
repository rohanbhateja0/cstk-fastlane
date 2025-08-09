"use client";

import React, { useEffect } from 'react';
import HTMLComment from '@/core/atoms/HtmlComment';
import { initLivePreview } from '@/core/lib/livePreview';
import { Page } from '@/core/types/Page';

type LivePreviewProps = {
    page: Page;
}

export default function LivePreview(props: LivePreviewProps) {

   useEffect(() => {
    initLivePreview(); // Initializing live preview functionality
    //ContentstackLivePreview.onEntryChange(getContent); // Don't think this is really needed?
  }, []);
  
  return (
     <>
     <HTMLComment comment='<!-- Live Preview Enabled -->' />
     </>
  );
}