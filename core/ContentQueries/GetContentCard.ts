import Stack from "@/contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true" || process.env.NODE_ENV === "development";

export const GetContentCard = async (entryUid: string) => {
    const response = await Stack.getEntryByUid({
        contentTypeUid: "content_card_model",
        entryUid,
        referenceFieldPath: [],
        jsonRtePath: ["content.intro_text"],
    });
    liveEdit && addEditableTags(response, "content_card_model", true);
    return response;
};

export const GetContentCardBySlug = async (slug: string, locale?: string) => {
    try {
        // Get all content cards and find by slug
        const response = await Stack.getEntry({
            contentTypeUid: "content_card_model",
            referenceFieldPath: [],
            jsonRtePath: ["content.intro_text"],
            locale: locale || "en-us",
        });
        
        // Find entry by slug first
        const foundEntry = response[0].find((entry: any) => {
            const entrySlug = entry.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
            return entrySlug === slug;
        });
        
        if (foundEntry) {
            // Add live edit tags to the found entry
            if (liveEdit) {
                addEditableTags(foundEntry, "content_card_model", true);
            }
            return foundEntry;
        }
        
        return null;
    } catch (error) {
        console.error('Error in GetContentCardBySlug:', error);
        return null;
    }
};
