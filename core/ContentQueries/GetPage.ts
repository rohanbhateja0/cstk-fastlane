import Stack from "@/contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";
import { Locale } from "@/lib/i18n";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const GetPage = async (entryUrl: string, locale: Locale = 'en-us') => {
    // Normalize URL to lowercase for case-insensitive matching
    const normalizedUrl = entryUrl.toLowerCase();
    
    try {
        // First try to get the page in the requested locale
        const response = await Stack.getEntryByUrl({
            contentTypeUid: "page",
            entryUrl: normalizedUrl,
            locale: locale,
            referenceFieldPath: [
                "fastlane_components.news_banner.news_banner",
            "fastlane_components.carousel.carousels",
            "fastlane_components.news_section.news_sections",
            "fastlane_components.contactus_section.contactus_sections"
            ],
            jsonRtePath: [],
        });
        
        // Unwrap the response if it's in array format
        let entry = response;
        if (response && response["0"] && typeof response["0"] === 'object') {
            entry = response["0"];
        } else if (Array.isArray(response) && response.length > 0) {
            entry = response[0];
        }
        
        if (entry && entry.uid) {
            liveEdit && addEditableTags(entry, "page", true);
            return entry;
        }
    } catch (error) {
        console.log(`Page not found in locale ${locale}, trying to find by UID from English entry`);
    }
    
    // If not found in requested locale, find the entry by URL in English first to get the UID
    // Then fetch that same entry in the requested locale to ensure same base entry
    if (locale !== 'en-us') {
        try {
            // Find the entry in English by URL to get the UID
            const englishResponse = await Stack.getEntryByUrl({
                contentTypeUid: "page",
                entryUrl: normalizedUrl,
                locale: 'en-us',
                referenceFieldPath: [
                   "fastlane_components.news_banner.news_banner",
            "fastlane_components.carousel.carousels",
            "fastlane_components.news_section.news_sections",
            "fastlane_components.contactus_section.contactus_sections"
                ],
                jsonRtePath: [],
            });
            
            // Unwrap English response
            let englishEntry = englishResponse;
            if (englishResponse && englishResponse["0"] && typeof englishResponse["0"] === 'object') {
                englishEntry = englishResponse["0"];
            } else if (Array.isArray(englishResponse) && englishResponse.length > 0) {
                englishEntry = englishResponse[0];
            }
            
            if (englishEntry && englishEntry.uid) {
                console.log('Found English entry, fetching same UID in requested locale:', englishEntry.uid);
                // Now fetch the same entry in the requested locale using UID
                const localizedResponse = await Stack.getEntryByUid({
                    contentTypeUid: "page",
                    entryUid: englishEntry.uid,
                    referenceFieldPath: [
                        "fastlane_components.news_banner.news_banner",
                    "fastlane_components.carousel.carousels",
                    "fastlane_components.news_section.news_sections",
                    "fastlane_components.contactus_section.contactus_sections"
                    ],
                    jsonRtePath: [],
                    locale: locale,
                });
                
                // Unwrap localized response
                let localizedEntry = localizedResponse;
                if (localizedResponse && localizedResponse["0"] && typeof localizedResponse["0"] === 'object') {
                    localizedEntry = localizedResponse["0"];
                } else if (Array.isArray(localizedResponse) && localizedResponse.length > 0) {
                    localizedEntry = localizedResponse[0];
                }
                
                if (localizedEntry && localizedEntry.uid) {
                    liveEdit && addEditableTags(localizedEntry, "page", true);
                    return localizedEntry;
                }
                
                // If localized version doesn't exist, return English version
                console.log('Localized version not found, returning English version');
                liveEdit && addEditableTags(englishEntry, "page", true);
                return englishEntry;
            }
        } catch (fallbackError) {
            console.error('Fallback to en-us also failed:', fallbackError);
        }
    }
    
    // If both attempts fail, return null
    return null;
};