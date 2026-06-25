import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();

const {
  WHATSAPP_ACCESS_TOKEN,
  WHATSAPP_PHONE_NUMBER_ID,
  CLIENT_ORIGIN = 'http://localhost:5173',
  PORT = 4000
} = process.env;

if (!WHATSAPP_ACCESS_TOKEN) throw new Error('Missing WHATSAPP_ACCESS_TOKEN in environment');
if (!WHATSAPP_PHONE_NUMBER_ID) throw new Error('Missing WHATSAPP_PHONE_NUMBER_ID in environment');

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true
  })
);

app.use(express.json({ limit: '1mb' }));

// Keep uploads in memory so we can immediately forward to WhatsApp Cloud API.
const upload = multer({ storage: multer.memoryStorage(), limits: { files: 10 } });

function whatsappUrl(path) {
  return `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_NUMBER_ID}${path}`;
}

async function uploadMedia({ fileBuffer, mimeType, filename }) {
  // WhatsApp Cloud API expects a multipart request to /media
  const form = new FormData();
  const blob = new Blob([fileBuffer], { type: mimeType });
  form.append('file', blob, filename);

  const res = await fetch(whatsappUrl('/media'), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`
    },
    body: form
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`WhatsApp media upload failed: ${res.status} ${txt}`);
  }

  const data = await res.json();
  // Expected: { id: '...' }
  return data.id;
}

app.post('/api/whatsapp/inquiry', upload.array('images', 10), async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Missing message' });
    }

    const files = req.files || [];

    // Upload each image to WhatsApp and collect media ids.
    const uploadedMediaIds = [];
    for (const f of files) {
      // WhatsApp Cloud API supports images as media; we assume client sends image/*.
      const mediaId = await uploadMedia({
        fileBuffer: f.buffer,
        mimeType: f.mimetype || 'image/jpeg',
        filename: f.originalname || 'image'
      });
      uploadedMediaIds.push(mediaId);
    }

    const firstText = {
      type: 'text',
      text: message
    };

    // If images exist, send them as separate messages.
    // (WhatsApp Cloud API media messages are easiest to manage as individual sends.)
    // We still send the text message too.
    const sendCalls = [];

    sendCalls.push(
      fetch(whatsappUrl('/messages'), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: req.body.to, // expect full E.164 in req.body.to
          type: 'text',
          text: firstText.text
        })
      })
    );

    for (const mediaId of uploadedMediaIds) {
      sendCalls.push(
        fetch(whatsappUrl('/messages'), {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: req.body.to,
            type: 'image',
            image: { id: mediaId, caption: '' }
          })
        })
      );
    }

    const results = await Promise.all(sendCalls.map(async (p) => {
      const r = await p;
      const t = await r.text().catch(() => '');
      if (!r.ok) throw new Error(`WhatsApp send failed: ${r.status} ${t}`);
      return t;
    }));

    return res.json({ ok: true, sent: results.length, mediaCount: uploadedMediaIds.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err?.message || 'Unknown error' });
  }
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`WhatsApp server listening on :${PORT}`);
});

