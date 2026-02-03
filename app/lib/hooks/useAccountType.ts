'use client'

import { useUser } from '@clerk/nextjs'
import { useMemo } from 'react'

/**
 * Hook pour obtenir le type de compte de l'utilisateur
 * @returns Le type de compte ('particulier' | 'professionnel' | undefined)
 */
export function useAccountType(): 'particulier' | 'professionnel' | undefined {
  const { user, isLoaded } = useUser()

  return useMemo(() => {
    if (!isLoaded || !user) return undefined
    return user.publicMetadata?.accountType as 'particulier' | 'professionnel' | undefined
  }, [isLoaded, user])
}

