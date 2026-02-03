import Button from '@/components/ui/MainButton'
import Image from 'next/image'
import React from 'react'

interface SmallOfferCardProps {
  label: string
  title: string
  labelColor: string
  gradientFrom: string
  buttonClassName?: string
  buttonLabel?: string
  buttonHref?: string
  imageSrc?: string
  imageAlt?: string
}

const SmallOfferCard: React.FC<SmallOfferCardProps> = ({
  label,
  title,
  labelColor,
  gradientFrom,
  buttonClassName = 'bg-white text-black',
  buttonLabel = 'Explorer',
  buttonHref = '/',
  imageSrc = '/default.png',
  imageAlt = 'Promotions',
}) => {
  return (
    <div className={`col-span-1 sm:col-span-1 lg:col-span-2 row-span-1 lg:row-span-2 bg-gradient-to-b flex justify-center items-center ${gradientFrom} from-70% to-[#F5F9FF] to-100% rounded-lg border border-gray-300 min-h-[280px] md:min-h-[300px] lg:min-h-0 p-4`}>
      <div className="flex flex-col items-center justify-center h-full w-full max-w-xs lg:w-80 gap-3 md:gap-4">
        <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-[200px] lg:h-[200px] shrink-0">
          <Image 
            src={imageSrc} 
            alt={imageAlt} 
            fill
            sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 200px"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
          <label className={`text-xs md:text-sm ${labelColor} text-center`}>{label}</label>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#070345] text-center">{title}</h2>
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

export default SmallOfferCard

