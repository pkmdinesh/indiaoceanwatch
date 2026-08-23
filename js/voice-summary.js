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
  'ANDAMAN AND NICOBAR': {
    ta: 'அந்தமான் மற்றும் நிக்கோபார்',
    te: 'అండమాన్ మరియు నికోబార్',
    ml: 'ആൻഡമാൻ നിക്കോബാർ',
    hi: 'अंडमान एवं निकोबार द्वीप समूह',
    bn: 'আন্দামান ও নিকোবর',
    mr: 'अंदमान आणि निकोबार',
    gu: 'અંદમાન અને નિકોબાર',
    or: 'ଆଣ୍ଡାମାନ ଓ ନିକୋବର',
    kn: 'ಅಂಡಮಾನ್ ಮತ್ತು ನಿಕೋಬಾರ್'
  },
  'ANDHRA PRADESH': {
    ta: 'ஆந்திர பிரதேசம்',
    te: 'ఆంధ్రప్రదేశ్',
    ml: 'ఆంధ్రాപ്രദേശ്',
    hi: 'आंध्र प्रदेश',
    bn: 'অন্ধ্রপ্রদেশ',
    mr: 'आंध्र प्रदेश',
    gu: 'આંધ્ર પ્રદેશ',
    or: 'ଆନ୍ଧ୍ର ପ୍ରଦେଶ',
    kn: 'ಆಂಧ್ರ ಪ್ರದೇಶ'
  },
  'GOA': {
    ta: 'கோவா',
    te: 'గోవా',
    ml: 'ഗോവ',
    hi: 'गोवा',
    bn: 'গোয়া',
    mr: 'गोवा',
    gu: 'ગોવા',
    or: 'ଗୋଆ',
    kn: 'ಗೋವಾ'
  },
  'GUJARAT': {
    ta: 'குஜராத்',
    te: 'ગુજરાત',
    ml: 'ગુજરાത്ത്',
    hi: 'गुजरात',
    bn: 'ગુજરાટ',
    mr: 'गुजरात',
    gu: 'ગુજરાત',
    or: 'ଗୁଜରାଟ',
    kn: 'ગુજરાત'
  },
  'KARNATAKA': {
    ta: 'கர்நாடகா',
    te: 'ಕರ್ನಾಟಕ',
    ml: 'കർണാടക',
    hi: 'कर्नाटक',
    bn: 'কর্ণাটক',
    mr: 'ಕರ್ನಾಟಕ',
    gu: 'કર્ણાટક',
    or: 'କର୍ଣ୍ଣାଟକ',
    kn: 'ಕರ್ನಾಟಕ'
  },
  'KERALA': {
    ta: 'கேரளா',
    te: 'കേരള',
    ml: 'കേരളം',
    hi: 'केरल',
    bn: 'কেরালা',
    mr: 'केरळ',
    gu: 'કેરળ',
    or: 'କେରଳ',
    kn: 'കേರಳ'
  },
  'LAKSHADWEEP': {
    ta: 'லட்சத்தீவு',
    te: 'లక్షద్వీప్',
    ml: 'ലക്ഷദ്വീപ്',
    hi: 'लक्षद्वीप',
    bn: 'লক্ষদ্বীপ',
    mr: 'लक्षद्वीप',
    gu: 'લક્ષદ્વીપ',
    or: 'ଲାକ୍ଷାଦ୍ୱୀପ',
    kn: 'ಲಕ್ಷದ್ವೀಪ'
  },
  'MAHARASHTRA': {
    ta: 'மகாராஷ்டிரா',
    te: 'మహారాష్ట్ర',
    ml: 'മഹാരാഷ്ട്ര',
    hi: 'महाराष्ट्र',
    bn: 'মহারাষ্ট্র',
    mr: 'महाराष्ट्र',
    gu: 'મહારાષ્ટ્ર',
    or: 'ମହାରାଷ୍ଟ୍ର',
    kn: 'ಮಹಾರಾಷ್ಟ್ರ'
  },
  'ODISHA': {
    ta: 'ஒடிசா',
    te: 'ఒడిశా',
    ml: 'ഒഡീഷ',
    hi: 'ଓଡିଶା',
    bn: 'ওড়িশা',
    mr: 'ओडिशा',
    gu: 'ઓડિશા',
    or: 'ଓଡ଼ିଶା',
    kn: 'ಒಡಿಶಾ'
  },
  'TAMIL NADU': {
    ta: 'தமிழ்நாடு',
    te: 'తమిళనాడు',
    ml: 'തമിഴ്‌നാട്',
    hi: 'तमिलनाडु',
    bn: 'তামিলনাড়ু',
    mr: 'तमिळनाडू',
    gu: 'તમિલનાડુ',
    or: 'ତାମିଲନାଡୁ',
    kn: 'ತಮಿಳುನಾಡು'
  },
  'WEST BENGAL': {
    ta: 'மேற்கு வங்கம்',
    te: 'పశ్చిమ బెంగాల్',
    ml: 'പശ്ചിമ ബംഗാൾ',
    hi: 'पश्चिम बंगाल',
    bn: 'পশ্চিমবঙ্গ',
    mr: 'पश्चिम बंगाल',
    gu: 'પશ્ચિમ બંગાળ',
    or: 'ପଶ୍ଚିମବଙ୍ଗ',
    kn: 'ಪಶ್ಚಿಮ ಬಂಗಾಳ'
  },
  'DAMAN AND DIU': {
    ta: 'தாமன் மற்றும் தியூ',
    te: 'దామన్ మరియు దియు',
    ml: 'ദാമൻ ദിയു',
    hi: 'दमन एवं दीव',
    bn: 'দমন ও দিউ',
    mr: 'दमण आणि दीव',
    gu: 'દમણ અને દીવ',
    or: 'ଦମନ ଓ ଦିଉ',
    kn: 'ದಮನ್ ಮತ್ತು ದಿಯು'
  },
  'PUDUCHERRY': {
    ta: 'புதுச்சேரி',
    te: 'పుదుచ్చేరి',
    ml: 'പുതുച്ചേരി',
    hi: 'पुडुचेरी',
    bn: 'পুদুচেরি',
    mr: 'पुडुचेरी',
    gu: 'પુડુચેરી',
    or: 'ପୁଡୁଚେରୀ',
    kn: 'ಪುದುಚೇರಿ'
  }
};

const LANGUAGE_TARGET_STATES = {
  ta: ['TAMIL NADU', 'PUDUCHERRY'],
  te: ['ANDHRA PRADESH'],
  ml: ['KERALA', 'LAKSHADWEEP'],
  kn: ['KARNATAKA'],
  mr: ['MAHARASHTRA', 'GOA'],
  gu: ['GUJARAT', 'DAMAN AND DIU'],
  or: ['ODISHA'],
  bn: ['WEST BENGAL'],
  hi: ['ANDAMAN AND NICOBAR'],
  en: null
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

function extractAllAdvisoryStates(data, targetStates = null) {
  const highWaveWarn = [];
  const highWaveAlert = [];
  const swellWarn = [];
  const swellAlert = [];
  const currentAlert = [];

  const targetSet = Array.isArray(targetStates)
    ? new Set(targetStates.map(s => String(s).toUpperCase().trim()))
    : null;

  const matchesFilter = name => {
    if (!targetSet) return true;
    const norm = String(name || '').toUpperCase().trim();
    return targetSet.has(norm);
  };

  const parseStates = (statesList, warnTarget, alertTarget, legacyWarn = [], legacyAlert = []) => {
    if (Array.isArray(statesList) && statesList.length > 0) {
      for (const st of statesList) {
        const w = Number(st.counts?.warning || 0);
        const a = Number(st.counts?.alert || 0);
        const name = st.name || '';
        if (matchesFilter(name)) {
          if (w > 0 && name) warnTarget.push(name);
          if (a > 0 && name) alertTarget.push(name);
        }
      }
    } else {
      (legacyWarn || []).filter(matchesFilter).forEach(n => warnTarget.push(n));
      (legacyAlert || []).filter(matchesFilter).forEach(n => alertTarget.push(n));
    }
  };

  parseStates(data?.highWave?.states, highWaveWarn, highWaveAlert, data?.highWave?.warning, data?.highWave?.alert);
  parseStates(data?.swellSurge?.states, swellWarn, swellAlert, data?.swellSurge?.warning, data?.swellSurge?.alert);
  parseStates(data?.oceanCurrent?.states, [], currentAlert, [], data?.oceanCurrent?.alert);

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

  const langConfig = VOICE_LANGUAGES.find(l => l.code === langCode) || VOICE_LANGUAGES[0];
  const langPrefix = langConfig.voicePrefix;
  const targetStates = LANGUAGE_TARGET_STATES[langPrefix] || null;

  const adv = extractAllAdvisoryStates(data, targetStates);
  const tsunamiThreat = typeof isTsunamiThreatActive === 'function' ? isTsunamiThreatActive(data.tsunami) : false;
  const cycloneActive = Boolean(data.cyclone?.status?.severity && data.cyclone.status.severity !== 'safe');

  // Translation helper
  const mapStates = list => list.map(s => translateStateName(s, langPrefix)).join(', ');

  // 1. TAMIL / தமிழ் (Tamil Nadu & Puducherry)
  if (langPrefix === 'ta') {
    let t = 'கடல் நிலை முன்னறிவிப்பு ஆலோசனை (Ocean State Forecast Advisory). ';
    if (tsunamiThreat) t += 'முக்கிய அறிவிப்பு: சுனாமி ஆபத்து எச்சரிக்கை விடுக்கப்பட்டுள்ளது. உள்ளூர் பேரிடர் மேலாண்மை வழிகாட்டுதலை பின்பற்றவும். ';

    if (adv.allWarnings.length > 0) {
      t += 'சிவப்பு எச்சரிக்கை (Red Warning): ' + mapStates(adv.allWarnings) + ' கடலோரப் பகுதிகளில் அதீத கடல் சீற்ற எச்சரிக்கை விடுக்கப்பட்டுள்ளது. மீனவர்கள் கடலுக்கு செல்ல வேண்டாம். ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'கள்ளக்கடல் / அலை எழுச்சி ஆரஞ்சு எச்சரிக்கை (Swell Surge Alert): ' + mapStates(adv.swellAlert) + ' கடலோர பகுதிகளில் நீண்ட கால அலைகளால் கடல்நீர் உட்புகும் அபாயம் உள்ளது. கடலோர மக்கள் மிகுந்த எச்சரிக்கையுடன் இருக்கவும். ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'உயர்ந்த அலை ஆரஞ்சு எச்சரிக்கை (High Wave Alert): ' + mapStates(adv.highWaveAlert) + ' பகுதிகளில் கடல் கொந்தளிப்புடன் காணப்படும். ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'கடல் நீரோட்ட எச்சரிக்கை (Ocean Currents Alert): ' + mapStates(adv.currentAlert) + ' பகுதிகளில் தீவிர நீரோட்டம் காணப்படும். ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'தமிழ்நாடு மற்றும் புதுச்சேரி கடலோரப் பகுதிகளில் கடல் நிலைமை சீராகவும் இயல்பாகவும் உள்ளது. ';
    }
    if (cycloneActive) t += 'புயல் சுற்றறிக்கை விடுக்கப்பட்டுள்ளது, அதிகாரப்பூர்வ தகவல்களை கவனிக்கவும். ';
    t += 'சமீபத்திய துல்லியமான தகவல்களுக்கு INCOIS அதிகாரப்பூர்வ இணையதளத்தை காணவும்.';
    return { title: 'கடல் நிலை முன்னறிவிப்பு ஆலோசனை (தமிழ்)', text: t };
  }

  // 2. HINDI / हिन्दी (Andaman & Nicobar)
  if (langPrefix === 'hi') {
    let t = 'महासागर स्थिति पूर्वानुमान परामर्श (Ocean State Forecast Advisory)। ';
    if (tsunamiThreat) t += 'अति आवश्यक: सुनामी चेतावनी सक्रिय है। स्थानीय आपदा प्रबंधन के निर्देशों का पालन करें। ';

    if (adv.allWarnings.length > 0) {
      t += 'लाल चेतावनी (Red Warning): ' + mapStates(adv.allWarnings) + ' में समुद्र में अत्यधिक उथल-पुथल की चेतावनी जारी की गई है। मछुआरे समुद्र में न जाएं। ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'स्वेल सर्ज / कल्लाक्कदल अलर्ट: ' + mapStates(adv.swellAlert) + ' के तटीय इलाकों में तेज समुद्री लहरों और जलभराव का खतरा है। सतर्क रहें। ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'ऊंची लहरें ऑरेंज अलर्ट: ' + mapStates(adv.highWaveAlert) + ' में समुद्र अशांत रहेगा। ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'समुद्री धाराएं अलर्ट: ' + mapStates(adv.currentAlert) + ' में सावधानी बरतें। ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'अंडमान एवं निकोबार द्वीप समूह के तटीय क्षेत्रों में समुद्र की स्थिति सामान्य है। ';
    }
    if (cycloneActive) t += 'चक्रवात अलर्ट सक्रिय है। ';
    t += 'नवीनतम जानकारी हेतु INCOIS पोर्टल से जुड़े रहें।';
    return { title: 'महासागर स्थिति पूर्वानुमान (हिन्दी)', text: t };
  }

  // 3. TELUGU / తెలుగు (Andhra Pradesh)
  if (langPrefix === 'te') {
    let t = 'సముద్ర స్థితి సూచన హెచ్చరికలు (Ocean State Forecast Advisory). ';
    if (tsunamiThreat) t += 'ముఖ్య సమాచారం: సునామీ ముప్పు హెచ్చరిక జారీ చేయబడింది. ';

    if (adv.allWarnings.length > 0) {
      t += 'రెడ్ అలర్ట్ (Red Warning): ' + mapStates(adv.allWarnings) + ' తీరప్రాంతాల్లో తీవ్ర హెచ్చరిక జారీ చేయబడింది. మత్స్యకారులు సముద్రంలోకి వెళ్లవద్దు. ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'స్వెల్ సర్జ్ / కళ్ళక్కడల్ ఆరెంజ్ అలర్ట్: ' + mapStates(adv.swellAlert) + ' తీరప్రాంతాల్లో అలల ఉధృతి ఎక్కువగా ఉంటుంది. ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'హై వేవ్ ఆరెంజ్ అలర్ట్: ' + mapStates(adv.highWaveAlert) + ' ప్రాంతాల్లో సముద్రం అల్లకల్లోలంగా ఉంటుంది. ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'సముద్ర ప్రవాహాల అలర్ట్: ' + mapStates(adv.currentAlert) + ' ప్రాంతాల్లో జాగ్రత్త వహించండి. ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'ఆంధ్రప్రదేశ్ తీర ప్రాంతంలో సముద్ర పరిస్థితి సాధారణంగా మరియు ప్రశాంతంగా ఉంది. ';
    }
    if (cycloneActive) t += 'తుఫాను హెచ్చరిక జారీ చేయబడింది. ';
    t += 'మరిన్ని వివరాల కోసం అధికారిక INCOIS పోర్టల్ పర్యవేక్షించండి.';
    return { title: 'సముద్ర స్థితి సూచన (తెలుగు)', text: t };
  }

  // 4. MALAYALAM / മലയാളം (Kerala & Lakshadweep)
  if (langPrefix === 'ml') {
    let t = 'സമുദ്രാവസ്ഥ പ്രവചന മുന്നറിയിപ്പ് (Ocean State Forecast Advisory). ';
    if (tsunamiThreat) t += 'അടിയന്തര അറിയിപ്പ്: സുനാമി മുന്നറിയിപ്പ് നിലവിലുണ്ട്. ';

    if (adv.allWarnings.length > 0) {
      t += 'റെഡ് മുന്നറിയിപ്പ് (Red Warning): ' + mapStates(adv.allWarnings) + ' തീരങ്ങളിൽ അതീവ ജാഗ്രതാ നിർദ്ദേശം. മത്സ്യത്തൊഴിലാളികൾ കടലിൽ പോകരുത്. ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'കള്ളക്കടൽ / സ്വെൽ സർജ്ജ് ഓറഞ്ച് അലർട്ട്: ' + mapStates(adv.swellAlert) + ' തീരങ്ങളിൽ ഉയർന്ന തിരമാലകൾക്കും കടലാക്രമണത്തിനും സാധ്യതയുണ്ട്. ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'ഉയർന്ന തിരമാല ഓറഞ്ച് അലർട്ട്: ' + mapStates(adv.highWaveAlert) + ' മേഖലകളിൽ ജാഗ്രത പാലിക്കുക. ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'സമുദ്ര പ്രവാഹ മുന്നറിയിപ്പ്: ' + mapStates(adv.currentAlert) + ' മേഖലകളിൽ ശ്രദ്ധിക്കുക. ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'കേരളം மற்றும் ലക്ഷദ്വീപ് തീരങ്ങളിൽ സമുദ്രാവസ്ഥ ശാന്തവും സാധാരണ നിലയിലുമാണ്. ';
    }
    if (cycloneActive) t += 'ചുഴലിക്കാറ്റ് മുന്നറിയിപ്പ് നിലവിലുണ്ട്. ';
    t += 'ഔദ്യോഗിക അറിയിപ്പുകൾക്കായി INCOIS പോർട്ടൽ സന്ദർശിക്കുക.';
    return { title: 'സമുദ്രാവസ്ഥ പ്രവചനം (മലയാളം)', text: t };
  }

  // 5. BENGALI / বাংলা (West Bengal)
  if (langPrefix === 'bn') {
    let t = 'সমুদ্র পরিস্থিতি পূর্বাভাস পরামর্শ (Ocean State Forecast Advisory)। ';
    if (tsunamiThreat) t += 'জরুরি বিজ্ঞপ্তি: সুনামি সতর্কতা জারি করা হয়েছে। ';

    if (adv.allWarnings.length > 0) {
      t += 'লাল সতর্কতা (Red Warning): ' + mapStates(adv.allWarnings) + ' উপকূলে উচ্চ সতর্কতা রয়েছে। মৎস্যজীবীরা সমুদ্রে যাবেন না। ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'সোয়েল সার্জ কমলা সতর্কতা: ' + mapStates(adv.swellAlert) + ' উপকূলে জলোচ্ছ্বাসের সম্ভাবনা রয়েছে। ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'উচ্চ ঢেউ কমলা সতর্কতা: ' + mapStates(adv.highWaveAlert) + ' উপকূলে উত্তাল তরঙ্গের সম্ভাবনা রয়েছে। ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'সমুদ্র স্রোত সতর্কতা: ' + mapStates(adv.currentAlert) + ' উপকূলে জারি করা হয়েছে। ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'পশ্চিমবঙ্গ উপকূলে সমুদ্রের অবস্থা স্বাভাবিক রয়েছে। ';
    }
    if (cycloneActive) t += 'ঘূর্ণিঝড় সতর্কতা সক্রিয় রয়েছে। ';
    t += 'সর্বশেষ তথ্যের জন্য INCOIS অফিসিয়াল পোর্টাল দেখুন।';
    return { title: 'সমুদ্র পরিস্থিতি পূর্বাভাস (বাংলা)', text: t };
  }

  // 6. MARATHI / मराठी (Maharashtra & Goa)
  if (langPrefix === 'mr') {
    let t = 'महासागर स्थिती अंदाज सल्लागार (Ocean State Forecast Advisory). ';
    if (tsunamiThreat) t += 'तातडीची सूचना: त्सुनामीचा इशारा जारी करण्यात आला आहे. स्थानिक आपत्ती व्यवस्थापन प्राधिकरणाच्या सूचनांचे पालन करा. ';

    if (adv.allWarnings.length > 0) {
      t += 'लाल इशारा (Red Warning): ' + mapStates(adv.allWarnings) + ' किनारपट्टी भागात समुद्रात अतिदक्षतेचा इशारा जारी करण्यात आला आहे. मच्छिमारांनी समुद्रात जाऊ नये. ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'कल्लाक्कदल / स्वेल सर्ज ऑरेंज अलर्ट: ' + mapStates(adv.swellAlert) + ' किनारपट्टी भागात उसळणाऱ्या लाटांमुळे पाणी शिरण्याचा धोका आहे. सतर्क राहावे. ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'उंच लाटा ऑरेंज अलर्ट: ' + mapStates(adv.highWaveAlert) + ' भागात समुद्र खवळलेला राहील. ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'समुद्री प्रवाह इशारा: ' + mapStates(adv.currentAlert) + ' किनारपट्टी भागात दक्षता बाळगा. ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'महाराष्ट्र आणि गोवा किनारपट्टीवर समुद्राची स्थिती सामान्य आणि शांत आहे. ';
    }
    if (cycloneActive) t += 'चक्रीवादळाचा इशारा सक्रिय आहे. ';
    t += 'अधिकृत आणि ताज्या माहितीसाठी INCOIS पोर्टलला भेट द्या.';
    return { title: 'महासागर स्थिती अंदाज (मराठी)', text: t };
  }

  // 7. GUJARATI / ગુજરાતી (Gujarat & Daman and Diu)
  if (langPrefix === 'gu') {
    let t = 'મહાસાગર સ્થિતિ પૂર્વાનુમાન સલાહકાર (Ocean State Forecast Advisory). ';
    if (tsunamiThreat) t += 'તાકીદની સૂચના: સુનામી ચેતવણી જારી કરવામાં આવી છે. સ્થાનિક આપત્તિ વ્યવસ્થાપન સૂચનાઓનું પાલન કરો. ';

    if (adv.allWarnings.length > 0) {
      t += 'લાલ ચેતવણી (Red Warning): ' + mapStates(adv.allWarnings) + ' દરિયાકાંઠે ભારે સમુદ્રી ચેતવણી જારી કરવામાં આવી છે. માછીમારોએ દરિયામાં ન જવું. ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'સ્વેલ સર્જ / કલ્લાક્કડલ ઓરેન્જ એલર્ટ: ' + mapStates(adv.swellAlert) + ' ના કાંઠા વિસ્તારોમાં ઊંચા મોજા અને પાણી ભરાવાની શક્યતા છે. સાવચેત રહો. ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'ઊંચા મોજા ઓરેન્જ એલર્ટ: ' + mapStates(adv.highWaveAlert) + ' માં સમુદ્ર તોફાની રહેશે. ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'સમુદ્રી પ્રવાહ એલર્ટ: ' + mapStates(adv.currentAlert) + ' દરિયાકાંઠે સાવચેતી રાખવી. ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'ગુજરાત અને દમણ અને દીવના દરિયાકાંઠે સમુદ્રની સ્થિતિ સામાન્ય છે. ';
    }
    if (cycloneActive) t += 'વાવાઝોડાની ચેતવણી સક્રિય છે. ';
    t += 'તાજી માહિતી માટે INCOIS પોર્ટલની મુલાકાત લો.';
    return { title: 'મહાસાગર સ્થિતિ પૂર્વાનુમાન (ગુજરાતી)', text: t };
  }

  // 8. ODIA / ଓଡ଼ିଆ (Odisha)
  if (langPrefix === 'or') {
    let t = 'ମହାସାଗର ସ୍ଥିତି ପୂର୍ବାନୁମାନ ପରାମର୍ଶ (Ocean State Forecast Advisory)। ';
    if (tsunamiThreat) t += 'ଜରୁରୀ ସୂଚନା: ସୁନାମି ଚେତାବନୀ ଜାରି କରାଯାଇଛି। ସ୍ଥାନୀୟ ବିପର୍ଯ୍ୟୟ ପରିଚାଳନା ନିର୍ଦ୍ଦେଶ ପାଳନ କରନ୍ତୁ। ';

    if (adv.allWarnings.length > 0) {
      t += 'ଲାଲ୍ ଚେତାବନୀ (Red Warning): ' + mapStates(adv.allWarnings) + ' ଉପକୂଳରେ ପ୍ରବଳ ସମୁଦ୍ର ଅଶାନ୍ତ ପାଇଁ ସତର୍କତା ଜାରି କରାଯାଇଛି। ମତ୍ସ୍ୟଜୀବୀମାନେ ସମୁଦ୍ରକୁ ଯାଆନ୍ତୁ ନାହିଁ। ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'ସ୍ୱେଲ୍ ସର୍ଜ / କଲ୍ଲାକଡ଼ାଲ୍ ଅରେଞ୍ଜ ଆଲର୍ଟ: ' + mapStates(adv.swellAlert) + ' ଉପକୂଳରେ ଉଚ୍ଚ ତରଙ୍ଗ ଯୋଗୁଁ ଜଳପ୍ଲାବନ ଆଶଙ୍କା ରହିଛି। ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'ଉଚ୍ଚ ଢେଉ ଅରେଞ୍ଜ ଆଲର୍ଟ: ' + mapStates(adv.highWaveAlert) + ' ରେ ସମୁଦ୍ର ଅଶାନ୍ତ ରହିବ। ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'ସମୁଦ୍ର ସ୍ରୋତ ଆଲର୍ଟ: ' + mapStates(adv.currentAlert) + ' ରେ ସତର୍କ ରୁହନ୍ତୁ। ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'ଓଡ଼ିଶା ଉପକୂଳରେ ସମୁଦ୍ର ସ୍ଥିତି ସ୍ୱାଭାବିକ ଏବଂ ଶାନ୍ତ ରହିଛି। ';
    }
    if (cycloneActive) t += 'ବାତ୍ୟା ସତର୍କତା ଜାରି କରାଯାଇଛି। ';
    t += 'ସର୍ବଶେଷ ସୂଚନା ପାଇଁ INCOIS ଅଫିସିଆଲ୍ ପୋର୍ଟାଲ୍ ଦେଖନ୍ତୁ।';
    return { title: 'ମହାସାଗର ସ୍ଥିତି ପୂର୍ବାନୁମାନ (ଓଡ଼ିଆ)', text: t };
  }

  // 9. KANNADA / ಕನ್ನಡ (Karnataka)
  if (langPrefix === 'kn') {
    let t = 'ಸಾಗರ ಸ್ಥಿತಿ ಮುನ್ಸೂಚನೆ ಸಲಹೆ (Ocean State Forecast Advisory). ';
    if (tsunamiThreat) t += 'ತುರ್ತು ಸೂಚನೆ: ಸುನಾಮಿ ಎಚ್ಚರಿಕೆ ಸಕ್ರಿಯವಾಗಿದೆ. ಸ್ಥಳೀಯ ವಿಪತ್ತು ನಿರ್ವಹಣಾ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಪಾಲಿಸಿ. ';

    if (adv.allWarnings.length > 0) {
      t += 'ಕೆಂಪು ಎಚ್ಚರಿಕೆ (Red Warning): ' + mapStates(adv.allWarnings) + ' ಕರಾವಳಿ ತೀರದಲ್ಲಿ ತೀವ್ರ ಸಮುದ್ರ ಪ್ರಕ್ಷುಬ್ಧತೆಯ ಎಚ್ಚರಿಕೆ ನೀಡಲಾಗಿದೆ. ಮೀನುಗಾರರು ಸಮುದ್ರಕ್ಕೆ ಇಳಿಯಬಾರದು. ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'ಸ್ವೆಲ್ ಸರ್ಜ್ / ಕಲ್ಲಕ್ಕಡಲ್ ಆರೆಂಜ್ ಅಲರ್ಟ್: ' + mapStates(adv.swellAlert) + ' ಕರಾವಳಿಯಲ್ಲಿ ಭಾರಿ ಅಲೆಗಳು ಮತ್ತು ನೀರು ನುಗ್ಗುವ ಸಾಧ್ಯತೆಯಿದೆ. ಜಾಗರೂಕರಾಗಿರಿ. ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'ಎತ್ತರದ ಅಲೆಗಳ ಆರೆಂಜ್ ಅಲರ್ಟ್: ' + mapStates(adv.highWaveAlert) + ' ನಲ್ಲಿ ಸಮುದ್ರ ಪ್ರಕ್ಷುಬ್ಧವಾಗಿರಲಿದೆ. ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'ಸಾಗರ ಪ್ರವಾಹ ಎಚ್ಚರಿಕೆ: ' + mapStates(adv.currentAlert) + ' ಕರಾವಳಿಯಲ್ಲಿ ಎಚ್ಚರ ವಹಿಸಿ. ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'ಕರ್ನಾಟಕ ಕರಾವಳಿ ತೀರದಲ್ಲಿ ಸಮುದ್ರ ಸ್ಥಿತಿ ಸಾಮಾನ್ಯವಾಗಿ ಮತ್ತು ಶಾಂತವಾಗಿದೆ. ';
    }
    if (cycloneActive) t += 'ಚಂಡಮಾರುತದ ಎಚ್ಚರಿಕೆ ಸಕ್ರಿಯವಾಗಿದೆ. ';
    t += 'ಹೆಚ್ಚಿನ ಮತ್ತು ನಿಖರ ಮಾಹಿತಿಗಾಗಿ INCOIS ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ವೀಕ್ಷಿಸಿ.';
    return { title: 'ಸಾಗರ ಸ್ಥಿತಿ ಮುನ್ಸೂಚನೆ (ಕನ್ನಡ)', text: t };
  }

  // 10. DEFAULT ENGLISH (All Coastal States / National)
  let t = 'Ocean State Forecast Advisory. ';
  if (tsunamiThreat) {
    t += 'Urgent: Tsunami warning is active. Follow local disaster authority instructions. ';
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

  return { title: 'Ocean State Forecast Advisory (' + langConfig.name + ')', text: t };
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
