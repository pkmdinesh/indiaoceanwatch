/* Ocean Watch settings that are expected to change between deployments.
   Edit values here; application modules and the service worker share them. */
globalThis.OCEAN_WATCH_CONFIG = Object.freeze({
  CACHE_VERSION: '86',
  CACHE_PREFIX: 'ocean-watch',
  PUBLIC_URL: 'https://pkmdinesh.github.io/indiaoceanwatch/',
  AGE_HOURS: Object.freeze({
    TSUNAMI_BULLETIN: 24,
    SEISMIC_RECENT: 24,
    CYCLONE_BULLETIN: 48,
    STORM_SURGE_BULLETIN: 48
  }),
  MAP: Object.freeze({
    SEISMIC_DEFAULT_ZOOM: 6,
    MAPTILER_API_KEY: 'YOUR_MAPTILER_API_KEY',
    OSF_DISTRICT_POLYGONS_URL: 'https://samudra.incois.gov.in/incoismobileappdata/rest/incois/districtpolygons'
  }),
  COLORS: Object.freeze({
    WARNING: '#FF0000',
    ALERT: '#FF8C00',
    WATCH: '#FAFA33',
    SAFE: '#238269'
  })
});
