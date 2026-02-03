import React from 'react'
import { ProductCategory } from '@/lib/types/product'
import { cn } from '@/components/lib/utils'

export interface FilterTab {
  id: ProductCategory
  label: string
  count?: number
}

interface ProductFilterTabsProps {
  tabs: FilterTab[]
  activeTab: ProductCategory
  onTabChange: (tab: ProductCategory) => void
  className?: string
}

const ProductFilterTabs: React.FC<ProductFilterTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}) => {
  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 whitespace-nowrap',
            'border-2',
            activeTab === tab.id
              ? 'bg-primary text-white border-primary shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary hover:shadow-sm',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-pressed={activeTab === tab.id}
          aria-label={`Filtrer par ${tab.label}`}
        >
          
          <span className="flex items-center gap-2">
            {tab.label}
            {/*
            {tab.count !== undefined && (
              <span
                className={cn(
                  'px-2 py-0.5 rounded-full text-xs font-bold',
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                )}
              >
                {tab.count}
              </span>
            )}
              */}
          </span>
          
        </button>
      ))}
    </div>
  )
}

export default ProductFilterTabs


