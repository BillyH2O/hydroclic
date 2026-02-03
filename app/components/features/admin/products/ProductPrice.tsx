import React from 'react'
import { Product } from '@/lib/types/product'

interface ProductPriceProps {
  product: Product
}

export default function ProductPrice({ product }: ProductPriceProps) {
  // Dans l'admin, on affiche les deux prix
  const hasDiscount = product.discount && product.discount > 0
  const finalPriceB2C = hasDiscount 
    ? product.priceB2C * (1 - (product.discount || 0) / 100)
    : product.priceB2C
  const finalPriceB2B = hasDiscount 
    ? product.priceB2B * (1 - (product.discount || 0) / 100)
    : product.priceB2B

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">B2C:</span>
        {hasDiscount ? (
          <>
            <span className="font-bold text-gray-900 text-sm">
              {finalPriceB2C.toFixed(2)} €
            </span>
            <span className="text-xs text-gray-500 line-through">
              {product.priceB2C.toFixed(2)} €
            </span>
          </>
        ) : (
          <span className="font-bold text-gray-900 text-sm">
            {product.priceB2C.toFixed(2)} €
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">B2B:</span>
        {hasDiscount ? (
          <>
            <span className="font-bold text-gray-900 text-sm">
              {finalPriceB2B.toFixed(2)} €
            </span>
            <span className="text-xs text-gray-500 line-through">
              {product.priceB2B.toFixed(2)} €
            </span>
          </>
        ) : (
          <span className="font-bold text-gray-900 text-sm">
            {product.priceB2B.toFixed(2)} €
          </span>
        )}
      </div>
      {hasDiscount && (
        <span className="text-xs text-red-600">
          -{product.discount}%
        </span>
      )}
    </div>
  )
}

