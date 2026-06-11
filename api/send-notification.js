export default async function handler(req, res) {
  // Configura cabeçalhos de CORS básicos
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Trata requisição OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Utilize POST.' });
  }

  const { title, message, url, image } = req.body;

  if (!title || !message) {
    return res.status(400).json({ error: 'Título (title) e Mensagem (message) são obrigatórios.' });
  }

  const appId = process.env.VITE_ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;

  if (!appId || !apiKey) {
    return res.status(500).json({
      error: 'Configuração incompleta no servidor Vercel. As variáveis VITE_ONESIGNAL_APP_ID e ONESIGNAL_REST_API_KEY são necessárias.'
    });
  }

  try {
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${apiKey}`
      },
      body: JSON.stringify({
        app_id: appId,
        included_segments: ['All'],
        headings: { en: title, pt: title },
        contents: { en: message, pt: message },
        url: url || '',
        chrome_web_image: image || '',
        big_picture: image || ''
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Erro retornado pela API do OneSignal',
        details: data
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Erro ao enviar push notification:', error);
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
}
