async function handleContact(e) {
  e.preventDefault();
  const btn = document.getElementById('contact-btn');
  const name    = document.getElementById('contact-name').value;
  const email   = document.getElementById('contact-email').value;
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('/.netlify/functions/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, subject, message })
    });

    const data = await res.json();

    if (data.success) {
      document.getElementById('contact-success').style.display = 'block';
      e.target.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
    } else {
      btn.textContent = 'Try Again';
      btn.disabled = false;
    }
  } catch (err) {
    console.log('Error:', err);
    btn.textContent = 'Try Again';
    btn.disabled = false;
  }
}
