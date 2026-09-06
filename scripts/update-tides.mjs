import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve('.');
const targetPath = path.join(projectRoot, 'data', 'tides.json');

// Exact mapping from Ocean Watch station ID / name to official INCOIS PAT region
const STATION_PAT_MAPPING = {
  adan: { name: 'Adani', region: 'Hazira-2nd' },
  aeri: { name: 'Aerialbay', region: 'Port-Cornwallis' },
  agatt: { name: 'Agatti', region: 'Kavaratti-Laccadive-Is' },
  astra: { name: 'Astranga', region: 'Devi-River-Entrance' },
  bahab: { name: 'Bahabalpur', region: 'Dhamra' },
  beyp: { name: 'Beypore', region: 'Beypore' },
  camp: { name: 'Campbellbay', region: 'South-Galatea-Bay' },
  carn: { name: 'Carnicobar', region: 'Car-Nicobar' },
  chenn: { name: 'Chennai', region: 'Chennai' },
  chetl: { name: 'Chetlat', region: 'Kavaratti-Laccadive-Is' },
  coch: { name: 'Cochin', region: 'Kochi' },
  daman: { name: 'Daman', region: 'Bulsar' },
  dham: { name: 'Dhamra', region: 'Dhamra' },
  dosin: { name: 'Dosinga', region: 'Dhamra' },
  enno: { name: 'Ennore', region: 'Chennai' },
  gard: { name: 'Gardenreach', region: 'Kolkata-Kidderpore-docks' },
  gopa: { name: 'Gopalpur', region: 'Gopalpur' },
  hutb: { name: 'Hutbay', region: 'The-Sisters' },
  jaig: { name: 'Jaigarh', region: 'Jaigarh' },
  jakh: { name: 'Jakhau', region: 'Godia-Creek' },
  jnpt: { name: 'Jnpt', region: 'Mumbai-Apollo-Bandar' },
  kaki: { name: 'Kakinada', region: 'Kakinada' },
  kalpe: { name: 'Kalpeni', region: 'Kavaratti-Laccadive-Is' },
  kand: { name: 'Kandla', region: 'Kandla-Harbour' },
  kanya: { name: 'Kanyakumari', region: 'Muttam' },
  karw: { name: 'Karwar', region: 'Karwar' },
  kava: { name: 'Kavaratti', region: 'Kavaratti-Laccadive-Is' },
  koll: { name: 'Kollam', region: 'Kollam' },
  kris: { name: 'Krishnapatnam', region: 'Chennai' },
  mach: { name: 'Machilipatnam', region: 'Surya-Lanka' },
  marm: { name: 'Marmagoa', region: 'Marmagao' },
  mayab: { name: 'Mayabunder', region: 'Stewart-Sound' },
  mini: { name: 'Minicoy', region: 'Minicoy' },
  mumba: { name: 'Mumbai', region: 'Mumbai-Apollo-Bandar' },
  murud: { name: 'Murud', region: 'Janjira-Dangri-Bandar' },
  naga: { name: 'Nagapattinam', region: 'Nagapatnam' },
  nagc: { name: 'Nancowry', region: 'Nancowry-Harbour' },
  newm: { name: 'Newmangalore', region: 'Mangalore' },
  okha: { name: 'Okha', region: 'Okha' },
  panaj: { name: 'Panaji', region: 'Marmagao' },
  para: { name: 'Paradeep', region: 'Paradip' },
  porb: { name: 'Porbander', region: 'Porbandar' },
  ptbl: { name: 'Portblair', region: 'Port-Blair' },
  pudu: { name: 'Puducherry', region: 'Puducherry' },
  ramaya: { name: 'Ramayapatnam', region: 'Surya-Lanka' },
  rames: { name: 'Rameshwaram', region: 'Pamban-Pass' },
  rang: { name: 'Rangatbay', region: 'Long-Island' },
  tuti: { name: 'Tuticorin', region: 'Tuticorin' },
  verav: { name: 'Veraval', region: 'Kotra' },
  vish: { name: 'Visakhapatnam', region: 'Visakhapatnam' }
};

// Fetch with retry and timeout
async function fetchWithRetry(url, retries = 3, timeoutMs = 15000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) OceanWatch/1.0',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`HTTP status ${res.status}`);
      return await res.text();
    } catch (err) {
      clearTimeout(timeout);
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
}

// Convert DD-MM-YYYY HH:mm to ISO string with +05:30 offset
function parsePatTime(timeStr) {
  if (!timeStr || timeStr === '-' || timeStr === '--') return null;
  const match = timeStr.match(/^(\d{2})-(\d{2})-(\d{4})\s+(\d{2}):(\d{2})$/);
  if (!match) return null;
  const [, d, m, y, h, min] = match;
  return `${y}-${m}-${d}T${h}:${min}:00+05:30`;
}

// Fetch and parse data for a given PAT region
async function fetchPatRegion(region) {
  const url = `https://incois.gov.in/oceanservices/PAT/tidegraphphases.jsp?region=${encodeURIComponent(region)}`;
  const html = await fetchWithRetry(url);

  // 1. Parse Highcharts hourly series
  const series = [];
  const seriesMatch = html.match(/name:\s*['"]Predicted Tide['"][\s\S]*?data:\s*(\[\[[\s\S]*?\]\])/);
  if (seriesMatch) {
    try {
      const rawData = JSON.parse(seriesMatch[1]);
      for (const [ts, val] of rawData) {
        if (typeof ts === 'number' && typeof val === 'number') {
          // Highcharts timestamp in PAT is fake-UTC representing IST
          const d = new Date(ts);
          const y = d.getUTCFullYear();
          const m = String(d.getUTCMonth() + 1).padStart(2, '0');
          const day = String(d.getUTCDate()).padStart(2, '0');
          const h = String(d.getUTCHours()).padStart(2, '0');
          const min = String(d.getUTCMinutes()).padStart(2, '0');
          series.push({
            time: `${y}-${m}-${day}T${h}:${min}:00+05:30`,
            height: Number(val.toFixed(2))
          });
        }
      }
    } catch (err) {
      console.warn(`[PAT] Warning: failed to parse series JSON for ${region}:`, err.message);
    }
  }

  // 2. Parse High/Low tide phases table
  const events = [];
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  // Row 0 and Row 1 are table headers
  for (let i = 2; i < rows.length; i++) {
    const cells = [...rows[i][1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    if (cells.length >= 4) {
      const [highTimeStr, highHeightStr, lowTimeStr, lowHeightStr] = cells;

      const highIso = parsePatTime(highTimeStr);
      const highH = parseFloat(highHeightStr);
      if (highIso && !isNaN(highH)) {
        events.push({
          type: 'High',
          time: highIso,
          height: Number(highH.toFixed(2))
        });
      }

      const lowIso = parsePatTime(lowTimeStr);
      const lowH = parseFloat(lowHeightStr);
      if (lowIso && !isNaN(lowH)) {
        events.push({
          type: 'Low',
          time: lowIso,
          height: Number(lowH.toFixed(2))
        });
      }
    }
  }

  // Sort events chronologically
  events.sort((a, b) => new Date(a.time) - new Date(b.time));

  return { events, series };
}

async function main() {
  console.log('[PAT] Starting INCOIS Predicted & Actual Tide (PAT) ingestion...');

  // Read existing tides.json if available to retain metadata
  let existingData = { totalStations: 50, stations: {} };
  if (fs.existsSync(targetPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    } catch {
      // ignore
    }
  }

  // Extract unique PAT regions to fetch
  const stationEntries = Object.entries(STATION_PAT_MAPPING);
  const uniqueRegions = [...new Set(stationEntries.map(([, info]) => info.region))];
  console.log(`[PAT] Discovered ${uniqueRegions.length} unique PAT regions for ${stationEntries.length} coastal stations.`);

  const regionCache = new Map();
  const queue = [...uniqueRegions];
  const concurrency = 5;
  let successCount = 0;
  let failCount = 0;

  async function worker() {
    while (queue.length > 0) {
      const region = queue.shift();
      try {
        const data = await fetchPatRegion(region);
        regionCache.set(region, data);
        successCount++;
        console.log(`[PAT] ✓ ${region}: ${data.events.length} events, ${data.series.length} series points`);
      } catch (err) {
        failCount++;
        console.error(`[PAT] ✗ ${region} failed:`, err.message);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  console.log(`[PAT] Fetch phase complete: ${successCount} succeeded, ${failCount} failed.`);

  // Build the stations dictionary
  const nowIso = new Date().toISOString();
  const stationsOutput = {};

  for (const [id, info] of stationEntries) {
    const existing = existingData?.stations?.[id] || {};
    const patData = regionCache.get(info.region);

    const hasNewData = Boolean(patData && (patData.events.length > 0 || patData.series.length > 0));
    const events = hasNewData ? patData.events : (existing.events || []);
    const series = hasNewData ? patData.series : (existing.series || []);

    stationsOutput[id] = {
      id,
      name: info.name,
      patRegion: info.region,
      lat: existing.lat ?? null,
      lng: existing.lng ?? null,
      state: existing.state ?? null,
      district: existing.district ?? null,
      range: existing.range ?? null,
      baseWind: existing.baseWind ?? null,
      windDir: existing.windDir ?? null,
      hasData: events.length > 0 || series.length > 0,
      events,
      series,
      updatedAt: hasNewData ? nowIso : (existing.updatedAt || nowIso)
    };
  }

  const outputPayload = {
    updatedAt: nowIso,
    source: 'INCOIS Predicted & Actual Tide (PAT) / Survey of India',
    sourceUrl: 'https://incois.gov.in/oceanservices/PAT/index.html',
    totalStations: stationEntries.length,
    stations: stationsOutput
  };

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, JSON.stringify(outputPayload, null, 2), 'utf8');
  console.log(`[PAT] Saved ${stationEntries.length} stations to ${targetPath}`);
}

main().catch(err => {
  console.error('[PAT] Fatal ingestion error:', err);
  process.exit(1);
});
