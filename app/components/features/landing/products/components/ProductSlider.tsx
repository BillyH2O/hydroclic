'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'
import { Product, ProductCategory } from '@/lib/types/product'
import ProductFilterTabs, { FilterTab } from './ProductFilterTabs'
import { FilterConfig, FilterType } from '../filterConfigs'

interface ProductSliderProps {
  products: Product[]
  productsToShow?: {
    mobile?: number
    tablet?: number
    desktop?: number
  } | number // Nombre de produits visibles (par défaut 1 mobile, 3 tablet, 5 desktop)
  className?: string
  showFilters?: boolean // Afficher les filtres de catégories
  showTitle?: boolean // Afficher le titre
  defaultFilter?: ProductCategory // Filtre par défaut
  filterConfig?: FilterConfig // Configuration de filtres personnalisée
  filterTabs?: FilterTab[] // Personnaliser les onglets de filtre (déprécié, utiliser filterConfig)
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  productsToShow = { mobile: 1, tablet: 3, desktop: 5 },
  className = '',
  showFilters = true,
  showTitle = true,
  defaultFilter = 'all',
  filterConfig,
  filterTabs, // Déprécié mais toujours supporté pour compatibilité
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [visibleProducts, setVisibleProducts] = useState(5)
  const [activeFilter, setActiveFilter] = useState<ProductCategory>(defaultFilter)

  // Fonction de filtrage selon le type de configuration
  const filterProducts = useMemo(() => {
    return (category: ProductCategory, products: Product[], filterType: FilterType): Product[] => {
      if (category === 'all') {
        return products
      }

      switch (filterType) {
        case 'offers':
          return products.filter((product) => {
            switch (category) {
              case 'nouveaute':
                return product.isNew === true || product.category === 'nouveaute'
              case 'promotion':
                return product.isPromotion === true || product.discount !== undefined || product.category === 'promotion'
              case 'destockage':
                return product.isDestockage === true || product.category === 'destockage'
              default:
                return true
            }
          })
        
        case 'productTypes':
          return products.filter((product) => {
            return product.productType === category || product.category === category
          })
        
        case 'custom':
          // Pour les filtres personnalisés, utiliser filterTabs si fourni
          if (filterTabs) {
            return products.filter((product) => {
              return product.category === category || product.productType === category
            })
          }
          return products
        
        default:
          return products
      }
    }
  }, [filterTabs])

  // Déterminer la configuration de filtres à utiliser
  const config: FilterConfig = useMemo(() => {
    if (filterConfig) {
      return filterConfig
    }
    
    // Fallback vers filterTabs si fourni (compatibilité)
    if (filterTabs) {
      return {
        tabs: filterTabs,
        filterType: 'custom',
      }
    }
    
    // Configuration par défaut (offres)
    return {
      tabs: [
        { id: 'all', label: 'Tous' },
        { id: 'nouveaute', label: 'Nouveautés' },
        { id: 'promotion', label: 'Promotions' },
        { id: 'destockage', label: 'Destockage' },
      ],
      filterType: 'offers',
    }
  }, [filterConfig, filterTabs])

  // Filtrer les produits selon la catégorie active
  const filteredProducts = useMemo(() => {
    return filterProducts(activeFilter, products, config.filterType)
  }, [products, activeFilter, config.filterType, filterProducts])

  // Générer les onglets de filtre avec compteurs
  const tabs: FilterTab[] = useMemo(() => {
    return config.tabs.map((tab) => ({
      ...tab,
      count: filterProducts(tab.id, products, config.filterType).length,
    }))
  }, [products, config, filterProducts])

  // Réinitialiser l'index quand le filtre change
  useEffect(() => {
    // Utiliser setTimeout pour éviter l'appel synchrone de setState
    const timer = setTimeout(() => {
      setCurrentIndex(0)
    }, 0)
    return () => clearTimeout(timer)
  }, [activeFilter])

  // Détecter le nombre de produits à afficher selon la taille de l'écran
  useEffect(() => {
    const updateVisibleProducts = () => {
      if (typeof productsToShow === 'number') {
        setVisibleProducts(productsToShow)
      } else {
        const width = window.innerWidth
        if (width < 768) {
          setVisibleProducts(productsToShow.mobile || 1)
        } else if (width < 1024) {
          setVisibleProducts(productsToShow.tablet || 3)
        } else {
          setVisibleProducts(productsToShow.desktop || 5)
        }
      }
    }

    updateVisibleProducts()
    window.addEventListener('resize', updateVisibleProducts)
    return () => window.removeEventListener('resize', updateVisibleProducts)
  }, [productsToShow])

  // Calculer le nombre maximum de slides possibles avec les produits filtrés
  const maxIndex = Math.max(0, filteredProducts.length - visibleProducts)

  // Fonction pour aller au slide précédent
  const goToPrevious = () => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex((prev) => prev - 1)
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }

  // Fonction pour aller au slide suivant
  const goToNext = () => {
    if (currentIndex < maxIndex && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex((prev) => prev + 1)
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }

  // Réinitialiser l'index si le nombre de produits change
  useEffect(() => {
    if (currentIndex > maxIndex) {
      // Utiliser setTimeout pour éviter l'appel synchrone de setState
      const timer = setTimeout(() => {
        setCurrentIndex(maxIndex)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [filteredProducts.length, maxIndex, currentIndex, visibleProducts])

  // Calculer la largeur de chaque produit (en pourcentage)
  const productWidth = filteredProducts.length > 0 ? 100 / visibleProducts : 0

  const handleFilterChange = (filter: ProductCategory) => {
    setActiveFilter(filter)
    setCurrentIndex(0)
  }

  return (
    <div className={`relative w-full max-w-7xl mx-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Header avec titre et filtres */}
      <div className="w-full flex flex-col items-center justify-center gap-6 mb-6 sm:mb-8">
        {showTitle && (
          <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-900">
            {tabs.find(tab => tab.id === activeFilter)?.label || activeFilter}
          </h2>
        )}
        {/* Filtres de catégories */}
        {showFilters && tabs.length > 0 && (
          <div className="w-full sm:w-auto overflow-x-auto">
            <ProductFilterTabs
              tabs={tabs}
              activeTab={activeFilter}
              onTabChange={handleFilterChange}
            />
          </div>
        )}
      </div>

      {/* Message si aucun produit trouvé */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun produit trouvé pour cette catégorie.</p>
        </div>
      ) : (
        <>
          {/* Container du slider */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex justify-center items-center transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * productWidth}%)`,
              }}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="shrink-0 px-1 sm:px-2 md:px-3 min-w-0"
                  style={{ width: `${productWidth}%` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Bouton précédent */}
      {currentIndex > 0 && (
        <button
          onClick={goToPrevious}
          disabled={isTransitioning}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
          aria-label="Produit précédent"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
        </button>
      )}

      {/* Bouton suivant */}
      {currentIndex < maxIndex && (
        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
          aria-label="Produit suivant"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
        </button>
      )}

      {/* Indicateurs de position (optionnel) */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-2 mt-4 sm:mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true)
                setCurrentIndex(index)
                setTimeout(() => setIsTransitioning(false), 300)
              }}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'w-6 sm:w-8 bg-primary'
                  : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductSlider

