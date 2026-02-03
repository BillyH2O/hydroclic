'use client'

import React from 'react'
import Link from 'next/link'
import { ProductService } from '@/lib/services/products'
import { Product } from '@/lib/types/product'
import { getProductImage } from '@/lib/utils'
import SafeImage from '@/components/ui/SafeImage'
import { useAccountType } from '@/lib/hooks/useAccountType'

// Ré-exporter pour compatibilité avec les imports existants
export type { Product, ProductCategory } from '@/lib/types/product'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const accountType = useAccountType()
  // Utiliser le Service Layer pour calculer le prix final selon le type de compte
  const basePrice = ProductService.getProductPrice(product, accountType)
  const finalPrice = ProductService.calculateFinalPrice(product, accountType)
  const hasDiscount = product.discount && product.discount > 0

  const CardContent = (
    <div className="flex flex-col h-full bg-white border-2 border-gray-300 hover:border-blue-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden w-full max-w-full">
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100 border-b-2 border-transparent hover:border-b-blue-500 transition-colors duration-300">
        <SafeImage
          src={getProductImage(product.image)}
          alt={product.imageAlt || product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 flex flex-col grow min-w-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 wrap-break-word">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 grow wrap-break-word">
            {product.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-auto flex-wrap">
          {hasDiscount ? (
            <>
              <span className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">
                {finalPrice.toFixed(2)} €
              </span>
              <span className="text-xs sm:text-sm text-gray-500 line-through whitespace-nowrap">
                {basePrice.toFixed(2)} €
              </span>
            </>
          ) : (
            <span className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">
              {basePrice.toFixed(2)} €
            </span>
          )}
        </div>
      </div>
    </div>
  )

  if (product.href) {
    return (
      <Link href={product.href} className="block h-full">
        {CardContent}
      </Link>
    )
  }

  return CardContent
}

export default ProductCard

