'use client'

import { OfferFilter, ProductTypeFilter } from '@/lib/types/catalogue'
import { ChevronDown } from 'lucide-react'

interface CatalogueSidebarProps {
  offerFilter: OfferFilter
  productTypeFilter: ProductTypeFilter
  onOfferFilterChange: (filter: OfferFilter) => void
  onProductTypeFilterChange: (filter: ProductTypeFilter) => void
}

const OFFER_FILTERS: { value: OfferFilter; label: string }[] = [
  { value: OfferFilter.ALL, label: 'Tous les produits' },
  { value: OfferFilter.BEST_SELLERS, label: 'Meilleures ventes' },
  { value: OfferFilter.PROMOTION, label: 'Promotions' },
  { value: OfferFilter.NEW, label: 'Nouveautés' },
  { value: OfferFilter.FLASH_SALE, label: 'Vente flash' },
  { value: OfferFilter.DESTOCKAGE, label: 'Déstockage' },
]

const PRODUCT_TYPE_FILTERS: { value: ProductTypeFilter; label: string }[] = [
  { value: 'all', label: 'Tous les types' },
  { value: 'hydrodistribution', label: 'Hydrodistribution' },
  { value: 'sanitaire', label: 'Sanitaire' },
  { value: 'chauffage-climatisation', label: 'Chauffage & Climatisation' },
  { value: 'outillage', label: 'Outillage' },
  { value: 'consommable', label: 'Consommable' },
]

export default function CatalogueSidebar({
  offerFilter,
  productTypeFilter,
  onOfferFilterChange,
  onProductTypeFilterChange,
}: CatalogueSidebarProps) {
  return (
    <aside className="w-full md:w-64 space-y-6">
      {/* Version mobile : Selects */}
      <div className="md:hidden space-y-4">
        {/* Filtre par offre - Mobile */}
        <div>
          <label htmlFor="offer-filter-mobile" className="block text-sm font-medium text-gray-700 mb-2">
            Offres
          </label>
          <div className="relative">
            <select
              id="offer-filter-mobile"
              value={offerFilter}
              onChange={(e) => onOfferFilterChange(e.target.value as OfferFilter)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
            >
              {OFFER_FILTERS.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Filtre par type - Mobile */}
        <div>
          <label htmlFor="product-type-filter-mobile" className="block text-sm font-medium text-gray-700 mb-2">
            Type de produit
          </label>
          <div className="relative">
            <select
              id="product-type-filter-mobile"
              value={productTypeFilter}
              onChange={(e) => onProductTypeFilterChange(e.target.value as ProductTypeFilter)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
            >
              {PRODUCT_TYPE_FILTERS.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Version desktop : Radios */}
      <div className="hidden md:block space-y-6">
        {/* Filtres par offre */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Offres
          </h3>
          <div className="space-y-2">
            {OFFER_FILTERS.map((filter) => (
              <label
                key={filter.value}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <input
                  type="radio"
                  name="offer-filter"
                  value={filter.value}
                  checked={offerFilter === filter.value}
                  onChange={() => onOfferFilterChange(filter.value)}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{filter.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filtres par type de produit */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Type de produit
          </h3>
          <div className="space-y-2">
            {PRODUCT_TYPE_FILTERS.map((filter) => (
              <label
                key={filter.value}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <input
                  type="radio"
                  name="product-type-filter"
                  value={filter.value}
                  checked={productTypeFilter === filter.value}
                  onChange={() => onProductTypeFilterChange(filter.value)}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{filter.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

