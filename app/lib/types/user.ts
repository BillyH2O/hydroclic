/**
 * Types pour les utilisateurs et leurs métadonnées
 */

export type UserAccountType = 'particulier' | 'professionnel'

export interface ProfessionalInfo {
  firstName: string
  lastName: string
  phoneNumber: string
  organizationName: string
  siret: string
}

export interface UserMetadata {
  accountType?: UserAccountType
  professionalInfo?: ProfessionalInfo
  role?: 'admin' | 'user'
}


