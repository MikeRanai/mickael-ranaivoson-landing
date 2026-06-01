import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Reprend à l'identique les 4 projets historiquement codés en dur dans Realizations.tsx
const PROJECTS = [
  {
    title: "NoutAsso",
    tag: "SaaS & Automatisation",
    description:
      "La plateforme de référence pour les associations réunionnaises. Gestion des adhésions, des transactions et documents financiers automatisés.",
    imageUrl: "/images/noutasso.png",
    url: "https://noutasso.fr",
    ctaLabel: "Voir le site",
    accentColor: "gold",
    featured: true,
    bullets: [],
    kpis: [
      { value: "−40%", label: "de charge mentale au bureau" },
      { value: "+25%", label: "d'adhésions en ligne (vs papier)" },
      { value: "2h → 5min", label: "génération du rapport financier" },
      { value: "100%", label: "conforme attentes Préfecture" },
    ],
    displayOrder: 0,
    published: true,
  },
  {
    title: "Hockey Club de l'Ouest",
    tag: "Vitrine Premium",
    description:
      "Transformation d'un site vieillissant en machine à leads. Performance technique maximale et SEO local.",
    imageUrl: "/images/site-illustration-hco.png",
    url: "https://hcouest.fr",
    ctaLabel: "Voir le site",
    accentColor: "blue",
    featured: false,
    bullets: [
      "Score PageSpeed 95+ (mobile)",
      "1ʳᵉ page Google sur les requêtes locales",
      "Tunnel d'inscription en ligne fluide",
    ],
    kpis: null,
    displayOrder: 1,
    published: true,
  },
  {
    title: "Association Culture Afro",
    tag: "Site Vitrine",
    description:
      "Site vitrine pour une association réunionnaise passionnée qui accompagne les femmes à comprendre, entretenir et aimer leurs cheveux texturés.",
    imageUrl: "/images/benevoles.webp",
    url: "https://www.assocultureafro.fr/",
    ctaLabel: "Voir le site",
    accentColor: "rose",
    featured: false,
    bullets: [
      "Identité visuelle alignée à la mission",
      "Page d'inscription aux ateliers en ligne",
      "SEO local : Réunion + thématique cheveux",
    ],
    kpis: null,
    displayOrder: 2,
    published: true,
  },
  {
    title: "FD Informatique",
    tag: "Application web",
    description:
      "Application interne pour optimiser la gestion du service après-vente d'une entreprise informatique.",
    imageUrl: null,
    url: null,
    ctaLabel: "En discuter",
    accentColor: "emerald",
    featured: false,
    bullets: [
      "Suivi temps réel des interventions SAV",
      "Historique client centralisé",
      "Réduction des oublis de relance",
    ],
    kpis: null,
    displayOrder: 3,
    published: true,
  },
];

async function main() {
  const existing = await prisma.project.count();
  if (existing > 0) {
    console.log(`${existing} projet(s) déjà en base — seed ignoré (rien à faire).`);
    return;
  }

  for (const p of PROJECTS) {
    await prisma.project.create({ data: p });
    console.log(`✓ ${p.title}`);
  }
  console.log(`\n${PROJECTS.length} projets seedés.`);
}

main()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
