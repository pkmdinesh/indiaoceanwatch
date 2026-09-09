function updateLastCheckedDisplay(data) {
  const lastUpdatedEl = ids('lastUpdated');
  if (!lastUpdatedEl) return;
  const checkTime = globalThis.lastStatusCheckTime || (data?.lastAttemptAt || data?.updatedAt ? new Date(data.lastAttemptAt || data.updatedAt) : new Date());
  const sourceTime = data?.updatedAt || data?.lastAttemptAt;
  const sourceDate = sourceTime ? new Date(sourceTime) : null;

  if (checkTime && !Number.isNaN(checkTime.getTime())) {
    lastUpdatedEl.dateTime = checkTime.toISOString();
    lastUpdatedEl.textContent = `${checkTime.toLocaleString('en-IN',{dateStyle:'long',timeStyle:'short',timeZone:'Asia/Kolkata'})} IST`;
  } else {
    lastUpdatedEl.removeAttribute('datetime');
    lastUpdatedEl.textContent = 'No source check available';
  }

  if (sourceDate && !Number.isNaN(sourceDate.getTime())) {
    lastUpdatedEl.title = `Official bulletin: ${sourceDate.toLocaleString('en-IN',{dateStyle:'long',timeStyle:'short',timeZone:'Asia/Kolkata'})} IST · Advisories verified live`;
  } else {
    lastUpdatedEl.title = 'Advisories verified live with INCOIS official sources';
  }
}

function updateFooterDot(isRecentDeploy) {
  const footerDot = ids('footerUpdateDot');
  if (!footerDot) return;
  if (isRecentDeploy) {
    footerDot.className = 'update-status-dot dot-orange';
    footerDot.title = 'Data changes committed & deployed to Ocean Watch';
  } else {
    footerDot.className = 'update-status-dot dot-green';
    footerDot.title = '15-minute check routine · Advisories current';
  }
}

function render(data) {
  globalThis.latestStatusData = data;
  latestStatusData = data;

  // Phase 1: Critical top viewport card (Header, Tsunami & Active Bulletins)
  renderActiveAdvisories(data);
  updateLastCheckedDisplay(data);

  // Footer Update Dot: green for routine, orange if fresh data deployment
  const isRecentDeploy = Boolean(data?.dataChanged || (data?.lastDataChangeAt && Math.abs(Date.now() - new Date(data.lastDataChangeAt).getTime()) < 2 * 3600 * 1000));
  updateFooterDot(isRecentDeploy);

  const demoMode = new URLSearchParams(location.search).get('demo');
  const bulletinTwoDemo = {
    type: 'II',
    number: 2,
    magnitude: '6.7',
    location: 'Kyushu, Japan',
    originDate: '28 Jul 2026',
    originTime: '1257 IST',
    message: 'Based on the model results there is possibility of Tsunami. ITEWC INCOIS will monitor sea level changes near epicentral region and report in case of tsunami threat.',
    url: '#demo-bulletin-ii'
  };
  const originText = data.seismic?.latest?.ORIGINTIME;
  const originTime = originText ? new Date(`${String(originText).replace(' ','T')}+05:30`) : null;
  const seismicAge = originTime && !Number.isNaN(originTime.getTime()) ? Date.now() - originTime.getTime() : Number.POSITIVE_INFINITY;
  const isRecentSeismic = demoMode === 'recent' || (seismicAge >= 0 && seismicAge <= APP_CONFIG.AGE_HOURS.SEISMIC_RECENT * 60 * 60 * 1000);
  const demoBulletin = demoMode === 'bulletin2' ? bulletinTwoDemo : null;
  const relatedBulletin = isRecentSeismic ? data.tsunami.recentBulletin : null;
  renderTsunami(demoBulletin?.message || data.tsunami.message,demoBulletin || data.tsunami.bulletin,relatedBulletin,checkedAt);

  // Phase 2: High Wave & Swell Surge Severity boards (Yielded to animation frame)
  requestAnimationFrame(() => {
    const issuedLbl = globalThis.i18n?.t('severity.issued', 'Issue date') || 'Issue date';
    ids('highWaveIssueDate').textContent = `${issuedLbl} ${data.highWave?.issueDate || '—'}`;
    ids('swellIssueDate').textContent = `${issuedLbl} ${data.swellSurge?.issueDate || '—'}`;
    renderSeverityBoard('highWaveStates','High Wave',data.highWave);
    renderSeverityBoard('swellStates','Swell Surge',data.swellSurge);

    // Phase 3: Secondary cards (Seismic, Storm Surge, Cyclone, PFZ, Port Tides)
    setTimeout(() => {
      ids('currentIssueDate').textContent = `${issuedLbl} ${data.oceanCurrent?.issueDate || '—'}`;
      renderSeverityBoard('currentStates','Ocean Currents',data.oceanCurrent || {});

      const latestSeismicLink = ids('seismicMessage');
      latestSeismicLink.textContent = data.seismic?.latest ? seismicSummary(data.seismic.latest) : (data.seismic?.message || globalThis.i18n?.t('seismic.safe', 'No recent significant coastal earthquakes (M≥5.0).'));
      latestSeismicLink.disabled = !data.seismic?.latest;
      latestSeismicLink.onclick = data.seismic?.latest ? () => openSeismicDetails(data.seismic.latest,data.tsunami.recentBulletin) : null;
      ids('seismicMessageWrap').classList.toggle('is-recent',isRecentSeismic);
      ids('seismicMessageWrap').classList.toggle('is-older',Boolean(data.seismic?.latest) && !isRecentSeismic);
      ids('seismicAdditional').replaceChildren(...(data.seismic?.recentEvents || []).map(event => {
        const item = document.createElement('button'); item.type = 'button'; item.className = 'seismic-event-link';
        item.textContent = seismicSummary(event);
        item.addEventListener('click',() => openSeismicDetails(event,event.bulletin));
        return item;
      }));

      const stormDemoBulletin = demoMode === 'storm' ? data.stormSurge.recentBulletin : null;
      renderStormSurge(stormDemoBulletin?.message || data.stormSurge.message,stormDemoBulletin || data.stormSurge.bulletin);

      const fcLbl = globalThis.i18n?.t('pfz.forecast_date', 'Forecast') || 'Forecast';
      const vtLbl = globalThis.i18n?.t('pfz.valid_through', 'Valid through') || 'Valid through';
      ids('pfzDate').textContent = `${fcLbl} ${data.pfz?.forecastDate || '—'} · ${vtLbl} ${data.pfz?.validUntil || '—'}`;
      renderPfzSectors(data.pfz?.sectors);
      renderCyclone(data.cyclone);
      renderJointBulletin(data?.jointBulletin || data?.cyclone?.jointBulletin);

      if (typeof renderPortTideCard === 'function') renderPortTideCard();
      if (typeof checkAndDispatchAlerts === 'function') checkAndDispatchAlerts(data);

      const abisEl = ids('abisRunDate');
      if (abisEl && data?.abis?.lastUpdated) {
        const lbl = globalThis.i18n?.t('abis.latest_run', 'Last Updated:') || 'Last Updated:';
        abisEl.innerHTML = `<span data-i18n="abis.latest_run">${lbl}</span> ${data.abis.lastUpdated}`;
      }

      if (new URLSearchParams(location.search).get('print') === 'earthquake' && data.seismic?.latest && !ids('seismicDialog').open) {
        openSeismicDetails(data.seismic.latest,data.tsunami.recentBulletin);
      }
      if (new URLSearchParams(location.search).get('view') === 'osf-map' && !osfMapOpenedFromUrl) { osfMapOpenedFromUrl=true; openOsfMap(); }
      if (new URLSearchParams(location.search).get('view') === 'pfz-map' && !pfzMapOpenedFromUrl) { pfzMapOpenedFromUrl=true; openPfzMap(); }
    }, 0);
  });
}
    let statusRefreshTimer;
    let statusLoadPromise;
    function scheduleStatusRefresh(data) {
      clearTimeout(statusRefreshTimer);
      const intervalMs = Math.max(60000, Number(data?.updateIntervalHours || 0.25) * 3600000);
      const previousUpdate = data?.updatedAt;
      statusRefreshTimer = setTimeout(async () => {
        try {
          const fresh = await loadStatus();
          const hasFreshDeploy = Boolean(previousUpdate && fresh?.updatedAt !== previousUpdate);
          if (hasFreshDeploy) {
            updateFooterDot(true);
          }
        } catch (err) {
          console.warn('Status refresh retry:', err);
          statusRefreshTimer = setTimeout(() => scheduleStatusRefresh(data), 60000);
        }
      }, intervalMs);
    }
    async function loadStatus(url='status.json') {
      if (statusLoadPromise) return statusLoadPromise;
      statusLoadPromise = (async () => {
        const separator = url.includes('?') ? '&' : '?';
        const response = await fetch(`${url}${separator}t=${Date.now()}`,{cache:'no-store'});
        if (!response.ok) throw new Error(`Status unavailable (${response.status})`);
        const data = await response.json();
        globalThis.lastStatusCheckTime = new Date();
        render(data);
        scheduleStatusRefresh(data);
        return data;
      })();
      try { return await statusLoadPromise; }
      finally { statusLoadPromise = null; }
    }
