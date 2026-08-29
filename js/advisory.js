var severityOrder = ['warning','alert','watch','noThreat'];
var severityLabel = {warning:'Warning',alert:'Alert',watch:'Watch',noThreat:'No threat'};
    function legacyStateSummaries(group) {
      const names = [...new Set(severityOrder.flatMap(level => group?.[level] || []))];
      return names.map(name => {
        const levels = severityOrder.filter(level => (group[level] || []).includes(name));
        const counts = Object.fromEntries(severityOrder.map(level => [level,(group[level] || []).includes(name) ? 1 : 0]));
        return {name,highestSeverity:levels[0] || 'noThreat',counts,advisories:[]};
      });
    }
    function countSummary(counts = {}) {
      return severityOrder.filter(level => counts[level]).map(level => `${counts[level]} ${severityLabel[level]}`).join(' \u00b7 ');
    }
    function openAdvisoryDetails(hazardName, issueDate, state) {
      currentAdvisoryShareData={hazardName,issueDate,state};
      const translatedState = state.displayName || globalThis.i18n?.translateStateName(state.name) || titleCase(state.name);
      const hazardKey = String(hazardName).toLowerCase().includes('high wave') ? 'osf.high_wave' : (String(hazardName).toLowerCase().includes('swell') ? 'osf.swell_surge' : 'osf.ocean_currents');
      const translatedHazard = globalThis.i18n?.t(hazardKey, hazardName) || hazardName;
      ids('advisoryDialogTitle').textContent = `${translatedState} \u2014 ${translatedHazard}`;
      const issuedLbl = globalThis.i18n?.t('severity.issued', 'Issued') || 'Issued';
      ids('advisoryDialogMeta').textContent = `${countSummary(state.counts)}${issueDate ? ` \u00b7 ${issuedLbl} ${issueDate}` : ''}`;
      const advisories = state.advisories || [];
      if (!advisories.length) {
        const noDetailsMsg = globalThis.i18n?.t('dialog.no_district_details', 'District details will appear after the next source update.') || 'District details will appear after the next source update.';
        ids('advisoryDetails').innerHTML = `<p class="empty">${noDetailsMsg}</p>`;
      } else {
        ids('advisoryDetails').replaceChildren(...advisories.map(advisory => {
          const article = document.createElement('article');
          article.className = `district-advisory severity-${advisory.severity}`;
          const head = document.createElement('div'); head.className = 'district-advisory-head';
          const districtName = globalThis.i18n?.translateDistrictName(advisory.district) || globalThis.i18n?.translateSectorName(advisory.district) || titleCase(advisory.district || globalThis.i18n?.t('dialog.coastal_area', 'Coastal area'));
          const district = document.createElement('h3'); district.textContent = districtName;
          const pill = document.createElement('span'); pill.className = `severity-pill ${advisory.severity}`; pill.textContent = severityLabel[advisory.severity] || advisory.severity;
          head.append(district,pill);
          const rawMsg = advisory.message || globalThis.i18n?.t('dialog.open_official_map', 'Open the official map for full details.');
          const translatedMsg = globalThis.i18n?.translateAdvisoryMessage(rawMsg) || rawMsg;
          const message = document.createElement('p'); message.textContent = translatedMsg;
          article.append(head,message);
          return article;
        }));
      }
     const dialog = ids('advisoryDialog');
     dialog.scrollTop = 0;
     dialog.showModal();
    }
    function renderSeverityBoard(id, hazardName, group) {
      const el = ids(id); if (!el) return;
      const states = group?.states?.length ? group.states : legacyStateSummaries(group || {});
      if (!states.length) { el.innerHTML = '<span class="empty">No active district advisory</span>'; return; }
      el.replaceChildren(...severityOrder.map(level => {
        const row = document.createElement('div'); row.className = 'severity-row';
        const label = document.createElement('span'); label.className = `severity-row-label ${level}`;
        const dot = document.createElement('i'); dot.className = 'dot'; dot.setAttribute('aria-hidden','true');
        label.append(dot,severityLabel[level]);
        const stateList = document.createElement('div'); stateList.className = 'severity-row-states';
        if (level === 'noThreat') {
          const visualize = document.createElement('button'); visualize.type='button'; visualize.className = 'severity-state-chip noThreat';
          visualize.setAttribute('aria-label',`Visualize the ${hazardName} layer`);
          visualize.textContent = globalThis.i18n?.t('osf.visualize', 'Visualize') || 'Visualize';
          visualize.addEventListener('click',()=>openOsfMap(hazardName));
          stateList.append(visualize); row.append(label,stateList); return row;
        }
        const matchingStates = states.filter(state => Number(state.counts?.[level] || 0) > 0).sort((a,b) => a.name.localeCompare(b.name));
        if (!matchingStates.length) {
          const none = document.createElement('span');
          none.className = 'severity-state-chip severity-none-chip';
          none.textContent = globalThis.i18n?.t('announcement.none', 'None') || 'None';
          stateList.append(none);
        } else {
          stateList.append(...matchingStates.map(state => {
            const count = Number(state.counts[level]);
            const displayName = globalThis.i18n?.translateStateName(state.name) || titleCase(state.name);
            const button = document.createElement('button'); button.type = 'button'; button.className = `severity-state-chip ${level}`;
            button.setAttribute('aria-label', `View ${severityLabel[level]} ${hazardName} districts for ${displayName}`);
            button.append(document.createTextNode(displayName));
            const countBadge = document.createElement('span'); countBadge.className = 'district-count'; countBadge.textContent = ` (${count})`;
            button.append(countBadge);
            button.addEventListener('click',() => openAdvisoryDetails(hazardName,group.issueDate,{
              name:state.name,
              displayName:displayName,
              counts:{[level]:count},
              advisories:(state.advisories || []).filter(advisory => advisory.severity === level)
            }));
            return button;
          }));
        }
        row.append(label,stateList);
        return row;
      }));
    }
