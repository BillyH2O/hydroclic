'use client'

import { useRouter } from 'next/navigation'
import { ProfessionalForm } from '@/components/features/auth'
import { ProfessionalInfo } from '@/lib/types/user'

interface SettingsFormClientProps {
  initialData?: Partial<ProfessionalInfo>
}

export default function SettingsFormClient({ initialData }: SettingsFormClientProps) {
  const router = useRouter()

  const handleSuccess = () => {
    // Rafraîchir la page pour afficher les nouvelles données
    router.refresh()
  }

  return (
    <ProfessionalForm 
      initialData={initialData} 
      onSuccess={handleSuccess}
      showSkipButton={false}
    />
  )
}


