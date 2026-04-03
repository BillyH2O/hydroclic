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
import { Footer } from "./components/layout/footer";

export default async function Home() {

  const sampleProducts = await ProductService.getOfferProducts()
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
              maxProducts={8}
            />
          </div>
        )}
        
        <AboutSection title="À propos de nous" description="Tubes, raccords, vannes, collecteurs… tout pour une distribution d'eau performante, fiable et conforme aux normes en vigueur. Tubes, raccords, vannes, collecteurs… tout pour une distribution d'eau performante, fiable et conforme aux normes en vigueur.Tubes, raccords, vannes, collecteurs… tout pour une distribution d'eau performante, fiable et conforme aux normes en vigueur." imageSrc="/plombier.png" imageAlt="À propos de nous" />
        <TestimonialSection />
        <Footer />
    </div>
    </div>
  );
}
