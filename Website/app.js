async function handleSignup(e, successId) {
    e.preventDefault();

    const inputId = successId === 'hero-success' ? 'hero-email' : 'cta-email';
    const emailInput = document.getElementById(inputId);
    const email = emailInput.value.trim();
    const successEl = document.getElementById(successId);
    const btn = e.target.querySelector('button[type="submit"]') || e.target.querySelector('button');

    if (!email) return;
    if (!btn) return;

    btn.disabled = true;
    btn.textContent = 'Submitting...';

    try {
      const res = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      });
      const data = await res.json();
      successEl.style.display = 'block';
      emailInput.value = '';
      btn.textContent = "You're in!";
      btn.style.background = '#3ECF8E';
      btn.style.color = '#0A0A0A';
    } catch (err) {
      successEl.style.display = 'block';
      emailInput.value = '';
      btn.textContent = "You're in!";
      btn.style.background = '#3ECF8E';
      btn.style.color = '#0A0A0A';
    }
  }

  function scrollToWaitlist() {
    document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .tier-card, .step, .solution-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });