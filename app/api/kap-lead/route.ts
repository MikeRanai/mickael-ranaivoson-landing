import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyTurnstile } from "@/lib/turnstile";

const leadSchema = z.object({
  firstName: z.string().min(1, "Prénom requis").max(100),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .min(8, "Numéro trop court")
    .max(20)
    .regex(/^[0-9+\s().-]+$/, "Numéro invalide"),
  activityType: z.enum([
    "artisan",
    "commercant",
    "association",
    "tpe",
    "autre",
  ]),
  consentRgpd: z.literal(true, { message: "Le consentement RGPD est requis" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot : champ caché jamais rempli par un humain. Si rempli => bot.
    // On renvoie un succès factice pour ne pas révéler le filtre.
    if (typeof body?.company_url === "string" && body.company_url.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // Turnstile : vérification serveur du token (ignorée si non configuré)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      undefined;
    const humanVerified = await verifyTurnstile(body?.turnstileToken, ip);
    if (!humanVerified) {
      return NextResponse.json(
        { error: "Échec de la vérification anti-robot. Rechargez la page et réessayez." },
        { status: 400 }
      );
    }

    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Upsert (par email) — si la personne se réinscrit on rafraîchit le téléphone/activité
    await prisma.kapNumerikLead.upsert({
      where: { email: data.email.toLowerCase() },
      create: {
        firstName: data.firstName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        activityType: data.activityType,
        consentRgpd: data.consentRgpd,
      },
      update: {
        firstName: data.firstName,
        phone: data.phone,
        activityType: data.activityType,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[kap-lead] error:", e);
    return NextResponse.json(
      { error: "Erreur serveur — réessayez dans un instant." },
      { status: 500 }
    );
  }
}
