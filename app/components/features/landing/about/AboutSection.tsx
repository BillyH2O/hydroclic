import Image from "next/image";

interface AboutSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

const AboutSection = ({
  title,
  description,
  imageSrc,
  imageAlt = "Image",
}: AboutSectionProps) => {
  return (
    <section className="relative w-full h-full bg-blue-50">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-20 py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        
        {/* Contenu texte sur le côté droit */}
        <div className="flex flex-col justify-center gap-6 text-center lg:text-left w-full lg:w-3/5">
          <h2 className="title">
            {title}
          </h2>
          <p className="text text-left leading-relaxed">
            {description}
          </p>
          
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-14 mt-4 justify-items-center lg:justify-items-start">

            <div className="flex flex-col gap-2 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">
              100 000+
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                produits vendus
              </p>
            </div>
            <div className="flex flex-col gap-2 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">
              30
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              partenaires
              </p>
            </div>
            <div className="flex flex-col gap-2 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">
              3000+
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              clients
              </p>
            </div>
            <div className="flex flex-col gap-2 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">
              8ans
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              d&apos;expériences
              </p>
            </div>
          </div>
          
          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
            <a
              href="/catalogue"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              En savoir plus
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-[#001E37]/10 hover:bg-blue-50 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Contactez-nous
            </a>
          </div>
        </div>
        {/* Image sur le côté gauche */}
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={600}
            height={600}
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

