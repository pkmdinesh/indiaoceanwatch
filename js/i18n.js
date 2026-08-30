// Ocean Watch Comprehensive Multilingual Internationalization (i18n) Engine
// 100% Native Dictionaries for all 10 Indian Coastal Languages:
// English (en), Hindi (hi), Tamil (ta), Telugu (te), Malayalam (ml),
// Bengali (bn), Marathi (mr), Gujarati (gu), Odia (or), Kannada (kn)

const APP_LANGUAGES = Object.freeze([
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' }
]);

const I18N_DICTIONARY = {
  en: {
    'brand.title': 'Ocean Watch',
    'header.title': 'Coastal Advisory Status',
    'header.subtitle': 'Tsunami · Cyclone · Storm Surge · Ocean State Forecast · Potential Fishing Zone',
    'header.snapshot': 'Official-source snapshot',
    'header.voice': 'Voice',
    'header.alerts': 'Alerts',
    'header.share': 'Share',
    'header.install': 'Install',
    'announcement.title': 'Active',
    'announcement.latest': 'LATEST:',
    'announcement.checking': 'Checking advisories…',
    'announcement.none': 'None',
    'announcement.updated': 'Updated',
    'announcement.bulletin': 'Bulletin',
    'osf.title': 'Ocean State Forecast',
    'osf.high_wave': 'High Wave',
    'osf.high_wave_kicker': 'High Wave, Swell Surge & Ocean Currents advisories',
    'osf.high_wave_card': 'Wave height',
    'osf.swell_surge': 'Swell Surge',
    'osf.swell_surge_card': 'Long-period swell',
    'osf.swell_surge_kicker': 'Swell waves & period warning',
    'osf.ocean_currents': 'Ocean Currents',
    'osf.ocean_currents_card': 'Current speed',
    'osf.ocean_currents_kicker': 'Surface current speed & direction',
    'osf.storm_surge': 'Storm Surge',
    'osf.storm_surge_kicker': 'Coastal inundation',
    'osf.map_button': 'Map View',
    'osf.visualize': 'Visualize',
    'osf.astronomical_tide': 'Predicted Astronomical Tide',
    'severity.warning': 'Warning',
    'severity.alert': 'Alert',
    'severity.watch': 'Watch',
    'severity.no_threat': 'No Threat',
    'severity.issued': 'Issued',
    'severity.districts': 'districts',
    'severity.states': 'States',
    'severity.no_active': 'No active warning in effect across coastal states.',
    'severity.loading': 'Loading advisory data…',
    'tsunami.title': 'Tsunami Advisory',
    'tsunami.kicker': 'Indian Tsunami Early Warning Centre',
    'tsunami.safe': 'No active tsunami threat for India',
    'tsunami.checking': 'Checking ITEWC Tsunami threat status.....',
    'tsunami.last_checked': 'Last Checked',
    'tsunami.warning': 'Tsunami Warning in effect',
    'tsunami.alert': 'Tsunami Alert in effect',
    'tsunami.watch': 'Tsunami Watch in effect',
    'tsunami.source': 'ITEWC ↗',
    'cyclone.title': 'Cyclone Advisory',
    'cyclone.kicker': 'INCOIS-IMD Joint Bulletin',
    'cyclone.safe': 'No active cyclone advisory',
    'cyclone.checked': 'When checked IMD CAP Alerts feed.',
    'cyclone.source': 'IMD ↗',
    'seismic.title': 'Latest seismic activity ≥ 6.5M',
    'seismic.kicker': 'Recent Coastal Earthquakes',
    'seismic.safe': 'No recent significant coastal earthquakes (M≥5.0).',
    'seismic.checking': 'Checking Latest Seismic Activity magnitude >= 6.5M',
    'seismic.source': 'Earthquake ↗',
    'seismic.dialog_title': 'Earthquake bulletin details',
    'seismic.dialog_meta': 'Official ITEWC information',
    'seismic.itewc_evaluation': 'ITEWC evaluation',
    'seismic.advice': 'Advice',
    'seismic.updates': 'Updates',
    'seismic.unavailable': 'No official ITEWC bulletin content is available for this event.',
    'seismic.open_bulletin': 'Open official bulletin ↗',
    'seismic.fact_magnitude': 'Magnitude',
    'seismic.fact_depth': 'Depth',
    'seismic.fact_date': 'Date',
    'seismic.fact_origin_time': 'Origin time',
    'seismic.fact_latitude': 'Latitude',
    'seismic.fact_longitude': 'Longitude',
    'seismic.fact_location': 'Location',
    'seismic.fact_bulletin': 'Bulletin',
    'seismic.tectonic_setting': 'Tectonic Setting',
    'seismic.setting_land': 'LAND',
    'seismic.setting_oceanic': 'OCEANIC / MARINE',
    'seismic.bathymetry': 'Bathymetry',
    'seismic.bathymetry_nil': 'NIL',
    'seismic.bathymetry_loading': 'Bathymetry: loading…',
    'seismic.bathymetry_unavailable': 'Bathymetry: unavailable',
    'seismic.coast_distance': 'Distance from nearest coast',
    'seismic.no_advice': 'No advice text was included in this bulletin.',
    'storm.title': 'Storm Surge Advisory',
    'storm.safe': 'No active storm surge bulletin',
    'storm.checking': 'Checking active storm surge status.....',
    'storm.caption': 'Official ITEWC bulletin feed when checked',
    'storm.bulletin': 'Bulletin ↗',
    'joint_bulletin.title': 'Joint Bulletin ↗',
    'joint_bulletin.none': 'No INCOIS-IMD joint bulletin is currently available.',
    'pfz.title': 'Potential Fishing Zone',
    'pfz.kicker': 'Today’s advisory sectors',
    'pfz.near_me': '📍 Near Me',
    'pfz.source': 'PFZ ↗',
    'pfz.forecast_date': 'Forecast',
    'pfz.valid_through': 'Valid through',
    'pfz.loading_sectors': 'Loading issued sectors…',
    'pfz.locked_title': 'Locked Landing Center',
    'pfz.home_harbor': 'Saved Home Harbor',
    'pfz.open_compass': '🧭 Open Compass',
    'pfz.lock_flc': '🔒 Lock FLC',
    'pfz.locked_flc': '🔒 Locked (Home)',
    'pfz.unlock': '🔓 Unlock',
    'pfz.landing_center': 'LANDING CENTER',
    'pfz.direction': '🧭 DIRECTION',
    'pfz.distance': '📏 DISTANCE',
    'pfz.depth': '🌊 DEPTH',
    'pfz.coordinates': '📌 COORDINATES',
    'pfz.bearing': 'Bearing',
    'pfz.landing_centers_title': 'landing centers',
    'pfz.target_line': 'Target Line',
    'pfz.no_line_issued': 'No active PFZ line issued today for',
    'other.title': 'Other Marine Advisories',
    'other.mhw': 'Marine Heat Wave (MHW)',
    'other.tchp': 'Cyclone Heat (TCHP)',
    'other.cbas': 'Coral Bleaching Alert (CBAS)',
    'other.tuna': 'Tuna ↗',
    'other.hilsa': 'Hilsa ↗',
    'other.hab': 'Harmful Algal Bloom ↗',
    'other.oil_spill': 'Oil Spill (OOSA) ↗',
    'other.svas': 'Small Vessel (SVAS) ↗',
    'other.sarat': 'SARAT ↗',
    'other.ports': 'Ports & Harbors ↗',
    'other.ship_route': 'Ship Route Forecast ↗',
    'other.location_specific': 'Location Specific Forecast ↗',
    'mhw.title': 'Marine Heat Wave',
    'mhw.subtitle': 'Official INCOIS Regional Observations',
    'mhw.open_page': 'Open Marine Heat Wave page ↗',
    'mhw.unavailable': 'Marine Heat Wave message is unavailable. Open the official page for the latest information.',
    'cbas.title': '🪸 Coral Bleaching Alert System',
    'cbas.subtitle': 'INCOIS CBAS · Satellite Thermal Stress Monitoring',
    'cbas.guide_title': 'ℹ️ What do these metrics mean?',
    'cbas.hotspot_def': 'Instantaneous Sea Surface Temperature (SST) anomaly above the maximum monthly mean — indicates immediate thermal stress.',
    'cbas.dhw_def': 'Thermal stress accumulated over a 12-week window (°C-weeks) — indicates bleaching severity and potential mortality risk.',
    'cbas.hotspot_lbl': 'HotSpot (Instant):',
    'cbas.dhw_lbl': 'DHW (12-Wk Cumulative):',
    'cbas.view_map': '🗺️ View National Stress Map ↗',
    'cbas.official_portal': 'Official CBAS Portal ↗',
    'cbas.no_stress': 'No Stress',
    'tchp.title': '🌪️ Tropical Cyclone Heat Potential (TCHP)',
    'tchp.subtitle': 'INCOIS-ROMS 5-Day Ocean Thermal Energy Forecast',
    'tchp.tab_tchp': 'TCHP (kJ/cm²)',
    'tchp.tab_sst': 'SST (°C)',
    'tchp.tab_ssha': 'SSHA (m)',
    'tchp.play': '▶ Play',
    'tchp.pause': '⏸ Pause',
    'tchp.loading': 'Loading forecast map…',
    'tchp.guide_title': 'ℹ️ Cyclone Intensification Energy Guide:',
    'tchp.low_unfavorable': 'Low / Unfavorable',
    'tchp.moderate_favorable': 'Moderate / Favorable',
    'tchp.rapid_intensification': '⚠️ Rapid Intensification',
    'tchp.guide_desc': 'Tropical Cyclone Heat Potential measures integrated upper-ocean thermal energy down to the 26°C isotherm. High TCHP (>80 kJ/cm²) prevents cyclone-induced cooling and fuels severe cyclone intensification.',
    'map.osf_title': 'Ocean State Forecast Map',
    'map.osf_subtitle': 'High Wave · Swell Surge · Ocean Currents',
    'map.osf_note': 'Markers represent state-level advisory records fetched from INCOIS. Use the layer control to select services.',
    'map.pfz_title': 'Potential Fishing Zone Map',
    'map.pfz_subtitle': 'Official INCOIS PFZ vector layers',
    'map.pfz_lines': 'PFZ forecast lines',
    'map.pfz_sectors': 'Sectors',
    'map.pfz_eez': 'EEZ',
    'map.pfz_centers': 'Landing centres',
    'map.pfz_chlorophyll': 'Chlorophyll-a',
    'tide.status_title': '🌊 Tidal Status',
    'tide.type_label': 'Tide Type:',
    'share.title': 'Share Ocean Watch',
    'share.subtitle': 'Scan the QR code or share the page link',
    'share.copy': 'Copy link',
    'notify.title': 'Advisory Notifications',
    'notify.subtitle': 'Real-time alerts for Warnings & Bulletins',
    'notify.enable_title': 'Enable Web Alerts',
    'notify.enable_desc': 'Receive instant alerts on your device when new warnings or official bulletins are issued.',
    'notify.enable_btn': 'Enable',
    'notify.preferences': 'Alert Preferences',
    'notify.opt_warnings': 'High Wave & Swell Warnings (Red)',
    'notify.opt_warnings_sub': 'Critical sea state warnings',
    'notify.opt_alerts': 'High Wave & Swell Alerts (Orange)',
    'notify.opt_alerts_sub': 'Elevated sea state alerts',
    'notify.opt_tsunami': 'Tsunami Bulletins',
    'notify.opt_tsunami_sub': 'Official ITEWC bulletins and warnings',
    'notify.opt_cyclone': 'Cyclone & Joint Bulletins',
    'notify.opt_cyclone_sub': 'IMD/INCOIS cyclone advisories',
    'notify.opt_storm': 'Storm Surge Bulletins',
    'notify.opt_storm_sub': 'Coastal inundation bulletins',
    'notify.send_test': 'Send Test Alert',
    'voice.dialog_title': 'Coastal Audio Bulletin',
    'voice.dialog_subtitle': 'Multilingual Voice Summary (INCOIS / ITEWC / IMD)',
    'voice.lang_label': 'Language:',
    'voice.play_audio': '▶ Play Audio',
    'compass.title': '🧭 Live Nautical Compass',
    'compass.subtitle': 'Device Location to PFZ Forecast Point',
    'compass.target_line': 'PFZ Forecast Line Target',
    'compass.calc_course': '🎯 CALCULATING COURSE…',
    'compass.heading': 'Vessel Heading',
    'compass.bearing': 'Target Bearing',
    'compass.distance': 'Distance (Device to PFZ)',
    'compass.rotate_sensor': 'Rotate Heading (Sensor Simulator):',
    'dialog.district_advisories': 'District Advisories',
    'dialog.district_guidance': 'Coastal district guidance',
    'dialog.no_district_details': 'District details will appear after the next source update.',
    'dialog.open_official_map': 'Open the official map for full details.',
    'dialog.coastal_area': 'Coastal area',
    'dialog.close': 'Close',
    'dialog.share': 'Share',
    'dialog.voice_summary': 'Ocean Watch Audio Broadcast',
    'dialog.voice_listen': 'Play Broadcast',
    'dialog.voice_pause': 'Pause',
    'footer.auto_update': 'Auto-update:',
    'footer.auto_update_val': 'Every 15 mins',
    'footer.disclaimer_title': 'Disclaimer:',
    'footer.disclaimer': 'Information is fetched from official sources; however, there may be a delay before updates are reflected. For accuracy, always verify the latest official bulletins.',
    'footer.source': 'Data source: INCOIS–MoES ↗',
    'footer.visits': 'visits',
    'contact.title': 'Ocean Information Portal',
    'contact.subtitle': 'Under Beta Testing',
    'joint_bulletin.default_msg': 'INCOIS-IMD Joint Special Bulletin',
    'joint_bulletin.active_prefix': 'Active Bulletin',
    'joint_bulletin.issued_prefix': 'Bulletin issued',
        'tide.wind': 'Wind',
    'tide.wave': 'Wave',
    'tide.swell': 'Swell',
    'tide.current': 'Current',
    'tide.normal': 'Normal',
    'tide.wind_sea': 'Wind & Sea',
    'tide.tide_state': 'Tide State',
    'tide.moon_tide_type': 'Moon & Tide Type',
    'tide.rising': '▲ Rising (Flood)',
    'tide.falling': '▼ Falling (Ebb)',
    'tide.spring_tide': 'Spring Tide',
    'tide.neap_tide': 'Neap Tide',
    'tide.high_tide': 'High Tide (IST)',
    'tide.low_tide': 'Low Tide (IST)',
    'tide.no_warnings': '✓ No active coastal warnings for',
    'tide.active_for': 'active for',
    'tide.coast': 'Coast',
    'tide.regional_advisory': 'Regional Advisory for',
    'osf.advisory_note': 'A state may appear under multiple levels because district and coastal-stretch conditions differ.'
  },
  hi: {
    'brand.title': 'ओशन वॉच',
    'header.title': 'तटीय चेतावनी स्थिति',
    'header.subtitle': 'सुनामी · चक्रवात · तूफान की लहरें · समुद्री राज्य पूर्वानुमान · संभावित मत्स्य पालन क्षेत्र',
    'header.snapshot': 'आधिकारिक स्रोत स्नैपशॉट',
    'header.voice': 'आवाज़',
    'header.alerts': 'अलर्ट',
    'header.share': 'शेयर',
    'header.install': 'इंस्टॉल',
    'announcement.title': 'सक्रिय',
    'announcement.latest': 'ताज़ा अपडेट:',
    'announcement.checking': 'ताज़ा फ़ीड की जाँच हो रही है…',
    'announcement.none': 'कोई नहीं',
    'announcement.updated': 'अद्यतन',
    'announcement.bulletin': 'बुलेटिन',
    'osf.title': 'महासागर राज्य पूर्वानुमान',
    'osf.high_wave': 'ऊँची लहरें',
    'osf.high_wave_kicker': 'ऊँची लहरें, स्वेल सर्ज और समुद्री धाराएँ चेतावनियाँ',
    'osf.high_wave_card': 'लहरों की ऊँचाई',
    'osf.swell_surge': 'स्वेल सर्ज',
    'osf.swell_surge_card': 'लंबी अवधि की स्वेल लहरें',
    'osf.swell_surge_kicker': 'स्वेल तरंगें और अवधि चेतावनी',
    'osf.ocean_currents': 'समुद्री धाराएँ',
    'osf.ocean_currents_card': 'धारा की गति',
    'osf.ocean_currents_kicker': 'सतही धारा की गति और दिशा',
    'osf.storm_surge': 'तूफानी लहरें',
    'osf.storm_surge_kicker': 'तटीय जलप्लावन',
    'osf.map_button': 'मानचित्र देखें',
    'osf.visualize': 'विज़ुअलाइज़',
    'osf.astronomical_tide': 'पूर्वानुमानित खगोलीय ज्वार',
    'severity.warning': 'चेतावनी (Warning)',
    'severity.alert': 'अलर्ट (Alert)',
    'severity.watch': 'निगरानी (Watch)',
    'severity.no_threat': 'कोई ख़तरा नहीं',
    'severity.issued': 'जारी',
    'severity.districts': 'जिले',
    'severity.states': 'राज्य',
    'severity.no_active': 'तटीय राज्यों में कोई सक्रिय चेतावनी प्रभावी नहीं है।',
    'severity.loading': 'चेतावनी डेटा लोड हो रहा है…',
    'tsunami.title': 'सुनामी चेतावनी',
    'tsunami.kicker': 'भारतीय सुनामी पूर्व चेतावनी केंद्र',
    'tsunami.safe': 'भारत के तटों के लिए कोई सुनामी ख़तरा नहीं',
    'tsunami.checking': 'ITEWC सुनामी स्थिति की जाँच की जा रही है.....',
    'tsunami.last_checked': 'अंतिम जाँच',
    'tsunami.warning': 'सुनामी चेतावनी प्रभावी',
    'tsunami.alert': 'सुनामी अलर्ट प्रभावी',
    'tsunami.watch': 'सुनामी वॉच प्रभावी',
    'tsunami.source': 'ITEWC ↗',
    'cyclone.title': 'चक्रवात चेतावनी',
    'cyclone.kicker': 'इनकोइस-आईएमडी संयुक्त बुलेटिन',
    'cyclone.safe': 'कोई सक्रिय चक्रवात चेतावनी नहीं',
    'cyclone.checked': 'आईएमडी कैप अलर्ट फ़ीड की जाँच के अनुसार।',
    'cyclone.source': 'IMD ↗',
    'seismic.title': 'हालिया भूकंपीय गतिविधि ≥ 6.5M',
    'seismic.kicker': 'हालिया तटीय भूकंप',
    'seismic.safe': 'हाल ही में कोई बड़ा तटीय भूकंप नहीं (M≥5.0)।',
    'seismic.checking': 'नवीनतम भूकंपीय गतिविधि की जाँच हो रही है >= 6.5M',
    'seismic.source': 'भूकंप ↗',
    'seismic.dialog_title': 'भूकंप बुलेटिन विवरण',
    'seismic.dialog_meta': 'आधिकारिक ITEWC जानकारी',
    'seismic.itewc_evaluation': 'ITEWC मूल्यांकन',
    'seismic.advice': 'सलाह / परामर्श',
    'seismic.updates': 'अद्यतन जानकारी',
    'seismic.unavailable': 'इस घटना के लिए कोई आधिकारिक ITEWC बुलेटिन उपलब्ध नहीं है।',
    'seismic.open_bulletin': 'आधिकारिक बुलेटिन खोलें ↗',
    'seismic.fact_magnitude': 'तीव्रता (Magnitude)',
    'seismic.fact_depth': 'गहराई (Depth)',
    'seismic.fact_date': 'दिनांक',
    'seismic.fact_origin_time': 'उत्पत्ति समय (Origin time)',
    'seismic.fact_latitude': 'अक्षांश (Latitude)',
    'seismic.fact_longitude': 'देशांतर (Longitude)',
    'seismic.fact_location': 'स्थान',
    'seismic.fact_bulletin': 'बुलेटिन (Bulletin)',
    'seismic.tectonic_setting': 'टेक्टॉनिक स्थिति',
    'seismic.setting_land': 'स्थलीय (LAND)',
    'seismic.setting_oceanic': 'सागरीय (OCEANIC / MARINE)',
    'seismic.bathymetry': 'जल-गहराई (Bathymetry)',
    'seismic.bathymetry_nil': 'शून्य (NIL)',
    'seismic.bathymetry_loading': 'गहराई लोड हो रही है…',
    'seismic.bathymetry_unavailable': 'गहराई अनुपलब्ध',
    'seismic.coast_distance': 'निकटतम तट से दूरी',
    'seismic.no_advice': 'इस बुलेटिन में कोई सलाह शामिल नहीं है।',
    'storm.title': 'तूफानी लहरों की चेतावनी',
    'storm.safe': 'कोई सक्रिय तूफान वृद्धि बुलेटिन नहीं',
    'storm.checking': 'सक्रिय तूफान वृद्धि स्थिति की जाँच की जा रही है.....',
    'storm.caption': 'जाँच के समय आधिकारिक ITEWC बुलेटिन फ़ीड',
    'storm.bulletin': 'बुलेटिन ↗',
    'joint_bulletin.title': 'संयुक्त बुलेटिन ↗',
    'joint_bulletin.none': 'वर्तमान में कोई इनकोइस-आईएमडी संयुक्त बुलेटिन उपलब्ध नहीं है।',
    'pfz.title': 'संभावित मत्स्य पालन क्षेत्र (PFZ)',
    'pfz.kicker': 'आज के मछली पकड़ने के क्षेत्र',
    'pfz.near_me': '📍 मेरे निकट',
    'pfz.source': 'PFZ ↗',
    'pfz.forecast_date': 'पूर्वानुमान',
    'pfz.valid_through': 'मान्य तक',
    'pfz.loading_sectors': 'जारी किए गए क्षेत्रों को लोड किया जा रहा है…',
    'pfz.locked_title': 'लॉक किया गया लैंडिंग सेंटर',
    'pfz.home_harbor': 'सुरक्षित गृह बंदरगाह',
    'pfz.open_compass': '🧭 कम्पास खोलें',
    'pfz.lock_flc': '🔒 FLC लॉक करें',
    'pfz.locked_flc': '🔒 लॉक्ड (होम)',
    'pfz.unlock': '🔓 अनलॉक',
    'pfz.landing_center': 'लैंडिंग सेंटर',
    'pfz.direction': '🧭 दिशा',
    'pfz.distance': '📏 दूरी',
    'pfz.depth': '🌊 गहराई',
    'pfz.coordinates': '📌 निर्देशांक',
    'pfz.bearing': 'बेयरिंग',
    'pfz.landing_centers_title': 'लैंडिंग केंद्र',
    'pfz.target_line': 'लक्ष्य रेखा',
    'pfz.no_line_issued': 'के लिए आज कोई सक्रिय PFZ रेखा जारी नहीं की गई है',
    'other.title': 'अन्य समुद्री सेवाएँ',
    'other.mhw': 'मरीन हीटवेव (MHW)',
    'other.tchp': 'चक्रवात ऊष्मा (TCHP)',
    'other.cbas': 'मूंगा विरंजन चेतावनी (CBAS)',
    'other.tuna': 'टूना ↗',
    'other.hilsa': 'हिल्सा ↗',
    'other.hab': 'हानिकारक शैवाल ↗',
    'other.oil_spill': 'तेल रिसाव (OOSA) ↗',
    'other.svas': 'छोटी नौकाएँ (SVAS) ↗',
    'other.sarat': 'सारट (SARAT) ↗',
    'other.ports': 'बंदरगाह पूर्वानुमान ↗',
    'other.ship_route': 'जहाज मार्ग ↗',
    'other.location_specific': 'स्थान-विशिष्ट पूर्वानुमान ↗',
    'mhw.title': 'मरीन हीट वेव',
    'mhw.subtitle': 'आधिकारिक INCOIS क्षेत्रीय प्रेक्षण',
    'mhw.open_page': 'मरीन हीट वेव पेज खोलें ↗',
    'mhw.unavailable': 'मरीन हीट वेव संदेश अनुपलब्ध है। नवीनतम जानकारी के लिए आधिकारिक पेज खोलें।',
    'cbas.title': '🪸 प्रवाल विरंजन चेतावनी प्रणाली (CBAS)',
    'cbas.subtitle': 'INCOIS CBAS · उपग्रह थर्मल तनाव निगरानी',
    'cbas.guide_title': 'ℹ️ इन मैट्रिक्स का क्या अर्थ है?',
    'cbas.hotspot_def': 'अधिकतम मासिक औसत से ऊपर तात्कालिक समुद्र सतह तापमान विसंगति — तत्काल थर्मल तनाव को दर्शाती है।',
    'cbas.dhw_def': '12-सप्ताह की अवधि में संचित थर्मल तनाव (°C-सप्ताह) — विरंजन गंभीरता और प्रवाल मृत्यु दर के जोखिम को दर्शाता है।',
    'cbas.hotspot_lbl': 'हॉटस्पॉट (तात्कालिक):',
    'cbas.dhw_lbl': 'DHW (12-सप्ताह संचयी):',
    'cbas.view_map': '🗺️ राष्ट्रीय तनाव मानचित्र देखें ↗',
    'cbas.official_portal': 'आधिकारिक CBAS पोर्टल ↗',
    'cbas.no_stress': 'तनाव मुक्त',
    'tchp.title': '🌪️ उष्णकटिबंधीय चक्रवात ऊष्मा क्षमता (TCHP)',
    'tchp.subtitle': 'INCOIS-ROMS 5-दिवसीय महासागर थर्मल ऊर्जा पूर्वानुमान',
    'tchp.tab_tchp': 'TCHP (kJ/cm²)',
    'tchp.tab_sst': 'SST (°C)',
    'tchp.tab_ssha': 'SSHA (m)',
    'tchp.play': '▶ चलाएँ',
    'tchp.pause': '⏸ रोकें',
    'tchp.loading': 'पूर्वानुमान मानचित्र लोड हो रहा है…',
    'tchp.guide_title': 'ℹ️ चक्रवात तीव्रीकरण ऊर्जा मार्गदर्शिका:',
    'tchp.low_unfavorable': 'कम / प्रतिकूल',
    'tchp.moderate_favorable': 'मध्यम / अनुकूल',
    'tchp.rapid_intensification': '⚠️ तीव्र चक्रवाती विकास',
    'tchp.guide_desc': 'उष्णकटिबंधीय चक्रवात ताप क्षमता 26°C इज़ोथर्म तक ऊपरी महासागरीय तापीय ऊर्जा को मापती है। उच्च TCHP (>80 kJ/cm²) चक्रवात जनित शीतलन को रोकता है और भयंकर चक्रवातों को ऊर्जा देता है।',
    'map.osf_title': 'महासागर राज्य पूर्वानुमान मानचित्र',
    'map.osf_subtitle': 'ऊँची लहरें · स्वेल सर्ज · समुद्री धाराएँ',
    'map.osf_note': 'मार्कर INCOIS से प्राप्त राज्य-स्तरीय चेतावनी रिकॉर्ड दर्शाते हैं।',
    'map.pfz_title': 'संभावित मत्स्य पालन क्षेत्र मानचित्र',
    'map.pfz_subtitle': 'आधिकारिक INCOIS PFZ वेक्टर परतें',
    'map.pfz_lines': 'PFZ पूर्वानुमान रेखाएँ',
    'map.pfz_sectors': 'क्षेत्र (Sectors)',
    'map.pfz_eez': 'विशेष आर्थिक क्षेत्र (EEZ)',
    'map.pfz_centers': 'लैंडिंग केंद्र',
    'map.pfz_chlorophyll': 'क्लोरोफिल-ए',
    'tide.status_title': '🌊 ज्वार की स्थिति',
    'tide.type_label': 'ज्वार का प्रकार:',
    'share.title': 'ओशन वॉच साझा करें',
    'share.subtitle': 'QR कोड स्कैन करें या लिंक साझा करें',
    'share.copy': 'लिंक कॉपी करें',
    'notify.title': 'चेतावनी सूचनाएं',
    'notify.subtitle': 'चेतावनियों और बुलेटिनों के लिए रीयल-टाइम अलर्ट',
    'notify.enable_title': 'वेब अलर्ट सक्षम करें',
    'notify.enable_desc': 'नई चेतावनियाँ जारी होने पर तुरंत अलर्ट प्राप्त करें।',
    'notify.enable_btn': 'सक्षम करें',
    'notify.preferences': 'अलर्ट प्राथमिकताएं',
    'notify.opt_warnings': 'ऊँची लहरें और स्वेल चेतावनियाँ (लाल)',
    'notify.opt_warnings_sub': 'गंभीर समुद्री चेतावनी',
    'notify.opt_alerts': 'ऊँची लहरें और स्वेल अलर्ट (नारंगी)',
    'notify.opt_alerts_sub': 'मध्यम समुद्री अलर्ट',
    'notify.opt_tsunami': 'सुनामी बुलेटिन',
    'notify.opt_tsunami_sub': 'आधिकारिक ITEWC बुलेटिन',
    'notify.opt_cyclone': 'चक्रवात और संयुक्त बुलेटिन',
    'notify.opt_cyclone_sub': 'IMD/INCOIS चक्रवात सलाह',
    'notify.opt_storm': 'तूफान वृद्धि बुलेटिन',
    'notify.opt_storm_sub': 'तटीय जलप्लावन बुलेटिन',
    'notify.send_test': 'परीक्षण अलर्ट भेजें',
    'voice.dialog_title': 'तटीय ऑडियो बुलेटिन',
    'voice.dialog_subtitle': 'बहुभाषी वॉयस सारांश (INCOIS / ITEWC / IMD)',
    'voice.lang_label': 'भाषा:',
    'voice.play_audio': '▶ ऑडियो चलाएँ',
    'compass.title': '🧭 लाइव नॉटिकल कम्पास',
    'compass.subtitle': 'डिवाइस स्थान से PFZ पूर्वानुमान बिंदु',
    'compass.target_line': 'PFZ पूर्वानुमान रेखा लक्ष्य',
    'compass.calc_course': '🎯 मार्ग की गणना हो रही है…',
    'compass.heading': 'जहाज की दिशा (Heading)',
    'compass.bearing': 'लक्ष्य बेयरिंग (Bearing)',
    'compass.distance': 'दूरी (डिवाइस से PFZ)',
    'compass.rotate_sensor': 'दिशा घुमाएँ (सेंसर सिम्युलेटर):',
    'dialog.district_advisories': 'जिला स्तरीय परामर्श',
    'dialog.district_guidance': 'तटीय जिलों के लिए मार्गदर्शन',
    'dialog.no_district_details': 'अगले स्रोत अपडेट के बाद जिले का विवरण दिखाई देगा।',
    'dialog.open_official_map': 'पूर्ण विवरण के लिए आधिकारिक मानचित्र खोलें।',
    'dialog.coastal_area': 'तटीय क्षेत्र',
    'dialog.close': 'बंद करें',
    'dialog.share': 'साझा करें',
    'dialog.voice_summary': 'ओशन वॉच ऑडियो बुलेटिन',
    'dialog.voice_listen': 'ऑडियो चलाएँ',
    'dialog.voice_pause': 'रोकें',
    'footer.auto_update': 'स्वचालित अपडेट:',
    'footer.auto_update_val': 'प्रत्येक 15 मिनट',
    'footer.disclaimer_title': 'अस्वीकरण:',
    'footer.disclaimer': 'जानकारी आधिकारिक स्रोतों से ली गई है; सटीकता के लिए हमेशा नवीनतम आधिकारिक बुलेटिन सत्यापित करें।',
    'footer.source': 'डेटा स्रोत: INCOIS–MoES ↗',
    'footer.visits': 'विज़िट्स',
    'contact.title': 'महासागर सूचना पोर्टल',
    'contact.subtitle': 'बीटा परीक्षण के तहत',
    'joint_bulletin.default_msg': 'इन्कॉइस-आईएमडी संयुक्त विशेष बुलेटिन',
    'joint_bulletin.active_prefix': 'सक्रिय बुलेटिन',
    'joint_bulletin.issued_prefix': 'बुलेटिन जारी',
        'tide.wind': 'हवा',
    'tide.wave': 'लहरें',
    'tide.swell': 'उतार-चढ़ाव',
    'tide.current': 'धारा',
    'tide.normal': 'सामान्य',
    'tide.wind_sea': 'हवा और समुद्र',
    'tide.tide_state': 'ज्वार की स्थिति',
    'tide.moon_tide_type': 'चंद्रमा और ज्वार प्रकार',
    'tide.rising': '▲ चढ़ता ज्वार (Flood)',
    'tide.falling': '▼ उतरता भाटा (Ebb)',
    'tide.spring_tide': 'दीर्घ ज्वार (Spring)',
    'tide.neap_tide': 'लघु ज्वार (Neap)',
    'tide.high_tide': 'उच्च ज्वार (High Tide IST)',
    'tide.low_tide': 'निम्न भाटा (Low Tide IST)',
    'tide.no_warnings': '✓ कोई सक्रिय तटीय चेतावनी नहीं:',
    'tide.active_for': 'सक्रिय चेतावनी:',
    'tide.coast': 'तट',
    'tide.regional_advisory': 'क्षेत्रीय परामर्श:',
    'osf.advisory_note': 'एक राज्य कई स्तरों के तहत दिखाई दे सकता है क्योंकि जिले और तटीय क्षेत्र की स्थितियाँ भिन्न हो सकती हैं।'
  },
  ta: {
    'brand.title': 'ஓஷன் வாட்ச்',
    'header.title': 'கடலோர எச்சரிக்கை நிலை',
    'header.subtitle': 'சுனாமி · புயல் · அலை சீற்றம் · கடல் நிலை முன்னறிவிப்பு · மீன்பிடி மண்டலம்',
    'header.snapshot': 'அதிகாரப்பூர்வ நேரலைத் தகவல்',
    'header.voice': 'குரல்',
    'header.alerts': 'அறிவிப்பு',
    'header.share': 'பகிர்',
    'header.install': 'நிறுவு',
    'announcement.title': 'செயலில் உள்ளவை',
    'announcement.latest': 'சமீபத்தியவை:',
    'announcement.checking': 'தகவல்கள் சரிபார்க்கப்படுகின்றன…',
    'announcement.none': 'எதுவுமில்லை',
    'announcement.updated': 'புதுப்பிக்கப்பட்டது',
    'announcement.bulletin': 'அறிக்கை',
    'osf.title': 'கடல் நிலை முன்னறிவிப்பு',
    'osf.high_wave': 'உயர்ந்த அலைகள்',
    'osf.high_wave_kicker': 'உயர்ந்த அலைகள், கள்ளக்கடல் மற்றும் நீரோட்ட எச்சரிக்கைகள்',
    'osf.high_wave_card': 'அலை உயரம்',
    'osf.swell_surge': 'ஸ்வெல் அலை சீற்றம்',
    'osf.swell_surge_card': 'நீண்ட அலைவுக்கால அலைகள்',
    'osf.swell_surge_kicker': 'கள்ளக்கடல் மற்றும் அலைக்காலம் எச்சரிக்கை',
    'osf.ocean_currents': 'கடல் நீரோட்டங்கள்',
    'osf.ocean_currents_card': 'நீரோட்ட வேகம்',
    'osf.ocean_currents_kicker': 'நீரோட்ட வேகம் மற்றும் திசை',
    'osf.storm_surge': 'புயல் அலை சீற்றம்',
    'osf.storm_surge_kicker': 'புயல் வெள்ள எச்சரிக்கை',
    'osf.map_button': 'வரைபடம்',
    'osf.visualize': 'காட்சிப்படுத்து',
    'osf.astronomical_tide': 'வானியல் அலை முன்னறிவிப்பு',
    'severity.warning': 'எச்சரிக்கை (Warning)',
    'severity.alert': 'எச்சரிக்கை (Alert)',
    'severity.watch': 'கண்காணிப்பு (Watch)',
    'severity.no_threat': 'அச்சுறுத்தல் இல்லை',
    'severity.issued': 'வெளியிடப்பட்டது',
    'severity.districts': 'மாவட்டங்கள்',
    'severity.states': 'மாநிலங்கள்',
    'severity.no_active': 'கடலோர மாவட்டங்களில் தற்போதைய அச்சுறுத்தல்கள் ஏதுமில்லை.',
    'severity.loading': 'தகவல்கள் பதிவேற்றப்படுகின்றன…',
    'tsunami.title': 'சுனாமி எச்சரிக்கை',
    'tsunami.kicker': 'இந்திய சுனாமி முன்னெச்சரிக்கை மையம்',
    'tsunami.safe': 'இந்திய கடற்கரைக்கு சுனாமி அச்சுறுத்தல் இல்லை',
    'tsunami.checking': 'ITEWC சுனாமி நிலை சரிபார்க்கப்படுகிறது.....',
    'tsunami.last_checked': 'கடைசி சோதனை',
    'tsunami.warning': 'சுனாமி எச்சரிக்கை விடுக்கப்பட்டுள்ளது',
    'tsunami.alert': 'சுனாமி அலர்ட் விடுக்கப்பட்டுள்ளது',
    'tsunami.watch': 'சுனாமி கண்காணிப்பு விடுக்கப்பட்டுள்ளது',
    'tsunami.source': 'ITEWC ↗',
    'cyclone.title': 'சூறாவளி புயல் எச்சரிக்கை',
    'cyclone.kicker': 'இன்காய்ஸ்-ஐஎம்டி கூட்டு அறிக்கை',
    'cyclone.safe': 'செயலில் உள்ள புயல் எச்சரிக்கை ஏதுமில்லை',
    'cyclone.checked': 'IMD CAP எச்சரிக்கை தகவலின்படி.',
    'cyclone.source': 'IMD ↗',
    'seismic.title': 'சமீபத்திய நிலநடுக்கங்கள் ≥ 6.5M',
    'seismic.kicker': 'சமீபத்திய கடலோர நிலநடுக்கங்கள்',
    'seismic.safe': 'சமீபத்தில் பெரிய கடலோர நிலநடுக்கங்கள் இல்லை (M≥5.0).',
    'seismic.checking': 'நிலநடுக்க நிலவரம் சரிபார்க்கப்படுகிறது >= 6.5M',
    'seismic.source': 'நிலநடுக்கம் ↗',
    'seismic.dialog_title': 'நிலநடுக்க அறிக்கை விவரங்கள்',
    'seismic.dialog_meta': 'அதிகாரப்பூர்வ ITEWC தகவல்',
    'seismic.itewc_evaluation': 'ITEWC மதிப்பீடு',
    'seismic.advice': 'ஆலோசனை / வழிகாட்டுதல்',
    'seismic.updates': 'சமீபத்திய புதுப்பிப்புகள்',
    'seismic.unavailable': 'இந்த நிகழ்விற்கு அதிகாரப்பூர்வ ITEWC அறிக்கை கிடைக்கவில்லை.',
    'seismic.open_bulletin': 'அதிகாரப்பூர்வ அறிக்கையைத் திற ↗',
    'seismic.fact_magnitude': 'அளவு (Magnitude)',
    'seismic.fact_depth': 'ஆழம் (Depth)',
    'seismic.fact_date': 'தேதி',
    'seismic.fact_origin_time': 'உருவான நேரம் (Origin time)',
    'seismic.fact_latitude': 'அட்சரேகை (Latitude)',
    'seismic.fact_longitude': 'தீர்க்கரேகை (Longitude)',
    'seismic.fact_location': 'இடம்',
    'seismic.fact_bulletin': 'அறிக்கை (Bulletin)',
    'seismic.tectonic_setting': 'டெக்டோனிக் அமைப்பு',
    'seismic.setting_land': 'நிலப்பரப்பு (LAND)',
    'seismic.setting_oceanic': 'கடல்சார் (OCEANIC / MARINE)',
    'seismic.bathymetry': 'ஆழ்கடல் ஆழம் (Bathymetry)',
    'seismic.bathymetry_nil': 'இல்லை (NIL)',
    'seismic.bathymetry_loading': 'ஆழம் கணக்கிடப்படுகிறது…',
    'seismic.bathymetry_unavailable': 'ஆழம் கிடைக்கவில்லை',
    'seismic.coast_distance': 'அருகிலுள்ள கடற்கரையிலிருந்து தொலைவு',
    'seismic.no_advice': 'இந்த அறிக்கையில் ஆலோசனை உரை எதுவும் சேர்க்கப்படவில்லை.',
    'storm.title': 'புயல் அலை சீற்ற எச்சரிக்கை',
    'storm.safe': 'செயலில் உள்ள புயல் அலை அறிக்கை இல்லை',
    'storm.checking': 'புயல் அலை நிலை சரிபார்க்கப்படுகிறது.....',
    'storm.caption': 'அதிகாரப்பூர்வ ITEWC நேரலை அறிக்கை',
    'storm.bulletin': 'அறிக்கை ↗',
    'joint_bulletin.title': 'கூட்டு அறிக்கை ↗',
    'joint_bulletin.none': 'தற்போது INCOIS-IMD கூட்டு அறிக்கை எதுவும் இல்லை.',
    'pfz.title': 'சாத்தியமான மீன்பிடி மண்டலம் (PFZ)',
    'pfz.kicker': 'இன்றைய மீன்பிடி பகுதிகள்',
    'pfz.near_me': '📍 என் அருகில்',
    'pfz.source': 'PFZ ↗',
    'pfz.forecast_date': 'முன்னறிவிப்பு',
    'pfz.valid_through': 'செல்லுபடியாகும் காலம்',
    'pfz.loading_sectors': 'பகுதிகள் பதிவேற்றப்படுகின்றன…',
    'pfz.locked_title': 'சேமிக்கப்பட்ட இறங்கு தளம்',
    'pfz.home_harbor': 'சொந்த துறைமுகம்',
    'pfz.open_compass': '🧭 திசைகாட்டி திற',
    'pfz.lock_flc': '🔒 FLC பூட்டு',
    'pfz.locked_flc': '🔒 பூட்டப்பட்டது',
    'pfz.unlock': '🔓 திற',
    'pfz.landing_center': 'மீன் இறங்கு தளம்',
    'pfz.direction': '🧭 திசை',
    'pfz.distance': '📏 தொலைவு',
    'pfz.depth': '🌊 ஆழம்',
    'pfz.coordinates': '📌 அட்சரேகை & தீர்க்கரேகை',
    'pfz.bearing': 'கோணம்',
    'pfz.landing_centers_title': 'இறங்கு தளங்கள்',
    'pfz.target_line': 'இலக்கு கோடு',
    'pfz.no_line_issued': 'இன்று மீன்பிடி மண்டல கோடு எதுவும் வெளியிடப்படவில்லை -',
    'other.title': 'பிற கடல்சார் சேவைகள்',
    'other.mhw': 'கடல் வெப்ப அலை (MHW)',
    'other.tchp': 'புயல் வெப்ப ஆற்றல் (TCHP)',
    'other.cbas': 'பவளப்பாறை எச்சரிக்கை (CBAS)',
    'other.tuna': 'சூரை மீன் ↗',
    'other.hilsa': 'ஹில்சா மீன் ↗',
    'other.hab': 'நச்சு பாசி பெருக்கம் ↗',
    'other.oil_spill': 'எண்ணெய் கசிவு ↗',
    'other.svas': 'சிறு படகுகள் ↗',
    'other.sarat': 'சாராட் (SARAT) ↗',
    'other.ports': 'துறைமுகங்கள் ↗',
    'other.ship_route': 'கப்பல் வழித்தடம் ↗',
    'other.location_specific': 'குறிப்பிட்ட பகுதி முன்னறிவிப்பு ↗',
    'mhw.title': 'கடல் வெப்ப அலை (Marine Heat Wave)',
    'mhw.subtitle': 'அதிகாரப்பூர்வ இன்காய்ஸ் பிராந்திய கண்காணிப்பு',
    'mhw.open_page': 'கடல் வெப்ப அலை பக்கத்தைத் திற ↗',
    'mhw.unavailable': 'கடல் வெப்ப அலை தகவல் தற்போது கிடைக்கவில்லை.',
    'cbas.title': '🪸 பவளப்பாறை வெளுப்பு எச்சரிக்கை அமைப்பு (CBAS)',
    'cbas.subtitle': 'INCOIS CBAS · செயற்கைக்கோள் வெப்ப அழுத்த கண்காணிப்பு',
    'cbas.guide_title': 'ℹ️ இந்த குறியீடுகள் எதை உணர்த்துகின்றன?',
    'cbas.hotspot_def': 'மாதாந்திர சராசரியை விட அதிகமான கடல் மேற்பரப்பு வெப்பநிலை முரண்பாடு — உடனடி வெப்ப அழுத்தத்தைக் குறிக்கிறது.',
    'cbas.dhw_def': '12 வார காலப்பகுதியில் சேர்ந்த வெப்ப அழுத்தம் (°C-வாரங்கள்) — பவளப்பாறை வெளுப்பு மற்றும் அழிவு அபாயத்தை உணர்த்துகிறது.',
    'cbas.hotspot_lbl': 'ஹாட்ஸ்பாட் (உடனடி):',
    'cbas.dhw_lbl': 'DHW (12 வார திரட்சி):',
    'cbas.view_map': '🗺️ தேசிய வெப்ப வரைபடம் ↗',
    'cbas.official_portal': 'அதிகாரப்பூர்வ CBAS தளம் ↗',
    'cbas.no_stress': 'அழுத்தம் இல்லை',
    'tchp.title': '🌪️ புயல் வெப்ப ஆற்றல் திறன் (TCHP)',
    'tchp.subtitle': 'INCOIS-ROMS 5-நாள் கடல் வெப்ப ஆற்றல் முன்னறிவிப்பு',
    'tchp.tab_tchp': 'TCHP (kJ/cm²)',
    'tchp.tab_sst': 'SST (°C)',
    'tchp.tab_ssha': 'SSHA (m)',
    'tchp.play': '▶ இயக்கு',
    'tchp.pause': '⏸ நிறுத்து',
    'tchp.loading': 'முன்னறிவிப்பு வரைபடம் பதிவேற்றப்படுகிறது…',
    'tchp.guide_title': 'ℹ️ புயல் தீவிரமடைதல் ஆற்றல் வழிகாட்டி:',
    'tchp.low_unfavorable': 'குறைவு / சாதகமற்றது',
    'tchp.moderate_favorable': 'நடுத்தரம் / சாதகமானது',
    'tchp.rapid_intensification': '⚠️ அதிவிரைவு புயல் தீவிரம்',
    'tchp.guide_desc': 'வெப்பமண்டல சூறாவளி வெப்ப திறன் 26°C சமவெப்பநிலை ஆழம் வரையிலான மேல் கடல் வெப்ப ஆற்றலை அளவிடுகிறது. அதிக TCHP (>80 kJ/cm²) புயல் தீவிரமடைவதைத் தூண்டுகிறது.',
    'map.osf_title': 'கடல் நிலை முன்னறிவிப்பு வரைபடம்',
    'map.osf_subtitle': 'உயர்ந்த அலைகள் · கள்ளக்கடல் · கடல் நீரோட்டங்கள்',
    'map.osf_note': 'வரைபடக் குறிகள் இன்காய்ஸ் வெளியிட்ட மாநில அளவிலான எச்சரிக்கைகளைக் குறிக்கின்றன.',
    'map.pfz_title': 'சாத்தியமான மீன்பிடி மண்டல வரைபடம்',
    'map.pfz_subtitle': 'அதிகாரப்பூர்வ INCOIS PFZ அடுக்குகள்',
    'map.pfz_lines': 'PFZ முன்னறிவிப்பு கோடுகள்',
    'map.pfz_sectors': 'பிரிவுகள் (Sectors)',
    'map.pfz_eez': 'பிரத்தியேக பொருளாதார மண்டலம் (EEZ)',
    'map.pfz_centers': 'இறங்கு தளங்கள்',
    'map.pfz_chlorophyll': 'குளோரோபில்-ஏ',
    'tide.status_title': '🌊 அலை நிலைவரம்',
    'tide.type_label': 'அலை வகை:',
    'share.title': 'ஓஷன் வாட்ச் பகிரவும்',
    'share.subtitle': 'QR குறியீட்டை ஸ்கேன் செய்யவும் அல்லது இணைப்பைப் பகிரவும்',
    'share.copy': 'இணைப்பை நகலெடு',
    'notify.title': 'எச்சரிக்கை அறிவிப்புகள்',
    'notify.subtitle': 'புயல் மற்றும் சுனாமி எச்சரிக்கைகளுக்கான நேரலை அறிவிப்பு',
    'notify.enable_title': 'வலை அறிவிப்புகளை இயக்கு',
    'notify.enable_desc': 'புதிய எச்சரிக்கைகள் வெளியிடப்படும்போது உங்கள் சாதனத்தில் உடனடி அறிவிப்புகளைப் பெறுங்கள்.',
    'notify.enable_btn': 'இயக்கு',
    'notify.preferences': 'அறிவிப்பு விருப்பங்கள்',
    'notify.opt_warnings': 'உயர்ந்த அலைகள் மற்றும் கள்ளக்கடல் எச்சரிக்கைகள் (சிவப்பு)',
    'notify.opt_warnings_sub': 'தீவிர கடல் நிலை எச்சரிக்கைகள்',
    'notify.opt_alerts': 'உயர்ந்த அலைகள் மற்றும் கள்ளக்கடல் அலர்ட் (ஆரஞ்சு)',
    'notify.opt_alerts_sub': 'நடுத்தர கடல் நிலை எச்சரிக்கைகள்',
    'notify.opt_tsunami': 'சுனாமி அறிக்கைகள்',
    'notify.opt_tsunami_sub': 'அதிகாரப்பூர்வ ITEWC சுனாமி அறிக்கைகள்',
    'notify.opt_cyclone': 'புயல் மற்றும் கூட்டு அறிக்கைகள்',
    'notify.opt_cyclone_sub': 'IMD/INCOIS புயல் எச்சரிக்கைகள்',
    'notify.opt_storm': 'புயல் அலை சீற்ற அறிக்கைகள்',
    'notify.opt_storm_sub': 'கடலோர வெள்ளப்பெருக்கு அறிக்கைகள்',
    'notify.send_test': 'சோதனை அறிவிப்பை அனுப்பு',
    'voice.dialog_title': 'கடலோர குரல் அறிக்கை',
    'voice.dialog_subtitle': 'பன்மொழி குரல் சுருக்கம் (INCOIS / ITEWC / IMD)',
    'voice.lang_label': 'மொழி:',
    'voice.play_audio': '▶ ஆடியோவை இயக்கு',
    'compass.title': '🧭 நேரலை கப்பல் திசைகாட்டி',
    'compass.subtitle': 'உங்கள் இடத்திலிருந்து PFZ இலக்கு புள்ளி',
    'compass.target_line': 'PFZ முன்னறிவிப்பு இலக்கு கோடு',
    'compass.calc_course': '🎯 திசை கணக்கிடப்படுகிறது…',
    'compass.heading': 'படகு நகரும் திசை (Heading)',
    'compass.bearing': 'இலக்கு கோணம் (Bearing)',
    'compass.distance': 'தொலைவு (உங்களிடமிருந்து PFZ)',
    'compass.rotate_sensor': 'சென்சார் திசையை மாற்று:',
    'dialog.district_advisories': 'மாவட்ட எச்சரிக்கைகள்',
    'dialog.district_guidance': 'கடலோர மாவட்ட வழிகாட்டுதல்',
    'dialog.no_district_details': 'அடுத்த புதுப்பித்தலுக்குப் பிறகு மாவட்ட விவரங்கள் தோன்றும்.',
    'dialog.open_official_map': 'முழு விவரங்களுக்கு அதிகாரப்பூர்வ வரைபடத்தைத் திறக்கவும்.',
    'dialog.coastal_area': 'கடற்கரை பகுதி',
    'dialog.close': 'மூடு',
    'dialog.share': 'பகிர்',
    'dialog.voice_summary': 'ஓஷன் வாட்ச் குரல் ஒலிபரப்பு',
    'dialog.voice_listen': 'ஒலிபரப்பைக் கேள்',
    'dialog.voice_pause': 'நிறுத்து',
    'footer.auto_update': 'தானியங்கி புதுப்பிப்பு:',
    'footer.auto_update_val': 'ஒவ்வொரு 15 நிமிடமும்',
    'footer.disclaimer_title': 'துறப்பு:',
    'footer.disclaimer': 'தகவல்கள் அதிகாரப்பூர்வ மூலங்களிலிருந்து பெறப்படுகின்றன; துல்லியத்திற்கு எப்போதும் அதிகாரப்பூர்வ அறிக்கைகளைச் சரிபார்க்கவும்.',
    'footer.source': 'தரவு மூலம்: INCOIS–MoES ↗',
    'footer.visits': 'பார்வைகள்',
    'contact.title': 'கடல்சார் தகவல் தளம்',
    'contact.subtitle': 'பீட்டா சோதனையில் உள்ளது',
    'joint_bulletin.default_msg': 'இன்காய்ஸ்-ஐஎம்டி கூட்டு சிறப்பு புல்லட்டின்',
    'joint_bulletin.active_prefix': 'செயலில் உள்ள புல்லட்டின்',
    'joint_bulletin.issued_prefix': 'புல்லட்டின் வெளியிடப்பட்டது',
        'tide.wind': 'காற்று',
    'tide.wave': 'அலை',
    'tide.swell': 'எதிர் அலை',
    'tide.current': 'நீரோட்டம்',
    'tide.normal': 'சாதாரணமானது',
    'tide.wind_sea': 'காற்று மற்றும் கடல்',
    'tide.tide_state': 'அலை நிலை',
    'tide.moon_tide_type': 'சந்திரன் & அலை வகை',
    'tide.rising': '▲ ஏறும் அலை (வளர்பெருக்கு)',
    'tide.falling': '▼ இறங்கும் அலை (வற்றுப்பெருக்கு)',
    'tide.spring_tide': 'பேரலை (Spring Tide)',
    'tide.neap_tide': 'சிற்றலை (Neap Tide)',
    'tide.high_tide': 'உயர் அலை (High Tide IST)',
    'tide.low_tide': 'தாழ் அலை (Low Tide IST)',
    'tide.no_warnings': '✓ தீவிர கடலோர எச்சரிக்கைகள் ஏதுமில்லை:',
    'tide.active_for': 'எச்சரிக்கை செயலில் உள்ளது:',
    'tide.coast': 'கடற்கரை',
    'tide.regional_advisory': 'மண்டல எச்சரிக்கை:',
    'osf.advisory_note': 'மாவட்டம் மற்றும் கடற்கரை பகுதி நிலைமைகள் மாறுபடுவதால் ஒரு மாநிலம் பல எச்சரிக்கை நிலைகளில் தோன்றக்கூடும்.'
  },
  te: {
    'brand.title': 'ఓషన్ వాచ్',
    'header.title': 'తీరప్రాంత హెచ్చరికల స్థితి',
    'header.subtitle': 'సునామీ · తుఫాను · అలల ఉధృతి · సముద్ర స్థితి సూచన · చేపల వేట మండలం',
    'header.snapshot': 'అధికారిక మూల సమాచారం',
    'header.voice': 'వాయిస్',
    'header.alerts': 'అలర్ట్‌లు',
    'header.share': 'షేర్',
    'header.install': 'ఇన్‌స్టాల్',
    'announcement.title': 'క్రియాశీల హెచ్చరికలు',
    'announcement.latest': 'తాజా సమాచారం:',
    'announcement.checking': 'తాజా ఫీడ్‌లు పరిశీలించబడుతున్నాయి…',
    'announcement.none': 'ఏమీ లేవు',
    'announcement.updated': 'నవీకరించబడింది',
    'announcement.bulletin': 'బులెటిన్',
    'osf.title': 'సముద్ర స్థితి సూచన',
    'osf.high_wave': 'ఎత్తైన అలలు',
    'osf.high_wave_kicker': 'ఎత్తైన అలలు, స్వెల్ సర్జ్ మరియు ప్రవాహాల హెచ్చరికలు',
    'osf.high_wave_card': 'అలల ఎత్తు',
    'osf.swell_surge': 'స్వెల్ సర్జ్ అలలు',
    'osf.swell_surge_card': 'దీర్ఘ కాలిక అలలు',
    'osf.swell_surge_kicker': 'స్వెల్ అలల తీవ్రత మరియు వ్యవధి హెచ్చరిక',
    'osf.ocean_currents': 'సముద్ర ప్రవాహాలు',
    'osf.ocean_currents_card': 'ప్రవాహ వేగం',
    'osf.ocean_currents_kicker': 'ప్రవాహ వేగం మరియు దిశ',
    'osf.storm_surge': 'తుఫాను అలల ఉధృతి',
    'osf.storm_surge_kicker': 'తీరప్రాంత ముంపు',
    'osf.map_button': 'మ్యాప్ వ్యూ',
    'osf.visualize': 'విజువలైజ్',
    'osf.astronomical_tide': 'ఖగోళ పోటుపాట్ల సూచన',
    'severity.warning': 'హెచ్చరిక (Warning)',
    'severity.alert': 'అలర్ట్ (Alert)',
    'severity.watch': 'నిఘా (Watch)',
    'severity.no_threat': 'ప్రమాదం లేదు',
    'severity.issued': 'జారీ చేయబడింది',
    'severity.districts': 'జిల్లాలు',
    'severity.states': 'రాష్ట్రాలు',
    'severity.no_active': 'తీరప్రాంతాల్లో ప్రస్తుతం ఎటువంటి హెచ్చరికలు లేవు.',
    'severity.loading': 'హెచ్చరికల డేటా లోడ్ అవుతోంది…',
    'tsunami.title': 'సునామీ హెచ్చరిక',
    'tsunami.kicker': 'భారత సునామీ ముందస్తు హెచ్చరిక కేంద్రం',
    'tsunami.safe': 'భారత తీరానికి ఎటువంటి సునామీ ముప్పు లేదు',
    'tsunami.checking': 'ITEWC సునామీ స్థితి పరిశీలించబడుతోంది.....',
    'tsunami.last_checked': 'చివరి పరిశీలన',
    'tsunami.warning': 'సునామీ హెచ్చరిక జారీ చేయబడింది',
    'tsunami.alert': 'సునామీ అలర్ట్ జారీ చేయబడింది',
    'tsunami.watch': 'సునామీ వాచ్ జారీ చేయబడింది',
    'tsunami.source': 'ITEWC ↗',
    'cyclone.title': 'తుఫాను హెచ్చరిక',
    'cyclone.kicker': 'ఇన్కోయిస్-ఐఎండి సంయుక్త బులెటిన్',
    'cyclone.safe': 'ప్రస్తుతం ఎటువంటి తుఫాను హెచ్చరికలు లేవు',
    'cyclone.checked': 'IMD CAP అలర్ట్ ఫీడ్ పరిశీలన ప్రకారం.',
    'cyclone.source': 'IMD ↗',
    'seismic.title': 'ఇటీవలి భూకంపాలు ≥ 6.5M',
    'seismic.kicker': 'ఇటీవలి తీరప్రాంత భూకంపాలు',
    'seismic.safe': 'తీరప్రాంతంలో పెద్ద భూకంపాలు ఏవీ నమోదు కాలేదు (M≥5.0).',
    'seismic.checking': 'భూకంప తీవ్రత పరిశీలించబడుతోంది >= 6.5M',
    'seismic.source': 'భూకంపం ↗',
    'seismic.dialog_title': 'భూకంప బులెటిన్ వివరాలు',
    'seismic.dialog_meta': 'అధికారిక ITEWC సమాచారం',
    'seismic.itewc_evaluation': 'ITEWC మూల్యాంకనం',
    'seismic.advice': 'సలహా / సూచనలు',
    'seismic.updates': 'తాజా నవీకరణలు',
    'seismic.unavailable': 'ఈ సంఘటనకు ఎటువంటి అధికారిక ITEWC బులెటిన్ సమాచారం అందుబాటులో లేదు.',
    'seismic.open_bulletin': 'అధికారిక బులెటిన్ తెరవండి ↗',
    'seismic.fact_magnitude': 'తీవ్రత (Magnitude)',
    'seismic.fact_depth': 'లోతు (Depth)',
    'seismic.fact_date': 'తేదీ',
    'seismic.fact_origin_time': 'ప్రారంభ సమయం (Origin time)',
    'seismic.fact_latitude': 'అక్షాంశం (Latitude)',
    'seismic.fact_longitude': 'రేఖాంశం (Longitude)',
    'seismic.fact_location': 'ప్రాంతం',
    'seismic.fact_bulletin': 'బులెటిన్ (Bulletin)',
    'seismic.tectonic_setting': 'టెక్టోనిక్ సెట్టింగ్',
    'seismic.setting_land': 'భూభాగం (LAND)',
    'seismic.setting_oceanic': 'సముద్రప్రాంతం (OCEANIC / MARINE)',
    'seismic.bathymetry': 'బాథిమెట్రీ (సముద్ర లోతు)',
    'seismic.bathymetry_nil': 'శూన్యం (NIL)',
    'seismic.bathymetry_loading': 'లోతు లోడ్ అవుతోంది…',
    'seismic.bathymetry_unavailable': 'లోతు అందుబాటులో లేదు',
    'seismic.coast_distance': 'సమీప తీరం నుండి దూరం',
    'seismic.no_advice': 'ఈ బులెటిన్‌లో ఎటువంటి సలహా సమాచారం చేర్చబడలేదు.',
    'storm.title': 'తుఫాను అలల హెచ్చరిక',
    'storm.safe': 'ప్రస్తుతం తుఫాను అలల బులెటిన్ ఏదీ లేదు',
    'storm.checking': 'తుఫాను తీవ్రత పరిశీలించబడుతోంది.....',
    'storm.caption': 'అధికారిక ITEWC బులెటిన్ ఫీడ్',
    'storm.bulletin': 'బులెటిన్ ↗',
    'joint_bulletin.title': 'సంయుక్త బులెటిన్ ↗',
    'joint_bulletin.none': 'ప్రస్తుతం ఎటువంటి INCOIS-IMD సంయుక్త బులెటిన్ అందుబాటులో లేదు.',
    'pfz.title': 'చేపల లభ్యత ప్రాంతం (PFZ)',
    'pfz.kicker': 'నేటి చేపల వేట రంగాలు',
    'pfz.near_me': '📍 నా సమీపంలో',
    'pfz.source': 'PFZ ↗',
    'pfz.forecast_date': 'సూచన',
    'pfz.valid_through': 'చెల్లుబాటు వ్యవధి',
    'pfz.loading_sectors': 'రంగాలు లోడ్ అవుతున్నాయి…',
    'pfz.locked_title': 'లాక్ చేయబడిన ల్యాండింగ్ కేంద్రం',
    'pfz.home_harbor': 'సేవ్ చేయబడిన స్వస్థలం',
    'pfz.open_compass': '🧭 కంపాస్ తెరవండి',
    'pfz.lock_flc': '🔒 FLC లాక్ చేయండి',
    'pfz.locked_flc': '🔒 లాక్ చేయబడింది',
    'pfz.unlock': '🔓 అన్‌లాక్',
    'pfz.landing_center': 'ల్యాండింగ్ కేంద్రం',
    'pfz.direction': '🧭 దిశ',
    'pfz.distance': '📏 దూరం',
    'pfz.depth': '🌊 లోతు',
    'pfz.coordinates': '📌 అక్షాంశం & రేఖాంశం',
    'pfz.bearing': 'బేరింగ్',
    'pfz.landing_centers_title': 'ల్యాండింగ్ కేంద్రాలు',
    'pfz.target_line': 'లక్ష్య రేఖ',
    'pfz.no_line_issued': 'కోసం నేడు ఎటువంటి PFZ రేఖ జారీ కాలేదు -',
    'other.title': 'ఇతర సముద్ర సేవలు',
    'other.mhw': 'మెరైన్ హీట్‌వేవ్ (MHW)',
    'other.tchp': 'తుఫాను ఉష్ణ శక్తి (TCHP)',
    'other.cbas': 'పగడాల బ్లీచింగ్ హెచ్చరిక (CBAS)',
    'other.tuna': 'ట్యూనా ↗',
    'other.hilsa': 'హిల్సా ↗',
    'other.hab': 'హానికర ఆల్గల్ బ్లూమ్ ↗',
    'other.oil_spill': 'ఆయిల్ స్పిల్ ↗',
    'other.svas': 'చిన్న నౌకలు ↗',
    'other.sarat': 'సారట్ (SARAT) ↗',
    'other.ports': 'ఓడరేవులు ↗',
    'other.ship_route': 'ఓడల మార్గం ↗',
    'other.location_specific': 'నిర్దిష్ట ప్రాంత సూచన ↗',
    'mhw.title': 'మెరైన్ హీట్ వేవ్',
    'mhw.subtitle': 'అధికారిక INCOIS ప్రాంతీయ పరిశీలనలు',
    'mhw.open_page': 'మెరైన్ హీట్ వేవ్ పేజీ తెరవండి ↗',
    'mhw.unavailable': 'మెరైన్ హీట్ వేవ్ సమాచారం అందుబాటులో లేదు.',
    'cbas.title': '🪸 పగడాల బ్లీచింగ్ హెచ్చరిక వ్యవస్థ (CBAS)',
    'cbas.subtitle': 'INCOIS CBAS · ఉపగ్రహ ఉష్ణ ఒత్తిడి పర్యవేక్షణ',
    'cbas.guide_title': 'ℹ️ ఈ కొలమానాల అర్థం ఏమిటి?',
    'cbas.hotspot_def': 'గరిష్ట నెలవారీ సగటు కంటే సముద్ర ఉపరితల ఉష్ణోగ్రత పెరుగుదల — తక్షణ ఉష్ణ ఒత్తిడిని సూచిస్తుంది.',
    'cbas.dhw_def': '12 వారాల కాలంలో పేరుకుపోయిన ఉష్ణ ఒత్తిడి (°C-వారాలు) — పగడాల బ్లీచింగ్ తీవ్రతను సూచిస్తుంది.',
    'cbas.hotspot_lbl': 'హాట్‌స్పాట్ (తక్షణ):',
    'cbas.dhw_lbl': 'DHW (12-వారాల మొత్తం):',
    'cbas.view_map': '🗺️ జాతీయ ఉష్ణ మ్యాప్ చూడండి ↗',
    'cbas.official_portal': 'అధికారిక CBAS పోర్టల్ ↗',
    'cbas.no_stress': 'ఒత్తిడి లేదు',
    'tchp.title': '🌪️ తుఫాను ఉష్ణ శక్తి సామర్థ్యం (TCHP)',
    'tchp.subtitle': 'INCOIS-ROMS 5-రోజుల సముద్ర ఉష్ణ శక్తి సూచన',
    'tchp.tab_tchp': 'TCHP (kJ/cm²)',
    'tchp.tab_sst': 'SST (°C)',
    'tchp.tab_ssha': 'SSHA (m)',
    'tchp.play': '▶ ప్లే',
    'tchp.pause': '⏸ పాజ్',
    'tchp.loading': 'మ్యాప్ లోడ్ అవుతోంది…',
    'tchp.guide_title': 'ℹ️ తుఫాను తీవ్రత శక్తి మార్గదర్శిని:',
    'tchp.low_unfavorable': 'తక్కువ / ప్రతికూలం',
    'tchp.moderate_favorable': 'మధ్యస్థం / అనుకూలం',
    'tchp.rapid_intensification': '⚠️ తీవ్ర తుఫాను ముప్పు',
    'tchp.guide_desc': 'తుఫాను ఉష్ణ సామర్థ్యం 26°C ఐసోథర్మ్ వరకు ఎగువ సముద్ర ఉష్ణ శక్తిని కొలుస్తుంది. అధిక TCHP (>80 kJ/cm²) తుఫాను తీవ్రతను వేగవంతం చేస్తుంది.',
    'map.osf_title': 'సముద్ర స్థితి సూచన మ్యాప్',
    'map.osf_subtitle': 'ఎత్తైన అలలు · స్వెల్ సర్జ్ · సముద్ర ప్రవాహాలు',
    'map.osf_note': 'మార్కర్లు INCOIS నుండి పొందిన రాష్ట్ర స్థాయి హెచ్చరికలను సూచిస్తాయి.',
    'map.pfz_title': 'చేపల లభ్యత ప్రాంతాల మ్యాప్',
    'map.pfz_subtitle': 'అధికారిక INCOIS PFZ వెక్టర్ లేయర్లు',
    'map.pfz_lines': 'PFZ సూచన రేఖలు',
    'map.pfz_sectors': 'రంగాలు (Sectors)',
    'map.pfz_eez': 'ప్రత్యేక ఆర్థిక మండలం (EEZ)',
    'map.pfz_centers': 'ల్యాండింగ్ కేంద్రాలు',
    'map.pfz_chlorophyll': 'క్లోరోఫిల్-ఎ',
    'tide.status_title': '🌊 పోటుపాట్ల స్థితి',
    'tide.type_label': 'పోటుపాట్ల రకం:',
    'share.title': 'ఓషన్ వాచ్ షేర్ చేయండి',
    'share.subtitle': 'QR కోడ్ స్కాన్ చేయండి లేదా లింక్ షేర్ చేయండి',
    'share.copy': 'లింక్ కాపీ చేయండి',
    'notify.title': 'హెచ్చరిక నోటిఫికేషన్‌లు',
    'notify.subtitle': 'తుఫాను & సునామీ హెచ్చరికల కోసం తక్షణ అలర్ట్‌లు',
    'notify.enable_title': 'వెబ్ అలర్ట్‌లను ప్రారంభించండి',
    'notify.enable_desc': 'కొత్త హెచ్చరికలు జారీ అయినప్పుడు తక్షణ అలర్ట్‌లు పొందండి.',
    'notify.enable_btn': 'ప్రారంభించండి',
    'notify.preferences': 'అలర్ట్ ప్రాధాన్యతలు',
    'notify.opt_warnings': 'ఎత్తైన అలలు మరియు స్వెల్ హెచ్చరికలు (ఎరుపు)',
    'notify.opt_warnings_sub': 'తీవ్ర సముద్ర స్థితి హెచ్చరికలు',
    'notify.opt_alerts': 'ఎత్తైన అలలు మరియు స్వెల్ అలర్ట్‌లు (నారింజ)',
    'notify.opt_alerts_sub': 'మధ్యస్థ సముద్ర హెచ్చరికలు',
    'notify.opt_tsunami': 'సునామీ బులెటిన్లు',
    'notify.opt_tsunami_sub': 'అధికారిక ITEWC సునామీ బులెటిన్లు',
    'notify.opt_cyclone': 'తుఫాను మరియు సంయుక్త బులెటిన్లు',
    'notify.opt_cyclone_sub': 'IMD/INCOIS తుఫాను సలహాలు',
    'notify.opt_storm': 'తుఫాను అలల బులెటిన్లు',
    'notify.opt_storm_sub': 'తీర ముంపు బులెటిన్లు',
    'notify.send_test': 'టెస్ట్ అలర్ట్ పంపండి',
    'voice.dialog_title': 'తీరప్రాంత ఆడియో బులెటిన్',
    'voice.dialog_subtitle': 'బహుభాషా వాయిస్ సారాంశం (INCOIS / ITEWC / IMD)',
    'voice.lang_label': 'భాష:',
    'voice.play_audio': '▶ ఆడియో వినండి',
    'compass.title': '🧭 లైవ్ నాటికల్ కంపాస్',
    'compass.subtitle': 'మీ స్థానం నుండి PFZ సూచన పాయింట్',
    'compass.target_line': 'PFZ సూచన రేఖ లక్ష్యం',
    'compass.calc_course': '🎯 మార్గాన్ని లెక్కిస్తోంది…',
    'compass.heading': 'పడవ దిశ (Heading)',
    'compass.bearing': 'లక్ష్య బేరింగ్ (Bearing)',
    'compass.distance': 'దూరం (మీ నుండి PFZ)',
    'compass.rotate_sensor': 'దిశను మార్చండి (సెన్సార్ సిమ్యులేటర్):',
    'dialog.district_advisories': 'జిల్లా స్థాయి హెచ్చరికలు',
    'dialog.district_guidance': 'తీరప్రాంత జిల్లాల మార్గదర్శకాలు',
    'dialog.no_district_details': 'తదుపరి నవీకరణ తర్వాత జిల్లా వివరాలు కనిపిస్తాయి.',
    'dialog.open_official_map': 'పూర్తి వివరాల కోసం అధికారిక మ్యాప్ చూడండి.',
    'dialog.coastal_area': 'తీరప్రాంతం',
    'dialog.close': 'మూసివేయి',
    'dialog.share': 'షేర్ చేయండి',
    'dialog.voice_summary': 'ఓషన్ వాచ్ ఆడియో బులెటిన్',
    'dialog.voice_listen': 'వినండి',
    'dialog.voice_pause': 'పాజ్ చేయండి',
    'footer.auto_update': 'ఆటోమేటిక్ అప్‌డేట్:',
    'footer.auto_update_val': 'ప్రతి 15 నిమిషాలకు',
    'footer.disclaimer_title': 'గమనిక:',
    'footer.disclaimer': 'సమాచారం అధికారిక వర్గాల నుండి సేకరించబడింది; తాజా అధికారిక బులెటిన్లను ఎల్లప్పుడూ ధృవీకరించుకోండి.',
    'footer.source': 'సమాచార మూలం: INCOIS–MoES ↗',
    'footer.visits': 'సందర్శనలు',
    'contact.title': 'సముద్ర సమాచార పోర్టల్',
    'contact.subtitle': 'బీటా పరీక్షలో ఉంది',
    'joint_bulletin.default_msg': 'ఇన్‌కాయిస్-ఐఎండి సంయుక్త ప్రత్యేక బులెటిన్',
    'joint_bulletin.active_prefix': 'చురుకైన బులెటిన్',
    'joint_bulletin.issued_prefix': 'బులెటిన్ జారీ చేయబడింది',
        'tide.wind': 'గాలి',
    'tide.wave': 'అలలు',
    'tide.swell': 'స్వెల్ అలలు',
    'tide.current': 'ప్రవాహం',
    'tide.normal': 'సాధారణం',
    'tide.wind_sea': 'గాలి మరియు సముద్రం',
    'tide.tide_state': 'పాటు-పోటు స్థితి',
    'tide.moon_tide_type': 'చంద్రుడు & పోటు రకం',
    'tide.rising': '▲ పెరుగుతున్న పోటు (Flood)',
    'tide.falling': '▼ తగ్గుతున్న పాటు (Ebb)',
    'tide.spring_tide': 'మహా పోటు (Spring Tide)',
    'tide.neap_tide': 'లఘు పోటు (Neap Tide)',
    'tide.high_tide': 'గరిష్ట పోటు (High Tide IST)',
    'tide.low_tide': 'కనిష్ట పాటు (Low Tide IST)',
    'tide.no_warnings': '✓ తీరప్రాంత హెచ్చరికలు లేవు:',
    'tide.active_for': 'హెచ్చరిక అమలులో ఉంది:',
    'tide.coast': 'తీరం',
    'tide.regional_advisory': 'ప్రాంతీయ హెచ్చరిక:',
    'osf.advisory_note': 'జిల్లా మరియు తీరప్రాంత పరిస్థితులు భిన్నంగా ఉండటం వల్ల ఒక రాష్ట్రం బహుళ స్థాయిలలో కనిపించవచ్చు.'
  },
  ml: {
    'brand.title': 'ഓഷ്യൻ വാച്ച്',
    'header.title': 'തീരദേശ മുന്നറിയിപ്പ് നില',
    'header.subtitle': 'സുനാമി · ചുഴലിക്കാറ്റ് · കടലാക്രമണം · സമുദ്രാവസ്ഥ പ്രവചനം · മത്സ്യബന്ധന മേഖല',
    'header.snapshot': 'ഔദ്യോഗിക തത്സമയ വിവരങ്ങൾ',
    'header.voice': 'ശബ്ദം',
    'header.alerts': 'മുന്നറിയിപ്പുകൾ',
    'header.share': 'പങ്കുവെക്കുക',
    'header.install': 'ഇൻസ്റ്റാൾ ചെയ്യുക',
    'announcement.title': 'നിലവിലുള്ളവ',
    'announcement.latest': 'ഏറ്റവും പുതിയത്:',
    'announcement.checking': 'വിവരങ്ങൾ പരിശോധിക്കുന്നു…',
    'announcement.none': 'ഒന്നുമില്ല',
    'announcement.updated': 'പുതുക്കി',
    'announcement.bulletin': 'ബുള്ളറ്റിൻ',
    'osf.title': 'സമുദ്രാവസ്ഥ പ്രവചനം',
    'osf.high_wave': 'ഉയർന്ന തിരമാലകൾ',
    'osf.high_wave_kicker': 'ഉയർന്ന തിരമാല, കള്ളക്കടൽ, സമുദ്ര പ്രവാഹ മുന്നറിയിപ്പുകൾ',
    'osf.high_wave_card': 'തിരമാല ഉയരം',
    'osf.swell_surge': 'കള്ളക്കടൽ മുന്നറിയിപ്പ്',
    'osf.swell_surge_card': 'ദീർഘകാല തിരമാലകൾ',
    'osf.swell_surge_kicker': 'കള്ളക്കടൽ പ്രതിഭാസ മുന്നറിയിപ്പ്',
    'osf.ocean_currents': 'സമുദ്ര പ്രവാഹങ്ങൾ',
    'osf.ocean_currents_card': 'പ്രവാഹ വേഗത',
    'osf.ocean_currents_kicker': 'ഉപരിതല പ്രവാഹ വേഗതയും ദിശയും',
    'osf.storm_surge': 'കടലാക്രമണം',
    'osf.storm_surge_kicker': 'തീരദേശ വെള്ളപ്പൊക്കം',
    'osf.map_button': 'മാപ്പ് കാണുക',
    'osf.visualize': 'മാപ്പിൽ കാണുക',
    'osf.astronomical_tide': 'ജ്യോതിശാസ്ത്ര വേലിയേറ്റ പ്രവചനം',
    'severity.warning': 'മുന്നറിയിപ്പ് (Warning)',
    'severity.alert': 'ജാഗ്രത (Alert)',
    'severity.watch': 'നിരീക്ഷണം (Watch)',
    'severity.no_threat': 'ഭീഷണിയില്ല',
    'severity.issued': 'പുറപ്പെടുവിച്ചു',
    'severity.districts': 'ജില്ലകൾ',
    'severity.states': 'സംസ്ഥാനങ്ങൾ',
    'severity.no_active': 'തീരദേശ ജില്ലകളിൽ നിലവിൽ ഭീഷണികളില്ല.',
    'severity.loading': 'വിവരങ്ങൾ ലഭ്യമാക്കുന്നു…',
    'tsunami.title': 'സുനാമി മുന്നറിയിപ്പ്',
    'tsunami.kicker': 'ഇന്ത്യൻ സുനാമി മുന്നറിയിപ്പ് കേന്ദ്രം',
    'tsunami.safe': 'ഇന്ത്യൻ തീരങ്ങളിൽ സുനാമി ഭീഷണിയില്ല',
    'tsunami.checking': 'സുനാമി നില പരിശോധിക്കുന്നു.....',
    'tsunami.last_checked': 'അവസാനം പരിശോധിച്ചത്',
    'tsunami.warning': 'സുനാമി മുന്നറിയിപ്പ് നിലവിലുണ്ട്',
    'tsunami.alert': 'സുനാമി ജാഗ്രത നിലവിലുണ്ട്',
    'tsunami.watch': 'സുനാമി നിരീക്ഷണം നിലവിലുണ്ട്',
    'tsunami.source': 'ITEWC ↗',
    'cyclone.title': 'ചുഴലിക്കാറ്റ് മുന്നറിയിപ്പ്',
    'cyclone.kicker': 'ഇൻകോയിസ്-ഐഎംഡി സംയുക്ത ബുള്ളറ്റിൻ',
    'cyclone.safe': 'ചുഴലിക്കാറ്റ് മുന്നറിയിപ്പുകളൊന്നുമില്ല',
    'cyclone.checked': 'IMD കാപ് അലേർട്ട് പ്രകാരം.',
    'cyclone.source': 'IMD ↗',
    'seismic.title': 'ഭൂകമ്പ മുന്നറിയിപ്പുകൾ ≥ 6.5M',
    'seismic.kicker': 'സമീപകാല തീരദേശ ഭൂകമ്പങ്ങൾ',
    'seismic.safe': 'തീരപ്രദേശങ്ങളിൽ വലിയ ഭൂകമ്പങ്ങൾ റിപ്പോർട്ട് ചെയ്തിട്ടില്ല (M≥5.0).',
    'seismic.checking': 'ഭൂകമ്പ തീവ്രത പരിശോധിക്കുന്നു >= 6.5M',
    'seismic.source': 'ഭൂകമ്പം ↗',
    'seismic.dialog_title': 'ഭൂകമ്പ ബുള്ളറ്റിൻ വിവരങ്ങൾ',
    'seismic.dialog_meta': 'ഔദ്യോഗിക ITEWC വിവരങ്ങൾ',
    'seismic.itewc_evaluation': 'ITEWC വിലയിരുത്തൽ',
    'seismic.advice': 'നിർദ്ദേശങ്ങൾ',
    'seismic.updates': 'പുതിയ വിവരങ്ങൾ',
    'seismic.unavailable': 'ഈ സംഭവത്തെക്കുറിച്ച് ഔദ്യോഗിക വിവരങ്ങൾ ലഭ്യമല്ല.',
    'seismic.open_bulletin': 'ഔദ്യോഗിക ബുള്ളറ്റിൻ തുറക്കുക ↗',
    'seismic.fact_magnitude': 'തീവ്രത (Magnitude)',
    'seismic.fact_depth': 'ആഴം (Depth)',
    'seismic.fact_date': 'തീയതി',
    'seismic.fact_origin_time': 'ഉത്ഭവ സമയം (Origin time)',
    'seismic.fact_latitude': 'അക്ഷാംശം (Latitude)',
    'seismic.fact_longitude': 'രേഖാംശം (Longitude)',
    'seismic.fact_location': 'സ്ഥലം',
    'seismic.fact_bulletin': 'ബുള്ളറ്റിൻ (Bulletin)',
    'seismic.tectonic_setting': 'ടെക്റ്റോണിക് ക്രമീകരണം',
    'seismic.setting_land': 'കരഭൂമി (LAND)',
    'seismic.setting_oceanic': 'സമുദ്രം (OCEANIC / MARINE)',
    'seismic.bathymetry': 'ബാത്തിമെട്രി (ആഴം)',
    'seismic.bathymetry_nil': 'ഇല്ല (NIL)',
    'seismic.bathymetry_loading': 'ആഴം ലോഡ് ചെയ്യുന്നു…',
    'seismic.bathymetry_unavailable': 'ആഴം ലഭ്യമല്ല',
    'seismic.coast_distance': 'അടുത്തുള്ള തീരത്തുനിന്നുള്ള ദൂരം',
    'seismic.no_advice': 'ഈ ബുള്ളറ്റിനിൽ ഉപദേശ വിവരങ്ങൾ ഉൾപ്പെടുത്തിയിട്ടില്ല.',
    'storm.title': 'കടലാക്രമണ മുന്നറിയിപ്പ്',
    'storm.safe': 'കടലാക്രമണ ബുള്ളറ്റിനുകൾ നിലവിലില്ല',
    'storm.checking': 'കടലാക്രമണ നില പരിശോധിക്കുന്നു.....',
    'storm.caption': 'ഔദ്യോഗിക ITEWC വിവരങ്ങൾ',
    'storm.bulletin': 'ബുള്ളറ്റിൻ ↗',
    'joint_bulletin.title': 'സംയുക്ത ബുള്ളറ്റിൻ ↗',
    'joint_bulletin.none': 'നിലവിൽ സംയുക്ത ബുള്ളറ്റിനുകൾ ലഭ്യമല്ല.',
    'pfz.title': 'സാധ്യതയുള്ള മത്സ്യബന്ധന മേഖല (PFZ)',
    'pfz.kicker': 'ഇന്നത്തെ മത്സ്യബന്ധന മേഖലകൾ',
    'pfz.near_me': '📍 എനിക്ക് സമീപം',
    'pfz.source': 'PFZ ↗',
    'pfz.forecast_date': 'പ്രവചനം',
    'pfz.valid_through': 'കാലാവധി',
    'pfz.loading_sectors': 'മേഖലകൾ ലഭ്യമാക്കുന്നു…',
    'pfz.locked_title': 'തിരഞ്ഞെടുത്ത ലാൻഡിംഗ് കേന്ദ്രം',
    'pfz.home_harbor': 'ഹോം ഹാർബർ',
    'pfz.open_compass': '🧭 കോമ്പസ് തുറക്കുക',
    'pfz.lock_flc': '🔒 FLC ലോക്ക് ചെയ്യുക',
    'pfz.locked_flc': '🔒 ലോക്ക് ചെയ്തു',
    'pfz.unlock': '🔓 അൺലോക്ക് ചെയ്യുക',
    'pfz.landing_center': 'ലാൻഡിംഗ് കേന്ദ്രം',
    'pfz.direction': '🧭 ദിശ',
    'pfz.distance': '📏 ദൂരം',
    'pfz.depth': '🌊 ആഴം',
    'pfz.coordinates': '📌 കോർഡിനേറ്റുകൾ',
    'pfz.bearing': 'ബെയറിംഗ്',
    'pfz.landing_centers_title': 'ലാൻഡിംഗ് കേന്ദ്രങ്ങൾ',
    'pfz.target_line': 'ലക്ഷ്യ രേഖ',
    'pfz.no_line_issued': 'ഇന്ന് മത്സ്യബന്ധന രേഖ ലഭ്യമല്ല -',
    'other.title': 'മറ്റ് സമുദ്ര സേവനങ്ങൾ',
    'other.mhw': 'മറൈൻ ഹീറ്റ്‌വേവ് (MHW)',
    'other.tchp': 'ചുഴലിക്കാറ്റ് താപോർജ്ജം (TCHP)',
    'other.cbas': 'പവിഴപ്പുറ്റ് വെളുക്കൽ മുന്നറിയിപ്പ് (CBAS)',
    'other.tuna': 'ചൂര മത്സ്യം ↗',
    'other.hilsa': 'ഹിൽസ മത്സ്യം ↗',
    'other.hab': 'വിഷ പായൽ വ്യാപനം ↗',
    'other.oil_spill': 'എണ്ണ ചോർച്ച ↗',
    'other.svas': 'ചെറിയ ബോട്ടുകൾ ↗',
    'other.sarat': 'സാരാറ്റ് (SARAT) ↗',
    'other.ports': 'തുറമുഖ പ്രവചനം ↗',
    'other.ship_route': 'കപ്പൽ റൂട്ട് ↗',
    'other.location_specific': 'പ്രത്യേക മേഖലാ പ്രവചനം ↗',
    'mhw.title': 'മറൈൻ ഹീറ്റ് വേവ്',
    'mhw.subtitle': 'ഔദ്യോഗിക INCOIS നിരീക്ഷണങ്ങൾ',
    'mhw.open_page': 'പേജ് തുറക്കുക ↗',
    'mhw.unavailable': 'മറൈൻ ഹീറ്റ് വേവ് വിവരങ്ങൾ ലഭ്യമല്ല.',
    'cbas.title': '🪸 പവിഴപ്പുറ്റ് വെളുക്കൽ നിരീക്ഷണ സംവിധാനം (CBAS)',
    'cbas.subtitle': 'INCOIS CBAS · ഉപഗ്രഹ താപ സമ്മർദ്ദ നിരീക്ഷണം',
    'cbas.guide_title': 'ℹ️ ഈ അളവുകൾ എന്താണ് അർത്ഥമാക്കുന്നത്?',
    'cbas.hotspot_def': 'പ്രതിമാസ ശരാശരിയേക്കാൾ ഉയർന്ന താപനില — തത്സമയ താപ സമ്മർദ്ദത്തെ സൂചിപ്പിക്കുന്നു.',
    'cbas.dhw_def': '12 ആഴ്ചയിലെ താപ സമ്മർദ്ദം (°C-ആഴ്ചകൾ) — പവിഴപ്പുറ്റുകളുടെ നാശസാധ്യത വ്യക്തമാക്കുന്നു.',
    'cbas.hotspot_lbl': 'ഹോട്ട്സ്പോട്ട്:',
    'cbas.dhw_lbl': 'DHW (12 ആഴ്ച):',
    'cbas.view_map': '🗺️ ദേശീയ താപ മാപ്പ് കാണുക ↗',
    'cbas.official_portal': 'ഔദ്യോഗിക CBAS പോർട്ടൽ ↗',
    'cbas.no_stress': 'ഭീഷണിയില്ല',
    'tchp.title': '🌪️ ട്രോപ്പിക്കൽ സൈക്ലോൺ ഹീറ്റ് പൊട്ടൻഷ്യൽ (TCHP)',
    'tchp.subtitle': 'INCOIS-ROMS 5-ദിവസ സമുദ്ര താപോർജ്ജ പ്രവചനം',
    'tchp.tab_tchp': 'TCHP (kJ/cm²)',
    'tchp.tab_sst': 'SST (°C)',
    'tchp.tab_ssha': 'SSHA (m)',
    'tchp.play': '▶ പ്ലേ ചെയ്യുക',
    'tchp.pause': '⏸ താൽക്കാലികമായി നിർത്തുക',
    'tchp.loading': 'മാപ്പ് ലഭ്യമാക്കുന്നു…',
    'tchp.guide_title': 'ℹ️ ചുഴലിക്കാറ്റ് തീവ്രതാ ഗൈഡ്:',
    'tchp.low_unfavorable': 'കുറവ് / അനുകൂലമല്ല',
    'tchp.moderate_favorable': 'ഇടത്തരം / അനുകൂലം',
    'tchp.rapid_intensification': '⚠️ അതിതീവ്ര ചുഴലിക്കാറ്റ് സാധ്യത',
    'tchp.guide_desc': 'സമുദ്രോപരിതല താപോർജ്ജത്തെയാണ് TCHP സൂചിപ്പിക്കുന്നത്. ഉയർന്ന TCHP (>80 kJ/cm²) ചുഴലിക്കാറ്റുകളെ അതിതീവ്രമാക്കുന്നു.',
    'map.osf_title': 'സമുദ്രാവസ്ഥ പ്രവചന മാപ്പ്',
    'map.osf_subtitle': 'ഉയർന്ന തിരമാലകൾ · കള്ളക്കടൽ · സമുദ്ര പ്രവാഹങ്ങൾ',
    'map.osf_note': 'ഇൻകോയിസിൽ നിന്നുള്ള സംസ്ഥാനതല മുന്നറിയിപ്പുകൾ.',
    'map.pfz_title': 'മത്സ്യബന്ധന മേഖലാ മാപ്പ്',
    'map.pfz_subtitle': 'ഔദ്യോഗിക INCOIS PFZ ലെയറുകൾ',
    'map.pfz_lines': 'PFZ പ്രവചന രേഖകൾ',
    'map.pfz_sectors': 'മേഖലകൾ (Sectors)',
    'map.pfz_eez': 'പ്രത്യേക സാമ്പത്തിക മേഖല (EEZ)',
    'map.pfz_centers': 'ലാൻഡിംഗ് കേന്ദ്രങ്ങൾ',
    'map.pfz_chlorophyll': 'ക്ലോറോഫിൽ-എ',
    'tide.status_title': '🌊 വേലിയേറ്റ നില',
    'tide.type_label': 'വേലിയേറ്റ തരം:',
    'share.title': 'ഓഷ്യൻ വാച്ച് പങ്കുവെക്കുക',
    'share.subtitle': 'QR കോഡ് സ്കാൻ ചെയ്യുക അല്ലെങ്കിൽ ലിങ്ക് പങ്കിടുക',
    'share.copy': 'ലിങ്ക് കോപ്പി ചെയ്യുക',
    'notify.title': 'മുന്നറിയിപ്പ് അറിയിപ്പുകൾ',
    'notify.subtitle': 'തത്സമയ അലേർട്ടുകൾ',
    'notify.enable_title': 'വെബ് അലേർട്ടുകൾ പ്രവർത്തനക്ഷമമാക്കുക',
    'notify.enable_desc': 'പുതിയ മുന്നറിയിപ്പുകൾ വരുമ്പോൾ ഫോണിൽ അലേർട്ട് നേടുക.',
    'notify.enable_btn': 'പ്രവർത്തനക്ഷമമാക്കുക',
    'notify.preferences': 'അലേർട്ട് മുൻഗണനകൾ',
    'notify.opt_warnings': 'ഉയർന്ന തിരമാല മുന്നറിയിപ്പുകൾ (ചുവപ്പ്)',
    'notify.opt_warnings_sub': 'ഗുരുതരമായ കടലാക്രമണ മുന്നറിയിപ്പുകൾ',
    'notify.opt_alerts': 'ഉയർന്ന തിരമാല ജാഗ്രത (ഓറഞ്ച്)',
    'notify.opt_alerts_sub': 'ഇടത്തരം ജാഗ്രത',
    'notify.opt_tsunami': 'സുനാമി ബുള്ളറ്റിനുകൾ',
    'notify.opt_tsunami_sub': 'ഔദ്യോഗിക ITEWC സുനാമി ബുള്ളറ്റിനുകൾ',
    'notify.opt_cyclone': 'ചുഴലിക്കാറ്റ് ബുള്ളറ്റിനുകൾ',
    'notify.opt_cyclone_sub': 'IMD/INCOIS ചുഴലിക്കാറ്റ് മുന്നറിയിപ്പുകൾ',
    'notify.opt_storm': 'കടലാക്രമണ ബുള്ളറ്റിനുകൾ',
    'notify.opt_storm_sub': 'തീരദേശ വെള്ളപ്പൊക്ക ബുള്ളറ്റിനുകൾ',
    'notify.send_test': 'ടെസ്റ്റ് അലേർട്ട് അയക്കുക',
    'voice.dialog_title': 'തീരദേശ വോയ്സ് ബുള്ളറ്റിൻ',
    'voice.dialog_subtitle': 'ബഹുഭാഷാ ശബ്ദ സംഗ്രഹം (INCOIS / ITEWC / IMD)',
    'voice.lang_label': 'ഭാഷ:',
    'voice.play_audio': '▶ ഓഡിയോ കേൾക്കുക',
    'compass.title': '🧭 ലൈവ് നോട്ടിക്കൽ കോമ്പസ്',
    'compass.subtitle': 'നിങ്ങളുടെ സ്ഥാനത്ത് നിന്ന് PFZ പോയിന്റിലേക്ക്',
    'compass.target_line': 'PFZ ലക്ഷ്യ രേഖ',
    'compass.calc_course': '🎯 ദിശ കണക്കാക്കുന്നു…',
    'compass.heading': 'ബോട്ടിന്റെ ദിശ (Heading)',
    'compass.bearing': 'ലക്ഷ്യ ദിശ (Bearing)',
    'compass.distance': 'ദൂരം (നിങ്ങളിൽ നിന്ന് PFZ ലേക്ക്)',
    'compass.rotate_sensor': 'ദിശ മാറ്റുക (സിമുലേറ്റർ):',
    'dialog.district_advisories': 'ജില്ലാ മുന്നറിയിപ്പുകൾ',
    'dialog.district_guidance': 'തീരദേശ മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
    'dialog.no_district_details': 'അടുത്ത അപ്‌ഡേറ്റിൽ ജില്ലാ വിവരങ്ങൾ ലഭ്യമാകും.',
    'dialog.open_official_map': 'ഔദ്യോഗിക മാപ്പ് കാണുക.',
    'dialog.coastal_area': 'തീരദേശ മേഖല',
    'dialog.close': 'അടയ്ക്കുക',
    'dialog.share': 'പങ്കിടുക',
    'dialog.voice_summary': 'ഓഷ്യൻ വാച്ച് വോയ്സ് സംഗ്രഹം',
    'dialog.voice_listen': 'കേൾക്കുക',
    'dialog.voice_pause': 'നിർത്തുക',
    'footer.auto_update': 'സ്വയം പുതുക്കൽ:',
    'footer.auto_update_val': 'ഓരോ 15 മിനിറ്റിലും',
    'footer.disclaimer_title': 'നിരാകരണം:',
    'footer.disclaimer': 'വിവരങ്ങൾ ഔദ്യോഗിക സ്രോതസ്സുകളിൽ നിന്ന് ലഭ്യമാക്കിയതാണ്; കൂടുതൽ കൃത്യതയ്ക്കായി ഔദ്യോഗിക ബുള്ളറ്റിനുകൾ കാണുക.',
    'footer.source': 'ഡാറ്റ ഉറവിടം: INCOIS–MoES ↗',
    'footer.visits': 'സന്ദർശനങ്ങൾ',
    'contact.title': 'സമുദ്ര വിവര പോർട്ടൽ',
    'contact.subtitle': 'ബീറ്റാ പരീക്ഷണത്തിലാണ്',
    'joint_bulletin.default_msg': 'ഇൻകോയിസ്-ഐഎംഡി സംയുക്ത പ്രത്യേക ബുള്ളറ്റിൻ',
    'joint_bulletin.active_prefix': 'സജീവ ബുള്ളറ്റിൻ',
    'joint_bulletin.issued_prefix': 'ബുള്ളറ്റിൻ പ്രസിദ്ധീകരിച്ചു',
        'tide.wind': 'കാറ്റ്',
    'tide.wave': 'തിരമാല',
    'tide.swell': 'കള്ളക്കടൽ തിര',
    'tide.current': 'ഒഴുക്ക്',
    'tide.normal': 'സാധാരണം',
    'tide.wind_sea': 'കാറ്റും കടലും',
    'tide.tide_state': 'വേലിയേറ്റ നില',
    'tide.moon_tide_type': 'ചന്ദ്രനും വേലിയേറ്റ തരവും',
    'tide.rising': '▲ വേലിയേറ്റം (Flood)',
    'tide.falling': '▼ വേലിയിറക്കം (Ebb)',
    'tide.spring_tide': 'വാവു വേലിയേറ്റം (Spring)',
    'tide.neap_tide': 'സപ്തമി വേലിയേറ്റം (Neap)',
    'tide.high_tide': 'ഉയർന്ന വേലിയേറ്റം (High Tide IST)',
    'tide.low_tide': 'താഴ്ന്ന വേലിയിറക്കം (Low Tide IST)',
    'tide.no_warnings': '✓ തീരദേശ മുന്നറിയിപ്പുകൾ ഇല്ല:',
    'tide.active_for': 'മുന്നറിയിപ്പ് നിലവിലുണ്ട്:',
    'tide.coast': 'തീരം',
    'tide.regional_advisory': 'പ്രാദേശിക ജാഗ്രതാ നിർദ്ദേശം:',
    'osf.advisory_note': 'ജില്ലാ, തീരദേശ സാഹചര്യങ്ങൾ വ്യത്യസ്തമായതിനാൽ ഒരു സംസ്ഥാനം ഒന്നിലധികം മുന്നറിയിപ്പ് തലങ്ങളിൽ പ്രത്യക്ഷപ്പെടാം.'
  },
  bn: {
    'brand.title': 'ওশান ওয়াচ',
    'header.title': 'উপকূলীয় সতর্কবার্তা স্থিতি',
    'header.subtitle': 'সুনামি · ঘূর্ণিঝড় · জলোচ্ছ্বাস · সমুদ্রাবস্থার পূর্বাভাস · সম্ভাব্য মৎস্য অঞ্চল',
    'header.snapshot': 'সরকারি তথ্যের স্ন্যাপশট',
    'header.voice': 'ভয়েস',
    'header.alerts': 'সতর্কতা',
    'header.share': 'শেয়ার',
    'header.install': 'ইনস্টল',
    'announcement.title': 'সক্রিয়',
    'announcement.latest': 'সর্বশেষ:',
    'announcement.checking': 'তথ্য যাচাই করা হচ্ছে…',
    'announcement.none': 'কোনোটি নেই',
    'announcement.updated': 'আপডেট হয়েছে',
    'announcement.bulletin': 'বুলেটিন',
    'osf.title': 'সমুদ্রাবস্থার পূর্বাভাস',
    'osf.high_wave': 'উঁচু ঢেউ',
    'osf.high_wave_kicker': 'উঁচু ঢেউ, সোয়েল সার্জ এবং সমুদ্র স্রোতের সতর্কতা',
    'osf.high_wave_card': 'ঢেউয়ের উচ্চতা',
    'osf.swell_surge': 'সোয়েল সার্জ',
    'osf.swell_surge_card': 'দীর্ঘ সময়ের সোয়েল তরঙ্গ',
    'osf.swell_surge_kicker': 'সোয়েল ঢেউ ও সময়কালের সতর্কতা',
    'osf.ocean_currents': 'সমুদ্র স্রোত',
    'osf.ocean_currents_card': 'স্রোতের গতিবেগ',
    'osf.ocean_currents_kicker': 'পৃষ্ঠ স্রোতের গতি ও দিক',
    'osf.storm_surge': 'ঝড়ের জলোচ্ছ্বাস',
    'osf.storm_surge_kicker': 'উপকূল প্লাবনের ঝুঁকি',
    'osf.map_button': 'মানচিত্র দেখুন',
    'osf.visualize': 'মানচিত্রে দেখুন',
    'osf.astronomical_tide': 'জ্যোতির্বিজ্ঞানীয় জোয়ারের পূর্বাভাস',
    'severity.warning': 'সতর্কবার্তা (Warning)',
    'severity.alert': 'সতর্কতা (Alert)',
    'severity.watch': 'নজরদারি (Watch)',
    'severity.no_threat': 'কোনো বিপদ নেই',
    'severity.issued': 'প্রকাশিত',
    'severity.districts': 'জেলা',
    'severity.states': 'রাজ্য',
    'severity.no_active': 'উপকূলীয় রাজ্যগুলিতে বর্তমানে কোনো সক্রিয় সতর্কতা নেই।',
    'severity.loading': 'তথ্য লোড হচ্ছে…',
    'tsunami.title': 'সুনামি সতর্কবার্তা',
    'tsunami.kicker': 'ভারতীয় সুনামি আগাম সতর্কীকরণ কেন্দ্র',
    'tsunami.safe': 'ভারতের উপকূলের জন্য কোনো সুনামি বিপদ নেই',
    'tsunami.checking': 'সুনামি স্থিতি পরীক্ষা করা হচ্ছে.....',
    'tsunami.last_checked': 'সর্বশেষ পরীক্ষা',
    'tsunami.warning': 'সুনামি সতর্কতা জারি',
    'tsunami.alert': 'সুনামি অ্যালার্ট জারি',
    'tsunami.watch': 'সুনামি নজরদারি জারি',
    'tsunami.source': 'ITEWC ↗',
    'cyclone.title': 'ঘূর্ণিঝড় সতর্কবার্তা',
    'cyclone.kicker': 'ইনকোইস-আইএমডি যৌথ বুলেটিন',
    'cyclone.safe': 'কোনো সক্রিয় ঘূর্ণিঝড় সতর্কতা নেই',
    'cyclone.checked': 'আইএমডি ক্যাপ সতর্কতার তথ্য অনুযায়ী।',
    'cyclone.source': 'IMD ↗',
    'seismic.title': 'সাম্প্রতিক ভূমিকম্প ≥ 6.5M',
    'seismic.kicker': 'সাম্প্রতিক উপকূলীয় ভূমিকম্প',
    'seismic.safe': 'উপকূলে সাম্প্রতিক কোনো বড় ভূমিকম্প ঘটেনি (M≥5.0)।',
    'seismic.checking': 'ভূমিকম্পের মাত্রা যাচাই করা হচ্ছে >= 6.5M',
    'seismic.source': 'ভূমিকম্প ↗',
    'seismic.dialog_title': 'ভূমিকম্প বুলেটিন বিবরণ',
    'seismic.dialog_meta': 'সরকারি ITEWC তথ্য',
    'seismic.itewc_evaluation': 'ITEWC মূল্যায়ন',
    'seismic.advice': 'পরামর্শ / নির্দেশনা',
    'seismic.updates': 'সর্বশেষ আপডেট',
    'seismic.unavailable': 'এই ঘটনার জন্য সরকারি কোনো বুলেটিন পাওয়া যায়নি।',
    'seismic.open_bulletin': 'সরকারি বুলেটিন দেখুন ↗',
    'seismic.fact_magnitude': 'মাত্রা (Magnitude)',
    'seismic.fact_depth': 'গভীরতা (Depth)',
    'seismic.fact_date': 'তারিখ',
    'seismic.fact_origin_time': 'উৎপত্তির সময় (Origin time)',
    'seismic.fact_latitude': 'অক্ষাংশ (Latitude)',
    'seismic.fact_longitude': 'দ্রাঘিমাংশ (Longitude)',
    'seismic.fact_location': 'স্থান',
    'seismic.fact_bulletin': 'বুলেটিন (Bulletin)',
    'seismic.tectonic_setting': 'টেকটোনিক বিন্যাস',
    'seismic.setting_land': 'স্থলভাগ (LAND)',
    'seismic.setting_oceanic': 'সামুদ্রিক (OCEANIC / MARINE)',
    'seismic.bathymetry': 'বাথাইমেট্রি (গভীরতা)',
    'seismic.bathymetry_nil': 'নেই (NIL)',
    'seismic.bathymetry_loading': 'গভীরতা লোড হচ্ছে…',
    'seismic.bathymetry_unavailable': 'গভীরতা পাওয়া যায়নি',
    'seismic.coast_distance': 'নিকটতম উপকূল থেকে দূরত্ব',
    'seismic.no_advice': 'এই বুলেটিনে কোনো পরামর্শের পাঠ্য অন্তর্ভুক্ত ছিল না।',
    'storm.title': 'জলোচ্ছ্বাস সতর্কবার্তা',
    'storm.safe': 'কোনো সক্রিয় জলোচ্ছ্বাস বুলেটিন নেই',
    'storm.checking': 'জলোচ্ছ্বাসের স্থিতি পরীক্ষা করা হচ্ছে.....',
    'storm.caption': 'সরকারি ITEWC বুলেটিন অনুযায়ী',
    'storm.bulletin': 'বুলেটিন ↗',
    'joint_bulletin.title': 'যৌথ বুলেটিন ↗',
    'joint_bulletin.none': 'বর্তমানে কোনো যৌথ বুলেটিন নেই।',
    'pfz.title': 'সম্ভাব্য মৎস্য অঞ্চল (PFZ)',
    'pfz.kicker': 'আজকের মাছ ধরার অঞ্চল',
    'pfz.near_me': '📍 আমার কাছে',
    'pfz.source': 'PFZ ↗',
    'pfz.forecast_date': 'পূর্বাভাস',
    'pfz.valid_through': 'মেয়াদ',
    'pfz.loading_sectors': 'অঞ্চলসমূহ লোড হচ্ছে…',
    'pfz.locked_title': 'লক করা ল্যান্ডিং কেন্দ্র',
    'pfz.home_harbor': 'হোম হারবার',
    'pfz.open_compass': '🧭 কম্পাস খুলুন',
    'pfz.lock_flc': '🔒 FLC লক করুন',
    'pfz.locked_flc': '🔒 লক করা হয়েছে',
    'pfz.unlock': '🔓 আনলক করুন',
    'pfz.landing_center': 'ল্যান্ডিং কেন্দ্র',
    'pfz.direction': '🧭 দিক',
    'pfz.distance': '📏 দূরত্ব',
    'pfz.depth': '🌊 গভীরতা',
    'pfz.coordinates': '📌 স্থানাঙ্ক',
    'pfz.bearing': 'কোণ',
    'pfz.landing_centers_title': 'ল্যান্ডিং কেন্দ্রসমূহ',
    'pfz.target_line': 'লক্ষ্য রেখা',
    'pfz.no_line_issued': 'এর জন্য আজ কোনো PFZ রেখা নেই -',
    'other.title': 'অন্যান্য সামুদ্রিক সেবা',
    'other.mhw': 'সামুদ্রিক তাপপ্রবাহ (MHW)',
    'other.tchp': 'ঘূর্ণিঝড় তাপশক্তি (TCHP)',
    'other.cbas': 'প্রবাল ব্লিচিং সতর্কতা (CBAS)',
    'other.tuna': 'টুনা মাছ ↗',
    'other.hilsa': 'ইলিশ মাছ ↗',
    'other.hab': 'ক্ষতিকারক শৈবাল ↗',
    'other.oil_spill': 'তেল নিঃসরণ ↗',
    'other.svas': 'ছোট নৌকা ↗',
    'other.sarat': 'সারাত (SARAT) ↗',
    'other.ports': 'বন্দর পূর্বাভাস ↗',
    'other.ship_route': 'জাহাজ রুট ↗',
    'other.location_specific': 'নির্দিষ্ট অঞ্চল পূর্বাভাস ↗',
    'mhw.title': 'সামুদ্রিক তাপপ্রবাহ',
    'mhw.subtitle': 'সরকারি INCOIS আঞ্চলিক পর্যবেক্ষণ',
    'mhw.open_page': 'পেজ খুলুন ↗',
    'mhw.unavailable': 'সামুদ্রিক তাপপ্রবাহের তথ্য এই মুহূর্তে নেই।',
    'cbas.title': '🪸 প্রবাল ব্লিচিং সতর্কীকরণ ব্যবস্থা (CBAS)',
    'cbas.subtitle': 'INCOIS CBAS · স্যাটেলাইট তাপীয় চাপ পর্যবেক্ষণ',
    'cbas.guide_title': 'ℹ️ এই পরিমাপগুলির অর্থ কী?',
    'cbas.hotspot_def': 'মাসিক গড়ের চেয়ে বেশি সমুদ্রপৃষ্ঠের তাপমাত্রা — তাৎক্ষণিক তাপীয় চাপ নির্দেশ করে।',
    'cbas.dhw_def': '১২ সপ্তাহের পুঞ্জীভূত তাপীয় চাপ (°C-সপ্তাহ) — প্রবাল মৃত্যুর ঝুঁকি প্রকাশ করে।',
    'cbas.hotspot_lbl': 'হটস্পট:',
    'cbas.dhw_lbl': 'DHW (১২ সপ্তাহ):',
    'cbas.view_map': '🗺️ জাতীয় তাপ মানচিত্র দেখুন ↗',
    'cbas.official_portal': 'সরকারি CBAS পোর্টাল ↗',
    'cbas.no_stress': 'চাপমুক্ত',
    'tchp.title': '🌪️ ঘূর্ণিঝড় তাপীয় সম্ভাবনা (TCHP)',
    'tchp.subtitle': 'INCOIS-ROMS ৫-দিনের সমুদ্র তাপশক্তি পূর্বাভাস',
    'tchp.tab_tchp': 'TCHP (kJ/cm²)',
    'tchp.tab_sst': 'SST (°C)',
    'tchp.tab_ssha': 'SSHA (m)',
    'tchp.play': '▶ চালান',
    'tchp.pause': '⏸ থামান',
    'tchp.loading': 'মানচিত্র লোড হচ্ছে…',
    'tchp.guide_title': 'ℹ️ ঘূর্ণিঝড় তীব্রতা নির্দেশিকা:',
    'tchp.low_unfavorable': 'কম / প্রতিকূল',
    'tchp.moderate_favorable': 'মাঝারি / অনুকূল',
    'tchp.rapid_intensification': '⚠️ অতি দ্রুত তীব্রতা বৃদ্ধির ঝুঁকি',
    'tchp.guide_desc': '২৬°C পর্যন্ত সমুদ্রের তাপশক্তিকে TCHP বলা হয়। উচ্চ TCHP (>80 kJ/cm²) ঘূর্ণিঝড়কে মারাত্মক শক্তিশালী করে।',
    'map.osf_title': 'সমুদ্রাবস্থা পূর্বাভাস মানচিত্র',
    'map.osf_subtitle': 'উঁচু ঢেউ · সোয়েল সার্জ · সমুদ্র স্রোত',
    'map.osf_note': 'ইনকোইস থেকে প্রাপ্ত রাজ্যভিত্তিক সতর্কতা মানচিত্র।',
    'map.pfz_title': 'সম্ভাব্য মৎস্য অঞ্চল মানচিত্র',
    'map.pfz_subtitle': 'সরকারি INCOIS PFZ লেয়ারসমূহ',
    'map.pfz_lines': 'PFZ পূর্বাভাস রেখা',
    'map.pfz_sectors': 'অঞ্চলসমূহ (Sectors)',
    'map.pfz_eez': 'বিশেষ অর্থনৈতিক অঞ্চল (EEZ)',
    'map.pfz_centers': 'ল্যান্ডিং কেন্দ্র',
    'map.pfz_chlorophyll': 'ক্লোরোফিল-এ',
    'tide.status_title': '🌊 জোয়ার-ভাটার স্থিতি',
    'tide.type_label': 'জোয়ারের ধরন:',
    'share.title': 'ওশান ওয়াচ শেয়ার করুন',
    'share.subtitle': 'QR কোড স্ক্যান করুন অথবা লিংক শেয়ার করুন',
    'share.copy': 'লিংক কপি করুন',
    'notify.title': 'সতর্কবার্তা বিজ্ঞপ্তি',
    'notify.subtitle': 'সতর্কতা ও বুলেটিনের তাৎক্ষণিক বার্তা',
    'notify.enable_title': 'ওয়েব অ্যালার্ট চালু করুন',
    'notify.enable_desc': 'নতুন সতর্কতা জারি হলে আপনার ডিভাইসে তৎক্ষণাৎ বার্তা পান।',
    'notify.enable_btn': 'চালু করুন',
    'notify.preferences': 'সতর্কতা পছন্দসমূহ',
    'notify.opt_warnings': 'উঁচু ঢেউ ও সোয়েল সতর্কবার্তা (লাল)',
    'notify.opt_warnings_sub': 'মারাত্মক সমুদ্র সতর্কতা',
    'notify.opt_alerts': 'উঁচু ঢেউ ও সোয়েল অ্যালার্ট (কমলা)',
    'notify.opt_alerts_sub': 'মাঝারি সমুদ্র সতর্কতা',
    'notify.opt_tsunami': 'সুনামি বুলেটিন',
    'notify.opt_tsunami_sub': 'সরকারি ITEWC সুনামি বুলেটিন',
    'notify.opt_cyclone': 'ঘূর্ণিঝড় বুলেটিন',
    'notify.opt_cyclone_sub': 'IMD/INCOIS ঘূর্ণিঝড় সতর্কতা',
    'notify.opt_storm': 'জলোচ্ছ্বাস বুলেটিন',
    'notify.opt_storm_sub': 'উপকূল প্লাবন বুলেটিন',
    'notify.send_test': 'পরীক্ষামূলক বার্তা পাঠান',
    'voice.dialog_title': 'উপকূলীয় অডিও বুলেটিন',
    'voice.dialog_subtitle': 'বহুভাষিক ভয়েস বুলেটিন (INCOIS / ITEWC / IMD)',
    'voice.lang_label': 'ভাষা:',
    'voice.play_audio': '▶ অডিও শুনুন',
    'compass.title': '🧭 লাইভ নৌ কম্পাস',
    'compass.subtitle': 'আপনার অবস্থান থেকে PFZ পয়েন্ট',
    'compass.target_line': 'PFZ লক্ষ্য রেখা',
    'compass.calc_course': '🎯 দিক নির্ণয় করা হচ্ছে…',
    'compass.heading': 'নৌকার দিক (Heading)',
    'compass.bearing': 'লক্ষ্য কোণ (Bearing)',
    'compass.distance': 'দূরত্ব (আপনার থেকে PFZ)',
    'compass.rotate_sensor': 'দিক পরিবর্তন (সিমুলেটর):',
    'dialog.district_advisories': 'জেলা স্তরের সতর্কতা',
    'dialog.district_guidance': 'উপকূলীয় জেলার দিকনির্দেশনা',
    'dialog.no_district_details': 'পরবর্তী আপডেটে জেলার বিবরণ প্রদর্শিত হবে।',
    'dialog.open_official_map': 'বিস্তারিত দেখতে মানচিত্র খুলুন।',
    'dialog.coastal_area': 'উপকূলীয় অঞ্চল',
    'dialog.close': 'বন্ধ করুন',
    'dialog.share': 'শেয়ার করুন',
    'dialog.voice_summary': 'ওশান ওয়াচ অডিও সারাংশ',
    'dialog.voice_listen': 'শুনুন',
    'dialog.voice_pause': 'থামান',
    'footer.auto_update': 'স্বয়ংক্রিয় আপডেট:',
    'footer.auto_update_val': 'প্রতি ১৫ মিনিটে',
    'footer.disclaimer_title': 'দাবিত্যাগ:',
    'footer.disclaimer': 'তথ্য সরকারি উৎস থেকে সংগৃহীত; নির্ভুলতার জন্য সর্বদা অফিসিয়াল বুলেটিন দেখুন।',
    'footer.source': 'তথ্যের উৎস: INCOIS–MoES ↗',
    'footer.visits': 'ভিজিট',
    'contact.title': 'সমুদ্র তথ্য পোর্টাল',
    'contact.subtitle': 'বিটা পরীক্ষার অধীনে',
    'joint_bulletin.default_msg': 'ইনকোইস-আইএমডি যৌথ বিশেষ বুলেটিন',
    'joint_bulletin.active_prefix': 'সক্রিয় বুলেটিন',
    'joint_bulletin.issued_prefix': 'বুলেটিন প্রকাশিত',
        'tide.wind': 'বাতাস',
    'tide.wave': 'ঢেউ',
    'tide.swell': 'সোয়েল ঢেউ',
    'tide.current': 'স্রোত',
    'tide.normal': 'স্বাভাবিক',
    'tide.wind_sea': 'বাতাস ও সমুদ্র',
    'tide.tide_state': 'জোয়ারের অবস্থা',
    'tide.moon_tide_type': 'চাঁদ ও জোয়ারের ধরন',
    'tide.rising': '▲ জোয়ার (Flood)',
    'tide.falling': '▼ ভাঁটা (Ebb)',
    'tide.spring_tide': 'ভরা কোটাল (Spring Tide)',
    'tide.neap_tide': 'মরা কোটাল (Neap Tide)',
    'tide.high_tide': 'পূর্ণ জোয়ার (High Tide IST)',
    'tide.low_tide': 'ভাঁটা (Low Tide IST)',
    'tide.no_warnings': '✓ কোন সক্রিয় উপকূলীয় সতর্কতা নেই:',
    'tide.active_for': 'সতর্কতা সক্রিয়:',
    'tide.coast': 'উপকূল',
    'tide.regional_advisory': 'আঞ্চলিক পরামর্শ:',
    'osf.advisory_note': 'জেলা এবং উপকূলীয় অঞ্চলের পরিস্থিতি ভিন্ন হওয়ার কারণে একটি রাজ্য একাধিক সতর্কবার্তার অধীনে উপস্থিত হতে পারে।'
  },
  mr: {
    'brand.title': 'ओशन वॉच',
    'header.title': 'किनारपट्टी इशारा स्थिती',
    'header.subtitle': 'सुनामी · चक्रीवादळ · वादळी लाटा · समुद्र स्थिती अंदाज · संभाव्य मत्स्य क्षेत्र',
    'header.snapshot': 'अधिकृत माहिती स्नॅपशॉट',
    'header.voice': 'आवाज',
    'header.alerts': 'इशारे',
    'header.share': 'शेअर करा',
    'header.install': 'इन्स्टॉल करा',
    'announcement.title': 'सक्रिय',
    'announcement.latest': 'ताजे अपडेट:',
    'announcement.checking': 'माहिती तपासत आहे…',
    'announcement.none': 'काहीही नाही',
    'announcement.updated': 'अद्ययावत',
    'announcement.bulletin': 'बुलेटिन',
    'osf.title': 'समुद्र स्थिती अंदाज',
    'osf.high_wave': 'उंच लाटा',
    'osf.high_wave_kicker': 'उंच लाटा, स्वेल सर्ज आणि सागरी प्रवाह इशारे',
    'osf.high_wave_card': 'लाटांची उंची',
    'osf.swell_surge': 'स्वेल सर्ज लाटा',
    'osf.swell_surge_card': 'दीर्घ कालावधीच्या लाटा',
    'osf.swell_surge_kicker': 'स्वेल लाटा आणि कालावधी इशारा',
    'osf.ocean_currents': 'सागरी प्रवाह',
    'osf.ocean_currents_card': 'प्रवाहाचा वेग',
    'osf.ocean_currents_kicker': 'पृष्ठभागावरील प्रवाहाचा वेग व दिशा',
    'osf.storm_surge': 'वादळी लाटा',
    'osf.storm_surge_kicker': 'किनारपट्टी पूर धोका',
    'osf.map_button': 'नकाशा पहा',
    'osf.visualize': 'नकाशात पहा',
    'osf.astronomical_tide': 'खगोलीय भरती-ओहोटी अंदाज',
    'severity.warning': 'धोका (Warning)',
    'severity.alert': 'सतर्कता (Alert)',
    'severity.watch': 'निरीक्षण (Watch)',
    'severity.no_threat': 'धोका नाही',
    'severity.issued': 'जारी',
    'severity.districts': 'जिल्हे',
    'severity.states': 'राज्ये',
    'severity.no_active': 'किनारपट्टीच्या राज्यांमध्ये सध्या कोणताही धोका नाही.',
    'severity.loading': 'माहिती लोड होत आहे…',
    'tsunami.title': 'सुनामी इशारा',
    'tsunami.kicker': 'भारतीय सुनामी पूर्वसूचना केंद्र',
    'tsunami.safe': 'भारताच्या किनारपट्टीला कोणताही सुनामी धोका नाही',
    'tsunami.checking': 'सुनामी स्थिती तपासत आहे.....',
    'tsunami.last_checked': 'शेवटची तपासणी',
    'tsunami.warning': 'सुनामी चेतावणी जारी',
    'tsunami.alert': 'सुनामी सतर्कता जारी',
    'tsunami.watch': 'सुनामी निरीक्षण जारी',
    'tsunami.source': 'ITEWC ↗',
    'cyclone.title': 'चक्रीवादळ इशारा',
    'cyclone.kicker': 'इन्कॉईस-आयएमडी संयुक्त बुलेटिन',
    'cyclone.safe': 'कोणताही सक्रिय चक्रीवादळ इशारा नाही',
    'cyclone.checked': 'आयएमडी कॅप अलर्टनुसार.',
    'cyclone.source': 'IMD ↗',
    'seismic.title': 'अलीकडील भूकंप ≥ 6.5M',
    'seismic.kicker': 'अलीकडील किनारपट्टी भूकंप',
    'seismic.safe': 'किनारपट्टीवर कोणताही मोठा भूकंप नाही (M≥5.0).',
    'seismic.checking': 'भूकंप तीव्रता तपासत आहे >= 6.5M',
    'seismic.source': 'भूकंप ↗',
    'seismic.dialog_title': 'भूकंप बुलेटिन तपशील',
    'seismic.dialog_meta': 'अधिकृत ITEWC माहिती',
    'seismic.itewc_evaluation': 'ITEWC मूल्यांकन',
    'seismic.advice': 'सल्ला / सूचना',
    'seismic.updates': 'ताजे अपडेट्स',
    'seismic.unavailable': 'या घटनेसाठी अधिकृत माहिती उपलब्ध नाही.',
    'seismic.open_bulletin': 'अधिकृत बुलेटिन उघडा ↗',
    'seismic.fact_magnitude': 'तीव्रता (Magnitude)',
    'seismic.fact_depth': 'खोली (Depth)',
    'seismic.fact_date': 'दिनांक',
    'seismic.fact_origin_time': 'उत्पत्ती वेळ (Origin time)',
    'seismic.fact_latitude': 'अक्षांश (Latitude)',
    'seismic.fact_longitude': 'रेखांश (Longitude)',
    'seismic.fact_location': 'स्थान',
    'seismic.fact_bulletin': 'बुलेटिन (Bulletin)',
    'seismic.tectonic_setting': 'टेक्टॉनिक रचना',
    'seismic.setting_land': 'भूभाग (LAND)',
    'seismic.setting_oceanic': 'सागरी (OCEANIC / MARINE)',
    'seismic.bathymetry': 'पाण्याची खोली (Bathymetry)',
    'seismic.bathymetry_nil': 'काहीही नाही (NIL)',
    'seismic.bathymetry_loading': 'खोली लोड होत आहे…',
    'seismic.bathymetry_unavailable': 'खोली उपलब्ध नाही',
    'seismic.coast_distance': 'जवळच्या किनारपट्टीपासून अंतर',
    'seismic.no_advice': 'या बुलेटिनमध्ये कोणताही सल्ला समाविष्ट केला गेला नाही.',
    'storm.title': 'वादळी लाटांचा इशारा',
    'storm.safe': 'कोणतेही सक्रिय वादळी बुलेटिन नाही',
    'storm.checking': 'वादळी लाटांची स्थिती तपासत आहे.....',
    'storm.caption': 'अधिकृत ITEWC माहितीनुसार',
    'storm.bulletin': 'बुलेटिन ↗',
    'joint_bulletin.title': 'संयुक्त बुलेटिन ↗',
    'joint_bulletin.none': 'सध्या कोणतेही संयुक्त बुलेटिन उपलब्ध नाही.',
    'pfz.title': 'संभाव्य मत्स्य क्षेत्र (PFZ)',
    'pfz.kicker': 'आजची मासेमारी क्षेत्रे',
    'pfz.near_me': '📍 माझ्या जवळ',
    'pfz.source': 'PFZ ↗',
    'pfz.forecast_date': 'अंदाज',
    'pfz.valid_through': 'वैधता',
    'pfz.loading_sectors': 'क्षेत्रे लोड होत आहेत…',
    'pfz.locked_title': 'लॉक केलेले लँडिंग केंद्र',
    'pfz.home_harbor': 'होम हार्बर',
    'pfz.open_compass': '🧭 होकायंत्र उघडा',
    'pfz.lock_flc': '🔒 FLC लॉक करा',
    'pfz.locked_flc': '🔒 लॉक केले',
    'pfz.unlock': '🔓 अनलॉक करा',
    'pfz.landing_center': 'लँडिंग केंद्र',
    'pfz.direction': '🧭 दिशा',
    'pfz.distance': '📏 अंतर',
    'pfz.depth': '🌊 खोली',
    'pfz.coordinates': '📌 निर्देशांक',
    'pfz.bearing': 'बेअरिंग',
    'pfz.landing_centers_title': 'लँडिंग केंद्रे',
    'pfz.target_line': 'लक्ष्य रेषा',
    'pfz.no_line_issued': 'साठी आज कोणतीही PFZ रेषा जारी केलेली नाही -',
    'other.title': 'इतर सागरी सेवा',
    'other.mhw': 'सागरी उष्णतेची लाट (MHW)',
    'other.tchp': 'चक्रीवादळ उष्णता क्षमता (TCHP)',
    'other.cbas': 'प्रवाळ विरंजन इशारा (CBAS)',
    'other.tuna': 'टुना मासे ↗',
    'other.hilsa': 'हिल्सा मासे ↗',
    'other.hab': 'विषारी शेवाळ ↗',
    'other.oil_spill': 'तेल गळती ↗',
    'other.svas': 'लहान बोटी ↗',
    'other.sarat': 'सारट (SARAT) ↗',
    'other.ports': 'बंदर अंदाज ↗',
    'other.ship_route': 'जहाज मार्ग ↗',
    'other.location_specific': 'स्थान-विशिष्ट अंदाज ↗',
    'mhw.title': 'सागरी उष्णतेची लाट',
    'mhw.subtitle': 'अधिकृत INCOIS प्रादेशिक निरीक्षणे',
    'mhw.open_page': 'पेज उघडा ↗',
    'mhw.unavailable': 'माहिती उपलब्ध नाही.',
    'cbas.title': '🪸 प्रवाळ विरंजन पूर्वसूचना प्रणाली (CBAS)',
    'cbas.subtitle': 'INCOIS CBAS · उपग्रह थर्मल ताण देखरेख',
    'cbas.guide_title': 'ℹ️ या मेट्रिक्सचा अर्थ काय?',
    'cbas.hotspot_def': 'सरासरीपेक्षा जास्त तापमान — तात्काळ थर्मल ताण दर्शवते.',
    'cbas.dhw_def': '१२ आठवड्यांतील उष्णता ताण (°C-आठवडे) — प्रवाळ विरंजन धोका दर्शवतो.',
    'cbas.hotspot_lbl': 'हॉटस्पॉट:',
    'cbas.dhw_lbl': 'DHW (१२ आठवडे):',
    'cbas.view_map': '🗺️ राष्ट्रीय नकाशा पहा ↗',
    'cbas.official_portal': 'अधिकृत CBAS पोर्टल ↗',
    'cbas.no_stress': 'ताणमुक्त',
    'tchp.title': '🌪️ उष्णकटिबंधीय चक्रीवादळ उष्णता क्षमता (TCHP)',
    'tchp.subtitle': 'INCOIS-ROMS ५-दिवसीय ऊर्जा अंदाज',
    'tchp.tab_tchp': 'TCHP (kJ/cm²)',
    'tchp.tab_sst': 'SST (°C)',
    'tchp.tab_ssha': 'SSHA (m)',
    'tchp.play': '▶ सुरू करा',
    'tchp.pause': '⏸ थांबवा',
    'tchp.loading': 'नकाशा लोड होत आहे…',
    'tchp.guide_title': 'ℹ️ चक्रीवादळ तीव्रता ऊर्जा मार्गदर्शक:',
    'tchp.low_unfavorable': 'कमी / प्रतिकूल',
    'tchp.moderate_favorable': 'मध्यम / अनुकूल',
    'tchp.rapid_intensification': '⚠️ अति तीव्रतेचा धोका',
    'tchp.guide_desc': 'सागरी पृष्ठभागाखालील उष्णता मोजण्याचे प्रमाण म्हणजे TCHP. उच्च TCHP (>80 kJ/cm²) वादळांना तीव्र ऊर्जा देते.',
    'map.osf_title': 'समुद्र स्थिती अंदाज नकाशा',
    'map.osf_subtitle': 'उंच लाटा · स्वेल सर्ज · सागरी प्रवाह',
    'map.osf_note': 'इनकॉईसचे राज्यस्तरीय नकाशे.',
    'map.pfz_title': 'संभाव्य मत्स्य क्षेत्र नकाशा',
    'map.pfz_subtitle': 'अधिकृत INCOIS PFZ स्तर',
    'map.pfz_lines': 'PFZ अंदाज रेषा',
    'map.pfz_sectors': 'क्षेत्रे (Sectors)',
    'map.pfz_eez': 'विशेष आर्थिक क्षेत्र (EEZ)',
    'map.pfz_centers': 'लँडिंग केंद्रे',
    'map.pfz_chlorophyll': 'क्लोरोफिल-ए',
    'tide.status_title': '🌊 भरती-ओहोटी स्थिती',
    'tide.type_label': 'भरतीचा प्रकार:',
    'share.title': 'ओशन वॉच शेअर करा',
    'share.subtitle': 'QR कोड स्कॅन करा किंवा लिंक शेअर करा',
    'share.copy': 'लिंक कॉपी करा',
    'notify.title': 'इशारा सूचना',
    'notify.subtitle': 'तात्काळ अलर्ट्स',
    'notify.enable_title': 'वेब अलर्ट्स सुरू करा',
    'notify.enable_desc': 'नवीन इशारे जारी झाल्यावर मोबाईलवर सूचना मिळवा.',
    'notify.enable_btn': 'सुरू करा',
    'notify.preferences': 'अलर्ट प्राधान्ये',
    'notify.opt_warnings': 'उंच लाटा इशारे (लाल)',
    'notify.opt_warnings_sub': 'गंभीर सागरी इशारे',
    'notify.opt_alerts': 'उंच लाटा अलर्ट (केशरी)',
    'notify.opt_alerts_sub': 'मध्यम सागरी अलर्ट',
    'notify.opt_tsunami': 'सुनामी बुलेटिन',
    'notify.opt_tsunami_sub': 'अधिकृत ITEWC सुनामी बुलेटिन',
    'notify.opt_cyclone': 'चक्रीवादळ बुलेटिन',
    'notify.opt_cyclone_sub': 'IMD/INCOIS चक्रीवादळ इशारे',
    'notify.opt_storm': 'वादळी लाटा बुलेटिन',
    'notify.opt_storm_sub': 'किनारपट्टी पूर बुलेटिन',
    'notify.send_test': 'चाचणी अलर्ट पाठवा',
    'voice.dialog_title': 'किनारपट्टी ऑडिओ बुलेटिन',
    'voice.dialog_subtitle': 'बहुभाषिक आवाज सारांश (INCOIS / ITEWC / IMD)',
    'voice.lang_label': 'भाषा:',
    'voice.play_audio': '▶ ऑडिओ ऐका',
    'compass.title': '🧭 थेट नॉटिकल होकायंत्र',
    'compass.subtitle': 'तुमच्या स्थानावरून PFZ बिंदू',
    'compass.target_line': 'PFZ लक्ष्य रेषा',
    'compass.calc_course': '🎯 मार्ग मोजत आहे…',
    'compass.heading': 'बोटीची दिशा (Heading)',
    'compass.bearing': 'लक्ष्य कोन (Bearing)',
    'compass.distance': 'अंतर (तुमच्यापासून PFZ)',
    'compass.rotate_sensor': 'दिशा फिरवा (सिम्युलेटर):',
    'dialog.district_advisories': 'जिल्हास्तरीय इशारे',
    'dialog.district_guidance': 'किनारपट्टी मार्गदर्शक सूचना',
    'dialog.no_district_details': 'पुढील अपडेटमध्ये तपशील उपलब्ध होतील.',
    'dialog.open_official_map': 'अधिकृत नकाशा पहा.',
    'dialog.coastal_area': 'किनारपट्टी भाग',
    'dialog.close': 'बंद करा',
    'dialog.share': 'शेअर करा',
    'dialog.voice_summary': 'ओशन वॉच ऑडिओ सारांश',
    'dialog.voice_listen': 'ऐका',
    'dialog.voice_pause': 'थांबवा',
    'footer.auto_update': 'स्वयंचलित अपडेट:',
    'footer.auto_update_val': 'दर १५ मिनिटांनी',
    'footer.disclaimer_title': 'अस्वीकरण:',
    'footer.disclaimer': 'माहिती अधिकृत स्त्रोतांकडून घेतली आहे; अचूकतेसाठी अधिकृत बुलेटिन तपासा.',
    'footer.source': 'माहिती स्त्रोत: INCOIS–MoES ↗',
    'footer.visits': 'भेटी',
    'contact.title': 'सागरी माहिती पोर्टल',
    'contact.subtitle': 'बीटा चाचणी अंतर्गत',
    'joint_bulletin.default_msg': 'इन्कॉईस-आयएमडी संयुक्त विशेष बुलेटिन',
    'joint_bulletin.active_prefix': 'सक्रिय बुलेटिन',
    'joint_bulletin.issued_prefix': 'बुलेटिन जारी केले',
        'tide.wind': 'वारा',
    'tide.wave': 'लाटा',
    'tide.swell': 'लाटांचा वेग',
    'tide.current': 'प्रवाह',
    'tide.normal': 'सामान्य',
    'tide.wind_sea': 'वारा आणि समुद्र',
    'tide.tide_state': 'भरती-ओहोटी स्थिती',
    'tide.moon_tide_type': 'चंद्र आणि भरतीचा प्रकार',
    'tide.rising': '▲ भरती (Flood)',
    'tide.falling': '▼ ओहोटी (Ebb)',
    'tide.spring_tide': 'उधाणाची भरती (Spring Tide)',
    'tide.neap_tide': 'भांगाची भरती (Neap Tide)',
    'tide.high_tide': 'पूर्ण भरती (High Tide IST)',
    'tide.low_tide': 'ओहोटी (Low Tide IST)',
    'tide.no_warnings': '✓ कोणतीही किनारपट्टी चेतावणी नाही:',
    'tide.active_for': 'चेतावणी लागू:',
    'tide.coast': 'किनारपट्टी',
    'tide.regional_advisory': 'प्रादेशिक सल्लागार:',
    'osf.advisory_note': 'जिल्हा आणि किनारपट्टीची परिस्थिती भिन्न असल्याने एक राज्य अनेक पातळींमध्ये दिसू शकते.'
  },
  gu: {
    'brand.title': 'ઓશન વોચ',
    'header.title': 'દરિયાકાંઠા ચેતવણી સ્થિતિ',
    'header.subtitle': 'સુનામી · વાવાઝોડું · મોજાનું તોફાન · દરિયાઈ સ્થિતિ આગાહી · સંભવિત મત્સ્ય ક્ષેત્ર',
    'header.snapshot': 'સત્તાવાર સ્નેપશોટ',
    'header.voice': 'અવાજ',
    'header.alerts': 'ચેતવણીઓ',
    'header.share': 'શેર કરો',
    'header.install': 'ઇન્સ્ટોલ',
    'announcement.title': 'સક્રિય',
    'announcement.latest': 'તાજા સમાચાર:',
    'announcement.checking': 'માહિતી ચકાસી રહ્યા છીએ…',
    'announcement.none': 'કોઈ નહીં',
    'announcement.updated': 'અપડેટ થયેલ',
    'announcement.bulletin': 'બુલેટિન',
    'osf.title': 'દરિયાઈ સ્થિતિ આગાહી',
    'osf.high_wave': 'ઊંચા મોજાં',
    'osf.high_wave_kicker': 'ઊંચા મોજાં, સ્વેલ સર્જ અને દરિયાઈ પ્રવાહ ચેતવણીઓ',
    'osf.high_wave_card': 'મોજાંની ઊંચાઈ',
    'osf.swell_surge': 'સ્વેલ સર્જ મોજાં',
    'osf.swell_surge_card': 'લાંબા સમયગાળાના મોજાં',
    'osf.swell_surge_kicker': 'સ્વેલ મોજાં અને સમયગાળો ચેતવણી',
    'osf.ocean_currents': 'દરિયાઈ પ્રવાહ',
    'osf.ocean_currents_card': 'પ્રવાહની ઝડપ',
    'osf.ocean_currents_kicker': 'સપાટીના પ્રવાહની ઝડપ અને દિશા',
    'osf.storm_surge': 'તોફાની મોજાં',
    'osf.storm_surge_kicker': 'દરિયાકાંઠા પૂર જોખમ',
    'osf.map_button': 'નકશો જુઓ',
    'osf.visualize': 'નકશામાં જુઓ',
    'osf.astronomical_tide': 'ખગોળીય ભરતી-ઓટ આગાહી',
    'severity.warning': 'ચેતવણી (Warning)',
    'severity.alert': 'સાવચેતી (Alert)',
    'severity.watch': 'નિરીક્ષણ (Watch)',
    'severity.no_threat': 'કોઈ ભય નથી',
    'severity.issued': 'જારી',
    'severity.districts': 'જિલ્લાઓ',
    'severity.states': 'રાજ્યો',
    'severity.no_active': 'દરિયાકાંઠાના રાજ્યોમાં હાલ કોઈ સક્રિય ચેતવણી નથી.',
    'severity.loading': 'ડેટા લોડ થઈ રહ્યો છે…',
    'tsunami.title': 'સુનામી ચેતવણી',
    'tsunami.kicker': 'ભારતીય સુનામી પ્રારંભિક ચેતવણી કેન્દ્ર',
    'tsunami.safe': 'ભારતના દરિયાકાંઠે સુનામીનો કોઈ ભય નથી',
    'tsunami.checking': 'સુનામી સ્થિતિ તપાસી રહ્યા છીએ.....',
    'tsunami.last_checked': 'છેલ્લી ચકાસણી',
    'tsunami.warning': 'સુનામી ચેતવણી જારી',
    'tsunami.alert': 'સુનામી સાવચેતી જારી',
    'tsunami.watch': 'સુનામી વોચ જારી',
    'tsunami.source': 'ITEWC ↗',
    'cyclone.title': 'વાવાઝોડું ચેતવણી',
    'cyclone.kicker': 'ઇનકોઇસ-આઇએમડી સંયુક્ત બુલેટિન',
    'cyclone.safe': 'કોઈ સક્રિય વાવાઝોડા ચેતવણી નથી',
    'cyclone.checked': 'આઇએમડી કેપ એલર્ટ અનુસાર.',
    'cyclone.source': 'IMD ↗',
    'seismic.title': 'તાજેતરના ભૂકંપ ≥ 6.5M',
    'seismic.kicker': 'તાજેતરના દરિયાકાંઠાના ભૂકંપ',
    'seismic.safe': 'દરિયાકાંઠે કોઈ મોટો ભૂકંપ નોંધાયો નથી (M≥5.0).',
    'seismic.checking': 'ભૂકંપ તીવ્રતા ચકાસી રહ્યા છીએ >= 6.5M',
    'seismic.source': 'ભૂકંપ ↗',
    'seismic.dialog_title': 'ભૂકંપ બુલેટિન વિગતો',
    'seismic.dialog_meta': 'સત્તાવાર ITEWC માહિતી',
    'seismic.itewc_evaluation': 'ITEWC મૂલ્યાંકન',
    'seismic.advice': 'સલાહ / સૂચના',
    'seismic.updates': 'તાજા અપડેટ્સ',
    'seismic.unavailable': 'આ ઘટના માટે સત્તાવાર માહિતી ઉપલબ્ધ નથી.',
    'seismic.open_bulletin': 'સત્તાવાર બુલેટિન ખોલો ↗',
    'seismic.fact_magnitude': 'તીવ્રતા (Magnitude)',
    'seismic.fact_depth': 'ઊંડાઈ (Depth)',
    'seismic.fact_date': 'તારીખ',
    'seismic.fact_origin_time': 'ઉત્પત્તિ સમય (Origin time)',
    'seismic.fact_latitude': 'અક્ષાંશ (Latitude)',
    'seismic.fact_longitude': 'રેખાંશ (Longitude)',
    'seismic.fact_location': 'સ્થળ',
    'seismic.fact_bulletin': 'બુલેટિન (Bulletin)',
    'seismic.tectonic_setting': 'ટેક્ટોનિક સ્થિતિ',
    'seismic.setting_land': 'જમીન (LAND)',
    'seismic.setting_oceanic': 'સમુદ્રી (OCEANIC / MARINE)',
    'seismic.bathymetry': 'દરિયાઈ ઊંડાઈ (Bathymetry)',
    'seismic.bathymetry_nil': 'શૂન્ય (NIL)',
    'seismic.bathymetry_loading': 'ઊંડાઈ લોડ થઈ રહી છે…',
    'seismic.bathymetry_unavailable': 'ઊંડાઈ ઉપલબ્ધ નથી',
    'seismic.coast_distance': 'નજીકના કાંઠાથી અંતર',
    'seismic.no_advice': 'આ બુલેટિનમાં કોઈ સલાહ શામેલ કરવામાં આવી ન હતી.',
    'storm.title': 'તોફાની મોજાં ચેતવણી',
    'storm.safe': 'કોઈ સક્રિય મોજાં બુલેટિન નથી',
    'storm.checking': 'તોફાની મોજાં સ્થિતિ તપાસી રહ્યા છીએ.....',
    'storm.caption': 'સત્તાવાર ITEWC માહિતી',
    'storm.bulletin': 'બુલેટિન ↗',
    'joint_bulletin.title': 'સંયુક્ત બુલેટિન ↗',
    'joint_bulletin.none': 'હાલમાં કોઈ સંયુક્ત બુલેટિન ઉપલબ્ધ નથી.',
    'pfz.title': 'સંભવિત મત્સ્ય ક્ષેત્ર (PFZ)',
    'pfz.kicker': 'આજના માછીમારી ક્ષેત્રો',
    'pfz.near_me': '📍 મારી નજીક',
    'pfz.source': 'PFZ ↗',
    'pfz.forecast_date': 'આગાહી',
    'pfz.valid_through': 'માન્યતા',
    'pfz.loading_sectors': 'ક્ષેત્રો લોડ થઈ રહ્યા છે…',
    'pfz.locked_title': 'લોક કરેલ લેન્ડિંગ કેન્દ્ર',
    'pfz.home_harbor': 'હોમ હાર્બર',
    'pfz.open_compass': '🧭 હોકાયંત્ર ખોલો',
    'pfz.lock_flc': '🔒 FLC લોક કરો',
    'pfz.locked_flc': '🔒 લોક કરેલ',
    'pfz.unlock': '🔓 અનલોક કરો',
    'pfz.landing_center': 'લેન્ડિંગ કેન્દ્ર',
    'pfz.direction': '🧭 દિશા',
    'pfz.distance': '📏 અંતર',
    'pfz.depth': '🌊 ઊંડાઈ',
    'pfz.coordinates': '📌 અક્ષાંશ-રેખાંશ',
    'pfz.bearing': 'બેરિંગ',
    'pfz.landing_centers_title': 'લેન્ડિંગ કેન્દ્રો',
    'pfz.target_line': 'લક્ષ્ય રેખા',
    'pfz.no_line_issued': 'માટે આજે કોઈ PFZ રેખા નથી -',
    'other.title': 'અન્ય દરિયાઈ સેવાઓ',
    'other.mhw': 'મરીન હીટવેવ (MHW)',
    'other.tchp': 'વાવાઝોડું ઉષ્મા ક્ષમતા (TCHP)',
    'other.cbas': 'પરવાળા બ્લીચિંગ ચેતવણી (CBAS)',
    'other.tuna': 'ટુના માછલી ↗',
    'other.hilsa': 'હિલસા માછલી ↗',
    'other.hab': 'ઝેરી શેવાળ ↗',
    'other.oil_spill': 'તેલ ગળતર ↗',
    'other.svas': 'નાની બોટો ↗',
    'other.sarat': 'સારટ (SARAT) ↗',
    'other.ports': 'બંદર આગાહી ↗',
    'other.ship_route': 'જહાજ માર્ગ ↗',
    'other.location_specific': 'સ્થળ આધારિત આગાહી ↗',
    'mhw.title': 'મરીન હીટ વેવ',
    'mhw.subtitle': 'સત્તાવાર INCOIS પ્રાદેશિક અવલોકનો',
    'mhw.open_page': 'પેજ ખોલો ↗',
    'mhw.unavailable': 'માહિતી ઉપલબ્ધ નથી.',
    'cbas.title': '🪸 પરવાળા બ્લીચિંગ ચેતવણી પ્રણાલી (CBAS)',
    'cbas.subtitle': 'INCOIS CBAS · સેટેલાઇટ થર્મલ સ્ટ્રેસ મોનિટરિંગ',
    'cbas.guide_title': 'ℹ️ આ મેટ્રિક્સનો અર્થ શું છે?',
    'cbas.hotspot_def': 'સરેરાશ કરતાં વધુ તાપમાન — તાત્કાલિક થર્મલ તણાવ દર્શાવે છે.',
    'cbas.dhw_def': '૧૨ અઠવાડિયાનો સંચિત તાપ તણાવ (°C-અઠવાડિયા) — પરવાળા મૃત્યુનું જોખમ દર્શાવે છે.',
    'cbas.hotspot_lbl': 'હોટસ્પોટ:',
    'cbas.dhw_lbl': 'DHW (૧૨ અઠવાડિયા):',
    'cbas.view_map': '🗺️ રાષ્ટ્રીય નકશો જુઓ ↗',
    'cbas.official_portal': 'સત્તાવાર CBAS પોર્ટલ ↗',
    'cbas.no_stress': 'તણાવમુક્ત',
    'tchp.title': '🌪️ ઉષ્ણકટિબંધીય ચક્રવાત ઉષ્મા ક્ષમતા (TCHP)',
    'tchp.subtitle': 'INCOIS-ROMS ૫-દિવસીય દરિયાઈ ઉર્જા આગાહી',
    'tchp.tab_tchp': 'TCHP (kJ/cm²)',
    'tchp.tab_sst': 'SST (°C)',
    'tchp.tab_ssha': 'SSHA (m)',
    'map.pfz_subtitle': 'સત્તાવાર INCOIS PFZ સ્તરો',
    'map.pfz_lines': 'PFZ આગાહી રેખાઓ',
    'map.pfz_sectors': 'ક્ષેત્રો (Sectors)',
    'map.pfz_eez': 'વિશેષ આર્થિક ક્ષેત્ર (EEZ)',
    'map.pfz_centers': 'લેન્ડિંગ કેન્દ્રો',
    'map.pfz_chlorophyll': 'ક્લોરોફિલ-એ',
    'tide.status_title': '🌊 ભરતી-ઓટ સ્થિતિ',
    'tide.type_label': 'ભરતીનો પ્રકાર:',
    'share.title': 'ઓશન વોચ શેર કરો',
    'share.subtitle': 'QR કોડ સ્કેન કરો અથવા લિંક શેર કરો',
    'share.copy': 'લિંક કોપી કરો',
    'notify.title': 'ચેતવણી સૂચનાઓ',
    'notify.subtitle': 'રીયલ-ટાઇમ એલર્ટ્સ',
    'notify.enable_title': 'વેબ એલર્ટ્સ સક્ષમ કરો',
    'notify.enable_desc': 'નવી ચેતવણીઓ આવે ત્યારે ફોન પર સૂચનાઓ મેળવો.',
    'notify.enable_btn': 'સક્ષમ કરો',
    'notify.preferences': 'એલર્ટ પસંદગીઓ',
    'notify.opt_warnings': 'ઊંચા મોજાં ચેતવણી (લાલ)',
    'notify.opt_warnings_sub': 'ગંભીર દરિયાઈ ચેતવણી',
    'notify.opt_alerts': 'ઊંચા મોજાં એલર્ટ (નારંગી)',
    'notify.opt_alerts_sub': 'મધ્યમ દરિયાઈ એલર્ટ',
    'notify.opt_tsunami': 'સુનામી બુલેટિન',
    'notify.opt_tsunami_sub': 'સત્તાવાર ITEWC સુનામી બુલેટિન',
    'notify.opt_cyclone': 'વાવાઝોડું બુલેટિન',
    'notify.opt_cyclone_sub': 'IMD/INCOIS વાવાઝોડું ચેતવણી',
    'notify.opt_storm': 'તોફાની મોજાં બુલેટિન',
    'notify.opt_storm_sub': 'કાંઠા પૂર બુલેટિન',
    'notify.send_test': 'ટેસ્ટ એલર્ટ મોકલો',
    'voice.dialog_title': 'દરિયાકાંઠા ઓડિયો બુલેટિન',
    'voice.dialog_subtitle': 'બહુભાષી અવાજ સારાંશ (INCOIS / ITEWC / IMD)',
    'voice.lang_label': 'ભાષા:',
    'voice.play_audio': '▶ ઑડિયો સાંભળો',
    'compass.title': '🧭 લાઈવ નોટિકલ હોકાયંત્ર',
    'compass.subtitle': 'તમારા સ્થાનથી PFZ બિંદુ સુધી',
    'compass.target_line': 'PFZ લક્ષ્ય રેખા',
    'compass.calc_course': '🎯 દિશા ગણી રહ્યા છીએ…',
    'compass.heading': 'બોટની દિશા (Heading)',
    'compass.bearing': 'લક્ષ્ય કોણ (Bearing)',
    'compass.distance': 'અંતર (તમારાથી PFZ)',
    'compass.rotate_sensor': 'દિશા ફેરવો (સિમ્યુલેટર):',
    'dialog.district_advisories': 'જિલ્લા કક્ષાની ચેતવણી',
    'dialog.district_guidance': 'દરિયાકાંઠા જિલ્લા માર્ગદર્શન',
    'dialog.no_district_details': 'આગામી અપડેટમાં વિગતો દેખાશે.',
    'dialog.open_official_map': 'સત્તાવાર નકશો જુઓ.',
    'dialog.coastal_area': 'દરિયાકાંઠા ક્ષેત્ર',
    'dialog.close': 'બંધ કરો',
    'dialog.share': 'શેર કરો',
    'dialog.voice_summary': 'ઓશન વોચ અવાજ સારાંશ',
    'dialog.voice_listen': 'સાંભળો',
    'dialog.voice_pause': 'થોભો',
    'footer.auto_update': 'સ્વચાલિત અપડેટ:',
    'footer.auto_update_val': 'દર ૧૫ મિનિટે',
    'footer.disclaimer_title': 'અસ્વીકરણ:',
    'footer.disclaimer': 'માહિતી સત્તાવાર સ્ત્રોતોમાંથી મેળવેલ છે; સચોટતા માટે સત્તાવાર બુલેટિન ચકાસો.',
    'footer.source': 'ડેટા સ્ત્રોત: INCOIS–MoES ↗',
    'footer.visits': 'મુલાકાતો',
    'contact.title': 'સમુદ્ર માહિતી પોર્ટલ',
    'contact.subtitle': 'બીટા પરીક્ષણ હેઠળ',
    'joint_bulletin.default_msg': 'ઇનકોઇસ-આઇએમડી સંયુક્ત વિશેષ બુલેટિન',
    'joint_bulletin.active_prefix': 'સક્રિય બુલેટિન',
    'joint_bulletin.issued_prefix': 'બુલેટિન બહાર પડાયું',
        'tide.wind': 'પવન',
    'tide.wave': 'મોજા',
    'tide.swell': 'સ્વેલ મોજા',
    'tide.current': 'પ્રવાહ',
    'tide.normal': 'સામાન્ય',
    'tide.wind_sea': 'પવન અને સમુદ્ર',
    'tide.tide_state': 'ભરતી-ઓટની સ્થિતિ',
    'tide.moon_tide_type': 'ચંદ્ર અને ભરતી પ્રકાર',
    'tide.rising': '▲ ભરતી (Flood)',
    'tide.falling': '▼ ઓટ (Ebb)',
    'tide.spring_tide': 'મોટી ભરતી (Spring Tide)',
    'tide.neap_tide': 'નાની ભરતી (Neap Tide)',
    'tide.high_tide': 'મહત્તમ ભરતી (High Tide IST)',
    'tide.low_tide': 'ઓટ (Low Tide IST)',
    'tide.no_warnings': '✓ કોઈ સક્રિય ચેતવણી નથી:',
    'tide.active_for': 'ચેતવણી સક્રિય:',
    'tide.coast': 'કાંઠો',
    'tide.regional_advisory': 'પ્રાદેશિક સલાહ:',
    'osf.advisory_note': 'જિલ્લા અને દરિયાકાંઠાની પરિસ્થિતિ અલગ હોવાથી એક રાજ્ય બહુવિધ સ્તરો હેઠળ દેખાઈ શકે છે.'
  },
  or: {
    'brand.title': 'ଓସେନ୍ ୱାଚ୍',
    'header.title': 'ଉପକୂଳ ସତର୍କତା ସ୍ଥିତି',
    'header.subtitle': 'ସୁନାମି · ବାତ୍ୟା · ସାମୁଦ୍ରିକ ଜୁଆର · ସମୁଦ୍ର ଅବସ୍ଥା ପୂର୍ବାନୁମାନ · ମତ୍ସ୍ୟ ଧରିବା କ୍ଷେତ୍ର',
    'header.snapshot': 'ସରକାରୀ ତଥ୍ୟ ସ୍ନାପସଟ୍',
    'header.voice': 'ଭଏସ୍',
    'header.alerts': 'ଆଲର୍ଟ',
    'header.share': 'ସେୟାର',
    'header.install': 'ଇନଷ୍ଟଲ୍',
    'announcement.title': 'ସକ୍ରିୟ',
    'announcement.latest': 'ସର୍ବଶେଷ:',
    'announcement.checking': 'ତଥ୍ୟ ଯାଞ୍ଚ ଚାଲିଛି…',
    'announcement.none': 'କିଛି ନାହିଁ',
    'announcement.updated': 'ଅଦ୍ୟତନ',
    'announcement.bulletin': 'ବୁଲେଟିନ୍',
    'osf.title': 'ସମୁଦ୍ର ଅବସ୍ଥା ପୂର୍ବାନୁମାନ',
    'osf.high_wave': 'ଉଚ୍ଚ ତରଙ୍ଗ / ଢେଉ',
    'osf.high_wave_kicker': 'ଉଚ୍ଚ ତରଙ୍ଗ, ସ୍ୱେଲ୍ ସର୍ଜ ଏବଂ ସମୁଦ୍ର ସ୍ରୋତ ସତର୍କତା',
    'osf.high_wave_card': 'ତରଙ୍ଗ ଉଚ୍ଚତା',
    'osf.swell_surge': 'ସ୍ୱେଲ୍ ସର୍ଜ',
    'osf.swell_surge_card': 'ଦୀର୍ଘ ଅବଧିର ସ୍ୱେଲ୍ ତରଙ୍ଗ',
    'osf.swell_surge_kicker': 'ସ୍ୱେଲ୍ ତରଙ୍ଗ ଓ ସମୟାବଧି ସତର୍କତା',
    'osf.ocean_currents': 'ସମୁଦ୍ର ସ୍ରୋତ',
    'osf.ocean_currents_card': 'ସ୍ରୋତର ବେଗ',
    'osf.ocean_currents_kicker': 'ପୃଷ୍ଠଭାଗ ସ୍ରୋତର ଗତି ଓ ଦିଗ',
    'osf.storm_surge': 'ବାତ୍ୟା ଜୁଆର / ଜଳୋଚ୍ଛ୍ୱାସ',
    'osf.storm_surge_kicker': 'ଉପକୂଳ ଜଳମଗ୍ନ ବିପଦ',
    'osf.map_button': 'ମାନଚିତ୍ର ଦେଖନ୍ତୁ',
    'osf.visualize': 'ମାନଚିତ୍ରରେ ଦେଖନ୍ତୁ',
    'osf.astronomical_tide': 'ଜ୍ୟୋତିର୍ବିଜ୍ଞାନ ଜୁଆର-ଭଟ୍ଟା ପୂର୍ବାନୁମାନ',
    'severity.warning': 'ଚେତାବନୀ (Warning)',
    'severity.alert': 'ସତର୍କତା (Alert)',
    'severity.watch': 'ଦୃଷ୍ଟି / ନଜର (Watch)',
    'severity.no_threat': 'କୌଣସି ବିପଦ ନାହିଁ',
    'severity.issued': 'ଜାରି',
    'severity.districts': 'ଜିଲ୍ଲା',
    'severity.states': 'ରାଜ୍ୟ',
    'severity.no_active': 'ଉପକୂଳ ରାଜ୍ୟଗୁଡ଼ିକରେ କୌଣସି ସକ୍ରିୟ ଚେତାବନୀ ନାହିଁ।',
    'severity.loading': 'ତଥ୍ୟ ଲୋଡ୍ ହେଉଛି…',
    'tsunami.title': 'ସୁନାମି ସତର୍କତା',
    'tsunami.kicker': 'ଭାରତୀୟ ସୁନାମି ଆଗୁଆ ସୂଚନା କେନ୍ଦ୍ର',
    'tsunami.safe': 'ଭାରତ ଉପକୂଳ ପାଇଁ କୌଣସି ସୁନାମି ବିପଦ ନାହିଁ',
    'tsunami.checking': 'ସୁନାମି ସ୍ଥିତି ଯାଞ୍ଚ କରାଯାଉଛି.....',
    'tsunami.last_checked': 'ଶେଷ ଯାଞ୍ଚ',
    'tsunami.warning': 'ସୁନାମି ଚେତାବନୀ ଜାରି',
    'tsunami.alert': 'ସୁନାମି ସତର୍କତା ଜାରି',
    'tsunami.watch': 'ସୁନାମି ୱାଚ୍ ଜାରି',
    'tsunami.source': 'ITEWC ↗',
    'cyclone.title': 'ବାତ୍ୟା ସତର୍କତା',
    'cyclone.kicker': 'ଇନକଏସ-ଆଇଏମଡି ମିଳିତ ବୁଲେଟିନ୍',
    'cyclone.safe': 'କୌଣସି ସକ୍ରିୟ ବାତ୍ୟା ସତର୍କତା ନାହିଁ',
    'cyclone.checked': 'ଆଇଏମଡି କ୍ୟାପ୍ ଆଲର୍ଟ ଅନୁଯାୟୀ।',
    'cyclone.source': 'IMD ↗',
    'seismic.title': 'ସାମ୍ପ୍ରତିକ ଭୂକମ୍ପ ≥ 6.5M',
    'seismic.kicker': 'ସାମ୍ପ୍ରତିକ ଉପକୂଳ ଭୂକମ୍ପ',
    'seismic.safe': 'ଉପକୂଳରେ କୌଣସି ବଡ଼ ଭୂକମ୍ପ ହୋଇନାହିଁ (M≥5.0)।',
    'seismic.checking': 'ଭୂକମ୍ପ ତୀବ୍ରତା ଯାଞ୍ଚ ହେଉଛି >= 6.5M',
    'seismic.source': 'ଭୂକମ୍ପ ↗',
    'seismic.dialog_title': 'ଭୂକମ୍ପ ବୁଲେଟିନ୍ ବିବରଣୀ',
    'seismic.dialog_meta': 'ସରକାରୀ ITEWC ସୂଚନା',
    'seismic.itewc_evaluation': 'ITEWC ମୂଲ୍ୟାଙ୍କନ',
    'seismic.advice': 'ପରାମର୍ଶ / ନିର୍ଦ୍ଦେଶାବଳୀ',
    'seismic.updates': 'ସର୍ବଶେଷ ଅଦ୍ୟତନ',
    'seismic.unavailable': 'ଏହି ଘଟଣା ପାଇଁ କୌଣସି ସରକାରୀ ବୁଲେଟିନ୍ ଉପଲବ୍ଧ ନାହିଁ।',
    'seismic.open_bulletin': 'ସରକାରୀ ବୁଲେଟିନ୍ ଖୋଲନ୍ତୁ ↗',
    'seismic.fact_magnitude': 'ତୀବ୍ରତା (Magnitude)',
    'seismic.fact_depth': 'ଗଭୀରତା (Depth)',
    'seismic.fact_date': 'ତାରିଖ',
    'seismic.fact_origin_time': 'ଉତ୍ପତ୍ତି ସମୟ (Origin time)',
    'seismic.fact_latitude': 'ଅକ୍ଷାଂଶ (Latitude)',
    'seismic.fact_longitude': 'ଦ୍ରାଘିମା (Longitude)',
    'seismic.fact_location': 'ସ୍ଥାନ',
    'seismic.fact_bulletin': 'ବୁଲେଟିନ୍ (Bulletin)',
    'seismic.tectonic_setting': 'ଟେକ୍ଟୋନିକ୍ ସ୍ଥିତି',
    'seismic.setting_land': 'ସ୍ଥଳଭାଗ (LAND)',
    'seismic.setting_oceanic': 'ସାମୁଦ୍ରିକ (OCEANIC / MARINE)',
    'seismic.bathymetry': 'ଜଳ ଗଭୀରତା (Bathymetry)',
    'seismic.bathymetry_nil': 'କିଛି ନାହିଁ (NIL)',
    'seismic.bathymetry_loading': 'ଗଭୀରତା ଲୋଡ୍ ହେଉଛି…',
    'seismic.bathymetry_unavailable': 'ଗଭୀରତା ଉପଲବ୍ଧ ନାହିଁ',
    'seismic.coast_distance': 'ନିକଟତମ ଉପକୂଳରୁ ଦୂରତା',
    'seismic.no_advice': 'ଏହି ବୁଲେଟିନରେ କୌଣସି ପରାମର୍ଶ ପାଠ୍ୟ ଅନ୍ତର୍ଭୁକ୍ତ ନଥିଲା।',
    'storm.title': 'ବାତ୍ୟା ଜୁଆର ସତର୍କତା',
    'storm.safe': 'କୌଣସି ସକ୍ରିୟ ଜୁଆର ବୁଲେଟିନ୍ ନାହିଁ',
    'storm.checking': 'ଜୁଆର ସ୍ଥିତି ଯାଞ୍ଚ କରାଯାଉଛି.....',
    'storm.caption': 'ସରକାରୀ ITEWC ବୁଲେଟିନ୍ ଅନୁଯାୟୀ',
    'storm.bulletin': 'ବୁଲେଟିନ୍ ↗',
    'joint_bulletin.title': 'ମିଳିତ ବୁଲେଟିନ୍ ↗',
    'joint_bulletin.none': 'ବର୍ତ୍ତମାନ କୌଣସି ମିଳିତ ବୁଲେଟିନ୍ ଉପଲବ୍ଧ ନାହିଁ।',
    'pfz.title': 'ସମ୍ଭାବ୍ୟ ମତ୍ସ୍ୟ କ୍ଷେତ୍ର (PFZ)',
    'pfz.kicker': 'ଆଜିର ମାଛ ଧରିବା ଅଞ୍ଚଳ',
    'pfz.near_me': '📍 ମୋ ପାଖରେ',
    'pfz.source': 'PFZ ↗',
    'pfz.forecast_date': 'ପୂର୍ବାନୁମାନ',
    'pfz.valid_through': 'ବୈଧତା',
    'pfz.loading_sectors': 'ଅଞ୍ଚଳଗୁଡ଼ିକ ଲୋଡ୍ ହେଉଛି…',
    'pfz.locked_title': 'ଲକ୍ ହୋଇଥିବା ଲ୍ୟାଣ୍ଡିଂ କେନ୍ଦ୍ର',
    'pfz.home_harbor': 'ନିଜ ବନ୍ଦର',
    'pfz.open_compass': '🧭 କମ୍ପାସ୍ ଖୋଲନ୍ତୁ',
    'pfz.lock_flc': '🔒 FLC ଲକ୍ କରନ୍ତୁ',
    'pfz.locked_flc': '🔒 ଲକ୍ ହୋଇଛି',
    'pfz.unlock': '🔓 ଅନଲକ୍ କରନ୍ତୁ',
    'pfz.landing_center': 'ଲ୍ୟାଣ୍ଡିଂ କେନ୍ଦ୍ର',
    'pfz.direction': '🧭 ଦିଗ',
    'pfz.distance': '📏 ଦୂରତା',
    'pfz.depth': '🌊 ଗଭୀରତା',
    'pfz.coordinates': '📌 କୋର୍ଡିନେଟ୍ସ',
    'pfz.bearing': 'ବେୟାରିଂ',
    'pfz.landing_centers_title': 'ଲ୍ୟାଣ୍ଡିଂ କେନ୍ଦ୍ରସମୂହ',
    'pfz.target_line': 'ଲକ୍ଷ୍ୟ ରେଖା',
    'pfz.no_line_issued': 'ପାଇଁ ଆଜି କୌଣସି PFZ ରେଖା ଜାରି ହୋଇନାହିଁ -',
    'other.title': 'ଅନ୍ୟାନ୍ୟ ସାମୁଦ୍ରିକ ସେବା',
    'other.mhw': 'ସାମୁଦ୍ରିକ ଉତ୍ତାପ ତରଙ୍ଗ (MHW)',
    'other.tchp': 'ବାତ୍ୟା ତାପଶକ୍ତି (TCHP)',
    'other.cbas': 'ପ୍ରବାଳ ବ୍ଲିଚିଂ ସତର୍କତା (CBAS)',
    'other.tuna': 'ଟୁନା ମାଛ ↗',
    'other.hilsa': 'ଇଲିସି ମାଛ ↗',
    'other.hab': 'କ୍ଷତିକାରକ ଶୈବାଳ ↗',
    'other.oil_spill': 'ତୈଳ ନିଷ୍କାସନ ↗',
    'other.svas': 'ଛୋଟ ଡଙ୍ଗା ↗',
    'other.sarat': 'ସାରାଟ (SARAT) ↗',
    'other.ports': 'ବନ୍ଦର ପୂର୍ବାନୁମାନ ↗',
    'other.ship_route': 'ଜାହାଜ ମାର୍ଗ ↗',
    'other.location_specific': 'ନିର୍ଦ୍ଦିଷ୍ଟ ଅଞ୍ଚଳ ପୂର୍ବାନୁମାନ ↗',
    'mhw.title': 'ସାମୁଦ୍ରିକ ଉତ୍ତାପ ତରଙ୍ଗ',
    'mhw.subtitle': 'ସରକାରୀ INCOIS ଆଞ୍ଚଳିକ ନିରୀକ୍ଷଣ',
    'mhw.open_page': 'ପୃଷ୍ଠା ଖୋଲନ୍ତୁ ↗',
    'mhw.unavailable': 'ସୂଚନା ଉପଲବ୍ଧ ନାହିଁ।',
    'cbas.title': '🪸 ପ୍ରବାଳ ବ୍ଲିଚିଂ ସତର୍କତା ବ୍ୟବସ୍ଥା (CBAS)',
    'cbas.subtitle': 'INCOIS CBAS · ଉପଗ୍ରହ ତାପୀୟ ଚାପ ନିରୀକ୍ଷଣ',
    'cbas.guide_title': 'ℹ️ ଏହି ମାପଗୁଡ଼ିକର ଅର୍ଥ କ’ଣ?',
    'cbas.hotspot_def': 'ମାସିକ ହାରାହାରି ଠାରୁ ଅଧିକ ସମୁଦ୍ର ତାପମାତ୍ରା — ତତକ୍ଷଣାତ୍ ତାପୀୟ ଚାପ ଦର୍ଶାଏ।',
    'cbas.dhw_def': '୧୨ ସପ୍ତାହର ସଂଚିତ ତାପ ଚାପ (°C-ସପ୍ତାହ) — ପ୍ରବାଳ କ୍ଷୟର ବିପଦ ସୂଚାଏ।',
    'cbas.hotspot_lbl': 'ହଟସ୍ପଟ୍:',
    'cbas.dhw_lbl': 'DHW (୧୨ ସପ୍ତାହ):',
    'cbas.view_map': '🗺️ ଜାତୀୟ ତାପ ମାନଚିତ୍ର ↗',
    'cbas.official_portal': 'ସରକାରୀ CBAS ପୋର୍ଟାଲ ↗',
    'cbas.no_stress': 'ଚାପମୁକ୍ତ',
    'tchp.title': '🌪️ କ୍ରାନ୍ତୀୟ ବାତ୍ୟା ତାପ ସମ୍ଭାବନା (TCHP)',
    'tchp.subtitle': 'INCOIS-ROMS ୫-ଦିନିଆ ସାମୁଦ୍ରିକ ତାପଶକ୍ତି ପୂର୍ବାନୁମାନ',
    'tchp.tab_tchp': 'TCHP (kJ/cm²)',
    'tchp.tab_sst': 'SST (°C)',
    'tchp.tab_ssha': 'SSHA (m)',
    'tchp.play': '▶ ଆରମ୍ଭ କରନ୍ତୁ',
    'tchp.pause': '⏸ ଅଟକାନ୍ତୁ',
    'tchp.loading': 'ମାନଚିତ୍ର ଲୋଡ୍ ହେଉଛି…',
    'tchp.guide_title': 'ℹ️ ବାତ୍ୟା ତୀବ୍ରତା ନିର୍ଦ୍ଦେଶିକା:',
    'tchp.low_unfavorable': 'କମ୍ / ପ୍ରତିକୂଳ',
    'tchp.moderate_favorable': 'ମଧ୍ୟମ / ଅନୁକୂଳ',
    'tchp.rapid_intensification': '⚠️ ଅତି ଦ୍ରୁତ ତୀବ୍ର ବାତ୍ୟା ବିପଦ',
    'tchp.guide_desc': 'ସମୁଦ୍ର ତଳେ ୨୬°C ପର୍ଯ୍ୟନ୍ତ ସଞ୍ଚିତ ତାପଶକ୍ତିକୁ TCHP କୁହାଯାଏ। ଉଚ୍ଚ TCHP (>80 kJ/cm²) ବାତ୍ୟାକୁ ଭୟାନକ ଶକ୍ତି ଯୋଗାଏ।',
    'map.osf_title': 'ସମୁଦ୍ର ଅବସ୍ଥା ପୂର୍ବାନୁମାନ ମାନଚିତ୍ର',
    'map.osf_subtitle': 'ଉଚ୍ଚ ତରଙ୍ଗ · ସ୍ୱେଲ୍ ସର୍ଜ · ସମୁଦ୍ର ସ୍ରୋତ',
    'map.osf_note': 'ଇନକଏସର ରାଜ୍ୟସ୍ତରୀୟ ସତର୍କତା ମାନଚିତ୍ର।',
    'map.pfz_title': 'ସମ୍ଭାବ୍ୟ ମତ୍ସ୍ୟ କ୍ଷେତ୍ର ମାନଚିତ୍ର',
    'map.pfz_subtitle': 'ସରକାରୀ INCOIS PFZ ସ୍ତରଗୁଡ଼ିକ',
    'map.pfz_lines': 'PFZ ପୂର୍ବାନୁମାନ ରେଖା',
    'map.pfz_sectors': 'ଅଞ୍ଚଳସମୂହ (Sectors)',
    'map.pfz_eez': 'ବିଶେଷ ଅର୍ଥନୈତିକ କ୍ଷେତ୍ର (EEZ)',
    'map.pfz_centers': 'ଲ୍ୟାଣ୍ଡିଂ କେନ୍ଦ୍ର',
    'map.pfz_chlorophyll': 'କ୍ଲୋରୋଫିଲ୍-ଏ',
    'tide.status_title': '🌊 ଜୁଆର-ଭଟ୍ଟା ସ୍ଥିତି',
    'tide.type_label': 'ଜୁଆରର ପ୍ରକାର:',
    'share.title': 'ଓସେନ୍ ୱାଚ୍ ସେୟାର କରନ୍ତୁ',
    'share.subtitle': 'QR କୋଡ୍ ସ୍କାନ୍ କରନ୍ତୁ କିମ୍ବା ଲିଙ୍କ୍ ସେୟାର କରନ୍ତୁ',
    'share.copy': 'ଲିଙ୍କ୍ କପି କରନ୍ତୁ',
    'notify.title': 'ସତର୍କତା ବିଜ୍ଞପ୍ତି',
    'notify.subtitle': 'ତତକ୍ଷଣାତ୍ ଆଲର୍ଟ୍ସ',
    'notify.enable_title': 'ୱେବ୍ ଆଲର୍ଟ ସକ୍ଷମ କରନ୍ତୁ',
    'notify.enable_desc': 'ନୂଆ ସତର୍କତା ଆସିଲେ ନିଜ ଫୋନରେ ତତକ୍ଷଣାତ୍ ସୂଚନା ପାଆନ୍ତୁ।',
    'notify.enable_btn': 'ସକ୍ଷମ କରନ୍ତୁ',
    'notify.preferences': 'ଆଲର୍ଟ ପସନ୍ଦସମୂହ',
    'notify.opt_warnings': 'ଉଚ୍ଚ ତରଙ୍ଗ ସତର୍କତା (ଲାଲ୍)',
    'notify.opt_warnings_sub': 'ଗୁରୁତର ସାମୁଦ୍ରିକ ସତର୍କତା',
    'notify.opt_alerts': 'ଉଚ୍ଚ ତରଙ୍ଗ ଆଲର୍ଟ (କମଳା)',
    'notify.opt_alerts_sub': 'ମଧ୍ୟମ ସାମୁଦ୍ରିକ ଆଲର୍ଟ',
    'notify.opt_tsunami': 'ସୁନାମି ବୁଲେଟିନ୍',
    'notify.opt_tsunami_sub': 'ସରକାରୀ ITEWC ସୁନାମି ବୁଲେଟିନ୍',
    'notify.opt_cyclone': 'ବାତ୍ୟା ବୁଲେଟିନ୍',
    'notify.opt_cyclone_sub': 'IMD/INCOIS ବାତ୍ୟା ସତର୍କତା',
    'notify.opt_storm': 'ବାତ୍ୟା ଜୁଆର ବୁଲେଟିନ୍',
    'notify.opt_storm_sub': 'ଉପକୂଳ ପ୍ଲାବନ ବୁଲେଟିନ୍',
    'notify.send_test': 'ପରୀକ୍ଷାମୂଳକ ଆଲର୍ଟ ପଠାନ୍ତୁ',
    'voice.dialog_title': 'ଉପକୂଳ ଅଡିଓ ବୁଲେଟିନ୍',
    'voice.dialog_subtitle': 'ବହୁଭାଷୀ ଭଏସ୍ ସାରାଂଶ (INCOIS / ITEWC / IMD)',
    'voice.lang_label': 'ଭାଷା:',
    'voice.play_audio': '▶ ଅଡିଓ ଶୁଣନ୍ତୁ',
    'compass.title': '🧭 ଲାଇଭ୍ ନଟିକାଲ୍ କମ୍ପାସ୍',
    'compass.subtitle': 'ଆପଣଙ୍କ ସ୍ଥାନରୁ PFZ ବିନ୍ଦୁ',
    'compass.target_line': 'PFZ ଲକ୍ଷ୍ୟ ରେଖା',
    'compass.calc_course': '🎯 ଦିଗ ନିର୍ଣ୍ଣୟ ହେଉଛି…',
    'compass.heading': 'ଡଙ୍ଗାର ଦିଗ (Heading)',
    'compass.bearing': 'ଲକ୍ଷ୍ୟ କୋଣ (Bearing)',
    'compass.distance': 'ଦୂରତା (ଆପଣଙ୍କ ଠାରୁ PFZ)',
    'compass.rotate_sensor': 'ଦିଗ ବଦଳାନ୍ତୁ (ସିମ୍ୟୁଲେଟର):',
    'dialog.district_advisories': 'ଜିଲ୍ଲାସ୍ତରୀୟ ସତର୍କତା',
    'dialog.district_guidance': 'ଉପକୂଳ ଜିଲ୍ଲା ମାର୍ଗଦର୍ଶିକା',
    'dialog.no_district_details': 'ପରବର୍ତ୍ତୀ ଅଦ୍ୟତନରେ ଜିଲ୍ଲା ବିବରଣୀ ପ୍ରକାଶ ପାଇବ।',
    'dialog.open_official_map': 'ସମ୍ପୂର୍ଣ୍ଣ ମାନଚିତ୍ର ଦେଖନ୍ତୁ।',
    'dialog.coastal_area': 'ଉପକୂଳ ଅଞ୍ଚଳ',
    'dialog.close': 'ବନ୍ଦ କରନ୍ତୁ',
    'dialog.share': 'ସେୟାର କରନ୍ତୁ',
    'dialog.voice_summary': 'ଓସେନ୍ ୱାଚ୍ ଅଡିଓ ବୁଲେଟିନ୍',
    'dialog.voice_listen': 'ଶୁଣନ୍ତୁ',
    'dialog.voice_pause': 'ଅଟକାନ୍ତୁ',
    'footer.auto_update': 'ସ୍ୱୟଂଚାଳିତ ଅଦ୍ୟତନ:',
    'footer.auto_update_val': 'ପ୍ରତି ୧୫ ମିନିଟରେ',
    'footer.disclaimer_title': 'ଦାୟିତ୍ୱ ମୁକ୍ତି:',
    'footer.disclaimer': 'ତଥ୍ୟ ସରକାରୀ ଉତ୍ସରୁ ସଂଗୃହୀତ; ସଠିକତା ପାଇଁ ସର୍ବଦା ଅଫିସିଆଲ୍ ବୁଲେଟିନ୍ ଯାଞ୍ଚ କରନ୍ତୁ।',
    'footer.source': 'ତଥ୍ୟ ଉତ୍ସ: INCOIS–MoES ↗',
    'footer.visits': 'ଭିଜିଟ୍ସ',
    'contact.title': 'ସମୁଦ୍ର ସୂଚନା ପୋର୍ଟାଲ',
    'contact.subtitle': 'ବିଟା ପରୀକ୍ଷଣ ଅଧୀନରେ',
    'joint_bulletin.default_msg': 'ଇନକଏସ-ଆଇଏମଡି ମିଳିତ ବିଶେଷ ବୁଲେଟିନ୍',
    'joint_bulletin.active_prefix': 'ସକ୍ରିୟ ବୁଲେଟିନ୍',
    'joint_bulletin.issued_prefix': 'ବୁଲେଟିନ୍ ଜାରି',
        'tide.wind': 'ପବନ',
    'tide.wave': 'ତରଙ୍ଗ',
    'tide.swell': 'ସ୍ୱେଲ ତରଙ୍ଗ',
    'tide.current': 'ସ୍ରୋତ',
    'tide.normal': 'ସ୍ୱାଭାବିକ',
    'tide.wind_sea': 'ପବନ ଓ ସମୁଦ୍ର',
    'tide.tide_state': 'ଜୁଆର-ଭଟ୍ଟା ସ୍ଥିତି',
    'tide.moon_tide_type': 'ଚନ୍ଦ୍ର ଓ ଜୁଆର ପ୍ରକାର',
    'tide.rising': '▲ ଜୁଆର (Flood)',
    'tide.falling': '▼ ଭଟ୍ଟା (Ebb)',
    'tide.spring_tide': 'ମହା ଜୁଆର (Spring Tide)',
    'tide.neap_tide': 'ମାନ୍ଦା ଜୁଆର (Neap Tide)',
    'tide.high_tide': 'ପୂର୍ଣ୍ଣ ଜୁଆର (High Tide IST)',
    'tide.low_tide': 'ଭଟ୍ଟା (Low Tide IST)',
    'tide.no_warnings': '✓ କୌଣସି ଉପକୂଳ ଚେତାବନୀ ନାହିଁ:',
    'tide.active_for': 'ଚେତାବନୀ ଜାରି:',
    'tide.coast': 'ଉପକୂଳ',
    'tide.regional_advisory': 'ଆଞ୍ଚଳିକ ପରାମର୍ଶ:',
    'osf.advisory_note': 'ଜିଲ୍ଲା ଏବଂ ଉପକୂଳବର୍ତ୍ତୀ ଅଞ୍ଚଳର ପରିସ୍ଥିତି ଭିନ୍ନ ହୋଇଥିବାରୁ ଗୋଟିଏ ରାଜ୍ୟ ଏକାଧିକ ସ୍ତର ଅଧୀନରେ ଦେଖାଯାଇପାରେ।'
  },
  kn: {
    'brand.title': 'ಓಷನ್ ವಾಚ್',
    'header.title': 'ಕರಾವಳಿ ಎಚ್ಚರಿಕೆ ಸ್ಥಿತಿ',
    'header.subtitle': 'ಸುನಾಮಿ · ಚಂಡಮಾರುತ · ಅಲೆಗಳ ಅಬ್ಬರ · ಸಾಗರ ಸ್ಥಿತಿ ಮುನ್ಸೂಚನೆ · ಸಂಭಾವ್ಯ ಮೀನುಗಾರಿಕಾ ವಲಯ',
    'header.snapshot': 'ಅಧಿಕೃತ ಮಾಹಿತಿ ಸ್ನ್ಯಾಪ್‌ಶಾಟ್',
    'header.voice': 'ಧ್ವನಿ',
    'header.alerts': 'ಎಚ್ಚರಿಕೆಗಳು',
    'header.share': 'ಹಂಚಿಕೊಳ್ಳಿ',
    'header.install': 'ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',
    'announcement.title': 'ಸಕ್ರಿಯ',
    'announcement.latest': 'ಇತ್ತೀಚಿನ ಅಪ್ಡೇಟ್:',
    'announcement.checking': 'ಮಾಹಿತಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ…',
    'announcement.none': 'ಯಾವುದೂ ಇಲ್ಲ',
    'announcement.updated': 'ನವೀಕರಿಸಲಾಗಿದೆ',
    'announcement.bulletin': 'ಬುಲೆಟಿನ್',
    'osf.title': 'ಸಾಗರ ಸ್ಥಿತಿ ಮುನ್ಸೂಚನೆ',
    'osf.high_wave': 'ಎತ್ತರದ ಅಲೆಗಳು',
    'osf.high_wave_kicker': 'ಎತ್ತರದ ಅಲೆಗಳು, ಸ್ವೆಲ್ ಸರ್ಜ್ ಮತ್ತು ಸಾಗರ ಪ್ರವಾಹ ಎಚ್ಚರಿಕೆಗಳು',
    'osf.high_wave_card': 'ಅಲೆಯ ಎತ್ತರ',
    'osf.swell_surge': 'ಸ್ವೆಲ್ ಸರ್ಜ್ ಅಲೆಗಳು',
    'osf.swell_surge_card': 'ದೀರ್ಘಾವಧಿಯ ಅಲೆಗಳು',
    'osf.swell_surge_kicker': 'ಸ್ವೆಲ್ ಅಲೆಗಳ ತೀವ್ರತೆ ಮತ್ತು ಅವಧಿ ಎಚ್ಚರಿಕೆ',
    'osf.ocean_currents': 'ಸಾಗರ ಪ್ರವಾಹಗಳು',
    'osf.ocean_currents_card': 'ಪ್ರವಾಹ ವೇಗ',
    'osf.ocean_currents_kicker': 'ಮೇಲ್ಮೈ ಪ್ರವಾಹದ ವೇಗ ಮತ್ತು ದಿಕ್ಕು',
    'osf.storm_surge': 'ಬಿರುಗಾಳಿ ಅಲೆಗಳ ಅಬ್ಬರ',
    'osf.storm_surge_kicker': 'ಕರಾವಳಿ ಮುಳುಗಡೆ ಅಪಾಯ',
    'osf.map_button': 'ನಕ್ಷೆ ವೀಕ್ಷಿಸಿ',
    'osf.visualize': 'ನಕ್ಷೆಯಲ್ಲಿ ವೀಕ್ಷಿಸಿ',
    'osf.astronomical_tide': 'ಖಗೋಳ ಉಬ್ಬರವಿಳಿತ ಮುನ್ಸೂಚನೆ',
    'severity.warning': 'ಎಚ್ಚರಿಕೆ (Warning)',
    'severity.alert': 'ಜಾಗರೂಕತೆ (Alert)',
    'severity.watch': 'ವೀಕ್ಷಣೆ (Watch)',
    'severity.no_threat': 'ಯಾವುದೇ ಅಪಾಯವಿಲ್ಲ',
    'severity.issued': 'ಹೊರಡಿಸಲಾಗಿದೆ',
    'severity.districts': 'ಜಿಲ್ಲೆಗಳು',
    'severity.states': 'ರಾಜ್ಯಗಳು',
    'severity.no_active': 'ಕರಾವಳಿ ರಾಜ್ಯಗಳಲ್ಲಿ ಪ್ರಸ್ತುತ ಯಾವುದೇ ಎಚ್ಚರಿಕೆಗಳು ಜಾರಿಯಲ್ಲಿಲ್ಲ.',
    'severity.loading': 'ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ…',
    'tsunami.title': 'ಸುನಾಮಿ ಎಚ್ಚರಿಕೆ',
    'tsunami.kicker': 'ಭಾರತೀಯ ಸುನಾಮಿ ಮುನ್ನೆಚ್ಚರಿಕೆ ಕೇಂದ್ರ',
    'tsunami.safe': 'ಭಾರತದ ಕರಾವಳಿಗೆ ಯಾವುದೇ ಸುನಾಮಿ ಅಪಾಯವಿಲ್ಲ',
    'tsunami.checking': 'ಸುನಾಮಿ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ.....',
    'tsunami.last_checked': 'ಕೊನೆಯ ಪರಿಶೀಲನೆ',
    'tsunami.warning': 'ಸುನಾಮಿ ಎಚ್ಚರಿಕೆ ಜಾರಿಯಲ್ಲಿದೆ',
    'tsunami.alert': 'ಸುನಾಮಿ ಜಾಗರೂಕತೆ ಜಾರಿಯಲ್ಲಿದೆ',
    'tsunami.watch': 'ಸುನಾಮಿ ವಾಚ್ ಜಾರಿಯಲ್ಲಿದೆ',
    'tsunami.source': 'ITEWC ↗',
    'cyclone.title': 'ಚಂಡಮಾರುತ ಎಚ್ಚರಿಕೆ',
    'cyclone.kicker': 'ಇನ್ಕೋಯಿಸ್-ಐಎಂಡಿ ಜಂಟಿ ಬುಲೆಟಿನ್',
    'cyclone.safe': 'ಯಾವುದೇ ಸಕ್ರಿಯ ಚಂಡಮಾರುತ ಎಚ್ಚರಿಕೆ ಇಲ್ಲ',
    'cyclone.checked': 'ಐಎಂಡಿ ಕ್ಯಾಪ್ ಅಲರ್ಟ್ ಫೀಡ್ ಪ್ರಕಾರ.',
    'cyclone.source': 'IMD ↗',
    'seismic.title': 'ಇತ್ತೀಚಿನ ಭೂಕಂಪಗಳು ≥ 6.5M',
    'seismic.kicker': 'ಇತ್ತೀಚಿನ ಕರಾವಳಿ ಭೂಕಂಪಗಳು',
    'seismic.safe': 'ಕರಾವಳಿಯಲ್ಲಿ ಯಾವುದೇ ದೊಡ್ಡ ಭೂಕಂಪಗಳು ಸಂಭವಿಸಿಲ್ಲ (M≥5.0).',
    'seismic.checking': 'ಭೂಕಂಪದ ತೀವ್ರತೆ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ >= 6.5M',
    'seismic.source': 'ಭೂಕಂಪ ↗',
    'seismic.dialog_title': 'ಭೂಕಂಪ ಬುಲೆಟಿನ್ ವಿವರಗಳು',
    'seismic.dialog_meta': 'ಅಧಿಕೃತ ITEWC ಮಾಹಿತಿ',
    'seismic.itewc_evaluation': 'ITEWC ಮೌಲ್ಯಮಾಪನ',
    'seismic.advice': 'ಸಲಹೆ / ಮಾರ್ಗಸೂಚಿಗಳು',
    'seismic.updates': 'ಇತ್ತೀಚಿನ ಅಪ್ಡೇಟ್‌ಗಳು',
    'seismic.unavailable': 'ಈ ಘಟನೆಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಅಧಿಕೃತ ಬುಲೆಟಿನ್ ಲಭ್ಯವಿಲ್ಲ.',
    'seismic.open_bulletin': 'ಅಧಿಕೃತ ಬುಲೆಟಿನ್ ತೆರೆಯಿರಿ ↗',
    'seismic.fact_magnitude': 'ತೀವ್ರತೆ (Magnitude)',
    'seismic.fact_depth': 'ಆಳ (Depth)',
    'seismic.fact_date': 'ದಿನಾಂಕ',
    'seismic.fact_origin_time': 'ಉಗಮ ಸಮಯ (Origin time)',
    'seismic.fact_latitude': 'ಅಕ್ಷಾಂಶ (Latitude)',
    'seismic.fact_longitude': 'ರೇಖಾಂಶ (Longitude)',
    'seismic.fact_location': 'ಸ್ಥಳ',
    'seismic.fact_bulletin': 'ಬುಲೆಟಿನ್ (Bulletin)',
    'seismic.tectonic_setting': 'ಟೆಕ್ಟೋನಿಕ್ ಸಂಯೋಜನೆ',
    'seismic.setting_land': 'ಭೂಭಾಗ (LAND)',
    'seismic.setting_oceanic': 'ಸಾಗರ (OCEANIC / MARINE)',
    'seismic.bathymetry': 'ಸಾಗರದ ಆಳ (Bathymetry)',
    'seismic.bathymetry_nil': 'ಇಲ್ಲ (NIL)',
    'seismic.bathymetry_loading': 'ಆಳ ಲೋಡ್ ಆಗುತ್ತಿದೆ…',
    'seismic.bathymetry_unavailable': 'ಆಳ ಲಭ್ಯವಿಲ್ಲ',
    'seismic.coast_distance': 'ಹತ್ತಿರದ ಕರಾವಳಿಯಿಂದ ದೂರ',
    'seismic.no_advice': 'ಈ ಬುಲೆಟಿನ್‌ನಲ್ಲಿ ಯಾವುದೇ ಸಲಹಾ ಪಠ್ಯವನ್ನು ಸೇರಿಸಲಾಗಿಲ್ಲ.',
    'storm.title': 'ಬಿರುಗಾಳಿ ಅಲೆಗಳ ಎಚ್ಚರಿಕೆ',
    'storm.safe': 'ಯಾವುದೇ ಸಕ್ರಿಯ ಅಲೆಗಳ ಬುಲೆಟಿನ್ ಇಲ್ಲ',
    'storm.checking': 'ಅಲೆಗಳ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ.....',
    'storm.caption': 'ಅಧಿಕೃತ ITEWC ಬುಲೆಟಿನ್ ಪ್ರಕಾರ',
    'storm.bulletin': 'ಬುಲೆಟಿನ್ ↗',
    'joint_bulletin.title': 'ಜಂಟಿ ಬುಲೆಟಿನ್ ↗',
    'joint_bulletin.none': 'ಪ್ರಸ್ತುತ ಯಾವುದೇ ಜಂಟಿ ಬುಲೆಟಿನ್ ಲಭ್ಯವಿಲ್ಲ.',
    'pfz.title': 'ಸಂಭಾವ್ಯ ಮೀನುಗಾರಿಕಾ ವಲಯ (PFZ)',
    'pfz.kicker': 'ಇಂದಿನ ಮೀನುಗಾರಿಕಾ ವಲಯಗಳು',
    'pfz.near_me': '📍 ನನ್ನ ಹತ್ತಿರ',
    'pfz.source': 'PFZ ↗',
    'pfz.forecast_date': 'ಮುನ್ಸೂಚನೆ',
    'pfz.valid_through': 'ಮಾನ್ಯತೆಯ ಅವಧಿ',
    'pfz.loading_sectors': 'ವಲಯಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ…',
    'pfz.locked_title': 'ಲಾಕ್ ಮಾಡಲಾದ ಲ್ಯಾಂಡಿಂಗ್ ಕೇಂದ್ರ',
    'pfz.home_harbor': 'ಮನೆ ಬಂದರು',
    'pfz.open_compass': '🧭 ದಿಕ್ಸೂಚಿ ತೆರೆಯಿರಿ',
    'pfz.lock_flc': '🔒 FLC ಲಾಕ್ ಮಾಡಿ',
    'pfz.locked_flc': '🔒 ಲಾಕ್ ಮಾಡಲಾಗಿದೆ',
    'pfz.unlock': '🔓 ಅನ್‌ಲಾಕ್ ಮಾಡಿ',
    'pfz.landing_center': 'ಲ್ಯಾಂಡಿಂಗ್ ಕೇಂದ್ರ',
    'pfz.direction': '🧭 ದಿಕ್ಕು',
    'pfz.distance': '📏 ದೂರ',
    'pfz.depth': '🌊 ಆಳ',
    'pfz.coordinates': '📌 ನಿರ್ದೇಶಾಂಕಗಳು',
    'pfz.bearing': 'ಬೇರಿಂಗ್',
    'pfz.landing_centers_title': 'ಲ್ಯಾಂಡಿಂಗ್ ಕೇಂದ್ರಗಳು',
    'pfz.target_line': 'ಗುರಿ ರೇಖೆ',
    'pfz.no_line_issued': 'ಗೆ ಇಂದು ಯಾವುದೇ PFZ ರೇಖೆ ಲಭ್ಯವಿಲ್ಲ -',
    'other.title': 'ಇತರ ಸಾಗರ ಸೇವೆಗಳು',
    'other.mhw': 'ಸಾಗರ ಶಾಖದ ಅಲೆ (MHW)',
    'other.tchp': 'ಚಂಡಮಾರುತ ಉಷ್ಣ ಶಕ್ತಿ (TCHP)',
    'other.cbas': 'ಹವಳ ಬಿಳುಚುವಿಕೆ ಎಚ್ಚರಿಕೆ (CBAS)',
    'other.tuna': 'ಟ್ಯೂನಾ ಮೀನು ↗',
    'other.hilsa': 'ಹಿಲ್ಸಾ ಮೀನು ↗',
    'other.hab': 'ವಿಷಕಾರಿ ಪಾಚಿ ↗',
    'other.oil_spill': 'ತೈಲ ಸೋರಿಕೆ ↗',
    'other.svas': 'ಸಣ್ಣ ದೋಣಿಗಳು ↗',
    'other.sarat': 'ಸಾರಾಟ್ (SARAT) ↗',
    'other.ports': 'ಬಂದರು ಮುನ್ಸೂಚನೆ ↗',
    'other.ship_route': 'ಹಡಗು ಮಾರ್ಗ ↗',
    'other.location_specific': 'ಸ್ಥಳ ನಿರ್ದಿಷ್ಟ ಮುನ್ಸೂಚನೆ ↗',
    'mhw.title': 'ಸಾಗರ ಶಾಖದ ಅಲೆ',
    'mhw.subtitle': 'ಅಧಿಕೃತ INCOIS ಪ್ರಾದೇಶಿಕ ವೀಕ್ಷಣೆಗಳು',
    'mhw.open_page': 'ಪುಟ ತೆರೆಯಿರಿ ↗',
    'mhw.unavailable': 'ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ.',
    'cbas.title': '🪸 ಹವಳ ಬಿಳುಚುವಿಕೆ ಎಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ (CBAS)',
    'cbas.subtitle': 'INCOIS CBAS · ಉಪಗ್ರಹ ಉಷ್ಣ ಒತ್ತಡ ಮೇಲ್ವಿಚಾರಣೆ',
    'cbas.guide_title': 'ℹ️ ಈ ಮೆಟ್ರಿಕ್‌ಗಳ ಅರ್ಥವೇನು?',
    'cbas.hotspot_def': 'ಮಾಸಿಕ ಸರಾಸರಿಗಿಂತ ಹೆಚ್ಚಿನ ತಾಪಮಾನ — ತತ್‌ಕ್ಷಣದ ಉಷ್ಣ ಒತ್ತಡವನ್ನು ಸೂಚಿಸುತ್ತದೆ.',
    'cbas.dhw_def': '೧೨ ವಾರಗಳ ಸಂಚಿತ ಶಾಖದ ಒತ್ತಡ (°C-ವಾರಗಳು) — ಹವಳಗಳ ನಾಶದ ಅಪಾಯವನ್ನು ತೋರಿಸುತ್ತದೆ.',
    'cbas.hotspot_lbl': 'ಹಾಟ್‌ಸ್ಪಾಟ್:',
    'cbas.dhw_lbl': 'DHW (೧೨ ವಾರಗಳು):',
    'cbas.view_map': '🗺️ ರಾಷ್ಟ್ರೀಯ ಉಷ್ಣ ನಕ್ಷೆ ↗',
    'cbas.official_portal': 'ಅಧಿಕೃತ CBAS ಪೋರ್ಟಲ್ ↗',
    'cbas.no_stress': 'ಒತ್ತಡವಿಲ್ಲ',
    'tchp.title': '🌪️ ಉಷ್ಣವಲಯದ ಚಂಡಮಾರುತ ಶಾಖ ಸಾಮರ್ಥ್ಯ (TCHP)',
    'tchp.subtitle': 'INCOIS-ROMS ೫-ದಿನಗಳ ಸಾಗರ ಉಷ್ಣ ಶಕ್ತಿ ಮುನ್ಸೂಚನೆ',
    'tchp.tab_tchp': 'TCHP (kJ/cm²)',
    'tchp.tab_sst': 'SST (°C)',
    'tchp.tab_ssha': 'SSHA (m)',
    'tchp.play': '▶ ಪ್ಲೇ ಮಾಡಿ',
    'tchp.pause': '⏸ ವಿರಾಮಗೊಳಿಸಿ',
    'tchp.loading': 'ನಕ್ಷೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ…',
    'tchp.guide_title': 'ℹ️ ಚಂಡಮಾರುತ ತೀವ್ರತೆ ಶಕ್ತಿ ಮಾರ್ಗದರ್ಶಿ:',
    'tchp.low_unfavorable': 'ಕಡಿಮೆ / ಪ್ರತಿಕೂಲ',
    'tchp.moderate_favorable': 'ಮಧ್ಯಮ / ಅನುಕೂಲಕರ',
    'tchp.rapid_intensification': '⚠️ ಅತೀವ ತೀವ್ರತೆಯ ಅಪಾಯ',
    'tchp.guide_desc': 'ಸಾಗರದ ಮೇಲ್ಮೈ ಕೆಳಗೆ ೨೬°C ವರೆಗಿನ ಉಷ್ಣ ಶಕ್ತಿಯನ್ನು TCHP ಎನ್ನಲಾಗುತ್ತದೆ. ಅಧಿಕ TCHP (>80 kJ/cm²) ಚಂಡಮಾರುತಗಳಿಗೆ ಅಪಾರ ಬಲ ನೀಡುತ್ತದೆ.',
    'map.osf_title': 'ಸಾಗರ ಸ್ಥಿತಿ ಮುನ್ಸೂಚನೆ ನಕ್ಷೆ',
    'map.osf_subtitle': 'ಎತ್ತರದ ಅಲೆಗಳು · ಸ್ವೆಲ್ ಸರ್ಜ್ · ಸಾಗರ ಪ್ರವಾಹಗಳು',
    'map.osf_note': 'ಇನ್ಕೋಯಿಸ್‌ನ ರಾಜ್ಯ ಮಟ್ಟದ ಎಚ್ಚರಿಕೆ ನಕ್ಷೆ.',
    'map.pfz_title': 'ಸಂಭಾವ್ಯ ಮೀನುಗಾರಿಕಾ ವಲಯ ನಕ್ಷೆ',
    'map.pfz_subtitle': 'ಅಧಿಕೃತ INCOIS PFZ ಪದರಗಳು',
    'map.pfz_lines': 'PFZ ಮುನ್ಸೂಚನೆ ರೇಖೆಗಳು',
    'map.pfz_sectors': 'ವಲಯಗಳು (Sectors)',
    'map.pfz_eez': 'ವಿಶೇಷ ಆರ್ಥಿಕ ವಲಯ (EEZ)',
    'map.pfz_centers': 'ಲ್ಯಾಂಡಿಂಗ್ ಕೇಂದ್ರಗಳು',
    'map.pfz_chlorophyll': 'ಕ್ಲೋರೋಫಿಲ್-ಎ',
    'tide.status_title': '🌊 ಉಬ್ಬರವಿಳಿತ ಸ್ಥಿತಿ',
    'tide.type_label': 'ಉಬ್ಬರವಿಳಿತದ ಪ್ರಕಾರ:',
    'share.title': 'ಓಷನ್ ವಾಚ್ ಹಂಚಿಕೊಳ್ಳಿ',
    'share.subtitle': 'QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಅಥವಾ ಲಿಂಕ್ ಹಂಚಿಕೊಳ್ಳಿ',
    'share.copy': 'ಲಿಂಕ್ ನಕಲಿಸಿ',
    'notify.title': 'ಎಚ್ಚರಿಕೆ ಅಧಿಸೂಚನೆಗಳು',
    'notify.subtitle': 'ನೈಜ-ಸಮಯದ ಎಚ್ಚರಿಕೆಗಳು',
    'notify.enable_title': 'ವೆಬ್ ಅಲರ್ಟ್‌ಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ',
    'notify.enable_desc': 'ಹೊಸ ಎಚ್ಚರಿಕೆಗಳು ಬಂದಾಗ ಫೋನಿನಲ್ಲಿ ತಕ್ಷಣ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.',
    'notify.enable_btn': 'ಸಕ್ರಿಯಗೊಳಿಸಿ',
    'notify.preferences': 'ಅಲರ್ಟ್ ಆದ್ಯತೆಗಳು',
    'notify.opt_warnings': 'ಎತ್ತರದ ಅಲೆಗಳ ಎಚ್ಚರಿಕೆ (ಕೆಂಪು)',
    'notify.opt_warnings_sub': 'ಗಂಭೀರ ಸಾಗರ ಎಚ್ಚರಿಕೆಗಳು',
    'notify.opt_alerts': 'ಎತ್ತರದ ಅಲೆಗಳ ಅಲರ್ಟ್ (ಕಿತ್ತಳೆ)',
    'notify.opt_alerts_sub': 'ಮಧ್ಯಮ ಸಾಗರ ಅಲರ್ಟ್',
    'notify.opt_tsunami': 'ಸುನಾಮಿ ಬುಲೆಟಿನ್‌ಗಳು',
    'notify.opt_tsunami_sub': 'ಅಧಿಕೃತ ITEWC ಸುನಾಮಿ ಬುಲೆಟಿನ್‌ಗಳು',
    'notify.opt_cyclone': 'ಚಂಡಮಾರುತ ಬುಲೆಟಿನ್‌ಗಳು',
    'notify.opt_cyclone_sub': 'IMD/INCOIS ಚಂಡಮಾರುತ ಎಚ್ಚರಿಕೆಗಳು',
    'notify.opt_storm': 'ಅಲೆಗಳ ಅಬ್ಬರದ ಬುಲೆಟಿನ್‌ಗಳು',
    'notify.opt_storm_sub': 'ಕರಾವಳಿ ಪ್ರವಾಹ ಬುಲೆಟಿನ್‌ಗಳು',
    'notify.send_test': 'ಪರೀಕ್ಷಾರ್ಥ ಅಲರ್ಟ್ ಕಳುಹಿಸಿ',
    'voice.dialog_title': 'ಕರಾವಳಿ ಆಡಿಯೋ ಬುಲೆಟಿನ್',
    'voice.dialog_subtitle': 'ಬಹುಭಾಷಾ ಧ್ವನಿ ಸಾರಾಂಶ (INCOIS / ITEWC / IMD)',
    'voice.lang_label': 'ಭಾಷೆ:',
    'voice.play_audio': '▶ ಆಡಿಯೋ ಆಲಿಸಿ',
    'compass.title': '🧭 ಲೈವ್ ನಾಟಿಕಲ್ ದಿಕ್ಸೂಚಿ',
    'compass.subtitle': 'ನಿಮ್ಮ ಸ್ಥಳದಿಂದ PFZ ಬಿಂದುವಿಗೆ',
    'compass.target_line': 'PFZ ಗುರಿ ರೇಖೆ',
    'compass.calc_course': '🎯 ದಿಕ್ಕು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತಿದೆ…',
    'compass.heading': 'ದೋಣಿಯ ದಿಕ್ಕು (Heading)',
    'compass.bearing': 'ಗುರಿ ಕೋನ (Bearing)',
    'compass.distance': 'ದೂರ (ನಿಮ್ಮಿಂದ PFZ ವರೆಗೆ)',
    'compass.rotate_sensor': 'ದಿಕ್ಕು ಬದಲಿಸಿ (ಸಿಮ್ಯುಲೇಟರ್):',
    'dialog.district_advisories': 'ಜಿಲ್ಲಾ ಮಟ್ಟದ ಎಚ್ಚರಿಕೆಗಳು',
    'dialog.district_guidance': 'ಕರಾವಳಿ ಜಿಲ್ಲಾ ಮಾರ್ಗಸೂಚಿಗಳು',
    'dialog.no_district_details': 'ಮುಂದಿನ ಅಪ್ಡೇಟ್‌ನಲ್ಲಿ ಜಿಲ್ಲಾ ವಿವರಗಳು ಲಭ್ಯವಾಗುತ್ತವೆ.',
    'dialog.open_official_map': 'ಸಂಪೂರ್ಣ ನಕ್ಷೆ ತೆರೆಯಿರಿ.',
    'dialog.coastal_area': 'ಕರಾವಳಿ ಪ್ರದೇಶ',
    'dialog.close': 'ಮುಚ್ಚಿ',
    'dialog.share': 'ಹಂಚಿಕೊಳ್ಳಿ',
    'dialog.voice_summary': 'ಓಷನ್ ವಾಚ್ ಧ್ವನಿ ಸಾರಾಂಶ',
    'dialog.voice_listen': 'ಆಲಿಸಿ',
    'dialog.voice_pause': 'ವಿರಾಮಗೊಳಿಸಿ',
    'footer.auto_update': 'ಸ್ವಯಂಚಾಲಿತ ಅಪ್ಡೇಟ್:',
    'footer.auto_update_val': 'ಪ್ರತಿ ೧೫ ನಿಮಿಷಕ್ಕೊಮ್ಮೆ',
    'footer.disclaimer_title': 'ಹಕ್ಕು ನಿರಾಕರಣೆ:',
    'footer.disclaimer': 'ಮಾಹಿತಿಯನ್ನು ಅಧಿಕೃತ ಮೂಲಗಳಿಂದ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ; ನಿಖರತೆಗಾಗಿ ಅಧಿಕೃತ ಬುಲೆಟಿನ್ ಪರಿಶೀಲಿಸಿ.',
    'footer.source': 'ಮಾಹಿತಿ ಮೂಲ: INCOIS–MoES ↗',
    'footer.visits': 'ಭೇಟಿಗಳು',
    'contact.title': 'ಸಾಗರ ಮಾಹಿತಿ ಪೋರ್ಟಲ್',
    'contact.subtitle': 'ಬೀಟಾ ಪರೀಕ್ಷೆಯಲ್ಲಿದೆ',
    'joint_bulletin.default_msg': 'ಇನ್ಕೋಯಿಸ್-ಐಎಂಡಿ ಜಂಟಿ ವಿಶೇಷ ಬುಲೆಟಿನ್',
    'joint_bulletin.active_prefix': 'ಸಕ್ರಿಯ ಬುಲೆಟಿನ್',
    'joint_bulletin.issued_prefix': 'ಬುಲೆಟಿನ್ ಬಿಡುಗಡೆ',
        'tide.wind': 'ಗಾಳಿ',
    'tide.wave': 'ಅಲೆಗಳು',
    'tide.swell': 'ಸ್ವೆಲ್ ಅಲೆಗಳು',
    'tide.current': 'ಪ್ರವಾಹ',
    'tide.normal': 'ಸಾಮಾನ್ಯ',
    'tide.wind_sea': 'ಗಾಳಿ ಮತ್ತು ಸಮುದ್ರ',
    'tide.tide_state': 'ಉಬ್ಬರ-ವಿಳಿತ ಸ್ಥಿತಿ',
    'tide.moon_tide_type': 'ಚಂದ್ರ ಮತ್ತು ಉಬ್ಬರವಿಳಿತದ ವಿಧ',
    'tide.rising': '▲ ಉಬ್ಬರ (Flood)',
    'tide.falling': '▼ ಇಳಿತ (Ebb)',
    'tide.spring_tide': 'ದೊಡ್ಡ ಉಬ್ಬರ (Spring Tide)',
    'tide.neap_tide': 'ಸಣ್ಣ ಉಬ್ಬರ (Neap Tide)',
    'tide.high_tide': 'ಗರಿಷ್ಠ ಉಬ್ಬರ (High Tide IST)',
    'tide.low_tide': 'ಕನಿಷ್ಠ ಇಳಿತ (Low Tide IST)',
    'tide.no_warnings': '✓ ಯಾವುದೇ ಕರಾವಳಿ ಎಚ್ಚರಿಕೆ ಇಲ್ಲ:',
    'tide.active_for': 'ಎಚ್ಚರಿಕೆ ಜಾರಿಯಲ್ಲಿದೆ:',
    'tide.coast': 'ಕರಾವಳಿ',
    'tide.regional_advisory': 'ಪ್ರಾದೇಶಿಕ ಸಲಹೆ:',
    'osf.advisory_note': 'ಜಿಲ್ಲೆ ಮತ್ತು ಕರಾವಳಿ ಪ್ರದೇಶದ ಪರಿಸ್ಥಿತಿಗಳು ವಿಭಿನ್ನವಾಗಿರುವುದರಿಂದ ಒಂದು ರಾಜ್ಯವು ಬಹು ಎಚ್ಚರಿಕೆ ಹಂತಗಳಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳಬಹುದು.'
  }
};

const I18N_SECTORS = {
  'GUJARAT': { hi: 'गुजरात', ta: 'குஜராத்', te: 'గుజరాత్', ml: 'ഗുജറാത്ത്', bn: 'গুজরাট', mr: 'गुजरात', gu: 'ગુજરાત', or: 'ଗୁଜରାଟ', kn: 'ಗುಜರಾತ್' },
  'MAHARASHTRA': { hi: 'महाराष्ट्र', ta: 'மகாராஷ்டிரா', te: 'మహారాష్ట్ర', ml: 'മഹാരാഷ്ട്ര', bn: 'মহারাষ্ট্র', mr: 'महाराष्ट्र', gu: 'મહારાષ્ટ્ર', or: 'ମହାରାଷ୍ଟ୍ର', kn: 'ಮಹಾರಾಷ್ಟ್ರ' },
  'GOA': { hi: 'गोवा', ta: 'கோவா', te: 'గోవా', ml: 'ഗോവ', bn: 'গোয়া', mr: 'गोवा', gu: 'ગોવા', or: 'ଗୋଆ', kn: 'ಗೋವಾ' },
  'KARNATAKA': { hi: 'कर्नाटक', ta: 'கர்நாடகா', te: 'కర్ణాಟಕ', ml: 'കർണാടക', bn: 'কর্ণাটক', mr: 'कर्नाटक', gu: 'કર્ણાટક', or: 'କର୍ଣ୍ଣାଟକ', kn: 'ಕರ್ನಾಟಕ' },
  'KERALA': { hi: 'केरल', ta: 'கேரளா', te: 'కేరళ', ml: 'കേരളം', bn: 'কেরল', mr: 'केरळ', gu: 'કેરળ', or: 'କେରଳ', kn: 'ಕೇರಳ' },
  'TAMIL NADU': { hi: 'तमिलनाडु', ta: 'தமிழ்நாடு', te: 'తమిళనాడు', ml: 'തമിഴ്നാട്', bn: 'তামিলনাড়ু', mr: 'तमिळनाडू', gu: 'તમિલનાડુ', or: 'ତାମିଲନାଡୁ', kn: 'ತಮಿಳುನಾಡು' },
  'SOUTH TAMIL NADU': { hi: 'दक्षिण तमिलनाडु', ta: 'தெற்கு தமிழ்நாடு', te: 'దక్షిణ తమిళనాడు', ml: 'തെക്കൻ തമിഴ്നാട്', bn: 'দক্ষিণ তামিলনাড়ু', mr: 'दक्षिण तमिळनाडू', gu: 'દક્ષિણ તમિલનાડુ', or: 'ଦକ୍ଷିଣ ତାମିଲନାଡୁ', kn: 'ದಕ್ಷಿಣ ತಮಿಳುನಾಡು' },
  'NORTH TAMIL NADU': { hi: 'उत्तर तमिलनाडु', ta: 'வடக்கு தமிழ்நாடு', te: 'ఉత్తర తమిళనాడు', ml: 'വടക്കൻ തമിഴ്നാട്', bn: 'উত্তর তামিলনাড়ু', mr: 'उत्तर तमिळनाडू', gu: 'ઉત્તર તમિલનાડુ', or: 'ଉତ୍ତର ତାମିଲନାଡୁ', kn: 'ಉತ್ತರ ತಮಿಳುನಾಡು' },
  'ANDHRA PRADESH': { hi: 'आंध्र प्रदेश', ta: 'ஆந்திர பிரதேசம்', te: 'ఆంధ్రప్రదేశ్', ml: 'ആന്ധ്രാ പ്രദേശ്', bn: 'অন্ধ্রপ্রদেশ', mr: 'आंध्र प्रदेश', gu: 'આંધ્ર પ્રદેશ', or: 'ଆନ୍ଧ୍ର ପ୍ରଦେଶ', kn: 'ಆಂಧ್ರ ಪ್ರದೇಶ' },
  'SOUTH ANDHRA PRADESH': { hi: 'दक्षिण आंध्र प्रदेश', ta: 'தெற்கு ஆந்திரா', te: 'దక్షిణ ఆంధ్రప్రదేశ్', ml: 'തെക്കൻ ആന്ധ്രാ പ്രദേശ്', bn: 'দক্ষিণ অন্ধ్ర প্রদেশ', mr: 'दक्षिण आंध्र प्रदेश', gu: 'દક્ષિણ આંધ્ર પ્રદેશ', or: 'ଦକ୍ଷିଣ ଆନ୍ଧ୍ର ପ୍ରଦେଶ', kn: 'ದಕ್ಷಿಣ ಆಂಧ್ರ ಪ್ರದೇಶ' },
  'NORTH ANDHRA PRADESH': { hi: 'उत्तर आंध्र प्रदेश', ta: 'வடக்கு ஆந்திரா', te: 'ఉత్తర ఆంధ్రప్రదేశ్', ml: 'വടക്കൻ ആന്ധ്രാ പ്രദേശ്', bn: 'উত্তর অন্ধ୍ର প্রদেশ', mr: 'उत्तर आंध्र प्रदेश', gu: 'ઉત્તર આંધ્ર પ્રદેશ', or: 'ଉତ୍ତର ଆନ୍ଧ୍ର ପ୍ରଦେଶ', kn: 'ଉତ୍ତର ଆନ୍ଧ୍ର ପ୍ରଦେଶ' },
  'ODISHA': { hi: 'ओडिशा', ta: 'ஒடிசா', te: 'ఒడిశా', ml: 'ഒഡീഷ', bn: 'ଓଡ଼ିଶା', mr: 'ओडिशा', gu: 'ઓડિશા', or: 'ଓଡ଼ିଶା', kn: 'ಒಡಿಶಾ' },
  'WEST BENGAL': { hi: 'पश्चिम बंगाल', ta: 'மேற்கு வங்கம்', te: 'పశ్చిమ బెంగాల్', ml: 'പശ്ചിമ ബംഗാൾ', bn: 'পশ্চিমবঙ্গ', mr: 'पश्चिम बंगाल', gu: 'પશ્ચિમ બંગાળ', or: 'ପଶ୍ଚିମ ବଙ୍ଗ', kn: 'ಪಶ್ಚಿಮ ಬಂಗಾಳ' },
  'ANDAMAN AND NICOBAR': { hi: 'अंडमान और निकोबार', ta: 'அந்தமான் மற்றும் நிக்கோபார்', te: 'అండమాన్ మరియు నికోబార్', ml: 'ആൻഡമാൻ നിക്കോബാർ', bn: 'আন্দামান ও নিকোবর', mr: 'अंदमान आणि निकोबार', gu: 'અંદમાન અને નિકોબાર', or: 'ଆଣ୍ଡାମାନ ଓ ନିକୋବର', kn: 'ಅಂಡಮಾನ್ ಮತ್ತು ನಿಕೋಬಾರ್' },
  'ANDAMAN & NICOBAR': { hi: 'अंडमान और निकोबार', ta: 'அந்தமான் மற்றும் நிக்கோபார்', te: 'అండమాన్ మరియు నికోబార్', ml: 'ആൻഡമാൻ നിക്കോബാർ', bn: 'আন্দামান ও নিকোবর', mr: 'अंदमान आणि निकोबार', gu: 'અંદમાન અને નિકોબાર', or: 'ଆଣ୍ଡାମାନ ଓ ନିକୋବର', kn: 'ಅಂಡಮಾನ್ ಮತ್ತು ನಿಕೋಬಾರ್' },
  'ANDAMAN': { hi: 'अंडमान', ta: 'அந்தமான்', te: 'అండమాన్', ml: 'ആൻഡമാൻ', bn: 'আন্দামান', mr: 'अंदमान', gu: 'અંદમાન', or: 'ଆଣ୍ଡାମାନ', kn: 'ಅಂಡಮಾನ್' },
  'NICOBAR': { hi: 'निकोबार', ta: 'நிக்கோபார்', te: 'నికోబార్', ml: 'നിക്കോബാർ', bn: 'নিকোবর', mr: 'निकोबार', gu: 'નિકોબાર', or: 'ନିକୋବର', kn: 'ನಿಕೋಬಾರ್' },
  'LAKSHADWEEP': { hi: 'लक्षद्वीप', ta: 'லட்சத்தீவு', te: 'లక్షద్వీప్', ml: 'ലക്ഷദ്വീപ്', bn: 'লক্ষদ্বীপ', mr: 'लक्षद्वीप', gu: 'લક્ષદ્વીપ', or: 'ଲାକ୍ଷାଦ୍ୱୀପ', kn: 'ಲಕ್ಷದ್ವೀಪ' },
  'PUDUCHERRY': { hi: 'पुदुचेरी', ta: 'புதுச்சேரி', te: 'పుదుచ్చేరి', ml: 'പുതുച്ചേരി', bn: 'পুদুচেরি', mr: 'पुद्दुचेरी', gu: 'પુડુચેરી', or: 'ପୁଡୁଚେରୀ', kn: 'ಪುದುಚೇರಿ' },
  'DAMAN AND DIU': { hi: 'दमन और दीव', ta: 'டாமன் மற்றும் டையூ', te: 'డామన్ మరియు డయ్యూ', ml: 'ദാമൻ ദിയു', bn: 'দমন ও দিউ', mr: 'दमण आणि दीव', gu: 'દમણ અને દીવ', or: 'ଦମନ ଓ ଦିଉ', kn: 'ದಮನ್ ಮತ್ತು ದಿಯು' },
  'DAMAN & DIU': { hi: 'दमन और दीव', ta: 'டாமன் மற்றும் டையூ', te: 'డామన్ మరియు డయ్యూ', ml: 'ദാമൻ ദിയു', bn: 'দমন ও দিউ', mr: 'दमण आणि दीव', gu: 'દમણ અને દીવ', or: 'ଦମନ ଓ ଦିଉ', kn: 'ದಮನ್ ಮತ್ತು ದಿಯು' }
};

const I18N_DISTRICTS = {
  'MINICOY': { hi: 'मिनिकॉय', ta: 'மினிகாய்', te: 'మినికాయ్', ml: 'മിനിക്കോയ്', bn: 'মিনিকয়', mr: 'मिनिकॉय', gu: 'મિનિકોય', or: 'ମିନିକୟ', kn: 'ಮಿನಿಕಾಯ್' },
  'AGATTI': { hi: 'अगत्ती', ta: 'அகத்தி', te: 'అగత్తి', ml: 'അഗത്തി', bn: 'আগাতি', mr: 'अगात्ती', gu: 'અગત્તી', or: 'ଅଗାତ୍ତି', kn: 'ಅಗತ್ತಿ' },
  'ANDROTH': { hi: 'अंद्रोत', ta: 'ஆந்த்ரோத்', te: 'ఆంద్రోత్', ml: 'ആന്ത്രോത്ത്', bn: 'আন্দ্রোত', mr: 'अंद्रोत', gu: 'અંદ્રોથ', or: 'ଆନ୍ଦ୍ରୋଥ', kn: 'ಆಂದ್ರೋತ್' },
  'AMINI': { hi: 'अमीनी', ta: 'அமினி', te: 'అమిని', ml: 'അമിനി', bn: 'আমিনি', mr: 'अमिनी', gu: 'અમિની', or: 'ଅମିନି', kn: 'ಅಮಿನಿ' },
  'KAVARATTI': { hi: 'कवरत्ती', ta: 'கவரத்தி', te: 'కవరత్తి', ml: 'കവരത്തി', bn: 'কাভারাত্তি', mr: 'कवरत्ती', gu: 'કવરત્તી', or: 'କବାରତ୍ତୀ', kn: 'ಕವರತ್ತಿ' },
  'KANNIYAKUMARI': { hi: 'कन्याकुमारी', ta: 'கன்னியாகுமரி', te: 'కన్యాకుమారి', ml: 'കന്യാകുമാരി', bn: 'কন্যাSourceকুমারী', mr: 'कन्याकुमारी', gu: 'કન્યાકુમારી', or: 'କନ୍ୟାକୁମାରୀ', kn: 'ಕನ್ಯಾಕುಮಾರಿ' },
  'THOOTHUKKUDI': { hi: 'थूथुकुडी', ta: 'தூத்துக்குடி', te: 'తూత్తుకుడి', ml: 'തൂത്തുക്കുടി', bn: 'থুথুকুডি', mr: 'तुतीकोरीन/थूथुकुडी', gu: 'થૂથુકુડી', or: 'ଥୁଥୁକୁଡି', kn: 'ತೂತುಕುಡಿ' },
  'RAMANATHAPURAM': { hi: 'रामनाथपुरम', ta: 'ராமநாதபுரம்', te: 'రామనాథపురం', ml: 'രാമനാഥപുരം', bn: 'রামনাথপুরম', mr: 'रामनाथपुरम', gu: 'રામનાથપુરમ', or: 'ରାମନାଥପୁରମ', kn: 'ರಾಮನಾಥಪುರಂ' },
  'PUDUKKOTTAI': { hi: 'पुदुक्कोट्टई', ta: 'புதுக்கோட்டை', te: 'పుదుక్కోట్టై', ml: 'പുതുക്കോട്ട', bn: 'পুদুক্কোট্টাই', mr: 'पुदुक्कोट्टई', gu: 'પુદુક્કોટ્ટાઈ', or: 'ପୁଦୁକ୍କୋଟ୍ଟାଇ', kn: 'ಪುದುಕ್ಕೊಟ್ಟೈ' },
  'THANJAVUR': { hi: 'तंजாவूर', ta: 'தஞ்சாவூர்', te: 'తంజావూరు', ml: 'തഞ്ചാവൂർ', bn: 'তাঞ্জাভুর', mr: 'तंजावर', gu: 'તંજાવુર', or: 'ତାଞ୍ଜାଭୁର', kn: 'ತಂಜಾವೂರು' },
  'THIRUVARUR': { hi: 'तिरुவாரூர்', ta: 'திருவாரூர்', te: 'తిరువారూర్', ml: 'തിരുവാരൂർ', bn: 'তিরুভারুর', mr: 'तिरुवारूर', gu: 'તિરુવારુર', or: 'ତିରୁଭାରୁର', kn: 'ತಿರುವಾರೂರ್' },
  'NAGAPPATTINAM NORTH': { hi: 'नागपट्टिनम उत्तर', ta: 'நாகப்பட்டினம் வடக்கு', te: 'నాగపట్నం ఉత్తర', ml: 'നാഗപട്ടണം വടക്ക്', bn: 'নাগাপট্টিনম উত্তর', mr: 'नागपट्टिनम उत्तर', gu: 'નાગપટ્ટિનમ ઉત્તર', or: 'ନାଗପଟ୍ଟନମ ଉତ୍ତର', kn: 'ನಾಗಪಟ್ಟಿಣಂ ಉತ್ತರ' },
  'NAGAPPATTINAM SOUTH': { hi: 'नागपट्टिनम दक्षिण', ta: 'நாகப்பட்டினம் தெற்கு', te: 'నాగపట్నం దక్షిణ', ml: 'നാഗപട്ടണം തെക്ക്', bn: 'নাগাপট্টিনম দক্ষিণ', mr: 'नागपट्टिनम दक्षिण', gu: 'નાગપટ્ટિનમ દક્ષિણ', or: 'ନାଗପଟ୍ଟନମ ଦକ୍ଷିଣ', kn: 'ನಾಗಪಟ್ಟಿಣಂ ದಕ್ಷಿಣ' },
  'CUDDALORE': { hi: 'कड्डालोर', ta: 'கடலூர்', te: 'కడలూరు', ml: 'കടലൂർ', bn: 'কাড্ডালোর', mr: 'कुड्डालोर', gu: 'કડ્ડાલૂર', or: 'କଡ୍ଡାଲୋର', kn: 'ಕಡಲೂರು' },
  'VILUPPURAM': { hi: 'विलुप्पुरम', ta: 'விழுப்புரம்', te: 'విల్లుపురం', ml: 'വിഴുപ്പുറം', bn: 'ভিলুপুরম', mr: 'विलुप्पुरम', gu: 'વિલુપ્પુરમ', or: 'ଭିଲୁପୁରମ', kn: 'ವಿಳುಪ್ಪುರಂ' },
  'KANCHEEPURAM': { hi: 'कांचीपुरम', ta: 'காஞ்சிபுரம்', te: 'కాంచీపురం', ml: 'കാഞ്ചീപുരം', bn: 'কাঞ্চিপুরম', mr: 'कांजीवरम', gu: 'કાંચીપુરમ', or: 'କାଞ୍ଚିପୁରମ', kn: 'ಕಾಂಚಿಪುರಂ' },
  'CHENNAI': { hi: 'चेन्नई', ta: 'சென்னை', te: 'చెన్నై', ml: 'ചെന്നൈ', bn: 'চেন্নাই', mr: 'चेन्नई', gu: 'ચેન્નાઈ', or: 'ଚେନ୍ନାଇ', kn: 'ಚೆನ್ನೈ' },
  'THIRUVALLUR': { hi: 'तिरुवल्लूर', ta: 'திருவள்ளூர்', te: 'తిరువళ్లూరు', ml: 'തിരുവള്ളൂർ', bn: 'তিরুভাল্লুর', mr: 'तिरुवल्लूर', gu: 'તિરુવલ્લૂર', or: 'ତିରୁଭାଲ୍ଲୁର', kn: 'ತಿರುವಳ್ಳೂರು' },
  'TIRUNELVELI': { hi: 'तिरुनेलवेली', ta: 'திருநெல்வேலி', te: 'తిరునెల్వేలి', ml: 'തിരുനെൽവേലി', bn: 'তিরুনেলবেলি', mr: 'तिरुनेलवेली', gu: 'તિરુનેલવેલી', or: 'ତିରୁନେଲଭେଲି', kn: 'ತಿರುನೆಲ್ವೇಲಿ' },
  'KARAIKAL': { hi: 'कराईकल', ta: 'காரைக்கால்', te: 'కారైకాల్', ml: 'കാരയ്ക്കൽ', bn: 'কারাইকাল', mr: 'करैकल', gu: 'કરૈકલ', or: 'କରାଇକାଲ', kn: 'ಕಾರೈಕಲ್' },
  'MAHE': { hi: 'माहे', ta: 'மாஹே', te: 'మాహే', ml: 'മാഹി', bn: 'মাহে', mr: 'माहे', gu: 'માહે', or: 'ମାହେ', kn: 'ಮಾಹೆ' },
  'ALAPPUZHA': { hi: 'अलप्पुझा', ta: 'ஆலப்புழா', te: 'ఆలప్పుళా', ml: 'ആലപ്പുഴ', bn: 'আলাপ্পুঝা', mr: 'अलप्पुझा', gu: 'અલપ્પુઝા', or: 'ଆଲାପ୍ପୁଝା', kn: 'ಆಲಪ್ಪುಳ' },
  'THRISSUR': { hi: 'त्रिशूर', ta: 'திருச்சூர்', te: 'త్రిసూర్', ml: 'തൃശ്ശൂർ', bn: 'ত্রিশুর', mr: 'त्रिशूर', gu: 'ત્રિશૂર', or: 'ତ୍ରିଶୁର', kn: 'ತ್ರಿಶೂರ್' },
  'KASARAGOD, KANNUR': { hi: 'कासरगोड, कन्नूर', ta: 'காசர்கோடு, கண்ணூர்', te: 'కాసర్గోడ్, కన్నూర్', ml: 'കാസർഗോഡ്, കണ്ണൂർ', bn: 'কাসারগড়, কান্নুর', mr: 'कासारगोड, कन्नूर', gu: 'કાસરગોડ, કન્નૂર', or: 'କାସରଗୋଡ଼, କନ୍ନୁର', kn: 'ಕಾಸರಗೋಡು, ಕಣ್ಣೂರು' },
  'THIRUVANANTHAPURAM': { hi: 'तिरुवनंतपुरम', ta: 'திருவனந்தபுரம்', te: 'తిరువనంతపురం', ml: 'തിരുവനന്തപുരം', bn: 'তিরুবনন্তপুরম', mr: 'तिरुवनंतपुरम', gu: 'તિરુવનંતપુરમ', or: 'ତିରୁବନନ୍ତପୁରମ', kn: 'ತಿರುವನಂತಪುರಂ' },
  'KOLLAM': { hi: 'कोल्लम', ta: 'கொல்லம்', te: 'కొల్లాం', ml: 'കൊല്ലം', bn: 'কোল্লাম', mr: 'कोल्लम', gu: 'કોલ્લમ', or: 'କୋଲ୍ଲାମ', kn: 'ಕೊಲ್ಲಂ' },
  'MALAPPURAM': { hi: 'मलप्पुरम', ta: 'மலப்புரம்', te: 'మలప్పురం', ml: 'മലപ്പുറം', bn: 'মালাপ্পুরম', mr: 'मलप्पुरम', gu: 'મલપ્પુરમ', or: 'ମାଲାପ୍ପୁରମ', kn: 'ಮಲಪ್ಪುರಂ' },
  'ERNAKULAM': { hi: 'एर्नाकुलम', ta: 'எர்ணாகுளம்', te: 'ఎర్నాకులం', ml: 'എറണാകുളം', bn: 'এর্নাকুলাম', mr: 'एर्नाकुलम', gu: 'એર્નાકુલમ', or: 'ଏର୍ଣ୍ଣାକୁଲମ', kn: 'ಎರ್ನಾಕುಲಂ' },
  'KOZHIKODE': { hi: 'कोझिकोड', ta: 'கோழிக்கோடு', te: 'కోజికోడ్', ml: 'കോഴിക്കോട്', bn: 'কোজিকোড়', mr: 'कोळिकोड', gu: 'કોઝિકોડ', or: 'କୋଝିକୋଡ଼', kn: 'ಕೋಯಿಕೋಡ್' },
  'KANNUR': { hi: 'कन्नूर', ta: 'கண்ணூர்', te: 'కన్నూర్', ml: 'കണ്ണൂർ', bn: 'কান্নুর', mr: 'कन्नूर', gu: 'કન્નૂર', or: 'କନ୍ନୁର', kn: 'ಕಣ್ಣೂರು' },
  'DAKSHINA KANNADA': { hi: 'दक्षिण कन्नड़', ta: 'தெற்கு கன்னடா', te: 'దక్షిణ కన్నడ', ml: 'ദക്ഷിണ കന്നഡ', bn: 'দক্ষিণ কন্নড়', mr: 'दक्षिण कन्नड', gu: 'દક્ષિણ કન્નડ', or: 'ଦକ୍ଷିଣ କନ୍ନଡ଼', kn: 'ದಕ್ಷಿಣ ಕನ್ನಡ' },
  'UDUPI': { hi: 'उडुपी', ta: 'உடுப்பி', te: 'ఉడిపి', ml: 'ഉഡുപ്പി', bn: 'উডুপি', mr: 'उडुपी', gu: 'ઉડુપી', or: 'ଉଡ଼ୁପି', kn: 'ಉಡುಪಿ' },
  'UTTARA KANNADA': { hi: 'उत्तर कन्नड़', ta: 'வடக்கு கன்னடா', te: 'ఉత్తర కన్నడ', ml: 'ഉത്തര കന്നഡ', bn: 'উত্তর কন্নড়', mr: 'उत्तर कन्नड', gu: 'ઉત્તર કન્નડ', or: 'ଉତ୍ତର କନ୍ନଡ଼', kn: 'ಉತ್ತರ ಕನ್ನಡ' },
  'NORTH GOA': { hi: 'उत्तर गोवा', ta: 'வடக்கு கோவா', te: 'ఉత్తర గోవా', ml: 'വടക്കൻ ഗോവ', bn: 'উত্তর গোয়া', mr: 'उत्तर गोवा', gu: 'ઉત્તર ગોવા', or: 'ଉତ୍ତର ଗୋଆ', kn: 'ಉತ್ತರ ಗೋವಾ' },
  'SOUTH GOA': { hi: 'दक्षिण गोवा', ta: 'தெற்கு கோவா', te: 'దక్షిణ గోవా', ml: 'തെക്കൻ ഗോവ', bn: 'দক্ষিণ গোয়া', mr: 'दक्षिण गोवा', gu: 'દક્ષિણ ગોવા', or: 'ଦକ୍ଷିଣ ଗୋଆ', kn: 'ದಕ್ಷಿಣ ಗೋವಾ' },
  'RATNAGIRI': { hi: 'रत्नागिरि', ta: 'ரத்னகிரி', te: 'రత్నగిరి', ml: 'രത്നഗിരി', bn: 'রত্নগিরি', mr: 'रत्नागिरी', gu: 'રત્નાગિરિ', or: 'ରତ୍ନଗିରି', kn: 'ರತ್ನಗಿರಿ' },
  'PALGHAR': { hi: 'पालघर', ta: 'பால்கர்', te: 'పాల్ఘర్', ml: 'പാൽഘർ', bn: 'পালঘর', mr: 'पालघर', gu: 'પાલઘર', or: 'ପାଲଘର', kn: 'ಪಾಲ್ಘರ್' },
  'RAIGARH': { hi: 'रायगढ़', ta: 'ராய்கட்', te: 'రాయగఢ్', ml: 'റായ്ഗഡ്', bn: 'রায়গড়', mr: 'रायगड', gu: 'રાયગઢ', or: 'ରାୟଗଡ଼', kn: 'ರಾಯಗಡ' },
  'THANE, MUMBAI SUBURBAN, MUMBAI CITY': { hi: 'ठाणे, मुंबई उपनगर, मुंबई शहर', ta: 'தானே, மும்பை புறநகர், மும்பை நகரம்', te: 'థానే, ముంబై శివారు, ముంబై సిటీ', ml: 'താനെ, മുംബൈ നഗരം', bn: 'থানে, মুম্বাই শহরতলি, মুম্বাই সিটি', mr: 'ठाणे, मुंबई उपनगर, मुंबई शहर', gu: 'થાણે, મુંબઈ ઉપનગર, મુંબઈ શહેર', or: 'ଥାଣେ, ମୁମ୍ବାଇ ଉପକଣ୍ଠ, ମୁମ୍ବାଇ ସହର', kn: 'ಥಾಣೆ, ಮುಂಬೈ ಉಪನಗರ, ಮುಂಬೈ ನಗರ' },
  'SINDHUDURG': { hi: 'सिंधुदुर्ग', ta: 'சிந்துதுர்க்', te: 'సింధుదుర్గ్', ml: 'സിന്ധുദുർഗ്ഗ്', bn: 'সিন্ধুদুর্গ', mr: 'सिंधुदुर्ग', gu: 'સિંધુદુર્ગ', or: 'ସିନ୍ଧୁଦୁର୍ଗ', kn: 'ಸಿಂಧುದುರ್ಗ' },
  'GIR SOMNATH': { hi: 'गिर सोमनाथ', ta: 'கிர் சோம்நாத்', te: 'గిర్ సోమనాథ్', ml: 'ഗിർ സോമനാഥ്', bn: 'গির সোমনাথ', mr: 'गिर सोमनाथ', gu: 'ગીર સોમનાથ', or: 'ଗିର ସୋମନାଥ', kn: 'ಗಿರ್ ಸೋಮನಾಥ್' },
  'BHAVNAGAR': { hi: 'भावनगर', ta: 'பாவ்நகர்', te: 'భావ్‌నగర్', ml: 'ഭാവ്നഗർ', bn: 'ভাবনগর', mr: 'भावनगर', gu: 'ભાવનગર', or: 'ଭାବନଗର', kn: 'ಭಾವನಗರ' },
  'AMRELI': { hi: 'अमरेली', ta: 'அம்ரேலி', te: 'అమ్రేలి', ml: 'അമ്രേലി', bn: 'আমরেলি', mr: 'अमरेली', gu: 'અમરેલી', or: 'ଅମରେଲି', kn: 'ಅಮರೇಲಿ' },
  'VALSAD SOUTH': { hi: 'वलसाड दक्षिण', ta: 'வல்சாட் தெற்கு', te: 'వల్సాడ్ దక్షిణ', ml: 'വൽസാദ് തെക്ക്', bn: 'ভালসাদ দক্ষিণ', mr: 'वलसाड दक्षिण', gu: 'વલસાડ દક્ષિણ', or: 'ଭାଲସାଡ ଦକ୍ଷିଣ', kn: 'ವಲ್ಸಾದ್ ದಕ್ಷಿಣ' },
  'VALSAD NORTH': { hi: 'वलसाड उत्तर', ta: 'வல்சாட் வடக்கு', te: 'వల్సాడ్ ఉత్తర', ml: 'വൽസാദ് വടക്ക്', bn: 'ভালসাদ উত্তর', mr: 'वलसाड उत्तर', gu: 'વલસાડ ઉત્તર', or: 'ଭାଲସାଡ ଉତ୍ତର', kn: 'ವಲ್ಸಾದ್ ಉತ್ತರ' },
  'NAVSARI': { hi: 'नवसारी', ta: 'நவ்சாரி', te: 'నవసారి', ml: 'നവസാരി', bn: 'নবসারী', mr: 'नवसारी', gu: 'નવસારી', or: 'ନବସାରୀ', kn: 'ನವಸಾರಿ' },
  'PORBANDAR': { hi: 'पोरबंदर', ta: 'போர்பந்தர்', te: 'పోర్‌బందర్', ml: 'പോർബന്ദർ', bn: 'পোরবন্দর', mr: 'पोरबंदर', gu: 'પોરબંદર', or: 'ପୋରବନ୍ଦର', kn: 'ಪೋರ್‌ಬಂದರ್' },
  'DEVBHUMI DWARAKA': { hi: 'देवभूमि द्वारका', ta: 'தேவபூமி துவாரகா', te: 'దేవభూమి ద్వారక', ml: 'ദേവഭൂമി ദ്വാരക', bn: 'দেবভূমি দ্বারকা', mr: 'देवभूमी द्वारका', gu: 'દેવભૂમિ દ્વારકા', or: 'ଦେବଭୂମି ଦ୍ୱାରକା', kn: 'ದೇವಭೂಮಿ ದ್ವಾರಕಾ' },
  'KACHCHH': { hi: 'कच्छ', ta: 'கட்ச்', te: 'కచ్ఛ్', ml: 'കച്ച്', bn: 'কচ্ছ', mr: 'कच्छ', gu: 'કચ્છ', or: 'କଚ୍ଛ', kn: 'ಕಛ್' },
  'JAMNAGAR': { hi: 'जामनगर', ta: 'ஜாம்நகர்', te: 'జామ్‌నగర్', ml: 'ജാംനഗർ', bn: 'জামনগর', mr: 'जामनगर', gu: 'જામનગર', or: 'ଜାମନଗର', kn: 'ಜಾಮ್‌ನಗರ' },
  'SURAT': { hi: 'सूरत', ta: 'சூரத்', te: 'సూరత్', ml: 'സൂറത്ത്', bn: 'সুরাট', mr: 'सुरत', gu: 'સુરત', or: 'ସୁରଟ', kn: 'ಸೂರತ್' },
  'BHARUCH': { hi: 'भरूच', ta: 'பரூச்', te: 'భరూచ్', ml: 'ഭറൂച്ച്', bn: 'ভরুচ', mr: 'भरूच', gu: 'ભરૂચ', or: 'ଭରୁଚ', kn: 'ಭರೂಚ್' },
  'ANAND': { hi: 'आणंद', ta: 'ஆனந்த்', te: 'ఆనంద్', ml: 'ആനന്ദ്', bn: 'আনন্দ', mr: 'आणंद', gu: 'આણંદ', or: 'ଆନନ୍ଦ', kn: 'ಆನಂದ್' },
  'JUNAGADH NORTH': { hi: 'जूनागढ़ उत्तर', ta: 'ஜூனாகத் வடக்கு', te: 'జూనాగఢ్ ఉత్తర', ml: 'ജുനാഗഡ് വടക്ക്', bn: 'জুনাগড় উত্তর', mr: 'जुनागढ उत्तर', gu: 'જૂનાગઢ ઉત્તર', or: 'ଜୁନାଗଡ଼ ଉତ୍ତର', kn: 'ಜೂನಾಗಢ ಉತ್ತರ' },
  'JUNAGADH SOUTH': { hi: 'जूनागढ़ दक्षिण', ta: 'ஜூனாகத் தெற்கு', te: 'జూనాగఢ్ దక్షిణ', ml: 'ജുനാഗഡ് തെക്ക്', bn: 'জুনাগড় দক্ষিণ', mr: 'जुनागढ दक्षिण', gu: 'જૂનાગઢ દક્ષિણ', or: 'ଜୁନାଗଡ଼ ଦକ୍ଷିଣ', kn: 'ಜೂನಾಗಢ ದಕ್ಷಿಣ' },
  'DAMAN': { hi: 'दमन', ta: 'டாமன்', te: 'డామన్', ml: 'ദാമൻ', bn: 'দমন', mr: 'दमण', gu: 'દમણ', or: 'ଦମନ', kn: 'ದಮನ್' },
  'DIU': { hi: 'दीव', ta: 'டையூ', te: 'డయ్యూ', ml: 'ദിയു', bn: 'দিউ', mr: 'दीव', gu: 'દીવ', or: 'ଦିଉ', kn: 'ದಿಯು' },
  'GANJAM': { hi: 'गंजम', ta: 'கஞ்சம்', te: 'గంజాం', ml: 'ഗഞ്ചം', bn: 'গঞ্জাম', mr: 'गंजम', gu: 'ગંજમ', or: 'ଗଞ୍ଜାମ', kn: 'ಗಂಜಾಂ' },
  'PURI': { hi: 'पुरी', ta: 'பூரி', te: 'పూరీ', ml: 'പുരി', bn: 'পুরী', mr: 'पुरी', gu: 'પુરી', or: 'ପୁରୀ', kn: 'ಪುರಿ' },
  'JAGATSINGHAPUR': { hi: 'जगतसिंहपुर', ta: 'ஜெகத்சிங்பூர்', te: 'జగత్‌సింగ్‌పూర్', ml: 'ജഗത്സിംഗ്പൂർ', bn: 'জগৎসিংহপুর', mr: 'जगतसिंगपूर', gu: 'જગતસિંહપુર', or: 'ଜଗତସିଂହପୁର', kn: 'ಜಗತ್‌ಸಿಂಗ್‌ಪುರ' },
  'KENDRAPARA': { hi: 'केंद्रपड़ा', ta: 'கேந்திரபாரா', te: 'కేంద్రపారా', ml: 'കേന്ദ്രപാറ', bn: 'কেন্দ্রাপাড়া', mr: 'केंद्रापडा', gu: 'કેન્દ્રપાડા', or: 'କେନ୍ଦ୍ରାପଡ଼ା', kn: 'ಕೇಂದ್ರಾಪಾರಾ' },
  'BHADRAK': { hi: 'भद्रक', ta: 'பத்ரக்', te: 'భద్రక్', ml: 'ഭദ്രക്', bn: 'ভদ্রক', mr: 'भद्रक', gu: 'ભદ્રક', or: 'ଭଦ୍ରକ', kn: 'ಭದ್ರಕ್' },
  'BALESHWAR': { hi: 'बालेश्वर', ta: 'பாலேஸ்வர்', te: 'బాలేశ్వర్', ml: 'ബാലേശ്വർ', bn: 'বালেশ্বর', mr: 'बालेश्वर', gu: 'બાલેશ્વર', or: 'ବାଲେଶ୍ୱର', kn: 'ಬಾಲೇಶ್ವರ' },
  'PURBA MEDINIPUR': { hi: 'पूर्व मेदिनीपुर', ta: 'கிழக்கு மிட்னாபூர்', te: 'తూర్పు మేదినీపూర్', ml: 'കിഴക്കൻ മേദിനിപൂർ', bn: 'পূর্ব মেদিনীপুর', mr: 'पूर्व मेदिनीपूर', gu: 'પૂર્વ મેદિનીપુર', or: 'ପୂର୍ବ ମେଦିନୀପୁର', kn: 'ಪೂರ್ವ ಮೇದಿನೀಪುರ' },
  'SOUTH 24 PARGANAS': { hi: 'दक्षिण 24 परगना', ta: 'தெற்கு 24 பர்கானாஸ்', te: 'దక్షిణ 24 పరగణాలు', ml: 'തെക്കൻ 24 പർഗാനാസ്', bn: 'দক্ষিণ ২৪ পরগনা', mr: 'दक्षिण २४ परगणा', gu: 'દક્ષિણ ૨૪ પરગણા', or: 'ଦକ୍ଷିଣ ୨୪ ପରଗଣା', kn: 'ದಕ್ಷಿಣ ೨೪ ಪರಗಣ' },
  'NORTH 24 PARGANAS': { hi: 'उत्तर 24 परगना', ta: 'வடக்கு 24 பர்கானாஸ்', te: 'ఉత్తర 24 పరగణాలు', ml: 'വടക്കൻ 24 പർഗാനാസ്', bn: 'উত্তর ২৪ পরগনা', mr: 'उत्तर २४ परगणा', gu: 'ઉત્તર ૨૪ પરગણા', or: 'ଉତ୍ତର ୨୪ ପରଗଣା', kn: 'ಉತ್ತರ ೨೪ ಪರಗಣ' },
  'NELLORE': { hi: 'नेल्लोर', ta: 'நெல்லூர்', te: 'నెల్లూరు', ml: 'നെല്ലൂർ', bn: 'নেল্লোর', mr: 'नेल्लोर', gu: 'નેલ્લોર', or: 'ନେଲ୍ଲୋର', kn: 'ನೆಲ್ಲೂರು' },
  'PRAKASAM': { hi: 'प्रकाशम', ta: 'பிரகாசம்', te: 'ప్రకాశం', ml: 'പ്രകാശം', bn: 'প্রকাশম', mr: 'प्रकाशम', gu: 'પ્રકાશમ', or: 'ପ୍ରକାଶମ', kn: 'ಪ್ರಕಾಶಂ' },
  'GUNTUR': { hi: 'गुंटूर', ta: 'குண்டூர்', te: 'గుంటూరు', ml: 'ഗുണ്ടൂർ', bn: 'গুন্টুর', mr: 'गुंटूर', gu: 'ગુંટૂર', or: 'ଗୁଣ୍ଟୁର', kn: 'ಗುಂಟೂರು' },
  'KRISHNA': { hi: 'कृष्णा', ta: 'கிருஷ்ணா', te: 'కృష్ణా', ml: 'കൃഷ്ണ', bn: 'কৃষ্ণা', mr: 'कृष्णा', gu: 'કૃષ્ણા', or: 'କୃଷ୍ଣା', kn: 'ಕೃಷ್ಣಾ' },
  'WEST GODAVARI': { hi: 'पश्चिम गोदावरी', ta: 'மேற்கு கோதாவரி', te: 'పశ్చిమ గోదావరి', ml: 'പശ്ചിമ ഗോദാവരി', bn: 'পশ্চিম গোদাবরী', mr: 'पश्चिम गोदावरी', gu: 'પશ્ચિમ ગોદાવરી', or: 'ପଶ୍ଚିମ ଗୋଦାବରୀ', kn: 'ಪಶ್ಚಿಮ ಗೋದಾವರಿ' },
  'EAST GODAVARI': { hi: 'पूर्व गोदावरी', ta: 'கிழக்கு கோதாவரி', te: 'తూర్పు గోదావరి', ml: 'കിഴക്കൻ ഗോദാവരി', bn: 'পূর্ব গোদাবরী', mr: 'पूर्व गोदावरी', gu: 'પૂર્વ ગોદાવરી', or: 'ପୂର୍ବ ଗୋଦାବରୀ', kn: 'ಪೂರ್ವ ಗೋದಾವರಿ' },
  'VISAKHAPATNAM': { hi: 'विशाखापत्तनम', ta: 'விசாகப்பட்டினம்', te: 'విశాఖపట్నం', ml: 'വിശാഖപട്ടണം', bn: 'বিশাখাপত্তনম', mr: 'विशाखापट्टणम', gu: 'વિશાખાપટ્ટનમ', or: 'ବିଶାଖାପାଟଣା', kn: 'ವಿಶಾಖಪಟ್ಟಣಂ' },
  'VIZIANAGARAM': { hi: 'विजयनगरम', ta: 'விஜயநகரம்', te: 'విజయనగరం', ml: 'വിജയനഗരം', bn: 'বিজয়নগরম', mr: 'विजयनगरम', gu: 'વિજયનગરમ', or: 'ବିଜୟନଗରମ', kn: 'ವಿಜಯನಗರಂ' },
  'SRIKAKULAM': { hi: 'श्रीकाकुलम', ta: 'ஸ்ரீகாகுளம்', te: 'శ్రీకాకుళం', ml: 'ശ്രീകാകുളം', bn: 'শ্রীকাকুলাম', mr: 'श्रीकाकुलम', gu: 'શ્રીકાકુલમ', or: 'ଶ୍ରୀକାକୁଲମ', kn: 'ಶ್ರೀಕಾಕುಳಂ' },
  'PORT BLAIR': { hi: 'पोर्ट ब्लेयर', ta: 'போர்ட் பிளேர்', te: 'పోర్ట్ బ్లెయిర్', ml: 'പോർട്ട് ബ്ലെയർ', bn: 'পোর্ট ব্লেয়ার', mr: 'पोर्ट ब्लेअर', gu: 'પોર્ટ બ્લેયર', or: 'ପୋର୍ଟ ବ୍ଲେୟାର', kn: 'ಪೋರ್ಟ್ ಬ್ಲೇರ್' },
  'DIGLIPUR': { hi: 'दिगलीपुर', ta: 'திக்லிபூர்', te: 'దిగ్లిపూర్', ml: 'ദിഗ്ലിപൂർ', bn: 'ডিগলিপুর', mr: 'दिगलीपूर', gu: 'દિગલીપુર', or: 'ଦିଗଲିପୁର', kn: 'ದಿಗ್ಲಿಪುರ' },
  'HAVELOCK': { hi: 'हैवलॉक', ta: 'ஹேவ்லாக்', te: 'హావ్‌లాక్', ml: 'ഹാവ്‌ലോക്ക്', bn: 'হ্যাভলক', mr: 'हॅवलॉक', gu: 'હેવલોક', or: 'ହେଭଲକ', kn: 'ಹ್ಯಾವ್‌ಲಾಕ್' },
  'LITTLE ANDAMAN': { hi: 'लिटिल अंडमान', ta: 'லிட்டில் அந்தமான்', te: 'లిటిల్ అండమాన్', ml: 'ലിറ്റിൽ ആൻഡമാൻ', bn: 'লিটল আন্দামান', mr: 'लिटल अंदमान', gu: 'લિટલ અંદમાન', or: 'ଲିଟିଲ ଆଣ୍ଡାମାନ', kn: 'ಲಿಟಲ್ ಅಂಡಮಾನ್' },
  'CAR NICOBAR': { hi: 'कार निकोबार', ta: 'கார் நிக்கோபார்', te: 'కార్ నికోబార్', ml: 'കാർ നിക്കോബാർ', bn: 'কার নিকোবর', mr: 'कार निकोबार', gu: 'કાર નિકોબાર', or: 'କାର ନିକୋବର', kn: 'ಕಾರ್ ನಿಕೋಬಾರ್' },
  'INDIRA POINT': { hi: 'इंदिरा पॉइंट', ta: 'இந்திரா முனை', te: 'ఇందిరా పాయింట్', ml: 'ഇന്ദിര പോയിന്റ്', bn: 'ইন্দিরা পয়েন্ট', mr: 'इंदिरा पॉइंट', gu: 'ઇન્દિરા પોઇન્ટ', or: 'ଇନ୍ଦିରା ପଏଣ୍ଟ', kn: 'ಇಂದಿರಾ ಪಾಯಿಂಟ್' },
  'BARREN ISLAND': { hi: 'बैरन द्वीप', ta: 'பாரன் தீவு', te: 'బారెన్ ద్వీపం', ml: 'ബാരൻ ദ്വീപ്', bn: 'ব্যারেন দ্বীপ', mr: 'बॅरन बेट', gu: 'બેરન ટાપુ', or: 'ବାରେନ ଦ୍ୱୀପ', kn: 'ಬ್ಯಾರನ್ ದ್ವೀಪ' },
  'NARCONDAM ISLAND': { hi: 'नारकोंडम द्वीप', ta: 'நார்கொண்டம் தீவு', te: 'నార్కొండం ద్వీపం', ml: 'നാർക്കോണ്ടം ദ്വീപ്', bn: 'নারকোন্ডাম দ্বীপ', mr: 'नारकोंडम बेट', gu: 'નારકોન્ડમ ટાપુ', or: 'ନାରକୋଣ୍ଡାମ ଦ୍ୱୀପ', kn: 'ನಾರ್ಕೊಂಡಮ್ ದ್ವೀಪ' },
  'NORTH SENTINEL ISLAND': { hi: 'उत्तरी सेंटिनल द्वीप', ta: 'வடக்கு சென்டினல் தீவு', te: 'ఉత్తర సెంటినెల్ ద్వీపం', ml: 'നോർത്ത് സെന്റിനൽ ദ്വീപ്', bn: 'উত্তর সেন্টিনেল দ্বীপ', mr: 'उत्तर सेंटिनेल बेट', gu: 'ઉત્તર સેન્ટિનેલ ટાપુ', or: 'ଉତ୍ତର ସେଣ୍ଟିନେଲ ଦ୍ୱୀପ', kn: 'ಉತ್ತರ ಸೆಂಟಿನೆಲ್ ದ್ವೀಪ' },
  'FLAT ISLAND': { hi: 'फ्लैट द्वीप', ta: 'பிளாட் தீவு', te: 'ఫ్లాట్ ద్వీపం', ml: 'ഫ്ലാറ്റ് ദ്വീപ്', bn: 'ফ্ল্যাট দ্বীপ', mr: 'फ्लॅट बेट', gu: 'ફ્લેટ ટાપુ', or: 'ଫ୍ଲାଟ ଦ୍ୱୀପ', kn: 'ಫ್ಲಾಟ್ ದ್ವೀಪ' },
  'RANGATH BAY': { hi: 'रंगत खाड़ी', ta: 'ரங்கத் பே', te: 'రంగత్ బే', ml: 'രംഗത്ത് ബേ', bn: 'রঙ্গত বে', mr: 'रंगत बे', gu: 'રંગત અખાત', or: 'ରଙ୍ଗତ ବେ', kn: 'ರಂಗತ್ ಕೊಲ್ಲಿ' },
  'WEST & LANDFALL ISLAND': { hi: 'वेस्ट और लैंडफॉल द्वीप', ta: 'மேற்கு & லேண்ட்பால் தீவு', te: 'పశ్చిమ & ల్యాండ్‌ఫాల్ ద్వీపం', ml: 'വെസ്റ്റ് & ലാൻഡ്‌ഫാൾ ദ്വീപ്', bn: 'পশ্চিম ও ল্যান্ডফল দ্বীপ', mr: 'पश्चिम आणि लँडफॉल बेट', gu: 'વેસ્ટ અને લેન્ડફોલ ટાપુ', or: 'ପଶ୍ଚିମ ଓ ଲ୍ୟାଣ୍ଡଫଲ ଦ୍ୱୀପ', kn: 'ಪಶ್ಚಿಮ ಮತ್ತು ಲ್ಯಾಂಡ್‌ಫಾಲ್ ದ್ವೀಪ' },
  'KOMATRA & KATCHAL ISLAND': { hi: 'कोमात्रा और कत्छल द्वीप', ta: 'கொமத்ரா & கட்ச்சல் தீவு', te: 'కోమత్ర & కట్చల్ ద్వీపం', ml: 'കോമാത്ര & കച്ചൽ ദ്വീപ്', bn: 'কোমাত্রা ও কাচাল দ্বীপ', mr: 'कोमात्रा आणि कच्चल बेट', gu: 'કોમાત્રા અને કચલ ટાપુ', or: 'କୋମାତ୍ରା ଓ କଚଲ ଦ୍ୱୀପ', kn: 'ಕೋಮಾತ್ರಾ ಮತ್ತು ಕಟ್ಚಲ್ ದ್ವೀಪ' }
};


const I18N_CORAL_AREAS = {
  'GULF OF KUTCH': { hi: 'कच्छ की खाड़ी', ta: 'கட்ச் வளைகுடா', te: 'కచ్ గల్ఫ్', ml: 'കച്ച് ഉൾക്കടൽ', bn: 'কচ্ছ উপসাগর', mr: 'कच्छचे आखात', gu: 'કચ્છનો અખાત', or: 'କଚ୍ଛ ଉପସାଗର', kn: 'ಕಛ್ ಕೊಲ್ಲಿ' },
  'GULF OF MANNAR': { hi: 'मन्नार की खाड़ी', ta: 'மன்னார் வளைகுடா', te: 'మன்னார் வளைகுடா', te: 'మన్నార్ గల్ఫ్', ml: 'മന്നാർ ഉൾക്കടൽ', bn: 'মান্নার উপসাগর', mr: 'मन्नारचे आखात', gu: 'મન્નારનો અખાત', or: 'ମନ୍ନାର ଉପସାଗର', kn: 'ಮನ್ನಾರ್ ಕೊಲ್ಲಿ' },
  'ANDAMAN': { hi: 'अंडमान', ta: 'அந்தமான்', te: 'అండమాన్', ml: 'ആൻഡമാൻ', bn: 'আন্দামান', mr: 'अंदमान', gu: 'અંદમાન', or: 'ଆଣ୍ଡାମାନ', kn: 'ಅಂಡಮಾನ್' },
  'NICOBAR': { hi: 'निकोबार', ta: 'நிக்கோபார்', te: 'నికోబార్', ml: 'നിക്കോബാർ', bn: 'নিকোবর', mr: 'निकोबार', gu: 'નિકોબાર', or: 'ନିକୋବର', kn: 'ನಿಕೋಬಾರ್' },
  'LAKSHADWEEP': { hi: 'लक्षद्वीप', ta: 'லட்சத்தீவு', te: 'లక్షద్వీప్', ml: 'ലക്ഷദ്വീപ്', bn: 'লক্ষদ্বীপ', mr: 'लक्षद्वीप', gu: 'લક્ષદ્વીપ', or: 'ଲାକ୍ଷାଦ୍ୱୀପ', kn: 'ಲಕ್ಷದ್ವೀಪ' },
  'MALVAN': { hi: 'मालवण', ta: 'மால்வன்', te: 'మల్వాన్', ml: 'മാൽവൻ', bn: 'মালভান', mr: 'मालवण', gu: 'માલવણ', or: 'ମାଲଭାନ', kn: 'ಮಾಲ್ವನ್' },
  'GOA': { hi: 'गोवा', ta: 'கோவா', te: 'గోవా', ml: 'ഗോവ', bn: 'গোয়া', mr: 'गोवा', gu: 'ગોવા', or: 'ଗୋଆ', kn: 'ಗೋವಾ' },
  'NETRANI ISLAND': { hi: 'नेत्राणी द्वीप', ta: 'நேத்ராணி தீவு', te: 'నేత్రాని ద్వీపం', ml: 'നേത്രാണി ദ്വീപ്', bn: 'নেত্রানি দ্বীপ', mr: 'नेत्राणी बेट', gu: 'નેત્રાણી ટાપુ', or: 'ନେତ୍ରାଣୀ ଦ୍ୱୀପ', kn: 'ನೇತ್ರಾಣಿ ದ್ವೀಪ' }
};

const I18N_DIRECTIONS = {
  'N': { hi: 'उत्तर (N)', ta: 'வடக்கு (N)', te: 'ఉత్తరం (N)', ml: 'വടക്ക് (N)', bn: 'উত্তর (N)', mr: 'उत्तर (N)', gu: 'ઉત્તર (N)', or: 'ଉତ୍ତର (N)', kn: 'ಉತ್ತರ (N)' },
  'S': { hi: 'दक्षिण (S)', ta: 'தெற்கு (S)', te: 'దక్షిణం (S)', ml: 'തെക്ക് (S)', bn: 'দক্ষিণ (S)', mr: 'दक्षिण (S)', gu: 'દક્ષિણ (S)', or: 'ଦକ୍ଷିଣ (S)', kn: 'ದಕ್ಷಿಣ (S)' },
  'E': { hi: 'पूर्व (E)', ta: 'கிழக்கு (E)', te: 'తూర్పు (E)', ml: 'കിഴക്ക് (E)', bn: 'পূর্ব (E)', mr: 'पूर्व (E)', gu: 'પૂર્વ (E)', or: 'ପୂର୍ବ (E)', kn: 'ಪೂರ್ವ (E)' },
  'W': { hi: 'पश्चिम (W)', ta: 'மேற்கு (W)', te: 'పడమర (W)', ml: 'പടിഞ്ഞാറ് (W)', bn: 'পশ্চিম (W)', mr: 'पश्चिम (W)', gu: 'પશ્ચિમ (W)', or: 'ପଶ୍ଚିମ (W)', kn: 'ಪಶ್ಚಿಮ (W)' },
  'NE': { hi: 'उत्तर-पूर्व (NE)', ta: 'வடகிழக்கு (NE)', te: 'ఈశాన్యం (NE)', ml: 'വടക്കുകിഴക്ക് (NE)', bn: 'উত্তর-পূর্ব (NE)', mr: 'ईशान्य (NE)', gu: 'ઉત્તર-પૂર્વ (NE)', or: 'ଉତ୍ତର-ପୂର୍ବ (NE)', kn: 'ಈಶಾನ್ಯ (NE)' },
  'NW': { hi: 'उत्तर-पश्चिम (NW)', ta: 'வடமேற்கு (NW)', te: 'వాయువ్యం (NW)', ml: 'വടക്കുപടിഞ്ഞാറ് (NW)', bn: 'উত্তর-पश्चिम (NW)', mr: 'वायव्य (NW)', gu: 'ઉત્તર-પશ્ચિમ (NW)', or: 'ଉତ୍ତର-ପଶ୍ଚିମ (NW)', kn: 'ವಾಯುವ್ಯ (NW)' },
  'SE': { hi: 'दक्षिण-पूर्व (SE)', ta: 'தென்கிழக்கு (SE)', te: 'ఆగ్నేయం (SE)', ml: 'തെക്കുകிழക്ക് (SE)', bn: 'দক্ষিণ-পূর্ব (SE)', mr: 'आग्नेय (SE)', gu: 'દક્ષિણ-પૂર્વ (SE)', or: 'ଦକ୍ଷିଣ-ପୂର୍ବ (SE)', kn: 'ಆಗ್ನೇಯ (SE)' },
  'SW': { hi: 'दक्षिण-पश्चिम (SW)', ta: 'தென்மேற்கு (SW)', te: 'నైరుతి (SW)', ml: 'തെക്കുപടിഞ്ഞാറ് (SW)', bn: 'দক্ষিণ-পশ্চিম (SW)', mr: 'नैऋत्य (SW)', gu: 'દક્ષિણ-પશ્ચિમ (SW)', or: 'ଦକ୍ଷିଣ-ପଶ୍ଚିମ (SW)', kn: 'ನೈಋತ್ಯ (SW)' },
  'ENE': { hi: 'पूर्व-उत्तर-पूर्व (ENE)', ta: 'கிழக்கு-வடகிழக்கு (ENE)', te: 'తూర్పు-ఈశాన్యం (ENE)', ml: 'കിഴക്ക്-വടക്കുകിഴക്ക് (ENE)', bn: 'পূর্ব-উত্তর-পূর্ব (ENE)', mr: 'पूर्व-ईशान्य (ENE)', gu: 'પૂર્વ-ઉત્તર-પૂર્વ (ENE)', or: 'ପୂର୍ବ-ଉତ୍ତର-ପୂର୍ବ (ENE)', kn: 'ಪೂರ್ವ-ಈಶಾನ್ಯ (ENE)' },
  'ESE': { hi: 'पूर्व-दक्षिण-पूर्व (ESE)', ta: 'கிழக்கு-தென்கிழக்கு (ESE)', te: 'తూర్పు-ఆగ్నేయం (ESE)', ml: 'കിഴക്ക്-തെക്കുകிழക്ക് (ESE)', bn: 'পূর্ব-দক্ষিণ-পূর্ব (ESE)', mr: 'पूर्व-आग्नेय (ESE)', gu: 'પૂર્વ-દક્ષિણ-પૂર્વ (ESE)', or: 'ପୂର୍ବ-ଦକ୍ଷିଣ-ପୂର୍ବ (ESE)', kn: 'ಪೂರ್ವ-ಆಗ್ನೇಯ (ESE)' },
  'WNW': { hi: 'पश्चिम-उत्तर-पश्चिम (WNW)', ta: 'மேற்கு-வடமேற்கு (WNW)', te: 'పడమర-వాయువ్యం (WNW)', ml: 'പടിഞ്ഞാറ്-വടക്കുപടിഞ്ഞാറ് (WNW)', bn: 'পশ্চিম-উত্তর-पश्चिम (WNW)', mr: 'पश्चिम-वायव्य (WNW)', gu: 'પશ્ચિમ-ઉત્તર-પશ્ચિમ (WNW)', or: 'ପଶ୍ଚିମ-ଉତ୍ତର-ପଶ୍ଚିମ (WNW)', kn: 'ಪಶ್ಚಿಮ-ವಾಯುವ್ಯ (WNW)' },
  'WSW': { hi: 'पश्चिम-दक्षिण-पश्चिम (WSW)', ta: 'மேற்கு-தென்மேற்கு (WSW)', te: 'పడమర-నైరుతి (WSW)', ml: 'പടിഞ്ഞാറ്-തെക്കുപടിഞ്ഞാറ് (WSW)', bn: 'পশ্চিম-দক্ষিণ-পশ্চিম (WSW)', mr: 'पश्चिम-नैऋत्य (WSW)', gu: 'પશ્ચિમ-દક્ષિણ-પશ્ચિમ (WSW)', or: 'ପଶ୍ଚିମ-ଦକ୍ଷିଣ-ପଶ୍ଚିମ (WSW)', kn: 'ಪಶ್ಚಿಮ-ನೈಋತ್ಯ (WSW)' },
  'NNE': { hi: 'उत्तर-उत्तर-पूर्व (NNE)', ta: 'வடக்கு-வடகிழக்கு (NNE)', te: 'ఉత్తర-ఈశాన్యం (NNE)', ml: 'വടക്ക്-വടക്കുകിഴക്ക് (NNE)', bn: 'উত্তর-উত্তর-পূর্ব (NNE)', mr: 'उत्तर-ईशान्य (NNE)', gu: 'ઉત્તર-ઉત્તર-પૂર્વ (NNE)', or: 'ଉତ୍ତର-ଉତ୍ତର-ପୂର୍ବ (NNE)', kn: 'ಉತ್ತರ-ಈಶಾನ್ಯ (NNE)' },
  'NNW': { hi: 'उत्तर-उत्तर-पश्चिम (NNW)', ta: 'வடக்கு-வடமேற்கு (NNW)', te: 'ఉత్తర-వాయువ్యం (NNW)', ml: 'വടക്ക്-വടക്കുപടിഞ്ഞാറ് (NNW)', bn: 'উত্তর-উত্তর-पश्चिम (NNW)', mr: 'उत्तर-वायव्य (NNW)', gu: 'ઉત્તર-ઉત્તર-પશ્ચિમ (NNW)', or: 'ଉତ୍ତର-ଉତ୍ତର-ପଶ୍ଚିମ (NNW)', kn: 'ಉತ್ತರ-ವಾಯುವ್ಯ (NNW)' },
  'SSE': { hi: 'दक्षिण-दक्षिण-पूर्व (SSE)', ta: 'தெற்கு-தென்கிழக்கு (SSE)', te: 'దక్షిణ-ఆగ్నేయం (SSE)', ml: 'തെക്ക്-തെക്കുകிழക്ക് (SSE)', bn: 'দক্ষিণ-দক্ষিণ-পূর্ব (SSE)', mr: 'दक्षिण-आग्नेय (SSE)', gu: 'દક્ષિણ-દક્ષિણ-પૂર્વ (SSE)', or: 'ଦକ୍ଷିଣ-ଦକ୍ଷିଣ-ପୂର୍ବ (SSE)', kn: 'ದಕ್ಷಿಣ-ಆಗ್ನೇಯ (SSE)' },
  'SSW': { hi: 'दक्षिण-दक्षिण-पश्चिम (SSW)', ta: 'தெற்கு-தென்மேற்கு (SSW)', te: 'దక్షిణ-నైరుతి (SSW)', ml: 'തെക്ക്-തെക്കുപടിഞ്ഞാറ് (SSW)', bn: 'দক্ষিণ-দক্ষিণ-पश्चिम (SSW)', mr: 'दक्षिण-नैऋत्य (SSW)', gu: 'દક્ષિણ-દક્ષિણ-પશ્ચિમ (SSW)', or: 'ଦକ୍ଷିଣ-ଦକ୍ଷିଣ-ପଶ୍ଚିମ (SSW)', kn: 'ದಕ್ಷಿಣ-ನೈಋತ್ಯ (SSW)' }
};

// Global Internationalization Controller
globalThis.i18n = {
  currentLang: 'en',

  init() {
    const saved = localStorage.getItem('ocean_watch_lang') || 'en';
    this.currentLang = I18N_DICTIONARY[saved] ? saved : 'en';
    this.renderLanguageSelect();
    this.translatePage(this.currentLang);
  },

  getLanguage() {
    return this.currentLang;
  },

  setLanguage(langCode) {
    if (!I18N_DICTIONARY[langCode]) langCode = 'en';
    this.currentLang = langCode;
    localStorage.setItem('ocean_watch_lang', langCode);

    const select = document.getElementById('appLangSelect');
    if (select && select.value !== langCode) {
      select.value = langCode;
    }

    const voiceSelect = document.getElementById('voiceLangSelect');
    if (voiceSelect) {
      const match = Array.from(voiceSelect.options).find(opt => opt.value.startsWith(langCode));
      if (match) voiceSelect.value = match.value;
    }

    this.translatePage(langCode);

    if (typeof latestStatusData !== 'undefined' && latestStatusData) {
      if (typeof render === 'function') render(latestStatusData);
    }
  },

  t(key, fallback = '') {
    const dict = I18N_DICTIONARY[this.currentLang] || I18N_DICTIONARY.en;
    if (dict && dict[key]) return dict[key];
    const enDict = I18N_DICTIONARY.en;
    return enDict[key] || fallback || key;
  },

  translateStateName(stateName) {
    if (!stateName) return '';
    const tc = typeof globalThis.titleCase === 'function' ? globalThis.titleCase : (typeof titleCase === 'function' ? titleCase : s => String(s || ''));
    const norm = String(stateName).toUpperCase().replace(/&/g, 'AND').replace(/\s+/g, ' ').trim();
    if (this.currentLang === 'en') return tc(stateName);
    const map = I18N_SECTORS[norm];
    if (map && map[this.currentLang]) return map[this.currentLang];
    return tc(stateName);
  },

  translateDistrictName(districtName) {
    if (!districtName) return '';
    const tc = typeof globalThis.titleCase === 'function' ? globalThis.titleCase : (typeof titleCase === 'function' ? titleCase : s => String(s || ''));
    const norm = String(districtName).toUpperCase().replace(/&/g, '&').replace(/\s+/g, ' ').trim();
    if (this.currentLang === 'en') return tc(districtName);
    const map = I18N_DISTRICTS[norm];
    if (map && map[this.currentLang]) return map[this.currentLang];
    return this.translateStateName(districtName);
  },

  translateSectorName(sectorName) {
    return this.translateStateName(sectorName);
  },

  
  transliterateIndic(text) {
    if (!text || this.currentLang === 'en') return text;
    const lang = this.currentLang;
    const scripts = {
      hi: {
        vowels: { a: '', aa: 'ा', i: 'ि', ee: 'ी', u: 'ु', oo: 'ू', e: 'े', ai: 'ै', o: 'ो', au: 'ौ' },
        initVowels: { a: 'अ', aa: 'आ', i: 'इ', ee: 'ई', u: 'उ', oo: 'ऊ', e: 'ए', ai: 'ऐ', o: 'ओ', au: 'औ' },
        cons: { k: 'क', kh: 'ख', g: 'ग', gh: 'घ', ng: 'ङ', ch: 'च', chh: 'छ', j: 'ज', jh: 'झ', ny: 'ञ', t: 'त', th: 'थ', d: 'द', dh: 'ध', n: 'न', p: 'प', ph: 'फ', f: 'फ़', b: 'ब', bh: 'भ', m: 'म', y: 'य', r: 'र', l: 'ल', v: 'व', w: 'व', sh: 'श', s: 'स', h: 'ह' },
        virama: '्'
      },
      ta: {
        vowels: { a: '', aa: 'ா', i: 'ி', ee: 'ீ', u: 'ு', oo: 'ூ', e: 'ெ', ai: 'ை', o: 'ொ', au: 'ௌ' },
        initVowels: { a: 'அ', aa: 'ஆ', i: 'இ', ee: 'ஈ', u: 'உ', oo: 'ஊ', e: 'எ', ai: 'ஐ', o: 'ஒ', au: 'ஔ' },
        cons: { k: 'க', kh: 'க', g: 'க', gh: 'க', ng: 'ங', ch: 'ச', chh: 'ச', j: 'ஜ', jh: 'ஜ', ny: 'ஞ', t: 'த', th: 'த', d: 'ட', dh: 'ட', n: 'ந', p: 'ப', ph: 'ப', f: 'ப', b: 'ப', bh: 'ப', m: 'ம', y: 'ய', r: 'ர', l: 'ல', v: 'வ', w: 'வ', sh: 'ஷ', s: 'ஸ', h: 'ஹ' },
        virama: '்'
      },
      te: {
        vowels: { a: '', aa: 'ా', i: 'ి', ee: 'ీ', u: 'ు', oo: 'ూ', e: 'ె', ai: 'ై', o: 'ొ', au: 'ౌ' },
        initVowels: { a: 'అ', aa: 'ఆ', i: 'ఇ', ee: 'ఈ', u: 'ఉ', oo: 'ఊ', e: 'ఎ', ai: 'ఐ', o: 'ఒ', au: 'ఔ' },
        cons: { k: 'క', kh: 'ఖ', g: 'గ', gh: 'ఘ', ng: 'ఙ', ch: 'చ', chh: 'ఛ', j: 'జ', jh: 'ఝ', ny: 'ఞ', t: 'త', th: 'థ', d: 'ద', dh: 'ధ', n: 'న', p: 'ప', ph: 'ఫ', f: 'ఫ', b: 'బ', bh: 'భ', m: 'మ', y: 'య', r: 'ర', l: 'ల', v: 'వ', w: 'వ', sh: 'శ', s: 'స', h: 'హ' },
        virama: '్'
      },
      ml: {
        vowels: { a: '', aa: 'ാ', i: 'ി', ee: 'ീ', u: 'ു', oo: 'ൂ', e: 'െ', ai: 'ൈ', o: 'ൊ', au: 'ൌ' },
        initVowels: { a: 'അ', aa: 'ആ', i: 'ഇ', ee: 'ഈ', u: 'ഉ', oo: 'ഊ', e: 'എ', ai: 'ഐ', o: 'ഒ', au: 'ഔ' },
        cons: { k: 'ക', kh: 'ഖ', g: 'ഗ', gh: 'ഘ', ng: 'ങ', ch: 'ച', chh: 'ഛ', j: 'ജ', jh: 'ഝ', ny: 'ഞ', t: 'ത', th: 'ഥ', d: 'ദ', dh: 'ധ', n: 'ന', p: 'പ', ph: 'ഫ', f: 'ഫ', b: 'ബ', bh: 'ഭ', m: 'മ', y: 'യ', r: 'ര', l: 'ല', v: 'വ', w: 'വ', sh: 'ശ', s: 'സ', h: 'ഹ' },
        virama: '്'
      },
      bn: {
        vowels: { a: '', aa: 'া', i: 'ি', ee: 'ী', u: 'ু', oo: 'ূ', e: 'ে', ai: 'ৈ', o: 'ো', au: 'ৌ' },
        initVowels: { a: 'অ', aa: 'আ', i: 'ই', ee: 'ঈ', u: 'উ', oo: 'ঊ', e: 'এ', ai: 'ঐ', o: 'ও', au: 'ঔ' },
        cons: { k: 'ক', kh: 'খ', g: 'গ', gh: 'ঘ', ng: 'ঙ', ch: 'চ', chh: 'ছ', j: 'জ', jh: 'ঝ', ny: 'ঞ', t: 'ত', th: 'থ', d: 'দ', dh: 'ধ', n: 'ন', p: 'প', ph: 'ফ', f: 'ফ', b: 'ব', bh: 'ভ', m: 'ম', y: 'য', r: 'র', l: 'ল', v: 'ভ', w: 'ওয়', sh: 'শ', s: 'স', h: 'হ' },
        virama: '্'
      },
      mr: {
        vowels: { a: '', aa: 'ा', i: 'ि', ee: 'ी', u: 'ु', oo: 'ू', e: 'े', ai: 'ै', o: 'ो', au: 'ौ' },
        initVowels: { a: 'अ', aa: 'आ', i: 'इ', ee: 'ई', u: 'उ', oo: 'ऊ', e: 'ए', ai: 'ऐ', o: 'ओ', au: 'औ' },
        cons: { k: 'क', kh: 'ख', g: 'ग', gh: 'घ', ng: 'ङ', ch: 'च', chh: 'छ', j: 'ज', jh: 'झ', ny: 'ञ', t: 'त', th: 'थ', d: 'द', dh: 'ध', n: 'न', p: 'प', ph: 'फ', f: 'फ़', b: 'ब', bh: 'भ', m: 'म', y: 'य', r: 'र', l: 'ल', v: 'व', w: 'व', sh: 'श', s: 'स', h: 'ह' },
        virama: '्'
      },
      gu: {
        vowels: { a: '', aa: 'ા', i: 'િ', ee: 'ી', u: 'ુ', oo: 'ૂ', e: 'ે', ai: 'ૈ', o: 'ો', au: 'ૌ' },
        initVowels: { a: 'અ', aa: 'આ', i: 'ઇ', ee: 'ઈ', u: 'ઉ', oo: 'ઊ', e: 'એ', ai: 'ઐ', o: 'ઓ', au: 'ઔ' },
        cons: { k: 'ક', kh: 'ખ', g: 'ગ', gh: 'ઘ', ng: 'ઙ', ch: 'ચ', chh: 'છ', j: 'જ', jh: 'ઝ', ny: 'ઞ', t: 'ત', th: 'થ', d: 'દ', dh: 'ધ', n: 'ન', p: 'પ', ph: 'ફ', f: 'ફ', b: 'બ', bh: 'ભ', m: 'મ', y: 'ય', r: 'ર', l: 'લ', v: 'વ', w: 'વ', sh: 'શ', s: 'સ', h: 'હ' },
        virama: '્'
      },
      or: {
        vowels: { a: '', aa: 'ା', i: 'ି', ee: 'ୀ', u: 'ୁ', oo: 'ୂ', e: 'େ', ai: 'ୈ', o: 'ୋ', au: 'ୌ' },
        initVowels: { a: 'ଅ', aa: 'ଆ', i: 'ଇ', ee: 'ଈ', u: 'ଉ', oo: 'ଊ', e: 'ଏ', ai: 'ଐ', o: 'ଓ', au: 'ଔ' },
        cons: { k: 'କ', kh: 'ଖ', g: 'ଗ', gh: 'ଘ', ng: 'ଙ', ch: 'ଚ', chh: 'ଛ', j: 'ଜ', jh: 'ଝ', ny: 'ଞ', t: 'ତ', th: 'ଥ', d: 'ଦ', dh: 'ଧ', n: 'ନ', p: 'ପ', ph: 'ଫ', f: 'ଫ', b: 'ବ', bh: 'ଭ', m: 'ମ', y: 'ଯ', r: 'ର', l: 'ଲ', v: 'ଭ', w: 'ୱ', sh: 'ଶ', s: 'ସ', h: 'ହ' },
        virama: '୍'
      },
      kn: {
        vowels: { a: '', aa: 'ಾ', i: 'ಿ', ee: 'ೀ', u: 'ು', oo: 'ೂ', e: 'ೆ', ai: 'ೈ', o: 'ೊ', au: 'ೌ' },
        initVowels: { a: 'ಅ', aa: 'ಆ', i: 'ಇ', ee: 'ಈ', u: 'ಉ', oo: 'ಊ', e: 'ಎ', ai: 'ಐ', o: 'ಒ', au: 'ಔ' },
        cons: { k: 'ಕ', kh: 'ಖ', g: 'ಗ', gh: 'ಘ', ng: 'ಙ', ch: 'ಚ', chh: 'ಛ', j: 'ಜ', jh: 'ಝ', ny: 'ಞ', t: 'ತ', th: 'ಥ', d: 'ದ', dh: 'ಧ', n: 'ನ', p: 'ಪ', ph: 'ಫ', f: 'ಫ', b: 'ಬ', bh: 'ಭ', m: 'ಮ', y: 'ಯ', r: 'ರ', l: 'ಲ', v: 'ವ', w: 'ವ', sh: 'ಶ', s: 'ಸ', h: 'ಹ' },
        virama: '್'
      }
    };

    const s = scripts[lang] || scripts.hi;
    return String(text).replace(/[A-Za-z]+/g, word => {
      let w = word.toLowerCase();
      let out = '';
      let i = 0;
      let isStart = true;
      while (i < w.length) {
        let sub3 = w.slice(i, i + 3);
        let sub2 = w.slice(i, i + 2);
        let sub1 = w.slice(i, i + 1);

        let matchedVowel = null;
        let vLen = 0;
        if (['aa', 'ee', 'oo', 'ai', 'au'].includes(sub2)) { matchedVowel = sub2; vLen = 2; }
        else if (['a', 'i', 'u', 'e', 'o'].includes(sub1)) { matchedVowel = sub1; vLen = 1; }

        if (matchedVowel) {
          if (isStart) out += s.initVowels[matchedVowel] || matchedVowel;
          else out += s.vowels[matchedVowel] !== undefined ? s.vowels[matchedVowel] : matchedVowel;
          i += vLen;
          isStart = false;
          continue;
        }

        let matchedCons = null;
        let cLen = 0;
        if (['chh'].includes(sub3)) { matchedCons = sub3; cLen = 3; }
        else if (['kh', 'gh', 'ng', 'ch', 'jh', 'ny', 'th', 'dh', 'ph', 'bh', 'sh'].includes(sub2)) { matchedCons = sub2; cLen = 2; }
        else if (s.cons[sub1]) { matchedCons = sub1; cLen = 1; }

        if (matchedCons && s.cons[matchedCons]) {
          out += s.cons[matchedCons];
          i += cLen;
          isStart = false;
          let next2 = w.slice(i, i + 2);
          let next1 = w.slice(i, i + 1);
          if (['aa', 'ee', 'oo', 'ai', 'au'].includes(next2)) { out += s.vowels[next2]; i += 2; }
          else if (['a', 'i', 'u', 'e', 'o'].includes(next1)) { out += s.vowels[next1]; i += 1; }
          else if (i < w.length) { out += s.virama; }
          continue;
        }

        out += sub1;
        i += 1;
        isStart = false;
      }
      return out;
    });
  },

    translateLandingCenterName(name) {
    if (!name) return '';
    const tc = typeof globalThis.titleCase === 'function' ? globalThis.titleCase : (typeof titleCase === 'function' ? titleCase : s => String(s || ''));
    if (this.currentLang === 'en') return tc(name);
    const norm = String(name).toUpperCase().trim();
    if (I18N_DISTRICTS[norm] && I18N_DISTRICTS[norm][this.currentLang]) {
      return I18N_DISTRICTS[norm][this.currentLang];
    }
    if (I18N_CORAL_AREAS[norm] && I18N_CORAL_AREAS[norm][this.currentLang]) {
      return I18N_CORAL_AREAS[norm][this.currentLang];
    }
    return this.transliterateIndic(name);
  },

  translateDirection(dir) {
    if (!dir) return '—';
    const norm = String(dir).toUpperCase().trim();
    if (this.currentLang === 'en') return dir;
    const map = I18N_DIRECTIONS[norm];
    if (map && map[this.currentLang]) return map[this.currentLang];
    return dir;
  },

  
  translateCoralArea(area) {
    if (!area) return '';
    const norm = String(area).toUpperCase().trim();
    if (this.currentLang === 'en') return area;
    if (I18N_CORAL_AREAS[norm] && I18N_CORAL_AREAS[norm][this.currentLang]) {
      return I18N_CORAL_AREAS[norm][this.currentLang];
    }
    return this.translateDistrictName(area) || area;
  },

  translateStressLevel(level) {
    if (!level) return '';
    const norm = String(level).toLowerCase().trim();
    if (norm === 'no stress') return this.t('cbas.no_stress', 'No Stress');
    if (norm === 'watch') return this.t('severity.watch', 'Watch');
    if (norm === 'warning') return this.t('severity.warning', 'Warning');
    if (norm === 'alert' || norm === 'alert level 1' || norm === 'alert level 2') return this.t('severity.alert', 'Alert');
    return level;
  },

  translateMhwText(text) {
    if (!text || typeof text !== 'string') return '';
    if (this.currentLang === 'en') return text;

    let res = text;

    if (this.currentLang === 'hi') {
      res = res
        .replace(/Marine Heatwave event of (.*?) category with area of spreading (.*?) has been observed on (.*?) over the (.*)/i, (m, cat, spread, dt, loc) => `${loc} पर ${dt} को ${spread} फैलाव क्षेत्र के साथ ${cat} श्रेणी की मरीन हीटवेव की घटना देखी गई है।`)
        .replace(/Moderate to Extreme/gi, 'मध्यम से अत्यधिक')
        .replace(/Moderate/gi, 'मध्यम')
        .replace(/Strong/gi, 'तीव्र')
        .replace(/Severe/gi, 'गंभीर')
        .replace(/Extreme/gi, 'अत्यधिक')
        .replace(/No Heat Wave/gi, 'कोई हीटवेव नहीं')
        .replace(/ coast/gi, ' तट');
    } else if (this.currentLang === 'ta') {
      res = res
        .replace(/Marine Heatwave event of (.*?) category with area of spreading (.*?) has been observed on (.*?) over the (.*)/i, (m, cat, spread, dt, loc) => `${loc} பகுதியில் ${dt} அன்று ${spread} பரப்பளவில் ${cat} பிரிவு கடல் வெப்ப அலை பதிவு செய்யப்பட்டுள்ளது.`)
        .replace(/Moderate to Extreme/gi, 'மிதமான முதல் அதிதீவிர')
        .replace(/Moderate/gi, 'மிதமான')
        .replace(/Strong/gi, 'வலுவான')
        .replace(/Severe/gi, 'தீவிர')
        .replace(/Extreme/gi, 'அதிதீவிர')
        .replace(/No Heat Wave/gi, 'வெப்ப அலை இல்லை')
        .replace(/ coast/gi, ' கடற்கரை');
    } else if (this.currentLang === 'te') {
      res = res
        .replace(/Marine Heatwave event of (.*?) category with area of spreading (.*?) has been observed on (.*?) over the (.*)/i, (m, cat, spread, dt, loc) => `${loc} ప్రాంతంలో ${dt} న ${spread} విస్తీర్ణంలో ${cat} వర్గం సముద్ర వేడి గాలులు నమోదయ్యాయి.`)
        .replace(/Moderate to Extreme/gi, 'మధ్యస్థం నుండి తీవ్ర')
        .replace(/Moderate/gi, 'మధ్యస్థం')
        .replace(/Strong/gi, 'బలమైన')
        .replace(/Severe/gi, 'తీవ్ర')
        .replace(/Extreme/gi, 'అత్యంత తీవ్ర')
        .replace(/No Heat Wave/gi, 'వేడి గాలులు లేవు')
        .replace(/ coast/gi, ' తీరం');
    } else if (this.currentLang === 'ml') {
      res = res
        .replace(/Marine Heatwave event of (.*?) category with area of spreading (.*?) has been observed on (.*?) over the (.*)/i, (m, cat, spread, dt, loc) => `${loc} മേഖലയിൽ ${dt} തീയതിയിൽ ${spread} വിസ്തൃതിയിൽ ${cat} വിഭാഗത്തിലുള്ള മറൈൻ ഹീറ്റ് വേവ് രേഖപ്പെടുത്തി.`)
        .replace(/Moderate to Extreme/gi, 'ഇടത്തരം മുതൽ അതിതീവ്രം വരെ')
        .replace(/Moderate/gi, 'ഇടത്തരം')
        .replace(/Strong/gi, 'ശക്തമായ')
        .replace(/Severe/gi, 'ഗുരുതരമായ')
        .replace(/Extreme/gi, 'അതിതീവ്രം')
        .replace(/No Heat Wave/gi, 'ഹീറ്റ് വേവ് ഇല്ല')
        .replace(/ coast/gi, ' തീരം');
    } else if (this.currentLang === 'bn') {
      res = res
        .replace(/Marine Heatwave event of (.*?) category with area of spreading (.*?) has been observed on (.*?) over the (.*)/i, (m, cat, spread, dt, loc) => `${loc} অঞ্চলে ${dt} তারিখে ${spread} এলাকায় ${cat} ক্যাটাগরির সামুদ্রিক তাপপ্রবাহ পরিলক্ষিত হয়েছে।`)
        .replace(/Moderate to Extreme/gi, 'মাঝারি থেকে চরম')
        .replace(/Moderate/gi, 'মাঝারি')
        .replace(/Strong/gi, 'তীব্র')
        .replace(/Severe/gi, 'মারাত্মক')
        .replace(/Extreme/gi, 'চরম')
        .replace(/No Heat Wave/gi, 'তাপপ্রবাহ নেই')
        .replace(/ coast/gi, ' উপকূল');
    } else if (this.currentLang === 'mr') {
      res = res
        .replace(/Marine Heatwave event of (.*?) category with area of spreading (.*?) has been observed on (.*?) over the (.*)/i, (m, cat, spread, dt, loc) => `${loc} भागात ${dt} रोजी ${spread} क्षेत्रात ${cat} श्रेणीची सागरी उष्णतेची लाट नोंदवली गेली आहे।`)
        .replace(/Moderate to Extreme/gi, 'मध्यम ते अत्यंत तीव्र')
        .replace(/Moderate/gi, 'मध्यम')
        .replace(/Strong/gi, 'तीव्र')
        .replace(/Severe/gi, 'गंभीर')
        .replace(/Extreme/gi, 'अत्यंत तीव्र')
        .replace(/No Heat Wave/gi, 'उष्णतेची लाट नाही')
        .replace(/ coast/gi, ' किनारपट्टी');
    } else if (this.currentLang === 'gu') {
      res = res
        .replace(/Marine Heatwave event of (.*?) category with area of spreading (.*?) has been observed on (.*?) over the (.*)/i, (m, cat, spread, dt, loc) => `${loc} વિસ્તારમાં ${dt} ના રોજ ${spread} વિસ્તારમાં ${cat} શ્રેણીની મરીન હીટવેવ જોવા મળી છે.`)
        .replace(/Moderate to Extreme/gi, 'મધ્યમથી અતિ તીવ્ર')
        .replace(/Moderate/gi, 'મધ્યમ')
        .replace(/Strong/gi, 'મજબૂત')
        .replace(/Severe/gi, 'ગંભીર')
        .replace(/Extreme/gi, 'અતિ તીવ્ર')
        .replace(/No Heat Wave/gi, 'હીટવેવ નથી')
        .replace(/ coast/gi, ' કાંઠો');
    } else if (this.currentLang === 'or') {
      res = res
        .replace(/Marine Heatwave event of (.*?) category with area of spreading (.*?) has been observed on (.*?) over the (.*)/i, (m, cat, spread, dt, loc) => `${loc} ଅଞ୍ଚଳରେ ${dt} ରେ ${spread} କ୍ଷେତ୍ରରେ ${cat} ଶ୍ରେଣୀର ସାମୁଦ୍ରିକ ଉତ୍ତାପ ତରଙ୍ଗ ଦେଖାଦେଇଛି।`)
        .replace(/Moderate to Extreme/gi, 'ମଧ୍ୟମରୁ ଅତ୍ୟଧିକ')
        .replace(/Moderate/gi, 'ମଧ୍ୟମ')
        .replace(/Strong/gi, 'ଶକ୍ତିଶାଳୀ')
        .replace(/Severe/gi, 'ଗୁରୁତର')
        .replace(/Extreme/gi, 'ଅତ୍ୟଧିକ')
        .replace(/No Heat Wave/gi, 'ଉତ୍ତାପ ତରଙ୍ଗ ନାହିଁ')
        .replace(/ coast/gi, ' ଉପକୂଳ');
    } else if (this.currentLang === 'kn') {
      res = res
        .replace(/Marine Heatwave event of (.*?) category with area of spreading (.*?) has been observed on (.*?) over the (.*)/i, (m, cat, spread, dt, loc) => `${loc} ಪ್ರದೇಶದಲ್ಲಿ ${dt} ರಂದು ${spread} ವಿಸ್ತೀರ್ಣದಲ್ಲಿ ${cat} ವರ್ಗದ ಸಾಗರ ಶಾಖದ ಅಲೆ ದಾಖಲಾಗಿದೆ.`)
        .replace(/Moderate to Extreme/gi, 'ಮಧ್ಯಮದಿಂದ ಅತ್ಯಂತ ತೀವ್ರ')
        .replace(/Moderate/gi, 'ಮಧ್ಯಮ')
        .replace(/Strong/gi, 'ಬಲವಾದ')
        .replace(/Severe/gi, 'ಗಂಭೀರ')
        .replace(/Extreme/gi, 'ಅತ್ಯಂತ ತೀವ್ರ')
        .replace(/No Heat Wave/gi, 'ಶಾಖದ ಅಲೆ ಇಲ್ಲ')
        .replace(/ coast/gi, ' ಕರಾವಳಿ');
    }

    const regions = {
      'Arabian Sea': { hi: 'अरब सागर', ta: 'அரபிக்கடல்', te: 'అరేబియా సముద్రం', ml: 'അറബിക്കടൽ', bn: 'আরব সাগর', mr: 'अरबी समुद्र', gu: 'અરબી સમુદ્ર', or: 'ଆରବ ସାଗର', kn: 'ಅರೇಬಿಯನ್ ಸಮುದ್ರ' },
      'Bay of Bengal': { hi: 'बंगाल की खाड़ी', ta: 'வங்காள விரிகுடா', te: 'బంగాళాఖాతం', ml: 'ബംഗಾൾ ഉൾക്കടൽ', bn: 'বঙ্গোপসাগর', mr: 'बंगालचा उपसागर', gu: 'બંગાળની ખાડી', or: 'ବଙ୍ଗୋପସାଗର', kn: 'ಬಂಗಾಳ ಕೊಲ್ಲಿ' },
      'Rest of Indian Ocean': { hi: 'शेष हिंद महासागर', ta: 'இந்திய பெருங்கடலின் பிற பகுதிகள்', te: 'మిగిలిన హిందూ మహాసముద్రం', ml: 'ഇന്ത്യൻ മഹാസമുദ്രത്തിന്റെ മറ്റ് ഭാഗങ്ങൾ', bn: 'ভারত মহাসাগরের অবশিষ্টাংশ', mr: 'उर्वरित हिंदी महासागर', gu: 'બાકીનો હિંદ મહಾಸાગર', or: 'ଅବଶିଷ୍ଟ ଭାରତ ମହାସାଗର', kn: 'ಉಳಿದ ಹಿಂದೂ ಮಹಾಸಾಗರ' }
    };

    for (const [rName, rMap] of Object.entries(regions)) {
      if (rMap[this.currentLang] && res.includes(rName)) {
        res = res.replaceAll(rName, rMap[this.currentLang]);
      }
    }
    for (const [sName, sMap] of Object.entries(I18N_SECTORS)) {
      const tc = sName.charAt(0) + sName.slice(1).toLowerCase();
      if (sMap[this.currentLang]) {
        if (res.includes(sName)) res = res.replaceAll(sName, sMap[this.currentLang]);
        if (res.includes(tc)) res = res.replaceAll(tc, sMap[this.currentLang]);
      }
    }

    return res;
  },

  translateAdvisoryMessage(msg) {
    if (!msg || typeof msg !== 'string') return '';
    if (this.currentLang === 'en') return msg;

    let res = msg;

    // 1. Hazard Title & Level Replacements
    res = res.replace(/High Wave (Warning|Alert|Watch)/gi, (match, level) => {
      const lvlKey = level.toLowerCase() === 'warning' ? 'severity.warning' : (level.toLowerCase() === 'alert' ? 'severity.alert' : 'severity.watch');
      return `${this.t('osf.high_wave', 'High Wave')} ${this.t(lvlKey, level)}`;
    });
    res = res.replace(/Swell Surge (Warning|Alert|Watch)/gi, (match, level) => {
      const lvlKey = level.toLowerCase() === 'warning' ? 'severity.warning' : (level.toLowerCase() === 'alert' ? 'severity.alert' : 'severity.watch');
      return `${this.t('osf.swell_surge', 'Swell Surge')} ${this.t(lvlKey, level)}`;
    });
    res = res.replace(/Ocean Currents (Warning|Alert|Watch)/gi, (match, level) => {
      const lvlKey = level.toLowerCase() === 'warning' ? 'severity.warning' : (level.toLowerCase() === 'alert' ? 'severity.alert' : 'severity.watch');
      return `${this.t('osf.ocean_currents', 'Ocean Currents')} ${this.t(lvlKey, level)}`;
    });

    // 2. Language-specific sentence patterns
    if (this.currentLang === 'hi') {
      res = res
        .replace(/for the coast of/gi, 'तट के लिए:')
        .replace(/Swell waves in the range of ([0-9.\s-]+) sec period with ([0-9.\s-]+)\s*(?:m|meters)?\s*height are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$3 से $4 के दौरान $1 सेकंड अवधि और $2 मीटर ऊँचाई की स्वेल लहरें उठने का पूर्वानुमान है।')
        .replace(/High waves in the range of ([0-9.\s-]+) meters are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$1 मीटर की ऊँचाई वाली लहरें $2 से $3 के दौरान उठने का पूर्वानुमान है।')
        .replace(/Surface current speeds in the range of ([0-9.\s-]+) m\/sec are forecasted during (.*?) to (.*?)(?:\.|$)/gi, 'सतही धारा की गति $1 मी/सेकंड $2 से $3 के दौरान रहने की संभावना है।')
        .replace(/Swell waves of height ([0-9.\s-]+) meters/gi, '$1 मीटर ऊँचाई की स्वेल लहरें')
        .replace(/from (.*?) To (.*?)(?:\.|$)/gi, '$1 से $2 तक।')
        .replace(/It(?: is)? advised that there is a possibility of surging of waves,?\s*boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'लहरों के तेज उछाल की संभावना है, नावों को अत्यधिक सतर्कता के साथ चलाने और तटीय मनोरंजन में सावधानी बरतने की सलाह दी जाती है।')
        .replace(/It(?: is)? advised that Harbour & [Mm]arine operations to be careful\.?/gi, 'बंदरगाह और समुद्री गतिविधियों में सावधानी बरतने की सलाह दी जाती है।')
        .replace(/Harbour & [Mm]arine operations to be careful\.?/gi, 'बंदरगाह और समुद्री गतिविधियों में सावधानी बरतने की सलाह दी जाती है।')
        .replace(/It(?: is)? advised that boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'नावों को अत्यधिक सतर्कता के साथ चलाने और तटीय मनोरंजन में सावधानी बरतने की सलाह दी जाती है।')
        .replace(/It(?: is)? advised that to be careful while doing marine operations and nearshore recreation\.?/gi, 'समुद्री गतिविधियों और तटीय मनोरंजन के दौरान सतर्क रहने की सलाह दी जाती है।')
        .replace(/It(?: is)? advised that no immediate action is required\.?(?:\s*Check for updates\.?)?/gi, 'तत्काल किसी कार्रवाई की आवश्यकता नहीं है। अद्यतन जानकारी देखते रहें।')
        .replace(/Fishermen and coastal population are alerted to be cautious/gi, 'मछुआरों और तटीय आबादी को सतर्क रहने की सलाह दी जाती है')
        .replace(/hours on/gi, 'बजे, दिनांक');
    } else if (this.currentLang === 'ta') {
      res = res
        .replace(/for the coast of/gi, 'கடற்கரைக்கு:')
        .replace(/Swell waves in the range of ([0-9.\s-]+) sec period with ([0-9.\s-]+)\s*(?:m|meters)?\s*height are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$3 முதல் $4 வரை $1 விநாடி கால இடைவெளியில் $2 மீட்டர் உயர கள்ளக்கடல் அலைகள் எழக்கூடும் என கணிக்கப்பட்டுள்ளது.')
        .replace(/High waves in the range of ([0-9.\s-]+) meters are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$1 மீட்டர் உயரத்திற்கு உயர்ந்த அலைகள் $2 முதல் $3 வரை எழக்கூடும் என கணிக்கப்பட்டுள்ளது.')
        .replace(/Surface current speeds in the range of ([0-9.\s-]+) m\/sec are forecasted during (.*?) to (.*?)(?:\.|$)/gi, 'நீரோட்ட வேகம் $1 மீ/விநாடி $2 முதல் $3 வரை இருக்கக்கூடும்.')
        .replace(/Swell waves of height ([0-9.\s-]+) meters/gi, '$1 மீட்டர் உயரத்திற்கு கள்ளக்கடல் அலைகள்')
        .replace(/from (.*?) To (.*?)(?:\.|$)/gi, '$1 முதல் $2 வரை.')
        .replace(/It(?: is)? advised that there is a possibility of surging of waves,?\s*boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'அலைகள் வேகமாக சீறிப்பாய வாய்ப்புள்ளதால், படகுகள் மிகுந்த எச்சரிக்கையுடன் இயக்கப்பட வேண்டும் மற்றும் கடற்கரை பொழுதுபோக்குகளில் மிகுந்த கவனத்துடன் இருக்குமாறு அறிவுறுத்தப்படுகிறார்கள்.')
        .replace(/It(?: is)? advised that Harbour & [Mm]arine operations to be careful\.?/gi, 'துறைமுகம் மற்றும் கடல்சார் செயல்பாடுகளில் ஈடுபடுவோர் எச்சரிக்கையுடன் இருக்குமாறு அறிவுறுத்தப்படுகிறார்கள்.')
        .replace(/Harbour & [Mm]arine operations to be careful\.?/gi, 'துறைமுகம் மற்றும் கடல்சார் செயல்பாடுகளில் ஈடுபடுவோர் எச்சரிக்கையுடன் இருக்குமாறு அறிவுறுத்தப்படுகிறார்கள்.')
        .replace(/It(?: is)? advised that boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'படகுகள் மிகுந்த எச்சரிக்கையுடன் இயக்கப்பட வேண்டும் மற்றும் கடற்கரை பொழுதுபோக்குகளில் கவனமாக இருக்குமாறு அறிவுறுத்தப்படுகிறார்கள்.')
        .replace(/It(?: is)? advised that to be careful while doing marine operations and nearshore recreation\.?/gi, 'கடல்சார் தொழில்கள் மற்றும் கடற்கரை பொழுதுபோக்குகளில் ஈடுபடுவோர் எச்சரிக்கையுடன் இருக்குமாறு அறிவுறுத்தப்படுகிறார்கள்.')
        .replace(/It(?: is)? advised that no immediate action is required\.?(?:\s*Check for updates\.?)?/gi, 'உடனடி நடவடிக்கை எதுவும் தேவையில்லை. புதுப்பிப்புகளைத் தொடர்ந்து கவனிக்கவும்.')
        .replace(/Fishermen and coastal population are alerted to be cautious/gi, 'மீனவர்கள் மற்றும் கடலோர மக்கள் எச்சரிக்கையுடன் இருக்குமாறு அறிவுறுத்தப்படுகிறார்கள்')
        .replace(/hours on/gi, 'மணிக்கு, தேதி');
    } else if (this.currentLang === 'te') {
      res = res
        .replace(/for the coast of/gi, 'తీరానికి:')
        .replace(/Swell waves in the range of ([0-9.\s-]+) sec period with ([0-9.\s-]+)\s*(?:m|meters)?\s*height are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$3 నుండి $4 వరకు $1 సెకన్ల వ్యవధితో $2 మీటర్ల ఎత్తు వరకు స్వెల్ అలలు ఎగిసిపడే అవకాశం ఉంది.')
        .replace(/High waves in the range of ([0-9.\s-]+) meters are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$1 మీటర్ల ఎత్తు వరకు అలలు $2 నుండి $3 వరకు ఎగిసిపడే అవకాశం ఉంది.')
        .replace(/Surface current speeds in the range of ([0-9.\s-]+) m\/sec are forecasted during (.*?) to (.*?)(?:\.|$)/gi, 'ప్రవాహ వేగం $1 మీ/సెకను $2 నుండి $3 వరకు ఉండవచ్చు.')
        .replace(/Swell waves of height ([0-9.\s-]+) meters/gi, '$1 మీటర్ల ఎత్తు వరకు స్వెల్ అలలు')
        .replace(/from (.*?) To (.*?)(?:\.|$)/gi, '$1 నుండి $2 వరకు.')
        .replace(/It(?: is)? advised that there is a possibility of surging of waves,?\s*boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'అలలు ఉవ్వెత్తున ఎగిసిపడే అవకాశం ఉన్నందున, పడవలు అత్యంత అప్రమత్తంగా ప్రయాణించాలని, వినోద కార్యక్రమాలలో తగిన జాగ్రత్తలు తీసుకోవాలని సూచించడమైనది.')
        .replace(/It(?: is)? advised that Harbour & [Mm]arine operations to be careful\.?/gi, 'హార్బర్ మరియు సముద్ర కార్యకలాపాలలో జాగ్రత్తగా ఉండాలని సూచించడమైనది.')
        .replace(/Harbour & [Mm]arine operations to be careful\.?/gi, 'హార్బర్ మరియు సముద్ర కార్యకలాపాలలో జాగ్రత్తగా ఉండాలని సూచించడమైనది.')
        .replace(/It(?: is)? advised that boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'పడవలు అత్యంత అప్రమత్తంగా ప్రయాణించాలని, వినోదాలలో జాగ్రత్తగా ఉండాలని సూచించడమైనది.')
        .replace(/It(?: is)? advised that to be careful while doing marine operations and nearshore recreation\.?/gi, 'సముద్ర కార్యకలాపాలు మరియు తీరప్రాంత వినోదాలలో జాగ్రత్తగా ఉండాలని సూచించడమైనది.')
        .replace(/It(?: is)? advised that no immediate action is required\.?(?:\s*Check for updates\.?)?/gi, 'తక్షణ చర్య అవసరం లేదు. తాజా సమాచారం కోసం గమనించండి.')
        .replace(/Fishermen and coastal population are alerted to be cautious/gi, 'మత్స్యకారులు మరియు తీరప్రాంత ప్రజలు అప్రమత్తంగా ఉండాలి')
        .replace(/hours on/gi, 'గంటలకు, తేదీ');
    } else if (this.currentLang === 'ml') {
      res = res
        .replace(/for the coast of/gi, 'തീരത്തിന്:')
        .replace(/Swell waves in the range of ([0-9.\s-]+) sec period with ([0-9.\s-]+)\s*(?:m|meters)?\s*height are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$3 മുതൽ $4 വരെ $1 സെക്കൻഡ് ഇടവേളയിൽ $2 മീറ്റർ ഉയരത്തിൽ കള്ളക്കടൽ തിരമാലകൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്.')
        .replace(/High waves in the range of ([0-9.\s-]+) meters are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$1 മീറ്റർ ഉയരത്തിൽ ഉയർന്ന തിരമാലകൾ $2 മുതൽ $3 വരെ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്.')
        .replace(/Surface current speeds in the range of ([0-9.\s-]+) m\/sec are forecasted during (.*?) to (.*?)(?:\.|$)/gi, 'പ്രവാഹ വേഗത $1 മീ/സെക്കൻഡ് $2 മുതൽ $3 വരെയാകാം.')
        .replace(/Swell waves of height ([0-9.\s-]+) meters/gi, '$1 മീറ്റർ ഉയരത്തിൽ കള്ളക്കടൽ തിരമാലകൾ')
        .replace(/from (.*?) To (.*?)(?:\.|$)/gi, '$1 മുതൽ $2 വരെ.')
        .replace(/It(?: is)? advised that there is a possibility of surging of waves,?\s*boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'തിരമാലകൾ ശക്തമായി അടിക്കാൻ സാധ്യതയുള്ളതിനാൽ ബോട്ടുകൾ അതീവ ജാഗ്രതയോടെ സഞ്ചരിക്കാനും വിനോദങ്ങളിൽ ജാഗ്രത പാലിക്കാനും നിർദ്ദേശിക്കുന്നു.')
        .replace(/It(?: is)? advised that Harbour & [Mm]arine operations to be careful\.?/gi, 'തുറമുഖ, സമുദ്ര പ്രവർത്തനങ്ങളിൽ ജാഗ്രത പാലിക്കാൻ നിർദ്ദേശിക്കുന്നു.')
        .replace(/Harbour & [Mm]arine operations to be careful\.?/gi, 'തുറമുഖ, സമുദ്ര പ്രവർത്തനങ്ങളിൽ ജാഗ്രത പാലിക്കാൻ നിർദ്ദേശിക്കുന്നു.')
        .replace(/It(?: is)? advised that boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'ബോട്ടുകൾ അതീവ ജാഗ്രതയോടെ സഞ്ചരിക്കാനും വിനോദങ്ങളിൽ ശ്രദ്ധിക്കാനും നിർദ്ദേശിക്കുന്നു.')
        .replace(/It(?: is)? advised that to be careful while doing marine operations and nearshore recreation\.?/gi, 'കടൽ പ്രവർത്തനങ്ങളിലും തീരദേശ വിനോദങ്ങളിലും ഏർപ്പെടുമ്പോൾ ജാഗ്രത പാലിക്കാൻ നിർദ്ദേശിക്കുന്നു.')
        .replace(/It(?: is)? advised that no immediate action is required\.?(?:\s*Check for updates\.?)?/gi, 'ഉടൻ നടപടിയൊന്നും ആവശ്യമില്ല. വിവരങ്ങൾ പരിശോധിക്കുക.')
        .replace(/Fishermen and coastal population are alerted to be cautious/gi, 'മത്സ്യത്തൊഴിലാളികളും തീരവാസികളും ജാഗ്രത പാലിക്കണം')
        .replace(/hours on/gi, 'മണിക്ക്, തീയതി');
    } else if (this.currentLang === 'bn') {
      res = res
        .replace(/for the coast of/gi, 'উপকূলের জন্য:')
        .replace(/Swell waves in the range of ([0-9.\s-]+) sec period with ([0-9.\s-]+)\s*(?:m|meters)?\s*height are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$3 থেকে $4 পর্যন্ত $1 সেকেন্ড সময়কালের ব্যবধানে $2 মিটার উচ্চতার সোয়েল ঢেউ ওঠার সম্ভাবনা রয়েছে।')
        .replace(/High waves in the range of ([0-9.\s-]+) meters are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$1 মিটার উচ্চতার ঢেউ $2 থেকে $3 পর্যন্ত ওঠার পূর্বাভাস রয়েছে।')
        .replace(/Surface current speeds in the range of ([0-9.\s-]+) m\/sec are forecasted during (.*?) to (.*?)(?:\.|$)/gi, 'স্রোতের গতিবেগ $1 মি/সেকেন্ড $2 থেকে $3 পর্যন্ত হতে পারে।')
        .replace(/Swell waves of height ([0-9.\s-]+) meters/gi, '$1 মিটার উচ্চতার সোয়েল ঢেউ')
        .replace(/from (.*?) To (.*?)(?:\.|$)/gi, '$1 থেকে $2 পর্যন্ত।')
        .replace(/It(?: is)? advised that there is a possibility of surging of waves,?\s*boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'ঢেউয়ের প্রবল উচ্ছ্বাসের সম্ভাবনা থাকায় নৌকাগুলিকে অত্যন্ত সতর্কতার সাথে চলাচল করতে এবং উপকূলীয় বিনোদনে সতর্ক থাকতে পরামর্শ দেওয়া হচ্ছে।')
        .replace(/It(?: is)? advised that Harbour & [Mm]arine operations to be careful\.?/gi, 'বন্দর ও সামুদ্রিক কার্যকলাপে সতর্ক থাকার পরামর্শ দেওয়া হচ্ছে।')
        .replace(/Harbour & [Mm]arine operations to be careful\.?/gi, 'বন্দর ও সামুদ্রিক কার্যকলাপে সতর্ক থাকার পরামর্শ দেওয়া হচ্ছে।')
        .replace(/It(?: is)? advised that boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'নৌকাগুলিকে সতর্কতার সাথে চলাচল করতে এবং বিনোদনে সাবধানতা অবলম্বন করতে পরামর্শ দেওয়া হচ্ছে।')
        .replace(/It(?: is)? advised that to be careful while doing marine operations and nearshore recreation\.?/gi, 'সামুদ্রিক কার্যক্রম এবং উপকূলীয় বিনোদনের সময় সতর্ক থাকার পরামর্শ দেওয়া হচ্ছে।')
        .replace(/It(?: is)? advised that no immediate action is required\.?(?:\s*Check for updates\.?)?/gi, 'তাৎক্ষণিক কোনো পদক্ষেপের প্রয়োজন নেই। আপডেটের জন্য নজর রাখুন।')
        .replace(/Fishermen and coastal population are alerted to be cautious/gi, 'মৎস্যজীবী ও উপকূলবাসীদের সতর্ক থাকার পরামর্শ দেওয়া হচ্ছে')
        .replace(/hours on/gi, 'টার সময়, তারিখ');
    } else if (this.currentLang === 'mr') {
      res = res
        .replace(/for the coast of/gi, 'किनारपट्टीसाठी:')
        .replace(/Swell waves in the range of ([0-9.\s-]+) sec period with ([0-9.\s-]+)\s*(?:m|meters)?\s*height are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$3 ते $4 दरम्यान $1 सेकंदांच्या कालावधीसह $2 मीटर उंचीच्या स्वेल लाटा उसळण्याचा अंदाज आहे।')
        .replace(/High waves in the range of ([0-9.\s-]+) meters are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$1 मीटर उंचीच्या लाटा $2 ते $3 दरम्यान उसळण्याचा अंदाज आहे.')
        .replace(/Surface current speeds in the range of ([0-9.\s-]+) m\/sec are forecasted during (.*?) to (.*?)(?:\.|$)/gi, 'प्रवाहाचा वेग $1 मी/सेकंद $2 ते $3 दरम्यान राहण्याची शक्यता आहे.')
        .replace(/Swell waves of height ([0-9.\s-]+) meters/gi, '$1 मीटर उंचीच्या स्वेल लाटा')
        .replace(/from (.*?) To (.*?)(?:\.|$)/gi, '$1 ते $2 पर्यंत.')
        .replace(/It(?: is)? advised that there is a possibility of surging of waves,?\s*boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'लाटांचा वेग वाढण्याची शक्यता असल्याने बोटींनी अत्यंत दक्षतेने प्रवास करावा व पर्यटनादरम्यान काळजी घ्यावी असा सल्ला दिला आहे.')
        .replace(/It(?: is)? advised that Harbour & [Mm]arine operations to be careful\.?/gi, 'बंदर व सागरी कामकाजात सावधगिरी बाळगण्याचा सल्ला दिला आहे.')
        .replace(/Harbour & [Mm]arine operations to be careful\.?/gi, 'बंदर व सागरी कामकाजात सावधगिरी बाळगण्याचा सल्ला दिला आहे.')
        .replace(/It(?: is)? advised that boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'बोटींनी अत्यंत दक्षतेने प्रवास करावा व पर्यटनादरम्यान काळजी घ्यावी.')
        .replace(/It(?: is)? advised that to be careful while doing marine operations and nearshore recreation\.?/gi, 'सागरी कामकाज आणि किनारपट्टीवरील मनोरंजनादरम्यान सावधगिरी बाळगण्याचा सल्ला दिला आहे.')
        .replace(/It(?: is)? advised that no immediate action is required\.?(?:\s*Check for updates\.?)?/gi, 'तात्काळ कारवाईची आवश्यकता नाही. अपडेट्स तपासत राहा.')
        .replace(/Fishermen and coastal population are alerted to be cautious/gi, 'मच्छीमार आणि नागरिकांना सतर्कतेचा इशारा')
        .replace(/hours on/gi, 'वाजता, दिनांक');
    } else if (this.currentLang === 'gu') {
      res = res
        .replace(/for the coast of/gi, 'કાંઠા માટે:')
        .replace(/Swell waves in the range of ([0-9.\s-]+) sec period with ([0-9.\s-]+)\s*(?:m|meters)?\s*height are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$3 થી $4 દરમિયાન $1 સેકન્ડના ગાળા સાથે $2 મીટર ઊંચાઈના સ્વેલ મોજાં ઉછળવાની આગાહી છે.')
        .replace(/High waves in the range of ([0-9.\s-]+) meters are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$1 મીટર ઊંચાઈના મોજાં $2 થી $3 દરમિયાન ઉછળવાની આગાહી છે.')
        .replace(/Surface current speeds in the range of ([0-9.\s-]+) m\/sec are forecasted during (.*?) to (.*?)(?:\.|$)/gi, 'પ્રવાહની ઝડપ $1 મી/સેકન્ડ $2 થી $3 દરમિયાન રહેવાની શક્યતા છે.')
        .replace(/Swell waves of height ([0-9.\s-]+) meters/gi, '$1 મીટર ઊંચાઈના સ્વેલ મોજાં')
        .replace(/from (.*?) To (.*?)(?:\.|$)/gi, '$1 થી $2 સુધી.')
        .replace(/It(?: is)? advised that there is a possibility of surging of waves,?\s*boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'મોજાં ઉછળવાની શક્યતા હોવાથી બોટોને અત્યંત સાવચેતી સાથે ચલાવવા અને કાંઠાના મનોરંજનમાં સાવચેત રહેવાની સલાહ આપવામાં આવે છે.')
        .replace(/It(?: is)? advised that Harbour & [Mm]arine operations to be careful\.?/gi, 'બંદર અને દરિયાઈ કામગીરીમાં સાવચેત રહેવાની સલાહ આપવામાં આવે છે.')
        .replace(/Harbour & [Mm]arine operations to be careful\.?/gi, 'બંદર અને દરિયાઈ કામગીરીમાં સાવચેત રહેવાની સલાહ આપવામાં આવે છે.')
        .replace(/It(?: is)? advised that boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'બોટોને અત્યંત સાવચેતી સાથે ચલાવવા અને મનોરંજનમાં ધ્યાન રાખવા સલાહ છે.')
        .replace(/It(?: is)? advised that to be careful while doing marine operations and nearshore recreation\.?/gi, 'દરિયાઈ કામગીરી અને કાંઠાના મનોરંજન દરમિયાન સાવચેત રહેવાની સલાહ આપવામાં આવે છે.')
        .replace(/It(?: is)? advised that no immediate action is required\.?(?:\s*Check for updates\.?)?/gi, 'તાત્કાલિક કોઈ પગલાંની જરૂર નથી. અપડેટ્સ તપાસો.')
        .replace(/Fishermen and coastal population are alerted to be cautious/gi, 'માછીમારો અને કાંઠાના લોકોને સાવચેત રહેવા ચેતવણી')
        .replace(/hours on/gi, 'વાગ્યે, તારીખ');
    } else if (this.currentLang === 'or') {
      res = res
        .replace(/for the coast of/gi, 'ଉପକୂଳ ପାଇଁ:')
        .replace(/Swell waves in the range of ([0-9.\s-]+) sec period with ([0-9.\s-]+)\s*(?:m|meters)?\s*height are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$3 ରୁ $4 ମଧ୍ୟରେ $1 ସେକେଣ୍ଡ ବ୍ୟବଧାନ ସହିତ $2 ମିଟର ଉଚ୍ଚତାର ସ୍ୱେଲ୍ ତରଙ୍ଗ ସୃଷ୍ଟି ହେବାର ପୂର୍ବାନୁମାନ କରାଯାଇଛି।')
        .replace(/High waves in the range of ([0-9.\s-]+) meters are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$1 ମିଟର ଉଚ୍ଚତାର ତରଙ୍ଗ $2 ରୁ $3 ମଧ୍ୟରେ ସୃଷ୍ଟି ହେବାର ପୂର୍ବାନୁମାନ କରାଯାଇଛି।')
        .replace(/Surface current speeds in the range of ([0-9.\s-]+) m\/sec are forecasted during (.*?) to (.*?)(?:\.|$)/gi, 'ସ୍ରୋତର ବେଗ $1 ମି/ସେକେଣ୍ଡ $2 ରୁ $3 ମଧ୍ୟରେ ରହିପାରେ।')
        .replace(/Swell waves of height ([0-9.\s-]+) meters/gi, '$1 ମିଟର ଉଚ୍ଚତାର ସ୍ୱେଲ୍ ତରଙ୍ଗ')
        .replace(/from (.*?) To (.*?)(?:\.|$)/gi, '$1 ରୁ $2 ପର୍ଯ୍ୟନ୍ତ।')
        .replace(/It(?: is)? advised that there is a possibility of surging of waves,?\s*boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'ତରଙ୍ଗର ତୀବ୍ରତା ବୃଦ୍ଧି ପାଇବାର ସମ୍ଭାବନା ଥିବାରୁ ଡଙ୍ଗାଗୁଡ଼ିକୁ ଅତ୍ୟନ୍ତ ସତର୍କତାର ସହିତ ଚଳାଇବାକୁ ଏବଂ ଉପକୂଳ ମନୋରଞ୍ଜନରେ ସାବଧାନ ରହିବାକୁ ପରାମର୍ଶ ଦିଆଯାଇଛି।')
        .replace(/It(?: is)? advised that Harbour & [Mm]arine operations to be careful\.?/gi, 'ବନ୍ଦର ଏବଂ ସାମୁଦ୍ରିକ କାର୍ଯ୍ୟକଳାପରେ ସତର୍କ ରହିବାକୁ ପରାମର୍ଶ ଦିଆଯାଇଛି।')
        .replace(/Harbour & [Mm]arine operations to be careful\.?/gi, 'ବନ୍ଦର ଏବଂ ସାମୁଦ୍ରିକ କାର୍ଯ୍ୟକଳାପରେ ସତର୍କ ରହିବାକୁ ପରାମର୍ଶ ଦିଆଯାଇଛି।')
        .replace(/It(?: is)? advised that boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'ଡଙ୍ଗାଗୁଡ଼ିକୁ ସତର୍କତାର ସହିତ ଚଳାଇବାକୁ ଏବଂ ମନୋରଞ୍ଜନରେ ଧ୍ୟାନ ଦେବାକୁ ପରାମର୍ଶ।')
        .replace(/It(?: is)? advised that to be careful while doing marine operations and nearshore recreation\.?/gi, 'ସାମୁଦ୍ରିକ କାର୍ଯ୍ୟକଳାପ ଏବଂ ଉପକୂଳ ମନୋରଞ୍ଜନ ସମୟରେ ସତର୍କ ରହିବାକୁ ପରାମର୍ଶ ଦିଆଯାଇଛି।')
        .replace(/It(?: is)? advised that no immediate action is required\.?(?:\s*Check for updates\.?)?/gi, 'ତୁରନ୍ତ କୌଣସି ପଦକ୍ଷେପ ଆବଶ୍ୟକ ନାହିଁ। ଅଦ୍ୟତନ ସୂଚନା ଯାଞ୍ଚ କରନ୍ତୁ।')
        .replace(/Fishermen and coastal population are alerted to be cautious/gi, 'ମତ୍ସ୍ୟଜୀବୀ ଏବଂ ଉପକୂଳବାସୀଙ୍କୁ ସତର୍କ ରହିବାକୁ ପରାମର୍ଶ')
        .replace(/hours on/gi, 'ଟା ସମୟରେ, ତାରିଖ');
    } else if (this.currentLang === 'kn') {
      res = res
        .replace(/for the coast of/gi, 'ಕರಾವಳಿಗೆ:')
        .replace(/Swell waves in the range of ([0-9.\s-]+) sec period with ([0-9.\s-]+)\s*(?:m|meters)?\s*height are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$3 ರಿಂದ $4 ರ ಅವಧಿಯಲ್ಲಿ $1 ಸೆಕೆಂಡುಗಳ ಕಾಲಾವಧಿಯೊಂದಿಗೆ $2 ಮೀಟರ್ ಎತ್ತರದ ಸ್ವೆಲ್ ಅಲೆಗಳು ಏಳುವ ಮುನ್ಸೂಚನೆಯಿದೆ.')
        .replace(/High waves in the range of ([0-9.\s-]+) meters are forecasted during (.*?) to (.*?)(?:\.|$)/gi, '$1 ಮೀಟರ್ ಎತ್ತರದ ಅಲೆಗಳು $2 ರಿಂದ $3 ರ ಅವಧಿಯಲ್ಲಿ ಏಳುವ ಸಾಧ್ಯತೆಯಿದೆ.')
        .replace(/Surface current speeds in the range of ([0-9.\s-]+) m\/sec are forecasted during (.*?) to (.*?)(?:\.|$)/gi, 'ಪ್ರವಾಹದ ವೇಗ $1 ಮೀ/ಸೆಕೆಂಡ್ $2 ರಿಂದ $3 ರವರೆಗೆ ಇರಬಹುದು.')
        .replace(/Swell waves of height ([0-9.\s-]+) meters/gi, '$1 ಮೀಟರ್ ಎತ್ತರದ ಸ್ವೆಲ್ ಅಲೆಗಳು')
        .replace(/from (.*?) To (.*?)(?:\.|$)/gi, '$1 ರಿಂದ $2 ವರೆಗೆ.')
        .replace(/It(?: is)? advised that there is a possibility of surging of waves,?\s*boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'ಅಲೆಗಳು ತೀವ್ರವಾಗಿ ಅಪ್ಪಳಿಸುವ ಸಾಧ್ಯತೆಯಿರುವುದರಿಂದ ದೋಣಿಗಳನ್ನು ಅತ್ಯಂತ ಜಾಗರೂಕತೆಯಿಂದ ಚಲಾಯಿಸಲು ಮತ್ತು ಕರಾವಳಿ ಮನರಂಜನೆಯಲ್ಲಿ ಎಚ್ಚರಿಕೆ ವಹಿಸಲು ಸಲಹೆ ನೀಡಲಾಗಿದೆ.')
        .replace(/It(?: is)? advised that Harbour & [Mm]arine operations to be careful\.?/gi, 'ಬಂದರು ಮತ್ತು ಸಾಗರ ಕಾರ್ಯಾಚರಣೆಗಳಲ್ಲಿ ಎಚ್ಚರಿಕೆಯಿಂದ ಇರಲು ಸಲಹೆ ನೀಡಲಾಗಿದೆ.')
        .replace(/Harbour & [Mm]arine operations to be careful\.?/gi, 'ಬಂದರು ಮತ್ತು ಸಾಗರ ಕಾರ್ಯಾಚರಣೆಗಳಲ್ಲಿ ಎಚ್ಚರಿಕೆಯಿಂದ ಇರಲು ಸಲಹೆ ನೀಡಲಾಗಿದೆ.')
        .replace(/It(?: is)? advised that boats to ply with utmost vigilance,?\s*recreation with due care\.?/gi, 'ದೋಣಿಗಳನ್ನು ಅತ್ಯಂತ ಜಾಗರೂಕತೆಯಿಂದ ಚಲಾಯಿಸಲು ಮತ್ತು ಮನರಂಜನೆಯಲ್ಲಿ ಕಾಳಜಿ ವಹಿಸಲು ಸಲಹೆ.')
        .replace(/It(?: is)? advised that to be careful while doing marine operations and nearshore recreation\.?/gi, 'ಸಾಗರ ಕಾರ್ಯಾಚರಣೆ ಮತ್ತು ಕರಾವಳಿ ಮನರಂಜನೆಯ ಸಮಯದಲ್ಲಿ ಎಚ್ಚರಿಕೆಯಿಂದ ಇರಲು ಸಲಹೆ ನೀಡಲಾಗಿದೆ.')
        .replace(/It(?: is)? advised that no immediate action is required\.?(?:\s*Check for updates\.?)?/gi, 'ತಕ್ಷಣದ ಯಾವುದೇ ಕ್ರಮ ಅಗತ್ಯವಿಲ್ಲ. ನವೀಕರಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.')
        .replace(/Fishermen and coastal population are alerted to be cautious/gi, 'ಮೀನುಗಾರರು ಮತ್ತು ಕರಾವಳಿ ಜನರು ಎಚ್ಚರಿಕೆಯಿಂದ ಇರಬೇಕು')
        .replace(/hours on/gi, 'ಗಂಟೆಗೆ, ದಿನಾಂಕ');
    }

    // 3. Translate any district or state names mentioned inside the bulletin text (sort by length desc)
    const allReplacements = [
      ...Object.entries(I18N_SECTORS),
      ...Object.entries(I18N_DISTRICTS)
    ].sort((a, b) => b[0].length - a[0].length);

    for (const [key, map] of allReplacements) {
      if (map[this.currentLang] && res.includes(key)) {
        res = res.replaceAll(key, map[this.currentLang]);
      }
    }

    return res;
  },

  translateTectonicSetting(setting) {
    if (!setting) return '';
    const s = String(setting).toUpperCase();
    const label = this.t('seismic.tectonic_setting', 'Tectonic Setting');
    if (s.includes('LAND')) {
      return `${label}: ${this.t('seismic.setting_land', 'LAND')}`;
    }
    return `${label}: ${this.t('seismic.setting_oceanic', 'OCEANIC / MARINE')}`;
  },

  translateBathymetry(bathy) {
    if (!bathy) return '';
    const label = this.t('seismic.bathymetry', 'Bathymetry');
    const s = String(bathy).trim().toUpperCase();
    if (s === 'NIL' || s.includes('NIL')) {
      return `${label}: ${this.t('seismic.bathymetry_nil', 'NIL')}`;
    }
    if (s.includes('LOADING')) {
      return this.t('seismic.bathymetry_loading', 'Bathymetry: loading…');
    }
    if (s.includes('UNAVAILABLE')) {
      return this.t('seismic.bathymetry_unavailable', 'Bathymetry: unavailable');
    }
    return `${label}: ${bathy}`;
  },

  translateCoastDistance(dist) {
    if (!dist) return '';
    const label = this.t('seismic.coast_distance', 'Distance from nearest coast');
    return `${label}: ${dist}`;
  },

  translateItewcText(text) {
    if (!text || typeof text !== 'string') return '';
    if (this.currentLang === 'en') return text;

    let res = text;

    const ITEWC_CORPUS = [
      {
        pattern: /Based on historical earthquake and tsunami data,?\s*Tsunami Threat does not exist for India\.?\s*ITEWC INCOIS will monitor sea level changes near epicentral region and report in case of tsunami threat\.?/gi,
        hi: 'ऐतिहासिक भूकंप और सुनामी आंकड़ों के आधार पर, भारत के लिए कोई सुनामी का खतरा नहीं है। ITEWC INCOIS उपरिकेंद्र क्षेत्र के निकट समुद्र स्तर में परिवर्तन की निगरानी करेगा और सुनामी के खतरे की स्थिति में रिपोर्ट करेगा।',
        ta: 'வரலாற்று நிலநடுக்கம் மற்றும் சுனாமி தரவுகளின் அடிப்படையில், இந்தியாவிற்கு சுனாமி அச்சுறுத்தல் இல்லை. ITEWC INCOIS நிலநடுக்க மையப் பகுதியில் கடல் மட்ட மாற்றங்களை தொடர்ந்து கண்காணித்து, சுனாமி அச்சுறுத்தல் இருப்பின் அறிக்கை வெளியிடும்.',
        te: 'చారిత్రక భూకంప మరియు సునామీ డేటా ఆధారంగా, భారతదేశానికి ఎటువంటి సునామీ ముప్పు లేదు. ITEWC INCOIS భూకంప కేంద్ర ప్రాంత సమీపంలో సముద్ర మట్టాల మార్పులను పర్యవేక్షిస్తుంది మరియు సునామీ ముప్పు ఉన్నట్లయితే నివేదిస్తుంది.',
        ml: 'ചരിത്രപരമായ ഭൂകമ്പ, സുനാമി വിവരങ്ങളുടെ അടിസ്ഥാനത്തിൽ, ഇന്ത്യയ്ക്ക് സുനാമി ഭീഷണി നിലനിൽക്കുന്നില്ല. ITEWC INCOIS ഭൂകമ്പ പ്രഭവകേന്ദ്രത്തിന് സമീപമുള്ള സമുദ്രനിരപ്പ് മാറ്റങ്ങൾ നിരീക്ഷിക്കുകയും സുനാമി ഭീഷണിയുണ്ടെങ്കിൽ റിപ്പോർട്ട് ചെയ്യുകയും ചെയ്യും.',
        bn: 'ঐতিহাসিক ভূমিকম্প ও সুনামি তথ্যের ভিত্তিতে, ভারতের জন্য সুনামির কোনো আশঙ্কা নেই। ITEWC INCOIS উপকেন্দ্রীয় অঞ্চলের কাছে সমুদ্রপৃষ্ঠের পরিবর্তন পর্যবেক্ষণ করবে এবং সুনামির আশঙ্কা থাকলে রিপোর্ট করবে।',
        mr: 'ऐतिहासिक भूकंप आणि त्सुनामी आकडेवारीच्या आधारे भारताला त्सुनामीचा कोणताही धोका नाही. ITEWC INCOIS केंद्रबिंदू क्षेत्राजवळील समुद्राच्या पातळीतील बदलांवर लक्ष ठेवेल आणि त्सुनामीचा धोका असल्यास अहवाल देईल.',
        gu: 'ઐતિહાસિક ધરતીકંપ અને સુનામી ડેટાના આધારે, ભારત માટે કોઈ સુનામી જોખમ નથી. ITEWC INCOIS કેન્દ્રબિંદુ વિસ્તાર નજીક સમુદ્ર સપાટીના ફેરફારો પર નજર રાખશે અને સુનામીના જોખમની સ્થિતિમાં જાણ કરશે.',
        or: 'ଐତିହାସିକ ଭୂକମ୍ପ ଏବଂ ସୁନାମି ତଥ୍ୟ ଆଧାରରେ, ଭାରତ ପାଇଁ କୌଣସି ସୁନାମି ବିପଦ ନାହିଁ। ITEWC INCOIS ଭୂକମ୍ପ କେନ୍ଦ୍ର ଅଞ୍ଚଳ ନିକଟରେ ସମୁଦ୍ର ପତ୍ତନ ପରିବର୍ତ୍ତନ ଉପରେ ନଜର ରଖିବ ଏବଂ ସୁନାମି ବିପଦ ଥିଲେ ସୂଚନା ଦେବ।',
        kn: 'ಐತಿಹಾಸಿಕ ಭೂಕಂಪ ಮತ್ತು ಸುನಾಮಿ ದತ್ತಾಂಶದ ಆಧಾರದ ಮೇಲೆ, ಭಾರತಕ್ಕೆ ಯಾವುದೇ ಸುನಾಮಿ ಅಪಾಯವಿಲ್ಲ. ITEWC INCOIS ಕೇಂದ್ರಬಿಂದು ಪ್ರದೇಶದ ಬಳಿ ಸಮುದ್ರ ಮಟ್ಟದ ಬದಲಾವಣೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ಸುನಾಮಿ ಬೆದರಿಕೆಯ ಸಂದರ್ಭದಲ್ಲಿ ವರದಿ ಮಾಡುತ್ತದೆ.'
      },
      {
        pattern: /Tsunami Threat does not exist for India\.?/gi,
        hi: 'भारत के लिए कोई सुनामी का खतरा नहीं है।',
        ta: 'இந்தியாவிற்கு சுனாமி அச்சுறுத்தல் இல்லை.',
        te: 'భారతదేశానికి ఎటువంటి సునామీ ముప్పు లేదు.',
        ml: 'ഇന്ത്യയ്ക്ക് സുനാമി ഭീഷണി നിലനിൽക്കുന്നില്ല.',
        bn: 'ভারতের জন্য কোনো সুনামির আশঙ্কা নেই।',
        mr: 'भारताला त्सुनामीचा कोणताही धोका नाही.',
        gu: 'ભારત માટે કોઈ સુનામી જોખમ નથી.',
        or: 'ଭାରତ ପାଇଁ କୌଣସି ସୁନାମି ବିପଦ ନାହିଁ।',
        kn: 'ಭಾರತಕ್ಕೆ ಯಾವುದೇ ಸುನಾಮಿ ಅಪಾಯವಿಲ್ಲ.'
      },
      {
        pattern: /This bulletin is being issued as advice\.?\s*Only national\/state\/local authorities and disaster management officers have the authority to make decisions regarding the official threat and warning status in their coastal areas and any action to be taken in response\.?/gi,
        hi: 'यह बुलेटिन सलाह के रूप में जारी किया जा रहा है। केवल राष्ट्रीय/राज्य/स्थानीय अधिकारियों और आपदा प्रबंधन अधिकारियों को अपने तटीय क्षेत्रों में आधिकारिक खतरे और चेतावनी की स्थिति तथा उसके जवाब में की जाने वाली किसी भी कार्रवाई के संबंध में निर्णय लेने का अधिकार है।',
        ta: 'இந்த அறிக்கை ஒரு ஆலோசனையாக மட்டுமே வெளியிடப்படுகிறது. தேசிய, மாநில மற்றும் உள்ளூர் பேரிடர் மேலாண்மை அதிகாரிகளுக்கு மட்டுமே தங்களது கடலோரப் பகுதிகளில் அதிகாரப்பூர்வ எச்சரிக்கை நிலை மற்றும் பாதுகாப்பு நடவடிக்கைகள் குறித்த முடிவுகளை எடுக்கும் அதிகாரம் உள்ளது.',
        te: 'ఈ బులెటిన్ సలహాగా జారీ చేయబడుతోంది. తమ తీర ప్రాంతాలలో అధికారిక ముప్పు మరియు హెచ్చరిక స్థితి అలాగే ప్రతిస్పందనగా తీసుకోవలసిన చర్యల గురించి నిర్ణయాలు తీసుకునే అధికారం జాతీయ/రాష్ట్ర/స్థానిక అధికారులు మరియు విపత్తు నిర్వహణ అధికారులకు మాత్రమే ఉంటుంది.',
        ml: 'ഈ ബുള്ളറ്റിൻ ഒരു ഉപദേശമായി മാത്രമാണ് നൽകുന്നത്. അതത് തീരപ്രദേശങ്ങളിലെ ഔദ്യോഗിക ഭീഷണിയും മുന്നറിയിപ്പ് നിലയും പ്രതികരണമായി സ്വീകരിക്കേണ്ട നടപടികളും സംബന്ധിച്ച് തീരുമാനമെടുക്കാൻ ദേശീയ/സംസ്ഥാന/പ്രാദേശിക അധികാരികൾക്കും ദുരന്തനിവാരണ ഉദ്യോഗസ്ഥർക്കും മാത്രമേ അധികാരമുള്ളൂ.',
        bn: 'এই বুলেটিনটি একটি পরামর্শ হিসেবে জারি করা হচ্ছে। শুধুমাত্র জাতীয়/রাজ্য/স্থানীয় কর্তৃপক্ষ এবং দুর্যোগ ব্যবস্থাপনা কর্মকর্তাদের তাদের উপকূলীয় এলাকায় সরকারি সতর্কতা পরিস্থিতি এবং সেই অনুযায়ী ব্যবস্থা গ্রহণের সিদ্ধান্ত নেওয়ার অধিকার রয়েছে।',
        mr: 'हा बुलेटिन केवळ सल्ला म्हणून जारी केला जात आहे. केवळ राष्ट्रीय/राज्य/स्थानिक अधिकारी आणि आपत्ती व्यवस्थापन अधिकाऱ्यांना त्यांच्या किनारपट्टी भागातील अधिकृत धोक्याची व इशाऱ्याची स्थिती आणि त्यासंदर्भात करावयाच्या कारवाईबाबत निर्णय घेण्याचा अधिकार आहे.',
        gu: 'આ બુલેટિન સલાહ તરીકે જારી કરવામાં આવી રહ્યું છે. માત્ર રાષ્ટ્રીય/રાજ્ય/સ્થાનિક સત્તાવાળાઓ અને આપત્તિ વ્યવસ્થાપન અધિકારીઓ પાસે તેમના દરિયાકાંઠાના વિસ્તારોમાં સત્તાવાર જોખમ અને ચેતવણીની સ્થિતિ તથા લેવાના પગલાં અંગે નિર્ણય લેવાની સત્તા છે.',
        or: 'ଏହି ବୁଲେଟିନ୍ ପରାମର୍ଶ ଭାବରେ ଜାରି କରାଯାଉଛି। କେବଳ ଜାତୀୟ/ରାଜ୍ୟ/ସ୍ଥାନୀୟ କର୍ତ୍ତୃପକ୍ଷ ଏବଂ ବିପର୍ଯ୍ୟୟ ପରିଚାଳନା ଅଧିକାରୀଙ୍କ ପାଖରେ ସେମାନଙ୍କ ଉପକୂଳବର୍ତ୍ତୀ ଅଞ୍ଚଳରେ ସରକାରୀ ବିପଦ ସ୍ଥିତି ଏବଂ ପଦକ୍ଷେପ ନେବା ସମ୍ପର୍କରେ ନିଷ୍ପତ୍ତି ନେବାର ଅଧିକାର ରହିଛି।',
        kn: 'ಈ ಬುಲೆಟಿನ್ ಅನ್ನು ಕೇವಲ ಸಲಹೆಯಾಗಿ ನೀಡಲಾಗುತ್ತಿದೆ. ತಮ್ಮ ಕರಾವಳಿ ಪ್ರದೇಶಗಳಲ್ಲಿ ಅಧಿಕೃತ ಬೆದರಿಕೆ ಮತ್ತು ಎಚ್ಚರಿಕೆಯ ಸ್ಥಿತಿ ಹಾಗೂ ತೆಗೆದುಕೊಳ್ಳಬೇಕಾದ ಯಾವುದೇ ಕ್ರಮಗಳ ಬಗ್ಗೆ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುವ ಅಧಿಕಾರ ರಾಷ್ಟ್ರೀಯ/ರಾಜ್ಯ/ಸ್ಥಳೀಯ ಅಧಿಕಾರಿಗಳು ಮತ್ತು ವಿಪತ್ತು ನಿರ್ವಹಣಾ ಅಧಿಕಾರಿಗಳಿಗೆ ಮಾತ್ರ ಇರುತ್ತದೆ.'
      },
      {
        pattern: /No further bulletins will be issued by ITEWC INCOIS for this event unless additional information becomes available\.?/gi,
        hi: 'अतिरिक्त जानकारी उपलब्ध होने तक ITEWC INCOIS द्वारा इस घटना के लिए कोई अन्य बुलेटिन जारी नहीं किया जाएगा।',
        ta: 'கூடுதல் தகவல்கள் கிடைக்கும் வரை, இந்த நிகழ்வுக்காக ITEWC INCOIS மூலம் மேற்கொண்டு எந்த அறிக்கையும் வெளியிடப்படாது.',
        te: 'మరింత సమాచారం లభ్యమయ్యే వరకు ఈ ఘటనపై ITEWC INCOIS నుండి తదుపరి బులెటిన్లు ఏవీ జారీ చేయబడవు.',
        ml: 'കൂടുതൽ വിവരങ്ങൾ ലഭ്യമാകുന്നതുവരെ ഈ സംഭവത്തിന് ITEWC INCOIS-ൽ നിന്ന് കൂടുതൽ ബുള്ളറ്റിനുകൾ നൽകുന്നതല്ല.',
        bn: 'অতিরিক্ত তথ্য না পাওয়া পর্যন্ত এই ঘটনার জন্য ITEWC INCOIS থেকে আর কোনো বুলেটিন জারি করা হবে না।',
        mr: 'अतिरिक्त माहिती उपलब्ध होईपर्यंत या घटनेसाठी ITEWC INCOIS कडून पुढील कोणतेही बुलेटिन जारी केले जाणार नाही.',
        gu: 'વધારાની માહિતી ઉપલબ્ધ ન થાય ત્યાં સુધી આ ઘટના માટે ITEWC INCOIS દ્વારા આગળ કોઈ બુલેટિન જારી કરવામાં આવશે નહીં.',
        or: 'ଅତିରିକ୍ତ ସୂଚନା ଉପଲବ୍ଧ ନହେବା ପର୍ଯ୍ୟନ୍ତ ଏହି ଘଟଣା ପାଇଁ ITEWC INCOIS ଦ୍ୱାରା ଆଉ କୌଣସି ବୁଲେଟିନ୍ ଜାରି କରାଯିବ ନାହିଁ।',
        kn: 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಲಭ್ಯವಾಗುವವರೆಗೆ ಈ ಘಟನೆಗಾಗಿ ITEWC INCOIS ನಿಂದ ಮುಂದಿನ ಯಾವುದೇ ಬುಲೆಟಿನ್ಗಳನ್ನು ನೀಡಲಾಗುವುದಿಲ್ಲ.'
      },
      {
        pattern: /This is the final bulletin for this event unless additional information becomes available\.?/gi,
        hi: 'अतिरिक्त जानकारी उपलब्ध होने तक यह इस घटना के लिए अंतिम बुलेटिन है।',
        ta: 'கூடுதல் தகவல்கள் கிடைக்கும் வரை, இந்த நிகழ்வுக்கான இறுதி அறிக்கை இதுவாகும்.',
        te: 'మరింత సమాచారం లభ్యమయ్యే వరకు ಈ ಘಟನೆಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಇದು ಕೊನೆಯ ಬುಲೆಟಿನ್.',
        ml: 'കൂടുതൽ വിവരങ്ങൾ ലഭ്യമാകുന്നതുവരെ ഈ സംഭവത്തിനായുള്ള അന്തിമ ബുള്ളറ്റിനാണിത്.',
        bn: 'অতিরিক্ত তথ্য না পাওয়া পর্যন্ত এটি এই ঘটনার জন্য চূড়ান্ত বুলেটিন।',
        mr: 'अतिरिक्त माहिती उपलब्ध होईपर्यंत या घटनेसाठी हे अंतिम बुलेटिन आहे.',
        gu: 'વધારાની માહિતી ઉપલબ્ધ ન થાય ત્યાં સુધી આ ઘટના માટે આ અંતિમ બુલેટિન છે.',
        or: 'ଅତିରିକ୍ତ ସୂଚନା ଉପଲବ୍ଧ ନହେବା ପର୍ଯ୍ୟନ୍ତ ଏହି ଘଟଣା ପାଇଁ ଏହା ଚୂଡ଼ାନ୍ତ ବୁଲେଟିନ୍।',
        kn: 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಲಭ್ಯವಾಗುವವರೆಗೆ ಈ ಘಟನೆಗೆ ಇದು ಅಂತಿಮ ಬುಲೆಟಿನ್ ಆಗಿದೆ.'
      }
    ];

    for (const entry of ITEWC_CORPUS) {
      if (entry[this.currentLang] && entry.pattern.test(res)) {
        res = res.replace(entry.pattern, entry[this.currentLang]);
      }
    }

    return res;
  },

  translateCycloneTitle(title) {
    if (!title || typeof title !== 'string') return '';
    if (this.currentLang === 'en') return title;

    let res = title;

    const CYCLONE_TERMS = {
      'Super Cyclonic Storm': {
        hi: 'सुपर चक्रवाती तूफान', ta: 'சூப்பர் புயல்', te: 'సూపర్ సైక్లోనిక్ తుఫాను',
        ml: 'സൂപ്പർ ചുഴലിക്കാറ്റ്', bn: 'সুপার সাইক্লোনিক ঝড়', mr: 'सुपर चक्रीवादळ',
        gu: 'સુપર ચક્રવાતી તોફાન', or: 'ସୁପର ସାଇକ୍ଲୋନିକ୍ ଝଡ଼', kn: 'ಸೂಪರ್ ಚಂಡಮಾರುತ'
      },
      'Extremely Severe Cyclonic Storm': {
        hi: 'अत्यंत गंभीर चक्रवाती तूफान', ta: 'மிக தீவிர புயல்', te: 'అత్యంత తీవ్రమైన సైక్లోనిక్ తుఫాను',
        ml: 'അതിതീവ്ര ചുഴലിക്കാറ്റ്', bn: 'অত্যন্ত তীব্র সাইক্লোনিক ঝড়', mr: 'अत्यंत तीव्र चक्रीवादळ',
        gu: 'અત્યંત તીવ્ર ચક્રવાતી તોફાન', or: 'ଅତ୍ୟନ୍ତ ଭୀଷଣ ସାମୁଦ୍ରିକ ଝଡ଼', kn: 'ಅತ್ಯಂತ ತೀವ್ರ ಚಂಡಮಾರುತ'
      },
      'Very Severe Cyclonic Storm': {
        hi: 'बहुत गंभीर चक्रवाती तूफान', ta: 'அதிதீவிர புயல்', te: 'చాలా తీవ్రమైన సైక్లోనిక్ తుఫాను',
        ml: 'വളരെ തീവ്രമായ ചുഴലിക്കാറ്റ്', bn: 'খুব তীব্র সাইক্লোনিক ঝড়', mr: 'अति तीव्र चक्रीवादळ',
        gu: 'ખૂબ તીવ્ર ચક્રવાતી તોફાન', or: 'ଅତି ଭୀଷଣ ସାମୁଦ୍ରିକ ଝଡ଼', kn: 'ಬಹಳ ತೀವ್ರ ಚಂಡಮಾರುತ'
      },
      'Severe Cyclonic Storm': {
        hi: 'गंभीर चक्रवाती तूफान', ta: 'தீவிர புயல்', te: 'తీవ్రమైన సైక్లోనిక్ తుఫాను',
        ml: 'തീവ്ര ചുഴലിക്കാറ്റ്', bn: 'তীব্র সাইক্লোনিক ঝড়', mr: 'तीव्र चक्रीवादळ',
        gu: 'તીવ્ર ચક્રવાતી તોફાન', or: 'ଭୀଷଣ ସାମୁଦ୍ରିକ ଝଡ଼', kn: 'ತೀವ್ರ ಚಂಡಮಾರುತ'
      },
      'Cyclonic Storm': {
        hi: 'चक्रवाती तूफान', ta: 'புயல் (Cyclonic Storm)', te: 'సైక్లోనిక్ తుఫాను',
        ml: 'ചുഴലിക്കാറ്റ്', bn: 'ঘূর্ণিঝড় (Cyclonic Storm)', mr: 'चक्रीवादळ',
        gu: 'ચક્રવાતી તોફાન', or: 'ସାମୁଦ୍ରିକ ବାତ୍ୟା', kn: 'ಚಂಡಮಾರುತ'
      },
      'Deep Depression': {
        hi: 'गहरा दबाव (Deep Depression)', ta: 'ஆழ்ந்த காற்றழுத்த தாழ்வு மண்டலம்', te: 'తీవ్ర వాయుగుండం (Deep Depression)',
        ml: 'തീവ്ര ന്യൂനമർദ്ദം (Deep Depression)', bn: 'গভীর নিম্নচাপ (Deep Depression)', mr: 'खोल दाबाचे क्षेत्र (Deep Depression)',
        gu: 'ઊંડું દબાણ (Deep Depression)', or: 'ଗଭୀର ଅବପାତ (Deep Depression)', kn: 'ತೀವ್ರ ವಾಯುಭಾರ ಕುಸಿತ (Deep Depression)'
      },
      'Depression': {
        hi: 'दबाव (Depression)', ta: 'காற்றழுத்த தாழ்வு மண்டலம்', te: 'వాయుగుండం (Depression)',
        ml: 'ന്യൂനമർദ്ദം (Depression)', bn: 'নিম্নচাপ (Depression)', mr: 'कमी दाबाचे क्षेत्र (Depression)',
        gu: 'દબાણ (Depression)', or: 'ଅବପାତ (Depression)', kn: 'ವಾಯುಭಾರ ಕುಸಿತ (Depression)'
      },
      'Well Marked Low Pressure Area': {
        hi: 'सुस्पष्ट निम्न दबाव क्षेत्र', ta: 'நன்கு வலுப்பெற்ற காற்றழுத்த தாழ்வு பகுதி', te: 'బాగా బలపడిన అల్పపీడన ప్రాంతం',
        ml: 'ശക്തമായ ന്യൂനമർദ്ദ മേഖല', bn: 'সুস্পষ্ট নিম্নচাপ অঞ্চল', mr: 'स्पष्ट कमी दाबाचे क्षेत्र',
        gu: 'સુસ્પષ્ટ નીચા દબાણવાળો વિસ્તાર', or: 'ସୁସ୍ପଷ୍ଟ ଲଘୁଚାପ କ୍ଷେତ୍ର', kn: 'ಉತ್ತಮವಾಗಿ ಗುರುತಿಸಲಾದ ಕಡಿಮೆ ಒತ್ತಡದ ಪ್ರದೇಶ'
      },
      'Low Pressure Area': {
        hi: 'निम्न दबाव क्षेत्र', ta: 'காற்றழுத்த தாழ்வு பகுதி', te: 'అల్పపీడన ప్రాంతం',
        ml: 'ന്യൂനമർദ്ദ മേഖല', bn: 'নিম্নচাপ অঞ্চল', mr: 'कमी दाबाचे क्षेत्र',
        gu: 'નીચા દબાણવાળો વિસ્તાર', or: 'ଲଘୁଚାପ କ୍ଷେତ୍ର', kn: 'ಕಡಿಮೆ ಒತ್ತಡದ ಪ್ರದೇಶ'
      },
      'Bay of Bengal': {
        hi: 'बंगाल की खाड़ी', ta: 'வங்காள விரிகுடா', te: 'బంగాళాఖాతం',
        ml: 'ബംഗാൾ ഉൾക്കടൽ', bn: 'বঙ্গোপসাগর', mr: 'बंगालचा उपसागर',
        gu: 'બંગાળની ખાડી', or: 'ବଙ୍ଗୋପସାଗର', kn: 'ಬಂಗಾಳಕೊಲ್ಲಿ'
      },
      'Arabian Sea': {
        hi: 'अरब सागर', ta: 'அரபிக்கடல்', te: 'అరేబియా సముద్రం',
        ml: 'അറബിക്കടൽ', bn: 'আরব সাগর', mr: 'अरबी समुद्र',
        gu: 'અરબી સમુદ્ર', or: 'ଆରବ ସାଗର', kn: 'ಅರಬ್ಬಿ ಸಮುದ್ರ'
      },
      'Indian Ocean': {
        hi: 'हिंद महासागर', ta: 'இந்தியப் பெருங்கடல்', te: 'హిందూ మహాసముద్రం',
        ml: 'ഇന്ത്യൻ മഹാസമുദ്രം', bn: 'ভারত মহাসাগর', mr: 'हिंदी महासागर',
        gu: 'હિંદ મહાસાગર', or: 'ଭାରତ ମହାସାଗର', kn: 'ಹಿಂದೂ ಮಹಾಸಾಗರ'
      },
      'northwest': {
        hi: 'उत्तर-पश्चिम', ta: 'வடமேற்கு', te: 'వాయవ్య',
        ml: 'വടക്കുപടിഞ്ഞാറൻ', bn: 'উত্তর-পশ্চিম', mr: 'वायव्य',
        gu: 'ઉત્તર-પશ્ચિમ', or: 'ଉତ୍ତର-ପଶ୍ଚିମ', kn: 'ವಾಯುವ್ಯ'
      },
      'northeast': {
        hi: 'उत्तर-पूर्व', ta: 'வடகிழக்கு', te: 'ఈశాన్య',
        ml: 'വടക്കുകിഴക്കൻ', bn: 'উত্তর-পূর্ব', mr: 'ईशान्य',
        gu: 'ઉત્તર-પૂર્વ', or: 'ଉତ୍ତର-ପୂର୍ବ', kn: 'ಈಶಾನ್ಯ'
      },
      'southwest': {
        hi: 'दक्षिण-पश्चिम', ta: 'தென்மேற்கு', te: 'నైరుతి',
        ml: 'തെക്കുപടിഞ്ഞാറൻ', bn: 'দক্ষিণ-পশ্চিম', mr: 'नैऋत्य',
        gu: 'દક્ષિણ-પશ્ચિમ', or: 'ଦକ୍ଷିଣ-ପଶ୍ଚିମ', kn: 'ನೈಋತ್ಯ'
      },
      'southeast': {
        hi: 'दक्षिण-पूर्व', ta: 'தென்கிழக்கு', te: 'ఆగ్నేయ',
        ml: 'തെക്കുകിഴക്കൻ', bn: 'দক্ষিণ-পূর্ব', mr: 'आग्नेय',
        gu: 'દક્ષિણ-પૂર્વ', or: 'ଦକ୍ଷିଣ-ପୂର୍ବ', kn: 'ಆಗ್ನೇಯ'
      },
      'eastcentral': {
        hi: 'पूर्व-मध्य', ta: 'கிழக்கு-மத்திய', te: 'తూర్పు-మధ్య',
        ml: 'കിഴക്കൻ-മധ്യ', bn: 'পূর্ব-মধ্য', mr: 'पूर्व-मध्य',
        gu: 'પૂર્વ-મધ્ય', or: 'ପୂର୍ବ-ମଧ୍ୟ', kn: 'ಪೂರ್ವ-ಮಧ್ಯ'
      },
      'westcentral': {
        hi: 'पश्चिम-मध्य', ta: 'மேற்கு-மத்திய', te: 'పశ్చిಮ-మధ్య',
        ml: 'പടിഞ്ഞാറൻ-മധ്യ', bn: 'পশ্চিম-মধ্য', mr: 'पश्चिम-मध्य',
        gu: 'પશ્ચિમ-મધ્ય', or: 'ପଶ୍ଚିಮ-ମଧ୍ୟ', kn: 'ಪಶ್ಚಿಮ-ಮಧ್ಯ'
      },
      'and adjoining areas of': {
        hi: 'और आसपास के क्षेत्रों', ta: 'மற்றும் அதனை ஒட்டியுள்ள பகுதிகள்', te: 'మరియు పరిసర ప్రాంతాలు',
        ml: 'അതിനോട് ചേർന്ന പ്രദേശങ്ങൾ', bn: 'এবং সংলগ্ন এলাকা', mr: 'आणि लगतचा परिसर',
        gu: 'અને તેની આસપાસના વિસ્તારો', or: 'ଏବଂ ଏହାର ଆଖପାଖ ଅଞ୍ଚଳ', kn: 'ಮತ್ತು ಪಕ್ಕದ ಪ್ರದೇಶಗಳು'
      },
      'adjoining areas of': {
        hi: 'आसपास के क्षेत्रों', ta: 'ஒட்டியுள்ள பகுதிகள்', te: 'పరిసర ప్రాంతాలు',
        ml: 'ചേർന്ന പ്രദേശങ്ങൾ', bn: 'সংলগ্ন এলাকা', mr: 'लगतचा परिसर',
        gu: 'આસપાસના વિસ્તારો', or: 'ଆଖପାଖ ଅଞ୍ଚଳ', kn: 'ಪಕ್ಕದ ಪ್ರದೇಶಗಳು'
      },
      'coasts': {
        hi: 'तट', ta: 'கடற்கரைகள்', te: 'తీరాలు',
        ml: 'തീരങ്ങൾ', bn: 'উপকূল', mr: 'किनारपट्टी',
        gu: 'કાંઠો', or: 'ଉପକୂଳ', kn: 'ಕರಾವಳಿ'
      },
      'coast': {
        hi: 'तट', ta: 'கடற்கரை', te: 'తీరం',
        ml: 'തീരം', bn: 'উপকূল', mr: 'किनारा',
        gu: 'કાંઠો', or: 'ଉପକୂଳ', kn: 'ಕರಾವಳಿ'
      },
      'over': {
        hi: 'पर', ta: 'மீது', te: 'మీద',
        ml: 'മീതെ', bn: 'উপর', mr: 'वर',
        gu: 'પર', or: 'ଉପରେ', kn: 'ಮೇಲೆ'
      }
    };

    for (const [term, map] of Object.entries(CYCLONE_TERMS)) {
      if (map[this.currentLang] && new RegExp(`\\b${term}\\b`, 'i').test(res)) {
        res = res.replace(new RegExp(`\\b${term}\\b`, 'gi'), map[this.currentLang]);
      }
    }

    const allReplacements = [
      ...Object.entries(I18N_SECTORS),
      ...Object.entries(I18N_DISTRICTS)
    ].sort((a, b) => b[0].length - a[0].length);

    for (const [key, map] of allReplacements) {
      if (map[this.currentLang] && res.includes(key)) {
        res = res.replaceAll(key, map[this.currentLang]);
      }
    }

    return res;
  },

  renderLanguageSelect() {
    const select = document.getElementById('appLangSelect');
    if (!select) return;
    select.innerHTML = APP_LANGUAGES.map(lang => `
      <option value="${lang.code}" ${lang.code === this.currentLang ? 'selected' : ''}>
        ${lang.native}
      </option>
    `).join('');

    select.addEventListener('change', (e) => {
      this.setLanguage(e.target.value);
    });
  },

  translatePage(langCode) {
    const lang = I18N_DICTIONARY[langCode] ? langCode : 'en';
    const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.en;

    document.documentElement.lang = lang;

    // 1. Translate all DOM nodes with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // 2. Translate placeholders / aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key]) {
        el.setAttribute('aria-label', dict[key]);
      }
    });

    // 3. Update dynamic severity labels
    if (typeof severityLabel !== 'undefined') {
      severityLabel.warning = dict['severity.warning'] || 'Warning';
      severityLabel.alert = dict['severity.alert'] || 'Alert';
      severityLabel.watch = dict['severity.watch'] || 'Watch';
      severityLabel.noThreat = dict['severity.no_threat'] || 'No Threat';
    }
  }
};

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => globalThis.i18n.init());
  } else {
    globalThis.i18n.init();
  }
}
