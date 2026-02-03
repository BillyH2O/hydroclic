import React from 'react'
import { X } from 'lucide-react'

interface ProductFormHeaderProps {
  isEditing: boolean
  onClose: () => void
}

export default function ProductFormHeader({ isEditing, onClose }: ProductFormHeaderProps) {
  return (
    <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">
        {isEditing ? 'Modifier le produit' : 'Nouveau produit'}
      </h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  )
}

