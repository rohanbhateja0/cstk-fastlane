'use client';

import React from 'react';
import { InstantSearch, SearchBox, Hits, Stats, Configure, useHits, Pagination, HitsPerPage, useSearchBox, useInstantSearch } from 'react-instantsearch';
import { searchClient, INDEX_NAME, searchConfig } from '@/lib/algolia';
import SearchResultCard from '@/components/SearchResultCard';

// Custom component to display search query
function SearchQueryDisplay({ query }: { query: string }) {
  return (
    <h1 className="text-4xl font-bold text-zinc-900 tracking-tight mb-6">
      Search results for "{query || 'all content'}"
    </h1>
  );
}

// Custom search box with autosuggest
function AutocompleteSearchBox({ onQueryChange }: { onQueryChange: (query: string) => void }) {
  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const { query: searchQuery, refine } = useSearchBox();

  // Debounced search function
  const searchSuggestions = React.useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const { results } = await searchClient.search([
          {
            indexName: INDEX_NAME,
            params: {
              query: searchQuery,
              hitsPerPage: 5,
              attributesToRetrieve: ['title', 'content.title', 'content.intro_text'],
              attributesToHighlight: ['title', 'content.title']
            }
          }
        ]);

        setSuggestions((results[0] as any).hits || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    }, 300),
    []
  );

  React.useEffect(() => {
    searchSuggestions(query);
  }, [query, searchSuggestions]);

  // Sync local query with InstantSearch query
  React.useEffect(() => {
    if (searchQuery !== query) {
      setQuery(searchQuery);
    }
  }, [searchQuery, query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onQueryChange(value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
    
    // Trigger search as user types
    refine(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    const title = suggestion.title || suggestion.content?.title || '';
    setQuery(title);
    onQueryChange(title);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    // Trigger the main search with the selected query
    refine(title);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search blogs and content..."
        className="w-full h-10 px-3 py-2 text-sm text-zinc-500 placeholder-zinc-500 border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-zinc-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.objectID}
              className={`px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-zinc-100 last:border-b-0 ${
                index === selectedIndex ? 'bg-sky-50' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="text-sm font-medium text-zinc-700">
                {suggestion.title || suggestion.content?.title || 'Untitled'}
              </div>
              {suggestion.content?.intro_text && (
                <div className="text-xs text-zinc-500 mt-1 line-clamp-2">
                  {typeof suggestion.content.intro_text === 'string' 
                    ? suggestion.content.intro_text.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
                    : suggestion.content.intro_text.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
                  }
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Custom component to handle empty state and results
function SearchResults({ viewMode }: { viewMode: 'list' | 'grid' }) {
  const { hits } = useHits();

  // Show empty state only when there are no results
  if (hits.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-500">Try adjusting your search terms or check your spelling.</p>
      </div>
    );
  }

  // Show results based on view mode
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hits.map((hit: any) => (
          <SearchResultCard key={hit.objectID} hit={hit} viewMode="grid" />
        ))}
      </div>
    );
  }

  // List view (default)
  return (
    <div className="space-y-6">
      {hits.map((hit: any) => (
        <SearchResultCard key={hit.objectID} hit={hit} viewMode="list" />
      ))}
    </div>
  );
}



// Results header with view toggle and sort controls
function ResultsHeader({ viewMode, setViewMode }: { viewMode: 'list' | 'grid', setViewMode: (mode: 'list' | 'grid') => void }) {
  const { hits, results } = useHits();
  
  // Only show if there are results
  if (hits.length === 0) {
    return null;
  }

  // Get pagination info from results
  const totalResults = results?.nbHits || 0;
  const currentPage = results?.page || 0;
  const hitsPerPage = results?.hitsPerPage || 5;
  const startResult = currentPage * hitsPerPage + 1;
  const endResult = Math.min((currentPage + 1) * hitsPerPage, totalResults);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <span className="text-base text-zinc-900">
          Showing {startResult}-{endResult} of {totalResults} results
        </span>
      </div>
      
      <div className="flex items-center space-x-1">
        {/* Grid View Button */}
        <button
          onClick={() => setViewMode('grid')}
          className={`p-1 rounded ${
            viewMode === 'grid' 
              ? 'text-sky-900' 
              : 'text-zinc-500 hover:text-zinc-700'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        
        {/* List View Button */}
        <button
          onClick={() => setViewMode('list')}
          className={`p-1 rounded ${
            viewMode === 'list' 
              ? 'text-sky-900' 
              : 'text-zinc-500 hover:text-zinc-700'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
        
      </div>
    </div>
  );
}

// Custom results per page selector
function ResultsPerPageSelector() {
  const { hits } = useHits();
  
  // Only show if there are results
  if (hits.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 mb-6">
      <span className="text-sm text-gray-600">Show:</span>
      <HitsPerPage
        items={[
          { label: '6 per page', value: 6, default: true },
          { label: '12 per page', value: 12 },
          { label: '18 per page', value: 18 },
          { label: '24 per page', value: 24 },
          { label: '30 per page', value: 30 }
        ]}
        classNames={{
          root: 'flex items-center space-x-2',
          select: 'px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
        }}
      />
    </div>
  );
}

// Custom pagination component using Algolia Pagination with Figma-style arrows
function SearchPagination() {
  const { hits } = useHits();
  
  // Only show pagination if there are results
  if (hits.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center">
      <Pagination 
        classNames={{
          root: 'flex items-center space-x-3',
          list: 'flex items-center space-x-3',
          item: 'inline-flex',
          link: 'text-base text-sky-900 hover:text-sky-700 transition-colors px-1 py-1',
          selectedItem: 'inline-flex text-base text-black underline font-medium px-1 py-1',
          disabledItem: 'opacity-50 cursor-not-allowed',
          previousPageItem: 'p-1 text-zinc-900 hover:text-sky-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          nextPageItem: 'p-1 text-zinc-900 hover:text-sky-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          firstPageItem: 'hidden',
          lastPageItem: 'hidden'
        }}
        showFirst={false}
        showLast={false}
        showPrevious={true}
        showNext={true}
        translations={{
          previousPageItemText: '‹',
          nextPageItemText: '›'
        }}
      />
    </div>
  );
}

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
          
          {/* Search Box */}
          <div className="flex gap-2 max-w-4xl">
            <div className="flex-1">
              <AutocompleteSearchBox onQueryChange={setSearchQuery} />
            </div>
            <button className="bg-sky-900 text-white px-4 py-2 rounded-md h-10 text-sm font-medium hover:bg-sky-800 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Main Content Area */}
                <div className="max-w-7xl mx-auto px-6 pb-12">
                  <div className="flex gap-6">
                    {/* Main Results Area */}
                    <div className="flex-1 max-w-4xl">
              {/* Results Header */}
              <ResultsHeader viewMode={viewMode} setViewMode={setViewMode} />

              {/* Search Results */}
              <SearchResults viewMode={viewMode} />
              
              {/* Pagination */}
              <SearchPagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
