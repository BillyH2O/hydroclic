"use client";
import React from "react";
import { LucideIcon } from "lucide-react";

interface MiniCardProps {
  imageSrc: string;
  title: string;
  icon?: LucideIcon;
  href?: string;
  onClick?: () => void;
}


export const MiniCard: React.FC<MiniCardProps> = ({ imageSrc, title, icon: Icon, onClick }) => {
  //const linkHref = href || getHrefFromTitle(title);
  
  const cardContent = (
    <div
      className="relative col-span-1 w-full h-full bg-cover bg-center rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
      style={{ backgroundImage: `url('${imageSrc}')` }}
    >
      <div className="bg-linear-to-b from-transparent to-black/80 absolute inset-0 rounded-3xl transition-opacity duration-300 group-hover:opacity-80" />
      <h3 className="absolute top-5 left-5 text-center text-white text-xl font-medium z-10">
        {title}
      </h3>
      <div className="absolute bottom-0 right-0 bg-zinc-100 rounded-tl-3xl w-16 h-16 flex items-center justify-center group-hover:bg-[#000904]/90 transition-colors duration-300">
        <div className="bg-primary relative rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-primary/90 transition-colors duration-300">
          {Icon ? (
            <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          ) : null}
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick}>
        {cardContent}
      </div>
    );
  }

  return (
    <div>
      {cardContent}
    </div>
  );
};

export default MiniCard;


