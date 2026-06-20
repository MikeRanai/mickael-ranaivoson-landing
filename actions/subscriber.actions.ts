"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
}

const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Format d'email invalide")
  .max(254, "Email trop long");

export type SubscribeResult = { success: true } | { error: string };

/**
 * Capture newsletter publique. Deux protections : honeypot anti-bot
 * (champ caché `company_url`) et contrainte d'unicité sur l'email.
 * Idempotent : un email déjà inscrit renvoie un succès sans erreur.
 */
export async function subscribeToNewsletter(input: {
  email: string;
  company_url?: string;
}): Promise<SubscribeResult> {
  // Honeypot : un humain ne remplit jamais ce champ. Succès factice pour le bot.
  if (typeof input.company_url === "string" && input.company_url.trim() !== "") {
    return { success: true };
  }

  const parsed = EmailSchema.safeParse(input.email);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Email invalide" };
  }

  try {
    await prisma.subscriber.create({ data: { email: parsed.data } });
  } catch (error) {
    // P2002 = email déjà inscrit → on traite comme un succès (anti-enumeration)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return { success: true };
    }
    console.error(
      "Erreur inscription newsletter:",
      error instanceof Error ? error.message : "Erreur inconnue"
    );
    return { error: "Une erreur est survenue. Réessayez plus tard." };
  }

  revalidatePath("/dashboard/subscribers");
  return { success: true };
}

export async function getSubscribers() {
  await requireAdmin();
  return prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
}

export async function deleteSubscriber(id: string) {
  await requireAdmin();
  await prisma.subscriber.delete({ where: { id } });
  revalidatePath("/dashboard/subscribers");
}
