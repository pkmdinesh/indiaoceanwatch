# Data sources

Ocean Watch summarizes information fetched from official services. The authoritative pages remain linked from each dashboard card.

| Service | Authority | Primary reference |
|---|---|---|
| Tsunami and seismic | ITEWC–INCOIS | `https://tsunami.incois.gov.in/itews/DSSProducts/OPR/past90days.json` |
| Ocean State Forecast | INCOIS | `https://incois.gov.in/site/services/Alerts.html` |
| OSF district geometry | INCOIS Samudra API | `https://samudra.incois.gov.in/incoismobileappdata/rest/incois/districtpolygons` |
| Potential Fishing Zone | INCOIS | `https://incois.gov.in/MarineFisheries/TextDataHome?mfid=1&request_locale=en` |
| Cyclone joint bulletin | INCOIS–IMD | `https://incois.gov.in/site/services/jointbulletin.jsp` |
| Storm surge | ITEWC–INCOIS | `https://tsunami.incois.gov.in/TEWS/stormSurgeIndex.jsp` |
| Bathymetry fallback | GEBCO | `https://wms.gebco.net/mapserv` |

Machine-readable source registries are maintained under `scripts/sources/`. They are intended for auditing and tests; the current production parsers remain consolidated in `scripts/update-status.ps1` to avoid changing extraction behavior during the directory migration.
