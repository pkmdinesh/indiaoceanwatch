var pfzMap = null;
var pfzLayerControl = null;
var pfzMapOpenedFromUrl = false;
var pfzMapLayers = {};
var pfzSelectedLayers = new Set();
var pfzDataPromise = null;
var pfzSstLegendElement = null;
var pfzSstDataDate = null;

const PFZ_BATHYMETRY_SLD = '<StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"><NamedLayer><Name>BathymteryImage:gebcobathymtery</Name><UserStyle><FeatureTypeStyle><Rule><RasterSymbolizer><ColorMap type="ramp"><ColorMapEntry color="#081d58" quantity="-6000"/><ColorMapEntry color="#253494" quantity="-4500"/><ColorMapEntry color="#2c7fb8" quantity="-3000"/><ColorMapEntry color="#41b6c4" quantity="-1500"/><ColorMapEntry color="#a1dab4" quantity="-500"/><ColorMapEntry color="#ffffcc" quantity="0"/></ColorMap></RasterSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>';

const PFZ_MAP_DATASETS = Object.freeze({
  'PFZ forecast lines': APP_CONFIG.MAP.PFZ_LINES_URL,
  'PFZ sectors': APP_CONFIG.MAP.PFZ_SECTORS_URL,
  'EEZ boundary': APP_CONFIG.MAP.PFZ_EEZ_URL,
  'Landing centres': APP_CONFIG.MAP.PFZ_LANDING_CENTRES_URL
});

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
      ]));
    }
  });
  const sectors = L.geoJSON(data['PFZ sectors'],{
    pane:'pfzSectorPane',
    smoothFactor:2,
    style:{color:'#17868f',weight:1.2,opacity:.9,fillColor:'#76d7df',fillOpacity:.12},
    onEachFeature:(feature,layer) => {
      const p=feature.properties || {};
      layer.bindPopup(pfzPopup(pfzProperty(p,'SECTORNAME') || 'PFZ sector',[pfzProperty(p,'SEC_ID')]));
    }
  });
  const eez = L.geoJSON(data['EEZ boundary'],{
    pane:'pfzEezPane',
    smoothFactor:1.5,
    style:{color:'#082f5b',weight:2,opacity:.9,dashArray:'7 5'},
    onEachFeature:(feature,layer) => layer.bindPopup(pfzPopup('India EEZ boundary'))
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
      ]),{maxWidth:300});
    }
  });
  return {'PFZ forecast lines':lines,'PFZ sectors':sectors,'EEZ boundary':eez,'Landing centres':landingCentres};
}

var pfzChlorophyllDataDate = null;

function updatePfzMapStatus() {
  const selected=[...pfzSelectedLayers];
  if (pfzSstLegendElement) pfzSstLegendElement.hidden=!selected.includes('SST Anomaly');
  const liveLayers=selected.filter(name => ['Bathymetry','SST Anomaly','Chlorophyll-a'].includes(name));
  const sstDateNote=selected.includes('SST Anomaly') && pfzSstDataDate ? ` SST Anomaly date: ${pfzSstDataDate}.` : '';
  const chlDateNote=selected.includes('Chlorophyll-a') && pfzChlorophyllDataDate ? ` Chlorophyll-a date: ${pfzChlorophyllDataDate}.` : '';
  const liveNote=liveLayers.length ? ` ${liveLayers.join(', ')} ${liveLayers.length === 1 ? 'is a live overlay' : 'are live overlays'} and ${liveLayers.length === 1 ? 'is' : 'are'} omitted from offline/shared images.${sstDateNote}${chlDateNote}` : '';
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
  const preferred=pfzMapLayers['PFZ forecast lines'];
  const bounds=preferred?.getBounds?.();
  if (bounds?.isValid()) pfzMap.fitBounds(bounds,{padding:innerWidth < 700 ? [10,10] : [22,22],maxZoom:6,animate:false});
  else pfzMap.fitBounds([[5,65],[24,100]],{padding:[12,12],maxZoom:5,animate:false});
}

async function buildPfzMapLayers() {
  const status=ids('pfzMapShareStatus');
  status.textContent='Loading locally cached official INCOIS PFZ layers\u2026';
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

  pfzSelectedLayers=new Set(['PFZ forecast lines','EEZ boundary']);
  pfzMapLayers['EEZ boundary'].addTo(pfzMap);
  pfzMapLayers['PFZ forecast lines'].addTo(pfzMap).bringToFront();
  pfzLayerControl=L.control.layers(null,pfzMapLayers,{collapsed:innerWidth < 700,position:'topright'}).addTo(pfzMap);
  pfzMap.off('overlayadd',handlePfzLayerChange); pfzMap.off('overlayremove',handlePfzLayerChange);
  pfzMap.on('overlayadd',handlePfzLayerChange); pfzMap.on('overlayremove',handlePfzLayerChange);
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
    pfzMap=L.map('pfzMapCanvas',{zoomControl:true,attributionControl:true,minZoom:3,maxZoom:12,preferCanvas:false});
    pfzMap.createPane('pfzSectorPane'); pfzMap.getPane('pfzSectorPane').style.zIndex=410;
    pfzMap.createPane('pfzEezPane'); pfzMap.getPane('pfzEezPane').style.zIndex=420;
    pfzMap.createPane('pfzLinePane'); pfzMap.getPane('pfzLinePane').style.zIndex=450;
    pfzMap.createPane('pfzCentrePane'); pfzMap.getPane('pfzCentrePane').style.zIndex=460;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,crossOrigin:true,attribution:'&copy; OpenStreetMap contributors'}).addTo(pfzMap);
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
  const selection=[...pfzSelectedLayers].filter(name => !['Bathymetry','SST Anomaly'].includes(name));
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
