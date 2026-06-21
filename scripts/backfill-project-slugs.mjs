/**
 * Backfill ponctuel : génère un slug pour chaque projet publié qui n'en a pas
 * encore (depuis le titre). À lancer UNE fois après le `prisma db push` qui
 * ajoute la colonne `slug`.
 *
 *   node scripts/backfill-project-slugs.mjs
 *
 * Idempotent : ne touche pas aux projets qui ont déjà un slug.
 */
import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

// Charge .env sans dépendance (DATABASE_URL / DIRECT_URL pour Prisma).
try {
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  /* .env absent : on suppose les variables déjà dans l'environnement */
}

const prisma = new PrismaClient();

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "asc" },
  });

  const used = new Set(projects.map((p) => p.slug).filter(Boolean));
  let updated = 0;

  for (const p of projects) {
    if (p.slug) continue;

    const base = slugify(p.title) || `projet-${p.id.slice(0, 6)}`;
    let slug = base;
    let n = 2;
    while (used.has(slug)) slug = `${base}-${n++}`;
    used.add(slug);

    await prisma.project.update({ where: { id: p.id }, data: { slug } });
    console.log(`✓ ${p.title} → ${slug}`);
    updated++;
  }

  console.log(
    `\n${updated} projet(s) mis a jour, ${projects.length - updated} deja avec un slug.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
