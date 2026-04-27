import { prisma } from "@/lib/prisma";

export async function getPublishedPosts(options?: { limit?: number; tag?: string }) {
  return prisma.post.findMany({
    where: {
      published: true,
      ...(options?.tag ? { tag: options.tag } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take: options?.limit,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      tag: true,
      coverImage: true,
      publishedAt: true,
      createdAt: true,
    },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, published: true },
  });
}

export async function getRelatedPosts(currentSlug: string, tag: string, limit = 3) {
  return prisma.post.findMany({
    where: {
      published: true,
      slug: { not: currentSlug },
      tag,
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      tag: true,
      coverImage: true,
      publishedAt: true,
      createdAt: true,
    },
  });
}

export type PublicPost = Awaited<ReturnType<typeof getPublishedPosts>>[number];
