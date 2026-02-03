import { Logos3 } from "./logos3"

const demoData = {
  heading: "Nos marques partenaires",
  description: "Nous travaillons avec les plus grandes marques du secteur pour vous garantir des produits fiables, durables et certifiés.",
  logos: [
    {
      id: "logo-1",
      description: "Astro",
      image: "/brand/alterna.png",
      className: "h-14 w-auto",
    },
    {
      id: "logo-2",
      description: "Figma",
      image: "/brand/grohe.png",
      className: "h-14 w-auto",
    },
    {
      id: "logo-3",
      description: "Next.js",
      image: "/brand/ondee.png",
      className: "h-14 w-auto",
    },
    {
      id: "logo-4",
      description: "React",
      image: "/brand/rolf.png",
      className: "h-14 w-auto",
    },
    {
      id: "logo-5",
      description: "shadcn/ui",
      image: "/brand/somatherm.png",
      className: "h-14 w-auto",
    },
    {
      id: "logo-6",
      description: "Supabase",
      image: "/brand/sophos.png",
      className: "h-14 w-auto",
    },
  ],
};

function BrandSection() {
  return <Logos3 {...demoData} />;
}

export { BrandSection };
