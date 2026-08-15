# Architecture

Ocean Watch is a static GitHub Pages application. The browser reads `status.json`, renders advisory cards, and optionally displays Leaflet maps. No application server is required for the hosted site.

## Frontend

- `index.html` contains semantic page markup only.
- `css/` separates foundations, page layout, components, and responsive overrides.
- `js/app.js` holds shared state and common helpers.
- Service-specific rendering lives in `js/tsunami.js`, `js/seismic.js`, `js/pfz.js`, and `js/cyclone.js`.
- OSF and seismic map behavior lives in `js/map.js` and `js/seismic.js`.
- `js/status.js` renders and refreshes the snapshot.
- `js/pwa.js` wires interactions and registers the service worker.

The local scripts are loaded as ordered classic scripts so their existing shared lexical bindings remain compatible. A future migration may convert them to ES modules after explicit imports and exports are introduced.

## Data update path

`scripts/update-status.ps1` reads official sources and writes the root `status.json`. GitHub Actions runs the updater and deploys the static repository. `scripts/validate-status.ps1` checks required fields before deployment or local testing.

## Offline behavior

`sw.js` caches the application shell and uses network-first behavior for navigation, status, and announcement data. Static assets use cache-first behavior after their initial download.
