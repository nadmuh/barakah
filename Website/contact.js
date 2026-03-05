async function handleContact(e) {
  e.preventDefault();
  const btn = document.getElementById('contact-btn');
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: '9e7eef87-14da-44ac-accc-9a0ecd33029d',
        name: name,
        email: email,
        subject: subject,
        message: message,
        from_name: 'Barakah Trading Contact Form',
        autoresponse: true,
        autoresponse_subject: 'We received your message — Barakah Trading',
        autoresponse_message: `Hi ${name},\n\nThank you for contacting Barakah Trading. This is a confirmation that we have received your message and a member of our team will review it shortly.\n\nYou can expect a response within 3 business days. We appreciate you taking the time to reach out and look forward to connecting with you.\n\nBest regards,\n\nThe Barakah Trading Team\n\nsupport@barakahtrading.co\n\nbarakahtrading.co`
      })
    });

    const data = await res.json();

    if (data.success) {
      document.getElementById('contact-success').style.display = 'block';
      e.target.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
    } else {
      console.log('Error:', data);
      btn.textContent = 'Try Again';
      btn.disabled = false;
    }
  } catch (err) {
    console.log('Error:', err);
    btn.textContent = 'Try Again';
    btn.disabled = false;
  }
}
