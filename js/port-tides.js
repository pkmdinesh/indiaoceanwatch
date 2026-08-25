// Port catalog with geographical coordinates, coastal district mappings, and tidal parameters
var MAJOR_COASTAL_PORTS = [
  { id: 'kandla', name: 'Deendayal (Kandla)', state: 'Gujarat', district: 'Kachchh', lat: 23.003, lng: 70.218, range: 6.4, m2Amp: 2.3, s2Amp: 0.8, baseWind: 18, windDir: 'WSW' },
  { id: 'dwarka', name: 'Dwarka / Okha', state: 'Gujarat', district: 'Devbhumi Dwarka', lat: 22.466, lng: 69.072, range: 4.2, m2Amp: 1.5, s2Amp: 0.5, baseWind: 20, windDir: 'SW' },
  { id: 'veraval', name: 'Veraval', state: 'Gujarat', district: 'Gir Somnath', lat: 20.902, lng: 70.366, range: 2.8, m2Amp: 1.0, s2Amp: 0.35, baseWind: 16, windDir: 'SW' },
  { id: 'bhavnagar', name: 'Bhavnagar / Alang', state: 'Gujarat', district: 'Bhavnagar', lat: 21.764, lng: 72.152, range: 9.8, m2Amp: 3.5, s2Amp: 1.2, baseWind: 15, windDir: 'SSW' },
  { id: 'mumbai', name: 'Mumbai / JNPT', state: 'Maharashtra', district: 'Mumbai Suburban', lat: 18.950, lng: 72.868, range: 4.8, m2Amp: 1.7, s2Amp: 0.6, baseWind: 14, windDir: 'WNW' },
  { id: 'ratnagiri', name: 'Ratnagiri', state: 'Maharashtra', district: 'Ratnagiri', lat: 16.983, lng: 73.283, range: 2.6, m2Amp: 0.9, s2Amp: 0.3, baseWind: 12, windDir: 'NW' },
  { id: 'mormugao', name: 'Mormugao', state: 'Goa', district: 'South Goa', lat: 15.416, lng: 73.799, range: 2.3, m2Amp: 0.8, s2Amp: 0.28, baseWind: 11, windDir: 'WNW' },
  { id: 'karwar', name: 'Karwar', state: 'Karnataka', district: 'Uttara Kannada', lat: 14.816, lng: 74.133, range: 2.1, m2Amp: 0.75, s2Amp: 0.25, baseWind: 10, windDir: 'W' },
  { id: 'mangalore', name: 'New Mangalore', state: 'Karnataka', district: 'Dakshina Kannada', lat: 12.923, lng: 74.816, range: 1.6, m2Amp: 0.55, s2Amp: 0.2, baseWind: 12, windDir: 'W' },
  { id: 'kochi', name: 'Cochin (Kochi)', state: 'Kerala', district: 'Ernakulam', lat: 9.966, lng: 76.266, range: 1.1, m2Amp: 0.38, s2Amp: 0.14, baseWind: 13, windDir: 'W' },
  { id: 'kanyakumari', name: 'Kanyakumari', state: 'Tamil Nadu', district: 'Kanniyakumari', lat: 8.083, lng: 77.550, range: 1.0, m2Amp: 0.35, s2Amp: 0.12, baseWind: 22, windDir: 'WSW' },
  { id: 'tuticorin', name: 'V.O. Chidambaranar (Tuticorin)', state: 'Tamil Nadu', district: 'Thoothukkudi', lat: 8.750, lng: 78.183, range: 1.2, m2Amp: 0.42, s2Amp: 0.15, baseWind: 19, windDir: 'SW' },
  { id: 'nagapattinam', name: 'Nagapattinam', state: 'Tamil Nadu', district: 'Nagappattinam', lat: 10.766, lng: 79.850, range: 0.9, m2Amp: 0.32, s2Amp: 0.11, baseWind: 15, windDir: 'SSW' },
  { id: 'chennai', name: 'Chennai / Kamarajar (Ennore)', state: 'Tamil Nadu', district: 'Chennai', lat: 13.083, lng: 80.283, range: 1.4, m2Amp: 0.48, s2Amp: 0.17, baseWind: 14, windDir: 'S' },
  { id: 'krishnapatnam', name: 'Krishnapatnam', state: 'Andhra Pradesh', district: 'Nellore', lat: 14.250, lng: 80.116, range: 1.3, m2Amp: 0.45, s2Amp: 0.16, baseWind: 13, windDir: 'SSE' },
  { id: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', district: 'Visakhapatnam', lat: 17.686, lng: 83.218, range: 1.8, m2Amp: 0.62, s2Amp: 0.22, baseWind: 14, windDir: 'SSW' },
  { id: 'paradip', name: 'Paradip', state: 'Odisha', district: 'Jagatsinghpur', lat: 20.266, lng: 86.666, range: 2.9, m2Amp: 1.0, s2Amp: 0.35, baseWind: 16, windDir: 'SW' },
  { id: 'dhamra', name: 'Dhamra', state: 'Odisha', district: 'Bhadrak', lat: 20.816, lng: 86.966, range: 3.6, m2Amp: 1.25, s2Amp: 0.44, baseWind: 15, windDir: 'SSW' },
  { id: 'portblair', name: 'Port Blair', state: 'Andaman & Nicobar', district: 'South Andaman', lat: 11.666, lng: 92.733, range: 2.2, m2Amp: 0.78, s2Amp: 0.26, baseWind: 17, windDir: 'WSW' },
  { id: 'kavaratti', name: 'Kavaratti', state: 'Lakshadweep', district: 'Lakshadweep', lat: 10.566, lng: 72.641, range: 1.4, m2Amp: 0.48, s2Amp: 0.17, baseWind: 15, windDir: 'WNW' }
];

var selectedPortId = 'mumbai';
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

// Find nearest port to given coordinates
function getNearestPort(lat, lng) {
  let nearest = MAJOR_COASTAL_PORTS[0];
  let minDistance = Number.POSITIVE_INFINITY;

  for (const port of MAJOR_COASTAL_PORTS) {
    const dist = calculateHaversineDistance(lat, lng, port.lat, port.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = port;
    }
  }
  return { port: nearest, distanceKm: Math.round(minDistance) };
}

// Astronomical Harmonic Tide Elevation calculation (unrounded float)
function calculateTideElevationRaw(port, date) {
  const tHours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  
  // Principal Lunar Semidiurnal M2 (Period ~12.42h)
  const m2Speed = 2 * Math.PI / 12.4206;
  const m2Phase = (port.lng * Math.PI / 180) + (dayOfYear * 0.08);
  const m2 = port.m2Amp * Math.cos(m2Speed * tHours - m2Phase);

  // Principal Solar Semidiurnal S2 (Period ~12.00h)
  const s2Speed = 2 * Math.PI / 12.0;
  const s2Phase = (port.lng * Math.PI / 180) * 0.8;
  const s2 = port.s2Amp * Math.cos(s2Speed * tHours - s2Phase);

  // Lunar Diurnal K1 (Period ~23.93h)
  const k1Speed = 2 * Math.PI / 23.9344;
  const k1 = (port.range * 0.12) * Math.sin(k1Speed * tHours);

  // Mean Sea Level
  const msl = port.range * 0.55;
  return msl + m2 + s2 + k1;
}

// Astronomical Harmonic Tide Elevation calculation for given timestamp and port
function calculateTideElevation(port, date) {
  const rawHeight = calculateTideElevationRaw(port, date);
  return Number(Math.max(0.05, rawHeight).toFixed(2));
}

// Generate 24-hour tide predictions (High Tides & Low Tides) for today with robust extremum detection
function calculateDailyTideEvents(port, baseDate = new Date()) {
  const startOfDay = new Date(baseDate);
  startOfDay.setHours(0, 0, 0, 0);

  // 1. Sample elevations for the SVG chart (every 5 mins)
  const elevations = [];
  for (let m = 0; m <= 24 * 60; m += 5) {
    const time = new Date(startOfDay.getTime() + m * 60 * 1000);
    const rawH = calculateTideElevationRaw(port, time);
    elevations.push({ time, height: Number(Math.max(0.05, rawH).toFixed(2)), minutes: m });
  }

  // 2. High-resolution sampling (every 2 mins with a 60-min buffer) on continuous floats
  const samples = [];
  for (let m = -60; m <= 24 * 60 + 60; m += 2) {
    const time = new Date(startOfDay.getTime() + m * 60 * 1000);
    samples.push({ minutes: m, time, h: calculateTideElevationRaw(port, time) });
  }

  // 3. Detect candidate peaks and troughs using 5-point slope comparison to avoid flat-spot ripples
  const rawExtrema = [];
  for (let i = 2; i < samples.length - 2; i++) {
    const prev2 = samples[i - 2].h;
    const prev1 = samples[i - 1].h;
    const curr = samples[i].h;
    const next1 = samples[i + 1].h;
    const next2 = samples[i + 2].h;

    if (curr >= prev1 && curr > prev2 && curr >= next1 && curr > next2) {
      rawExtrema.push({ type: 'High', minutes: samples[i].minutes, time: samples[i].time, height: Number(Math.max(0.05, curr).toFixed(2)), raw: curr });
    } else if (curr <= prev1 && curr < prev2 && curr <= next1 && curr < next2) {
      rawExtrema.push({ type: 'Low', minutes: samples[i].minutes, time: samples[i].time, height: Number(Math.max(0.05, curr).toFixed(2)), raw: curr });
    }
  }

  // 4. Filter events strictly within [00:00, 24:00], merging adjacent micro-ripples and enforcing alternating sequence
  const filteredEvents = [];
  for (const ext of rawExtrema) {
    if (ext.minutes < 0 || ext.minutes > 1440) continue;

    const last = filteredEvents[filteredEvents.length - 1];
    if (!last) {
      filteredEvents.push(ext);
    } else if (last.type === ext.type) {
      // Same extremum type: keep the more extreme value
      if (ext.type === 'High' && ext.raw > last.raw) {
        filteredEvents[filteredEvents.length - 1] = ext;
      } else if (ext.type === 'Low' && ext.raw < last.raw) {
        filteredEvents[filteredEvents.length - 1] = ext;
      }
    } else {
      // Alternating type: enforce realistic tidal period separation (>= 2.5 hours) & significant prominence
      if (Math.abs(ext.minutes - last.minutes) >= 150) {
        if (Math.abs(ext.raw - last.raw) >= 0.12) {
          filteredEvents.push(ext);
        }
      }
    }
  }

  return { events: filteredEvents, elevations };
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

// Check active warnings for port's state/district in latestStatusData
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

// Render SVG Tide Curve
function renderTideChartSvg(elevations, port, now = new Date()) {
  const width = 340;
  const height = 90;
  const padTop = 16;
  const padBottom = 18;
  const padSide = 12;

  const minH = Math.min(...elevations.map(e => e.height));
  const maxH = Math.max(...elevations.map(e => e.height));
  const rangeH = Math.max(0.8, maxH - minH);

  const getX = m => padSide + (m / (24 * 60)) * (width - 2 * padSide);
  const getY = h => padTop + (1 - (h - minH) / rangeH) * (height - padTop - padBottom);

  let pathD = '';
  elevations.forEach((pt, i) => {
    const x = getX(pt.minutes).toFixed(1);
    const y = getY(pt.height).toFixed(1);
    pathD += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  });

  // Fill area under curve
  const fillD = `${pathD} L ${getX(24 * 60).toFixed(1)} ${height - padBottom} L ${getX(0).toFixed(1)} ${height - padBottom} Z`;

  // Current time position
  const nowM = now.getHours() * 60 + now.getMinutes();
  const nowX = getX(Math.min(24 * 60, Math.max(0, nowM))).toFixed(1);
  const currentHeight = calculateTideElevation(port, now);
  const nowY = getY(currentHeight).toFixed(1);

  // Time markers at 00h, 06h, 12h, 18h, 24h
  const timeLabels = [
    { label: '00:00', m: 0 },
    { label: '06:00', m: 360 },
    { label: '12:00', m: 720 },
    { label: '18:00', m: 1080 },
    { label: '24:00', m: 1440 }
  ];

  const markersSvg = timeLabels.map(t => `
    <text x="${getX(t.m).toFixed(1)}" y="${height - 3}" font-size="8" fill="#5b7279" text-anchor="${t.m === 0 ? 'start' : t.m === 1440 ? 'end' : 'middle'}">${t.label}</text>
    <line x1="${getX(t.m).toFixed(1)}" y1="${height - padBottom}" x2="${getX(t.m).toFixed(1)}" y2="${height - padBottom + 3}" stroke="#d9e5e1" stroke-width="1" />
  `).join('');

  return `
    <svg viewBox="0 0 ${width} ${height}" class="tide-curve-svg" aria-hidden="true">
      <defs>
        <linearGradient id="tideFillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#087f84" stop-opacity="0.32" />
          <stop offset="100%" stop-color="#087f84" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      <path d="${fillD}" fill="url(#tideFillGrad)" />
      <path d="${pathD}" fill="none" stroke="#087f84" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      ${markersSvg}
      <line x1="${nowX}" y1="${padTop - 4}" x2="${nowX}" y2="${height - padBottom}" stroke="#ff8c00" stroke-width="1.5" stroke-dasharray="2 2" />
      <circle cx="${nowX}" cy="${nowY}" r="4" fill="#ff8c00" stroke="#fff" stroke-width="1.5" />
      <text x="${nowX}" y="${Math.max(10, Number(nowY) - 6)}" font-size="8.5" font-weight="900" fill="#082f3c" text-anchor="middle">NOW ${currentHeight}m</text>
    </svg>
  `;
}

// Astronomical Lunar Phase and Spring/Neap Tide Calculation
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

// Main Render Function for Wind, Tide & Port Forecast Card
function renderPortTideCard() {
  const port = MAJOR_COASTAL_PORTS.find(p => p.id === selectedPortId) || MAJOR_COASTAL_PORTS[0];
  const now = new Date();

  // 1. Calculate Daily Tides
  const { events, elevations } = calculateDailyTideEvents(port, now);
  const currentHeight = calculateTideElevation(port, now);
  const futureHeight = calculateTideElevation(port, new Date(now.getTime() + 15 * 60 * 1000));
  const isRising = futureHeight >= currentHeight;
  const moon = getMoonPhase(now);

  // 2. Check Warnings
  const warning = checkPortActiveWarnings(port);
  const warningBanner = ids('portWarningBanner');
  if (warningBanner) {
    warningBanner.className = `port-warning-banner level-${warning.level || 'safe'}`;
    warningBanner.textContent = warning.text;
  }

  // 3. Render Wind, Sea State & Moon Phase
  const windElem = ids('portWindDisplay');
  if (windElem) {
    const windKmh = port.baseWind;
    const windKnots = (windKmh * 0.539957).toFixed(1);
    const seaState = windKmh < 12 ? 'Calm' : windKmh < 20 ? 'Slight' : 'Moderate';
    windElem.innerHTML = `
      <div class="wind-stat-item">
        <span class="wind-stat-label">Wind &amp; Sea</span>
        <strong>${port.windDir} ${windKmh} km/h <span class="wind-knots-sea">(${windKnots} kn · ${seaState})</span></strong>
      </div>
      <div class="wind-stat-item">
        <span class="wind-stat-label">Tide State</span>
        <strong class="tide-direction ${isRising ? 'rising' : 'falling'}">${isRising ? '▲ Rising (Flood)' : '▼ Falling (Ebb)'}</strong>
      </div>
      <div class="wind-stat-item moon-stat-item">
        <span class="wind-stat-label">Moon &amp; Tide Type</span>
        <strong class="moon-tide-text" title="${moon.phase} (${moon.illumination}% lit · ${moon.tideRegime})"><span>${moon.icon} ${moon.phase}</span> <small class="tide-regime-pill ${moon.tideBadgeClass}">${moon.isSpringTide ? 'Spring Tide' : 'Neap Tide'}</small></strong>
      </div>
    `;
  }

  // 4. Render High / Low Tide Times Table (Horizontal Row Layout with IST Time Format)
  const tideTimesElem = ids('portTideTimesList');
  if (tideTimesElem) {
    const highTides = events.filter(e => e.type === 'High');
    const lowTides = events.filter(e => e.type === 'Low');

    const formatTime = d => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });

    tideTimesElem.innerHTML = `
      <div class="tide-horizontal-row high-row">
        <span class="tide-event-badge high">High Tide (IST)</span>
        <div class="tide-times-items">
          ${highTides.length > 0 ? highTides.map(t => `<span class="tide-time-pill"><strong class="tide-time">${formatTime(t.time)}</strong> <span class="tide-height-val">${t.height}m</span></span>`).join('') : '<span class="empty">—</span>'}
        </div>
      </div>
      <div class="tide-horizontal-row low-row">
        <span class="tide-event-badge low">Low Tide (IST)</span>
        <div class="tide-times-items">
          ${lowTides.length > 0 ? lowTides.map(t => `<span class="tide-time-pill"><strong class="tide-time">${formatTime(t.time)}</strong> <span class="tide-height-val">${t.height}m</span></span>`).join('') : '<span class="empty">—</span>'}
        </div>
      </div>
    `;
  }

  // 5. Render SVG Harmonic Tide Graph
  const chartElem = ids('portTideChartContainer');
  if (chartElem) {
    chartElem.innerHTML = renderTideChartSvg(elevations, port, now);
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
      const nearest = getNearestPort(lat, lng);
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
  if (select) {
    select.innerHTML = MAJOR_COASTAL_PORTS.map(p => `
      <option value="${p.id}" ${p.id === selectedPortId ? 'selected' : ''}>${p.name} (${p.state})</option>
    `).join('');

    select.addEventListener('change', () => {
      selectedPortId = select.value;
      renderPortTideCard();
    });
  }

  const gpsBtn = ids('portGpsBtn');
  if (gpsBtn) {
    gpsBtn.addEventListener('click', locateUserNearMe);
  }

  renderPortTideCard();
}
