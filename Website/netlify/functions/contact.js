exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
    }

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '9e7eef87-14da-44ac-accc-9a0ecd33029d',
        name: name,
        email: email,
        subject: subject,
        message: message,
        from_name: 'Barakah Trading Contact Form'
      })
    });

    const data = await res.json();

    if (data.success) {
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ success: true })
      };
    } else {
      console.log('Web3Forms error:', JSON.stringify(data));
      return {
        statusCode: 500,
        body: JSON.stringify({ error: data })
      };
    }

  } catch (err) {
    console.log('Error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
