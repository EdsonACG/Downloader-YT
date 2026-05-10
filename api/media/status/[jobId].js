export default async function handler(req, res) {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) return res.status(500).json({ error: 'BACKEND_URL não configurada na Vercel.' });
  const { jobId } = req.query;
  try {
    const upstream = await fetch(`${backendUrl.replace(/\/$/, '')}/api/media/jobs/${encodeURIComponent(jobId)}`, {
      headers: { 'ngrok-skip-browser-warning': 'true', ...(process.env.BACKEND_TOKEN ? { 'X-Backend-Token': process.env.BACKEND_TOKEN } : {}) }
    });
    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    return res.send(text);
  } catch (error) {
    return res.status(502).json({ error: 'Falha ao consultar status.', detail: String(error?.message || error) });
  }
}
