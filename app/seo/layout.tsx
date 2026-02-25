import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Technique : Optimisation & Référencement à La Réunion",
  description:
    "Développeur spécialisé en SEO technique à La Réunion. Audit Core Web Vitals, optimisation du code source, données structurées et performances. Résultats mesurables.",
  openGraph: {
    title: "SEO Technique : Optimisation & Référencement à La Réunion",
    description:
      "J'optimise le code source de votre site pour des performances maximales sur Google. Audit gratuit, résultats mesurables.",
    url: "/seo",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Technique : Optimisation & Référencement",
    description:
      "Audit Core Web Vitals, HTML sémantique, données structurées. Développeur SEO à La Réunion.",
  },
  alternates: {
    canonical: "/seo",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://www.mickaelranaivoson.fr",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "SEO Technique",
      item: "https://www.mickaelranaivoson.fr/seo",
    },
  ],
};

export default function SeoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
