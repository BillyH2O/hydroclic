import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { frFR } from "@clerk/localizations";
import { Lexend } from 'next/font/google';
import "./globals.css";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { CookieBanner } from "@/components/legal/CookieBanner";

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lexend',
  display: 'swap',
});

const BASE_URL =
  (process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.hydroclic.fr').replace(/\/$/, '')

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Hydroclic - Plomberie, électricité, chauffage & sanitaire',
    template: '%s | Hydroclic',
  },
  description:
    'Hydroclic, votre distributeur de matériaux à Aubervilliers (93). Plomberie, électricité, climatisation, chauffage, outillage et sanitaire pour particuliers et professionnels.',
  keywords: [
    'hydroclic',
    'plomberie',
    'sanitaire',
    'chauffage',
    'climatisation',
    'électricité',
    'outillage',
    'Aubervilliers',
    'matériaux de construction',
    'professionnel BTP',
  ],
  authors: [{ name: 'Hydroclic' }],
  creator: 'Hydroclic',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    siteName: 'Hydroclic',
    title: 'Hydroclic - Plomberie, électricité, chauffage & sanitaire',
    description:
      'Hydroclic, votre distributeur de matériaux à Aubervilliers (93). Plomberie, électricité, climatisation, chauffage, outillage et sanitaire.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hydroclic - Plomberie, électricité, chauffage & sanitaire',
    description:
      'Hydroclic, votre distributeur de matériaux à Aubervilliers (93).',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    localization={frFR}
      appearance={{
        elements: {
          rootBox: "mx-auto",
          card: "shadow-lg"
        }
      }}
      afterSignInUrl="/onboarding/check"
      afterSignUpUrl="/onboarding/check"
      signInFallbackRedirectUrl="/onboarding/check"
      signUpFallbackRedirectUrl="/onboarding/check"
    >
      <html lang="fr" className={lexend.variable}>
        <body className="font-sans antialiased">
          {children}
          <CookieBanner />
          <WhatsAppFloat
            phone={process.env.WHATSAPP_NUMBER ?? '+33611338778'}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
