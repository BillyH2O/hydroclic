import { getAllProducts } from '@/lib/db/products'
import { Product } from '@/lib/types/product'
import { CatalogueFilters, PaginationParams, PaginatedProducts, OfferFilter, SortOption } from '@/lib/types/catalogue'

/**
 * Service pour gérer la logique du catalogue
 */
export class CatalogueService {
  /**
   * Applique les filtres aux produits
   */
  static async getFilteredProducts(filters: CatalogueFilters): Promise<Product[]> {
    let products: Product[] = []

    // Récupérer tous les produits
    const allProducts = await getAllProducts()

    // Filtrer par type de produit
    if (filters.productType && filters.productType !== 'all') {
      products = allProducts.filter(p => p.productType === filters.productType)
    } else {
      products = allProducts
    }

    // Filtrer par offre
    products = this.applyOfferFilter(products, filters.offer)

    // Filtrer par recherche
    if (filters.search && filters.search.trim() !== '') {
      const searchLower = filters.search.toLowerCase().trim()
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.sku?.toLowerCase().includes(searchLower)
      )
    }

    // Appliquer le tri
    products = this.applySort(products, filters.sort)

    return products
  }

  /**
   * Applique le tri aux produits
   */
  private static applySort(products: Product[], sort: SortOption): Product[] {
    const sortedProducts = [...products]

    switch (sort) {
      case 'price-asc':
        return sortedProducts.sort((a, b) => {
          const priceA = a.priceB2C ?? a.price ?? 0
          const priceB = b.priceB2C ?? b.price ?? 0
          return priceA - priceB
        })
      
      case 'price-desc':
        return sortedProducts.sort((a, b) => {
          const priceA = a.priceB2C ?? a.price ?? 0
          const priceB = b.priceB2C ?? b.price ?? 0
          return priceB - priceA
        })
      
      case 'name-asc':
        return sortedProducts.sort((a, b) => 
          a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })
        )
      
      case 'name-desc':
        return sortedProducts.sort((a, b) => 
          b.name.localeCompare(a.name, 'fr', { sensitivity: 'base' })
        )
      
      case 'default':
      default:
        // Tri par défaut : ordre de création (plus récent en premier)
        return sortedProducts
    }
  }

  /**
   * Applique le filtre d'offre
   */
  private static applyOfferFilter(products: Product[], filter: OfferFilter): Product[] {
    switch (filter) {
      case OfferFilter.BEST_SELLERS:
        // Pour l'instant, on considère les produits en promotion comme best sellers
        // Vous pouvez ajouter une logique plus sophistiquée plus tard
        return products.filter(p => p.isPromotion || p.discount)
      
      case OfferFilter.PROMOTION:
        return products.filter(p => p.isPromotion)
      
      case OfferFilter.NEW:
        return products.filter(p => p.isNew)
      
      case OfferFilter.FLASH_SALE:
        // Produits avec une promotion importante (discount > 20%)
        return products.filter(p => p.discount && p.discount > 20)
      
      case OfferFilter.DESTOCKAGE:
        return products.filter(p => p.isDestockage)
      
      case OfferFilter.ALL:
      default:
        return products
    }
  }

  /**
   * Pagine les produits
   */
  static paginateProducts(
    products: Product[],
    params: PaginationParams
  ): PaginatedProducts {
    const { page, limit } = params
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = products.slice(startIndex, endIndex)
    const totalPages = Math.ceil(products.length / limit)

    return {
      products: paginatedProducts,
      total: products.length,
      page,
      limit,
      totalPages,
    }
  }

  /**
   * Récupère les produits paginés avec filtres
   */
  static async getPaginatedProducts(
    filters: CatalogueFilters,
    pagination: PaginationParams
  ): Promise<PaginatedProducts> {
    const filteredProducts = await this.getFilteredProducts(filters)
    return this.paginateProducts(filteredProducts, pagination)
  }
}

