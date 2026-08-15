const PFZ_SECTOR_NAMES = ['Gujarat','Maharashtra','Goa','Karnataka','Kerala','South Tamil Nadu','North Tamil Nadu','South Andhra Pradesh','North Andhra Pradesh','Odisha','West Bengal','Andaman','Nicobar','Lakshadweep'];
    function renderPfzSectors(values) {
      const el = ids('pfzStates');
      ids('pfzDetails').hidden = true;
      const received = (values || []).map(value => typeof value === 'string' ? {name:value,landingCenters:[]} : value);
      const byName = new Map(received.map(sector => [String(sector.name || '').toLowerCase(),sector]));
      const sectors = PFZ_SECTOR_NAMES.map(name => byName.get(name.toLowerCase()) || {
        name,
        hasForecast:false,
        landingCenters:[],
        message:'No forecast is available for this sector in the latest fetched PFZ data.'
      });
      const knownNames = new Set(PFZ_SECTOR_NAMES.map(name => name.toLowerCase()));
      sectors.push(...received.filter(sector => !knownNames.has(String(sector.name || '').toLowerCase())));
      sectors.sort((a,b) => {
        const aHasForecast = a.hasForecast !== false && Boolean(a.landingCenters?.length);
        const bHasForecast = b.hasForecast !== false && Boolean(b.landingCenters?.length);
        return Number(bHasForecast) - Number(aHasForecast);
      });
      el.replaceChildren(...sectors.map(value => {
        const sector = typeof value === 'string' ? {name:value,landingCenters:[]} : value;
        const hasForecast = sector.hasForecast !== false && Boolean(sector.landingCenters?.length);
        const chip = document.createElement('button');
        chip.type = 'button'; chip.className = `tag pfz-chip${hasForecast ? '' : ' no-forecast'}`; chip.setAttribute('aria-expanded','false');
        chip.textContent = `${titleCase(sector.name)}(${sector.landingCenters?.length || 0})`;
        chip.addEventListener('click',() => {
          el.querySelectorAll('.pfz-chip').forEach(item => item.setAttribute('aria-expanded',String(item === chip)));
          renderPfzLandingCenters(sector);
        });
        return chip;
      }));
    }
    function renderPfzLandingCenters(sector) {
      const details = ids('pfzDetails');
      const centers = sector.landingCenters || [];
      const detailsTitle = ids('pfzDetailsTitle');
      const inlineMessage = ids('pfzInlineMessage');
      detailsTitle.textContent = centers.length ? `${titleCase(sector.name)} landing centers` : '';
      detailsTitle.hidden = !centers.length;
      inlineMessage.textContent = centers.length ? '' : `${titleCase(sector.name)} — ${sector.message || 'No forecast is available for this sector in the latest fetched PFZ data.'}`;
      inlineMessage.hidden = Boolean(centers.length);
      ids('pfzMessages').replaceChildren();
      ids('pfzLandingCenters').replaceChildren(...centers.map(center => {
        const chip = document.createElement('button');
        const messageCount = center.messages?.length || 0;
        chip.type = 'button'; chip.className = 'tag landing-chip';
        chip.textContent = `${titleCase(center.name)}${messageCount > 1 ? `(${messageCount})` : ''}`;
        chip.setAttribute('aria-expanded','false');
        chip.addEventListener('click',() => {
          ids('pfzLandingCenters').querySelectorAll('.landing-chip').forEach(item => item.setAttribute('aria-expanded',String(item === chip)));
          renderPfzMessages(center);
        });
        return chip;
      }));
      if (!centers.length) {
        ids('pfzLandingCenters').replaceChildren();
      }
      details.hidden = false;
    }
    function renderPfzMessages(center) {
      const labels = {direction:'Direction',bearing:'Bearing (deg)',distance:'Distance (km)',depth:'Depth (mtr)',latitude:'Latitude (dms)',longitude:'Longitude (dms)'};
      ids('pfzMessages').replaceChildren(...(center.messages || []).map((message,index) => {
        const panel = document.createElement('details'); panel.className = 'pfz-message'; panel.open = true;
        const summary = document.createElement('summary'); summary.textContent = `Landing Center: ${titleCase(center.name)}${center.messages.length > 1 ? ` — Message ${index + 1}` : ''}`;
        const grid = document.createElement('div'); grid.className = 'pfz-message-grid';
        grid.replaceChildren(...Object.entries(labels).map(([key,label]) => {
          const field = document.createElement('div'); field.className = 'pfz-message-field';
          const heading = document.createElement('strong'); heading.textContent = label;
          const value = document.createElement('span'); value.textContent = message[key] || '—';
          field.append(heading,value); return field;
        }));
        panel.append(summary,grid); return panel;
      }));
    }
