"use client";

import { useState, useEffect } from "react";
import { MenuIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { navbarData } from "./data/navbar";
import { AdminButton } from "../ui/AdminButton";
import { SettingsButton } from "../ui/SettingsButton";
import CartIcon from "../features/cart/CartIcon";
import CartSheet from "../features/cart/CartSheet";
import ContactIcon from "../features/contact/ContactIcon";

type NavbarProps = {
  solid?: boolean
  noMarginBottom?: boolean
}

const PRODUCT_TYPE_OPTIONS = [
  { value: 'all', label: 'Tous les produits' },
  { value: 'hydrodistribution', label: 'Hydrodistribution' },
  { value: 'sanitaire', label: 'Sanitaire' },
  { value: 'chauffage-climatisation', label: 'Chauffage & Climatisation' },
  { value: 'traitement-eau', label: 'Traitement de l\'eau' },
  { value: 'outillage', label: 'Outillage' },
  { value: 'consommable', label: 'Consommable' },
];

export const Navbar = ({ solid = false, noMarginBottom = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Récupérer le type de produit depuis l'URL
  const currentProductType = searchParams?.get('productType') || 'all';
  const [selectedProductType, setSelectedProductType] = useState<string>(currentProductType);
  
  // Mettre à jour le state quand l'URL change
  useEffect(() => {
    const productType = searchParams?.get('productType') || 'all';
    setSelectedProductType(productType);
  }, [searchParams]);

  useEffect(() => {
    // Utiliser setTimeout pour éviter l'appel synchrone de setState
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isSolid = solid || isScrolled;

  return (
    <>
    <section
      className={`py-4 px-4 md:px-10 xl:px-20 w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid ? "bg-white/45 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
          <a
            href={navbarData.logo.href}
            className="flex items-center gap-2"
          >
            <Image 
              src={navbarData.logo.src} 
              alt={navbarData.logo.alt} 
              width={navbarData.logo.width} 
              height={navbarData.logo.height} 
            />
          </a>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {navbarData.menuItems.map((item, index) => {
                // Remplacer le dropdown Catalogue par un Select
                if (item.label === "Catalogue" && item.hasDropdown) {
                  return (
                    <NavigationMenuItem key={index}>
                      <Select
                        value={selectedProductType}
                        onValueChange={(value) => {
                          setSelectedProductType(value);
                          const url = value === 'all' 
                            ? '/catalogue' 
                            : `/catalogue?productType=${value}`;
                          router.push(url);
                        }}
                      >
                        <SelectTrigger className={`w-[200px] text-base bg-transparent hover:bg-transparent focus:bg-transparent border-transparent focus:border-transparent shadow-none ring-0 focus:ring-0 ${
                          isSolid ? "text-foreground" : "text-white"
                        }`}>
                          <SelectValue placeholder="Catalogue" />
                        </SelectTrigger>
                        <SelectContent>
                          {PRODUCT_TYPE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </NavigationMenuItem>
                  );
                }
                
                return (
                  <NavigationMenuItem key={index}>
                    {item.hasDropdown ? (
                      <>
                        <NavigationMenuTrigger className={`text-lg! bg-transparent hover:bg-transparent focus:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent transition-colors duration-300 ${
                          isSolid ? "text-foreground" : "text-white"
                        }`}>
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-popover border shadow-md">
                          <div className="grid w-[400px] grid-cols-1 p-4">
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                              <NavigationMenuLink
                                key={idx}
                                href={dropdownItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {dropdownItem.label}
                                </div>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className={`${navigationMenuTriggerStyle()} text-lg! bg-transparent hover:bg-transparent focus:bg-transparent data-active:bg-transparent transition-colors duration-300 ${
                          isSolid ? "text-foreground" : "text-white"
                        }`}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          </div>
          <div className="hidden items-center gap-4 lg:flex">
          
          {/*
            <Link href={navbarData.buttons.CTA1.href}>
              <Button variant={navbarData.buttons.CTA1.variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"} className="hover:cursor-pointer">
              {navbarData.buttons.CTA1.label}
            </Button>
            </Link>
            <Link href={navbarData.buttons.CTA2.href}>
              <Button variant={navbarData.buttons.CTA2.variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"} className="text-white hover:cursor-pointer">
              {navbarData.buttons.CTA2.label}
            </Button>
            </Link>
            */}
            
            {/* Composants Clerk */}
            <div className="flex items-center gap-2 ml-2">
              <ContactIcon />
              <CartIcon onClick={() => {
                setIsCartOpen(true)
                setIsMobileMenuOpen(false)
              }} />
              {isSignedIn ? (
                <>
                  <AdminButton/>
                  <SettingsButton />
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/sign-in">
                    <Button variant="outline" size="sm" className="hover:cursor-pointer">
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button variant="default" size="sm" className="hover:cursor-pointer">
                      Inscription
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          {isMounted && (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <a
                    href={navbarData.logo.href}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={navbarData.logo.src}
                      alt={navbarData.logo.alt}
                      width={navbarData.logo.width}
                      height={navbarData.logo.height}
                      className="h-12 w-auto"
                    />
                    <span className="text-lg font-semibold tracking-tighter">
                      Hydroclic
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                
                <div className="flex flex-col gap-6">
                  {navbarData.mobileMenuItems.map((item, index) => (
                    <a 
                      key={index} 
                      href={item.href} 
                      className="font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {/*
                  <Link href={navbarData.buttons.CTA1.href}>
                    <Button variant={navbarData.buttons.CTA1.variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"} className="w-full hover:cursor-pointer">
                    {navbarData.buttons.CTA1.label}
                  </Button>
                  </Link>
                  <Link href={navbarData.buttons.CTA2.href}>
                    <Button variant={navbarData.buttons.CTA2.variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"} className="w-full text-white hover:cursor-pointer">
                    {navbarData.buttons.CTA2.label}
                  </Button>
                  </Link>
                  */}
                  
                  {/* Composants Clerk pour mobile */}
                  {isSignedIn ? (
                    <div className="flex flex-col gap-2">
                      <ContactIcon 
                        className="w-full" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      />
                      <CartIcon onClick={() => {
                        setIsCartOpen(true)
                        setIsMobileMenuOpen(false)
                      }} className="w-full" />
                      <AdminButton />
                      <SettingsButton 
                        fullWidth 
                        onOpenModal={() => setIsMobileMenuOpen(false)}
                      />
                      <div className="flex justify-center">
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <ContactIcon 
                        className="w-full" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      />
                      <CartIcon onClick={() => {
                        setIsCartOpen(true)
                        setIsMobileMenuOpen(false)
                      }} className="w-full" />
                      <Link href="/sign-in">
                        <Button 
                          variant="outline" 
                          className="w-full hover:cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Connexion
                        </Button>
                      </Link>
                      <Link href="/sign-up">
                        <Button 
                          variant="default" 
                          className="w-full hover:cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Inscription
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          )}
        </nav>
      </div>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </section>
    {!noMarginBottom && <div className="h-24 md:h-20" />}
    </>
  );
};
