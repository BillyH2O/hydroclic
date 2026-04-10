import { NextRequest, NextResponse } from 'next/server'
import { markOutboundReplyToCustomer } from '@/lib/db/whatsapp'
import { normalizeWaId } from '@/lib/whatsapp/normalize'
import { sendWhatsappTextMessage } from '@/lib/whatsapp/cloud'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Envoie un message texte au client et marque la conversation comme répondue (SLA).
 * Protégé par WHATSAPP_REPLY_SECRET (Authorization: Bearer …).
 */
export async function POST(request: NextRequest) {
  const secret = process.env.WHATSAPP_REPLY_SECRET
  const auth = request.headers.get('authorization')
  const bearer = auth?.startsWith('Bearer ') ? auth.slice('Bearer '.length) : null

  if (!secret || bearer !== secret) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  let body: { toWaId?: string; text?: string }
  try {
    body = (await request.json()) as { toWaId?: string; text?: string }
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 })
  }

  const toRaw = body.toWaId?.trim()
  const text = body.text?.trim()
  if (!toRaw || !text) {
    return NextResponse.json({ error: 'toWaId et text requis' }, { status: 400 })
  }

  const toWaId = normalizeWaId(toRaw)
  const sent = await sendWhatsappTextMessage({ toWaId, body: text })
  if (!sent.ok) {
    return NextResponse.json({ error: sent.error, status: sent.status }, { status: 502 })
  }

  await markOutboundReplyToCustomer({
    customerWaId: toWaId,
    repliedAt: new Date(),
  })

  return NextResponse.json({ ok: true, messageId: sent.messageId })
}
