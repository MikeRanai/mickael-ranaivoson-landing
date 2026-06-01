"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export type ChangePasswordState = { ok: boolean; message: string } | undefined;

// Pas de mot de passe actuel exigé : l'accès est déjà gardé par la session
// authentifiée (mot de passe OU lien email). Cela permet de redéfinir un mot de
// passe même quand on s'est connecté via le lien magique (cas « oubli »).
export async function changePasswordAction(
  _prev: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const session = await auth();
  if (!session?.user?.email) {
    return { ok: false, message: "Session expirée. Reconnectez-vous." };
  }

  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (next.length < 8) {
    return { ok: false, message: "Le mot de passe doit contenir au moins 8 caractères." };
  }
  if (next.length > 200) {
    return { ok: false, message: "Mot de passe trop long." };
  }
  if (next !== confirm) {
    return { ok: false, message: "La confirmation ne correspond pas." };
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return { ok: false, message: "Compte introuvable." };
  }

  const same = await bcrypt.compare(next, user.password);
  if (same) {
    return { ok: false, message: "Le nouveau mot de passe doit être différent de l'actuel." };
  }

  const hash = await bcrypt.hash(next, 12);
  await prisma.user.update({ where: { id: user.id }, data: { password: hash } });

  return { ok: true, message: "Mot de passe mis à jour. Il sera demandé à la prochaine connexion." };
}
