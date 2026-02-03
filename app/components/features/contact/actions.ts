'use server'

import { EmailService } from '@/lib/services/email'
import { validateContactForm } from '@/lib/validations/contact'

/**
 * Action serveur pour envoyer un email de contact
 */
export async function sendContactEmail(formData: FormData) {
  try {
    // Extraire et nettoyer les données du FormData
    const name = formData.get('name')?.toString().trim() || ''
    const email = formData.get('email')?.toString().trim() || ''
    const phoneRaw = formData.get('phone')?.toString().trim()
    const phone = phoneRaw && phoneRaw !== '' ? phoneRaw : undefined
    const subject = formData.get('subject')?.toString().trim() || ''
    const message = formData.get('message')?.toString().trim() || ''

    const data = {
      name,
      email,
      phone, // undefined si vide ou null
      subject,
      message,
    }

    // Log en développement pour déboguer
    if (process.env.NODE_ENV === 'development') {
      console.log('Form data received:', { name, email, phone, subject, messageLength: message.length })
    }

    // Valider les données
    const validation = validateContactForm(data)
    if (!validation.success) {
      // Log des erreurs de validation en développement
      if (process.env.NODE_ENV === 'development') {
        console.log('Validation errors:', validation.errors)
      }
      return {
        success: false,
        errors: validation.errors || { general: 'Erreur de validation' },
      }
    }

    // Envoyer l'email
    try {
      await EmailService.sendContactEmail(validation.data!)
      
      // Si on arrive ici, l'email a été envoyé avec succès
      if (process.env.NODE_ENV === 'development') {
        console.log('Email sent successfully')
      }
      
      return {
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
      } as const
    } catch (emailError) {
      // Erreur spécifique lors de l'envoi de l'email
      console.error('Error sending email:', emailError)
      const emailErrorMessage = emailError instanceof Error 
        ? emailError.message 
        : 'Erreur lors de l\'envoi de l\'email'
      
      return {
        success: false,
        errors: {
          general: process.env.NODE_ENV === 'development' 
            ? `Erreur d'envoi: ${emailErrorMessage}` 
            : 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.',
        },
      }
    }
  } catch (error) {
    console.error('Error sending contact email:', error)
    
    // Message d'erreur plus détaillé pour le développement
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Une erreur est survenue lors de l\'envoi du message.'
    
    // Vérifier si c'est un problème de configuration
    if (errorMessage.includes('EMAIL_USER') || errorMessage.includes('EMAIL_PASSWORD') || errorMessage.includes('ADMIN_EMAIL')) {
      console.error('Configuration email manquante:', errorMessage)
      return {
        success: false,
        errors: {
          general: 'Configuration email manquante. Veuillez contacter l\'administrateur.',
        },
      }
    }
    
    return {
      success: false,
      errors: {
        general: process.env.NODE_ENV === 'development' 
          ? `Erreur: ${errorMessage}` 
          : 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.',
      },
    }
  }
}

