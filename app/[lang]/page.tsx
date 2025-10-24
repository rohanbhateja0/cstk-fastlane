"use client";

import { Page } from "@/core/types/Page";
import { notFound } from 'next/navigation';
import { GetPage } from "@/core/ContentQueries/GetPage"
import FlexGrid from "@/components/flex-grid";
import LivePreview from "@/components/LivePreview";
import React, { useState, useEffect, useCallback } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { locales, localeNames, localeFlags } from '@/lib/i18n';

export default function Home() {
  const { locale, cleanPath } = useLocale();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const pageData = await GetPage(cleanPath, locale) as Page;
      if (pageData) {
        setPage(pageData);
      } else {
        console.log(`No content found for locale ${locale}, page will show fallback content`);
        setPage(null);
      }
    } catch (error) {
      console.error('Error fetching page data:', error);
      setPage(null);
    } finally {
      setLoading(false);
    }
  }, [cleanPath, locale]);

  useEffect(() => {
    if (locale) {
      fetchData();
    }
  }, [fetchData, locale]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // If no page content found, show a fallback message
  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Content not available in {localeNames[locale]}
          </h1>
          <p className="text-gray-600 mb-4">
            This page is not yet translated to {localeNames[locale]}. 
            Please try another language or check back later.
          </p>
          <div className="text-sm text-gray-500">
            <p>Available languages:</p>
            <div className="flex justify-center space-x-4 mt-2">
              {locales.map((loc) => (
                <span key={loc} className="flex items-center space-x-1">
                  <span>{localeFlags[loc]}</span>
                  <span>{localeNames[loc]}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {page.main?.map((grid: any, key: number) => {
      return (
        <>
            <FlexGrid flexGrid={grid} page={page} key={key} />
        </>
      )})}
      {/* <LivePreview page={page} /> */}
    </>
  );
}
