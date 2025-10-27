# Search Page Setup Requirements

> **For developers implementing search pages**: This file contains detailed code examples, TypeScript interfaces, and implementation patterns. Use this file when coding search functionality including filters, search boxes, and result displays.

## Overview

This template provides comprehensive requirements for creating search pages that integrate with Contentstack and Algolia, following the same standards as core component development but specifically tailored for search functionality.

## Core Development Standards

### Framework Agnostic Approach
- **Do NOT** assume specific framework implementations (React, Vue, Angular, etc.)
- Focus on **Contentstack MCP integration** and **Algolia search patterns**
- Use **semantic HTML** and **CSS custom properties** for styling
- Reference **Contentstack field types** and **Algolia search configuration**

### Contentstack Integration Requirements
- All search content must be sourced from **Contentstack entries** using MCP tools
- Use **Contentstack field mapping** for search index population
- Implement **content type filtering** based on Contentstack schemas
- Handle **multi-locale content** through Contentstack's localization features
- Support **Contentstack's content modeling** for search result structure

### Algolia Search Integration
- Configure **Algolia search client** with proper API keys
- Implement **search index management** through Contentstack content updates
- Use **Algolia's search features**: autocomplete, faceting, pagination, sorting
- Handle **search analytics** and **query performance**
- Support **search result highlighting** and **snippet generation**

## Search Page Architecture

### 1. Contentstack Content Modeling

#### Required Content Types
```yaml
# Search Configuration Content Type
search_config:
  fields:
    - search_title: SingleLineText
    - search_placeholder: SingleLineText
    - results_per_page: Number
    - default_sort: SingleLineText
    - enable_facets: Boolean
    - facet_fields: JSON
    - empty_state_message: RichText

# Search Result Content Type (for custom result layouts)
search_result_template:
  fields:
    - title: SingleLineText
    - description: RichText
    - result_type: SingleLineText
    - custom_fields: JSON
    - display_template: SingleLineText
```

#### Content Type Mapping for Search Index
```yaml
# Map Contentstack fields to Algolia searchable attributes
content_mapping:
  title: "title"
  content: "content.body"
  category: "category.title"
  tags: "tags"
  publish_date: "publish_date"
  content_type: "_content_type"
  uid: "uid"
  url: "url"
  image: "featured_image.url"
```

### 2. Algolia Configuration

#### Search Index Setup
```javascript
// Algolia index configuration
const searchConfig = {
  // Searchable attributes
  searchableAttributes: [
    'title',
    'content',
    'category',
    'tags',
    'description'
  ],
  
  // Attributes for faceting
  attributesForFaceting: [
    'searchable(category)',
    'searchable(content_type)',
    'searchable(tags)',
    'publish_date'
  ],
  
  // Attributes to retrieve
  attributesToRetrieve: [
    'title',
    'content',
    'category',
    'tags',
    'publish_date',
    'url',
    'image',
    'content_type',
    'uid'
  ],
  
  // Highlighting configuration
  attributesToHighlight: ['title', 'content'],
  attributesToSnippet: ['content:20'],
  
  // Pagination
  hitsPerPage: 20,
  
  // Sorting
  ranking: [
    'typo',
    'geo',
    'words',
    'filters',
    'proximity',
    'attribute',
    'exact',
    'custom'
  ]
};
```

#### Search Client Configuration
```javascript
// Environment-based configuration
const algoliaConfig = {
  appId: process.env.ALGOLIA_APP_ID,
  searchApiKey: process.env.ALGOLIA_SEARCH_API_KEY,
  adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
  indexName: process.env.ALGOLIA_INDEX_NAME || 'contentstack_search'
};
```

## Search Page Components

### 1. Search Interface Components

#### Search Box Component
```typescript
interface SearchBoxProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onQueryChange: (query: string) => void;
  debounceMs?: number;
  showSuggestions?: boolean;
  maxSuggestions?: number;
}

// Features:
// - Real-time search suggestions
// - Keyboard navigation (arrow keys, enter, escape)
// - Debounced input to limit API calls
// - Clear search functionality
// - Search history (optional)
```

#### Search Results Component
```typescript
interface SearchResultsProps {
  results: SearchResult[];
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  loading?: boolean;
  error?: string;
  emptyStateMessage?: string;
}

// Features:
// - Grid/List view toggle
// - Loading states
// - Error handling
// - Empty state display
// - Result highlighting
```

#### Search Filters Component
```typescript
interface SearchFiltersProps {
  facets: FacetData[];
  onFacetChange: (facet: string, value: string) => void;
  selectedFacets: Record<string, string[]>;
  onClearFilters: () => void;
}

// Features:
// - Content type filtering using RefinementList
// - Category filtering
// - Date range filtering
// - Tag filtering
// - Clear all filters using ClearRefinements
// - Selected filters displayed with CurrentRefinements component
// - Checkbox-based selection for content types
// - Active filter badges with cross buttons for removal
// - Format labels by removing underscores and capitalizing
// - Display formatted content type names (e.g., "Content Card Model" instead of "content_card_model")
// - Responsive sidebar layout with sticky positioning

// Filter Implementation:
// 1. Configure Algolia index with attributesForFaceting
// 2. Use RefinementList component for filter options
// 3. Use CurrentRefinements to show active filters
// 4. Use ClearRefinements to clear all filters
// 5. Apply transformItems to format labels (remove underscores, capitalize)
// 6. Display selected filters above search results as badges
```

#### Pagination Component
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPrevious?: boolean;
  showNext?: boolean;
  showPageNumbers?: boolean;
}

// Features:
// - Previous/Next navigation
// - Page number display
// - Jump to page
// - Results per page selector
```

### 2. Search Result Components

#### Search Result Card
```typescript
interface SearchResultCardProps {
  result: SearchResult;
  viewMode: 'grid' | 'list';
  highlightQuery?: string;
  onResultClick?: (result: SearchResult) => void;
}

interface SearchResult {
  objectID: string;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  publishDate?: string;
  url?: string;
  image?: {
    url: string;
    alt?: string;
  };
  contentType: string;
  uid: string;
  _highlightResult?: {
    title?: { value: string };
    content?: { value: string };
  };
}
```

## Contentstack MCP Integration

### 1. Content Retrieval
```typescript
// Use Contentstack MCP tools for content management
import { mcp_contentstack_get_all_entries } from '@contentstack-mcp';

// Get search configuration
const searchConfig = await mcp_contentstack_get_single_entry({
  content_type_uid: 'search_config',
  entry_id: 'search_config_main'
});

// Get content for search indexing
const contentEntries = await mcp_contentstack_get_all_entries({
  content_type_uid: 'page',
  limit: '100',
  include: ['category', 'tags', 'featured_image']
});
```

### 2. Search Index Management
```typescript
// Sync Contentstack content to Algolia
const syncContentToAlgolia = async () => {
  // Get all searchable content
  const entries = await mcp_contentstack_get_all_entries({
    content_type_uid: 'page',
    limit: '1000'
  });
  
  // Transform to Algolia format
  const searchRecords = entries.entries.map(transformToAlgoliaRecord);
  
  // Update Algolia index
  await algoliaIndex.saveObjects(searchRecords);
};
```

### 3. Multi-locale Support
```typescript
// Handle multiple locales
const getLocalizedContent = async (locale: string) => {
  const entries = await mcp_contentstack_get_all_entries({
    content_type_uid: 'page',
    locale: locale,
    limit: '1000'
  });
  
  return entries.entries;
};
```

## Search Functionality Implementation

### 1. Search Query Processing
```typescript
interface SearchQuery {
  query: string;
  filters?: Record<string, string[]>;
  sortBy?: string;
  page?: number;
  hitsPerPage?: number;
  facets?: string[];
}

// Search implementation
const performSearch = async (searchQuery: SearchQuery) => {
  const searchParams = {
    query: searchQuery.query,
    filters: buildFilterString(searchQuery.filters),
    sort: searchQuery.sortBy,
    page: searchQuery.page || 0,
    hitsPerPage: searchQuery.hitsPerPage || 20,
    facets: searchQuery.facets || ['content_type', 'category']
  };
  
  return await algoliaIndex.search(searchParams);
};
```

### 2. Autocomplete Implementation
```typescript
// Autocomplete search
const getSearchSuggestions = async (query: string) => {
  const suggestions = await algoliaIndex.searchForFacetValues({
    facetName: 'title',
    query: query,
    maxFacetHits: 5
  });
  
  return suggestions.facetHits;
};
```

### 3. Search Analytics
```typescript
// Track search analytics
const trackSearchEvent = (eventType: string, data: any) => {
  // Implement analytics tracking
  // This could integrate with Google Analytics, Mixpanel, etc.
  analytics.track(eventType, {
    ...data,
    timestamp: new Date().toISOString()
  });
};
```

## Styling and Design System

### 1. CSS Custom Properties
```css
/* Search-specific design tokens */
:root {
  /* Search Colors */
  --search-primary: var(--color-primary);
  --search-secondary: var(--color-secondary);
  --search-background: var(--color-background);
  --search-surface: var(--color-surface);
  --search-border: var(--color-border);
  
  /* Search Typography */
  --search-font-family: var(--font-family-base);
  --search-font-size-sm: var(--font-size-sm);
  --search-font-size-base: var(--font-size-base);
  --search-font-size-lg: var(--font-size-lg);
  --search-font-size-xl: var(--font-size-xl);
  
  /* Search Spacing */
  --search-spacing-xs: var(--spacing-xs);
  --search-spacing-sm: var(--spacing-sm);
  --search-spacing-md: var(--spacing-md);
  --search-spacing-lg: var(--spacing-lg);
  --search-spacing-xl: var(--spacing-xl);
  
  /* Search Layout */
  --search-max-width: 1200px;
  --search-border-radius: var(--border-radius-md);
  --search-shadow: var(--shadow-sm);
  --search-shadow-hover: var(--shadow-md);
}
```

### 2. Component Styling Patterns
```css
/* Search Box */
.search-box {
  width: 100%;
  padding: var(--search-spacing-sm) var(--search-spacing-md);
  border: 1px solid var(--search-border);
  border-radius: var(--search-border-radius);
  font-family: var(--search-font-family);
  font-size: var(--search-font-size-base);
  background: var(--search-background);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-box:focus {
  outline: none;
  border-color: var(--search-primary);
  box-shadow: 0 0 0 3px rgba(var(--search-primary-rgb), 0.1);
}

/* Search Results */
.search-results {
  display: grid;
  gap: var(--search-spacing-md);
}

.search-results--grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.search-results--list {
  grid-template-columns: 1fr;
}

/* Search Result Card */
.search-result-card {
  background: var(--search-surface);
  border: 1px solid var(--search-border);
  border-radius: var(--search-border-radius);
  padding: var(--search-spacing-md);
  box-shadow: var(--search-shadow);
  transition: box-shadow 0.2s ease;
}

.search-result-card:hover {
  box-shadow: var(--search-shadow-hover);
}
```

## Accessibility Requirements

### 1. Keyboard Navigation
- **Tab navigation** through all interactive elements
- **Arrow keys** for suggestion navigation
- **Enter key** to select suggestions or execute search
- **Escape key** to close suggestions or clear search
- **Focus indicators** for all interactive elements

### 2. Screen Reader Support
- **ARIA labels** for search input and buttons
- **Live regions** for search results updates
- **Descriptive text** for search states (loading, no results, etc.)
- **Semantic HTML** structure for result cards

### 3. Visual Accessibility
- **High contrast** color schemes
- **Scalable text** and interactive elements
- **Clear focus indicators**
- **Loading state indicators**

## Performance Requirements

### 1. Search Performance
- **Search response time** < 200ms for typical queries
- **Debounced input** to limit API calls during typing
- **Caching** for frequently accessed content
- **Lazy loading** for search results

### 2. Content Sync Performance
- **Incremental updates** to search index
- **Batch processing** for large content updates
- **Error handling** for failed sync operations
- **Retry logic** for transient failures

### 3. Bundle Size Optimization
- **Code splitting** for search functionality
- **Tree shaking** for unused Algolia features
- **Minimal dependencies** for search components

## Testing Requirements

### 1. Unit Testing
- **Search query processing** functions
- **Content transformation** utilities
- **Filter and sort** logic
- **Pagination** calculations

### 2. Integration Testing
- **Contentstack MCP** integration
- **Algolia search** functionality
- **Search result rendering**
- **Filter application**

### 3. End-to-End Testing
- **Complete search workflows**
- **Cross-browser compatibility**
- **Mobile responsiveness**
- **Accessibility compliance**

## Deployment and Configuration

### 1. Environment Configuration
```yaml
# Required environment variables
ALGOLIA_APP_ID: "your_algolia_app_id"
ALGOLIA_SEARCH_API_KEY: "your_search_api_key"
ALGOLIA_ADMIN_API_KEY: "your_admin_api_key"
ALGOLIA_INDEX_NAME: "contentstack_search"

CONTENTSTACK_API_KEY: "your_contentstack_api_key"
CONTENTSTACK_DELIVERY_TOKEN: "your_delivery_token"
CONTENTSTACK_ENVIRONMENT: "development"
CONTENTSTACK_REGION: "us"
```

### 2. Contentstack MCP Configuration
```json
{
  "contentstack": {
    "apiKey": "your_api_key",
    "deliveryToken": "your_delivery_token",
    "environment": "development",
    "region": "us"
  },
  "algolia": {
    "appId": "your_app_id",
    "searchApiKey": "your_search_key",
    "adminApiKey": "your_admin_key",
    "indexName": "contentstack_search"
  }
}
```

## Common Implementation Patterns

### 1. Search State Management
```typescript
interface SearchState {
  query: string;
  results: SearchResult[];
  facets: FacetData[];
  selectedFacets: Record<string, string[]>;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  viewMode: 'grid' | 'list';
}

// State management patterns
const useSearchState = () => {
  const [state, setState] = useState<SearchState>(initialState);
  
  const updateQuery = (query: string) => {
    setState(prev => ({ ...prev, query, currentPage: 0 }));
  };
  
  const updateFacets = (facets: Record<string, string[]>) => {
    setState(prev => ({ ...prev, selectedFacets: facets, currentPage: 0 }));
  };
  
  const updateViewMode = (mode: 'grid' | 'list') => {
    setState(prev => ({ ...prev, viewMode: mode }));
  };
  
  return { state, updateQuery, updateFacets, updateViewMode };
};
```

### 2. Error Handling
```typescript
// Search error handling
const handleSearchError = (error: Error) => {
  console.error('Search error:', error);
  
  // Track error for analytics
  analytics.track('search_error', {
    error: error.message,
    timestamp: new Date().toISOString()
  });
  
  // Show user-friendly error message
  setState(prev => ({
    ...prev,
    error: 'Search temporarily unavailable. Please try again.',
    loading: false
  }));
};
```

### 3. Content Transformation
```typescript
// Transform Contentstack content to Algolia format
const transformToAlgoliaRecord = (entry: ContentstackEntry): AlgoliaRecord => {
  return {
    objectID: entry.uid,
    title: entry.title,
    content: entry.content?.body || '',
    category: entry.category?.title || '',
    tags: entry.tags || [],
    publishDate: entry.publish_date,
    url: entry.url,
    image: {
      url: entry.featured_image?.url || '',
      alt: entry.featured_image?.title || ''
    },
    contentType: entry._content_type,
    uid: entry.uid
  };
};
```

## Implementation Checklist

### Pre-Implementation
- [ ] Set up Contentstack content types for search configuration
- [ ] Configure Algolia search index with proper settings
- [ ] Map Contentstack fields to Algolia searchable attributes
- [ ] Design search interface components and layouts
- [ ] Plan content synchronization strategy

### During Implementation
- [ ] Implement search query processing and filtering
- [ ] Create search result components with proper styling
- [ ] Integrate Contentstack MCP tools for content management
- [ ] Add autocomplete and suggestion functionality
- [ ] Implement pagination and sorting
- [ ] Add accessibility features and keyboard navigation

### Post-Implementation
- [ ] Test search functionality across different content types
- [ ] Validate search performance and response times
- [ ] Verify accessibility compliance
- [ ] Test content synchronization and updates
- [ ] Monitor search analytics and user behavior

## Deliverable

Output a comprehensive search page implementation that:
- Integrates seamlessly with Contentstack using MCP tools
- Provides fast, accurate search using Algolia
- Supports multiple content types and locales
- Includes proper error handling and loading states
- Meets accessibility standards
- Is framework-agnostic and reusable
- Follows the established design system patterns

## Key Benefits

1. **Contentstack Integration**: Seamless content management and search indexing
2. **Algolia Performance**: Fast, accurate search with advanced features
3. **Framework Agnostic**: Works with any frontend framework
4. **Accessibility Focus**: Meets WCAG guidelines for search interfaces
5. **Scalable Architecture**: Handles large content volumes efficiently
6. **Multi-locale Support**: Works with Contentstack's localization features
7. **Analytics Ready**: Built-in search tracking and performance monitoring

This template ensures search pages are built with proper Contentstack and Algolia integration while maintaining framework independence and following established design patterns.
