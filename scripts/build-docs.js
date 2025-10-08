#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Building docs in isolated environment...');

// Change to docs directory
const docsDir = path.join(__dirname, '..', 'docs');
process.chdir(docsDir);

// Ensure docs has its own node_modules
if (!fs.existsSync(path.join(docsDir, 'node_modules'))) {
  console.log('📦 Installing docs dependencies...');
  execSync('npm install', { stdio: 'inherit' });
}

// Set environment variables to prevent parent config interference
process.env.NODE_ENV = 'production';
process.env.NEXT_PUBLIC_IS_DOCS = 'true';

// Build docs with explicit isolation
console.log('🔨 Building docs...');
execSync('npm run build', { 
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production',
    NEXT_PUBLIC_IS_DOCS: 'true'
  }
});

console.log('✅ Docs build completed successfully!');
