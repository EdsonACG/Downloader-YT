export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return res.status(500).json({ error: 'BACKEND_URL não configurada na Vercel.' });
  }

  const { jobId } = req.query;

  // Redirect é usado para não travar no limite de payload de Vercel Functions em arquivos grandes.
  // A URL do backend não aparece no HTML nem na interface, mas pode aparecer para usuários avançados no DevTools durante o download.
  const tokenQuery = process.env.BACKEND_TOKEN ? `?token=${encodeURIComponent(process.env.BACKEND_TOKEN)}` : '';
  return res.redirect(302, `${backendUrl.replace(/\/$/, '')}/api/media/files/${encodeURIComponent(jobId)}${tokenQuery}`);
}
