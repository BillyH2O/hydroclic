"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface BrandSectionProps {
  heading?: string;
  description?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Nos partenaires de confiance",
  description = "Nous travaillons avec les plus grandes marques du secteur pour vous garantir des produits fiables, durables et certifiés.",
  logos = [],
}: BrandSectionProps) => {
  // Dupliquer les logos pour créer une boucle infinie fluide
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 w-full overflow-x-hidden">
      <div className="container mx-auto flex flex-col items-center text-center gap-6 sm:gap-8 md:gap-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          {heading}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl">
          {description}
        </p>
      </div>
      <div className="pt-6 sm:pt-8 md:pt-12 lg:pt-16 w-full overflow-x-hidden">
        <div className="relative w-full flex items-center justify-center overflow-hidden">
          {/* Gradient gauche - fondu élégant */}
          <div className="absolute inset-y-0 left-0 w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-r from-zinc-50 via-zinc-50/80 to-transparent pointer-events-none z-20"></div>
          
          {/* Gradient droit - fondu élégant */}
          <div className="absolute inset-y-0 right-0 w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-l from-zinc-50 via-zinc-50/80 to-transparent pointer-events-none z-20"></div>
          
          <Carousel
            opts={{ 
              loop: true,
              align: "start",
              skipSnaps: false,
              dragFree: true,
            }}
            plugins={[
              AutoScroll({
                speed: 1,
                startDelay: 0,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
                stopOnFocusIn: false,
              })
            ]}
            className="w-full"
          >
            <CarouselContent className="ml-0 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
              {duplicatedLogos.map((logo, index) => (
                <CarouselItem
                  key={`${logo.id}-${index}`}
                  className="flex basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 justify-center pl-0 min-w-0"
                >
                  <div className="mx-1 sm:mx-2 md:mx-3 lg:mx-4 flex shrink-0 items-center justify-center w-full">
                    <div className="flex items-center justify-center w-full">
                      <Image
                        src={logo.image}
                        alt={logo.description}
                        className={`${logo.className || 'h-8 sm:h-10 md:h-12 lg:h-14 w-auto'} object-contain max-w-full`}
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
