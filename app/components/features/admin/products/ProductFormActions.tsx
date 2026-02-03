import React from 'react'
import { Save } from 'lucide-react'

interface ProductFormActionsProps {
  isEditing: boolean
  loading: boolean
  onClose: () => void
}

export default function ProductFormActions({ isEditing, loading, onClose }: ProductFormActionsProps) {
  return (
    <div className="flex gap-3 pt-4 border-t">
      <button
        type="submit"
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save className="w-4 h-4" />
        {loading ? 'Enregistrement...' : isEditing ? 'Modifier' : 'Créer'}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Annuler
      </button>
    </div>
  )
}

