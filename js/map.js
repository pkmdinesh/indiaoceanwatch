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
        osfDistrictPolygonsPromise = fetch(OSF_DISTRICT_POLYGONS_URL,{cache:'force-cache'}).then(response => {
          if (!response.ok) throw new Error(`District polygons unavailable (${response.status})`);
          return response.json();
        }).then(data => {
          if (data?.type !== 'FeatureCollection' || !Array.isArray(data.features)) throw new Error('Invalid district polygon data');
          return data;
        }).catch(error => { osfDistrictPolygonsPromise=null; throw error; });
      }
      return osfDistrictPolygonsPromise;
    }

    async function buildOsfMapLayers(data) {
      if (!osfMap || !window.L) return;
      ids('osfMapShareStatus').textContent='Loading official INCOIS coastal district polygons…';
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
          polygon.bindPopup(`<div class="osf-popup"><strong>${escapeHtml(titleCase(polygonDistrict))} · ${escapeHtml(service)}</strong><p>${escapeHtml(severityLabel[level])} · ${escapeHtml(titleCase(feature.properties.STATE))}<br>Issue date: ${escapeHtml(group?.issueDate || '—')}</p>${messages[0] ? `<p>${escapeHtml(messages[0])}</p>` : ''}</div>`,{maxWidth:360});
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
            marker.bindPopup(`<div class="osf-popup"><strong>${escapeHtml(titleCase(state.name))} · ${escapeHtml(service)}</strong><p>${escapeHtml(severityLabel[level])}: ${count} district ${count === 1 ? 'advisory' : 'advisories'}<br>Issue date: ${escapeHtml(group?.issueDate || '—')}</p></div>`);
            marker.addTo(layer); bounds.push(position);
          });
        });
        overlays[service] = layer;
        layer.addTo(osfMap);
      });
      osfLayerControl = L.control.layers(null,overlays,{collapsed:innerWidth < 700,position:'topright'}).addTo(osfMap);
      if (bounds.length) osfMap.fitBounds(bounds,{padding:[20,20],maxZoom:6}); else osfMap.setView([15,79],4);
      ids('osfMapMeta').textContent = services.map(([name,group]) => `${name}: ${group?.issueDate || '—'}`).join(' · ');
      if (polygonData) ids('osfMapShareStatus').textContent='Official INCOIS district polygons. Use the layer control to select services.';
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

    function osfMessageHtml(service,advisories,group,openLevel=null) {
      const levels = severityOrder.filter(level => advisories.some(advisory => advisory.severity === level));
      if (!levels.length) levels.push('noThreat');
      return levels.map(level => {
        const messages = [...new Set(advisories.filter(advisory => advisory.severity === level).map(advisory => advisory.message).filter(Boolean))];
        const messageHtml = messages.length ? messages.map(message => `<p>${escapeHtml(message)}</p>`).join('') : '<p>No Threat</p>';
        return `<details class="osf-popup-toggle ${level}"${openLevel === level ? ' open' : ''}><summary><span>${escapeHtml(service)}</span><b>${escapeHtml(severityLabel[level])}</b></summary><div class="osf-popup-toggle-body"><small>Issue date: ${escapeHtml(group?.issueDate || '—')}</small>${messageHtml}</div></details>`;
      }).join('');
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
          polygon.bindPopup(`<div class="osf-popup"><strong>${escapeHtml(titleCase(polygon.feature.properties.District))} · ${escapeHtml(titleCase(polygon.feature.properties.STATE))}</strong><p><b>Cumulative status:</b> ${escapeHtml(severityLabel[level])}</p>${sections}</div>`,{maxWidth:460,maxHeight:390});
        });
        if (!osfMap.hasLayer(osfCumulativeLayer)) osfCumulativeLayer.addTo(osfMap);
        if (osfCumulativeLayer.bringToFront) osfCumulativeLayer.bringToFront();
      } else if (osfMap.hasLayer(osfCumulativeLayer)) osfMap.removeLayer(osfCumulativeLayer);
      ids('osfMapShareStatus').textContent = useCumulative
        ? `Cumulative priority for ${selectedServices.join(' + ')}: Warning → Alert → Watch → No Threat.`
        : 'Showing the selected service polygons. Select a second layer for the cumulative priority overlay.';
    }

    function handleOsfLayerSelection(event) {
      if (!event?.name || !osfServiceLayers[event.name]) return;
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
        if (layerBounds.isValid()) bounds.extend(layerBounds);
      });
      if (bounds.isValid()) osfMap.fitBounds(bounds,{padding:innerWidth < 700 ? [12,12] : [20,20],maxZoom:6,animate:false});
    }

    async function buildCumulativeOsfMapLayers(data) {
      if (!osfMap || !window.L) return;
      ids('osfMapShareStatus').textContent='Loading official INCOIS coastal district polygons…';
      if (osfLayerControl) osfLayerControl.remove();
      if (osfCumulativeLayer && osfMap.hasLayer(osfCumulativeLayer)) osfMap.removeLayer(osfCumulativeLayer);
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
            const key = `${normalizeOsfName(feature.properties.STATE)}|${normalizeOsfName(feature.properties.District)}`;
            if (!cumulativeFeatures.has(key)) cumulativeFeatures.set(key,{feature,services:[]});
            cumulativeFeatures.get(key).services.push({service,group,advisories});
            polygon.bindPopup(`<div class="osf-popup"><strong>${escapeHtml(titleCase(feature.properties.District))} · ${escapeHtml(titleCase(feature.properties.STATE))}</strong>${osfMessageHtml(service,advisories,group,osfHighestSeverity(advisories))}</div>`,{maxWidth:430,maxHeight:330});
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
          polygon.bindPopup(`<div class="osf-popup"><strong>${escapeHtml(titleCase(feature.properties.District))} · ${escapeHtml(titleCase(feature.properties.STATE))}</strong><p><b>Cumulative status:</b> ${escapeHtml(severityLabel[level])}</p>${sections}</div>`,{maxWidth:460,maxHeight:390});
        }
      });
      Object.entries(osfServiceLayers).forEach(([service,layer]) => {
        if (!osfRequestedService || osfRequestedService === service) {
          layer.addTo(osfMap);
          osfSelectedServices.add(service);
        }
      });
      osfLayerControl = L.control.layers(null,osfServiceLayers,{collapsed:innerWidth < 700,position:'topright'}).addTo(osfMap);
      osfMap.off('overlayadd',handleOsfLayerSelection); osfMap.off('overlayremove',handleOsfLayerSelection);
      osfMap.on('overlayadd',handleOsfLayerSelection); osfMap.on('overlayremove',handleOsfLayerSelection);
      fitOsfVisibleBounds();
      ids('osfMapMeta').textContent = services.map(([name,group]) => `${name}: ${group?.issueDate || '—'}`).join(' · ');
      updateOsfComposite();
    }

    function ensureOsfMap() {
      if (!window.L) return null;
      if (!osfMap) {
        osfMap = L.map('osfMapCanvas',{zoomControl:true,attributionControl:true,minZoom:2,maxZoom:9});
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,crossOrigin:true,attribution:'&copy; OpenStreetMap contributors'}).addTo(osfMap);
      }
      void buildCumulativeOsfMapLayers(latestStatusData).catch(() => buildOsfMapLayers(latestStatusData));
      return osfMap;
    }

    function openOsfMap(service = null) {
      osfRequestedService = typeof service === 'string' ? service : null;
      ids('osfMapDialog').showModal();
      requestAnimationFrame(() => {
        const map=ensureOsfMap();
        if (!map) return;
        map.invalidateSize({animate:false});
        requestAnimationFrame(fitOsfVisibleBounds);
      });
    }

    async function shareOsfMap() {
      const selected=[...osfSelectedServices];
      const selectionTitle=selected.length ? selected.join(' + ') : 'No layers selected';
      const status=ids('osfMapShareStatus');
      if (typeof html2canvas !== 'function') { status.textContent='Map image sharing could not be loaded.'; return; }
      status.textContent='Preparing current map image…';
      try {
        const mapCanvas=await html2canvas(ids('osfMapCanvas'),{useCORS:true,allowTaint:false,backgroundColor:'#dce8e5',logging:false,scale:Math.min(window.devicePixelRatio || 1,2)});
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
