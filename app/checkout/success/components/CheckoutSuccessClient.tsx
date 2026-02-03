'use client'

import { useEffect, useState } from 'react'

interface CheckoutSuccessClientProps {
  sessionId: string
}

export default function CheckoutSuccessClient({ sessionId }: CheckoutSuccessClientProps) {
  const [sessionData, setSessionData] = useState<{
    amountTotal: number | null
    customerEmail: string | null
  } | null>(null)

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
        <p>
          <span className="font-medium">Numéro de session :</span> {sessionId}
        </p>
      </div>
    </div>
  )
}

