import Stack from "@/contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const GetPage = async (entryUrl : string, variantParam?: string) => {
    // Normalize URL to lowercase for case-insensitive matching
    const normalizedUrl = entryUrl.toLowerCase();
    
    const response = await Stack.getEntryByUrl({
        contentTypeUid: "page",
        entryUrl: normalizedUrl,
        referenceFieldPath: [
            "fastlane_components.news_banner.news_banner",
            "fastlane_components.carousel.carousels",
            "fastlane_components.news_section.news_sections",
            "fastlane_components.contactus_section.contactus_sections"
        ],
        jsonRtePath: [],
        variantParam: variantParam, // Pass variant parameter from URL
    });
    liveEdit && addEditableTags(response[0], "page", true);
    return response[0];
};