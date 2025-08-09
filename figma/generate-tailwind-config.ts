#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

const inputPath = path.resolve(__dirname, './theme-vars.css');
const outputPath = path.resolve(__dirname, './tailwind.config.ts');

const css = fs.readFileSync(inputPath, 'utf-8');

const theme: Record<string, Record<string, string>> = {
  fontSize: {},
  borderRadius: {},
  borderWidth: {},
  width: {},
  height: {},
  colors: {},
};

const mapPrefixToThemeKey = (prefix: string): keyof typeof theme | null => {
  switch (prefix) {
    case 'text':
      return 'fontSize';
    case 'rounded':
      return 'borderRadius';
    case 'border':
      return 'borderWidth';
    case 'w':
      return 'width';
    case 'h':
      return 'height';
    default:
      return null;
  }
};

css.split('\n').forEach((line) => {
  const match = line.trim().match(/^--([a-z0-9-]+):\s*([^;]+);/i);
  if (!match) return;

  const [_, varName, rawValue] = match;
  const value = rawValue.trim();
  const varValue = `var(--${varName})`;
  const parts = varName.split('-');
  const prefix = parts[0];
  const suffix = parts.slice(1).join('-');

  const themeKey = mapPrefixToThemeKey(prefix);

  if (themeKey && suffix) {
    theme[themeKey][suffix] = varValue;
  } else {
    theme.colors[varName] = varValue;
  }
});

// Remove empty theme blocks
Object.keys(theme).forEach((key) => {
  if (Object.keys(theme[key]).length === 0) {
    delete theme[key];
  }
});

// Build config as string
function buildObjectLiteral(
  obj: Record<string, any>,
  indent = 2,
  level = 0
): string {
  const space = ' '.repeat(indent);
  const innerIndent = ' '.repeat(indent + 2);
  const entries = Object.entries(obj);
  return `{\n${entries
    .map(([key, val], idx) => {
      const safeKey =
        /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) && !key.includes('-')
          ? key
          : `'${key}'`;
      const isLast = idx === entries.length - 1;
      if (typeof val === 'object') {
        return `${innerIndent}${safeKey}: ${buildObjectLiteral(
          val,
          indent + 2,
          level + 1
        )}${isLast ? '' : ','}`;
      } else {
        return `${innerIndent}${safeKey}: '${val}'${isLast ? '' : ','}`;
      }
    })
    .join('\n')}\n${space}}`;
}

const configString = `module.exports = {
  theme: {
    extend: ${buildObjectLiteral(theme, 6)}
  }
};
`;

// Format with Prettier
prettier
  .format(configString, {
    parser: 'babel',
    singleQuote: true,
    trailingComma: 'all',
    semi: true,
  })
  .then((formatted) => {
    fs.writeFileSync(outputPath, formatted);
    console.log(`✅ Tailwind theme extension written to ${outputPath}`);
  });
