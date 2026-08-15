function renderTsunami(message, bulletin, recentBulletin = null, checkedAt = null) {
      const candidateBulletin = bulletin || recentBulletin;
      const bulletinDemo = new URLSearchParams(location.search).get('demo') === 'bulletin2';
      const bulletinTime = (() => {
        if (!candidateBulletin) return null;
        const issued = String(candidateBulletin.issuedAt || '').trim();
        const compact = issued.match(/\b(\d{2})(\d{2})\s+IST\D+(\d{1,2}\s+[A-Za-z]+\s+\d{4})/i);
        const origin = `${candidateBulletin.originDate || ''} ${String(candidateBulletin.originTime || '').replace(/\bIST\b/i,'')}`.trim();
        const values = compact ? [`${compact[3]} ${compact[1]}:${compact[2]}:00 GMT+0530`,origin ? `${origin} GMT+0530` : ''] : [origin ? `${origin} GMT+0530` : '',issued];
        for (const value of values) {
          if (!value) continue;
          const parsed = new Date(value);
          if (!Number.isNaN(parsed.getTime())) return parsed;
        }
        return null;
      })();
      const bulletinAge = bulletinTime ? Date.now() - bulletinTime.getTime() : null;
      const bulletinCurrent = Boolean(candidateBulletin) && (bulletinDemo || bulletinAge === null || (bulletinAge >= 0 && bulletinAge < APP_CONFIG.AGE_HOURS.TSUNAMI_BULLETIN * 60 * 60 * 1000));
      const supportingBulletin = bulletinCurrent ? candidateBulletin : null;
      const noTsunami = (Boolean(candidateBulletin) && !bulletinCurrent) || (!candidateBulletin && /^no\s+tsunami(?:\s+threat\s+reported\s+by\s+itewc)?\.?$/i.test(String(message || '').trim()));
      const bulletinLabel = supportingBulletin?.type || supportingBulletin?.number || 'Latest';
      const status = ids('tsunamiStatus');
      status.classList.remove('advisory-safe','advisory-info','advisory-other','advisory-bulletin','advisory-warning','advisory-alert','advisory-watch');
      status.classList.add(noTsunami ? 'advisory-safe' : 'advisory-info');
      const messageLink = ids('tsunamiMessage');
      messageLink.textContent = noTsunami ? 'No Tsunami threat reported by ITEWC' : supportingBulletin?.message || message || 'Official ITEWC bulletin information';
      ids('tsunamiMark').textContent = noTsunami ? '✓' : 'i';
      const eventParts = supportingBulletin ? [supportingBulletin.magnitude ? `M${supportingBulletin.magnitude}` : '',supportingBulletin.location || '',[supportingBulletin.originDate,supportingBulletin.originTime].filter(Boolean).join(' ')].filter(Boolean) : [];
      const checkedText = checkedAt && !Number.isNaN(checkedAt.getTime()) ? checkedAt.toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kolkata'}) : '—';
      ids('tsunamiCaption').textContent = noTsunami ? `Last Checked ${checkedText}${checkedText === '—' ? '' : ' IST'}` : eventParts.length ? `Bulletin-${bulletinLabel} evaluation · Event: ${eventParts.join(' · ')}` : `Official ITEWC Bulletin-${bulletinLabel} evaluation`;
      const link = ids('tsunamiBulletin');
      if (supportingBulletin?.url) {
        link.textContent = `Issued Bulletin-${bulletinLabel} ↗`;
        link.href = supportingBulletin.url;
        link.classList.add('is-visible');
      } else {
        link.removeAttribute('href');
        link.classList.remove('is-visible');
      }
    }
