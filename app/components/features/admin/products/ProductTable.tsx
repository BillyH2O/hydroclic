import React from 'react'
import { Product } from '@/lib/types/product'
import ProductTableRow from './ProductTableRow'

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onRefresh: () => void
}

export default function ProductTable({ products, onEdit, onRefresh }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg shadow">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Image
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              SKU
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Prix
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Catégorie
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                Aucun produit trouvé
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <ProductTableRow
                key={String(product.id)}
                product={product}
                onEdit={onEdit}
                onRefresh={onRefresh}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

