// Deploy this file as a Cloudflare Worker, then paste its URL into Black Eye's
// "API 연결 주소" field. The user keeps their own NVIDIA key in their browser.
const NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type, Accept',
};

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('POST only', { status: 405, headers: cors });

    const authorization = request.headers.get('Authorization');
    if (!authorization?.startsWith('Bearer ')) return Response.json({ message: 'NVIDIA API key is required.' }, { status: 401, headers: cors });
    const response = await fetch(NVIDIA_URL, {
      method: 'POST',
      headers: { 'Authorization': authorization, 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: request.body,
    });
    return new Response(response.body, { status: response.status, headers: { ...cors, 'Content-Type': response.headers.get('Content-Type') || 'application/json' } });
  },
};
