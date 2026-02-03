'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/lib/types/product'
import { ProductList, ProductForm, QuickStats } from '@/components/features/admin'
import { Plus, Package, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AdminCatalogueClientProps {
  initialProducts: Product[]
}

export default function AdminCatalogueClient({ initialProducts }: AdminCatalogueClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const router = useRouter()

  // Mettre à jour les produits quand initialProducts change (après refresh)
  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts])

  const handleRefresh = () => {
    router.refresh()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    handleRefresh()
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <>
      {/* En-tête */}
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;accueil admin
        </Link>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Modification du catalogue</h1>
              <p className="text-gray-600 mt-1">
                Gérez vos produits : ajoutez, modifiez ou supprimez des produits.
              </p>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Ajouter un produit
          </button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <QuickStats products={products} />

      {/* Liste des produits */}
      <ProductList
        products={products}
        onEdit={handleEdit}
        onRefresh={handleRefresh}
      />

      {/* Formulaire modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </>
  )
}

