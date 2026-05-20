import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { frFR } from "@clerk/localizations";
import "./globals.css";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const BASE_URL =
  (process.env.NEXT_PUBLIC_APP_URL ?? 'https://hydroclic.fr').replace(/\/$/, '')

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
  alternates: {
    canonical: BASE_URL,
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
      <html lang="fr">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="font-sans antialiased">
          {children}
          <WhatsAppFloat
            phone={process.env.WHATSAPP_NUMBER ?? '+33688564485'}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
