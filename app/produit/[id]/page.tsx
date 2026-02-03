import { notFound } from 'next/navigation'
import { ProductService } from '@/lib/services/products'
import ProductSlider from '@/components/features/landing/products/components/ProductSlider'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import WhyUs from '@/components/features/landing/whyus'
import { TestimonialSection } from '@/components/features/landing/avis/TestimonalSection'
import FAQSection from '@/components/features/faq/FAQ'
import { Breadcrumb } from '@/components/features/landing/products/components/Breadcrumb'
import { ProductContent } from '@/components/features/products-checkout/ProductContent'
import { getProductImage } from '@/lib/utils'


export default async function ProductPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {

  const resolvedParams = params instanceof Promise ? await params : params

  const { product, similarProducts} = await ProductService.getProductWithDetails(resolvedParams.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans">
      <Navbar solid />
      
      <main className="w-full  ">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-12 flex flex-col gap-4">
          <Breadcrumb product={product} />
          <ProductContent product={product} />
        </div>

        <div className="w-full bg-gradient-to-t from-zinc-50 to-blue-100  mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-12 flex flex-col gap-4">
        <WhyUs/>
        <FAQSection />
        <TestimonialSection />

        {similarProducts.length > 0 && (
          <div className="mt-12 border-t pt-12">
            <h2 className="title text-center mb-8">
              Produits similaires
            </h2>
            <ProductSlider
              products={similarProducts}
              productsToShow={{ mobile: 1, tablet: 3, desktop: 4 }}
              showFilters={false}
              showTitle={false}
            />
          </div>
        )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

// SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> | { id: string } }) {
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

