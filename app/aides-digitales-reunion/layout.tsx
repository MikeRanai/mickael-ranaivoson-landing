import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kap Numérik : Aide Création Site Web à La Réunion",
  description:
    "Découvrez le dispositif Kap Numérik de la Région Réunion : jusqu'à 3 200€ remboursés pour la création de votre site web, e-commerce ou application mobile. Vérifiez votre éligibilité.",
  openGraph: {
    title: "Kap Numérik : Financez votre projet digital à La Réunion",
    description:
      "Aide régionale jusqu'à 3 200€ pour les TPE réunionnaises. Site web, e-commerce, application mobile, stratégie digitale. Vérifiez votre éligibilité.",
    url: "/aides-digitales-reunion",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kap Numérik : Aide Création Site Web à La Réunion",
    description:
      "Jusqu'à 3 200€ remboursés pour votre transformation digitale. Découvrez les conditions d'éligibilité.",
  },
  alternates: {
    canonical: "/aides-digitales-reunion",
  },
};

export default function AidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
