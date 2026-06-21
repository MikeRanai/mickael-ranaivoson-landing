"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
}

export type ProjectKpi = { value: string; label: string };

export type ProjectInput = {
  title: string;
  tag: string;
  description: string;
  imageUrl?: string | null;
  url?: string | null;
  ctaLabel?: string | null;
  accentColor?: string;
  featured?: boolean;
  bullets?: string[];
  kpis?: ProjectKpi[] | null;
  displayOrder?: number;
  published?: boolean;
  // Étude de cas
  slug?: string | null;
  content?: string | null;
  role?: string | null;
  year?: number | null;
  sector?: string | null;
  techStack?: string[];
};

/** Normalise une chaîne optionnelle : "" → null. */
function nz(v: string | null | undefined): string | null {
  const t = v?.trim();
  return t ? t : null;
}

function buildData(data: ProjectInput): Prisma.ProjectCreateInput {
  return {
    title: data.title,
    tag: data.tag,
    description: data.description,
    imageUrl: nz(data.imageUrl),
    url: nz(data.url),
    ctaLabel: nz(data.ctaLabel),
    accentColor: data.accentColor ?? "gold",
    featured: data.featured ?? false,
    bullets: data.bullets ?? [],
    kpis: (data.kpis ?? null) as Prisma.InputJsonValue | undefined,
    displayOrder: data.displayOrder ?? 0,
    published: data.published ?? false,
    slug: nz(data.slug),
    content: nz(data.content),
    role: nz(data.role),
    year: data.year ?? null,
    sector: nz(data.sector),
    techStack: data.techStack ?? [],
  };
}

function revalidateAll(slug?: string | null) {
  revalidatePath("/dashboard/projects");
  revalidatePath("/");
  revalidatePath("/realisations");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/realisations/${slug}`);
}

/** Vérifie l'unicité du slug (hors projet courant en édition). */
async function assertSlugFree(slug: string | null, exceptId?: string) {
  if (!slug) return;
  const conflict = await prisma.project.findFirst({
    where: { slug, ...(exceptId ? { NOT: { id: exceptId } } : {}) },
    select: { id: true },
  });
  if (conflict) throw new Error("Ce slug est déjà utilisé par un autre projet");
}

export async function createProject(data: ProjectInput) {
  await requireAdmin();
  await assertSlugFree(nz(data.slug));
  await prisma.project.create({ data: buildData(data) });
  revalidateAll(nz(data.slug));
  redirect("/dashboard/projects");
}

export async function updateProject(id: string, data: ProjectInput) {
  await requireAdmin();

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) throw new Error("Projet introuvable");
  await assertSlugFree(nz(data.slug), id);

  await prisma.project.update({ where: { id }, data: buildData(data) });
  revalidateAll(nz(data.slug));
  // Si le slug a changé, purger aussi l'ancienne URL
  if (existing.slug && existing.slug !== nz(data.slug)) {
    revalidatePath(`/realisations/${existing.slug}`);
  }
  redirect("/dashboard/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  const p = await prisma.project.delete({ where: { id } });
  revalidateAll(p.slug);
}

export async function toggleProjectPublished(id: string) {
  await requireAdmin();
  const p = await prisma.project.findUnique({ where: { id } });
  if (!p) throw new Error("Projet introuvable");
  await prisma.project.update({
    where: { id },
    data: { published: !p.published },
  });
  revalidateAll(p.slug);
}

export async function getAdminProjects() {
  await requireAdmin();
  return prisma.project.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function getAdminProject(id: string) {
  await requireAdmin();
  return prisma.project.findUnique({ where: { id } });
}

// Public — server component fetch
export async function getPublishedProjects() {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}

export type PublicProject = Awaited<
  ReturnType<typeof getPublishedProjects>
>[number];

/**
 * Études de cas publiables : un projet publié, avec un slug ET un corps narratif
 * non vide. Sert de source unique pour generateStaticParams, le sitemap, la page
 * index et les liens internes des cartes (principe « pas de page creuse »).
 */
export async function getPublishedCaseStudies() {
  return prisma.project.findMany({
    where: {
      published: true,
      slug: { not: null },
      content: { not: null },
    },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}

/** Page détail : un projet publié par son slug (ou null). */
export async function getProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, published: true },
  });
}
