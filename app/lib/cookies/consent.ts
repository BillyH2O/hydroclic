export const CONSENT_STORAGE_KEY = 'hydroclic_cookie_consent'
export const CONSENT_COOKIE_NAME = 'hydroclic_cookie_consent'
export const CONSENT_VERSION = 1
export const CONSENT_EVENT = 'hydroclic:cookie-consent'

export type CookieConsent = {
  version: number
  necessary: true
  analytics: boolean
  decidedAt: string
}

export function parseConsent(raw: string | null | undefined): CookieConsent | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsent>
    if (parsed.version !== CONSENT_VERSION) return null
    if (parsed.necessary !== true) return null
    if (typeof parsed.analytics !== 'boolean') return null
    if (typeof parsed.decidedAt !== 'string') return null
    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: parsed.analytics,
      decidedAt: parsed.decidedAt,
    }
  } catch {
    return null
  }
}

export function getStoredConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY))
}

export function persistConsent(analytics: boolean): CookieConsent {
  const consent: CookieConsent = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    decidedAt: new Date().toISOString(),
  }
  const payload = JSON.stringify(consent)
  window.localStorage.setItem(CONSENT_STORAGE_KEY, payload)
  const maxAge = 60 * 60 * 24 * 180
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(payload)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }))
  return consent
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event('hydroclic:open-cookie-preferences'))
}
