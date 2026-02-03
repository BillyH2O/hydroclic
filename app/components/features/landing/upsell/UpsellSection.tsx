"use client";
import React from "react";
import { MiniCard } from "./MiniCard";
import { upsellData } from "./data/upsell";

export const UpsellSection: React.FC = () => {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Titre et description alignés horizontalement sur PC - ordre inversé */}
        <div className="flex flex-col-reverse lg:flex-row lg:items-start items-center gap-8 lg:gap-12 mb-16">
          {/* Description à gauche */}
          <div className="lg:w-1/2">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-center lg:text-left">
              Une même logique, plusieurs formats. De la skid compacte au conteneur clé en main, nous dimensionnons le système selon votre débit, la qualité de l&apos;eau d&apos;entrée et l&apos;énergie disponible.
            </p>
          </div>
          {/* Titre à droite */}
          <div className="lg:w-1/2">
            <h2 className="title mb-6 text-center lg:text-left">
              Domaine d&apos;application
            </h2>
          </div>
        </div>

        {/* Badge et grille des cartes */}
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="w-full h-80 grid lg:grid-cols-6 grid-cols-2 gap-4">
            {upsellData.items.map((item, idx) => (
              <MiniCard key={idx} imageSrc={item.image} title={item.text} icon={item.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpsellSection;


