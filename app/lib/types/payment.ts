import { Product } from './product'

/**
 * Types pour le système de paiement
 */

export interface CartItem {
  product: Product
  quantity: number
}

export interface CheckoutSessionData {
  items: CartItem[]
  customerEmail?: string
  customerId?: string
  successUrl: string
  cancelUrl: string
}

export interface StripeCheckoutSession {
  id: string
  url: string
}

export interface PaymentMetadata {
  userId?: string
  orderId?: string
  [key: string]: string | undefined
}

