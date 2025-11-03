"use client";

import FlexGrid from "@/components/flex-grid";
import RenderComponents from "@/components/render-components";
import { onEntryChange } from "@/contentstack-sdk";
import { GetBlogLandingPage } from "@/core/ContentQueries/GetBlogLandingPage";
import { getPageRes, metaData } from "@/helper";
import { Page as PageProp } from "@/typescript/pages";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import { useLocale } from '@/hooks/useLocale';
import { Locale } from "@/lib/i18n";

export default function Page() {
  const pathname = usePathname();
  const { locale, cleanPath } = useLocale();

  const [getEntry, setEntry] = useState<PageProp>();

  const fetchData = useCallback(async () => {
    try {
      console.log('Fetching data for:', { cleanPath, locale });
      const entryRes = await GetBlogLandingPage(cleanPath, locale as Locale);
      if (!entryRes) throw new Error("Status code 404");
      setEntry(entryRes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [cleanPath, locale]);

  useEffect(() => {
    if (locale) {
      fetchData();
    }
  }, [fetchData, locale]);

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [fetchData]);

  return getEntry?.main ? (
    <>
      {getEntry.main?.map((grid: any, key: number) => (
        <FlexGrid flexGrid={grid} page={getEntry} key={key} />
      ))}
    </>
  ) : (
    <></>
  );
}
