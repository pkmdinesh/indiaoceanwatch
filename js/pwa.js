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
    ids('openMarineHeatWave').addEventListener('click',() => {
      ids('marineHeatWaveMessage').textContent = latestStatusData?.marineHeatWave?.message || 'Marine Heat Wave message is unavailable. Open the official page for the latest information.';
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
    if (typeof initNotifications === 'function') initNotifications();
    if (typeof initPortTides === 'function') initPortTides();
    let printOpenedDetails = [];
    window.addEventListener('beforeprint',() => {
      printOpenedDetails = [...document.querySelectorAll('details:not([open])')];
      printOpenedDetails.forEach(detail => { detail.open = true; });
      if (ids('seismicDialog')?.open && seismicMap) {
        if (seismicMapMode === 'maptiler') seismicMap.resize();
        else seismicMap.invalidateSize({animate:false});
      }
    });
    window.addEventListener('afterprint',() => {
      printOpenedDetails.forEach(detail => { detail.open = false; });
      printOpenedDetails = [];
    });
    window.addEventListener('focus',()=>loadStatus().catch(()=>{}));
    window.addEventListener('online',()=>loadStatus().catch(()=>{}));
if ('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(registration=>registration.update()).catch(()=>{}));
