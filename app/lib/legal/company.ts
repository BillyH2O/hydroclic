/**
 * Identité légale HYDROCLIC — source unique pour mentions, RGPD, CGV et cookies.
 * Données publiques : RCS / annonce légale de création (octobre 2025).
 */
export const COMPANY = {
  tradeName: 'Hydroclic',
  legalName: 'HYDROCLIC',
  legalForm: 'Société par actions simplifiée (SAS)',
  shareCapital: '1 000 €',
  siren: '992 517 631',
  siret: '992 517 631 00014',
  tva: 'FR68992517631',
  rcs: 'RCS Bobigny 992 517 631',
  naf: '4674B — Commerce de gros de fournitures pour la plomberie et le chauffage',
  publicationDirector: 'HOLDING S.F.S.H, Président de HYDROCLIC SAS',
  address: {
    line1: '86 boulevard Félix Faure',
    zip: '93300',
    city: 'Aubervilliers',
    country: 'France',
    full: '86 boulevard Félix Faure, 93300 Aubervilliers, France',
  },
  email: 'shop@hydroclic.fr',
  phoneDisplay: '+33 6 11 33 87 78',
  phoneTel: '+33611338778',
  siteUrl: 'https://www.hydroclic.fr',
  host: {
    name: 'Vercel Inc.',
    address: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
    url: 'https://vercel.com',
  },
  lastUpdated: '24 août 2026',
  lastUpdatedIso: '2026-08-24',
} as const

export const LEGAL_PATHS = {
  mentions: '/mentions-legales',
  privacy: '/politique-de-confidentialite',
  cookies: '/politique-cookies',
  cgv: '/conditions-generales-de-vente',
} as const
