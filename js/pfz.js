const PFZ_SECTOR_NAMES = ['Gujarat','Maharashtra','Goa','Karnataka','Kerala','South Tamil Nadu','North Tamil Nadu','South Andhra Pradesh','North Andhra Pradesh','Odisha','West Bengal','Andaman','Nicobar','Lakshadweep'];
    function renderPfzSectors(values) {
      const el = ids('pfzStates');
      ids('pfzDetails').hidden = true;
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
      el.replaceChildren(...sectors.map(value => {
        const sector = typeof value === 'string' ? {name:value,landingCenters:[]} : value;
        const hasForecast = sector.hasForecast !== false && Boolean(sector.landingCenters?.length);
        const chip = document.createElement('button');
        chip.type = 'button'; chip.className = `tag pfz-chip${hasForecast ? '' : ' no-forecast'}`; chip.setAttribute('aria-expanded','false');
        chip.textContent = `${titleCase(sector.name)}(${sector.landingCenters?.length || 0})`;
        chip.addEventListener('click',() => {
          el.querySelectorAll('.pfz-chip').forEach(item => item.setAttribute('aria-expanded',String(item === chip)));
          renderPfzLandingCenters(sector);
        });
        return chip;
      }));
    }
    function renderPfzLandingCenters(sector) {
      const details = ids('pfzDetails');
      const centers = sector.landingCenters || [];
      const detailsTitle = ids('pfzDetailsTitle');
      const inlineMessage = ids('pfzInlineMessage');
      detailsTitle.textContent = centers.length ? `${titleCase(sector.name)} landing centers` : '';
      detailsTitle.hidden = !centers.length;
      inlineMessage.textContent = centers.length ? '' : `${titleCase(sector.name)} — ${sector.message || 'No forecast is available for this sector in the latest fetched PFZ data.'}`;
      inlineMessage.hidden = Boolean(centers.length);
      ids('pfzMessages').replaceChildren();
      ids('pfzLandingCenters').replaceChildren(...centers.map(center => {
        const chip = document.createElement('button');
        const messageCount = center.messages?.length || 0;
        chip.type = 'button'; chip.className = 'tag landing-chip';
        chip.textContent = `${titleCase(center.name)}${messageCount > 1 ? `(${messageCount})` : ''}`;
        chip.setAttribute('aria-expanded','false');
        chip.addEventListener('click',() => {
          ids('pfzLandingCenters').querySelectorAll('.landing-chip').forEach(item => item.setAttribute('aria-expanded',String(item === chip)));
          renderPfzMessages(center);
        });
        return chip;
      }));
      if (!centers.length) {
        ids('pfzLandingCenters').replaceChildren();
      }
      details.hidden = false;
    }
    function renderPfzMessages(center) {
      const labels = {direction:'Direction',bearing:'Bearing (deg)',distance:'Distance (km)',depth:'Depth (mtr)',latitude:'Latitude (dms)',longitude:'Longitude (dms)'};
      ids('pfzMessages').replaceChildren(...(center.messages || []).map((message,index) => {
        const panel = document.createElement('details'); panel.className = 'pfz-message'; panel.open = true;
        const summary = document.createElement('summary'); summary.textContent = `Landing Center: ${titleCase(center.name)}${center.messages.length > 1 ? ` — Message ${index + 1}` : ''}`;
        const grid = document.createElement('div'); grid.className = 'pfz-message-grid';
        grid.replaceChildren(...Object.entries(labels).map(([key,label]) => {
          const field = document.createElement('div'); field.className = 'pfz-message-field';
          const heading = document.createElement('strong'); heading.textContent = label;
          const value = document.createElement('span'); value.textContent = message[key] || '—';
          field.append(heading,value); return field;
        }));
        panel.append(summary,grid); return panel;
      }));
    }

// Cache for PFZ lines coordinates
var pfzLinesGeoJsonCache = null;

async function loadPfzLinesCoordinates() {
  if (pfzLinesGeoJsonCache) return pfzLinesGeoJsonCache;
  try {
    const res = await fetch(APP_CONFIG.MAP.PFZ_LINES_URL, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    pfzLinesGeoJsonCache = data;
    return data;
  } catch (err) {
    console.warn('Could not load PFZ lines geojson:', err);
    return null;
  }
}

// Forward Spherical Azimuth (Bearing) from (lat1, lon1) to (lat2, lon2)
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

  const cardinals = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const cardinalIdx = Math.round(bearing / 22.5) % 16;
  return {
    deg: Math.round(bearing),
    cardinal: cardinals[cardinalIdx]
  };
}

// Find closest PFZ line point and calculate Distance in Nautical Miles (NM) & Compass Heading
async function findClosestPfzNavigationalTarget(lat, lon) {
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

  return {
    distanceKm: minDistanceKm.toFixed(1),
    distanceNm: distNm,
    bearingDeg: bearing.deg,
    cardinal: bearing.cardinal,
    targetSector,
    targetPoint
  };
}

// Handler for PFZ GPS Button
function locateUserPfzCompass() {
  const btn = ids('pfzGpsBtn');
  const banner = ids('pfzCompassBanner');
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
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const nav = await findClosestPfzNavigationalTarget(lat, lon);

      if (btn) {
        btn.textContent = `📍 Located (${nav ? `${nav.distanceNm} NM` : 'OK'})`;
        btn.disabled = false;
      }

      if (banner && nav) {
        banner.hidden = false;
        banner.innerHTML = `
          <div class="pfz-compass-card">
            <span class="pfz-compass-icon">🧭</span>
            <div class="pfz-compass-body">
              <strong>Heading ${nav.bearingDeg}° ${nav.cardinal} · ${nav.distanceNm} NM <small>(${nav.distanceKm} km)</small></strong>
              <span>Nearest PFZ fishing line ${nav.targetSector ? `(${nav.targetSector})` : ''} from your GPS location</span>
            </div>
          </div>
        `;
      } else if (banner) {
        banner.hidden = false;
        banner.innerHTML = '<div class="pfz-compass-card"><span>No active PFZ lines found near current coordinates.</span></div>';
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

function initPfzControls() {
  const btn = ids('pfzGpsBtn');
  if (btn) {
    btn.addEventListener('click', locateUserPfzCompass);
  }
}
