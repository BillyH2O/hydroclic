'use client'

import { useState, useEffect } from 'react'
import { SignUp, useUser } from '@clerk/nextjs'
import { useSearchParams, useRouter } from 'next/navigation'
import { AccountTypeSelector } from '@/components/features/auth'
import { UserAccountType } from '@/lib/types/user'
import { updateAccountType } from '@/onboarding/actions'
import { LoginBackground } from '@/components/features/login/Background'

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const [accountType, setAccountType] = useState<UserAccountType | null>(null)
  const [storedAccountType, setStoredAccountType] = useState<UserAccountType | null>(null)
  
  // Récupérer le type de compte depuis le localStorage si disponible
  useEffect(() => {
    const stored = localStorage.getItem('accountType') as UserAccountType | null
    if (stored) {
      // Utiliser setTimeout pour éviter l'appel synchrone de setState
      const timer = setTimeout(() => {
        setStoredAccountType(stored)
        setAccountType(stored)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [])

  // Sauvegarder le type de compte dans localStorage quand il change
  useEffect(() => {
    if (accountType) {
      localStorage.setItem('accountType', accountType)
    }
  }, [accountType])

  // Si l'utilisateur vient de s'inscrire et qu'on a un type de compte stocké, le sauvegarder
  useEffect(() => {
    if (isLoaded && user && storedAccountType) {
      // Sauvegarder le type de compte dans les métadonnées
      updateAccountType(storedAccountType).then(() => {
        localStorage.removeItem('accountType')
        // Toujours rediriger vers la page de vérification qui gérera la suite
        router.push('/onboarding/check')
      })
    }
  }, [isLoaded, user, storedAccountType, router])
  
  // Vérifier aussi si l'utilisateur est déjà connecté mais n'a pas de type de compte défini
  // Cela peut arriver avec OAuth si le localStorage a été perdu
  useEffect(() => {
    if (isLoaded && user && !storedAccountType) {
      const accountType = user.publicMetadata?.accountType as string | undefined
      const professionalInfo = user.publicMetadata?.professionalInfo as UserPublicMetadata
      
      // Si professionnel sans infos complètes, rediriger vers onboarding
      if (accountType === 'professionnel' && !professionalInfo?.siret) {
        router.push('/onboarding/professional')
      }
    }
  }, [isLoaded, user, storedAccountType, router])
  
  // Pour OAuth, toujours rediriger vers la page de vérification
  // qui gérera la redirection vers /onboarding/professional si nécessaire
  const afterSignUpUrl = searchParams?.get('after_sign_up_url')?.includes('choose-organization')
    ? '/onboarding/check'
    : '/onboarding/check'

  // Si aucun type de compte n'est sélectionné, afficher le sélecteur
  if (!accountType) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Background plein écran */}
        <div className="fixed inset-0 z-0">
          <LoginBackground />
        </div>
        
        {/* Sélecteur centré par-dessus */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-12 py-8">
          <div className="w-full max-w-2xl">
            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border-2 border-blue-200/50 p-8">
              <AccountTypeSelector onSelect={setAccountType} />
            </div>
          </div>
        </div>
      </div>
    )
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
          <SignUp 
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            afterSignUpUrl={afterSignUpUrl}
            fallbackRedirectUrl="/onboarding/check"
            forceRedirectUrl={afterSignUpUrl}
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "bg-white/95 backdrop-blur-md shadow-2xl border-2 border-blue-200/50 rounded-2xl overflow-hidden",
                headerTitle: "text-blue-900 font-bold text-2xl mb-2",
                headerSubtitle: "text-blue-700 text-base",
                socialButtonsBlockButton: "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 rounded-lg font-medium",
                formButtonPrimary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]",
                footerActionLink: "text-blue-600 hover:text-blue-700 font-semibold transition-colors",
                identityPreviewText: "text-blue-900 font-medium",
                identityPreviewEditButton: "text-blue-600 hover:text-blue-700 transition-colors",
                formFieldLabel: "text-blue-900 font-semibold text-sm mb-1.5",
                formFieldInput: "border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 px-4 py-2.5 text-base bg-white/90",
                dividerLine: "bg-blue-200",
                dividerText: "text-blue-700 font-medium",
                alertText: "text-blue-800 font-medium",
                formResendCodeLink: "text-blue-600 hover:text-blue-700 font-semibold transition-colors",
                formFieldInputShowPasswordButton: "text-blue-600 hover:text-blue-700",
                formFieldInputShowPasswordIcon: "text-blue-600",
                footer: "mt-6",
                formButtonReset: "text-blue-600 hover:text-blue-700",
              },
              variables: {
                colorPrimary: "#0061D8",
                colorText: "#1e3a5f",
                colorTextSecondary: "#4a5568",
                colorBackground: "#ffffff",
                colorInputBackground: "#ffffff",
                colorInputText: "#1e3a5f",
                borderRadius: "0.5rem",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

