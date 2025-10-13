import Stack from "@/contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

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

export const GetContentCardBySlug = async (slug: string) => {
    try {
        // Get all content cards and find by slug
        const response = await Stack.getEntry({
            contentTypeUid: "content_card_model",
            referenceFieldPath: [],
            jsonRtePath: ["content.intro_text"],
        });
        
        liveEdit && response[0].forEach((entry: any) => addEditableTags(entry, "content_card_model", true));
        
        // Find entry by slug
        const foundEntry = response[0].find((entry: any) => {
            const entrySlug = entry.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
            return entrySlug === slug;
        });
        
        return foundEntry || null;
    } catch (error) {
        console.error('Error in GetContentCardBySlug:', error);
        return null;
    }
};
