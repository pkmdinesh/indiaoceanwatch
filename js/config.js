/* Ocean Watch settings that are expected to change between deployments.
   Edit values here; application modules and the service worker share them. */
globalThis.OCEAN_WATCH_CONFIG = Object.freeze({
  CACHE_VERSION: '224',
  CACHE_PREFIX: 'ocean-watch',
  PUBLIC_URL: 'https://pkmdinesh.github.io/indiaoceanwatch/',
  FIREBASE_COUNTER_URL: 'https://india-ocean-watch-default-rtdb.asia-southeast1.firebasedatabase.app/hits.json',
  HIT_COUNTER_BASE_OFFSET: 727,
  AGE_HOURS: Object.freeze({
    OSF_UPDATE: 36,
    PFZ_UPDATE: 36,
    MHW_UPDATE: 48,
    TSUNAMI_BULLETIN: 24,
    SEISMIC_RECENT: 24,
    CYCLONE_BULLETIN: 48,
    STORM_SURGE_BULLETIN: 48
  }),
  MAP: Object.freeze({
    SEISMIC_DEFAULT_ZOOM: 6,
    OSF_DISTRICT_POLYGONS_URL: './data/osf-district-polygons.geojson',
    OSF_REMOTE_DISTRICT_POLYGONS_URL: 'https://samudra.incois.gov.in/incoismobileappdata/rest/incois/districtpolygons',
    PFZ_LINES_URL: './data/pfz-lines.geojson',
    PFZ_SECTORS_URL: './data/pfz-sectors.geojson',
    PFZ_EEZ_URL: './data/pfz-eez.geojson',
    PFZ_LANDING_CENTRES_URL: './data/pfz-landing-centres.geojson',
    PFZ_BATHYMETRY_WMS_URL: 'https://incois.gov.in/geoserver/BathymteryImage/wms',
    PFZ_L4_SST_TILE_URL: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/GHRSST_L4_MUR_Sea_Surface_Temperature_Anomalies/default/{date}/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png',
    PFZ_CHLOROPHYLL_TILE_URL: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Aqua_L2_Chlorophyll_A/default/{date}/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png'
  }),
  COLORS: Object.freeze({
    WARNING: '#FF0000',
    ALERT: '#FF8C00',
    WATCH: '#FAFA33',
    SAFE: '#238269'
  })
});
