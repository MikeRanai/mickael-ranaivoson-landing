"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
}

export type TestimonialInput = {
  authorName: string;
  authorRole: string;
  location?: string | null;
  quote: string;
  metric?: string | null;
  metricLabel?: string | null;
  photoUrl?: string | null;
  googleReviewUrl?: string | null;
  displayOrder?: number;
  published?: boolean;
};

function buildData(data: TestimonialInput) {
  return {
    authorName: data.authorName,
    authorRole: data.authorRole,
    location: data.location ?? null,
    quote: data.quote,
    metric: data.metric ?? null,
    metricLabel: data.metricLabel ?? null,
    photoUrl: data.photoUrl ?? null,
    googleReviewUrl: data.googleReviewUrl ?? null,
    displayOrder: data.displayOrder ?? 0,
    published: data.published ?? false,
  };
}

function revalidateAll() {
  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
}

export async function createTestimonial(data: TestimonialInput) {
  await requireAdmin();
  await prisma.testimonial.create({ data: buildData(data) });
  revalidateAll();
  redirect("/dashboard/testimonials");
}

export async function updateTestimonial(id: string, data: TestimonialInput) {
  await requireAdmin();

  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (!existing) throw new Error("Témoignage introuvable");

  await prisma.testimonial.update({ where: { id }, data: buildData(data) });
  revalidateAll();
  redirect("/dashboard/testimonials");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidateAll();
}

export async function toggleTestimonialPublished(id: string) {
  await requireAdmin();
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) throw new Error("Témoignage introuvable");
  await prisma.testimonial.update({
    where: { id },
    data: { published: !t.published },
  });
  revalidateAll();
}

export async function getAdminTestimonials() {
  await requireAdmin();
  return prisma.testimonial.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function getAdminTestimonial(id: string) {
  await requireAdmin();
  return prisma.testimonial.findUnique({ where: { id } });
}

// Public — server component fetch
export async function getPublishedTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}
