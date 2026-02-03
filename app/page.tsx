import HeroSection from "./components/features/landing/hero/HeroSection";
import heroData from "./components/features/landing/hero/data/hero";
import OffersSection from "./components/features/landing/offre/OffersSection";
import { 
  ProductSlider, 
  offerFiltersConfig,
  productTypeFiltersConfig 
} from "./components/features/landing/products";
import { ProductService } from "./lib/services/products";
import { Navbar } from "./components/layout/navbar";
import { CatalogueSection } from "./components/features/landing/catalogue/CatalogueSection";
import { BrandSection } from "./components/features/landing/brand/BrandSection";
import AboutSection from "./components/features/landing/about/AboutSection";
/*import { BlogSection } from "./components/features/landing/blog/BlogSection";*/
import { TestimonialSection } from "./components/features/landing/avis/TestimonalSection";
import { UpsellSection } from "./components/features/landing/upsell/UpsellSection";
import { Footer } from "./components/layout/footer";

export default async function Home() {
  // Utiliser le Service Layer pour récupérer les produits avec logique métier
  const sampleProducts = await ProductService.getOfferProducts()
  console.log("sampleProducts :", sampleProducts)
  console.log("len sampleProducts :", sampleProducts.length)
  const productsByType = await ProductService.getProductsByType()
  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans overflow-x-hidden">
      <Navbar noMarginBottom={true} />

      <div className="w-full flex flex-col items-center justify-center mx-auto gap-12 sm:gap-16 md:gap-20 lg:gap-24 overflow-x-hidden">
        <HeroSection backgroundImage={heroData.backgroundImage} title={heroData.title} description={heroData.description} button1Label={heroData.button1Label} button2Label={heroData.button2Label} id={heroData.id} id2={heroData.id2 || null} />
        <OffersSection/>
        <BrandSection />
        
        {sampleProducts.length > 0 && (
          <div className="w-full">
            <ProductSlider 
              products={sampleProducts}
              productsToShow={{ mobile: 1, tablet: 3, desktop: 5 }}
              filterConfig={offerFiltersConfig}
              defaultFilter="all"
            />
          </div>
        )}
        
        <CatalogueSection />
        
        {productsByType.length > 0 && (
          <div className="w-full">
            <ProductSlider 
              products={productsByType}
              productsToShow={{ mobile: 1, tablet: 3, desktop: 5 }}
              filterConfig={productTypeFiltersConfig}
              defaultFilter="all"
            />
          </div>
        )}
        
        <AboutSection title="À propos de nous" description="Tubes, raccords, vannes, collecteurs… tout pour une distribution d'eau performante, fiable et conforme aux normes en vigueur. Tubes, raccords, vannes, collecteurs… tout pour une distribution d'eau performante, fiable et conforme aux normes en vigueur.Tubes, raccords, vannes, collecteurs… tout pour une distribution d'eau performante, fiable et conforme aux normes en vigueur." imageSrc="/plombier.png" imageAlt="À propos de nous" />
        <TestimonialSection />
        <UpsellSection />
        <Footer/  >
    </div>
    </div>
  );
}
