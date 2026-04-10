import crypto from 'node:crypto'

const GRAPH_VERSION = 'v21.0'

export function verifyMetaWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  appSecret: string | undefined
): boolean {
  if (!appSecret) {
    return process.env.NODE_ENV !== 'production'
  }
  if (!signatureHeader?.startsWith('sha256=')) {
    return false
  }
  const received = signatureHeader.slice('sha256='.length).trim()
  const expected = crypto
    .createHmac('sha256', appSecret)
    .update(rawBody, 'utf8')
    .digest('hex')
  try {
    const a = Buffer.from(received, 'hex')
    const b = Buffer.from(expected, 'hex')
    if (a.length !== b.length) {
      return false
    }
    return crypto.timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export type SendTextResult =
  | { ok: true; messageId?: string }
  | { ok: false; error: string; status?: number }

export async function sendWhatsappTextMessage(params: {
  toWaId: string
  body: string
}): Promise<SendTextResult> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const token = process.env.WHATSAPP_ACCESS_TOKEN
  if (!phoneNumberId || !token) {
    return { ok: false, error: 'WHATSAPP_PHONE_NUMBER_ID ou WHATSAPP_ACCESS_TOKEN manquant' }
  }

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: params.toWaId,
      type: 'text',
      text: { body: params.body },
    }),
  })

  const json = (await res.json().catch(() => ({}))) as {
    messages?: { id?: string }[]
    error?: { message?: string }
  }

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      error: json.error?.message || res.statusText || 'Erreur envoi WhatsApp',
    }
  }

  const messageId = json.messages?.[0]?.id
  return { ok: true, messageId }
}
