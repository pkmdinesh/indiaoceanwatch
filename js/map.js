@@
-    if (!osfDistrictPolygonsPromise) {
-      osfDistrictPolygonsPromise = fetch(OSF_DISTRICT_POLYGONS_URL,{cache:'force-cache'}).then(response => {
-          if (!response.ok) throw new Error(`District polygons unavailable (${response.status})`);
-          return response.json();
-        }).then(data => {
-          if (data?.type !== 'FeatureCollection' || !Array.isArray(data.features)) throw new Error('Invalid district polygon data');
-          return data;
-        }).catch(error => { osfDistrictPolygonsPromise=null; throw error; });
-    }
-    return osfDistrictPolygonsPromise;
+    if (!osfDistrictPolygonsPromise) {
+      // Prefer a local copy committed under data/ for faster, offline-friendly loads. Fallback to the remote Samudra API.
+      const localPath = './data/osf-districts.geojson';
+      const remote = OSF_DISTRICT_POLYGONS_URL;
+      osfDistrictPolygonsPromise = (async () => {
+        try {
+          const localResp = await fetch(localPath, {cache:'force-cache'});
+          if (localResp.ok) {
+            const localData = await localResp.json();
+            if (localData?.type === 'FeatureCollection' && Array.isArray(localData.features)) return localData;
+          }
+        } catch (e) { /* ignore and fallback to remote */ }
+        const resp = await fetch(remote, {cache:'force-cache'});
+        if (!resp.ok) throw new Error(`District polygons unavailable (${resp.status})`);
+        const data = await resp.json();
+        if (data?.type !== 'FeatureCollection' || !Array.isArray(data.features)) throw new Error('Invalid district polygon data');
+        return data;
+      })().catch(error => { osfDistrictPolygonsPromise = null; throw error; });
+    }
+    return osfDistrictPolygonsPromise;
@@
-      const layer = L.layerGroup();
+      const layer = L.layerGroup();
@@
-          const polygon = L.geoJSON(feature,{smoothFactor:2.5,style:{...OSF_POLYGON_BORDER,fillColor:OSF_SEVERITY_COLORS[level],fillOpacity:.55}});
-          const messages = [...new Set(matches.map(match => match.advisory.message).filter(Boolean))];
-          polygon.bindPopup(`<div class="osf-popup"><strong>${escapeHtml(titleCase(polygonDistrict))} · ${escapeHtml(service)}</strong><p>${escapeHtml(severityLabel[level])} · ${escapeHtml(title[...]
+          const polygon = L.geoJSON(feature,{smoothFactor:2.5,style:{...OSF_POLYGON_BORDER,fillColor:OSF_SEVERITY_COLORS[level],fillOpacity:.55}});
+          const messages = [...new Set(matches.map(match => match.advisory.message).filter(Boolean))];
+          const popupHtml = `<div class="osf-popup"><strong>${escapeHtml(titleCase(polygonDistrict))} · ${escapeHtml(service)}</strong><p>${escapeHtml(severityLabel[level])} · ${escapeHtml(titleCase(feature?.properties?.STATE || ''))}</p>${messages.map(m => `<p>${escapeHtml(m)}</p>`).join('')}</div>`;
+          polygon.bindPopup(popupHtml, osfPopupOptions);
           polygon.addTo(layer);
           const polygonBounds = polygon.getBounds(); if (polygonBounds.isValid()) bounds.push(polygonBounds.getSouthWest(),polygonBounds.getNorthEast());
         });
@@
-            const marker = L.marker(position,{icon:L.divIcon({className:'',html:`<span class="osf-map-marker-label" style="background:${OSF_SEVERITY_COLORS[level]}">${count}</span>`,iconSize:[24,2[...]
-            marker.bindPopup(`<div class="osf-popup"><strong>${escapeHtml(titleCase(state.name))} · ${escapeHtml(service)}</strong><p>${escapeHtml(severityLabel[level])}: ${count} district ${coun[...]
-            marker.addTo(layer); bounds.push(position);
+            const marker = L.marker(position,{icon:L.divIcon({className:'',html:`<span class="osf-map-marker-label" style="background:${OSF_SEVERITY_COLORS[level]}">${count}</span>`,iconSize:[24,24]})});
+            const markerHtml = `<div class="osf-popup"><strong>${escapeHtml(titleCase(state.name))} · ${escapeHtml(service)}</strong><p>${escapeHtml(severityLabel[level])}: ${count} district${count>1?'s':''}</p></div>`;
+            marker.bindPopup(markerHtml, osfPopupOptions);
+            marker.addTo(layer); bounds.push(position);
           });
         });
@@
-      osfLayerControl = L.control.layers(null,overlays,{collapsed:innerWidth < 700,position:'topright'}).addTo(osfMap);
+      osfLayerControl = L.control.layers(null,overlays,{collapsed:innerWidth < 700,position:'topright'}).addTo(osfMap);
       if (bounds.length) osfMap.fitBounds(bounds,{padding:[20,20],maxZoom:6}); else osfMap.setView([15,79],4);
       ids('osfMapMeta').textContent = services.map(([name,group]) => `${name}: ${group?.issueDate || '—'}`).join(' · ');
       if (polygonData) ids('osfMapShareStatus').textContent='Official INCOIS district polygons. Use the layer control to select services.';
     }
@@
-    async function buildCumulativeOsfMapLayers(data) {
+    async function buildCumulativeOsfMapLayers(data) {
       if (!osfMap || !window.L) return;
       ids('osfMapShareStatus').textContent='Loading official INCOIS coastal district polygons…';
       if (osfLayerControl) osfLayerControl.remove();
       if (osfCumulativeLayer && osfMap.hasLayer(osfCumulativeLayer)) osfMap.removeLayer(osfCumulativeLayer);
       Object.values(osfServiceLayers).forEach(layer => { if (osfMap.hasLayer(layer)) osfMap.removeLayer(layer); });
-      const polygonData = await loadOsfDistrictPolygons();
+      const polygonData = await loadOsfDistrictPolygons();
@@
-        osfServiceLayers[service]=layer;
+        osfServiceLayers[service]=layer;
       });
@@
-      osfLayerControl = L.control.layers(null,osfServiceLayers,{collapsed:innerWidth < 700,position:'topright'}).addTo(osfMap);
+      osfLayerControl = L.control.layers(null,osfServiceLayers,{collapsed:innerWidth < 700,position:'topright'}).addTo(osfMap);
       osfMap.off('overlayadd',handleOsfLayerSelection); osfMap.off('overlayremove',handleOsfLayerSelection);
       osfMap.on('overlayadd',handleOsfLayerSelection); osfMap.on('overlayremove',handleOsfLayerSelection);
       fitOsfVisibleBounds();
       ids('osfMapMeta').textContent = services.map(([name,group]) => `${name}: ${group?.issueDate || '—'}`).join(' · ');
       updateOsfComposite();
     }
@@
-    function ensureOsfMap() {
-      if (!window.L) return null;
-      if (!osfMap) {
-        osfMap = L.map('osfMapCanvas',{zoomControl:true,attributionControl:true,minZoom:2,maxZoom:9});
-        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,crossOrigin:true,attribution:'&copy; OpenStreetMap contributors'}).addTo(osfMap);
-      }
-      void buildCumulativeOsfMapLayers(latestStatusData).catch(() => buildOsfMapLayers(latestStatusData));
-      return osfMap;
-    }
+    function ensureOsfMap() {
+      if (!window.L) return null;
+      if (!osfMap) {
+        osfMap = L.map('osfMapCanvas',{zoomControl:true,attributionControl:true,minZoom:2,maxZoom:9});
+        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,crossOrigin:true,attribution:'&copy; OpenStreetMap contributors'}).addTo(osfMap);
+        // ensure popups appear above controls
+        osfMap.on('popupopen', (e) => {
+          try {
+            const container = e.popup && e.popup._container;
+            if (container) {
+              container.style.zIndex = 3000;
+              if (typeof e.popup.bringToFront === 'function') e.popup.bringToFront();
+            }
+          } catch (err) { /* ignore */ }
+        });
+      }
+      // Defer heavy layer construction so the dialog can render quickly
+      if ('requestIdleCallback' in window) {
+        requestIdleCallback(() => void buildCumulativeOsfMapLayers(latestStatusData).catch(() => buildOsfMapLayers(latestStatusData)));
+      } else {
+        setTimeout(() => void buildCumulativeOsfMapLayers(latestStatusData).catch(() => buildOsfMapLayers(latestStatusData)), 200);
+      }
+      return osfMap;
+    }
@@
-    function openOsfMap(service = null) {
-      osfRequestedService = typeof service === 'string' ? service : null;
-      ids('osfMapDialog').showModal();
-      requestAnimationFrame(() => {
-        const map=ensureOsfMap();
-        if (!map) return;
-        map.invalidateSize({animate:false});
-        requestAnimationFrame(fitOsfVisibleBounds);
-      });
-    }
+    function openOsfMap(service = null) {
+      osfRequestedService = typeof service === 'string' ? service : null;
+      const dialog = ids('osfMapDialog');
+      dialog.showModal();
+      // Lock background scroll while dialog is open
+      document.documentElement.style.overflow = 'hidden';
+      requestAnimationFrame(() => {
+        const map=ensureOsfMap();
+        if (!map) return;
+        map.invalidateSize({animate:false});
+        requestAnimationFrame(fitOsfVisibleBounds);
+      });
+    }
@@
-    async function drawOsfSvgOverlay(context,svg,containerRect) {
+    async function drawOsfSvgOverlay(context,svg,containerRect) {
@@
     }
@@
     async function shareOsfMap() {
@@
       } catch (error) {
         if (error?.name !== 'AbortError') status.textContent='Unable to create the map image. Keep the map open and try again.';
       }
     }
+
+    // Restore scroll when dialog closes
+    const _osfDialog = ids('osfMapDialog');
+    _osfDialog.addEventListener('close', () => { document.documentElement.style.overflow = ''; });
+
+    // Popup defaults used across bindings
+    const osfPopupOptions = { autoPan: true, autoPanPaddingTopLeft: L.point(160, 20), maxHeight: Math.round(window.innerHeight * 0.45) };
+
