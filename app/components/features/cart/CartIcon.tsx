'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/hooks/useCart'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CartIconProps {
  onClick: () => void
  className?: string
}

export default function CartIcon({ onClick, className }: CartIconProps) {
  const { itemCount, isLoading } = useCart()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={cn('relative hover:cursor-pointer', className)}
      aria-label={`Panier (${itemCount} article${itemCount > 1 ? 's' : ''})`}
    >
      <ShoppingCart className="w-5 h-5" />
      {!isLoading && itemCount > 0 && (
        <span className="absolute -top-2 -right-2 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center" style={{ backgroundColor: '#3eefdf', color: '#000' }}>
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Button>
  )
}

