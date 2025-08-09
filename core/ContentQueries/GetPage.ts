import Stack from "@/contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const GetPage = async (entryUrl : string) => {
    const response = await Stack.getEntryByUrl({
        contentTypeUid: "page",
        entryUrl,
        referenceFieldPath: [],
        jsonRtePath: [],
    });
    liveEdit && addEditableTags(response[0], "page", true);
    return response[0];
};