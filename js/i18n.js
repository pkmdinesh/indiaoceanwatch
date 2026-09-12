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

const loadedLocales = {
  en: {
    'brand.title': 'Ocean Watch',
    'header.title': 'Coastal Advisory Status',
    'header.subtitle': 'Tsunami · Cyclone · Storm Surge · Ocean State Forecast · Potential Fishing Zone',
    'severity.warning': 'Warning',
    'severity.alert': 'Alert',
    'severity.watch': 'Watch',
    'severity.no_threat': 'No Threat'
  }
};

async function loadLanguage(lang = "en") {
  const globalObj = typeof window !== "undefined" ? window : globalThis;
  if (loadedLocales[lang] && Object.keys(loadedLocales[lang]).length > 10) {
    globalObj.I18N = loadedLocales[lang];
    return loadedLocales[lang];
  }
  try {
    const v = globalThis.OCEAN_WATCH_CONFIG?.CACHE_VERSION || "308";
    const res = await fetch(`./locales/${lang}.json?v=${v}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    loadedLocales[lang] = Object.assign(loadedLocales[lang] || {}, data);
    globalObj.I18N = loadedLocales[lang];
    return loadedLocales[lang];
  } catch (err) {
    console.warn(`[i18n] Failed to load locale "${lang}":`, err);
    return loadedLocales[lang] || loadedLocales.en || {};
  }
}

function applyTranslations(lang) {
  if (globalThis.i18n && typeof globalThis.i18n.translatePage === "function") {
    globalThis.i18n.translatePage(lang || globalThis.i18n.currentLang);
  }
}

globalThis.loadLanguage = loadLanguage;
globalThis.applyTranslations = applyTranslations;

const I18N_DICTIONARY = new Proxy(loadedLocales, {
  get(target, prop) {
    return target[prop] || target.en || {};
  }
});

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



const I18N_LANDING_CENTRES = {
  "Adaikkadevan": {"ta":"அடைக்கதேவன்"},
  "Akkaraipettai": {"ta":"அக்கரைப்பேட்டை"},
  "Alagankulam": {"ta":"அழகன்குளம்"},
  "Alambaraikuppam": {"ta":"ஆலம்பரைக்குப்பம்"},
  "Alanthalai": {"ta":"ஆலந்தலை"},
  "Amalinagar": {"ta":"அமலிநகர்"},
  "Angalamman Kuppam": {"ta":"அங்காளம்மன் குப்பம்"},
  "Anichankuppam": {"ta":"அனிச்சங்குப்பம்"},
  "Annamalaichery": {"ta":"அண்ணாமலைச்சேரி"},
  "Annanagar Pudhutheru": {"ta":"அண்ணாநகர் புதுத்தெரு"},
  "Anthoniyarpuram": {"ta":"அந்தோணியார்புரம்"},
  "Anumandhaikuppam": {"ta":"அனுமந்தை குப்பம்"},
  "Arambakkam": {"ta":"ஆரம்பாக்கம்"},
  "Arkkattuthurai": {"ta":"ஆற்காட்டுத்துறை"},
  "Arockiyapuram": {"ta":"ஆரோக்கியபுரம்"},
  "Atrangarai": {"ta":"ஆற்றங்கரை"},
  "Ayothikuppam": {"ta":"அயோத்திக்குப்பம்"},
  "Ayyampattinam": {"ta":"அய்யம்பட்டினம்"},
  "Azhikkal": {"ta":"அழிக்கல்"},
  "Bommaiyarpalyam": {"ta":"பொம்மையார்பாளையம்"},
  "Bommayanpettai (Vellakoil": {"ta":"பொம்மயன்பேட்டை (வெள்ளக்கோவில்)"},
  "C Pudupettai": {"ta":"சி. புதுப்பேட்டை"},
  "Cathedral (Chennai)": {"ta":"சாந்தோம் கதீட்ரல் (சென்னை)"},
  "Chandrappadi": {"ta":"சந்திரப்பாடி"},
  "Chavadikuppam": {"ta":"சாவடிக்குப்பம்"},
  "Chemacherry": {"ta":"செம்மஞ்சேரி"},
  "Chennai": {"ta":"சென்னை"},
  "Chettikulam": {"ta":"செட்டிக்குளம்"},
  "Chettinagar": {"ta":"செட்டிநகர்"},
  "Cheyyur": {"ta":"செய்யூர்"},
  "Chinna Ervadi": {"ta":"சின்ன ஏர்வாடி"},
  "Chinna Neelankarai": {"ta":"சின்ன நீலாங்கரை"},
  "Chinna Veerampattinam": {"ta":"சின்ன வீரம்பட்டினம்"},
  "Chinna mudaliarchavadi": {"ta":"சின்ன முதலியார்சாவடி"},
  "Chinnamanai": {"ta":"சின்னமனை"},
  "Chinnamuttom": {"ta":"சின்னமுட்டம்"},
  "Chinnandikuppam": {"ta":"சின்னாண்டிகுப்பம்"},
  "Chinnangudi": {"ta":"சின்னங்குடி"},
  "Chinnapalam": {"ta":"சின்னப்பாலம்"},
  "Chinnavilai": {"ta":"சின்னவிளை"},
  "Chinnorpettai": {"ta":"சின்னூர்பேட்டை"},
  "Chithiraipettai": {"ta":"சித்திரைப் பேட்டை"},
  "Coalchel": {"ta":"குளச்சல்"},
  "Colachel": {"ta":"குளச்சல்"},
  "Coromandel": {"ta":"கோரமண்டல்"},
  "Covelong (Kovalam)": {"ta":"கோவளம் (செங்கல்பட்டு)"},
  "Cuddalore Harbour": {"ta":"கடலூர் துறைமுகம்"},
  "Devanampattinam": {"ta":"தேவனாம்பட்டினம்"},
  "Devaneri": {"ta":"தேவனேரி"},
  "Devipattinam": {"ta":"தேவிபட்டினம்"},
  "Devipattinam South": {"ta":"தேவிபட்டினம் தெற்கு"},
  "Dhamotharanpattinam": {"ta":"தாமோதரன் பட்டினம்"},
  "Dhanushkodi": {"ta":"தனுஷ்கோடி"},
  "Egattur Karikattukuppam": {"ta":"எகட்டூர் கரிக்காட்டுக்குப்பம்"},
  "Ekkiyarkuppam": {"ta":"எக்கியார்குப்பம்"},
  "Enayam": {"ta":"இனயம்"},
  "Enayam Chinnathurai": {"ta":"இனயம் சின்னத்துறை"},
  "Enayam puthenthurai": {"ta":"இனயம் புத்தன்துறை"},
  "Ennore Mugathuvarakuppan": {"ta":"எண்ணூர் முகத்துவாரக்குப்பம்"},
  "Ennorekuppam": {"ta":"எண்ணூர்க்குப்பம்"},
  "Eraviputhenthurai": {"ta":"இரவிபுத்தென்துறை"},
  "Erayammanthura": {"ta":"இரையம்மன்துறை"},
  "Erayumanthurai": {"ta":"இரையுமன்துறை"},
  "Eripurakkarai": {"ta":"ஏரிப்புறக்கரை"},
  "Ernavoorkuppam": {"ta":"எர்ணாவூர்க்குப்பம்"},
  "Ezhudesam Chinnathurai": {"ta":"எழுதேசம் சின்னத்துறை"},
  "Ganapathichettikulam": {"ta":"கணபதிசெட்டிக்குளம்"},
  "Gandhinagar": {"ta":"காந்திநகர்"},
  "Ganesapuram": {"ta":"கணேசபுரம்"},
  "Gopalapattinam": {"ta":"கோபாலபட்டினம்"},
  "Idinthakarai": {"ta":"இடிந்தகரை"},
  "Inico nagar": {"ta":"இனிகோ நகர்"},
  "Injampakkam": {"ta":"ஈஞ்சம்பாக்கம்"},
  "Inthira Nagar": {"ta":"இந்திரா நகர்"},
  "Jeevanagar": {"ta":"ஜீவா நகர்"},
  "Kadalore Ali Kuppam": {"ta":"கடலூர் அலி குப்பம்"},
  "Kadalore Chinna Kuppam": {"ta":"கடலூர் சின்னக் குப்பம்"},
  "Kadappakam": {"ta":"கடாப்பாக்கம்"},
  "Kaippanikuppam": {"ta":"கைப்பாணிக்குப்பம்"},
  "Kalimankundu": {"ta":"களிமண்குண்டு"},
  "Kallamozhi": {"ta":"கல்லாமொழி"},
  "Kallinodu": {"ta":"கள்ளினோடு"},
  "Kameshwaram": {"ta":"காமேஸ்வரம்"},
  "Kanathur": {"ta":"கானாத்தூர்"},
  "Kanathur Reddy Kuppam": {"ta":"கானாத்தூர் ரெட்டி குப்பம்"},
  "Kanniyakumari": {"ta":"கன்னியாகுமரி"},
  "Karaiyurtheru": {"ta":"காரையூர்தெரு"},
  "Karanguda": {"ta":"கரங்குடா"},
  "Karankadu": {"ta":"காரங்காடு"},
  "Karikal": {"ta":"காரைக்கால்"},
  "Kasikoilkuppam": {"ta":"காசிகோயில்குப்பம்"},
  "Kasiviswanathar koil Kuppam": {"ta":"காசிவிஸ்வநாதர் கோயில் குப்பம்"},
  "Kathivakkam Chinnakuppam": {"ta":"கத்திவாக்கம் சின்னக்குப்பம்"},
  "Kathivakkam Periakuppam": {"ta":"கத்திவாக்கம் பெரியகுப்பம்"},
  "Kattumavadi": {"ta":"காட்டுமாவடி"},
  "Kaverippattinam": {"ta":"காவேரிப்பட்டினம்"},
  "Kazhumanguda": {"ta":"கழுமங்குடா"},
  "Keelakudiyiruppu": {"ta":"கீழக்குடியிருப்பு"},
  "Keelathottam": {"ta":"கீழத்தோட்டம்"},
  "Keezhakadiapattinam": {"ta":"கீழக்கடியப்பட்டினம்"},
  "Keezhamanakudi": {"ta":"கீழமணக்குடி"},
  "Keezhamoovarkarai": {"ta":"கீழமூவர்க்கரை"},
  "Keezhavaippar": {"ta":"கீழவைப்பார்"},
  "Kesavanputhenthurai": {"ta":"கேசவன்புத்தன்துறை"},
  "Kilakarai": {"ta":"கீழக்கரை"},
  "Killai": {"ta":"கிள்ளை"},
  "Kodimunai": {"ta":"கொடிமுனை"},
  "Kodiyakarai": {"ta":"கோடியக்கரை"},
  "Kokilamedu": {"ta":"கோகிலமேடு"},
  "Kollukadu": {"ta":"கொள்ளுக்காடு"},
  "Kombuthurai Madhakoil": {"ta":"கொம்புத்துறை மாதாகோவில்"},
  "Komuttichavadikuppam": {"ta":"கொமுட்டிச்சாவடிக்குப்பம்"},
  "Kooduthalai": {"ta":"கூடுதாழை"},
  "Koonimedu Kuppam": {"ta":"கூனிமேடு குப்பம்"},
  "Koothanguzhi": {"ta":"கூத்தங்குழி"},
  "Koottappanai": {"ta":"கூட்டப்பனை"},
  "Koozhayar": {"ta":"கூழையார்"},
  "Kottaimedu": {"ta":"கோட்டைமேடு"},
  "Kottaippattanam": {"ta":"கோட்டைப்பட்டினம்"},
  "Kottilpadu": {"ta":"கொட்டில்பாடு"},
  "Kottivakkam": {"ta":"கொட்டிவாக்கம்"},
  "Kovalam": {"ta":"கோவளம்"},
  "Kovalam Kanniyakumarai": {"ta":"கோவளம் (கன்னியாகுமரி)"},
  "Krishnajipattinam": {"ta":"கிருஷ்ணாஜிபட்டினம்"},
  "Kudangulam": {"ta":"கூடங்குளம்"},
  "Kulasekharapattinam": {"ta":"குலசேகரப்பட்டினம்"},
  "Kumarapettai": {"ta":"குமாரப்பேட்டை"},
  "Kundal": {"ta":"குண்டல்"},
  "Kurumbanai": {"ta":"குரும்பனை"},
  "Kuttapuli": {"ta":"கூட்டப்புளி"},
  "Kuttiyandiyur": {"ta":"குட்டியாண்டியூர்"},
  "Lakshmipuram Odaikuppam": {"ta":"லட்சுமிபுரம் ஓடைக்குப்பம்"},
  "Lipuram": {"ta":"லீபுரம்"},
  "M.G.R. Thittu": {"ta":"எம்.ஜி.ஆர். திட்டு"},
  "M.R.Pattinam": {"ta":"எம்.ஆர்.பட்டினம்"},
  "Madathukuppam": {"ta":"மடத்துக்குப்பம்"},
  "Madavamedu": {"ta":"மாதவமேடு"},
  "Mahabalipuram": {"ta":"மாமல்லபுரம்"},
  "Mallipattinam": {"ta":"மல்லிப்பட்டினம்"},
  "Mamallapuram": {"ta":"மாமல்லபுரம்"},
  "Manamelkudi": {"ta":"மணமேல்குடி"},
  "Manappad Pt": {"ta":"மணப்பாடு முனை"},
  "Mandaikadu puthoor": {"ta":"மண்டைக்காடு புதூர்"},
  "Mandapam (South)": {"ta":"மண்டபம் தெற்கு"},
  "Mandavai Pudukuppam": {"ta":"மண்டவை புதுக்குப்பம்"},
  "Mandhiripattinam": {"ta":"மந்திரிபட்டினம்"},
  "Mandpam (North)": {"ta":"மண்டபம் வடக்கு"},
  "Marakkanam": {"ta":"மரக்காணம்"},
  "Maravakadu": {"ta":"மறவக்காடு"},
  "Marthandamthurai": {"ta":"மார்த்தாண்டன்துறை"},
  "Mattankuppam": {"ta":"மட்டான்குப்பம்"},
  "Mela Manakudi": {"ta":"மேல மணக்குடி"},
  "Melakadiapattinam": {"ta":"மேலக்கடியப்பட்டினம்"},
  "Melamuttom": {"ta":"மேலமுட்டம்"},
  "Meyyurkuppam": {"ta":"மெய்யூர்க்குப்பம்"},
  "Midaalam": {"ta":"மிதாலம்"},
  "Midalam (Naduthurai": {"ta":"மிதாலம் (நடுத்தூறை)"},
  "Moorthipudukuppam": {"ta":"மூர்த்திபுதுக்குப்பம்"},
  "Moreppanai": {"ta":"மோரைப்பனை"},
  "Mudaliarkuppam": {"ta":"முதலியார்குப்பம்"},
  "Mudaliyar Kuppam": {"ta":"முதலியார் குப்பம்"},
  "Mudasalodai": {"ta":"முடசல்ஓடை"},
  "Mudasalodai Village": {"ta":"முடசல்ஓடை கிராமம்"},
  "Mudiveeranpattinam": {"ta":"முடிவீரன்பட்டினம்"},
  "Mukuntharayarchatram": {"ta":"முகுந்தராயர்சத்திரம்"},
  "Mullimanagar": {"ta":"முள்ளிமாநகர்"},
  "Mullimanai": {"ta":"முள்ளிமனை"},
  "Mulloorthurai": {"ta":"முள்ளூர்துறை"},
  "Munaikadu": {"ta":"முனைகாடு"},
  "Muthanenthal": {"ta":"முத்தானேந்தல்"},
  "Muthukuda": {"ta":"முத்துக்குடா"},
  "Muthupet": {"ta":"முத்துப்பேட்டை"},
  "Muttom": {"ta":"முட்டம்"},
  "Muttukaduazhagankuppam": {"ta":"முட்டுக்காடு அழகன்குப்பம்"},
  "Muttupettai": {"ta":"முத்துப்பேட்டை"},
  "Nadukuppam": {"ta":"நடுக்குப்பம்"},
  "Nagapattinam Harbour": {"ta":"நாகப்பட்டினம் துறைமுகம்"},
  "Nagore": {"ta":"நாகூர்"},
  "Naickerkuppam": {"ta":"நாயக்கர்குப்பம்"},
  "Nainarkuppam": {"ta":"நயினார்குப்பம்"},
  "Nallathanneer Odaikuppam": {"ta":"நல்லதண்ணீர் ஓடைக்குப்பம்"},
  "Nallavadu": {"ta":"நல்லவாடு"},
  "Nambiyar Nagar": {"ta":"நம்பியர் நகர்"},
  "Nambuthalai": {"ta":"நம்புதாளை"},
  "Narambai": {"ta":"நரம்பை"},
  "Narendhal": {"ta":"நரேந்தல்"},
  "Neerodi": {"ta":"நீரோடி"},
  "Nemmelikuppam": {"ta":"நெம்மேலிக்குப்பம்"},
  "Nochikuppam": {"ta":"நொச்சிக்குப்பம்"},
  "Odaikuppam": {"ta":"ஓடைக்குப்பம்"},
  "Olaikuda": {"ta":"ஓலைக்குடா"},
  "Ondikuppam": {"ta":"ஒண்டிக்குப்பம்"},
  "Orurkuppam": {"ta":"ஊரூர் குப்பம்"},
  "P. Pudukuppam": {"ta":"பி. புதுக்குப்பம்"},
  "Padalore Periya Kuppam": {"ta":"பாடலூர் பெரிய குப்பம்"},
  "Palagaithottikuppam": {"ta":"பலகைத்தொட்டிக்குப்பம்"},
  "Palanivalasai": {"ta":"பழனிவலசை"},
  "Palavakkam": {"ta":"பாலவாக்கம்"},
  "Pallam": {"ta":"பள்ளம்"},
  "Pamban Kunthukal": {"ta":"பாம்பன் குந்துகால்"},
  "Pamban Light House": {"ta":"பாம்பன் கலங்கரை விளக்கம்"},
  "Panaikulam": {"ta":"பனைக்குளம்"},
  "Panaiyur Chinnakuppam": {"ta":"பனையூர் சின்னக்குப்பம்"},
  "Panaiyur Periya Kuppam": {"ta":"பனையூர் பெரியகுப்பம்"},
  "Panaiyurkuppam": {"ta":"பனையூர்க்குப்பம்"},
  "Pandyan": {"ta":"பாண்டியன்"},
  "Panithittu": {"ta":"பனித்திட்டு"},
  "Paramankeni": {"ta":"பரமன்கேணி"},
  "Parangipettai": {"ta":"பரங்கிப்பேட்டை"},
  "Pasipattinam": {"ta":"பாசிபட்டினம்"},
  "Pathanendal": {"ta":"பத்தானேந்தல்"},
  "Pattanamarudur": {"ta":"பட்டணமருதூர்"},
  "Pattinacherry": {"ta":"பட்டினச்சேரி"},
  "Pattinampakkam": {"ta":"பட்டினப்பாக்கம்"},
  "Pattipulam": {"ta":"பட்டிபுலம்"},
  "Pazhayanadukuppam": {"ta":"பழையநடுக்குப்பம்"},
  "Pazhayar": {"ta":"பழையாறு"},
  "Periasamypuram": {"ta":"பெரியசாமிபுரம்"},
  "Periavilai": {"ta":"பெரியவிளை"},
  "Periya Kalapet": {"ta":"பெரிய காலாப்பட்டு"},
  "Periya Neelankarai": {"ta":"பெரிய நீலாங்கரை"},
  "Periyakadu": {"ta":"பெரியகாடு"},
  "Periyakuppam": {"ta":"பெரியகுப்பம்"},
  "Periyamangodu": {"ta":"பெரியமாங்கோடு"},
  "Periyathalai": {"ta":"பெரியதாழை"},
  "Perumalpettai": {"ta":"பெருமாள்பேட்டை"},
  "Perumanal": {"ta":"பெருமணல்"},
  "Perun Thuravu Kuppam": {"ta":"பெருந்துறவு குப்பம்"},
  "Pillaichavadi": {"ta":"பிள்ளைச்சாவடி"},
  "Pillayarthidal": {"ta":"பிள்ளையார்திடல்"},
  "Point Calimer": {"ta":"கோடியக்கரை முனை"},
  "Ponagaram": {"ta":"பொன்னகரம்"},
  "Pondicherry": {"ta":"புதுச்சேரி"},
  "Poombuhar": {"ta":"பூம்புகார்"},
  "Poothurai": {"ta":"பூத்துறை"},
  "Portonovo": {"ta":"பரங்கிப்பேட்டை (போர்ட்டோநோவோ)"},
  "Pozhikkarai": {"ta":"பொழிக்கரை"},
  "Prathaparamanpattinam": {"ta":"பிரதாபராமன்பட்டினம்"},
  "Pudhukalpakkam": {"ta":"புதுக்கல்பாக்கம்"},
  "Pudhukkudi North": {"ta":"புதுக்குடி வடக்கு"},
  "Pudhukkudi South": {"ta":"புதுக்குடி தெற்கு"},
  "Pudhukuppam": {"ta":"புதுக்குப்பம்"},
  "Pudhunadukuppam": {"ta":"புதுநடுக்குப்பம்"},
  "Pudhupattinam": {"ta":"புதுப்பட்டினம்"},
  "Pudhupettai": {"ta":"புதுப்பேட்டை"},
  "Pudhuvalasaichathiram": {"ta":"புதுவலசைச்சத்திரம்"},
  "Pudu Nemeli Kuppam": {"ta":"புது நெம்மேலி குப்பம்"},
  "Pudukkudi": {"ta":"புதுக்குடி"},
  "Pudukuppam": {"ta":"புதுக்குப்பம்"},
  "Pudupattinam": {"ta":"புதுப்பட்டினம்"},
  "Pulicat": {"ta":"பழவேற்காடு"},
  "Punnakkayal": {"ta":"புன்னக்காயல்"},
  "Pushpavanam": {"ta":"புஷ்பவனம்"},
  "Puthenthurai": {"ta":"புத்தன்துறை"},
  "Puthugramam (Vavuthurai": {"ta":"புதுகிராமம் (வவுத்துறை)"},
  "Puthupattinam": {"ta":"புதுப்பட்டினம்"},
  "Puthur": {"ta":"புதூர்"},
  "R.Pudhupattinam": {"ta":"ஆர்.புதுப்பட்டினம்"},
  "Rajakamangalam Thurai": {"ta":"ராஜக்கமங்கலம்துறை"},
  "Rajakkamanglam": {"ta":"ராஜக்கமங்கலம்"},
  "Rajappettai": {"ta":"ராஜப்பேட்டை"},
  "Ramanthurai": {"ta":"ராமன்துறை"},
  "Rameshwaram Harbour": {"ta":"ராமேஸ்வரம் துறைமுகம்"},
  "Ratchanyapuram": {"ta":"ரட்சண்யபுரம்"},
  "Rojma Nagar": {"ta":"ரோஜ்மா நகர்"},
  "Royapuram": {"ta":"ராயபுரம்"},
  "Sadras": {"ta":"சதுரங்கப்பட்டினம்"},
  "Salavankuppam": {"ta":"சாலவன்குப்பம்"},
  "Samanthanpettai": {"ta":"சாமந்தன்பேட்டை"},
  "Samanthapettai": {"ta":"சாமந்தப்பேட்டை"},
  "Sambaipattinam": {"ta":"சாம்பைப்பட்டினம்"},
  "Samiyarpettai": {"ta":"சாமியார்பேட்டை"},
  "Sathurangapattinam": {"ta":"சதுரங்கப்பட்டினம்"},
  "Seeniyappa Dharga": {"ta":"சீனியப்பா தர்கா"},
  "Seetharampattinam": {"ta":"சீதாராமன்பட்டினம்"},
  "Sembiyanmadevipattinam": {"ta":"செம்பியன்மாதேவிபட்டினம்"},
  "Senthalaivayal": {"ta":"செந்தலைவயல்"},
  "Seruthur": {"ta":"செருதூர்"},
  "Sethubavachattram": {"ta":"சேதுபாவாசத்திரம்"},
  "Simon colony": {"ta":"சைமன் காலனி"},
  "Singhithurai": {"ta":"சிங்கித்துறை"},
  "Sippikulam": {"ta":"சிப்பிகுளம்"},
  "Sodhanaikuppam": {"ta":"சோதனைக்குப்பம்"},
  "Solainagar North": {"ta":"சோலைநகர் வடக்கு"},
  "Soliyakudi Harbour": {"ta":"சோளியக்குடி துறைமுகம்"},
  "Somanathanpattinam": {"ta":"சோமநாதன்பட்டினம்"},
  "Sonaankuppam": {"ta":"சோனான்குப்பம்"},
  "Soolerikattukuppam": {"ta":"சூலேரிக்காட்டுக்குப்பம்"},
  "Sothikuppam": {"ta":"சோதிக்குப்பம்"},
  "Srinivasapuram": {"ta":"சீனிவாசபுரம்"},
  "Subbamachatram": {"ta":"சுப்பம்மாசத்திரம்"},
  "Sundarapandiyanpatta": {"ta":"சுந்தரபாண்டியன்பட்டினம்"},
  "Terku Mookkaiyur": {"ta":"தெற்கு மூக்கையூர்"},
  "Thalampettai": {"ta":"தாளம்பேட்டை"},
  "Thalamuthunagar": {"ta":"தாளமுத்துநகர்"},
  "Thambikottai": {"ta":"தம்பிக்கோட்டை"},
  "Thandhirayankuppam": {"ta":"தந்திராயன்குப்பம்"},
  "Thangachimadam": {"ta":"தங்கச்சிமடம்"},
  "Tharangampadi": {"ta":"தரங்கம்பாடி"},
  "Tharuvaikulam": {"ta":"தருவைகுளம்"},
  "Thazankuppam": {"ta":"தாழங்குப்பம்"},
  "Thazhanguda": {"ta":"தாழங்குடா"},
  "Theerthaandathanam": {"ta":"தீர்த்தாண்டதானம்"},
  "Thengaithittu": {"ta":"தேங்காய்த்திட்டு"},
  "Thengapattanam": {"ta":"தேங்காய்ப்பட்டணம்"},
  "Therespuram": {"ta":"திரேஸ்புரம்"},
  "Thiruchinnankuppam": {"ta":"திருச்சின்னங்குப்பம்"},
  "Thirupalaikudi North": {"ta":"திருப்பாலைக்குடி வடக்கு"},
  "Thiruvanmiyur": {"ta":"திருவான்மியூர்"},
  "Thoduvai": {"ta":"தொடுவாய்"},
  "Thommayarpuram(Muddukuli": {"ta":"தொம்மையார்புரம் (முத்துக்குளி)"},
  "Thoothukudi": {"ta":"தூத்துக்குடி"},
  "Thoothur": {"ta":"தூத்தூர்"},
  "Tirumullaivasal": {"ta":"திருமுல்லைவாசல்"},
  "Tiruvettriyur": {"ta":"திருவொற்றியூர்"},
  "Tondi": {"ta":"தொண்டி"},
  "Topputturai": {"ta":"தோப்புத்துறை"},
  "Tranquebar": {"ta":"தரங்கம்பாடி"},
  "Tuticorin": {"ta":"தூத்துக்குடி"},
  "Umarikuppam": {"ta":"உமரிக்குப்பம்"},
  "Uvari": {"ta":"உவரி"},
  "Uyyalikuppam": {"ta":"உய்யாலிக்குப்பம்"},
  "Vadakku Amapattinam": {"ta":"வடக்கு அம்மபட்டினம்"},
  "Vaithikuppam": {"ta":"வைத்திக்குப்பம்"},
  "Valangapuri": {"ta":"வலங்கபுரி"},
  "Valasapatinam(P.V.Pattinam": {"ta":"வலசபட்டினம்"},
  "Valinokkam": {"ta":"வாலினோக்கம்"},
  "Vallavanpattinam": {"ta":"வல்லவன்பட்டினம்"},
  "Vallavilai": {"ta":"வள்ளவிளை"},
  "Vanagiri": {"ta":"வானகிரி"},
  "Vanavanmadevi": {"ta":"வானவன்மாதேவி"},
  "Vaniyakudi": {"ta":"வாணியக்குடி"},
  "Vasavankuppam": {"ta":"வாசவன்குப்பம்"},
  "Vedaranniyam": {"ta":"வேதாரண்யம்"},
  "Vedhalai": {"ta":"வேதாளை"},
  "Veerampatinam": {"ta":"வீரம்பட்டினம்"},
  "Veerampattinam": {"ta":"வீரம்பட்டினம்"},
  "Veerapandiyapattinam": {"ta":"வீரபாண்டியன்பட்டினம்"},
  "Velanganni": {"ta":"வேளாங்கண்ணி"},
  "Velivayal": {"ta":"வெளிவயல்"},
  "Vellapallam": {"ta":"வெள்ளப்பள்ளம்"},
  "Vellapatti": {"ta":"வெள்ளப்பட்டி"},
  "Vembar": {"ta":"வேம்பார்"},
  "Venpursham": {"ta":"வெண்புருஷம்"},
  "Veppalodai": {"ta":"வேப்பலோடை"},
  "Verkode": {"ta":"வர்கோடு"},
  "Vettaikaranrippu": {"ta":"வேட்டைக்காரனிருப்பு"},
  "Villundi": {"ta":"வில்லூண்டி"},
  "Vilunthamavadi": {"ta":"விழுந்தமாவடி"},
  "Madhvad Lighthouse": {"gu":"માધવાડ દીવાદાંડી"},
  "Chapora": {"mr":"चापोरा"},
  "Santerem Pt (Vasco)": {"mr":"सांतेरेम पॉईंट (वास्को)"},
  "Santerem Pt": {"ta":"சாந்தெரெம் முனை"},
  "Rohisha": {"gu":"રોહિશા"},
  "Vadinar": {"gu":"વાડીનાર"},
  "Adri": {"gu":"અદ્રી"},
  "Shil": {"gu":"શિલ"},
  "Nava Bandar": {"gu":"નવા બંદર"},
  "Lakhapat": {"gu":"લખપત"},
  "Tukda Miyani": {"gu":"તુકડા મિયાની"},
  "Kalai": {"gu":"કલાઈ"},
  "Baindur": {"kn":"ಬೈಂದೂರು"},
  "Majali": {"kn":"ಮಜಾಲಿ"},
  "Zai": {"mr":"झाई"},
  "Ulwa Moha": {"ta":"உல்வா மோஹா"},
  "Veshawi-Bankot": {"mr":"वेशावी-बाणकोट"},
  "Vijayadurg Hr": {"mr":"विजयदुर्ग बंदर"},
  "Dongi Point": {"mr":"डोंगी पॉईंट"},
  "Bandar": {"or":"ବନ୍ଦର"},
  "Chumuhani": {"or":"ଚୁମୁହାନି"},
  "Ramalanka": {"or":"ରାମଲଙ୍କା"},
  "Kuttapulli": {"ta":"கூட்டப்புளி"},
  "Kakdwip": {"bn":"কাকদ্বীপ"},
  "Kappil": {"ml":"കാപ്പിൽ"},
  "Chellanum": {"ml":"ചെല്ലാനം"},
  "Munambam FH": {"ta":"முனம்பம் மீன்பிடி துறைமுகம்"},
  "Valapattanam": {"ml":"വളപട്ടണം"},
  "Kunzhathur": {"ml":"കുഞ്ചത്തൂർ"},
  "Alappattu": {"ml":"ആലപ്പാട്ട്"},
  "Chombala FH": {"ta":"சோம்பாலா மீன்பிடி துறைமுகம்"},
  "Kadaludinagaram": {"ta":"கடலுண்டிநகரம்"},
  "Attupuram": {"ml":"ആറ്റുപുറം"},
  "Antarvedi": {"te":"అంతర్వేది"},
  "Nachugunta": {"te":"నాచుగుంట"},
  "Palmanpeta": {"te":"పాల్మన్‌పేట"},
  "Mukkam": {"te":"ముక్కం"},
  "Ahirajpur": {"or":"ଅହିରାଜପୁର"},
  "Anantaraipur": {"or":"ଅନନ୍ତରାୟପୁର"},
  "Atharabanki": {"or":"ଅଠରବଙ୍କି"},
  "AzheekalJetty": {"ml":"അഴീക്കൽ ജെട്ടി"},
  "Azhikal": {"ml":"അഴീക്കൽ"},
  "Bagmandla": {"mr":"बागमंडला"},
  "Belapur": {"mr":"बेलापूर"},
  "Bestapalem Bapatla": {"ta":"பெஸ்தபாலம் பாபட்லா"},
  "Bhatkal": {"kn":"ಭಟ್ಕಳ"},
  "Bhimpur": {"gu":"ભીમપૂર"},
  "Bhimunipatnam": {"te":"భీమునిపట్నం"},
  "Chintapalli": {"te":"చింతపల్లి"},
  "Chorwad": {"gu":"ચોરવાડ"},
  "Chudamani": {"or":"ଚୂଡ଼ାମଣି"},
  "Dipla": {"gu":"દિપલા"},
  "Diu Island": {"gu":"દીવ ટાપુ"},
  "Edava": {"ml":"ഇടവ"},
  "Gadhada": {"gu":"ગઢડા"},
  "Harshad Miyani": {"gu":"હર્ષદ મિયાણી"},
  "Jambhari": {"mr":"जांभरी"},
  "Kamatalav": {"gu":"કામતળાવ"},
  "Kandla": {"gu":"કંડલા"},
  "Kanthiajal": {"gu":"કાંઠિયાજાળ"},
  "Kapu": {"kn":"ಕಾಪು"},
  "Kaviti": {"te":"కవిటి"},
  "Kodungallur": {"ml":"കൊടുങ്ങല്ലൂർ"},
  "Kolamb": {"mr":"कोलंब"},
  "Koloth": {"ml":"കൊളോത്ത്"},
  "Kosamba (Mangelvad)": {"gu":"કોસંબા (માંગેલવાડ)"},
  "Kotte Kunnu": {"ml":"കോട്ടേക്കുന്ന്"},
  "Lothian Island": {"bn":"লোথিয়ান দ্বীপ"},
  "Madhavpur": {"gu":"માધવપુર"},
  "Mangalore": {"kn":"ಮಂಗಳೂರು"},
  "Maruvakad": {"ml":"മറുവക്കാട്"},
  "Mul Dwaraka": {"ta":"முல் துவாரகை"},
  "Mulki": {"kn":"ಮುಲ್ಕಿ"},
  "Nani Danti": {"ta":"நானி தந்தி"},
  "New Mahe": {"ta":"நியூ மாஹி"},
  "Nizampatnam": {"te":"నిజాంపట్నం"},
  "Nuagar": {"or":"ନୂଆଗଡ଼"},
  "Palappetty": {"ml":"പാലപ്പെട്ടി"},
  "Panaji (Malim)": {"mr":"पणजी (मालिम)"},
  "Panchubisa": {"or":"ପାଞ୍ଚୁବିଶା"},
  "Patva": {"gu":"પટવા"},
  "Pedda Gollapalem": {"te":"పెద్ద గొల్లపాలెం"},
  "Perumallapuram": {"te":"పెరుమాళ్ళపురం"},
  "Pozhiyoor": {"ta":"பொழீயூர்"},
  "Prayagi": {"or":"ପ୍ରୟାଗୀ"},
  "Ramachandrapuram": {"te":"రామచంద్రపురం"},
  "Ramanattukara": {"ml":"രാമനാട്ടുകര"},
  "Ramayapatnam": {"te":"రామాయపట్నం"},
  "Kasimedu": {"ta":"காசிமேடு"},
  "Saiyad Rajpara": {"gu":"સૈયદ રાજપરા"},
  "Surwada": {"gu":"સુરવાડા"},
  "Talasari": {"or":"ତାଳସାରି"},
  "Talchua": {"or":"ତାଳଚୁଆ"},
  "Terekhol": {"mr":"तेरेखोल"},
  "Umargam": {"gu":"ઉમરગામ"},
  "Vadarevu": {"te":"వాడరేవు"},
  "Vasai": {"mr":"वसई"},
  "Vatturupapallepalam": {"ta":"வட்டூரு பாப்பல்லேபாலம்"},
  "SOUTH TAMILNADU": {"ta":"தெற்கு தமிழ்நாடு"},
  "NORTH TAMILNADU": {"ta":"வடக்கு தமிழ்நாடு"},
  "KANYAKUMARI": {"ta":"கன்னியாகுமரி"},
  "Kanyakumari": {"ta":"கன்னியாகுமரி"}
};

const I18N_LANDING_CENTRE_REGIONS = {
  "SATPATI": "MAHARASHTRA",
  "RANGAON": "MAHARASHTRA",
  "MUTHUBHADANDA": "MAHARASHTRA",
  "DATIWARE": "MAHARASHTRA",
  "TARAPUR PT": "MAHARASHTRA",
  "EDAVAN/KORE": "MAHARASHTRA",
  "TEMBHI": "MAHARASHTRA",
  "VENGURLA": "MAHARASHTRA",
  "WORLI-LOTUS": "MAHARASHTRA",
  "NAGAON": "MAHARASHTRA",
  "REWDANDA": "MAHARASHTRA",
  "WADA VETYE": "MAHARASHTRA",
  "GOLAP-PAWAS": "MAHARASHTRA",
  "PAJ": "MAHARASHTRA",
  "MAVLANGA": "MAHARASHTRA",
  "THAL": "MAHARASHTRA",
  "POKHARANDANDI/UCHHELI": "MAHARASHTRA",
  "RAJPURI": "MAHARASHTRA",
  "WAREDI": "MAHARASHTRA",
  "KHAVANA": "MAHARASHTRA",
  "VASAI(PACHUBANDAR)": "MAHARASHTRA",
  "PURNAGAD": "MAHARASHTRA",
  "KAMBODE": "MAHARASHTRA",
  "SALAV": "MAHARASHTRA",
  "PADVE": "MAHARASHTRA",
  "HEDVI": "MAHARASHTRA",
  "MULGAONDANDA": "MAHARASHTRA",
  "MOBAR-BHOGAVE": "MAHARASHTRA",
  "DEOBAG": "MAHARASHTRA",
  "NAVGAON": "MAHARASHTRA",
  "VELAS": "MAHARASHTRA",
  "PATWADI": "MAHARASHTRA",
  "GHOLVAD": "MAHARASHTRA",
  "SAKHARJAIGAD": "MAHARASHTRA",
  "NAVAPUR (UCHELI CR)": "MAHARASHTRA",
  "MANORI": "MAHARASHTRA",
  "MIRKARWADA": "MAHARASHTRA",
  "UARASHI RF": "MAHARASHTRA",
  "ANJARLE": "MAHARASHTRA",
  "KUNKESHWAR/KATVAN": "MAHARASHTRA",
  "SASAWANE": "MAHARASHTRA",
  "PHANSEPADAWANE": "MAHARASHTRA",
  "GUHAGAR": "MAHARASHTRA",
  "DANDA": "MAHARASHTRA",
  "COLABA PT.(MUMBAI)": "MAHARASHTRA",
  "JAIGARH HEAD": "MAHARASHTRA",
  "TOLKESHWAR PT": "MAHARASHTRA",
  "PABHARE": "MAHARASHTRA",
  "CUFFPARED": "MAHARASHTRA",
  "WELNESHWAR": "MAHARASHTRA",
  "VADARAI": "MAHARASHTRA",
  "DABHOSWADA/NAVABAG": "MAHARASHTRA",
  "RATNAGIRI": "MAHARASHTRA",
  "URAN": "MAHARASHTRA",
  "AGARDANDA": "MAHARASHTRA",
  "WADATAR/MALAI": "MAHARASHTRA",
  "KHARSAI": "MAHARASHTRA",
  "SHIRGAON": "MAHARASHTRA",
  "KHOCHIWADE": "MAHARASHTRA",
  "WAGAPUR PT": "MAHARASHTRA",
  "PALSHET": "MAHARASHTRA",
  "BURONDI": "MAHARASHTRA",
  "SANTEREM PT (VASCO)": "MAHARASHTRA",
  "FATARDE": "MAHARASHTRA",
  "MAJORDE": "MAHARASHTRA",
  "BETUL": "MAHARASHTRA",
  "TALPONA": "MAHARASHTRA",
  "CHAPORA": "MAHARASHTRA",
  "KOLAMB": "MAHARASHTRA",
  "CUTBONA": "MAHARASHTRA",
  "PANAJI (MALIM)": "MAHARASHTRA",
  "AGUADA": "MAHARASHTRA",
  "SURATAKAL PT": "KARNATAKA",
  "BELEKERI": "KARNATAKA",
  "UDIYAVARA": "KARNATAKA",
  "NEW MANGALORE": "KARNATAKA",
  "MULKI": "KARNATAKA",
  "KOTA": "KARNATAKA",
  "SHIRALI": "KARNATAKA",
  "GANGAVALI": "KARNATAKA",
  "TEREKHOL": "MAHARASHTRA",
  "SAKHAR-HEDVI": "MAHARASHTRA",
  "ANJANVEL": "MAHARASHTRA",
  "AVAS": "MAHARASHTRA",
  "KORLAI": "MAHARASHTRA",
  "MAHIM": "MAHARASHTRA",
  "ALIBAG": "MAHARASHTRA",
  "EKDARA": "MAHARASHTRA",
  "KHANOLI-WAYANGANI": "MAHARASHTRA",
  "KARANJA URAN": "MAHARASHTRA",
  "MITHMUMBRI/TARAMUMBARI": "MAHARASHTRA",
  "KUDGAON": "MAHARASHTRA",
  "KHARDANDA": "MAHARASHTRA",
  "BORLI-MANDLA": "MAHARASHTRA",
  "AADEUTTAMBAR": "MAHARASHTRA",
  "HARNE": "MAHARASHTRA",
  "DEVGARH": "MAHARASHTRA",
  "THERONDA": "MAHARASHTRA",
  "MTDC": "MAHARASHTRA",
  "DABHOL": "MAHARASHTRA",
  "ASGOLI": "MAHARASHTRA",
  "WORLI": "MAHARASHTRA",
  "ARNALAPADA": "MAHARASHTRA",
  "PURANGAD": "MAHARASHTRA",
  "MAHIM CR": "MAHARASHTRA",
  "REDI": "MAHARASHTRA",
  "RAJIWADA-KERLA": "MAHARASHTRA",
  "VAROR": "MAHARASHTRA",
  "KELWANE": "MAHARASHTRA",
  "SAKHAR-AKSHI": "MAHARASHTRA",
  "CHIMBAI": "MAHARASHTRA",
  "VESHAWI-BANKOT": "MAHARASHTRA",
  "DIVEAGAR": "MAHARASHTRA",
  "DAHANU": "MAHARASHTRA",
  "BOKARWADI": "MAHARASHTRA",
  "MADH": "MAHARASHTRA",
  "TARKARLI/KALETHAR": "MAHARASHTRA",
  "ARNALA": "MAHARASHTRA",
  "KELUS": "MAHARASHTRA",
  "GORAI": "MAHARASHTRA",
  "JAMBHARI": "MAHARASHTRA",
  "DONGRI": "MAHARASHTRA",
  "VARAWADE": "MAHARASHTRA",
  "VARSOLICHALMALA": "MAHARASHTRA",
  "MITHBAO": "MAHARASHTRA",
  "PHANSOP": "MAHARASHTRA",
  "AMBERE": "MAHARASHTRA",
  "REVAS": "MAHARASHTRA",
  "JUHUMORAGAON": "MAHARASHTRA",
  "MOCHEMAD": "MAHARASHTRA",
  "KOLTHARE": "MAHARASHTRA",
  "RAJIWADA": "MAHARASHTRA",
  "VIJAYDURG": "MAHARASHTRA",
  "PULLUT": "KERALA",
  "KOTTAKKAL": "KERALA",
  "THAZHAMPALLY": "KERALA",
  "CHERUVATHURFH": "KERALA",
  "KASARAGOD": "KERALA",
  "CHILLICKAL": "KERALA",
  "CHERAI": "KERALA",
  "PONNANI": "KERALA",
  "KADALUNDINAGARAM": "KERALA",
  "ATTUPURAM": "KERALA",
  "MULLASSHERI": "KERALA",
  "PURATTUR": "KERALA",
  "CHITTARI": "KERALA",
  "POILKAVU": "KERALA",
  "PURAKKAD": "KERALA",
  "POLLETHAI": "KERALA",
  "EDAKAZHIYUR": "KERALA",
  "PALAPETTY": "KERALA",
  "RAMANCHERI TURA": "KERALA",
  "CALICUT": "KERALA",
  "BEKAL": "KERALA",
  "PUNNAPPRA": "KERALA",
  "MOODADY": "KERALA",
  "AJANOOR-N-BELLA": "KERALA",
  "HOSDRUG": "KERALA",
  "KUMBLA": "KERALA",
  "CHAVARA": "KERALA",
  "ELATHUR": "KERALA",
  "VALARPADAM": "KERALA",
  "PUTHENKADAPPURAM": "KERALA",
  "THIKKODI(KODIKKAL)": "KERALA",
  "THALIKULAM": "KERALA",
  "PALLITHODU": "KERALA",
  "BEYPOREFH": "KERALA",
  "KIZHUR": "KERALA",
  "KAVVAYI": "KERALA",
  "TIKKOTI": "KERALA",
  "KARA": "KERALA",
  "AYIKKARAFH": "KERALA",
  "AZHEECODESOUTH": "KERALA",
  "AZHEEKALJETTY": "KERALA",
  "UPPALA": "KERALA",
  "THRIKUNNAPUZHA": "KERALA",
  "ALLEPPEYBEACH": "KERALA",
  "PUDUPPANAM": "KERALA",
  "PARAPANANGADI": "KERALA",
  "PADIYAMKARA TEKKU": "KERALA",
  "KALAMUKKU": "KERALA",
  "THANUR": "KERALA",
  "VETTUTHURA": "KERALA",
  "VELIYANGOD": "KERALA",
  "NATTIKA": "KERALA",
  "KOIPADI": "KERALA",
  "KAZHIMBRAM": "KERALA",
  "PALLIKERE": "KERALA",
  "ETTIKULAM": "KERALA",
  "ARIKKADI": "KERALA",
  "KOTIKULAM": "KERALA",
  "CHOMBALAFH": "KERALA",
  "PANCHAVADI": "KERALA",
  "AZHEECODE": "KERALA",
  "VADAKKEKADAPPURAM": "KERALA",
  "PUTHENTHURA": "KERALA",
  "PUTHENGADI/PARAVANNA": "KERALA",
  "VADANAPPALLY": "KERALA",
  "MURIKUMPADAM": "KERALA",
  "NARAKKAL": "KERALA",
  "AZHIKAL": "KERALA",
  "BADAGARAAZHITHALA": "KERALA",
  "MOGRAL": "KERALA",
  "ARTHUNKAL/CHENNAVELY": "KERALA",
  "MARUVAKAD": "KERALA",
  "KAPPAD": "KERALA",
  "KUNZHATHUR": "KERALA",
  "QUILANDY/KOLOTH(DEFUNCT)": "KERALA",
  "MUNAMBAMFH": "KERALA",
  "KANNUR": "KERALA",
  "EDAMUTTAM": "KERALA",
  "KOVILTHOTTAM": "KERALA",
  "MUZHUPPILANGAD": "KERALA",
  "BLANGAD": "KERALA",
  "ALAPPATTU": "KERALA",
  "THUMPOLLY": "KERALA",
  "CHERIAZHEEKAL": "KERALA",
  "KADALUR PT": "KERALA",
  "ERIYAD(CHELARAPPA)": "KERALA",
  "THAIKADAPPURAM": "KERALA",
  "CHELLANUM": "KERALA",
  "MANIYAT": "KERALA",
  "KUNDUPARABU": "KERALA",
  "MANAKKODAM": "KERALA",
  "CHALIYAM": "KERALA",
  "KOOTTAYI": "KERALA",
  "VYPEEN": "KERALA",
  "KOTTE KUNNU": "KERALA",
  "VAKKAD": "KERALA",
  "RAMANATTUKARA": "KERALA",
  "THOTTAPPALLY": "KERALA",
  "AMBALAPUZHA": "KERALA",
  "KUZHUPPILLY": "KERALA",
  "MANNALAMKUNNU": "KERALA",
  "MANJESHWARA": "KERALA",
  "THYKAL": "KERALA",
  "KOTTAMKULANGARA": "KERALA",
  "KOLLAM": "KERALA",
  "PUTHENTHODU(KANNAMALI)": "KERALA",
  "NEENDAKARA": "KERALA",
  "FORTKOCHI": "KERALA",
  "VADAKKAL": "KERALA",
  "MANAKODAM": "KERALA",
  "KALARKOD": "KERALA",
  "MALIPURAM": "KERALA",
  "VAYILATTUR": "KERALA",
  "ACHRA PT": "MAHARASHTRA",
  "ACHARA": "MAHARASHTRA",
  "TONDAVLI": "MAHARASHTRA",
  "HADI": "MAHARASHTRA",
  "SARJEKOT-MIRYABANDH": "MAHARASHTRA",
  "TALASHIL": "MAHARASHTRA",
  "SARJEKOT": "MAHARASHTRA",
  "DHURIVADA": "MAHARASHTRA",
  "SINDHUDURG (MALVAN)": "MAHARASHTRA",
  "WAYRI": "MAHARASHTRA",
  "THANKASSERY F.H.": "KERALA",
  "QUILONPORT": "KERALA",
  "QUILON": "KERALA",
  "WADI": "KERALA",
  "MOOTHAKARA": "KERALA",
  "PALLITHOTTAM": "KERALA",
  "ERAVIPURAM": "KERALA",
  "TANNI": "KERALA",
  "POZHIKKARA": "KERALA",
  "PARAVOOR": "KERALA",
  "EDAVA": "KERALA",
  "KAPPIL": "KERALA",
  "EDAVAL": "KERALA",
  "VETTOOR": "KERALA",
  "CHILAKKOOR": "KERALA",
  "ARIVALAM&RATHIKKAL": "KERALA",
  "MAMPALLY": "KERALA",
  "ANJENGONORTH": "KERALA",
  "ANJENGOSOUTH": "KERALA",
  "POOTHURA": "KERALA",
  "PERUMATHURA": "KERALA",
  "PUTHUKURICHI": "KERALA",
  "PUTHENTHOPPU": "KERALA",
  "ST.ANDREWS": "KERALA",
  "PALLITHURA": "KERALA",
  "THUMBA": "KERALA",
  "VALIAVELI": "KERALA",
  "KOCHUVELI": "KERALA",
  "VELL": "KERALA",
  "VETTUCAUD": "KERALA",
  "KANNANTHURA": "KERALA",
  "KOCHUTHOPPU": "KERALA",
  "TRIVANDRUM": "KERALA",
  "VALIATHURA/VALIATHURAPIER": "KERALA",
  "CHERIATHURA": "KERALA",
  "BHEEMAPALLY": "KERALA",
  "POONTHURA": "KERALA",
  "TIRUVALLAM": "KERALA",
  "PANATHURASOUTH": "KERALA",
  "KOVALAD": "KERALA",
  "VIZHINJAM&KOTTAPURAM": "KERALA",
  "VILINJAM": "KERALA",
  "VIZHINJAMNORTH": "KERALA",
  "MARIYANADU": "KERALA",
  "ADIMALATHURA": "KERALA",
  "PUTHIATHURA(KOCHUPALLY)": "KERALA",
  "KARICHAL": "KERALA",
  "GANGOLI": "KARNATAKA",
  "MANGALORE": "KARNATAKA",
  "KASARKOD": "KARNATAKA",
  "NAVUNDA": "KARNATAKA",
  "HONAVAR": "KARNATAKA",
  "NAVAYATKERE": "KARNATAKA",
  "MAJALI": "KARNATAKA",
  "BAINDUR": "KARNATAKA",
  "COONDAPOOR (GANGOLI)": "KARNATAKA",
  "TADRI": "KARNATAKA",
  "KAPU": "KARNATAKA",
  "KARKI": "KARNATAKA",
  "KARWAR": "KARNATAKA",
  "HOSABETTU-UDAIVAR": "KARNATAKA",
  "KUMTA PT": "KARNATAKA",
  "BHATKAL": "KARNATAKA",
  "HANGARKATTA": "KARNATAKA",
  "DHARESHVAR": "KARNATAKA",
  "MALPE": "KARNATAKA",
  "MAVALLI": "KARNATAKA",
  "SADASGUVGARG": "KARNATAKA",
  "MUNGE": "MAHARASHTRA",
  "KOLOTH": "KERALA",
  "SAKTHIKULANGARA": "KERALA",
  "ERNAKULAM": "KERALA",
  "NADAKKAVU": "KERALA",
  "URALUNGAL": "KERALA",
  "KUNNARIYAM": "KERALA",
  "PALAPPETTY": "KERALA",
  "TELLICHERRY": "KERALA",
  "NALLIYANKARA": "KERALA",
  "CHAVAKKAD": "KERALA",
  "CHETHY": "KERALA",
  "ARATUNGAL": "KERALA",
  "KODUNGALLUR": "KERALA",
  "KOCHI": "KERALA",
  "BADAGARA": "KERALA",
  "EDAKKAD": "KERALA",
  "VALAPATTANAM": "KERALA",
  "BEYPORE": "KERALA",
  "NAYARAMBALAM": "KERALA",
  "PERINJANAMARAATTUKADAVU": "KERALA",
  "VELLAYIL": "KERALA",
  "CHEMANCHERI": "KERALA",
  "KULIMUTTAM": "KERALA",
  "PUTHIYAPPAFH": "KERALA",
  "EDAVANAKAD": "KERALA",
  "ADAKATHBAIL": "KERALA",
  "NEWMAHE": "KERALA",
  "NILESWARAM": "KERALA",
  "VALANJAVAZHY": "KERALA",
  "KAIPAMANGALAMVANCHIPURA": "KERALA",
  "THALANGARJETTY": "KERALA",
  "PARAVANNANGADI": "KERALA",
  "PUTHIATHURA(CHINNAMARTHANDANTHURA)": "KERALA",
  "KOCHUTHURA": "KERALA",
  "POOVAR": "KERALA",
  "NEERODI": "TAMILNADU",
  "MARTHANDAMTHURAI": "TAMILNADU",
  "VALLAVILAI": "TAMILNADU",
  "ERAVIPUTHENTHURAI": "TAMILNADU",
  "EZHUDESAM CHINNATHURAI": "TAMILNADU",
  "THOOTHUR": "TAMILNADU",
  "POOTHURAI": "TAMILNADU",
  "ERAYAMMANTHURA": "TAMILNADU",
  "ERAYUMANTHURAI": "TAMILNADU",
  "THENGAPATTANAM": "TAMILNADU",
  "MULLOORTHURAI": "TAMILNADU",
  "RAMANTHURAI": "TAMILNADU",
  "ENAYAM PUTHENTHURAI": "TAMILNADU",
  "ENAYAM CHINNATHURAI": "TAMILNADU",
  "ENAYAM": "TAMILNADU",
  "MIDAALAM": "TAMILNADU",
  "MIDALAM (NADUTHURAI": "TAMILNADU",
  "KURUMBANAI": "TAMILNADU",
  "VANIYAKUDI": "TAMILNADU",
  "LAKHAPAT": "GUJARAT",
  "KANOJ": "GUJARAT",
  "NARAYAN SAROVAR (KOTESHWAR)": "GUJARAT",
  "GUVAR": "GUJARAT",
  "LAKHI BANDAR": "GUJARAT",
  "RAWAL PIR DARGAH": "GUJARAT",
  "MODHVA": "GUJARAT",
  "TRAGDI": "GUJARAT",
  "HAZIRA": "GUJARAT",
  "DUMAS": "GUJARAT",
  "MAGADALLA": "GUJARAT",
  "BHIMPUR": "GUJARAT",
  "DIPLA": "GUJARAT",
  "WASI BORSI": "GUJARAT",
  "DANDI": "GUJARAT",
  "ONJAL MACHHIVAD": "GUJARAT",
  "KRISHNAPUR": "GUJARAT",
  "BHAT": "GUJARAT",
  "MENDHAR": "GUJARAT",
  "DHOLAI": "GUJARAT",
  "NANIDANTI": "GUJARAT",
  "KAKWADI": "GUJARAT",
  "BHADELI JAGALALA": "GUJARAT",
  "VALSAD": "GUJARAT",
  "KOSAMBA (MACHHIVAD)": "GUJARAT",
  "MAGOD DUNGRI": "GUJARAT",
  "UMARSADI": "GUJARAT",
  "KOLAK": "GUJARAT",
  "BHIMPOR": "GUJARAT",
  "DAMAN": "GUJARAT",
  "KALAI": "GUJARAT",
  "FANSA": "GUJARAT",
  "MAROLI": "GUJARAT",
  "TADGAM": "GUJARAT",
  "KATHALWADA": "GUJARAT",
  "NARGOL": "GUJARAT",
  "UMARGAM": "GUJARAT",
  "ZAI": "MAHARASHTRA",
  "BORDI": "MAHARASHTRA",
  "SASOONDOCK": "MAHARASHTRA",
  "KALBADEVI": "MAHARASHTRA",
  "CHINCHBUNDER": "MAHARASHTRA",
  "NEWFERRYWHARF": "MAHARASHTRA",
  "TROMBAY": "MAHARASHTRA",
  "MAHUL": "MAHARASHTRA",
  "WASHIBRIDGE,PWDJETTY": "MAHARASHTRA",
  "VASHI(HAVELI)": "MAHARASHTRA",
  "BELAPUR": "MAHARASHTRA",
  "ULWAMOHA": "MAHARASHTRA",
  "MORAVE-1": "MAHARASHTRA",
  "NHAWA": "MAHARASHTRA",
  "DIGHODE": "MAHARASHTRA",
  "MORA": "MAHARASHTRA",
  "HANUMANKOLIWADA": "MAHARASHTRA",
  "MANDAIKADU PUTHOOR": "TAMILNADU",
  "PERIAVILAI": "TAMILNADU",
  "CHINNAVILAI": "TAMILNADU",
  "MELAKADIAPATTINAM": "TAMILNADU",
  "KOVALAM": "TAMILNADU",
  "KEEZHAKADIAPATTINAM": "TAMILNADU",
  "MELAMUTTOM": "TAMILNADU",
  "MUTTOM": "TAMILNADU",
  "AZHIKKAL": "TAMILNADU",
  "RAJAKKAMANGLAM": "TAMILNADU",
  "RAJAKAMANGALAM THURAI": "TAMILNADU",
  "PERIYAKADU": "TAMILNADU",
  "POZHIKKARAI": "TAMILNADU",
  "KESAVANPUTHENTHURAI": "TAMILNADU",
  "PUTHENTHURAI": "TAMILNADU",
  "PALLAM": "TAMILNADU",
  "KEEZHAMANAKUDI": "TAMILNADU",
  "MELA MANAKUDI": "TAMILNADU",
  "KOVALAM KANNIYAKUMARAI": "TAMILNADU",
  "PUTHUR": "TAMILNADU",
  "PUTHUGRAMAM (VAVUTHURAI": "TAMILNADU",
  "KANNIYAKUMARI": "TAMILNADU",
  "CHINNAMUTTOM": "TAMILNADU",
  "LIPURAM": "TAMILNADU",
  "AROCKIYAPURAM": "TAMILNADU",
  "KUTTAPULI": "TAMILNADU",
  "CHETTIKULAM": "TAMILNADU",
  "PERUMANAL": "TAMILNADU",
  "KUDANGULAM": "TAMILNADU",
  "IDINTHAKARAI": "TAMILNADU",
  "THOMMAYARPURAM(MUDDUKULI": "TAMILNADU",
  "KOOTHANGUZHI": "TAMILNADU",
  "KUNDAL": "TAMILNADU",
  "UVARI": "TAMILNADU",
  "KOOTTAPPANAI": "TAMILNADU",
  "KOODUTHALAI": "TAMILNADU",
  "PERIYATHALAI": "TAMILNADU",
  "MANAPPAD PT": "TAMILNADU",
  "KULASEKHARAPATTINAM": "TAMILNADU",
  "KALLAMOZHI": "TAMILNADU",
  "ALANTHALAI": "TAMILNADU",
  "AMALINAGAR": "TAMILNADU",
  "JEEVANAGAR": "TAMILNADU",
  "VEERAPANDIYAPATTINAM": "TAMILNADU",
  "SINGHITHURAI": "TAMILNADU",
  "KOMBUTHURAI MADHAKOIL": "TAMILNADU",
  "PUNNAKKAYAL": "TAMILNADU",
  "RATCHANYAPURAM": "TAMILNADU",
  "TUTICORIN": "TAMILNADU",
  "PANDYAN": "TAMILNADU",
  "INICO NAGAR": "TAMILNADU",
  "THOOTHUKUDI": "TAMILNADU",
  "THERESPURAM": "TAMILNADU",
  "THALAMUTHUNAGAR": "TAMILNADU",
  "VELLAPATTI": "TAMILNADU",
  "THARUVAIKULAM": "TAMILNADU",
  "PATTANAMARUDUR": "TAMILNADU",
  "VEPPALODAI": "TAMILNADU",
  "SIPPIKULAM": "TAMILNADU",
  "KEEZHAVAIPPAR": "TAMILNADU",
  "PERIASAMYPURAM": "TAMILNADU",
  "VEMBAR": "TAMILNADU",
  "ROJMA NAGAR": "TAMILNADU",
  "TERKU MOOKKAIYUR": "TAMILNADU",
  "VALINOKKAM": "TAMILNADU",
  "CHINNA ERVADI": "TAMILNADU",
  "KILAKARAI": "TAMILNADU",
  "KALIMANKUNDU": "TAMILNADU",
  "MUTTUPETTAI": "TAMILNADU",
  "INTHIRA NAGAR": "TAMILNADU",
  "VALANGAPURI": "TAMILNADU",
  "SEENIYAPPA DHARGA": "TAMILNADU",
  "VEDHALAI": "TAMILNADU",
  "MANDAPAM (SOUTH)": "TAMILNADU",
  "CHINNAPALAM": "TAMILNADU",
  "PAMBAN KUNTHUKAL": "TAMILNADU",
  "MUKUNTHARAYARCHATRAM": "TAMILNADU",
  "DHANUSHKODI": "TAMILNADU",
  "VERKODE": "TAMILNADU",
  "TUNDA": "GUJARAT",
  "NAVINAL": "GUJARAT",
  "ZARPARA": "GUJARAT",
  "MUNDRA": "GUJARAT",
  "SHEKHADIYA": "GUJARAT",
  "LUNI": "GUJARAT",
  "BHADRESHWAR": "GUJARAT",
  "KUKADSAR": "GUJARAT",
  "SANGHAD": "GUJARAT",
  "TUNA PORT": "GUJARAT",
  "TEKRA": "GUJARAT",
  "KANDLA": "GUJARAT",
  "NAVLAKHI": "GUJARAT",
  "DABAR CR": "GUJARAT",
  "JODIYA": "GUJARAT",
  "BALACHADI": "GUJARAT",
  "SACHANA": "GUJARAT",
  "KALYAN LT": "GUJARAT",
  "PIROTON ISLAND": "GUJARAT",
  "SIKKA": "GUJARAT",
  "VADINAR": "GUJARAT",
  "BHARANA": "GUJARAT",
  "NANA AMBLA": "GUJARAT",
  "SALAYA": "GUJARAT",
  "MOTA ASOTA": "GUJARAT",
  "POSHITRA": "GUJARAT",
  "OKHA": "GUJARAT",
  "PATVA": "GUJARAT",
  "GADHADA": "GUJARAT",
  "MAHUVA (BHAVANI BANDAR)": "GUJARAT",
  "MAHUVA (LIGHT HOUSE)": "GUJARAT",
  "NIKOL": "GUJARAT",
  "METHLA": "GUJARAT",
  "JHANJHMER": "GUJARAT",
  "GOPNATH": "GUJARAT",
  "SARTANPAR": "GUJARAT",
  "ALANG": "GUJARAT",
  "MITHI VIRDI": "GUJARAT",
  "HAATHAB": "GUJARAT",
  "PIRAM BET": "GUJARAT",
  "BADI": "GUJARAT",
  "GHOGHA": "GUJARAT",
  "BHAVANAGAR NEW PORT": "GUJARAT",
  "DUNGARIYA BET": "GUJARAT",
  "KAMATALAV": "GUJARAT",
  "VADGAM": "GUJARAT",
  "KHAMBAT": "GUJARAT",
  "SURWADA": "GUJARAT",
  "SAROD": "GUJARAT",
  "KAVI": "GUJARAT",
  "GANGESHWAR": "GUJARAT",
  "ZAMDI": "GUJARAT",
  "NADIYAD": "GUJARAT",
  "TANKARI PT": "GUJARAT",
  "ASHARSHA": "GUJARAT",
  "DENWA": "GUJARAT",
  "LUVARA": "GUJARAT",
  "MEHGAM": "GUJARAT",
  "DHANTURIA": "GUJARAT",
  "WANSNOLI": "GUJARAT",
  "BHADBHUT": "GUJARAT",
  "OIL DERRICK": "GUJARAT",
  "KANTHIAJAL": "GUJARAT",
  "KOSAMBA (MANGELVAD)": "GUJARAT",
  "KARANJ": "GUJARAT",
  "MOR": "GUJARAT",
  "MARPHALIA": "GUJARAT",
  "GUNAV": "GUJARAT",
  "BHAGAL": "GUJARAT",
  "SAMBAIPATTINAM": "TAMILNADU",
  "KARANGUDA": "TAMILNADU",
  "KAZHUMANGUDA": "TAMILNADU",
  "SETHUBAVACHATTRAM": "TAMILNADU",
  "PILLAYARTHIDAL": "TAMILNADU",
  "CHINNAMANAI": "TAMILNADU",
  "MALLIPATTINAM": "TAMILNADU",
  "PUTHUPATTINAM": "TAMILNADU",
  "VELIVAYAL": "TAMILNADU",
  "KOLLUKADU": "TAMILNADU",
  "KEELATHOTTAM": "TAMILNADU",
  "ERIPURAKKARAI": "TAMILNADU",
  "GANDHINAGAR": "TAMILNADU",
  "KARAIYURTHERU": "TAMILNADU",
  "MARAVAKADU": "TAMILNADU",
  "THAMBIKOTTAI": "TAMILNADU",
  "MUTHUPET": "TAMILNADU",
  "POINT CALIMER": "TAMILNADU",
  "KODIYAKARAI": "TAMILNADU",
  "VEDARANNIYAM": "TAMILNADU",
  "ARKKATTUTHURAI": "TAMILNADU",
  "TOPPUTTURAI": "TAMILNADU",
  "PUSHPAVANAM": "TAMILNADU",
  "KALLINODU": "TAMILNADU",
  "VELLAPALLAM": "TAMILNADU",
  "VANAVANMADEVI": "TAMILNADU",
  "VETTAIKARANRIPPU": "TAMILNADU",
  "VILUNTHAMAVADI": "TAMILNADU",
  "KAMESHWARAM": "TAMILNADU",
  "SERUTHUR": "TAMILNADU",
  "VELANGANNI": "TAMILNADU",
  "AKKARAIPETTAI": "TAMILNADU",
  "NAGAPATTINAM HARBOUR": "TAMILNADU",
  "NAMBIYAR NAGAR": "TAMILNADU",
  "SAMANTHANPETTAI": "TAMILNADU",
  "NAGORE": "TAMILNADU",
  "KARIKAL": "TAMILNADU",
  "PATTINACHERRY": "TAMILNADU",
  "CHINNORPETTAI": "TAMILNADU",
  "CHANDRAPPADI": "TAMILNADU",
  "THARANGAMPADI": "TAMILNADU",
  "KUTTIYANDIYUR": "TAMILNADU",
  "BOMMAYANPETTAI (VELLAKOIL": "TAMILNADU",
  "PERUMALPETTAI": "TAMILNADU",
  "TRANQUEBAR": "TAMILNADU",
  "PUDHUPETTAI": "TAMILNADU",
  "THALAMPETTAI": "TAMILNADU",
  "CHINNANGUDI": "TAMILNADU",
  "KAVERIPPATTINAM": "TAMILNADU",
  "VANAGIRI": "TAMILNADU",
  "POOMBUHAR": "TAMILNADU",
  "PUDUKUPPAM": "TAMILNADU",
  "MADATHUKUPPAM": "TAMILNADU",
  "NAICKERKUPPAM": "TAMILNADU",
  "CHAVADIKUPPAM": "TAMILNADU",
  "KEEZHAMOOVARKARAI": "TAMILNADU",
  "TIRUMULLAIVASAL": "TAMILNADU",
  "THODUVAI": "TAMILNADU",
  "MUDASALODAI VILLAGE": "TAMILNADU",
  "KOOZHAYAR": "TAMILNADU",
  "KOTTAIMEDU": "TAMILNADU",
  "MADAVAMEDU": "TAMILNADU",
  "PAZHAYAR": "TAMILNADU",
  "KILLAI": "TAMILNADU",
  "M.G.R. THITTU": "TAMILNADU",
  "MUDASALODAI": "TAMILNADU",
  "PARANGIPETTAI": "TAMILNADU",
  "PORTONOVO": "TAMILNADU",
  "C PUDUPETTAI": "TAMILNADU",
  "VEERAMPATINAM": "TAMILNADU",
  "SAMANTHAPETTAI": "TAMILNADU",
  "SAMIYARPETTAI": "TAMILNADU",
  "KUMARAPETTAI": "TAMILNADU",
  "PERIYAKUPPAM": "TAMILNADU",
  "CHITHIRAIPETTAI": "TAMILNADU",
  "RAJAPPETTAI": "TAMILNADU",
  "SOTHIKUPPAM": "TAMILNADU",
  "CUDDALORE HARBOUR": "TAMILNADU",
  "SONAANKUPPAM": "TAMILNADU",
  "DEVANAMPATTINAM": "TAMILNADU",
  "THAZHANGUDA": "TAMILNADU",
  "MOORTHIPUDUKUPPAM": "TAMILNADU",
  "PANITHITTU": "TAMILNADU",
  "NARAMBAI": "TAMILNADU",
  "NALLAVADU": "TAMILNADU",
  "P. PUDUKUPPAM": "TAMILNADU",
  "CHINNA VEERAMPATTINAM": "TAMILNADU",
  "VEERAMPATTINAM": "TAMILNADU",
  "THENGAITHITTU": "TAMILNADU",
  "PONDICHERRY": "TAMILNADU",
  "VAITHIKUPPAM": "TAMILNADU",
  "SOLAINAGAR NORTH": "TAMILNADU",
  "SODHANAIKUPPAM": "TAMILNADU",
  "NADUKUPPAM": "TAMILNADU",
  "THANDHIRAYANKUPPAM": "TAMILNADU",
  "CHINNA MUDALIARCHAVADI": "TAMILNADU",
  "BOMMAIYARPALYAM": "TAMILNADU",
  "PILLAICHAVADI": "TAMILNADU",
  "PERIYA KALAPET": "TAMILNADU",
  "GANAPATHICHETTIKULAM": "TAMILNADU",
  "PUDHUKUPPAM": "TAMILNADU",
  "ANICHANKUPPAM": "TAMILNADU",
  "MUDALIARKUPPAM": "TAMILNADU",
  "NOCHIKUPPAM": "TAMILNADU",
  "KOONIMEDU KUPPAM": "TAMILNADU",
  "CHETTINAGAR": "TAMILNADU",
  "ANUMANDHAIKUPPAM": "TAMILNADU",
  "KOMUTTICHAVADIKUPPAM": "TAMILNADU",
  "MANDAVAI PUDUKUPPAM": "TAMILNADU",
  "EKKIYARKUPPAM": "TAMILNADU",
  "MARAKKANAM": "TAMILNADU",
  "KAIPPANIKUPPAM": "TAMILNADU",
  "VASAVANKUPPAM": "TAMILNADU",
  "MUTTUKADUAZHAGANKUPPAM": "TAMILNADU",
  "ALAMBARAIKUPPAM": "TAMILNADU",
  "KADAPPAKAM": "TAMILNADU",
  "PANAIYUR PERIYA KUPPAM": "TAMILNADU",
  "PANAIYUR CHINNAKUPPAM": "TAMILNADU",
  "MUDALIYAR KUPPAM": "TAMILNADU",
  "CHEYYUR": "TAMILNADU",
  "PARAMANKENI": "TAMILNADU",
  "PERUN THURAVU KUPPAM": "TAMILNADU",
  "PUDHUNADUKUPPAM": "TAMILNADU",
  "PAZHAYANADUKUPPAM": "TAMILNADU",
  "ANGALAMMAN KUPPAM": "TAMILNADU",
  "KADALORE ALI KUPPAM": "TAMILNADU",
  "PADALORE PERIYA KUPPAM": "TAMILNADU",
  "KADALORE CHINNA KUPPAM": "TAMILNADU",
  "UYYALIKUPPAM": "TAMILNADU",
  "SADRAS": "TAMILNADU",
  "PUDUPATTINAM": "TAMILNADU",
  "SATHURANGAPATTINAM": "TAMILNADU",
  "UMARIKUPPAM": "TAMILNADU",
  "MEYYURKUPPAM": "TAMILNADU",
  "KOKILAMEDU": "TAMILNADU",
  "VENPURSHAM": "TAMILNADU",
  "MAMALLAPURAM": "TAMILNADU",
  "MAHABALIPURAM": "TAMILNADU",
  "DEVANERI": "TAMILNADU",
  "SALAVANKUPPAM": "TAMILNADU",
  "PUDU NEMELI KUPPAM": "TAMILNADU",
  "PATTIPULAM": "TAMILNADU",
  "SOOLERIKATTUKUPPAM": "TAMILNADU",
  "NEMMELIKUPPAM": "TAMILNADU",
  "PUDHUKALPAKKAM": "TAMILNADU",
  "CHEMACHERRY": "TAMILNADU",
  "COVELONG (KOVALAM)": "TAMILNADU",
  "EGATTUR KARIKATTUKUPPAM": "TAMILNADU",
  "KANATHUR REDDY KUPPAM": "TAMILNADU",
  "KANATHUR": "TAMILNADU",
  "NAINARKUPPAM": "TAMILNADU",
  "PANAIYURKUPPAM": "TAMILNADU",
  "INJAMPAKKAM": "TAMILNADU",
  "CHINNANDIKUPPAM": "TAMILNADU",
  "PERIYA NEELANKARAI": "TAMILNADU",
  "CHINNA NEELANKARAI": "TAMILNADU",
  "PALAVAKKAM": "TAMILNADU",
  "KOTTIVAKKAM": "TAMILNADU",
  "THIRUVANMIYUR": "TAMILNADU",
  "ODAIKUPPAM": "TAMILNADU",
  "ORURKUPPAM": "TAMILNADU",
  "SRINIVASAPURAM": "TAMILNADU",
  "MULLIMANAGAR": "TAMILNADU",
  "PATTINAMPAKKAM": "TAMILNADU",
  "CATHEDRAL (CHENNAI)": "TAMILNADU",
  "AYOTHIKUPPAM": "TAMILNADU",
  "MATTANKUPPAM": "TAMILNADU",
  "CHENNAI": "TAMILNADU",
  "LAKSHMIPURAM ODAIKUPPAM": "TAMILNADU",
  "ROYAPURAM": "TAMILNADU",
  "ONDIKUPPAM": "TAMILNADU",
  "NALLATHANNEER ODAIKUPPAM": "TAMILNADU",
  "THIRUCHINNANKUPPAM": "TAMILNADU",
  "KASIVISWANATHAR KOIL KUPPAM": "TAMILNADU",
  "PALAGAITHOTTIKUPPAM": "TAMILNADU",
  "KASIKOILKUPPAM": "TAMILNADU",
  "ERNAVOORKUPPAM": "TAMILNADU",
  "KATHIVAKKAM CHINNAKUPPAM": "TAMILNADU",
  "RAMESHWARAM HARBOUR": "TAMILNADU",
  "OLAIKUDA": "TAMILNADU",
  "VILLUNDI": "TAMILNADU",
  "THANGACHIMADAM": "TAMILNADU",
  "PAMBAN LIGHT HOUSE": "TAMILNADU",
  "MANDPAM (NORTH)": "TAMILNADU",
  "MUNAIKADU": "TAMILNADU",
  "ATRANGARAI": "TAMILNADU",
  "ALAGANKULAM": "TAMILNADU",
  "PUDUKKUDI": "TAMILNADU",
  "PANAIKULAM": "TAMILNADU",
  "PUDHUVALASAICHATHIRAM": "TAMILNADU",
  "PALANIVALASAI": "TAMILNADU",
  "MUDIVEERANPATTINAM": "TAMILNADU",
  "DEVIPATTINAM SOUTH": "TAMILNADU",
  "DEVIPATTINAM": "TAMILNADU",
  "PATHANENDAL": "TAMILNADU",
  "THIRUPALAIKUDI NORTH": "TAMILNADU",
  "MOREPPANAI": "TAMILNADU",
  "KARANKADU": "TAMILNADU",
  "MULLIMANAI": "TAMILNADU",
  "PUDHUPATTINAM": "TAMILNADU",
  "TIRUVETTRIYUR": "TAMILNADU",
  "SOLIYAKUDI HARBOUR": "TAMILNADU",
  "NAMBUTHALAI": "TAMILNADU",
  "TONDI": "TAMILNADU",
  "M.R.PATTINAM": "TAMILNADU",
  "VALASAPATINAM(P.V.PATTINAM": "TAMILNADU",
  "NARENDHAL": "TAMILNADU",
  "DHAMOTHARANPATTINAM": "TAMILNADU",
  "PASIPATTINAM": "TAMILNADU",
  "THEERTHAANDATHANAM": "TAMILNADU",
  "SUNDARAPANDIYANPATTA": "TAMILNADU",
  "MUTHUKUDA": "TAMILNADU",
  "R.PUDHUPATTINAM": "TAMILNADU",
  "GOPALAPATTINAM": "TAMILNADU",
  "MUTHANENTHAL": "TAMILNADU",
  "AYYAMPATTINAM": "TAMILNADU",
  "KOTTAIPPATTANAM": "TAMILNADU",
  "PUDHUKKUDI SOUTH": "TAMILNADU",
  "PUDHUKKUDI NORTH": "TAMILNADU",
  "ANTHONIYARPURAM": "TAMILNADU",
  "PONAGARAM": "TAMILNADU",
  "MANAMELKUDI": "TAMILNADU",
  "KEELAKUDIYIRUPPU": "TAMILNADU",
  "VADAKKU AMAPATTINAM": "TAMILNADU",
  "SEETHARAMPATTINAM": "TAMILNADU",
  "KRISHNAJIPATTINAM": "TAMILNADU",
  "PRATHAPARAMANPATTINAM": "TAMILNADU",
  "KATTUMAVADI": "TAMILNADU",
  "SEMBIYANMADEVIPATTINAM": "TAMILNADU",
  "GANESAPURAM": "TAMILNADU",
  "VALLAVANPATTINAM": "TAMILNADU",
  "SUBBAMACHATRAM": "TAMILNADU",
  "SOMANATHANPATTINAM": "TAMILNADU",
  "ANNANAGAR PUDHUTHERU": "TAMILNADU",
  "MANDHIRIPATTINAM": "TAMILNADU",
  "SENTHALAIVAYAL": "TAMILNADU",
  "ADAIKKADEVAN": "TAMILNADU",
  "KATHIVAKKAM PERIAKUPPAM": "TAMILNADU",
  "THAZANKUPPAM": "TAMILNADU",
  "ENNORE MUGATHUVARAKUPPAN": "TAMILNADU",
  "ENNOREKUPPAM": "TAMILNADU",
  "PULICAT": "TAMILNADU",
  "COROMANDEL": "TAMILNADU",
  "ANNAMALAICHERY": "TAMILNADU",
  "PERIYAMANGODU": "TAMILNADU",
  "ARAMBAKKAM": "TAMILNADU",
  "PULINJERIKUPPAM": "ANDHRAPRADESH",
  "DURGARAJUPATNAM": "ANDHRAPRADESH",
  "KONDUR": "ANDHRAPRADESH",
  "ARKATAPALEM": "ANDHRAPRADESH",
  "KOTTAPATNAM": "ANDHRAPRADESH",
  "TAMMENAPATNAM": "ANDHRAPRADESH",
  "KRISHNAPATNAM(UPPUTERU)": "ANDHRAPRADESH",
  "KRISHNAPATNAM": "ANDHRAPRADESH",
  "PATHAPALEM": "ANDHRAPRADESH",
  "MAIPADU": "ANDHRAPRADESH",
  "PATTAPUPALEM": "ANDHRAPRADESH",
  "UTUKURU": "ANDHRAPRADESH",
  "ISAKAPALLE": "ANDHRAPRADESH",
  "ZUVVALADINNE": "ANDHRAPRADESH",
  "VATTURUPALLEPALEM": "ANDHRAPRADESH",
  "RAMAYAPATNAM": "ANDHRAPRADESH",
  "CHAKICHERLA": "ANDHRAPRADESH",
  "ITAMUKKALA": "ANDHRAPRADESH",
  "ALLURUKOTTAPATNAM": "ANDHRAPRADESH",
  "MURUD": "MAHARASHTRA",
  "MAZGAON": "MAHARASHTRA",
  "KOCHARA-NIVATI": "MAHARASHTRA",
  "SRIVARDHAN": "MAHARASHTRA",
  "SAKHRI-NATYE": "MAHARASHTRA",
  "DIGHI(SAVARI)": "MAHARASHTRA",
  "BHARDKHOL-DIVEAGAR": "MAHARASHTRA",
  "BAGMANDLA": "MAHARASHTRA",
  "KUNKESHWAR": "MAHARASHTRA",
  "VIJAYADURG HR": "MAHARASHTRA",
  "SATPATI(N)": "MAHARASHTRA",
  "SHEKHADI(KHALCHI)": "MAHARASHTRA",
  "REVADANDA": "MAHARASHTRA",
  "JUHUTARA": "MAHARASHTRA",
  "SAKHARINATE": "MAHARASHTRA",
  "UTTAN": "MAHARASHTRA",
  "SOMESHVAR": "MAHARASHTRA",
  "NAIGAON": "MAHARASHTRA",
  "AMBOLGAD": "MAHARASHTRA",
  "MURBE": "MAHARASHTRA",
  "SATPATI(M/S)": "MAHARASHTRA",
  "DONGI POINT": "MAHARASHTRA",
  "JAIGAD": "MAHARASHTRA",
  "VARSOVA": "MAHARASHTRA",
  "KHARVIWADA": "MAHARASHTRA",
  "KELSHI": "MAHARASHTRA",
  "SAKHARTARKASARVELI": "MAHARASHTRA",
  "KALABADEVI": "MAHARASHTRA",
  "VASAI": "MAHARASHTRA",
  "KHONDHA CR": "MAHARASHTRA",
  "BANKOT": "MAHARASHTRA",
  "ANANDWADI(DEVGAD)": "MAHARASHTRA",
  "KELWA/KELWADADAR": "MAHARASHTRA",
  "GHIVALI": "MAHARASHTRA",
  "DHARMTAR DHAKKA": "MAHARASHTRA",
  "BOGHAR": "MAHARASHTRA",
  "MANDAD": "MAHARASHTRA",
  "VESAVA": "MAHARASHTRA",
  "VELDUR/NAVANAGAR/DHOPAVE": "MAHARASHTRA",
  "DHAKTIDAHANU/GUNGAWADA": "MAHARASHTRA",
  "MARVE/MALVANI": "MAHARASHTRA",
  "JAKIMIRYA": "MAHARASHTRA",
  "NANWELL PT": "MAHARASHTRA",
  "KONDKARUL": "MAHARASHTRA",
  "BUDHAL": "MAHARASHTRA",
  "HARNEPORT": "MAHARASHTRA",
  "MALABAR PORT (MUMBAI)": "MAHARASHTRA",
  "NARPAD/DAHANUAGAR": "MAHARASHTRA",
  "SHIRODA": "MAHARASHTRA",
  "UTTAN(BHATYE)": "MAHARASHTRA",
  "KALAMAIWADI": "MAHARASHTRA",
  "TUGAPUR,MAYABUNDER": "ANDAMAN_NICOBAR",
  "BETAPUR(RRO)": "ANDAMAN_NICOBAR",
  "RANGAT BAY": "ANDAMAN_NICOBAR",
  "KAUSHALYANAGAR": "ANDAMAN_NICOBAR",
  "DASHRATPUR": "ANDAMAN_NICOBAR",
  "YERRATA": "ANDAMAN_NICOBAR",
  "LONG ISLAND": "ANDAMAN_NICOBAR",
  "ELPHINSTONE HR": "ANDAMAN_NICOBAR",
  "UTTARA": "ANDAMAN_NICOBAR",
  "ORALKATCHA": "ANDAMAN_NICOBAR",
  "BARREN": "ANDAMAN_NICOBAR",
  "HAVELOCK": "ANDAMAN_NICOBAR",
  "MIDDLE STRAIT": "ANDAMAN_NICOBAR",
  "SHOALBAY": "ANDAMAN_NICOBAR",
  "WRIGHTMYO": "ANDAMAN_NICOBAR",
  "NEIL ISLAND": "ANDAMAN_NICOBAR",
  "PORT BLAIR": "ANDAMAN_NICOBAR",
  "BAMBOOFLAT": "ANDAMAN_NICOBAR",
  "HADDO": "ANDAMAN_NICOBAR",
  "HOPE TOWN": "ANDAMAN_NICOBAR",
  "DUNDUSPOINT": "ANDAMAN_NICOBAR",
  "PHOENIX BAY": "ANDAMAN_NICOBAR",
  "JUNGLIGHAT": "ANDAMAN_NICOBAR",
  "DIGNABAD": "ANDAMAN_NICOBAR",
  "MT HAUGHTON": "ANDAMAN_NICOBAR",
  "LOHABARRACK": "ANDAMAN_NICOBAR",
  "CHOULDARI": "ANDAMAN_NICOBAR",
  "WANDOOR": "ANDAMAN_NICOBAR",
  "CHIDIYATAPU": "ANDAMAN_NICOBAR",
  "RUTLAND": "ANDAMAN_NICOBAR",
  "CINQUE ISLAND": "ANDAMAN_NICOBAR",
  "TAMBE-E-BUL": "ANDAMAN_NICOBAR",
  "VIVEKANANDPUR,LITTLEANDAMAN": "ANDAMAN_NICOBAR",
  "RAMAKRISHNAPUR,": "ANDAMAN_NICOBAR",
  "KWATE-TU-KWAGE": "ANDAMAN_NICOBAR",
  "HARMINDER BAY": "ANDAMAN_NICOBAR",
  "MACHIDERA(HUTBAY),": "ANDAMAN_NICOBAR",
  "BENYABOI": "ANDAMAN_NICOBAR",
  "TULA": "ANDAMAN_NICOBAR",
  "TOCHANGEOU": "ANDAMAN_NICOBAR",
  "KEATING PT (CAR NICOBAR)": "ANDAMAN_NICOBAR",
  "MUS,CARNICOBAR": "ANDAMAN_NICOBAR",
  "SAWAI (CAR NICOBAR)": "ANDAMAN_NICOBAR",
  "TEETOP,CARNICOBAR": "ANDAMAN_NICOBAR",
  "PASSA, CAR NICOBAR": "ANDAMAN_NICOBAR",
  "ARRONG (CAR NICOBAR)": "ANDAMAN_NICOBAR",
  "MALACCA,CARNICOBAR": "ANDAMAN_NICOBAR",
  "BATTI MALV": "ANDAMAN_NICOBAR",
  "CHOWRA": "ANDAMAN_NICOBAR",
  "AOANG": "ANDAMAN_NICOBAR",
  "LAKSI": "ANDAMAN_NICOBAR",
  "BAMPOKA": "ANDAMAN_NICOBAR",
  "KAI-HOA": "ANDAMAN_NICOBAR",
  "TAKAROACH": "ANDAMAN_NICOBAR",
  "TRINKET,NANCOWRY": "ANDAMAN_NICOBAR",
  "KAMORTA,NANCOWRY": "ANDAMAN_NICOBAR",
  "HITUI,NANCOWRY": "ANDAMAN_NICOBAR",
  "CHAMPION,NANCOWRY": "ANDAMAN_NICOBAR",
  "BALUBASTI, NANCOWRY ISLAND": "ANDAMAN_NICOBAR",
  "ATTABIAK, NANCOWRY ISLAND": "ANDAMAN_NICOBAR",
  "TAPONG, NANCOWRY ISLAND": "ANDAMAN_NICOBAR",
  "CAPE CONNAUGHT": "ANDAMAN_NICOBAR",
  "ADAVIPALLIPALEM": "ANDHRAPRADESH",
  "VETAPALEM": "ANDHRAPRADESH",
  "BHADA": "GUJARAT",
  "MIYANI": "GUJARAT",
  "KANTHADA": "GUJARAT",
  "SAIYAD RAJPARA": "GUJARAT",
  "PIPAVAV": "GUJARAT",
  "NAVA BANDAR": "GUJARAT",
  "VERAVAL": "GUJARAT",
  "KADOLI": "GUJARAT",
  "MADHAVPUR": "GUJARAT",
  "SHIL": "GUJARAT",
  "PORBANDAR": "GUJARAT",
  "JAKHAU": "GUJARAT",
  "MADHVAD LIGHTHOUSE": "GUJARAT",
  "DIU ISLAND": "GUJARAT",
  "KOTDA": "GUJARAT",
  "TUKDA MIYANI": "GUJARAT",
  "BAMBHDAI": "GUJARAT",
  "ADRI": "GUJARAT",
  "VADODRA": "GUJARAT",
  "CHHACHHI": "GUJARAT",
  "KHUADA": "GUJARAT",
  "NANA LAYJA": "GUJARAT",
  "MANGROL BARA": "GUJARAT",
  "BHOGAT": "GUJARAT",
  "MITHAPUR": "GUJARAT",
  "ODADAR": "GUJARAT",
  "JAFARABAD": "GUJARAT",
  "CHORWAD": "GUJARAT",
  "RAATADI": "GUJARAT",
  "MOTI AKRI": "GUJARAT",
  "MITHA PORT (JAKHAU)": "GUJARAT",
  "KURANGA": "GUJARAT",
  "RUPEN": "GUJARAT",
  "KADWAR": "GUJARAT",
  "NAVIBANDAR": "GUJARAT",
  "KUCHHADI": "GUJARAT",
  "HARSHAD MIYANI": "GUJARAT",
  "HIRAKOT": "GUJARAT",
  "DHAMLEJ": "GUJARAT",
  "SIMAR": "GUJARAT",
  "DWARKA": "GUJARAT",
  "MANDVI": "GUJARAT",
  "SUTRAPADA": "GUJARAT",
  "KACHCHIGADH": "GUJARAT",
  "BHUTAU": "GUJARAT",
  "GORSAR": "GUJARAT",
  "SHIYALBET": "GUJARAT",
  "ROHISHA": "GUJARAT",
  "MUL DWARKA": "GUJARAT",
  "NAVADRA": "GUJARAT",
  "MANGROL": "GUJARAT",
  "BHALPADA": "MAHARASHTRA",
  "YERANGALBHATI": "MAHARASHTRA",
  "REVU POLAVARAM": "ANDHRAPRADESH",
  "RAMBILLI": "ANDHRAPRADESH",
  "PUDIMADAKA": "ANDHRAPRADESH",
  "VISAKHAPATNAM": "ANDHRAPRADESH",
  "BHIMUNIPATNAM": "ANDHRAPRADESH",
  "MUKKAM": "ANDHRAPRADESH",
  "KONADA": "ANDHRAPRADESH",
  "CHINTAPALLI": "ANDHRAPRADESH",
  "RAMACHANDRAPURAM": "ANDHRAPRADESH",
  "ALLIVALASA": "ANDHRAPRADESH",
  "KUPPILI": "ANDHRAPRADESH",
  "SRIKURMAM": "ANDHRAPRADESH",
  "BANDARUVANIPETA": "ANDHRAPRADESH",
  "KALINGAPATNAM": "ANDHRAPRADESH",
  "GUPPIDIPETA": "ANDHRAPRADESH",
  "JAGANNADHAPURAM": "ANDHRAPRADESH",
  "MARUVADA": "ANDHRAPRADESH",
  "KOTTA NAUPADA": "ANDHRAPRADESH",
  "BAVANAPADU": "ANDHRAPRADESH",
  "NUVVALAREVU": "ANDHRAPRADESH",
  "METTURU": "ANDHRAPRADESH",
  "GANGUVADA": "ANDHRAPRADESH",
  "BARUVA": "ANDHRAPRADESH",
  "IDUVANIPALEM": "ANDHRAPRADESH",
  "KAVITI": "ANDHRAPRADESH",
  "ANANTARAIPUR": "ODISHA",
  "KEUTASONAPUR": "ODISHA",
  "PATISONAPUR": "ODISHA",
  "SONNAPURAMPETA": "ODISHA",
  "RAMEYAPATNA": "ODISHA",
  "EKASINGI": "ODISHA",
  "MARKONDI": "ODISHA",
  "NEW GOLABANDHA": "ODISHA",
  "GOPALPUR-IFH": "ODISHA",
  "GOLABANDHA": "ODISHA",
  "OLDBUXIPETTA": "ODISHA",
  "NEWBAXIPALLI": "ODISHA",
  "GOPALPUR": "ODISHA",
  "GARYAMPETTA": "ODISHA",
  "SANA ARYAPALLI": "ODISHA",
  "BADANUAGAON": "ODISHA",
  "SANANUAGAON": "ODISHA",
  "GANJAM": "ODISHA",
  "KANTIAGADA(PODAMPETA)": "ODISHA",
  "PRAYAGI": "ODISHA",
  "RAMALANKA": "ODISHA",
  "BAJARKOT": "ODISHA",
  "KHIRISAHI": "ODISHA",
  "SATPARA": "ODISHA",
  "SIANDI": "ODISHA",
  "ARAKHAKUD": "ODISHA",
  "PURINORTH": "ODISHA",
  "PURISOUTH": "ODISHA",
  "PURI": "ODISHA",
  "PENTHAKATA": "ODISHA",
  "BANGOR": "ODISHA",
  "CHANDRABHAGA": "ODISHA",
  "KAJALPATIA(KHANDIAPATNA)": "ODISHA",
  "TONDAHAR": "ODISHA",
  "ANAKONA&DALUKANI": "ODISHA",
  "ASTARANGA": "ODISHA",
  "BALIPANTALA": "ODISHA",
  "SUDHIKESWAR(TALIA)": "ODISHA",
  "NUAGARHFH(ASTARANGA)": "ODISHA",
  "NUAGAR": "ODISHA",
  "BANDAR": "ODISHA",
  "MAGARKHIA": "ODISHA",
  "SAHARABEDI": "ODISHA",
  "KALIAKANA": "ODISHA",
  "NOLIASAHI": "ODISHA",
  "NUAGAN": "ODISHA",
  "JAMUKA": "ODISHA",
  "PARADEEPFH": "ODISHA",
  "PARADIP": "ODISHA",
  "ATHARABANKI": "ODISHA",
  "CHUMUHANI": "ODISHA",
  "KHARNASI": "ODISHA",
  "FALSE POINT": "ODISHA",
  "KHARINASI": "ODISHA",
  "JAMBU": "ODISHA",
  "JMBOO": "ODISHA",
  "BARUNIE": "ODISHA",
  "SASANPETA(TANTIAPAL)": "ODISHA",
  "GAJARAJPUR": "ODISHA",
  "HARIHARPUR": "ODISHA",
  "SATBHAYA": "ODISHA",
  "AHIRAJPUR": "ODISHA",
  "TALCHUA": "ODISHA",
  "DHAMRA": "ODISHA",
  "CHANDINIPAL": "ODISHA",
  "DHAMARAFH": "ODISHA",
  "KAITHAKHOLA": "ODISHA",
  "KARANJAMAL": "ODISHA",
  "BAINCHA": "ODISHA",
  "KARANPALLI": "ODISHA",
  "KASIANALA": "ODISHA",
  "CHUDAMANIBOATJETTY": "ODISHA",
  "CHUDAMANI": "ODISHA",
  "PANCHUBISA": "ODISHA",
  "GODAISAGAR": "ODISHA",
  "JANIPUR": "ODISHA",
  "MAHISALI": "ODISHA",
  "CHANDIPUR": "ODISHA",
  "BALARAMGADI(CHANDIPURFLC)": "ODISHA",
  "BALARAMGADI": "ODISHA",
  "BAHABALAPUR(KASAFALSOUTH)": "ODISHA",
  "BAHABALPUR": "ODISHA",
  "BINDHA": "ODISHA",
  "HANSAKURA": "ODISHA",
  "KASAFALA": "ODISHA",
  "CHOUMUKH": "ODISHA",
  "DAGARA": "ODISHA",
  "KIRTANIA": "ODISHA",
  "CHANDENESWAR": "ODISHA",
  "TALASARI": "ODISHA",
  "DIGHAMOHANAF.F.T.A.(DIGHA)": "WEST BENGAL",
  "SHANKARPUR": "WEST BENGAL",
  "SANKARPURF.F.T.A.(SANKARPUR)": "WEST BENGAL",
  "TAJPURJALDHA": "WEST BENGAL",
  "DIGHA": "WEST BENGAL",
  "JUNPUT": "WEST BENGAL",
  "PETUAGHAT (DARIAPUR)": "WEST BENGAL",
  "LIGHTHOUSE,GANGASAGARGP": "WEST BENGAL",
  "DIAMONDHARBOUR JETTY GHAT": "WEST BENGAL",
  "DIAMOND HARBOUR": "WEST BENGAL",
  "KAKDWIP": "WEST BENGAL",
  "NAMKHANA": "WEST BENGAL",
  "SAGAR": "WEST BENGAL",
  "FRASERGUNJE": "WEST BENGAL",
  "FREZERGANJFH": "WEST BENGAL",
  "LOTHIAN ISLAND": "WEST BENGAL",
  "LANDFALL": "ANDAMAN_NICOBAR",
  "NARCONDAM": "ANDAMAN_NICOBAR",
  "DIGLIPUR": "ANDAMAN_NICOBAR",
  "LAXMIPUR,DIGLIPUR": "ANDAMAN_NICOBAR",
  "AREALBAY,DIGLIPUR": "ANDAMAN_NICOBAR",
  "DURGAPUR": "ANDAMAN_NICOBAR",
  "KALIPUR,DIGLIPUR": "ANDAMAN_NICOBAR",
  "KALIGHAT,DIGLIPUR": "ANDAMAN_NICOBAR",
  "POKADERA": "ANDAMAN_NICOBAR",
  "MAYABUNDERPROPER": "ANDAMAN_NICOBAR",
  "WEBI,MAYABUNDER": "ANDAMAN_NICOBAR",
  "KAPANGA, KATCHALL": "ANDAMAN_NICOBAR",
  "KATCHAL EAST BAY": "ANDAMAN_NICOBAR",
  "JANSIN": "ANDAMAN_NICOBAR",
  "KATCHAL WEST BAY": "ANDAMAN_NICOBAR",
  "SOMBRERO PT": "ANDAMAN_NICOBAR",
  "PULO PATIA": "ANDAMAN_NICOBAR",
  "KABRA PT": "ANDAMAN_NICOBAR",
  "TENLAA": "ANDAMAN_NICOBAR",
  "ROSEN PT": "ANDAMAN_NICOBAR",
  "CAMPBELLBAY": "ANDAMAN_NICOBAR",
  "VIJOY NAGAR": "ANDAMAN_NICOBAR",
  "INDIRA PT": "ANDAMAN_NICOBAR",
  "KOKEON": "ANDAMAN_NICOBAR",
  "PULO KUNJI": "ANDAMAN_NICOBAR",
  "VALIYAPANI REEF": "KERALA",
  "BYRAMGORE": "KERALA",
  "CHERIYAPANI REEF": "KERALA",
  "CHETLAT I": "KERALA",
  "BITRA I": "KERALA",
  "KILTANI": "KERALA",
  "PERUMALPAR REEF": "KERALA",
  "KADMATH I": "KERALA",
  "AMINI I": "KERALA",
  "TINNAKARA": "KERALA",
  "BANGARAM I": "KERALA",
  "AGATTI I": "KERALA",
  "ANDROTH I": "KERALA",
  "KAVARATTI I": "KERALA",
  "VALIYKARA": "KERALA",
  "SUHELI": "KERALA",
  "CHERIYAKARA": "KERALA",
  "KALPENI I": "KERALA",
  "MINICOY": "KERALA",
  "KODIMUNAI": "TAMILNADU",
  "SIMON COLONY": "TAMILNADU",
  "COALCHEL": "TAMILNADU",
  "KOTTILPADU": "TAMILNADU",
  "VADAREVU": "ANDHRAPRADESH",
  "BESTAPALAM BAPATLA": "ANDHRAPRADESH",
  "SURYALANKA": "ANDHRAPRADESH",
  "NIZAMPATNAM": "ANDHRAPRADESH",
  "NACHUGUNTA": "ANDHRAPRADESH",
  "ETIMOGA": "ANDHRAPRADESH",
  "SORLAGONDI": "ANDHRAPRADESH",
  "PALAKAYATIPPA": "ANDHRAPRADESH",
  "MACHILIPATNAM": "ANDHRAPRADESH",
  "GIRIPURAM": "ANDHRAPRADESH",
  "PEDDA GOLLAPALEM": "ANDHRAPRADESH",
  "ANTARVEDI": "ANDHRAPRADESH",
  "NARASAPUR PT": "ANDHRAPRADESH",
  "BANDAMURLANKA": "ANDHRAPRADESH",
  "ODALAREVU": "ANDHRAPRADESH",
  "KOTHAPALEM LH": "ANDHRAPRADESH",
  "BHAIRAVAPALEM": "ANDHRAPRADESH",
  "KAKINADA": "ANDHRAPRADESH",
  "VAKALAPUDI": "ANDHRAPRADESH",
  "UPPADA": "ANDHRAPRADESH",
  "KONAPAPETA": "ANDHRAPRADESH",
  "PERUMALLAPURAM": "ANDHRAPRADESH",
  "PALMANPETA": "ANDHRAPRADESH",
  "DANAVAIPETA": "ANDHRAPRADESH",
  "PENTAKOTA": "ANDHRAPRADESH"
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

  async init() {
    const saved = localStorage.getItem('ocean_watch_lang') || 'en';
    const isValid = APP_LANGUAGES.some(l => l.code === saved);
    this.currentLang = isValid ? saved : 'en';
    this.renderLanguageSelect();
    await loadLanguage(this.currentLang);
    if (this.currentLang !== 'en') {
      loadLanguage('en').catch(() => {});
    }
    this.translatePage(this.currentLang);
    if (typeof latestStatusData !== 'undefined' && latestStatusData && typeof render === 'function') {
      render(latestStatusData);
    }
  },

  getLanguage() {
    return this.currentLang;
  },

  async setLanguage(langCode) {
    const isValid = APP_LANGUAGES.some(l => l.code === langCode);
    if (!isValid) langCode = 'en';
    this.currentLang = langCode;
    localStorage.setItem('ocean_watch_lang', langCode);

    const select = document.getElementById('appLangSelect');
    if (select && select.value !== langCode) {
      select.value = langCode;
    }

    if (typeof VOICE_LANGUAGES !== 'undefined' && Array.isArray(VOICE_LANGUAGES)) {
      const match = VOICE_LANGUAGES.find(l => l.code.startsWith(langCode));
      if (match) {
        if (typeof selectedVoiceLang !== 'undefined') selectedVoiceLang = match.code;
        globalThis.selectedVoiceLang = match.code;
      }
    }

    const voiceSelect = document.getElementById('voiceLangSelect');
    if (voiceSelect) {
      if (!voiceSelect.children.length && typeof VOICE_LANGUAGES !== 'undefined') {
        voiceSelect.innerHTML = VOICE_LANGUAGES.map(l => '<option value="' + l.code + '">' + l.native + ' (' + l.name + ')</option>').join('');
      }
      const match = Array.from(voiceSelect.options).find(opt => opt.value.startsWith(langCode));
      if (match) {
        voiceSelect.value = match.value;
        if (typeof selectedVoiceLang !== 'undefined') selectedVoiceLang = match.value;
        globalThis.selectedVoiceLang = match.value;
      }
    }

    if (typeof renderVoiceSummaryModal === 'function') {
      const voiceDialog = document.getElementById('voiceSummaryDialog');
      if (voiceDialog && voiceDialog.open) {
        renderVoiceSummaryModal();
      }
    }

    await loadLanguage(langCode);
    this.translatePage(langCode);

    if (typeof latestStatusData !== 'undefined' && latestStatusData) {
      if (typeof render === 'function') render(latestStatusData);
    }

    try {
      globalThis.dispatchEvent(new CustomEvent('oceanwatch:languagechange', { detail: { lang: langCode } }));
      if (globalThis.svasService && typeof globalThis.svasService.render === 'function') {
        const svasSelect = document.getElementById('svasDistrictDropdown');
        if (svasSelect && svasSelect.value) globalThis.svasService.render(svasSelect.value);
      }
    } catch (e) {}
  },

  t(key, fallback = '') {
    const globalObj = typeof window !== 'undefined' ? window : globalThis;
    const dict = loadedLocales[this.currentLang] || globalObj.I18N;
    if (dict && dict[key]) return dict[key];
    const enDict = loadedLocales.en;
    if (enDict && enDict[key]) return enDict[key];
    return fallback || key;
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
    const raw = String(districtName).trim();
    const norm = raw.toUpperCase().replace(/&/g, '&').replace(/\s+/g, ' ');
    if (this.currentLang === 'en') return tc(districtName);
    const map = I18N_DISTRICTS[norm] || (typeof I18N_LANDING_CENTRES !== 'undefined' && (I18N_LANDING_CENTRES[raw] || I18N_LANDING_CENTRES[norm]));
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

    translateLandingCenterName(name, sectorOrState) {
    if (!name) return '';
    const tc = typeof globalThis.titleCase === 'function' ? globalThis.titleCase : (typeof titleCase === 'function' ? titleCase : s => String(s || ''));
    if (this.currentLang === 'en') return tc(name);

    const raw = String(name).trim();
    const norm = raw.toUpperCase().replace(/\s+/g, ' ');

    // 1. Determine region of this landing center
    let region = '';
    if (sectorOrState) {
      const s = String(sectorOrState).toUpperCase();
      if (s.includes('TAMILNADU') || s.includes('TAMIL NADU')) region = 'TAMILNADU';
      else if (s.includes('KERALA') || s.includes('LAKSHADWEEP')) region = 'KERALA';
      else if (s.includes('ANDHRA')) region = 'ANDHRAPRADESH';
      else if (s.includes('GUJARAT')) region = 'GUJARAT';
      else if (s.includes('MAHARASHTRA') || s.includes('GOA')) region = 'MAHARASHTRA';
      else if (s.includes('KARNATAKA')) region = 'KARNATAKA';
      else if (s.includes('ODISHA') || s.includes('ORISSA')) region = 'ODISHA';
      else if (s.includes('BENGAL')) region = 'WEST BENGAL';
      else if (s.includes('ANDAMAN') || s.includes('NICOBAR')) region = 'ANDAMAN_NICOBAR';
    }

    if (!region && typeof I18N_LANDING_CENTRE_REGIONS !== 'undefined') {
      region = I18N_LANDING_CENTRE_REGIONS[norm] || '';
    }

    // 2. Map current language to allowed regions
    const LANG_TARGET_REGIONS = {
      ta: ['TAMILNADU'],
      ml: ['KERALA'],
      te: ['ANDHRAPRADESH'],
      gu: ['GUJARAT'],
      mr: ['MAHARASHTRA'],
      kn: ['KARNATAKA'],
      or: ['ODISHA'],
      bn: ['WEST BENGAL']
    };

    const targetRegions = LANG_TARGET_REGIONS[this.currentLang];
    if (!targetRegions || (region && !targetRegions.includes(region))) {
      return tc(raw);
    }

    // 3. Lookup in cleaned regional dictionary
    if (typeof I18N_LANDING_CENTRES !== 'undefined') {
      const entry = I18N_LANDING_CENTRES[raw] || I18N_LANDING_CENTRES[norm];
      if (entry && entry[this.currentLang]) {
        return entry[this.currentLang];
      }
      const directKey = Object.keys(I18N_LANDING_CENTRES).find(k => k.toUpperCase().replace(/\s+/g, ' ') === norm);
      if (directKey && I18N_LANDING_CENTRES[directKey][this.currentLang]) {
        return I18N_LANDING_CENTRES[directKey][this.currentLang];
      }
    }

    if (I18N_DISTRICTS[norm] && I18N_DISTRICTS[norm][this.currentLang]) {
      return I18N_DISTRICTS[norm][this.currentLang];
    }

    return tc(raw);
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

    // 3. Translate any district, sector, landing centre or landmark names mentioned inside the bulletin text (sort by length desc)
    const allReplacements = [
      ...(typeof I18N_LANDING_CENTRES !== 'undefined' ? Object.entries(I18N_LANDING_CENTRES) : []),
      ...Object.entries(I18N_SECTORS),
      ...Object.entries(I18N_DISTRICTS)
    ].sort((a, b) => b[0].length - a[0].length);

    for (const [key, map] of allReplacements) {
      if (map[this.currentLang]) {
        const trans = map[this.currentLang];
        if (res.includes(key)) {
          res = res.replaceAll(key, trans);
        }
        const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const reg = new RegExp(`\\b${escaped}\\b`, 'gi');
        if (reg.test(res)) {
          res = res.replace(reg, trans);
        }
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
    const lang = APP_LANGUAGES.some(l => l.code === langCode) ? langCode : 'en';
    const globalObj = typeof window !== 'undefined' ? window : globalThis;
    const dict = loadedLocales[lang] || loadedLocales.en || globalObj.I18N || {};

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
