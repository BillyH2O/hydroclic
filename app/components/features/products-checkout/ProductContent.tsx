import { Product } from "@/lib/types/product"
import ProductImageSlider from "./ProductImageSlider"
import ProductDetails from "./ProductDetails"
import ProductShortBio from "./ProductShortBio"
import ProductActions from "./ProductActions"
import { getProductImage } from "@/lib/utils"
import { ProductService } from "@/lib/services/products"

export const ProductContent = ({ product }: { product: Product }) => {
 // Générer plusieurs images pour le slider
 const productImages = [getProductImage(product.image)]

  return (
    <div>
        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Colonne gauche: Images */}
            <div>
            <ProductImageSlider
                images={productImages}
                alt={product.imageAlt || product.name}
            />
            </div>

            {/* Colonne droite: Détails et actions */}
            <div className="flex flex-col gap-12">
            <ProductDetails product={product} />
            <ProductShortBio product={product} />
            <ProductActions product={product} />
            </div>
        </div>

    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Gérer les params synchrones et asynchrones (Next.js 15+)
  const resolvedParams = params instanceof Promise ? await params : params
  const product = await ProductService.getProductById(resolvedParams.id)

  if (!product) {
    return {
      title: 'Produit non trouvé',
    }
  }

  return {
    title: `${product.name} - Hydroclic`,
    description: product.description || `Découvrez ${product.name} sur Hydroclic`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [getProductImage(product.image)],
    },
  }
}