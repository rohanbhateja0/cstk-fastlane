import Stack from "@/contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";
import { Locale } from "@/lib/i18n";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const GetHeader = async (locale: Locale = 'en-us') => {
    try {
        // First try to get the header in the requested locale
        const response = await Stack.getEntry({
            contentTypeUid: "header",
            referenceFieldPath: undefined,
            jsonRtePath: undefined,
            locale: locale,
        });
        
        if (response && response[0] && response[0][0]) {
            liveEdit && addEditableTags(response[0][0], "header", true);
            return response[0][0];
        }
    } catch (error) {
        console.log(`Header not found in locale ${locale}, trying fallback to en-us`);
    }
    
    // If the requested locale doesn't exist, fallback to English
    if (locale !== 'en-us') {
        try {
            const fallbackResponse = await Stack.getEntry({
                contentTypeUid: "header",
                referenceFieldPath: undefined,
                jsonRtePath: undefined,
                locale: 'en-us',
            });
            
            if (fallbackResponse && fallbackResponse[0] && fallbackResponse[0][0]) {
                liveEdit && addEditableTags(fallbackResponse[0][0], "header", true);
                return fallbackResponse[0][0];
            }
        } catch (fallbackError) {
            console.error('Fallback to en-us also failed:', fallbackError);
        }
    }
    
    // If both attempts fail, return null
    return null;
};