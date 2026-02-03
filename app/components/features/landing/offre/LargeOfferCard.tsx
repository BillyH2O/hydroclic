import Button from '@/components/ui/MainButton'
import Image from 'next/image'
import React from 'react'

interface LargeOfferCardProps {
  label: string
  title: string
  description: string
  labelColor: string
  gradientFrom: string
  buttonClassName?: string
  buttonLabel?: string
  buttonHref?: string
  imageSrc?: string
  imageAlt?: string
}

const LargeOfferCard: React.FC<LargeOfferCardProps> = ({
  label,
  title,
  description,
  labelColor,
  gradientFrom,
  buttonClassName = 'bg-white text-black',
  buttonLabel = 'Explorer',
  buttonHref = '/',
  imageSrc = '/default.png',
  imageAlt = 'Promotions',
}) => {
  return (
    <div className={`col-span-1 sm:col-span-2 lg:col-span-3 row-span-1 lg:row-span-2 bg-gradient-to-b flex flex-col md:flex-row justify-center items-center ${gradientFrom} from-70% to-[#F5F9FF] to-100% rounded-lg border border-gray-300 min-h-[280px] md:min-h-[300px] lg:min-h-0 p-4 md:p-6 lg:p-8 gap-4 md:gap-6`}>
      <div className="flex flex-col md:flex-row items-center justify-center h-full w-full gap-4 md:gap-6">
        
        {/* Image en premier sur mobile, à droite sur desktop */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 shrink-0 order-1 md:order-2">
          <Image 
            src={imageSrc} 
            alt={imageAlt} 
            fill
            sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
            className="object-contain"
          />
        </div>

        {/* Texte en second sur mobile, à gauche sur desktop */}
        <div className="flex flex-col items-center md:items-start justify-center gap-2 md:gap-4 flex-1 order-2 md:order-1">
          <label className={`text-xs md:text-sm ${labelColor} text-center md:text-left`}>{label}</label>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#070345] text-center md:text-left">{title}</h2>
          <p className="text-sm md:text-base text-gray-700 text-center md:text-left max-w-md">{description}</p>
          <Button
            className={buttonClassName}
            label={buttonLabel}
            size="sm"
            variant="primary"
            href={buttonHref}
          />
        </div>
        
      </div>
    </div>
  )
}

export default LargeOfferCard
