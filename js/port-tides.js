// National Tide Gauge Stations dataset with geographical coordinates and coastal district mappings
// Sourced from INCOIS National Tide Gauge Network & INCOIS PAT (https://incois.gov.in/oceanservices/PAT/index.html)
var NATIONAL_TIDE_STATIONS = [
  {
    "id": "adan",
    "name": "Adani",
    "lat": 21.1,
    "lng": 72.616,
    "state": "Gujarat",
    "district": "Surat / Hazira",
    "range": 5.8,
    "baseWind": 16,
    "windDir": "SW"
  },
  {
    "id": "aeri",
    "name": "Aerialbay",
    "lat": 13.2833,
    "lng": 93.0333,
    "state": "Andaman & Nicobar",
    "district": "North & Middle Andaman",
    "range": 2.1,
    "baseWind": 17,
    "windDir": "WSW"
  },
  {
    "id": "agatt",
    "name": "Agatti",
    "lat": 10.8184,
    "lng": 72.1726,
    "state": "Lakshadweep",
    "district": "Agatti Island",
    "range": 1.4,
    "baseWind": 15,
    "windDir": "WNW"
  },
  {
    "id": "astra",
    "name": "Astranga",
    "lat": 19.9743,
    "lng": 86.339,
    "state": "Odisha",
    "district": "Puri",
    "range": 2.6,
    "baseWind": 16,
    "windDir": "SSW"
  },
  {
    "id": "bahab",
    "name": "Bahabalpur",
    "lat": 20.793,
    "lng": 86.9006,
    "state": "Odisha",
    "district": "Baleswar",
    "range": 3.4,
    "baseWind": 15,
    "windDir": "S"
  },
  {
    "id": "beyp",
    "name": "Beypore",
    "lat": 11.171,
    "lng": 75.808,
    "state": "Kerala",
    "district": "Kozhikode",
    "range": 1.3,
    "baseWind": 12,
    "windDir": "W"
  },
  {
    "id": "camp",
    "name": "Campbellbay",
    "lat": 7,
    "lng": 93.9333,
    "state": "Andaman & Nicobar",
    "district": "Nicobar",
    "range": 1.8,
    "baseWind": 18,
    "windDir": "SW"
  },
  {
    "id": "carn",
    "name": "Carnicobar",
    "lat": 9.2344,
    "lng": 92.7769,
    "state": "Andaman & Nicobar",
    "district": "Nicobar",
    "range": 2,
    "baseWind": 18,
    "windDir": "WSW"
  },
  {
    "id": "chenn",
    "name": "Chennai",
    "lat": 13.1,
    "lng": 80.3,
    "state": "Tamil Nadu",
    "district": "Chennai",
    "range": 1.4,
    "baseWind": 14,
    "windDir": "S"
  },
  {
    "id": "chetl",
    "name": "Chetlat",
    "lat": 11.6939,
    "lng": 72.717,
    "state": "Lakshadweep",
    "district": "Chetlat Island",
    "range": 1.4,
    "baseWind": 15,
    "windDir": "WNW"
  },
  {
    "id": "coch",
    "name": "Cochin",
    "lat": 9.9667,
    "lng": 76.2667,
    "state": "Kerala",
    "district": "Ernakulam",
    "range": 1.1,
    "baseWind": 13,
    "windDir": "W"
  },
  {
    "id": "daman",
    "name": "Daman",
    "lat": 20.4111,
    "lng": 72.834,
    "state": "Daman & Diu",
    "district": "Daman",
    "range": 4.6,
    "baseWind": 14,
    "windDir": "WSW"
  },
  {
    "id": "dham",
    "name": "Dhamra",
    "lat": 20.7851,
    "lng": 86.9556,
    "state": "Odisha",
    "district": "Bhadrak",
    "range": 3.6,
    "baseWind": 15,
    "windDir": "SSW"
  },
  {
    "id": "dosin",
    "name": "Dosinga",
    "lat": 20.8174,
    "lng": 86.9681,
    "state": "Odisha",
    "district": "Bhadrak",
    "range": 3.6,
    "baseWind": 15,
    "windDir": "SSW"
  },
  {
    "id": "enno",
    "name": "Ennore",
    "lat": 13.25,
    "lng": 80.3333,
    "state": "Tamil Nadu",
    "district": "Tiruvallur",
    "range": 1.4,
    "baseWind": 14,
    "windDir": "SSE"
  },
  {
    "id": "gard",
    "name": "Gardenreach",
    "lat": 22.55,
    "lng": 88.3,
    "state": "West Bengal",
    "district": "Kolkata",
    "range": 4.8,
    "baseWind": 12,
    "windDir": "S"
  },
  {
    "id": "gopa",
    "name": "Gopalpur",
    "lat": 19.2889,
    "lng": 84.9483,
    "state": "Odisha",
    "district": "Ganjam",
    "range": 2.4,
    "baseWind": 15,
    "windDir": "S"
  },
  {
    "id": "hutb",
    "name": "Hutbay",
    "lat": 10.5914,
    "lng": 92.5625,
    "state": "Andaman & Nicobar",
    "district": "South Andaman",
    "range": 2.1,
    "baseWind": 17,
    "windDir": "WSW"
  },
  {
    "id": "jaig",
    "name": "Jaigarh",
    "lat": 17.281,
    "lng": 73.208,
    "state": "Maharashtra",
    "district": "Ratnagiri",
    "range": 2.8,
    "baseWind": 13,
    "windDir": "NW"
  },
  {
    "id": "jakh",
    "name": "Jakhau",
    "lat": 23.243,
    "lng": 68.606,
    "state": "Gujarat",
    "district": "Kachchh",
    "range": 4.5,
    "baseWind": 20,
    "windDir": "WSW"
  },
  {
    "id": "jnpt",
    "name": "Jnpt",
    "lat": 18.9167,
    "lng": 72.75,
    "state": "Maharashtra",
    "district": "Raigad",
    "range": 4.8,
    "baseWind": 14,
    "windDir": "WNW"
  },
  {
    "id": "kaki",
    "name": "Kakinada",
    "lat": 16.9333,
    "lng": 82.25,
    "state": "Andhra Pradesh",
    "district": "Kakinada",
    "range": 1.6,
    "baseWind": 13,
    "windDir": "SE"
  },
  {
    "id": "kalpe",
    "name": "Kalpeni",
    "lat": 10.0884,
    "lng": 73.6467,
    "state": "Lakshadweep",
    "district": "Kalpeni Island",
    "range": 1.3,
    "baseWind": 14,
    "windDir": "W"
  },
  {
    "id": "kand",
    "name": "Kandla",
    "lat": 23.017,
    "lng": 70.217,
    "state": "Gujarat",
    "district": "Kachchh",
    "range": 6.4,
    "baseWind": 18,
    "windDir": "WSW"
  },
  {
    "id": "kanya",
    "name": "Kanyakumari",
    "lat": 8.0952,
    "lng": 77.5645,
    "state": "Tamil Nadu",
    "district": "Kanniyakumari",
    "range": 1,
    "baseWind": 22,
    "windDir": "WSW"
  },
  {
    "id": "karw",
    "name": "Karwar",
    "lat": 14.8,
    "lng": 74.1167,
    "state": "Karnataka",
    "district": "Uttara Kannada",
    "range": 2.1,
    "baseWind": 10,
    "windDir": "W"
  },
  {
    "id": "kava",
    "name": "Kavaratti",
    "lat": 10.5667,
    "lng": 72.6333,
    "state": "Lakshadweep",
    "district": "Kavaratti Island",
    "range": 1.4,
    "baseWind": 15,
    "windDir": "WNW"
  },
  {
    "id": "koll",
    "name": "Kollam",
    "lat": 8.864,
    "lng": 76.603,
    "state": "Kerala",
    "district": "Kollam",
    "range": 1,
    "baseWind": 14,
    "windDir": "WSW"
  },
  {
    "id": "kris",
    "name": "Krishnapatnam",
    "lat": 14.25,
    "lng": 80.1333,
    "state": "Andhra Pradesh",
    "district": "SPS Nellore",
    "range": 1.3,
    "baseWind": 13,
    "windDir": "SSE"
  },
  {
    "id": "mach",
    "name": "Machilipatnam",
    "lat": 16.145,
    "lng": 81.178,
    "state": "Andhra Pradesh",
    "district": "Krishna",
    "range": 1.5,
    "baseWind": 14,
    "windDir": "SE"
  },
  {
    "id": "marm",
    "name": "Marmagoa",
    "lat": 15.409,
    "lng": 73.8,
    "state": "Goa",
    "district": "South Goa",
    "range": 2.3,
    "baseWind": 11,
    "windDir": "WNW"
  },
  {
    "id": "mayab",
    "name": "Mayabunder",
    "lat": 12.9265,
    "lng": 92.8975,
    "state": "Andaman & Nicobar",
    "district": "North & Middle Andaman",
    "range": 2.2,
    "baseWind": 16,
    "windDir": "WSW"
  },
  {
    "id": "mini",
    "name": "Minicoy",
    "lat": 8.2833,
    "lng": 73.05,
    "state": "Lakshadweep",
    "district": "Minicoy Island",
    "range": 1.2,
    "baseWind": 16,
    "windDir": "WSW"
  },
  {
    "id": "mumba",
    "name": "Mumbai",
    "lat": 18.9415,
    "lng": 72.8527,
    "state": "Maharashtra",
    "district": "Mumbai City",
    "range": 4.8,
    "baseWind": 14,
    "windDir": "WNW"
  },
  {
    "id": "murud",
    "name": "Murud",
    "lat": 18.2837,
    "lng": 72.9823,
    "state": "Maharashtra",
    "district": "Raigad",
    "range": 4.2,
    "baseWind": 13,
    "windDir": "NW"
  },
  {
    "id": "naga",
    "name": "Nagapattinam",
    "lat": 10.7667,
    "lng": 79.85,
    "state": "Tamil Nadu",
    "district": "Nagapattinam",
    "range": 0.9,
    "baseWind": 15,
    "windDir": "SSW"
  },
  {
    "id": "nagc",
    "name": "Nancowry",
    "lat": 8.05,
    "lng": 93.55,
    "state": "Andaman & Nicobar",
    "district": "Nicobar",
    "range": 1.9,
    "baseWind": 18,
    "windDir": "SW"
  },
  {
    "id": "newm",
    "name": "Newmangalore",
    "lat": 12.9167,
    "lng": 74.8,
    "state": "Karnataka",
    "district": "Dakshina Kannada",
    "range": 1.6,
    "baseWind": 12,
    "windDir": "W"
  },
  {
    "id": "okha",
    "name": "Okha",
    "lat": 22.4667,
    "lng": 69.0833,
    "state": "Gujarat",
    "district": "Devbhumi Dwarka",
    "range": 4.2,
    "baseWind": 20,
    "windDir": "SW"
  },
  {
    "id": "panaj",
    "name": "Panaji",
    "lat": 15.5016,
    "lng": 73.8282,
    "state": "Goa",
    "district": "North Goa",
    "range": 2.3,
    "baseWind": 11,
    "windDir": "WNW"
  },
  {
    "id": "para",
    "name": "Paradeep",
    "lat": 20.2667,
    "lng": 86.7,
    "state": "Odisha",
    "district": "Jagatsinghpur",
    "range": 2.9,
    "baseWind": 16,
    "windDir": "SW"
  },
  {
    "id": "porb",
    "name": "Porbander",
    "lat": 21.6333,
    "lng": 69.6167,
    "state": "Gujarat",
    "district": "Porbandar",
    "range": 3.2,
    "baseWind": 18,
    "windDir": "SW"
  },
  {
    "id": "ptbl",
    "name": "Portblair",
    "lat": 11.6833,
    "lng": 92.7667,
    "state": "Andaman & Nicobar",
    "district": "South Andaman",
    "range": 2.2,
    "baseWind": 17,
    "windDir": "WSW"
  },
  {
    "id": "pudu",
    "name": "Puducherry",
    "lat": 11.93,
    "lng": 79.835,
    "state": "Puducherry",
    "district": "Puducherry",
    "range": 1.3,
    "baseWind": 14,
    "windDir": "S"
  },
  {
    "id": "ramaya",
    "name": "Ramayapatnam",
    "lat": 15.0158,
    "lng": 80.0603,
    "state": "Andhra Pradesh",
    "district": "Prakasam",
    "range": 1.4,
    "baseWind": 13,
    "windDir": "SSE"
  },
  {
    "id": "rames",
    "name": "Rameshwaram",
    "lat": 9.2578,
    "lng": 79.2257,
    "state": "Tamil Nadu",
    "district": "Ramanathapuram",
    "range": 0.8,
    "baseWind": 20,
    "windDir": "SW"
  },
  {
    "id": "rang",
    "name": "Rangatbay",
    "lat": 12.4889,
    "lng": 92.9569,
    "state": "Andaman & Nicobar",
    "district": "North & Middle Andaman",
    "range": 2.2,
    "baseWind": 16,
    "windDir": "WSW"
  },
  {
    "id": "tuti",
    "name": "Tuticorin",
    "lat": 8.75,
    "lng": 78.2,
    "state": "Tamil Nadu",
    "district": "Thoothukkudi",
    "range": 1.2,
    "baseWind": 19,
    "windDir": "SW"
  },
  {
    "id": "verav",
    "name": "Veraval",
    "lat": 20.912,
    "lng": 70.408,
    "state": "Gujarat",
    "district": "Gir Somnath",
    "range": 2.8,
    "baseWind": 16,
    "windDir": "SW"
  },
  {
    "id": "vish",
    "name": "Visakhapatnam",
    "lat": 17.6833,
    "lng": 83.2833,
    "state": "Andhra Pradesh",
    "district": "Visakhapatnam",
    "range": 1.8,
    "baseWind": 14,
    "windDir": "SSW"
  }
];
var MAJOR_COASTAL_PORTS = NATIONAL_TIDE_STATIONS;

var selectedPortId = 'chenn';
var userLocationData = null;

// Calculate Haversine distance in kilometers
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getNearestPort(lat, lng) {
  return getNearestTideStation(lat, lng);
}

function getNearestTideStation(lat, lng) {
  let nearest = NATIONAL_TIDE_STATIONS[0];
  let minDistance = Number.POSITIVE_INFINITY;

  for (const st of NATIONAL_TIDE_STATIONS) {
    const dist = calculateHaversineDistance(lat, lng, st.lat, st.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = st;
    }
  }
  return { port: nearest, distanceKm: Math.round(minDistance) };
}

function isTsunamiThreatActive(tsunami) {
  if (!tsunami) return false;
  const msg = String(tsunami.message || '').trim().toLowerCase();
  const bulletin = tsunami.bulletin || tsunami.recentBulletin;
  const state = String(bulletin?.state || '').trim().toLowerCase();
  
  if (state === 'safe' || msg.includes('does not exist') || msg.includes('no tsunami threat')) {
    return false;
  }
  if (['warning', 'alert', 'watch', 'threat'].includes(state)) {
    return true;
  }
  if (msg.includes('threat exists') || msg.includes('tsunami warning') || msg.includes('tsunami alert')) {
    return true;
  }
  return false;
}

// Check active warnings for station's state/district in latestStatusData
function checkPortActiveWarnings(port) {
  if (!globalThis.latestStatusData) return { safe: true, text: 'No active advisory records available' };

  const data = globalThis.latestStatusData;
  const matches = [];

  // 1. High Wave check
  (data.highWave?.states || []).forEach(st => {
    if (st.name && st.name.toLowerCase().includes(port.state.toLowerCase())) {
      if (Number(st.counts?.warning || 0) > 0) matches.push({ hazard: 'High Wave', level: 'warning', label: 'High Wave Warning (Red)' });
      else if (Number(st.counts?.alert || 0) > 0) matches.push({ hazard: 'High Wave', level: 'alert', label: 'High Wave Alert (Orange)' });
    }
  });

  // 2. Swell Surge check
  (data.swellSurge?.states || []).forEach(st => {
    if (st.name && st.name.toLowerCase().includes(port.state.toLowerCase())) {
      if (Number(st.counts?.warning || 0) > 0) matches.push({ hazard: 'Swell Surge', level: 'warning', label: 'Swell Surge Warning (Red)' });
      else if (Number(st.counts?.alert || 0) > 0) matches.push({ hazard: 'Swell Surge', level: 'alert', label: 'Swell Surge Alert (Orange)' });
    }
  });

  // 3. Cyclone check
  if (['yellow', 'orange', 'red'].includes(data.cyclone?.level)) {
    matches.push({ hazard: 'Cyclone', level: data.cyclone.level, label: `Cyclone ${data.cyclone.level.toUpperCase()}` });
  }

  // 4. Tsunami check
  if (isTsunamiThreatActive(data.tsunami)) {
    matches.push({ hazard: 'Tsunami', level: 'warning', label: 'Tsunami Warning Active' });
  }

  if (matches.length === 0) {
    return { safe: true, level: 'safe', text: `✓ No active coastal warnings for ${port.name} (${port.district}, ${port.state})` };
  }

  const worst = matches.find(m => m.level === 'warning') || matches.find(m => m.level === 'alert') || matches[0];
  return {
    safe: false,
    level: worst.level,
    text: `⚠️ ${worst.label} active for ${port.name} (${port.state} Coast)`
  };
}

// Astronomical Lunar Phase Calculation
function getMoonPhase(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const c = Math.floor(year / 100);
  const epact = (11 * (year % 19) + Math.floor((8 * c + 13) / 25) - Math.floor(c / 4) + 11) % 30;
  const jd = (day + (month < 3 ? month + 12 : month) * 30.6 + epact) % 29.53;
  const age = (jd + 29.53) % 29.53;
  const illumination = Math.round((1 - Math.cos(2 * Math.PI * (age / 29.53))) / 2 * 100);

  let phase = 'New Moon';
  let icon = '🌑';
  if (age < 1.84) { phase = 'New Moon'; icon = '🌑'; }
  else if (age < 7.38) { phase = 'Waxing Crescent'; icon = '🌒'; }
  else if (age < 9.22) { phase = 'First Quarter'; icon = '🌓'; }
  else if (age < 14.76) { phase = 'Waxing Gibbous'; icon = '🌔'; }
  else if (age < 16.61) { phase = 'Full Moon'; icon = '🌕'; }
  else if (age < 22.15) { phase = 'Waning Gibbous'; icon = '🌖'; }
  else if (age < 23.99) { phase = 'Last Quarter'; icon = '🌗'; }
  else { phase = 'Waning Crescent'; icon = '🌘'; }

  const isSpringTide = (age <= 3.0 || age >= 26.5 || (age >= 11.5 && age <= 18.0));
  const tideRegime = isSpringTide ? 'Spring Tide (Max Range)' : 'Neap Tide (Mild Range)';
  const tideBadgeClass = isSpringTide ? 'spring' : 'neap';

  return { phase, icon, illumination, isSpringTide, tideRegime, tideBadgeClass, age: age.toFixed(1) };
}

// Main Render Function for Predicted Astronomical Tide Card
function renderPortTideCard() {
  const port = NATIONAL_TIDE_STATIONS.find(p => p.id === selectedPortId) || NATIONAL_TIDE_STATIONS[0];
  const now = new Date();
  const moon = getMoonPhase(now);

  // 1. Check Warnings
  const warning = checkPortActiveWarnings(port);
  const warningBanner = ids('portWarningBanner');
  if (warningBanner) {
    warningBanner.className = `port-warning-banner level-${warning.level || 'safe'}`;
    warningBanner.textContent = warning.text;
  }

  // 2. Render Wind, Sea State & Moon Phase
  const windElem = ids('portWindDisplay');
  if (windElem) {
    const windKmh = port.baseWind;
    const windKnots = (windKmh * 0.539957).toFixed(1);
    
    // Dynamic Sea State based on active INCOIS OSF warnings + baseline
    let seaState = windKmh < 12 ? 'Calm' : windKmh < 20 ? 'Slight' : 'Moderate';
    if (warning && !warning.safe) {
      if (warning.level === 'warning') seaState = 'Rough to Very Rough';
      else if (warning.level === 'alert') seaState = 'Moderate to Rough';
      else if (warning.level === 'watch') seaState = 'Moderate';
    }

    windElem.innerHTML = `
      <div class="wind-stat-item">
        <span class="wind-stat-label">Wind &amp; Sea</span>
        <strong>${port.windDir} ${windKmh} km/h <span class="wind-knots-sea">(${windKnots} kn · ${seaState})</span></strong>
      </div>
      <div class="wind-stat-item">
        <span class="wind-stat-label">Tidal Regime</span>
        <strong style="color:var(--teal);font-weight:850;">${port.range >= 4.0 ? 'Macro-tidal' : port.range >= 2.0 ? 'Meso-tidal' : 'Micro-tidal'} (~${port.range}m)</strong>
      </div>
      <div class="wind-stat-item moon-stat-item">
        <span class="wind-stat-label">Moon &amp; Tidal Phase</span>
        <strong class="moon-tide-text" title="${moon.phase} (${moon.illumination}% lit · ${moon.tideRegime})"><span>${moon.icon} ${moon.phase}</span> <small class="tide-regime-pill ${moon.tideBadgeClass}">${moon.isSpringTide ? 'Spring Tide' : 'Neap Tide'}</small></strong>
      </div>
    `;
  }

  // 3. Render High / Low Tide Prediction Info and PAT Action
  const patUrl = `https://incois.gov.in/oceanservices/PAT/tidegraphphases.jsp?region=${encodeURIComponent(port.name)}`;
  const tideTimesElem = ids('portTideTimesList');
  if (tideTimesElem) {
    tideTimesElem.innerHTML = `
      <div style="grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
        <span style="font-size:11px;font-weight:750;color:#082f3c;">Station: <strong>${port.name}</strong> (${port.district}, ${port.state})</span>
        <a href="${patUrl}" target="_blank" rel="noopener" class="source card-action-button" style="padding:4px 8px;font-size:10.5px;min-height:auto;">View INCOIS High &amp; Low Tide Table ↗</a>
      </div>
    `;
  }

  // 4. Render Chart Container with direct PAT portal view link
  const chartElem = ids('portTideChartContainer');
  if (chartElem) {
    chartElem.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px 10px;text-align:center;gap:6px;background:#f8fcfb;border-radius:7px;">
        <div style="font-size:11.5px;font-weight:800;color:#082f3c;">Official INCOIS Predicted &amp; Actual Tide (PAT) Chart</div>
        <div style="font-size:10.5px;color:#5b7279;">Coordinates: ${port.lat.toFixed(4)}°N, ${port.lng.toFixed(4)}°E · Spring Range: ~${port.range}m</div>
        <a href="${patUrl}" target="_blank" rel="noopener" class="source card-action-button" style="margin-top:4px;font-size:11px;padding:6px 12px;">Open Interactive PAT Tide Graph (INCOIS) ↗</a>
      </div>
    `;
  }
}

// Handle GPS "📍 Near Me" Button Click
function locateUserNearMe() {
  const gpsBtn = ids('portGpsBtn');
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }

  if (gpsBtn) {
    gpsBtn.textContent = 'Locating…';
    gpsBtn.disabled = true;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const nearest = getNearestTideStation(lat, lng);
      selectedPortId = nearest.port.id;
      userLocationData = { lat, lng, distanceKm: nearest.distanceKm };

      const select = ids('portSelectDropdown');
      if (select) select.value = selectedPortId;

      if (gpsBtn) {
        gpsBtn.textContent = `📍 Near Me (${nearest.distanceKm} km)`;
        gpsBtn.disabled = false;
        gpsBtn.classList.add('is-located');
      }

      renderPortTideCard();
    },
    error => {
      console.warn('Geolocation failed:', error.message);
      if (gpsBtn) {
        gpsBtn.textContent = '📍 Near Me';
        gpsBtn.disabled = false;
      }
      alert('Could not retrieve your location. Please check location permissions.');
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

// Initialize Port & Tide Controls
function initPortTides() {
  const select = ids('portSelectDropdown');
  if (select && select.children.length === 0) {
    // Group stations by State / UT, sorted alphabetically
    const stateGroups = {};
    for (const st of NATIONAL_TIDE_STATIONS) {
      const s = st.state;
      if (!stateGroups[s]) stateGroups[s] = [];
      stateGroups[s].push(st);
    }

    const optGroups = Object.keys(stateGroups).sort().map(state => {
      const sortedInState = stateGroups[state].slice().sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedInState.map(p => `
        <option value="${p.id}" ${p.id === selectedPortId ? 'selected' : ''}>${p.name} (${p.district})</option>
      `).join('');

      return `<optgroup label="${state}">${options}</optgroup>`;
    }).join('');

    select.innerHTML = optGroups;

    select.addEventListener('change', () => {
      selectedPortId = select.value;
      renderPortTideCard();
    });
  }

  const gpsBtn = ids('portGpsBtn');
  if (gpsBtn && !gpsBtn.dataset.wired) {
    gpsBtn.dataset.wired = 'true';
    gpsBtn.addEventListener('click', locateUserNearMe);
  }

  renderPortTideCard();
}
