'use client'

import { Product } from '@/lib/types/product'
import ProductTable from './ProductTable'

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onRefresh: () => void
}

export default function ProductList({ products, onEdit, onRefresh }: ProductListProps) {
  return (
    <div className="space-y-4">
      <ProductTable products={products} onEdit={onEdit} onRefresh={onRefresh} />
    </div>
  )
}

