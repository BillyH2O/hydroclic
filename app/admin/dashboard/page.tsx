import { ProductService } from '@/lib/services/products'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AdminDashboard } from '@/components/features/admin'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/**
 * Page Dashboard de l'administration
 * Accessible via /admin/dashboard
 * Protégée par ADMIN_PASSWORD (middleware)
 */
export default async function AdminDashboardPage() {
  const products = await ProductService.getAllProducts()

  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans">
      <Navbar solid/>
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* En-tête avec bouton retour */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil admin
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Statistiques générales sur vos produits
          </p>
        </div>

        {/* Dashboard */}
        <AdminDashboard products={products} />
      </main>

      <Footer />
    </div>
  )
}

