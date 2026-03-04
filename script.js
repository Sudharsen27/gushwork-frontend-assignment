(function () {
  'use strict';

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
