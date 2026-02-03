import React from 'react'

interface ProductBadgesProps {
  isNew?: boolean
  isPromotion?: boolean
  isDestockage?: boolean
  category?: string
  productType?: string
}

export default function ProductBadges({
  isNew,
  isPromotion,
  isDestockage,
  category,
  productType,
}: ProductBadgesProps) {
  return (
    <>
      {/* Catégorie */}
      {category && category !== 'all' && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {category}
        </span>
      )}
      
      {/* Type de produit */}
      {productType && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {productType}
        </span>
      )}
      
      {/* Statuts */}
      <div className="flex flex-wrap gap-1">
        {isNew && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
            Nouveau
          </span>
        )}
        {isPromotion && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
            Promo
          </span>
        )}
        {isDestockage && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500 text-white">
            Destock
          </span>
        )}
      </div>
    </>
  )
}

