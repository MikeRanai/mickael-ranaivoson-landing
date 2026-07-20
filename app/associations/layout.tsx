import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Internet pour Associations & Clubs à La Réunion",
  description:
    "Votre association existe, mais personne ne la trouve. Site internet pour associations culturelles, sportives, environnementales et sociales à La Réunion : être visible sur Google, afficher vos activités, recevoir des adhésions. À partir de 1 600 € HT.",
  openGraph: {
    title: "Votre association existe. Encore faut-il qu'on la trouve.",
    description:
      "Sites internet pour associations et clubs à La Réunion : culturelles, sportives, environnementales, sociales. Être trouvé sur Google et recevoir des adhésions.",
    url: "/associations",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Site Internet pour Associations & Clubs à La Réunion",
    description:
      "Être trouvé sur Google, afficher vos activités, recevoir des adhésions. À partir de 1 600 € HT.",
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
      name: "Associations & Clubs",
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
