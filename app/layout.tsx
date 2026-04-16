import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { frFR } from "@clerk/localizations";
import "./globals.css";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Hydroclic - Distribution d'eau professionnelle",
  description: "Tubes, raccords, vannes, collecteurs… tout pour une distribution d'eau performante, fiable et conforme aux normes en vigueur.",
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
        <body
          className={`${lexend.variable} font-sans antialiased`}
        >
          {children}
          <WhatsAppFloat
            phone={process.env.WHATSAPP_NUMBER ?? '+33688564485'}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
