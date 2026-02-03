import React from 'react'
import { ProductCategory } from '@/lib/types/product'

interface ProductFormFieldsProps {
  formData: {
    name: string
    slug: string
    sku: string
    priceB2C: number
    priceB2B: number
    image: string
    imageAlt: string
    description: string
    discount: number | undefined
    category: ProductCategory | ''
    productType: ProductCategory | ''
    isNew: boolean
    isPromotion: boolean
    isDestockage: boolean
  }
  onFieldChange: (field: string, value: unknown) => void
}

const categories: { value: ProductCategory; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'nouveaute', label: 'Nouveauté' },
  { value: 'promotion', label: 'Promotion' },
  { value: 'destockage', label: 'Destockage' },
]

const productTypes: { value: ProductCategory; label: string }[] = [
  { value: 'hydrodistribution', label: 'Hydrodistribution' },
  { value: 'chauffage-climatisation', label: 'Chauffage & Climatisation' },
  { value: 'traitement-eau', label: 'Traitement de l\'eau' },
  { value: 'sanitaire', label: 'Sanitaire' },
  { value: 'outillage', label: 'Outillage' },
  { value: 'consommable', label: 'Consommable' },
]

export default function ProductFormFields({ formData, onFieldChange }: ProductFormFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Nom */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom du produit *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => onFieldChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Slug (URL-friendly)
        </label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => onFieldChange('slug', e.target.value)}
          placeholder="ex: coude-cuivre-a-sertir-22"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">Identifiant URL-friendly pour le produit (optionnel, généré automatiquement si vide)</p>
      </div>

      {/* SKU */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          SKU (Stock Keeping Unit)
        </label>
        <input
          type="text"
          value={formData.sku}
          onChange={(e) => onFieldChange('sku', e.target.value)}
          placeholder="Ex: PROD-001"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">Identifiant unique du produit (optionnel)</p>
      </div>

      {/* Prix B2C et B2B */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix B2C (€) *
            <span className="text-xs text-gray-500 ml-1">(Particuliers)</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            value={formData.priceB2C}
            onChange={(e) => onFieldChange('priceB2C', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix B2B (€) *
            <span className="text-xs text-gray-500 ml-1">(Professionnels)</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            value={formData.priceB2B}
            onChange={(e) => onFieldChange('priceB2B', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Réduction */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Réduction (%)
        </label>
        <input
          type="number"
          min="0"
          max="100"
          value={formData.discount || ''}
          onChange={(e) => onFieldChange('discount', e.target.value ? parseInt(e.target.value) : undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image
        </label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => onFieldChange('image', e.target.value)}
          placeholder="/default.png"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">Par défaut: /default.png</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Catégorie et Type */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <select
            value={formData.category}
            onChange={(e) => onFieldChange('category', e.target.value as ProductCategory)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Aucune</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de produit
          </label>
          <select
            value={formData.productType}
            onChange={(e) => onFieldChange('productType', e.target.value as ProductCategory)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Aucun</option>
            {productTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isNew}
            onChange={(e) => onFieldChange('isNew', e.target.checked)}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Nouveau</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isPromotion}
            onChange={(e) => onFieldChange('isPromotion', e.target.checked)}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Promotion</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isDestockage}
            onChange={(e) => onFieldChange('isDestockage', e.target.checked)}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Destockage</span>
        </label>
      </div>
    </div>
  )
}

