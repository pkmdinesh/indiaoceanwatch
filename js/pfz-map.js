var pfzMap = null;
var pfzLayerControl = null;
var pfzMapOpenedFromUrl = false;
var pfzMapLayers = {};
var pfzSelectedLayers = new Set();
var pfzDataPromise = null;
var pfzSstLegendElement = null;
var pfzSstDataDate = null;
var pfzWindLegendElement = null;
var pfzWindTimelineElement = null;

// Marine Wind Forecast State
var pfzWindDataCache = null;
var pfzWindLayerGroup = null;
var pfzWindIntervalIndex = 0;
var pfzWindPlayTimer = null;
var pfzWindTimeSteps = [];

const PFZ_BATHYMETRY_SLD = '<StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"><NamedLayer><Name>BathymteryImage:gebcobathymtery</Name><UserStyle><FeatureTypeStyle><Rule><RasterSymbolizer><ColorMap type="ramp"><ColorMapEntry color="#081d58" quantity="-6000"/><ColorMapEntry color="#253494" quantity="-4500"/><ColorMapEntry color="#2c7fb8" quantity="-3000"/><ColorMapEntry color="#41b6c4" quantity="-1500"/><ColorMapEntry color="#a1dab4" quantity="-500"/><ColorMapEntry color="#ffffcc" quantity="0"/></ColorMap></RasterSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>';

const PFZ_MAP_DATASETS = Object.freeze({
  'PFZ forecast lines': APP_CONFIG.MAP.PFZ_LINES_URL,
  'PFZ sectors': APP_CONFIG.MAP.PFZ_SECTORS_URL,
  'EEZ boundary': APP_CONFIG.MAP.PFZ_EEZ_URL,
  'Landing centres': APP_CONFIG.MAP.PFZ_LANDING_CENTRES_URL
});

// Representative Marine Wind Grid Coordinates across India's EEZ & Coastal Waters
const PFZ_WIND_GRID_COORDINATES = Object.freeze([
  // Gujarat & North Arabian Sea
  { lat: 22.5, lon: 68.5, label: 'Gulf of Kutch' },
  { lat: 21.0, lon: 69.0, label: 'Porbandar Offshore' },
  { lat: 20.5, lon: 71.0, label: 'Veraval / Diu' },
  { lat: 22.0, lon: 67.5, label: 'North-West Arabian Sea' },
  { lat: 20.0, lon: 68.0, label: 'West Gujarat EEZ' },

  // Maharashtra & Goa
  { lat: 19.5, lon: 71.5, label: 'Mumbai Offshore' },
  { lat: 18.5, lon: 71.5, label: 'Raigad Coast' },
  { lat: 17.5, lon: 72.0, label: 'Ratnagiri Coast' },
  { lat: 16.5, lon: 72.5, label: 'Sindhudurg Coast' },
  { lat: 15.5, lon: 73.0, label: 'Goa Coastal Waters' },
  { lat: 18.0, lon: 70.0, label: 'Central Arabian Sea' },
  { lat: 16.0, lon: 71.0, label: 'Mid Maharashtra EEZ' },

  // Karnataka & Kerala
  { lat: 14.5, lon: 73.5, label: 'Karwar / Uttara Kannada' },
  { lat: 13.5, lon: 74.0, label: 'Mangaluru / Udupi' },
  { lat: 13.0, lon: 72.5, label: 'Karnataka Offshore' },
  { lat: 12.0, lon: 74.5, label: 'Kasaragod / Kannur' },
  { lat: 11.0, lon: 75.0, label: 'Kozhikode Coast' },
  { lat: 10.0, lon: 75.5, label: 'Kochi Coast' },
  { lat: 9.0, lon: 76.0, label: 'Alappuzha Coast' },
  { lat: 8.0, lon: 76.5, label: 'Thiruvananthapuram Coast' },
  { lat: 10.5, lon: 73.5, label: 'Kerala-Lakshadweep Channel' },
  { lat: 8.5, lon: 74.5, label: 'South Arabian Sea' },

  // Lakshadweep Sea
  { lat: 11.0, lon: 72.5, label: 'Amini / Kadmat' },
  { lat: 10.0, lon: 72.0, label: 'Kavaratti / Agatti' },
  { lat: 8.5, lon: 73.0, label: 'Minicoy Waters' },

  // South Tip & Gulf of Mannar
  { lat: 7.5, lon: 77.5, label: 'Kanyakumari / Wadge Bank' },
  { lat: 8.0, lon: 78.5, label: 'Gulf of Mannar' },
  { lat: 9.0, lon: 79.5, label: 'Palk Bay / Rameswaram' },
  { lat: 7.0, lon: 78.0, label: 'Indian Ocean South EEZ' },

  // Tamil Nadu & South Andhra Coast
  { lat: 10.0, lon: 80.5, label: 'Nagapattinam Coast' },
  { lat: 11.5, lon: 80.5, label: 'Cuddalore / Puducherry' },
  { lat: 12.5, lon: 81.0, label: 'Chennai Offshore' },
  { lat: 13.5, lon: 81.0, label: 'North Tamil Nadu Waters' },
  { lat: 11.0, lon: 82.5, label: 'South Bay of Bengal' },
  { lat: 13.0, lon: 83.0, label: 'Chennai Deep Waters' },

  // Andhra Pradesh & Odisha
  { lat: 14.5, lon: 81.0, label: 'Nellore Coast' },
  { lat: 15.5, lon: 81.5, label: 'Prakasam / Bapatla' },
  { lat: 16.5, lon: 82.5, label: 'Kakinada / Godavari Delta' },
  { lat: 17.5, lon: 83.5, label: 'Visakhapatnam Coast' },
  { lat: 18.5, lon: 84.5, label: 'Srikakulam Coast' },
  { lat: 16.0, lon: 84.0, label: 'Central Bay of Bengal' },
  { lat: 18.0, lon: 86.0, label: 'East AP Offshore' },
  { lat: 19.5, lon: 85.5, label: 'Puri / Ganjam Coast' },
  { lat: 20.5, lon: 87.0, label: 'Paradip / Kendrapara' },
  { lat: 19.5, lon: 87.5, label: 'Odisha Offshore' },
  { lat: 20.0, lon: 89.0, label: 'North Bay of Bengal' },

  // West Bengal
  { lat: 21.5, lon: 88.0, label: 'Digha / Sagar Island' },
  { lat: 21.5, lon: 89.0, label: 'Sundarbans Coast' },
  { lat: 21.0, lon: 87.5, label: 'Baleshwar / WB Channel' },

  // Andaman & Nicobar Islands
  { lat: 13.5, lon: 93.0, label: 'North Andaman' },
  { lat: 12.5, lon: 92.5, label: 'Middle Andaman' },
  { lat: 11.5, lon: 93.0, label: 'Port Blair / South Andaman' },
  { lat: 9.0, lon: 93.0, label: 'Car Nicobar' },
  { lat: 7.0, lon: 93.5, label: 'Great Nicobar / Indira Point' },
  { lat: 8.0, lon: 94.0, label: 'Andaman Sea Deep Basin' }
]);

const pfzProperty = (properties,...names) => {
  for (const name of names) if (properties?.[name] != null && String(properties[name]).trim()) return String(properties[name]).trim();
  return '';
};

function loadPfzMapData() {
  if (!pfzDataPromise) {
    pfzDataPromise = Promise.all(Object.entries(PFZ_MAP_DATASETS).map(async ([name,url]) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${name} unavailable (${response.status})`);
      const data = await response.json();
      if (data?.type !== 'FeatureCollection' || !Array.isArray(data.features)) throw new Error(`${name} is invalid`);
      return [name,data];
    })).then(entries => Object.fromEntries(entries)).catch(error => { pfzDataPromise=null; throw error; });
  }
  return pfzDataPromise;
}

function pfzPopup(title,rows=[]) {
  return `<div class="pfz-map-popup"><strong>${escapeHtml(title)}</strong>${rows.filter(Boolean).map(row => `<div>${escapeHtml(row)}</div>`).join('')}</div>`;
}

function pfzDateFromJulian(properties) {
  const year=Number(pfzProperty(properties,'Year'));
  const day=Number(pfzProperty(properties,'Julian_day'));
  if (!Number.isInteger(year) || year < 2000 || year > 2200 || !Number.isInteger(day) || day < 1 || day > 366) return '';
  const date=new Date(Date.UTC(year,0,day));
  return `${String(date.getUTCDate()).padStart(2,'0')}/${String(date.getUTCMonth()+1).padStart(2,'0')}/${date.getUTCFullYear()}`;
}

const PFZ_POPUP_OPTIONS = Object.freeze({
  maxWidth: 320,
  autoPan: true,
  autoPanPaddingTopLeft: [16, 60],
  autoPanPaddingBottomRight: [16, 16]
});

function createPfzVectorLayers(data) {
  const lines = L.geoJSON(data['PFZ forecast lines'],{
    pane:'pfzLinePane',
    smoothFactor:1.5,
    style:{color:'#082f5b',weight:3.6,opacity:1,lineCap:'round',lineJoin:'round'},
    onEachFeature:(feature,layer) => {
      const p=feature.properties || {};
      layer.bindPopup(pfzPopup(pfzProperty(p,'SECTORNAME') || 'PFZ forecast line',[
        pfzDateFromJulian(p) ? `Date: ${pfzDateFromJulian(p)}` : '',
        pfzProperty(p,'UID') ? `Feature ${pfzProperty(p,'UID')}` : ''
      ]), PFZ_POPUP_OPTIONS);
    }
  });
  const sectors = L.geoJSON(data['PFZ sectors'],{
    pane:'pfzSectorPane',
    smoothFactor:2,
    style:{color:'#17868f',weight:1.2,opacity:.9,fillColor:'#76d7df',fillOpacity:.12},
    onEachFeature:(feature,layer) => {
      const p=feature.properties || {};
      layer.bindPopup(pfzPopup(pfzProperty(p,'SECTORNAME') || 'PFZ sector',[pfzProperty(p,'SEC_ID')]), PFZ_POPUP_OPTIONS);
    }
  });
  const eez = L.geoJSON(data['EEZ boundary'],{
    pane:'pfzEezPane',
    smoothFactor:1.5,
    style:{color:'#082f5b',weight:2,opacity:.9,dashArray:'7 5'},
    onEachFeature:(feature,layer) => layer.bindPopup(pfzPopup('India EEZ boundary'), PFZ_POPUP_OPTIONS)
  });
  const landingCentres = L.geoJSON(data['Landing centres'],{
    pane:'pfzCentrePane',
    pointToLayer:(feature,latlng) => L.circleMarker(latlng,{pane:'pfzCentrePane',radius:3.5,color:'#fff',weight:1.2,fillColor:'#ff8c00',fillOpacity:1,className:'pfz-landing-centre-marker'}),
    onEachFeature:(feature,layer) => {
      const p=feature.properties || {};
      layer.bindPopup(pfzPopup(pfzProperty(p,'LC_NAME') || 'Landing centre',[
        pfzProperty(p,'DIST_NAME'),
        pfzProperty(p,'SECTOR_NAM'),
        pfzProperty(p,'FORECAST_D') ? `Forecast: ${pfzProperty(p,'FORECAST_D')}` : '',
        pfzProperty(p,'VALIDITY_D') ? `Valid: ${pfzProperty(p,'VALIDITY_D')}` : ''
      ]), PFZ_POPUP_OPTIONS);
    }
  });
  return {'PFZ forecast lines':lines,'PFZ sectors':sectors,'EEZ boundary':eez,'Landing centres':landingCentres};
}

// ----------------------------------------------------
// Marine Wind Speed & Direction Layer Implementation
// ----------------------------------------------------

async function fetchPfzWindForecastData() {
  if (pfzWindDataCache) return pfzWindDataCache;

  const lats = PFZ_WIND_GRID_COORDINATES.map(p => p.lat).join(',');
  const lons = PFZ_WIND_GRID_COORDINATES.map(p => p.lon).join(',');
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&hourly=wind_speed_10m,wind_direction_10m&wind_speed_unit=kn&timezone=Asia%2FKolkata&forecast_days=3`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Wind API status ${res.status}`);
    const data = await res.json();
    const dataList = Array.isArray(data) ? data : [data];

    if (!dataList.length || !dataList[0].hourly?.time) {
      throw new Error('Invalid wind data structure');
    }

    const times = dataList[0].hourly.time;
    pfzWindTimeSteps = calculateTargetWindSteps(times);
    pfzWindDataCache = dataList;
    return dataList;
  } catch (err) {
    console.warn('Could not fetch Open-Meteo wind forecast:', err);
    return null;
  }
}

function calculateTargetWindSteps(times) {
  if (!times || !times.length) return [];

  const now = new Date();
  const todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
  const tomorrow = new Date(now.getTime() + 86400000);
  const tomorrowStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(tomorrow);

  // 5 interval timings: 08 PM, 05 AM, 11 AM, 04 PM, 08 PM
  const targets = [
    { label: '08 PM', dayLabel: 'Today 08 PM', iso: `${todayStr}T20:00` },
    { label: '05 AM', dayLabel: 'Tomorrow 05 AM', iso: `${tomorrowStr}T05:00` },
    { label: '11 AM', dayLabel: 'Tomorrow 11 AM', iso: `${tomorrowStr}T11:00` },
    { label: '04 PM', dayLabel: 'Tomorrow 04 PM', iso: `${tomorrowStr}T16:00` },
    { label: '08 PM', dayLabel: 'Tomorrow 08 PM', iso: `${tomorrowStr}T20:00` }
  ];

  return targets.map(t => {
    let bestIdx = times.indexOf(t.iso);
    if (bestIdx === -1) {
      bestIdx = times.findIndex(timeStr => timeStr.startsWith(t.iso.slice(0, 13)));
      if (bestIdx === -1) bestIdx = 0;
    }
    return { ...t, hourIndex: bestIdx, actualTime: times[bestIdx] || t.iso };
  });
}

function getWindTier(speedKnots) {
  const spd = Number(speedKnots) || 0;
  if (spd < 10) return { tier: 'calm', color: '#10b981', label: 'Calm / Light (<10 kt)', seaState: 'Smooth Sea' };
  if (spd < 20) return { tier: 'moderate', color: '#f59e0b', label: 'Moderate (10–20 kt)', seaState: 'Moderate Sea' };
  if (spd < 30) return { tier: 'strong', color: '#f97316', label: 'Strong (20–30 kt)', seaState: 'Rough Sea' };
  return { tier: 'gale', color: '#ef4444', label: 'Gale / Extreme (>30 kt)', seaState: 'Very Rough Sea / Squally' };
}

function getCardinalDirection(deg) {
  const cardinals = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const idx = Math.round(((deg % 360) + 360) % 360 / 22.5) % 16;
  return cardinals[idx];
}

function renderPfzWindMarkers(intervalIdx = 0) {
  if (!pfzWindLayerGroup || !pfzWindDataCache || !pfzWindTimeSteps.length) return;

  pfzWindIntervalIndex = Math.max(0, Math.min(intervalIdx, pfzWindTimeSteps.length - 1));
  const step = pfzWindTimeSteps[pfzWindIntervalIndex];
  const hourIdx = step.hourIndex;

  pfzWindLayerGroup.clearLayers();

  pfzWindDataCache.forEach((pointData, i) => {
    const coordMeta = PFZ_WIND_GRID_COORDINATES[i];
    if (!coordMeta) return;

    const spd = pointData.hourly?.wind_speed_10m?.[hourIdx] ?? 0;
    const dir = pointData.hourly?.wind_direction_10m?.[hourIdx] ?? 0;
    const spdKm = (spd * 1.852).toFixed(1);
    const tier = getWindTier(spd);
    const cardinal = getCardinalDirection(dir);

    // Wind direction arrow points in the direction the wind is blowing towards: (dir + 180) % 360
    const arrowAngle = (dir + 180) % 360;

    const iconHtml = `
      <div class="pfz-wind-marker" title="${coordMeta.label}: ${Math.round(spd)} kt ${cardinal}">
        <svg class="pfz-wind-arrow-svg" style="transform: rotate(${arrowAngle}deg);" viewBox="0 0 24 24">
          <path d="M12 2L6 18L12 14L18 18L12 2Z" fill="${tier.color}" stroke="#082f3c" stroke-width="1.4" stroke-linejoin="round"/>
        </svg>
        <span class="pfz-wind-badge pfz-wind-tier-${tier.tier}">${Math.round(spd)} <small>kt</small></span>
      </div>
    `;

    const customIcon = L.divIcon({
      html: iconHtml,
      className: '',
      iconSize: [32, 38],
      iconAnchor: [16, 19]
    });

    const marker = L.marker([coordMeta.lat, coordMeta.lon], {
      icon: customIcon,
      pane: 'pfzLinePane'
    });

    const popupHtml = `
      <div class="pfz-map-popup">
        <strong>💨 ${escapeHtml(coordMeta.label)}</strong>
        <div><strong>Forecast Time:</strong> ${step.dayLabel || step.label} IST</div>
        <div><strong>Wind Speed:</strong> ${Math.round(spd)} Knots (${spdKm} km/h)</div>
        <div><strong>Direction:</strong> ${Math.round(dir)}° (${cardinal})</div>
        <div><strong>Condition:</strong> <span style="color:${tier.color}; font-weight:800;">${tier.seaState}</span></div>
        <div style="font-size:10px; color:#557a83; margin-top:2px;">Coordinates: ${coordMeta.lat.toFixed(1)}°N, ${coordMeta.lon.toFixed(1)}°E</div>
      </div>
    `;

    marker.bindPopup(popupHtml, PFZ_POPUP_OPTIONS);
    pfzWindLayerGroup.addLayer(marker);
  });

  updatePfzWindTimelineUi();
}

function updatePfzWindTimelineUi() {
  if (!pfzWindTimelineElement || !pfzWindTimeSteps.length) return;

  const step = pfzWindTimeSteps[pfzWindIntervalIndex];
  const ticks = pfzWindTimelineElement.querySelectorAll('.pfz-wind-tick');
  ticks.forEach((tick, idx) => {
    tick.classList.toggle('active', idx === pfzWindIntervalIndex);
  });

  const range = pfzWindTimelineElement.querySelector('.pfz-wind-range');
  if (range) range.value = pfzWindIntervalIndex;

  const pill = pfzWindTimelineElement.querySelector('.pfz-wind-active-pill');
  if (pill && step) {
    pill.textContent = step.dayLabel || step.label;
  }
}

function togglePfzWindAnimation() {
  const playBtn = pfzWindTimelineElement?.querySelector('.pfz-wind-play-btn');
  if (pfzWindPlayTimer) {
    clearInterval(pfzWindPlayTimer);
    pfzWindPlayTimer = null;
    if (playBtn) {
      playBtn.innerHTML = '▶';
      playBtn.classList.remove('is-playing');
    }
  } else {
    if (playBtn) {
      playBtn.innerHTML = '⏹';
      playBtn.classList.add('is-playing');
    }
    pfzWindPlayTimer = setInterval(() => {
      const nextIdx = (pfzWindIntervalIndex + 1) % (pfzWindTimeSteps.length || 5);
      renderPfzWindMarkers(nextIdx);
    }, 2000);
  }
}

function createPfzWindTimelineWidget() {
  const container = ids('pfzMapCanvas');
  if (!container) return;

  let widget = ids('pfzWindTimelineWidget');
  if (widget) {
    pfzWindTimelineElement = widget;
    return widget;
  }

  widget = document.createElement('div');
  widget.id = 'pfzWindTimelineWidget';
  widget.className = 'pfz-wind-timeline';
  widget.innerHTML = `
    <div class="pfz-wind-drag-handle" title="Drag to move timeline">⠿</div>
    <button type="button" class="pfz-wind-play-btn" title="Play / Pause interval animation">▶</button>
    <div class="pfz-wind-track-box">
      <input type="range" class="pfz-wind-range" min="0" max="4" value="0" step="1" aria-label="Wind interval">
      <div class="pfz-wind-ticks">
        <span class="pfz-wind-tick active" data-idx="0">08 PM</span>
        <span class="pfz-wind-tick" data-idx="1">05 AM</span>
        <span class="pfz-wind-tick" data-idx="2">11 AM</span>
        <span class="pfz-wind-tick" data-idx="3">04 PM</span>
        <span class="pfz-wind-tick" data-idx="4">08 PM</span>
      </div>
    </div>
    <div class="pfz-wind-active-pill">Today 08 PM</div>
  `;

  // Wire tick clicks
  widget.querySelectorAll('.pfz-wind-tick').forEach((tick, idx) => {
    tick.addEventListener('click', () => {
      if (pfzWindPlayTimer) togglePfzWindAnimation();
      renderPfzWindMarkers(idx);
    });
  });

  const range = widget.querySelector('.pfz-wind-range');
  if (range) {
    range.addEventListener('input', (e) => {
      if (pfzWindPlayTimer) togglePfzWindAnimation();
      renderPfzWindMarkers(parseInt(e.target.value, 10));
    });
  }

  const playBtn = widget.querySelector('.pfz-wind-play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', togglePfzWindAnimation);
  }

  // Movable / Draggable via the drag handle
  makeElementDraggable(widget, widget.querySelector('.pfz-wind-drag-handle'), container);

  container.appendChild(widget);
  pfzWindTimelineElement = widget;
  return widget;
}

function makeElementDraggable(el, handle, boundaryContainer) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  const onStart = (clientX, clientY) => {
    isDragging = true;
    el.classList.add('is-dragging');
    const rect = el.getBoundingClientRect();
    const parentRect = boundaryContainer.getBoundingClientRect();
    startX = clientX;
    startY = clientY;
    initialLeft = rect.left - parentRect.left;
    initialTop = rect.top - parentRect.top;
    el.style.left = `${initialLeft}px`;
    el.style.top = `${initialTop}px`;
    el.style.bottom = 'auto';
  };

  const onMove = (clientX, clientY) => {
    if (!isDragging) return;
    const parentRect = boundaryContainer.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    let newLeft = initialLeft + (clientX - startX);
    let newTop = initialTop + (clientY - startY);

    const maxLeft = parentRect.width - elRect.width - 8;
    const maxTop = parentRect.height - elRect.height - 8;

    newLeft = Math.max(8, Math.min(newLeft, maxLeft));
    newTop = Math.max(8, Math.min(newTop, maxTop));

    el.style.left = `${newLeft}px`;
    el.style.top = `${newTop}px`;
  };

  const onEnd = () => {
    if (isDragging) {
      isDragging = false;
      el.classList.remove('is-dragging');
    }
  };

  // Mouse Events
  handle.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') return;
    onStart(e.clientX, e.clientY);
    const moveHandler = (moveEvent) => onMove(moveEvent.clientX, moveEvent.clientY);
    const upHandler = () => {
      onEnd();
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
    };
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
  });

  // Touch Events
  handle.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'BUTTON') return;
    const touch = e.touches[0];
    onStart(touch.clientX, touch.clientY);
  }, { passive: true });

  handle.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    onMove(touch.clientX, touch.clientY);
    e.preventDefault();
  }, { passive: false });

  handle.addEventListener('touchend', onEnd);
}

var pfzChlorophyllDataDate = null;

function updatePfzMapStatus() {
  const selected=[...pfzSelectedLayers];
  const hasWind = selected.includes('Wind speed & direction');
  const hasSst = selected.includes('SST Anomaly');
  if (pfzSstLegendElement) {
    pfzSstLegendElement.hidden = !hasSst;
    pfzSstLegendElement.style.display = hasSst ? 'block' : 'none';
  }
  if (pfzWindLegendElement) {
    pfzWindLegendElement.hidden = !hasWind;
    pfzWindLegendElement.style.display = hasWind ? 'grid' : 'none';
  }
  if (pfzWindTimelineElement) {
    pfzWindTimelineElement.hidden = !hasWind;
    pfzWindTimelineElement.style.display = hasWind ? 'flex' : 'none';
  }

  const liveLayers=selected.filter(name => ['Bathymetry','SST Anomaly','Chlorophyll-a','Wind speed & direction'].includes(name));
  const sstDateNote=selected.includes('SST Anomaly') && pfzSstDataDate ? ` SST Anomaly date: ${pfzSstDataDate}.` : '';
  const chlDateNote=selected.includes('Chlorophyll-a') && pfzChlorophyllDataDate ? ` Chlorophyll-a date: ${pfzChlorophyllDataDate}.` : '';
  const windDateNote=selected.includes('Wind speed & direction') ? ` Wind model: Today & Tomorrow 12h forecast.` : '';
  const liveNote=liveLayers.length ? ` ${liveLayers.join(', ')} ${liveLayers.length === 1 ? 'is a live overlay' : 'are live overlays'} and ${liveLayers.length === 1 ? 'is' : 'are'} omitted from offline/shared images.${sstDateNote}${chlDateNote}${windDateNote}` : '';
  ids('pfzMapShareStatus').textContent = selected.length
    ? `Showing ${selected.join(' + ')}. Vector layers are cached locally from official INCOIS WFS data.${liveNote}`
    : 'No PFZ layers selected. Use the layer control to enable a layer.';
}

function getRecentIsoDate(daysAgo = 2) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function fitPfzCoastalExtent() {
  if (!pfzMap || !window.L) return;
  const isMobile = innerWidth < 700;
  const preferred = pfzMapLayers['PFZ forecast lines'];
  const bounds = preferred?.getBounds?.();
  if (bounds?.isValid()) {
    pfzMap.fitBounds(bounds, { padding: isMobile ? [8, 8] : [20, 20], maxZoom: 6, animate: false });
  } else {
    pfzMap.setView([15, 79], isMobile ? 4 : 5, { animate: false });
  }
}

async function buildPfzMapLayers() {
  const status=ids('pfzMapShareStatus');
  status.textContent='Loading official INCOIS PFZ and marine wind forecast layers\u2026';
  const data=await loadPfzMapData();
  if (pfzLayerControl) pfzLayerControl.remove();
  Object.values(pfzMapLayers).forEach(layer => { if (pfzMap.hasLayer(layer)) pfzMap.removeLayer(layer); });
  pfzMapLayers=createPfzVectorLayers(data);

  pfzMapLayers.Bathymetry=L.tileLayer.wms(APP_CONFIG.MAP.PFZ_BATHYMETRY_WMS_URL,{
    layers:'BathymteryImage:gebcobathymtery',format:'image/png',transparent:true,version:'1.1.1',sld_body:PFZ_BATHYMETRY_SLD,opacity:.72,attribution:'INCOIS bathymetry'
  });

  const murDate = getRecentIsoDate(2);
  pfzSstDataDate = murDate;
  const murSstUrl = APP_CONFIG.MAP.PFZ_L4_SST_TILE_URL.replace('{date}', murDate);
  pfzMapLayers['SST Anomaly'] = L.tileLayer(murSstUrl, { opacity: .94, maxNativeZoom: 7, maxZoom: 12, crossOrigin: true, className: 'pfz-sst-layer', attribution: `SST anomaly · ${murDate}` });

  const chlDate = getRecentIsoDate(2);
  pfzChlorophyllDataDate = chlDate;
  const chlUrl = APP_CONFIG.MAP.PFZ_CHLOROPHYLL_TILE_URL.replace('{date}', chlDate);
  pfzMapLayers['Chlorophyll-a'] = L.tileLayer(chlUrl, { opacity: .88, maxNativeZoom: 7, maxZoom: 12, crossOrigin: true, className: 'pfz-chlorophyll-layer', attribution: `Chlorophyll-a · ${chlDate}` });

  // Initialize Wind Layer Group & Timeline
  if (!pfzWindLayerGroup) {
    pfzWindLayerGroup = L.layerGroup();
  }
  pfzMapLayers['Wind speed & direction'] = pfzWindLayerGroup;

  // Set default selected layers
  pfzSelectedLayers=new Set(['PFZ forecast lines','EEZ boundary','Wind speed & direction']);
  pfzMapLayers['EEZ boundary'].addTo(pfzMap);
  pfzMapLayers['PFZ forecast lines'].addTo(pfzMap).bringToFront();
  pfzMapLayers['Wind speed & direction'].addTo(pfzMap);

  pfzLayerControl=L.control.layers(null,pfzMapLayers,{collapsed:innerWidth < 700,position:'topright'}).addTo(pfzMap);
  pfzMap.off('overlayadd',handlePfzLayerChange); pfzMap.off('overlayremove',handlePfzLayerChange);
  pfzMap.on('overlayadd',handlePfzLayerChange); pfzMap.on('overlayremove',handlePfzLayerChange);

  createPfzWindTimelineWidget();

  // Fetch Wind Data and render initial 12h forecast
  void fetchPfzWindForecastData().then(windData => {
    if (windData) {
      renderPfzWindMarkers(0);
    }
  });

  const generated=Object.values(data).map(item => new Date(item.generatedAt)).filter(date => !Number.isNaN(date.getTime())).sort((a,b)=>b-a)[0];
  ids('pfzMapMeta').textContent=generated ? `Cached from INCOIS WFS \u00b7 ${generated.toLocaleString('en-IN',{timeZone:'Asia/Kolkata',dateStyle:'medium',timeStyle:'short'})} IST` : 'Cached from official INCOIS WFS layers';
  fitPfzCoastalExtent();
  updatePfzMapStatus();
}

function handlePfzLayerChange(event) {
  if (!event?.name || !pfzMapLayers[event.name]) return;
  if (event.type === 'overlayadd') pfzSelectedLayers.add(event.name);
  else pfzSelectedLayers.delete(event.name);
  updatePfzMapStatus();
}

function ensurePfzMap() {
  if (!window.L) return null;
  if (!pfzMap) {
    pfzMap=L.map('pfzMapCanvas',{zoomControl:true,attributionControl:true,minZoom:3,maxZoom:12,preferCanvas:false}).setView([15,79],innerWidth < 700 ? 4 : 5);
    pfzMap.createPane('pfzSectorPane'); pfzMap.getPane('pfzSectorPane').style.zIndex=410;
    pfzMap.createPane('pfzEezPane'); pfzMap.getPane('pfzEezPane').style.zIndex=420;
    pfzMap.createPane('pfzLinePane'); pfzMap.getPane('pfzLinePane').style.zIndex=450;
    pfzMap.createPane('pfzCentrePane'); pfzMap.getPane('pfzCentrePane').style.zIndex=460;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,crossOrigin:true,attribution:'&copy; OpenStreetMap contributors'}).addTo(pfzMap);

    // SST Legend Control
    const sstLegend=L.control({position:'bottomright'});
    sstLegend.onAdd=() => {
      const element=L.DomUtil.create('div','pfz-sst-legend');
      element.hidden=true;
      element.setAttribute('aria-label','Sea surface temperature anomaly focus from minus 1 to plus 1 degree Celsius');
      element.innerHTML='<strong>SST Anomaly · °C</strong><div class="pfz-sst-scale" aria-hidden="true"></div><div class="pfz-sst-ticks"><span>≤−1</span><span>−0.5</span><span>0</span><span>+0.5</span><span>≥+1</span></div><small>Cooler → Normal → Warmer</small>';
      pfzSstLegendElement=element;
      return element;
    };
    sstLegend.addTo(pfzMap);

    // Wind Speed & Direction Legend Control
    const windLegend=L.control({position:'bottomright'});
    windLegend.onAdd=() => {
      const element=L.DomUtil.create('div','pfz-wind-legend');
      element.setAttribute('aria-label','Wind speed scale in knots and direction arrows');
      element.innerHTML=`
        <strong>💨 Wind Speed · Knots (kt)</strong>
        <div class="pfz-wind-scale-row">
          <div class="pfz-wind-scale-bar">
            <span class="pfz-wind-scale-seg c1" title="Calm / Light: <10 kt"></span>
            <span class="pfz-wind-scale-seg c2" title="Moderate: 10-20 kt"></span>
            <span class="pfz-wind-scale-seg c3" title="Strong: 20-30 kt"></span>
            <span class="pfz-wind-scale-seg c4" title="Gale / Extreme: >30 kt"></span>
          </div>
        </div>
        <div class="pfz-wind-legend-labels">
          <span>0 kt</span>
          <span>10</span>
          <span>20</span>
          <span>30+ kt</span>
        </div>
      `;
      pfzWindLegendElement=element;
      return element;
    };
    windLegend.addTo(pfzMap);
  }
  void buildPfzMapLayers().catch(error => { ids('pfzMapShareStatus').textContent=`PFZ map data unavailable: ${error.message}`; fitPfzCoastalExtent(); });
  return pfzMap;
}

function openPfzMap() {
  ids('pfzMapDialog').showModal();
  requestAnimationFrame(() => {
    const map=ensurePfzMap();
    if (!map) return;
    map.invalidateSize({animate:false});
    requestAnimationFrame(fitPfzCoastalExtent);
  });
}

const nextPfzMapPaint = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

async function capturePfzMapCanvas() {
  const container=ids('pfzMapCanvas');
  pfzMap.invalidateSize({animate:false});
  await nextPfzMapPaint();
  const tiles=[...container.querySelectorAll('.leaflet-tile-pane img.leaflet-tile')].filter(image => image.complete && image.naturalWidth && !image.src.includes('/BathymteryImage/') && !image.src.includes('GHRSST_L4_MUR_Sea_Surface_Temperature'));
  await Promise.all(tiles.map(image => image.decode?.().catch(()=>{}) || Promise.resolve()));
  const rect=container.getBoundingClientRect();
  const scale=Math.min(devicePixelRatio || 1,2);
  const canvas=document.createElement('canvas');
  canvas.width=Math.max(1,Math.round(rect.width*scale)); canvas.height=Math.max(1,Math.round(rect.height*scale));
  const context=canvas.getContext('2d'); context.scale(scale,scale); context.fillStyle='#dce8e5'; context.fillRect(0,0,rect.width,rect.height);
  tiles.forEach(image => {
    const tile=image.getBoundingClientRect();
    if (tile.right<=rect.left || tile.bottom<=rect.top || tile.left>=rect.right || tile.top>=rect.bottom) return;
    context.drawImage(image,tile.left-rect.left,tile.top-rect.top,tile.width,tile.height);
  });
  for (const svg of container.querySelectorAll('.leaflet-overlay-pane svg')) await drawOsfSvgOverlay(context,svg,rect);
  return canvas;
}

async function sharePfzMap() {
  const status=ids('pfzMapShareStatus');
  const selection=[...pfzSelectedLayers].filter(name => !['Bathymetry','SST Anomaly','Wind speed & direction'].includes(name));
  status.textContent='Preparing current PFZ map image\u2026';
  try {
    const mapCanvas=await capturePfzMapCanvas();
    const headerHeight=64;
    const output=document.createElement('canvas'); output.width=mapCanvas.width; output.height=mapCanvas.height+headerHeight;
    const context=output.getContext('2d'); context.fillStyle='#082f3c'; context.fillRect(0,0,output.width,headerHeight); context.drawImage(mapCanvas,0,headerHeight);
    context.fillStyle='#fff'; context.font=`700 ${Math.max(18,Math.round(output.width/42))}px Arial`; context.fillText('Ocean Watch \u00b7 Potential Fishing Zone',18,29);
    context.fillStyle='#bfeff1'; context.font=`600 ${Math.max(12,Math.round(output.width/68))}px Arial`; context.fillText(`Layers: ${selection.join(' + ') || 'None'} \u00b7 Source: INCOIS`,18,51);
    const blob=await new Promise(resolve => output.toBlob(resolve,'image/png',.95));
    if (!blob) throw new Error('Map image could not be created');
    const file=new File([blob],`ocean-watch-pfz-${new Date().toISOString().slice(0,10)}.png`,{type:'image/png'});
    if (navigator.share && (!navigator.canShare || navigator.canShare({files:[file]}))) {
      await navigator.share({title:'Ocean Watch \u00b7 Potential Fishing Zone',text:`PFZ map layers: ${selection.join(', ')}`,files:[file]});
      status.textContent='PFZ map image shared.';
    } else if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
      status.textContent='PFZ map image copied to clipboard.';
    } else {
      const link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download=file.name; link.click(); setTimeout(()=>URL.revokeObjectURL(link.href),1000);
      status.textContent='PFZ map image downloaded.';
    }
  } catch (error) {
    if (error?.name !== 'AbortError') status.textContent='Unable to create the PFZ map image. Keep the map open and try again.';
  }
}
