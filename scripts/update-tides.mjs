import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve('.');
const targetPath = path.join(projectRoot, 'data', 'tides.json');

// Canonical mapping from Ocean Watch station ID to official INCOIS PAT station region
// Only genuine alternate spellings / suffixes are mapped. Stations without dedicated PAT gauges use their own name.
const CANONICAL_PAT_REGIONS = {
  chenn: 'Chennai',
  coch: 'Kochi',
  kand: 'Kandla-Harbour',
  mumba: 'Mumbai-Apollo-Bandar',
  para: 'Paradip',
  porb: 'Porbandar',
  ptbl: 'Port-Blair',
  naga: 'Nagapatnam',
  newm: 'Mangalore',
  marm: 'Marmagao',
  carn: 'Car-Nicobar',
  nagc: 'Nancowry-Harbour',
  rames: 'Pamban-Pass',
  gard: 'Kolkata-Kidderpore-docks',
  kava: 'Kavaratti-Laccadive-Is',
  mini: 'Minicoy',
  vish: 'Visakhapatnam',
  dham: 'Dhamra',
  gopa: 'Gopalpur',
  jaig: 'Jaigarh',
  kaki: 'Kakinada',
  karw: 'Karwar',
  koll: 'Kollam',
  okha: 'Okha',
  pudu: 'Puducherry',
  tuti: 'Tuticorin',
  beyp: 'Beypore'
};

const STATION_PAT_MAPPING = {
  adan: { name: 'Adani', region: CANONICAL_PAT_REGIONS.adan || 'Adani' },
  aeri: { name: 'Aerialbay', region: CANONICAL_PAT_REGIONS.aeri || 'Aerialbay' },
  agatt: { name: 'Agatti', region: CANONICAL_PAT_REGIONS.agatt || 'Agatti' },
  astra: { name: 'Astranga', region: CANONICAL_PAT_REGIONS.astra || 'Astranga' },
  bahab: { name: 'Bahabalpur', region: CANONICAL_PAT_REGIONS.bahab || 'Bahabalpur' },
  beyp: { name: 'Beypore', region: CANONICAL_PAT_REGIONS.beyp || 'Beypore' },
  camp: { name: 'Campbellbay', region: CANONICAL_PAT_REGIONS.camp || 'Campbellbay' },
  carn: { name: 'Carnicobar', region: CANONICAL_PAT_REGIONS.carn || 'Carnicobar' },
  chenn: { name: 'Chennai', region: CANONICAL_PAT_REGIONS.chenn || 'Chennai' },
  chetl: { name: 'Chetlat', region: CANONICAL_PAT_REGIONS.chetl || 'Chetlat' },
  coch: { name: 'Cochin', region: CANONICAL_PAT_REGIONS.coch || 'Cochin' },
  daman: { name: 'Daman', region: CANONICAL_PAT_REGIONS.daman || 'Daman' },
  dham: { name: 'Dhamra', region: CANONICAL_PAT_REGIONS.dham || 'Dhamra' },
  dosin: { name: 'Dosinga', region: CANONICAL_PAT_REGIONS.dosin || 'Dosinga' },
  enno: { name: 'Ennore', region: CANONICAL_PAT_REGIONS.enno || 'Ennore' },
  gard: { name: 'Gardenreach', region: CANONICAL_PAT_REGIONS.gard || 'Gardenreach' },
  gopa: { name: 'Gopalpur', region: CANONICAL_PAT_REGIONS.gopa || 'Gopalpur' },
  hutb: { name: 'Hutbay', region: CANONICAL_PAT_REGIONS.hutb || 'Hutbay' },
  jaig: { name: 'Jaigarh', region: CANONICAL_PAT_REGIONS.jaig || 'Jaigarh' },
  jakh: { name: 'Jakhau', region: CANONICAL_PAT_REGIONS.jakh || 'Jakhau' },
  jnpt: { name: 'Jnpt', region: CANONICAL_PAT_REGIONS.jnpt || 'Jnpt' },
  kaki: { name: 'Kakinada', region: CANONICAL_PAT_REGIONS.kaki || 'Kakinada' },
  kalpe: { name: 'Kalpeni', region: CANONICAL_PAT_REGIONS.kalpe || 'Kalpeni' },
  kand: { name: 'Kandla', region: CANONICAL_PAT_REGIONS.kand || 'Kandla' },
  kanya: { name: 'Kanyakumari', region: CANONICAL_PAT_REGIONS.kanya || 'Kanyakumari' },
  karw: { name: 'Karwar', region: CANONICAL_PAT_REGIONS.karw || 'Karwar' },
  kava: { name: 'Kavaratti', region: CANONICAL_PAT_REGIONS.kava || 'Kavaratti' },
  koll: { name: 'Kollam', region: CANONICAL_PAT_REGIONS.koll || 'Kollam' },
  kris: { name: 'Krishnapatnam', region: CANONICAL_PAT_REGIONS.kris || 'Krishnapatnam' },
  mach: { name: 'Machilipatnam', region: CANONICAL_PAT_REGIONS.mach || 'Machilipatnam' },
  marm: { name: 'Marmagoa', region: CANONICAL_PAT_REGIONS.marm || 'Marmagoa' },
  mayab: { name: 'Mayabunder', region: CANONICAL_PAT_REGIONS.mayab || 'Mayabunder' },
  mini: { name: 'Minicoy', region: CANONICAL_PAT_REGIONS.mini || 'Minicoy' },
  mumba: { name: 'Mumbai', region: CANONICAL_PAT_REGIONS.mumba || 'Mumbai' },
  murud: { name: 'Murud', region: CANONICAL_PAT_REGIONS.murud || 'Murud' },
  naga: { name: 'Nagapattinam', region: CANONICAL_PAT_REGIONS.naga || 'Nagapattinam' },
  nagc: { name: 'Nancowry', region: CANONICAL_PAT_REGIONS.nagc || 'Nancowry' },
  newm: { name: 'Newmangalore', region: CANONICAL_PAT_REGIONS.newm || 'Newmangalore' },
  okha: { name: 'Okha', region: CANONICAL_PAT_REGIONS.okha || 'Okha' },
  panaj: { name: 'Panaji', region: CANONICAL_PAT_REGIONS.panaj || 'Panaji' },
  para: { name: 'Paradeep', region: CANONICAL_PAT_REGIONS.para || 'Paradeep' },
  porb: { name: 'Porbander', region: CANONICAL_PAT_REGIONS.porb || 'Porbander' },
  ptbl: { name: 'Portblair', region: CANONICAL_PAT_REGIONS.ptbl || 'Portblair' },
  pudu: { name: 'Puducherry', region: CANONICAL_PAT_REGIONS.pudu || 'Puducherry' },
  ramaya: { name: 'Ramayapatnam', region: CANONICAL_PAT_REGIONS.ramaya || 'Ramayapatnam' },
  rames: { name: 'Rameshwaram', region: CANONICAL_PAT_REGIONS.rames || 'Rameshwaram' },
  rang: { name: 'Rangatbay', region: CANONICAL_PAT_REGIONS.rang || 'Rangatbay' },
  tuti: { name: 'Tuticorin', region: CANONICAL_PAT_REGIONS.tuti || 'Tuticorin' },
  verav: { name: 'Veraval', region: CANONICAL_PAT_REGIONS.verav || 'Veraval' },
  vish: { name: 'Visakhapatnam', region: CANONICAL_PAT_REGIONS.vish || 'Visakhapatnam' }
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
  if (!timeStr || timeStr === '-' || timeStr === '--' || timeStr.startsWith('---')) return null;
  const match = timeStr.match(/^(\d{2})-(\d{2})-(\d{4})\s+(\d{2}):(\d{2})$/);
  if (!match) return null;
  const [, d, m, y, h, min] = match;
  return `${y}-${m}-${d}T${h}:${min}:00+05:30`;
}

// Fetch and parse 24-hour data of current date for a given PAT region
// Note: Omitting fromDate and toDate query params is required because INCOIS PAT JSP
// fails to render evening high/low tide table rows when date query params are supplied.
async function fetchPatRegion(region, fromDate, toDate) {
  const url = `https://incois.gov.in/oceanservices/PAT/tidegraphphases.jsp?region=${encodeURIComponent(region)}`;
  const html = await fetchWithRetry(url);

  // 1. Parse Highcharts hourly series for the 24-hour period (00:00 to 24:00)
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
          const iso = `${y}-${m}-${day}T${h}:${min}:00+05:30`;

          // Keep strictly within current 24-hour date window [00:00, 24:00]
          if (iso.startsWith(fromDate) || iso === `${toDate}T00:00:00+05:30`) {
            series.push({
              time: iso,
              height: Number(val.toFixed(2))
            });
          }
        }
      }
    } catch (err) {
      console.warn(`[PAT] Warning: failed to parse series JSON for ${region}:`, err.message);
    }
  }

  // 2. Parse High/Low tide phases table strictly for current date
  const events = [];
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  // Row 0 and Row 1 are table headers
  for (let i = 2; i < rows.length; i++) {
    const cells = [...rows[i][1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    if (cells.length >= 4) {
      const [highTimeStr, highHeightStr, lowTimeStr, lowHeightStr] = cells;

      const highIso = parsePatTime(highTimeStr);
      const highH = parseFloat(highHeightStr);
      if (highIso && highIso.startsWith(fromDate) && !isNaN(highH)) {
        events.push({
          type: 'High',
          time: highIso,
          height: Number(highH.toFixed(2))
        });
      }

      const lowIso = parsePatTime(lowTimeStr);
      const lowH = parseFloat(lowHeightStr);
      if (lowIso && lowIso.startsWith(fromDate) && !isNaN(lowH)) {
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
  const now = new Date();
  const todayStr = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  const nextDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextStr = nextDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

  console.log(`[PAT] Ingesting 24-hour PAT data for current date: ${todayStr} (to ${nextStr})...`);

  // Read existing tides.json if available to retain cached state if offline
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
        const data = await fetchPatRegion(region, todayStr, nextStr);
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

  // Build lightweight stations dictionary
  const nowIso = new Date().toISOString();
  const stationsOutput = {};

  for (const [id, info] of stationEntries) {
    const existing = existingData?.stations?.[id] || {};
    const patData = regionCache.get(info.region);

    const hasNewData = Boolean(patData && (patData.events.length > 0 || patData.series.length > 0));
    const existingMatchesRegion = existing?.patRegion === info.region;
    const events = hasNewData ? patData.events : (existingMatchesRegion ? (existing.events || []) : []);
    const series = hasNewData ? patData.series : (existingMatchesRegion ? (existing.series || []) : []);

    stationsOutput[id] = {
      id,
      name: info.name,
      patRegion: info.region,
      date: todayStr,
      hasData: events.length > 0 || series.length > 0,
      events,
      series,
      updatedAt: hasNewData ? nowIso : (existingMatchesRegion ? (existing.updatedAt || nowIso) : nowIso)
    };
  }

  // Check if events, series, or date have actually changed compared to existingData
  let tidesChanged = false;
  if (!existingData || !existingData.stations || existingData.date !== todayStr) {
    tidesChanged = true;
  } else {
    for (const [id, st] of Object.entries(stationsOutput)) {
      const ex = existingData.stations[id];
      if (!ex) { tidesChanged = true; break; }
      const newEvt = JSON.stringify(st.events || []);
      const exEvt = JSON.stringify(ex.events || []);
      const newSer = JSON.stringify(st.series || []);
      const exSer = JSON.stringify(ex.series || []);
      if (newEvt !== exEvt || newSer !== exSer) {
        tidesChanged = true;
        break;
      }
    }
  }

  if (!tidesChanged && fs.existsSync(targetPath)) {
    console.log(`[PAT] No tide prediction changes detected for ${todayStr}; skipping write.`);
    return;
  }

  const outputPayload = {
    updatedAt: nowIso,
    date: todayStr,
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
