// National Tide Gauge Stations dataset with geographical coordinates, coastal district mappings, and tidal parameters
// Sourced from INCOIS TEWS (https://tsunami.incois.gov.in/TEWS/TGMap.jsp)
var NATIONAL_TIDE_STATIONS = [
  {
    "id": "adan",
    "name": "Adani",
    "lat": 21.1,
    "lng": 72.616,
    "state": "Gujarat",
    "district": "Surat / Hazira",
    "status": "Reporting",
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
    "district": "North & Middle Andaman",
    "status": "Reporting",
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
    "status": "Reporting",
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
    "status": "Reporting",
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
    "status": "Reporting",
    "range": 3.4,
    "m2Amp": 1.2,
    "s2Amp": 0.42,
    "baseWind": 15,
    "windDir": "S"
  },
  {
    "id": "chenn",
    "name": "Chennai",
    "lat": 13.1,
    "lng": 80.3,
    "state": "Tamil Nadu",
    "district": "Chennai",
    "status": "Reporting",
    "range": 1.4,
    "m2Amp": 0.48,
    "s2Amp": 0.17,
    "baseWind": 14,
    "windDir": "S"
  },
  {
    "id": "coch",
    "name": "Cochin",
    "lat": 9.9667,
    "lng": 76.2667,
    "state": "Kerala",
    "district": "Ernakulam",
    "status": "Reporting",
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
    "status": "Reporting",
    "range": 4.6,
    "m2Amp": 1.6,
    "s2Amp": 0.58,
    "baseWind": 14,
    "windDir": "WSW"
  },
  {
    "id": "dosin",
    "name": "Dosinga",
    "lat": 20.8174,
    "lng": 86.9681,
    "state": "Odisha",
    "district": "Bhadrak",
    "status": "Reporting",
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
    "district": "Tiruvallur",
    "status": "Reporting",
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
    "state": "West Bengal",
    "district": "Kolkata",
    "status": "Reporting",
    "range": 4.8,
    "m2Amp": 1.7,
    "s2Amp": 0.6,
    "baseWind": 12,
    "windDir": "S"
  },
  {
    "id": "jakh",
    "name": "Jakhau",
    "lat": 23.243,
    "lng": 68.606,
    "state": "Gujarat",
    "district": "Kachchh",
    "status": "Reporting",
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
    "status": "Reporting",
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
    "district": "Kakinada",
    "status": "Reporting",
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
    "district": "Kalpeni Island",
    "status": "Reporting",
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
    "state": "Gujarat",
    "district": "Kachchh",
    "status": "Reporting",
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
    "status": "Reporting",
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
    "status": "Reporting",
    "range": 2.1,
    "m2Amp": 0.75,
    "s2Amp": 0.25,
    "baseWind": 10,
    "windDir": "W"
  },
  {
    "id": "kris",
    "name": "Krishnapatnam",
    "lat": 14.25,
    "lng": 80.1333,
    "state": "Andhra Pradesh",
    "district": "SPS Nellore",
    "status": "Reporting",
    "range": 1.3,
    "m2Amp": 0.45,
    "s2Amp": 0.16,
    "baseWind": 13,
    "windDir": "SSE"
  },
  {
    "id": "marm",
    "name": "Marmagoa",
    "lat": 15.409,
    "lng": 73.8,
    "state": "Goa",
    "district": "South Goa",
    "status": "Reporting",
    "range": 2.3,
    "m2Amp": 0.8,
    "s2Amp": 0.28,
    "baseWind": 11,
    "windDir": "WNW"
  },
  {
    "id": "mumba",
    "name": "Mumbai",
    "lat": 18.9415,
    "lng": 72.8527,
    "state": "Maharashtra",
    "district": "Mumbai City",
    "status": "Reporting",
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
    "status": "Reporting",
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
    "status": "Reporting",
    "range": 0.9,
    "m2Amp": 0.32,
    "s2Amp": 0.11,
    "baseWind": 15,
    "windDir": "SSW"
  },
  {
    "id": "newm",
    "name": "Newmangalore",
    "lat": 12.9167,
    "lng": 74.8,
    "state": "Karnataka",
    "district": "Dakshina Kannada",
    "status": "Reporting",
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
    "status": "Reporting",
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
    "status": "Reporting",
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
    "status": "Reporting",
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
    "status": "Reporting",
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
    "district": "South Andaman",
    "status": "Reporting",
    "range": 2.2,
    "m2Amp": 0.78,
    "s2Amp": 0.26,
    "baseWind": 17,
    "windDir": "WSW"
  },
  {
    "id": "ramaya",
    "name": "Ramayapatnam",
    "lat": 15.0158,
    "lng": 80.0603,
    "state": "Andhra Pradesh",
    "district": "Prakasam",
    "status": "Reporting",
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
    "status": "Reporting",
    "range": 0.8,
    "m2Amp": 0.28,
    "s2Amp": 0.1,
    "baseWind": 20,
    "windDir": "SW"
  },
  {
    "id": "tuti",
    "name": "Tuticorin",
    "lat": 8.75,
    "lng": 78.2,
    "state": "Tamil Nadu",
    "district": "Thoothukkudi",
    "status": "Reporting",
    "range": 1.2,
    "m2Amp": 0.42,
    "s2Amp": 0.15,
    "baseWind": 19,
    "windDir": "SW"
  },
  {
    "id": "beyp",
    "name": "Beypore",
    "lat": 11.171,
    "lng": 75.808,
    "state": "Kerala",
    "district": "Kozhikode",
    "status": "Not Reporting",
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
    "district": "Nicobar",
    "status": "Not Reporting",
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
    "district": "Nicobar",
    "status": "Not Reporting",
    "range": 2,
    "m2Amp": 0.7,
    "s2Amp": 0.24,
    "baseWind": 18,
    "windDir": "WSW"
  },
  {
    "id": "chetl",
    "name": "Chetlat",
    "lat": 11.6939,
    "lng": 72.717,
    "state": "Lakshadweep",
    "district": "Chetlat Island",
    "status": "Not Reporting",
    "range": 1.4,
    "m2Amp": 0.48,
    "s2Amp": 0.17,
    "baseWind": 15,
    "windDir": "WNW"
  },
  {
    "id": "dham",
    "name": "Dhamra",
    "lat": 20.7851,
    "lng": 86.9556,
    "state": "Odisha",
    "district": "Bhadrak",
    "status": "Not Reporting",
    "range": 3.6,
    "m2Amp": 1.25,
    "s2Amp": 0.44,
    "baseWind": 15,
    "windDir": "SSW"
  },
  {
    "id": "gopa",
    "name": "Gopalpur",
    "lat": 19.2889,
    "lng": 84.9483,
    "state": "Odisha",
    "district": "Ganjam",
    "status": "Not Reporting",
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
    "district": "South Andaman",
    "status": "Not Reporting",
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
    "status": "Not Reporting",
    "range": 2.8,
    "m2Amp": 1,
    "s2Amp": 0.35,
    "baseWind": 13,
    "windDir": "NW"
  },
  {
    "id": "kava",
    "name": "Kavaratti",
    "lat": 10.5667,
    "lng": 72.6333,
    "state": "Lakshadweep",
    "district": "Kavaratti Island",
    "status": "Not Reporting",
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
    "status": "Not Reporting",
    "range": 1,
    "m2Amp": 0.35,
    "s2Amp": 0.12,
    "baseWind": 14,
    "windDir": "WSW"
  },
  {
    "id": "mach",
    "name": "Machilipatnam",
    "lat": 16.145,
    "lng": 81.178,
    "state": "Andhra Pradesh",
    "district": "Krishna",
    "status": "Not Reporting",
    "range": 1.5,
    "m2Amp": 0.52,
    "s2Amp": 0.18,
    "baseWind": 14,
    "windDir": "SE"
  },
  {
    "id": "mayab",
    "name": "Mayabunder",
    "lat": 12.9265,
    "lng": 92.8975,
    "state": "Andaman & Nicobar",
    "district": "North & Middle Andaman",
    "status": "Not Reporting",
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
    "status": "Not Reporting",
    "range": 1.2,
    "m2Amp": 0.42,
    "s2Amp": 0.15,
    "baseWind": 16,
    "windDir": "WSW"
  },
  {
    "id": "nagc",
    "name": "Nancowry",
    "lat": 8.05,
    "lng": 93.55,
    "state": "Andaman & Nicobar",
    "district": "Nicobar",
    "status": "Not Reporting",
    "range": 1.9,
    "m2Amp": 0.68,
    "s2Amp": 0.23,
    "baseWind": 18,
    "windDir": "SW"
  },
  {
    "id": "pudu",
    "name": "Puducherry",
    "lat": 11.93,
    "lng": 79.835,
    "state": "Puducherry",
    "district": "Puducherry",
    "status": "Not Reporting",
    "range": 1.3,
    "m2Amp": 0.45,
    "s2Amp": 0.16,
    "baseWind": 14,
    "windDir": "S"
  },
  {
    "id": "rang",
    "name": "Rangatbay",
    "lat": 12.4889,
    "lng": 92.9569,
    "state": "Andaman & Nicobar",
    "district": "North & Middle Andaman",
    "status": "Not Reporting",
    "range": 2.2,
    "m2Amp": 0.78,
    "s2Amp": 0.26,
    "baseWind": 16,
    "windDir": "WSW"
  },
  {
    "id": "verav",
    "name": "Veraval",
    "lat": 20.912,
    "lng": 70.408,
    "state": "Gujarat",
    "district": "Gir Somnath",
    "status": "Not Reporting",
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
    "status": "Not Reporting",
    "range": 1.8,
    "m2Amp": 0.62,
    "s2Amp": 0.22,
    "baseWind": 14,
    "windDir": "SSW"
  }
];
var MAJOR_COASTAL_PORTS = NATIONAL_TIDE_STATIONS;

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

// Find nearest station to given coordinates
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

  // 3. Detect candidate peaks and troughs using 5-point slope comparison to avoid flat-spot ripples
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
      // Same extremum type: keep the more extreme value
      if (ext.type === 'High' && ext.raw > last.raw) {
        filteredEvents[filteredEvents.length - 1] = ext;
      } else if (ext.type === 'Low' && ext.raw < last.raw) {
        filteredEvents[filteredEvents.length - 1] = ext;
      }
    } else {
      // Alternating type: enforce realistic tidal period separation (>= 2.5 hours) & significant prominence
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

// Check active warnings for station's state/district in latestStatusData
function checkPortActiveWarnings(port) {
  if (!globalThis.latestStatusData) return { safe: true, text: 'No active advisory records available' };

  const data = globalThis.latestStatusData;
  const matches = [];

  // 1. High Wave check
  (data.highWave?.states || []).forEach(st => {
    if (st.name && st.name.toLowerCase().includes(port.state.toLowerCase())) {
      if (Number(st.counts?.warning || 0) > 0) matches.push({ hazard: 'High Wave', level: 'warning', label: 'High Wave Warning (Red)' });
      else if (Number(st.counts?.alert || 0) > 0) matches.push({ hazard: 'High Wave', level: 'alert', label: 'High Wave Alert (Orange)' });
    }
  });

  // 2. Swell Surge check
  (data.swellSurge?.states || []).forEach(st => {
    if (st.name && st.name.toLowerCase().includes(port.state.toLowerCase())) {
      if (Number(st.counts?.warning || 0) > 0) matches.push({ hazard: 'Swell Surge', level: 'warning', label: 'Swell Surge Warning (Red)' });
      else if (Number(st.counts?.alert || 0) > 0) matches.push({ hazard: 'Swell Surge', level: 'alert', label: 'Swell Surge Alert (Orange)' });
    }
  });

  // 3. Cyclone check
  if (['yellow', 'orange', 'red'].includes(data.cyclone?.level)) {
    matches.push({ hazard: 'Cyclone', level: data.cyclone.level, label: `Cyclone ${data.cyclone.level.toUpperCase()}` });
  }

  // 4. Tsunami check
  if (isTsunamiThreatActive(data.tsunami)) {
    matches.push({ hazard: 'Tsunami', level: 'warning', label: 'Tsunami Warning Active' });
  }

  if (matches.length === 0) {
    if (port.status === 'Not Reporting') {
      return { safe: true, level: 'safe', text: `ℹ️ Telemetry offline for ${port.name} (${port.district}, ${port.state}) · Showing astronomical forecast` };
    }
    return { safe: true, level: 'safe', text: `✓ No active coastal warnings for ${port.name} (${port.district}, ${port.state})` };
  }

  const worst = matches.find(m => m.level === 'warning') || matches.find(m => m.level === 'alert') || matches[0];
  return {
    safe: false,
    level: worst.level,
    text: `⚠️ ${worst.label} active for ${port.name} (${port.state} Coast)`
  };
}

// Render SVG Tide Curve
function renderTideChartSvg(elevations, port, now = new Date()) {
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
  const currentHeight = calculateTideElevation(port, now);
  const nowY = getY(currentHeight).toFixed(1);

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
      ${markersSvg}
      <line x1="${nowX}" y1="${padTop}" x2="${nowX}" y2="${height - padBottom}" stroke="#082f3c" stroke-width="1.4" stroke-dasharray="2,2" />
      <circle cx="${nowX}" cy="${nowY}" r="4" fill="#082f3c" stroke="#fff" stroke-width="1.8" />
      <text x="${nowX}" y="${Math.max(10, Number(nowY) - 6)}" font-size="8.5" font-weight="900" fill="#082f3c" text-anchor="middle">NOW ${currentHeight}m</text>
    </svg>
  `;
}

// Astronomical Lunar Phase and Spring/Neap Tide Calculation
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

// Main Render Function for Wind, Tide & Port Forecast Card
function renderPortTideCard() {
  const port = NATIONAL_TIDE_STATIONS.find(p => p.id === selectedPortId) || NATIONAL_TIDE_STATIONS[0];
  const now = new Date();

  // 1. Calculate Daily Tides
  const { events, elevations } = calculateDailyTideEvents(port, now);
  const currentHeight = calculateTideElevation(port, now);
  const futureHeight = calculateTideElevation(port, new Date(now.getTime() + 15 * 60 * 1000));
  const isRising = futureHeight >= currentHeight;
  const moon = getMoonPhase(now);

  // 2. Check Warnings
  const warning = checkPortActiveWarnings(port);
  const warningBanner = ids('portWarningBanner');
  if (warningBanner) {
    warningBanner.className = `port-warning-banner level-${warning.level || 'safe'}`;
    warningBanner.textContent = warning.text;
  }

  // 3. Render Wind, Sea State & Moon Phase
  const windElem = ids('portWindDisplay');
  if (windElem) {
    const windKmh = port.baseWind;
    const windKnots = (windKmh * 0.539957).toFixed(1);
    const seaState = windKmh < 12 ? 'Calm' : windKmh < 20 ? 'Slight' : 'Moderate';
    windElem.innerHTML = `
      <div class="wind-stat-item">
        <span class="wind-stat-label">Wind &amp; Sea</span>
        <strong>${port.windDir} ${windKmh} km/h <span class="wind-knots-sea">(${windKnots} kn · ${seaState})</span></strong>
      </div>
      <div class="wind-stat-item">
        <span class="wind-stat-label">Tide State</span>
        <strong class="tide-direction ${isRising ? 'rising' : 'falling'}">${isRising ? '▲ Rising (Flood)' : '▼ Falling (Ebb)'}</strong>
      </div>
      <div class="wind-stat-item moon-stat-item">
        <span class="wind-stat-label">Moon &amp; Tide Type</span>
        <strong class="moon-tide-text" title="${moon.phase} (${moon.illumination}% lit · ${moon.tideRegime})"><span>${moon.icon} ${moon.phase}</span> <small class="tide-regime-pill ${moon.tideBadgeClass}">${moon.isSpringTide ? 'Spring Tide' : 'Neap Tide'}</small></strong>
      </div>
    `;
  }

  // 4. Render High / Low Tide Times Table (Horizontal Row Layout with IST Time Format)
  const tideTimesElem = ids('portTideTimesList');
  if (tideTimesElem) {
    const highTides = events.filter(e => e.type === 'High');
    const lowTides = events.filter(e => e.type === 'Low');

    const formatTime = d => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });

    tideTimesElem.innerHTML = `
      <div class="tide-horizontal-row high-row">
        <span class="tide-event-badge high">High Tide (IST)</span>
        <div class="tide-times-items">
          ${highTides.length > 0 ? highTides.map(t => `<span class="tide-time-pill"><strong class="tide-time">${formatTime(t.time)}</strong> <span class="tide-height-val">${t.height}m</span></span>`).join('') : '<span class="empty">—</span>'}
        </div>
      </div>
      <div class="tide-horizontal-row low-row">
        <span class="tide-event-badge low">Low Tide (IST)</span>
        <div class="tide-times-items">
          ${lowTides.length > 0 ? lowTides.map(t => `<span class="tide-time-pill"><strong class="tide-time">${formatTime(t.time)}</strong> <span class="tide-height-val">${t.height}m</span></span>`).join('') : '<span class="empty">—</span>'}
        </div>
      </div>
    `;
  }

  // 5. Render SVG Harmonic Tide Graph
  const chartElem = ids('portTideChartContainer');
  if (chartElem) {
    chartElem.innerHTML = renderTideChartSvg(elevations, port, now);
  }

  // 6. Update direct INCOIS PAT Link
  const patLink = ids('portIncoisPatLink');
  if (patLink) {
    patLink.href = `https://incois.gov.in/oceanservices/PAT/tidegraphphases.jsp?region=${encodeURIComponent(port.name)}`;
    patLink.title = `View official INCOIS Predicted & Actual Tide (PAT) graph and moon phases for ${port.name} (${port.state})`;
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
    // Group stations by State / UT, placing Reporting stations first and Not Reporting (No Data) stations last
    const stateGroups = {};
    for (const st of NATIONAL_TIDE_STATIONS) {
      const s = st.state;
      if (!stateGroups[s]) stateGroups[s] = [];
      stateGroups[s].push(st);
    }

    const optGroups = Object.keys(stateGroups).sort().map(state => {
      const sortedInState = stateGroups[state].slice().sort((a, b) => {
        const aRep = a.status === 'Reporting' ? 0 : 1;
        const bRep = b.status === 'Reporting' ? 0 : 1;
        if (aRep !== bRep) return aRep - bRep;
        return a.name.localeCompare(b.name);
      });

      const options = sortedInState.map(p => {
        const isOffline = p.status === 'Not Reporting';
        const label = isOffline ? `${p.name} (${p.district}) — No Data` : `${p.name} (${p.district})`;
        return `<option value="${p.id}" ${p.id === selectedPortId ? 'selected' : ''}>${label}</option>`;
      }).join('');

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

  renderPortTideCard();
}
