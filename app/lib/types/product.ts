/**
 * Types centralisés pour les produits
 * Ce fichier contient toutes les définitions de types liées aux produits
 */

export type ProductCategory = 
  | 'nouveaute' 
  | 'promotion' 
  | 'destockage' 
  | 'hydrodistribution'
  | 'chauffage-climatisation'
  | 'traitement-eau'
  | 'sanitaire'
  | 'outillage'
  | 'consommable'
  | 'all'

export interface Product {
  id: string | number
  name: string
  slug?: string // Slug URL-friendly pour le produit
  sku?: string // Stock Keeping Unit - identifiant unique du produit
  priceB2C: number // Prix pour les comptes particuliers (B2C)
  priceB2B: number // Prix pour les comptes professionnels (B2B)
  price?: number // Prix calculé selon le type de compte (pour compatibilité)
  image: string
  imageAlt?: string
  href?: string
  description?: string
  discount?: number
  category?: ProductCategory
  productType?: ProductCategory // Type de produit (hydrodistribution, sanitaire, etc.)
  isNew?: boolean
  isPromotion?: boolean
  isDestockage?: boolean
}


