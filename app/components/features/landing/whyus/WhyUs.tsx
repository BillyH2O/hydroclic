'use client'

import React from 'react'
import { Shield, Truck, Award, HeadphonesIcon } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'

interface WhyUsPoint {
  icon: LucideIcon
  title: string
  description: string
}

interface WhyUsProps {
  title?: string
  points?: WhyUsPoint[]
  className?: string
}

/**
 * Composant WhyUs affichant 4 points clés avec icônes sur fond bleu
 */
export const WhyUs: React.FC<WhyUsProps> = ({
  points,
  className = '',
}) => {
  // Points par défaut si non fournis
  const defaultPoints: WhyUsPoint[] = [
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

  const displayPoints = points || defaultPoints

  return (
    <section className={`w-full py-16 md:py-24 lg:py-32 px-4 sm:px-8 lg:px-16 ${className}`}>
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-12">
        {/* Titre */}
        <SectionTitle 
          label="Avantages" 
          title="Pourquoi nous choisir ?" 
          text="Nous sommes fiers de notre travail et de la satisfaction de nos clients. Nous sommes toujours à la recherche de nouvelles façons de nous améliorer et de vous offrir un service de qualité." />

        {/* Grille des 4 points clés */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-white/65 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {/* Icône sur fond bleu dans un cercle */}
                <div className="mb-4 w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors duration-300">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>

                {/* Titre */}
                <h3 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {point.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {point.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyUs

