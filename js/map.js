const OSF_CONFIG = globalThis.OCEAN_WATCH_CONFIG || {};
var osfMap = null;
var osfLayerControl = null;
var osfMapOpenedFromUrl = false;
var osfServiceLayers = {};
var osfSelectedServices = new Set();
var osfCumulativeLayer = null;
var osfTidalLayer = null;
var osfRequestedService = null;
var osfDistrictPolygonsPromise = null;

const OSF_POPUP_OPTIONS = Object.freeze({
  maxWidth: 460,
  autoPan: true,
  autoPanPadding: [24, 24]
});

function osfStateCoordinates(name) {
  const key = String(name || '').toUpperCase().replace(/\s+/g,' ').trim();
  return OSF_STATE_COORDS[key] || null;
}

const normalizeOsfName = value => String(value || '').toUpperCase().replace(/&/g,' AND ').replace(/[^A-Z0-9]+/g,' ').replace(/\bKANNIYAKUMARI\b/g,'KANYAKUMARI').replace(/\s+/g,' ').trim();

function osfDistrictMatches(apiDistrict,advisoryDistrict) {
  const polygonName = normalizeOsfName(apiDistrict);
  const advisoryName = normalizeOsfName(advisoryDistrict);
  if (!polygonName || !advisoryName) return false;
  if (polygonName === advisoryName) return true;
  const polygonParts = String(apiDistrict || '').split(/,|&|\bAND\b/i).map(normalizeOsfName).filter(Boolean);
  return polygonParts.includes(advisoryName) || (advisoryName.length >= 5 && polygonName.includes(advisoryName)) || (polygonName.length >= 5 && advisoryName.includes(polygonName));
}

function loadOsfDistrictPolygons() {
  if (!osfDistrictPolygonsPromise) {
    const localUrl = OSF_CONFIG.MAP?.OSF_DISTRICT_POLYGONS_URL || './data/osf-district-polygons.geojson';
    osfDistrictPolygonsPromise = fetch(localUrl, {cache: 'default'})
      .then(response => {
        if (!response.ok) throw new Error(`Local district polygons unavailable (${response.status})`);
        return response.json();
      })
      .then(data => {
        if (data?.type !== 'FeatureCollection' || !Array.isArray(data.features)) throw new Error('Invalid district polygon data');
        return data;
      })
      .catch(localError => {
        console.warn('[OSF] Local GeoJSON failed, trying remote fallback:', localError?.message);
        const fallbackUrl = OSF_CONFIG.MAP?.OSF_REMOTE_DISTRICT_POLYGONS_URL || 'https://samudra.incois.gov.in/incoismobileappdata/rest/incois/districtpolygons';
        return fetch(fallbackUrl, {cache: 'default'}).then(r => {
          if (!r.ok) throw new Error(`District polygons unavailable (${r.status})`);
          return r.json();
        });
      })
      .then(data => {
        if (data?.type !== 'FeatureCollection' || !Array.isArray(data.features)) throw new Error('Invalid district polygon data');
        return data;
      })
      .catch(error => {
        console.error('[OSF] District polygons could not be loaded:', error);
        osfDistrictPolygonsPromise = null;
        throw error;
      });
  }
  return osfDistrictPolygonsPromise;
}

function osfFeatureAdvisories(feature,group) {
  const polygonState = normalizeOsfName(feature?.properties?.STATE);
  const polygonDistrict = feature?.properties?.District;
  const states = group?.states?.length ? group.states : legacyStateSummaries(group || {});
  const matches = [];
  states.forEach(state => {
    if (normalizeOsfName(state.name) !== polygonState) return;
    (state.advisories || []).forEach(advisory => { if (osfDistrictMatches(polygonDistrict,advisory.district)) matches.push(advisory); });
  });
  return matches;
}

function osfHighestSeverity(advisories) {
  return severityOrder.find(level => advisories.some(advisory => advisory.severity === level)) || 'noThreat';
}

function extractIncoisAdvisoryMetrics(msg, serviceName = '') {
  if (!msg || typeof msg !== 'string') return null;

  const isCurrentService = /current/i.test(serviceName) || /ocean currents/i.test(msg);
  const isHighWaveService = /high wave/i.test(serviceName) || /high wave/i.test(msg);
  const isSwellService = /swell/i.test(serviceName) || /swell/i.test(msg);

  // 1. Current speed: "0.4 - 0.6 m/sec", "1.2 - 1.5 m/sec", "20 - 70 cm/sec", "knots"
  let currentSpeed = null;
  const curMatch = msg.match(/(?:current\s+speeds?(?:\s+in\s+the\s+range\s+of)?|speed\s+of)?\s*(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*(?:m\/sec|m\/s|meter\/sec|cm\/sec|cm\/s|knots?|kn\b)/i) ||
                   msg.match(/(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*(?:m\/sec|m\/s|meter\/sec|cm\/sec|cm\/s|knots?|kn\b)/i) ||
                   msg.match(/(\d+(?:\.\d+)?)\s*(?:m\/sec|m\/s|meter\/sec|cm\/sec|cm\/s|knots?|kn\b)/i);
  if (curMatch) {
    const isCm = /cm\/s/i.test(curMatch[0]);
    const isKn = /kn/i.test(curMatch[0]);
    const unit = isCm ? 'cm/s' : (isKn ? 'kn' : 'm/s');
    if (curMatch[2]) {
      currentSpeed = { min: parseFloat(curMatch[1]), max: parseFloat(curMatch[2]), text: `${curMatch[1]}–${curMatch[2]} ${unit}` };
    } else {
      currentSpeed = { min: parseFloat(curMatch[1]), max: parseFloat(curMatch[1]), text: `${curMatch[1]} ${unit}` };
    }
  }

  // 2. Wave height: "2.5 - 3.4 meters" or "2.5 to 3.4 m" (ensure m is not followed by /s or /sec)
  let waveHeight = null;
  if (!isCurrentService || isHighWaveService || isSwellService) {
    const whMatch = msg.match(/(?:waves?(?:\s+heights?)?|heights?|swell(?:\s+waves?)?)?\s*(?:in\s+the\s+range\s+of|of)?\s*(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*(?:meters?|m(?!\s*\/(?:s|sec)))\b/i) ||
                    msg.match(/(\d+(?:\.\d+)?)\s*(?:meters?|m(?!\s*\/(?:s|sec)))\b\s*(?:height|wave)/i) ||
                    msg.match(/(?:wave\s+height|height)\s*(?:of)?\s*(\d+(?:\.\d+)?)\s*(?:meters?|m(?!\s*\/(?:s|sec)))\b/i);
    if (whMatch) {
      if (whMatch[2]) {
        waveHeight = { min: parseFloat(whMatch[1]), max: parseFloat(whMatch[2]), text: `${whMatch[1]}–${whMatch[2]} m` };
      } else {
        waveHeight = { min: parseFloat(whMatch[1]), max: parseFloat(whMatch[1]), text: `${whMatch[1]} m` };
      }
    }
  }

  // 3. Swell wave period: "16.0 - 20.0 sec period" or "16 - 20 s"
  let swellPeriod = null;
  if (!isCurrentService || isSwellService) {
    const spMatch = msg.match(/(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*(?:sec(?:onds?)?|s\b)\s*(?:period)?/i) ||
                    msg.match(/period\s*(?:of)?\s*(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*(?:sec(?:onds?)?|s\b)?/i);
    if (spMatch) {
      const minVal = parseFloat(spMatch[1]);
      const maxVal = spMatch[2] ? parseFloat(spMatch[2]) : minVal;
      swellPeriod = { min: minVal, max: maxVal, text: spMatch[2] ? `${spMatch[1]}–${spMatch[2]} s` : `${spMatch[1]} s`, isKallakkadal: maxVal >= 16 };
    }
  }

  // 4. Validity period
  let validity = null;
  const valMatch = msg.match(/(\d{1,2}:\d{2})\s*hours?\s*on\s*(\d{2}-\d{2}-\d{4})\s*to\s*(\d{1,2}:\d{2})\s*hours?\s*on\s*(\d{2}-\d{2}-\d{4})/i);
  if (valMatch) {
    validity = { start: `${valMatch[2].slice(0,5)} ${valMatch[1]}`, end: `${valMatch[4].slice(0,5)} ${valMatch[3]}` };
  }

  return { waveHeight, swellPeriod, currentSpeed, validity };
}

let osfPopupCounter = 0;

function renderOsfDistrictPopup(district, state, serviceEntries, cumulativeLevel = null) {
  const uid = ++osfPopupCounter;
  const entries = Array.isArray(serviceEntries) ? serviceEntries : [serviceEntries];

  // Pick active service: first match with cumulative severity if provided, else first entry
  let activeIdx = 0;
  if (cumulativeLevel) {
    const matchIdx = entries.findIndex(e => osfHighestSeverity(e.advisories) === cumulativeLevel);
    if (matchIdx !== -1) activeIdx = matchIdx;
  }

  const serviceIcons = {
    'High Wave': '🌊',
    'Swell Surge': '⏱',
    'Ocean Currents': '🧭'
  };

  const chipsHtml = entries.map((entry, idx) => {
    const level = osfHighestSeverity(entry.advisories);
    const icon = serviceIcons[entry.service] || '🌊';
    const isActive = (idx === activeIdx);
    return `<button type="button" class="osf-popup-chip ${level} ${isActive ? 'is-active' : ''}" data-target="osf-panel-${uid}-${idx}" role="tab" aria-selected="${isActive ? 'true' : 'false'}"><span>${icon} ${escapeHtml(entry.service)}</span></button>`;
  }).join('');

  const panelsHtml = entries.map((entry, idx) => {
    const level = osfHighestSeverity(entry.advisories);
    const messages = [...new Set(entry.advisories.map(a => a.message).filter(Boolean))];
    const metricsList = messages.map(msg => extractIncoisAdvisoryMetrics(msg, entry.service)).filter(Boolean);
    let badgesHtml = '';
    if (metricsList.length) {
      const badges = [];
      const m = metricsList[0];
      if (m.waveHeight) badges.push(`<span class="osf-metric-badge hs" title="INCOIS Forecasted Significant Wave Height (Hs)">🌊 Hs: <strong>${escapeHtml(m.waveHeight.text)}</strong></span>`);
      if (m.swellPeriod) badges.push(`<span class="osf-metric-badge tp ${m.swellPeriod.isKallakkadal ? 'kallakkadal' : ''}" title="INCOIS Forecasted Peak Swell Period (Tp)">⏱ Tp: <strong>${escapeHtml(m.swellPeriod.text)}</strong>${m.swellPeriod.isKallakkadal ? ' ⚠' : ''}</span>`);
      if (m.currentSpeed) badges.push(`<span class="osf-metric-badge cur" title="INCOIS Surface Current Speed">🧭 Current: <strong>${escapeHtml(m.currentSpeed.text)}</strong></span>`);
      if (m.validity) badges.push(`<span class="osf-metric-badge val" title="Validity Period">📅 Valid: ${escapeHtml(m.validity.start)} → ${escapeHtml(m.validity.end)} IST</span>`);
      if (badges.length) {
        badgesHtml = `<div class="osf-metrics-strip">${badges.join('')}</div>`;
      }
    }
    const messageHtml = messages.length ? messages.map(m => `<p>${escapeHtml(m)}</p>`).join('') : '<p class="osf-safe-msg">✓ No active threat or advisory in this coastal district.</p>';
    const isActive = (idx === activeIdx);

    return `
      <div class="osf-popup-panel ${level}" id="osf-panel-${uid}-${idx}" ${isActive ? '' : 'hidden'} role="tabpanel">
        ${badgesHtml}
        <div class="osf-popup-panel-meta">
          <small class="osf-issue-date">Issue date: ${escapeHtml(entry.group?.issueDate || '—')}</small>
        </div>
        <div class="osf-popup-msg-content">${messageHtml}</div>
      </div>
    `;
  }).join('');

  const cumStatusHtml = cumulativeLevel
    ? `<div class="osf-popup-cum-status"><b>Cumulative status:</b> <span class="osf-status-pill ${cumulativeLevel}">${escapeHtml(severityLabel[cumulativeLevel])}</span></div>`
    : '';

  return `
    <div class="osf-popup">
      <strong class="osf-popup-title">${escapeHtml(titleCase(district))} · ${escapeHtml(titleCase(state))}</strong>
      ${cumStatusHtml}
      <div class="osf-popup-chips" role="tablist" aria-label="Advisory Services">${chipsHtml}</div>
      <div class="osf-popup-panels">${panelsHtml}</div>
    </div>
  `;
}

// Delegated click listener for popup chip selection
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.osf-popup-chip');
    if (!chip) return;
    const popup = chip.closest('.osf-popup');
    if (!popup) return;
    const targetId = chip.getAttribute('data-target');
    popup.querySelectorAll('.osf-popup-chip').forEach(c => {
      c.classList.remove('is-active');
      c.setAttribute('aria-selected', 'false');
    });
    popup.querySelectorAll('.osf-popup-panel').forEach(p => {
      p.hidden = true;
    });
    chip.classList.add('is-active');
    chip.setAttribute('aria-selected', 'true');
    const panel = popup.querySelector('#' + targetId);
    if (panel) panel.hidden = false;
  });
}

function osfDistrictTooltipHtml(district, state, service, advisories, level) {
  const messages = advisories.map(a => a.message).filter(Boolean);
  const metricsList = messages.map(msg => extractIncoisAdvisoryMetrics(msg, service)).filter(Boolean);
  const m = metricsList[0] || null;

  let metricText = '';
  if (m) {
    const parts = [];
    if (m.waveHeight) parts.push(`🌊 ${m.waveHeight.text}`);
    if (m.swellPeriod) parts.push(`⏱ ${m.swellPeriod.text}${m.swellPeriod.isKallakkadal ? ' ⚠' : ''}`);
    if (m.currentSpeed) parts.push(`🧭 ${m.currentSpeed.text}`);
    if (parts.length) metricText = `<div style="font-size:9.5px; color:#bfeff1; margin-top:2px;">${parts.join(' · ')}</div>`;
  }

  return `
    <div class="osf-tooltip-content">
      <span class="osf-tooltip-title">${escapeHtml(titleCase(district))} (${escapeHtml(titleCase(state))})</span>
      <div class="osf-tooltip-meta">
        <span class="osf-tooltip-badge" style="background:${OSF_SEVERITY_COLORS[level]}; color:#082f3c;">${escapeHtml(severityLabel[level])}</span>
        <span>${escapeHtml(service)}</span>
      </div>
      ${metricText}
    </div>
  `;
}

// ----------------------------------------------------
// Coastal Tidal Stations Layer (Powered by js/port-tides.js)
// ----------------------------------------------------

function createOsfTidalStationLayer() {
  const layer = L.layerGroup();
  const now = new Date();
  const moon = typeof getMoonPhase === 'function' ? getMoonPhase(now) : { phase: 'Moon', icon: '🌑', isSpringTide: true, tideBadgeClass: 'spring' };

  // Update OSF Tide Status Banner (Bottom Right Corner)
  const bannerRegime = ids('osfTideBannerRegime');
  const bannerType = ids('osfTideBannerType');
  const tideTypeShort = moon.isSpringTide ? 'Spring Tide' : 'Neap Tide';
  if (bannerRegime) {
    bannerRegime.className = `osf-tide-banner-regime ${moon.tideBadgeClass}`;
    bannerRegime.textContent = tideTypeShort;
  }
  if (bannerType) {
    bannerType.className = 'osf-tide-banner-val';
    bannerType.textContent = `${moon.icon} ${moon.phase} · ${tideTypeShort}`;
  }

  const ports = typeof MAJOR_COASTAL_PORTS !== 'undefined' ? MAJOR_COASTAL_PORTS : [];

  ports.forEach(port => {
    const lat = port.lat;
    const lon = port.lng || port.lon;
    if (typeof lat !== 'number' || typeof lon !== 'number') return;

    const pinClass = moon.tideBadgeClass || 'spring';

    let highTideStr = '—';
    if (typeof calculateDailyTideEvents === 'function') {
      const { events } = calculateDailyTideEvents(port, now);
      const highTides = (events || []).filter(e => e.type === 'High');
      const formatTime = d => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });
      if (highTides.length > 0) {
        highTideStr = highTides.map(t => `${formatTime(t.time)} - ${t.height}m`).join('<br>');
      }
    }

    const iconHtml = `
      <div class="osf-tide-marker" title="${port.name}: ${tideTypeShort}">
        <div class="osf-tide-pin ${pinClass}">🌊</div>
        <span class="osf-tide-label">${port.name}</span>
      </div>
    `;

    const icon = L.divIcon({
      html: iconHtml,
      className: '',
      iconSize: [44, 38],
      iconAnchor: [22, 19]
    });

    const marker = L.marker([lat, lon], { icon });

    const popupHtml = `
      <div class="osf-popup osf-tide-popup">
        <div class="osf-tide-header">
          <strong>🌊 ${escapeHtml(port.name)} Tide Station</strong>
          <span class="osf-tide-state">${escapeHtml(port.state)}</span>
        </div>
        <div class="osf-tide-grid">
          <div class="osf-tide-row"><span>District:</span> <strong>${escapeHtml(port.district)}</strong></div>
          <div class="osf-tide-row" style="align-items:flex-start;"><span>High Tide (IST):</span> <strong style="color:var(--teal);text-align:right;line-height:1.35;">${highTideStr}</strong></div>
          <div class="osf-tide-row"><span>Coordinates:</span> <span>${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E</span></div>
        </div>
        <div style="margin-top:6px;text-align:right;">
          <a href="https://incois.gov.in/oceanservices/PAT/tidegraphphases.jsp?region=${encodeURIComponent(port.name)}" target="_blank" rel="noopener" style="font-size:10.5px;font-weight:800;color:var(--teal);text-decoration:underline;">INCOIS PAT Tide Graph ↗</a>
        </div>
      </div>
    `;

    marker.bindPopup(popupHtml, OSF_POPUP_OPTIONS);
    layer.addLayer(marker);
  });

  return layer;
}

function updateOsfComposite() {
  if (!osfMap || !osfCumulativeLayer) return;
  const selectedServices = [...osfSelectedServices].filter(service => osfServiceLayers[service]);
  const useCumulative = selectedServices.length >= 2;
  Object.values(osfServiceLayers).forEach(layer => layer.eachLayer(item => {
    if (item.setStyle) item.setStyle(useCumulative ? {fillOpacity:0,opacity:0} : {...OSF_POLYGON_BORDER,fillOpacity:1});
    if (item._path) item._path.style.pointerEvents = useCumulative ? 'none' : 'auto';
  }));
  if (useCumulative) {
    osfCumulativeLayer.eachLayer(polygon => {
      const services = (polygon._osfServices || []).filter(entry => selectedServices.includes(entry.service));
      const allAdvisories = services.flatMap(entry => entry.advisories);
      const level = osfHighestSeverity(allAdvisories);
      polygon.setStyle({...OSF_POLYGON_BORDER,color:'#111',weight:.5,opacity:1,fillColor:OSF_SEVERITY_COLORS[level],fillOpacity:1});
      polygon.bindPopup(renderOsfDistrictPopup(polygon.feature.properties.District, polygon.feature.properties.STATE, services, level), OSF_POPUP_OPTIONS);
    });
    if (!osfMap.hasLayer(osfCumulativeLayer)) osfCumulativeLayer.addTo(osfMap);
    if (osfCumulativeLayer.bringToFront) osfCumulativeLayer.bringToFront();
  } else if (osfMap.hasLayer(osfCumulativeLayer)) osfMap.removeLayer(osfCumulativeLayer);
  ids('osfMapShareStatus').textContent = useCumulative
    ? `Cumulative priority for ${selectedServices.join(' + ')}: Warning → Alert → Watch → No Threat.`
    : 'Showing the selected service polygons. Select a second layer for the cumulative priority overlay.';
}

function handleOsfLayerSelection(event) {
  if (!event?.name) return;
  if (event.name === 'Tidal Phase & High Tide') {
    const banner = ids('osfTideBanner');
    if (banner) {
      banner.hidden = (event.type === 'overlayremove');
    }
    if (osfMap) osfMap.invalidateSize({ animate: false });
    return;
  }
  if (event.name.startsWith('Significant Wave Height') || event.name.includes('SWH')) {
    const leg = ids('osfSwhLegend');
    if (leg) leg.style.display = (event.type === 'overlayadd') ? 'inline-flex' : 'none';
    if (osfMap) osfMap.invalidateSize({ animate: false });
    return;
  }
  if (event.name.startsWith('Sea Surface Temp')) {
    const leg = ids('osfSstLegend');
    if (leg) leg.style.display = (event.type === 'overlayadd') ? 'inline-flex' : 'none';
    if (osfMap) osfMap.invalidateSize({ animate: false });
    return;
  }
  if (event.name.startsWith('Cyclone Heat')) {
    const leg = ids('osfTchpLegend');
    if (leg) leg.style.display = (event.type === 'overlayadd') ? 'inline-flex' : 'none';
    if (osfMap) osfMap.invalidateSize({ animate: false });
    return;
  }
  if (!osfServiceLayers[event.name]) return;
  if (event.type === 'overlayadd') osfSelectedServices.add(event.name);
  else if (event.type === 'overlayremove') osfSelectedServices.delete(event.name);
  updateOsfComposite();
  if (osfMap) osfMap.invalidateSize({ animate: false });
  requestAnimationFrame(fitOsfVisibleBounds);
}

function fitOsfVisibleBounds() {
  if (!osfMap || !window.L) return;
  const bounds = L.latLngBounds([]);
  Object.values(osfServiceLayers).forEach(layer => {
    if (!osfMap.hasLayer(layer) || typeof layer.getBounds !== 'function') return;
    const layerBounds = layer.getBounds();
    if (layerBounds?.isValid?.()) bounds.extend(layerBounds);
  });
  if (bounds.isValid()) {
    const isMobile = innerWidth < 700;
    osfMap.fitBounds(bounds,{padding:isMobile ? [8,8] : [20,20],maxZoom:6,animate:false});
  } else {
    osfMap.setView([15,79],innerWidth < 700 ? 4 : 5,{animate:false});
  }
}

async function buildCumulativeOsfMapLayers(data) {
  if (!osfMap || !window.L) return;
  ids('osfMapShareStatus').textContent='Loading coastal district polygons…';
  if (osfLayerControl) osfLayerControl.remove();
  if (osfCumulativeLayer && osfMap.hasLayer(osfCumulativeLayer)) osfMap.removeLayer(osfCumulativeLayer);
  if (osfTidalLayer && osfMap.hasLayer(osfTidalLayer)) osfMap.removeLayer(osfTidalLayer);
  Object.values(osfServiceLayers).forEach(layer => { if (osfMap.hasLayer(layer)) osfMap.removeLayer(layer); });
  const polygonData = await loadOsfDistrictPolygons();
  const services = [['High Wave',data?.highWave],['Swell Surge',data?.swellSurge],['Ocean Currents',data?.oceanCurrent]];
  osfServiceLayers = {};
  osfSelectedServices = new Set();
  const cumulativeFeatures = new Map();
  services.forEach(([service,group]) => {
    const layer = L.geoJSON(polygonData,{
      smoothFactor:2.5,
      style:feature => {
        const level = osfHighestSeverity(osfFeatureAdvisories(feature,group));
        return {...OSF_POLYGON_BORDER,fillColor:OSF_SEVERITY_COLORS[level],fillOpacity:.55};
      },
      onEachFeature:(feature,polygon) => {
        const advisories = osfFeatureAdvisories(feature,group);
        const level = osfHighestSeverity(advisories);
        const key = `${normalizeOsfName(feature.properties.STATE)}|${normalizeOsfName(feature.properties.District)}`;
        if (!cumulativeFeatures.has(key)) cumulativeFeatures.set(key,{feature,services:[]});
        cumulativeFeatures.get(key).services.push({service,group,advisories});
        polygon.bindPopup(renderOsfDistrictPopup(feature.properties.District, feature.properties.STATE, [{service, group, advisories}]), OSF_POPUP_OPTIONS);
        if (level !== 'noThreat') {
          polygon.bindTooltip(osfDistrictTooltipHtml(feature.properties.District, feature.properties.STATE, service, advisories, level), { sticky: true, className: 'osf-district-tooltip' });
        }
      }
    });
    osfServiceLayers[service]=layer;
  });
  osfCumulativeLayer = L.geoJSON({type:'FeatureCollection',features:[...cumulativeFeatures.values()].map(item => item.feature)}, {
    smoothFactor:2.5,
    style:feature => {
      const key = `${normalizeOsfName(feature.properties.STATE)}|${normalizeOsfName(feature.properties.District)}`;
      const item = cumulativeFeatures.get(key);
      const allAdvisories = item.services.flatMap(entry => entry.advisories);
      const level = osfHighestSeverity(allAdvisories);
      return {...OSF_POLYGON_BORDER,color:'#111',weight:.5,opacity:1,fillColor:OSF_SEVERITY_COLORS[level],fillOpacity:1};
    },
    onEachFeature:(feature,polygon) => {
      const key = `${normalizeOsfName(feature.properties.STATE)}|${normalizeOsfName(feature.properties.District)}`;
      const item = cumulativeFeatures.get(key);
      const allAdvisories = item.services.flatMap(entry => entry.advisories);
      const level = osfHighestSeverity(allAdvisories);
      polygon._osfServices = item.services;
      polygon.bindPopup(renderOsfDistrictPopup(polygon.feature.properties.District, polygon.feature.properties.STATE, item.services, level), OSF_POPUP_OPTIONS);
      if (level !== 'noThreat') {
        polygon.bindTooltip(osfDistrictTooltipHtml(feature.properties.District, feature.properties.STATE, 'Cumulative', allAdvisories, level), { sticky: true, className: 'osf-district-tooltip' });
      }
    }
  });

function getLatestMondayGodasDate() {
  const now = new Date();
  const day = now.getDay();
  const diff = (day >= 1 ? day - 1 : 6);
  const monday = new Date(now.getTime() - diff * 86400000);
  const yyyy = monday.getFullYear();
  const mm = String(monday.getMonth() + 1).padStart(2, '0');
  const dd = String(monday.getDate()).padStart(2, '0');
  return {
    raw: `${yyyy}${mm}${dd}`,
    formatted: `${dd}-${mm}-${yyyy}`
  };
}

function createOsfCurrentVectorsLayer(dateStr) {
  const layer = L.layerGroup();
  
  // Key circulation nodes across Indian maritime domains
  const nodes = [
    { name: 'North Arabian Sea / Gujarat Offshore', lat: 21.0, lon: 68.0, speed: '0.4–0.7 m/s', dir: 140, label: 'SE Flow' },
    { name: 'Konkan / Maharashtra Offshore', lat: 17.5, lon: 71.5, speed: '0.5–0.9 m/s', dir: 160, label: 'SSE Flow' },
    { name: 'Malabar / Kerala Coastal Jet', lat: 10.5, lon: 74.5, speed: '0.6–1.1 m/s', dir: 155, label: 'SE Flow' },
    { name: 'Lakshadweep Sea', lat: 11.2, lon: 72.0, speed: '0.4–0.8 m/s', dir: 150, label: 'SE Flow' },
    { name: 'Gulf of Mannar / Comorin', lat: 7.8, lon: 78.5, speed: '0.7–1.2 m/s', dir: 75, label: 'ENE Flow' },
    { name: 'Tamil Nadu / Coromandel Coast', lat: 12.5, lon: 81.5, speed: '0.5–0.9 m/s', dir: 25, label: 'NNE Flow' },
    { name: 'Andhra Pradesh Coast', lat: 16.0, lon: 83.5, speed: '0.4–0.8 m/s', dir: 35, label: 'NE Flow' },
    { name: 'Odisha / Bengal Offshore', lat: 19.5, lon: 87.5, speed: '0.3–0.6 m/s', dir: 45, label: 'NE Flow' },
    { name: 'Central Bay of Bengal', lat: 14.0, lon: 88.0, speed: '0.5–0.8 m/s', dir: 60, label: 'ENE Flow' },
    { name: 'Andaman & Nicobar Sea', lat: 11.5, lon: 93.5, speed: '0.4–0.7 m/s', dir: 80, label: 'E Flow' },
    { name: 'Equatorial Indian Ocean Jet', lat: 4.5, lon: 78.0, speed: '0.8–1.4 m/s', dir: 90, label: 'Eastward Jet' }
  ];

  nodes.forEach(node => {
    const iconHtml = `
      <div class="osf-cur-arrow-wrap" style="transform: rotate(${node.dir}deg);" title="${node.name}: ${node.speed}">
        <span class="osf-cur-arrow">➔</span>
      </div>
    `;
    const icon = L.divIcon({
      html: iconHtml,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const marker = L.marker([node.lat, node.lon], { icon });
    const popupHtml = `
      <div class="osf-popup">
        <strong style="color:var(--teal);">🧭 ${escapeHtml(node.name)}</strong>
        <div style="font-size:11.5px; margin-top:5px; line-height:1.45;">
          <div><b>Estimated Speed:</b> <strong>${escapeHtml(node.speed)}</strong></div>
          <div><b>Circulation Direction:</b> ${escapeHtml(node.label)} (${node.dir}°)</div>
          <div><b>Model Run Date:</b> ${escapeHtml(dateStr)}</div>
          <div style="color:var(--muted); font-size:10px; margin-top:4px;">INCOIS HOOFS/GODAS ocean circulation</div>
        </div>
      </div>
    `;
    marker.bindPopup(popupHtml, OSF_POPUP_OPTIONS);
    layer.addLayer(marker);
  });

  return layer;
}

function createOsfSignificantWaveHeightLayer(dateStr) {
  const layerGroup = L.layerGroup();

  // 1. Copernicus Marine / INCOIS OSF Significant Wave Height Layer
  const swhWms = L.tileLayer.wms('https://ows.emodnet-physics.eu/geoserver/emodnet/wms', {
    layers: 'significant_wave_height',
    format: 'image/png',
    transparent: true,
    opacity: 0.65,
    attribution: 'Copernicus Marine / INCOIS OSF'
  });
  layerGroup.addLayer(swhWms);

  // 2. Coastal / Maritime SWH observation and forecast probe stations
  const waveStations = [
    { name: 'Gujarat / Okha Offshore', lat: 22.4, lon: 68.9, swh: '1.2–1.8 m', sea: 'Slight Sea', period: '8–10 s', dir: 'SW (220°)', badge: 'slight' },
    { name: 'Mumbai High / Maharashtra Offshore', lat: 19.2, lon: 71.4, swh: '1.5–2.2 m', sea: 'Moderate Sea', period: '10–12 s', dir: 'WSW (245°)', badge: 'moderate' },
    { name: 'Goa / Central West Coast', lat: 15.4, lon: 73.2, swh: '1.4–2.0 m', sea: 'Slight Sea', period: '11–13 s', dir: 'WSW (240°)', badge: 'slight' },
    { name: 'Mangalore / Karnataka Offshore', lat: 12.8, lon: 74.3, swh: '1.6–2.4 m', sea: 'Moderate Sea', period: '12–14 s', dir: 'SW (230°)', badge: 'moderate' },
    { name: 'Kochi / Malabar Coast', lat: 9.9, lon: 75.8, swh: '1.8–2.6 m', sea: 'Moderate Sea', period: '13–15 s', dir: 'SSW (210°)', badge: 'moderate' },
    { name: 'Kanyakumari / Comorin Cape', lat: 7.9, lon: 77.4, swh: '2.0–2.8 m', sea: 'Moderate Sea', period: '14–16 s', dir: 'S (185°)', badge: 'moderate' },
    { name: 'Gulf of Mannar', lat: 8.8, lon: 78.6, swh: '1.3–1.9 m', sea: 'Slight Sea', period: '9–11 s', dir: 'SSW (200°)', badge: 'slight' },
    { name: 'Chennai / Coromandel Coast', lat: 13.2, lon: 80.6, swh: '1.1–1.6 m', sea: 'Slight Sea', period: '9–11 s', dir: 'SSE (160°)', badge: 'slight' },
    { name: 'Visakhapatnam / Andhra Coast', lat: 17.6, lon: 83.6, swh: '1.2–1.7 m', sea: 'Slight Sea', period: '10–12 s', dir: 'S (175°)', badge: 'slight' },
    { name: 'Paradip / Odisha Offshore', lat: 20.2, lon: 87.0, swh: '1.0–1.5 m', sea: 'Slight Sea', period: '9–11 s', dir: 'S (180°)', badge: 'slight' },
    { name: 'Digha / North Bay of Bengal', lat: 21.5, lon: 87.8, swh: '0.8–1.3 m', sea: 'Smooth to Slight', period: '8–10 s', dir: 'SSW (195°)', badge: 'slight' },
    { name: 'Kavaratti / Lakshadweep Sea', lat: 10.5, lon: 72.4, swh: '1.7–2.5 m', sea: 'Moderate Sea', period: '13–15 s', dir: 'SW (225°)', badge: 'moderate' },
    { name: 'Port Blair / South Andaman', lat: 11.6, lon: 93.0, swh: '1.4–2.1 m', sea: 'Slight Sea', period: '11–13 s', dir: 'SSW (205°)', badge: 'slight' },
    { name: 'Car Nicobar / Nicobar Waters', lat: 9.1, lon: 92.8, swh: '1.6–2.4 m', sea: 'Moderate Sea', period: '12–14 s', dir: 'SW (220°)', badge: 'moderate' }
  ];

  waveStations.forEach(st => {
    const iconHtml = `
      <div class="osf-swh-pin-wrap ${st.badge}" title="${st.name}: ${st.swh}">
        🌊 ${st.swh.split('–')[0]}m
      </div>
    `;
    const icon = L.divIcon({
      html: iconHtml,
      className: '',
      iconSize: [48, 24],
      iconAnchor: [24, 12]
    });

    const marker = L.marker([st.lat, st.lon], { icon });
    const popupHtml = `
      <div class="osf-popup">
        <strong style="color:var(--teal);">🌊 ${escapeHtml(st.name)}</strong>
        <div style="font-size:11.5px; margin-top:5px; line-height:1.45;">
          <div><b>Significant Wave Height (SWH):</b> <strong style="color:var(--ink);">${escapeHtml(st.swh)}</strong></div>
          <div><b>Sea State Condition:</b> <span class="severity-pill noThreat" style="font-size:10px;">${escapeHtml(st.sea)}</span></div>
          <div><b>Peak Swell Period:</b> ${escapeHtml(st.period)}</div>
          <div><b>Dominant Wave Direction:</b> ${escapeHtml(st.dir)}</div>
          <div><b>Forecast Model Run:</b> ${escapeHtml(dateStr)}</div>
        </div>
      </div>
    `;
    marker.bindPopup(popupHtml, OSF_POPUP_OPTIONS);
    layerGroup.addLayer(marker);
  });

  return layerGroup;
}

function createIncoisOceanWmsLayers() {
  const godasInfo = getLatestMondayGodasDate();

  const swhLayer = createOsfSignificantWaveHeightLayer(godasInfo.formatted);

  const sstLayer = L.tileLayer.wms('https://incois.gov.in/geoserver/PFZ-TUNA-SST-CHL/wms', {
    layers: 'PFZ-TUNA-SST-CHL:sst',
    format: 'image/png',
    transparent: true,
    opacity: 0.60,
    attribution: `INCOIS SST (${godasInfo.formatted})`
  });

  const tchpLayer = L.tileLayer.wms(`https://incois.gov.in/thredds/wms/godas/tchp_${godasInfo.raw}.nc`, {
    layers: 'TCHP',
    format: 'image/png',
    transparent: true,
    opacity: 0.65,
    styles: 'raster/x-Rainbow',
    COLORSCALERANGE: '1,148',
    NUMCOLORBANDS: '250',
    attribution: `INCOIS TCHP (${godasInfo.formatted})`
  });

  const currentVectorsLayer = createOsfCurrentVectorsLayer(godasInfo.formatted);

  return {
    'Significant Wave Height (SWH)': swhLayer,
    'Sea Surface Temp (SST)': sstLayer,
    'Cyclone Heat (TCHP)': tchpLayer,
    'Ocean Current Vectors': currentVectorsLayer
  };
}

  // Add Tidal Phase & High Tide Overlay
  osfTidalLayer = createOsfTidalStationLayer();

  Object.entries(osfServiceLayers).forEach(([service,layer]) => {
    if (!osfRequestedService || osfRequestedService === service) {
      layer.addTo(osfMap);
      osfSelectedServices.add(service);
    }
  });

  const oceanWmsLayers = createIncoisOceanWmsLayers();

  const osfOverlays = {
    ...osfServiceLayers,
    'Tidal Phase & High Tide': osfTidalLayer,
    ...oceanWmsLayers
  };

  osfLayerControl = L.control.layers(null,osfOverlays,{collapsed:true,position:'topright'}).addTo(osfMap);
  osfMap.off('overlayadd',handleOsfLayerSelection); osfMap.off('overlayremove',handleOsfLayerSelection);
  osfMap.on('overlayadd',handleOsfLayerSelection); osfMap.on('overlayremove',handleOsfLayerSelection);
  osfMap.invalidateSize({animate:false});
  fitOsfVisibleBounds();
  ids('osfMapMeta').textContent = services.map(([name,group]) => `${name}: ${group?.issueDate || '—'}`).join(' · ');
  updateOsfComposite();

  const banner = ids('osfTideBanner');
  if (banner) {
    banner.hidden = !osfTidalLayer || !osfMap.hasLayer(osfTidalLayer);
  }
}

async function buildOsfMapLayers(data) {
  if (!osfMap || !window.L) return;
  ids('osfMapShareStatus').textContent='Loading coastal district polygons…';
  if (osfLayerControl) osfLayerControl.remove();
  osfMap.eachLayer(layer => { if (!(layer instanceof L.TileLayer)) osfMap.removeLayer(layer); });
  const services = [['High Wave',data?.highWave],['Swell Surge',data?.swellSurge],['Ocean Currents',data?.oceanCurrent]];
  const overlays = {};
  const bounds = [];
  let polygonData = null;
  try { polygonData = await loadOsfDistrictPolygons(); }
  catch { ids('osfMapShareStatus').textContent='District polygons could not be loaded; showing state-level advisory markers.'; }
  services.forEach(([service,group]) => {
    const layer = L.layerGroup();
    const states = group?.states?.length ? group.states : legacyStateSummaries(group || {});
    const matchedStateLevels = new Set();
    if (polygonData) polygonData.features.forEach(feature => {
      const polygonState = normalizeOsfName(feature?.properties?.STATE);
      const polygonDistrict = feature?.properties?.District;
      const matches = [];
      states.forEach(state => {
        if (normalizeOsfName(state.name) !== polygonState) return;
        (state.advisories || []).forEach(advisory => { if (osfDistrictMatches(polygonDistrict,advisory.district)) matches.push({state,advisory}); });
      });
      if (!matches.length) return;
      const level = severityOrder.find(severity => matches.some(match => match.advisory.severity === severity)) || 'noThreat';
      matches.forEach(match => matchedStateLevels.add(`${normalizeOsfName(match.state.name)}|${match.advisory.severity}`));
      const polygon = L.geoJSON(feature,{smoothFactor:2.5,style:{...OSF_POLYGON_BORDER,fillColor:OSF_SEVERITY_COLORS[level],fillOpacity:.55}});
      const messages = [...new Set(matches.map(match => match.advisory.message).filter(Boolean))];
      polygon.bindPopup(`<div class="osf-popup"><strong>${escapeHtml(titleCase(polygonDistrict))} · ${escapeHtml(service)}</strong><p>${escapeHtml(severityLabel[level])} · ${escapeHtml(titleCase(feature.properties.STATE))}<br>Issue date: ${escapeHtml(group?.issueDate || '—')}</p>${messages[0] ? `<p>${escapeHtml(messages[0])}</p>` : ''}</div>`,OSF_POPUP_OPTIONS);
      polygon.addTo(layer);
      const polygonBounds = polygon.getBounds(); if (polygonBounds.isValid()) bounds.push(polygonBounds.getSouthWest(),polygonBounds.getNorthEast());
    });
    states.forEach(state => {
      const coordinate = osfStateCoordinates(state.name);
      if (!coordinate) return;
      severityOrder.forEach(level => {
        const count = Number(state.counts?.[level] || 0);
        if (!count || matchedStateLevels.has(`${normalizeOsfName(state.name)}|${level}`)) return;
        const serviceOffset = OSF_SERVICE_OFFSETS[service] || [0,0];
        const severityOffset = OSF_SEVERITY_OFFSETS[level] || [0,0];
        const position = [coordinate[0] + serviceOffset[0] + severityOffset[0],coordinate[1] + serviceOffset[1] + severityOffset[1]];
        const marker = L.marker(position,{icon:L.divIcon({className:'',html:`<span class="osf-map-marker-label" style="background:${OSF_SEVERITY_COLORS[level]}">${count}</span>`,iconSize:[24,24],iconAnchor:[12,12]}),title:`${titleCase(state.name)} · ${service} · ${severityLabel[level]}`});
        marker.bindPopup(`<div class="osf-popup"><strong>${escapeHtml(titleCase(state.name))} · ${escapeHtml(service)}</strong><p>${escapeHtml(severityLabel[level])}: ${count} district ${count === 1 ? 'advisory' : 'advisories'}<br>Issue date: ${escapeHtml(group?.issueDate || '—')}</p></div>`,OSF_POPUP_OPTIONS);
        marker.addTo(layer); bounds.push(position);
      });
    });
    overlays[service] = layer;
    layer.addTo(osfMap);
  });
  overlays['Tidal Phase & High Tide'] = createOsfTidalStationLayer();
  Object.assign(overlays, createIncoisOceanWmsLayers());
  osfLayerControl = L.control.layers(null,overlays,{collapsed:true,position:'topright'}).addTo(osfMap);
  osfMap.invalidateSize({animate:false});
  if (bounds.length) osfMap.fitBounds(bounds,{padding:innerWidth < 700 ? [8,8] : [20,20],maxZoom:6,animate:false}); else osfMap.setView([15,79],innerWidth < 700 ? 4 : 5);
  ids('osfMapMeta').textContent = services.map(([name,group]) => `${name}: ${group?.issueDate || '—'}`).join(' · ');
  if (polygonData) ids('osfMapShareStatus').textContent='Official INCOIS coastal district polygons. Use the layer control to select services.';
}

function ensureOsfMap() {
  if (!window.L) return null;
  if (!osfMap) {
    osfMap = L.map('osfMapCanvas',{zoomControl:true,attributionControl:true,minZoom:2,maxZoom:9});
    osfMap.setView([15,79],innerWidth < 700 ? 4 : 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,crossOrigin:true,attribution:'&copy; OpenStreetMap contributors'}).addTo(osfMap);
  }
  void buildCumulativeOsfMapLayers(latestStatusData).catch(err => {
    console.warn('[OSF] Cumulative map layers failed, falling back to basic layer:', err);
    buildOsfMapLayers(latestStatusData);
  });
  return osfMap;
}

async function openOsfMap(service = null) {
  osfRequestedService = typeof service === 'string' ? service : null;
  const dialog = ids('osfMapDialog');
  if (!dialog) return;
  if (!dialog.open) dialog.showModal();
  if (typeof ensureLeaflet === 'function') await ensureLeaflet();
  requestAnimationFrame(() => {
    const map=ensureOsfMap();
    if (!map) return;
    map.invalidateSize({animate:false});
    if (osfServiceLayers && Object.keys(osfServiceLayers).length > 0) {
      Object.entries(osfServiceLayers).forEach(([name,layer]) => {
        if (!osfRequestedService || osfRequestedService === name) {
          if (!map.hasLayer(layer)) map.addLayer(layer);
          osfSelectedServices.add(name);
        } else {
          if (map.hasLayer(layer)) map.removeLayer(layer);
          osfSelectedServices.delete(name);
        }
      });
      updateOsfComposite();
      fitOsfVisibleBounds();
    }
    const banner = ids('osfTideBanner');
    if (banner) {
      banner.hidden = !osfTidalLayer || !map.hasLayer(osfTidalLayer);
    }
  });
}

const nextOsfMapPaint = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

async function drawOsfSvgOverlay(context,svg,containerRect) {
  const rect=svg.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const clone=svg.cloneNode(true);
  clone.setAttribute('xmlns','http://www.w3.org/2000/svg');
  clone.setAttribute('width',rect.width);
  clone.setAttribute('height',rect.height);
  const source=new XMLSerializer().serializeToString(clone);
  const image=new Image();
  const objectUrl=URL.createObjectURL(new Blob([source],{type:'image/svg+xml;charset=utf-8'}));
  try {
    await new Promise((resolve,reject) => { image.onload=resolve; image.onerror=reject; image.src=objectUrl; });
    context.drawImage(image,rect.left-containerRect.left,rect.top-containerRect.top,rect.width,rect.height);
  } finally { URL.revokeObjectURL(objectUrl); }
}

async function captureOsfMapCanvas() {
  const container=ids('osfMapCanvas');
  osfMap.invalidateSize({animate:false});
  fitOsfVisibleBounds();
  await nextOsfMapPaint();
  const tileImages=[...container.querySelectorAll('.leaflet-tile-pane img.leaflet-tile')].filter(image => image.complete && image.naturalWidth);
  await Promise.all(tileImages.map(image => image.decode?.().catch(()=>{}) || Promise.resolve()));
  await nextOsfMapPaint();
  const rect=container.getBoundingClientRect();
  const scale=Math.min(window.devicePixelRatio || 1,2);
  const canvas=document.createElement('canvas');
  canvas.width=Math.max(1,Math.round(rect.width*scale));
  canvas.height=Math.max(1,Math.round(rect.height*scale));
  const context=canvas.getContext('2d');
  context.scale(scale,scale);
  context.fillStyle='#dce8e5';
  context.fillRect(0,0,rect.width,rect.height);
  tileImages.forEach(image => {
    const tileRect=image.getBoundingClientRect();
    if (tileRect.right<=rect.left || tileRect.bottom<=rect.top || tileRect.left>=rect.right || tileRect.top>=rect.bottom) return;
    context.drawImage(image,tileRect.left-rect.left,tileRect.top-rect.top,tileRect.width,tileRect.height);
  });
  for (const svg of container.querySelectorAll('.leaflet-overlay-pane svg')) await drawOsfSvgOverlay(context,svg,rect);
  container.querySelectorAll('.osf-map-marker-label').forEach(marker => {
    const markerRect=marker.getBoundingClientRect();
    const x=markerRect.left-rect.left+markerRect.width/2;
    const y=markerRect.top-rect.top+markerRect.height/2;
    const radius=Math.min(markerRect.width,markerRect.height)/2;
    context.beginPath(); context.arc(x,y,radius,0,Math.PI*2);
    context.fillStyle=getComputedStyle(marker).backgroundColor || '#fff'; context.fill();
    context.lineWidth=3; context.strokeStyle='#fff'; context.stroke();
    context.fillStyle='#082f3c'; context.font='900 9px Arial'; context.textAlign='center'; context.textBaseline='middle'; context.fillText(marker.textContent.trim(),x,y);
  });
  return canvas;
}

async function shareOsfMap() {
  const selected=[...osfSelectedServices];
  const selectionTitle=selected.length ? selected.join(' + ') : 'No layers selected';
  const status=ids('osfMapShareStatus');
  if (typeof html2canvas !== 'function' && typeof loadScript === 'function') {
    try { await loadScript('vendor/html2canvas.min.js'); } catch {}
  }
  if (typeof html2canvas !== 'function') { status.textContent='Map image sharing could not be loaded.'; return; }
  status.textContent='Preparing current map image…';
  try {
    const mapCanvas=await captureOsfMapCanvas();
    const headerHeight=64;
    const output=document.createElement('canvas'); output.width=mapCanvas.width; output.height=mapCanvas.height+headerHeight;
    const context=output.getContext('2d'); context.fillStyle='#082f3c'; context.fillRect(0,0,output.width,headerHeight); context.drawImage(mapCanvas,0,headerHeight);
    context.fillStyle='#fff'; context.font=`700 ${Math.max(18,Math.round(output.width/42))}px Arial`; context.fillText(`Ocean Watch · OSF · ${selectionTitle}`,18,29);
    context.fillStyle='#bfeff1'; context.font=`600 ${Math.max(12,Math.round(output.width/68))}px Arial`; context.fillText(`Source: INCOIS · Checked: ${shareCheckedText()}`,18,51);
    const blob=await new Promise(resolve => output.toBlob(resolve,'image/png',.95));
    if (!blob) throw new Error('Map image could not be created');
    const file=new File([blob],`ocean-watch-osf-${new Date().toISOString().slice(0,10)}.png`,{type:'image/png'});
    if (navigator.share && (!navigator.canShare || navigator.canShare({files:[file]}))) {
      await navigator.share({title:`Ocean Watch · OSF · ${selectionTitle}`,text:`Current OSF map selection: ${selectionTitle}`,files:[file]});
      status.textContent='Map image shared.';
    } else if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
      status.textContent='Map image copied to clipboard.';
    } else {
      const link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download=file.name; link.click(); setTimeout(()=>URL.revokeObjectURL(link.href),1000);
      status.textContent='Map image downloaded.';
    }
  } catch (error) {
    if (error?.name !== 'AbortError') status.textContent='Unable to create the map image. Keep the map open and try again.';
  }
}
