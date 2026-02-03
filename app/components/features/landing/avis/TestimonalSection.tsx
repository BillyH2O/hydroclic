
"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn } from "./testimonials-columns-1";
import { testimonials as testimonialsData } from "./data/testimonials";
import { SectionTitle } from "@/components/ui/SectionTitle";


export const TestimonialSection = () => {
  const testimonials = testimonialsData
  return (
    <section className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-12 sm:gap-16 md:gap-20 lg:gap-24 py-16 sm:py-24 md:py-32 overflow-x-hidden">
      <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center">
        <SectionTitle 
          label="Avis Client" 
          title="Témoignage" 
          text="Nous sommes fiers de notre travail et de la satisfaction de nos clients. Nous sommes toujours à la recherche de nouvelles façons de nous améliorer et de vous offrir un service de qualité." />
      </div>

        <div className="container z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
          >
          </motion.div>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} />
            <TestimonialsColumn testimonials={testimonials.slice(3, 6)} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={testimonials.slice(6, 9)} className="hidden lg:block" duration={17} />
          </div>
        </div>
    </section>
  );
};