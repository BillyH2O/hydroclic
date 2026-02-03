'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { CartItem } from '@/lib/types/payment'
import { Product } from '@/lib/types/product'
import { LocalCartService } from '@/lib/services/localCart'

interface UseCartReturn {
  items: CartItem[]
  itemCount: number
  total: number
  isLoading: boolean
  addToCart: (product: Product, quantity?: number) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

/**
 * Hook pour gérer le panier (local pour non-connectés, serveur pour connectés)
 */
export function useCart(): UseCartReturn {
  const { user, isLoaded } = useUser()
  const [items, setItems] = useState<CartItem[]>([])
  const [itemCount, setItemCount] = useState(0)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const hasMigratedRef = useRef(false)

  // Récupérer le type de compte (depuis user ou localStorage pour non-connectés)
  const getAccountType = useCallback((): 'particulier' | 'professionnel' | undefined => {
    if (user) {
      return user.publicMetadata?.accountType as 'particulier' | 'professionnel' | undefined
    }
    // Pour les utilisateurs non connectés, vérifier localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('accountType')
      return (stored === 'particulier' || stored === 'professionnel') ? stored : 'particulier'
    }
    return 'particulier' // Par défaut
  }, [user])

  // Mettre à jour les stats du panier local
  const updateLocalCartStats = useCallback(() => {
    const localItems = LocalCartService.getCartItems()
    const accountType = getAccountType()
    setItems(localItems)
    setItemCount(LocalCartService.getItemCount())
    setTotal(LocalCartService.getTotal(accountType))
    setIsLoading(false)
  }, [getAccountType])

  // Migrer le panier local vers le serveur
  const migrateLocalCartToServer = useCallback(async () => {
    if (hasMigratedRef.current || !user) return

    const localItems = LocalCartService.getCartItems()
    if (localItems.length === 0) {
      hasMigratedRef.current = true
      return
    }

    try {
      // Ajouter chaque item du panier local au panier serveur
      for (const item of localItems) {
        await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: item.product.id,
            quantity: item.quantity,
          }),
        })
      }

      // Vider le panier local après migration réussie
      LocalCartService.clearCart()
      hasMigratedRef.current = true
    } catch (error) {
      console.error('Error migrating local cart to server:', error)
    }
  }, [user])

  // Récupérer le panier depuis l'API (utilisateur connecté)
  const fetchServerCart = useCallback(async () => {
    if (!isLoaded || !user) {
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        setItems(data.items || [])
        setItemCount(data.itemCount || 0)
        setTotal(data.total || 0)
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isLoaded, user])

  // Charger le panier (local ou serveur selon l'état de connexion)
  const loadCart = useCallback(async () => {
    // Charger le panier local immédiatement (même si Clerk n'est pas encore chargé)
    if (typeof window !== 'undefined' && !user) {
      updateLocalCartStats()
    }

    if (!isLoaded) {
      setIsLoading(true)
      return
    }

    if (user) {
      // Utilisateur connecté : migrer le panier local puis charger depuis le serveur
      await migrateLocalCartToServer()
      await fetchServerCart()
    } else {
      // Utilisateur non connecté : utiliser le panier local
      updateLocalCartStats()
    }
  }, [isLoaded, user, migrateLocalCartToServer, fetchServerCart, updateLocalCartStats])

  useEffect(() => {
    loadCart()
  }, [loadCart])

  // Charger le panier local immédiatement au montage du composant (pour les utilisateurs non connectés)
  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoaded) {
      // Charger immédiatement le panier local pendant que Clerk se charge
      const localItems = LocalCartService.getCartItems()
      const accountType = getAccountType()
      setItems(localItems)
      setItemCount(LocalCartService.getItemCount())
      setTotal(LocalCartService.getTotal(accountType))
      setIsLoading(false)
    }
  }, [isLoaded, getAccountType])

  // Réinitialiser le flag de migration quand l'utilisateur change
  useEffect(() => {
    if (!user) {
      hasMigratedRef.current = false
    }
  }, [user])

  // Écouter les changements de accountType et du panier dans localStorage pour mettre à jour le total
  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'accountType' || e.key === 'hydroclic_cart') {
          updateLocalCartStats()
        }
      }
      
      // Écouter les changements de localStorage depuis d'autres onglets
      window.addEventListener('storage', handleStorageChange)
      
      // Écouter aussi les changements dans le même onglet (via des custom events)
      const handleAccountTypeChange = () => {
        updateLocalCartStats()
      }
      const handleCartChange = () => {
        updateLocalCartStats()
      }
      
      window.addEventListener('accountTypeChanged', handleAccountTypeChange)
      window.addEventListener('cartChanged', handleCartChange)
      
      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('accountTypeChanged', handleAccountTypeChange)
        window.removeEventListener('cartChanged', handleCartChange)
      }
    }
  }, [user, updateLocalCartStats])

  // Ajouter au panier
  const addToCart = useCallback(async (product: Product, quantity: number = 1) => {
    if (user) {
      // Utilisateur connecté : utiliser l'API serveur
      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: product.id,
            quantity,
          }),
        })

        if (response.ok) {
          await fetchServerCart()
        }
      } catch (error) {
        console.error('Error adding to cart:', error)
      }
    } else {
      // Utilisateur non connecté : utiliser le panier local
      LocalCartService.addToCart(product, quantity)
      updateLocalCartStats()
      // Déclencher un event pour mettre à jour les autres composants
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartChanged'))
      }
    }
  }, [user, fetchServerCart, updateLocalCartStats])

  // Mettre à jour la quantité
  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (user) {
      // Utilisateur connecté : utiliser l'API serveur
      try {
        const response = await fetch('/api/cart', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId,
            quantity,
          }),
        })

        if (response.ok) {
          await fetchServerCart()
        }
      } catch (error) {
        console.error('Error updating cart:', error)
      }
    } else {
      // Utilisateur non connecté : utiliser le panier local
      LocalCartService.updateQuantity(productId, quantity)
      updateLocalCartStats()
      // Déclencher un event pour mettre à jour les autres composants
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartChanged'))
      }
    }
  }, [user, fetchServerCart, updateLocalCartStats])

  // Retirer du panier
  const removeFromCart = useCallback(async (productId: string) => {
    if (user) {
      // Utilisateur connecté : utiliser l'API serveur
      try {
        const response = await fetch('/api/cart', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        })

        if (response.ok) {
          await fetchServerCart()
        }
      } catch (error) {
        console.error('Error removing from cart:', error)
      }
    } else {
      // Utilisateur non connecté : utiliser le panier local
      LocalCartService.removeFromCart(productId)
      updateLocalCartStats()
      // Déclencher un event pour mettre à jour les autres composants
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartChanged'))
      }
    }
  }, [user, fetchServerCart, updateLocalCartStats])

  // Vider le panier
  const clearCart = useCallback(async () => {
    if (user) {
      // Utilisateur connecté : utiliser l'API serveur
      try {
        const response = await fetch('/api/cart', {
          method: 'DELETE',
        })

        if (response.ok) {
          await fetchServerCart()
        }
      } catch (error) {
        console.error('Error clearing cart:', error)
      }
    } else {
      // Utilisateur non connecté : utiliser le panier local
      LocalCartService.clearCart()
      updateLocalCartStats()
      // Déclencher un event pour mettre à jour les autres composants
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartChanged'))
      }
    }
  }, [user, fetchServerCart, updateLocalCartStats])

  return {
    items,
    itemCount,
    total,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart: loadCart,
  }
}

