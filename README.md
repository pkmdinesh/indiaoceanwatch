# Ocean Watch

Ocean Watch is a lightweight, accessible web dashboard for ocean advisories and coastal alerts, focused on the Indian Ocean region. It consolidates advisory severity, potential fishing zones (PFZ), cyclone and offshore forecasts, and delivers responsive, installable (PWA) user experiences for both desktop and mobile.

## Repository layout

- `css/` — base, layout, component, and responsive styles
- `js/` — shared application code and service-specific rendering
- `data/status.schema.json` — snapshot contract
- `scripts/update-status.ps1` — official-source updater
- `scripts/validate-status.ps1` — snapshot validation
- `scripts/sources/` — auditable source definitions
- `tests/` — fixtures and validation checks
- `docs/` — architecture, sources, and methodology

The generated `status.json` stays at the repository root because the static application and GitHub Pages update workflow fetch it directly.

## Local validation

```powershell
powershell -NoProfile -File scripts/validate-status.ps1
powershell -NoProfile -File tests/validation/validate-status.ps1
node tests/validation/validate-assets.mjs
```

## Key features
- Clear advisory severity palette and status UI
- PFZ (Potential Fishing Zone) details and landing center information
- Cyclone, offshore (OSF), and other hazard renderings
- Responsive controls and optimized advisory layout
- Installable PWA with offline support and service-worker caching
- Configurable announcement card for timely messages
- Accessibility and safeguards for advisory states and statuses

## Maintainers & Contact
- Maintainer: @pkmdinesh
- For questions or urgent issues, open an issue in the repository.

## Acknowledgements
- Built to surface timely ocean advisory information for coastal communities and responders.
