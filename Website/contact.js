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
    // Send to your inbox via Web3Forms
    const formRes = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: '9e7eef87-14da-44ac-accc-9a0ecd33029d',
        name: name,
        email: email,
        subject: subject,
        message: message,
        from_name: 'Barakah Trading'
      })
    });

    const formData = await formRes.json();

    // Send autoresponse to user via EmailJS
    await emailjs.send('service_g0a85pq', 'template_95fttz5', {
      name: name,
      email: email,
      subject: subject,
      message: message
    }, 'dDEwVUxlVYRDqI97X');

    if (formData.success) {
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
