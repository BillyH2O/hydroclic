'use client'

import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ContactIconProps {
  className?: string
  onClick?: () => void
}

export default function ContactIcon({ className, onClick }: ContactIconProps) {
  return (
    <Link href="/contact" onClick={onClick}>
      <Button
        variant="outline"
        size="sm"
        className={cn('relative hover:cursor-pointer', className)}
        aria-label="Contact"
      >
        <Mail className="w-5 h-5" />
      </Button>
    </Link>
  )
}

