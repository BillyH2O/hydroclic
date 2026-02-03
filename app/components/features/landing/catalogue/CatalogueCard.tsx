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
      className="bg-white col-span-1 sm:col-span-1 lg:col-span-2 row-span-1 lg:row-span-2 bg-gradient-to-b from-blue-50 from-70% to-[#F5F9FF] to-100% rounded-lg border-2 border-gray-300 hover:border-primary transition-colors duration-200 min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-0 overflow-hidden relative"
    >
      {/* Image - Collée au bord gauche et au bas, sans padding */}
      <div className="absolute left-0 bottom-0 shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 flex items-end justify-start z-0">
        <Image 
          src={image} 
          alt={imageAlt} 
          width={300} 
          height={300} 
          className="object-contain w-full h-full" 
        />
      </div>
      
      {/* Content - Toujours à droite avec padding */}
      <div className="relative flex flex-col items-end justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 h-full w-full min-w-0 z-10 pr-3 sm:pr-4 md:pr-5 lg:pr-6 pl-36 sm:pl-44 md:pl-52 lg:pl-60 xl:pl-72">
        <h3 className="text-right text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 break-words">
          {title}
        </h3>
        <p className="text-right text-xs sm:text-sm md:text-base text-gray-600 break-words">
          {description}
        </p>
        <div className="flex justify-end mt-1 sm:mt-0">
          <Button label={buttonLabel} size="sm" variant="primary" href={buttonHref} />
        </div>
      </div>
    </div>
  )
}

export default CatalogueCard