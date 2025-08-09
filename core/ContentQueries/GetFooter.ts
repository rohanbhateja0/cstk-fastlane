import Stack from "@/contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const GetFooter = async () => {
    const response = await Stack.getEntry({
        contentTypeUid: "footer",
        referenceFieldPath: undefined,
        jsonRtePath: undefined,
    });
    liveEdit && addEditableTags(response[0][0], "footer", true);
    return response[0][0];
};