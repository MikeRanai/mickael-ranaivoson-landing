import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { TechStack } from "@/components/layout/TechStack";
import { TechBenefits } from "@/components/layout/TechBenefits";
import { Pricing } from "@/components/layout/Pricing";
import { Realizations } from "@/components/layout/Realizations";
import { Testimonials } from "@/components/layout/Testimonials";
import { Contact } from "@/components/layout/Contact";
import { About } from "@/components/layout/About";
import { SectionDivider } from "@/components/ui/section-divider";
import { Suspense } from "react";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.mickaelranaivoson.fr/#business",
      name: "MR Digital Solutions",
      url: "https://www.mickaelranaivoson.fr",
      logo: "https://www.mickaelranaivoson.fr/images/logo.png",
      description:
        "Développeur web freelance à Saint-Paul (974). Création de sites, SaaS et automatisations métier pour artisans, commerçants et associations réunionnaises. Accompagnement aides numériques régionales.",
      telephone: "+262692342373",
      email: "ranaimike@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4 rue Jacquot",
        addressLocality: "Saint-Paul",
        postalCode: "97460",
        addressRegion: "La Réunion",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -21.0098,
        longitude: 55.2708,
      },
      areaServed: {
        "@type": "Place",
        name: "La Réunion",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      makesOffer: [
        { "@type": "Offer", name: "Création site internet 974" },
        { "@type": "Offer", name: "Automatisation TPE / Association" },
        {
          "@type": "Offer",
          name: "Accompagnement aides numériques régionales (Kap Numérik)",
        },
      ],
      priceRange: "€€",
      sameAs: [
        "https://github.com/MikeRanai/",
        "https://www.linkedin.com/in/mickael-ranaivoson",
        "https://www.facebook.com/mickaelranaivoson.fr",
        "https://www.malt.fr/profile/mickaelranaivoson",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.mickaelranaivoson.fr/#person",
      name: "Mickaël Ranaivoson",
      jobTitle: "Développeur Web",
      url: "https://www.mickaelranaivoson.fr",
      sameAs: [
        "https://github.com/MikeRanai/",
        "https://www.linkedin.com/in/mickael-ranaivoson",
        "https://www.malt.fr/profile/mickaelranaivoson",
      ],
      worksFor: {
        "@id": "https://www.mickaelranaivoson.fr/#business",
      },
      knowsAbout: [
        "Développement web La Réunion",
        "Automatisation métier TPE",
        "Création site internet 974",
        "Outils sur-mesure pour associations",
        "SEO local Réunion",
        "Next.js",
        "Prisma",
        "TypeScript",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.mickaelranaivoson.fr/#website",
      url: "https://www.mickaelranaivoson.fr",
      name: "Mickael Ranaivoson",
      publisher: {
        "@id": "https://www.mickaelranaivoson.fr/#person",
      },
      inLanguage: "fr-FR",
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TechStack />
      <Solutions />
      <SectionDivider />
      <Realizations />
      <SectionDivider />
      {/* Server component — ne s'affiche que si au moins 1 témoignage publié en DB */}
      <Testimonials />
      <SectionDivider />
      {/* Déplacé après Portfolio + Témoignages : on rassure techniquement APRÈS avoir prouvé le bénéfice */}
      <TechBenefits />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Pricing />
      <SectionDivider />
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </main>
  );
}
