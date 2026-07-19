import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Internet pour Associations & Clubs Sportifs à La Réunion",
  description:
    "Votre club existe, mais personne ne le trouve. Site internet pour associations et clubs sportifs à La Réunion : être visible sur Google, afficher horaires et entraînements, recevoir des demandes d'inscription. À partir de 1 600 € HT.",
  openGraph: {
    title: "Votre club existe. Encore faut-il qu'on le trouve.",
    description:
      "Sites internet pour associations et clubs sportifs à La Réunion. Un club de hockey a reçu 2 demandes d'inscription grâce à des parents qui l'ont trouvé sur Google.",
    url: "/associations",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Site Internet pour Associations & Clubs Sportifs à La Réunion",
    description:
      "Être trouvé sur Google, afficher vos horaires, recevoir des inscriptions. À partir de 1 600 € HT.",
  },
  alternates: {
    canonical: "/associations",
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
      name: "Associations & Clubs Sportifs",
      item: "https://www.mickaelranaivoson.fr/associations",
    },
  ],
};

export default function AssociationsLayout({
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
