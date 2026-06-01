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
};

function buildData(data: ProjectInput): Prisma.ProjectCreateInput {
  return {
    title: data.title,
    tag: data.tag,
    description: data.description,
    imageUrl: data.imageUrl ?? null,
    url: data.url ?? null,
    ctaLabel: data.ctaLabel ?? null,
    accentColor: data.accentColor ?? "gold",
    featured: data.featured ?? false,
    bullets: data.bullets ?? [],
    kpis: (data.kpis ?? null) as Prisma.InputJsonValue | undefined,
    displayOrder: data.displayOrder ?? 0,
    published: data.published ?? false,
  };
}

function revalidateAll() {
  revalidatePath("/dashboard/projects");
  revalidatePath("/");
}

export async function createProject(data: ProjectInput) {
  await requireAdmin();
  await prisma.project.create({ data: buildData(data) });
  revalidateAll();
  redirect("/dashboard/projects");
}

export async function updateProject(id: string, data: ProjectInput) {
  await requireAdmin();

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) throw new Error("Projet introuvable");

  await prisma.project.update({ where: { id }, data: buildData(data) });
  revalidateAll();
  redirect("/dashboard/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidateAll();
}

export async function toggleProjectPublished(id: string) {
  await requireAdmin();
  const p = await prisma.project.findUnique({ where: { id } });
  if (!p) throw new Error("Projet introuvable");
  await prisma.project.update({
    where: { id },
    data: { published: !p.published },
  });
  revalidateAll();
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
