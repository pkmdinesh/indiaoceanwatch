/* Ocean Watch — Small Vessel Advisory Service (SVAS) Component
   Integrates INCOIS Boat Safety Index (BSI) impact-based forecasts for small vessels.
   Displays Alert / Safe status matrix across boat width categories (<4m, <6m, <7m)
   and forecasted dates with regional language translation and GPS matching. */

(function () {
  'use strict';

  var svasData = null;
  var selectedDistrict = null;

  var BOAT_CATEGORIES = [
    { key: 'b4', width: '< 4m', id: 'small', defaultLabel: 'Small (< 4m)', desc: 'Traditional, Vallam, Catamaran, Dol Net' },
    { key: 'b6', width: '< 6m', id: 'medium', defaultLabel: 'Medium (< 6m)', desc: 'Gill Netter, Ring Seine, Hook & Line' },
    { key: 'b7', width: '< 7m', id: 'large', defaultLabel: 'Large (< 7m)', desc: 'Trawler, Purse Seiner' }
  ];

  function getLang() {
    return (globalThis.i18n && globalThis.i18n.currentLang) || 'en';
  }

  function t(key, fallback) {
    if (globalThis.i18n && typeof globalThis.i18n.t === 'function') {
      return globalThis.i18n.t(key, fallback);
    }
    return fallback;
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function loadSvasData() {
    return fetch('data/svas-status.json')
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        svasData = data;
        initSvasCard();
        // Background check for live updates from INCOIS if network available
        fetchLiveIncoisAdvisory();
      })
      .catch(function (err) {
        console.warn('[SVAS] Failed to load local SVAS data, trying direct fetch:', err);
        fetchLiveIncoisAdvisory(true);
      });
  }

  function fetchLiveIncoisAdvisory(isFallback) {
    var liveUrl = 'https://incois.gov.in/oceanservices/SVAS/SVAS_Advisory.geojson';
    fetch(liveUrl, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('Live INCOIS GeoJSON status ' + res.status);
        return res.json();
      })
      .then(function (geo) {
        if (!geo || !Array.isArray(geo.features) || !geo.features.length) return;
        var parsed = parseIncoisGeoJson(geo);
        if (parsed && Object.keys(parsed.districts).length) {
          svasData = parsed;
          initSvasCard();
        }
      })
      .catch(function (err) {
        if (isFallback) {
          console.error('[SVAS] Could not load SVAS data:', err);
          renderErrorState();
        }
      });
  }

  function parseIncoisGeoJson(geo) {
    var output = {
      issueDate: null,
      dates: [],
      districts: {}
    };

    function parseHtmlLines(html) {
      if (!html) return [];
      var days = [];
      var lines = html.split('<br>');
      lines.forEach(function (line) {
        var dateMatch = line.match(/\b(\d{2}[-/]\d{2}[-/]\d{4})\b/);
        if (dateMatch) {
          var date = dateMatch[1];
          var dayMatch = line.match(/(?:Day|நாள்|दिन|రోజు|ദിവസം|দিন|दिवस|દિવસ|ଦିନ|ದಿನ)[-\s]*(\d)/i);
          var dayNum = dayMatch ? parseInt(dayMatch[1], 10) : (days.length + 1);
          var colorMatch = line.match(/color:([^;'"]+)/i);
          var color = colorMatch ? colorMatch[1].trim().toLowerCase() : '';
          var plainText = line.replace(/<[^>]+>/g, '').replace(/&emsp;/g, ' ').replace(/\s+/g, ' ').trim();
          var isSafe = color === 'green' || plainText.toLowerCase().indexOf('safely sail') !== -1;
          var distMatch = plainText.match(/\((\d+-\d+)\)\s*(?:km)?/i);
          var distance = distMatch ? distMatch[1] + ' km' : null;

          days.push({
            day: dayNum,
            date: date,
            status: isSafe ? 'safe' : 'alert',
            distance: distance
          });
        }
      });
      return days;
    }

    geo.features.forEach(function (f) {
      var p = f.properties;
      var name = p.name;
      if (!name) return;

      if (!output.issueDate && p.ENG4) {
        var m = p.ENG4.match(/Date of issue:\s*([^\s<]+)/i);
        if (m) output.issueDate = m[1];
      }

      var b4 = parseHtmlLines(p.ENG4);
      var b6 = parseHtmlLines(p.ENG6);
      var b7 = parseHtmlLines(p.ENG7);

      if (!output.dates.length && b4.length) {
        output.dates = b4.map(function (d) { return d.date; });
      }

      output.districts[name] = {
        name: name,
        state: p.state || '',
        overall: {
          b4: p.Color4 === 'green' ? 'safe' : 'alert',
          b6: p.Color6 === 'green' ? 'safe' : 'alert',
          b7: p.Color7 === 'green' ? 'safe' : 'alert'
        },
        matrix: { b4: b4, b6: b6, b7: b7 }
      };
    });

    return output;
  }

  function initSvasCard() {
    if (!svasData || !svasData.districts) return;

    var select = document.getElementById('svasDistrictDropdown');
    if (!select) return;

    // Build grouped options by state
    var states = {};
    Object.keys(svasData.districts).forEach(function (name) {
      var item = svasData.districts[name];
      var state = item.state || 'Coastal Districts';
      if (!states[state]) states[state] = [];
      states[state].push(name);
    });

    // Save previous selection if any
    var prev = selectedDistrict || localStorage.getItem('ocean_watch_svas_district');
    var selectHtml = '';

    Object.keys(states).sort().forEach(function (state) {
      selectHtml += '<optgroup label="' + escapeHtml(state) + '">';
      states[state].sort().forEach(function (distName) {
        selectHtml += '<option value="' + escapeHtml(distName) + '">' + escapeHtml(distName) + '</option>';
      });
      selectHtml += '</optgroup>';
    });

    select.innerHTML = selectHtml;

    if (prev && svasData.districts[prev]) {
      selectedDistrict = prev;
    } else if (svasData.districts['Chennai']) {
      selectedDistrict = 'Chennai';
    } else if (svasData.districts['Kozhikode']) {
      selectedDistrict = 'Kozhikode';
    } else {
      selectedDistrict = Object.keys(svasData.districts)[0];
    }

    select.value = selectedDistrict;

    // Issue Date
    var issueDateEl = document.getElementById('svasIssueDate');
    if (issueDateEl && svasData.issueDate) {
      issueDateEl.textContent = t('osf.issue_date_prefix', 'Issue date') + ': ' + svasData.issueDate;
    }

    renderDistrict(selectedDistrict);
  }

  function renderDistrict(districtName) {
    if (!svasData || !svasData.districts || !svasData.districts[districtName]) return;
    selectedDistrict = districtName;
    try {
      localStorage.setItem('ocean_watch_svas_district', districtName);
    } catch (e) {}

    var d = svasData.districts[districtName];
    var lang = getLang();

    // 1. Render Summary Alert / Safe Banner
    var banner = document.getElementById('svasSummaryBanner');
    var bannerTitle = document.getElementById('svasBannerTitle');
    var bannerSub = document.getElementById('svasBannerSubtitle');

    var hasAlert = d.overall.b4 === 'alert' || d.overall.b6 === 'alert' || d.overall.b7 === 'alert';

    if (banner) {
      banner.className = 'svas-summary-banner ' + (hasAlert ? 'status-alert' : 'status-safe');
    }

    if (bannerTitle && bannerSub) {
      if (hasAlert) {
        bannerTitle.textContent = t('svas.banner_alert_title', '⚠️ High Overturning Risk: Sailing Restrictions in Effect');
        var affected = [];
        if (d.overall.b4 === 'alert') affected.push('< 4m');
        if (d.overall.b6 === 'alert') affected.push('< 6m');
        if (d.overall.b7 === 'alert') affected.push('< 7m');
        bannerSub.textContent = t('svas.banner_alert_sub', 'Boats with width {sizes} should not venture out into restricted coastal sectors.').replace('{sizes}', affected.join(', '));
      } else {
        bannerTitle.textContent = t('svas.banner_safe_title', '✅ Safe for All Small Vessel Categories');
        bannerSub.textContent = t('svas.banner_safe_sub', 'Favorable sea conditions predicted across the 3-day forecast window.');
      }
    }

    // 2. Set Forecast Date Column Headers
    var dates = svasData.dates || [];
    var col1 = document.getElementById('svasColDay1');
    var col2 = document.getElementById('svasColDay2');
    var col3 = document.getElementById('svasColDay3');

    if (col1) col1.innerHTML = t('svas.day1', 'Day-1') + (dates[0] ? '<small class="svas-header-date">' + dates[0] + '</small>' : '');
    if (col2) col2.innerHTML = t('svas.day2', 'Day-2') + (dates[1] ? '<small class="svas-header-date">' + dates[1] + '</small>' : '');
    if (col3) col3.innerHTML = t('svas.day3', 'Day-3') + (dates[2] ? '<small class="svas-header-date">' + dates[2] + '</small>' : '');

    // 3. Render Matrix Body
    var tbody = document.getElementById('svasMatrixBody');
    if (tbody) {
      var bodyHtml = '';
      BOAT_CATEGORIES.forEach(function (cat) {
        var days = d.matrix[cat.key] || [];
        var overallStatus = d.overall[cat.key] || 'safe';

        bodyHtml += '<tr class="svas-matrix-row ' + (overallStatus === 'alert' ? 'row-alert' : 'row-safe') + '">';
        bodyHtml += '<td class="svas-cat-cell">';
        bodyHtml += '<div class="svas-cat-name"><strong>' + escapeHtml(t('svas.' + cat.id + '_craft', cat.defaultLabel)) + '</strong>';
        bodyHtml += '<span class="svas-cat-badge ' + (overallStatus === 'alert' ? 'badge-alert' : 'badge-safe') + '">' + (overallStatus === 'alert' ? t('svas.badge_alert', 'Alert') : t('svas.badge_safe', 'Safe')) + '</span></div>';
        bodyHtml += '<div class="svas-cat-desc">' + escapeHtml(t('svas.' + cat.id + '_craft_desc', cat.desc)) + '</div>';
        bodyHtml += '</td>';

        // Render 3 day cells
        for (var i = 0; i < 3; i++) {
          var day = days[i];
          if (day) {
            var isAlert = day.status === 'alert';
            bodyHtml += '<td class="svas-status-cell ' + (isAlert ? 'cell-alert' : 'cell-safe') + '">';
            bodyHtml += '<div class="svas-cell-pill ' + (isAlert ? 'pill-alert' : 'pill-safe') + '">';
            if (isAlert) {
              bodyHtml += '<span class="svas-pill-icon">⚠️</span> <strong>' + t('svas.badge_alert', 'Alert') + '</strong>';
              if (day.distance) {
                bodyHtml += '<span class="svas-dist-badge">' + escapeHtml(day.distance) + '</span>';
              }
            } else {
              bodyHtml += '<span class="svas-pill-icon">✅</span> <strong>' + t('svas.badge_safe', 'Safe') + '</strong>';
            }
            bodyHtml += '</div>';
            bodyHtml += '</td>';
          } else {
            bodyHtml += '<td class="svas-status-cell cell-empty">—</td>';
          }
        }

        bodyHtml += '</tr>';
      });

      tbody.innerHTML = bodyHtml;
    }

    // 4. Render Localized Guidance List
    var guidanceList = document.getElementById('svasGuidanceList');
    if (guidanceList) {
      var listHtml = '';
      BOAT_CATEGORIES.forEach(function (cat) {
        var days = d.matrix[cat.key] || [];
        var overallStatus = d.overall[cat.key];

        listHtml += '<div class="svas-guidance-item ' + (overallStatus === 'alert' ? 'alert-item' : 'safe-item') + '">';
        listHtml += '<div class="svas-item-header">';
        listHtml += '<strong class="svas-item-cat">' + escapeHtml(t('svas.' + cat.id + '_craft', cat.defaultLabel)) + ' (' + cat.width + '):</strong> ';
        listHtml += '<span class="svas-item-badge ' + (overallStatus === 'alert' ? 'badge-alert' : 'badge-safe') + '">' + (overallStatus === 'alert' ? t('svas.guidance_unsafe', 'Restricted') : t('svas.guidance_safe', 'Permitted')) + '</span>';
        listHtml += '</div>';
        listHtml += '<ul class="svas-day-bullets">';

        days.forEach(function (day) {
          var text = generateLocalizedGuidance(districtName, cat.width, day, lang);
          var bulletIcon = day.status === 'alert' ? '⚠️' : '✅';
          listHtml += '<li class="' + (day.status === 'alert' ? 'bullet-alert' : 'bullet-safe') + '">';
          listHtml += '<span class="bullet-icon">' + bulletIcon + '</span> ';
          listHtml += '<strong>' + t('svas.day', 'Day') + '-' + day.day + ' (' + day.date + '):</strong> ' + escapeHtml(text);
          listHtml += '</li>';
        });

        listHtml += '</ul>';
        listHtml += '</div>';
      });

      guidanceList.innerHTML = listHtml;
    }
  }

  function generateLocalizedGuidance(district, width, day, lang) {
    var isAlert = day.status === 'alert';
    var dist = day.distance || t('svas.coastal_waters', 'coastal waters');

    // Multilingual sentence templates
    var templates = {
      en: {
        alert: district + ' district (' + dist + '), boats less than ' + width + ' wide should not sail.',
        safe: district + ' district boats less than ' + width + ' wide can safely sail.'
      },
      ta: {
        alert: district + ' மாவட்டம் (' + dist + '), ' + width + '-க்கும் குறைவான அகலமுள்ள படகு பயணிக்க பாதுகாப்பற்றவை.',
        safe: district + ' மாவட்டம், ' + width + '-க்கும் குறைவான அகலமுள்ள படகுகள் பாதுகாப்பாக செல்லலாம்.'
      },
      hi: {
        alert: district + ' ज़िला (' + dist + '), ' + width + ' से कम चौड़ी नावों के लिए समुद्र असुरक्षित है।',
        safe: district + ' ज़िला, ' + width + ' से कम चौड़ी नावें सुरक्षित रूप से नौकायन कर सकती हैं।'
      },
      te: {
        alert: district + ' జిల్లా (' + dist + '), ' + width + ' కంటే తక్కువ వెడల్పు ఉన్న పడవలు ప్రయాణించకూడదు.',
        safe: district + ' జిల్లా, ' + width + ' కంటే తక్కువ వెడల్పు ఉన్న పడవలు సురక్షితంగా ప్రయాణించవచ్చు.'
      },
      ml: {
        alert: district + ' ജില്ല (' + dist + '), ' + width + '-ൽ താഴെ വീതിയുള്ള വള്ളങ്ങൾ കടലിൽ പോകരുത്.',
        safe: district + ' ജില്ല, ' + width + '-ൽ താഴെ വീതിയുള്ള വള്ളങ്ങൾക്ക് സുരക്ഷിതമായി കടലിൽ പോകാം.'
      },
      bn: {
        alert: district + ' জেলা (' + dist + '), ' + width + ' এর চেয়ে কম চওড়া নৌকা চালানো উচিত নয়।',
        safe: district + ' জেলা, ' + width + ' এর চেয়ে কম চওড়া নৌকা নিরাপদে চলাচল করতে পারে।'
      },
      mr: {
        alert: district + ' जिल्हा (' + dist + '), ' + width + ' पेक्षा कमी रुंद बोटींनी समुद्रात जाऊ नये.',
        safe: district + ' जिल्हा, ' + width + ' पेक्षा कमी रुंद बोटी सुरक्षितपणे प्रवास करू शकतात.'
      },
      gu: {
        alert: district + ' જિલ્લો (' + dist + '), ' + width + ' કરતાં ઓછી પહોળાઈ ધરાવતી બોટોએ જવું નહીં.',
        safe: district + ' જિલ્લો, ' + width + ' કરતાં ઓછી પહોળાઈ ધરાવતી બોટો સુરક્ષિત રીતે સફર કરી શકે છે.'
      },
      or: {
        alert: district + ' ଜିଲ୍ଲା (' + dist + '), ' + width + ' ରୁ କମ୍ ମୋଟେଇ ଥିବା ଡଙ୍ଗା ଚଳାଚଳ କରିବା ଉଚିତ୍ ନୁହେଁ।',
        safe: district + ' ଜିଲ୍ଲା, ' + width + ' ରୁ କମ୍ ମୋଟେଇ ଥିବା ଡଙ୍ଗା ସୁରକ୍ଷିତ ଭାବରେ ଯାତ୍ରା କରିପାରିବେ।'
      },
      kn: {
        alert: district + ' ಜಿಲ್ಲೆ (' + dist + '), ' + width + ' ಗಿಂತ ಕಡಿಮೆ ಅಗಲದ ದೋಣಿಗಳು ಚಲಿಸಬಾರದು.',
        safe: district + ' ಜಿಲ್ಲೆ, ' + width + ' ಗಿಂತ ಕಡಿಮೆ ಅಗಲದ ದೋಣಿಗಳು ಸುರಕ್ಷಿತವಾಗಿ ಸಂಚರಿಸಬಹುದು.'
      }
    };

    var dict = templates[lang] || templates.en;
    return isAlert ? dict.alert : dict.safe;
  }

  function handleGpsLocate() {
    var gpsBtn = document.getElementById('svasGpsBtn');
    if (!navigator.geolocation) {
      alert(t('svas.gps_unsupported', 'Geolocation is not supported by your browser.'));
      return;
    }

    if (gpsBtn) {
      gpsBtn.disabled = true;
      gpsBtn.textContent = '⏳ ' + t('svas.locating', 'Locating…');
    }

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        if (gpsBtn) {
          gpsBtn.disabled = false;
          gpsBtn.textContent = '📍 ' + t('svas.near_me', 'Near Me');
        }
        findClosestDistrict(pos.coords.latitude, pos.coords.longitude);
      },
      function (err) {
        if (gpsBtn) {
          gpsBtn.disabled = false;
          gpsBtn.textContent = '📍 ' + t('svas.near_me', 'Near Me');
        }
        console.warn('[SVAS] Geolocation error:', err);
        alert(t('svas.gps_failed', 'Unable to retrieve your location. Please select a district manually.'));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  }

  function findClosestDistrict(lat, lon) {
    if (!svasData || !svasData.districts) return;

    var closestName = null;
    var minDistance = Infinity;

    Object.keys(svasData.districts).forEach(function (name) {
      var d = svasData.districts[name];
      if (d.lat && d.lon) {
        var dist = calculateDistance(lat, lon, d.lat, d.lon);
        if (dist < minDistance) {
          minDistance = dist;
          closestName = name;
        }
      }
    });

    if (closestName) {
      var select = document.getElementById('svasDistrictDropdown');
      if (select) select.value = closestName;
      renderDistrict(closestName);
    }
  }

  function renderErrorState() {
    var tbody = document.getElementById('svasMatrixBody');
    if (tbody) {
      tbody.innerHTML = '<tr><td colspan="4" class="svas-error-cell" style="text-align:center;padding:16px;color:#dc2626;">Failed to load Small Vessel Advisory Service data. Please check internet connection or try again.</td></tr>';
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function setupEvents() {
    var select = document.getElementById('svasDistrictDropdown');
    if (select) {
      select.addEventListener('change', function (e) {
        renderDistrict(e.target.value);
      });
    }

    var gpsBtn = document.getElementById('svasGpsBtn');
    if (gpsBtn) {
      gpsBtn.addEventListener('click', handleGpsLocate);
    }

    // Re-render when language changes
    globalThis.addEventListener('oceanwatch:languagechange', function () {
      if (selectedDistrict) {
        renderDistrict(selectedDistrict);
      }
    });
  }

  // Public API
  globalThis.svasService = {
    load: loadSvasData,
    render: renderDistrict,
    selectDistrict: function (name) {
      var select = document.getElementById('svasDistrictDropdown');
      if (select) select.value = name;
      renderDistrict(name);
    }
  };

  // Bootstrap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setupEvents();
      loadSvasData();
    });
  } else {
    setupEvents();
    loadSvasData();
  }
})();
