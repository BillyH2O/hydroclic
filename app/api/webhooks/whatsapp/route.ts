import { NextRequest, NextResponse } from 'next/server'
import { verifyMetaWebhookSignature } from '@/lib/whatsapp/cloud'
import { handleWhatsappWebhookJson } from '@/lib/whatsapp/webhook'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * GET — vérification du webhook Meta (hub.verify_token, hub.challenge)
 * POST — événements WhatsApp Cloud API
 */
export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get('hub.mode')
  const token = request.nextUrl.searchParams.get('hub.verify_token')
  const challenge = request.nextUrl.searchParams.get('hub.challenge')

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN
  if (mode === 'subscribe' && token && verifyToken && token === verifyToken && challenge) {
    return new NextResponse(challenge, { status: 200 })
  }

  return new NextResponse('Forbidden', { status: 403 })
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const signature = request.headers.get('x-hub-signature-256')

  const ok = verifyMetaWebhookSignature(
    rawBody,
    signature,
    process.env.WHATSAPP_APP_SECRET
  )
  if (!ok) {
    return NextResponse.json({ error: 'Signature invalide' }, { status: 401 })
  }

  let json: unknown
  try {
    json = JSON.parse(rawBody) as unknown
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 })
  }

  try {
    await handleWhatsappWebhookJson(json)
  } catch (e) {
    console.error('[webhooks/whatsapp]', e)
    return NextResponse.json({ error: 'Traitement échoué' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
