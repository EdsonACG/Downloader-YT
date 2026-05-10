export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (process.env.ADMIN_PASSWORD && req.headers['x-admin-password'] !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Senha admin inválida.' });
  }
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) return res.status(500).json({ error: 'BACKEND_URL não configurada na Vercel.' });
  const upstream = await fetch(`${backendUrl.replace(/\/$/, '')}/api/admin/cleanup`, {
    method: 'POST',
    headers: { 'ngrok-skip-browser-warning': 'true', ...(process.env.BACKEND_TOKEN ? { 'X-Backend-Token': process.env.BACKEND_TOKEN } : {}) }
  });
  const text = await upstream.text();
  res.status(upstream.status);
  res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
  return res.send(text);
}
