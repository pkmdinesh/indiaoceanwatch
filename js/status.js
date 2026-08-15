function render(data) {
      latestStatusData = data;
      renderActiveAdvisories(data);
      const checkedAtValue = data.lastAttemptAt || data.updatedAt;
      const checkedAt = checkedAtValue ? new Date(checkedAtValue) : null;
      if (checkedAt && !Number.isNaN(checkedAt.getTime())) {
        ids('lastUpdated').dateTime = checkedAtValue;
        ids('lastUpdated').textContent = `${checkedAt.toLocaleString('en-IN',{dateStyle:'long',timeStyle:'short',timeZone:'Asia/Kolkata'})} IST`;
      } else {
        ids('lastUpdated').removeAttribute('datetime');
        ids('lastUpdated').textContent = 'No source check available';
      }
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
      const originText = data.seismic.latest?.ORIGINTIME;
      const originTime = originText ? new Date(`${String(originText).replace(' ','T')}+05:30`) : null;
      const seismicAge = originTime && !Number.isNaN(originTime.getTime()) ? Date.now() - originTime.getTime() : Number.POSITIVE_INFINITY;
      const isRecentSeismic = demoMode === 'recent' || (seismicAge >= 0 && seismicAge <= 24 * 60 * 60 * 1000);
      const demoBulletin = demoMode === 'bulletin2' ? bulletinTwoDemo : null;
      const relatedBulletin = isRecentSeismic ? data.tsunami.recentBulletin : null;
      renderTsunami(demoBulletin?.message || data.tsunami.message,demoBulletin || data.tsunami.bulletin,relatedBulletin,checkedAt);
      const latestSeismicLink = ids('seismicMessage');
      latestSeismicLink.textContent = data.seismic.latest ? seismicSummary(data.seismic.latest) : data.seismic.message;
      latestSeismicLink.disabled = !data.seismic.latest;
      latestSeismicLink.onclick = data.seismic.latest ? () => openSeismicDetails(data.seismic.latest,data.tsunami.recentBulletin) : null;
      ids('seismicMessageWrap').classList.toggle('is-recent',isRecentSeismic);
      ids('seismicMessageWrap').classList.toggle('is-older',Boolean(data.seismic.latest) && !isRecentSeismic);
      ids('seismicAdditional').replaceChildren(...(data.seismic.recentEvents || []).map(event => {
        const item = document.createElement('button'); item.type = 'button'; item.className = 'seismic-event-link';
        item.textContent = seismicSummary(event);
        item.addEventListener('click',() => openSeismicDetails(event,event.bulletin));
        return item;
      }));
      const stormDemoBulletin = demoMode === 'storm' ? data.stormSurge.recentBulletin : null;
      renderStormSurge(stormDemoBulletin?.message || data.stormSurge.message,stormDemoBulletin || data.stormSurge.bulletin);
      ids('highWaveIssueDate').textContent = `Issue date ${data.highWave.issueDate || '—'}`;
      ids('swellIssueDate').textContent = `Issue date ${data.swellSurge.issueDate || '—'}`;
      renderSeverityBoard('highWaveStates','High Wave',data.highWave);
      renderSeverityBoard('swellStates','Swell Surge',data.swellSurge);
      ids('currentIssueDate').textContent = `Issue date ${data.oceanCurrent?.issueDate || '—'}`;
      renderSeverityBoard('currentStates','Ocean Currents',data.oceanCurrent || {});
      ids('pfzDate').textContent = `Forecast ${data.pfz.forecastDate || '—'} · Valid through ${data.pfz.validUntil || '—'}`;
      renderPfzSectors(data.pfz.sectors);
      renderCyclone(data.cyclone);
      renderJointBulletin(data?.jointBulletin || data?.cyclone?.jointBulletin);
      if (new URLSearchParams(location.search).get('view') === 'osf-map' && !osfMapOpenedFromUrl) { osfMapOpenedFromUrl=true; openOsfMap(); }
    }
    let statusRefreshTimer;
    let statusLoadPromise;
    function scheduleStatusRefresh(data, retryDelay = 0) {
      clearTimeout(statusRefreshTimer);
      const intervalMs = Math.max(60000,Number(data?.updateIntervalHours || 0.25) * 3600000);
      const baseTime = new Date(data?.updatedAt || data?.lastAttemptAt || Date.now()).getTime();
      const now = Date.now();
      const nextUpdate = Number.isFinite(baseTime)
        ? baseTime + (Math.floor(Math.max(0,now - baseTime) / intervalMs) + 1) * intervalMs
        : now + intervalMs;
      const delay = retryDelay || Math.max(1000,nextUpdate - now + 5000);
      const previousUpdate = data?.updatedAt;
      statusRefreshTimer = setTimeout(async () => {
        try {
          const fresh = await loadStatus();
          if (previousUpdate && fresh?.updatedAt === previousUpdate) scheduleStatusRefresh(fresh,60000);
        } catch { scheduleStatusRefresh(data,60000); }
      },delay);
    }
    async function loadStatus(url='status.json') {
      if (statusLoadPromise) return statusLoadPromise;
      statusLoadPromise = (async () => {
        const separator = url.includes('?') ? '&' : '?';
        const response = await fetch(`${url}${separator}t=${Date.now()}`,{cache:'no-store'});
        if (!response.ok) throw new Error(`Status unavailable (${response.status})`);
        const data = await response.json();
        render(data);
        scheduleStatusRefresh(data);
        return data;
      })();
      try { return await statusLoadPromise; }
      finally { statusLoadPromise = null; }
    }
