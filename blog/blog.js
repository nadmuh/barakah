/* Blog page behavior: same nav/progress/mobile-menu logic as the home page. */
(function () {
  var nav = document.getElementById('nav');
  var bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', function () {
    var max = document.body.scrollHeight - window.innerHeight;
    if (bar && max > 0) bar.style.width = (window.scrollY / max * 100) + '%';
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var mq = window.matchMedia('(prefers-color-scheme: light)');
  var fav = document.getElementById('favicon');
  function setFav(e) { if (fav) fav.href = e.matches ? '/favicon-light.png' : '/favicon-dark.png'; }
  setFav(mq);
  if (mq.addEventListener) mq.addEventListener('change', setFav);
})();
