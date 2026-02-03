'use client'

import { getProductImage } from '@/lib/utils'
import SafeImage from '@/components/ui/SafeImage'

interface ProductImageProps {
  src: string
  alt: string
  size?: number
}

export default function ProductImage({ src, alt, size = 64 }: ProductImageProps) {
  return (
    <div 
      className="relative rounded overflow-hidden bg-gray-100"
      style={{ width: size, height: size }}
    >
      <SafeImage
        src={getProductImage(src)}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
      />
    </div>
  )
}

