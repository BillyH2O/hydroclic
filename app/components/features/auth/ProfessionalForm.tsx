'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateProfessionalInfo } from '@/onboarding/professional/actions'
import { ProfessionalInfo } from '@/lib/types/user'
import { Pencil } from 'lucide-react'

interface ProfessionalFormProps {
  initialData?: Partial<ProfessionalInfo>
  onSuccess?: () => void
  onCancel?: () => void
  showSkipButton?: boolean
}

export default function ProfessionalForm({ 
  initialData, 
  onSuccess,
  onCancel,
  showSkipButton = true 
}: ProfessionalFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isEditing, setIsEditing] = useState(!initialData || Object.keys(initialData).length === 0)
  const [formData, setFormData] = useState<ProfessionalInfo>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    phoneNumber: initialData?.phoneNumber || '',
    organizationName: initialData?.organizationName || '',
    siret: initialData?.siret || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validation côté client
    if (!formData.firstName.trim()) {
      setError('Le prénom est requis')
      setLoading(false)
      return
    }

    if (!formData.lastName.trim()) {
      setError('Le nom est requis')
      setLoading(false)
      return
    }

    if (!formData.phoneNumber.trim()) {
      setError('Le numéro de téléphone est requis')
      setLoading(false)
      return
    }

    if (!formData.organizationName.trim()) {
      setError('Le nom de l\'organisation est requis')
      setLoading(false)
      return
    }

    if (!/^\d{14}$/.test(formData.siret)) {
      setError('Le SIRET doit contenir exactement 14 chiffres')
      setLoading(false)
      return
    }

    const result = await updateProfessionalInfo(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      
      // Si onSuccess est fourni, l'appeler
      if (onSuccess) {
        onSuccess()
      } else {
        // Sinon, rediriger vers la page d'accueil après succès
        setTimeout(() => {
          router.push('/')
          router.refresh()
        }, 1500)
      }
    }
  }

  const handleChange = (field: keyof ProfessionalInfo) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  // Mode lecture seule - affichage des informations
  if (!isEditing && initialData && Object.keys(initialData).length > 0) {
    return (
      <div className="space-y-6">
        {/* Bouton Modifier en haut */}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Pencil className="w-4 h-4" />
            Modifier
          </Button>
        </div>

        {/* Affichage des informations */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <Label className="text-xs uppercase tracking-wide text-gray-500 font-medium">Prénom</Label>
              <p className="mt-2 text-gray-900 text-lg font-semibold">{formData.firstName || '—'}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <Label className="text-xs uppercase tracking-wide text-gray-500 font-medium">Nom</Label>
              <p className="mt-2 text-gray-900 text-lg font-semibold">{formData.lastName || '—'}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <Label className="text-xs uppercase tracking-wide text-gray-500 font-medium">Numéro de téléphone</Label>
            <p className="mt-2 text-gray-900 text-lg font-semibold">{formData.phoneNumber || '—'}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <Label className="text-xs uppercase tracking-wide text-gray-500 font-medium">Nom de l&apos;organisation</Label>
            <p className="mt-2 text-gray-900 text-lg font-semibold">{formData.organizationName || '—'}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <Label className="text-xs uppercase tracking-wide text-gray-500 font-medium">SIRET</Label>
            <p className="mt-2 text-gray-900 text-lg font-mono font-semibold tracking-wider">{formData.siret || '—'}</p>
          </div>
        </div>
      </div>
    )
  }

  // Mode édition - formulaire
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          Vos informations ont été mises à jour avec succès !
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            required
            placeholder="Jean"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="lastName">Nom *</Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            required
            placeholder="Dupont"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phoneNumber">Numéro de téléphone *</Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange('phoneNumber')}
          required
          placeholder="06 12 34 56 78"
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          Format : 06 12 34 56 78 ou +33 6 12 34 56 78
        </p>
      </div>

      <div>
        <Label htmlFor="organizationName">Nom de l&apos;organisation *</Label>
        <Input
          id="organizationName"
          type="text"
          value={formData.organizationName}
          onChange={handleChange('organizationName')}
          required
          placeholder="Entreprise SARL"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="siret">SIRET *</Label>
        <Input
          id="siret"
          type="text"
          value={formData.siret}
          onChange={handleChange('siret')}
          required
          placeholder="12345678901234"
          maxLength={14}
          pattern="\d{14}"
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          Le SIRET doit contenir exactement 14 chiffres
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={loading || success}
          className="flex-1"
        >
          {loading ? 'Enregistrement...' : success ? 'Enregistré !' : 'Enregistrer'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (initialData && Object.keys(initialData).length > 0) {
              // Si on a des données initiales, retourner en mode lecture
              setIsEditing(false)
              setError(null)
              // Réinitialiser les données du formulaire
              setFormData({
                firstName: initialData?.firstName || '',
                lastName: initialData?.lastName || '',
                phoneNumber: initialData?.phoneNumber || '',
                organizationName: initialData?.organizationName || '',
                siret: initialData?.siret || '',
              })
            } else if (onCancel) {
              // Sinon, appeler onCancel
              onCancel()
            } else if (showSkipButton) {
              // Ou rediriger
              router.push('/')
            }
          }}
          disabled={loading}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}

