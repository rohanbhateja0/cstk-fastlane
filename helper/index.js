import Stack from "../contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getHeaderRes = async () => {
    const response = await Stack.getEntry({
        contentTypeUid: "header",
        referenceFieldPath: ["navigation_menu.page_reference"],
        jsonRtePath: ["notification_bar.announcement_text"],
    });

    liveEdit && addEditableTags(response[0][0], "header", true);
    return response[0][0];
};

export const getFooterRes = async () => {
    const response = await Stack.getEntry({
        contentTypeUid: "footer",
        referenceFieldPath: undefined,
        jsonRtePath: ["copyright"],
    });
    liveEdit && addEditableTags(response[0][0], "footer", true);
    return response[0][0];
};

export const getAllEntries = async () => {
    const response = await Stack.getEntry({
        contentTypeUid: "page",
        referenceFieldPath: undefined,
        jsonRtePath: undefined,
    });
    liveEdit &&
        response[0].forEach((entry) => addEditableTags(entry, "page", true));
    return response[0];
};

export const getHomePageRes = async () => {
    const response = await getEntryByUrlGQL({
        contentTypeUid: "page",
        entryUrl: "/",
        jsonRtePath: [
            "page_components.from_blog.featured_blogs.body",
            "page_components.section_with_buckets.buckets.description",
            "page_components.section_with_html_code.description",
        ]
    })
    liveEdit && addEditableTags(response[0][0], "page", true);
    return response[0][0];
}

export const getPageRes = async (entryUrl) => {
    const response = await Stack.getEntryByUrl({
        contentTypeUid: "blank_page",
        entryUrl,
        referenceFieldPath: ["page_components.from_blog.featured_blogs", "page_components.superheroes.character"],
        jsonRtePath: [
            "page_components.from_blog.featured_blogs.body",
            "page_components.section_with_buckets.buckets.description",
            "page_components.section_with_html_code.description",
        ],
    });
    liveEdit && addEditableTags(response[0], "page", true);
    return response[0];
};

export const getFastLanePage = async (entryUrl) => {
    console.log('in get fast Lane Page');
    const response = await Stack.getEntryByUrl({
        contentTypeUid: "blank_page",
        entryUrl,
        referenceFieldPath: [],
        jsonRtePath: ["page_components.content_section.content.intro_text"],
    });
    liveEdit && addEditableTags(response[0], "blank_page", true);
    console.log('returned');
    console.log(response);
    return response[0];    
};

export const getBlogListRes = async () => {
    const response = await Stack.getEntry({
        contentTypeUid: "blog_post",
        referenceFieldPath: ["author", "related_post"],
        jsonRtePath: ["body"],
    });
    liveEdit &&
        response[0].forEach((entry) => addEditableTags(entry, "blog_post", true));
    return response[0];
};

export const getBlogPostRes = async (entryUrl) => {
    const response = await Stack.getEntryByUrl({
        contentTypeUid: "blog_post",
        entryUrl,
        referenceFieldPath: ["author", "related_post"],
        jsonRtePath: ["body", "related_post.body"],
    });
    liveEdit && addEditableTags(response[0], "blog_post", true);
    return response[0];
};

export const getAllComposableHeros = async (entryUrl) => {
    const response = await Stack.getEntryByUrl({
        contentTypeUid: "superhero_gallery_page",
        entryUrl,
        referenceFieldPath: ["characters"],
        jsonRtePath: ["characters.description"],
    });

    liveEdit && addEditableTags(response, "superhero_gallery_page", true);
    return response[0];
};

export const getComposableHeroHomeWorld = async () => {
    const response = await Stack.getEntry({
        contentTypeUid: "character",
        // referenceFieldPath: ["home_world"],
        jsonRtePath: ["description"],
    });
    liveEdit &&
        response[0].forEach((entry) => addEditableTags(entry, "character", true));
    return response;
};

export const getComposableHeroSingleRes = async (entryUrl) => {
    const response = await Stack.getEntryByUrl({
        contentTypeUid: "character",
        entryUrl,
        referenceFieldPath: ["home_world"],
        jsonRtePath: ["description"],
    });

    liveEdit && addEditableTags(response[0], "character", true);
    return response[0];
};

export const getComposableHeroGallery = async (entryUrl) => {
    const response = await Stack.getEntryByUrl({
        contentTypeUid: "superhero_landing_page",
        entryUrl,
        referenceFieldPath: ["modular_blocks.super_heroes_gallery.heroes"],
        jsonRtePath: [
            "page_components.from_blog.featured_blogs.body",
            "page_components.section_with_buckets.buckets.description",
            "page_components.section_with_html_code.description",
        ],
    });

    liveEdit && addEditableTags(response[0], "page", true);
    return response[0];
};

export const getSuperheroGalleryRes = async () => {
    const response = await Stack.getEntry({
        contentTypeUid: "character",
        jsonRtePath: ["description"],
    });

    liveEdit &&
        response[0].forEach((entry) => addEditableTags(entry, "character", true));
    return response;
};

export const getCarouselRes = async (carouselUid) => {
    const response = await Stack.getEntryByUid({
        contentTypeUid: "carousel",
        entryUid: carouselUid,
        referenceFieldPath: ["slides"],
        jsonRtePath: ["description", "slides.description"],
    });
    
    liveEdit && addEditableTags(response, "carousel", true);
    return response;
};

export const getNewsBannerRes = async (newsBannerUid) => {
    const response = await Stack.getEntryByUid({
        contentTypeUid: "news_banner",
        entryUid: newsBannerUid,
        referenceFieldPath: [],
        jsonRtePath: ["content.detail_text"],
    });
    
    // response is array-like: {0: {entry_data}, $: {metadata}}
    // Add editable tags to the actual entry object at index 0
    if (liveEdit && response && response[0]) {
        addEditableTags(response[0], "news_banner", true);
    }
    return response;
};

export const getNewsSectionRes = async (newsSectionUid) => {
    const response = await Stack.getEntryByUid({
        contentTypeUid: "news_section",
        entryUid: newsSectionUid,
        referenceFieldPath: [],
        jsonRtePath: [],
    });
    
    // response is array-like: {0: {entry_data}, $: {metadata}}
    // Add editable tags to the actual entry object at index 0
    if (liveEdit && response && response[0]) {
        addEditableTags(response[0], "news_section", true);
    }
    return response;
};

export const getContactUsSectionRes = async (contactUsSectionUid, locale = 'en-us') => {
    try {
        // First try to get the contactus section in the requested locale
        const response = await Stack.getEntryByUid({
            contentTypeUid: "contactus_section",
            entryUid: contactUsSectionUid,
            referenceFieldPath: [],
            jsonRtePath: [],
            locale: locale,
        });
        
        if (response) {
            // Contentstack SDK may return data in array-like format with index "0"
            // Unwrap the response if it's in that format
            let entry = response;
            if (response["0"] && typeof response["0"] === 'object') {
                entry = response["0"];
            } else if (Array.isArray(response) && response.length > 0) {
                entry = response[0];
            }
            
            // response is array-like: {0: {entry_data}, $: {metadata}}
            // Add editable tags to the actual entry object
            if (liveEdit && entry) {
                addEditableTags(entry, "contactus_section", true);
            }
            return response;
        }
    } catch (error) {
        console.log(`ContactUs section not found in locale ${locale}, trying fallback to en-us`);
    }
    
    // If the requested locale doesn't exist, fallback to English
    if (locale !== 'en-us') {
        try {
            const fallbackResponse = await Stack.getEntryByUid({
                contentTypeUid: "contactus_section",
                entryUid: contactUsSectionUid,
                referenceFieldPath: [],
                jsonRtePath: [],
                locale: 'en-us',
            });
            
            if (fallbackResponse) {
                // Unwrap the fallback response
                let entry = fallbackResponse;
                if (fallbackResponse["0"] && typeof fallbackResponse["0"] === 'object') {
                    entry = fallbackResponse["0"];
                } else if (Array.isArray(fallbackResponse) && fallbackResponse.length > 0) {
                    entry = fallbackResponse[0];
                }
                
                if (liveEdit && entry) {
                    addEditableTags(entry, "contactus_section", true);
                }
                return fallbackResponse;
            }
        } catch (fallbackError) {
            console.error('Fallback to en-us also failed:', fallbackError);
        }
    }
    
    return null;
};

export const getContentCardRes = async (cardUid) => {
    const response = await Stack.getEntryByUid({
        contentTypeUid: "content_card_model",
        entryUid: cardUid,
        referenceFieldPath: [],
        jsonRtePath: ["content.intro_text"],
    });
    
    liveEdit && addEditableTags(response, "content_card_model", true);
    return response;
};

export const metaData = (seo) => {
    const metaArr = [];
    for (const key in seo) {
        if (seo.enable_search_indexing) {
            metaArr.push(
                <meta
                    name={
                        key.includes('meta_')
                            ? key.split('meta_')[1].toString()
                            : key.toString()
                    }
                    content={seo[key].toString()}
                    key={key}
                />
            );
        }
    }
    return metaArr;
};