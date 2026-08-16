import fs from 'node:fs';

const [inputPath,outputPath,sourceUrl,propertyList='',simplifyFlag='false'] = process.argv.slice(2);
if (!inputPath || !outputPath || !sourceUrl) throw new Error('Input, output, and source URL are required');

const source = JSON.parse(fs.readFileSync(inputPath,'utf8').replace(/^\uFEFF/,''));
if (source?.type !== 'FeatureCollection' || !Array.isArray(source.features)) throw new Error('Invalid WFS GeoJSON response');
const propertiesToKeep = propertyList.split(',').filter(Boolean);
const simplifyLines = simplifyFlag === 'true';
const point = coordinates => coordinates.slice(0,2).map(value => Math.round(Number(value)*1e5)/1e5);
const roundCoordinates = coordinates => Array.isArray(coordinates?.[0])
  ? coordinates.map(roundCoordinates)
  : point(coordinates);
const simplifyLine = coordinates => {
  if (!simplifyLines || coordinates.length <= 2) return coordinates.map(point);
  const simplified = coordinates.filter((_,index) => index % 2 === 0).map(point);
  if ((coordinates.length-1)%2 !== 0) simplified.push(point(coordinates.at(-1)));
  return simplified;
};
const geometry = value => {
  if (!value?.type || !value.coordinates) return null;
  if (value.type === 'LineString') return {type:value.type,coordinates:simplifyLine(value.coordinates)};
  if (value.type === 'MultiLineString') return {type:value.type,coordinates:value.coordinates.map(simplifyLine)};
  return {type:value.type,coordinates:roundCoordinates(value.coordinates)};
};
const features = source.features.flatMap(feature => {
  const converted = geometry(feature.geometry);
  if (!converted) return [];
  const properties = Object.fromEntries(propertiesToKeep
    .filter(name => feature.properties?.[name] != null)
    .map(name => [name,feature.properties[name]]));
  return [{type:'Feature',geometry:converted,properties}];
});
if (!features.length) throw new Error('No usable WFS features were returned');
fs.writeFileSync(outputPath,JSON.stringify({type:'FeatureCollection',source:sourceUrl,generatedAt:new Date().toISOString(),features}));
process.stdout.write(String(features.length));
