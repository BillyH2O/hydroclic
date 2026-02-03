import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { CartService } from '@/lib/services/cart'

/**
 * GET /api/cart - Récupère le panier de l'utilisateur
 */
export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }

    const user = await currentUser()
    const accountType = user?.publicMetadata?.accountType as 'particulier' | 'professionnel' | undefined

    const items = await CartService.getCartItems(userId)
    const itemCount = await CartService.getCartItemCount(userId)
    const total = await CartService.getCartTotal(userId, accountType)

    return NextResponse.json({
      items,
      itemCount,
      total,
    })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du panier' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/cart - Ajoute un produit au panier
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productId, quantity } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'productId est requis' },
        { status: 400 }
      )
    }

    await CartService.addToCart(userId, productId, quantity || 1)

    // Retourner le panier mis à jour
    const user = await currentUser()
    const accountType = user?.publicMetadata?.accountType as 'particulier' | 'professionnel' | undefined

    const items = await CartService.getCartItems(userId)
    const itemCount = await CartService.getCartItemCount(userId)
    const total = await CartService.getCartTotal(userId, accountType)

    return NextResponse.json({
      items,
      itemCount,
      total,
    })
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout au panier' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/cart - Met à jour la quantité d'un produit
 */
export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productId, quantity } = body

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { error: 'productId et quantity sont requis' },
        { status: 400 }
      )
    }

    await CartService.updateCartItemQuantity(userId, productId, quantity)

    // Retourner le panier mis à jour
    const user = await currentUser()
    const accountType = user?.publicMetadata?.accountType as 'particulier' | 'professionnel' | undefined

    const items = await CartService.getCartItems(userId)
    const itemCount = await CartService.getCartItemCount(userId)
    const total = await CartService.getCartTotal(userId, accountType)

    return NextResponse.json({
      items,
      itemCount,
      total,
    })
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du panier' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/cart - Retire un produit ou vide le panier
 */
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }

    const body = await request.json().catch(() => ({}))
    const { productId } = body

    if (productId) {
      // Retirer un produit spécifique
      await CartService.removeFromCart(userId, productId)
    } else {
      // Vider tout le panier
      await CartService.clearCart(userId)
    }

    // Retourner le panier mis à jour
    const user = await currentUser()
    const accountType = user?.publicMetadata?.accountType as 'particulier' | 'professionnel' | undefined

    const items = await CartService.getCartItems(userId)
    const itemCount = await CartService.getCartItemCount(userId)
    const total = await CartService.getCartTotal(userId, accountType)

    return NextResponse.json({
      items,
      itemCount,
      total,
    })
  } catch (error) {
    console.error('Error deleting from cart:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du panier' },
      { status: 500 }
    )
  }
}

