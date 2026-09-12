import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const configPath = path.join(root, 'js', 'config.js');
const indexPath = path.join(root, 'index.html');

let configContent = fs.readFileSync(configPath, 'utf8');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Determine target version: CLI arg > process.env.CACHE_VERSION > js/config.js CACHE_VERSION
const explicitVersion = process.argv[2] || process.env.CACHE_VERSION;
let targetVersion = explicitVersion;

if (explicitVersion) {
  // Update CACHE_VERSION in js/config.js
  configContent = configContent.replace(/(CACHE_VERSION:\s*['"])[^'"]+(['"])/, `$1${explicitVersion}$2`);
  fs.writeFileSync(configPath, configContent, 'utf8');
  console.log(`[sync-cache-version] Injected CACHE_VERSION '${explicitVersion}' into js/config.js`);
} else {
  const match = configContent.match(/CACHE_VERSION:\s*['"]([^'"]+)['"]/);
  if (!match) {
    console.error('[sync-cache-version] Error: CACHE_VERSION not found in js/config.js');
    process.exit(1);
  }
  targetVersion = match[1];
}

// Synchronize all ?v=... queries in index.html for CSS and JS assets
let replacedCount = 0;
const updatedIndexContent = indexContent.replace(
  /((?:href|src)=["'][^"']+\.(?:css|js))\?v=[^"'\s>]+(["'])/g,
  (full, prefix, suffix) => {
    replacedCount++;
    return `${prefix}?v=${targetVersion}${suffix}`;
  }
);

if (updatedIndexContent !== indexContent) {
  fs.writeFileSync(indexPath, updatedIndexContent, 'utf8');
  console.log(`[sync-cache-version] Successfully updated ${replacedCount} asset tags in index.html to ?v=${targetVersion}`);
} else {
  console.log(`[sync-cache-version] All ${replacedCount} asset tags in index.html already match ?v=${targetVersion}`);
}
