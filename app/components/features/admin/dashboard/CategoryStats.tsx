import React from 'react'

interface CategoryStatsProps {
  productsByType: Record<string, number>
}

export default function CategoryStats({ productsByType }: CategoryStatsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Répartition par catégorie</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(productsByType).map(([type, count]) => (
          <div
            key={type}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <span className="text-sm font-medium text-gray-700 capitalize">
              {type.replace('-', ' & ')}
            </span>
            <span className="text-lg font-bold text-gray-900">{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

