"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
}

export type PostInput = {
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  metaDescription?: string | null;
  tag?: string;
  coverImage?: string | null;
  published?: boolean;
};

function buildData(data: PostInput, isUpdate = false) {
  const publishedAt = data.published ? new Date() : null;
  return {
    title: data.title,
    slug: data.slug,
    content: data.content,
    excerpt: data.excerpt ?? null,
    metaDescription: data.metaDescription ?? null,
    tag: data.tag ?? "general",
    coverImage: data.coverImage ?? null,
    published: data.published ?? false,
    ...(isUpdate ? {} : { publishedAt }),
  };
}

function revalidateAll(slug?: string) {
  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/feed.xml");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createPost(data: PostInput) {
  await requireAdmin();

  const exists = await prisma.post.findUnique({ where: { slug: data.slug } });
  if (exists) throw new Error("Ce slug est déjà utilisé");

  await prisma.post.create({ data: buildData(data) });

  revalidateAll(data.slug);
  redirect("/dashboard/blog");
}

export async function updatePost(id: string, data: PostInput) {
  await requireAdmin();

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) throw new Error("Article introuvable");

  const slugConflict = await prisma.post.findFirst({
    where: { slug: data.slug, NOT: { id } },
  });
  if (slugConflict) throw new Error("Ce slug est déjà utilisé");

  const wasPublished = existing.published;
  const willBePublished = data.published ?? false;

  const post = await prisma.post.update({
    where: { id },
    data: {
      ...buildData(data, true),
      publishedAt:
        willBePublished && !wasPublished
          ? new Date()
          : willBePublished
          ? existing.publishedAt
          : null,
    },
  });

  revalidateAll(post.slug);
  if (existing.slug !== post.slug) revalidatePath(`/blog/${existing.slug}`);
  redirect("/dashboard/blog");
}

export async function deletePost(id: string) {
  await requireAdmin();
  const post = await prisma.post.delete({ where: { id } });
  revalidateAll(post.slug);
}

export async function togglePostPublished(id: string) {
  await requireAdmin();

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw new Error("Article introuvable");

  const updated = await prisma.post.update({
    where: { id },
    data: {
      published: !post.published,
      publishedAt: !post.published ? post.publishedAt ?? new Date() : post.publishedAt,
    },
  });

  revalidateAll(updated.slug);
}

export async function getAdminPosts() {
  await requireAdmin();
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      tag: true,
      published: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getAdminPost(id: string) {
  await requireAdmin();
  return prisma.post.findUnique({ where: { id } });
}
