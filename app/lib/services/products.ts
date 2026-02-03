import { Product, ProductCategory } from '@/lib/types/product'
import {
  getAllProducts as getAllProductsFromDb,
  getProductById as getProductByIdFromDb,
  getProductsByCategory as getProductsByCategoryFromDb,
  getSimilarProducts as getSimilarProductsFromDb,
  getPromotionProducts as getPromotionProductsFromDb,
  getNewProducts as getNewProductsFromDb,
  createProduct as createProductInDb,
  updateProduct as updateProductInDb,
  deleteProduct as deleteProductInDb,
} from '@/lib/db/products'
import { ProductFilterDto } from '@/lib/validations/product'
import { getProductPrice } from '@/lib/utils'

/**
 * Service Layer - Logique métier pour les produits
 */
export class ProductService {
  /**
   * Obtient le prix du produit selon le type de compte
   */
  static getProductPrice(
    product: Product,
    accountType?: 'particulier' | 'professionnel' | string | null | undefined
  ): number {
    return getProductPrice(product.priceB2C, product.priceB2B, accountType)
  }

  /**
   * Calcule le prix final avec réduction selon le type de compte
   */
  static calculateFinalPrice(
    product: Product,
    accountType?: 'particulier' | 'professionnel' | string | null | undefined
  ): number {
    const basePrice = this.getProductPrice(product, accountType)
    if (product.discount && product.discount > 0) {
      return basePrice * (1 - product.discount / 100)
    }
    return basePrice
  }

  /**
   * Calcule le prix avec TVA
   */
  static calculatePriceWithTax(price: number, taxRate: number = 0.20): number {
    return price * (1 + taxRate)
  }

  /**
   * Calcule le montant économisé selon le type de compte
   */
  static calculateSavings(
    product: Product,
    accountType?: 'particulier' | 'professionnel' | string | null | undefined
  ): number {
    if (!product.discount) return 0
    const basePrice = this.getProductPrice(product, accountType)
    return basePrice - this.calculateFinalPrice(product, accountType)
  }

  /**
   * Détermine si un produit est éligible pour une promotion
   */
  static isEligibleForPromotion(product: Product): boolean {
    // Règle métier : pas de promo si déjà en destockage
    if (product.isDestockage) return false
    
    // Règle métier : promo seulement si prix B2C > 10€ (on vérifie le prix le plus bas)
    const minPrice = Math.min(product.priceB2C, product.priceB2B)
    if (minPrice < 10) return false
    
    return true
  }

  /**
   * Filtre les produits selon les critères
   */
  static filterProducts(products: Product[], filters: ProductFilterDto): Product[] {
    let filtered = [...products]

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    if (filters.productType && filters.productType !== 'all') {
      filtered = filtered.filter(p => p.productType === filters.productType)
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.priceB2C >= filters.minPrice!)
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.priceB2C <= filters.maxPrice!)
    }

    if (filters.isNew !== undefined) {
      filtered = filtered.filter(p => p.isNew === filters.isNew)
    }

    if (filters.isPromotion !== undefined) {
      filtered = filtered.filter(p => p.isPromotion === filters.isPromotion)
    }

    if (filters.isDestockage !== undefined) {
      filtered = filtered.filter(p => p.isDestockage === filters.isDestockage)
    }

    return filtered
  }

  /**
   * Récupère les produits par catégorie avec logique métier
   */
  static async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    const products = await getProductsByCategoryFromDb(category)
    
    // Logique métier : trier par prix croissant pour les promotions
    if (category === 'promotion') {
      return products.sort((a, b) => {
        const priceA = this.calculateFinalPrice(a)
        const priceB = this.calculateFinalPrice(b)
        return priceA - priceB
      })
    }
    
    return products
  }

  /**
   * Récupère les produits avec filtres appliqués
   */
  static async getFilteredProducts(filters: ProductFilterDto): Promise<Product[]> {
    const allProducts = await getAllProductsFromDb()
    return this.filterProducts(allProducts, filters)
  }

  /**
   * Récupère les produits en promotion (avec logique métier)
   */
  static async getPromotionProducts(): Promise<Product[]> {
    const products = await getPromotionProductsFromDb()
    
    // Logique métier : filtrer seulement ceux éligibles
    return products.filter(p => this.isEligibleForPromotion(p))
  }

  /**
   * Récupère les produits pour le slider d'offres
   */
  static async getOfferProducts(): Promise<Product[]> {
    const allProducts = await getAllProductsFromDb()
    
    // Logique métier : combiner promotion, nouveautés et destockage
    const promotionProducts = allProducts.filter(p => p.isPromotion || p.category === 'promotion')
    const nouveauteProducts = allProducts.filter(p => p.isNew || p.category === 'nouveaute')
    const destockageProducts = allProducts.filter(p => p.isDestockage || p.category === 'destockage')
    
    // Éviter les doublons
    const uniqueProducts = new Map<string, Product>()
    ;[...promotionProducts, ...nouveauteProducts, ...destockageProducts].forEach(p => {
      uniqueProducts.set(String(p.id), p)
    })
    
    return Array.from(uniqueProducts.values())
  }

  /**
   * Récupère les produits par type
   */
  static async getProductsByType(): Promise<Product[]> {
    const allProducts = await getAllProductsFromDb()
    return allProducts.filter(p => p.productType)
  }

  /**
   * Récupère un produit avec ses informations complètes
   */
  static async getProductWithDetails(id: string): Promise<{
    product: Product | null
    similarProducts: Product[]
    finalPrice: number
    savings: number
  }> {
    const product = await getProductByIdFromDb(id)
    
    if (!product) {
      return {
        product: null,
        similarProducts: [],
        finalPrice: 0,
        savings: 0,
      }
    }

    const similarProducts = await getSimilarProductsFromDb(id, 8)
    const finalPrice = this.calculateFinalPrice(product)
    const savings = this.calculateSavings(product)

    return {
      product,
      similarProducts,
      finalPrice,
      savings,
    }
  }

  // Méthodes de délégation vers DB layer (pour compatibilité)
  static async getAllProducts(): Promise<Product[]> {
    return await getAllProductsFromDb()
  }

  static async getProductById(id: string): Promise<Product | null> {
    return await getProductByIdFromDb(id)
  }

  static async getSimilarProducts(productId: string, limit: number = 8): Promise<Product[]> {
    return await getSimilarProductsFromDb(productId, limit)
  }

  static async getNewProducts(): Promise<Product[]> {
    return await getNewProductsFromDb()
  }

  // Méthodes CRUD
  static async createProduct(data: {
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
    // Logique métier : appliquer image par défaut
    if (!data.image) {
      data.image = '/default.png'
    }

    // Logique métier : déterminer isPromotion automatiquement
    if (data.discount && data.discount > 0) {
      data.isPromotion = true
    }

    // Logique métier : déterminer isDestockage si discount > 50%
    if (data.discount && data.discount > 50) {
      data.isDestockage = true
    }

    return await createProductInDb(data)
  }

  static async updateProduct(
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
    // Logique métier : mettre à jour isPromotion selon discount
    if (data.discount !== undefined) {
      data.isPromotion = data.discount > 0
    }

    // Logique métier : mettre à jour isDestockage si discount > 50%
    if (data.discount && data.discount > 50) {
      data.isDestockage = true
    }

    return await updateProductInDb(id, data)
  }

  static async deleteProduct(id: string): Promise<boolean> {
    return await deleteProductInDb(id)
  }
}

