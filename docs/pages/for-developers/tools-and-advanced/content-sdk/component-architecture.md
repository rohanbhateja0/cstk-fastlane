# Component Architecture with Content SDK

This guide covers the new component architecture patterns introduced with the Sitecore Content SDK.

## 🏗️ Component Discovery Requirements

### Folder Structure and Exclusions

The Content SDK's auto-generation script scans configured paths but intelligently excludes certain files:

```
src/components/
├── accordion/
│   ├── Accordion.tsx          # ✅ Included in componentMap
│   └── Accordion.test.tsx     # ❌ Excluded (matches *.test.tsx pattern)
├── breadcrumb/
│   ├── Breadcrumb.tsx         # ✅ Included in componentMap
│   └── Breadcrumb.test.tsx    # ❌ Excluded (matches *.test.tsx pattern)
├── content-sdk/               # ❌ Excluded (entire folder)
│   ├── helpers.tsx            
│   └── utilities.tsx          
└── navigation/
    ├── Navigation.tsx         # ✅ Included in componentMap
    └── Navigation.test.tsx    # ❌ Excluded (matches *.test.tsx pattern)
```

**Configuration Benefits:**
- 🎯 **Selective inclusion** - Only register actual Sitecore components
- 🧪 **Test file exclusion** - Co-located test files are automatically excluded
- 🛠️ **Helper exclusion** - Utility components don't clutter the componentMap
- ⚙️ **Configurable patterns** - Customize exclusions via `sitecore.cli.config.ts`

## 🎯 Component Registration with Enhanced Control

### New componentMap System

The Content SDK uses an **auto-generated** `componentMap` system (replacing JSS's `componentFactory`):

```typescript
// .sitecore/component-map.ts (AUTO-GENERATED - DO NOT EDIT)
import { NextjsContentSdkComponent } from '@sitecore-content-sdk/nextjs';

// Components imported from the app
import * as VideoPlayer from 'src/components/VideoPlayer';
import * as Header from 'src/components/Header';
import * as Footer from 'src/components/Footer';
import * as ContentCard from 'src/components/ContentCard';
// ... all components auto-imported

// Components registered as a simple Map
export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['VideoPlayer', VideoPlayer],
  ['Header', Header], 
  ['Footer', Footer],
  ['ContentCard', ContentCard],
  // ... all components auto-registered
]);
```

### How Component Registration Works

**Auto-Generation via Script:**
```bash
# Automatically scans configured paths and generates the map
npm run sitecore-tools:generate-map
```

**Configuration in `sitecore.cli.config.ts`:**
```typescript
export default {
  componentMap: {
    paths: ['src/components'],
    // Exclude auxiliary components and test files  
    exclude: [
      'src/components/content-sdk/*',    // Exclude Content SDK helpers
      'src/components/*.test.tsx',       // Exclude test files (even though siblings)
    ],
  },
};
```

**The script automatically:**
- 🔍 **Scans** configured paths for components
- 🚫 **Excludes** files matching exclusion patterns
- 📝 **Generates** imports and Map entries for valid components
- 🔄 **Updates** `.sitecore/component-map.ts`
- ✅ **Registers** only included components with Sitecore

**Key Benefits of Exclusions:**
- ✅ **Test files excluded** even when co-located with components
- ✅ **Helper components excluded** (like Content SDK utilities)  
- ✅ **Clean component map** with only Sitecore-registered components

## ⚙️ ComponentMap Configuration

### Customizing Component Discovery

You can customize which components are included via `sitecore.cli.config.ts`:

```typescript
export default {
  componentMap: {
    // Specify which directories to scan
    paths: ['src/components', 'src/custom-components'],
    
    // Exclude specific patterns or directories
    exclude: [
      'src/components/content-sdk/*',     // Exclude helper utilities
      'src/components/*.test.tsx',        // Exclude all test files
      'src/components/*.stories.tsx',     // Exclude Storybook stories
      'src/components/deprecated/*',      // Exclude deprecated components
    ],
  },
};
```

**Configuration Options:**
- 📁 **`paths`** - Directories to scan for components
- 🚫 **`exclude`** - Glob patterns for files/folders to exclude
- ⚡ **Intelligent exclusions** - Keeps test files co-located but out of componentMap



## 🧩 ContentStack Component Integration

### Organized ContentStack Components

ContentStack components are now organized in a dedicated folder:

```
src/components/
├── contentstack/           # 🆕 ContentStack Components
│   ├── navigation/
│   │   ├── Navigation.tsx
│   │   └── Breadcrumb.tsx
│   ├── search/
│   │   ├── SearchBox.tsx
│   │   └── SearchResults.tsx
│   └── forms/
│       ├── Form.tsx
│       └── FormField.tsx
```

## 🔧 Enhanced Page Mode Detection

### Granular Mode Detection

The Content SDK provides more granular page mode detection:

```typescript
import { useSitecore } from '@sitecore-content-sdk/nextjs';

export const ModeAwareComponent = () => {
  const { page } = useSitecore();
  
  // Granular mode detection
  if (page.mode.isNormal) {
    return <NormalView />;
  }
  
  if (page.mode.isPreview) {
    return <PreviewView />;
  }
  
  if (page.mode.isEditing) {
    return <EditingView />;
  }
  
  return <DefaultView />;
};
```

## 🔄 Migration from JSS

### Component Migration Checklist

- [ ] **Update imports**: `@sitecore-jss/sitecore-jss-nextjs` → `@sitecore-content-sdk/nextjs`
- [ ] **Replace hooks**: `useSitecoreContext` → `useSitecore`
- [ ] **Remove componentFactory**: Replaced by auto-generated `componentMap`
- [ ] **Organize files**: Move to folder-per-component structure
- [ ] **Update tests**: New mocking patterns for Content SDK
- [ ] **Run component map generator**: `npm run sitecore-tools:generate-map`

### Migration Example

```typescript
// Before (JSS)
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

export const OldComponent = ({ fields }) => {
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext.pageEditing;
  
  return <div>{/* component */}</div>;
};

// After (Content SDK)
import { useSitecore } from '@sitecore-content-sdk/nextjs';

export const NewComponent = ({ fields }: ComponentProps) => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  
  return <div>{/* component */}</div>;
};
```

## 🎯 Content SDK Best Practices

### 1. Component Registration
- Always run `npm run sitecore-tools:generate-map` after adding components
- Configure exclusions in `sitecore.cli.config.ts` to exclude test files and helpers
- Use co-located test files (automatically excluded by `*.test.tsx` pattern)
- Exclude utility folders that shouldn't be Sitecore components

### 2. Page Mode Detection
- Use `page.mode.isEditing` instead of checking context manually
- Leverage granular mode detection (`isDesignLibrary`, `isVariantGeneration`)
- Test components in all Content SDK modes

### 3. Migration from JSS
- Update all imports from JSS to Content SDK
- Replace `useSitecoreContext` with `useSitecore`
- Remove manual `componentFactory` registration

## 🎯 Next Steps

- **Testing Guide**: See /headapps/nextjs-starter/TESTING.md
- **FastLane Patterns**: See [FastLane Component Development](../../component-development/fastlane/component-development)

---

The Content SDK's component architecture provides **improved organization**, **better performance**, and **enhanced developer experience** while maintaining **backward compatibility** with existing patterns. 