import Stack from "@/contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const GetHeader = async () => {
    const response = await Stack.getEntry({
        contentTypeUid: "header",
        referenceFieldPath: undefined,
        jsonRtePath: undefined,
    });
    liveEdit && addEditableTags(response[0][0], "header", true);
    return response[0][0];
};