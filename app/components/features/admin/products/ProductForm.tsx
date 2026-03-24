'use client'

import { useState, useEffect } from 'react'
import { Product, ProductCategory } from '@/lib/types/product'
import { createProductAction, updateProductAction } from '@/admin/actions'
import ProductFormHeader from './ProductFormHeader'
import ProductFormFields from './ProductFormFields'
import ProductFormActions from './ProductFormActions'
import { getProductImage } from '@/lib/utils'

interface ProductFormProps {
  product?: Product | null
  onClose: () => void
  onSuccess: () => void
}

function validateFormData(data: {
  name: string
  priceB2C: number
  priceB2B: number
  image: string
}): string | null {
  if (!data.name.trim()) return 'Le nom du produit est obligatoire.'
  if (!data.image.trim()) return "L'image est obligatoire (chemin ou URL)."
  if (isNaN(data.priceB2C) || data.priceB2C < 0.5)
    return "Le prix B2C doit être d'au moins 0,50 \u20ac."
  if (isNaN(data.priceB2B) || data.priceB2B < 0.5)
    return "Le prix B2B doit être d'au moins 0,50 \u20ac."
  return null
}

export default function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    priceB2C: 0,
    priceB2B: 0,
    image: '/default.png',
    imageAlt: '',
    description: '',
    discount: undefined as number | undefined,
    category: '' as ProductCategory | '',
    productType: '' as ProductCategory | '',
    isNew: false,
    isPromotion: false,
    isDestockage: false,
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug || '',
        sku: product.sku || '',
        priceB2C: product.priceB2C ?? product.price ?? 0,
        priceB2B: product.priceB2B ?? product.price ?? 0,
        image: getProductImage(product.image),
        imageAlt: product.imageAlt || '',
        description: product.description || '',
        discount: product.discount,
        category: product.category || '',
        productType: product.productType || '',
        isNew: product.isNew || false,
        isPromotion: product.isPromotion || false,
        isDestockage: product.isDestockage || false,
      })
    }
  }, [product])

  const handleFieldChange = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const validationError = validateFormData(formData)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    try {
      const data = {
        ...formData,
        slug: formData.slug || undefined,
        sku: formData.sku || undefined,
        discount: formData.discount || undefined,
        category: formData.category || undefined,
        productType: formData.productType || undefined,
      }

      let result
      if (product) {
        result = await updateProductAction(String(product.id), data)
      } else {
        result = await createProductAction(data)
      }

      if (result.success) {
        onSuccess()
        onClose()
      } else {
        setError(result.error || 'Une erreur est survenue côté serveur.')
      }
    } catch {
      setError('Erreur réseau ou serveur inattendue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <ProductFormHeader isEditing={!!product} onClose={onClose} />

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <ProductFormFields formData={formData} onFieldChange={handleFieldChange} />
          <ProductFormActions isEditing={!!product} loading={loading} onClose={onClose} />
        </form>
      </div>
    </div>
  )
}

