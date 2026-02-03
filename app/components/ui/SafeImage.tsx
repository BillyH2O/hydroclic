'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc?: string
}

/**
 * Composant Image sécurisé qui gère automatiquement les erreurs de chargement
 * et bascule vers une image de fallback si l'image principale ne peut pas être chargée
 */
export default function SafeImage({ 
  src, 
  fallbackSrc = '/default.png',
  alt,
  ...props 
}: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setHasError(true)
      setImageSrc(fallbackSrc)
    }
  }

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={handleError}
    />
  )
}

