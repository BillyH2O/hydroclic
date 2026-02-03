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
    <div key={`catalogue-${index}`} className="bg-white col-span-1 sm:col-span-1 lg:col-span-2 row-span-1 lg:row-span-2 bg-gradient-to-b flex justify-center items-center ${item.gradientFrom} from-70% to-[#F5F9FF] to-100% rounded-lg border-2 border-gray-300 hover:border-primary min-h-[280px] md:min-h-[300px] lg:min-h-0 p-4 overflow-hidden relative">
          <div className="relative flex items-center justify-center h-full w-full max-w-xs lg:w-80 gap-3 md:gap-4">

            <Image src={image} alt={imageAlt} width={200} height={200} className="absolute -left-[60px] md:-left-[80px] object-contain shrink-0 z-0" />
            
            <div className="flex flex-col items-end justify-center gap-2 md:gap-4 ml-auto">
              <h3 className="text-right text-xl font-bold w-52 text-gray-900">{title}</h3>
              <p className="text-right text-sm text-gray-600">{description}</p>
              <Button label={buttonLabel} size="sm" variant="primary" href={buttonHref} />
            </div>
          </div>
        </div>
  )
}

export default CatalogueCard