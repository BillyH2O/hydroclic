import { Product } from '@/lib/types/product'
import { getProductById as getProductFromDb, getAllProducts as getAllProductsFromDb } from '@/lib/db/products'

/**
 * Récupère un produit par son ID depuis la base de données
 * @param id - L'ID du produit (string)
 * @returns Le produit trouvé ou null si non trouvé
 */
export async function getProductById(id: string | number): Promise<Product | null> {
  const productId = typeof id === 'string' ? id : String(id)
  return await getProductFromDb(productId)
}

/**
 * Récupère tous les produits disponibles depuis la base de données
 * @returns Tableau de tous les produits
 */
export async function getAllProducts(): Promise<Product[]> {
  return await getAllProductsFromDb()
}

