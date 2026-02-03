import { Product } from "@/lib/types/product"
import Link from "next/link"

export const Breadcrumb = ({ product }: { product: Product | null }) => {
  if (!product) {
    return null
  }
  return (
    <nav className="mb-6 text-sm text-gray-600">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/produits" className="hover:text-gray-900 transition-colors">
                Produits
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>
    )
}