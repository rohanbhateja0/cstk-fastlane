'use client';

import RenderComponents from '@/components/render-components';
import { onEntryChange } from '@/contentstack-sdk';
import { GetPage } from '@/core/ContentQueries/GetPage';
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
            const entryRes = await GetPage(entryUrl);
            if (!entryRes) throw new Error('Status code 404');
            setEntry(entryRes);
        } catch (error) {
            console.error('Error fetching News page:', error);
        }
    }, [entryUrl]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        onEntryChange(() => fetchData());
    }, [fetchData]);


    if (!getEntry) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading News page...</p>
                </div>
            </div>
        );
    }

    return getEntry?.fastlane_components ? (
        <>
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
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">No Content Found</h1>
                <p className="text-gray-600 mb-2">The News page exists but has no components.</p>
                <p className="text-sm text-gray-500">Please add components to the 'fastlane_components' field in ContentStack.</p>
            </div>
        </div>
    );
}