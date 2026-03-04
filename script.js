(function () {
  'use strict';

  // ---- Product image carousel (arrows + thumbnails) ----
  var productCarousel = document.querySelector('.product-section .product-carousel');
  if (productCarousel) {
    var track = productCarousel.querySelector('.product-carousel__track');
    var slides = productCarousel.querySelectorAll('.product-carousel__slide');
    var prevBtn = productCarousel.querySelector('.carousel-arrow--prev');
    var nextBtn = productCarousel.querySelector('.carousel-arrow--next');
    var thumbnailsWrap = productCarousel.closest('.product-section__gallery').querySelector('.product-thumbnails');
    var thumbs = thumbnailsWrap ? thumbnailsWrap.querySelectorAll('.product-thumb') : [];
    var total = slides.length;
    var currentIndex = 0;

    function updateCarousel() {
      var percent = total > 0 ? currentIndex * (100 / total) : 0;
      track.style.transform = 'translateX(-' + percent + '%)';
      thumbs.forEach(function (thumb, i) {
        thumb.classList.toggle('active', i === currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % total;
        updateCarousel();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        currentIndex = currentIndex === 0 ? total - 1 : currentIndex - 1;
        updateCarousel();
      });
    }
    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener('click', function () {
        currentIndex = i;
        updateCarousel();
      });
    });
    updateCarousel();
  }

  // ---- FAQ accordion (click to show/hide answer) ----
  var accordion = document.querySelector('.accordion');
  if (accordion) {
    var items = accordion.querySelectorAll('.accordion__item');
    items.forEach(function (item) {
      var trigger = item.querySelector('.accordion__trigger');
      var panel = item.querySelector('.accordion__panel');
      if (!trigger || !panel) return;
      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('accordion__item--open');
        items.forEach(function (other) {
          other.classList.remove('accordion__item--open');
          var t = other.querySelector('.accordion__trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('accordion__item--open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ---- Versatile Applications carousel (arrows + scroll) ----
  var appSection = document.getElementById('applications');
  if (appSection) {
    var appViewport = appSection.querySelector('.applications-carousel__viewport');
    var appTrack = appSection.querySelector('.applications-carousel__track');
    var appCards = appSection.querySelectorAll('.app-card');
    var appPrev = appSection.querySelector('.js-app-prev');
    var appNext = appSection.querySelector('.js-app-next');

    if (appViewport && appTrack && appCards.length > 0) {
      var appCurrentOffset = 0;

      function getAppCardWidth() {
        var first = appCards[0];
        if (!first) return 340;
        var gapStr = window.getComputedStyle(appTrack).gap;
        var gap = 20;
        if (gapStr) {
          var num = parseFloat(gapStr);
          if (gapStr.indexOf('rem') !== -1) gap = num * 16;
          else if (!isNaN(num)) gap = num;
        }
        return first.offsetWidth + gap;
      }

      function getAppMaxScroll() {
        var vw = appViewport.offsetWidth;
        var trackWidth = appTrack.scrollWidth;
        return Math.max(0, trackWidth - vw);
      }

      function updateAppCarousel() {
        var maxScroll = getAppMaxScroll();
        appCurrentOffset = Math.max(-maxScroll, Math.min(0, appCurrentOffset));
        appTrack.style.transform = 'translateX(' + appCurrentOffset + 'px)';
      }

      if (appNext) {
        appNext.addEventListener('click', function () {
          appCurrentOffset -= getAppCardWidth();
          updateAppCarousel();
        });
      }
      if (appPrev) {
        appPrev.addEventListener('click', function () {
          appCurrentOffset += getAppCardWidth();
          updateAppCarousel();
        });
      }
      window.addEventListener('resize', updateAppCarousel);
      updateAppCarousel();
    }
  }

  // ---- Advanced HDPE Process tabs (content + image per step) ----
  var processSection = document.getElementById('process');
  if (processSection) {
    var processTabs = processSection.querySelectorAll('.process-tab');
    var processTitle = processSection.querySelector('.js-process-title');
    var processBody = processSection.querySelector('.js-process-body');
    var processList = processSection.querySelector('.js-process-list');
    var processTrack = processSection.querySelector('.process-carousel__track');
    var processImgs = processSection.querySelectorAll('.process-carousel__img');

    var PROCESS_STEPS = [
      { title: 'High-Grade Raw Material Selection', body: 'PE100 grade HDPE resin with optimal molecular weight distribution ensures consistent pipe quality. Raw material is tested for density, melt index, and certification compliance before use.', list: ['PE100 grade material', 'Optimal molecular weight distribution', 'Certified resin supply'] },
      { title: 'Precision Extrusion', body: 'Molten HDPE is extruded through a die to form the pipe profile. State-of-the-art extruders maintain precise temperature and pressure for uniform wall thickness and diameter.', list: ['Twin-screw extrusion', 'Precise temperature zones', 'Uniform melt flow'] },
      { title: 'Controlled Cooling', body: 'Pipes pass through vacuum calibration and cooling tanks to set dimensions and prevent deformation. Water temperature and flow are controlled for optimal crystallisation.', list: ['Vacuum calibration', 'Water bath cooling', 'Dimensional stability'] },
      { title: 'Precision Sizing', body: 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity across the full length.', list: ['OD and wall control', 'Roundness tolerance', 'SDR compliance'] },
      { title: 'Quality Control & Inspection', body: 'Every pipe is inspected for dimensions, surface defects, and mechanical properties. Testing includes hydrostatic pressure, impact resistance, and material verification.', list: ['Dimensional checks', 'Pressure testing', 'Visual inspection'] },
      { title: 'Pipe Marking & Identification', body: 'Pipes are marked with standard identification: manufacturer, material grade, size, pressure rating, and production batch for traceability.', list: ['Continuous line marking', 'Batch traceability', 'Standards compliance'] },
      { title: 'Precision Cutting', body: 'Pipes are cut to specified lengths using automated saws. Length tolerance and end quality are controlled for easy jointing during installation.', list: ['Length accuracy', 'Square cut ends', 'Handling safety'] },
      { title: 'Packaging & Dispatch', body: 'Pipes are bundled, labelled, and packaged for safe transport. Storage and handling guidelines are provided to maintain quality until installation.', list: ['Bundled packaging', 'Protection from UV and damage', 'Dispatch documentation'] }
    ];

    function setProcessStep(index) {
      var step = PROCESS_STEPS[index];
      if (!step) return;
      processTabs.forEach(function (tab, i) {
        tab.classList.toggle('active', i === index);
      });
      if (processTitle) processTitle.textContent = step.title;
      if (processBody) processBody.textContent = step.body;
      if (processList) {
        processList.innerHTML = step.list.map(function (item) { return '<li>' + item + '</li>'; }).join('');
      }
      if (processTrack && processImgs.length) {
        var pct = (index / processImgs.length) * 100;
        processTrack.style.transform = 'translateX(-' + pct + '%)';
      }
    }

    processTabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { setProcessStep(i); });
    });

    setProcessStep(0);
  }

  // ---- Datasheet / Catalogue download modal ----
  var modal = document.getElementById('datasheet-modal');
  var openBtn = document.getElementById('js-open-datasheet-modal');
  var closeBtn = document.getElementById('js-close-datasheet-modal');
  var form = document.getElementById('datasheet-form');

  function openModal() {
    if (!modal) return;
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (openBtn) {
    openBtn.addEventListener('click', function () {
      openModal();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-visible')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('datasheet-email');
      if (email && !email.value.trim()) {
        email.focus();
        return;
      }
      // Here you could send the form data to a server
      closeModal();
      form.reset();
    });
  }

  // ---- Request a call back modal ----
  var callbackModal = document.getElementById('callback-modal');
  var callbackOpenBtn = document.getElementById('js-open-callback-modal');
  var callbackCloseBtn = document.querySelector('.js-close-callback-modal');
  var callbackForm = document.getElementById('callback-form');

  function openCallbackModal() {
    if (!callbackModal) return;
    callbackModal.classList.add('is-visible');
    callbackModal.setAttribute('aria-hidden', 'false');
    if (callbackOpenBtn) callbackOpenBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeCallbackModal() {
    if (!callbackModal) return;
    callbackModal.classList.remove('is-visible');
    callbackModal.setAttribute('aria-hidden', 'true');
    if (callbackOpenBtn) callbackOpenBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (callbackOpenBtn) {
    callbackOpenBtn.addEventListener('click', openCallbackModal);
  }

  if (callbackCloseBtn) {
    callbackCloseBtn.addEventListener('click', closeCallbackModal);
  }

  if (callbackModal) {
    callbackModal.addEventListener('click', function (e) {
      if (e.target === callbackModal) closeCallbackModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (callbackModal && callbackModal.classList.contains('is-visible')) closeCallbackModal();
      else if (modal && modal.classList.contains('is-visible')) closeModal();
    }
  });

  if (callbackForm) {
    callbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameEl = document.getElementById('callback-name');
      if (nameEl && !nameEl.value.trim()) { nameEl.focus(); return; }
      closeCallbackModal();
      callbackForm.reset();
    });
  }
})();
