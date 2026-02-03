import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans">
      <Navbar />
      
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Produit non trouvé
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Désolé, le produit que vous recherchez n&apos;existe pas ou a été supprimé.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Vérifiez que l&apos;ID du produit est correct. Les produits sont identifiés par leur slug ou leur ID unique dans la base de données.
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
  )
}

