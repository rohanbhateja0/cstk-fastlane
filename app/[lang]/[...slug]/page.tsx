'use client';

import RenderComponents from '@/components/render-components';
import { onEntryChange } from '@/contentstack-sdk';
import { GetPage } from '@/core/ContentQueries/GetPage';
import { getPageRes, metaData } from '@/helper';
import { Page as PageProp } from '@/typescript/pages';
import React, { useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocale } from '@/hooks/useLocale';

export default function Page() {
    const { locale, cleanPath } = useLocale();

    const [getEntry, setEntry] = useState<PageProp>();

    const fetchData = useCallback(async () => {
        try {
            const entryRes = await GetPage(cleanPath, locale);
            if (!entryRes) throw new Error('Status code 404');
            setEntry(entryRes);
        } catch (error) {
            console.error(error);
        }
    }, [cleanPath, locale]);

    useEffect(() => {
        onEntryChange(() => fetchData());
    }, [fetchData]);


    return getEntry?.fastlane_components ? (
        <>
            {/* {getEntry.seo && getEntry.seo.enable_search_indexing && metaData(getEntry.seo)} */}
            <RenderComponents
                components={getEntry.fastlane_components}
                contentTypeUid='page'
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