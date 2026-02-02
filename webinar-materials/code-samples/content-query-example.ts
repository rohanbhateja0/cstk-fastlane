/**
 * Content Query Example - Code Sample for Webinar
 * 
 * This file demonstrates Contentstack SDK integration patterns used in FastLane:
 * 1. Fetching content by URL with locale support
 * 2. Live Preview editable tags integration
 * 3. Fallback locale handling (requested locale -> en-us)
 * 4. Reference field inclusion for nested content
 * 5. Variant parameter support for personalization
 * 
 * Key patterns to highlight during presentation:
 * - Locale fallback strategy
 * - addEditableTags for Live Preview
 * - Reference field resolution
 * - Error handling patterns
 */

import Stack from "@/contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";
import { Locale } from "@/lib/i18n";

// ============================================
// Environment Configuration
// ============================================

/**
 * Check if Live Preview editing is enabled
 * This is set via environment variable
 */
const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

// ============================================
// Main Query Function
// ============================================

/**
 * GetPage - Fetches a page entry from Contentstack by URL
 * 
 * @param entryUrl - The URL path of the page (e.g., "/about", "/products/widget")
 * @param locale - The locale to fetch content in (defaults to 'en-us')
 * @param variantParam - Optional personalization variant parameter
 * @returns The page entry or null if not found
 * 
 * KEY FEATURES:
 * 1. Case-insensitive URL matching
 * 2. Automatic locale fallback to en-us
 * 3. Reference field resolution for nested content
 * 4. Live Preview editable tags
 */
export const GetPage = async (
  entryUrl: string, 
  locale: Locale = 'en-us', 
  variantParam = ''
) => {
  // ====================================
  // URL Normalization
  // ====================================
  // Always lowercase for case-insensitive matching
  const normalizedUrl = entryUrl.toLowerCase();
  
  try {
    // ====================================
    // Primary Query: Requested Locale
    // ====================================
    const response = await Stack.getEntryByUrl({
      contentTypeUid: "page",
      entryUrl: normalizedUrl,
      locale: locale,
      
      // Reference fields to resolve - these nested references
      // will be populated with full entry data
      referenceFieldPath: [
        "fastlane_components.news_banner.news_banner",
        "fastlane_components.carousel.carousels",
        "fastlane_components.news_section.news_sections",
        "fastlane_components.contactus_section.contactus_sections"
      ],
      
      // JSON RTE paths for rich text transformation
      jsonRtePath: [],
      
      // Personalization variant (from Contentstack Personalize)
      variantParam: variantParam,
    });
    
    // ====================================
    // Response Unwrapping
    // ====================================
    // Handle different response formats from the SDK
    let entry = response;
    if (response && response["0"] && typeof response["0"] === 'object') {
      entry = response["0"];
    } else if (Array.isArray(response) && response.length > 0) {
      entry = response[0];
    }
    
    // ====================================
    // Add Live Preview Editable Tags
    // ====================================
    if (entry && entry.uid) {
      // KEY PATTERN: Add editable tags for Live Preview
      // This enables in-browser editing in Contentstack Visual Builder
      liveEdit && addEditableTags(entry, "page", true);
      return entry;
    }
  } catch (error) {
    console.log(`Page not found in locale ${locale}, trying fallback...`);
  }
  
  // ====================================
  // Fallback: English Locale
  // ====================================
  // If content doesn't exist in requested locale, fall back to en-us
  if (locale !== 'en-us') {
    try {
      // First, find the entry in English to get the UID
      const englishResponse = await Stack.getEntryByUrl({
        contentTypeUid: "page",
        entryUrl: normalizedUrl,
        locale: 'en-us',
        referenceFieldPath: [
          "fastlane_components.news_banner.news_banner",
          "fastlane_components.carousel.carousels",
          "fastlane_components.news_section.news_sections",
          "fastlane_components.contactus_section.contactus_sections"
        ],
        jsonRtePath: [],
        variantParam: variantParam,
      });
      
      // Unwrap English response
      let englishEntry = englishResponse;
      if (englishResponse && englishResponse["0"]) {
        englishEntry = englishResponse["0"];
      } else if (Array.isArray(englishResponse) && englishResponse.length > 0) {
        englishEntry = englishResponse[0];
      }
      
      if (englishEntry && englishEntry.uid) {
        console.log('Found English entry, fetching localized version:', englishEntry.uid);
        
        // Now fetch the same entry by UID in the requested locale
        const localizedResponse = await Stack.getEntryByUid({
          contentTypeUid: "page",
          entryUid: englishEntry.uid,
          referenceFieldPath: [
            "fastlane_components.news_banner.news_banner",
            "fastlane_components.carousel.carousels",
            "fastlane_components.news_section.news_sections",
            "fastlane_components.contactus_section.contactus_sections"
          ],
          jsonRtePath: [],
          locale: locale,
          variantParam: variantParam,
        });
        
        // Unwrap localized response
        let localizedEntry = localizedResponse;
        if (localizedResponse && localizedResponse["0"]) {
          localizedEntry = localizedResponse["0"];
        } else if (Array.isArray(localizedResponse) && localizedResponse.length > 0) {
          localizedEntry = localizedResponse[0];
        }
        
        if (localizedEntry && localizedEntry.uid) {
          liveEdit && addEditableTags(localizedEntry, "page", true);
          return localizedEntry;
        }
        
        // If localized version doesn't exist, return English
        console.log('Localized version not found, returning English version');
        liveEdit && addEditableTags(englishEntry, "page", true);
        return englishEntry;
      }
    } catch (fallbackError) {
      console.error('Fallback to en-us also failed:', fallbackError);
    }
  }
  
  // No content found in any locale
  return null;
};

// ============================================
// Additional Query Examples
// ============================================

/**
 * GetHeader - Fetch header content for the site
 * Similar pattern to GetPage with locale fallback
 */
export const GetHeader = async (locale: Locale = 'en-us') => {
  try {
    const response = await Stack.getEntry({
      contentTypeUid: "header",
      locale: locale,
      referenceFieldPath: ["navigation_links"],
      jsonRtePath: [],
    });
    
    let entry = response?.[0];
    if (entry) {
      liveEdit && addEditableTags(entry, "header", true);
    }
    return entry;
  } catch (error) {
    console.error('Error fetching header:', error);
    return null;
  }
};

/**
 * GetFooter - Fetch footer content for the site
 */
export const GetFooter = async (locale: Locale = 'en-us') => {
  try {
    const response = await Stack.getEntry({
      contentTypeUid: "footer",
      locale: locale,
      referenceFieldPath: ["footer_links", "social_links"],
      jsonRtePath: [],
    });
    
    let entry = response?.[0];
    if (entry) {
      liveEdit && addEditableTags(entry, "footer", true);
    }
    return entry;
  } catch (error) {
    console.error('Error fetching footer:', error);
    return null;
  }
};

/* ============================================
   KEY PATTERNS SUMMARY FOR PRESENTERS:
   
   1. LIVE EDIT TAGS:
      liveEdit && addEditableTags(entry, "content_type_uid", true);
      - Enables Visual Builder editing
      - Third parameter (true) enables deep tagging for nested fields
   
   2. LOCALE FALLBACK:
      - Try requested locale first
      - Fall back to en-us if not found
      - Use entry UID to find same content in different locale
   
   3. REFERENCE RESOLUTION:
      referenceFieldPath: ["field.nested.reference"]
      - Automatically populates referenced entries
      - Enables deep content relationships
   
   4. VARIANT PARAMETERS:
      variantParam: variantParam
      - Passed from Contentstack Personalize
      - Enables A/B testing and personalization
   
   5. RESPONSE HANDLING:
      - SDK can return array or object format
      - Always unwrap consistently
      - Check for entry.uid to validate
   
   ============================================ */
