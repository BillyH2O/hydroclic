import { z } from 'zod'

/**
 * Schéma de validation pour créer un produit
 */
export const createProductSchema = z.object({
  name: z.string().min(1, 'Le nom est requis').max(200, 'Le nom est trop long'),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Le slug doit être en minuscules avec des tirets').optional(),
  sku: z.string().optional(),
  priceB2C: z.number().positive('Le prix B2C doit être positif'),
  priceB2B: z.number().positive('Le prix B2B doit être positif'),
  image: z.string().url('URL invalide').optional().or(z.literal('/default.png')),
  imageAlt: z.string().optional(),
  description: z.string().max(1000, 'La description est trop longue').optional(),
  discount: z.number().min(0, 'La réduction ne peut pas être négative').max(100, 'La réduction ne peut pas dépasser 100%').optional(),
  category: z.enum(['nouveaute', 'promotion', 'destockage', 'all']).optional(),
  productType: z.enum([
    'hydrodistribution',
    'chauffage-climatisation',
    'traitement-eau',
    'sanitaire',
    'outillage',
    'consommable',
    'all'
  ]).optional(),
  isNew: z.boolean().optional(),
  isPromotion: z.boolean().optional(),
  isDestockage: z.boolean().optional(),
})

/**
 * Schéma de validation pour mettre à jour un produit
 */
export const updateProductSchema = createProductSchema.partial()

/**
 * Schéma de validation pour les filtres de produits
 */
export const productFilterSchema = z.object({
  category: z.enum(['nouveaute', 'promotion', 'destockage', 'all']).optional(),
  productType: z.enum([
    'hydrodistribution',
    'chauffage-climatisation',
    'traitement-eau',
    'sanitaire',
    'outillage',
    'consommable',
    'all'
  ]).optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  isNew: z.boolean().optional(),
  isPromotion: z.boolean().optional(),
  isDestockage: z.boolean().optional(),
})

// Types TypeScript générés automatiquement
export type CreateProductDto = z.infer<typeof createProductSchema>
export type UpdateProductDto = z.infer<typeof updateProductSchema>
export type ProductFilterDto = z.infer<typeof productFilterSchema>



