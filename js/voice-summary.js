// Lightweight Multilingual Voice and Text Bulletin Engine
// Uses native browser Web Speech API (0 KB external library overhead)

const VOICE_LANGUAGES = Object.freeze([
  { code: 'en-IN', name: 'English', native: 'English', voicePrefix: 'en', voiceNames: ['india', 'english'] },
  { code: 'hi-IN', name: 'Hindi', native: 'हिन्दी', voicePrefix: 'hi', voiceNames: ['hindi', 'हिन्दी'] },
  { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்', voicePrefix: 'ta', voiceNames: ['tamil', 'தமிழ்', 'valluvar'] },
  { code: 'te-IN', name: 'Telugu', native: 'తెలుగు', voicePrefix: 'te', voiceNames: ['telugu', 'తెలుగు', 'heera', 'mohan'] },
  { code: 'ml-IN', name: 'Malayalam', native: 'മലയാളം', voicePrefix: 'ml', voiceNames: ['malayalam', 'മലയാളം'] },
  { code: 'bn-IN', name: 'Bengali', native: 'বাংলা', voicePrefix: 'bn', voiceNames: ['bengali', 'bangla', 'বাংলা'] },
  { code: 'mr-IN', name: 'Marathi', native: 'मराठी', voicePrefix: 'mr', voiceNames: ['marathi', 'मराठी'] },
  { code: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી', voicePrefix: 'gu', voiceNames: ['gujarati', 'ગુજરાતી'] },
  { code: 'or-IN', name: 'Odia', native: 'ଓଡ଼ିଆ', voicePrefix: 'or', voiceNames: ['odia', 'oriya', 'ଓଡ଼ିଆ'] },
  { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ', voicePrefix: 'kn', voiceNames: ['kannada', 'ಕನ್ನಡ'] }
]);

const REGIONAL_STATE_NAMES = {
  'ANDAMAN AND NICOBAR': { ta: 'அந்தமான் மற்றும் நிக்கோபார்', te: 'అండమాన్ మరియు నికోబార్', ml: 'ആൻഡമാൻ നിക്കോബാർ', hi: 'अंडमान एवं निकोबार', bn: 'আন্দামান ও নিকোবর' },
  'ANDHRA PRADESH': { ta: 'ஆந்திர பிரதேசம்', te: 'ఆంధ్రప్రదేశ్', ml: 'ആന്ധ്രാപ്രദേശ്', hi: 'आंध्र प्रदेश', bn: 'অন্ধ্রপ্রদেশ' },
  'GOA': { ta: 'கோவா', te: 'గోవా', ml: 'ഗോവ', hi: 'गोवा', bn: 'গোয়া' },
  'GUJARAT': { ta: 'குஜராத்', te: 'గుజరాత్', ml: 'ഗുജറാത്ത്', hi: 'गुजरात', bn: 'গুজরাট' },
  'KARNATAKA': { ta: 'கர்நாடகா', te: 'కర్ణాటక', ml: 'കർണാടക', hi: 'कर्नाटक', bn: 'কর্ণাটক' },
  'KERALA': { ta: 'கேரளா', te: 'కేరళ', ml: 'കേരളം', hi: 'केरल', bn: 'কেরালা' },
  'LAKSHADWEEP': { ta: 'லட்சத்தீவு', te: 'లక్షద్వీప్', ml: 'ലക്ഷദ്വീപ്', hi: 'लक्षद्वीप', bn: 'লক্ষদ্বীপ' },
  'MAHARASHTRA': { ta: 'மகாராஷ்டிரா', te: 'మహారాష్ట్ర', ml: 'മഹാരാഷ്ട്ര', hi: 'महाराष्ट्र', bn: 'মহারাষ্ট্র' },
  'ODISHA': { ta: 'ஒடிசா', te: 'ఒడిశా', ml: 'ഒഡീഷ', hi: 'ओडिशा', bn: 'ওড়িশা' },
  'TAMIL NADU': { ta: 'தமிழ்நாடு', te: 'తమిళనాడు', ml: 'തമിഴ്‌നാട്', hi: 'तमिलनाडु', bn: 'তামিলনাড়ু' },
  'WEST BENGAL': { ta: 'மேற்கு வங்கம்', te: 'పశ్చిమ బెంగాల్', ml: 'പശ്ചിമ ബംഗാൾ', hi: 'पश्चिम बंगाल', bn: 'পশ্চিমবঙ্গ' },
  'DAMAN AND DIU': { ta: 'தாமன் மற்றும் தியூ', te: 'దామన్ మరియు దియు', ml: 'ദാമൻ ദിയു', hi: 'दमन एवं दीव', bn: 'দমন ও দিউ' },
  'PUDUCHERRY': { ta: 'புதுச்சேரி', te: 'పుదుచ్చేరి', ml: 'പുതുച്ചേരി', hi: 'पुडुचेरी', bn: 'পুদুচেরি' }
};

function translateStateName(stateName, langPrefix) {
  const norm = String(stateName || '').toUpperCase().trim();
  if (REGIONAL_STATE_NAMES[norm] && REGIONAL_STATE_NAMES[norm][langPrefix]) {
    return REGIONAL_STATE_NAMES[norm][langPrefix];
  }
  return stateName;
}

var selectedVoiceLang = 'en-IN';
var isSpeechPlaying = false;
var availableBrowserVoices = [];

function loadVoices() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    availableBrowserVoices = window.speechSynthesis.getVoices() || [];
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function findBestVoice(langConfig) {
  if (!availableBrowserVoices || !availableBrowserVoices.length) loadVoices();
  if (!availableBrowserVoices.length) return null;

  const targetCode = langConfig.code.toLowerCase().replace('_', '-');
  const targetPrefix = langConfig.voicePrefix.toLowerCase();
  const searchNames = (langConfig.voiceNames || []).map(n => n.toLowerCase());

  // 1. Exact match code (e.g. ta-IN or ta_IN)
  let match = availableBrowserVoices.find(v => {
    const vLang = (v.lang || '').toLowerCase().replace('_', '-');
    return vLang === targetCode;
  });
  if (match) return match;

  // 2. Starts with language prefix (e.g. ta, ta-LK, hi, hi-IN)
  match = availableBrowserVoices.find(v => {
    const vLang = (v.lang || '').toLowerCase().replace('_', '-');
    return vLang.startsWith(targetPrefix + '-') || vLang === targetPrefix;
  });
  if (match) return match;

  // 3. Name contains language name (e.g. "Google தமிழ்", "Microsoft Valluvar", "Google हिन्दी")
  match = availableBrowserVoices.find(v => {
    const vName = (v.name || '').toLowerCase();
    return searchNames.some(n => vName.includes(n));
  });
  if (match) return match;

  return null;
}

function extractAllAdvisoryStates(data) {
  const highWaveWarn = [];
  const highWaveAlert = [];
  const swellWarn = [];
  const swellAlert = [];
  const currentAlert = [];

  const parseStates = (statesList, warnTarget, alertTarget) => {
    if (!Array.isArray(statesList)) return;
    for (const st of statesList) {
      const w = Number(st.counts?.warning || 0);
      const a = Number(st.counts?.alert || 0);
      const name = st.name || '';
      if (w > 0 && name) warnTarget.push(name);
      if (a > 0 && name) alertTarget.push(name);
    }
  };

  parseStates(data?.highWave?.states, highWaveWarn, highWaveAlert);
  parseStates(data?.swellSurge?.states, swellWarn, swellAlert);
  parseStates(data?.oceanCurrent?.states, [], currentAlert);

  const allWarnings = [...new Set([...highWaveWarn, ...swellWarn])];
  const allAlerts = [...new Set([...highWaveAlert, ...swellAlert, ...currentAlert])];

  return {
    highWaveWarn: [...new Set(highWaveWarn)],
    highWaveAlert: [...new Set(highWaveAlert)],
    swellWarn: [...new Set(swellWarn)],
    swellAlert: [...new Set(swellAlert)],
    currentAlert: [...new Set(currentAlert)],
    allWarnings,
    allAlerts
  };
}

function buildBulletinSummary(data, langCode = 'en-IN') {
  if (!data) return { title: 'Ocean Watch', text: 'No live status data is available.' };

  const adv = extractAllAdvisoryStates(data);
  const tsunamiThreat = typeof isTsunamiThreatActive === 'function' ? isTsunamiThreatActive(data.tsunami) : false;
  const cycloneActive = Boolean(data.cyclone?.status?.severity && data.cyclone.status.severity !== 'safe');

  const langConfig = VOICE_LANGUAGES.find(l => l.code === langCode) || VOICE_LANGUAGES[0];
  const langPrefix = langConfig.voicePrefix;

  // Translation helpers
  const mapStates = list => list.map(s => translateStateName(s, langPrefix)).join(', ');

  // 1. TAMIL / தமிழ்
  if (langPrefix === 'ta') {
    let t = 'இந்திய கடலோர வானிலை மற்றும் பெருங்கடல் எச்சரிக்கை தகவல் சுருக்கம். ';
    if (tsunamiThreat) t += 'முக்கிய அறிவிப்பு: சுனாமி ஆபத்து எச்சரிக்கை விடுக்கப்பட்டுள்ளது. உள்ளூர் பேரிடர் மேலாண்மை வழிகாட்டுதலை பின்பற்றவும். ';
    else t += 'இந்திய கடலோர பகுதிகளுக்கு சுனாமி அச்சுறுத்தல் எதுவும் இல்லை, கடற்கரை பாதுகாப்பாக உள்ளது. ';

    if (adv.allWarnings.length > 0) {
      t += 'சிவப்பு எச்சரிக்கை (Red Warning): ' + mapStates(adv.allWarnings) + ' ஆகிய மாநிலங்கள் மற்றும் யூனியன் பிரதேசங்களில் அதீத கடல் சீற்ற எச்சரிக்கை விடுக்கப்பட்டுள்ளது. மீனவர்கள் கடலுக்கு செல்ல வேண்டாம். ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'கள்ளக்கடல் / அலை எழுச்சி ஆரஞ்சு எச்சரிக்கை (Swell Surge Alert): ' + mapStates(adv.swellAlert) + ' கடலோர பகுதிகளில் நீண்ட கால அலைகளால் கடல்நீர் உட்புகும் அபாயம் உள்ளது. கடலோர மக்கள் மிகுந்த எச்சரிக்கையுடன் இருக்கவும். ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'உயர்ந்த அலை ஆரஞ்சு எச்சரிக்கை (High Wave Alert): ' + mapStates(adv.highWaveAlert) + ' பகுதிகளில் கடல் கொந்தளிப்புடன் காணப்படும். ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'அனைத்து கடலோர மாநிலங்களிலும் கடல் நிலைமை சீராகவும் இயல்பாகவும் உள்ளது. ';
    }
    if (cycloneActive) t += 'புயல் சுற்றறிக்கை விடுக்கப்பட்டுள்ளது, அதிகாரப்பூர்வ தகவல்களை கவனிக்கவும். ';
    t += 'சமீபத்திய துல்லியமான தகவல்களுக்கு INCOIS அதிகாரப்பூர்வ இணையதளத்தை காணவும்.';
    return { title: 'கடலோர தகவல் சுருக்கம் (தமிழ்)', text: t };
  }

  // 2. HINDI / हिन्दी
  if (langPrefix === 'hi') {
    let t = 'भारतीय तटीय मौसम एवं महासागरीय चेतावनी बुलेटिन। ';
    if (tsunamiThreat) t += 'अति आवश्यक: सुनामी चेतावनी सक्रिय है। स्थानीय आपदा प्रबंधन के निर्देशों का पालन करें। ';
    else t += 'भारत के लिए सुनामी का कोई खतरा नहीं है, सभी तटीय क्षेत्र सुरक्षित हैं। ';

    if (adv.allWarnings.length > 0) {
      t += 'लाल चेतावनी (Red Warning): ' + mapStates(adv.allWarnings) + ' राज्यों और केंद्र शासित प्रदेशों में उच्च समुद्र चेतावनी जारी की गई है। मछुआरे समुद्र में न जाएं। ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'स्वेल सर्ज / कल्लाक्कदल अलर्ट: ' + mapStates(adv.swellAlert) + ' के तटीय इलाकों में तेज समुद्री लहरों और जलभराव का खतरा है। सतर्क रहें। ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'ऊंची लहरें ऑरेंज अलर्ट: ' + mapStates(adv.highWaveAlert) + ' में समुद्र अशांत रहेगा। ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'भारतीय तटीय क्षेत्रों में समुद्र की स्थिति सामान्य है। ';
    }
    if (cycloneActive) t += 'चक्रवात अलर्ट सक्रिय है। ';
    t += 'नवीनतम जानकारी हेतु INCOIS पोर्टल से जुड़े रहें।';
    return { title: 'महासागर बुलेटिन (हिन्दी)', text: t };
  }

  // 3. TELUGU / తెలుగు
  if (langPrefix === 'te') {
    let t = 'భారత తీర ప్రాంత మరియు సముద్ర వాతావరణ హెచ్చరికల సమాచారం. ';
    if (tsunamiThreat) t += 'ముఖ్య సమాచారం: సునామీ ముప్పు ఉంది. ';
    else t += 'భారత తీర ప్రాంతాలకు సునామీ ముప్పు లేదు, సురక్షితంగా ఉంది. ';

    if (adv.allWarnings.length > 0) {
      t += 'రెడ్ అలర్ట్: ' + mapStates(adv.allWarnings) + ' తీరప్రాంతాల్లో తీవ్ర హెచ్చరిక జారీ చేయబడింది. మత్స్యకారులు సముద్రంలోకి వెళ్లవద్దు. ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'స్వెల్ సర్జ్ ఆరెంజ్ అలర్ట్: ' + mapStates(adv.swellAlert) + ' తీరప్రాంతాల్లో అలల ఉధృతి ఎక్కువగా ఉంటుంది. ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'హై వేవ్ అలర్ట్: ' + mapStates(adv.highWaveAlert) + ' ప్రాంతాల్లో జాగ్రత్త వహించండి. ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'సముద్ర పరిస్థితి ప్రశాంతంగా మరియు సాధారణంగా ఉంది. ';
    }
    t += 'మరిన్ని వివరాల కోసం INCOIS పర్యవేక్షించండి.';
    return { title: 'సముద్ర హెచ్చరికల సమాచారం (తెలుగు)', text: t };
  }

  // 4. MALAYALAM / മലയാളം
  if (langPrefix === 'ml') {
    let t = 'ഇന്ത്യൻ തീരദേശ കാലാവസ്ഥാ സമുദ്ര വിവര ബുള്ളറ്റിൻ. ';
    if (tsunamiThreat) t += 'അടിയന്തര അറിയിപ്പ്: സുനാമി മുന്നറിയിപ്പ് നിലവിലുണ്ട്. ';
    else t += 'സുനാമി ഭീഷണിയില്ല, തീരപ്രദേശങ്ങൾ സുരക്ഷിതമാണ്. ';

    if (adv.allWarnings.length > 0) {
      t += 'റെഡ് അലർട്ട് (Red Warning): ' + mapStates(adv.allWarnings) + ' തീരങ്ങളിൽ അതീവ ജാഗ്രതാ നിർദ്ദേശം. മത്സ്യത്തൊഴിലാളികൾ കടലിൽ പോകരുത്. ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'കള്ളക്കടൽ / സ് swell സർജ്ജ് ഓറഞ്ച് അലർട്ട്: ' + mapStates(adv.swellAlert) + ' തീരങ്ങളിൽ ഉയർന്ന തിരമാലകൾക്കും കടലാക്രമണത്തിനും സാധ്യതയുണ്ട്. ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'ഉയർന്ന തിരമാല മുന്നറിയിപ്പ്: ' + mapStates(adv.highWaveAlert) + ' മേഖലകളിൽ ജാഗ്രത പാലിക്കുക. ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'തീരദേശ സമുദ്രാവസ്ഥ സാധാരണ നിലയിലാണ്. ';
    }
    t += 'ഔദ്യോഗിക അറിയിപ്പുകൾക്കായി INCOIS പോർട്ടൽ സന്ദർശിക്കുക.';
    return { title: 'തീരദേശ അറിയിപ്പ് (മലയാളം)', text: t };
  }

  // 5. BENGALI / বাংলা
  if (langPrefix === 'bn') {
    let t = 'ভারত মহাসাগর ও উপকূলীয় সতর্কতা বুলেটিন। ';
    if (tsunamiThreat) t += 'জরুরি বিজ্ঞপ্তি: সুনামি সতর্কতা জারি করা হয়েছে। ';
    else t += 'ভারতের জন্য কোনো সুনামি সতর্কতা নেই, উপকূল নিরাপদ। ';

    if (adv.allWarnings.length > 0) {
      t += 'লাল সতর্কতা (Red Warning): ' + mapStates(adv.allWarnings) + ' রাজ্যে উচ্চ সতর্কতা রয়েছে। সমুদ্রে যাবেন না। ';
    }
    if (adv.swellAlert.length > 0 || adv.highWaveAlert.length > 0) {
      t += 'কমলা সতর্কতা (Orange Alert): ' + mapStates([...adv.swellAlert, ...adv.highWaveAlert]) + ' উপকূলে উত্তাল তরঙ্গের সম্ভাবনা রয়েছে। ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'সমুদ্রের সামগ্রিক অবস্থা স্বাভাবিক রয়েছে। ';
    }
    return { title: 'উপকূলীয় বুলেটিন (বাংলা)', text: t };
  }

  // 6. DEFAULT ENGLISH
  let t = 'Indian Coastal Weather and Ocean Advisory Summary. ';
  if (tsunamiThreat) {
    t += 'Urgent: Tsunami warning is active. Follow local disaster authority instructions. ';
  } else {
    t += 'No Tsunami threat exists for India. Coastal regions are safe. ';
  }

  if (adv.allWarnings.length > 0) {
    t += 'Red Warning: Severe coastal advisories active across ' + adv.allWarnings.join(', ') + '. Fishermen are strictly advised not to venture into the sea. ';
  }
  if (adv.swellWarn.length > 0) {
    t += 'Swell Surge (Kallakkadal) Red Warning in ' + adv.swellWarn.join(', ') + '. ';
  }
  if (adv.swellAlert.length > 0) {
    t += 'Swell Surge (Kallakkadal) Orange Alert in ' + adv.swellAlert.join(', ') + ' due to long-period ocean swells. Coastal inundation possible. ';
  }
  if (adv.highWaveAlert.length > 0) {
    t += 'High Wave Orange Alert in ' + adv.highWaveAlert.join(', ') + ' with rough sea conditions. ';
  }
  if (adv.currentAlert.length > 0) {
    t += 'Ocean Currents Alert in ' + adv.currentAlert.join(', ') + '. ';
  }
  if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
    t += 'Ocean state conditions are normal across all Indian coastal states and Union Territories. ';
  }
  if (cycloneActive) {
    t += 'Cyclone advisory is active. Refer to official IMD bulletin. ';
  }
  t += 'For latest real-time updates, visit the official INCOIS MoES portal.';

  return { title: 'Coastal Advisory Audio Bulletin (' + langConfig.name + ')', text: t };
}

function stopVoiceSummary() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  isSpeechPlaying = false;
  const playBtn = ids('voicePlayBtn');
  if (playBtn) {
    playBtn.innerHTML = '▶ Play Audio';
    playBtn.classList.remove('is-playing');
  }
}

function playVoiceSummary() {
  if (!('speechSynthesis' in window)) {
    alert('Voice synthesis is not supported in this browser.');
    return;
  }

  if (isSpeechPlaying) {
    stopVoiceSummary();
    return;
  }

  window.speechSynthesis.cancel();
  const data = globalThis.latestStatusData || latestStatusData;
  const bulletin = buildBulletinSummary(data, selectedVoiceLang);
  const langConfig = VOICE_LANGUAGES.find(l => l.code === selectedVoiceLang) || VOICE_LANGUAGES[0];

  const utterance = new SpeechSynthesisUtterance(bulletin.text);
  utterance.lang = langConfig.code;
  utterance.rate = 0.92;
  utterance.pitch = 1.0;

  const matchedVoice = findBestVoice(langConfig);
  if (matchedVoice) {
    utterance.voice = matchedVoice;
    utterance.lang = matchedVoice.lang || langConfig.code;
  }

  const playBtn = ids('voicePlayBtn');

  utterance.onstart = () => {
    isSpeechPlaying = true;
    if (playBtn) {
      playBtn.innerHTML = '⏹ Stop Audio';
      playBtn.classList.add('is-playing');
    }
  };

  utterance.onend = () => {
    isSpeechPlaying = false;
    if (playBtn) {
      playBtn.innerHTML = '▶ Play Audio';
      playBtn.classList.remove('is-playing');
    }
  };

  utterance.onerror = () => {
    isSpeechPlaying = false;
    if (playBtn) {
      playBtn.innerHTML = '▶ Play Audio';
      playBtn.classList.remove('is-playing');
    }
  };

  window.speechSynthesis.speak(utterance);
}

function renderVoiceSummaryModal() {
  const data = globalThis.latestStatusData || latestStatusData;
  const bulletin = buildBulletinSummary(data, selectedVoiceLang);
  const langConfig = VOICE_LANGUAGES.find(l => l.code === selectedVoiceLang) || VOICE_LANGUAGES[0];

  const titleEl = ids('voiceSummaryTitle');
  const textEl = ids('voiceSummaryText');
  const langSelect = ids('voiceLangSelect');
  const voiceNoticeEl = ids('voiceNotice');

  if (titleEl) titleEl.textContent = bulletin.title;
  if (textEl) textEl.textContent = bulletin.text;

  const matchedVoice = findBestVoice(langConfig);
  if (voiceNoticeEl) {
    if (matchedVoice) {
      voiceNoticeEl.textContent = 'Voice: ' + matchedVoice.name + ' (' + (matchedVoice.lang || langConfig.code) + ')';
      voiceNoticeEl.style.color = 'var(--green)';
    } else {
      voiceNoticeEl.textContent = 'Voice note: No dedicated ' + langConfig.name + ' speech voice detected in system; browser will use standard voice.';
      voiceNoticeEl.style.color = 'var(--muted)';
    }
  }

  if (langSelect && !langSelect.children.length) {
    langSelect.innerHTML = VOICE_LANGUAGES.map(l => '<option value="' + l.code + '">' + l.native + ' (' + l.name + ')</option>').join('');
    langSelect.value = selectedVoiceLang;
    langSelect.addEventListener('change', () => {
      stopVoiceSummary();
      selectedVoiceLang = langSelect.value;
      renderVoiceSummaryModal();
    });
  }
}

function initVoiceSummary() {
  const btn = ids('voiceSummaryBtn');
  const dialog = ids('voiceSummaryDialog');
  const playBtn = ids('voicePlayBtn');

  if (btn && dialog) {
    btn.addEventListener('click', () => {
      renderVoiceSummaryModal();
      dialog.showModal();
    });
  }

  if (playBtn) {
    playBtn.addEventListener('click', playVoiceSummary);
  }

  if (dialog) {
    dialog.addEventListener('close', () => {
      stopVoiceSummary();
    });
  }
}
