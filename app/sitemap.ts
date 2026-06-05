import { MetadataRoute } from 'next'
import { ProductService } from '@/lib/services/products'

const BASE_URL =
  (process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.hydroclic.fr').replace(/\/$/, '')

const PRODUCT_TYPES = [
  'hydrodistribution',
  'chauffage-climatisation',
  'traitement-eau',
  'sanitaire',
  'outillage',
  'consommable',
  'electricite',
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/catalogue`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politique-de-confidentialite`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const categoryEntries: MetadataRoute.Sitemap = PRODUCT_TYPES.map((type) => ({
    url: `${BASE_URL}/catalogue?productType=${type}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  let productEntries: MetadataRoute.Sitemap = []
  try {
    const products = await ProductService.getAllProducts()
    productEntries = products.map((product) => {
      const path = product.slug
        ? `/produit/${product.slug}`
        : `/produit/${product.id}`
      return {
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })
  } catch (error) {
    console.error('[sitemap] Impossible de charger les produits:', error)
  }

  return [...staticEntries, ...categoryEntries, ...productEntries]
}
