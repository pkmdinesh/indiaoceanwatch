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
      })
      .catch(function (err) {
        console.warn('[SVAS] Failed to load local SVAS data:', err);
        renderErrorState();
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
        var dayMatch = line.match(/(?:Day|நாள்|दिन|రోజు|ദിവസം|দিন|दिवस|દિવસ|ଦିନ|ದಿನ)[-\s]*([1-3])/i);
        if (!dayMatch) return;
        var dateMatch = line.match(/\b(\d{2}[-/]\d{2}[-/]\d{4})\b/);
        if (!dateMatch) return;

        var date = dateMatch[1];
        var dayNum = parseInt(dayMatch[1], 10);
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

    // 1. Render Summary Alert / Safe Banner based on Day-1 Status (Option B)
    var banner = document.getElementById('svasSummaryBanner');
    var bannerTitle = document.getElementById('svasBannerTitle');
    var bannerSub = document.getElementById('svasBannerSubtitle');

    var dates = svasData.dates || [];
    var day1_b4 = (d.matrix.b4 && d.matrix.b4[0] && d.matrix.b4[0].status === 'alert');
    var day1_b6 = (d.matrix.b6 && d.matrix.b6[0] && d.matrix.b6[0].status === 'alert');
    var day1_b7 = (d.matrix.b7 && d.matrix.b7[0] && d.matrix.b7[0].status === 'alert');
    var hasDay1Alert = day1_b4 || day1_b6 || day1_b7;

    if (banner) {
      banner.className = 'svas-summary-banner ' + (hasDay1Alert ? 'status-alert' : 'status-safe');
    }

    if (bannerTitle && bannerSub) {
      var day1Date = dates[0] ? ' (' + dates[0] + ')' : '';
      var day1Prefix = t('svas.day1', 'Day-1') + day1Date;
      if (hasDay1Alert) {
        bannerTitle.textContent = '⚠️ ' + day1Prefix + ': ' + t('svas.banner_alert_title', 'Sailing Restrictions in Effect').replace(/^⚠️\s*/, '');
        var affected = [];
        if (day1_b4) affected.push('< 4m');
        if (day1_b6) affected.push('< 6m');
        if (day1_b7) affected.push('< 7m');
        bannerSub.textContent = t('svas.banner_alert_sub', 'Boats with width {sizes} should not venture out into restricted coastal sectors.').replace('{sizes}', affected.join(', '));
      } else {
        bannerTitle.textContent = '✅ ' + day1Prefix + ': ' + t('svas.banner_safe_title', 'Safe for All Small Vessel Categories').replace(/^✅\s*/, '');
        bannerSub.textContent = t('svas.banner_safe_sub', 'Favorable sea conditions predicted across coastal waters.');
      }
    }

    // 2. Set Forecast Date Column Headers
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

        bodyHtml += '<tr class="svas-matrix-row">';
        bodyHtml += '<td class="svas-cat-cell">';
        bodyHtml += '<div class="svas-cat-name"><strong>' + escapeHtml(t('svas.' + cat.id + '_craft', cat.defaultLabel)) + '</strong></div>';
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
            } else {
              bodyHtml += '<span class="svas-pill-icon">✅</span> <strong>' + t('svas.badge_safe', 'Safe') + '</strong>';
            }
            bodyHtml += '</div>';
            if (isAlert && day.distance) {
              bodyHtml += '<span class="svas-dist-badge">' + escapeHtml(day.distance) + '</span>';
            }
            bodyHtml += '</td>';
          } else {
            bodyHtml += '<td class="svas-status-cell cell-empty">—</td>';
          }
        }
        bodyHtml += '</tr>';
      });

      tbody.innerHTML = bodyHtml;
    }
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
