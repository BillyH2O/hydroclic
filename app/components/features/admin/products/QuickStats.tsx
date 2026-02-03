import React from 'react'
import { Product } from '@/lib/types/product'

interface QuickStatsProps {
  products: Product[]
}

export default function QuickStats({ products }: QuickStatsProps) {
  const stats = [
    {
      label: 'Total produits',
      value: products.length,
      color: 'text-gray-900',
    },
    {
      label: 'Nouveautés',
      value: products.filter(p => p.isNew || p.category === 'nouveaute').length,
      color: 'text-green-600',
    },
    {
      label: 'Promotions',
      value: products.filter(p => p.isPromotion || p.discount !== undefined || p.category === 'promotion').length,
      color: 'text-red-600',
    },
    {
      label: 'Destockage',
      value: products.filter(p => p.isDestockage || p.category === 'destockage').length,
      color: 'text-orange-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">{stat.label}</div>
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  )
}

