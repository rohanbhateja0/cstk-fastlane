import { algoliasearch } from 'algoliasearch';

// Initialize Algolia client
export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || 'your_algolia_app_id',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || 'your_algolia_search_api_key'
);

// Admin client for indexing (server-side only)
export const adminClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || 'your_algolia_app_id',
  process.env.ALGOLIA_ADMIN_API_KEY || 'your_algolia_admin_api_key'
);

// Index name
export const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'dev_contentstack';

// Search configuration
export const searchConfig = {
  hitsPerPage: 6, // Default, can be changed by HitsPerPage component
  attributesToRetrieve: [
    'title',
    'content',
    'uid',
    'created_at',
    'updated_at',
    '_content_type'
  ],
  attributesToHighlight: [
    'title'
  ],
  attributesToSnippet: [
    'content:20'
  ],
  // Facets for filtering
  facets: ['_content_type'],
  // Sort configuration
  sortFacetValuesBy: 'count',
  // Ensure facets are returned
  maxValuesPerFacet: 100
};

// Sort indices configuration
export const sortIndices = [
  { name: INDEX_NAME, label: 'Relevance' },
  { name: `${INDEX_NAME}_created_at_desc`, label: 'Newest First' },
  { name: `${INDEX_NAME}_created_at_asc`, label: 'Oldest First' },
  { name: `${INDEX_NAME}_title_asc`, label: 'Title A-Z' },
  { name: `${INDEX_NAME}_title_desc`, label: 'Title Z-A' }
];
