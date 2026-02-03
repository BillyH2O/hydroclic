import React from 'react'
import LargeOfferCard from './LargeOfferCard'
import SmallOfferCard from './SmallOfferCard'
import offreData from './data/offre'

type OffreDataItem = {
  label: string
  title: string
  description: string
  labelColor: string
  gradientFrom: string
  buttonClassName: string
  buttonLabel: string
  buttonHref: string
  imageSrc: string
  imageAlt: string
}

const OffersSection = () => {
  const offreDataItems = Object.values(offreData) as OffreDataItem[]
  
  return (
    <div className="w-full max-w-7xl min-h-[800px] md:min-h-[600px] lg:min-h-[700px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-4 gap-4 md:gap-6 auto-rows-fr">
      {offreDataItems.map((item: OffreDataItem, index: number) => {
        if (index < 2) {
          return (
            <LargeOfferCard
              key={`large-${index}`}
              label={item.label}
              title={item.title}
              description={item.description}
              labelColor={item.labelColor}
              gradientFrom={item.gradientFrom}
              buttonClassName={item.buttonClassName}
              buttonLabel={item.buttonLabel}
              buttonHref={item.buttonHref}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
            />
          )
        } else {
          return (
            <SmallOfferCard
              key={`small-${index}`}
              label={item.label}
              title={item.title}
              labelColor={item.labelColor}
              gradientFrom={item.gradientFrom}
              buttonClassName={item.buttonClassName}
              buttonLabel={item.buttonLabel}
              buttonHref={item.buttonHref}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
            />
          )
        }
      })}
      </div>
    </div>
  )
}

export default OffersSection