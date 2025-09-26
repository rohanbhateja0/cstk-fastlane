// Importing Contentstack SDK and specific types for region and query operations
import contentstack from "@contentstack/delivery-sdk";

// Importing Contentstack Live Preview utilities and stack SDK 
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";

// helper functions from private package to retrieve Contentstack endpoints in a convienient way
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";

// Set the region by string value from environment variables
const region = getRegionForString(process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || "NA");

// object with all endpoints for region.
const endpoints = getContentstackEndpoints(region, true)

export const stack = contentstack.stack({
  // Setting the API key from environment variables
  apiKey: process.env.CONTENTSTACK_API_KEY as string ,

  // Setting the delivery token from environment variables
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN as string,

  // Setting the environment based on environment variables
  environment: process.env.CONTENTSTACK_ENVIRONMENT as string,

  // Setting the region based on environment variables
  region: region,
  live_preview: {
    // Enabling live preview if specified in environment variables
    enable: process.env.CONTENTSTACK_LIVE_PREVIEW === 'true',

    // Setting the preview token from environment variables
    preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN,

    // Setting the host for live preview based on the region
    host: process.env.CONTENTSTACK_PREVIEW_HOST,
  }
});

// Initialize live preview functionality
export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: false, // Disabling server-side rendering for live preview
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === "true", // Enabling live preview if specified in environment variables
    mode: "builder", // Setting the mode to "builder" for visual builder
    stackSdk: stack.config as IStackSdk, // Passing the stack configuration
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN, // Setting the API key from environment variables
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT, // Setting the environment from environment variables
    },
    clientUrlParams: {
        protocol: "https",
        host: process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST, // Use region-specific host if applicable
        port: 443,
    },
    editButton: {
      enable: process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_EDIT_TAGS === "true" // Enabling the edit button for live preview
    },
  });
}
