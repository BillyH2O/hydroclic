import { NextRequest, NextResponse } from 'next/server'
import { runWhatsappSlaAlerts } from '@/lib/whatsapp/webhook'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * À appeler périodiquement (ex. Vercel Cron) pour envoyer les alertes SLA.
 * Header: Authorization: Bearer <CRON_SECRET>
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  const auth = request.headers.get('authorization')
  const bearer = auth?.startsWith('Bearer ') ? auth.slice('Bearer '.length) : null

  if (!secret || bearer !== secret) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const result = await runWhatsappSlaAlerts()
  return NextResponse.json(result)
}
