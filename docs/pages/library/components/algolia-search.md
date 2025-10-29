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

### Code Examples and Implementation
For detailed code examples, implementation guides, and AI prompts for building search pages with filters, see:
- **[Search Page Requirements & Code Examples](./for-developers/component-development/ai-prompts/templates/algolia-core-search-page-requirements.md)** - Complete code examples, TypeScript interfaces, and implementation patterns for search pages including filter components.

**Use the requirements file for coding instructions:**
- Import and component setup
- Filter implementation with RefinementList, CurrentRefinements, and ClearRefinements
- Label formatting and transformation
- Complete working code examples

## Architecture Overview

### System Integration Flow
```
Figma Designs → Design Tokens → Component Library → Search Interface
     ↓
Contentstack CMS → MCP Tools → Content Sync → Algolia Index
     ↓
Search Interface → Algolia API → Search Results → UI Rendering
```

### Core Components
1. **Content Management Layer**: Contentstack CMS with MCP tools
2. **Search Engine Layer**: Algolia search and indexing
3. **Design System Layer**: Figma-based component library
4. **Presentation Layer**: Search interface and results display

## Contentstack MCP Integration

### 1. MCP Tool Paths and Configuration

#### Available MCP Tools for Search
```
@contentstack-mcp/
├── mcp_contentstack_get_all_entries
├── mcp_contentstack_get_single_entry
├── mcp_contentstack_get_all_content_types
├── mcp_contentstack_get_all_languages
├── mcp_contentstack_get_all_environments
└── mcp_contentstack_publish_an_entry
```

#### Content Type Architecture
- **Search Configuration**: `search_config` content type for search settings
- **Searchable Content**: All content types that should be searchable
- **Search Templates**: Custom result display templates
- **Search Analytics**: Search behavior tracking and reporting

### 2. Content Management Flow

#### Content Sync Process
1. **Content Creation**: Content created in Contentstack CMS
2. **MCP Tool Trigger**: Content update triggers MCP tool execution
3. **Content Transformation**: MCP tools transform content for search index
4. **Algolia Sync**: Transformed content synced to Algolia index
5. **Search Availability**: Content becomes searchable immediately

#### Multi-locale Content Handling
- **Locale-specific Indexing**: Each locale gets its own search index
- **Fallback Content**: Default locale content as fallback
- **Cross-locale Search**: Optional cross-locale search capabilities

### 3. MCP Integration Patterns

#### Content Retrieval Patterns
- **Batch Content Fetching**: Use `mcp_contentstack_get_all_entries` for bulk operations
- **Single Entry Fetching**: Use `mcp_contentstack_get_single_entry` for specific content
- **Content Type Discovery**: Use `mcp_contentstack_get_all_content_types` for dynamic content types
- **Locale Management**: Use `mcp_contentstack_get_all_languages` for multi-locale support

#### Content Publishing Patterns
- **Publish on Update**: Automatically publish content when search index is updated
- **Batch Publishing**: Publish multiple entries simultaneously
- **Environment Management**: Publish to different environments (dev, staging, prod)

## Figma Design Integration

### 1. Figma MCP Integration

#### Figma MCP Tool Paths
```
@figma-mcp/
├── mcp_Figma_get_design_tokens
├── mcp_Figma_get_component_specs
├── mcp_Figma_get_design_system
└── mcp_Figma_export_assets
```

#### Design Token Extraction
- **Color Tokens**: Primary, secondary, accent colors from Figma
- **Typography Tokens**: Font families, sizes, weights, line heights
- **Spacing Tokens**: Margins, padding, gaps from design system
- **Component Tokens**: Button styles, input styles, card layouts

### 2. Search Interface Design Patterns

#### Search Page Layout Components
- **Search Header**: Title, search input, search button
- **Results Header**: Result count, view toggle buttons, sort options
- **Search Results**: Individual result cards (grid/list layouts)
- **Pagination**: Previous/next buttons, page numbers
- **Empty State**: No results found message

#### Responsive Design Breakpoints
- **Mobile**: 320px - 768px (single column, stacked layout)
- **Tablet**: 768px - 1024px (two column grid, sidebar filters)
- **Desktop**: 1024px+ (three column grid, full sidebar)

### 3. Component Design System

#### Search Box Design
- **Input Field**: Rounded corners, focus states, placeholder text
- **Search Button**: Primary action button with icon
- **Suggestions Dropdown**: Hover states, keyboard navigation
- **Clear Button**: Secondary action to clear search

#### Result Card Design
- **Grid View**: Square aspect ratio, image on top
- **List View**: Horizontal layout, image on left
- **Hover States**: Subtle shadow, scale transform
- **Loading States**: Skeleton placeholders

#### Filter Components Design
- **Filter Sidebar**: Sticky sidebar with filter options
- **Checkbox Filters**: Content type filters with checkboxes
- **Selected Filters**: Badge-style display with cross buttons
- **Filter Layout**: Clear hierarchy and visual organization

## Algolia Search Architecture

### 1. Search Index Structure

#### Index Configuration
- **Primary Index**: Main search index for all content
- **Locale-specific Indexes**: Separate indexes per locale
- **Content Type Indexes**: Specialized indexes for specific content types
- **Analytics Index**: Search behavior and performance tracking

#### Search Attributes
- **Searchable Attributes**: Title, content, category, tags
- **Faceted Attributes**: Content type, category, publish date
- **Retrievable Attributes**: All fields needed for display
- **Highlighted Attributes**: Title and content for search highlighting

### 2. Adding Filter Components

#### Overview
The search page includes filter functionality using Algolia's built-in components:
- **RefinementList**: Checkbox-based filters for content type selection
- **CurrentRefinements**: Displays active filters as removable badges
- **ClearRefinements**: Button to clear all active filters

#### Filter Components Architecture
- **Filter Sidebar**: Sticky sidebar containing filter options
  - Content type filter with checkboxes and counts
  - Clear all filters button
  - Proper spacing and hover states
  
- **Selected Filters Display**: Active filters shown above search results
  - Badge-style format with background color
  - Cross button to remove individual filters
  - Formatted labels (underscores removed, words capitalized)
  
- **Filter Formatting**: Labels are automatically formatted
  - Content type names: "content_card_model" → "Content Card Model"
  - Attribute names: "_content_type" → "Content Type"
  - User-friendly display without technical underscores

#### Filter Configuration Requirements
- **Algolia Index Setup**: Configure `attributesForFaceting` in Algolia dashboard
- **Facet Configuration**: Add facets to search config (e.g., `['_content_type']`)
- **Layout Integration**: Filters displayed in sidebar, selected filters above results
- **Responsive Design**: Filter sidebar stacks on mobile, side-by-side on desktop

### 3. Search Performance Architecture

#### Query Optimization
- **Query Caching**: Cache frequent search queries
- **Result Pagination**: Efficient pagination for large result sets
- **Faceted Search**: Fast filtering by content attributes
- **Search Analytics**: Track search performance and user behavior

#### Content Synchronization
- **Real-time Sync**: Immediate content updates to search index
- **Batch Sync**: Scheduled bulk content synchronization
- **Incremental Updates**: Only sync changed content
- **Error Handling**: Retry failed sync operations

## Component Architecture

### 1. Search Page Component Hierarchy

#### Main Search Page
```
SearchPage
├── SearchHeader
│   ├── SearchTitle
│   ├── SearchBox
│   └── SearchButton
├── SearchContentArea
│   ├── FilterSidebar
│   │   ├── FilterHeader
│   │   ├── ClearRefinements
│   │   └── RefinementList (Content Type)
│   └── ResultsArea
│       ├── SelectedFilters (Active Filters with Cross Buttons)
│       ├── ResultsHeader
│       ├── ViewToggle
│       ├── SearchResults
│       └── SearchPagination
└── SearchPagination
    ├── PreviousButton
    ├── PageNumbers
    └── NextButton
```

#### Search Result Card Components
```
SearchResultCard
├── ResultImage
├── ResultContent
│   ├── ResultTitle
│   ├── ResultDescription
│   └── ResultMetadata
└── ResultActions
    ├── ViewButton
    └── ShareButton
```

### 2. State Management Architecture

#### Search State Structure
- **Query State**: Current search query and suggestions
- **Results State**: Search results and pagination
- **Filter State**: Active filters and facets
  - Content type filters
  - Selected filter refinements
  - Clear all filters capability
- **UI State**: View mode, loading states, errors
- **Analytics State**: Search tracking and performance metrics

#### State Management Patterns
- **Centralized State**: Single source of truth for search state
- **State Normalization**: Normalized data structure for results
- **State Persistence**: URL-based state persistence
- **State Synchronization**: Sync with Contentstack and Algolia

### 3. Data Flow Architecture

#### Search Data Flow
1. **User Input**: Search query entered in search box
2. **Query Processing**: Debounced query sent to Algolia
3. **Result Retrieval**: Algolia returns search results
4. **Content Enhancement**: MCP tools fetch additional content details
5. **UI Rendering**: Results displayed in chosen view mode

#### Content Sync Data Flow
1. **Content Update**: Content updated in Contentstack
2. **MCP Trigger**: MCP tool triggered by content change
3. **Content Transformation**: Content transformed for search index
4. **Algolia Update**: Transformed content synced to Algolia
5. **Search Availability**: Updated content becomes searchable

## Implementation Paths

### 1. Development Workflow

#### Phase 1: Setup and Configuration
1. **Contentstack Setup**: Configure content types and MCP tools
2. **Algolia Setup**: Configure search index and API keys
3. **Figma Integration**: Extract design tokens and component specs
4. **Environment Configuration**: Set up development environment

#### Phase 2: Core Implementation
1. **Search Interface**: Implement search box and basic functionality
2. **Content Sync**: Set up Contentstack to Algolia synchronization
3. **Result Display**: Implement search results and pagination
4. **Filtering**: Add content type and category filtering

#### Phase 3: Enhancement and Optimization
1. **Autocomplete**: Add search suggestions and autocomplete
2. **Performance**: Optimize search queries and caching
3. **Analytics**: Implement search tracking and analytics
4. **Testing**: Add comprehensive testing suite

### 2. MCP Tool Integration Paths

#### Contentstack MCP Tools
- **Content Retrieval**: `mcp_contentstack_get_all_entries` for bulk content
- **Single Content**: `mcp_contentstack_get_single_entry` for specific content
- **Content Types**: `mcp_contentstack_get_all_content_types` for dynamic types
- **Localization**: `mcp_contentstack_get_all_languages` for multi-locale support

#### Figma MCP Tools
- **Design Tokens**: `mcp_Figma_get_design_tokens` for styling
- **Component Specs**: `mcp_Figma_get_component_specs` for component details
- **Asset Export**: `mcp_Figma_export_assets` for images and icons

### 3. Deployment and Scaling

#### Environment Management
- **Development**: Local development with test data
- **Staging**: Pre-production testing with real content
- **Production**: Live environment with full content sync

#### Performance Optimization
- **CDN Integration**: Use CDN for static assets and search results
- **Caching Strategy**: Implement multi-level caching
- **Load Balancing**: Distribute search load across multiple instances
- **Monitoring**: Set up performance monitoring and alerting

## Testing Strategy

### 1. Architecture Testing

#### Integration Testing
- **Contentstack MCP Integration**: Test all MCP tool functions
- **Algolia Search Integration**: Test search queries and indexing
- **Figma Design Integration**: Test design token extraction
- **Multi-locale Support**: Test content in different languages

#### Performance Testing
- **Search Response Time**: Measure search query performance
- **Content Sync Performance**: Test content synchronization speed
- **Load Testing**: Test search under high user load
- **Memory Testing**: Test for memory leaks and resource usage

### 2. User Experience Testing

#### Functional Testing
- **Search Functionality**: Test all search features and interactions
- **Filtering and Sorting**: Test all filter and sort options
- **Pagination**: Test pagination across different result sets
- **Responsive Design**: Test across all device sizes and orientations

#### Accessibility Testing
- **Keyboard Navigation**: Test all keyboard interactions
- **Screen Reader Support**: Test with screen reader software
- **Color Contrast**: Test color contrast ratios
- **Focus Management**: Test focus indicators and management

### 3. Content and Data Testing

#### Content Sync Testing
- **Content Updates**: Test content updates reflect in search
- **Content Deletion**: Test content deletion from search index
- **Content Publishing**: Test content publishing workflow
- **Error Handling**: Test content sync error scenarios

#### Search Quality Testing
- **Search Relevance**: Test search result relevance
- **Search Completeness**: Test search covers all content types
- **Search Performance**: Test search under various conditions
- **Search Analytics**: Test search tracking and reporting

## Troubleshooting

### Common Issues

#### 1. Contentstack MCP Integration Issues
- **MCP Tool Availability**: Verify MCP tools are properly configured
- **API Key Configuration**: Check Contentstack API keys and permissions
- **Content Type Access**: Ensure MCP tools have access to required content types
- **Rate Limiting**: Monitor API rate limits and implement backoff strategies

#### 2. Algolia Search Configuration Issues
- **Index Configuration**: Verify search index settings and attributes
- **API Key Permissions**: Check Algolia API key permissions and scopes
- **Search Performance**: Monitor search query performance and optimization
- **Index Synchronization**: Ensure content sync is working properly

#### Filter Implementation Issues
- **No Facets Showing**: Ensure index is configured with `attributesForFaceting`
  - Run index configuration script to set up faceting
  - Check that facets are requested in search configuration
- **Filter Not Working**: Verify attribute name matches index field
  - Check attribute name spelling and underscores
  - Ensure field exists in your search index
- **Unformatted Labels**: Apply `transformItems` to format display labels
  - Remove underscores from labels
  - Capitalize words for readability

#### 4. Figma Design Integration Issues
- **Design Token Extraction**: Verify design tokens are properly extracted
- **Component Specs**: Check component specifications and measurements
- **Asset Export**: Ensure assets are properly exported and accessible
- **Design System Consistency**: Maintain consistency with design system

#### 5. Performance and Scaling Issues
- **Search Response Time**: Monitor and optimize search query performance
- **Content Sync Performance**: Optimize content synchronization processes
- **Memory Usage**: Monitor memory usage and implement cleanup strategies
- **Load Balancing**: Implement proper load balancing for high traffic

### Debug and Monitoring

#### System Health Monitoring
- **MCP Tool Status**: Monitor MCP tool availability and performance
- **Search Performance**: Track search query response times
- **Content Sync Status**: Monitor content synchronization health
- **Error Tracking**: Implement comprehensive error tracking and alerting

#### Performance Metrics
- **Search Analytics**: Track search usage and performance metrics
- **Content Analytics**: Monitor content update frequency and patterns
- **User Behavior**: Track user search behavior and preferences
- **System Performance**: Monitor overall system performance and health

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
