'use client'

import { SignOutButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { LoginBackground } from '@/components/features/login/Background'

export default function SignOutPage() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 z-0">
          <LoginBackground />
        </div>
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <div className="text-white text-xl drop-shadow-lg">Chargement...</div>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return null
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background plein écran */}
      <div className="fixed inset-0 z-0">
        <LoginBackground />
      </div>
      
      {/* Formulaire centré par-dessus */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-12 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-md shadow-2xl border-2 border-blue-200/50 rounded-2xl p-8 text-center">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">
              Déconnexion
            </h1>
            <p className="text-blue-700 mb-8">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-200"
              >
                Annuler
              </Button>
              <SignOutButton redirectUrl="/sign-in">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                  Se déconnecter
                </Button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
