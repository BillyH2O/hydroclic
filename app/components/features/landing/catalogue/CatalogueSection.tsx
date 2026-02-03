import React from 'react'
import { catalogueData } from './data/catalogue'
import CatalogueCard from './CatalogueCard'
import { Badge } from '@/components/ui/Badge'
import { Description } from '@/components/ui/Description'

interface CatalogueData {
  title: string
  description: string
  image: string
  imageAlt: string
}

export const CatalogueSection = () => {
  const catalogueDataItems = Object.values(catalogueData) as CatalogueData[]
  return (
    <div className="w-full bg-blue-50 overflow-x-hidden">
    <div className="w-full flex flex-col items-start justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 gap-8 sm:gap-10 md:gap-12">
      <Badge label="Catalogue"/>
      <Description title="Nos catégories de produits" description="Découvrez une gamme complète pour tous vos projets en plomberie : de la distribution d'eau à la régulation thermique." />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-4 gap-4 md:gap-6 auto-rows-fr">

      {catalogueDataItems.map((item: CatalogueData, index: number) => (
        <CatalogueCard key={`catalogue-${index}`} index={index} title={item.title} description={item.description} image={item.image} imageAlt={item.imageAlt} buttonLabel="Explorer" buttonHref={`/catalogue/${item.title}`} />
      ))}
      </div>
    </div>
    </div>
  )
}