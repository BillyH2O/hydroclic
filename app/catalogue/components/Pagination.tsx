'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = (isMobile: boolean = false) => {
    const pages: (number | string)[] = []
    const maxVisible = isMobile ? 3 : 5 // Moins de pages visibles sur mobile

    if (totalPages <= maxVisible) {
      // Afficher toutes les pages si moins de maxVisible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (isMobile) {
        // Sur mobile, afficher seulement la page actuelle et les pages adjacentes
        if (currentPage === 1) {
          pages.push(1)
          if (totalPages > 1) pages.push(2)
          if (totalPages > 2) pages.push('...')
          if (totalPages > 2) pages.push(totalPages)
        } else if (currentPage === totalPages) {
          pages.push(1)
          if (totalPages > 2) pages.push('...')
          pages.push(totalPages - 1)
          pages.push(totalPages)
        } else {
          pages.push(1)
          if (currentPage > 2) pages.push('...')
          pages.push(currentPage - 1)
          pages.push(currentPage)
          pages.push(currentPage + 1)
          if (currentPage < totalPages - 1) pages.push('...')
          pages.push(totalPages)
        }
      } else {
        // Logique desktop originale
        if (currentPage <= 3) {
          // Début : 1, 2, 3, 4, ..., totalPages
          for (let i = 1; i <= 4; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(totalPages)
        } else if (currentPage >= totalPages - 2) {
          // Fin : 1, ..., totalPages-3, totalPages-2, totalPages-1, totalPages
          pages.push(1)
          pages.push('...')
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i)
          }
        } else {
          // Milieu : 1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages
          pages.push(1)
          pages.push('...')
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(totalPages)
        }
      }
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8 flex-wrap">
      {/* Bouton précédent */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-2 sm:px-3"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Précédent</span>
      </Button>

      {/* Numéros de page - Mobile */}
      <div className="flex items-center gap-0.5 sm:hidden">
        {getPageNumbers(true).map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-mobile-${index}`} className="px-1 text-gray-500 text-sm">
                ...
              </span>
            )
          }

          const pageNumber = page as number
          return (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(pageNumber)}
              className="min-w-[32px] h-8 text-xs px-2"
            >
              {pageNumber}
            </Button>
          )
        })}
      </div>

      {/* Numéros de page - Desktop */}
      <div className="hidden sm:flex items-center gap-1">
        {getPageNumbers(false).map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-desktop-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            )
          }

          const pageNumber = page as number
          return (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(pageNumber)}
              className="min-w-[40px]"
            >
              {pageNumber}
            </Button>
          )
        })}
      </div>

      {/* Bouton suivant */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-2 sm:px-3"
      >
        <span className="hidden sm:inline">Suivant</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

