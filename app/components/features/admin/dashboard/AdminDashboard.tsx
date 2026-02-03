'use client'

import { Product } from '@/lib/types/product'
import StatsOverview from './StatsOverview'
import CategoryStats from './CategoryStats'

interface AdminDashboardProps {
  products: Product[]
}

export default function AdminDashboard({ products }: AdminDashboardProps) {
  // Statistiques par type de produit
  const productsByType = {
    hydrodistribution: products.filter(p => p.productType === 'hydrodistribution').length,
    'chauffage-climatisation': products.filter(p => p.productType === 'chauffage-climatisation').length,
    'traitement-eau': products.filter(p => p.productType === 'traitement-eau').length,
    sanitaire: products.filter(p => p.productType === 'sanitaire').length,
    outillage: products.filter(p => p.productType === 'outillage').length,
    consommable: products.filter(p => p.productType === 'consommable').length,
  }

  return (
    <div className="space-y-8">
      {/* Statistiques principales */}
      <StatsOverview products={products} />

      {/* Statistiques par type de produit */}
      <CategoryStats productsByType={productsByType} />

      {/* Note pour les futures statistiques */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note :</strong> Les statistiques sur le nombre de clients seront ajoutées prochainement.
        </p>
      </div>
    </div>
  )
}

