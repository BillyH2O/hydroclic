'use client'

import { useState } from 'react'
import { UserAccountType } from '@/lib/types/user'
import { User, Building2 } from 'lucide-react'

interface AccountTypeSelectorProps {
  onSelect: (type: UserAccountType) => void
}

export default function AccountTypeSelector({ onSelect }: AccountTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<UserAccountType | null>(null)

  const handleSelect = (type: UserAccountType) => {
    setSelectedType(type)
    onSelect(type)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">
        Choisissez votre type de compte
      </h2>
      <p className="text-blue-700 mb-6">
        Sélectionnez le type de compte qui correspond à votre profil
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => handleSelect('particulier')}
          className={`p-6 border-2 rounded-lg transition-all text-left ${
            selectedType === 'particulier'
              ? 'border-primary bg-primary/10 shadow-md'
              : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50/50'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full transition-colors ${
              selectedType === 'particulier'
                ? 'bg-primary text-white'
                : 'bg-primary/10 text-primary'
            }`}>
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-1">
                Particulier
              </h3>
              <p className="text-sm text-blue-700">
                Pour vos projets personnels et vos besoins individuels
              </p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleSelect('professionnel')}
          className={`p-6 border-2 rounded-lg transition-all text-left ${
            selectedType === 'professionnel'
              ? 'border-blue-600 bg-blue-50 shadow-md'
              : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50/50'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full transition-colors ${
              selectedType === 'professionnel'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-600'
            }`}>
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-1">
                Professionnel
              </h3>
              <p className="text-sm text-blue-700">
                Pour les entreprises et professionnels du bâtiment
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}


