/**
 * Types pour le formulaire de contact
 */

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

