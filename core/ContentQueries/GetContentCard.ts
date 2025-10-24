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
        const targetLocale = locale || "en-us";
        console.log('GetContentCardBySlug called with:', { slug, locale: targetLocale });
        
        // Debug the specific slug we're looking for
        console.log('Looking for slug:', slug);
        console.log('Slug length:', slug.length);
        console.log('Slug characters:', slug.split('').map(c => ({ char: c, code: c.charCodeAt(0) })));
        
        // Get all content cards and find by slug
        const response = await Stack.getEntry({
            contentTypeUid: "content_card_model",
            referenceFieldPath: [],
            jsonRtePath: ["content.intro_text"],
            locale: targetLocale,
        });
        
        console.log('ContentStack response:', response);
        console.log('Number of entries found:', response[0]?.length || 0);
        
        // Log all available entries for debugging
        if (response[0]?.length > 0) {
            console.log('Available entries:');
            response[0].forEach((entry: any, index: number) => {
                const possibleTitles = [
                    entry.content?.title,
                    entry.title,
                    entry.content?.intro_text?.split('\n')[0],
                    entry.uid
                ].filter(Boolean);
                
                const generatedSlugs = possibleTitles.map(title => 
                    title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
                );
                
                console.log(`Entry ${index}:`, {
                    uid: entry.uid,
                    title: entry.title,
                    contentTitle: entry.content?.title,
                    locale: entry.locale,
                    possibleTitles,
                    generatedSlugs,
                    matchesTarget: generatedSlugs.includes(slug)
                });
            });
        }
        
        // Find entry by slug - try multiple title fields
        const foundEntry = response[0]?.find((entry: any) => {
            // Try different possible title fields
            const possibleTitles = [
                entry.content?.title,
                entry.title,
                entry.content?.intro_text?.split('\n')[0], // First line of intro text
                entry.uid // Fallback to UID
            ].filter(Boolean);
            
            for (const title of possibleTitles) {
                const entrySlug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
                console.log('Comparing slugs:', { 
                    entryTitle: title, 
                    entrySlug, 
                    requestedSlug: slug, 
                    match: entrySlug === slug,
                    exactMatch: entrySlug === slug,
                    includesMatch: entrySlug.includes(slug) || slug.includes(entrySlug)
                });
                
                // Try exact match first
                if (entrySlug === slug) {
                    return true;
                }
                
                // Try partial match (in case of URL encoding issues or slight variations)
                if (entrySlug.includes(slug) || slug.includes(entrySlug)) {
                    console.log('Found partial match, using this entry');
                    return true;
                }
            }
            return false;
        });
        
        if (foundEntry) {
            console.log('Found matching entry:', foundEntry.uid);
            // Add live edit tags to the found entry
            if (liveEdit) {
                addEditableTags(foundEntry, "content_card_model", true);
            }
            return foundEntry;
        }
        
        // If no entry found in the requested locale and it's not en-us, try en-us as fallback
        if (targetLocale !== "en-us") {
            console.log(`No entry found in ${targetLocale}, trying fallback to en-us`);
            try {
                const fallbackResponse = await Stack.getEntry({
                    contentTypeUid: "content_card_model",
                    referenceFieldPath: [],
                    jsonRtePath: ["content.intro_text"],
                    locale: "en-us",
                });
                
                const fallbackEntry = fallbackResponse[0]?.find((entry: any) => {
                    const possibleTitles = [
                        entry.content?.title,
                        entry.title,
                        entry.content?.intro_text?.split('\n')[0],
                        entry.uid
                    ].filter(Boolean);
                    
                    for (const title of possibleTitles) {
                        const entrySlug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
                        if (entrySlug === slug) {
                            return true;
                        }
                    }
                    return false;
                });
                
                if (fallbackEntry) {
                    console.log('Found matching entry in fallback locale:', fallbackEntry.uid);
                    if (liveEdit) {
                        addEditableTags(fallbackEntry, "content_card_model", true);
                    }
                    return fallbackEntry;
                }
            } catch (fallbackError) {
                console.error('Fallback query failed:', fallbackError);
            }
        }
        
        console.log('No matching entry found for slug:', slug);
        return null;
    } catch (error) {
        console.error('Error in GetContentCardBySlug:', error);
        return null;
    }
};
