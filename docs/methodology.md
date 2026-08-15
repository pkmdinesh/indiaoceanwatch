# Methodology

Ocean Watch presents a compact snapshot and does not replace official bulletins.

1. The updater requests official INCOIS, ITEWC, and IMD resources.
2. Source-specific parsing normalizes dates, severity names, state names, districts, and bulletin metadata.
3. OSF district advisories are accumulated using the priority order Warning → Alert → Watch → No Threat.
4. PFZ sectors with forecasts are displayed before sectors without forecasts.
5. Event products such as tsunami, seismic, cyclone, and storm surge retain their bulletin/event association and expiry rules.
6. The updater preserves a usable snapshot when individual sources fail and records source health separately.
7. The browser refreshes `status.json` without caching and the service worker provides the last successful snapshot when the network is unavailable.

Run `powershell -File scripts/validate-status.ps1` to validate the current snapshot. Run `powershell -File tests/validation/validate-status.ps1` to validate both the fixture and current snapshot.
