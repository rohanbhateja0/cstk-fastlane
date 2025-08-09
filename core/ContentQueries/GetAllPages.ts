import Stack from "@/contentstack-sdk";

export const GetAllPages = async () => {
    const response = await Stack.getEntry({
        contentTypeUid: "page",
        referenceFieldPath: undefined,
        jsonRtePath: undefined,
    });

    return response[0];
};
