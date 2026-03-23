import Button from '@/components/ui/MainButton'
import Image from 'next/image'
import React from 'react'

type Props = {
    index: number
    title: string
    description: string
    image: string
    imageAlt: string
    buttonLabel: string
    buttonHref: string
}

const CatalogueCard = ({ index, title, description, image, imageAlt, buttonLabel, buttonHref }: Props) => {
  return (
    <div 
      key={`catalogue-${index}`} 
      className="bg-white col-span-1 sm:col-span-1 lg:col-span-2 row-span-1 lg:row-span-2 bg-gradient-to-b from-blue-50 from-70% to-[#F5F9FF] to-100% rounded-lg border-2 border-gray-300 hover:border-primary transition-colors duration-200 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] lg:min-h-[260px] overflow-hidden"
    >
      <div className="flex h-full min-h-[inherit] flex-row items-stretch gap-0">
        {/* Image : collée au bord gauche du cadre, aucun padding / marge */}
        <div className="m-0 flex shrink-0 items-end justify-start self-stretch p-0">
          <div className="relative m-0 h-32 w-32 p-0 sm:h-36 sm:w-36 md:h-40 md:w-40 lg:h-44 lg:w-44 xl:h-48 xl:w-48">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, (max-width: 1024px) 160px, (max-width: 1280px) 176px, 192px"
              className="object-contain object-bottom-left"
            />
          </div>
        </div>

        {/* Texte : zone dédiée (min-w-0) pour ne jamais empiéter sur l’image ; padding uniquement à droite / vertical */}
        <div className="flex min-w-0 min-h-0 flex-1 flex-col items-end justify-center gap-2 overflow-hidden pt-2 pr-3 pb-2 pl-0 sm:gap-2 sm:pt-3 sm:pr-4 sm:pb-3 md:pr-5 lg:gap-2.5 lg:pr-6">
          <h3 className="w-full max-w-full text-right text-lg font-bold leading-snug text-gray-900 sm:text-xl md:text-xl lg:text-2xl wrap-anywhere hyphens-auto">
            {title}
          </h3>
          <p className="w-full max-w-full text-right text-sm leading-relaxed text-gray-600 sm:text-base wrap-anywhere hyphens-auto">
            {description}
          </p>
          <div className="flex w-full justify-end pt-0.5 sm:pt-1">
            <Button label={buttonLabel} size="sm" variant="primary" href={buttonHref} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogueCard