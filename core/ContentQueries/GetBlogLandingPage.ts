import Stack from "@/contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const GetBlogLandingPage = async (entryUrl : string) => {
    const response = await Stack.getEntryByUrl({
        contentTypeUid: "blog_landing_page",
        entryUrl,
        referenceFieldPath: [],
        jsonRtePath: [],
    });
    liveEdit && addEditableTags(response[0], "blog_landing_page", true);
    return response[0];
};