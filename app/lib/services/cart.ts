import { CartItem as CartItemType } from '@/lib/types/payment'
import { Product } from '@/lib/types/product'
import { prisma } from '../prisma'

/**
 * Service pour gérer le panier
 */
export class CartService {
  /**
   * Récupère ou crée un panier pour un utilisateur
   */
  static async getOrCreateCart(userId: string) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })
    }

    return cart
  }

  /**
   * Ajoute un produit au panier
   */
  static async addToCart(userId: string, productId: string, quantity: number = 1) {
    const cart = await this.getOrCreateCart(userId)

    // Vérifier si le produit existe déjà dans le panier
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    })

    if (existingItem) {
      // Mettre à jour la quantité
      return await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
        include: {
          product: true,
        },
      })
    } else {
      // Créer un nouvel item
      return await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
        include: {
          product: true,
        },
      })
    }
  }

  /**
   * Met à jour la quantité d'un produit dans le panier
   */
  static async updateCartItemQuantity(userId: string, productId: string, quantity: number) {
    const cart = await this.getOrCreateCart(userId)

    if (quantity <= 0) {
      return await this.removeFromCart(userId, productId)
    }

    return await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      data: { quantity },
      include: {
        product: true,
      },
    })
  }

  /**
   * Retire un produit du panier
   */
  static async removeFromCart(userId: string, productId: string) {
    const cart = await this.getOrCreateCart(userId)

    return await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    })
  }

  /**
   * Vide le panier
   */
  static async clearCart(userId: string) {
    const cart = await this.getOrCreateCart(userId)

    return await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })
  }

  /**
   * Récupère les items du panier au format CartItem[]
   */
  static async getCartItems(userId: string): Promise<CartItemType[]> {
    const cart = await this.getOrCreateCart(userId)

    return cart.items.map((item) => ({
      product: item.product as unknown as Product,
      quantity: item.quantity,
    }))
  }

  /**
   * Calcule le total du panier
   */
  static async getCartTotal(
    userId: string,
    accountType?: 'particulier' | 'professionnel'
  ): Promise<number> {
    const items = await this.getCartItems(userId)
    
    return items.reduce((total, item) => {
      const price = accountType === 'professionnel' 
        ? item.product.priceB2B 
        : item.product.priceB2C
      return total + (price || 0) * item.quantity
    }, 0)
  }

  /**
   * Récupère le nombre d'items dans le panier
   */
  static async getCartItemCount(userId: string): Promise<number> {
    const cart = await this.getOrCreateCart(userId)

    const result = await prisma.cartItem.aggregate({
      where: { cartId: cart.id },
      _sum: {
        quantity: true,
      },
    })

    return result._sum.quantity || 0
  }
}

