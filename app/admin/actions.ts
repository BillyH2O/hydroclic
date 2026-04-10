'use server'

import { revalidatePath } from 'next/cache'
import { ProductService } from '@/lib/services/products'
import { Product } from '@/lib/types/product'
import { prisma } from '@/lib/prisma'
import { STORE_SETTINGS_ID } from '@/lib/db/storeSettings'

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
  ribbonText?: string
  ribbonColor?: string
}): Promise<{ success: boolean; product?: Product; error?: string }> {
  try {
    const product = await ProductService.createProduct(data)
    revalidatePath('/admin')
    revalidatePath('/admin/catalogue')
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
    ribbonText?: string
    ribbonColor?: string
  }
): Promise<{ success: boolean; product?: Product; error?: string }> {
  try {
    const product = await ProductService.updateProduct(id, data)
    revalidatePath('/admin')
    revalidatePath('/admin/catalogue')
    // Invalider par UUID et par slug (le produit peut être accessible via l'un ou l'autre)
    revalidatePath(`/produit/${id}`)
    if (product.slug) revalidatePath(`/produit/${product.slug}`)
    revalidatePath('/catalogue')
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
    revalidatePath('/admin/catalogue')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: 'Erreur lors de la suppression du produit' }
  }
}

export async function updateShippingSettingsAction(
  _prev: { success: boolean; error?: string } | undefined,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const feeRaw = formData.get('shippingFeeEur')?.toString().trim() ?? ''
    const thresholdRaw = formData.get('freeShippingThresholdEur')?.toString().trim() ?? ''

    const shippingFeeEur =
      feeRaw === '' ? 0 : Number.parseFloat(feeRaw.replace(',', '.'))
    if (!Number.isFinite(shippingFeeEur) || shippingFeeEur < 0) {
      return { success: false, error: 'Montant des frais de livraison invalide' }
    }

    let freeShippingThresholdEur: number | null = null
    if (thresholdRaw !== '') {
      const t = Number.parseFloat(thresholdRaw.replace(',', '.'))
      if (!Number.isFinite(t) || t < 0) {
        return { success: false, error: 'Seuil de livraison gratuite invalide' }
      }
      freeShippingThresholdEur = t
    }

    await prisma.storeSettings.upsert({
      where: { id: STORE_SETTINGS_ID },
      create: {
        id: STORE_SETTINGS_ID,
        shippingFeeEur,
        freeShippingThresholdEur,
      },
      update: {
        shippingFeeEur,
        freeShippingThresholdEur,
      },
    })

    revalidatePath('/admin/livraison')
    return { success: true }
  } catch (error) {
    console.error('updateShippingSettingsAction:', error)
    return { success: false, error: 'Erreur lors de l’enregistrement' }
  }
}


