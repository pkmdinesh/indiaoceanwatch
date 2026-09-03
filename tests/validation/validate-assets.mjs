import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname,'../..');
const readText = file => fs.readFileSync(path.join(root,file),'utf8').replace(/^\uFEFF/,'');

const javascriptFiles = fs.readdirSync(path.join(root,'js'))
  .filter(file => file.endsWith('.js'))
  .map(file => `js/${file}`);

for (const file of [...javascriptFiles,'sw.js']) {
  new vm.Script(readText(file),{filename:file});
}

const jsonFiles = [
  'manifest.webmanifest',
  'status.json',
  'data/status.schema.json',
  'tests/fixtures/status-minimal.json',
  'data/pfz-lines.geojson',
  'data/pfz-sectors.geojson',
  'data/pfz-eez.geojson',
  'data/pfz-landing-centres.geojson',
  'data/osf-district-polygons.geojson',
  'data/svas-status.json'
];
for (const file of jsonFiles) {
  JSON.parse(readText(file));
}
for (const file of jsonFiles.filter(file => file.endsWith('.geojson'))) {
  const data=JSON.parse(readText(file));
  if (data?.type !== 'FeatureCollection' || !Array.isArray(data.features) || !data.features.length) {
    throw new Error(`Invalid or empty GeoJSON FeatureCollection: ${file}`);
  }
  if (data.features.some(feature => feature?.type !== 'Feature' || !feature.geometry?.type || !Array.isArray(feature.geometry.coordinates))) {
    throw new Error(`Invalid GeoJSON feature geometry: ${file}`);
  }
}

const html = readText('index.html');
const htmlReferences = [...html.matchAll(/(?:src|href)=["'](?!https?:|\/\/|#|mailto:|tel:|data:|javascript:)([^"'?]+)(?:\?[^"']*)?["']/g)]
  .map(match => match[1])
  .filter(reference => reference && reference !== './');
const cachedAssets = [...readText('sw.js').matchAll(/^\s*'\.\/([^']+)'/gm)]
  .map(match => match[1])
  .filter(Boolean);
const missing = [...new Set([...htmlReferences,...cachedAssets])]
  .filter(reference => !fs.existsSync(path.join(root,reference)));

if (missing.length) {
  throw new Error(`Missing local assets:\n${missing.map(file => `- ${file}`).join('\n')}`);
}

const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map(match => match[1]);
const duplicateIds = [...new Set(ids.filter((id,index) => ids.indexOf(id) !== index))];
if (duplicateIds.length) throw new Error(`Duplicate HTML ids: ${duplicateIds.join(', ')}`);

console.log(`Validated ${javascriptFiles.length + 1} scripts, ${jsonFiles.length} JSON files, ${htmlReferences.length} HTML paths, and ${cachedAssets.length} cached assets.`);
