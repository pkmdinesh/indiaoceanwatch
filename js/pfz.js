const PFZ_SECTOR_NAMES = ['Gujarat','Maharashtra','Goa','Karnataka','Kerala','South Tamil Nadu','North Tamil Nadu','South Andhra Pradesh','North Andhra Pradesh','Odisha','West Bengal','Andaman','Nicobar','Lakshadweep'];
const STORAGE_KEY_LOCKED_LC = 'ocean_watch_locked_landing_center';

// Active navigation targets
var currentPfzNavTarget = null;
var deviceCompassActive = false;
var currentDeviceHeading = 0;
var targetCompassBearing = 0;

// Persistence for Locked Landing Center
function getLockedLandingCenter() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOCKED_LC);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setLockedLandingCenter(center, sectorName) {
  try {
    const payload = {
      name: center.name,
      sectorName: sectorName,
      messages: center.messages || [],
      lockedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_LOCKED_LC, JSON.stringify(payload));
    renderLockedLandingCenterBar();
    renderPfzSectors(latestPfzSectorsData);
  } catch (err) {
    console.warn('Could not save locked landing center:', err);
  }
}

function unlockLandingCenter() {
  try {
    localStorage.removeItem(STORAGE_KEY_LOCKED_LC);
    renderLockedLandingCenterBar();
    renderPfzSectors(latestPfzSectorsData);
  } catch (err) {
    console.warn('Could not unlock landing center:', err);
  }
}

var latestPfzSectorsData = [];

function renderPfzSectors(values) {
  latestPfzSectorsData = values || [];
  const el = ids('pfzStates');
  ids('pfzDetails').hidden = true;
  renderLockedLandingCenterBar();

  const received = (values || []).map(value => typeof value === 'string' ? {name:value,landingCenters:[]} : value);
  const byName = new Map(received.map(sector => [String(sector.name || '').toLowerCase(),sector]));
  const sectors = PFZ_SECTOR_NAMES.map(name => byName.get(name.toLowerCase()) || {
    name,
    hasForecast:false,
    landingCenters:[],
    message:'No forecast is available for this sector in the latest fetched PFZ data.'
  });
  const knownNames = new Set(PFZ_SECTOR_NAMES.map(name => name.toLowerCase()));
  sectors.push(...received.filter(sector => !knownNames.has(String(sector.name || '').toLowerCase())));
  sectors.sort((a,b) => {
    const aHasForecast = a.hasForecast !== false && Boolean(a.landingCenters?.length);
    const bHasForecast = b.hasForecast !== false && Boolean(b.landingCenters?.length);
    return Number(bHasForecast) - Number(aHasForecast);
  });

  const locked = getLockedLandingCenter();

  el.replaceChildren(...sectors.map(value => {
    const sector = typeof value === 'string' ? {name:value,landingCenters:[]} : value;
    const hasForecast = sector.hasForecast !== false && Boolean(sector.landingCenters?.length);
    const hasLockedLc = locked && sector.landingCenters?.some(c => c.name.toLowerCase() === locked.name.toLowerCase());

    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'tag pfz-chip' + (hasForecast ? '' : ' no-forecast') + (hasLockedLc ? ' has-locked' : '');
    chip.setAttribute('aria-expanded','false');
    chip.textContent = titleCase(sector.name) + '(' + (sector.landingCenters?.length || 0) + ')' + (hasLockedLc ? ' 🔒' : '');
    chip.addEventListener('click',() => {
      el.querySelectorAll('.pfz-chip').forEach(item => item.setAttribute('aria-expanded',String(item === chip)));
      renderPfzLandingCenters(sector);
    });
    return chip;
  }));
}

function renderLockedLandingCenterBar() {
  const banner = ids('pfzLockedBar');
  if (!banner) return;
  const locked = getLockedLandingCenter();
  if (!locked) {
    banner.hidden = true;
    banner.replaceChildren();
    return;
  }

  banner.hidden = false;
  banner.innerHTML = `
    <div class="pfz-locked-banner-card">
      <span class="locked-icon">🔒</span>
      <div class="locked-info">
        <strong>Locked Landing Center: ${titleCase(locked.name)}</strong>
        <span>${titleCase(locked.sectorName)} Sector · Saved Home Harbor</span>
      </div>
      <div class="locked-actions">
        <button type="button" class="pfz-compass-mini-btn" onclick="locateLockedPfzCompass();">🧭 Nav</button>
        <button type="button" class="pfz-unlock-btn" onclick="unlockLandingCenter();" title="Unlock Home Landing Center">🔓 Unlock</button>
      </div>
    </div>
  `;
}

function renderPfzLandingCenters(sector) {
  const details = ids('pfzDetails');
  const centers = sector.landingCenters || [];
  const detailsTitle = ids('pfzDetailsTitle');
  const inlineMessage = ids('pfzInlineMessage');
  detailsTitle.textContent = centers.length ? titleCase(sector.name) + ' landing centers' : '';
  detailsTitle.hidden = !centers.length;
  inlineMessage.textContent = centers.length ? '' : titleCase(sector.name) + ' — ' + (sector.message || 'No forecast is available for this sector in the latest fetched PFZ data.');
  inlineMessage.hidden = Boolean(centers.length);
  ids('pfzMessages').replaceChildren();

  const locked = getLockedLandingCenter();

  ids('pfzLandingCenters').replaceChildren(...centers.map(center => {
    const chip = document.createElement('button');
    const messageCount = center.messages?.length || 0;
    const isLocked = locked && locked.name.toLowerCase() === center.name.toLowerCase();

    chip.type = 'button';
    chip.className = 'tag landing-chip' + (isLocked ? ' is-locked-chip' : '');
    chip.textContent = titleCase(center.name) + (messageCount > 1 ? '(' + messageCount + ')' : '') + (isLocked ? ' 🔒' : '');
    chip.setAttribute('aria-expanded','false');
    chip.addEventListener('click',() => {
      ids('pfzLandingCenters').querySelectorAll('.landing-chip').forEach(item => item.setAttribute('aria-expanded',String(item === chip)));
      renderPfzMessages(center, sector.name);
    });
    return chip;
  }));

  if (!centers.length) {
    ids('pfzLandingCenters').replaceChildren();
  }
  details.hidden = false;
}

function renderPfzMessages(center, sectorName) {
  const labels = {direction:'Direction',bearing:'Bearing (deg)',distance:'Distance (km)',depth:'Depth (mtr)',latitude:'Latitude (dms)',longitude:'Longitude (dms)'};
  const locked = getLockedLandingCenter();
  const isLocked = locked && locked.name.toLowerCase() === center.name.toLowerCase();

  const messagesContainer = ids('pfzMessages');
  messagesContainer.replaceChildren();

  // Header Bar with Lock Button
  const headerRow = document.createElement('div');
  headerRow.className = 'pfz-center-header-row';
  headerRow.innerHTML = `
    <div class="pfz-center-title">
      <strong>${titleCase(center.name)}</strong>
      <span>${titleCase(sectorName || '')} Sector</span>
    </div>
    <div class="pfz-center-actions">
      <button type="button" class="landing-lock-btn ${isLocked ? 'locked' : ''}">
        ${isLocked ? '🔒 Locked (Home)' : '🔒 Lock Landing Center'}
      </button>
    </div>
  `;

  headerRow.querySelector('.landing-lock-btn').addEventListener('click', () => {
    if (isLocked) {
      unlockLandingCenter();
    } else {
      setLockedLandingCenter(center, sectorName);
    }
    renderPfzMessages(center, sectorName);
  });

  messagesContainer.appendChild(headerRow);

  (center.messages || []).forEach((message, index) => {
    const panel = document.createElement('details');
    panel.className = 'pfz-message';
    panel.open = true;
    const summary = document.createElement('summary');
    summary.textContent = 'Landing Center: ' + titleCase(center.name) + (center.messages.length > 1 ? ' — Message ' + (index + 1) : '');
    const grid = document.createElement('div');
    grid.className = 'pfz-message-grid';
    grid.replaceChildren(...Object.entries(labels).map(([key,label]) => {
      const field = document.createElement('div');
      field.className = 'pfz-message-field';
      const heading = document.createElement('strong');
      heading.textContent = label;
      const value = document.createElement('span');
      value.textContent = message[key] || '—';
      field.append(heading,value);
      return field;
    }));

    // Add Direct Compass Action inside message panel
    const actionRow = document.createElement('div');
    actionRow.className = 'pfz-message-nav-action';
    actionRow.innerHTML = `
      <button type="button" class="pfz-msg-compass-btn">
        🧭 Open Compass Dial for this target
      </button>
    `;

    const targetLat = parseDmsCoordinate(message.latitude);
    const targetLon = parseDmsCoordinate(message.longitude);
    const bearingVal = parseFloat(message.bearing) || 0;
    const distVal = parseFloat(message.distance) || 0;
    const distNm = (distVal * 0.539957).toFixed(1);

    actionRow.querySelector('.pfz-msg-compass-btn').addEventListener('click', () => {
      openPfzCompassModal({
        sourceLabel: titleCase(center.name) + ' Landing Center',
        targetSector: titleCase(sectorName),
        targetLat: targetLat,
        targetLon: targetLon,
        targetPoint: (targetLat != null && targetLon != null) ? { lat: targetLat, lon: targetLon } : null,
        bearingDeg: Math.round(bearingVal),
        cardinal: getCardinalFromDegrees(bearingVal),
        distanceKm: distVal.toFixed(1),
        distanceNm: distNm,
        depth: message.depth || '',
        direction: message.direction || ''
      });
    });

    panel.append(summary, grid, actionRow);
    messagesContainer.appendChild(panel);
  });
}

// Parse DMS coordinate string (e.g. "19 10 45 N", "72 35 40 E") to decimal degrees
function parseDmsCoordinate(coordStr) {
  if (typeof coordStr === 'number') return coordStr;
  if (!coordStr || typeof coordStr !== 'string') return null;
  const str = coordStr.trim().toUpperCase();
  const directFloat = Number(str);
  if (!isNaN(directFloat) && str !== '') return directFloat;

  const parts = str.match(/[-+]?[0-9]*\.?[0-9]+/g);
  if (!parts || parts.length === 0) return null;

  const deg = parseFloat(parts[0]) || 0;
  const min = parseFloat(parts[1]) || 0;
  const sec = parseFloat(parts[2]) || 0;

  let decimal = deg + (min / 60) + (sec / 3600);

  if (str.includes('S') || str.includes('W') || str.startsWith('-')) {
    decimal = -Math.abs(decimal);
  }
  return decimal;
}

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

// Cache for PFZ lines & landing centres coordinates
var pfzLinesGeoJsonCache = null;
var pfzLandingCentresGeoJsonCache = null;

async function loadPfzLinesCoordinates() {
  if (pfzLinesGeoJsonCache) return pfzLinesGeoJsonCache;
  try {
    const res = await fetch(APP_CONFIG.MAP.PFZ_LINES_URL);
    if (!res.ok) return null;
    const data = await res.json();
    pfzLinesGeoJsonCache = data;
    return data;
  } catch (err) {
    console.warn('Could not load PFZ lines geojson:', err);
    return null;
  }
}

async function loadPfzLandingCentresData() {
  if (pfzLandingCentresGeoJsonCache) return pfzLandingCentresGeoJsonCache;
  try {
    const res = await fetch(APP_CONFIG.MAP.PFZ_LANDING_CENTRES_URL);
    if (!res.ok) return null;
    const data = await res.json();
    pfzLandingCentresGeoJsonCache = data;
    return data;
  } catch (err) {
    console.warn('Could not load PFZ landing centres geojson:', err);
    return null;
  }
}

function getCardinalFromDegrees(bearing) {
  const cardinals = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const idx = Math.round(((bearing % 360) + 360) % 360 / 22.5) % 16;
  return cardinals[idx];
}

function calculateCompassBearing(lat1, lon1, lat2, lon2) {
  const toRad = deg => deg * Math.PI / 180;
  const toDeg = rad => rad * 180 / Math.PI;
  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const deltaLambda = toRad(lon2 - lon1);

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
  const theta = Math.atan2(y, x);
  const bearing = (toDeg(theta) + 360) % 360;

  return {
    deg: Math.round(bearing),
    cardinal: getCardinalFromDegrees(bearing)
  };
}

async function findClosestPfzNavigationalTarget(lat, lon, flcName = null) {
  const geojson = await loadPfzLinesCoordinates();
  if (!geojson || !Array.isArray(geojson.features) || geojson.features.length === 0) {
    return null;
  }

  let minDistanceKm = Number.POSITIVE_INFINITY;
  let targetPoint = null;
  let targetSector = '';

  for (const feature of geojson.features) {
    const geom = feature.geometry;
    const sectorName = feature.properties?.SECTORNAME || '';
    if (!geom) continue;

    const coordsList = [];
    if (geom.type === 'LineString') {
      coordsList.push(geom.coordinates);
    } else if (geom.type === 'MultiLineString') {
      coordsList.push(...geom.coordinates);
    }

    for (const line of coordsList) {
      for (const pt of line) {
        const ptLon = pt[0];
        const ptLat = pt[1];
        const distKm = calculateHaversineDistance(lat, lon, ptLat, ptLon);
        if (distKm < minDistanceKm) {
          minDistanceKm = distKm;
          targetPoint = { lat: ptLat, lon: ptLon };
          targetSector = sectorName;
        }
      }
    }
  }

  if (!targetPoint) return null;

  const distNm = (minDistanceKm * 0.539957).toFixed(1);
  const bearing = calculateCompassBearing(lat, lon, targetPoint.lat, targetPoint.lon);
  const label = flcName ? `Nearest PFZ line from ${titleCase(flcName)}` : 'Nearest PFZ line from Landing Centre';

  return {
    sourceLabel: label,
    distanceKm: minDistanceKm.toFixed(1),
    distanceNm: distNm,
    bearingDeg: bearing.deg,
    cardinal: bearing.cardinal,
    targetSector,
    targetPoint,
    targetLat: targetPoint.lat,
    targetLon: targetPoint.lon,
    flcName: flcName
  };
}

async function findNearestLandingCenterToGps(userLat, userLon) {
  const geojson = await loadPfzLandingCentresData();
  if (!geojson || !Array.isArray(geojson.features) || geojson.features.length === 0) {
    return null;
  }

  let minDistanceKm = Number.POSITIVE_INFINITY;
  let bestFeature = null;

  for (const feature of geojson.features) {
    const coords = feature.geometry?.coordinates;
    if (!Array.isArray(coords) || coords.length < 2) continue;
    const lcLon = coords[0];
    const lcLat = coords[1];
    const dist = calculateHaversineDistance(userLat, userLon, lcLat, lcLon);
    if (dist < minDistanceKm) {
      minDistanceKm = dist;
      bestFeature = feature;
    }
  }

  if (!bestFeature) return null;

  const props = bestFeature.properties || {};
  const lcName = props.LC_NAME || '';
  const sectorName = props.SECTOR_NAM || '';
  const distNm = (minDistanceKm * 0.539957).toFixed(1);
  const coords = bestFeature.geometry.coordinates;
  const bearing = calculateCompassBearing(userLat, userLon, coords[1], coords[0]);

  return {
    name: lcName,
    sectorName: sectorName,
    distName: props.DIST_NAME || '',
    lat: coords[1],
    lon: coords[0],
    distanceKm: minDistanceKm.toFixed(1),
    distanceNm: distNm,
    bearingDeg: bearing.deg,
    cardinal: bearing.cardinal
  };
}

function findMatchingLandingCenter(targetName, targetSector) {
  if (!Array.isArray(latestPfzSectorsData) || !latestPfzSectorsData.length) return null;

  const normTarget = String(targetName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const normSec = String(targetSector || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  let bestSector = null;
  let bestCenter = null;

  for (const sector of latestPfzSectorsData) {
    const sName = String(sector.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const isSecMatch = sName.includes(normSec) || normSec.includes(sName);

    for (const center of (sector.landingCenters || [])) {
      const cName = String(center.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cName === normTarget || cName.includes(normTarget) || normTarget.includes(cName)) {
        if (isSecMatch) return { sector, center };
        if (!bestCenter) {
          bestSector = sector;
          bestCenter = center;
        }
      }
    }
  }

  if (bestCenter) return { sector: bestSector, center: bestCenter };

  for (const sector of latestPfzSectorsData) {
    const sName = String(sector.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (sName.includes(normSec) || normSec.includes(sName)) {
      return { sector, center: sector.landingCenters?.[0] || null };
    }
  }

  return null;
}

function selectLandingCenterInUi(centerName, sectorName) {
  const match = findMatchingLandingCenter(centerName, sectorName);
  if (!match || !match.sector) return null;

  const sector = match.sector;
  const center = match.center;

  const sectorEl = ids('pfzStates');
  if (sectorEl) {
    const chips = sectorEl.querySelectorAll('.pfz-chip');
    chips.forEach(chip => {
      const isThis = chip.textContent.toLowerCase().includes(sector.name.toLowerCase());
      chip.setAttribute('aria-expanded', String(isThis));
    });
  }

  renderPfzLandingCenters(sector);

  if (center) {
    const lcChips = ids('pfzLandingCenters')?.querySelectorAll('.landing-chip');
    if (lcChips) {
      lcChips.forEach(chip => {
        const isThis = chip.textContent.toLowerCase().includes(center.name.toLowerCase());
        chip.setAttribute('aria-expanded', String(isThis));
      });
    }
    renderPfzMessages(center, sector.name);
  }

  return match;
}

// Locate via GPS or Locked Landing Center
async function locateUserPfzCompass() {
  const btn = ids('pfzGpsBtn');
  const banner = ids('pfzCompassBanner');
  const locked = getLockedLandingCenter();

  // SCENARIO 1: Any FLC is locked -> Display locked FLC details with compass and distance to nearest PFZ line
  if (locked) {
    if (btn) {
      btn.textContent = '🔒 Locked FLC';
      setTimeout(() => { if (btn) btn.textContent = '📍 Near Me'; }, 3000);
    }

    selectLandingCenterInUi(locked.name, locked.sectorName);

    let lcLat = null;
    let lcLon = null;
    const firstMsg = locked.messages?.[0];
    if (firstMsg) {
      lcLat = parseDmsCoordinate(firstMsg.latitude);
      lcLon = parseDmsCoordinate(firstMsg.longitude);
    }

    if (lcLat == null || lcLon == null) {
      const geojson = await loadPfzLandingCentresData();
      const feat = geojson?.features?.find(f => f.properties?.LC_NAME?.toLowerCase() === locked.name.toLowerCase());
      if (feat) {
        lcLon = feat.geometry.coordinates[0];
        lcLat = feat.geometry.coordinates[1];
      }
    }

    let nav = null;
    if (lcLat != null && lcLon != null) {
      nav = await findClosestPfzNavigationalTarget(lcLat, lcLon, locked.name);
    }

    if (firstMsg && firstMsg.bearing && firstMsg.distance) {
      const bearingVal = parseFloat(firstMsg.bearing) || (nav ? nav.bearingDeg : 0);
      const distVal = parseFloat(firstMsg.distance) || (nav ? parseFloat(nav.distanceKm) : 0);
      const distNm = (distVal * 0.539957).toFixed(1);
      nav = {
        sourceLabel: `Nearest PFZ line from ${titleCase(locked.name)}`,
        distanceKm: distVal.toFixed(1),
        distanceNm: distNm,
        bearingDeg: Math.round(bearingVal),
        cardinal: getCardinalFromDegrees(bearingVal),
        targetSector: locked.sectorName,
        targetPoint: (lcLat != null && lcLon != null) ? { lat: lcLat, lon: lcLon } : (nav?.targetPoint || null),
        targetLat: lcLat,
        targetLon: lcLon,
        depth: firstMsg.depth || '',
        direction: firstMsg.direction || '',
        flcName: locked.name
      };
    } else if (nav) {
      nav.sourceLabel = `Nearest PFZ line from ${titleCase(locked.name)}`;
      nav.flcName = locked.name;
    }

    if (banner && nav) {
      currentPfzNavTarget = nav;
      banner.hidden = false;
      banner.innerHTML = `
        <div class="pfz-compass-card">
          <span class="pfz-compass-icon">🔒</span>
          <div class="pfz-compass-body">
            <strong>Nearest PFZ line from ${titleCase(locked.name)}</strong>
            <span>${titleCase(locked.name)} (${titleCase(locked.sectorName)}) ➔ Heading ${nav.bearingDeg}° ${nav.cardinal} · ${nav.distanceNm} NM (${nav.distanceKm} km)</span>
          </div>
          <button type="button" class="pfz-open-compass-btn" onclick="openPfzCompassModal();">🧭 Compass</button>
        </div>
      `;
    }
    return;
  }

  // SCENARIO 2: Default (No FLC locked) -> Select nearest landing center and display compass & distance from GPS location
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }

  if (btn) {
    btn.textContent = 'Locating…';
    btn.disabled = true;
  }

  navigator.geolocation.getCurrentPosition(
    async position => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      const nearestFlc = await findNearestLandingCenterToGps(userLat, userLon);

      if (btn) {
        btn.textContent = nearestFlc ? `📍 ${nearestFlc.name} (${nearestFlc.distanceNm} NM)` : '📍 Located';
        btn.disabled = false;
      }

      if (nearestFlc) {
        // Automatically select the nearest landing center in UI
        const selected = selectLandingCenterInUi(nearestFlc.name, nearestFlc.sectorName);

        const firstMsg = selected?.center?.messages?.[0];
        let targetPt = null;
        if (firstMsg?.latitude && firstMsg?.longitude) {
          const tLat = parseDmsCoordinate(firstMsg.latitude);
          const tLon = parseDmsCoordinate(firstMsg.longitude);
          if (tLat != null && tLon != null) targetPt = { lat: tLat, lon: tLon };
        }

        const nav = {
          sourceLabel: 'Nearest FLC from your GPS location',
          distanceKm: nearestFlc.distanceKm,
          distanceNm: nearestFlc.distanceNm,
          bearingDeg: nearestFlc.bearingDeg,
          cardinal: nearestFlc.cardinal,
          targetSector: nearestFlc.sectorName,
          targetPoint: targetPt || { lat: nearestFlc.lat, lon: nearestFlc.lon },
          targetLat: targetPt ? targetPt.lat : nearestFlc.lat,
          targetLon: targetPt ? targetPt.lon : nearestFlc.lon,
          flcName: nearestFlc.name
        };

        currentPfzNavTarget = nav;

        if (banner) {
          banner.hidden = false;
          banner.innerHTML = `
            <div class="pfz-compass-card">
              <span class="pfz-compass-icon">📍</span>
              <div class="pfz-compass-body">
                <strong>Nearest FLC from your GPS location</strong>
                <span>${titleCase(nearestFlc.name)} (${titleCase(nearestFlc.sectorName)}) · Heading ${nearestFlc.bearingDeg}° ${nearestFlc.cardinal} · ${nearestFlc.distanceNm} NM (${nearestFlc.distanceKm} km)</span>
              </div>
              <button type="button" class="pfz-open-compass-btn" onclick="openPfzCompassModal();">🧭 Compass</button>
            </div>
          `;
        }
      } else {
        const nav = await findClosestPfzNavigationalTarget(userLat, userLon);
        if (banner && nav) {
          nav.sourceLabel = 'Nearest FLC from your GPS location';
          currentPfzNavTarget = nav;
          banner.hidden = false;
          banner.innerHTML = `
            <div class="pfz-compass-card">
              <span class="pfz-compass-icon">🧭</span>
              <div class="pfz-compass-body">
                <strong>Nearest FLC from your GPS location</strong>
                <span>Heading ${nav.bearingDeg}° ${nav.cardinal} · ${nav.distanceNm} NM (${nav.distanceKm} km)</span>
              </div>
              <button type="button" class="pfz-open-compass-btn" onclick="openPfzCompassModal();">🧭 Compass</button>
            </div>
          `;
        }
      }
    },
    err => {
      console.warn('PFZ Geolocation failed:', err.message);
      if (btn) {
        btn.textContent = '📍 Near Me';
        btn.disabled = false;
      }
      alert('Could not retrieve your location. Please check location permissions.');
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

// Locate via Locked Landing Center
async function locateLockedPfzCompass() {
  const locked = getLockedLandingCenter();
  if (!locked) return;

  selectLandingCenterInUi(locked.name, locked.sectorName);

  let lcLat = null;
  let lcLon = null;
  const firstMsg = locked.messages?.[0];
  if (firstMsg) {
    lcLat = parseDmsCoordinate(firstMsg.latitude);
    lcLon = parseDmsCoordinate(firstMsg.longitude);
  }

  if (lcLat == null || lcLon == null) {
    const geojson = await loadPfzLandingCentresData();
    const feat = geojson?.features?.find(f => f.properties?.LC_NAME?.toLowerCase() === locked.name.toLowerCase());
    if (feat) {
      lcLon = feat.geometry.coordinates[0];
      lcLat = feat.geometry.coordinates[1];
    }
  }

  let nav = null;
  if (lcLat != null && lcLon != null) {
    nav = await findClosestPfzNavigationalTarget(lcLat, lcLon);
  }

  if (firstMsg && firstMsg.bearing && firstMsg.distance) {
    const bearingVal = parseFloat(firstMsg.bearing) || (nav ? nav.bearingDeg : 0);
    const distVal = parseFloat(firstMsg.distance) || (nav ? parseFloat(nav.distanceKm) : 0);
    const distNm = (distVal * 0.539957).toFixed(1);

    openPfzCompassModal({
      sourceLabel: `Nearest PFZ line from ${titleCase(locked.name)}`,
      targetSector: titleCase(locked.sectorName),
      targetLat: lcLat,
      targetLon: lcLon,
      targetPoint: (lcLat != null && lcLon != null) ? { lat: lcLat, lon: lcLon } : null,
      bearingDeg: Math.round(bearingVal),
      cardinal: getCardinalFromDegrees(bearingVal),
      distanceKm: distVal.toFixed(1),
      distanceNm: distNm,
      depth: firstMsg.depth || '',
      direction: firstMsg.direction || '',
      flcName: locked.name
    });
  } else if (nav) {
    nav.sourceLabel = `Nearest PFZ line from ${titleCase(locked.name)}`;
    nav.flcName = locked.name;
    openPfzCompassModal(nav);
  }
}

// Device Geolocation Tracking for Live Distance to PFZ Point
var deviceGpsWatchId = null;
var latestUserDeviceLocation = null;

function recalculateCompassDistanceToTarget(userLat, userLon) {
  if (!currentPfzNavTarget) return;

  const targetLat = currentPfzNavTarget.targetLat != null ? currentPfzNavTarget.targetLat : currentPfzNavTarget.targetPoint?.lat;
  const targetLon = currentPfzNavTarget.targetLon != null ? currentPfzNavTarget.targetLon : currentPfzNavTarget.targetPoint?.lon;

  if (targetLat != null && targetLon != null) {
    const distKm = calculateHaversineDistance(userLat, userLon, targetLat, targetLon);
    const distNm = (distKm * 0.539957).toFixed(1);
    const bearing = calculateCompassBearing(userLat, userLon, targetLat, targetLon);

    currentPfzNavTarget.distanceKm = distKm.toFixed(1);
    currentPfzNavTarget.distanceNm = distNm;
    currentPfzNavTarget.bearingDeg = bearing.deg;
    currentPfzNavTarget.cardinal = bearing.cardinal;
    targetCompassBearing = bearing.deg;

    const distEl = ids('compassTargetDist');
    const bearingEl = ids('compassTargetBearing');
    if (distEl) distEl.textContent = distNm + ' NM (' + distKm.toFixed(1) + ' km)';
    if (bearingEl) bearingEl.textContent = bearing.deg + '° ' + bearing.cardinal;

    updateCompassDialUi(currentDeviceHeading);
  }
}

function startDeviceLocationTracking() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    position => {
      latestUserDeviceLocation = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };
      recalculateCompassDistanceToTarget(latestUserDeviceLocation.lat, latestUserDeviceLocation.lon);
    },
    err => {
      console.warn('Compass device geolocation error:', err?.message);
    },
    { timeout: 10000, enableHighAccuracy: true }
  );

  if (deviceGpsWatchId === null) {
    deviceGpsWatchId = navigator.geolocation.watchPosition(
      position => {
        latestUserDeviceLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };
        recalculateCompassDistanceToTarget(latestUserDeviceLocation.lat, latestUserDeviceLocation.lon);
      },
      err => {
        console.warn('Compass device GPS watch error:', err?.message);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
  }
}

function stopDeviceLocationTracking() {
  if (deviceGpsWatchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(deviceGpsWatchId);
    deviceGpsWatchId = null;
  }
}

// Live Digital Nautical Compass Dial Engine
function openPfzCompassModal(customTarget = null) {
  const target = customTarget || currentPfzNavTarget;
  if (!target) {
    locateUserPfzCompass();
    return;
  }

  currentPfzNavTarget = target;
  targetCompassBearing = target.bearingDeg || 0;

  const dialog = ids('pfzCompassModal');
  if (!dialog) return;

  if (ids('compassTargetTitle')) ids('compassTargetTitle').textContent = target.sourceLabel || 'Nearest FLC from your GPS location';
  if (ids('compassTargetBearing')) ids('compassTargetBearing').textContent = target.bearingDeg + '° ' + (target.cardinal || getCardinalFromDegrees(target.bearingDeg));
  if (ids('compassTargetDist')) ids('compassTargetDist').textContent = target.distanceNm + ' NM (' + target.distanceKm + ' km)';
  if (ids('compassSectorName')) ids('compassSectorName').textContent = target.targetSector ? titleCase(target.targetSector) : 'Active Sector';

  startDeviceCompassSensors();
  startDeviceLocationTracking();

  if (latestUserDeviceLocation) {
    recalculateCompassDistanceToTarget(latestUserDeviceLocation.lat, latestUserDeviceLocation.lon);
  }

  dialog.showModal();
}

function startDeviceCompassSensors() {
  if (deviceCompassActive) return;
  deviceCompassActive = true;

  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    // iOS 13+ permission request
    DeviceOrientationEvent.requestPermission().then(state => {
      if (state === 'granted') {
        window.addEventListener('deviceorientation', handleDeviceOrientation, true);
      }
    }).catch(() => {});
  } else {
    // Android / Chrome / Standard
    if ('ondeviceorientationabsolute' in window) {
      window.addEventListener('deviceorientationabsolute', handleDeviceOrientation, true);
    } else if ('ondeviceorientation' in window) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    }
  }

  updateCompassDialUi(0);
}

function stopDeviceCompassSensors() {
  deviceCompassActive = false;
  window.removeEventListener('deviceorientationabsolute', handleDeviceOrientation, true);
  window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
  stopDeviceLocationTracking();
}

function handleDeviceOrientation(event) {
  let heading = 0;
  if (event.webkitCompassHeading != null) {
    // iOS webkit compass heading (0 = North, 90 = East)
    heading = event.webkitCompassHeading;
  } else if (event.alpha != null) {
    // Android / standard alpha
    heading = (360 - event.alpha) % 360;
  }

  currentDeviceHeading = Math.round(heading);
  updateCompassDialUi(currentDeviceHeading);
}

function updateCompassDialUi(headingDeg) {
  const dial = ids('compassRoseDial');
  const targetPointer = ids('compassTargetPointer');
  const shipHeadingText = ids('compassShipHeading');
  const steerAdviceText = ids('compassSteerAdvice');

  if (dial) {
    dial.style.transform = 'rotate(' + (-headingDeg) + 'deg)';
  }

  // Target pointer points relative to vessel head: (targetBearing - headingDeg)
  const relativeAngle = ((targetCompassBearing - headingDeg) + 360) % 360;
  if (targetPointer) {
    targetPointer.style.transform = 'rotate(' + relativeAngle + 'deg)';
  }

  if (shipHeadingText) {
    shipHeadingText.textContent = headingDeg + '° ' + getCardinalFromDegrees(headingDeg);
  }

  if (steerAdviceText) {
    let diff = (targetCompassBearing - headingDeg + 360) % 360;
    if (diff > 180) diff -= 360; // -180 to +180

    if (Math.abs(diff) <= 3) {
      steerAdviceText.className = 'steer-badge on-course';
      steerAdviceText.textContent = '🎯 ON COURSE';
    } else if (diff > 0) {
      steerAdviceText.className = 'steer-badge steer-starboard';
      steerAdviceText.textContent = '🟢 STEER ' + Math.round(diff) + '° STARBOARD (RIGHT)';
    } else {
      steerAdviceText.className = 'steer-badge steer-port';
      steerAdviceText.textContent = '🔴 STEER ' + Math.round(Math.abs(diff)) + '° PORT (LEFT)';
    }
  }
}

function initPfzControls() {
  const btn = ids('pfzGpsBtn');
  if (btn) {
    btn.addEventListener('click', locateUserPfzCompass);
  }

  const modal = ids('pfzCompassModal');
  if (modal) {
    modal.addEventListener('close', () => {
      stopDeviceCompassSensors();
    });
  }

  const manualSlider = ids('compassManualSlider');
  if (manualSlider) {
    manualSlider.addEventListener('input', () => {
      updateCompassDialUi(parseInt(manualSlider.value, 10));
    });
  }
}
