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

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.subtitle,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.subtitle,
    url: "https://mickael-ranaivoson.vercel.app", // Ou l'URL de prod si connue
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/images/site-illustration-mr.png",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.subtitle,
    images: ["/images/site-illustration-mr.png"],
  },
  metadataBase: new URL("https://mickael-ranaivoson.vercel.app"),
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
          <main className="pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
