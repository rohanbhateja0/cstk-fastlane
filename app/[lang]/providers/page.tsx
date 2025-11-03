"use client";

import FlexGrid from "@/components/flex-grid";
import RenderComponents from "@/components/render-components";
import { onEntryChange } from "@/contentstack-sdk";
import { GetBlogLandingPage } from "@/core/ContentQueries/GetBlogLandingPage";
import { getPageRes, metaData } from "@/helper";
import { Page as PageProp } from "@/typescript/pages";
import React, { useState, useEffect, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import { useLocale } from '@/hooks/useLocale';

export default function Page() {
  const { locale, cleanPath } = useLocale();

  const [getEntry, setEntry] = useState<PageProp>();

  const fetchData = useCallback(async () => {
    try {
      const entryRes = await GetBlogLandingPage(cleanPath, locale);
      if (!entryRes) throw new Error("Status code 404");
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }, [cleanPath, locale]);

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
