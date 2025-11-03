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
  getEntry({ contentTypeUid, referenceFieldPath, jsonRtePath }) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
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
    contentTypeUid, entryUrl, referenceFieldPath, jsonRtePath, variantParam,
  }) {
    return new Promise((resolve, reject) => {
      const entryQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) entryQuery.includeReference(referenceFieldPath);
      entryQuery.toJSON();
      
      // Add variant support using Personalize SDK method
      if (variantParam) {
        try {
          const variantAliases = Personalize.variantParamToVariantAliases(variantParam);
          
          if (variantAliases && variantAliases.length > 0) {
            const variantAlias = variantAliases.join(',');
            entryQuery.variants(variantAlias);
          } 
        } catch (error) {
          console.error('❌ Error applying variants:', error);
        }
      }
      
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
    contentTypeUid, entryUid, referenceFieldPath, jsonRtePath, variantParam,
  }) {
    return new Promise((resolve, reject) => {
      const entryQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) entryQuery.includeReference(referenceFieldPath);
      entryQuery.toJSON();
      
      // Add variant support using Personalize SDK method
      if (variantParam) {
        try {
          const variantAliases = Personalize.variantParamToVariantAliases(variantParam);
          
          if (variantAliases && variantAliases.length > 0) {
            const variantAlias = variantAliases.join(',');
            entryQuery.variants(variantAlias);
          } 
        } catch (error) {
          console.error('❌ Error applying variants (UID):', error);
        }
      }
      
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