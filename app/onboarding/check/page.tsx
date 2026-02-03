import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function OnboardingCheckPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // Vérifier les métadonnées
  const accountType = user.publicMetadata?.accountType as string | undefined
  const professionalInfo = user.publicMetadata?.professionalInfo as UserPublicMetadata

  // Si l'utilisateur n'a pas de type de compte défini mais vient de s'inscrire,
  // vérifier s'il y a un paramètre dans l'URL (pour OAuth)
  // Note: Pour OAuth, on ne peut pas récupérer les query params ici car c'est une redirection
  // Mais on peut vérifier si c'est un nouveau compte (créé récemment)
  const isNewAccount = user.createdAt && 
    (Date.now() - new Date(user.createdAt).getTime()) < 60000 // Moins d'1 minute


  if (accountType === 'professionnel') {
    const hasAllInfo = professionalInfo?.siret && 
                      professionalInfo?.firstName && 
                      professionalInfo?.lastName && 
                      professionalInfo?.organizationName &&
                      professionalInfo?.phoneNumber
    
    if (!hasAllInfo) {
      redirect('/onboarding/professional')
    }
  }

  // Si c'est un nouveau compte sans type défini, rediriger vers le sélecteur
  // Cela peut arriver si l'utilisateur s'est inscrit avec OAuth sans passer par le sélecteur
  if (isNewAccount && !accountType) {
    // Pour les nouveaux comptes OAuth, on les redirige vers le sélecteur
    // Mais seulement si vraiment nouveau (moins de 1 minute)
    redirect('/sign-up')
  }

  // Si tout est OK, rediriger vers la page d'accueil
  redirect('/')
}
