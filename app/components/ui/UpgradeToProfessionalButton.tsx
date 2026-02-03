'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, ArrowRight } from 'lucide-react'
import { Button } from './button'

export default function UpgradeToProfessionalButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = () => {
    setIsLoading(true)
    router.push('/onboarding/professional')
  }

  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <Building2 className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">
              Passer à un compte professionnel
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              Bénéficiez de tarifs préférentiels et d&apos;avantages exclusifs pour les professionnels.
            </p>
            <Button
              type="button"
              onClick={handleUpgrade}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? 'Redirection...' : 'Passer au compte professionnel'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

