import type { Metadata } from "next";
import { Inter, Geist_Mono, Oswald, Bebas_Neue } from "next/font/google";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/data";
import { Header, Footer } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: "300",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

// =============================================================================
// METADATA CONFIGURATION (Fixed for Facebook/Social Sharing)
// =============================================================================
export const metadata: Metadata = {
  // CRITICAL: Forces absolute URLs for OG images, resolving Facebook Debugger issues.
  metadataBase: new URL("https://www.mickaelranaivoson.fr"),
  
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  
  description: 
    "Mickael Ranaivoson : Développeur Web à La Réunion. Création de Site Web, solutions SaaS et applications Next.js. Expert éligible au dispositif Kap Numérik pour votre transformation digitale.",

  openGraph: {
    title: SITE_CONFIG.title,
    description: "Expert Next.js à La Réunion. Solutions SaaS et transformation digitale avec Kap Numérik.",
    url: "https://www.mickaelranaivoson.fr",
    siteName: SITE_CONFIG.name,
    locale: "fr_FR",
    type: "website",
    // NOTE: opengraph-image.png is auto-detected by Next.js in the /app folder.
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: "Développeur Web & SaaS à La Réunion - Expert Kap Numérik.",
  },

  // Alternative languages if needed in the future
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans antialiased",
          inter.variable,
          geistMono.variable,
          oswald.variable,
          bebasNeue.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}