import type Stripe from 'stripe'

/** Livraison : API Checkout récente (`collected_information`) ; repli runtime pour anciennes sessions. */
function checkoutShippingDetails(
  session: Stripe.Checkout.Session,
): Stripe.Checkout.Session.CollectedInformation.ShippingDetails | null {
  const fromCollected = session.collected_information?.shipping_details
  if (fromCollected) return fromCollected
  const legacy = (
    session as Stripe.Checkout.Session & {
      shipping_details?: Stripe.Checkout.Session.CollectedInformation.ShippingDetails | null
    }
  ).shipping_details
  return legacy ?? null
}

/** Pays autorisés pour la livraison (UE + CH + UK), ajustable via env si besoin */
export const DEFAULT_CHECKOUT_SHIPPING_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection['allowed_countries'] =
  [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
    'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'GB',
  ]

function linesFromStripeAddress(
  name: string | null | undefined,
  address: Stripe.Address | null | undefined,
): string[] {
  if (!address?.line1 && !address?.city) return []
  const out: string[] = []
  if (name?.trim()) out.push(name.trim())
  if (address.line1) out.push(address.line1)
  if (address.line2) out.push(address.line2)
  const cityLine = [address.postal_code, address.city].filter(Boolean).join(' ')
  if (cityLine) out.push(cityLine)
  if (address.state) out.push(address.state)
  if (address.country) out.push(address.country.toUpperCase())
  return out
}

/** Texte multi-lignes pour e-mail / logs (pas d’HTML) */
export function formatCheckoutAddressesForEmail(session: Stripe.Checkout.Session): {
  billingSummary: string
  shippingSummary: string
  customerPhone: string | undefined
} {
  const d = session.customer_details
  const billingLines = linesFromStripeAddress(d?.name, d?.address ?? undefined)
  const ship = checkoutShippingDetails(session)
  const shippingLines = linesFromStripeAddress(ship?.name, ship?.address ?? undefined)

  return {
    billingSummary: billingLines.length ? billingLines.join('\n') : '',
    shippingSummary: shippingLines.length ? shippingLines.join('\n') : '',
    customerPhone: d?.phone ?? undefined,
  }
}

/** Snapshots JSON pour Prisma (champs Json) */
export function checkoutAddressSnapshots(session: Stripe.Checkout.Session) {
  const d = session.customer_details
  return {
    customerPhone: d?.phone ?? null,
    billingAddress:
      d?.address || d?.name
        ? {
            name: d.name ?? null,
            phone: d.phone ?? null,
            email: d.email ?? null,
            address: d.address ?? null,
          }
        : null,
    shippingAddress: (() => {
      const ship = checkoutShippingDetails(session)
      return ship
        ? {
            name: ship.name ?? null,
            address: ship.address ?? null,
          }
        : null
    })(),
  }
}
