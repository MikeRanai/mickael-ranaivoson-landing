/**
 * Brouillon d'étude de cas pour « Hockey Club de l'Ouest ».
 * Ancré sur les faits déjà en base (refonte vitrine, PageSpeed 95+, SEO local,
 * tunnel d'inscription). À RELIRE et corriger ensuite depuis l'admin —
 * notamment l'année, la stack exacte et tout chiffre précis.
 *
 *   node scripts/seed-hco-casestudy.mjs
 */
import { readFileSync } from "node:fs";
for (const line of readFileSync(".env", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const content = `
<h2>Le défi</h2>
<p>Le Hockey Club de l'Ouest s'appuyait sur un site vieillissant : lent sur mobile, difficile à faire évoluer et quasi invisible sur Google pour les familles qui cherchent un club dans l'Ouest de La Réunion. Les inscriptions se géraient encore à la main — e-mails, papier, relances — avec la charge administrative et les oublis que cela suppose.</p>

<h2>La solution</h2>
<p>J'ai entièrement reconstruit le site sur une base moderne, pensée d'abord pour la performance et le référencement local :</p>
<ul>
<li><strong>Performance technique</strong> — chargement quasi instantané sur mobile, images optimisées et code allégé pour ne plus perdre les visiteurs sur la vitesse.</li>
<li><strong>SEO local</strong> — structure, contenus et données structurées ciblant les recherches « hockey » dans l'Ouest, pour capter les familles au bon moment.</li>
<li><strong>Tunnel d'inscription en ligne</strong> — un parcours fluide qui remplace les échanges manuels et fait gagner un temps précieux au bureau du club.</li>
</ul>

<h2>Les résultats</h2>
<p>Le site est passé d'une vitrine dormante à un véritable canal d'acquisition :</p>
<ul>
<li>Score PageSpeed <strong>95+</strong> sur mobile.</li>
<li><strong>1ʳᵉ page Google</strong> sur les requêtes locales.</li>
<li>Inscriptions en ligne fluides, sans ressaisie ni paperasse.</li>
</ul>
<p>Une présence en ligne qui travaille pour le club toute l'année, et moins de temps perdu sur l'administratif.</p>
`.trim();

const kpis = [
  { value: "95+", label: "Score PageSpeed mobile" },
  { value: "1ʳᵉ page", label: "Google sur les requêtes locales" },
  { value: "100% en ligne", label: "Inscriptions sans ressaisie" },
];

async function main() {
  const project = await prisma.project.update({
    where: { slug: "hockey-club-de-louest" },
    data: {
      content,
      kpis,
      role: "Refonte complète — conception, développement & SEO",
      sector: "Club sportif",
      techStack: ["Next.js", "Tailwind CSS"],
      // year laissé tel quel : à renseigner depuis l'admin (année de livraison réelle).
    },
  });
  console.log(`✓ Brouillon appliqué sur « ${project.title} » (slug: ${project.slug})`);
  console.log("  → Relis et ajuste depuis /dashboard/projects.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
