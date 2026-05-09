COMO PUBLICAR NO VERCEL SEM MOSTRAR O BACKEND NO HTML

1) Suba seu backend Python em um servidor público HTTPS:
   Exemplo:
   https://meu-backend.onrender.com

2) No backend, use o arquivo app_backend_oculto_ready.py desta resposta.
   Renomeie para app.py.

3) No painel da Vercel:
   Project > Settings > Environment Variables

   Crie:
   BACKEND_URL=https://sua-url-do-backend.com
   BACKEND_TOKEN=uma_senha_grande_qualquer

4) No servidor do backend, configure a mesma variável:
   BACKEND_TOKEN=uma_senha_grande_qualquer

5) Faça deploy desta pasta no Vercel.

Observação importante:
- O backend não aparece no HTML nem na interface.
- O front chama somente /api/media/jobs e /api/media/status.
- Para baixar arquivos grandes, a rota de download faz redirect para o backend, porque Vercel Functions têm limite de payload.
- Para esconder o backend até no DevTools durante o download, use Cloudflare Worker/Tunnel, VPS com reverse proxy ou storage de arquivos com links assinados.
