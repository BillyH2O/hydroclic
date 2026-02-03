'use client'

import { useState } from 'react'
import { Product } from '@/lib/types/product'
import { deleteProductAction } from '@/admin/actions'
import { Edit, Trash2 } from 'lucide-react'

interface ProductActionsProps {
  product: Product
  onEdit: (product: Product) => void
  onRefresh: () => void
}

export default function ProductActions({ product, onEdit, onRefresh }: ProductActionsProps) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return
    }

    setDeleting(true)
    try {
      const result = await deleteProductAction(String(product.id))
      if (result.success) {
        onRefresh()
      } else {
        alert(result.error || 'Erreur lors de la suppression')
      }
    } catch {
      alert('Erreur lors de la suppression')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={() => onEdit(product)}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="Modifier"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Supprimer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

