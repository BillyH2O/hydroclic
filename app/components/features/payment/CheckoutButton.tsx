'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/lib/types/payment'

interface CheckoutButtonProps {
  items: CartItem[]
  className?: string
  disabled?: boolean
}

export default function CheckoutButton({
  items,
  className = '',
  disabled = false,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    if (items.length === 0 || disabled) return

    setIsLoading(true)

    try {
      // Préparer les données pour l'API
      const checkoutData = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/checkout/cancel`,
      }

      // Appeler l'API pour créer la session de checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la création de la session de paiement')
      }

      const { url } = await response.json()

      // Rediriger vers Stripe Checkout
      if (url) {
        window.location.href = url
      } else {
        throw new Error('URL de checkout non disponible')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert(error instanceof Error ? error.message : 'Une erreur est survenue')
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={disabled || isLoading || items.length === 0}
      className={className}
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Traitement...
        </>
      ) : (
        'Payer maintenant'
      )}
    </Button>
  )
}

