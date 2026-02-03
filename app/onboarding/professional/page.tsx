import { auth, currentUser, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ProfessionalForm } from '@/components/features/auth'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

/**
 * Page pour compléter les informations professionnelles
 */
export default async function ProfessionalOnboardingPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // Vérifier si l'utilisateur a déjà complété son profil professionnel
  let accountType = user.publicMetadata?.accountType as string | undefined
  const professionalInfo = user.publicMetadata?.professionalInfo as UserPublicMetadata

  // Si le type de compte n'est pas défini, le définir automatiquement à "professionnel"
  // Cela peut arriver si l'utilisateur arrive ici via OAuth sans avoir choisi le type avant
  if (!accountType) {
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        accountType: 'professionnel',
      },
    })
    accountType = 'professionnel'
  }

  // Si déjà professionnel avec toutes les infos complètes, rediriger
  const hasAllInfo = professionalInfo?.siret && 
                    professionalInfo?.firstName && 
                    professionalInfo?.lastName && 
                    professionalInfo?.organizationName &&
                    professionalInfo?.phoneNumber
  
  if (accountType === 'professionnel' && hasAllInfo) {
    redirect('/')
  }

  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans">
      <Navbar solid />
      
      <main className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Informations professionnelles
          </h1>
          <p className="text-gray-600 mb-8">
            Complétez votre profil professionnel pour accéder à nos services dédiés aux professionnels.
          </p>
          
          <ProfessionalForm initialData={professionalInfo} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

