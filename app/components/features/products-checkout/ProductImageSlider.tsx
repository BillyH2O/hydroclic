'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getProductImage } from '@/lib/utils'
import SafeImage from '@/components/ui/SafeImage'

interface ProductImageSliderProps {
  images: string[]
  alt: string
  className?: string
}

/**
 * Composant slider d'images pour les produits
 * Affiche plusieurs images avec navigation et miniatures
 */
export default function ProductImageSlider({
  images,
  alt,
  className = '',
}: ProductImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Si une seule image, pas besoin de slider
  if (images.length === 1) {
    return (
      <div className={`relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 ${className}`}>
        <SafeImage
          src={getProductImage(images[0])}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Image principale */}
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 group">
        <SafeImage
          src={getProductImage(images[currentIndex])}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-opacity duration-300"
          priority
        />
        
        {/* Boutons de navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}

        {/* Indicateur d'image */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              aria-label={`Voir l'image ${index + 1}`}
            >
              <SafeImage
                src={getProductImage(image)}
                alt={`${alt} - Miniature ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}



