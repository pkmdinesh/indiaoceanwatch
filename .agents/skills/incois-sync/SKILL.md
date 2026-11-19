---
name: incois-sync
description: Fetches and updates live bulletins, audio forecasts, and advisories from official INCOIS & ITEWC feeds.
---

# Live INCOIS Data & Bulletin Synchronization

Use this workflow to ingest live ocean advisories from official INCOIS feeds, validate snapshot integrity, generate audio bulletins, and prepare deployment payloads.

## Operational Workflow

### 1. Ingest Official Advisories & Wave Data
Run the updater script (supports `-MinimumAgeHours` and `-Quiet`):
```powershell
# Standard run (respects freshness gate)
powershell -ExecutionPolicy Bypass -File scripts/update-status.ps1 -Quiet -MinimumAgeHours 0.20

# Force immediate refresh
powershell -ExecutionPolicy Bypass -File scripts/update-status.ps1 -Force
```

### 2. Validate Snapshot Schema
Verify that the output conforms strictly to `data/status.schema.json`:
```powershell
powershell -NoProfile -File scripts/validate-status.ps1 -Path .\status.json
```

### 3. Generate Audio Bulletins
Generate multi-language audio bulletins for regional coastal broadcasts:
```powershell
node scripts/generate-audio-bulletins.mjs
```

### 4. Synchronize Cache Version & Validate Assets
Ensure cache tokens and static assets are fully aligned:
```powershell
npm run sync-version
npm test
```

### 5. Staging Snapshot Artifacts
Stage only generated data and audio assets:
```powershell
git add status.json data/svas-status.json data/tides.json data/pfz-lines.geojson data/pfz-eez.geojson data/pfz-sectors.geojson data/pfz-landing-centres.geojson audio/bulletins/
```
