'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { ProfessionalInfo } from '@/lib/types/user'

/**
 * Met à jour les informations professionnelles de l'utilisateur
 */
export async function updateProfessionalInfo(data: ProfessionalInfo) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return { error: 'Non authentifié' }
    }

    // Valider le SIRET (14 chiffres)
    if (!/^\d{14}$/.test(data.siret)) {
      return { error: 'Le SIRET doit contenir exactement 14 chiffres' }
    }

    // Valider le numéro de téléphone (format français)
    if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(data.phoneNumber)) {
      return { error: 'Format de numéro de téléphone invalide' }
    }

    // Mettre à jour les métadonnées publiques de l'utilisateur
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        accountType: 'professionnel',
        professionalInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          organizationName: data.organizationName,
          siret: data.siret,
        },
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Error updating professional info:', error)
    return { error: 'Erreur lors de la mise à jour des informations' }
  }
}


