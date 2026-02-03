'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { UserAccountType } from '@/lib/types/user'

/**
 * Met à jour le type de compte de l'utilisateur
 */
export async function updateAccountType(accountType: UserAccountType) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return { error: 'Non authentifié' }
    }

    // Mettre à jour les métadonnées publiques de l'utilisateur
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        accountType,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Error updating account type:', error)
    return { error: 'Erreur lors de la mise à jour du type de compte' }
  }
}


