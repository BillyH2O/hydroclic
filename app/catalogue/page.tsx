import { Suspense } from 'react'
import { CatalogueService } from '@/lib/services/catalogue'
import { CatalogueFilters, PaginationParams, SortOption, OfferFilter, ProductTypeFilter } from '@/lib/types/catalogue'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import CatalogueClient from './components/CatalogueClient'

interface CataloguePageProps {
  searchParams: Promise<{
    page?: string
    offer?: string
    productType?: string
    search?: string
    sort?: string
  }>
}

/**
 * Page catalogue avec filtres et pagination
 */
export default async function CataloguePage({ searchParams }: CataloguePageProps) {
  const params = await searchParams

  // Paramètres de pagination
  const page = parseInt(params.page || '1', 10)
  const limit = 12

  // Helper pour valider et convertir le filtre d'offre
  const getOfferFilter = (offer?: string): OfferFilter => {
    if (!offer) return OfferFilter.ALL
    const validValues = Object.values(OfferFilter) as string[]
    return validValues.includes(offer) ? (offer as OfferFilter) : OfferFilter.ALL
  }

  // Filtres
  const filters: CatalogueFilters = {
    offer: getOfferFilter(params.offer),
    productType: (params.productType as ProductTypeFilter) || 'all',
    sort: (params.sort as SortOption) || 'default',
    search: params.search || undefined,
  }

  // Récupérer les produits paginés
  const pagination: PaginationParams = { page, limit }
  const result = await CatalogueService.getPaginatedProducts(filters, pagination)

  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans flex flex-col">
      <Navbar solid />
      
      <main className="w-full flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 mb-12 md:mb-16 lg:mb-20">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-16">
          <h1 className="text-4xl text-gray-900">
            Catalogue
          </h1>
          <p className="text-gray-600">
            Découvrez notre sélection de produits professionnels
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <Suspense fallback={<div className="h-10 bg-gray-200 rounded animate-pulse" />}>
            <CatalogueClient
              initialFilters={filters}
              initialPagination={pagination}
              initialResult={result}
            />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}

