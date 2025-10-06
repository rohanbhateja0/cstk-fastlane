'use client';

import RenderComponents from '@/components/render-components';
import { onEntryChange } from '@/contentstack-sdk';
import { GetBlogLandingPage } from '@/core/ContentQueries/GetBlogLandingPage';
import { getPageRes, metaData } from '@/helper';
import { Page as PageProp } from '@/typescript/pages';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';

export default function Page() {
    const entryUrl = usePathname();

    const [getEntry, setEntry] = useState<PageProp>();

    const fetchData = useCallback(async () => {
        try {
            const entryRes = await GetBlogLandingPage(entryUrl);
            if (!entryRes) throw new Error('Status code 404');
            setEntry(entryRes);
        } catch (error) {
            console.error(error);
        }
    }, [entryUrl]);

    useEffect(() => {
        onEntryChange(() => fetchData());
    }, [fetchData]);


    return getEntry?.fastlane_components ? (
        <>
            {/* {getEntry.seo && getEntry.seo.enable_search_indexing && metaData(getEntry.seo)} */}
            <RenderComponents
                components={getEntry.fastlane_components}
                contentTypeUid='blog_landing_page'
                entryUid={getEntry.uid}
                locale={getEntry.locale}
                page={getEntry}
                rendering={getEntry.fastlane_components}
                $={getEntry.fastlane_components.$}
            />
        </>
    ) : (
      <></>
        // <Skeleton count={3} height={300} />
    );
}