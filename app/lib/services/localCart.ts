import { CartItem } from '@/lib/types/payment'
import { Product } from '@/lib/types/product'

const CART_STORAGE_KEY = 'hydroclic_cart'

/**
 * Service pour gérer le panier côté client (localStorage)
 */
export class LocalCartService {
  /**
   * Récupère le panier depuis localStorage
   */
  static getCart(): CartItem[] {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (!stored) return []
      
      const items = JSON.parse(stored) as CartItem[]
      // Valider que les items ont la structure correcte
      return items.filter(item => item.product && item.quantity > 0)
    } catch (error) {
      console.error('Error reading cart from localStorage:', error)
      return []
    }
  }

  /**
   * Sauvegarde le panier dans localStorage
   */
  static saveCart(items: CartItem[]): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }

  /**
   * Ajoute un produit au panier local
   */
  static addToCart(product: Product, quantity: number = 1): CartItem[] {
    const items = this.getCart()
    const existingIndex = items.findIndex(item => item.product.id === product.id)

    if (existingIndex >= 0) {
      // Mettre à jour la quantité si le produit existe déjà
      items[existingIndex].quantity += quantity
    } else {
      // Ajouter un nouvel item
      items.push({ product, quantity })
    }

    this.saveCart(items)
    return items
  }

  /**
   * Met à jour la quantité d'un produit dans le panier local
   */
  static updateQuantity(productId: string, quantity: number): CartItem[] {
    const items = this.getCart()
    
    if (quantity <= 0) {
      return this.removeFromCart(productId)
    }

    const itemIndex = items.findIndex(item => item.product.id === productId)
    if (itemIndex >= 0) {
      items[itemIndex].quantity = quantity
      this.saveCart(items)
    }

    return items
  }

  /**
   * Retire un produit du panier local
   */
  static removeFromCart(productId: string): CartItem[] {
    const items = this.getCart().filter(item => item.product.id !== productId)
    this.saveCart(items)
    return items
  }

  /**
   * Vide le panier local
   */
  static clearCart(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  /**
   * Calcule le total du panier local
   */
  static getTotal(accountType?: 'particulier' | 'professionnel'): number {
    const items = this.getCart()
    
    return items.reduce((total, item) => {
      const price = accountType === 'professionnel' 
        ? item.product.priceB2B 
        : item.product.priceB2C
      return total + (price || 0) * item.quantity
    }, 0)
  }

  /**
   * Récupère le nombre total d'items dans le panier local
   */
  static getItemCount(): number {
    const items = this.getCart()
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  /**
   * Récupère les items du panier local au format CartItem[]
   */
  static getCartItems(): CartItem[] {
    return this.getCart()
  }
}
