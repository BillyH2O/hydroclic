import { LoginBackground } from '@/components/features/login/Background'
import { SignIn } from '@clerk/nextjs'

export default async function SignInPage() {
  // Résoudre searchParams si c'est une Promise (Next.js 15+)
 

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background plein écran */}
      <div className="fixed inset-0 z-0">
        <LoginBackground />
      </div>
      
      {/* Formulaire centré par-dessus */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-12 py-8">
        <div className="w-full max-w-md">
          <SignIn 
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/onboarding/check"
            fallbackRedirectUrl="/onboarding/check"
            forceRedirectUrl="/onboarding/check"
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

