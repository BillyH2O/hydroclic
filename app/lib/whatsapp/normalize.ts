/**
 * Normalise un identifiant WhatsApp (chiffres uniquement, sans +).
 */
export function normalizeWaId(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  return digits
}
