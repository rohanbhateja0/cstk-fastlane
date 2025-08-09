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
    host: endpoints.preview,
  }
});

// Initialize live preview functionality
export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: false, // Disabling server-side rendering for live preview
    enable: true, // Enabling live preview if specified in environment variables
    mode: "builder", // Setting the mode to "builder" for visual builder
    stackSdk: stack.config as IStackSdk, // Passing the stack configuration
    stackDetails: {
      apiKey: "cs1c73ef162a0bc2ddb95c02cb", // Setting the API key from environment variables
      environment: "development", // Setting the environment from environment variables
    },
    clientUrlParams: {
        protocol: "https",
        host: "app.contentstack.com", // Use region-specific host if applicable
        port: 443,
    },
    editButton: {
      enable: true // Enabling the edit button for live preview
    },
  });
}
