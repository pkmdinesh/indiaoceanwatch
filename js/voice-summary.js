// Lightweight Multilingual Voice and Text Bulletin Engine
// Uses pre-rendered high-quality Google TTS audio streams with seamless HTML5 playback

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
    ml: 'ആന്ധ്രാ പ്രദേശ്',
    hi: 'आंध्र प्रदेश',
    bn: 'অন্ধ্র প্রদেশ',
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
    te: 'గుజరాత్',
    ml: 'ഗുജറാത്ത്',
    hi: 'गुजरात',
    bn: 'ગુજરાત',
    mr: 'गुजरात',
    gu: 'ગુજરાત',
    or: 'ଗୁଜରାଟ',
    kn: 'ಗುಜರಾತ್'
  },
  'KARNATAKA': {
    ta: 'கர்நாடகா',
    te: 'కర్ణాటక',
    ml: 'കർണാടക',
    hi: 'कर्नाटक',
    bn: 'কর্ণাটক',
    mr: 'कर्नाटक',
    gu: 'કર્ણાટક',
    or: 'କର୍ଣ୍ଣାଟକ',
    kn: 'ಕರ್ನಾಟಕ'
  },
  'KERALA': {
    ta: 'கேரளா',
    te: 'కేరళ',
    ml: 'കേരളം',
    hi: 'केरल',
    bn: 'কেরল',
    mr: 'केरळ',
    gu: 'કેરળ',
    or: 'କେରଳ',
    kn: 'ಕೇರಳ'
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
    hi: 'ओडिशा',
    bn: 'ওড়িশা',
    mr: 'ओडिशा',
    gu: 'ઓડિશા',
    or: 'ଓଡ଼ିଶା',
    kn: 'ಒಡಿಶಾ'
  },
  'TAMIL NADU': {
    ta: 'தமிழ்நாடு',
    te: 'తమిళనాడు',
    ml: 'തമിഴ്നാട്',
    hi: 'तमिलनाडु',
    bn: 'তামিলনাড়ু',
    mr: 'तमिळनाडू',
    gu: 'તમિલનાડુ',
    or: 'ତାମିଲନାଡୁ',
    kn: 'ತಮಿಳುನಾಡು'
  },
  'WEST BENGAL': {
    ta: 'மேற்கு வங்காளம்',
    te: 'పశ్చిమ బెంగాల్',
    ml: 'പശ്ചിമ ബംഗാൾ',
    hi: 'पश्चिम बंगाल',
    bn: 'পশ্চিমবঙ্গ',
    mr: 'पश्चिम बंगाल',
    gu: 'પશ્ચિમ બંગાળ',
    or: 'ପଶ୍ଚିମ ବଙ୍ଗ',
    kn: 'ಪಶ್ಚಿಮ ಬಂಗಾಳ'
  },
  'DAMAN AND DIU': {
    ta: 'டாமன் மற்றும் டையூ',
    te: 'డామన్ మరియు డయ్యూ',
    ml: 'ദാമൻ ദിയു',
    hi: 'दमन और दीव',
    bn: 'দমন ও দিউ',
    mr: 'दमन आणि दीव',
    gu: 'દમણ અને દીવ',
    or: 'ଦମନ ଏବଂ ଦିଉ',
    kn: 'ದಮನ್ ಮತ್ತು ದಿಯು'
  },
  'PUDUCHERRY': {
    ta: 'புதுச்சேரி',
    te: 'పుదుచ్చేరి',
    ml: 'പുതുച്ചേരി',
    hi: 'पुदुचेरी',
    bn: 'পুদুচেরি',
    mr: 'पुदुच्चेरी',
    gu: 'પુડુચેરી',
    or: 'ପୁଦୁଚେରୀ',
    kn: 'ಪುದುಚೇರಿ'
  }
};

const REGIONAL_DISTRICT_NAMES = {
  // Tamil Nadu & Puducherry
  'KANNIYAKUMARI': { ta: 'கன்னியாகுமரி', hi: 'कन्याकुमारी', ml: 'കന്യാകുമാരി', te: 'కన్యాకుమారి', kn: 'ಕನ್ಯಾಕುಮಾರಿ' },
  'TIRUNELVELI': { ta: 'திருநெல்வேலி', hi: 'तिरुनेलवेली', ml: 'തിരുനെൽവേലി', te: 'తిరునెల్వేలి', kn: 'ತಿರುನೆಲ್ವೇಲಿ' },
  'THOOTHUKKUDI': { ta: 'தூத்துக்குடி', hi: 'थूथुकुडी', ml: 'തൂത്തുക്കുടി', te: 'తూత్తుకుడి', kn: 'ತೂತುಕುಡಿ' },
  'TUTICORIN': { ta: 'தூத்துக்குடி', hi: 'थूथुकुडी', ml: 'തൂത്തുക്കുടി', te: 'తూత్తుకుడి', kn: 'ತೂತುಕುಡಿ' },
  'RAMANATHAPURAM': { ta: 'ராமநாதபுரம்', hi: 'रामनाथपुरम', ml: 'രാമനാഥപുരം', te: 'రామనాథపురం', kn: 'ರಾಮನಾಥಪುರಂ' },
  'PUDUKKOTTAI': { ta: 'புதுக்கோட்டை', hi: 'पुदुक्कोट्टई', ml: 'പുതുക്കോട്ട', te: 'పుదుక్కోటై', kn: 'ಪುದುಕೋಟೆ' },
  'THANJAVUR': { ta: 'தஞ்சாவூர்', hi: 'तंजावुर', ml: 'തഞ്ചാവൂർ', te: 'తంజావూరు', kn: 'ತಂಜಾವೂರು' },
  'TIRUVARUR': { ta: 'திருவாரூர்', hi: 'तिरुवारूर', ml: 'തിരുവാരുർ', te: 'తిరువారూరు', kn: 'ತಿರುವಾರೂರು' },
  'NAGAPATTINAM': { ta: 'நாகப்பட்டினம்', hi: 'नागापट्टिनम', ml: 'നാഗപട്ടണം', te: 'నాగపట్నం', kn: 'ನಾಗಪಟ್ಟಣಂ' },
  'MAYILADUTHURAI': { ta: 'மயிலாடுதுறை', hi: 'मयिलादुथुरई', ml: 'മയിലാടുതുറൈ', te: 'మయిలాడుదురై', kn: 'ಮಯಿಲಾಡುತುರೈ' },
  'CUDDALORE': { ta: 'கடலூர்', hi: 'कडलूर', ml: 'കടലൂർ', te: 'కడలూరు', kn: 'ಕಡಲೂರು' },
  'VILUPPURAM': { ta: 'விழுப்புரம்', hi: 'विलुप्पुरम', ml: 'വിഴുപ്പുറം', te: 'విలుప్పురం', kn: 'ವಿಳುಪ್ಪುರಂ' },
  'CHENGALPATTU': { ta: 'செங்கல்பட்டு', hi: 'चेंगलपट्टू', ml: 'ചെങ്കൽപട്ട്', te: 'చెంగల్పట్టు', kn: 'ಚೆಂಗಲ್ಪಟ್ಟು' },
  'CHENNAI': { ta: 'சென்னை', hi: 'चेन्नई', ml: 'ചെന്നൈ', te: 'చెన్నై', kn: 'ಚೆನ್ನೈ', bn: 'চেন্নাই', mr: 'चेन्नई', gu: 'ચેન્નાઈ', or: 'ଚେନ୍ନାଇ' },
  'TIRUVALLUR': { ta: 'திருவள்ளூர்', hi: 'तिरुवल्लूर', ml: 'തിരുവള്ളൂർ', te: 'తిరువళ్లూరు', kn: 'ತಿರುವಳ್ಳೂರು' },
  'PUDUCHERRY': { ta: 'புதுச்சேரி', hi: 'पुदुचेरी', ml: 'പുതുച്ചേരി', te: 'పుదుచ్చేరి', kn: 'ಪುದುಚೇರಿ' },
  'KARAIKAL': { ta: 'காரைக்கால்', hi: 'कारैकल', ml: 'കാരക്കൽ', te: 'కారైకాల్', kn: 'ಕಾರೈಕಲ್' },
  'MAHE': { ta: 'மாஹே', hi: 'माहे', ml: 'മാഹി', te: 'మాహే', kn: 'ಮಾಹೆ' },
  'YANAM': { ta: 'ஏனாம்', hi: 'यानम', ml: 'യാനം', te: 'యానాం', kn: 'ಯಾನಾಂ' },

  // Andhra Pradesh
  'SRIKAKULAM': { te: 'శ్రీకాకుళం', hi: 'श्रीकाकुलम', or: 'ଶ୍ରୀକାକୁଲମ' },
  'VIZIANAGARAM': { te: 'విజయనగరం', hi: 'विजयनगरम', or: 'ବିଜୟନଗରମ' },
  'VISAKHAPATNAM': { te: 'విశాఖపట్నం', hi: 'विशाखापट्टनम', or: 'ବିଶାଖାପାଟଣା', ta: 'விசாகப்பட்டினம்' },
  'ANAKAPALLI': { te: 'అనకాపల్లి', hi: 'अनकापल्ली' },
  'KAKINADA': { te: 'కాకినాడ', hi: 'काकीनाडा' },
  'EAST GODAVARI': { te: 'తూర్పు గోదావరి', hi: 'पूर्वी गोदावरी', ta: 'கிழக்கு கோதாவரி' },
  'KONASEEMA': { te: 'కోనసీమ', hi: 'कोनसीमा' },
  'WEST GODAVARI': { te: 'పశ్చిమ గోదావరి', hi: 'पश्चिम गोदावरी', ta: 'மேற்கு கோதாவரி' },
  'KRISHNA': { te: 'కృష్ణా', hi: 'कृष्णा', ta: 'கிருஷ்ணா' },
  'BAPATLA': { te: 'బాపట్ల', hi: 'बापटला' },
  'PRAKASAM': { te: 'ప్రకాశం', hi: 'प्रकाशम' },
  'SPS NELLORE': { te: 'శ్రీ పొట్టి శ్రీరాములు నెల్లూరు', hi: 'नेल्लोर' },
  'NELLORE': { te: 'నెల్లూరు', hi: 'नेल्लोर', ta: 'நெல்லூர்' },
  'TIRUPATI': { te: 'తిరుపతి', hi: 'तिरुपति', ta: 'திருப்பதி' },

  // Kerala & Lakshadweep
  'THIRUVANANTHAPURAM': { ml: 'തിരുവനന്തപുരം', hi: 'तिरुवनंतपुरम', ta: 'திருவனந்தபுரம்' },
  'KOLLAM': { ml: 'കൊല്ലം', hi: 'कोल्लम', ta: 'கொல்லம்' },
  'ALAPPUZHA': { ml: 'ആലപ്പുഴ', hi: 'अलप्पुझा', ta: 'ஆலப்புழா' },
  'ERNAKULAM': { ml: 'എറണാകുളം', hi: 'एर्नाकुलम', ta: 'எர்ணாகுளம்' },
  'THRISSUR': { ml: 'തൃശ്ശൂർ', hi: 'त्रिशूर', ta: 'திருச்சூர்' },
  'MALAPPURAM': { ml: 'മലപ്പുറം', hi: 'मलप्पुरम', ta: 'மலப்புரம்' },
  'KOZHIKODE': { ml: 'കോഴിക്കോട്', hi: 'कोझिकोड', ta: 'கோழிக்கோடு' },
  'KANNUR': { ml: 'കണ്ണൂർ', hi: 'कन्नूर', ta: 'கண்ணூர்' },
  'KASARAGOD': { ml: 'കാസർഗോഡ്', hi: 'कासरगोड', kn: 'ಕಾಸರಗೋಡು', ta: 'காசர்கோடு' },
  'AGATTI': { ml: 'അഗത്തി', hi: 'अगत्ती' },
  'AMINI': { ml: 'അമിനി', hi: 'अमीनी' },
  'ANDROTH': { ml: 'ആന്ത്രോത്ത്', hi: 'अंद्रोत' },
  'BITRA': { ml: 'ബിത്ര', hi: 'बित्रा' },
  'CHETLAT': { ml: 'ചേത്ലാത്ത്', hi: 'चेतलात' },
  'KADMAT': { ml: 'കദ്മത്ത്', hi: 'कदमत' },
  'KALPENI': { ml: 'കൽപേനി', hi: 'कलपेनी' },
  'KAVARATTI': { ml: 'കവരത്തി', hi: 'कवरत्ती' },
  'KILTAN': { ml: 'കിൽത്താൻ', hi: 'किल्ताన్' },
  'MINICOY': { ml: 'മിനിക്കോയ്', hi: 'मिनिकॉय' },

  // Karnataka & Goa
  'DAKSHINA KANNADA': { kn: 'ದಕ್ಷಿಣ ಕನ್ನಡ', hi: 'दक्षिण कन्नड़', ml: 'ദക്ഷിണ കന്നഡ' },
  'UDUPI': { kn: 'ಉಡುಪಿ', hi: 'उडुपी', ml: 'ഉഡുപ്പി' },
  'UTTARA KANNADA': { kn: 'ಉತ್ತರ ಕನ್ನಡ', hi: 'उत्तर कन्नड़', mr: 'उत्तर कन्नड' },
  'NORTH GOA': { kn: 'ಉತ್ತರ ಗೋವಾ', mr: 'उत्तर गोवा', hi: 'उत्तर गोवा' },
  'SOUTH GOA': { kn: 'ದಕ್ಷಿಣ ಗೋವಾ', mr: 'दक्षिण गोवा', hi: 'दक्षिण गोवा' },

  // Maharashtra
  'PALGHAR': { mr: 'पालघर', hi: 'पालघर', gu: 'પાલઘર' },
  'THANE': { mr: 'ठाणे', hi: 'ठाणे', gu: 'થાણે' },
  'MUMBAI SUBURBAN': { mr: 'मुंबई उपनगर', hi: 'मुंबई उपनगर', gu: 'મુંબઈ ઉપનગર' },
  'MUMBAI CITY': { mr: 'मुंबई शहर', hi: 'मुंबई शहर', gu: 'મુંબઈ શહેર' },
  'MUMBAI': { mr: 'मुंबई', hi: 'मुंबई', gu: 'મુંબઈ' },
  'RAIGAD': { mr: 'रायगड', hi: 'रायगढ़', gu: 'રાયગઢ' },
  'RAIGARH': { mr: 'रायगड', hi: 'रायगढ़', gu: 'રાયગઢ' },
  'RATNAGIRI': { mr: 'रत्नागिरी', hi: 'रत्नागिरी', gu: 'રત્નાગિરી' },
  'SINDHUDURG': { mr: 'सिंधुदुर्ग', hi: 'सिंधुदुर्ग', gu: 'સિંધુદુર્ગ' },

  // Gujarat & Daman and Diu
  'KACHCHH': { gu: 'કચ્છ', hi: 'कच्छ' },
  'KUTCH': { gu: 'કચ્છ', hi: 'कच्छ' },
  'MORBI': { gu: 'મોરબી', hi: 'मोरबी' },
  'JAMNAGAR': { gu: 'જામનગર', hi: 'જામનગર' },
  'DEVBHUMI DWARKA': { gu: 'દેવભૂમિ દ્વારકા', hi: 'देवभूमि द्वारका' },
  'DEVBHUMI DWARAKA': { gu: 'દેવભૂમિ દ્વારકા', hi: 'देवभूमि द्वारका' },
  'PORBANDAR': { gu: 'પોરબંદર', hi: 'पोरबंदर' },
  'JUNAGADH': { gu: 'જૂનાગઢ', hi: 'जूनागढ़' },
  'JUNAGADH NORTH': { gu: 'ઉત્તર જૂનાગઢ', hi: 'उत्तरी जूनागढ़' },
  'JUNAGADH SOUTH': { gu: 'દક્ષિણ જૂનાગઢ', hi: 'दक्षिणी जूनागढ़' },
  'GIR SOMNATH': { gu: 'ગીર સોમનાથ', hi: 'गिर सोमनाथ' },
  'AMRELI': { gu: 'અમરેલી', hi: 'अमरेली' },
  'BHAVNAGAR': { gu: 'ભાવનગર', hi: 'भावनगर' },
  'AHMEDABAD': { gu: 'અમદાવાદ', hi: 'अहमदाबाद' },
  'ANAND': { gu: 'આણંદ', hi: 'આણંદ' },
  'BHARUCH': { gu: 'ભરૂચ', hi: 'भरूच' },
  'SURAT': { gu: 'સુરત', hi: 'सूरत' },
  'NAVSARI': { gu: 'નવસારી', hi: 'नवसारी' },
  'VALSAD': { gu: 'વલસાડ', hi: 'वलसाड' },
  'DAMAN': { gu: 'દમણ', hi: 'दमन' },
  'DIU': { gu: 'દીવ', hi: 'दीव' },

  // Odisha
  'BALESHWAR': { or: 'ବାଲେଶ୍ୱର', hi: 'बालेश्वर', bn: 'বালেশ্বর' },
  'BALASORE': { or: 'ବାଲେଶ୍ୱର', hi: 'बालेश्वर', bn: 'বালেশ্বর' },
  'BHADRAK': { or: 'ଭଦ୍ରକ', hi: 'भद्रक', bn: 'ভদ্রক' },
  'KENDRAPARA': { or: 'କେନ୍ଦ୍ରାପଡ଼ା', hi: 'केंद्रपड़ा', bn: 'কেন্দ্রাপাড়া' },
  'JAGATSINGHPUR': { or: 'ଜଗତସିଂହପୁର', hi: 'जगतसिंहपुर', bn: 'জগৎসিংহপুর' },
  'JAGATSINGHAPUR': { or: 'ଜଗତସିଂହପୁର', hi: 'ଜଗତସିଂହପୁର', hi: 'जगतसिंहपुर', bn: 'জগৎসিংহপুর' },
  'PURI': { or: 'ପୁରୀ', hi: 'पुरी', bn: 'পুরী' },
  'GANJAM': { or: 'ଗଞ୍ଜାମ', hi: 'गंजाम', bn: 'গঞ্জাম' },

  // West Bengal
  'SOUTH 24 PARGANAS': { bn: 'দক্ষিণ ২৪ পরগনা', hi: 'दक्षिण 24 परगना', or: 'ଦକ୍ଷିଣ ୨୪ ପରଗଣା' },
  'NORTH 24 PARGANAS': { bn: 'উত্তর ২৪ পরগনা', hi: 'उत्तर 24 परगना', or: 'ଉତ୍ତର ୨୪ ପରଗଣା' },
  'PURBA MEDINIPUR': { bn: 'পূর্ব মেদিনীপুর', hi: 'पूर्व मेदिनीपुर', or: 'ପୂର୍ବ ମେଦିନୀପୁର' },
  'EAST MEDINIPUR': { bn: 'পূর্ব মেদিনীপুর', hi: 'पूर्व मेदिनीपुर', or: 'ପୂର୍ବ ମେଦିନୀପୁର' },
  'HOWRAH': { bn: 'হাওড়া', hi: 'हावड़ा' },
  'KOLKATA': { bn: 'কলকাতা', hi: 'कोलकाता' },

  // Andaman & Nicobar Islands
  'PORT BLAIR': { hi: 'पोर्ट ब्लेयर', bn: 'পোর্ট ব্লেয়ার', ta: 'போர்ட் பிளேர்' },
  'HAVELOCK': { hi: 'हैवलॉक', bn: 'হ্যাভলক', ta: 'ஹேவ்லாக்' },
  'FLAT ISLAND': { hi: 'फ़्लैट द्वीप', bn: 'ফ্ল্যাট দ্বীপ', ta: 'பிளாட் தீவு' },
  'LITTLE ANDAMAN': { hi: 'लिटिल अंडमान', bn: 'লিটল আন্দামান', ta: 'லிட்டில் அந்தமான்' },
  'NORTH SENTINEL ISLAND': { hi: 'उत्तरी सेंटिनल द्वीप', bn: 'উত্তর সেন্টিনেল দ্বীপ', ta: 'வட சென்டினல் தீவு' },
  'WEST & LANDFALL ISLAND': { hi: 'वेस्ट एवं लैंडफ़ॉल द्वीप', bn: 'ওয়েস্ট ও ল্যান্ডফল দ্বীপ', ta: 'மேற்கு மற்றும் லேண்ட்பால் தீவு' },
  'BARREN ISLAND': { hi: 'बैरन द्वीप', bn: 'ব্যারেন দ্বীপ', ta: 'பாரன் தீவு' },
  'CAR NICOBAR': { hi: 'कार निकोबार', bn: 'কার নিকোবর', ta: 'கார் நிக்கோபார்' },
  'INDIRA POINT': { hi: 'इंदिरा पॉइंट', bn: 'ইন্দিরা পয়েন্ট', ta: 'இந்திரா முனை' },
  'KOMATRA & KATCHAL ISLAND': { hi: 'कोमात्रा एवं कचाल द्वीप', bn: 'কোমাত্রা ও কাচাল দ্বীপ', ta: 'கொமத்ரா மற்றும் கட்சல் தீவு' },
  'NARCONDAM ISLAND': { hi: 'नारकोंडम द्वीप', bn: 'নারকোন্ডাম দ্বীপ', ta: 'நர்கொண்டம் தீவு' }
};

const LANGUAGE_TARGET_STATES = {
  ta: ['TAMIL NADU', 'PUDUCHERRY'],
  te: ['ANDHRA PRADESH', 'PUDUCHERRY'],
  ml: ['KERALA', 'LAKSHADWEEP'],
  hi: ['ANDAMAN AND NICOBAR'],
  bn: ['WEST BENGAL'],
  mr: ['MAHARASHTRA', 'GOA'],
  gu: ['GUJARAT', 'DAMAN AND DIU'],
  or: ['ODISHA'],
  kn: ['KARNATAKA', 'GOA']
};

function translateStateName(englishName, targetLangPrefix) {
  if (!englishName) return '';
  const norm = englishName.toUpperCase().trim();
  const dict = REGIONAL_STATE_NAMES[norm];
  if (dict && dict[targetLangPrefix]) {
    return dict[targetLangPrefix];
  }
  return englishName;
}

function translateDistrictName(districtStr, targetLangPrefix) {
  if (!districtStr) return '';
  // Handle compound district names e.g. "THANE, MUMBAI SUBURBAN, MUMBAI CITY" or "KASARAGOD, KANNUR"
  const rawParts = districtStr.split(',').map(s => s.trim()).filter(Boolean);
  const translatedParts = rawParts.map(part => {
    const norm = part.toUpperCase().trim();
    const dict = REGIONAL_DISTRICT_NAMES[norm];
    if (dict && dict[targetLangPrefix]) {
      return dict[targetLangPrefix];
    }
    return part;
  });
  return translatedParts.join(', ');
}

var selectedVoiceLang = 'en-IN';
var isSpeechPlaying = false;
var availableBrowserVoices = [];

function loadVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  availableBrowserVoices = window.speechSynthesis.getVoices() || [];
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
  const highWaveWarnStates = [];
  const highWaveWarnDistricts = [];
  const highWaveAlertStates = [];
  const highWaveAlertDistricts = [];

  const swellWarnStates = [];
  const swellWarnDistricts = [];
  const swellAlertStates = [];
  const swellAlertDistricts = [];

  const currentAlertStates = [];
  const currentAlertDistricts = [];

  const targetSet = Array.isArray(targetStates)
    ? new Set(targetStates.map(s => String(s).toUpperCase().trim()))
    : null;

  const matchesFilter = name => {
    if (!targetSet) return true;
    const norm = String(name || '').toUpperCase().trim();
    return targetSet.has(norm);
  };

  const parseStatesAndDistricts = (statesList, warnStates, warnDistricts, alertStates, alertDistricts, legacyWarn = [], legacyAlert = []) => {
    if (Array.isArray(statesList) && statesList.length > 0) {
      for (const st of statesList) {
        const w = Number(st.counts?.warning || 0);
        const a = Number(st.counts?.alert || 0);
        const name = st.name || '';
        if (matchesFilter(name)) {
          if (w > 0 && name) warnStates.push(name);
          if (a > 0 && name) alertStates.push(name);

          // Extract specific coastal district names from advisories
          if (Array.isArray(st.advisories)) {
            for (const adv of st.advisories) {
              const dName = (adv.district || '').trim();
              if (!dName) continue;
              const sev = String(adv.severity || '').toLowerCase();
              if (sev === 'warning' && warnDistricts) {
                warnDistricts.push(dName);
              } else if (sev === 'alert' && alertDistricts) {
                alertDistricts.push(dName);
              }
            }
          }
        }
      }
    } else {
      (legacyWarn || []).filter(matchesFilter).forEach(n => warnStates.push(n));
      (legacyAlert || []).filter(matchesFilter).forEach(n => alertStates.push(n));
    }
  };

  parseStatesAndDistricts(data?.highWave?.states, highWaveWarnStates, highWaveWarnDistricts, highWaveAlertStates, highWaveAlertDistricts, data?.highWave?.warning, data?.highWave?.alert);
  parseStatesAndDistricts(data?.swellSurge?.states, swellWarnStates, swellWarnDistricts, swellAlertStates, swellAlertDistricts, data?.swellSurge?.warning, data?.swellSurge?.alert);
  parseStatesAndDistricts(data?.oceanCurrent?.states, [], null, currentAlertStates, currentAlertDistricts, [], data?.oceanCurrent?.alert);

  const allWarningsStates = [...new Set([...highWaveWarnStates, ...swellWarnStates])];
  const allWarningsDistricts = [...new Set([...highWaveWarnDistricts, ...swellWarnDistricts])];

  const allAlertsStates = [...new Set([...highWaveAlertStates, ...swellAlertStates, ...currentAlertStates])];
  const allAlertsDistricts = [...new Set([...highWaveAlertDistricts, ...swellAlertDistricts, ...currentAlertDistricts])];

  return {
    highWaveWarn: [...new Set(highWaveWarnStates)],
    highWaveWarnDistricts: [...new Set(highWaveWarnDistricts)],
    highWaveAlert: [...new Set(highWaveAlertStates)],
    highWaveAlertDistricts: [...new Set(highWaveAlertDistricts)],

    swellWarn: [...new Set(swellWarnStates)],
    swellWarnDistricts: [...new Set(swellWarnDistricts)],
    swellAlert: [...new Set(swellAlertStates)],
    swellAlertDistricts: [...new Set(swellAlertDistricts)],

    currentAlert: [...new Set(currentAlertStates)],
    currentAlertDistricts: [...new Set(currentAlertDistricts)],

    allWarnings: allWarningsStates,
    allWarningsDistricts,
    allAlerts: allAlertsStates,
    allAlertsDistricts
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

  // Translation helpers
  const mapStates = list => [...new Set(list || [])].map(s => translateStateName(s, langPrefix)).filter(Boolean).join(', ');
  const mapDistricts = list => [...new Set(list || [])].map(d => translateDistrictName(d, langPrefix)).filter(Boolean).join(', ');

  // Location renderer for regional bulletins (combines district names with state name)
  const formatRegionalLoc = (districts, states) => {
    const dStr = mapDistricts(districts);
    const sStr = mapStates(states);
    if (dStr && sStr) return `${dStr} (${sStr})`;
    if (dStr) return dStr;
    return sStr;
  };

  // 1. TAMIL / தமிழ் (Tamil Nadu & Puducherry)
  if (langPrefix === 'ta') {
    let t = 'கடல் நிலை முன்னறிவிப்பு ஆலோசனை (Ocean State Forecast Advisory). ';
    if (tsunamiThreat) t += 'முக்கிய அறிவிப்பு: சுனாமி ஆபத்து எச்சரிக்கை விடுக்கப்பட்டுள்ளது. உள்ளூர் பேரிடர் மேலாண்மை வழிகாட்டுதலை பின்பற்றவும். ';

    if (adv.allWarnings.length > 0) {
      t += 'சிவப்பு எச்சரிக்கை (Red Warning): ' + formatRegionalLoc(adv.allWarningsDistricts, adv.allWarnings) + ' கடலோரப் பகுதிகளில் அதீத கடல் சீற்ற எச்சரிக்கை விடுக்கப்பட்டுள்ளது. மீனவர்கள் கடலுக்கு செல்ல வேண்டாம். ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'அலை எழுச்சி ஆரஞ்சு எச்சரிக்கை (Swell Surge Alert): ' + formatRegionalLoc(adv.swellAlertDistricts, adv.swellAlert) + '. ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'உயர்ந்த அலை ஆரஞ்சு எச்சரிக்கை (High Wave Alert): ' + formatRegionalLoc(adv.highWaveAlertDistricts, adv.highWaveAlert) + '. ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'கடல் நீரோட்ட எச்சரிக்கை (Ocean Currents Alert): ' + formatRegionalLoc(adv.currentAlertDistricts, adv.currentAlert) + '. ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'தமிழ்நாடு மற்றும் புதுச்சேரி கடலோரப் பகுதிகளில் கடல் நிலைமை சீராகவும் இயல்பாகவும் உள்ளது. ';
    }
    if (cycloneActive) t += 'புயல் சுற்றறிக்கை விடுக்கப்பட்டுள்ளது, அதிகாரப்பூர்வ தகவல்களை கவனிக்கவும்.';
    return { title: 'கடல் நிலை முன்னறிவிப்பு ஆலோசனை (தமிழ்)', text: t.trim() };
  }

  // 2. HINDI / हिन्दी (Andaman & Nicobar)
  if (langPrefix === 'hi') {
    let t = 'महासागर स्थिति पूर्वानुमान परामर्श (Ocean State Forecast Advisory)। ';
    if (tsunamiThreat) t += 'अति आवश्यक: सुनामी चेतावनी सक्रिय है। स्थानीय आपदा प्रबंधन के निर्देशों का पालन करें। ';

    if (adv.allWarnings.length > 0) {
      t += 'लाल चेतावनी (Red Warning): ' + formatRegionalLoc(adv.allWarningsDistricts, adv.allWarnings) + '। मछुआरे समुद्र में न जाएं। ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'स्वेल सर्ज अलर्ट: ' + formatRegionalLoc(adv.swellAlertDistricts, adv.swellAlert) + '। ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'ऊंची लहरें ऑरेंज अलर्ट: ' + formatRegionalLoc(adv.highWaveAlertDistricts, adv.highWaveAlert) + '। ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'समुद्री धाराएं अलर्ट: ' + formatRegionalLoc(adv.currentAlertDistricts, adv.currentAlert) + '। ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'अंडमान एवं निकोबार द्वीप समूह के तटीय क्षेत्रों में समुद्र की स्थिति सामान्य है। ';
    }
    if (cycloneActive) t += 'चक्रवात अलर्ट सक्रिय है।';
    return { title: 'महासागर स्थिति पूर्वानुमान (हिन्दी)', text: t.trim() };
  }

  // 3. TELUGU / తెలుగు (Andhra Pradesh)
  if (langPrefix === 'te') {
    let t = 'సముద్ర స్థితి సూచన హెచ్చరికలు (Ocean State Forecast Advisory). ';
    if (tsunamiThreat) t += 'ముఖ్య సమాచారం: సునామీ ముప్పు హెచ్చరిక జారీ చేయబడింది. ';

    if (adv.allWarnings.length > 0) {
      t += 'రెడ్ అలర్ట్ (Red Warning): ' + formatRegionalLoc(adv.allWarningsDistricts, adv.allWarnings) + '. మత్స్యకారులు సముద్రంలోకి వెళ్లవద్దు. ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'స్వెల్ సర్జ్ ఆరెంజ్ అలర్ట్: ' + formatRegionalLoc(adv.swellAlertDistricts, adv.swellAlert) + '. ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'హై వేవ్ ఆరెంజ్ అలర్ట్: ' + formatRegionalLoc(adv.highWaveAlertDistricts, adv.highWaveAlert) + '. ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'సముద్ర ప్రవాహాల అలర్ట్: ' + formatRegionalLoc(adv.currentAlertDistricts, adv.currentAlert) + '. ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'ఆంధ్రప్రదేశ్ తీర ప్రాంతంలో సముద్ర పరిస్థితి సాధారణంగా మరియు ప్రశాంతంగా ఉంది. ';
    }
    if (cycloneActive) t += 'తుఫాను హెచ్చరిక జారీ చేయబడింది.';
    return { title: 'సముద్ర స్థితి సూచన (తెలుగు)', text: t.trim() };
  }

  // 4. MALAYALAM / മലയാളം (Kerala & Lakshadweep)
  if (langPrefix === 'ml') {
    let t = 'സമുദ്രാവസ്ഥ പ്രവചന മുന്നറിയിപ്പ് (Ocean State Forecast Advisory). ';
    if (tsunamiThreat) t += 'അടിയന്തര അറിയിപ്പ്: സുനാമി മുന്നറിയിപ്പ് നിലവിലുണ്ട്. ';

    if (adv.allWarnings.length > 0) {
      t += 'റെഡ് മുന്നറിയിപ്പ് (Red Warning): ' + formatRegionalLoc(adv.allWarningsDistricts, adv.allWarnings) + '. മത്സ്യത്തൊഴിലാളികൾ കടലിൽ പോകരുത്. ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'സ്വെൽ സർജ്ജ് ഓറഞ്ച് അലർട്ട്: ' + formatRegionalLoc(adv.swellAlertDistricts, adv.swellAlert) + '. ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'ഉയർന്ന തിരമാല ഓറഞ്ച് അലർട്ട്: ' + formatRegionalLoc(adv.highWaveAlertDistricts, adv.highWaveAlert) + '. ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'സമുദ്ര പ്രവാഹ മുന്നറിയിപ്പ്: ' + formatRegionalLoc(adv.currentAlertDistricts, adv.currentAlert) + '. ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'കേരളം மற்றும் ലക്ഷദ്വീപ് തീരങ്ങളിൽ സമുദ്രാവസ്ഥ ശാന്തവും സാധാരണ നിലയിലുമാണ്. ';
    }
    if (cycloneActive) t += 'ചുഴലിക്കാറ്റ് മുന്നറിയിപ്പ് നിലവിലുണ്ട്.';
    return { title: 'സമുദ്രാവസ്ഥ പ്രവചനം (മലയാളം)', text: t.trim() };
  }

  // 5. BENGALI / বাংলা (West Bengal)
  if (langPrefix === 'bn') {
    let t = 'সমুদ্র পরিস্থিতি পূর্বাভাস পরামর্শ (Ocean State Forecast Advisory)। ';
    if (tsunamiThreat) t += 'জরুরি বিজ্ঞপ্তি: সুনামি সতর্কতা জারি করা হয়েছে। ';

    if (adv.allWarnings.length > 0) {
      t += 'লাল সতর্কতা (Red Warning): ' + formatRegionalLoc(adv.allWarningsDistricts, adv.allWarnings) + '। মৎস্যজীবীরা সমুদ্রে যাবেন না। ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'সোয়েল সার্জ কমলা সতর্কতা: ' + formatRegionalLoc(adv.swellAlertDistricts, adv.swellAlert) + '। ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'উচ্চ ঢেউ কমলা সতর্কতা: ' + formatRegionalLoc(adv.highWaveAlertDistricts, adv.highWaveAlert) + '। ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'সমুদ্র স্রোত সতর্কতা: ' + formatRegionalLoc(adv.currentAlertDistricts, adv.currentAlert) + '। ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'পশ্চিমবঙ্গ উপকূলে সমুদ্রের অবস্থা স্বাভাবিক রয়েছে। ';
    }
    if (cycloneActive) t += 'ঘূর্ণিঝড় সতর্কতা সক্রিয় রয়েছে।';
    return { title: 'সমুদ্র পরিস্থিতি পূর্বাভাস (বাংলা)', text: t.trim() };
  }

  // 6. MARATHI / मराठी (Maharashtra & Goa)
  if (langPrefix === 'mr') {
    let t = 'महासागर स्थिती अंदाज सल्लागार (Ocean State Forecast Advisory). ';
    if (tsunamiThreat) t += 'तातडीची सूचना: त्सुनामीचा इशारा जारी करण्यात आला आहे. स्थानिक आपत्ती व्यवस्थापन प्राधिकरणाच्या सूचनांचे पालन करा. ';

    if (adv.allWarnings.length > 0) {
      t += 'लाल इशारा (Red Warning): ' + formatRegionalLoc(adv.allWarningsDistricts, adv.allWarnings) + '. मच्छिमारांनी समुद्रात जाऊ नये. ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'स्वेल सर्ज ऑरेंज अलर्ट: ' + formatRegionalLoc(adv.swellAlertDistricts, adv.swellAlert) + '. ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'उंच लाटा ऑरेंज अलर्ट: ' + formatRegionalLoc(adv.highWaveAlertDistricts, adv.highWaveAlert) + '. ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'समुद्री प्रवाह इशारा: ' + formatRegionalLoc(adv.currentAlertDistricts, adv.currentAlert) + '. ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'महाराष्ट्र आणि गोवा किनारपट्टीवर समुद्राची स्थिती सामान्य आणि शांत आहे. ';
    }
    if (cycloneActive) t += 'चक्रीवादळाचा इशारा सक्रिय आहे.';
    return { title: 'महासागर स्थिती अंदाज (मराठी)', text: t.trim() };
  }

  // 7. GUJARATI / ગુજરાતી (Gujarat & Daman and Diu)
  if (langPrefix === 'gu') {
    let t = 'મહાસાગર સ્થિતિ પૂર્વાનુમાન સલાહકાર (Ocean State Forecast Advisory). ';
    if (tsunamiThreat) t += 'તાકીદની સૂચના: સુનામી ચેતવણી જારી કરવામાં આવી છે. સ્થાનિક આપત્તિ વ્યવસ્થાપન સૂચનાઓનું પાલન કરો. ';

    if (adv.allWarnings.length > 0) {
      t += 'લાલ ચેતવણી (Red Warning): ' + formatRegionalLoc(adv.allWarningsDistricts, adv.allWarnings) + '. માછીમારોએ દરિયામાં ન જવું. ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'સ્વેલ સર્જ ઓરેન્જ એલર્ટ: ' + formatRegionalLoc(adv.swellAlertDistricts, adv.swellAlert) + '. ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'ઊંચા મોજા ઓરેન્જ એલર્ટ: ' + formatRegionalLoc(adv.highWaveAlertDistricts, adv.highWaveAlert) + '. ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'સમુદ્રી પ્રવાહ એલર્ટ: ' + formatRegionalLoc(adv.currentAlertDistricts, adv.currentAlert) + '. ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'ગુજરાત અને દમણ અને દીવના દરિયાકાંઠે સમુદ્રની સ્થિતિ સામાન્ય છે. ';
    }
    if (cycloneActive) t += 'વાવાઝોડાની ચેતવણી સક્રિય છે.';
    return { title: 'મહાસાગર સ્થિતિ પૂર્વાનુમાન (ગુજરાતી)', text: t.trim() };
  }

  // 8. ODIA / ଓଡ଼ିଆ (Odisha)
  if (langPrefix === 'or') {
    let t = 'ମହାସାଗର ସ୍ଥିତି ପୂର୍ବାନୁମାନ ପରାମର୍ଶ (Ocean State Forecast Advisory)। ';
    if (tsunamiThreat) t += 'ଜରୁରୀ ସୂଚନା: ସୁନାମି ଚେତାବନୀ ଜାରି କରାଯାଇଛି। ସ୍ଥାନୀୟ ବିପର୍ଯ୍ୟୟ ପରିଚାଳନା ନିର୍ଦ୍ଦେଶ ପାଳନ କରନ୍ତୁ। ';

    if (adv.allWarnings.length > 0) {
      t += 'ଲାଲ୍ ଚେତାବନୀ (Red Warning): ' + formatRegionalLoc(adv.allWarningsDistricts, adv.allWarnings) + '। ମତ୍ସ୍ୟଜୀବୀମାନେ ସମୁଦ୍ରକୁ ଯାଆନ୍ତୁ ନାହିଁ। ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'ସ୍ୱେଲ୍ ସର୍ଜ ଅରେଞ୍ଜ ଆଲର୍ଟ: ' + formatRegionalLoc(adv.swellAlertDistricts, adv.swellAlert) + '। ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'ଉଚ୍ଚ ଢେଉ ଅରେଞ୍ଜ ଆଲର୍ଟ: ' + formatRegionalLoc(adv.highWaveAlertDistricts, adv.highWaveAlert) + '। ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'ସମୁଦ୍ର ସ୍ରୋତ ଆଲର୍ଟ: ' + formatRegionalLoc(adv.currentAlertDistricts, adv.currentAlert) + '। ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'ଓଡ଼ିଶା ଉପକୂଳରେ ସମୁଦ୍ର ସ୍ଥିତି ସ୍ୱାଭାବିକ ଏବଂ ଶାନ୍ତ ରହିଛି। ';
    }
    if (cycloneActive) t += 'ବାତ୍ୟା ସତର୍କତା ଜାରି କରାଯାଇଛି।';
    return { title: 'ମହାସାଗର ସ୍ଥିତି ପୂର୍ବାନୁମାନ (ଓଡ଼ିଆ)', text: t.trim() };
  }

  // 9. KANNADA / ಕನ್ನಡ (Karnataka)
  if (langPrefix === 'kn') {
    let t = 'ಸಾಗರ ಸ್ಥಿತಿ ಮುನ್ಸೂಚನೆ ಸಲಹೆ (Ocean State Forecast Advisory). ';
    if (tsunamiThreat) t += 'ತುರ್ತು ಸೂಚನೆ: ಸುನಾಮಿ ಎಚ್ಚರಿಕೆ ಸಕ್ರಿಯವಾಗಿದೆ. ಸ್ಥಳೀಯ ವಿಪತ್ತು ನಿರ್ವಹಣಾ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಪಾಲಿಸಿ. ';

    if (adv.allWarnings.length > 0) {
      t += 'ಕೆಂಪು ಎಚ್ಚರಿಕೆ (Red Warning): ' + formatRegionalLoc(adv.allWarningsDistricts, adv.allWarnings) + '. ಮೀನುಗಾರರು ಸಮುದ್ರಕ್ಕೆ ಇಳಿಯಬಾರದು. ';
    }
    if (adv.swellAlert.length > 0) {
      t += 'ಸ್ವೆಲ್ ಸರ್ಜ್ ಆರೆಂಜ್ ಅಲರ್ಟ್: ' + formatRegionalLoc(adv.swellAlertDistricts, adv.swellAlert) + '. ';
    }
    if (adv.highWaveAlert.length > 0) {
      t += 'ಎತ್ತರದ ಅಲೆಗಳ ಆರೆಂಜ್ ಅಲರ್ಟ್: ' + formatRegionalLoc(adv.highWaveAlertDistricts, adv.highWaveAlert) + '. ';
    }
    if (adv.currentAlert.length > 0) {
      t += 'ಸಾಗರ ಪ್ರವಾಹ ಎಚ್ಚರಿಕೆ: ' + formatRegionalLoc(adv.currentAlertDistricts, adv.currentAlert) + '. ';
    }
    if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
      t += 'ಕರ್ನಾಟಕ ಕರಾವಳಿ ತೀರದಲ್ಲಿ ಸಮುದ್ರ ಸ್ಥಿತಿ ಸಾಮಾನ್ಯವಾಗಿ ಮತ್ತು ಶಾಂತವಾಗಿದೆ. ';
    }
    if (cycloneActive) t += 'ಚಂಡಮಾರುತದ ಎಚ್ಚರಿಕೆ ಸಕ್ರಿಯವಾಗಿದೆ.';
    return { title: 'ಸಾಗರ ಸ್ಥಿತಿ ಮುನ್ಸೂಚನೆ (ಕನ್ನಡ)', text: t.trim() };
  }

  // 10. DEFAULT ENGLISH (All Coastal States / National - State Level)
  let t = 'Ocean State Forecast Advisory. ';
  if (tsunamiThreat) {
    t += 'Urgent: Tsunami warning is active. Follow local disaster authority instructions. ';
  }

  if (adv.allWarnings.length > 0) {
    t += 'Red Warning: Severe coastal advisories active across ' + adv.allWarnings.join(', ') + '. Fishermen are strictly advised not to venture into the sea. ';
  }
  if (adv.swellWarn.length > 0) {
    t += 'Swell Surge Red Warning in ' + adv.swellWarn.join(', ') + '. ';
  }
  if (adv.swellAlert.length > 0) {
    t += 'Swell Surge Orange Alert in ' + adv.swellAlert.join(', ') + '. ';
  }
  if (adv.highWaveAlert.length > 0) {
    t += 'High Wave Orange Alert in ' + adv.highWaveAlert.join(', ') + '. ';
  }
  if (adv.currentAlert.length > 0) {
    t += 'Ocean Currents Alert in ' + adv.currentAlert.join(', ') + '. ';
  }
  if (adv.allWarnings.length === 0 && adv.allAlerts.length === 0) {
    t += 'Ocean state conditions are normal across all Indian coastal states and Union Territories. ';
  }
  if (cycloneActive) {
    t += 'Cyclone advisory is active. Refer to official IMD bulletin.';
  }

  return { title: 'Ocean State Forecast Advisory (' + langConfig.name + ')', text: t.trim() };
}

var activeAudioElement = null;

function stopVoiceSummary() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (activeAudioElement) {
    activeAudioElement.pause();
    activeAudioElement.currentTime = 0;
    activeAudioElement = null;
  }
  isSpeechPlaying = false;
  const playBtn = ids('voicePlayBtn');
  if (playBtn) {
    playBtn.innerHTML = '▶ Play Audio';
    playBtn.classList.remove('is-playing');
  }
}

function playVoiceSummary() {
  if (isSpeechPlaying) {
    stopVoiceSummary();
    return;
  }

  // Cancel any running speech synthesis
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  if (activeAudioElement) {
    activeAudioElement.pause();
    activeAudioElement.currentTime = 0;
    activeAudioElement = null;
  }

  const langConfig = VOICE_LANGUAGES.find(l => l.code === selectedVoiceLang) || VOICE_LANGUAGES[0];
  const playBtn = ids('voicePlayBtn');

  const onStart = () => {
    isSpeechPlaying = true;
    if (playBtn) {
      playBtn.innerHTML = '⏹ Stop Audio';
      playBtn.classList.add('is-playing');
    }
  };

  const onEnd = () => {
    isSpeechPlaying = false;
    if (playBtn) {
      playBtn.innerHTML = '▶ Play Audio';
      playBtn.classList.remove('is-playing');
    }
  };

  // Stream and play pre-rendered Google TTS regional audio MP3 from Git
  const cacheVer = globalThis.OCEAN_WATCH_CONFIG?.CACHE_VERSION || '1';
  const audioUrl = new URL('./audio/bulletins/bulletin-' + langConfig.voicePrefix + '.mp3?v=' + cacheVer, window.location.href).href;

  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = audioUrl;
  activeAudioElement = audio;

  audio.addEventListener('play', onStart);
  audio.addEventListener('playing', onStart);
  audio.addEventListener('ended', onEnd);
  audio.addEventListener('pause', () => {
    if (audio.paused || audio.currentTime >= audio.duration) {
      onEnd();
    }
  });

  audio.addEventListener('error', (err) => {
    console.error('Audio stream load error for:', audioUrl, err, audio.error);
    onEnd();
    // Only on Android / devices where a true matching regional voice is installed
    const matchedVoice = findBestVoice(langConfig);
    if ('speechSynthesis' in window && matchedVoice && matchedVoice.lang && matchedVoice.lang.toLowerCase().startsWith(langConfig.voicePrefix)) {
      const data = globalThis.latestStatusData || latestStatusData;
      const bulletin = buildBulletinSummary(data, selectedVoiceLang);
      const utterance = new SpeechSynthesisUtterance(bulletin.text);
      utterance.voice = matchedVoice;
      utterance.lang = matchedVoice.lang;
      utterance.onstart = onStart;
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Unable to play audio stream for ' + langConfig.name + '. Please check network connection.');
    }
  });

  onStart();
  audio.play().catch(err => {
    console.warn('Audio play() promise error:', err);
    onEnd();
  });
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

  if (voiceNoticeEl) {
    voiceNoticeEl.textContent = 'Voice engine: Google Text-to-Speech (HQ Audio Stream)';
    voiceNoticeEl.style.color = 'var(--teal)';
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
