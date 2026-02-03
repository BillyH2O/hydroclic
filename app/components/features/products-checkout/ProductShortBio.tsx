import { Product } from '@/lib/types/product'

interface ProductShortBioProps {
  product: Product
  className?: string
}

/**
 * Composant pour afficher une bio courte du produit
 * À afficher à droite de l'image, au-dessus des boutons
 */
export default function ProductShortBio({
  product,
  className = '',
}: ProductShortBioProps) {
  const description = product.description || 'Aucune description disponible.'

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Description
      </h2>
      <p className="text-base text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

