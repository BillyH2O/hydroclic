'use client'

import { Product } from '@/lib/types/product'
import ProductCard from '@/components/features/landing/products/components/ProductCard'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-gray-600 mb-2">Aucun produit trouvé</p>
        <p className="text-sm text-gray-500">
          Essayez de modifier vos filtres pour voir plus de résultats.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

