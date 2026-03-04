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
