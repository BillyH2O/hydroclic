import { Product, ProductCategory } from './product'

/**
 * Types de filtres pour le catalogue
 */
export enum OfferFilter {
  ALL = 'tous',
  BEST_SELLERS = 'best-sellers',
  PROMOTION = 'promotion',
  NEW = 'new',
  FLASH_SALE = 'flash-sale',
  DESTOCKAGE = 'destockage'
}

export type ProductTypeFilter = ProductCategory | 'tous'

export type SortOption = 
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'

export interface CatalogueFilters {
  offer: OfferFilter
  productType: ProductTypeFilter
  sort: SortOption
  search?: string
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedProducts {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

