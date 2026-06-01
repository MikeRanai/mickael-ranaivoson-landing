"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import {
  generateLoginToken,
  hashLoginToken,
  LOGIN_TOKEN_TTL_MS,
} from "@/lib/auth-tokens";

export async function loginAction(_prev: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard/blog",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return error.type === "CredentialsSignin"
        ? "Email ou mot de passe invalide."
        : "Erreur de connexion.";
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}

// ===========================================
// Connexion par lien email (recours oubli mot de passe)
// ===========================================

export type LinkRequestState = { ok: boolean; message: string } | undefined;

// Message générique unique : ne révèle jamais si un compte existe (anti-énumération).
const GENERIC_LINK_MESSAGE =
  "Si un compte existe pour cet email, un lien de connexion vient d'être envoyé. " +
  "Vérifiez votre boîte mail — le lien est valable 15 minutes.";

export async function requestLoginLinkAction(
  _prev: LinkRequestState,
  formData: FormData
): Promise<LinkRequestState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email || !email.includes("@") || email.length > 254) {
    return { ok: false, message: "Veuillez saisir une adresse email valide." };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    // Garde-fou anti-abus : pas plus de 5 liens demandés sur 5 minutes
    const recent = await prisma.loginToken.count({
      where: { email: user.email, createdAt: { gt: new Date(Date.now() - 5 * 60 * 1000) } },
    });

    if (recent < 5) {
      const raw = generateLoginToken();
      await prisma.loginToken.create({
        data: {
          email: user.email,
          tokenHash: hashLoginToken(raw),
          expiresAt: new Date(Date.now() + LOGIN_TOKEN_TTL_MS),
        },
      });

      const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
      const link = `${base}/login/verify?token=${raw}`;

      try {
        await sendLoginLink(user.email, link);
      } catch (e) {
        console.error("Envoi lien de connexion:", e instanceof Error ? e.message : e);
      }
    }
  }

  return { ok: true, message: GENERIC_LINK_MESSAGE };
}

export async function verifyMagicLinkAction(formData: FormData) {
  const token = String(formData.get("token") ?? "");

  try {
    await signIn("magic-token", { token, redirectTo: "/dashboard/blog" });
  } catch (error) {
    // signIn lève un NEXT_REDIRECT en cas de succès : on le laisse remonter.
    if (error instanceof AuthError) {
      redirect("/login?error=link");
    }
    throw error;
  }
}

async function sendLoginLink(to: string, link: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 28px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffa800; margin: 0; font-size: 20px;">Connexion au dashboard</h1>
      </div>
      <div style="background: #f8fafc; padding: 28px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="color: #1e293b; margin: 0 0 20px;">Cliquez sur le bouton ci-dessous pour vous connecter. Ce lien est valable <strong>15 minutes</strong> et ne fonctionne qu'une seule fois.</p>
        <p style="text-align: center; margin: 28px 0;">
          <a href="${link}" style="background: #ffa800; color: #0f172a; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 9999px; display: inline-block;">Me connecter</a>
        </p>
        <p style="color: #64748b; font-size: 13px; margin: 0;">Si vous n'êtes pas à l'origine de cette demande, ignorez cet email : aucune action ne sera effectuée.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Dashboard" <${process.env.SMTP_USER}>`,
    to,
    subject: "Votre lien de connexion (valable 15 min)",
    text: `Connectez-vous via ce lien (valable 15 minutes, usage unique) :\n${link}\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez cet email.`,
    html,
  });
}
