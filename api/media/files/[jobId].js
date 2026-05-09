export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) return res.status(500).json({ error: 'BACKEND_URL não configurada na Vercel.' });
  const { jobId } = req.query;
  const tokenQuery = process.env.BACKEND_TOKEN ? `?token=${encodeURIComponent(process.env.BACKEND_TOKEN)}` : '';
  const fileUrl = `${backendUrl.replace(/\/$/, '')}/api/media/files/${encodeURIComponent(jobId)}${tokenQuery}`;
  return res.redirect(302, fileUrl);
}
