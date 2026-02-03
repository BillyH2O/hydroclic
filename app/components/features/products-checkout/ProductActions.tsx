'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { Product } from '@/lib/types/product'
import { useCart } from '@/lib/hooks/useCart'

interface ProductActionsProps {
  product: Product
  className?: string
}

export default function ProductActions({
  product,
  className = '',
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    await addToCart(product, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Quantité */}
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="font-medium text-gray-700">
          Quantité:
        </label>
        <div className="flex items-center gap-2 border rounded-lg">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
            aria-label="Diminuer la quantité"
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center border-0 focus:ring-0"
          />
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
            aria-label="Augmenter la quantité"
          >
            +
          </button>
        </div>
      </div>

      {/* Bouton principal: Ajouter au panier */}
      <button
        onClick={handleAddToCart}
        className={`flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
          isAdded
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-primary hover:bg-primary/90'
        } shadow-md hover:shadow-lg`}
      >
        {isAdded ? (
          <>
            <Check className="w-5 h-5" />
            Ajouté au panier
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Ajouter au panier
          </>
        )}
      </button>
    </div>
  )
}
