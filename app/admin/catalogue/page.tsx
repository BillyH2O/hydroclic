import { ProductService } from '@/lib/services/products'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import AdminCatalogueClient from './AdminCatalogueClient'

/**
 * Page de gestion du catalogue
 * Accessible via /admin/catalogue
 * Protégée par ADMIN_PASSWORD (middleware)
 */
export default async function AdminCataloguePage() {
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

