import type { Metadata } from "next";
import { Inter, Geist_Mono, Oswald, Bebas_Neue } from "next/font/google";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/data";
import { Header, Footer } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  // 300 conservé pour d'éventuels usages légers ; 600/700 indispensables aux
  // titres (sinon le navigateur synthétise un faux-gras sur Oswald condensé).
  weight: ["300", "500", "600", "700"],
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
    "Développeur web freelance à La Réunion (974). Je crée des sites internet rapides et des outils d'automatisation sur-mesure pour artisans, TPE et associations. Gagnez du temps. Accompagnement aide Kap Numérik (réouverture 2026).",

  openGraph: {
    title: SITE_CONFIG.title,
    description: "Sites web et automatisations sur-mesure à La Réunion. Récupérez du temps pour ce qui compte vraiment.",
    url: "https://www.mickaelranaivoson.fr",
    siteName: SITE_CONFIG.name,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        secureUrl: "https://www.mickaelranaivoson.fr/opengraph-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Mickaël Ranaivoson — Développeur web freelance à La Réunion (974)",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: "Sites web et automatisations sur-mesure à La Réunion (974).",
    images: [
      {
        url: "/opengraph-image.png",
        alt: "Mickaël Ranaivoson — Développeur web freelance à La Réunion (974)",
      },
    ],
  },

  // Alternative languages if needed in the future
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },

  verification: {
    google: "mHGi6gJCuyrqnCxJ4vP479gqASn7PIq0HO4OIQ7qZxI",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}