var APP_CONFIG = globalThis.OCEAN_WATCH_CONFIG;
var ids = id => document.getElementById(id);
const istDateKey = value => {
  const date=value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);
  const part=type => parts.find(item => item.type === type)?.value || '';
  return `${part('year')}-${part('month')}-${part('day')}`;
};
const productDateKey = value => {
  const text=String(value || '').trim();
  if (!text) return '';
  const numeric=text.match(/^(\d{1,2})[-\/]([01]?\d)[-\/](\d{4})$/);
  if (numeric) return `${numeric[3]}-${numeric[2].padStart(2,'0')}-${numeric[1].padStart(2,'0')}`;
  const named=text.match(/^(\d{1,2})[\s-]+([A-Za-z]{3,9})[\s-]+(\d{4})$/);
  if (named) {
    const month=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'].indexOf(named[2].slice(0,3).toLowerCase())+1;
    if (month) return `${named[3]}-${String(month).padStart(2,'0')}-${named[1].padStart(2,'0')}`;
  }
  return istDateKey(text);
};
const isCurrentIstProductDate = value => productDateKey(value) === istDateKey(new Date());
    function renderActiveAdvisories(data) {
      const card = ids('announcementCard');
      const container = ids('announcementMessage');
      const latestContainer = ids('announcementLatest');
      const active = [];
      const latest = [];
      const addActive = (service,level,detail = '',count = null) => {
        if (!['warning','alert','watch'].includes(level)) return;
        active.push({service,level,detail,count});
      };
      const addLatest = (service,label,url = '',detail = '') => {
        latest.push({service,label,url,detail});
      };
      const bulletinDate = bulletin => {
        if (!bulletin) return null;
        const issued = String(bulletin.issuedAt || '').trim();
        const issuedIso = /^\d{4}-\d{2}-\d{2}\s/.test(issued) ? `${issued.replace(' ','T').replace(/\.\d+$/,'')}+05:30` : issued;
        const compact = issued.match(/\b(\d{2})(\d{2})\s+IST\D+(\d{1,2}\s+[A-Za-z]+\s+\d{4})/i);
        const origin = `${bulletin.originDate || ''} ${String(bulletin.originTime || '').replace(/\bIST\b/i,'')}`.trim();
        const candidates = compact ? [`${compact[3]} ${compact[1]}:${compact[2]}:00 GMT+0530`,origin ? `${origin} GMT+0530` : '',issuedIso] : [origin ? `${origin} GMT+0530` : '',issuedIso];
        for (const candidate of candidates) {
          if (!candidate) continue;
          const parsed = new Date(candidate);
          if (!Number.isNaN(parsed.getTime())) return parsed;
        }
        return null;
      };
      const isWithinHours = (bulletin,hours) => {
        const issued = bulletinDate(bulletin);
        if (!issued) return false;
        const age = Date.now() - issued.getTime();
        return age >= 0 && age < hours * 60 * 60 * 1000;
      };
      const hasRecentUpdate = (values,hours) => values.some(value => {
        const date=new Date(value);
        const age=Date.now()-date.getTime();
        return !Number.isNaN(date.getTime()) && age>=0 && age<hours*60*60*1000;
      });
      const osfGroups = [data?.highWave,data?.swellSurge,data?.oceanCurrent];
      ['warning','alert','watch'].forEach(level => {
        const count = osfGroups.reduce((total,group) => total + (Array.isArray(group?.[level]) ? group[level].length : 0),0);
        if (count) addActive('OSF',level,`${count} affected state-service ${count === 1 ? 'entry' : 'entries'}`,count);
      });
      if (osfGroups.some(group => isCurrentIstProductDate(group?.issueDate))) addLatest('OSF','Updated','','Latest Ocean State Forecast update');
      if (isCurrentIstProductDate(data?.pfz?.forecastDate)) addLatest('PFZ','Updated','','Latest Potential Fishing Zone update');
      const tsunamiBulletin = data?.tsunami?.bulletin || data?.tsunami?.recentBulletin;
      const tsunamiDemo = new URLSearchParams(location.search).get('demo') === 'bulletin2';
      const tsunamiBulletinNo = tsunamiDemo ? 'II' : tsunamiBulletin?.type || tsunamiBulletin?.number || 'Latest';
      if (tsunamiDemo) addLatest('Tsunami',`Bulletin-${tsunamiBulletinNo}`,'','Demo tsunami bulletin evaluation');
      else if (tsunamiBulletin && isWithinHours(tsunamiBulletin,APP_CONFIG.AGE_HOURS.TSUNAMI_BULLETIN)) addLatest('Tsunami',`Bulletin-${tsunamiBulletinNo}`,tsunamiBulletin.pdfUrl || tsunamiBulletin.url,data?.tsunami?.message || tsunamiBulletin.message || 'Official ITEWC bulletin');
      const cycloneLevel = {red:'warning',orange:'alert',yellow:'watch'}[data?.cyclone?.level];
      addActive('Cyclone',cycloneLevel,data?.cyclone?.title || data?.cyclone?.message || 'IMD cyclone advisory');
      const jointBulletin = normalizeJointBulletin(data?.jointBulletin || data?.cyclone?.jointBulletin);
      const jointDate = jointBulletinDate(jointBulletin);
      const jointCurrent = Boolean(jointBulletin && jointDate && Date.now() - jointDate.getTime() >= 0 && Date.now() - jointDate.getTime() < APP_CONFIG.AGE_HOURS.CYCLONE_BULLETIN * 60 * 60 * 1000);
      if (jointCurrent) addLatest('Cyclone',`Bulletin-${jointBulletin.number || 1}`,jointBulletin.url,jointBulletin.message);
      const stormBulletin = data?.stormSurge?.bulletin || data?.stormSurge?.recentBulletin;
      const mhwObservedDate = data?.marineHeatWave?.observedDate || data?.marineHeatWave?.message?.match(/\b\d{4}-\d{2}-\d{2}\b/)?.[0];
      if (data?.marineHeatWave?.message && isCurrentIstProductDate(mhwObservedDate)) addLatest('MHW','Updated','','Latest Marine Heat Wave information');
      const alertCoral = data?.coralBleaching?.regions?.find(r => r.severity === 'warning' || r.severity === 'alert');
      if (alertCoral) addActive('Coral', alertCoral.severity, `${alertCoral.area}: DHW ${alertCoral.dhw}`);
      const rank = {warning:3,alert:2,watch:1};
      active.sort((a,b) => rank[b.level] - rank[a.level]);
      container.replaceChildren(...active.flatMap((item, index) => {
        const itemSpan = document.createElement('span');
        itemSpan.className = `active-advisory-item ${item.level}`;
        itemSpan.title = item.detail;
        const dot = document.createElement('i'); dot.className = `dot ${item.level}`; dot.setAttribute('aria-hidden','true');
        const sevKey = item.level === 'warning' ? 'severity.warning' : (item.level === 'alert' ? 'severity.alert' : 'severity.watch');
        const labelText = globalThis.i18n?.t(sevKey, severityLabel[item.level]) || severityLabel[item.level] || item.level;
        const label = ` ${item.service} · ${labelText}${item.count === null ? '' : ` (${item.count})`}`;
        itemSpan.append(dot, label);
        if (!index) return [itemSpan];
        const separator = document.createElement('span'); separator.className = 'announcement-separator'; separator.textContent = '|';
        return [separator, itemSpan];
      }));
      if (!active.length) {
        const none=document.createElement('span'); none.className='announcement-active-none'; none.textContent=globalThis.i18n?.t('announcement.none', 'None') || 'None'; container.replaceChildren(none);
      }
      latestContainer.replaceChildren(...latest.flatMap((item,index) => {
        const link=document.createElement(item.url ? 'a' : 'span');
        link.className='announcement-latest-link';
        link.textContent=`${item.service} \u00b7 ${item.label}`;
        link.title=item.detail;
        if (item.url) { link.href=item.url; link.target='_blank'; link.rel='noopener'; }
        if (!index) return [link];
        const separator=document.createElement('span'); separator.className='announcement-latest-separator'; separator.textContent='|';
        return [separator,link];
      }));
      card.classList.toggle('empty', active.length === 0 && latest.length === 0);
    }

var escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[char]));
globalThis.loadScript = function(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') return resolve();
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => { script.dataset.loaded = 'true'; resolve(); };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

globalThis.loadStyle = function(href) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) return resolve();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = reject;
    document.head.appendChild(link);
  });
};

globalThis.ensureLeaflet = async function() {
  if (window.L) return window.L;
  await Promise.all([
    globalThis.loadStyle('vendor/leaflet/leaflet.css'),
    globalThis.loadScript('vendor/leaflet/leaflet.js')
  ]);
  return window.L;
};
var SEISMIC_MAP_DEFAULT_ZOOM = APP_CONFIG.MAP.SEISMIC_DEFAULT_ZOOM;
    var seismicMap = null;
    var seismicEpicentreMarker = null;
    var seismicBathymetryLayer = null;
    var currentSeismicShareData = null;
    var currentAdvisoryShareData = null;
    var latestStatusData = null;
    var OSF_STATE_COORDS = {
      'ANDAMAN AND NICOBAR':[11.7,92.7],'ANDAMAN & NICOBAR':[11.7,92.7],'ANDHRA PRADESH':[15.7,80.7],
      'DAMAN AND DIU':[20.4,72.9],'DAMAN & DIU':[20.4,72.9],'GOA':[15.35,73.85],'GUJARAT':[21.1,71.5],
      'KARNATAKA':[13.0,74.75],'KERALA':[10.2,76.0],'LAKSHADWEEP':[10.6,72.65],'MAHARASHTRA':[18.4,72.9],
      'ODISHA':[20.0,86.2],'ORISSA':[20.0,86.2],'PUDUCHERRY':[11.9,79.8],'PONDICHERRY':[11.9,79.8],
      'TAMIL NADU':[10.8,79.6],'WEST BENGAL':[21.7,88.4]
    };
    var OSF_SEVERITY_COLORS = {warning:APP_CONFIG.COLORS.WARNING,alert:APP_CONFIG.COLORS.ALERT,watch:APP_CONFIG.COLORS.WATCH,noThreat:APP_CONFIG.COLORS.SAFE};
    var OSF_SERVICE_OFFSETS = {'High Wave':[.2,0],'Swell Surge':[-.1,.18],'Ocean Currents':[-.1,-.18]};
    var OSF_SEVERITY_OFFSETS = {warning:[-.045,-.045],alert:[.045,-.045],watch:[-.045,.045],noThreat:[.045,.045]};
    var OSF_POLYGON_BORDER = {color:'#263b40',weight:.7,opacity:.8};

var dashboard = document.querySelector('.dashboard');
    var advisoryDialog = ids('advisoryDialog');
    var savedZoom = 100;
    var titleCase = value => String(value).toLowerCase().replace(/\b\w/g, c => c.toUpperCase()).replace('And Nicobar','& Nicobar');
    var OCEAN_WATCH_PUBLIC_URL = APP_CONFIG.PUBLIC_URL;
    var shareCheckedText = () => {
      const value = latestStatusData?.lastAttemptAt || latestStatusData?.updatedAt;
      const date = value ? new Date(value) : null;
      return date && !Number.isNaN(date.getTime()) ? `${date.toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kolkata'})} IST` : 'Unavailable';
    };

async function initPageHitCounter() {
  const el = document.getElementById('hitCount');
  if (!el) return;
  const config = globalThis.OCEAN_WATCH_CONFIG || {};
  const BASE_OFFSET = typeof config.HIT_COUNTER_BASE_OFFSET === 'number' ? config.HIT_COUNTER_BASE_OFFSET : 727;
  const firebaseUrl = config.FIREBASE_COUNTER_URL;

  // Retrieve stored total or initialize at base offset
  let stored = parseInt(localStorage.getItem('ow_hit_total') || '0', 10);
  if (!stored || stored < BASE_OFFSET) {
    stored = BASE_OFFSET;
  }

  const isNewSession = !sessionStorage.getItem('ow_session_hit');
  if (isNewSession) {
    sessionStorage.setItem('ow_session_hit', '1');
    stored += 1;
    localStorage.setItem('ow_hit_total', String(stored));
  }

  el.textContent = stored.toLocaleString();

  // 1. Try Firebase Realtime Database REST API (Option 2)
  if (firebaseUrl) {
    try {
      if (isNewSession) {
        // Atomic increment via Firebase RTDB REST
        const res = await fetch(firebaseUrl, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ count: { '.sv': { 'increment': 1 } } })
        });
        if (res.ok) {
          const data = await res.json();
          if (typeof data?.count === 'number') {
            const finalCount = Math.max(BASE_OFFSET + data.count, stored);
            localStorage.setItem('ow_hit_total', String(finalCount));
            el.textContent = finalCount.toLocaleString();
            return;
          }
        }
      } else {
        // Read-only GET query on Firebase RTDB
        const res = await fetch(firebaseUrl, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const serverCount = typeof data === 'number' ? data : (typeof data?.count === 'number' ? data.count : 0);
          if (serverCount > 0) {
            const finalCount = Math.max(BASE_OFFSET + serverCount, stored);
            localStorage.setItem('ow_hit_total', String(finalCount));
            el.textContent = finalCount.toLocaleString();
            return;
          }
        }
      }
    } catch {
      // Fall through to fallback
    }
  }

  // 2. High-reliability fallback (VisitorBadge)
  try {
    const fbRes = await fetch('https://api.visitorbadge.io/api/visitors?path=pkmdinesh.github.io%2Findiaoceanwatch', { cache: 'no-store' });
    if (fbRes.ok) {
      const text = await fbRes.text();
      const match = text.match(/aria-label="VISITORS:\s*([\d,]+)"/i) || text.match(/<text[^>]*>([\d,]+)<\/text>/i);
      if (match && match[1]) {
        const rawHits = parseInt(match[1].replace(/,/g, ''), 10) || 0;
        const finalCount = Math.max(BASE_OFFSET + rawHits, stored);
        localStorage.setItem('ow_hit_total', String(finalCount));
        el.textContent = finalCount.toLocaleString();
      }
    }
  } catch {
    // Keep resilient local counter
  }
}
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageHitCounter);
  } else {
    initPageHitCounter();
  }
}
