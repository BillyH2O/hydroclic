'use server'

import { revalidatePath } from 'next/cache'
import { ProductService } from '@/lib/services/products'
import { Product } from '@/lib/types/product'

/**
 * Server Actions pour les opérations CRUD sur les produits
 */

export async function createProductAction(data: {
  name: string
  slug?: string
  sku?: string
  priceB2C: number
  priceB2B: number
  image?: string
  imageAlt?: string
  description?: string
  discount?: number
  category?: string
  productType?: string
  isNew?: boolean
  isPromotion?: boolean
  isDestockage?: boolean
}): Promise<{ success: boolean; product?: Product; error?: string }> {
  try {
    const product = await ProductService.createProduct(data)
    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true, product }
  } catch (error) {
    console.error('Error creating product:', error)
    return { success: false, error: 'Erreur lors de la création du produit' }
  }
}

export async function updateProductAction(
  id: string,
  data: {
    name?: string
    slug?: string
    sku?: string
    priceB2C?: number
    priceB2B?: number
    image?: string
    imageAlt?: string
    description?: string
    discount?: number
    category?: string
    productType?: string
    isNew?: boolean
    isPromotion?: boolean
    isDestockage?: boolean
  }
): Promise<{ success: boolean; product?: Product; error?: string }> {
  try {
    const product = await ProductService.updateProduct(id, data)
    revalidatePath('/admin')
    revalidatePath(`/produit/${id}`)
    revalidatePath('/')
    return { success: true, product }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: 'Erreur lors de la mise à jour du produit' }
  }
}

export async function deleteProductAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await ProductService.deleteProduct(id)
    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: 'Erreur lors de la suppression du produit' }
  }
}


