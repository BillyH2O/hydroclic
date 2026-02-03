import { ProductService } from '@/lib/services/products'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import AdminCatalogueClient from './AdminCatalogueClient'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

/**
 * Page de gestion du catalogue
 * Accessible via /admin/catalogue
 * Affiche la liste complète des produits avec possibilité de modification
 */
export default async function AdminCataloguePage() {
  // Vérifier l'authentification
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Récupérer tous les produits depuis le Service Layer
  const products = await ProductService.getAllProducts()

  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans">
      <Navbar solid/>
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <AdminCatalogueClient initialProducts={products} />
      </main>

      <Footer />
    </div>
  )
}

