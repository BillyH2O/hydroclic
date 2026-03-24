import { Suspense } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import AdminAccessForm from './AdminAccessForm'
import { isAdminGateConfigured } from '@/lib/admin/gate'

export default async function AdminAccessPage() {
  const configured = isAdminGateConfigured()

  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans">
      <Navbar solid />

      <main className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès administration</h1>
          <p className="text-gray-600 text-sm mb-6">
            Saisissez le mot de passe défini dans la variable d’environnement{' '}
            <code className="text-xs bg-gray-100 px-1 rounded">ADMIN_PASSWORD</code>.
          </p>

          {!configured ? (
            <div className="rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-sm px-3 py-2">
              La protection par mot de passe n’est pas activée : définissez{' '}
              <strong>ADMIN_PASSWORD</strong> sur le serveur, puis redémarrez l’application.
            </div>
          ) : (
            <Suspense fallback={<div className="h-32 bg-gray-100 rounded animate-pulse" />}>
              <AdminAccessForm />
            </Suspense>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
