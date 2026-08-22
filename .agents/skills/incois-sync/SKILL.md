---
name: incois-sync
description: Fetches and updates live bulletins and advisories from official INCOIS & ITEWC feeds.
---

# Live INCOIS Data Synchronization

Use this workflow to update `status.json` with current live advisories from INCOIS and validate all assets.

## Steps:
1. Run the update script:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/update-status.ps1
   ```
2. Verify asset validity:
   ```powershell
   node tests/validation/validate-assets.mjs
   ```
3. Bump `CACHE_VERSION` in `js/config.js` to ensure clients receive the fresh snapshot.
