'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { Settings } from 'lucide-react'
import { Button } from './button'
import SettingsModal from './SettingsModal'

interface SettingsButtonProps {
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  fullWidth?: boolean
  onOpenModal?: () => void
}

export function SettingsButton({ 
  className = '', 
  variant = 'outline',
  fullWidth = false,
  onOpenModal
}: SettingsButtonProps & { onOpenModal?: () => void }) {
  const { user, isLoaded } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // En cours de chargement ou utilisateur non connecté ? Rien
  if (!isLoaded || !user) return null

  const handleClick = () => {
    setIsModalOpen(true)
    onOpenModal?.() // Callback pour fermer le menu mobile si nécessaire
  }

  return (
    <>
      <Button 
        variant={variant} 
        size="icon"
        onClick={handleClick}
        className={`hover:cursor-pointer ${fullWidth ? 'w-full' : ''} ${className}`}
        aria-label="Réglages"
      >
        <Settings className="w-4 h-4" />
      </Button>
      <SettingsModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  )
}

