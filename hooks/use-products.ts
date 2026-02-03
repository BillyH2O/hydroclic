'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/lib/types/product'
import { ProductService } from '@/lib/services/products'

/**
 * Hook pour récupérer tous les produits
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ProductService.getAllProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, error }
}

/**
 * Hook pour récupérer un produit par ID
 */
export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      // Utiliser setTimeout pour éviter l'appel synchrone de setState
      const timer = setTimeout(() => {
        setLoading(false)
      }, 0)
      return () => clearTimeout(timer)
    }

    ProductService.getProductById(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading, error }
}

/**
 * Hook pour récupérer les produits avec détails (prix final, économies, etc.)
 */
export function useProductWithDetails(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const [finalPrice, setFinalPrice] = useState(0)
  const [savings, setSavings] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      // Utiliser setTimeout pour éviter l'appel synchrone de setState
      const timer = setTimeout(() => {
        setLoading(false)
      }, 0)
      return () => clearTimeout(timer)
    }

    ProductService.getProductWithDetails(id)
      .then((details) => {
        setProduct(details.product)
        setSimilarProducts(details.similarProducts)
        setFinalPrice(details.finalPrice)
        setSavings(details.savings)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  return { product, similarProducts, finalPrice, savings, loading, error }
}

/**
 * Hook pour récupérer les produits en promotion
 */
export function usePromotionProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ProductService.getPromotionProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, error }
}

/**
 * Hook pour récupérer les nouveaux produits
 */
export function useNewProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ProductService.getNewProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, error }
}

/**
 * Hook pour calculer le prix final d'un produit
 */
export function useProductPrice(product: Product | null) {
  const [finalPrice, setFinalPrice] = useState(0)
  const [savings, setSavings] = useState(0)

  useEffect(() => {
    if (!product) {
      // Utiliser setTimeout pour éviter l'appel synchrone de setState
      const timer = setTimeout(() => {
        setFinalPrice(0)
        setSavings(0)
      }, 0)
      return () => clearTimeout(timer)
    }

    const price = ProductService.calculateFinalPrice(product)
    const saved = ProductService.calculateSavings(product)
    
    // Utiliser setTimeout pour éviter l'appel synchrone de setState
    const timer = setTimeout(() => {
      setFinalPrice(price)
      setSavings(saved)
    }, 0)
    return () => clearTimeout(timer)
  }, [product])

  return { finalPrice, savings }
}


