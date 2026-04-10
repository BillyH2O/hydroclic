import { prisma } from '@/lib/prisma'

export const STORE_SETTINGS_ID = 'default' as const

export function shippingFeeFallbackFromEnvEur(): number {
  const cents = parseInt(process.env.STRIPE_SHIPPING_CENTS ?? '0', 10)
  if (!Number.isFinite(cents) || cents < 0) return 0
  return cents / 100
}

export type ResolvedShippingRules = {
  freeShippingThresholdEur: number | null
  shippingFeeEur: number
}

/**
 * Règles effectives : ligne BDD ou repli sur STRIPE_SHIPPING_CENTS pour les frais.
 */
export async function getResolvedStoreShipping(): Promise<ResolvedShippingRules> {
  const row = await prisma.storeSettings.findUnique({
    where: { id: STORE_SETTINGS_ID },
  })
  return {
    freeShippingThresholdEur: row?.freeShippingThresholdEur ?? null,
    shippingFeeEur: row?.shippingFeeEur ?? shippingFeeFallbackFromEnvEur(),
  }
}

/** Montant livraison (€) pour un sous-total panier (€), livraison à domicile uniquement. */
export function computeShippingEuros(
  cartSubtotalEur: number,
  rules: ResolvedShippingRules
): number {
  if (
    rules.freeShippingThresholdEur != null &&
    cartSubtotalEur >= rules.freeShippingThresholdEur
  ) {
    return 0
  }
  return Math.max(0, rules.shippingFeeEur)
}
