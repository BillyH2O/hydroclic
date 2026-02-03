'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { X } from 'lucide-react'
import { ProfessionalForm } from '@/components/features/auth'
import { ProfessionalInfo } from '@/lib/types/user'
import DeleteAccountButton from './DeleteAccountButton'
import UpgradeToProfessionalButton from './UpgradeToProfessionalButton'
import { useAccountType } from '@/lib/hooks/useAccountType'

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { user } = useUser()
  const accountType = useAccountType()
  const [professionalInfo, setProfessionalInfo] = useState<Partial<ProfessionalInfo> | undefined>(undefined)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const isProfessional = accountType === 'professionnel'

  useEffect(() => {
    if (open && user) {
      const info = user.publicMetadata?.professionalInfo as UserPublicMetadata
      // Utiliser setTimeout pour éviter l'appel synchrone de setState
      const timer = setTimeout(() => {
        setProfessionalInfo(info)
        setIsAnimating(true)
      }, 0)
      // Empêcher le scroll du body quand le modal est ouvert
      document.body.style.overflow = 'hidden'
      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open, user])

  // Gérer la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }

    if (open) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [open, onOpenChange])

  const handleSuccess = () => {
    // Fermer le modal après succès
    setTimeout(() => {
      onOpenChange(false)
      // Rafraîchir la page pour mettre à jour les données
      window.location.reload()
    }, 1500)
  }

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onOpenChange(false)
    }, 200)
  }

  if (!open) return null

  return (
    <div 
      className={`fixed inset-0 bg-black/50 h-screen flex items-center justify-center z-[100] p-4 transition-opacity duration-200 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
    >
      <div 
        className={`bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative transition-all duration-200 z-[101] ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header avec bouton de fermeture */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Réglages du compte
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {isProfessional 
                ? 'Modifiez vos informations professionnelles'
                : 'Gérez les paramètres de votre compte'
              }
            </p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6">
          {isProfessional ? (
            <>
              {/* Pour les comptes professionnels : formulaire + suppression */}
              <ProfessionalForm 
                initialData={professionalInfo} 
                onSuccess={handleSuccess}
                onCancel={handleClose}
                showSkipButton={false}
              />
              
              {/* Section suppression de compte */}
              <DeleteAccountButton />
            </>
          ) : (
            <>
              {/* Pour les comptes particuliers : upgrade + suppression */}
              <UpgradeToProfessionalButton />
              
              {/* Section suppression de compte */}
              <DeleteAccountButton />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

