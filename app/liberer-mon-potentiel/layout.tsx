import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libérer mon potentiel - Automatisation pour TPE & Associations",
  description:
    "Vous passez trop de temps sur l'administratif ? Découvrez comment automatiser vos tâches répétitives et retrouver du temps pour ce qui compte vraiment. Solutions sur-mesure à La Réunion.",
  openGraph: {
    title: "Libérer mon potentiel - Retrouvez du temps pour votre activité",
    description:
      "Solutions digitales sur-mesure pour automatiser votre gestion et développer votre activité sans vous épuiser. Basé à La Réunion.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Libérer mon potentiel - Automatisation TPE & Associations",
    description:
      "Automatisez vos tâches répétitives. Retrouvez vos soirées. Développez votre activité.",
  },
  alternates: {
    canonical: "/liberer-mon-potentiel",
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
      name: "Libérer mon potentiel",
      item: "https://www.mickaelranaivoson.fr/liberer-mon-potentiel",
    },
  ],
};

export default function LibererMonPotentielLayout({
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
