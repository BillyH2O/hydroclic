import { z } from 'zod'
import { ContactFormData } from '@/lib/types/contact'

/**
 * Schéma de validation pour le formulaire de contact
 */
export const contactFormSchema = z.object({
  name: z.string()
    .min(1, 'Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  email: z.string()
    .min(1, 'L\'email est requis')
    .email('Email invalide'),
  phone: z.string()
    .optional()
    .nullable()
    .transform((val) => val || undefined),
  subject: z.string()
    .min(1, 'Le sujet est requis')
    .min(3, 'Le sujet doit contenir au moins 3 caractères')
    .max(200, 'Le sujet ne peut pas dépasser 200 caractères'),
  message: z.string()
    .min(1, 'Le message est requis')
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères'),
})

/**
 * Valide les données du formulaire de contact
 */
export function validateContactForm(data: unknown): {
  success: boolean
  data?: ContactFormData
  errors?: Record<string, string>
} {
  // Utiliser safeParse au lieu de parse pour éviter les exceptions
  const result = contactFormSchema.safeParse(data)
  
  if (result.success) {
    return { success: true, data: result.data as ContactFormData }
  }
  
  // Extraire les erreurs de validation
  const errors: Record<string, string> = {}
  
  for (const issue of result.error.issues) {
    const fieldName = issue.path[0] ? String(issue.path[0]) : 'general'
    // Ne garder que la première erreur par champ
    if (!errors[fieldName]) {
      errors[fieldName] = issue.message
    }
  }
  
  // Log en développement
  if (process.env.NODE_ENV === 'development') {
    console.log('Zod validation issues:', result.error.issues)
  }
  
  return { 
    success: false, 
    errors: Object.keys(errors).length > 0 ? errors : { general: 'Erreur de validation' } 
  }
}
