function renderStormSurge(message, bulletin) {
      const issuedText = String(bulletin?.issuedAt || '').trim();
      const issuedValue = /^\d{4}-\d{2}-\d{2}\s/.test(issuedText) ? `${issuedText.replace(' ','T').replace(/\.\d+$/,'')}+05:30` : issuedText;
      const issuedDate = issuedValue ? new Date(issuedValue) : null;
      const bulletinAge = issuedDate && !Number.isNaN(issuedDate.getTime()) ? Date.now() - issuedDate.getTime() : null;
      const bulletinCurrent = Boolean(bulletin) && bulletinAge !== null && bulletinAge >= 0 && bulletinAge < APP_CONFIG.AGE_HOURS.STORM_SURGE_BULLETIN * 60 * 60 * 1000;
      const supportingBulletin = bulletinCurrent ? bulletin : null;
      const safe = !bulletinCurrent;
      const status = ids('stormStatus');
      status.classList.remove('advisory-safe','advisory-info','advisory-other');
      status.classList.add(safe ? 'advisory-safe' : 'advisory-info');
      ids('stormMessage').textContent = safe ? 'No active storm surge bulletin' : supportingBulletin?.message || message || 'Official ITEWC storm surge information';
      ids('stormMark').textContent = safe ? '✓' : 'i';
      const eventParts = supportingBulletin ? [supportingBulletin.cyclone ? `Cyclone ${supportingBulletin.cyclone}` : '',supportingBulletin.issuedAt ? `Issued ${supportingBulletin.issuedAt} IST` : ''].filter(Boolean) : [];
      ids('stormCaption').textContent = safe ? 'Official ITEWC bulletin feed when checked' : eventParts.join(' · ') || 'Official storm surge advice';
      const link = ids('stormBulletin');
      const bulletinUrl = supportingBulletin?.pdfUrl || supportingBulletin?.url;
      if (!safe && bulletinUrl) {
        link.textContent = `Issued Bulletin-${supportingBulletin.number || 'Latest'} ↗`;
        link.href = bulletinUrl;
        link.classList.add('is-visible');
      } else {
        link.removeAttribute('href');
        link.classList.remove('is-visible');
      }
    }
    const JOINT_BULLETIN_PAGE_URL = 'https://www.incois.gov.in/site/services/jointbulletin.jsp';
    const JOINT_BULLETIN_PREFIX = /^INCOIS\s*[-–—]\s*IMD\s+Joint(?:\s+Special)?\s+Bulletin\s*[-–—:]?\s*(?:Ocean\s+State\s+Forecast\s+associated\s+with\s*[-–—:]?\s*)?/i;

    function compactText(value) {
      return String(value || '').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
    }

    function cleanJointBulletinMessage(value) {
      const original = compactText(value);
      if (!original) return '';
      const cleaned = original.replace(JOINT_BULLETIN_PREFIX,'').trim();
      return cleaned || original;
    }

    function absoluteIncoisUrl(value) {
      if (!value) return '';
      try {
        return new URL(value, JOINT_BULLETIN_PAGE_URL).href;
      } catch {
        return '';
      }
    }

    function normalizeJointBulletin(record) {
      if (!record || typeof record !== 'object') return null;
      const url = absoluteIncoisUrl(record.url || record.pdfUrl || record.href || record.link);
      const message = cleanJointBulletinMessage(record.message || record.title || record.description || record.text);
      const issuedAt = record.issuedAt || record.publishedAt || record.updatedAt || record.date || '';
      const isRecent = typeof record.isRecent === 'boolean' ? record.isRecent : null;
      const number = record.number || record.bulletinNumber || record.bulletinNo || 1;
      const ok = record.ok !== false;
      if (!message && !url) return null;
      return {message:message || 'Latest INCOIS-IMD joint bulletin',url,issuedAt,isRecent,number,ok};
    }

    function jointBulletinDate(record) {
      const explicitDate = record?.issuedAt ? new Date(record.issuedAt) : null;
      if (explicitDate && !Number.isNaN(explicitDate.getTime())) return explicitDate;

      const filenameTimestamp = String(record?.url || '').match(/joint_(\d{13})(?:\D|$)/i);
      if (filenameTimestamp) {
        const inferredDate = new Date(Number(filenameTimestamp[1]));
        if (!Number.isNaN(inferredDate.getTime())) return inferredDate;
      }
      return null;
    }

    function renderJointBulletin(record) {
      const bulletin = normalizeJointBulletin(record);
      const card = ids('jointBulletinCard');
      const message = ids('jointBulletinMessage');
      const time = ids('jointBulletinTime');
      const sourceLink = ids('jointBulletinLink');
      if (!card) return;

      if (!bulletin || (!bulletin.message && !bulletin.url)) {
        card.hidden = true;
        return;
      }

      const bulletinDate = jointBulletinDate(bulletin);
      const computedAge = bulletinDate ? Date.now() - bulletinDate.getTime() : Number.POSITIVE_INFINITY;
      const computedRecent = computedAge >= 0 && computedAge < APP_CONFIG.AGE_HOURS.CYCLONE_BULLETIN * 60 * 60 * 1000;
      const isRecent = Boolean(bulletinDate && computedRecent);
      const cycloneLevel = isRecent ? 'red' : 'expired';

      card.hidden = false;
      card.classList.toggle('is-recent', Boolean(isRecent));
      card.classList.toggle('is-archived', !isRecent);
      card.classList.remove('level-safe','level-yellow','level-orange','level-red','level-expired','level-info');
      card.classList.add(`level-${cycloneLevel}`);

      message.textContent = bulletin?.message || 'INCOIS-IMD Joint Special Bulletin';
      if (bulletin?.url) {
        message.href = bulletin.url;
        message.setAttribute('aria-label','Open the INCOIS-IMD joint bulletin PDF');
      } else {
        message.removeAttribute('href');
        message.removeAttribute('aria-label');
      }

      if (bulletinDate) {
        time.dateTime = bulletinDate.toISOString();
        time.textContent = `${isRecent ? `Active Bulletin (past ${APP_CONFIG.AGE_HOURS.CYCLONE_BULLETIN}h)` : 'Bulletin issued'} · ${bulletinDate.toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kolkata'})} IST`;
        time.hidden = false;
      } else {
        time.removeAttribute('datetime');
        time.textContent = '';
        time.hidden = true;
      }

      sourceLink.href = JOINT_BULLETIN_PAGE_URL;
      sourceLink.textContent = 'Joint Bulletin ↗';
      sourceLink.hidden = false;
    }

    function renderCyclone(cyclone) {
      const level = ['yellow','orange','red'].includes(cyclone?.level) ? cyclone.level : 'safe';
      const status = ids('cycloneStatus');
      status.classList.remove('level-safe','level-yellow','level-orange','level-red');
      status.classList.add(`level-${level}`);
      ids('cycloneMessageTitle').textContent = cyclone?.title || 'No active cyclone advisory';
      const message = ids('cycloneMessage');
      message.textContent = cyclone?.message || (level === 'safe' ? 'When checked IMD CAP Alerts feed.' : '');
      message.hidden = !message.textContent;
      const issued = ids('cycloneIssued');
      if (cyclone?.issuedAt) {
        const issuedDate = new Date(cyclone.issuedAt);
        issued.dateTime = cyclone.issuedAt;
        issued.textContent = `Issued ${issuedDate.toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kolkata'})} IST`;
      } else {
        issued.removeAttribute('datetime');
        issued.textContent = '';
      }
    }
