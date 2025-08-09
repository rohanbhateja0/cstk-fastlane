import RenderComponents from "@/components/render-components";
import { Page } from "@/core/types/Page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getPage, initLivePreview } from "@/lib/contentstack"; // Importing functions to get page data and initialize live preview from a local library
import ContentstackLivePreview, {
  VB_EmptyBlockParentClass,
} from "@contentstack/live-preview-utils"; // Importing live preview utilities from Contentstack
import { GetPage } from "@/core/ContentQueries/GetPage"
import { GetAllPages } from "@/core/ContentQueries/GetAllPages";
import { notFound } from 'next/navigation';
import FlexGrid from "@/components/flex-grid";
import LivePreview from "@/components/LivePreview";

export const revalidate = 0;

export async function generateStaticParams() {

  const entryPaths: Page[] = await GetAllPages();
  const paths = entryPaths.map((page) => {
    return { 
      slug: page.url.split('/') 
    };
  });
  return paths;
};

interface CMSPageProps {
  params: {
    slug: string[];
  }
}

export default async function CMSPage({ params: { slug } }: CMSPageProps) {
  //To Do Think about multilingual, extracting locale from first part of slug array
  const entryUrl = '/' + slug.join('/');
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
