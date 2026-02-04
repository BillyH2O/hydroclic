export const navbarData = {
  logo: {
    src: "/logow.png",
    alt: "Hydroclic",
    width: 50,
    height: 50,
    href: "/",
  },
  menuItems: [
    {
      label: "Catalogue",
      href: "/catalogue",
      hasDropdown: true,
      dropdownItems: [
        { label: "Hydrodistribution", href: "/catalogue?productType=hydrodistribution" },
        { label: "Sanitaire", href: "/catalogue?productType=sanitaire" },
        { label: "Chauffage & Climatisation", href: "/catalogue?productType=chauffage-climatisation" },
        { label: "Outillage", href: "/catalogue?productType=outillage" },
        { label: "Consommable", href: "/catalogue?productType=consommable" },
      ],
    },
    {
      label: "Promotions",
      href: "/catalogue?offer=promotion",
      hasDropdown: false,
    },
    {
      label: "Nouveautés",
      href: "/catalogue?offer=new",
      hasDropdown: false,
    },
    {
      label: "Destockage",
      href: "/catalogue?offer=destockage",
      hasDropdown: false,
    },
    {
      label: "Contact",
      href: "/contact",
      hasDropdown: false,
    },
  ],
  mobileMenuItems: [
    {
      label: "Catalogue",
      href: "/catalogue",
    },
    {
      label: "Promotions",
      href: "/catalogue?offer=promotion",
    },
    {
      label: "Nouveautés",
      href: "/catalogue?offer=new",
    },
    {
      label: "Destockage",
      href: "/catalogue?offer=destockage",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  buttons: {
    CTA1: {
      label: "Catalogue",
      variant: "secondary",
      href: "/catalogue",
    },
    CTA2: {
      label: "Contact",
      variant: "default",
      href: "/contact",
    },
  },
};

