import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { PaymentService } from '@/lib/services/payment'
import { CartItem } from '@/lib/types/payment'
import { Product } from '@/lib/types/product'
import { getProductById } from '@/lib/db/products'
import { getProductPrice } from '@/lib/utils'

/**
 * API Route pour créer une session de checkout Stripe
 * POST /api/checkout
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    const user = await currentUser()
    const body = await request.json()

    // Valider les données de la requête
    const { items, successUrl, cancelUrl } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Le panier est vide' },
        { status: 400 }
      )
    }

    if (!successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: 'Les URLs de succès et d\'annulation sont requises' },
        { status: 400 }
      )
    }

    // Déterminer le type de compte pour le prix
    const accountType = user?.publicMetadata?.accountType as 'particulier' | 'professionnel' | undefined

    // Récupérer les produits complets depuis la base de données
    const cartItems: CartItem[] = []
    for (const item of items) {
      if (!item.productId || !item.quantity) {
        continue
      }

      const product = await getProductById(item.productId)
      if (!product) {
        return NextResponse.json(
          { error: `Produit ${item.productId} non trouvé` },
          { status: 404 }
        )
      }

      // Créer un produit avec le prix adapté au type de compte
      const productWithPrice: Product = {
        ...product,
        price: getProductPrice(product.priceB2C, product.priceB2B, accountType),
      }

      cartItems.push({
        product: productWithPrice as Product,
        quantity: parseInt(item.quantity, 10),
      })
    }

    if (cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Aucun produit valide dans le panier' },
        { status: 400 }
      )
    }

    // Créer la session de checkout avec les productIds dans les metadata
    const productIds = cartItems.map(item => item.product.id).join(',')
    const session = await PaymentService.createCheckoutSession(
      {
        items: cartItems,
        customerId: userId || undefined,
        customerEmail: user?.emailAddresses?.[0]?.emailAddress || undefined,
        successUrl,
        cancelUrl,
      },
      {
        userId: userId || undefined,
        accountType: accountType || undefined,
        productIds: productIds, // Stocker les productIds pour le webhook
      }
    )

    return NextResponse.json({
      sessionId: session.sessionId,
      url: session.url,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    )
  }
}

