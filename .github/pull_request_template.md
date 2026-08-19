---
name: "OSF: use local district GeoJSON, defer heavy map build, and popup z-index/scroll fixes"
about: "Prefer a local district GeoJSON with remote fallback, defer heavy map builds to idle time, bring OSF popups above map controls, make popup content scrollable and lock background scroll while the dialog is open."
---

What
- Prefer a local GeoJSON copy at `./data/osf-districts.geojson` (fallback to the Samudra API) to reduce latency and enable offline testing.
- Defer heavy OSF layer construction using `requestIdleCallback` / `setTimeout` so the OSF dialog paints immediately.
- Add popup options (autoPan + maxHeight) and bring popups to the front so they are not hidden behind layer/zoom controls.
- Make popup content scrollable and lock background scrolling while the dialog is open.

Why
- Improves perceived performance when opening the OSF map dialog and reduces dependency on the external Samudra API.
- Fixes popups being obscured by Leaflet controls and improves mobile UX for long popup content.

Files changed
- data/osf-districts.geojson (new) — placeholder empty FeatureCollection; replace with a simplified dataset before production release.
- css/responsive.css — popup z-index and scrollable popup rules.
- js/map.js — prefer local loader, popup options, deferred build, and dialog scroll lock.

Testing checklist
- Open the OSF dialog — it should show immediately and then populate layers.
- Popups should appear above the layer and zoom controls.
- Long popup content should scroll within the popup.
- In offline mode (or when the Samudra API is unreachable), `./data/osf-districts.geojson` should be loaded.

Notes
- The committed `data/osf-districts.geojson` is intentionally an empty FeatureCollection for this PR. Replace with a simplified copy of the INCOIS polygons using mapshaper or equivalent tooling before relying on the polygons in production.
- If desired, I can follow up with a second PR that fetches the Samudra GeoJSON, simplifies it (mapshaper), and commits the simplified file.
