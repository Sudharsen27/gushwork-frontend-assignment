// (function () {
//   'use strict';

//   // ---- Sticky header: show when user scrolls down, hide when at top ----
//   function initStickyHeader() {
//     var stickyHeader = document.getElementById('stickyHeader');
//     if (!stickyHeader) return;
//     var STICKY_THRESHOLD_PX = 80;
//     function getScrollY() {
//       return Math.max(
//         window.pageYOffset || 0,
//         (document.documentElement && document.documentElement.scrollTop) || 0,
//         (document.body && document.body.scrollTop) || 0
//       );
//     }
//     function updateStickyHeader() {
//       var scrollY = getScrollY();
//       if (scrollY > STICKY_THRESHOLD_PX) {
//         stickyHeader.classList.add('is-visible');
//         stickyHeader.setAttribute('aria-hidden', 'false');
//       } else {
//         stickyHeader.classList.remove('is-visible');
//         stickyHeader.setAttribute('aria-hidden', 'true');
//       }
//     }
//     var onScrollOrResize = function () { requestAnimationFrame(updateStickyHeader); };
//     window.addEventListener('scroll', onScrollOrResize, { passive: true });
//     window.addEventListener('resize', onScrollOrResize, { passive: true });
//     document.addEventListener('scroll', onScrollOrResize, { passive: true });
//     updateStickyHeader();
//   }
//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', initStickyHeader);
//   } else {
//     initStickyHeader();
//   }

//   // ---- Image carousel zoom: show zoomed preview on hover over carousel images ----
//   var zoomPreview = document.getElementById('zoomPreview');
//   var zoomImages = document.querySelectorAll('.js-zoom-image');
//   if (zoomPreview && zoomImages.length) {
//     zoomImages.forEach(function (img) {
//       img.addEventListener('mouseenter', function (e) {
//         var src = this.currentSrc || this.getAttribute('src');
//         if (src) {
//           zoomPreview.style.backgroundImage = 'url(' + src + ')';
//           zoomPreview.style.backgroundSize = '200% 200%';
//           zoomPreview.style.backgroundPosition = '50% 50%';
//           var x = e.clientX;
//           var y = e.clientY;
//           zoomPreview.style.left = (x + 16) + 'px';
//           zoomPreview.style.top = (y + 16) + 'px';
//           zoomPreview.classList.add('is-visible');
//           zoomPreview.setAttribute('aria-hidden', 'false');
//         }
//       });
//       img.addEventListener('mousemove', function (e) {
//         if (!zoomPreview.classList.contains('is-visible')) return;
//         var x = e.clientX;
//         var y = e.clientY;
//         var w = 280;
//         var h = 200;
//         var offset = 16;
//         var left = x + offset;
//         var top = y + offset;
//         if (left + w > window.innerWidth) left = x - w - offset;
//         if (top + h > window.innerHeight) top = y - h - offset;
//         if (left < 0) left = offset;
//         if (top < 0) top = offset;
//         zoomPreview.style.left = left + 'px';
//         zoomPreview.style.top = top + 'px';
//       });
//       img.addEventListener('mouseleave', function () {
//         zoomPreview.classList.remove('is-visible');
//         zoomPreview.setAttribute('aria-hidden', 'true');
//       });
//     });
//   }

//   // ---- Product image carousel (arrows + thumbnails) ----
//   var productCarousel = document.querySelector('.product-section .product-carousel');
//   if (productCarousel) {
//     var track = productCarousel.querySelector('.product-carousel__track');
//     var slides = productCarousel.querySelectorAll('.product-carousel__slide');
//     var prevBtn = productCarousel.querySelector('.carousel-arrow--prev');
//     var nextBtn = productCarousel.querySelector('.carousel-arrow--next');
//     var thumbnailsWrap = productCarousel.closest('.product-section__gallery').querySelector('.product-thumbnails');
//     var thumbs = thumbnailsWrap ? thumbnailsWrap.querySelectorAll('.product-thumb') : [];
//     var total = slides.length;
//     var currentIndex = 0;

//     function updateCarousel() {
//       var percent = total > 0 ? currentIndex * (100 / total) : 0;
//       track.style.transform = 'translateX(-' + percent + '%)';
//       thumbs.forEach(function (thumb, i) {
//         thumb.classList.toggle('active', i === currentIndex);
//       });
//     }

//     if (nextBtn) {
//       nextBtn.addEventListener('click', function () {
//         currentIndex = (currentIndex + 1) % total;
//         updateCarousel();
//       });
//     }
//     if (prevBtn) {
//       prevBtn.addEventListener('click', function () {
//         currentIndex = currentIndex === 0 ? total - 1 : currentIndex - 1;
//         updateCarousel();
//       });
//     }
//     thumbs.forEach(function (thumb, i) {
//       thumb.addEventListener('click', function () {
//         currentIndex = i;
//         updateCarousel();
//       });
//     });
//     updateCarousel();
//   }

//   // ---- FAQ accordion (click to show/hide answer) ----
//   var accordion = document.querySelector('.accordion');
//   if (accordion) {
//     var items = accordion.querySelectorAll('.accordion__item');
//     items.forEach(function (item) {
//       var trigger = item.querySelector('.accordion__trigger');
//       var panel = item.querySelector('.accordion__panel');
//       if (!trigger || !panel) return;
//       trigger.addEventListener('click', function () {
//         var isOpen = item.classList.contains('accordion__item--open');
//         items.forEach(function (other) {
//           other.classList.remove('accordion__item--open');
//           var t = other.querySelector('.accordion__trigger');
//           if (t) t.setAttribute('aria-expanded', 'false');
//         });
//         if (!isOpen) {
//           item.classList.add('accordion__item--open');
//           trigger.setAttribute('aria-expanded', 'true');
//         }
//       });
//     });
//   }

//   // ---- Versatile Applications carousel (arrows + scroll) ----
//   var appSection = document.getElementById('applications');
//   if (appSection) {
//     var appViewport = appSection.querySelector('.applications-carousel__viewport');
//     var appTrack = appSection.querySelector('.applications-carousel__track');
//     var appCards = appSection.querySelectorAll('.app-card');
//     var appPrev = appSection.querySelector('.js-app-prev');
//     var appNext = appSection.querySelector('.js-app-next');

//     if (appViewport && appTrack && appCards.length > 0) {
//       var appCurrentOffset = 0;

//       function getAppCardWidth() {
//         var first = appCards[0];
//         if (!first) return 340;
//         var gapStr = window.getComputedStyle(appTrack).gap;
//         var gap = 20;
//         if (gapStr) {
//           var num = parseFloat(gapStr);
//           if (gapStr.indexOf('rem') !== -1) gap = num * 16;
//           else if (!isNaN(num)) gap = num;
//         }
//         return first.offsetWidth + gap;
//       }

//       function getAppMaxScroll() {
//         var vw = appViewport.offsetWidth;
//         var trackWidth = appTrack.scrollWidth;
//         return Math.max(0, trackWidth - vw);
//       }

//       function updateAppCarousel() {
//         var maxScroll = getAppMaxScroll();
//         appCurrentOffset = Math.max(-maxScroll, Math.min(0, appCurrentOffset));
//         appTrack.style.transform = 'translateX(' + appCurrentOffset + 'px)';
//       }

//       if (appNext) {
//         appNext.addEventListener('click', function () {
//           appCurrentOffset -= getAppCardWidth();
//           updateAppCarousel();
//         });
//       }
//       if (appPrev) {
//         appPrev.addEventListener('click', function () {
//           appCurrentOffset += getAppCardWidth();
//           updateAppCarousel();
//         });
//       }
//       window.addEventListener('resize', updateAppCarousel);
//       updateAppCarousel();
//     }
//   }

//   // ---- Advanced HDPE Process tabs (content + image per step) ----
//   var processSection = document.getElementById('process');
//   if (processSection) {
//     var processTabs = processSection.querySelectorAll('.process-tab');
//     var processTitle = processSection.querySelector('.js-process-title');
//     var processBody = processSection.querySelector('.js-process-body');
//     var processList = processSection.querySelector('.js-process-list');
//     var processTrack = processSection.querySelector('.process-carousel__track');
//     var processImgs = processSection.querySelectorAll('.process-carousel__img');

//     var PROCESS_STEPS = [
//       { title: 'High-Grade Raw Material Selection', body: 'PE100 grade HDPE resin with optimal molecular weight distribution ensures consistent pipe quality. Raw material is tested for density, melt index, and certification compliance before use.', list: ['PE100 grade material', 'Optimal molecular weight distribution', 'Certified resin supply'] },
//       { title: 'Precision Extrusion', body: 'Molten HDPE is extruded through a die to form the pipe profile. State-of-the-art extruders maintain precise temperature and pressure for uniform wall thickness and diameter.', list: ['Twin-screw extrusion', 'Precise temperature zones', 'Uniform melt flow'] },
//       { title: 'Controlled Cooling', body: 'Pipes pass through vacuum calibration and cooling tanks to set dimensions and prevent deformation. Water temperature and flow are controlled for optimal crystallisation.', list: ['Vacuum calibration', 'Water bath cooling', 'Dimensional stability'] },
//       { title: 'Precision Sizing', body: 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity across the full length.', list: ['OD and wall control', 'Roundness tolerance', 'SDR compliance'] },
//       { title: 'Quality Control & Inspection', body: 'Every pipe is inspected for dimensions, surface defects, and mechanical properties. Testing includes hydrostatic pressure, impact resistance, and material verification.', list: ['Dimensional checks', 'Pressure testing', 'Visual inspection'] },
//       { title: 'Pipe Marking & Identification', body: 'Pipes are marked with standard identification: manufacturer, material grade, size, pressure rating, and production batch for traceability.', list: ['Continuous line marking', 'Batch traceability', 'Standards compliance'] },
//       { title: 'Precision Cutting', body: 'Pipes are cut to specified lengths using automated saws. Length tolerance and end quality are controlled for easy jointing during installation.', list: ['Length accuracy', 'Square cut ends', 'Handling safety'] },
//       { title: 'Packaging & Dispatch', body: 'Pipes are bundled, labelled, and packaged for safe transport. Storage and handling guidelines are provided to maintain quality until installation.', list: ['Bundled packaging', 'Protection from UV and damage', 'Dispatch documentation'] }
//     ];

//     function setProcessStep(index) {
//       var step = PROCESS_STEPS[index];
//       if (!step) return;
//       processTabs.forEach(function (tab, i) {
//         tab.classList.toggle('active', i === index);
//       });
//       if (processTitle) processTitle.textContent = step.title;
//       if (processBody) processBody.textContent = step.body;
//       if (processList) {
//         processList.innerHTML = step.list.map(function (item) { return '<li>' + item + '</li>'; }).join('');
//       }
//       if (processTrack && processImgs.length) {
//         var pct = (index / processImgs.length) * 100;
//         processTrack.style.transform = 'translateX(-' + pct + '%)';
//       }
//     }

//     processTabs.forEach(function (tab, i) {
//       tab.addEventListener('click', function () { setProcessStep(i); });
//     });

//     setProcessStep(0);
//   }

//   // ---- Datasheet / Catalogue download modal ----
//   var modal = document.getElementById('datasheet-modal');
//   var openBtn = document.getElementById('js-open-datasheet-modal');
//   var closeBtn = document.getElementById('js-close-datasheet-modal');
//   var form = document.getElementById('datasheet-form');

//   function openModal() {
//     if (!modal) return;
//     modal.classList.add('is-visible');
//     modal.setAttribute('aria-hidden', 'false');
//     if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
//     document.body.style.overflow = 'hidden';
//   }

//   function closeModal() {
//     if (!modal) return;
//     modal.classList.remove('is-visible');
//     modal.setAttribute('aria-hidden', 'true');
//     if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
//     document.body.style.overflow = '';
//   }

//   if (openBtn) {
//     openBtn.addEventListener('click', function () {
//       openModal();
//     });
//   }

//   if (closeBtn) {
//     closeBtn.addEventListener('click', closeModal);
//   }

//   if (modal) {
//     modal.addEventListener('click', function (e) {
//       if (e.target === modal) closeModal();
//     });
//   }

//   document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape' && modal && modal.classList.contains('is-visible')) {
//       closeModal();
//     }
//   });

//   if (form) {
//     form.addEventListener('submit', function (e) {
//       e.preventDefault();
//       var email = document.getElementById('datasheet-email');
//       if (email && !email.value.trim()) {
//         email.focus();
//         return;
//       }
//       // Here you could send the form data to a server
//       closeModal();
//       form.reset();
//     });
//   }

//   // ---- Request a call back modal ----
//   var callbackModal = document.getElementById('callback-modal');
//   var callbackOpenBtn = document.getElementById('js-open-callback-modal');
//   var callbackCloseBtn = document.querySelector('.js-close-callback-modal');
//   var callbackForm = document.getElementById('callback-form');

//   function openCallbackModal() {
//     if (!callbackModal) return;
//     callbackModal.classList.add('is-visible');
//     callbackModal.setAttribute('aria-hidden', 'false');
//     if (callbackOpenBtn) callbackOpenBtn.setAttribute('aria-expanded', 'true');
//     document.body.style.overflow = 'hidden';
//   }

//   function closeCallbackModal() {
//     if (!callbackModal) return;
//     callbackModal.classList.remove('is-visible');
//     callbackModal.setAttribute('aria-hidden', 'true');
//     if (callbackOpenBtn) callbackOpenBtn.setAttribute('aria-expanded', 'false');
//     document.body.style.overflow = '';
//   }

//   if (callbackOpenBtn) {
//     callbackOpenBtn.addEventListener('click', openCallbackModal);
//   }

//   if (callbackCloseBtn) {
//     callbackCloseBtn.addEventListener('click', closeCallbackModal);
//   }

//   if (callbackModal) {
//     callbackModal.addEventListener('click', function (e) {
//       if (e.target === callbackModal) closeCallbackModal();
//     });
//   }

//   document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape') {
//       if (callbackModal && callbackModal.classList.contains('is-visible')) closeCallbackModal();
//       else if (modal && modal.classList.contains('is-visible')) closeModal();
//     }
//   });

//   if (callbackForm) {
//     callbackForm.addEventListener('submit', function (e) {
//       e.preventDefault();
//       var nameEl = document.getElementById('callback-name');
//       if (nameEl && !nameEl.value.trim()) { nameEl.focus(); return; }
//       closeCallbackModal();
//       callbackForm.reset();
//     });
//   }
// })();

(function () {
  "use strict";

  /* ======================================================
     STICKY HEADER
  ====================================================== */

  function initStickyHeader() {
    const header = document.getElementById("stickyHeader");
    if (!header) return;

    const THRESHOLD = 80;

    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;

      if (scrollY > THRESHOLD) {
        header.classList.add("is-visible");
        header.setAttribute("aria-hidden", "false");
      } else {
        header.classList.remove("is-visible");
        header.setAttribute("aria-hidden", "true");
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initStickyHeader();
    initMobileNav();
  });

  /* ======================================================
     MOBILE NAV (hamburger toggle)
  ====================================================== */
  function initMobileNav() {
    const toggle = document.querySelector(".main-nav__toggle");
    const list = document.getElementById("mainNavList");
    if (!toggle || !list) return;

    toggle.addEventListener("click", function () {
      const isOpen = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close menu when a nav link is clicked (for in-page anchors)
    list.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        list.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Close menu on resize to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        list.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ======================================================
     IMAGE ZOOM PREVIEW
  ====================================================== */

  const zoomPreview = document.getElementById("zoomPreview");
  const zoomImages = document.querySelectorAll(".js-zoom-image");

  if (zoomPreview && zoomImages.length) {
    zoomImages.forEach((img) => {
      img.addEventListener("mouseenter", (e) => {
        const src = img.currentSrc || img.src;
        zoomPreview.style.backgroundImage = `url(${src})`;
        zoomPreview.classList.add("is-visible");
        zoomPreview.setAttribute("aria-hidden", "false");
      });

      img.addEventListener("mousemove", (e) => {
        if (!zoomPreview.classList.contains("is-visible")) return;

        const offset = 16;
        const width = 280;
        const height = 200;

        let left = e.clientX + offset;
        let top = e.clientY + offset;

        if (left + width > window.innerWidth) left = e.clientX - width - offset;
        if (top + height > window.innerHeight) top = e.clientY - height - offset;

        zoomPreview.style.left = left + "px";
        zoomPreview.style.top = top + "px";
      });

      img.addEventListener("mouseleave", () => {
        zoomPreview.classList.remove("is-visible");
        zoomPreview.setAttribute("aria-hidden", "true");
      });
    });
  }

  /* ======================================================
     PRODUCT CAROUSEL
  ====================================================== */

  const productCarousel = document.querySelector(".product-carousel");

  if (productCarousel) {
    const track = productCarousel.querySelector(".product-carousel__track");
    const slides = productCarousel.querySelectorAll(".product-carousel__slide");
    const prev = productCarousel.querySelector(".carousel-arrow--prev");
    const next = productCarousel.querySelector(".carousel-arrow--next");
    const thumbs = document.querySelectorAll(".product-thumb");

    let index = 0;
    const total = slides.length;

    function updateCarousel() {
      track.style.transform = `translateX(-${index * (100 / total)}%)`;

      thumbs.forEach((t, i) => {
        t.classList.toggle("active", i === index);
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        index = (index + 1) % total;
        updateCarousel();
      });
    }

    if (prev) {
      prev.addEventListener("click", () => {
        index = index === 0 ? total - 1 : index - 1;
        updateCarousel();
      });
    }

    thumbs.forEach((thumb, i) => {
      thumb.addEventListener("click", () => {
        index = i;
        updateCarousel();
      });
    });

    updateCarousel();
  }

  /* ======================================================
     FAQ ACCORDION
  ====================================================== */

  const accordion = document.querySelector(".accordion");

  if (accordion) {
    const items = accordion.querySelectorAll(".accordion__item");

    items.forEach((item) => {
      const trigger = item.querySelector(".accordion__trigger");

      trigger.addEventListener("click", () => {
        const open = item.classList.contains("accordion__item--open");

        items.forEach((i) => {
          i.classList.remove("accordion__item--open");
          i.querySelector(".accordion__trigger")
            ?.setAttribute("aria-expanded", "false");
        });

        if (!open) {
          item.classList.add("accordion__item--open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ======================================================
     APPLICATIONS CAROUSEL
  ====================================================== */

  const appSection = document.getElementById("applications");

  if (appSection) {
    const viewport = appSection.querySelector(".applications-carousel__viewport");
    const track = appSection.querySelector(".applications-carousel__track");
    const cards = appSection.querySelectorAll(".app-card");
    const prev = appSection.querySelector(".js-app-prev");
    const next = appSection.querySelector(".js-app-next");

    if (!viewport || !track || !cards.length) return;

    let offset = 0;

    function cardWidth() {
      return cards[0].offsetWidth + 20;
    }

    function maxScroll() {
      return track.scrollWidth - viewport.offsetWidth;
    }

    function update() {
      const max = maxScroll();
      offset = Math.max(-max, Math.min(0, offset));
      track.style.transform = `translateX(${offset}px)`;
    }

    next?.addEventListener("click", () => {
      offset -= cardWidth();
      update();
    });

    prev?.addEventListener("click", () => {
      offset += cardWidth();
      update();
    });

    window.addEventListener("resize", update);
    update();
  }

  /* ======================================================
     PROCESS TABS
  ====================================================== */

  const processSection = document.getElementById("process");

  if (processSection) {
    const tabs = processSection.querySelectorAll(".process-tab");
    const title = processSection.querySelector(".js-process-title");
    const body = processSection.querySelector(".js-process-body");
    const list = processSection.querySelector(".js-process-list");

    const steps = [
      {
        title: "High-Grade Raw Material Selection",
        body: "PE100 HDPE resin ensures consistent pipe quality.",
        list: ["PE100 grade material", "Optimal molecular distribution"],
      },
      {
        title: "Precision Extrusion",
        body: "Molten HDPE is extruded through a die.",
        list: ["Twin screw extrusion", "Uniform melt flow"],
      },
      {
        title: "Controlled Cooling",
        body: "Cooling tanks stabilize pipe dimensions.",
        list: ["Vacuum calibration", "Water bath cooling"],
      },
      {
        title: "Precision Sizing",
        body: "Vacuum sizing ensures accurate pipe diameter.",
        list: ["OD tolerance", "Wall thickness control"],
      },
      {
        title: "Quality Inspection",
        body: "Pipes undergo pressure and dimensional testing.",
        list: ["Pressure tests", "Visual inspection"],
      },
      {
        title: "Pipe Marking",
        body: "Pipes marked with identification details.",
        list: ["Batch traceability", "Standard compliance"],
      },
      {
        title: "Precision Cutting",
        body: "Pipes cut to required lengths.",
        list: ["Square ends", "Length accuracy"],
      },
      {
        title: "Packaging & Dispatch",
        body: "Pipes bundled and shipped securely.",
        list: ["Bundled packaging", "Transport protection"],
      },
    ];

    function setStep(i) {
      const step = steps[i];

      tabs.forEach((t, index) =>
        t.classList.toggle("active", index === i)
      );

      title.textContent = step.title;
      body.textContent = step.body;

      list.innerHTML = step.list.map((l) => `<li>${l}</li>`).join("");
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => setStep(i));
    });

    setStep(0);
  }

  /* ======================================================
     GENERIC MODAL FUNCTION
  ====================================================== */

  function setupModal(openId, modalId, closeSelector, formId) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openId);
    const closeBtn = modal?.querySelector(closeSelector);
    const form = document.getElementById(formId);

    if (!modal) return;

    function open() {
      modal.classList.add("is-visible");
      document.body.style.overflow = "hidden";
    }

    function close() {
      modal.classList.remove("is-visible");
      document.body.style.overflow = "";
    }

    openBtn?.addEventListener("click", open);
    closeBtn?.addEventListener("click", close);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      close();
      form.reset();
    });
  }

  setupModal(
    "js-open-datasheet-modal",
    "datasheet-modal",
    "#js-close-datasheet-modal",
    "datasheet-form"
  );

  setupModal(
    "js-open-callback-modal",
    "callback-modal",
    ".js-close-callback-modal",
    "callback-form"
  );
})();