import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kap Numérik : Aide Création Site Web à La Réunion",
  description:
    "Le dispositif Kap Numérik de la Région Réunion rembourse jusqu'à 80% de vos dépenses digitales : 1 200€ pour un site vitrine, 2 000€ pour un site marchand, 3 200€ maximum cumulés. Dépôt de nouvelles demandes suspendu à ce jour — conditions d'éligibilité et liste d'alerte.",
  openGraph: {
    title: "Kap Numérik : Financez votre projet digital à La Réunion",
    description:
      "Aide régionale pour les TPE et associations réunionnaises : 80% des dépenses HT, jusqu'à 3 200€ cumulés. Dépôt de nouvelles demandes suspendu à ce jour.",
    url: "/aides-digitales-reunion",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kap Numérik : Aide Création Site Web à La Réunion",
    description:
      "80% de vos dépenses digitales remboursées, jusqu'à 3 200€ cumulés. Dispositif suspendu à ce jour : découvrez les conditions et rejoignez la liste d'alerte.",
  },
  alternates: {
    canonical: "/aides-digitales-reunion",
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
      name: "Kap Numérik - Aides digitales",
      item: "https://www.mickaelranaivoson.fr/aides-digitales-reunion",
    },
  ],
};

export default function AidesLayout({
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
