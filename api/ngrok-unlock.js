export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return res.status(500).json({ error: 'BACKEND_URL não configurada na Vercel.' });
  }

  const host = req.headers.host;
  const protocol = host && host.includes('localhost') ? 'http' : 'https';
  const returnUrl = `${protocol}://${host}/?ngrok_unlocked=1`;

  const target = `${backendUrl.replace(/\/$/, '')}/ngrok-unlock?return_url=${encodeURIComponent(returnUrl)}`;
  return res.redirect(302, target);
}
