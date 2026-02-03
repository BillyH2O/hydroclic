import { ProductService } from '@/lib/services/products'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AdminDashboard, AdminNavCard } from '@/components/features/admin'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { BarChart3, Package } from 'lucide-react'

/**
 * Page d'accueil de l'administration
 * Accessible via /admin
 * Protégée par Clerk - nécessite une authentification
 */
export default async function AdminPage() {
  // Vérifier l'authentification
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Optionnel : vérifier les rôles/permissions si nécessaire
  // const user = await currentUser()
  // if (user && !user.publicMetadata?.isAdmin) {
  //   redirect('/')
  // }

  // Récupérer tous les produits pour les statistiques
  const products = await ProductService.getAllProducts()

  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans">
      <Navbar solid/>
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Administration</h1>
          <p className="text-gray-600 text-lg">
            Gérez votre catalogue et consultez les statistiques de votre boutique
          </p>
        </div>

        {/* Cartes de navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <AdminNavCard
            title="Dashboard"
            description="Consultez les statistiques générales sur vos produits, catégories et performances."
            href="/admin/dashboard"
            icon={BarChart3}
            iconColor="text-blue-600"
            bgGradient="from-blue-50 to-blue-100"
          />
          <AdminNavCard
            title="Modification du catalogue"
            description="Gérez votre catalogue : ajoutez, modifiez ou supprimez des produits."
            href="/admin/catalogue"
            icon={Package}
            iconColor="text-green-600"
            bgGradient="from-green-50 to-green-100"
          />
        </div>

        {/* Aperçu des statistiques */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Aperçu des statistiques</h2>
          <AdminDashboard products={products} />
        </div>
      </main>

      <Footer />
    </div>
  )
}


