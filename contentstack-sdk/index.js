import * as contentstack from 'contentstack';
import * as Utils from '@contentstack/utils';
import Personalize from '@contentstack/personalize-edge-sdk';

import ContentstackLivePreview from '@contentstack/live-preview-utils';

const Stack = contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY
    ? process.env.CONTENTSTACK_API_KEY
    : process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
  region: process.env.CONTENTSTACK_REGION ? process.env.CONTENTSTACK_REGION : 'us',
  live_preview: {
    enable: true,
    host: process.env.CONTENTSTACK_PREVIEW_HOST,
    preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN
  },
});

if (process.env.CONTENTSTACK_API_HOST) {
  Stack.setHost(process.env.CONTENTSTACK_API_HOST);
}

ContentstackLivePreview.init({
  stackSdk: Stack,
  stackDetails: {
    apiKey: process.env.CONTENTSTACK_API_KEY,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
    branch: process.env.CONTENTSTACK_BRANCH,
},
   
  clientUrlParams: {
    host: process.env.CONTENTSTACK_APP_HOST,
  },
  enable: true,
  ssr: false,
  mode: "builder",
});

export const { onEntryChange } = ContentstackLivePreview;

const renderOption = {
  span: (node, next) => next(node.children),
};

export default {
  /**
   *
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   *
   */
  getEntry({ contentTypeUid, referenceFieldPath, jsonRtePath, locale, variantParam }) {
    return new Promise((resolve, reject) => {
      // Check if required environment variables are present
      if (!process.env.CONTENTSTACK_API_KEY && !process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY) {
        reject(new Error('ContentStack API key is not configured. Please set CONTENTSTACK_API_KEY or NEXT_PUBLIC_CONTENTSTACK_API_KEY environment variable.'));
        return;
      }
      
      if (!process.env.CONTENTSTACK_DELIVERY_TOKEN) {
        reject(new Error('ContentStack delivery token is not configured. Please set CONTENTSTACK_DELIVERY_TOKEN environment variable.'));
        return;
      }
      
      if (!process.env.CONTENTSTACK_ENVIRONMENT) {
        reject(new Error('ContentStack environment is not configured. Please set CONTENTSTACK_ENVIRONMENT environment variable.'));
        return;
      }

      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      if (locale) query.language(locale);
      
      // Add variant support - apply BEFORE toJSON()
      if (variantParam) {
        try {
          // Try to convert variant param to variant aliases using Personalize SDK
          if (Personalize && typeof Personalize.variantParamToVariantAliases === 'function') {
            const variantAliases = Personalize.variantParamToVariantAliases(variantParam);
            if (variantAliases && variantAliases.length > 0) {
              const variantAlias = variantAliases.join(',');
              // Use addParam with the variant alias if variants() method doesn't exist
              if (typeof query.variants === 'function') {
                query.variants(variantAlias);
              } else {
                query.addParam('personalization_variants', variantAlias);
              }
            }
          } else {
            // Fallback: use variantParam directly as query parameter
            query.addParam('personalization_variants', variantParam);
          }
        } catch (error) {
          console.error('❌ Error applying variants (getEntry):', error);
          // Fallback: use variantParam directly
          try {
            query.addParam('personalization_variants', variantParam);
          } catch (fallbackError) {
            console.error('❌ Fallback variant param also failed:', fallbackError);
          }
        }
      }
      
      query
        .toJSON()
        .find()
        .then(
          (result) => {
            jsonRtePath
              && Utils.jsonToHTML({
                entry: result,
                paths: jsonRtePath,
                renderOption,
              });
            resolve(result);
          },
          (error) => {
            console.error('ContentStack API Error:', error);
            reject(error);
          },
        );
    });
  },

  /**
   *fetches specific entry from a content-type
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* url for entry to be fetched} entryUrl
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   * @param {* variant parameter} variantParam
   * @returns
   */
  getEntryByUrl({
    contentTypeUid, entryUrl, referenceFieldPath, jsonRtePath, locale,
    variantParam,
  }) {
    return new Promise((resolve, reject) => {
      const entryQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) entryQuery.includeReference(referenceFieldPath);
      if (locale) entryQuery.language(locale);
      
      // Add variant support - apply BEFORE toJSON()
      if (variantParam) {
        try {
          // Try to convert variant param to variant aliases using Personalize SDK
          if (Personalize && typeof Personalize.variantParamToVariantAliases === 'function') {
            const variantAliases = Personalize.variantParamToVariantAliases(variantParam);
            if (variantAliases && variantAliases.length > 0) {
              const variantAlias = variantAliases.join(',');
              // Use addParam with the variant alias if variants() method doesn't exist
              if (typeof entryQuery.variants === 'function') {
                entryQuery.variants(variantAlias);
              } else {
                entryQuery.addParam('personalization_variants', variantAlias);
              }
            }
          } else {
            // Fallback: use variantParam directly as query parameter
            entryQuery.addParam('personalization_variants', variantParam);
          }
        } catch (error) {
          console.error('❌ Error applying variants:', error);
          // Fallback: use variantParam directly
          try {
            entryQuery.addParam('personalization_variants', variantParam);
          } catch (fallbackError) {
            console.error('❌ Fallback variant param also failed:', fallbackError);
          }
        }
      }
      
      entryQuery.toJSON();
      const data = entryQuery.where('url', `${entryUrl}`).find();
      data.then(
        (result) => {
          jsonRtePath
          && Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
          
          resolve(result[0]);
        },
        (error) => {
          console.error(error);
          reject(error);
        },
      );
    });
  },

  /**
   *fetches specific entry from a content-type by UID
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* UID for entry to be fetched} entryUid
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   * @param {* variant parameter} variantParam
   * @returns
   */
  getEntryByUid({
    contentTypeUid, entryUid, referenceFieldPath, jsonRtePath, locale,
    variantParam,
  }) {
    return new Promise((resolve, reject) => {
      const entryQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) entryQuery.includeReference(referenceFieldPath);
      if (locale) entryQuery.language(locale);
      
      // Add variant support - apply BEFORE toJSON()
      if (variantParam) {
        try {
          // Try to convert variant param to variant aliases using Personalize SDK
          if (Personalize && typeof Personalize.variantParamToVariantAliases === 'function') {
            const variantAliases = Personalize.variantParamToVariantAliases(variantParam);
            if (variantAliases && variantAliases.length > 0) {
              const variantAlias = variantAliases.join(',');
              // Use addParam with the variant alias if variants() method doesn't exist
              if (typeof entryQuery.variants === 'function') {
                entryQuery.variants(variantAlias);
              } else {
                entryQuery.addParam('personalization_variants', variantAlias);
              }
            }
          } else {
            // Fallback: use variantParam directly as query parameter
            entryQuery.addParam('personalization_variants', variantParam);
          }
        } catch (error) {
          console.error('❌ Error applying variants (UID):', error);
          // Fallback: use variantParam directly
          try {
            entryQuery.addParam('personalization_variants', variantParam);
          } catch (fallbackError) {
            console.error('❌ Fallback variant param also failed:', fallbackError);
          }
        }
      }
      
      entryQuery.toJSON();
      const data = entryQuery.where('uid', `${entryUid}`).find();
      data.then(
        (result) => {
          jsonRtePath
          && Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
          resolve(result[0]);
        },
        (error) => {
          console.error(error);
          reject(error);
        },
      );
    });
  },
};