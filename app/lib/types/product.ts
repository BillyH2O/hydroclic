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
  | 'electricite'
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
  ribbonText?: string | null
  ribbonColor?: string | null
}

export const RIBBON_COLORS: { value: string; label: string; bg: string; text: string }[] = [
  { value: 'red',    label: 'Rouge',   bg: 'bg-red-500',    text: 'text-white' },
  { value: 'orange', label: 'Orange',  bg: 'bg-orange-500', text: 'text-white' },
  { value: 'yellow', label: 'Jaune',   bg: 'bg-yellow-400', text: 'text-gray-900' },
  { value: 'green',  label: 'Vert',    bg: 'bg-green-500',  text: 'text-white' },
  { value: 'blue',   label: 'Bleu',    bg: 'bg-blue-600',   text: 'text-white' },
  { value: 'purple', label: 'Violet',  bg: 'bg-purple-600', text: 'text-white' },
  { value: 'black',  label: 'Noir',    bg: 'bg-gray-900',   text: 'text-white' },
]


