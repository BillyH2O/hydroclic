import { Product } from '@/lib/types/product'
import { getSimilarProducts as getSimilarProductsFromDb } from '@/lib/db/products'

/**
 * Récupère les produits similaires (même catégorie ou même type) depuis la base de données
 * @param currentProduct - Le produit actuel
 * @param limit - Nombre maximum de produits à retourner (défaut: 8)
 * @returns Tableau de produits similaires
 */
export async function getSimilarProducts(
  currentProduct: Product,
  limit: number = 8
): Promise<Product[]> {
  const productId = typeof currentProduct.id === 'string' ? currentProduct.id : String(currentProduct.id)
  return await getSimilarProductsFromDb(productId, limit)
}

