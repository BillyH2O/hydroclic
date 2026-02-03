import React from 'react'
import { Product } from '@/lib/types/product'
import { Package, TrendingUp, Tag, Box } from 'lucide-react'
import StatCard from './StatCard'

interface StatsOverviewProps {
  products: Product[]
}

export default function StatsOverview({ products }: StatsOverviewProps) {
  const totalProducts = products.length
  const newProducts = products.filter(p => p.isNew || p.category === 'nouveaute').length
  const promotionProducts = products.filter(
    p => p.isPromotion || p.discount !== undefined || p.category === 'promotion'
  ).length
  const destockageProducts = products.filter(
    p => p.isDestockage || p.category === 'destockage'
  ).length

  const statsCards = [
    {
      title: 'Total produits',
      value: totalProducts,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Nouveautés',
      value: newProducts,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Promotions',
      value: promotionProducts,
      icon: Tag,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Destockage',
      value: destockageProducts,
      icon: Box,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

