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
        
        if (response && response[0]) {
            liveEdit && addEditableTags(response[0], "page", true);
            return response[0];
        }
    } catch (error) {
        console.log(`Page not found in locale ${locale}, trying fallback to en-us`);
    }
    
    // If the requested locale doesn't exist, fallback to English
    if (locale !== 'en-us') {
        try {
            const fallbackResponse = await Stack.getEntryByUrl({
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
            
            if (fallbackResponse && fallbackResponse[0]) {
                liveEdit && addEditableTags(fallbackResponse[0], "page", true);
                return fallbackResponse[0];
            }
        } catch (fallbackError) {
            console.error('Fallback to en-us also failed:', fallbackError);
        }
    }
    
    // If both attempts fail, return null
    return null;
};