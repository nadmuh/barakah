exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
    }

    const params = new URLSearchParams({
      xnQsjsdp:  'edbsnaffddad0503473fbf22efb50bc6b9565',
      xmIwtLD:   'edbsn7071e3f2fe32c3bd7d05014ea8f077d4fa1643bb0575591322de58b2fb504c6c',
      xJdfEaS:   '',
      actionType: 'Q2FzZXM=',
      returnURL:  'https://barakahtrading.co/contact',
      'Contact Name': name,
      Email:          email,
      Subject:        subject || '(No subject)',
      Description:    message
    });

    const res = await fetch('https://desk.zoho.com/support/WebToCase', {
      method:   'POST',
      headers:  { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:     params.toString(),
      redirect: 'manual'   // Zoho responds with a 302 redirect on success
    });

    // A 301/302 redirect to returnURL means Zoho accepted the ticket
    if (res.status === 301 || res.status === 302 || res.ok) {
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ success: true })
      };
    } else {
      console.log('Zoho WebToCase error, status:', res.status);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Zoho submission failed', status: res.status })
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
