import Stripe from 'stripe'
import { CartItem, CheckoutSessionData, PaymentMetadata } from '@/lib/types/payment'
import { DEFAULT_CHECKOUT_SHIPPING_COUNTRIES } from '@/lib/stripe/checkoutAddresses'
import type { DeliveryMethod } from '@/lib/constants/delivery'
import {
  computeShippingEuros,
  getResolvedStoreShipping,
} from '@/lib/db/storeSettings'

/**
 * Service pour gérer les paiements Stripe
 */
export class PaymentService {
  private static stripe: Stripe | null = null

  /**
   * Initialise le client Stripe
   */
  private static getStripe(): Stripe {
    if (!this.stripe) {
      let secretKey = process.env.STRIPE_SECRET_KEY?.trim()
      if (secretKey?.startsWith('"') && secretKey.endsWith('"')) {
        secretKey = secretKey.slice(1, -1).trim()
      }
      if (secretKey?.startsWith("'") && secretKey.endsWith("'")) {
        secretKey = secretKey.slice(1, -1).trim()
      }
      if (!secretKey) {
        throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
      }
      if (!secretKey.startsWith('sk_')) {
        throw new Error(
          'STRIPE_SECRET_KEY doit commencer par sk_test_ ou sk_live_ (clé secrète, pas la clé publique pk_)',
        )
      }
      this.stripe = new Stripe(secretKey, {
        apiVersion: '2025-11-17.clover',
      })
    }
    return this.stripe
  }

  /**
   * Crée une session de checkout Stripe
   */
  static async createCheckoutSession(
    data: CheckoutSessionData,
    metadata?: PaymentMetadata
  ): Promise<{ sessionId: string; url: string }> {
    const stripe = this.getStripe()

    // Convertir les items du panier en line items Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = data.items.map((item) => {
      const product = item.product
      // Utiliser le prix calculé (qui prend en compte le type de compte) ou fallback sur priceB2C
      const price = product.price || product.priceB2C || 0
      const name = product.name
      const description = product.description || product.imageAlt || undefined
      
      // Convertir l'URL relative en URL absolue pour Stripe
      let imageUrl: string[] | undefined = undefined
      if (product.image) {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        const fullImageUrl = product.image.startsWith('http') 
          ? product.image 
          : `${baseUrl}${product.image}`
        imageUrl = [fullImageUrl]
      }

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name,
            description,
            images: imageUrl,
          },
          unit_amount: Math.round(price * 100), // Convertir en centimes
        },
        quantity: item.quantity,
      }
    })

    // Convertir les métadonnées pour Stripe (filtrer les undefined)
    const stripeMetadata: Stripe.MetadataParam = {}
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          stripeMetadata[key] = value
        }
      })
    }

    const deliveryMethod: DeliveryMethod = data.deliveryMethod
    const isPickup = deliveryMethod === 'pickup'

    const cartSubtotalEur = data.items.reduce((sum, item) => {
      const price = item.product.price || item.product.priceB2C || 0
      return sum + price * item.quantity
    }, 0)

    const shippingRules = await getResolvedStoreShipping()
    const shippingEuro = !isPickup
      ? computeShippingEuros(cartSubtotalEur, shippingRules)
      : 0
    const shippingCents = Math.round(Math.max(0, shippingEuro) * 100)

    const baseShippingLabel =
      process.env.STRIPE_SHIPPING_LABEL?.trim() || 'Livraison standard (France / UE)'
    const shippingLabel =
      !isPickup && shippingCents === 0 ? 'Livraison offerte' : baseShippingLabel

    // Créer la session de checkout (e-commerce : facturation, livraison ou click & collect, téléphone)
    // customer_creation: 'always' → un Customer Stripe existe après paiement, nécessaire pour
    // créer une Invoice + PDF dans le webhook et inclure le lien dans l’e-mail de confirmation.
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_creation: 'always',
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      customer_email: data.customerEmail,
      metadata: Object.keys(stripeMetadata).length > 0 ? stripeMetadata : undefined,
      locale: 'fr',
      currency: 'eur',
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      invoice_creation: {
        enabled: true,
      },
    }

    if (!isPickup) {
      sessionParams.shipping_address_collection = {
        allowed_countries: DEFAULT_CHECKOUT_SHIPPING_COUNTRIES,
      }
      sessionParams.shipping_options = [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: shippingLabel,
            fixed_amount: {
              amount: shippingCents,
              currency: 'eur',
            },
          },
        },
      ]
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return {
      sessionId: session.id,
      url: session.url || '',
    }
  }

  /**
   * Récupère une session de checkout
   */
  static async getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    const stripe = this.getStripe()
    return await stripe.checkout.sessions.retrieve(sessionId)
  }

  /**
   * Récupère le client Stripe (méthode publique pour utilisation dans les webhooks)
   */
  static getStripeClient(): Stripe {
    return this.getStripe()
  }

  /**
   * Vérifie la signature du webhook
   */
  static verifyWebhookSignature(
    payload: string | Buffer,
    signature: string
  ): Stripe.Event {
    const stripe = this.getStripe()
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not set in environment variables')
    }

    return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  }

  /**
   * Calcule le total du panier
   */
  static calculateCartTotal(items: CartItem[]): number {
    return items.reduce((total, item) => {
      const price = item.product.priceB2C || item.product.price || 0
      return total + price * item.quantity
    }, 0)
  }
}

