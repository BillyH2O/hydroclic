import Link from 'next/link'
import { ArrowLeft, Truck } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { getResolvedStoreShipping } from '@/lib/db/storeSettings'
import AdminLivraisonForm from './AdminLivraisonForm'

export default async function AdminLivraisonPage() {
  const settings = await getResolvedStoreShipping()

  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans">
      <Navbar solid />

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil admin
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
              <Truck className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Livraison</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Définissez les frais de port pour la livraison à domicile et le montant à partir duquel
            la livraison est gratuite.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
          <AdminLivraisonForm
            initialFee={settings.shippingFeeEur}
            initialThreshold={settings.freeShippingThresholdEur}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
