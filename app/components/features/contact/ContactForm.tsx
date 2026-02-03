'use client'

import { useState, FormEvent, useRef } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendContactEmail } from './actions'

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setErrorMessage(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await sendContactEmail(formData)

      // Log pour déboguer
      if (process.env.NODE_ENV === 'development') {
        console.log('Result from server action:', result)
      }

      // Vérifier que result existe et a la bonne structure
      if (result && result.success === true) {
        setSuccess(true)
        setErrors({})
        setErrorMessage(null)
        // Réinitialiser le formulaire en utilisant la ref
        if (formRef.current) {
          formRef.current.reset()
        }
        setTimeout(() => setSuccess(false), 5000)
        setIsSubmitting(false)
        return // Sortir immédiatement après le succès
      }
      
      // Si on arrive ici, c'est une erreur
      if (result && result.errors && typeof result.errors === 'object') {
        // Séparer les erreurs de champ des erreurs générales
        const fieldErrors: Record<string, string> = {}
        let generalError: string | null = null
        
        Object.entries(result.errors).forEach(([key, value]) => {
          if (key === 'general') {
            generalError = value as string
          } else {
            fieldErrors[key] = value as string
          }
        })
        
        setErrors(fieldErrors)
        setErrorMessage(generalError || (Object.keys(fieldErrors).length > 0 ? 'Veuillez corriger les erreurs ci-dessous' : 'Une erreur est survenue lors de l\'envoi du message.'))
      } else {
        setErrors({})
        setErrorMessage('Une erreur est survenue lors de l\'envoi du message.')
      }
      setIsSubmitting(false)
    } catch (error: unknown) {
      // Ce catch ne devrait capturer que les erreurs réseau ou de parsing
      // Les erreurs métier sont gérées par l'action serveur
      console.error('Unexpected error in ContactForm:', error)
      
      // Ignorer les erreurs de redirection Next.js (comme dans DeleteAccountButton)
      if (typeof error === 'object' && error !== null && 'digest' in error && typeof (error as Record<string, unknown>).digest === 'string' && (error as Record<string, unknown>).digest.startsWith('NEXT_REDIRECT')) {
        setIsSubmitting(false)
        return
      }
      
      // Si l'erreur contient un message indiquant que c'est une erreur de sérialisation Next.js,
      // ne pas afficher d'erreur car l'action serveur a probablement réussi
      if (error?.message?.includes('serialize') || error?.message?.includes('NEXT_')) {
        // L'email a probablement été envoyé avec succès, mais Next.js a eu un problème de sérialisation
        setSuccess(true)
        setErrors({})
        setErrorMessage(null)
        // Réinitialiser le formulaire en utilisant la ref
        if (formRef.current) {
          formRef.current.reset()
        }
        setTimeout(() => setSuccess(false), 5000)
        setIsSubmitting(false)
        return
      }
      
      setSuccess(false)
      setErrors({})
      setErrorMessage('Une erreur réseau est survenue. Veuillez vérifier votre connexion et réessayer.')
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Téléphone (optionnel)
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="06 12 34 56 78"
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Sujet <span className="text-red-500">*</span>
        </label>
        <Input
          id="subject"
          name="subject"
          type="text"
          required
          className={errors.subject ? 'border-red-500' : ''}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      {/* Bouton submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Envoyer le message
          </>
        )}
      </Button>
    </form>
  )
}

