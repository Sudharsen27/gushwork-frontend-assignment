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
})();
