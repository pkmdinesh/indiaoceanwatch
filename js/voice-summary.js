// Lightweight Multilingual Voice and Text Bulletin Engine
// Uses native browser Web Speech API (0 KB external library overhead)

const VOICE_LANGUAGES = Object.freeze([
  { code: 'en-IN', name: 'English', native: 'English', voicePrefix: 'en' },
  { code: 'hi-IN', name: 'Hindi', native: 'हिन्दी', voicePrefix: 'hi' },
  { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்', voicePrefix: 'ta' },
  { code: 'te-IN', name: 'Telugu', native: 'తెలుగు', voicePrefix: 'te' },
  { code: 'ml-IN', name: 'Malayalam', native: 'മലയാളം', voicePrefix: 'ml' },
  { code: 'bn-IN', name: 'Bengali', native: 'বাংলা', voicePrefix: 'bn' },
  { code: 'mr-IN', name: 'Marathi', native: 'मराठी', voicePrefix: 'mr' },
  { code: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી', voicePrefix: 'gu' },
  { code: 'or-IN', name: 'Odia', native: 'ଓଡ଼ିଆ', voicePrefix: 'or' },
  { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ', voicePrefix: 'kn' }
]);

var selectedVoiceLang = 'en-IN';
var isSpeechPlaying = false;

function buildBulletinSummary(data, langCode = 'en-IN') {
  if (!data) return { title: 'Ocean Watch', text: 'No live status data is available.' };

  const osfServices = [
    { name: 'High Wave', stateData: data.highWave },
    { name: 'Swell Surge', stateData: data.swellSurge },
    { name: 'Ocean Currents', stateData: data.oceanCurrent }
  ];

  let warningCount = 0;
  let alertCount = 0;
  const warningStates = [];
  const alertStates = [];

  for (const s of osfServices) {
    if (Array.isArray(s.stateData?.states)) {
      for (const st of s.stateData.states) {
        const w = Number(st.counts?.warning || 0);
        const a = Number(st.counts?.alert || 0);
        if (w > 0) { warningCount += w; warningStates.push(st.name + ' (' + s.name + ')'); }
        if (a > 0) { alertCount += a; alertStates.push(st.name + ' (' + s.name + ')'); }
      }
    }
  }

  const tsunamiThreat = typeof isTsunamiThreatActive === 'function' ? isTsunamiThreatActive(data.tsunami) : false;
  const cycloneActive = Boolean(data.cyclone?.status?.severity && data.cyclone.status.severity !== 'safe');

  if (langCode.startsWith('hi')) {
    let t = 'भारतीय तटीय मौसम एवं महासागर स्थिति बुलेटिन। ';
    if (tsunamiThreat) t += 'चेतावनी: सुनामी चेतावनी सक्रिय है। ';
    else t += 'सुनामी की कोई चेतावनी नहीं है, तटीय क्षेत्र सुरक्षित हैं। ';

    if (warningCount > 0) t += 'उच्च चेतावनी: ' + warningStates.slice(0, 3).join(', ') + ' में लाल चेतावनी जारी की गई है। मछुआरों को समुद्र में न जाने की सलाह दी जाती है। ';
    else if (alertCount > 0) t += 'अलर्ट: ' + alertStates.slice(0, 3).join(', ') + ' में नारंगी अलर्ट जारी है। सतर्क रहें। ';
    else t += 'महासागरीय स्थिति सामान्य है, कोई गंभीर चेतावनी नहीं है। ';

    if (cycloneActive) t += 'चक्रवात अलर्ट: आधिकारिक बुलेटिन की निगरानी करें। ';
    t += 'नवीनतम आधिकारिक जानकारी हेतु INCOIS पोर्टल से जुड़े रहें।';
    return { title: 'महासागर बुलेटिन (हिन्दी)', text: t };
  }

  if (langCode.startsWith('ta')) {
    let t = 'இந்திய பெருங்கடல் மற்றும் கடலோர எச்சரிக்கை தகவல் சுருக்கம். ';
    if (tsunamiThreat) t += 'சுனாமி ஆபத்து எச்சரிக்கை விடுக்கப்பட்டுள்ளது. ';
    else t += 'சுனாமி அச்சுறுத்தல் எதுவும் இல்லை, கடற்கரை பாதுகாப்பாக உள்ளது. ';

    if (warningCount > 0) t += 'சிவப்பு எச்சரிக்கை: ' + warningStates.slice(0, 3).join(', ') + ' பகுதிகளில் தீவிர அலை எச்சரிக்கை உள்ளது. மீனவர்கள் கடலுக்கு செல்ல வேண்டாம். ';
    else if (alertCount > 0) t += 'ஆரஞ்சு எச்சரிக்கை: ' + alertStates.slice(0, 3).join(', ') + ' பகுதிகளில் கடல் சீற்றம் கூடும். அவதானமாக இருக்கவும். ';
    else t += 'கடல் நிலைமை இயல்பாக உள்ளது. ';
    t += 'INCOIS அதிகாரப்பூர்வ தகவல்களை தொடர்ந்து கவனிக்கவும்.';
    return { title: 'கடலோர தகவல் சுருக்கம் (தமிழ்)', text: t };
  }

  if (langCode.startsWith('te')) {
    let t = 'భారత తీర ప్రాంత మరియు సముద్ర వాతావరణ సమాచారం. ';
    if (tsunamiThreat) t += 'హెచ్చరిక: సునామీ ముప్పు ఉంది. ';
    else t += 'సునామీ ముప్పు లేదు, తీరప్రాంతం సురక్షితంగా ఉంది. ';

    if (warningCount > 0) t += 'రెడ్ అలర్ట్: తీవ్ర హెచ్చరిక జారీ చేయబడింది. మత్స్యకారులు సముద్రంలోకి వెళ్లవద్దు. ';
    else if (alertCount > 0) t += 'ఆరెంజ్ అలర్ట్: అప్రమత్తంగా ఉండండి. ';
    else t += 'సముద్ర పరిస్థితి సాధారణంగా ఉంది. ';
    t += 'తాజా సమాచారం కోసం INCOIS పర్యవేక్షించండి.';
    return { title: 'సముద్ర హెచ్చరికల సమాచారం (తెలుగు)', text: t };
  }

  if (langCode.startsWith('ml')) {
    let t = 'ഇന്ത്യൻ തീരദേശ കാലാവസ്ഥാ അറിയിപ്പ്. ';
    if (tsunamiThreat) t += 'സുനാമി മുന്നറിയിപ്പ് നിലവിലുണ്ട്. ';
    else t += 'സുനാമി ഭീഷണിയില്ല, തീരം സുരക്ഷിതമാണ്. ';

    if (warningCount > 0) t += 'റെഡ് അലർട്ട്: ഉയർന്ന തിരമാല മുന്നറിയിപ്പ് നിലവിലുണ്ട്. മത്സ്യത്തൊഴിലാളികൾ കടലിൽ പോകരുത്. ';
    else if (alertCount > 0) t += 'ഓറഞ്ച് അലർട്ട്: കള്ളക്കടൽ, തിരമാല ജാഗ്രത പാലിക്കുക. ';
    else t += 'സമുദ്രാവസ്ഥ സാധാരണ നിലയിലാണ്. ';
    t += 'INCOIS ഔദ്യോഗിക വിവരങ്ങൾ ശ്രദ്ധിക്കുക.';
    return { title: 'തീരദേശ അറിയിപ്പ് (മലയാളം)', text: t };
  }

  if (langCode.startsWith('bn')) {
    let t = 'ভারত মহাসাগর ও উপকূলীয় সতর্কতা বুলেটিন। ';
    if (tsunamiThreat) t += 'সুনামি সতর্কতা জারি করা হয়েছে। ';
    else t += 'কোনো সুনামি সতর্কতা নেই, উপকূল নিরাপদ। ';

    if (warningCount > 0) t += 'উচ্চ সতর্কতা: লাল সতর্কতা জারি রয়েছে। মৎস্যজীবীদের সমুদ্রে না যাওয়ার পরামর্শ দেওয়া হচ্ছে। ';
    else if (alertCount > 0) t += 'কমলা সতর্কতা: সতর্ক থাকুন। ';
    else t += 'সমুদ্রের অবস্থা স্বাভাবিক রয়েছে। ';
    return { title: 'উপকূলীয় বুলেটিন (বাংলা)', text: t };
  }

  // Default: English
  let t = 'Indian Ocean and Coastal Advisory Summary. ';
  if (tsunamiThreat) t += 'Urgent: Tsunami warning is active. Please follow local disaster authority instructions. ';
  else t += 'No Tsunami threat exists for India. Coastal regions are safe. ';

  if (warningCount > 0) t += 'Red Warning: ' + warningCount + ' coastal district advisories active across ' + warningStates.slice(0, 3).join(', ') + '. Fishermen are advised not to venture into deep sea. ';
  else if (alertCount > 0) t += 'Orange Alert: Moderate to rough seas and swell surge active in ' + alertStates.slice(0, 3).join(', ') + '. Exercise vigilance. ';
  else t += 'Ocean state conditions are normal with no critical warnings. ';

  if (cycloneActive) t += 'Cyclone advisory is active. Refer to official IMD bulletin. ';
  t += 'For full details, visit the official INCOIS MoES portal.';

  return { title: 'Coastal Advisory Audio Bulletin (English)', text: t };
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

  const utterance = new SpeechSynthesisUtterance(bulletin.text);
  utterance.lang = selectedVoiceLang;
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang === selectedVoiceLang || v.lang.startsWith(selectedVoiceLang.split('-')[0]));
  if (matchedVoice) utterance.voice = matchedVoice;

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

  const titleEl = ids('voiceSummaryTitle');
  const textEl = ids('voiceSummaryText');
  const langSelect = ids('voiceLangSelect');

  if (titleEl) titleEl.textContent = bulletin.title;
  if (textEl) textEl.textContent = bulletin.text;

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
