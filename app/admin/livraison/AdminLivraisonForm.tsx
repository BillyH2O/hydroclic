'use client'

import { useActionState } from 'react'
import { updateShippingSettingsAction } from '@/admin/actions'
import { Button } from '@/components/ui/button'

type State = { success: boolean; error?: string } | undefined

export default function AdminLivraisonForm({
  initialFee,
  initialThreshold,
}: {
  initialFee: number
  initialThreshold: number | null
}) {
  const [state, formAction, pending] = useActionState(
    updateShippingSettingsAction,
    undefined as State
  )

  return (
    <form action={formAction} className="space-y-8 max-w-lg">
      <div>
        <label
          htmlFor="shippingFeeEur"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          Frais de livraison (€)
        </label>
        <input
          id="shippingFeeEur"
          name="shippingFeeEur"
          type="number"
          min={0}
          step={0.01}
          required
          defaultValue={Number.isFinite(initialFee) ? initialFee : 0}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <p className="mt-2 text-sm text-gray-600">
          Montant facturé pour une <strong>livraison à domicile</strong> lorsque le palier gratuit
          n&apos;est pas atteint (click &amp; collect : toujours sans frais de port).
        </p>
      </div>

      <div>
        <label
          htmlFor="freeShippingThresholdEur"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          Livraison gratuite à partir de (€) — optionnel
        </label>
        <input
          id="freeShippingThresholdEur"
          name="freeShippingThresholdEur"
          type="number"
          min={0}
          step={0.01}
          defaultValue={
            initialThreshold !== null && initialThreshold !== undefined
              ? initialThreshold
              : ''
          }
          placeholder="ex. 100"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <p className="mt-2 text-sm text-gray-600">
          Si le total du panier <strong>hors frais de port</strong> est supérieur ou égal à ce
          montant, la livraison à domicile est offerte (0 €). Laissez vide pour désactiver ce
          palier : les frais ci-dessus s&apos;appliquent alors à chaque commande livrée.
        </p>
      </div>

      {state?.error ? (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p className="text-sm text-green-700" role="status">
          Paramètres enregistrés.
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto" size="lg">
        {pending ? 'Enregistrement…' : 'Enregistrer'}
      </Button>
    </form>
  )
}
