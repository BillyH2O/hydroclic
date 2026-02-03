import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import SettingsFormClient from './SettingsFormClient'

/**
 * Page de réglages pour modifier les informations professionnelles
 */
export default async function SettingsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const accountType = user.publicMetadata?.accountType as string | undefined
  const professionalInfo = user.publicMetadata?.professionalInfo as UserPublicMetadata

  // Rediriger si ce n'est pas un compte professionnel
  if (accountType !== 'professionnel') {
    redirect('/')
  }

  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans flex flex-col justify-between">
      <Navbar solid />
      
      <main className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Réglages du compte professionnel
          </h1>
          <p className="text-gray-600 mb-8">
            Modifiez vos informations professionnelles. Ces informations seront utilisées pour vos commandes et factures.
          </p>
          
          <SettingsFormClient initialData={professionalInfo} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

