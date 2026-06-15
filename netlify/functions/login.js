exports.handler = async function(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    let username, password;
    try {
        const body = JSON.parse(event.body);
        username = (body.username || '').trim().toLowerCase();
        password = body.password || '';
    } catch {
        return { statusCode: 400, body: JSON.stringify({ success: false }) };
    }

    const users = {
        smok: process.env.PASSWORD_SMOK,
        kurs: process.env.PASSWORD_KURS,
    };

    const stored = users[username];
    if (stored && stored === password) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true, user: username })
        };
    }

    return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false })
    };
};