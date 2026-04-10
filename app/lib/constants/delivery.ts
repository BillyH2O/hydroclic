export type DeliveryMethod = 'home' | 'pickup'

export const PICKUP_LOCATION_SUMMARY_LINES = [
  'Retrait au dépôt (click & collect)',
  '86 boulevard Félix Faure',
  '93300 Aubervilliers',
] as const

export function pickupShippingSummaryText(): string {
  return PICKUP_LOCATION_SUMMARY_LINES.join('\n')
}

/** Snapshot stocké en commande (Prisma JSON) pour les retraits */
export function pickupShippingAddressSnapshot() {
  return {
    type: 'pickup' as const,
    name: 'Hydroclic — Dépôt',
    address: {
      line1: '86 boulevard Félix Faure',
      line2: null as string | null,
      city: 'Aubervilliers',
      postal_code: '93300',
      state: null as string | null,
      country: 'FR',
    },
  }
}

export function parseDeliveryMethod(raw: unknown): DeliveryMethod {
  return raw === 'pickup' ? 'pickup' : 'home'
}
