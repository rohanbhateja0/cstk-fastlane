import Stack from "@/contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";
import { Locale } from "@/lib/i18n";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true" || process.env.NODE_ENV === "development";

export const GetContentCard = async (entryUid: string, locale: Locale = 'en-us', variantParam = '') => {
    try {
        // First try to get the content card in the requested locale
        const response = await Stack.getEntryByUid({
            contentTypeUid: "content_card_model",
            entryUid,
            referenceFieldPath: [],
            jsonRtePath: ["content.intro_text"],
            locale: locale,
            variantParam: variantParam,
        });
        
        if (response) {
            // Contentstack SDK may return data in array-like format with index "0"
            // Unwrap the response if it's in that format
            let entry = response;
            if (response["0"] && typeof response["0"] === 'object') {
                entry = response["0"];
            } else if (Array.isArray(response) && response.length > 0) {
                entry = response[0];
            }
            
            console.log('GetContentCard response structure:', {
                originalHasZero: !!response["0"],
                isArray: Array.isArray(response),
                entryHasTitle: !!entry.title,
                entryHasContent: !!entry.content,
                entryHasContentTitle: !!entry.content?.title,
                entryKeys: Object.keys(entry || {}),
                title: entry.title,
                contentTitle: entry.content?.title,
                locale: entry.locale
            });
            liveEdit && addEditableTags(entry, "content_card_model", true);
            return entry;
        }
    } catch (error) {
        console.log(`Content card not found in locale ${locale}, trying fallback to en-us`);
    }
    
    // If the requested locale doesn't exist, fallback to English
    if (locale !== 'en-us') {
        try {
            const fallbackResponse = await Stack.getEntryByUid({
                contentTypeUid: "content_card_model",
                entryUid,
                referenceFieldPath: [],
                jsonRtePath: ["content.intro_text"],
                locale: 'en-us',
                variantParam: variantParam,
            });
            
            if (fallbackResponse) {
                // Unwrap the response if it's in array-like format
                let entry = fallbackResponse;
                if (fallbackResponse["0"] && typeof fallbackResponse["0"] === 'object') {
                    entry = fallbackResponse["0"];
                } else if (Array.isArray(fallbackResponse) && fallbackResponse.length > 0) {
                    entry = fallbackResponse[0];
                }
                liveEdit && addEditableTags(entry, "content_card_model", true);
                return entry;
            }
        } catch (fallbackError) {
            console.error('Fallback to en-us also failed:', fallbackError);
        }
    }
    
    // If both attempts fail, return null
    return null;
};

export const GetContentCardBySlug = async (slug: string, locale: Locale = 'en-us', variantParam = '') => {
    try {
        const targetLocale = locale;
        console.log('GetContentCardBySlug called with:', { slug, locale: targetLocale, variantParam });
        
        // Helper function to generate slug from title (for fallback if URL field is missing)
        // Supports both new format (normalized accents) and old format (removed accents)
        const generateSlugLocal = (title: string): string => {
            return title
                .toLowerCase()
                // Normalize accented characters to their base forms
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
                // Remove any remaining non-alphanumeric characters except spaces and hyphens
                .replace(/[^a-z0-9\s-]/g, '')
                // Replace multiple spaces with single hyphen
                .replace(/\s+/g, '-')
                // Replace multiple hyphens with single hyphen
                .replace(/-+/g, '-')
                // Trim hyphens from start and end
                .replace(/^-+|-+$/g, '')
                .trim();
        };
        
        // Also generate slug with old format (just removing non-ASCII) for backward compatibility
        const generateSlugOld = (title: string): string => {
            return title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove all non-ASCII chars (including accented)
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
        };
        
        // First, try to find entry by URL field in the requested locale (URL field is non-localizable, so same across all locales)
        const response = await Stack.getEntry({
            contentTypeUid: "content_card_model",
            referenceFieldPath: [],
            jsonRtePath: ["content.intro_text"],
            locale: targetLocale,
            variantParam: variantParam,
        });
        
        console.log('ContentStack response:', response);
        console.log('Number of entries found:', response[0]?.length || 0);
        
        // Find entry by URL field first (preferred method since URL is non-localizable)
        let foundEntry = response[0]?.find((entry: any) => {
            // First try to match by URL field (non-localizable, same across all locales)
            if (entry.url && entry.url === slug) {
                return true;
            }
            return false;
        });
        
        // If not found by URL, fallback to title-based slug matching for backward compatibility
        if (!foundEntry) {
            foundEntry = response[0]?.find((entry: any) => {
                const possibleTitles = [
                    entry.content?.title,
                    entry.title,
                    entry.content?.intro_text?.split('\n')[0],
                ].filter(Boolean);
                
                for (const title of possibleTitles) {
                    const entrySlugNew = generateSlugLocal(title);
                    const entrySlugOld = generateSlugOld(title);
                    // Match against both formats for backward compatibility
                    if (entrySlugNew === slug || entrySlugOld === slug) {
                        return true;
                    }
                }
                return false;
            });
        }
        
        if (foundEntry) {
            console.log('Found matching entry in requested locale:', foundEntry.uid);
            if (liveEdit) {
                addEditableTags(foundEntry, "content_card_model", true);
            }
            return foundEntry;
        }
        
        // If not found in requested locale, try to find by slug in English first to get the UID
        // Then fetch that entry in the requested locale
        if (targetLocale !== "en-us") {
            console.log(`No entry found in ${targetLocale} matching slug, trying to find by UID from English entry`);
            try {
                // Find the entry in English by slug
                const englishResponse = await Stack.getEntry({
                    contentTypeUid: "content_card_model",
                    referenceFieldPath: [],
                    jsonRtePath: ["content.intro_text"],
                    locale: "en-us",
                    variantParam: variantParam,
                });
                
                // Find entry by URL field first (preferred method)
                let englishEntry = englishResponse[0]?.find((entry: any) => {
                    if (entry.url && entry.url === slug) {
                        return true;
                    }
                    return false;
                });
                
                // If not found by URL, fallback to title-based slug matching
                if (!englishEntry) {
                    englishEntry = englishResponse[0]?.find((entry: any) => {
                        const possibleTitles = [
                            entry.content?.title,
                            entry.title,
                            entry.content?.intro_text?.split('\n')[0],
                        ].filter(Boolean);
                        
                        for (const title of possibleTitles) {
                            const entrySlugNew = generateSlugLocal(title);
                            const entrySlugOld = generateSlugOld(title);
                            // Match against both formats for backward compatibility
                            if (entrySlugNew === slug || entrySlugOld === slug) {
                                return true;
                            }
                        }
                        return false;
                    });
                }
                
                if (englishEntry) {
                    console.log('Found matching entry in English, fetching same UID in requested locale:', englishEntry.uid);
                    // Now fetch the same entry in the requested locale
                    const localizedEntryResponse = await Stack.getEntryByUid({
                        contentTypeUid: "content_card_model",
                        entryUid: englishEntry.uid,
                        referenceFieldPath: [],
                        jsonRtePath: ["content.intro_text"],
                        locale: targetLocale,
                        variantParam: variantParam,
                    });
                    
                    if (localizedEntryResponse) {
                        // Unwrap the response if it's in array-like format
                        let localizedEntry = localizedEntryResponse;
                        if (localizedEntryResponse["0"] && typeof localizedEntryResponse["0"] === 'object') {
                            localizedEntry = localizedEntryResponse["0"];
                        } else if (Array.isArray(localizedEntryResponse) && localizedEntryResponse.length > 0) {
                            localizedEntry = localizedEntryResponse[0];
                        }
                        console.log('Found localized version of entry:', localizedEntry.uid);
                        if (liveEdit) {
                            addEditableTags(localizedEntry, "content_card_model", true);
                        }
                        return localizedEntry;
                    }
                    
                    // If localized version doesn't exist, return English version
                    console.log('Localized version not found, returning English version');
                    if (liveEdit) {
                        addEditableTags(englishEntry, "content_card_model", true);
                    }
                    return englishEntry;
                }
            } catch (fallbackError) {
                console.error('Fallback query failed:', fallbackError);
            }
        }
        
        console.log('No matching entry found for slug:', slug);
        return null;
    } catch (error) {
        console.error('Error in GetContentCardBySlug:', error);
        return null;
    }
};
