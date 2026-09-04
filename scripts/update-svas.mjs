import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '..');

const svasUrl = 'https://incois.gov.in/oceanservices/SVAS/SVAS_Advisory.geojson';
const targetFile = path.join(projectRoot, 'data', 'svas-status.json');

console.log('[SVAS] Fetching live data from', svasUrl);

try {
  const res = await fetch(svasUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const geo = await res.json();
  if (!geo || !Array.isArray(geo.features)) throw new Error('Invalid GeoJSON payload');

  function parseHtmlDays(html) {
    if (!html) return [];
    const days = [];
    const lines = html.split('<br>');
    for (const line of lines) {
      const dayMatch = line.match(/(?:Day|நாள்|दिन|రోజు|ദിവസം|দিন|दिवस|દિવસ|ଦିନ|ದಿನ)[-\s]*([1-3])/i);
      if (!dayMatch) continue;
      const dateMatch = line.match(/\b(\d{2}[-/]\d{2}[-/]\d{4})\b/);
      if (!dateMatch) continue;
      const dayNum = parseInt(dayMatch[1], 10);
      const date = dateMatch[1];
      const colorMatch = line.match(/color:([^;'"]+)/i);
      const color = colorMatch ? colorMatch[1].trim().toLowerCase() : '';
      const plainText = line.replace(/<[^>]+>/g, '').replace(/&emsp;/g, ' ').replace(/\s+/g, ' ').trim();
      const isSafe = color === 'green' || plainText.toLowerCase().includes('safely sail');
      const distMatch = plainText.match(/\((\d+-\d+)\)\s*(?:km)?/i);
      const distance = distMatch ? distMatch[1] + ' km' : null;
      days.push({ day: dayNum, date: date, status: isSafe ? 'safe' : 'alert', distance: distance });
    }
    return days;
  }

  let issueDate = null;
  const datesSet = new Set();
  const districts = {};

  for (const f of geo.features) {
    const p = f.properties;
    const name = p.name ? p.name.trim() : null;
    if (!name) continue;

    if (!issueDate && p.ENG4) {
      const m = p.ENG4.match(/Date of issue:\s*([^\s<]+)/i);
      if (m) issueDate = m[1].trim();
    }

    const b4 = parseHtmlDays(p.ENG4);
    const b6 = parseHtmlDays(p.ENG6);
    const b7 = parseHtmlDays(p.ENG7);
    b4.forEach(d => datesSet.add(d.date));

    let featLat = null;
    let featLon = null;
    if (f.geometry && f.geometry.coordinates) {
      let sumLat = 0, sumLon = 0, count = 0;
      const walkCoords = function (coords) {
        if (typeof coords[0] === 'number') {
          sumLon += coords[0]; sumLat += coords[1]; count++;
        } else if (Array.isArray(coords)) {
          coords.forEach(walkCoords);
        }
      };
      walkCoords(f.geometry.coordinates);
      if (count > 0) {
        featLat = parseFloat((sumLat / count).toFixed(4));
        featLon = parseFloat((sumLon / count).toFixed(4));
      }
    }

    districts[name] = {
      name: name,
      state: p.state ? p.state.trim() : '',
      lat: featLat,
      lon: featLon,
      overall: {
        b4: p.Color4 === 'green' ? 'safe' : 'alert',
        b6: p.Color6 === 'green' ? 'safe' : 'alert',
        b7: p.Color7 === 'green' ? 'safe' : 'alert'
      },
      matrix: { b4: b4, b6: b6, b7: b7 }
    };
  }

  const dates = Array.from(datesSet);
  const output = {
    issueDate: issueDate,
    updatedAt: new Date().toISOString(),
    dates: dates,
    districts: districts
  };

  fs.writeFileSync(targetFile, JSON.stringify(output, null, 2), 'utf8');
  console.log(`[SVAS] Successfully updated ${targetFile} (Issue: ${issueDate}, Dates: ${dates.join(', ')}, ${Object.keys(districts).length} districts)`);
} catch (err) {
  console.error('[SVAS] Error updating SVAS data:', err.message);
  process.exitCode = 1;
}
