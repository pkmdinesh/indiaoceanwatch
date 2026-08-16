# Data sources

Ocean Watch summarizes information fetched from official services. The authoritative pages remain linked from each dashboard card.

| Service | Authority | Primary reference |
|---|---|---|
| Tsunami and seismic | ITEWC–INCOIS | `https://tsunami.incois.gov.in/itews/DSSProducts/OPR/past90days.json` |
| Ocean State Forecast | INCOIS | `https://incois.gov.in/site/services/Alerts.html` |
| OSF district geometry | INCOIS Samudra API | `https://samudra.incois.gov.in/incoismobileappdata/rest/incois/districtpolygons` |
| Potential Fishing Zone | INCOIS | `https://incois.gov.in/MarineFisheries/TextDataHome?mfid=1&request_locale=en` |
| PFZ forecast lines | INCOIS GeoServer WFS | `https://incois.gov.in/geoserver/PFZ_Automation/ows` (`PFZ_Automation:pfzlines`) |
| PFZ sectors | INCOIS GeoServer WFS | `https://incois.gov.in/geoserver/PFZ_Sectors/ows` (`PFZ_Sectors:sector_new`) |
| PFZ EEZ boundary | INCOIS GeoServer WFS | `https://incois.gov.in/geoserver/PFZ_EEZ/ows` (`PFZ_EEZ:indiaeez`) |
| PFZ landing centres | INCOIS GeoServer WFS | `https://incois.gov.in/geoserver/PFZ_LandingCentres/ows` (`PFZ_LandingCentres:LandingCenters_29Apr2024`) |
| PFZ bathymetry | INCOIS GeoServer WMS | `https://incois.gov.in/geoserver/BathymteryImage/wms` (`BathymteryImage:gebcobathymtery`) |
| Cyclone joint bulletin | INCOIS–IMD | `https://incois.gov.in/site/services/jointbulletin.jsp` |
| Storm surge | ITEWC–INCOIS | `https://tsunami.incois.gov.in/TEWS/stormSurgeIndex.jsp` |
| Bathymetry fallback | GEBCO | `https://wms.gebco.net/mapserv` |

Machine-readable source registries are maintained under `scripts/sources/`. They are intended for auditing and tests; the current production parsers remain consolidated in `scripts/update-status.ps1` to avoid changing extraction behavior during the directory migration.

The scheduled updater also runs `scripts/update-pfz-map.ps1`. It downloads the official vector layers, reduces coordinate precision, simplifies line vertices, and writes local GeoJSON under `data/`. These local files support GitHub Pages, map sharing, and offline fallback without requiring browser-side cross-origin WFS access. Bathymetry is raster-only and therefore remains a live optional WMS layer.
