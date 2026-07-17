import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site de Réservation Directe pour Gîtes & Locations à La Réunion",
  description:
    "Gîte, chambre d'hôtes ou location saisonnière à La Réunion : arrêtez de reverser 15 à 25% de commission. Un site de réservation directe, payé une fois, rentabilisé en quelques mois. Calculez vos économies.",
  openGraph: {
    title: "Combien vous coûte vraiment Booking ? — Réservation directe pour gîtes",
    description:
      "Calculez ce que les commissions des plateformes vous coûtent chaque année, et ce qu'un site de réservation directe vous ferait économiser.",
    url: "/tourisme",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Site de Réservation Directe pour Gîtes & Locations à La Réunion",
    description:
      "Arrêtez de reverser 15 à 25% de commission. Calculez vos économies avec un site de réservation directe.",
  },
  alternates: {
    canonical: "/tourisme",
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
      name: "Tourisme & Hébergement",
      item: "https://www.mickaelranaivoson.fr/tourisme",
    },
  ],
};

export default function TourismeLayout({
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
