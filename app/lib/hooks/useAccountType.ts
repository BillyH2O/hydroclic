'use client'

import { useUser } from '@clerk/nextjs'
import { useMemo } from 'react'

export function useAccountType(): 'particulier' | 'professionnel' | undefined {
  const { user } = useUser()

  return useMemo(() => {
    if (user) {
      return user.publicMetadata?.accountType as 'particulier' | 'professionnel' | undefined
    }
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('accountType')
      if (stored === 'particulier' || stored === 'professionnel') {
        return stored
      }
    }
    return 'particulier'
  }, [user])
}
