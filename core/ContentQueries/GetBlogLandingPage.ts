import Stack from "@/contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";
import { Locale } from "@/lib/i18n";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const GetBlogLandingPage = async (entryUrl: string, locale: Locale = 'en-us') => {
    console.log('GetBlogLandingPage called with:', { entryUrl, locale });
    
    try {
        // First try to get the page in the requested locale
        const response = await Stack.getEntryByUrl({
            contentTypeUid: "blog_landing_page",
            entryUrl,
            locale: locale,
            referenceFieldPath: [],
            jsonRtePath: [],
        });
        
        if (response && response[0]) {
            console.log('ContentStack getEntryByUrl response:', response);
            liveEdit && addEditableTags(response[0], "blog_landing_page", true);
            return response[0];
        }
    } catch (error) {
        console.log(`Blog landing page not found in locale ${locale}, trying fallback to en-us`);
    }
    
    // If the requested locale doesn't exist, fallback to English
    if (locale !== 'en-us') {
        try {
            const fallbackResponse = await Stack.getEntryByUrl({
                contentTypeUid: "blog_landing_page",
                entryUrl,
                locale: 'en-us',
                referenceFieldPath: [],
                jsonRtePath: [],
            });
            
            if (fallbackResponse && fallbackResponse[0]) {
                console.log('ContentStack fallback response:', fallbackResponse);
                liveEdit && addEditableTags(fallbackResponse[0], "blog_landing_page", true);
                return fallbackResponse[0];
            }
        } catch (fallbackError) {
            console.error('Fallback to en-us also failed:', fallbackError);
        }
    }
    
    // If both attempts fail, return null
    return null;
};