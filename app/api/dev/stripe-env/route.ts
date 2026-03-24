import { NextResponse } from 'next/server'

/**
 * Dev uniquement : indique si STRIPE_SECRET_KEY est chargée (sans exposer la clé).
 */
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const raw = process.env.STRIPE_SECRET_KEY
  const trimmed =
    raw
      ?.replace(/^\ufeff/, '')
      .trim()
      .replace(/^["']|["']$/g, '') ?? ''
  const looksValid = trimmed.startsWith('sk_') && trimmed.length > 20

  return NextResponse.json({
    configured: Boolean(raw?.trim()),
    looksValid,
    prefix: trimmed ? `${trimmed.slice(0, 7)}…` : null,
    length: trimmed.length,
  })
}
