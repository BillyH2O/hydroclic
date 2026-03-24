import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import { timingSafeEqual } from 'node:crypto'
import {
  ADMIN_GATE_COOKIE,
  computeAdminGateToken,
  getAdminGateSecret,
  isAdminGateConfigured,
} from '@/lib/admin/gate'

function safeComparePassword(a: string, b: string): boolean {
  const ba = Buffer.from(a, 'utf8')
  const bb = Buffer.from(b, 'utf8')
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}

export async function POST(request: NextRequest) {
  if (!isAdminGateConfigured()) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD is not set in environment.' },
      { status: 503 },
    )
  }

  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Non authentifie' }, { status: 401 })
  }

  const expected = process.env.ADMIN_PASSWORD!.trim()
  let body: { password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const submitted = typeof body.password === 'string' ? body.password : ''
  if (!safeComparePassword(submitted, expected)) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  const secret = getAdminGateSecret()
  const token = await computeAdminGateToken(secret)
  const jar = await cookies()
  jar.set(ADMIN_GATE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Non authentifie' }, { status: 401 })
  }

  const jar = await cookies()
  jar.delete(ADMIN_GATE_COOKIE)

  return NextResponse.json({ ok: true })
}
