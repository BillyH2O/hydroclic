'use client'

import { SortOption } from '@/lib/types/catalogue'
import { ChevronDown } from 'lucide-react'

interface SortSelectorProps {
  value: SortOption
  onChange: (sort: SortOption) => void
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Par défaut' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name-asc', label: 'Nom (A-Z)' },
  { value: 'name-desc', label: 'Nom (Z-A)' },
]

export default function SortSelector({ value, onChange }: SortSelectorProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Trier par :
      </label>
      <div className="relative">
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:border-gray-400 transition-colors"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  )
}

