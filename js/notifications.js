var NOTIFICATION_STORAGE_KEY = 'ocean_watch_notify_prefs';
var NOTIFICATION_STATE_KEY = 'ocean_watch_last_alert_state';

var defaultNotificationPrefs = {
  enabled: false,
  warnings: true,
  alerts: true,
  tsunami: true,
  cyclone: true,
  stormSurge: true
};

function getNotificationPrefs() {
  try {
    const raw = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
    return raw ? { ...defaultNotificationPrefs, ...JSON.parse(raw) } : { ...defaultNotificationPrefs };
  } catch {
    return { ...defaultNotificationPrefs };
  }
}

function saveNotificationPrefs(prefs) {
  try {
    localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(prefs));
  } catch {}
}

function hasNotificationSupport() {
  return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;
}

async function requestNotificationAccess() {
  if (!hasNotificationSupport()) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch {
    return Notification.permission;
  }
}

async function sendNativeNotification(title, options = {}) {
  if (!hasNotificationSupport() || Notification.permission !== 'granted') return;
  const defaultOptions = {
    icon: './icons/ocean-watch-v3-192.png',
    badge: './icons/ocean-watch-v3-192.png',
    vibrate: [200, 100, 200],
    data: { url: './' }
  };
  const finalOptions = { ...defaultOptions, ...options };
  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      if (reg && reg.showNotification) {
        return reg.showNotification(title, finalOptions);
      }
    }
    return new Notification(title, finalOptions);
  } catch (error) {
    console.warn('[Notifications] Show notification failed:', error);
  }
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

function extractAlertStateSignature(data) {
  if (!data) return null;
  const highWaveWarnings = (data.highWave?.states || []).filter(s => Number(s.counts?.warning || 0) > 0).map(s => s.name);
  const highWaveAlerts = (data.highWave?.states || []).filter(s => Number(s.counts?.alert || 0) > 0).map(s => s.name);
  const swellWarnings = (data.swellSurge?.states || []).filter(s => Number(s.counts?.warning || 0) > 0).map(s => s.name);
  const swellAlerts = (data.swellSurge?.states || []).filter(s => Number(s.counts?.alert || 0) > 0).map(s => s.name);
  const tsunamiThreatActive = isTsunamiThreatActive(data.tsunami);
  const cycloneLevel = ['yellow', 'orange', 'red'].includes(data.cyclone?.level) ? data.cyclone.level : 'safe';
  const jointBulletinNo = data.jointBulletin?.number || data.cyclone?.jointBulletin?.number || '';
  const stormBulletinNo = data.stormSurge?.bulletin?.number || data.stormSurge?.recentBulletin?.number || '';

  return {
    highWaveWarnings,
    highWaveAlerts,
    swellWarnings,
    swellAlerts,
    tsunamiThreatActive,
    cycloneLevel,
    jointBulletinNo,
    stormBulletinNo
  };
}

function checkAndDispatchAlerts(data) {
  const prefs = getNotificationPrefs();
  if (!prefs.enabled || Notification.permission !== 'granted' || !data) return;

  const current = extractAlertStateSignature(data);
  if (!current) return;

  let previous = null;
  try {
    const raw = localStorage.getItem(NOTIFICATION_STATE_KEY);
    if (raw) previous = JSON.parse(raw);
  } catch {}

  // Save current signature for future comparisons
  try {
    localStorage.setItem(NOTIFICATION_STATE_KEY, JSON.stringify(current));
  } catch {}

  if (!previous) return; // First snapshot, establish baseline without spamming

  // Check High Wave Warnings
  if (prefs.warnings && current.highWaveWarnings.length > 0) {
    const newStates = current.highWaveWarnings.filter(name => !previous.highWaveWarnings.includes(name));
    if (newStates.length > 0) {
      sendNativeNotification('🚨 High Wave Warning (Red)', {
        body: `Critical high wave warnings active for ${newStates.slice(0, 3).join(', ')}.`,
        tag: 'high-wave-warning',
        data: { url: './?view=osf-map' }
      });
    }
  }

  // Check Swell Surge Warnings
  if (prefs.warnings && current.swellWarnings.length > 0) {
    const newStates = current.swellWarnings.filter(name => !previous.swellWarnings.includes(name));
    if (newStates.length > 0) {
      sendNativeNotification('🚨 Swell Surge Warning (Red)', {
        body: `High swell surge warning active for ${newStates.slice(0, 3).join(', ')}.`,
        tag: 'swell-warning',
        data: { url: './?view=osf-map' }
      });
    }
  }

  // Check Tsunami Warnings
  if (prefs.tsunami && current.tsunamiThreatActive && !previous.tsunamiThreatActive) {
    sendNativeNotification('🌊 Tsunami Advisory Warning', {
      body: data.tsunami?.message || 'Official tsunami warning issued by ITEWC.',
      tag: 'tsunami-bulletin',
      data: { url: data.tsunami?.bulletin?.pdfUrl || data.tsunami?.bulletin?.url || './' }
    });
  }

  // Check Cyclone Alerts
  if (prefs.cyclone && current.cycloneLevel !== 'safe' && current.cycloneLevel !== previous.cycloneLevel) {
    sendNativeNotification('🌀 Cyclone Advisory Alert', {
      body: data.cyclone?.title || data.cyclone?.message || 'New cyclone bulletin issued by IMD/INCOIS.',
      tag: 'cyclone-alert',
      data: { url: data.jointBulletin?.url || './' }
    });
  }

  // Check Storm Surge Bulletins
  if (prefs.stormSurge && current.stormBulletinNo && current.stormBulletinNo !== previous.stormBulletinNo) {
    sendNativeNotification('🌊 Storm Surge Bulletin', {
      body: data.stormSurge?.message || 'New storm surge bulletin issued by ITEWC.',
      tag: 'storm-surge-bulletin',
      data: { url: data.stormSurge?.bulletin?.pdfUrl || data.stormSurge?.bulletin?.url || './' }
    });
  }
}

function updateNotificationUi() {
  const toggleBtn = ids('notificationToggleBtn');
  const statusIcon = ids('notificationStatusIcon');
  const statusTitle = ids('notificationStatusTitle');
  const statusDesc = ids('notificationStatusDesc');
  const headerBtn = ids('notificationHeaderBtn');
  const prefs = getNotificationPrefs();

  const isGranted = typeof Notification !== 'undefined' && Notification.permission === 'granted';
  const isDenied = typeof Notification !== 'undefined' && Notification.permission === 'denied';
  const isEnabled = prefs.enabled && isGranted;

  if (headerBtn) {
    headerBtn.classList.toggle('is-active', isEnabled);
    headerBtn.setAttribute('aria-label', isEnabled ? 'Advisory notifications enabled' : 'Configure advisory notifications');
  }

  if (toggleBtn && statusTitle && statusDesc && statusIcon) {
    if (isDenied) {
      statusIcon.textContent = '🔕';
      statusTitle.textContent = 'Notifications Blocked';
      statusDesc.textContent = 'Notifications are blocked in your browser settings. Enable them in site permissions to receive alerts.';
      toggleBtn.textContent = 'Blocked';
      toggleBtn.disabled = true;
    } else if (isEnabled) {
      statusIcon.textContent = '🔔';
      statusTitle.textContent = 'Notifications Active';
      statusDesc.textContent = 'You will receive instant native notifications when new warnings or bulletins are issued.';
      toggleBtn.textContent = 'Disable';
      toggleBtn.disabled = false;
      toggleBtn.classList.add('is-enabled');
    } else {
      statusIcon.textContent = '🔔';
      statusTitle.textContent = 'Enable Web Alerts';
      statusDesc.textContent = 'Receive instant alerts on your device when new warnings or official bulletins are issued.';
      toggleBtn.textContent = 'Enable';
      toggleBtn.disabled = false;
      toggleBtn.classList.remove('is-enabled');
    }
  }

  // Update checkbox states
  const chkWarns = ids('notifyWarnings');
  const chkAlerts = ids('notifyAlerts');
  const chkTsunami = ids('notifyTsunami');
  const chkCyclone = ids('notifyCyclone');
  const chkStorm = ids('notifyStormSurge');

  if (chkWarns) chkWarns.checked = Boolean(prefs.warnings);
  if (chkAlerts) chkAlerts.checked = Boolean(prefs.alerts);
  if (chkTsunami) chkTsunami.checked = Boolean(prefs.tsunami);
  if (chkCyclone) chkCyclone.checked = Boolean(prefs.cyclone);
  if (chkStorm) chkStorm.checked = Boolean(prefs.stormSurge);
}

function openNotificationDialog() {
  const dialog = ids('notificationDialog');
  if (!dialog) return;
  updateNotificationUi();
  dialog.showModal();
}

function initNotifications() {
  const headerBtn = ids('notificationHeaderBtn');
  if (headerBtn) {
    headerBtn.addEventListener('click', openNotificationDialog);
  }

  const toggleBtn = ids('notificationToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', async () => {
      const prefs = getNotificationPrefs();
      if (prefs.enabled) {
        prefs.enabled = false;
        saveNotificationPrefs(prefs);
        updateNotificationUi();
      } else {
        const permission = await requestNotificationAccess();
        if (permission === 'granted') {
          prefs.enabled = true;
          saveNotificationPrefs(prefs);
          updateNotificationUi();
          sendNativeNotification('🔔 Ocean Watch Alerts Enabled', {
            body: 'You will receive real-time notifications for critical coastal warnings and bulletins.',
            tag: 'ocean-watch-welcome'
          });
        } else {
          updateNotificationUi();
        }
      }
    });
  }

  // Preference checkboxes
  const bindPref = (id, key) => {
    const el = ids(id);
    if (!el) return;
    el.addEventListener('change', () => {
      const prefs = getNotificationPrefs();
      prefs[key] = el.checked;
      saveNotificationPrefs(prefs);
    });
  };

  bindPref('notifyWarnings', 'warnings');
  bindPref('notifyAlerts', 'alerts');
  bindPref('notifyTsunami', 'tsunami');
  bindPref('notifyCyclone', 'cyclone');
  bindPref('notifyStormSurge', 'stormSurge');

  const testBtn = ids('notificationTestBtn');
  if (testBtn) {
    testBtn.addEventListener('click', async () => {
      const permission = await requestNotificationAccess();
      if (permission === 'granted') {
        const prefs = getNotificationPrefs();
        prefs.enabled = true;
        saveNotificationPrefs(prefs);
        updateNotificationUi();
        sendNativeNotification('🚨 Test Alert · High Wave Warning', {
          body: 'Demo notification: Red high wave warning for Gujarat coast (3.8m–4.2m).',
          tag: 'ocean-watch-test'
        });
      } else {
        alert('Please allow notification permissions in your browser to receive alerts.');
      }
    });
  }

  updateNotificationUi();
}
