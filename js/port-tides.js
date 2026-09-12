// National Tide Gauge Stations dataset with geographical coordinates, coastal district mappings, and tidal parameters
// Sourced from INCOIS National Tide Gauge Network & INCOIS PAT (https://incois.gov.in/oceanservices/PAT/index.html)
var NATIONAL_TIDE_STATIONS = [
  {
    "id": "adan",
    "name": "Adani",
    "lat": 21.1,
    "lng": 72.616,
    "state": "Gujarat",
    "district": "Surat / Hazira",
    "range": 5.8,
    "m2Amp": 2.1,
    "s2Amp": 0.75,
    "baseWind": 16,
    "windDir": "SW"
  },
  {
    "id": "aeri",
    "name": "Aerialbay",
    "lat": 13.2833,
    "lng": 93.0333,
    "state": "Andaman & Nicobar",
    "district": "Diglipur / Aerial Bay / North Andaman",
    "range": 2.1,
    "m2Amp": 0.75,
    "s2Amp": 0.25,
    "baseWind": 17,
    "windDir": "WSW"
  },
  {
    "id": "agatt",
    "name": "Agatti",
    "lat": 10.8184,
    "lng": 72.1726,
    "state": "Lakshadweep",
    "district": "Agatti Island",
    "range": 1.4,
    "m2Amp": 0.48,
    "s2Amp": 0.17,
    "baseWind": 15,
    "windDir": "WNW"
  },
  {
    "id": "astra",
    "name": "Astranga",
    "lat": 19.9743,
    "lng": 86.339,
    "state": "Odisha",
    "district": "Puri",
    "range": 2.6,
    "m2Amp": 0.9,
    "s2Amp": 0.32,
    "baseWind": 16,
    "windDir": "SSW"
  },
  {
    "id": "bahab",
    "name": "Bahabalpur",
    "lat": 20.793,
    "lng": 86.9006,
    "state": "Odisha",
    "district": "Baleswar",
    "range": 3.4,
    "m2Amp": 1.2,
    "s2Amp": 0.42,
    "baseWind": 15,
    "windDir": "S"
  },
  {
    "id": "beyp",
    "name": "Beypore",
    "lat": 11.171,
    "lng": 75.808,
    "state": "Kerala",
    "district": "Kozhikode",
    "range": 1.3,
    "m2Amp": 0.45,
    "s2Amp": 0.16,
    "baseWind": 12,
    "windDir": "W"
  },
  {
    "id": "camp",
    "name": "Campbellbay",
    "lat": 7,
    "lng": 93.9333,
    "state": "Andaman & Nicobar",
    "district": "Campbell Bay / Indira Point / Great Nicobar / Nicobar",
    "range": 1.8,
    "m2Amp": 0.65,
    "s2Amp": 0.22,
    "baseWind": 18,
    "windDir": "SW"
  },
  {
    "id": "carn",
    "name": "Carnicobar",
    "lat": 9.2344,
    "lng": 92.7769,
    "state": "Andaman & Nicobar",
    "district": "Car Nicobar / Nicobar",
    "range": 2,
    "m2Amp": 0.7,
    "s2Amp": 0.24,
    "baseWind": 18,
    "windDir": "WSW"
  },
  {
    "id": "chenn",
    "name": "Chennai",
    "lat": 13.1,
    "lng": 80.3,
    "state": "Tamil Nadu",
    "district": "Chennai",
    "range": 1.4,
    "m2Amp": 0.48,
    "s2Amp": 0.17,
    "baseWind": 14,
    "windDir": "S"
  },
  {
    "id": "chetl",
    "name": "Chetlat",
    "lat": 11.6939,
    "lng": 72.717,
    "state": "Lakshadweep",
    "district": "Amini / Chetlat Island",
    "range": 1.4,
    "m2Amp": 0.48,
    "s2Amp": 0.17,
    "baseWind": 15,
    "windDir": "WNW"
  },
  {
    "id": "coch",
    "name": "Cochin",
    "lat": 9.9667,
    "lng": 76.2667,
    "state": "Kerala",
    "district": "Ernakulam",
    "range": 1.1,
    "m2Amp": 0.38,
    "s2Amp": 0.14,
    "baseWind": 13,
    "windDir": "W"
  },
  {
    "id": "daman",
    "name": "Daman",
    "lat": 20.4111,
    "lng": 72.834,
    "state": "Daman & Diu",
    "district": "Daman",
    "range": 4.6,
    "m2Amp": 1.6,
    "s2Amp": 0.58,
    "baseWind": 14,
    "windDir": "WSW"
  },
  {
    "id": "dham",
    "name": "Dhamra",
    "lat": 20.7851,
    "lng": 86.9556,
    "state": "Odisha",
    "district": "Bhadrak",
    "range": 3.6,
    "m2Amp": 1.25,
    "s2Amp": 0.44,
    "baseWind": 15,
    "windDir": "SSW"
  },
  {
    "id": "dosin",
    "name": "Dosinga",
    "lat": 20.8174,
    "lng": 86.9681,
    "state": "Odisha",
    "district": "Bhadrak",
    "range": 3.6,
    "m2Amp": 1.25,
    "s2Amp": 0.44,
    "baseWind": 15,
    "windDir": "SSW"
  },
  {
    "id": "enno",
    "name": "Ennore",
    "lat": 13.25,
    "lng": 80.3333,
    "state": "Tamil Nadu",
    "district": "Thiruvallur / Tiruvallur",
    "range": 1.4,
    "m2Amp": 0.48,
    "s2Amp": 0.17,
    "baseWind": 14,
    "windDir": "SSE"
  },
  {
    "id": "gard",
    "name": "Gardenreach",
    "lat": 22.55,
    "lng": 88.3,
    "osfLat": 21.6,
    "osfLng": 88.1,
    "state": "West Bengal",
    "district": "South 24 Parganas / Kolkata",
    "range": 4.8,
    "m2Amp": 1.7,
    "s2Amp": 0.6,
    "baseWind": 12,
    "windDir": "S"
  },
  {
    "id": "gopa",
    "name": "Gopalpur",
    "lat": 19.2889,
    "lng": 84.9483,
    "state": "Odisha",
    "district": "Ganjam",
    "range": 2.4,
    "m2Amp": 0.85,
    "s2Amp": 0.3,
    "baseWind": 15,
    "windDir": "S"
  },
  {
    "id": "hutb",
    "name": "Hutbay",
    "lat": 10.5914,
    "lng": 92.5625,
    "state": "Andaman & Nicobar",
    "district": "Little Andaman / Hut Bay / South Andaman",
    "range": 2.1,
    "m2Amp": 0.75,
    "s2Amp": 0.25,
    "baseWind": 17,
    "windDir": "WSW"
  },
  {
    "id": "jaig",
    "name": "Jaigarh",
    "lat": 17.281,
    "lng": 73.208,
    "state": "Maharashtra",
    "district": "Ratnagiri",
    "range": 2.8,
    "m2Amp": 1,
    "s2Amp": 0.35,
    "baseWind": 13,
    "windDir": "NW"
  },
  {
    "id": "jakh",
    "name": "Jakhau",
    "lat": 23.243,
    "lng": 68.606,
    "state": "Gujarat",
    "district": "Kachchh",
    "range": 4.5,
    "m2Amp": 1.6,
    "s2Amp": 0.55,
    "baseWind": 20,
    "windDir": "WSW"
  },
  {
    "id": "jnpt",
    "name": "Jnpt",
    "lat": 18.9167,
    "lng": 72.75,
    "state": "Maharashtra",
    "district": "Raigad",
    "range": 4.8,
    "m2Amp": 1.7,
    "s2Amp": 0.6,
    "baseWind": 14,
    "windDir": "WNW"
  },
  {
    "id": "kaki",
    "name": "Kakinada",
    "lat": 16.9333,
    "lng": 82.25,
    "state": "Andhra Pradesh",
    "district": "East Godavari / Kakinada",
    "range": 1.6,
    "m2Amp": 0.55,
    "s2Amp": 0.2,
    "baseWind": 13,
    "windDir": "SE"
  },
  {
    "id": "kalpe",
    "name": "Kalpeni",
    "lat": 10.0884,
    "lng": 73.6467,
    "state": "Lakshadweep",
    "district": "Androth / Kalpeni Island",
    "range": 1.3,
    "m2Amp": 0.45,
    "s2Amp": 0.16,
    "baseWind": 14,
    "windDir": "W"
  },
  {
    "id": "kand",
    "name": "Kandla",
    "lat": 23.017,
    "lng": 70.217,
    "osfLat": 22.8,
    "osfLng": 70.0,
    "state": "Gujarat",
    "district": "Kachchh",
    "range": 6.4,
    "m2Amp": 2.3,
    "s2Amp": 0.8,
    "baseWind": 18,
    "windDir": "WSW"
  },
  {
    "id": "kanya",
    "name": "Kanyakumari",
    "lat": 8.0952,
    "lng": 77.5645,
    "state": "Tamil Nadu",
    "district": "Kanniyakumari",
    "range": 1,
    "m2Amp": 0.35,
    "s2Amp": 0.12,
    "baseWind": 22,
    "windDir": "WSW"
  },
  {
    "id": "karw",
    "name": "Karwar",
    "lat": 14.8,
    "lng": 74.1167,
    "state": "Karnataka",
    "district": "Uttara Kannada",
    "range": 2.1,
    "m2Amp": 0.75,
    "s2Amp": 0.25,
    "baseWind": 10,
    "windDir": "W"
  },
  {
    "id": "kava",
    "name": "Kavaratti",
    "lat": 10.5667,
    "lng": 72.6333,
    "state": "Lakshadweep",
    "district": "Kavaratti Island",
    "range": 1.4,
    "m2Amp": 0.48,
    "s2Amp": 0.17,
    "baseWind": 15,
    "windDir": "WNW"
  },
  {
    "id": "koll",
    "name": "Kollam",
    "lat": 8.864,
    "lng": 76.603,
    "state": "Kerala",
    "district": "Kollam",
    "range": 1,
    "m2Amp": 0.35,
    "s2Amp": 0.12,
    "baseWind": 14,
    "windDir": "WSW"
  },
  {
    "id": "kris",
    "name": "Krishnapatnam",
    "lat": 14.25,
    "lng": 80.1333,
    "state": "Andhra Pradesh",
    "district": "SPS Nellore",
    "range": 1.3,
    "m2Amp": 0.45,
    "s2Amp": 0.16,
    "baseWind": 13,
    "windDir": "SSE"
  },
  {
    "id": "mach",
    "name": "Machilipatnam",
    "lat": 16.145,
    "lng": 81.178,
    "state": "Andhra Pradesh",
    "district": "Krishna",
    "range": 1.5,
    "m2Amp": 0.52,
    "s2Amp": 0.18,
    "baseWind": 14,
    "windDir": "SE"
  },
  {
    "id": "marm",
    "name": "Marmagoa",
    "lat": 15.409,
    "lng": 73.8,
    "state": "Goa",
    "district": "South Goa",
    "range": 2.3,
    "m2Amp": 0.8,
    "s2Amp": 0.28,
    "baseWind": 11,
    "windDir": "WNW"
  },
  {
    "id": "mayab",
    "name": "Mayabunder",
    "lat": 12.9265,
    "lng": 92.8975,
    "state": "Andaman & Nicobar",
    "district": "Mayabunder / North Sentinel Island / North & Middle Andaman",
    "range": 2.2,
    "m2Amp": 0.78,
    "s2Amp": 0.26,
    "baseWind": 16,
    "windDir": "WSW"
  },
  {
    "id": "mini",
    "name": "Minicoy",
    "lat": 8.2833,
    "lng": 73.05,
    "state": "Lakshadweep",
    "district": "Minicoy Island",
    "range": 1.2,
    "m2Amp": 0.42,
    "s2Amp": 0.15,
    "baseWind": 16,
    "windDir": "WSW"
  },
  {
    "id": "mumba",
    "name": "Mumbai",
    "lat": 18.9415,
    "lng": 72.8527,
    "state": "Maharashtra",
    "district": "Mumbai City",
    "range": 4.8,
    "m2Amp": 1.7,
    "s2Amp": 0.6,
    "baseWind": 14,
    "windDir": "WNW"
  },
  {
    "id": "murud",
    "name": "Murud",
    "lat": 18.2837,
    "lng": 72.9823,
    "state": "Maharashtra",
    "district": "Raigad",
    "range": 4.2,
    "m2Amp": 1.5,
    "s2Amp": 0.52,
    "baseWind": 13,
    "windDir": "NW"
  },
  {
    "id": "naga",
    "name": "Nagapattinam",
    "lat": 10.7667,
    "lng": 79.85,
    "state": "Tamil Nadu",
    "district": "Nagapattinam",
    "range": 0.9,
    "m2Amp": 0.32,
    "s2Amp": 0.11,
    "baseWind": 15,
    "windDir": "SSW"
  },
  {
    "id": "nagc",
    "name": "Nancowry",
    "lat": 8.05,
    "lng": 93.55,
    "state": "Andaman & Nicobar",
    "district": "Nancowry / Komatra & Katchal Island / Kamorta / Nicobar",
    "range": 1.9,
    "m2Amp": 0.68,
    "s2Amp": 0.23,
    "baseWind": 18,
    "windDir": "SW"
  },
  {
    "id": "newm",
    "name": "Newmangalore",
    "lat": 12.9167,
    "lng": 74.8,
    "state": "Karnataka",
    "district": "Dakshina Kannada",
    "range": 1.6,
    "m2Amp": 0.55,
    "s2Amp": 0.2,
    "baseWind": 12,
    "windDir": "W"
  },
  {
    "id": "okha",
    "name": "Okha",
    "lat": 22.4667,
    "lng": 69.0833,
    "state": "Gujarat",
    "district": "Devbhumi Dwarka",
    "range": 4.2,
    "m2Amp": 1.5,
    "s2Amp": 0.5,
    "baseWind": 20,
    "windDir": "SW"
  },
  {
    "id": "panaj",
    "name": "Panaji",
    "lat": 15.5016,
    "lng": 73.8282,
    "state": "Goa",
    "district": "North Goa",
    "range": 2.3,
    "m2Amp": 0.8,
    "s2Amp": 0.28,
    "baseWind": 11,
    "windDir": "WNW"
  },
  {
    "id": "para",
    "name": "Paradeep",
    "lat": 20.2667,
    "lng": 86.7,
    "state": "Odisha",
    "district": "Jagatsinghpur",
    "range": 2.9,
    "m2Amp": 1,
    "s2Amp": 0.35,
    "baseWind": 16,
    "windDir": "SW"
  },
  {
    "id": "porb",
    "name": "Porbander",
    "lat": 21.6333,
    "lng": 69.6167,
    "state": "Gujarat",
    "district": "Porbandar",
    "range": 3.2,
    "m2Amp": 1.15,
    "s2Amp": 0.4,
    "baseWind": 18,
    "windDir": "SW"
  },
  {
    "id": "ptbl",
    "name": "Portblair",
    "lat": 11.6833,
    "lng": 92.7667,
    "state": "Andaman & Nicobar",
    "district": "Port Blair / South Andaman",
    "range": 2.2,
    "m2Amp": 0.78,
    "s2Amp": 0.26,
    "baseWind": 17,
    "windDir": "WSW"
  },
  {
    "id": "pudu",
    "name": "Puducherry",
    "lat": 11.93,
    "lng": 79.835,
    "state": "Puducherry",
    "district": "Puducherry",
    "range": 1.3,
    "m2Amp": 0.45,
    "s2Amp": 0.16,
    "baseWind": 14,
    "windDir": "S"
  },
  {
    "id": "ramaya",
    "name": "Ramayapatnam",
    "lat": 15.0158,
    "lng": 80.0603,
    "state": "Andhra Pradesh",
    "district": "Prakasam",
    "range": 1.4,
    "m2Amp": 0.48,
    "s2Amp": 0.17,
    "baseWind": 13,
    "windDir": "SSE"
  },
  {
    "id": "rames",
    "name": "Rameshwaram",
    "lat": 9.2578,
    "lng": 79.2257,
    "state": "Tamil Nadu",
    "district": "Ramanathapuram",
    "range": 0.8,
    "m2Amp": 0.28,
    "s2Amp": 0.1,
    "baseWind": 20,
    "windDir": "SW"
  },
  {
    "id": "rang",
    "name": "Rangatbay",
    "lat": 12.4889,
    "lng": 92.9569,
    "state": "Andaman & Nicobar",
    "district": "Rangath Bay / Rangat / Middle Andaman",
    "range": 2.2,
    "m2Amp": 0.78,
    "s2Amp": 0.26,
    "baseWind": 16,
    "windDir": "WSW"
  },
  {
    "id": "tuti",
    "name": "Tuticorin",
    "lat": 8.75,
    "lng": 78.2,
    "state": "Tamil Nadu",
    "district": "Thoothukkudi",
    "range": 1.2,
    "m2Amp": 0.42,
    "s2Amp": 0.15,
    "baseWind": 19,
    "windDir": "SW"
  },
  {
    "id": "verav",
    "name": "Veraval",
    "lat": 20.912,
    "lng": 70.408,
    "state": "Gujarat",
    "district": "Gir Somnath",
    "range": 2.8,
    "m2Amp": 1,
    "s2Amp": 0.35,
    "baseWind": 16,
    "windDir": "SW"
  },
  {
    "id": "vish",
    "name": "Visakhapatnam",
    "lat": 17.6833,
    "lng": 83.2833,
    "state": "Andhra Pradesh",
    "district": "Visakhapatnam",
    "range": 1.8,
    "m2Amp": 0.62,
    "s2Amp": 0.22,
    "baseWind": 14,
    "windDir": "SSW"
  }
];
var MAJOR_COASTAL_PORTS = NATIONAL_TIDE_STATIONS;

// Canonical mapping to official INCOIS PAT station regions.
// Only genuine alternate spellings / suffixes are mapped. Stations without dedicated PAT gauges use their own name.
var STATION_PAT_REGION_MAP = {
  chenn: 'Chennai',
  coch: 'Kochi',
  kand: 'Kandla-Harbour',
  mumba: 'Mumbai-Apollo-Bandar',
  para: 'Paradip',
  porb: 'Porbandar',
  ptbl: 'Port-Blair',
  naga: 'Nagapatnam',
  newm: 'Mangalore',
  marm: 'Marmagao',
  carn: 'Car-Nicobar',
  nagc: 'Nancowry-Harbour',
  rames: 'Pamban-Pass',
  gard: 'Kolkata-Kidderpore-docks',
  kava: 'Kavaratti-Laccadive-Is',
  mini: 'Minicoy',
  vish: 'Visakhapatnam',
  dham: 'Dhamra',
  gopa: 'Gopalpur',
  jaig: 'Jaigarh',
  kaki: 'Kakinada',
  karw: 'Karwar',
  koll: 'Kollam',
  okha: 'Okha',
  pudu: 'Puducherry',
  tuti: 'Tuticorin',
  beyp: 'Beypore'
};

NATIONAL_TIDE_STATIONS.forEach(function (p) {
  p.patRegion = STATION_PAT_REGION_MAP[p.id] || p.name;
});

// Official INCOIS PAT Cache & Loader
var patTidesCache = null;
var patTidesFetchPromise = null;

function loadPatTidesData() {
  if (patTidesCache) return Promise.resolve(patTidesCache);
  if (patTidesFetchPromise) return patTidesFetchPromise;

  patTidesFetchPromise = fetch('data/tides.json')
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      patTidesCache = data;
      renderPortTideCard();
      return data;
    })
    .catch(function (err) {
      console.warn('[PortTides] Official PAT data unavailable:', err?.message);
      patTidesCache = null;
      renderPortTideCard();
      return null;
    });

  return patTidesFetchPromise;
}

// Automatically start fetching official PAT tides in browser environment
if (typeof window !== 'undefined') {
  void loadPatTidesData();
}

// Cosine interpolation between discrete hourly PAT points
function interpolatePatHeight(pts, timestamp) {
  if (!pts || !pts.length) return 0;
  if (timestamp <= pts[0].t) return pts[0].h;
  if (timestamp >= pts[pts.length - 1].t) return pts[pts.length - 1].h;
  for (var i = 0; i < pts.length - 1; i++) {
    var p0 = pts[i];
    var p1 = pts[i + 1];
    if (timestamp >= p0.t && timestamp <= p1.t) {
      var mu = (timestamp - p0.t) / (p1.t - p0.t);
      var mu2 = (1 - Math.cos(mu * Math.PI)) / 2;
      return Number((p0.h * (1 - mu2) + p1.h * mu2).toFixed(2));
    }
  }
  return pts[0].h;
}

// Retrieve official Survey of India / INCOIS PAT predictions for today
function getPatDayData(port, now = new Date()) {
  var patStation = patTidesCache?.stations?.[port.id];
  if (!patStation || !patStation.events || !patStation.events.length) return null;

  var todayDateStr = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  var todayEvents = patStation.events
    .filter(function (e) { return e.time && e.time.startsWith(todayDateStr); })
    .map(function (e) {
      return {
        type: e.type,
        time: new Date(e.time),
        height: e.height
      };
    });

  if (!todayEvents.length) return null;

  var pts = (patStation.series || []).map(function (p) {
    return { t: new Date(p.time).getTime(), h: p.height };
  });

  var elevations = [];
  var istStartMs = new Date(todayDateStr + 'T00:00:00+05:30').getTime();
  if (pts.length) {
    for (var min = 0; min <= 24 * 60; min += 5) {
      var timeMs = istStartMs + min * 60 * 1000;
      var time = new Date(timeMs);
      var h = interpolatePatHeight(pts, timeMs);
      elevations.push({ time: time, height: h, minutes: min });
    }
  }

  var nowMs = now.getTime();
  var currentHeight = pts.length ? interpolatePatHeight(pts, nowMs) : null;
  var futureHeight = pts.length ? interpolatePatHeight(pts, nowMs + 15 * 60 * 1000) : null;
  var isRising = (currentHeight !== null && futureHeight !== null) ? (futureHeight >= currentHeight) : null;

  return {
    events: todayEvents,
    elevations: elevations.length ? elevations : null,
    currentHeight: currentHeight,
    isRising: isRising
  };
}

var selectedPortId = 'chenn';
var userLocationData = null;

// Calculate Haversine distance in kilometers
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getNearestPort(lat, lng) {
  return getNearestTideStation(lat, lng);
}

function getNearestTideStation(lat, lng) {
  let nearest = NATIONAL_TIDE_STATIONS[0];
  let minDistance = Number.POSITIVE_INFINITY;

  for (const st of NATIONAL_TIDE_STATIONS) {
    const dist = calculateHaversineDistance(lat, lng, st.lat, st.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = st;
    }
  }
  return { port: nearest, distanceKm: Math.round(minDistance) };
}

// Astronomical Harmonic Tide Elevation calculation (unrounded float)
function calculateTideElevationRaw(port, date) {
  const tHours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  
  // Principal Lunar Semidiurnal M2 (Period ~12.42h)
  const m2Speed = 2 * Math.PI / 12.4206;
  const m2Phase = (port.lng * Math.PI / 180) + (dayOfYear * 0.08);
  const m2 = port.m2Amp * Math.cos(m2Speed * tHours - m2Phase);

  // Principal Solar Semidiurnal S2 (Period ~12.00h)
  const s2Speed = 2 * Math.PI / 12.0;
  const s2Phase = (port.lng * Math.PI / 180) * 0.8;
  const s2 = port.s2Amp * Math.cos(s2Speed * tHours - s2Phase);

  // Lunar Diurnal K1 (Period ~23.93h)
  const k1Speed = 2 * Math.PI / 23.9344;
  const k1 = (port.range * 0.12) * Math.sin(k1Speed * tHours);

  // Mean Sea Level
  const msl = port.range * 0.55;

  return msl + m2 + s2 + k1;
}

function calculateTideElevation(port, date) {
  const rawHeight = calculateTideElevationRaw(port, date);
  return Number(Math.max(0.05, rawHeight).toFixed(2));
}

var dailyTideCache = new Map();

// Generate 24-hour tide predictions (High Tides & Low Tides) for today with robust extremum detection
function calculateDailyTideEvents(port, baseDate = new Date()) {
  const dateKey = `${port.id}_${baseDate.getFullYear()}-${baseDate.getMonth()}-${baseDate.getDate()}`;
  if (dailyTideCache.has(dateKey)) {
    return dailyTideCache.get(dateKey);
  }

  const startOfDay = new Date(baseDate);
  startOfDay.setHours(0, 0, 0, 0);

  // 1. Sample elevations for the SVG chart (every 5 mins)
  const elevations = [];
  for (let m = 0; m <= 24 * 60; m += 5) {
    const time = new Date(startOfDay.getTime() + m * 60 * 1000);
    const rawH = calculateTideElevationRaw(port, time);
    elevations.push({ time, height: Number(Math.max(0.05, rawH).toFixed(2)), minutes: m });
  }

  // 2. High-resolution sampling (every 2 mins with a 60-min buffer) on continuous floats
  const samples = [];
  for (let m = -60; m <= 24 * 60 + 60; m += 2) {
    const time = new Date(startOfDay.getTime() + m * 60 * 1000);
    samples.push({ minutes: m, time, h: calculateTideElevationRaw(port, time) });
  }

  // 3. Detect candidate peaks and troughs using 5-point slope comparison
  const rawExtrema = [];
  for (let i = 2; i < samples.length - 2; i++) {
    const prev2 = samples[i - 2].h;
    const prev1 = samples[i - 1].h;
    const curr = samples[i].h;
    const next1 = samples[i + 1].h;
    const next2 = samples[i + 2].h;

    if (curr >= prev1 && curr > prev2 && curr >= next1 && curr > next2) {
      rawExtrema.push({ type: 'High', minutes: samples[i].minutes, time: samples[i].time, height: Number(Math.max(0.05, curr).toFixed(2)), raw: curr });
    } else if (curr <= prev1 && curr < prev2 && curr <= next1 && curr < next2) {
      rawExtrema.push({ type: 'Low', minutes: samples[i].minutes, time: samples[i].time, height: Number(Math.max(0.05, curr).toFixed(2)), raw: curr });
    }
  }

  // 4. Filter events strictly within [00:00, 24:00], merging adjacent micro-ripples and enforcing alternating sequence
  const filteredEvents = [];
  for (const ext of rawExtrema) {
    if (ext.minutes < 0 || ext.minutes > 1440) continue;

    const last = filteredEvents[filteredEvents.length - 1];
    if (!last) {
      filteredEvents.push(ext);
    } else if (last.type === ext.type) {
      if (ext.type === 'High' && ext.raw > last.raw) {
        filteredEvents[filteredEvents.length - 1] = ext;
      } else if (ext.type === 'Low' && ext.raw < last.raw) {
        filteredEvents[filteredEvents.length - 1] = ext;
      }
    } else {
      if (Math.abs(ext.minutes - last.minutes) >= 150) {
        if (Math.abs(ext.raw - last.raw) >= 0.12) {
          filteredEvents.push(ext);
        }
      }
    }
  }

  const result = { events: filteredEvents, elevations };
  dailyTideCache.set(dateKey, result);
  return result;
}

function isTsunamiThreatActive(tsunami) {
  if (!tsunami) return false;
  const msg = String(tsunami.message || '').trim().toLowerCase();
  const bulletin = tsunami.bulletin || tsunami.recentBulletin;
  const state = String(bulletin?.state || '').trim().toLowerCase();
  
  if (state === 'safe' || msg.includes('does not exist') || msg.includes('no tsunami threat')) {
    return false;
  }
  if (['warning', 'alert', 'watch', 'threat'].includes(state)) {
    return true;
  }
  if (msg.includes('threat exists') || msg.includes('tsunami warning') || msg.includes('tsunami alert')) {
    return true;
  }
  return false;
}

// Helper to normalize strings for district/state comparison with phonetic & alias mapping
function portNormalizeName(value) {
  if (typeof globalThis.normalizeOsfName === 'function') {
    return globalThis.normalizeOsfName(value);
  }
  return String(value || '')
    .toUpperCase()
    .replace(/&/g, ' AND ')
    .replace(/[^A-Z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function portDistrictMatches(portDist, advDist) {
  if (typeof globalThis.osfDistrictMatches === 'function') {
    return globalThis.osfDistrictMatches(portDist, advDist);
  }
  const pName = portNormalizeName(portDist);
  const aName = portNormalizeName(advDist);
  if (!pName || !aName) return false;
  if (pName === aName) return true;
  const pParts = String(portDist || '').split(/,|\/|&|\bAND\b/i).map(portNormalizeName).filter(Boolean);
  return pParts.some(part => part === aName || (aName.length >= 5 && part.includes(aName)) || (part.length >= 5 && aName.includes(part)));
}

// Check active warnings for station's specific district/state in latestStatusData
function checkPortActiveWarnings(port) {
  if (!globalThis.latestStatusData) return { safe: false, level: 'watch', text: 'Unable to Fetch.....Check the INCOIS OSF link.....' };

  const data = globalThis.latestStatusData;
  const matches = [];
  const sevWeight = { warning: 3, alert: 2, watch: 1, noThreat: 0 };

  const checkOsfHazard = (hazardData, hazardName) => {
    if (!hazardData?.states?.length) return;
    const normState = portNormalizeName(port.state);
    const st = hazardData.states.find(s => {
      const sNorm = portNormalizeName(s.name);
      return sNorm && (sNorm.includes(normState) || normState.includes(sNorm));
    });
    if (!st) return;

    // Check specific district advisories for this station's district or port name
    const advisories = st.advisories || [];
    const districtAdv = advisories.find(adv => 
      portDistrictMatches(port.district, adv.district) || portDistrictMatches(port.name, adv.district)
    );

    if (districtAdv) {
      if (districtAdv.severity === 'warning') {
        matches.push({ hazard: hazardName, level: 'warning', label: `${hazardName} Warning`, message: districtAdv.message, district: districtAdv.district });
      } else if (districtAdv.severity === 'alert') {
        matches.push({ hazard: hazardName, level: 'alert', label: `${hazardName} Alert`, message: districtAdv.message, district: districtAdv.district });
      } else if (districtAdv.severity === 'watch') {
        matches.push({ hazard: hazardName, level: 'watch', label: `${hazardName} Watch`, message: districtAdv.message, district: districtAdv.district });
      }
    }
  };

  // 1. High Wave check (district level)
  checkOsfHazard(data.highWave, 'High Wave');

  // 2. Swell Surge check (district level)
  checkOsfHazard(data.swellSurge, 'Swell Surge');

  // 3. Ocean Currents check (district level)
  checkOsfHazard(data.oceanCurrent, 'Ocean Currents');

  // 4. Cyclone check (only if cyclone message/title pertains to this station's state or district)
  if (['yellow', 'orange', 'red'].includes(data.cyclone?.level)) {
    const cycloneText = portNormalizeName(`${data.cyclone.title || ''} ${data.cyclone.message || ''}`);
    const normState = portNormalizeName(port.state);
    const normDist = portNormalizeName(port.district);
    const isStateMentioned = normState && cycloneText.includes(normState);
    const isDistrictMentioned = normDist && cycloneText.includes(normDist);
    if (isStateMentioned || isDistrictMentioned) {
      const cycLvl = data.cyclone.level === 'red' ? 'warning' : (data.cyclone.level === 'orange' ? 'alert' : 'watch');
      matches.push({ hazard: 'Cyclone', level: cycLvl, label: `Cyclone ${data.cyclone.level.toUpperCase()}`, message: data.cyclone.title });
    }
  }

  // 5. Tsunami check
  if (isTsunamiThreatActive(data.tsunami)) {
    matches.push({ hazard: 'Tsunami', level: 'warning', label: 'Tsunami Warning Active' });
  }

  const translatedPortState = globalThis.i18n?.translateStateName(port.state) || port.state;
  const translatedPortDistrict = globalThis.i18n?.translateDistrictName(port.district) || port.district;

  if (matches.length === 0) {
    const noWarnLbl = globalThis.i18n?.t('tide.no_warnings', '✓ No active coastal warnings for') || '✓ No active coastal warnings for';
    return { safe: true, level: 'safe', text: `${noWarnLbl} ${port.name} (${translatedPortDistrict}, ${translatedPortState})` };
  }

  // Sort by highest severity (warning > alert > watch)
  matches.sort((a, b) => (sevWeight[b.level] || 0) - (sevWeight[a.level] || 0));
  const worst = matches[0];

  const activeForLbl = globalThis.i18n?.t('tide.active_for', 'active for') || 'active for';
  const coastLbl = globalThis.i18n?.t('tide.coast', 'Coast') || 'Coast';

  // Build multi-hazard summary list (e.g. High Wave WARNING · Swell Surge ALERT · Ocean Currents WATCH)
  const hazardSummaries = matches.map(m => {
    const sKey = m.level === 'warning' ? 'severity.warning' : (m.level === 'alert' ? 'severity.alert' : 'severity.watch');
    const localizedSev = globalThis.i18n?.t(sKey, m.level.toUpperCase()) || m.level.toUpperCase();
    const localizedHazard = m.hazard ? (globalThis.i18n?.t(`osf.${m.hazard.toLowerCase().replace(/\s+/g,'_')}`, m.hazard) || m.hazard) : '';
    return `${localizedHazard} ${localizedSev}`.trim();
  });

  const displayLabel = hazardSummaries.join(' · ');

  return {
    safe: false,
    level: worst.level,
    matches: matches,
    match: worst,
    text: `⚠️ ${displayLabel} ${activeForLbl} ${port.name} (${translatedPortDistrict}, ${translatedPortState} ${coastLbl})`
  };
}

// Render SVG Tide Curve
function renderTideChartSvg(elevations, port, now = new Date(), currentHeightOverride = null) {
  const width = 340;
  const height = 90;
  const padTop = 16;
  const padBottom = 18;
  const padSide = 12;

  const minH = Math.min(...elevations.map(e => e.height));
  const maxH = Math.max(...elevations.map(e => e.height));
  const rangeH = Math.max(0.8, maxH - minH);

  const getX = m => padSide + (m / (24 * 60)) * (width - 2 * padSide);
  const getY = h => padTop + (1 - (h - minH) / rangeH) * (height - padTop - padBottom);

  let pathD = '';
  elevations.forEach((pt, i) => {
    const x = getX(pt.minutes).toFixed(1);
    const y = getY(pt.height).toFixed(1);
    pathD += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  });

  // Fill area under curve
  const fillD = `${pathD} L ${getX(24 * 60).toFixed(1)} ${height - padBottom} L ${getX(0).toFixed(1)} ${height - padBottom} Z`;

  // Current time position
  const nowM = now.getHours() * 60 + now.getMinutes();
  const nowX = getX(Math.min(24 * 60, Math.max(0, nowM))).toFixed(1);
  const currentHeight = (currentHeightOverride !== null)
    ? Number(currentHeightOverride).toFixed(2)
    : calculateTideElevation(port, now);
  const nowY = getY(Number(currentHeight)).toFixed(1);

  // Time markers at 00h, 06h, 12h, 18h, 24h
  const timeLabels = [
    { label: '00:00', m: 0 },
    { label: '06:00', m: 360 },
    { label: '12:00', m: 720 },
    { label: '18:00', m: 1080 },
    { label: '24:00', m: 1440 }
  ];

  const markersSvg = timeLabels.map(t => `
    <text x="${getX(t.m).toFixed(1)}" y="${height - 3}" font-size="8" fill="#5b7279" text-anchor="${t.m === 0 ? 'start' : t.m === 1440 ? 'end' : 'middle'}">${t.label}</text>
    <line x1="${getX(t.m).toFixed(1)}" y1="${height - padBottom}" x2="${getX(t.m).toFixed(1)}" y2="${height - padBottom + 3}" stroke="#d9e5e1" stroke-width="1" />
  `).join('');

  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });

  return `
    <svg viewBox="0 0 ${width} ${height}" class="tide-curve-svg" aria-hidden="true">
      <defs>
        <linearGradient id="tideFillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#087f84" stop-opacity="0.32" />
          <stop offset="100%" stop-color="#087f84" stop-opacity="0.04" />
        </linearGradient>
      </defs>
      <line x1="${padSide}" y1="${height - padBottom}" x2="${width - padSide}" y2="${height - padBottom}" stroke="#cbd3d4" stroke-width="1" />
      <path d="${fillD}" fill="url(#tideFillGrad)" />
      <path d="${pathD}" fill="none" stroke="#087f84" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      <text x="${width - padSide}" y="11" font-size="8.5" font-weight="900" fill="#082f3c" text-anchor="end" opacity="0.9">🌊 ${port.name} · ${dateStr}</text>
      ${markersSvg}
      <line x1="${nowX}" y1="${padTop}" x2="${nowX}" y2="${height - padBottom}" stroke="#f97316" stroke-width="1.6" stroke-dasharray="2,2" />
      <circle cx="${nowX}" cy="${nowY}" r="4" fill="#ea580c" stroke="#ffffff" stroke-width="1.8" />
      <text x="${nowX}" y="${Math.max(10, Number(nowY) - 6)}" font-size="8.5" font-weight="900" fill="#ea580c" text-anchor="middle">NOW ${currentHeight}m</text>
    </svg>
  `;
}

// Astronomical Lunar Phase Calculation
function getMoonPhase(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const c = Math.floor(year / 100);
  const epact = (11 * (year % 19) + Math.floor((8 * c + 13) / 25) - Math.floor(c / 4) + 11) % 30;
  const jd = (day + (month < 3 ? month + 12 : month) * 30.6 + epact) % 29.53;
  const age = (jd + 29.53) % 29.53;
  const illumination = Math.round((1 - Math.cos(2 * Math.PI * (age / 29.53))) / 2 * 100);

  let phase = 'New Moon';
  let icon = '🌑';
  if (age < 1.84) { phase = 'New Moon'; icon = '🌑'; }
  else if (age < 7.38) { phase = 'Waxing Crescent'; icon = '🌒'; }
  else if (age < 9.22) { phase = 'First Quarter'; icon = '🌓'; }
  else if (age < 14.76) { phase = 'Waxing Gibbous'; icon = '🌔'; }
  else if (age < 16.61) { phase = 'Full Moon'; icon = '🌕'; }
  else if (age < 22.15) { phase = 'Waning Gibbous'; icon = '🌖'; }
  else if (age < 23.99) { phase = 'Last Quarter'; icon = '🌗'; }
  else { phase = 'Waning Crescent'; icon = '🌘'; }

  const isSpringTide = (age <= 3.0 || age >= 26.5 || (age >= 11.5 && age <= 18.0));
  const tideRegime = isSpringTide ? 'Spring Tide (Max Range)' : 'Neap Tide (Mild Range)';
  const tideBadgeClass = isSpringTide ? 'spring' : 'neap';

  return { phase, icon, illumination, isSpringTide, tideRegime, tideBadgeClass, age: age.toFixed(1) };
}

// Wind Direction Angle to Cardinal Name (16-point compass)
function degreesToCardinal(deg) {
  if (!Number.isFinite(deg)) return '—';
  const cardinals = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const idx = Math.round(((deg % 360) + 360) % 360 / 22.5) % 16;
  return cardinals[idx];
}

// In-memory cache for live INCOIS OSF forecasts (30-minute validity)
var portLiveOsfCache = {};
var portLiveWindCache = portLiveOsfCache; // Backward compatibility alias
var incoisModelFilesCache = null;
var incoisModelFilesPromise = null;

// Dynamically discover active INCOIS THREDDS netCDF model files
async function getIncoisModelFileNames() {
  const now = Date.now();
  if (incoisModelFilesCache && (now - incoisModelFilesCache.timestamp < 30 * 60 * 1000)) {
    return incoisModelFilesCache;
  }
  if (incoisModelFilesPromise) return incoisModelFilesPromise;

  incoisModelFilesPromise = (async () => {
    // Default fallback based on current/yesterday date
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const yyyymmdd = d.toISOString().slice(0, 10).replace(/-/g, '');
    let ww3File = `rsmc_combined_ww3_${yyyymmdd}.nc`;
    let currentsFile = `CURRENTS_NIO_${yyyymmdd}.nc`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const [ww3Res, curRes] = await Promise.allSettled([
        fetch('https://incois.gov.in/thredds/catalog/osf/ww3/catalog.html', { signal: controller.signal }),
        fetch('https://incois.gov.in/thredds/catalog/osf/currents/catalog.html', { signal: controller.signal })
      ]);
      clearTimeout(timeoutId);

      if (ww3Res.status === 'fulfilled' && ww3Res.value.ok) {
        const text = await ww3Res.value.text();
        const matches = text.match(/rsmc_combined_ww3_(\d{8})\.nc/g);
        if (matches && matches.length) ww3File = matches[matches.length - 1];
      }
      if (curRes.status === 'fulfilled' && curRes.value.ok) {
        const text = await curRes.value.text();
        const matches = text.match(/CURRENTS_NIO_(\d{8})\.nc/g);
        if (matches && matches.length) currentsFile = matches[matches.length - 1];
      }
    } catch (err) {
      console.warn('[PortTides] Catalog discovery fallback:', err?.message);
    }

    incoisModelFilesCache = { ww3File, currentsFile, timestamp: Date.now() };
    return incoisModelFilesCache;
  })();

  return incoisModelFilesPromise;
}

// Parse single-layer GetTimeseries CSV returned by INCOIS THREDDS WMS
function parseIncoisTimeseriesCsv(csvText) {
  if (!csvText || typeof csvText !== 'string') return null;
  const rows = csvText.split('\n').filter(r => r && !r.startsWith('#')).slice(1);
  if (!rows.length) return null;

  const nowMs = Date.now();
  let closestVal = null;
  let minDiff = Infinity;

  for (const row of rows) {
    const parts = row.split(',');
    if (parts.length < 2) continue;
    const timeStr = parts[0].trim();
    const val = parseFloat(parts[1].trim());
    if (isNaN(val) || parts[1].trim() === 'null') continue;

    const rowMs = new Date(timeStr).getTime();
    if (isNaN(rowMs)) continue;
    const diff = Math.abs(rowMs - nowMs);
    if (diff < minDiff) {
      minDiff = diff;
      closestVal = val;
    }
  }
  return closestVal;
}

// Fetch a single layer from INCOIS THREDDS GetTimeseries endpoint
async function fetchIncoisLayer(baseUrl, layer, lat, lng, signal) {
  try {
    const url = `${baseUrl}?REQUEST=GetTimeseries&LAYERS=${layer}&QUERY_LAYERS=${layer}&BBOX=${lng},${lat},${lng},${lat}&SRS=CRS:84&FEATURE_COUNT=5&HEIGHT=1&WIDTH=1&X=0&Y=0&ELEVATION=0&VERSION=1.1.1&INFO_FORMAT=text/csv`;
    const res = await fetch(url, { signal, cache: 'default' });
    if (!res.ok) return null;
    const csv = await res.text();
    return parseIncoisTimeseriesCsv(csv);
  } catch {
    return null;
  }
}

// Fetch official live INCOIS OSF numerical model data (Wave, Wind, Swell, Currents)
async function fetchLivePortOsf(port) {
  if (!port || !Number.isFinite(port.lat) || !Number.isFinite(port.lng)) return;
  const cached = portLiveOsfCache[port.id];
  const now = Date.now();
  if (cached && (now - cached.timestamp < 30 * 60 * 1000)) return cached;

  try {
    const files = await getIncoisModelFileNames();
    const ww3Base = `https://incois.gov.in/thredds/wms/osf/ww3/${files.ww3File}`;
    const curBase = `https://incois.gov.in/thredds/wms/osf/currents/${files.currentsFile}`;

    const targetLat = Number.isFinite(port.osfLat) ? port.osfLat : port.lat;
    const targetLng = Number.isFinite(port.osfLng) ? port.osfLng : port.lng;

    // Offshore seaward adjustment for nearshore cells affected by land masks
    const offLng = targetLng > 78 ? targetLng + 0.15 : targetLng - 0.15;
    const curLng = targetLng > 78 ? targetLng + 0.25 : targetLng - 0.25;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const queryWithFallback = async (base, layer, primaryLng, fallbackLng) => {
      let val = await fetchIncoisLayer(base, layer, targetLat, primaryLng, controller.signal);
      if (val === null && fallbackLng !== null && fallbackLng !== primaryLng) {
        val = await fetchIncoisLayer(base, layer, targetLat, fallbackLng, controller.signal);
      }
      return val;
    };

    const [rawHs, rawWindMag, rawWindDir, rawSwellHs, rawSwellTp, rawCur] = await Promise.all([
      queryWithFallback(ww3Base, 'HS', targetLng, offLng),
      queryWithFallback(ww3Base, 'UWND:VWND-mag', targetLng, offLng),
      queryWithFallback(ww3Base, 'MWD', targetLng, offLng),
      queryWithFallback(ww3Base, 'PHS01', targetLng, offLng),
      queryWithFallback(ww3Base, 'PTP01', targetLng, offLng),
      queryWithFallback(curBase, 'CURRENT', curLng, targetLng)
    ]);

    clearTimeout(timeoutId);

    const hasAny = rawHs !== null || rawWindMag !== null || rawCur !== null;
    if (hasAny) {
      const windKmh = rawWindMag !== null ? Math.round(rawWindMag * 3.6) : null;
      const windKnots = rawWindMag !== null ? (rawWindMag * 1.94384).toFixed(1) : null;
      const windDir = rawWindDir !== null ? degreesToCardinal(rawWindDir) : null;

      const entry = {
        waveHs: rawHs,
        windKmh: windKmh,
        windKnots: windKnots,
        windDir: windDir,
        windDeg: rawWindDir,
        swellHs: rawSwellHs,
        swellTp: rawSwellTp,
        currentMs: rawCur,
        isLive: true,
        source: 'INCOIS-OSF',
        timestamp: now
      };

      portLiveOsfCache[port.id] = entry;

      if (selectedPortId === port.id) {
        updatePortWindDisplay(port, entry);
      }
      return entry;
    } else {
      const fallbackEntry = { isLive: false, unavailable: true, timestamp: now };
      portLiveOsfCache[port.id] = fallbackEntry;
      if (selectedPortId === port.id) {
        updatePortWindDisplay(port, fallbackEntry);
      }
    }
  } catch (err) {
    console.warn(`[PortTides] Live INCOIS OSF forecast unavailable for ${port.name}:`, err?.message);
    const fallbackEntry = { isLive: false, unavailable: true, timestamp: now };
    portLiveOsfCache[port.id] = fallbackEntry;
    if (selectedPortId === port.id) {
      updatePortWindDisplay(port, fallbackEntry);
    }
  }

  return null;
}

function updatePortWindDisplay(port, liveData = null) {
  const windElem = ids('portWindDisplay');
  if (!windElem) return;

  const warning = checkPortActiveWarnings(port);

  // Check active warning bulletin messages for hazard indicators
  const allMatches = warning.matches || (warning.match ? [warning.match] : []);
  const waveIsHazard = allMatches.some(m => m.hazard === 'High Wave' && m.level !== 'noThreat');
  const swellIsHazard = allMatches.some(m => m.hazard === 'Swell Surge' && m.level !== 'noThreat');
  const currentIsHazard = allMatches.some(m => m.hazard === 'Ocean Currents' && m.level !== 'noThreat');

  // Live Wind Telemetry (Strictly from INCOIS numerical models - no calculation/fallback)
  let windDisplay = '—';
  if (liveData?.isLive && typeof liveData.windKmh === 'number' && !isNaN(liveData.windKmh)) {
    const windDir = liveData.windDir || '';
    const translatedWindDir = globalThis.i18n?.translateDirection(windDir) || windDir;
    const knotsStr = liveData.windKnots !== null && liveData.windKnots !== undefined ? ` <span class="stat-sub">(${liveData.windKnots} kn)</span>` : '';
    windDisplay = `${translatedWindDir ? translatedWindDir + ' ' : ''}${liveData.windKmh} km/h${knotsStr}`;
  } else if (!liveData) {
    windDisplay = 'Fetching…';
  }

  // Always use official live INCOIS numerical model values for Wave, Swell, and Currents
  let waveDisplay = '—';
  if (liveData?.isLive && typeof liveData.waveHs === 'number' && !isNaN(liveData.waveHs)) {
    waveDisplay = `${liveData.waveHs.toFixed(2)} m`;
  } else if (!liveData) {
    waveDisplay = 'Fetching…';
  }

  let swellDisplay = '—';
  if (liveData?.isLive && typeof liveData.swellHs === 'number' && !isNaN(liveData.swellHs)) {
    const tpStr = typeof liveData.swellTp === 'number' && !isNaN(liveData.swellTp) ? ` (${liveData.swellTp.toFixed(1)}s)` : '';
    swellDisplay = `${liveData.swellHs.toFixed(2)} m${tpStr}`;
  } else if (!liveData) {
    swellDisplay = 'Fetching…';
  }

  let currentDisplay = '—';
  if (liveData?.isLive && typeof liveData.currentMs === 'number' && !isNaN(liveData.currentMs)) {
    currentDisplay = `${liveData.currentMs.toFixed(2)} m/s`;
  } else if (!liveData) {
    currentDisplay = 'Fetching…';
  }

  const windLbl = globalThis.i18n?.t('tide.wind', 'Wind') || 'Wind';
  const waveLbl = globalThis.i18n?.t('tide.wave', 'Wave') || 'Wave';
  const swellLbl = globalThis.i18n?.t('tide.swell', 'Swell') || 'Swell';
  const currentLbl = globalThis.i18n?.t('tide.current', 'Current') || 'Current';

  const tideStateLbl = globalThis.i18n?.t('tide.tide_state', 'Tide State') || 'Tide State';
  const moonTideTypeLbl = globalThis.i18n?.t('tide.moon_tide_type', 'Moon & Tide Type') || 'Moon & Tide Type';
  const risingLbl = globalThis.i18n?.t('tide.rising', '▲ Rising (Flood)') || '▲ Rising (Flood)';
  const fallingLbl = globalThis.i18n?.t('tide.falling', '▼ Falling (Ebb)') || '▼ Falling (Ebb)';
  const springTideLbl = globalThis.i18n?.t('tide.spring_tide', 'Spring Tide') || 'Spring Tide';
  const neapTideLbl = globalThis.i18n?.t('tide.neap_tide', 'Neap Tide') || 'Neap Tide';

  const now = new Date();
  const patDay = getPatDayData(port, now);
  const isPatAvailable = Boolean(patDay && patDay.currentHeight !== null);

  const moon = getMoonPhase(now);
  const regimeLabel = port.range >= 4.0 ? 'Macro-tidal' : port.range >= 2.0 ? 'Meso-tidal' : 'Micro-tidal';
  const tideStateHtml = isPatAvailable
    ? `<strong class="tide-direction ${patDay.isRising ? 'rising' : 'falling'}">${patDay.isRising ? risingLbl : fallingLbl}</strong>`
    : `<span class="empty" style="font-size:0.82rem;font-weight:600;">PAT data is unavailable</span>`;

  windElem.innerHTML = `
    <div class="port-telemetry-container">
      <div class="port-marine-grid">
        <div class="marine-stat-item">
          <span class="stat-prefix"><span class="stat-icon">💨</span> <span class="stat-name">${windLbl}</span> :</span>
          <strong class="stat-value">${windDisplay}</strong>
        </div>
        <div class="marine-stat-item">
          <span class="stat-prefix"><span class="stat-icon">🌊</span> <span class="stat-name">${waveLbl}</span> :</span>
          <strong class="stat-value ${waveIsHazard ? 'has-hazard' : ''}">${waveDisplay}</strong>
        </div>
        <div class="marine-stat-item">
          <span class="stat-prefix"><span class="stat-icon">🌊⏱️</span> <span class="stat-name">${swellLbl}</span> :</span>
          <strong class="stat-value ${swellIsHazard ? 'has-hazard' : ''}">${swellDisplay}</strong>
        </div>
        <div class="marine-stat-item">
          <span class="stat-prefix"><span class="stat-icon">➜</span> <span class="stat-name">${currentLbl}</span> :</span>
          <strong class="stat-value ${currentIsHazard ? 'has-hazard' : ''}">${currentDisplay}</strong>
        </div>
      </div>

      <div class="port-telemetry-divider"></div>

      <div class="port-tide-meta-grid">
        <div class="tide-meta-item">
          <span class="stat-prefix"><span class="stat-name">${tideStateLbl}</span> :</span>
          ${tideStateHtml}
        </div>
        <div class="tide-meta-item moon-tide-row">
          <span class="stat-prefix"><span class="stat-name">${moonTideTypeLbl}</span> :</span>
          <div class="moon-tide-value-wrap">
            <span class="moon-phase-name">${moon.icon} ${moon.phase}</span>
            <span class="tide-regime-pill ${moon.tideBadgeClass}">${moon.isSpringTide ? springTideLbl : neapTideLbl} · ${regimeLabel}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Main Render Function for Predicted Astronomical Tide Card
function renderPortTideCard() {
  const port = NATIONAL_TIDE_STATIONS.find(p => p.id === selectedPortId) || NATIONAL_TIDE_STATIONS[0];
  const now = new Date();

  // 1. Check for official Survey of India (SOI) / INCOIS PAT predictions
  const patDay = getPatDayData(port, now);
  const isPatAvailable = Boolean(patDay && patDay.events && patDay.events.length);

  // 2. Check Warnings
  const warning = checkPortActiveWarnings(port);

  // Update direct INCOIS PAT link in header
  const patHeaderLink = ids('portPatHeaderLink');
  const patRegionName = port.patRegion || port.name;
  const patUrl = `https://incois.gov.in/oceanservices/PAT/tidegraphphases.jsp?region=${encodeURIComponent(patRegionName)}`;
  if (patHeaderLink) {
    patHeaderLink.href = patUrl;
    patHeaderLink.title = `Open official INCOIS Predicted & Actual Tide (PAT) interactive graph for ${port.name}`;
  }

  const warningBanner = ids('portWarningBanner');
  if (warningBanner) {
    if (!isPatAvailable) {
      warningBanner.className = 'port-warning-banner level-watch';
      warningBanner.textContent = (!warning.safe && warning.text)
        ? `PAT data is unavailable · ${warning.text}`
        : 'PAT data is unavailable · Check INCOIS PAT link';
    } else {
      warningBanner.className = `port-warning-banner level-${warning.level || 'safe'}`;
      warningBanner.textContent = warning.text;
    }
  }

  // 3. Render Wind, Sea State & Moon Phase (using cached live INCOIS OSF forecast or triggering fetch)
  const cachedOsf = portLiveOsfCache[port.id];
  updatePortWindDisplay(port, cachedOsf);
  if (!cachedOsf || (Date.now() - cachedOsf.timestamp > 30 * 60 * 1000)) {
    void fetchLivePortOsf(port);
  }

  // 4. Render High / Low Tide Times Table
  const tideTimesElem = ids('portTideTimesList');
  if (tideTimesElem) {
    const highTideLbl = globalThis.i18n?.t('tide.high_tide', 'High Tide (IST)') || 'High Tide (IST)';
    const lowTideLbl = globalThis.i18n?.t('tide.low_tide', 'Low Tide (IST)') || 'Low Tide (IST)';

    if (!isPatAvailable) {
      tideTimesElem.innerHTML = `
        <div class="tide-horizontal-row high-row">
          <span class="tide-event-badge high">${highTideLbl}</span>
          <div class="tide-times-items"><span class="empty">PAT data is unavailable</span></div>
        </div>
        <div class="tide-horizontal-row low-row">
          <span class="tide-event-badge low">${lowTideLbl}</span>
          <div class="tide-times-items"><span class="empty">PAT data is unavailable</span></div>
        </div>
      `;
    } else {
      const highTides = patDay.events.filter(e => e.type === 'High');
      const lowTides = patDay.events.filter(e => e.type === 'Low');
      const formatTime = d => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });

      tideTimesElem.innerHTML = `
        <div class="tide-horizontal-row high-row">
          <span class="tide-event-badge high">${highTideLbl}</span>
          <div class="tide-times-items">
            ${highTides.length > 0 ? highTides.map(t => `<span class="tide-time-pill"><strong class="tide-time">${formatTime(t.time)}</strong> <span class="tide-height-val">${t.height}m</span></span>`).join('') : '<span class="empty">—</span>'}
          </div>
        </div>
        <div class="tide-horizontal-row low-row">
          <span class="tide-event-badge low">${lowTideLbl}</span>
          <div class="tide-times-items">
            ${lowTides.length > 0 ? lowTides.map(t => `<span class="tide-time-pill"><strong class="tide-time">${formatTime(t.time)}</strong> <span class="tide-height-val">${t.height}m</span></span>`).join('') : '<span class="empty">—</span>'}
          </div>
        </div>
      `;
    }
  }

  // 5. Render SVG Harmonic Tide Graph or Unavailable Placeholder
  const chartElem = ids('portTideChartContainer');
  if (chartElem) {
    if (!isPatAvailable || !patDay.elevations || !patDay.elevations.length) {
      chartElem.innerHTML = `
        <div class="tide-chart-placeholder" style="padding: 24px 12px; text-align: center; color: #5b7279; font-weight: 700; font-size: 0.9rem;">
          ⚠️ PAT data is unavailable · <a href="${patUrl}" target="_blank" rel="noopener" style="color:#087f84; text-decoration: underline;">View on INCOIS PAT</a>
        </div>
      `;
    } else {
      chartElem.innerHTML = renderTideChartSvg(patDay.elevations, port, now, patDay.currentHeight);
    }
  }
}

// Handle GPS "📍 Near Me" Button Click
function locateUserNearMe() {
  const gpsBtn = ids('portGpsBtn');
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }

  if (gpsBtn) {
    gpsBtn.textContent = 'Locating…';
    gpsBtn.disabled = true;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const nearest = getNearestTideStation(lat, lng);
      selectedPortId = nearest.port.id;
      userLocationData = { lat, lng, distanceKm: nearest.distanceKm };

      const select = ids('portSelectDropdown');
      if (select) select.value = selectedPortId;

      if (gpsBtn) {
        gpsBtn.textContent = `📍 Near Me (${nearest.distanceKm} km)`;
        gpsBtn.disabled = false;
        gpsBtn.classList.add('is-located');
      }

      renderPortTideCard();
    },
    error => {
      console.warn('Geolocation failed:', error.message);
      if (gpsBtn) {
        gpsBtn.textContent = '📍 Near Me';
        gpsBtn.disabled = false;
      }
      alert('Could not retrieve your location. Please check location permissions.');
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

// Initialize Port & Tide Controls
function initPortTides() {
  const select = ids('portSelectDropdown');
  if (select && select.children.length === 0) {
    // Group stations by State / UT, sorted alphabetically
    const stateGroups = {};
    for (const st of NATIONAL_TIDE_STATIONS) {
      const s = st.state;
      if (!stateGroups[s]) stateGroups[s] = [];
      stateGroups[s].push(st);
    }

    const optGroups = Object.keys(stateGroups).sort().map(state => {
      const sortedInState = stateGroups[state].slice().sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedInState.map(p => `
        <option value="${p.id}" ${p.id === selectedPortId ? 'selected' : ''} style="font-weight:700;">${p.name}</option>
      `).join('');

      return `<optgroup label="${state}">${options}</optgroup>`;
    }).join('');

    select.innerHTML = optGroups;

    select.addEventListener('change', () => {
      selectedPortId = select.value;
      renderPortTideCard();
    });
  }

  const gpsBtn = ids('portGpsBtn');
  if (gpsBtn && !gpsBtn.dataset.wired) {
    gpsBtn.dataset.wired = 'true';
    gpsBtn.addEventListener('click', locateUserNearMe);
  }

  void loadPatTidesData();
  renderPortTideCard();
}
