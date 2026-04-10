'use client'

import { useEffect, useState, useRef } from 'react'
import { useCart } from '@/lib/hooks/useCart'

interface CheckoutSuccessClientProps {
  sessionId: string
}

export default function CheckoutSuccessClient({ sessionId }: CheckoutSuccessClientProps) {
  const { clearCart } = useCart()
  const clearedRef = useRef(false)
  const [sessionData, setSessionData] = useState<{
    amountTotal: number | null
    customerEmail: string | null
    deliveryMethod: string | null
  } | null>(null)

  // Vider le panier local ou serveur après paiement réussi (Stripe redirige ici avec session_id)
  useEffect(() => {
    if (!sessionId || clearedRef.current) return
    clearedRef.current = true
    void clearCart().catch((err) => {
      console.error('[CheckoutSuccess] Impossible de vider le panier:', err)
    })
  }, [sessionId, clearCart])

  useEffect(() => {
    // Récupérer les détails de la session
    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/checkout/session?session_id=${sessionId}`)
        if (response.ok) {
          const data = await response.json()
          setSessionData({
            amountTotal: data.amountTotal,
            customerEmail: data.customerEmail,
            deliveryMethod: data.deliveryMethod ?? null,
          })
        }
      } catch (error) {
        console.error('Error fetching session:', error)
      }
    }

    if (sessionId) {
      fetchSession()
    }
  }, [sessionId])

  if (!sessionData) {
    return null
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Détails de la commande
      </h2>
      <div className="space-y-2 text-sm text-gray-600">
        {sessionData.customerEmail && (
          <p>
            <span className="font-medium">Email :</span> {sessionData.customerEmail}
          </p>
        )}
        {sessionData.amountTotal !== null && (
          <p>
            <span className="font-medium">Montant total :</span>{' '}
            {(sessionData.amountTotal / 100).toFixed(2)} €
          </p>
        )}
        {sessionData.deliveryMethod === 'pickup' && (
          <p>
            <span className="font-medium">Livraison :</span> retrait au dépôt (86 bd Félix Faure,
            93300 Aubervilliers)
          </p>
        )}
        {sessionData.deliveryMethod === 'home' && (
          <p>
            <span className="font-medium">Livraison :</span> à domicile (adresse indiquée au
            paiement)
          </p>
        )}
        <p className="break-all">
          <span className="font-medium">Numéro de session :</span> {sessionId}
        </p>
      </div>
    </div>
  )
}

