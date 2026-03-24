const PAYLOAD = 'hydroclic_admin_gate_v1'

export const ADMIN_GATE_COOKIE = 'hydroclic_admin_gate'

export function getAdminGateSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.ADMIN_PASSWORD?.trim() ||
    ''
  )
}

export function isAdminGateConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD?.trim())
}

export async function computeAdminGateToken(secret: string): Promise<string> {
  if (!secret) return ''
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(PAYLOAD))
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('')
}

export function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}
