import React from 'react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/components/lib/utils'

interface AdminNavCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  iconColor?: string
  bgGradient?: string
}

export default function AdminNavCard({
  title,
  description,
  href,
  icon: Icon,
  iconColor = 'text-primary',
  bgGradient = 'from-blue-50 to-blue-100',
}: AdminNavCardProps) {
  return (
    <Link href={href}>
      <div
        className={cn(
          'group relative bg-white rounded-xl shadow-md border-2 border-gray-200 p-8',
          'hover:shadow-xl hover:border-primary transition-all duration-300',
          'hover:scale-105 cursor-pointer overflow-hidden'
        )}
      >
        {/* Gradient background */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300',
            bgGradient
          )}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-4 rounded-lg bg-gray-50 group-hover:bg-white transition-colors`}>
              <Icon className={`w-8 h-8 ${iconColor} group-hover:scale-110 transition-transform`} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>
          
          {/* Arrow indicator */}
          <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-sm font-medium">Accéder</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

