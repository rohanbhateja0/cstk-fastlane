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

// Build docs
console.log('🔨 Building docs...');
execSync('npm run build', { stdio: 'inherit' });

console.log('✅ Docs build completed successfully!');
