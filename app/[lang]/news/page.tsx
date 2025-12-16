'use client';

import RenderComponents from '@/components/render-components';
import { onEntryChange } from '@/contentstack-sdk';
import { GetPage } from '@/core/ContentQueries/GetPage';
import { Page as PageProp } from '@/typescript/pages';
import React, { useState, useEffect, useCallback } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { useSearchParams } from 'next/navigation';

export default function NewsPage() {
    const { locale } = useLocale();
    const searchParams = useSearchParams();
    
    // Check if we're in Visual Builder mode
    const livePreview = searchParams.get('live_preview');
    const isVisualBuilder = !!livePreview;
    
    const newsPath = '/news';
    
    // Get variant parameter from cookie (set by middleware)
    const [variantParam, setVariantParam] = useState<string>('');
    
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const cookieValue = document.cookie.split('; ').find(row => row.startsWith('personalize_variants='))?.split('=')[1];
            // Decode URL-encoded value (e.g., "2_0%2C1_null" -> "2_0,1_null")
            const decoded = cookieValue ? decodeURIComponent(cookieValue) : '';
            setVariantParam(decoded);
        }
    }, []);

    const [getEntry, setEntry] = useState<PageProp>();

    const fetchData = useCallback(async () => {
        try {
            const entryRes = await GetPage(newsPath, locale, variantParam);
            if (!entryRes) throw new Error('Status code 404');
            setEntry(entryRes);
        } catch (error) {
            console.error('Error fetching News page:', error);
        }
    }, [newsPath, locale, variantParam, isVisualBuilder]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (typeof onEntryChange === 'function') {
            const unsubscribe = (onEntryChange as any)(() => {
                fetchData();
            });
            
            return () => {
                if (typeof unsubscribe === 'function') {
                    unsubscribe();
                }
            };
        }
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

