// Tropical Cyclone Heat Potential (TCHP) Interactive Animation Player
// Directly streams 5-day forecast frames from INCOIS-ROMS without local image storage.

(function () {
  'use strict';

  var currentParam = 'tchp'; // 'tchp' | 'sst' | 'ssha'
  var currentFrameIndex = 0;
  var isPlaying = false;
  var playTimer = null;
  var framesList = [];
  var imageCache = { tchp: {}, sst: {}, ssha: {} };
  var stepHours = [1, 4, 7, 10, 13, 16, 19, 22];

  function getTargetFrames(param) {
    const list = [];
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + istOffset);
    const start = new Date(istNow.getFullYear(), istNow.getMonth(), istNow.getDate());

    for (let day = 0; day < 6; day++) {
      const curDay = new Date(start.getTime() + day * 86400000);
      const dd = String(curDay.getDate()).padStart(2, '0');
      const mm = String(curDay.getMonth() + 1).padStart(2, '0');
      const yyyy = curDay.getFullYear();
      const dateStr = `${dd}-${mm}-${yyyy}`;

      for (let i = 0; i < stepHours.length; i++) {
        const h = stepHours[i];
        const hhmm = String(h).padStart(2, '0') + '00';
        const url = `https://incois.gov.in/datasets/forecast_nowcast/TCHP/roms/${param}/${dateStr}--${hhmm}.gif`;
        
        const dayName = day === 0 ? 'Today' : (day === 1 ? 'Tomorrow' : curDay.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }));
        const timeLabel = `${dayName} ${String(h).padStart(2, '0')}:00 IST`;

        list.push({
          url: url,
          label: timeLabel,
          dateStr: dateStr,
          hour: h
        });
      }
    }
    return list;
  }

  function preloadFrames(param) {
    if (!imageCache[param]) {
      imageCache[param] = {};
    }
    const list = getTargetFrames(param);
    list.forEach(function (frame) {
      if (!imageCache[param][frame.url]) {
        const img = new Image();
        img.src = frame.url;
        imageCache[param][frame.url] = img;
      }
    });
  }

  function updateFrameDisplay(index) {
    if (!framesList.length) return;
    if (index < 0) index = 0;
    if (index >= framesList.length) index = framesList.length - 1;
    currentFrameIndex = index;

    const frame = framesList[currentFrameIndex];
    const img = document.getElementById('tchpImageDisplay');
    const overlay = document.getElementById('tchpLoadingOverlay');
    const label = document.getElementById('tchpTimeLabel');
    const slider = document.getElementById('tchpTimeSlider');

    if (slider) {
      slider.value = currentFrameIndex;
      slider.max = framesList.length - 1;
    }

    if (label) {
      label.textContent = frame.label;
    }

    if (img) {
      const cached = imageCache[currentParam] && imageCache[currentParam][frame.url];
      const isReady = cached && cached.complete && cached.naturalWidth > 0;

      if (isReady) {
        if (overlay) overlay.style.display = 'none';
        img.src = frame.url;
      } else {
        // If first frame is not ready yet, show overlay; otherwise keep previous frame until loaded
        if (!img.getAttribute('src') && overlay) {
          overlay.style.display = 'flex';
        }
        const tempImg = new Image();
        tempImg.onload = function () {
          if (currentFrameIndex === index) {
            img.src = frame.url;
            if (overlay) overlay.style.display = 'none';
          }
        };
        tempImg.onerror = function () {
          if (overlay) overlay.style.display = 'none';
        };
        tempImg.src = frame.url;
        if (imageCache[currentParam]) {
          imageCache[currentParam][frame.url] = tempImg;
        }
      }
    }
  }

  function startPlayback() {
    if (isPlaying) return;
    isPlaying = true;
    const btn = document.getElementById('tchpPlayPauseBtn');
    if (btn) btn.textContent = '⏸ Pause';

    playTimer = setInterval(function () {
      let nextIndex = currentFrameIndex + 1;
      if (nextIndex >= framesList.length) {
        nextIndex = 0;
      }
      updateFrameDisplay(nextIndex);
    }, 1000);
  }

  function pausePlayback() {
    if (!isPlaying) return;
    isPlaying = false;
    if (playTimer) {
      clearInterval(playTimer);
      playTimer = null;
    }
    const btn = document.getElementById('tchpPlayPauseBtn');
    if (btn) btn.textContent = '▶ Play';
  }

  function togglePlayback() {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  }

  function initTchpViewer() {
    framesList = getTargetFrames(currentParam);
    preloadFrames(currentParam);
    
    // Also proactively preload other parameters in the background for instant tab switching
    setTimeout(function () {
      if (currentParam === 'tchp') {
        preloadFrames('sst');
        preloadFrames('ssha');
      }
    }, 1200);

    currentFrameIndex = 0;
    updateFrameDisplay(0);

    const playPauseBtn = document.getElementById('tchpPlayPauseBtn');
    const prevBtn = document.getElementById('tchpPrevBtn');
    const nextBtn = document.getElementById('tchpNextBtn');
    const slider = document.getElementById('tchpTimeSlider');
    const tabs = document.querySelectorAll('.tchp-tab-btn');

    if (playPauseBtn && !playPauseBtn.dataset.wired) {
      playPauseBtn.dataset.wired = 'true';
      playPauseBtn.addEventListener('click', togglePlayback);
    }

    if (prevBtn && !prevBtn.dataset.wired) {
      prevBtn.dataset.wired = 'true';
      prevBtn.addEventListener('click', function () {
        pausePlayback();
        updateFrameDisplay(currentFrameIndex - 1);
      });
    }

    if (nextBtn && !nextBtn.dataset.wired) {
      nextBtn.dataset.wired = 'true';
      nextBtn.addEventListener('click', function () {
        pausePlayback();
        updateFrameDisplay(currentFrameIndex + 1);
      });
    }

    if (slider && !slider.dataset.wired) {
      slider.dataset.wired = 'true';
      slider.addEventListener('input', function () {
        pausePlayback();
        updateFrameDisplay(parseInt(this.value, 10));
      });
    }

    tabs.forEach(function (tab) {
      if (!tab.dataset.wired) {
        tab.dataset.wired = 'true';
        tab.addEventListener('click', function () {
          tabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          currentParam = this.dataset.param || 'tchp';
          framesList = getTargetFrames(currentParam);
          preloadFrames(currentParam);
          updateFrameDisplay(currentFrameIndex);
        });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('openTchpDialog');
    const dialog = document.getElementById('tchpDialog');
    const closeBtn = document.getElementById('tchpDialogClose');

    if (openBtn && dialog) {
      openBtn.addEventListener('click', function () {
        initTchpViewer();
        dialog.showModal();
      });
    }

    if (closeBtn && dialog) {
      closeBtn.addEventListener('click', function () {
        pausePlayback();
        dialog.close();
      });
    }

    if (dialog) {
      dialog.addEventListener('click', function (e) {
        if (e.target === dialog) {
          pausePlayback();
          dialog.close();
        }
      });
      dialog.addEventListener('cancel', function () {
        pausePlayback();
      });
    }
  });

  globalThis.openTchpModal = function () {
    const dialog = document.getElementById('tchpDialog');
    if (dialog) {
      initTchpViewer();
      dialog.showModal();
    }
  };
})();
