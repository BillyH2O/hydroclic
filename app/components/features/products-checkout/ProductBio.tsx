import { Product } from '@/lib/types/product'

interface ProductBioProps {
  product: Product
  className?: string
}

/**
 * Composant pour afficher la bio/description détaillée du produit
 */
export default function ProductBio({
  product,
  className = '',
}: ProductBioProps) {
  const description = product.description || 'Aucune description disponible.'

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>

      {/* Informations supplémentaires si disponibles */}
      {(product.category || product.productType) && (
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Informations</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.category && product.category !== 'all' && (
              <>
                <dt className="font-medium text-gray-700">Catégorie:</dt>
                <dd className="text-gray-600">{product.category}</dd>
              </>
            )}
            {product.productType && (
              <>
                <dt className="font-medium text-gray-700">Type de produit:</dt>
                <dd className="text-gray-600">{product.productType}</dd>
              </>
            )}
          </dl>
        </div>
      )}
    </div>
  )
}


