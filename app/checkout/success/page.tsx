import { Suspense } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { LoginBackground } from '@/components/features/login/Background'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import CheckoutSuccessClient from './components/CheckoutSuccessClient'

interface CheckoutSuccessPageProps {
  searchParams: Promise<{
    session_id?: string
  }>
}

/**
 * Page de succès du paiement
 */
export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const params = await searchParams
  const sessionId = params.session_id

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background plein écran */}
      <div className="fixed inset-0 z-0">
        <LoginBackground />
      </div>
      
      <div className="relative z-10 w-full min-h-screen font-sans flex flex-col">
        <Navbar solid />
        
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
          <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl p-8 text-center border-2 border-white/50">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Paiement réussi !
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Merci pour votre commande. Nous avons bien reçu votre paiement.
            </p>

            {sessionId && (
              <Suspense fallback={<div className="h-20 bg-gray-200 rounded animate-pulse mb-6" />}>
                <CheckoutSuccessClient sessionId={sessionId} />
              </Suspense>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalogue">
                <Button variant="outline" size="lg">
                  Continuer les achats
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg">
                  Retour à l&apos;accueil
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

