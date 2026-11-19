# Ocean Watch Project Guidelines

## Command Execution & Tool Permissions
- **Allowed Commands**: All standard development commands are fully permitted in this workspace:
  - `command(*)`
  - `command(node*)` (e.g. asset validation, diagnostic scripts, Node test runners)
  - `command(powershell*)` (e.g. `scripts/update-status.ps1`, git operations)
  - `command(git*)` (e.g. status, diff, commit, branch management)

## Architecture & Code Conventions
- **Modular Vanilla JS Structure**:
  - `js/config.js`: Global configuration (`globalThis.OCEAN_WATCH_CONFIG`).
  - `js/app.js`: Core dashboard helpers, date calculators, active advisory cards.
  - `js/advisory.js`: Severity mapping (`severityOrder`, `severityLabel`), state summary builders.
  - `js/map.js`: Ocean State Forecast map, district GeoJSON layer builder, composite priority overlay.
  - `js/pfz-map.js`: PFZ forecast lines, sectors, EEZ, and landing center layers.
  - `js/status.js`: Data fetcher (`loadStatus`), interval polling, auto-refresh scheduler.
  - `js/pwa.js`: Modal dialog wiring, print preparation, service worker registration.
- **Global Scope for Classic Browser Scripts**:
  - Because scripts are loaded via standard `<script src="...">` tags, shared variables and helpers must be declared with `var` or attached to `globalThis` to prevent cross-file `ReferenceError` crashes.
- **District Polygons & Offline GIS**:
  - Coastal district GIS polygons are cached locally in `data/osf-district-polygons.geojson`.
  - All 89 coastal districts map to INCOIS advisory names via `normalizeOsfName` and `osfDistrictMatches`.

## Cache & Service Worker Rules
- **Cache Invalidation**:
  - When modifying any HTML, CSS, JS, or GeoJSON asset, bump `CACHE_VERSION` in `js/config.js`.
  - Immediately synchronize asset query strings across `index.html` by running:
    ```powershell
    npm run sync-version
    ```
- **App Shell Synchronisation**:
  - All static assets listed in `sw.js` (`APP_SHELL`) must match `tests/validation/validate-assets.mjs`.

## Snapshot Schema & Multi-Hazard Rules
- **Schema Adherence**:
  - Generated `status.json` must strictly conform to `data/status.schema.json`.
  - Always run snapshot validation before committing data changes:
    ```powershell
    powershell -NoProfile -File scripts/validate-status.ps1 -Path .\status.json
    ```
- **GeoJSON Integrity**:
  - GeoJSON datasets in `data/` (`pfz-*.geojson`, `osf-district-polygons.geojson`) must retain valid `FeatureCollection` structures with non-empty feature coordinates.

## Verification Protocol
- After making any code or asset changes, always run:
  ```powershell
  npm test
  ```
  Ensure asset paths, JSON/GeoJSON syntax, and cache query parameters pass without warnings.
