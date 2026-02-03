'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CatalogueFilters, PaginationParams, PaginatedProducts, SortOption, OfferFilter } from '@/lib/types/catalogue'
import CatalogueSidebar from './CatalogueSidebar'
import ProductGrid from './ProductGrid'
import Pagination from './Pagination'
import SearchBar from './SearchBar'
import SortSelector from './SortSelector'

interface CatalogueClientProps {
  initialFilters: CatalogueFilters
  initialPagination: PaginationParams
  initialResult: PaginatedProducts
}

export default function CatalogueClient({
  initialFilters,
  initialResult,
}: CatalogueClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [filters, setFilters] = useState<CatalogueFilters>(initialFilters)
  const [searchValue, setSearchValue] = useState(initialFilters.search || '')
  const [result, setResult] = useState<PaginatedProducts>(initialResult)

  // Synchroniser avec les nouvelles props quand l'URL change
  useEffect(() => {
    // Utiliser setTimeout pour éviter l'appel synchrone de setState
    const timer = setTimeout(() => {
      setFilters(initialFilters)
      setSearchValue(initialFilters.search || '')
      setResult(initialResult)
    }, 0)
    return () => clearTimeout(timer)
  }, [initialFilters, initialResult])

  // Fonction pour mettre à jour l'URL avec les nouveaux paramètres
  const updateURL = (newFilters: CatalogueFilters, newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (newFilters.offer !== OfferFilter.ALL) {
      params.set('offer', newFilters.offer)
    } else {
      params.delete('offer')
    }

    if (newFilters.productType !== 'all') {
      params.set('productType', newFilters.productType)
    } else {
      params.delete('productType')
    }

    if (newFilters.sort !== 'default') {
      params.set('sort', newFilters.sort)
    } else {
      params.delete('sort')
    }

    if (newFilters.search && newFilters.search.trim() !== '') {
      params.set('search', newFilters.search)
    } else {
      params.delete('search')
    }

    if (newPage > 1) {
      params.set('page', newPage.toString())
    } else {
      params.delete('page')
    }

    startTransition(() => {
      router.push(`/catalogue?${params.toString()}`)
    })
  }

  // Gérer le changement de filtre d'offre
  const handleOfferFilterChange = (offer: CatalogueFilters['offer']) => {
    const newFilters = { ...filters, offer }
    setFilters(newFilters)
    updateURL(newFilters, 1) // Reset à la page 1
  }

  // Gérer le changement de filtre de type
  const handleProductTypeFilterChange = (productType: CatalogueFilters['productType']) => {
    const newFilters = { ...filters, productType }
    setFilters(newFilters)
    updateURL(newFilters, 1) // Reset à la page 1
  }

  // Gérer le changement de tri
  const handleSortChange = (sort: SortOption) => {
    const newFilters = { ...filters, sort }
    setFilters(newFilters)
    updateURL(newFilters, 1) // Reset à la page 1
  }

  // Gérer la recherche
  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    // Debounce pourrait être ajouté ici pour éviter trop de requêtes
  }

  const handleSearchSubmit = () => {
    const newFilters = { ...filters, search: searchValue.trim() || undefined }
    setFilters(newFilters)
    updateURL(newFilters, 1) // Reset à la page 1
  }

  // Gérer le changement de page
  const handlePageChange = (page: number) => {
    updateURL(filters, page)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row sm:gap-8 gap-0">
        {/* Sidebar avec filtres */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-4">
            <CatalogueSidebar
              offerFilter={filters.offer}
              productTypeFilter={filters.productType}
              onOfferFilterChange={handleOfferFilterChange}
              onProductTypeFilterChange={handleProductTypeFilterChange}
            />
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          {/* Barre de recherche, tri et résultats */}
          <div className="mb-6 space-y-4">
            {/* Première ligne : Recherche et Tri */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Barre de recherche */}
              <div className="flex-1">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSearchSubmit()
                  }}
                >
                  <SearchBar
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Rechercher un produit..."
                  />
                </form>
              </div>

              {/* Sélecteur de tri */}
              <div className="flex-shrink-0">
                <SortSelector
                  value={filters.sort}
                  onChange={handleSortChange}
                />
              </div>
            </div>

            {/* Compteur de résultats */}
            <div className="text-sm text-gray-600">
              <span className="hidden sm:inline">
                {result.total} produit{result.total > 1 ? 's' : ''} trouvé{result.total > 1 ? 's' : ''}
              </span>
              <span className="sm:hidden">
                {result.total} trouvé{result.total > 1 ? 's' : ''}
              </span>
              {filters.search && ` pour "${filters.search}"`}
            </div>
          </div>

          {/* Résultats */}
          {isPending ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Grille de produits */}
              <ProductGrid products={result.products} />

              {/* Pagination */}
              <Pagination
                currentPage={result.page}
                totalPages={result.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

