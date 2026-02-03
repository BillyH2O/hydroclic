'use client'

import { useState } from 'react'
import { Trash2, AlertTriangle } from 'lucide-react'
import { Button } from './button'
import { deleteAccount } from '@/settings/actions'

interface DeleteAccountButtonProps {
  className?: string
}

export default function DeleteAccountButton({ className = '' }: DeleteAccountButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)
  
    try {
      const result = await deleteAccount()
  
      if (result?.error) {
        setError(result.error)
        setIsDeleting(false)
      }
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'digest' in err &&
        typeof (err as { digest: unknown }).digest === 'string' &&
        (err as { digest: string }).digest.startsWith('NEXT_REDIRECT')
      ) {
        return
      }
  
      setError('Une erreur est survenue lors de la suppression')
      setIsDeleting(false)
    }
  }
  


  if (showConfirm) {
    return (
      <div className={`border-t border-red-200 pt-6 mt-6 ${className}`}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-1">
                Confirmer la suppression du compte
              </h3>
              <p className="text-sm text-red-700">
                Cette action est irréversible. Toutes vos données seront définitivement supprimées.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1"
          >
            {isDeleting ? 'Suppression...' : 'Oui, supprimer mon compte'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setShowConfirm(false)
              setError(null)
            }}
            disabled={isDeleting}
          >
            Annuler
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`border-t border-gray-200 pt-6 mt-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Zone de danger
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Une fois votre compte supprimé, toutes vos données seront définitivement effacées. Cette action ne peut pas être annulée.
        </p>
      </div>
      <Button
        type="button"
        variant="destructive"
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-2 text-white/90"
      >
        <Trash2 className="h-4 w-4 text-white/90" />
        Supprimer mon compte
      </Button>
    </div>
  )
}

