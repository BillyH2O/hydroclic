import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { LoginBackground } from '@/components/features/login/Background'

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background plein écran */}
      <div className="fixed inset-0 z-0">
        <LoginBackground />
      </div>
      
      <div className="relative z-10 w-full min-h-screen font-sans flex flex-col">
        <Navbar solid />
        
        <main className="flex-1 w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            404
          </h1>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 drop-shadow-md">
            Page non trouvée
          </h2>
          <p className="text-sm sm:text-base text-white mb-6 drop-shadow-sm max-w-sm mx-auto">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-primary text-sm font-semibold rounded-lg hover:bg-white/95 transition-colors duration-200 shadow-md"
          >
            Retour à l&apos;accueil
          </Link>
        </main>

        <Footer />
      </div>
    </div>
  )
}
