import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { TechStack } from "@/components/layout/TechStack";
import { Pricing } from "@/components/layout/Pricing";
import { Realizations } from "@/components/layout/Realizations";
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
        "Développeur Web à La Réunion. Création de sites web, solutions SaaS et applications Next.js. Expert éligible au dispositif Kap Numérik.",
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
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "SEO Technique",
        "Développement Web",
        "SaaS",
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