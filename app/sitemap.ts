import { MetadataRoute } from 'next'
import { ProductService } from '@/lib/services/products'

const BASE_URL =
  (process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.hydroclic.fr').replace(/\/$/, '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Pages statiques indexables uniquement — pas de query params (Google voit
  // les URLs filtrées comme du contenu dupliqué ou génère des redirect errors).
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

  return [...staticEntries, ...productEntries]
}
