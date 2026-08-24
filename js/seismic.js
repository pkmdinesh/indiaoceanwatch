function ensureSeismicMap() {
      if (seismicMap) return seismicMap;
      if (!window.L) return null;

      seismicMap = L.map('eventMapCanvas', {
        zoomControl: true,
        attributionControl: true,
        minZoom: 2,
        maxZoom: 12,
        worldCopyJump: true
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

    async function updateTectonicSetting(latitude, longitude, topoBathy, requestId, savedBathymetry, savedSetting, savedElevation) {
      const settingElement = ids('eventSetting');
      const bathymetryElement = ids('eventBathymetry');
      const normalizedSavedSetting = String(savedSetting || '').trim().toUpperCase();
      const savedDepth = savedBathymetry === '' || savedBathymetry == null
        ? Number.NaN
        : Number(savedBathymetry);
      const storedElevation = savedElevation === '' || savedElevation == null
        ? Number.NaN
        : Number(savedElevation);
      const explicitlyLand = normalizedSavedSetting === 'LAND' ||
        (/\bon\s+land\b|\bland\b/i.test(topoBathy) && !/island/i.test(topoBathy));

      if (explicitlyLand || (Number.isFinite(storedElevation) && storedElevation >= 0)) {
        settingElement.textContent = 'Tectonic Setting: LAND';
        bathymetryElement.textContent = 'Bathymetry: NIL';
        bathymetryElement.title = 'Land setting; bathymetry is not applicable.';
        return;
      }

      if (Number.isFinite(savedDepth) && savedDepth > 0) {
        settingElement.textContent = 'Tectonic Setting: OCEANIC / MARINE';
        bathymetryElement.textContent = `Bathymetry: ${Math.round(savedDepth).toLocaleString('en-IN')} m`;
        bathymetryElement.title = 'Bathymetry from ITEWC topo_bathy, with GEBCO_LATEST_2 used only as fallback.';
        return;
      }

      if (Number.isFinite(storedElevation) && storedElevation < 0) {
        settingElement.textContent = 'Tectonic Setting: OCEANIC / MARINE';
        bathymetryElement.textContent = `Bathymetry: ${Math.round(Math.abs(storedElevation)).toLocaleString('en-IN')} m`;
        bathymetryElement.title = `Stored GEBCO elevation at the event coordinates: ${Math.round(storedElevation)} m.`;
        return;
      }

      settingElement.textContent = 'Tectonic Setting: OCEANIC / MARINE';
      bathymetryElement.textContent = Number.isFinite(latitude) && Number.isFinite(longitude)
        ? 'Bathymetry: loading…'
        : 'Bathymetry: unavailable';
      bathymetryElement.title = 'GEBCO WMS point value at the event latitude and longitude.';

      const elevation = await fetchGebcoElevation(latitude, longitude);
      if (requestId !== activeBathymetryRequest) return;

      if (!Number.isFinite(elevation)) {
        bathymetryElement.textContent = 'Bathymetry: unavailable';
        bathymetryElement.title = 'The GEBCO WMS point query did not return a usable value.';
        return;
      }

      if (elevation >= 0) {
        settingElement.textContent = 'Tectonic Setting: LAND';
        bathymetryElement.textContent = 'Bathymetry: NIL';
        bathymetryElement.title = 'GEBCO elevation is at or above mean sea level.';
        return;
      }

      settingElement.textContent = 'Tectonic Setting: OCEANIC / MARINE';
      bathymetryElement.textContent = `Bathymetry: ${Math.round(Math.abs(elevation)).toLocaleString('en-IN')} m`;
      bathymetryElement.title = `GEBCO elevation at the event coordinates: ${Math.round(elevation)} m.`;
    }

    async function openSeismicDetails(event, bulletin = null) {
      const magnitude = bulletin?.magnitude || event?.MAGNITUDE || event?.magnitude || '—';
      const location = bulletin?.location || event?.REGIONNAME || event?.region || 'Location unavailable';
      const depth = bulletin?.depth || (event?.DEPTH ?? event?.depth) || '—';
      const latitudeValue = bulletin?.latitude ?? event?.LATITUDE ?? event?.latitude;
      const longitudeValue = bulletin?.longitude ?? event?.LONGITUDE ?? event?.longitude;
      const latitude = latitudeValue === '' || latitudeValue == null ? Number.NaN : Number(latitudeValue);
      const longitude = longitudeValue === '' || longitudeValue == null ? Number.NaN : Number(longitudeValue);
      const originDate = bulletin?.originDate || '';
      const originTime = bulletin?.originTime || event?.ORIGINTIME || event?.originTime || '—';
      const topoBathy = String(bulletin?.topographyBathymetry || '').trim();
      const savedBathymetry = event?.bathymetryMeters ?? bulletin?.bathymetryMeters;
      const savedSetting = event?.tectonicSetting ?? bulletin?.tectonicSetting;
      const savedElevation = event?.gebcoElevationMeters ?? bulletin?.gebcoElevationMeters;
      const coastDistanceMatch = topoBathy.match(/(?:distance|distnace)\s+of\s+([\d,.]+)\s*km\s+from\s+(?:the\s+)?coast(?:line)?/i);
      const coastDistance = coastDistanceMatch ? Number(coastDistanceMatch[1].replace(/,/g,'')) : Number(event?.distanceFromCoastKm ?? bulletin?.distanceFromCoastKm);
      const coastDistanceText = Number.isFinite(coastDistance) ? `~${Math.round(coastDistance).toLocaleString('en-US')} km` : 'Unavailable';
      const bathymetryRequestId = ++activeBathymetryRequest;
      ids('seismicDialogTitle').textContent = `M${magnitude} · ${location}`;
      ids('seismicDialogMeta').textContent = bulletin?.issuedAt ? `${bulletinReference(bulletin)} · Issued ${bulletin.issuedAt}` : 'Earthquake event information';
      ids('eventCoastDistance').textContent = `Distance from nearest coast: ${coastDistanceText}`;
      currentSeismicShareData={magnitude,location,origin:[originDate,originTime].filter(Boolean).join(' '),coordinates:Number.isFinite(latitude)&&Number.isFinite(longitude) ? `${latitude}°, ${longitude}°` : '',coastDistance:coastDistanceText,bulletin:bulletinReference(bulletin),evaluation:bulletin?.message || ''};
      void updateTectonicSetting(latitude, longitude, topoBathy, bathymetryRequestId, savedBathymetry, savedSetting, savedElevation);
      const facts = [
        ['Magnitude',`M${magnitude}`],['Depth',String(depth).includes('km') ? depth : `${depth} km`],
        ['Date',originDate || String(originTime).split(' ')[0] || '—'],['Origin time',originDate ? originTime : String(originTime).replace(/^\d{4}-\d{2}-\d{2}\s*/, '')],
        ['Latitude',Number.isFinite(latitude) ? `${latitude}°` : '—'],['Longitude',Number.isFinite(longitude) ? `${longitude}°` : '—'],
        ['Location',location],['Bulletin',bulletinReference(bulletin)]
      ];
      ids('eventFacts').replaceChildren(...facts.map(([label,value]) => {
        const wrapper=document.createElement('div'); const term=document.createElement('dt'); const detail=document.createElement('dd');
        term.textContent=label; detail.textContent=value; wrapper.append(term,detail); return wrapper;
      }));
      const hasBulletin = Boolean(bulletin);
      const evaluationSection = ids('eventEvaluation').closest('details');
      const adviceSection = ids('eventAdvice').closest('details');
      evaluationSection.hidden = !hasBulletin; adviceSection.hidden = !hasBulletin;
      ids('eventEvaluation').textContent = bulletin?.message || '';
      ids('eventAdvice').textContent = bulletin?.advice || 'No advice text was included in this bulletin.';
      ids('eventUpdates').textContent = bulletin?.updates || '';
      ids('eventUpdatesSection').hidden = !bulletin?.updates;
      ids('eventBulletinUnavailable').hidden = hasBulletin;
      const officialLink = ids('eventBulletinLink');
      officialLink.hidden = !bulletin?.url;
      if (bulletin?.url) officialLink.href = bulletin.url; else officialLink.removeAttribute('href');
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
