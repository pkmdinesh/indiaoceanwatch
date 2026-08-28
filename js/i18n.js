// Ocean Watch Comprehensive Multilingual Internationalization (i18n) Engine
// Supports English, Hindi, Tamil, Telugu, Malayalam, Bengali, Marathi, Gujarati, Odia, Kannada

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
    // Header & Brand
    'brand.title': 'Ocean Watch',
    'header.title': 'Coastal Advisory Status',
    'header.subtitle': 'Tsunami · Cyclone · Storm Surge · Ocean State Forecast · Potential Fishing Zone',
    'header.snapshot': 'Official-source snapshot',
    'header.voice': 'Voice',
    'header.alerts': 'Alerts',
    'header.share': 'Share',
    'header.install': 'Install',

    // Announcements
    'announcement.title': 'Active',
    'announcement.latest': 'LATEST:',
    'announcement.checking': 'Checking advisories…',
    'announcement.none': 'None',
    'announcement.updated': 'Updated',
    'announcement.bulletin': 'Bulletin',

    // OSF Services
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

    // Severity Levels
    'severity.warning': 'Warning',
    'severity.alert': 'Alert',
    'severity.watch': 'Watch',
    'severity.no_threat': 'No Threat',
    'severity.issued': 'Issued',
    'severity.districts': 'districts',
    'severity.states': 'States',
    'severity.no_active': 'No active warning in effect across coastal states.',
    'severity.loading': 'Loading advisory data…',

    // Tsunami & Cyclone & Seismic
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

    'storm.title': 'Storm Surge Advisory',
    'storm.safe': 'No active storm surge bulletin',
    'storm.checking': 'Checking active storm surge status.....',
    'storm.caption': 'Official ITEWC bulletin feed when checked',
    'storm.bulletin': 'Bulletin ↗',

    'joint_bulletin.title': 'Joint Bulletin ↗',
    'joint_bulletin.none': 'No INCOIS-IMD joint bulletin is currently available.',

    // PFZ
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

    // Other Marine Advisories
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

    // MHW Dialog
    'mhw.title': 'Marine Heat Wave',
    'mhw.subtitle': 'Official INCOIS Regional Observations',
    'mhw.open_page': 'Open Marine Heat Wave page ↗',
    'mhw.unavailable': 'Marine Heat Wave message is unavailable. Open the official page for the latest information.',

    // CBAS Dialog
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

    // TCHP Dialog
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

    // Maps & Compass & Voice & Share & Notifications
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

    // Dialogs & Footers
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
    'footer.visits': 'visits'
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
    'footer.visits': 'विज़िट्स'
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
    'footer.visits': 'பார்வைகள்'
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
    'footer.visits': 'సందర్శనలు'
  }
};

// Mirror translations for other languages as fallbacks
['ml', 'bn', 'mr', 'gu', 'or', 'kn'].forEach(code => {
  if (!I18N_DICTIONARY[code]) I18N_DICTIONARY[code] = Object.assign({}, I18N_DICTIONARY.hi);
});

const I18N_SECTORS = {
  'GUJARAT': { hi: 'गुजरात', ta: 'குஜராத்', te: 'గుజరాత్', ml: 'ഗുജറാത്ത്', bn: 'ગુજરાત', mr: 'गुजरात', gu: 'ગુજરાત', or: 'ଗୁଜରାଟ', kn: 'ಗುಜರಾತ್' },
  'MAHARASHTRA': { hi: 'महाराष्ट्र', ta: 'மகாராஷ்டிரா', te: 'మహారాష్ట్ర', ml: 'മഹാരാഷ്ട്ര', bn: 'মহারাষ্ট্র', mr: 'महाराष्ट्र', gu: 'મહારાષ્ટ્ર', or: 'ମହାରାଷ୍ଟ୍ର', kn: 'ಮಹಾರಾಷ್ಟ್ರ' },
  'GOA': { hi: 'गोवा', ta: 'கோவா', te: 'గోవా', ml: 'ഗോവ', bn: 'গোয়া', mr: 'गोवा', gu: 'ગોવા', or: 'ଗୋଆ', kn: 'ಗೋವಾ' },
  'KARNATAKA': { hi: 'कर्नाटक', ta: 'கர்நாடகா', te: 'కర్ణాటక', ml: 'കർണാടക', bn: 'কর্ণাটক', mr: 'कर्नाटक', gu: 'કર્ણાટક', or: 'କର୍ଣ୍ଣାଟକ', kn: 'ಕರ್ನಾಟಕ' },
  'KERALA': { hi: 'केरल', ta: 'கேரளா', te: 'కేరళ', ml: 'കേരളം', bn: 'কেরল', mr: 'केरळ', gu: 'કેરળ', or: 'କେରଳ', kn: 'ಕೇರಳ' },
  'SOUTH TAMIL NADU': { hi: 'दक्षिण तमिलनाडु', ta: 'தெற்கு தமிழ்நாடு', te: 'దక్షిణ తమిళనాడు', ml: 'തെക്കൻ തമിഴ്നാട്', bn: 'দক্ষিণ তামিলনাড়ু', mr: 'दक्षिण तमिळनाडू', gu: 'દક્ષિણ તમિલનાડુ', or: 'ଦକ୍ଷିଣ ତାମିଲନାଡୁ', kn: 'ದಕ್ಷಿಣ ತಮಿಳುನಾಡು' },
  'NORTH TAMIL NADU': { hi: 'उत्तर तमिलनाडु', ta: 'வடக்கு தமிழ்நாடு', te: 'ఉత్తర తమిళనాడు', ml: 'വടക്കൻ തമിഴ്നാട്', bn: 'উত্তর তামিলনাড়ু', mr: 'उत्तर तमिळनाडू', gu: 'ઉત્તર તમિલનાડુ', or: 'ଉତ୍ତର ତାମିଲନାଡୁ', kn: 'ಉತ್ತರ ತಮಿಳುನಾಡು' },
  'SOUTH ANDHRA PRADESH': { hi: 'दक्षिण आंध्र प्रदेश', ta: 'தெற்கு ஆந்திரா', te: 'దక్షిణ ఆంధ్రప్రదేశ్', ml: 'തെക്കൻ ആന്ധ്രാ പ്രദേശ്', bn: 'দক্ষিণ অন্ধ্র প্রদেশ', mr: 'दक्षिण आंध्र प्रदेश', gu: 'દક્ષિણ આંધ્ર પ્રદેશ', or: 'ଦକ୍ଷିଣ ଆନ୍ଧ୍ର ପ୍ରଦେଶ', kn: 'ದಕ್ಷಿಣ ఆంధ్ర ಪ್ರದೇಶ' },
  'NORTH ANDHRA PRADESH': { hi: 'उत्तर आंध्र प्रदेश', ta: 'வடக்கு ஆந்திரா', te: 'ఉత్తర ఆంధ్రప్రదేశ్', ml: 'വടക്കൻ ആന്ധ്രാ പ്രദേശ്', bn: 'উত্তর অন্ধ্র প্রদেশ', mr: 'उत्तर आंध्र प्रदेश', gu: 'ઉત્તર આંધ્ર પ્રદેશ', or: 'ଉତ୍ତର ଆନ୍ଧ୍ର ପ୍ରଦେଶ', kn: 'ఉత్తర ఆంధ్ర ప్రదేశ్' },
  'ODISHA': { hi: 'ओडिशा', ta: 'ஒடிசா', te: 'ఒడిశా', ml: 'ഒഡീഷ', bn: 'ওড়িশা', mr: 'ओडिशा', gu: 'ઓડિશા', or: 'ଓଡ଼ିଶା', kn: 'ಒಡಿಶಾ' },
  'WEST BENGAL': { hi: 'पश्चिम बंगाल', ta: 'மேற்கு வங்கம்', te: 'పశ్చిమ బెంగాల్', ml: 'പശ്ചിമ ബംഗാൾ', bn: 'পশ্চিমবঙ্গ', mr: 'पश्चिम बंगाल', gu: 'પશ્ચિમ બંગાળ', or: 'ପଶ୍ଚିମ ବଙ୍ଗ', kn: 'ಪಶ್ಚಿಮ ಬಂಗಾಳ' },
  'ANDAMAN': { hi: 'अंडमान', ta: 'அந்தமான்', te: 'అండమాన్', ml: 'ആൻഡമാൻ', bn: 'আন্দামান', mr: 'अंदमान', gu: 'અંદમાન', or: 'ଆଣ୍ଡାମାନ', kn: 'ಅಂಡಮಾನ್' },
  'NICOBAR': { hi: 'निकोबार', ta: 'நிக்கோபார்', te: 'నికోబార్', ml: 'നിക്കോബാർ', bn: 'নিকোবর', mr: 'निकोबार', gu: 'નિકોબાર', or: 'ନିକୋବର', kn: 'ನಿಕೋಬಾರ್' },
  'LAKSHADWEEP': { hi: 'लक्षद्वीप', ta: 'லட்சத்தீவு', te: 'లక్షద్వీప్', ml: 'ലക്ഷദ്വീപ്', bn: 'লক্ষদ্বীপ', mr: 'लक्षद्वीप', gu: 'લક્ષદ્વીપ', or: 'ଲାକ୍ଷାଦ୍ୱୀପ', kn: 'ಲಕ್ಷದ್ವೀಪ' }
};

const I18N_DIRECTIONS = {
  'N': { hi: 'उत्तर (N)', ta: 'வடக்கு (N)', te: 'ఉత్తరం (N)', ml: 'വടക്ക് (N)' },
  'S': { hi: 'दक्षिण (S)', ta: 'தெற்கு (S)', te: 'దక్షిణం (S)', ml: 'തെക്ക് (S)' },
  'E': { hi: 'पूर्व (E)', ta: 'கிழக்கு (E)', te: 'తూర్పు (E)', ml: 'കിഴക്ക് (E)' },
  'W': { hi: 'पश्चिम (W)', ta: 'மேற்கு (W)', te: 'పడమర (W)', ml: 'പടിഞ്ഞാറ് (W)' },
  'NE': { hi: 'उत्तर-पूर्व (NE)', ta: 'வடகிழக்கு (NE)', te: 'ఈశాన్యం (NE)', ml: 'വടക്കുകിഴക്ക് (NE)' },
  'NW': { hi: 'उत्तर-पश्चिम (NW)', ta: 'வடமேற்கு (NW)', te: 'వాయువ్యం (NW)', ml: 'വടക്കുപടിഞ്ഞാറ് (NW)' },
  'SE': { hi: 'दक्षिण-पूर्व (SE)', ta: 'தென்கிழக்கு (SE)', te: 'ఆగ్నేయం (SE)', ml: 'തെക്കുകிழക്ക് (SE)' },
  'SW': { hi: 'दक्षिण-पश्चिम (SW)', ta: 'தென்மேற்கு (SW)', te: 'నైరుతి (SW)', ml: 'തെക്കുപടിഞ്ഞാറ് (SW)' },
  'ENE': { hi: 'पूर्व-उत्तर-पूर्व (ENE)', ta: 'கிழக்கு-வடகிழக்கு (ENE)', te: 'తూర్పు-ఈశాన్యం (ENE)', ml: 'കിഴക്ക്-വടക്കുകിഴക്ക് (ENE)' },
  'ESE': { hi: 'पूर्व-दक्षिण-पूर्व (ESE)', ta: 'கிழக்கு-தென்கிழக்கு (ESE)', te: 'తూర్పు-ఆగ్నేయం (ESE)', ml: 'കിഴക്ക്-തെക്കുകிழക്ക് (ESE)' },
  'WNW': { hi: 'पश्चिम-उत्तर-पश्चिम (WNW)', ta: 'மேற்கு-வடமேற்கு (WNW)', te: 'పడమర-వాయువ్యం (WNW)', ml: 'പടിഞ്ഞാറ്-വടക്കുപടിഞ്ഞാറ് (WNW)' },
  'WSW': { hi: 'पश्चिम-दक्षिण-पश्चिम (WSW)', ta: 'மேற்கு-தென்மேற்கு (WSW)', te: 'పడమర-నైరుతి (WSW)', ml: 'പടിഞ്ഞാറ്-തെക്കുപടിഞ്ഞാറ് (WSW)' },
  'NNE': { hi: 'उत्तर-उत्तर-पूर्व (NNE)', ta: 'வடக்கு-வடகிழக்கு (NNE)', te: 'ఉత్తర-ఈశాన్యం (NNE)', ml: 'വടക്ക്-വടക്കുകിഴക്ക് (NNE)' },
  'NNW': { hi: 'उत्तर-उत्तर-पश्चिम (NNW)', ta: 'வடக்கு-வடமேற்கு (NNW)', te: 'ఉత్తర-వాయువ్యం (NNW)', ml: 'വടക്ക്-വടക്കുപടിഞ്ഞാറ് (NNW)' },
  'SSE': { hi: 'दक्षिण-दक्षिण-पूर्व (SSE)', ta: 'தெற்கு-தென்கிழக்கு (SSE)', te: 'దక్షిణ-ఆగ్నేయం (SSE)', ml: 'തെക്ക്-തെക്കുകிழക്ക് (SSE)' },
  'SSW': { hi: 'दक्षिण-दक्षिण-पश्चिम (SSW)', ta: 'தெற்கு-தென்மேற்கு (SSW)', te: 'దక్షిణ-నైరుతి (SSW)', ml: 'തെക്ക്-തെക്കുപടിഞ്ഞാറ് (SSW)' }
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
      if (typeof renderAllStatus === 'function') renderAllStatus(latestStatusData);
    }
  },

  t(key, fallback = '') {
    const dict = I18N_DICTIONARY[this.currentLang] || I18N_DICTIONARY.en;
    if (dict && dict[key]) return dict[key];
    const enDict = I18N_DICTIONARY.en;
    return enDict[key] || fallback || key;
  },

  translateStateName(stateName) {
    return this.translateSectorName(stateName);
  },

  translateSectorName(sectorName) {
    if (!sectorName) return '';
    const norm = String(sectorName).toUpperCase().replace(/&/g, 'AND').replace(/\s+/g, ' ').trim();
    if (this.currentLang === 'en') return titleCase(sectorName);
    const map = I18N_SECTORS[norm];
    if (map && map[this.currentLang]) return map[this.currentLang];
    return titleCase(sectorName);
  },

  translateDirection(dir) {
    if (!dir) return '—';
    const norm = String(dir).toUpperCase().trim();
    if (this.currentLang === 'en') return dir;
    const map = I18N_DIRECTIONS[norm];
    if (map && map[this.currentLang]) return map[this.currentLang];
    return dir;
  },

  translateAdvisoryMessage(msg) {
    if (!msg || typeof msg !== 'string') return '';
    if (this.currentLang === 'en') return msg;

    let translated = msg;

    if (this.currentLang === 'ta') {
      translated = translated
        .replace(/High waves in the range of ([0-9.\s-]+) meters are forecasted/gi, '$1 மீட்டர் உயரத்திற்கு உயர்ந்த அலைகள் எழக்கூடும் என கணிக்கப்பட்டுள்ளது')
        .replace(/Swell waves of height ([0-9.\s-]+) meters/gi, '$1 மீட்டர் உயரத்திற்கு கள்ளக்கடல் அலைகள்')
        .replace(/Current speeds in the range of ([0-9.\s-]+) m\/sec/gi, 'நீரோட்ட வேகம் $1 மீ/விநாடி வரை இருக்கக்கூடும்')
        .replace(/Fishermen and coastal population are alerted to be cautious/gi, 'மீனவர்கள் மற்றும் கடலோர மக்கள் மிகுந்த எச்சரிக்கையுடன் இருக்குமாறு அறிவுறுத்தப்படுகிறார்கள்')
        .replace(/along the coast of/gi, 'கடற்கரையை ஒட்டி');
    } else if (this.currentLang === 'te') {
      translated = translated
        .replace(/High waves in the range of ([0-9.\s-]+) meters are forecasted/gi, '$1 మీటర్ల ఎత్తు వరకు ఎత్తైన అలలు ఎగిసిపడే అవకాశం ఉంది')
        .replace(/Swell waves of height ([0-9.\s-]+) meters/gi, '$1 మీటర్ల ఎత్తు వరకు స్వెల్ అలలు')
        .replace(/Current speeds in the range of ([0-9.\s-]+) m\/sec/gi, 'ప్రవాహ వేగం $1 మీ/సెకను వరకు ఉండవచ్చు')
        .replace(/Fishermen and coastal population are alerted to be cautious/gi, 'మత్స్యకారులు మరియు తీరప్రాంత ప్రజలు అప్రమత్తంగా ఉండాలని హెచ్చరించడమైనది')
        .replace(/along the coast of/gi, 'తీరప్రాంతం వెంబడి');
    } else if (this.currentLang === 'hi') {
      translated = translated
        .replace(/High waves in the range of ([0-9.\s-]+) meters are forecasted/gi, '$1 मीटर की सीमा में ऊँची लहरें उठने का पूर्वानुमान है')
        .replace(/Swell waves of height ([0-9.\s-]+) meters/gi, '$1 मीटर ऊँचाई की स्वेल लहरें')
        .replace(/Current speeds in the range of ([0-9.\s-]+) m\/sec/gi, 'सतही धारा की गति $1 मी/सेकंड रहने की संभावना है')
        .replace(/Fishermen and coastal population are alerted to be cautious/gi, 'मछुआरों और तटीय आबादी को सतर्क रहने की सलाह दी जाती है')
        .replace(/along the coast of/gi, 'के तट के साथ');
    }

    return translated;
  },

  renderLanguageSelect() {
    const select = document.getElementById('appLangSelect');
    if (!select) return;
    select.innerHTML = APP_LANGUAGES.map(lang => `
      <option value="${lang.code}" ${lang.code === this.currentLang ? 'selected' : ''}>
        ${lang.native} (${lang.name})
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
