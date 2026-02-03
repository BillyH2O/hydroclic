import { FilterTab } from './components/ProductFilterTabs'

export type FilterType = 'offers' | 'productTypes' | 'custom'

export interface FilterConfig {
  tabs: FilterTab[]
  filterType: FilterType
}

/**
 * Configuration pour les filtres de type "offres" (nouveautés, promotions, destockage)
 */
export const offerFiltersConfig: FilterConfig = {
  tabs: [
    {
      id: 'all',
      label: 'Tous',
    },
    {
      id: 'nouveaute',
      label: 'Nouveautés',
    },
    {
      id: 'promotion',
      label: 'Promotions',
    },
    {
      id: 'destockage',
      label: 'Destockage',
    },
  ],
  filterType: 'offers',
}

/**
 * Configuration pour les filtres de type "catégories produits" (hydrodistribution, sanitaire, etc.)
 */
export const productTypeFiltersConfig: FilterConfig = {
  tabs: [
    {
      id: 'all',
      label: 'Tous',
    },
    {
      id: 'hydrodistribution',
      label: 'Hydrodistribution',
    },
    {
      id: 'chauffage-climatisation',
      label: 'Chauffage & Climatisation',
    },
    {
      id: 'traitement-eau',
      label: 'Traitement de l\'eau',
    },
    {
      id: 'sanitaire',
      label: 'Sanitaire',
    },
    {
      id: 'outillage',
      label: 'Outillage',
    },
    {
      id: 'consommable',
      label: 'Consommable',
    },
  ],
  filterType: 'productTypes',
}

