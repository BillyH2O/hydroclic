import { Product } from './product'
import type { DeliveryMethod } from '@/lib/constants/delivery'

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
  deliveryMethod: DeliveryMethod
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

