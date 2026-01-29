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
};

export default function LibererMonPotentielLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
