export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) return res.status(500).json({ error: 'BACKEND_URL não configurada na Vercel.' });
  try {
    const upstream = await fetch(`${backendUrl.replace(/\/$/, '')}/api/media/info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true', ...(process.env.BACKEND_TOKEN ? { 'X-Backend-Token': process.env.BACKEND_TOKEN } : {}) },
      body: JSON.stringify(req.body)
    });
    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    return res.send(text);
  } catch (error) {
    return res.status(502).json({ error: 'Falha ao buscar informações.', detail: String(error?.message || error) });
  }
}
