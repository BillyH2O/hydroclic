import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Retourne l'image du produit ou l'image par défaut si l'image est manquante
 * @param image - L'URL de l'image du produit (peut être null, undefined ou vide)
 * @returns L'URL de l'image ou '/default.png' par défaut
 */
export function getProductImage(image: string | null | undefined): string {
  return image && image.trim() !== '' ? image : '/default.png'
}

/**
 * Retourne le prix du produit selon le type de compte
 * @param priceB2C - Prix pour les comptes particuliers (B2C)
 * @param priceB2B - Prix pour les comptes professionnels (B2B)
 * @param accountType - Type de compte ('particulier' | 'professionnel' | undefined)
 * @returns Le prix approprié selon le type de compte
 */
export function getProductPrice(
  priceB2C: number,
  priceB2B: number,
  accountType?: 'particulier' | 'professionnel' | string | null | undefined
): number {
  // Si le compte est professionnel, retourner le prix B2B, sinon B2C
  return accountType === 'professionnel' ? priceB2B : priceB2C
}

/**
 * Formate un prix en euros
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
