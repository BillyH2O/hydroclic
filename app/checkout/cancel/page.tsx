import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

/**
 * Page d'annulation du paiement
 */
export default function CheckoutCancelPage() {
  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans">
      <Navbar solid />
      
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-100 p-4">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Paiement annulé
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Votre paiement a été annulé. Aucun montant n&apos;a été débité.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogue">
              <Button variant="outline" size="lg">
                Retour au catalogue
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
  )
}

