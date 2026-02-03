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
        
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">404</h1>
          <h2 className="text-3xl font-semibold text-white/90 mb-4 drop-shadow-md">
            Page non trouvée
          </h2>
          <p className="text-lg text-white/80 mb-8 drop-shadow-sm">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Retour à l&apos;accueil
          </Link>
        </main>

        <Footer />
      </div>
    </div>
  )
}
