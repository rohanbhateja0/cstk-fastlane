# Search Page Setup Guide

This guide explains how to create and setup a search page using Figma designs and the existing codebase reference.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Figma Integration](#figma-integration)
4. [Search Page Implementation](#search-page-implementation)
5. [Component Structure](#component-structure)
6. [Styling and Design](#styling-and-design)
7. [Testing and Validation](#testing-and-validation)
8. [Troubleshooting](#troubleshooting)

## Overview

The search page provides a comprehensive search interface with the following features:
- **Autosuggest Search**: Real-time search suggestions as users type
- **Grid/List View Toggle**: Switch between different result layouts
- **Pagination**: Navigate through multiple pages of results
- **Results Per Page**: Control how many results are displayed
- **Responsive Design**: Works across all device sizes

## Prerequisites

Before starting, ensure you have:

1. **Algolia Account**: Set up with API keys and index
2. **Contentstack Integration**: Content indexed in Algolia
3. **Figma Access**: Design files and MCP integration
4. **Development Environment**: Node.js, Next.js, TypeScript

### Required Environment Variables

```bash
# Algolia Configuration
NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=your_algolia_search_api_key
ALGOLIA_ADMIN_API_KEY=your_algolia_admin_api_key
NEXT_PUBLIC_ALGOLIA_INDEX_NAME=dev_contentstack

# Contentstack Configuration
CONTENTSTACK_API_KEY=your_contentstack_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
CONTENTSTACK_ENVIRONMENT=development
CONTENTSTACK_REGION=us
```

## Figma Integration

### 1. Access Figma Design

Use the Figma MCP to access design files:

```bash
# Example Figma URL structure
https://www.figma.com/design/M37xh0dT7qtPPiEDIRuA4X/XMC-Fastlane---Official-Altudo-Version?node-id=17811-5466&m=dev
```

### 2. Extract Design Elements

From the Figma design, identify these key components:

- **Search Header**: Title, search input, search button
- **Results Header**: Result count, view toggle buttons, sort options
- **Search Results**: Individual result cards (grid/list layouts)
- **Pagination**: Previous/next buttons, page numbers
- **Empty State**: No results found message

### 3. Design Tokens

Extract the following design tokens from Figma:

```css
/* Colors */
--primary-color: #0f172a (zinc-900)
--secondary-color: #0ea5e9 (sky-500)
--text-primary: #09090b (zinc-950)
--text-secondary: #71717a (zinc-500)
--border-color: #d4d4d8 (zinc-300)
--background: #ffffff

/* Typography */
--font-family: Satoshi, system-ui, sans-serif
--font-size-sm: 0.875rem (14px)
--font-size-base: 1rem (16px)
--font-size-lg: 1.125rem (18px)
--font-size-xl: 1.25rem (20px)
--font-size-2xl: 1.5rem (24px)
--font-size-4xl: 2.25rem (36px)

/* Spacing */
--spacing-1: 0.25rem (4px)
--spacing-2: 0.5rem (8px)
--spacing-3: 0.75rem (12px)
--spacing-4: 1rem (16px)
--spacing-6: 1.5rem (24px)
--spacing-8: 2rem (32px)
--spacing-12: 3rem (48px)

/* Border Radius */
--radius-sm: 0.375rem (6px)
--radius-md: 0.5rem (8px)
--radius-lg: 0.75rem (12px)
```

## Search Page Implementation

### 1. File Structure

```
app/search/
├── page.tsx                 # Main search page component
components/
├── SearchResultCard.tsx     # Individual result card component
lib/
├── algolia.ts              # Algolia configuration
```

### 2. Main Search Page (`app/search/page.tsx`)

```typescript
'use client';

import React from 'react';
import { InstantSearch, SearchBox, Hits, Stats, Configure, useHits, Pagination, HitsPerPage, useSearchBox, useInstantSearch } from 'react-instantsearch';
import { searchClient, INDEX_NAME, searchConfig } from '@/lib/algolia';
import SearchResultCard from '@/components/SearchResultCard';

// Key components:
// - SearchQueryDisplay: Shows current search query
// - AutocompleteSearchBox: Search input with autosuggest
// - SearchResults: Displays results or empty state
// - ResultsHeader: Result count and view toggle
// - SearchPagination: Pagination controls
```

### 3. Algolia Configuration (`lib/algolia.ts`)

```typescript
import { algoliasearch } from 'algoliasearch';

// Initialize search client
export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || 'your_algolia_app_id',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || 'your_algolia_search_api_key'
);

// Search configuration
export const searchConfig = {
  hitsPerPage: 5,
  attributesToRetrieve: ['title', 'content', 'uid', 'created_at', 'updated_at', '_content_type'],
  attributesToHighlight: ['title'],
  attributesToSnippet: ['content:20'],
  facets: ['_content_type']
};
```

### 4. Search Result Card (`components/SearchResultCard.tsx`)

```typescript
interface SearchResultCardProps {
  hit: {
    objectID: string;
    __position: number;
    __queryID?: string;
    title?: string;
    content?: {
      title?: string;
      category?: string;
      intro_text?: string;
      image?: {
        url?: string;
        title?: string;
      };
    };
    uid?: string;
    created_at?: string;
    _content_type?: string;
  };
  viewMode?: 'list' | 'grid';
}
```

## Component Structure

### 1. Search Page Layout

```typescript
export default function SearchPage() {
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="min-h-screen bg-white">
      <InstantSearch searchClient={searchClient} indexName={INDEX_NAME}>
        <Configure {...searchConfig} />
        
        {/* Search Header */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <SearchQueryDisplay query={searchQuery} />
          <AutocompleteSearchBox onQueryChange={setSearchQuery} />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="flex gap-6">
            <div className="flex-1 max-w-4xl">
              <ResultsHeader viewMode={viewMode} setViewMode={setViewMode} />
              <SearchResults viewMode={viewMode} />
              <SearchPagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
```

### 2. Key Components

#### SearchQueryDisplay
- Shows current search query
- Handles empty state ("Search results for 'all content'")

#### AutocompleteSearchBox
- Real-time search suggestions
- Keyboard navigation (arrow keys, enter, escape)
- Debounced search to limit API calls
- Integration with main search

#### SearchResults
- Conditional rendering based on view mode
- Empty state handling
- Grid/List layout switching

#### ResultsHeader
- Dynamic result count
- View toggle buttons (grid/list)
- Responsive design

#### SearchPagination
- Algolia Pagination component
- Custom styling to match Figma design
- Previous/Next navigation

## Styling and Design

### 1. Tailwind CSS Classes

```css
/* Search Header */
.search-header {
  @apply max-w-7xl mx-auto px-6 py-12;
}

.search-title {
  @apply text-4xl font-bold text-zinc-900 tracking-tight mb-6;
}

/* Search Input */
.search-input {
  @apply w-full h-10 px-3 py-2 text-sm text-zinc-500 placeholder-zinc-500 border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent;
}

/* Results Header */
.results-header {
  @apply flex items-center justify-between mb-6;
}

.view-toggle {
  @apply flex items-center space-x-1;
}

/* Result Cards */
.result-card {
  @apply bg-white border border-zinc-300 rounded-lg p-4 hover:shadow-md transition-shadow duration-200;
}

/* Pagination */
.pagination {
  @apply flex items-center space-x-3;
}

.pagination-button {
  @apply text-base text-sky-900 hover:text-sky-700 transition-colors px-1 py-1;
}
```

### 2. Responsive Design

```css
/* Mobile First Approach */
.search-container {
  @apply max-w-7xl mx-auto px-6;
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .search-container {
    @apply px-8;
  }
}

@media (min-width: 1024px) {
  .search-container {
    @apply px-12;
  }
}
```

### 3. Grid/List View Switching

```typescript
// Grid View
if (viewMode === 'grid') {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hits.map((hit: any) => (
        <SearchResultCard key={hit.objectID} hit={hit} viewMode="grid" />
      ))}
    </div>
  );
}

// List View
return (
  <div className="space-y-6">
    {hits.map((hit: any) => (
      <SearchResultCard key={hit.objectID} hit={hit} viewMode="list" />
    ))}
  </div>
);
```

## Testing and Validation

### 1. Search Functionality

- [ ] Search input accepts text
- [ ] Autosuggest shows suggestions
- [ ] Search triggers on enter/click
- [ ] Results display correctly
- [ ] Empty state shows when no results

### 2. View Toggle

- [ ] Grid view displays correctly
- [ ] List view displays correctly
- [ ] Toggle buttons work
- [ ] Layout switches smoothly

### 3. Pagination

- [ ] Previous/Next buttons work
- [ ] Page numbers display correctly
- [ ] Result count updates
- [ ] Navigation is smooth

### 4. Responsive Design

- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] Touch interactions work

### 5. Performance

- [ ] Search is fast (< 200ms)
- [ ] Autosuggest is responsive
- [ ] No memory leaks
- [ ] Smooth animations

## Troubleshooting

### Common Issues

#### 1. "Index does not exist" Error
```bash
# Solution: Use only existing index
# Remove sort indices references
# Use single index for all operations
```

#### 2. Content Type Filter Not Showing
```bash
# Check Algolia dashboard:
# 1. Go to Facets tab
# 2. Add _content_type as facet
# 3. Set as "Searchable"
# 4. Verify data in index
```

#### 3. Autosuggest Not Working
```typescript
// Check debounce implementation
const searchSuggestions = React.useCallback(
  debounce(async (searchQuery: string) => {
    // Implementation
  }, 300),
  []
);
```

#### 4. Pagination Not Working
```typescript
// Use Algolia's Pagination component
<Pagination 
  classNames={{
    root: 'flex items-center space-x-3',
    // ... other styles
  }}
  showPrevious={true}
  showNext={true}
/>
```

### Debug Steps

1. **Check Browser Console**: Look for JavaScript errors
2. **Verify Environment Variables**: Ensure all Algolia keys are set
3. **Test Algolia Dashboard**: Verify index has data
4. **Check Network Tab**: Monitor API calls
5. **Validate Component Props**: Ensure all required props are passed

### Performance Optimization

1. **Debounce Search**: Limit API calls during typing
2. **Memoize Components**: Use React.memo for expensive components
3. **Lazy Loading**: Load images only when needed
4. **Code Splitting**: Split search page into chunks

## Best Practices

### 1. Code Organization

- Keep components small and focused
- Use TypeScript for type safety
- Implement proper error boundaries
- Follow React best practices

### 2. User Experience

- Provide loading states
- Handle empty states gracefully
- Implement keyboard navigation
- Ensure accessibility compliance

### 3. Performance

- Optimize images
- Use efficient search queries
- Implement proper caching
- Monitor bundle size

### 4. Maintenance

- Document components
- Write unit tests
- Keep dependencies updated
- Monitor performance metrics

## Conclusion

This guide provides a comprehensive approach to creating a search page using Figma designs and existing codebase references. The implementation focuses on:

- **Design Fidelity**: Matching Figma designs exactly
- **User Experience**: Smooth, responsive interactions
- **Performance**: Fast, efficient search
- **Maintainability**: Clean, well-documented code

Follow this guide step-by-step to create a professional, production-ready search page that integrates seamlessly with your existing application.
