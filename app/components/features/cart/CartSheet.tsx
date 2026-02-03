'use client'

import { useState, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/hooks/useCart'
import { useUser } from '@clerk/nextjs'
import CheckoutButton from '@/components/features/payment/CheckoutButton'
import SafeImage from '@/components/ui/SafeImage'
import { formatPrice, getProductPrice } from '@/lib/utils'

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, total, isLoading, updateQuantity, removeFromCart } = useCart()
  const { user } = useUser()
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Récupérer le type de compte (depuis user ou localStorage pour non-connectés)
  const accountType = useMemo((): 'particulier' | 'professionnel' | undefined => {
    if (user) {
      return user.publicMetadata?.accountType as 'particulier' | 'professionnel' | undefined
    }
    // Pour les utilisateurs non connectés, vérifier localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('accountType')
      return (stored === 'particulier' || stored === 'professionnel') ? stored : 'particulier'
    }
    return 'particulier' // Par défaut
  }, [user])

  useEffect(() => {
    // Utiliser setTimeout pour éviter l'appel synchrone de setState
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (open) {
      // Utiliser setTimeout pour éviter l'appel synchrone de setState
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, 0)
      document.body.style.overflow = 'hidden'
      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  // Gérer la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }

    if (open) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [open, onOpenChange])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onOpenChange(false)
    }, 200)
  }

  if (!open || !mounted) return null

  const content = (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
      style={{ zIndex: 9999 }}
    >
      {/* Overlay avec fond noir opaque */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isAnimating ? 'opacity-60' : 'opacity-0'
        }`}
      />
      
      {/* Sheet */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:max-w-md bg-white shadow-2xl transition-transform duration-300 ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: 'white', zIndex: 10000 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Panier ({items.length} article{items.length > 1 ? 's' : ''})
          </h2>
          <button
            onClick={handleClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Contenu */}
        <div className="flex flex-col h-[calc(100vh-73px)] bg-white">
          {/* Liste des produits */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Votre panier est vide
                </p>
                <p className="text-sm text-gray-500">
                  Ajoutez des produits pour commencer vos achats
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const product = item.product
                  // Utiliser le même prix que celui utilisé pour le calcul du total
                  const price = getProductPrice(
                    product.priceB2C || 0,
                    product.priceB2B || 0,
                    accountType
                  )
                  const itemTotal = price * item.quantity

                  return (
                    <div
                      key={product.id}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <SafeImage
                          src={product.image}
                          alt={product.imageAlt || product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Détails */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatPrice(price)} × {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {formatPrice(itemTotal)}
                        </p>

                        {/* Contrôles quantité */}
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => updateQuantity(product.id as string, item.quantity - 1)}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id as string, item.quantity + 1)}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(product.id as string)}
                            className="ml-auto p-1 rounded hover:bg-red-50 text-red-600 transition-colors"
                            aria-label="Retirer du panier"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer avec total et bouton de paiement */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(total)}
                </span>
              </div>
              <CheckoutButton items={items} className="w-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}

