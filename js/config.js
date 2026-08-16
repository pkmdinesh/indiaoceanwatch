/* Ocean Watch settings that are expected to change between deployments.
   Edit values here; application modules and the service worker share them. */
globalThis.OCEAN_WATCH_CONFIG = Object.freeze({
  CACHE_VERSION: '100',
  CACHE_PREFIX: 'ocean-watch',
  PUBLIC_URL: 'https://pkmdinesh.github.io/indiaoceanwatch/',
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
    MAPTILER_API_KEY: 'YOUR_MAPTILER_API_KEY',
    OSF_DISTRICT_POLYGONS_URL: 'https://samudra.incois.gov.in/incoismobileappdata/rest/incois/districtpolygons',
    PFZ_LINES_URL: './data/pfz-lines.geojson',
    PFZ_SECTORS_URL: './data/pfz-sectors.geojson',
    PFZ_EEZ_URL: './data/pfz-eez.geojson',
    PFZ_LANDING_CENTRES_URL: './data/pfz-landing-centres.geojson',
    PFZ_BATHYMETRY_WMS_URL: 'https://incois.gov.in/geoserver/BathymteryImage/wms'
  }),
  COLORS: Object.freeze({
    WARNING: '#FF0000',
    ALERT: '#FF8C00',
    WATCH: '#FAFA33',
    SAFE: '#238269'
  })
});
