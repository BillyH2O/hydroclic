'use client'
import React from 'react'
import ProductSlider from './ProductSlider'
import { useProducts } from '../../../../../../hooks/use-products'


const ProductSliderExample: React.FC = () => {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Chargement des produits...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-600">Erreur: {error}</div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Nos Produits
      </h2>
      
      {/* Exemple avec filtres activés (par défaut) */}
      <ProductSlider
        products={products}
        productsToShow={{ mobile: 1, tablet: 3, desktop: 5 }}
        showFilters={true}
        defaultFilter="all"
        className="py-4"
      />
      
      {/* Exemple sans filtres */}
      {/* <ProductSlider
        products={products}
        productsToShow={{ mobile: 1, tablet: 3, desktop: 5 }}
        showFilters={false}
        className="py-4"
      /> */}
      
      {/* Exemple avec filtre par défaut sur "promotion" */}
      {/* <ProductSlider
        products={products}
        productsToShow={{ mobile: 1, tablet: 3, desktop: 5 }}
        showFilters={true}
        defaultFilter="promotion"
        className="py-4"
      /> */}
    </div>
  )
}

export default ProductSliderExample

