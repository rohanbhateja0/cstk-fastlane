#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';

const inputPath = path.resolve(__dirname, './all-variables.json');
const outputPath = path.resolve(__dirname, './theme-vars.css');

const raw = fs.readFileSync(inputPath, 'utf-8') + '    /*   */';

const tailwindMatch = raw.match(
  /\/\* 1\. TailwindCSS\.Default\.tokens\.json \*\/\s+({[\s\S]*?})\s+\/\*/
);
const themeMatch = raw.match(
  /\/\* 2\. Theme\.Default\.tokens\.json \*\/\s+({[\s\S]*?})\s+\/\*/
);

if (!tailwindMatch || !themeMatch) {
  console.error('❌ Could not extract JSON sections.');
  process.exit(1);
}

const tailwind = JSON.parse(tailwindMatch[1]);
const theme = JSON.parse(themeMatch[1]);

const tokenMap: Record<string, string> = {};
const outputMap: Map<string, string> = new Map(); // CSS var -> resolved value

// Keys that should be suffixed with 'px'
const pxUnitPaths = [
  'font.size.',
  'radius.',
  'border-width.',
  'width.',
  'height.',
];

// Flatten Tailwind tokens into tokenMap
function flattenTokens(obj: any, prefix = '') {
  for (const key in obj) {
    const val = obj[key];
    if (val?.type && val?.value !== undefined) {
      tokenMap[`${prefix}${key}`] = val.value;
    } else if (typeof val === 'object') {
      flattenTokens(val, `${prefix}${key}.`);
    }
  }
}

flattenTokens(tailwind);

// Resolve token references recursively
function resolveToken(value: unknown, depth = 0): string {
  const str = String(value);
  if (!str.startsWith('{') || depth > 10) return str;
  const key = str.replace(/[{}]/g, '');
  const resolved = tokenMap[key];
  if (!resolved) {
    console.warn(`⚠️ Unresolved: ${key}`);
    return str;
  }
  return resolveToken(resolved, depth + 1);
}

// Returns true if this key requires 'px' suffix
function requiresPx(key: string): boolean {
  return pxUnitPaths.some((prefix) => key.startsWith(prefix));
}

// Resolve and apply px suffix if required
function resolveWithPx(key: string, tokenValue: string): string {
  const value = resolveToken(tokenValue);
  return requiresPx(key) ? `${value}px` : value;
}

// Extract final token name (e.g., 'text-4xl') from path
function extractShortName(path: string): string {
  const parts = path.split('.');
  return parts[parts.length - 1];
}

// Recursively extract generic theme values and collect their tailwind references
function extractReferences(obj: any): void {
  for (const [_, val] of Object.entries(obj)) {
    if (
      (val as any)?.type &&
      typeof (val as any).value === 'string' &&
      (val as any).value.startsWith('{')
    ) {
      const refPath = (val as any).value.replace(/[{}]/g, '');
      const short = extractShortName(refPath);
      if (!outputMap.has(short)) {
        const resolved = resolveWithPx(refPath, (val as any).value);
        outputMap.set(short, resolved);
      }
    } else if (typeof val === 'object') {
      extractReferences(val);
    }
  }
}

// Build light/dark color CSS blocks
function buildColorBlock(mode: 'light' | 'dark'): string[] {
  const suffix = mode === 'dark' ? '-dark' : '-light';
  const lines: string[] = [];

  for (const [key, val] of Object.entries(theme.colors)) {
    if (key.endsWith(suffix)) {
      const baseKey = key.replace(suffix, '');
      const varName = `--${baseKey}`;
      lines.push(`  ${varName}: ${resolveToken((val as any).value)};`);
    }
  }

  return lines;
}

// Run reference scan (generic variables)
const themeWithoutColors = { ...theme };
delete themeWithoutColors.colors;

extractReferences(themeWithoutColors);

// Generate CSS output
const rootCss = [
  ':root {',
  ...buildColorBlock('light'),
  ...Array.from(outputMap.entries()).map(([key, val]) => `  --${key}: ${val};`),
  '}',
];

const darkCss = ['', '.dark {', ...buildColorBlock('dark'), '}'];

// Write CSS file
fs.writeFileSync(outputPath, [...rootCss, ...darkCss, ''].join('\n'));
console.log(`✅ theme-vars.css written to ${outputPath}`);
