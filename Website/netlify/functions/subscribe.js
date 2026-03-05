exports.handler = async function (event) {
  console.log('Function hit:', event.httpMethod, event.path);
  console.log('Body received:', event.body);

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    if (!event.body) {
      console.log('No body received');
      return { statusCode: 400, body: JSON.stringify({ error: 'No body' }) };
    }

    const { email } = JSON.parse(event.body);
    console.log('Email parsed:', email);

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email required' }) };
    }

    const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
    const BEEHIIV_PUB_ID = process.env.BEEHIIV_PUB_ID;

    console.log('Pub ID present:', !!BEEHIIV_PUB_ID);
    console.log('API Key present:', !!BEEHIIV_API_KEY);

    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'website',
          utm_medium: 'waitlist_form'
        })
      }
    );

    const data = await response.json();
    console.log('Beehiiv status:', response.status);
    console.log('Beehiiv response:', JSON.stringify(data));

    if (response.ok) {
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ success: true })
      };
    } else {
      return {
        statusCode: response.status,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: data })
      };
    }

  } catch (err) {
    console.log('Error:', err.message);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
