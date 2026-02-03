'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

/**
 * Supprime le compte de l'utilisateur actuel
 */
export async function deleteAccount() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return { error: 'Non authentifié' }
    }

    // Supprimer l'utilisateur via Clerk
    const client = await clerkClient()
    await client.users.deleteUser(userId)

    // Rediriger vers la page d'accueil
    // Clerk déconnectera automatiquement l'utilisateur après suppression
    redirect('/')
  } catch (error) {
    console.error('Error deleting account:', error)
    // Si c'est une redirection Next.js, la laisser passer
    if (error && typeof error === 'object' && 'digest' in error) {
      throw error
    }
    return { error: 'Erreur lors de la suppression du compte' }
  }
}

