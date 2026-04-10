import { NextResponse } from 'next/server'
import { getResolvedStoreShipping } from '@/lib/db/storeSettings'

export const dynamic = 'force-dynamic'

/** Règles de livraison (public) pour affichage panier — pas de données sensibles */
export async function GET() {
  const rules = await getResolvedStoreShipping()
  return NextResponse.json({
    freeShippingThresholdEur: rules.freeShippingThresholdEur,
    shippingFeeEur: rules.shippingFeeEur,
  })
}
