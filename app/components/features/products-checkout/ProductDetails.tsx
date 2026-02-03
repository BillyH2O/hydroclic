'use client'

import { Product } from '@/lib/types/product'
import { ProductService } from '@/lib/services/products'
import { useAccountType } from '@/lib/hooks/useAccountType'

interface ProductDetailsProps {
  product: Product
  className?: string
}

/**
 * Composant pour afficher les détails principaux du produit
 * Prix, badges, catégories, etc.
 */
export default function ProductDetails({
  product,
  className = '',
}: ProductDetailsProps) {
  const accountType = useAccountType()
  // Utiliser le Service Layer pour les calculs selon le type de compte
  const basePrice = ProductService.getProductPrice(product, accountType)
  const finalPrice = ProductService.calculateFinalPrice(product, accountType)
  const savings = ProductService.calculateSavings(product, accountType)
  const hasDiscount = product.discount && product.discount > 0

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Titre */}
      <h1 className="title">
        {product.name}
      </h1>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.isNew && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-500 text-white">
            Nouveau
          </span>
        )}
        {product.isPromotion && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-500 text-white">
            Promotion
          </span>
        )}
        {product.isDestockage && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-500 text-white">
            Destockage
          </span>
        )}
        {product.discount && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary text-white">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Prix */}
      <div className="flex items-baseline gap-3">
        {hasDiscount ? (
          <>
            <span className="text-4xl font-bold text-gray-900">
              {finalPrice.toFixed(2)} €
            </span>
            <span className="text-2xl text-gray-500 line-through">
              {basePrice.toFixed(2)} €
            </span>
            <span className="text-lg font-semibold text-red-600">
              Économisez {((savings / basePrice) * 100).toFixed(0)}%
            </span>
          </>
        ) : (
          <span className="text-4xl font-bold text-gray-900">
            {basePrice.toFixed(2)} €
          </span>
        )}
      </div>
    </div>
  )
}

