import RenderComponents from "@/components/render-components";
import { onEntryChange } from "@/contentstack-sdk";
import { metaData } from "@/helper";
import { Page } from "@/core/types/Page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { notFound } from 'next/navigation';
import { getPage, initLivePreview } from "@/lib/contentstack"; // Importing functions to get page data and initialize live preview from a local library
import ContentstackLivePreview, {
  VB_EmptyBlockParentClass,
} from "@contentstack/live-preview-utils"; // Importing live preview utilities from Contentstack
import Skeleton from "react-loading-skeleton";
import { GetPage } from "@/core/ContentQueries/GetPage"
import FlexGrid from "@/components/flex-grid";
import LivePreview from "@/components/LivePreview";

export const revalidate = 0;

export default async function Home() {
  const entryUrl = "/";
  const page = await GetPage(entryUrl) as Page;

  if (!page){
    notFound();
  }

  return page ? (
    <>
      {page.main?.map((grid, key: number) => {
      return (
        <>
            <FlexGrid flexGrid={grid} page={page} key={key} />
        </>
      )})}
      <LivePreview page={page} />
    </>
  ) : (
    <>
    <p> Entry Url: {entryUrl}</p>
  
    </>
      
  );
}
