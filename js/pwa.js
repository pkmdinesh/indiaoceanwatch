let deferredInstallPrompt = null;
    window.addEventListener('beforeinstallprompt',event => {
      event.preventDefault();
      deferredInstallPrompt = event;
      ids('installApp').hidden = false;
    });
    window.addEventListener('appinstalled',() => {
      deferredInstallPrompt = null;
      ids('installApp').hidden = true;
    });
    ids('installApp').addEventListener('click',async () => {
      if (!deferredInstallPrompt) { ids('installApp').hidden = true; return; }
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      ids('installApp').hidden = true;
    });
    ids('shareApp').setAttribute('aria-label','Show Ocean Watch QR code');
    ids('shareApp').querySelector('.share-label').textContent='QR';
    ids('shareApp').addEventListener('click',openShareDialog);
    ids('copyShareLink').addEventListener('click',copyShareUrl);
    ids('nativeShare').addEventListener('click',nativeShareUrl);
    ids('openOsfMap').addEventListener('click',()=>openOsfMap());
    ids('openPfzMap').addEventListener('click',openPfzMap);
    ids('shareOsfOverall').addEventListener('click',() => shareDialogText('Ocean Watch · Ocean State Forecast',osfOverallShareText(),null));
    ids('shareAdvisoryDialog').addEventListener('click',shareCurrentAdvisory);
    ids('shareSeismicDialog').addEventListener('click',shareCurrentSeismic);
    function formatMhwTitle(raw) {
      let title = String(raw || '').trim();
      title = title.replace(/^(?:the\s+)/i, '');
      title = title.replace(/\b[a-z]/g, c => c.toUpperCase());
      return title;
    }

    function parseMhwMessage(message) {
      if (!message) return [];
      const segments = String(message).split(';').map(s => s.trim()).filter(Boolean);
      return segments.map(seg => {
        const overMatch = seg.match(/over\s+(?:the\s+)?(.+?)\.?$/i);
        let title = overMatch ? formatMhwTitle(overMatch[1]) : 'Regional Observation';

        const catMatch = seg.match(/event\s+of\s+(.+?)\s+category(?:\s+with\s+area\s+of\s+spreading\s+([\d.]+%)?)?/i);
        const category = catMatch ? catMatch[1] : '';
        const spreading = catMatch && catMatch[2] ? catMatch[2] : '';

        let severity = 'watch';
        const catLower = category.toLowerCase();
        if (catLower.includes('extreme') || catLower.includes('severe') || catLower.includes('strong')) {
          severity = 'alert';
        } else if (catLower.includes('no heat wave') || catLower.includes('nil') || catLower.includes('none')) {
          severity = 'noThreat';
        } else if (catLower.includes('moderate')) {
          severity = 'watch';
        }

        return {
          title,
          category: category || 'Observed',
          spreading,
          text: seg.endsWith('.') ? seg : `${seg}.`,
          severity
        };
      });
    }

    async function renderMarineHeatWaveDialog() {
      const container = ids('marineHeatWaveCards');
      if (!container) return;

      let data = globalThis.latestStatusData || latestStatusData;
      if (!data?.marineHeatWave?.message) {
        try {
          const res = await fetch('./status.json', { cache: 'no-store' });
          if (res.ok) {
            data = await res.json();
            globalThis.latestStatusData = data;
            latestStatusData = data;
          }
        } catch { }
      }

      const rawMessage = data?.marineHeatWave?.message || '';
      if (!rawMessage) {
        container.innerHTML = '<article class="district-advisory"><p>Marine Heat Wave message is unavailable. Open the official page for the latest information.</p></article>';
        return;
      }

      const items = parseMhwMessage(rawMessage);
      if (items.length === 0) {
        container.innerHTML = `<article class="district-advisory"><p>${rawMessage}</p></article>`;
        return;
      }

      container.innerHTML = items.map(item => `
        <article class="district-advisory severity-${item.severity}">
          <div class="district-advisory-head">
            <h3>${item.title}</h3>
            <span class="severity-pill ${item.severity}">${item.category}${item.spreading ? ` · ${item.spreading}` : ''}</span>
          </div>
          <p>${item.text}</p>
        </article>
      `).join('');
    }

    ids('openMarineHeatWave').addEventListener('click', async () => {
      await renderMarineHeatWaveDialog();
      ids('marineHeatWaveDialog').showModal();
    });

loadStatus().catch(()=>{});
    window.addEventListener('pageshow',()=>loadStatus().catch(()=>{}));
    document.addEventListener('visibilitychange',()=>{ if (!document.hidden) loadStatus().catch(()=>{}); });
    function wireDialog(dialogId, closeButtonId, closeOnBackdrop = true) {
      const dialog = ids(dialogId);
      const closeButton = ids(closeButtonId);
      if (!dialog || !closeButton) return;

      closeButton.addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', event => {
        if (closeOnBackdrop && event.target === dialog) dialog.close();
      });
      dialog.addEventListener('cancel', event => {
        event.preventDefault();
        dialog.close();
      });
    }
    wireDialog('advisoryDialog','advisoryDialogClose');
    wireDialog('osfMapDialog','osfMapClose',false);
    wireDialog('pfzMapDialog','pfzMapClose',false);
    wireDialog('seismicDialog','seismicDialogClose');
    wireDialog('shareDialog','shareDialogClose');
    wireDialog('marineHeatWaveDialog','marineHeatWaveClose');
    wireDialog('notificationDialog','notificationDialogClose');
    wireDialog('voiceSummaryDialog','voiceSummaryClose');
    wireDialog('pfzCompassModal','pfzCompassClose');
    const compassDialog = ids('pfzCompassModal');
    if (compassDialog) {
      compassDialog.addEventListener('close', () => {
        if (typeof stopDeviceCompassSensors === 'function') stopDeviceCompassSensors();
      });
    }
    const scheduleIdle = window.requestIdleCallback || (cb => setTimeout(cb, 60));
    scheduleIdle(() => {
      if (typeof initPortTides === 'function') initPortTides();
      if (typeof initPfzControls === 'function') initPfzControls();
      if (typeof initNotifications === 'function') initNotifications();
      if (typeof initVoiceSummary === 'function') initVoiceSummary();
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
          .then(registration => registration.update())
          .catch(() => {});
      }
    });

    let printOpenedDetails = [];
    window.addEventListener('beforeprint',() => {
      printOpenedDetails = [...document.querySelectorAll('details:not([open])')];
      printOpenedDetails.forEach(detail => { detail.open = true; });
      if (ids('seismicDialog')?.open && seismicMap) {
        seismicMap.invalidateSize({animate:false});
      }
    });
    window.addEventListener('afterprint',() => {
      printOpenedDetails.forEach(detail => { detail.open = false; });
      printOpenedDetails = [];
    });
    window.addEventListener('focus',()=>loadStatus().catch(()=>{}));
    window.addEventListener('online',()=>loadStatus().catch(()=>{}));

