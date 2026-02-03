import { prisma } from '../prisma'
import { Product, ProductCategory } from '@/lib/types/product'
import { getProductImage } from '@/lib/utils'
import type { Prisma } from '@prisma/client'
import type { Product as DbProduct } from '@prisma/client'

/**
 * Convertit un produit de la BDD en format Product pour le frontend
 */
function mapDbProductToProduct(dbProduct: DbProduct): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug || undefined,
    sku: dbProduct.sku || undefined,
    priceB2C: dbProduct.priceB2C ?? dbProduct.price ?? 0, // Fallback pour migration
    priceB2B: dbProduct.priceB2B ?? dbProduct.price ?? 0, // Fallback pour migration
    price: dbProduct.priceB2C ?? dbProduct.price ?? 0, // Prix par défaut (B2C) pour compatibilité
    image: getProductImage(dbProduct.image),
    imageAlt: dbProduct.imageAlt || dbProduct.name,
    href: dbProduct.slug ? `/produit/${dbProduct.slug}` : `/produit/${dbProduct.id}`,
    description: dbProduct.description || undefined,
    discount: dbProduct.discount || undefined,
    category: dbProduct.category as ProductCategory | undefined,
    productType: dbProduct.productType as ProductCategory | undefined,
    isNew: dbProduct.isNew || false,
    isPromotion: dbProduct.isPromotion || false,
    isDestockage: dbProduct.isDestockage || false,
  }
}

/**
 * Récupère tous les produits
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return products.map(mapDbProductToProduct)
  } catch (error) {
    console.error('Error fetching all products:', error)
    return []
  }
}

/**
 * Récupère un produit par son ID ou son slug
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    // Essayer d'abord par ID
    let product = await prisma.product.findUnique({
      where: { id },
    })
    
    // Si pas trouvé par ID, essayer par slug (slug est unique dans le schéma)
    if (!product) {
      product = await prisma.product.findFirst({
        where: { slug: id },
      })
    }
    
    return product ? mapDbProductToProduct(product) : null
  } catch (error) {
    console.error('Error fetching product by id:', error)
    return null
  }
}

/**
 * Récupère les produits par catégorie
 */
export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: category === 'all' ? undefined : category,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return products.map(mapDbProductToProduct)
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

/**
 * Récupère les produits par type
 */
export async function getProductsByType(productType: ProductCategory): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        productType: productType === 'all' ? undefined : productType,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return products.map(mapDbProductToProduct)
  } catch (error) {
    console.error('Error fetching products by type:', error)
    return []
  }
}

/**
 * Récupère les produits similaires (même catégorie ou même type)
 */
export async function getSimilarProducts(
  currentProductId: string,
  limit: number = 8
): Promise<Product[]> {
  try {
    const currentProduct = await prisma.product.findUnique({
      where: { id: currentProductId },
    })

    if (!currentProduct) return []

    const where: Prisma.ProductWhereInput = {
      id: { not: currentProductId },
    }

    // Chercher par catégorie ou type
    if (currentProduct.category) {
      where.category = currentProduct.category
    } else if (currentProduct.productType) {
      where.productType = currentProduct.productType
    } else {
      return []
    }

    const products = await prisma.product.findMany({
      where,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return products.map(mapDbProductToProduct)
  } catch (error) {
    console.error('Error fetching similar products:', error)
    return []
  }
}

/**
 * Récupère les produits en promotion
 */
export async function getPromotionProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isPromotion: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return products.map(mapDbProductToProduct)
  } catch (error) {
    console.error('Error fetching promotion products:', error)
    return []
  }
}

/**
 * Récupère les nouveaux produits
 */
export async function getNewProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isNew: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return products.map(mapDbProductToProduct)
  } catch (error) {
    console.error('Error fetching new products:', error)
    return []
  }
}

/**
 * Crée un nouveau produit
 */
export async function createProduct(data: {
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
}): Promise<Product> {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        ...(data.slug && { slug: data.slug }),
        ...(data.sku && { sku: data.sku }),
        priceB2C: data.priceB2C,
        priceB2B: data.priceB2B,
        image: data.image || '/default.png',
        ...(data.imageAlt && { imageAlt: data.imageAlt }),
        ...(data.description && { description: data.description }),
        ...(data.discount !== undefined && { discount: data.discount }),
        ...(data.category && { category: data.category }),
        ...(data.productType && { productType: data.productType }),
        isNew: data.isNew || false,
        isPromotion: data.isPromotion || false,
        isDestockage: data.isDestockage || false,
      },
    })
    return mapDbProductToProduct(product)
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

/**
 * Met à jour un produit
 */
export async function updateProduct(
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
): Promise<Product> {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        image: data.image || undefined, // Garder l'image existante si non fournie
      },
    })
    return mapDbProductToProduct(product)
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

/**
 * Supprime un produit
 */
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await prisma.product.delete({
      where: { id },
    })
    return true
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

