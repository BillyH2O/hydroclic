import React from 'react'
import { Product } from '@/lib/types/product'
import ProductImage from './ProductImage'
import ProductPrice from './ProductPrice'
import ProductActions from './ProductActions'
import { getProductImage } from '@/lib/utils'

interface ProductTableRowProps {
  product: Product
  onEdit: (product: Product) => void
  onRefresh: () => void
}

export default function ProductTableRow({ product, onEdit, onRefresh }: ProductTableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3">
        <ProductImage
          src={getProductImage(product.image)}
          alt={product.imageAlt || product.name}
          size={64}
        />
      </td>
      <td className="px-4 py-3">
        <div className="font-medium text-gray-900">{product.name}</div>
        {product.description && (
          <div className="text-sm text-gray-500 line-clamp-1">
            {product.description}
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        {product.sku ? (
          <span className="text-sm font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded">
            {product.sku}
          </span>
        ) : (
          <span className="text-sm text-gray-400 italic">-</span>
        )}
      </td>
      <td className="px-4 py-3">
        <ProductPrice product={product} />
      </td>
      <td className="px-4 py-3">
        {product.category && product.category !== 'all' && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {product.category}
          </span>
        )}
      </td>
      <td className="px-4 py-3">
        {product.productType && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {product.productType}
          </span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {product.isNew && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
              Nouveau
            </span>
          )}
          {product.isPromotion && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
              Promo
            </span>
          )}
          {product.isDestockage && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500 text-white">
              Destock
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        <ProductActions product={product} onEdit={onEdit} onRefresh={onRefresh} />
      </td>
    </tr>
  )
}

