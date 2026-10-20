// ==== Theme toggle (dark default). The header stays white always; only the body theme switches. ====
(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
  }
  var saved = null;
  try { saved = window.localStorage.getItem('ge-theme'); } catch (e) { /* unavailable in some previews, that is fine */ }
  applyTheme(saved === 'light' ? 'light' : 'dark');

  toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { window.localStorage.setItem('ge-theme', next); } catch (e) { /* ignore */ }
  });
})();

// ==== Mobile menu (lives outside <header> on purpose: header uses no blur itself now, but
// keeping the menu as a sibling avoids any future containing-block surprises). ====
(function () {
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  function closeMenu() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); }
  function openMenu() { menu.classList.add('open'); toggle.setAttribute('aria-expanded', 'true'); document.body.classList.add('menu-open'); }
  toggle.addEventListener('click', function (e) { e.stopPropagation(); menu.classList.contains('open') ? closeMenu() : openMenu(); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('click', function (e) { if (menu.classList.contains('open') && !menu.contains(e.target) && e.target !== toggle) closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu(); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1100 && menu.classList.contains('open')) closeMenu(); });
})();

// ==== Sliding, swipeable, auto-advancing photo gallery (mobile only; desktop keeps a static grid). ====
(function () {
  document.querySelectorAll('.gallery').forEach(function (gallery) {
    var track = gallery.querySelector('.gallery-track');
    var slides = track ? track.querySelectorAll('figure') : [];
    var dots = gallery.querySelectorAll('.gallery-dots .dot');
    if (!track || slides.length < 2) return;
    var total = slides.length, index = 0, timer;

    function render() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === index); });
    }
    function goTo(i) { index = (i + total) % total; render(); }
    function next() { goTo(index + 1); }
    function startAuto() { timer = setInterval(next, 3800); }
    function resetAuto() { clearInterval(timer); startAuto(); }
    startAuto();

    var startX = 0, deltaX = 0, dragging = false;
    track.addEventListener('touchstart', function (e) { dragging = true; startX = e.touches[0].clientX; deltaX = 0; clearInterval(timer); }, { passive: true });
    track.addEventListener('touchmove', function (e) { if (dragging) deltaX = e.touches[0].clientX - startX; }, { passive: true });
    track.addEventListener('touchend', function () {
      if (!dragging) return;
      dragging = false;
      if (deltaX < -40) next(); else if (deltaX > 40) goTo(index - 1);
      resetAuto();
    });
  });
})();

// ==== Enquiry confirmation modal + form submission (Formspree) ====
(function () {
  var modal = document.getElementById('enquiryModal');
  if (!modal) return;
  var modalIcon = document.getElementById('modalIcon');
  var modalTitle = document.getElementById('modalTitle');
  var modalBody = document.getElementById('modalBody');
  var modalClose = document.getElementById('modalClose');

  var CHECK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  var ALERT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>';

  function openModal(kind) {
    if (kind === 'success') {
      modalIcon.innerHTML = CHECK_ICON;
      modalTitle.textContent = 'Enquiry received';
      modalBody.textContent = 'Thank you for reaching out. Your enquiry has been received, and a member of our team will get back to you shortly.';
    } else {
      modalIcon.innerHTML = ALERT_ICON;
      modalTitle.textContent = "We couldn't send that";
      modalBody.innerHTML = 'Something went wrong on our end. Please reach us directly at <a href="mailto:info@gregenergyng.com">info@gregenergyng.com</a> and we will take it from there.';
    }
    modal.classList.add('open');
  }
  function closeModal() { modal.classList.remove('open'); }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  var form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // honeypot: if a bot filled the hidden field, silently drop the submission
      var hp = form.querySelector('input[name="_gotcha"]');
      if (hp && hp.value) { form.reset(); openModal('success'); return; }

      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) { openModal(res.ok ? 'success' : 'error'); if (res.ok) form.reset(); })
        .catch(function () { openModal('error'); })
        .finally(function () { btn.textContent = original; btn.disabled = false; });
    });
  }
})();
