import { Page } from "@/core/types/Page";
import { notFound } from 'next/navigation';
import { GetPage } from "@/core/ContentQueries/GetPage"
import FlexGrid from "@/components/flex-grid";
import LivePreview from "@/components/LivePreview";

const timeout = parseInt(process.env.REVALIDATE_TIME_OUT || '0');
export const revalidate = Number.isInteger(timeout) ? timeout : 0;

export default async function Home() {
  const entryUrl = "/";
  const page = await GetPage(entryUrl) as Page;

  if (!page){
    notFound();
  }

  return page ? (
    <>
      {page.main?.map((grid: any, key: number) => {
      return (
        <>
            <FlexGrid flexGrid={grid} page={page} key={key} />
        </>
      )})}
      {/* <LivePreview page={page} /> */}
    </>
  ) : (
    <>
    <p> Entry Url: {entryUrl}</p>
  
    </>
      
  );
}
