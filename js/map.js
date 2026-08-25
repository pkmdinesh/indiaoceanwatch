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
  maxWidth: 440,
  autoPan: true,
  autoPanPaddingTopLeft: [16, 60],
  autoPanPaddingBottomRight: [16, 75]
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

function extractIncoisAdvisoryMetrics(message) {
  if (!message || typeof message !== 'string') return null;
  const msg = message.trim();

  // Wave height range: "2.4 - 2.5 meters" or "2.4 to 2.5 m" or "1.5 m"
  let waveHeight = null;
  const whMatch = msg.match(/(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*(?:meters?|m\b)/i) ||
                  msg.match(/(\d+(?:\.\d+)?)\s*(?:meters?|m\b)\s*height/i) ||
                  msg.match(/height\s*(?:of)?\s*(\d+(?:\.\d+)?)\s*(?:meters?|m\b)/i);
  if (whMatch) {
    if (whMatch[2]) {
      waveHeight = { min: parseFloat(whMatch[1]), max: parseFloat(whMatch[2]), text: `${whMatch[1]}–${whMatch[2]} m` };
    } else {
      waveHeight = { min: parseFloat(whMatch[1]), max: parseFloat(whMatch[1]), text: `${whMatch[1]} m` };
    }
  }

  // Swell wave period: "16.0 - 20.0 sec period" or "16 - 20 s" or "period of 16.0 - 20.0"
  let swellPeriod = null;
  const spMatch = msg.match(/(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*(?:sec(?:onds?)?|s\b)\s*(?:period)?/i) ||
                  msg.match(/period\s*(?:of)?\s*(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*(?:sec(?:onds?)?|s\b)?/i);
  if (spMatch) {
    const minVal = parseFloat(spMatch[1]);
    const maxVal = spMatch[2] ? parseFloat(spMatch[2]) : minVal;
    swellPeriod = { min: minVal, max: maxVal, text: spMatch[2] ? `${spMatch[1]}–${spMatch[2]} s` : `${spMatch[1]} s`, isKallakkadal: maxVal >= 16 };
  }

  // Current speed: "0.4 - 0.6 m/sec" or "0.4 to 0.6 m/s" or "knots"
  let currentSpeed = null;
  const curMatch = msg.match(/(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*(?:m\/sec|m\/s|meter\/sec)/i) ||
                   msg.match(/(\d+(?:\.\d+)?)\s*(?:m\/sec|m\/s)/i);
  if (curMatch) {
    if (curMatch[2]) {
      currentSpeed = { min: parseFloat(curMatch[1]), max: parseFloat(curMatch[2]), text: `${curMatch[1]}–${curMatch[2]} m/s` };
    } else {
      currentSpeed = { min: parseFloat(curMatch[1]), max: parseFloat(curMatch[1]), text: `${curMatch[1]} m/s` };
    }
  }

  // Validity period: "17:30 hours on 23-08-2026 to 23:30 hours on 25-08-2026"
  let validity = null;
  const valMatch = msg.match(/(\d{1,2}:\d{2})\s*hours?\s*on\s*(\d{2}-\d{2}-\d{4})\s*to\s*(\d{1,2}:\d{2})\s*hours?\s*on\s*(\d{2}-\d{2}-\d{4})/i);
  if (valMatch) {
    validity = { start: `${valMatch[2].slice(0,5)} ${valMatch[1]}`, end: `${valMatch[4].slice(0,5)} ${valMatch[3]}` };
  }

  return { waveHeight, swellPeriod, currentSpeed, validity };
}

function osfMessageHtml(service,advisories,group,openLevel=null) {
  const levels = severityOrder.filter(level => advisories.some(advisory => advisory.severity === level));
  if (!levels.length) levels.push('noThreat');
  return levels.map(level => {
    const matched = advisories.filter(advisory => advisory.severity === level);
    const messages = [...new Set(matched.map(advisory => advisory.message).filter(Boolean))];

    // Extract quantitative INCOIS metrics
    const metricsList = messages.map(extractIncoisAdvisoryMetrics).filter(Boolean);
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

    const messageHtml = messages.length ? messages.map(message => `<p>${escapeHtml(message)}</p>`).join('') : '<p>No Threat</p>';
    return `<details class="osf-popup-toggle ${level}"${openLevel === level ? ' open' : ''}><summary><span>${escapeHtml(service)}</span><b>${escapeHtml(severityLabel[level])}</b></summary><div class="osf-popup-toggle-body">${badgesHtml}<small>Issue date: ${escapeHtml(group?.issueDate || '—')}</small>${messageHtml}</div></details>`;
  }).join('');
}

function osfDistrictTooltipHtml(district, state, service, advisories, level) {
  const messages = advisories.map(a => a.message).filter(Boolean);
  const metricsList = messages.map(extractIncoisAdvisoryMetrics).filter(Boolean);
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
  const formatTime = d => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });

  ports.forEach(port => {
    const lat = port.lat;
    const lon = port.lng || port.lon;
    if (typeof lat !== 'number' || typeof lon !== 'number') return;

    let morningStr = '—';
    let eveningStr = '—';

    if (typeof calculateDailyTideEvents === 'function') {
      const { events } = calculateDailyTideEvents(port, now);
      const highTides = (events || []).filter(e => e.type === 'High');
      if (highTides[0]) morningStr = `${formatTime(highTides[0].time)} IST (${highTides[0].height}m)`;
      if (highTides[1]) eveningStr = `${formatTime(highTides[1].time)} IST (${highTides[1].height}m)`;
    }

    const regime = port.range >= 4.0 ? 'Macro-tidal' : port.range >= 2.0 ? 'Meso-tidal' : 'Micro-tidal';

    const iconHtml = `
      <div class="osf-tide-marker" title="${port.name}: ${tideTypeShort}">
        <div class="osf-tide-pin ${moon.tideBadgeClass}">🌊</div>
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
          <strong>🌊 ${escapeHtml(port.name)} Port</strong>
          <span class="osf-tide-state">${escapeHtml(port.state)}</span>
        </div>
        <div class="osf-tide-grid">
          <div class="osf-tide-row"><span>Morning High Tide:</span> <strong>${morningStr}</strong></div>
          <div class="osf-tide-row"><span>Evening High Tide:</span> <strong>${eveningStr}</strong></div>
          <div class="osf-tide-row"><span>Tidal Regime:</span> <span>${regime} (MHWS ~${port.range}m)</span></div>
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
      const sections = services.map(entry => osfMessageHtml(entry.service,entry.advisories,entry.group,entry.advisories.some(advisory => advisory.severity === level) ? level : null)).join('');
      polygon.setStyle({...OSF_POLYGON_BORDER,color:'#111',weight:.5,opacity:1,fillColor:OSF_SEVERITY_COLORS[level],fillOpacity:1});
      polygon.bindPopup(`<div class="osf-popup"><strong>${escapeHtml(titleCase(polygon.feature.properties.District))} · ${escapeHtml(titleCase(polygon.feature.properties.STATE))}</strong><p><b>Cumulative status:</b> ${escapeHtml(severityLabel[level])}</p>${sections}</div>`,OSF_POPUP_OPTIONS);
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
    return;
  }
  if (!osfServiceLayers[event.name]) return;
  if (event.type === 'overlayadd') osfSelectedServices.add(event.name);
  else if (event.type === 'overlayremove') osfSelectedServices.delete(event.name);
  updateOsfComposite();
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
        polygon.bindPopup(`<div class="osf-popup"><strong>${escapeHtml(titleCase(feature.properties.District))} · ${escapeHtml(titleCase(feature.properties.STATE))}</strong>${osfMessageHtml(service,advisories,group,level)}</div>`,OSF_POPUP_OPTIONS);
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
      const sections = item.services.map(entry => osfMessageHtml(entry.service,entry.advisories,entry.group,entry.advisories.some(advisory => advisory.severity === level) ? level : null)).join('');
      polygon._osfServices = item.services;
      polygon.bindPopup(`<div class="osf-popup"><strong>${escapeHtml(titleCase(polygon.feature.properties.District))} · ${escapeHtml(titleCase(polygon.feature.properties.STATE))}</strong><p><b>Cumulative status:</b> ${escapeHtml(severityLabel[level])}</p>${sections}</div>`,OSF_POPUP_OPTIONS);
      if (level !== 'noThreat') {
        polygon.bindTooltip(osfDistrictTooltipHtml(feature.properties.District, feature.properties.STATE, 'Cumulative', allAdvisories, level), { sticky: true, className: 'osf-district-tooltip' });
      }
    }
  });

  // Add Tidal Phase & High Tide Overlay
  osfTidalLayer = createOsfTidalStationLayer();

  Object.entries(osfServiceLayers).forEach(([service,layer]) => {
    if (!osfRequestedService || osfRequestedService === service) {
      layer.addTo(osfMap);
      osfSelectedServices.add(service);
    }
  });

  const osfOverlays = {
    ...osfServiceLayers,
    'Tidal Phase & High Tide': osfTidalLayer
  };

  osfLayerControl = L.control.layers(null,osfOverlays,{collapsed:innerWidth < 700,position:'topright'}).addTo(osfMap);
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
  osfLayerControl = L.control.layers(null,overlays,{collapsed:innerWidth < 700,position:'topright'}).addTo(osfMap);
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
    osfMap.on('popupopen', () => {
      const banner = ids('osfTideBanner');
      if (banner) banner.classList.add('is-dimmed');
    });
    osfMap.on('popupclose', () => {
      const banner = ids('osfTideBanner');
      if (banner) banner.classList.remove('is-dimmed');
    });
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
