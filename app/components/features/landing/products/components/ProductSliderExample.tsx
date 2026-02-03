import React from 'react'
import ProductSlider from './ProductSlider'
import { sampleProducts } from '../data/products'

const ProductSliderExample: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Nos Produits
      </h2>
      
      {/* Exemple avec filtres activés (par défaut) */}
      <ProductSlider
        products={sampleProducts}
        productsToShow={{ mobile: 1, tablet: 3, desktop: 5 }}
        showFilters={true}
        defaultFilter="all"
        className="py-4"
      />
      
      {/* Exemple sans filtres */}
      {/* <ProductSlider
        products={sampleProducts}
        productsToShow={{ mobile: 1, tablet: 3, desktop: 5 }}
        showFilters={false}
        className="py-4"
      /> */}
      
      {/* Exemple avec filtre par défaut sur "promotion" */}
      {/* <ProductSlider
        products={sampleProducts}
        productsToShow={{ mobile: 1, tablet: 3, desktop: 5 }}
        showFilters={true}
        defaultFilter="promotion"
        className="py-4"
      /> */}
    </div>
  )
}

export default ProductSliderExample

