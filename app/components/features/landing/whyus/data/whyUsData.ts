import { Shield, Truck, Award, HeadphonesIcon } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface WhyUsPoint {
  icon: LucideIcon
  title: string
  description: string
}

export const whyUsData: WhyUsPoint[] = [
  {
    icon: Shield,
    title: 'Qualité garantie',
    description: 'Tous nos produits sont certifiés et répondent aux normes les plus strictes de qualité.',
  },
  {
    icon: Truck,
    title: 'Livraison rapide',
    description: 'Expédition sous 24-48h pour tous nos produits en stock. Service fiable et sécurisé.',
  },
  {
    icon: Award,
    title: 'Expertise reconnue',
    description: 'Plus de 8 ans d\'expérience dans le domaine de l\'hydrodistribution et du sanitaire.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Support client',
    description: 'Une équipe à votre écoute pour vous accompagner dans tous vos projets.',
  },
]



