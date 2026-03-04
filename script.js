/**
 * Mangalam HDPE Pipes - Gushwork Assignment
 * Vanilla JS: sticky header, product carousel with zoom, applications carousel,
 * process tabs, FAQ accordion. No frameworks or libraries.
 */

(function () {
  'use strict';

  // ----- Sticky header: show after scrolling past the main nav, hide when scrolling back to top -----
  var mainNav = document.querySelector('.main-nav');
  var stickyHeader = document.getElementById('stickyHeader');
  var lastScrollY = window.scrollY;

  function getNavScrollThreshold() {
    if (mainNav) return mainNav.offsetHeight;
    return 80;
  }

  function updateStickyHeader() {
    if (!stickyHeader) return;
    var currentY = window.scrollY;
    var threshold = getNavScrollThreshold();
    var isPastNav = currentY > threshold;
    var isScrollingUp = currentY < lastScrollY;

    /* Show when scrolled past the nav and not scrolling up; hide when scrolling back to top */
    if (isPastNav && !isScrollingUp) {
      stickyHeader.classList.add('is-visible');
      stickyHeader.setAttribute('aria-hidden', 'false');
    } else {
      stickyHeader.classList.remove('is-visible');
      stickyHeader.setAttribute('aria-hidden', 'true');
    }
    lastScrollY = currentY;
  }

  window.addEventListener('scroll', function () {
    updateStickyHeader();
  }, { passive: true });
  updateStickyHeader();

  // ----- Mobile nav toggle -----
  var navToggle = document.querySelector('.main-nav__toggle');
  var navList = document.getElementById('mainNavList');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', navList.classList.contains('is-open'));
    });
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----- Product image carousel (main product section) -----
  var productTrack = document.querySelector('.product-carousel__track');
  var productSlides = document.querySelectorAll('.product-carousel__slide');
  var thumbs = document.querySelectorAll('.product-thumb');

  function getProductViewport() {
    var wrap = document.querySelector('.product-carousel__viewport');
    return wrap ? wrap.offsetWidth : 0;
  }

  var productIndex = 0;
  var productTotal = productSlides.length;

  function updateProductCarousel() {
    if (!productTrack || !productTotal) return;
    var w = getProductViewport();
    productTrack.style.transform = 'translateX(-' + productIndex * w + 'px)';
    thumbs.forEach(function (thumb, i) {
      thumb.classList.toggle('active', i === productIndex);
    });
  }

  if (document.querySelector('.product-carousel')) {
    var arrows = document.querySelectorAll('.product-carousel .carousel-arrow');
    if (arrows[0]) arrows[0].addEventListener('click', function () {
      productIndex = (productIndex - 1 + productTotal) % productTotal;
      updateProductCarousel();
    });
    if (arrows[1]) arrows[1].addEventListener('click', function () {
      productIndex = (productIndex + 1) % productTotal;
      updateProductCarousel();
    });
    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener('click', function () {
        productIndex = i;
        updateProductCarousel();
      });
    });
    window.addEventListener('resize', updateProductCarousel);
    updateProductCarousel();
  }

  // ----- Zoom preview on hover (all .js-zoom-image) -----
  var zoomPreview = document.getElementById('zoomPreview');
  var zoomImages = document.querySelectorAll('.js-zoom-image');

  function showZoom(src, event, imgEl) {
    if (!zoomPreview || !src) return;
    zoomPreview.style.backgroundImage = 'url("' + src + '")';
    zoomPreview.classList.add('is-visible');
    zoomPreview.setAttribute('aria-hidden', 'false');
    positionZoom(event, imgEl);
  }

  function positionZoom(event, imgEl) {
    if (!zoomPreview || !imgEl) return;
    var rect = imgEl.getBoundingClientRect();
    var x = (event.clientX - rect.left) / rect.width;
    var y = (event.clientY - rect.top) / rect.height;
    zoomPreview.style.backgroundPosition = (x * 100) + '% ' + (y * 100) + '%';
    zoomPreview.style.left = (event.clientX + 16) + 'px';
    zoomPreview.style.top = (event.clientY + 16) + 'px';
  }

  function hideZoom() {
    if (zoomPreview) {
      zoomPreview.classList.remove('is-visible');
      zoomPreview.setAttribute('aria-hidden', 'true');
    }
  }

  zoomImages.forEach(function (img) {
    img.addEventListener('mouseenter', function (e) {
      var src = img.getAttribute('src');
      if (src) showZoom(src, e, img);
    });
    img.addEventListener('mousemove', function (e) {
      positionZoom(e, img);
    });
    img.addEventListener('mouseleave', hideZoom);
  });

  // ----- Applications carousel -----
  var appTrack = document.querySelector('.applications-carousel__track');
  var appCards = document.querySelectorAll('.applications-carousel__track .app-card');
  var appPrev = document.querySelector('.js-app-prev');
  var appNext = document.querySelector('.js-app-next');

  if (appTrack && appCards.length) {
    var appViewport = document.querySelector('.applications-carousel__viewport');
    var cardWidth = appCards[0].offsetWidth;
    var gap = 20;
    var step = cardWidth + gap;
    var maxOffset = Math.max(0, (appCards.length * step) - (appViewport ? appViewport.offsetWidth : 0));
    var appOffset = 0;

    function updateAppCarousel() {
      appTrack.style.transform = 'translateX(-' + appOffset + 'px)';
    }

    if (appPrev) appPrev.addEventListener('click', function () {
      appOffset = Math.max(0, appOffset - step);
      updateAppCarousel();
    });
    if (appNext) appNext.addEventListener('click', function () {
      appOffset = Math.min(maxOffset, appOffset + step);
      updateAppCarousel();
    });
    window.addEventListener('resize', function () {
      cardWidth = appCards[0].offsetWidth;
      step = cardWidth + gap;
      maxOffset = Math.max(0, (appCards.length * step) - (appViewport ? appViewport.offsetWidth : 0));
      appOffset = Math.min(appOffset, maxOffset);
      updateAppCarousel();
    });
  }

  // ----- Process tabs -----
  var processTabs = document.querySelectorAll('.process-tab');
  var processTitle = document.querySelector('.js-process-title');
  var processBody = document.querySelector('.js-process-body');
  var processList = document.querySelector('.js-process-list');

  var processData = [
    { title: 'High-Grade Raw Material Selection', body: 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.', list: ['PE100 grade material', 'Optimal molecular weight distribution'] },
    { title: 'Extrusion', body: 'Molten HDPE is extruded through a die to form the pipe profile with controlled dimensions and density.', list: ['Consistent melt flow', 'Uniform wall thickness for which is given'] },
    { title: 'Cooling', body: 'Pipes are cooled in water baths to stabilize dimensions and prevent deformation.', list: ['Gradual cooling', 'Stress relief'] },
    { title: 'Sizing', body: 'Vacuum sizing ensures precise outer diameter and roundness.', list: ['Calibrated sizing', 'Tolerance control'] },
    { title: 'Quality Control', body: 'Every pipe is tested for dimensions, pressure rating, and material integrity.', list: ['Dimensional checks', 'Hydrostatic testing'] },
    { title: 'Marking', body: 'Pipes are marked with standard identification including size, SDR, and certification.', list: ['Permanent marking', 'Traceability'] },
    { title: 'Cutting', body: 'Pipes are cut to required lengths with precision saws.', list: ['Accurate lengths', 'Clean ends'] },
    { title: 'Packaging', body: 'Pipes are bundled and packaged for safe transport and storage.', list: ['Bundled coils', 'Protective wrapping'] }
  ];

  var processCarouselTrack = document.querySelector('.process-carousel__track');
  var processCarouselImgs = document.querySelectorAll('.process-carousel__track .process-carousel__img');
  var procIndex = 0;
  function updateProcessCarousel() {
    if (!processCarouselTrack) return;
    var w = processCarouselTrack.parentElement ? processCarouselTrack.parentElement.offsetWidth : 0;
    processCarouselTrack.style.transform = 'translateX(-' + procIndex * w + 'px)';
  }
  function goToProcessStep(step) {
    procIndex = Math.max(0, Math.min(step, processCarouselImgs.length - 1));
    updateProcessCarousel();
  }

  if (processTabs.length && processTitle && processBody && processList) {
    processTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var step = parseInt(tab.getAttribute('data-step'), 10);
        processTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var d = processData[step];
        if (d) {
          processTitle.textContent = d.title;
          processBody.textContent = d.body;
          processList.innerHTML = d.list.map(function (item) { return '<li>' + item + '</li>'; }).join('');
        }
        goToProcessStep(step);
      });
    });
  }

  // ----- FAQ accordion -----
  var accordionItems = document.querySelectorAll('.accordion__item');
  accordionItems.forEach(function (item) {
    var trigger = item.querySelector('.accordion__trigger');
    var icon = item.querySelector('.accordion__icon');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('accordion__item--open');
      accordionItems.forEach(function (i) {
        i.classList.remove('accordion__item--open');
        var t = i.querySelector('.accordion__trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
        var ic = i.querySelector('.accordion__icon');
        if (ic) ic.textContent = '▼';
      });
      if (!isOpen) {
        item.classList.add('accordion__item--open');
        trigger.setAttribute('aria-expanded', 'true');
        if (icon) icon.textContent = '▲';
      } else {
        if (icon) icon.textContent = '▼';
      }
    });
  });

  // ----- Process carousel (small gallery in process section) -----
  var processPrev = document.querySelector('.process-carousel-prev');
  var processNext = document.querySelector('.process-carousel-next');
  if (processCarouselTrack && processCarouselImgs.length > 1) {
    if (processPrev) processPrev.addEventListener('click', function () {
      procIndex = (procIndex - 1 + processCarouselImgs.length) % processCarouselImgs.length;
      updateProcessCarousel();
    });
    if (processNext) processNext.addEventListener('click', function () {
      procIndex = (procIndex + 1) % processCarouselImgs.length;
      updateProcessCarousel();
    });
    window.addEventListener('resize', updateProcessCarousel);
    updateProcessCarousel();
  }

  // ----- Catalogue form (prevent default for demo) -----
  var catalogueForm = document.querySelector('.catalogue-form');
  if (catalogueForm) {
    catalogueForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = catalogueForm.querySelector('input[type="email"]');
      if (email && email.value) {
        alert('Catalogue request received for: ' + email.value);
      }
    });
  }

  // ----- Contact form (prevent default for demo) -----
  var contactForm = document.querySelector('.contact-form-main');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you! We will get back to you soon.');
    });
  }
})();
