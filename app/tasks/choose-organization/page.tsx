import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

/**
 * Page de redirection pour éviter la sélection d'organisation
 * Redirige automatiquement vers la page d'accueil
 */
export default async function ChooseOrganizationPage() {
  // Vérifier que l'utilisateur est authentifié
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Rediriger directement vers la page d'accueil
  redirect('/')
}


