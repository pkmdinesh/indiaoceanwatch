let seismicZoomHintTimer = null;

function setupSeismicMapScrollLock(map) {
  const container = ids('eventMap');
  if (!container) return;

  let hint = ids('seismicMapZoomHint');
  if (!hint) {
    hint = document.createElement('div');
    hint.id = 'seismicMapZoomHint';
    hint.className = 'map-ctrl-zoom-hint';
    hint.textContent = 'Use Ctrl + scroll to zoom map';
    container.appendChild(hint);
  }

  const showHint = () => {
    hint.classList.add('is-visible');
    clearTimeout(seismicZoomHintTimer);
    seismicZoomHintTimer = setTimeout(() => {
      hint.classList.remove('is-visible');
    }, 1200);
  };

  container.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (!map.scrollWheelZoom.enabled()) {
        map.scrollWheelZoom.enable();
      }
      hint.classList.remove('is-visible');
    } else {
      if (map.scrollWheelZoom.enabled()) {
        map.scrollWheelZoom.disable();
      }
      showHint();
    }
  }, { passive: true });

  window.addEventListener('keydown', (e) => {
    if ((e.key === 'Control' || e.key === 'Meta') && map) {
      map.scrollWheelZoom.enable();
    }
  });

  window.addEventListener('keyup', (e) => {
    if ((e.key === 'Control' || e.key === 'Meta') && map) {
      map.scrollWheelZoom.disable();
    }
  });

  container.addEventListener('mouseleave', () => {
    if (map) map.scrollWheelZoom.disable();
    hint.classList.remove('is-visible');
  });
}

function ensureSeismicMap() {
  if (seismicMap) return seismicMap;
  if (!window.L) return null;

  seismicMap = L.map('eventMapCanvas', {
    zoomControl: true,
    attributionControl: true,
    minZoom: 2,
    maxZoom: 12,
    worldCopyJump: true,
    scrollWheelZoom: false
  });

  const labelledBase = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri'
  }).addTo(seismicMap);

  seismicBathymetryLayer = L.tileLayer.wms('https://wms.gebco.net/mapserv', {
    layers: 'GEBCO_LATEST_2',
    format: 'image/png',
    transparent: true,
    opacity: 0.55,
    attribution: 'GEBCO'
  });

  L.control.layers(
    { 'Global map (English)': labelledBase },
    { 'GEBCO bathymetry': seismicBathymetryLayer },
    { collapsed: true, position: 'topright' }
  ).addTo(seismicMap);

  setupSeismicMapScrollLock(seismicMap);

  return seismicMap;
}

const appendIst = value => {
      const text = String(value || '').trim();
      return text && !/\bIST\b/i.test(text) ? `${text} IST` : text;
    };
    function seismicSummary(event) {
      const magnitude = event?.MAGNITUDE ?? event?.magnitude ?? '—';
      const region = event?.REGIONNAME ?? event?.region ?? 'Location unavailable';
      const originTime = appendIst(event?.ORIGINTIME ?? event?.originTime ?? '');
      return `M${magnitude}, ${region}${originTime ? `, ${originTime}` : ''}`;
    }
    function bulletinReference(bulletin) {
      if (!bulletin) return 'Not issued';
      const number = bulletin.number ?? 'Latest';
      const type = bulletin.type || 'Unknown';
      return `Bulletin-${number} (Type-${type})`;
    }

let activeBathymetryRequest = 0;

    function parseGebcoElevation(payload) {
      if (payload && typeof payload === 'object') {
        const candidates = [
          payload.elevation,
          payload.value,
          payload.value_0,
          payload?.features?.[0]?.properties?.elevation,
          payload?.features?.[0]?.properties?.value,
          payload?.features?.[0]?.properties?.value_0,
          payload?.features?.[0]?.properties?.value_list
        ];
        const match = candidates.map(Number).find(Number.isFinite);
        if (Number.isFinite(match)) return match;
      }

      const text = String(payload || '');
      const patterns = [
        /value_0\s*[=:]\s*(-?\d+(?:\.\d+)?)/i,
        /value_list\s*[=:]\s*['"]?(-?\d+(?:\.\d+)?)/i,
        /(?:elevation|depth|bathymetry)\s*[=:]\s*(-?\d+(?:\.\d+)?)/i,
        /Band\s*1\s*(?:Value)?\s*[=:]\s*(-?\d+(?:\.\d+)?)/i,
        /pixel[_\s-]*value\s*[=:]\s*(-?\d+(?:\.\d+)?)/i
      ];
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return Number(match[1]);
      }
      return null;
    }

    async function fetchGebcoElevation(latitude, longitude) {
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

      const delta = 0.005;
      const common = {
        service: 'WMS',
        version: '1.1.1',
        request: 'GetFeatureInfo',
        layers: 'GEBCO_LATEST_2',
        query_layers: 'GEBCO_LATEST_2',
        styles: '',
        format: 'image/png',
        srs: 'EPSG:4326',
        bbox: `${longitude - delta},${latitude - delta},${longitude + delta},${latitude + delta}`,
        width: '101',
        height: '101',
        x: '50',
        y: '50',
        feature_count: '1'
      };

      for (const infoFormat of ['application/json', 'text/plain', 'text/html']) {
        const params = new URLSearchParams({...common, info_format: infoFormat});
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        try {
          const response = await fetch(`https://wms.gebco.net/mapserv?${params}`, {
            cache: 'no-store',
            signal: controller.signal
          });
          if (!response.ok) continue;
          const contentType = response.headers.get('content-type') || '';
          const payload = contentType.includes('json') ? await response.json() : await response.text();
          const elevation = parseGebcoElevation(payload);
          if (Number.isFinite(elevation)) return elevation;
        } catch (error) {
          if (error?.name !== 'AbortError') console.warn('GEBCO bathymetry lookup failed:', error);
        } finally {
          clearTimeout(timeout);
        }
      }
      return null;
    }

    async function updateTectonicSetting(latitude, longitude, topoBathy, requestId, savedBathymetry, savedSetting, savedElevation, bulletin = null, event = null) {
      const settingElement = ids('eventSetting');
      const bathymetryElement = ids('eventBathymetry');
      const normalizedSavedSetting = String(savedSetting || '').trim().toUpperCase();
      const savedDepth = savedBathymetry === '' || savedBathymetry == null
        ? Number.NaN
        : Number(savedBathymetry);
      const storedElevation = savedElevation === '' || savedElevation == null
        ? Number.NaN
        : Number(savedElevation);

      const oceanParameter = String(bulletin?.oceanParameter || event?.oceanParameter || event?.ocean_para || '').trim().toUpperCase();
      const bulletinMessage = String(bulletin?.message || '').trim();

      const isLandFromBulletin = oceanParameter === 'OL' ||
        (/\bon\s+land\b|\bland\b/i.test(topoBathy) && !/island/i.test(topoBathy)) ||
        /\b(?:happened|occurred|located|is)\s+on\s+land\b|\bon\s+land\s+part\b/i.test(bulletinMessage);

      const explicitlyLand = isLandFromBulletin || normalizedSavedSetting === 'LAND';

      if (explicitlyLand || (Number.isFinite(storedElevation) && storedElevation >= 0)) {
        settingElement.textContent = globalThis.i18n?.translateTectonicSetting('LAND') || 'Tectonic Setting: LAND';
        bathymetryElement.textContent = globalThis.i18n?.translateBathymetry('NIL') || 'Bathymetry: NIL';
        bathymetryElement.title = 'Land setting; bathymetry is not applicable.';
        return;
      }

      if (Number.isFinite(savedDepth) && savedDepth > 0) {
        settingElement.textContent = globalThis.i18n?.translateTectonicSetting('OCEANIC / MARINE') || 'Tectonic Setting: OCEANIC / MARINE';
        bathymetryElement.textContent = globalThis.i18n?.translateBathymetry(`${Math.round(savedDepth).toLocaleString('en-IN')} m`) || `Bathymetry: ${Math.round(savedDepth).toLocaleString('en-IN')} m`;
        bathymetryElement.title = 'Bathymetry from ITEWC topo_bathy, with GEBCO_LATEST_2 used only as fallback.';
        return;
      }

      if (Number.isFinite(storedElevation) && storedElevation < 0) {
        settingElement.textContent = globalThis.i18n?.translateTectonicSetting('OCEANIC / MARINE') || 'Tectonic Setting: OCEANIC / MARINE';
        bathymetryElement.textContent = globalThis.i18n?.translateBathymetry(`${Math.round(Math.abs(storedElevation)).toLocaleString('en-IN')} m`) || `Bathymetry: ${Math.round(Math.abs(storedElevation)).toLocaleString('en-IN')} m`;
        bathymetryElement.title = `Stored GEBCO elevation at the event coordinates: ${Math.round(storedElevation)} m.`;
        return;
      }

      settingElement.textContent = globalThis.i18n?.translateTectonicSetting('OCEANIC / MARINE') || 'Tectonic Setting: OCEANIC / MARINE';
      bathymetryElement.textContent = Number.isFinite(latitude) && Number.isFinite(longitude)
        ? (globalThis.i18n?.translateBathymetry('LOADING') || 'Bathymetry: loading…')
        : (globalThis.i18n?.translateBathymetry('UNAVAILABLE') || 'Bathymetry: unavailable');
      bathymetryElement.title = 'GEBCO WMS point value at the event latitude and longitude.';

      const elevation = await fetchGebcoElevation(latitude, longitude);
      if (requestId !== activeBathymetryRequest) return;

      if (!Number.isFinite(elevation)) {
        bathymetryElement.textContent = globalThis.i18n?.translateBathymetry('UNAVAILABLE') || 'Bathymetry: unavailable';
        bathymetryElement.title = 'The GEBCO WMS point query did not return a usable value.';
        return;
      }

      if (elevation >= 0) {
        settingElement.textContent = globalThis.i18n?.translateTectonicSetting('LAND') || 'Tectonic Setting: LAND';
        bathymetryElement.textContent = globalThis.i18n?.translateBathymetry('NIL') || 'Bathymetry: NIL';
        bathymetryElement.title = 'GEBCO elevation is at or above mean sea level.';
        return;
      }

      settingElement.textContent = globalThis.i18n?.translateTectonicSetting('OCEANIC / MARINE') || 'Tectonic Setting: OCEANIC / MARINE';
      bathymetryElement.textContent = globalThis.i18n?.translateBathymetry(`${Math.round(Math.abs(elevation)).toLocaleString('en-IN')} m`) || `Bathymetry: ${Math.round(Math.abs(elevation)).toLocaleString('en-IN')} m`;
      bathymetryElement.title = `GEBCO elevation at the event coordinates: ${Math.round(elevation)} m.`;
    }

    async function openSeismicDetails(event, bulletin = null) {
      const activeBulletin = bulletin || event?.bulletin || null;
      const magnitude = activeBulletin?.magnitude || event?.MAGNITUDE || event?.magnitude || '—';
      const location = activeBulletin?.location || event?.REGIONNAME || event?.region || 'Location unavailable';
      const depth = activeBulletin?.depth || (event?.DEPTH ?? event?.depth) || '—';
      const latitudeValue = activeBulletin?.latitude ?? event?.LATITUDE ?? event?.latitude;
      const longitudeValue = activeBulletin?.longitude ?? event?.LONGITUDE ?? event?.longitude;
      const latitude = latitudeValue === '' || latitudeValue == null ? Number.NaN : Number(latitudeValue);
      const longitude = longitudeValue === '' || longitudeValue == null ? Number.NaN : Number(longitudeValue);
      const originDate = activeBulletin?.originDate || '';
      const originTime = activeBulletin?.originTime || event?.ORIGINTIME || event?.originTime || '—';
      const topoBathy = String(activeBulletin?.topographyBathymetry || '').trim();
      const savedBathymetry = event?.bathymetryMeters ?? activeBulletin?.bathymetryMeters;
      const savedSetting = event?.tectonicSetting ?? activeBulletin?.tectonicSetting;
      const savedElevation = event?.gebcoElevationMeters ?? activeBulletin?.gebcoElevationMeters;
      const coastDistanceMatch = topoBathy.match(/(?:distance|distnace)\s+of\s+([\d,.]+)\s*km\s+from\s+(?:the\s+)?coast(?:line)?/i);
      const coastDistance = coastDistanceMatch ? Number(coastDistanceMatch[1].replace(/,/g,'')) : Number(event?.distanceFromCoastKm ?? activeBulletin?.distanceFromCoastKm);
      const coastDistanceText = Number.isFinite(coastDistance) ? `~${Math.round(coastDistance).toLocaleString('en-US')} km` : (globalThis.i18n?.t('seismic.unavailable', 'Unavailable') || 'Unavailable');
      const bathymetryRequestId = ++activeBathymetryRequest;
      ids('seismicDialogTitle').textContent = `M${magnitude} · ${globalThis.i18n?.translateDistrictName(location) || location}`;
      ids('seismicDialogMeta').textContent = activeBulletin?.issuedAt ? `${bulletinReference(activeBulletin)} · ${globalThis.i18n?.t('severity.issued', 'Issued') || 'Issued'} ${activeBulletin.issuedAt}` : (globalThis.i18n?.t('seismic.dialog_meta', 'Official ITEWC information') || 'Official ITEWC information');
      ids('eventCoastDistance').textContent = globalThis.i18n?.translateCoastDistance(coastDistanceText) || `Distance from nearest coast: ${coastDistanceText}`;
      currentSeismicShareData={magnitude,location,origin:[originDate,originTime].filter(Boolean).join(' '),coordinates:Number.isFinite(latitude)&&Number.isFinite(longitude) ? `${latitude}°, ${longitude}°` : '',coastDistance:coastDistanceText,bulletin:bulletinReference(activeBulletin),evaluation:activeBulletin?.message || ''};
      void updateTectonicSetting(latitude, longitude, topoBathy, bathymetryRequestId, savedBathymetry, savedSetting, savedElevation, activeBulletin, event);
      const facts = [
        [globalThis.i18n?.t('seismic.fact_magnitude', 'Magnitude') || 'Magnitude', `M${magnitude}`],
        [globalThis.i18n?.t('seismic.fact_depth', 'Depth') || 'Depth', String(depth).includes('km') ? depth : `${depth} km`],
        [globalThis.i18n?.t('seismic.fact_date', 'Date') || 'Date', originDate || String(originTime).split(' ')[0] || '—'],
        [globalThis.i18n?.t('seismic.fact_origin_time', 'Origin time') || 'Origin time', originDate ? originTime : String(originTime).replace(/^\d{4}-\d{2}-\d{2}\s*/, '')],
        [globalThis.i18n?.t('seismic.fact_latitude', 'Latitude') || 'Latitude', Number.isFinite(latitude) ? `${latitude}°` : '—'],
        [globalThis.i18n?.t('seismic.fact_longitude', 'Longitude') || 'Longitude', Number.isFinite(longitude) ? `${longitude}°` : '—'],
        [globalThis.i18n?.t('seismic.fact_location', 'Location') || 'Location', globalThis.i18n?.translateDistrictName(location) || location],
        [globalThis.i18n?.t('seismic.fact_bulletin', 'Bulletin') || 'Bulletin', bulletinReference(activeBulletin)]
      ];
      ids('eventFacts').replaceChildren(...facts.map(([label,value]) => {
        const wrapper=document.createElement('div'); const term=document.createElement('dt'); const detail=document.createElement('dd');
        term.textContent=label; detail.textContent=value; wrapper.append(term,detail); return wrapper;
      }));
      const hasBulletin = Boolean(activeBulletin);
      const evaluationSection = ids('eventEvaluation').closest('details');
      const adviceSection = ids('eventAdvice').closest('details');
      evaluationSection.hidden = !hasBulletin; adviceSection.hidden = !hasBulletin;
      ids('eventEvaluation').textContent = globalThis.i18n?.translateItewcText(activeBulletin?.message) || activeBulletin?.message || '';
      ids('eventAdvice').textContent = globalThis.i18n?.translateItewcText(activeBulletin?.advice) || activeBulletin?.advice || (globalThis.i18n?.t('seismic.no_advice', 'No advice text was included in this bulletin.') || 'No advice text was included in this bulletin.');
      ids('eventUpdates').textContent = globalThis.i18n?.translateItewcText(activeBulletin?.updates) || activeBulletin?.updates || '';
      ids('eventUpdatesSection').hidden = !activeBulletin?.updates;
      ids('eventBulletinUnavailable').hidden = hasBulletin;
      const officialLink = ids('eventBulletinLink');
      officialLink.hidden = !activeBulletin?.url;
      if (activeBulletin?.url) officialLink.href = activeBulletin.url; else officialLink.removeAttribute('href');
      const map = ids('eventMap');
      const hasCoordinates = Number.isFinite(latitude) && Number.isFinite(longitude);

      map.hidden = !hasCoordinates;
      ids('seismicDialog').showModal();

      if (hasCoordinates) {
        if (typeof ensureLeaflet === 'function') await ensureLeaflet();
        requestAnimationFrame(() => {
          const activeMap = ensureSeismicMap();
          if (activeMap) {
            const popupHtml =
              `<strong>M${magnitude} · ${escapeHtml(location)}</strong><br>` +
              `LAT ${latitude.toFixed(2)}° · LONG ${longitude.toFixed(2)}°<br>` +
              `Depth ${escapeHtml(String(depth).includes('km') ? String(depth) : `${depth} km`)}`;

            activeMap.invalidateSize();
            activeMap.setView([latitude, longitude], SEISMIC_MAP_DEFAULT_ZOOM, { animate: false });
            if (seismicEpicentreMarker) seismicEpicentreMarker.remove();
            const earthquakeIcon = L.divIcon({
              className: '',
              html: '<div class="earthquake-leaflet-marker"></div>',
              iconSize: [22,22],
              iconAnchor: [11,11]
            });
            seismicEpicentreMarker = L.marker([latitude, longitude], {
              icon: earthquakeIcon,
              keyboard: false,
              title: `M${magnitude} earthquake · ${location}`
            }).addTo(activeMap);
            seismicEpicentreMarker.bindPopup(popupHtml).openPopup();
          }
        });
      }
    }
