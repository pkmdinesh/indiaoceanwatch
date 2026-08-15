const cleanShareUrl = () => `${location.origin}${location.pathname}`;
    let shareQrRenderedFor = '';
    function renderShareQr(url) {
      const container = ids('shareQr');
      if (!container) return;
      if (shareQrRenderedFor === url && container.querySelector('canvas,img')) return;
      container.replaceChildren();
      if (typeof QRCode === 'undefined') {
        const error = document.createElement('p');
        error.className = 'share-qr-error';
        error.textContent = 'QR code could not be loaded. Use Copy link or Share below.';
        container.append(error);
        shareQrRenderedFor = '';
        return;
      }
      try {
        new QRCode(container,{text:url,width:200,height:200,correctLevel:QRCode.CorrectLevel.M});
        shareQrRenderedFor = url;
      } catch (error) {
        console.warn('QR code generation failed:',error);
        container.replaceChildren();
        const message = document.createElement('p');
        message.className = 'share-qr-error';
        message.textContent = 'QR code could not be generated. Use Copy link or Share below.';
        container.append(message);
        shareQrRenderedFor = '';
      }
    }
    function openShareDialog() {
      const url = cleanShareUrl();
      ids('shareUrl').textContent = url;
      ids('shareCopyStatus').textContent = '';
      ids('nativeShare').hidden = !('share' in navigator);
       // 1. Open the modal
  ids('shareDialog').showModal();
  
  // 2. Fall completely out of the paint-loop block
  setTimeout(() => {
    renderShareQr(url);
  }, 30); // 30ms forces Chrome to finish painting the native modal layout
    }
    async function copyShareUrl() {
      const url = cleanShareUrl();
      try {
        await navigator.clipboard.writeText(url);
        ids('shareCopyStatus').textContent = 'Link copied';
      } catch {
        const input = document.createElement('textarea');
        input.value = url;
        input.setAttribute('readonly','');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.append(input);
        input.select();
        document.execCommand('copy');
        input.remove();
        ids('shareCopyStatus').textContent = 'Link copied';
      }
    }
    async function nativeShareUrl() {
      if (!navigator.share) return;
      try {
        await navigator.share({title:'Ocean Watch',text:'Coastal Advisory Status',url:cleanShareUrl()});
      } catch (error) {
        if (error?.name !== 'AbortError') ids('shareCopyStatus').textContent = 'Unable to open share options';
      }
    }

async function shareDialogText(title,text,url=OCEAN_WATCH_PUBLIC_URL) {
      try {
        const shareData={title,text}; if (url) shareData.url=url;
        const shareText=url ? `${text}\nOcean Watch: ${url}` : text;
        if (navigator.share) await navigator.share(shareData);
        else await navigator.clipboard.writeText(shareText);
      } catch (error) {
        if (error?.name !== 'AbortError') {
          const input=document.createElement('textarea'); input.value=url ? `${text}\nOcean Watch: ${url}` : text; input.style.position='fixed'; input.style.opacity='0'; document.body.append(input); input.select(); document.execCommand('copy'); input.remove();
        }
      }
    }
    function osfOverallShareText(serviceFilter=null) {
      const services=[['High Wave',latestStatusData?.highWave],['Swell Surge',latestStatusData?.swellSurge],['Ocean Currents',latestStatusData?.oceanCurrent]].filter(([name]) => !serviceFilter || serviceFilter.includes(name));
      const blocks=services.map(([name,group]) => {
        const states=group?.states?.length ? group.states : legacyStateSummaries(group || {});
        const counts=Object.fromEntries(severityOrder.map(level => [level,states.reduce((sum,state) => sum + Number(state.counts?.[level] || 0),0)]));
        const heading=`${name} — ${severityOrder.map(level => `${severityLabel[level]} ${counts[level]}`).join(' · ')}`;
        const lists=severityOrder.filter(level => counts[level]).map(level => {
          const stateCounts=states
            .filter(state => Number(state.counts?.[level] || 0)>0)
            .map(state => `${titleCase(state.name)} (${Number(state.counts[level])})`)
            .join(', ');
          return `• ${severityLabel[level]}: ${stateCounts}`;
        });
        return [heading,...lists,`Valid/issued: ${group?.issueDate || 'Unavailable'}`].join('\n');
      });
      const heading=serviceFilter ? `OSF map selection — ${services.map(([name]) => name).join(' + ')}` : 'OSF — Overall summary';
      return [heading,...blocks,'Source: INCOIS',`Checked: ${shareCheckedText()}`].join('\n\n');
    }
    function shareCurrentAdvisory() {
      if (!currentAdvisoryShareData) return;
      const {hazardName,issueDate,state}=currentAdvisoryShareData;
      const highest=severityOrder.find(level => Number(state.counts?.[level] || 0)>0) || 'noThreat';
      const districts=[...new Set((state.advisories || []).map(item => titleCase(item.district)).filter(Boolean))];
      const text=[`OSF — ${hazardName} ${severityLabel[highest]}`,titleCase(state.name),districts.join(' · ') || 'District details unavailable',`Valid/issued: ${issueDate || 'Unavailable'}`,'Source: INCOIS',`Checked: ${shareCheckedText()}`].join('\n');
      void shareDialogText(`OSF — ${hazardName} ${severityLabel[highest]}`,text,null);
    }
    function shareCurrentSeismic() {
      if (!currentSeismicShareData) return;
      const item=currentSeismicShareData;
      const text=[`Earthquake bulletin — M${item.magnitude}`,item.location,item.origin ? `Origin: ${item.origin}` : '',item.coordinates ? `Location: ${item.coordinates}` : '',item.coastDistance ? `Distance from nearest coast: ${item.coastDistance}` : '',item.bulletin ? `Bulletin: ${item.bulletin}` : '',item.evaluation || '','Source: ITEWC–INCOIS',`Checked: ${shareCheckedText()}`].filter(Boolean).join('\n');
      void shareDialogText(`Earthquake bulletin — M${item.magnitude}`,text,null);
    }
