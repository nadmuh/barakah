exports.handler = async function (event) {
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
    const { email, firstName, lastName, phone } = JSON.parse(event.body || '{}');

    if (!email || !firstName || !lastName || !phone) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ status: 'error', message: 'All fields are required.' })
      };
    }

    const params = new URLSearchParams({
      CONTACT_EMAIL: email,
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      PHONE: phone,
      recapTheme: '2',
      isRecapIntegDone: 'false',
      recapMode: '1634770000000054270',
      zc_trackCode: 'ZCFORMVIEW',
      viewFrom: 'URL_ACTION',
      submitType: 'optinCustomView',
      lD: '116afdea75377f2f3',
      emailReportId: '',
      zx: '136e8002d',
      zcvers: '3.0',
      oldListIds: '',
      mode: 'OptinCreateView',
      zcld: '116afdea75377f2f3',
      zctd: '116afdea75377db89',
      document_domain: 'campaigns.zoho.com',
      zc_Url: 'zgnp-zngp.maillist-manage.com',
      new_optin_response_in: '2',
      duplicate_optin_response_in: '2',
      zc_formIx: '3zac646cc79c3760aba5db5c4d29d57eebe3e484f89957306e7d0e94ae62c60639',
      scriptless: 'yes',
      zc_spmSubmit: 'ZCSPMSUBMIT',
      fieldBorder: '',
      isCaptchaNeeded: 'false',
      superAdminCap: '0'
    });

    // Use redirect:'follow' (default) so we land on Zoho's final response page.
    // redirect:'manual' returns an opaque-redirect with status:0 per the WHATWG spec,
    // making the Location header and status code inaccessible.
    const response = await fetch('https://zgnp-zngp.maillist-manage.com/weboptin.zc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: params.toString()
    });

    const finalUrl = (response.url || '').toLowerCase();
    const html = (await response.text()).toLowerCase();

    console.log('Zoho HTTP status:', response.status);
    console.log('Zoho final URL:', finalUrl);
    console.log('Zoho HTML snippet:', html.slice(0, 400));

    let status = 'error';

    // Duplicate check first (order matters — success strings may also appear on duplicate pages)
    if (
      finalUrl.includes('duplicate') ||
      finalUrl.includes('already') ||
      html.includes('already subscribed') ||
      html.includes('already registered') ||
      html.includes('duplicate') ||
      html.includes('email id already exists')
    ) {
      status = 'duplicate';
    } else if (
      response.ok &&
      (
        finalUrl.includes('sub_success') ||
        finalUrl.includes('success') ||
        html.includes('thank you for signing up') ||
        html.includes('successfully subscribed') ||
        html.includes('thank you') ||
        html.includes('signing up') ||
        // Zoho's inline success div id
        html.includes('zc_signupsuccess')
      )
    ) {
      status = 'success';
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    };

  } catch (err) {
    console.error('zoho-subscribe error:', err.message);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ status: 'error', message: 'Something went wrong. Please try again.' })
    };
  }
};
