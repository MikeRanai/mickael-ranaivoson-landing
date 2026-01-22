import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import he from "he";

// ===========================================
// Rate Limiting (simple en mémoire)
// ===========================================
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 requêtes par minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count++;
  return false;
}

// ===========================================
// Validation Schema
// ===========================================
const formTypes = ["projet", "devis", "eligibilite", "audit"] as const;

const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, "Le nom contient des caractères non autorisés"),
  email: z
    .string()
    .email("Format d'email invalide")
    .max(254, "Email trop long"),
  phone: z
    .string()
    .max(20, "Numéro de téléphone trop long")
    .regex(/^[\d\s\+\-\.\(\)]*$/, "Format de téléphone invalide")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .max(150, "Nom d'entreprise trop long")
    .optional()
    .or(z.literal("")),
  siret: z
    .string()
    .max(20, "SIRET trop long")
    .regex(/^[\d\s]*$/, "Format SIRET invalide")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .max(200, "URL trop longue")
    .refine(
      (val) => !val || val.startsWith("http://") || val.startsWith("https://"),
      "L'URL doit commencer par http:// ou https://"
    )
    .optional()
    .or(z.literal("")),
  budget: z
    .string()
    .max(50, "Budget trop long")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(5000, "Le message ne peut pas dépasser 5000 caractères"),
  formType: z.enum(formTypes),
});

// ===========================================
// Labels et configuration
// ===========================================
const formTypeLabels: Record<string, string> = {
  projet: "Discussion de projet",
  devis: "Demande de devis",
  eligibilite: "Vérification éligibilité Kap Numérik",
  audit: "Demande d'audit SEO",
};

// ===========================================
// Fonction d'échappement HTML sécurisé
// ===========================================
function escapeHtml(str: string | undefined): string {
  if (!str) return "";
  return he.encode(str, { useNamedReferences: true });
}

// ===========================================
// API Route Handler
// ===========================================
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
               request.headers.get("x-real-ip") ||
               "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez patienter avant de réessayer." },
        { status: 429 }
      );
    }

    // Parse et validation
    const body = await request.json();
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.errors.map((e) => e.message).join(", ");
      return NextResponse.json(
        { error: `Données invalides: ${errors}` },
        { status: 400 }
      );
    }

    const { name, email, phone, company, siret, website, budget, message, formType } = result.data;

    // Configuration du transporteur email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Construction du contenu de l'email (ÉCHAPPÉ)
    const typeLabel = formTypeLabels[formType];
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeCompany = escapeHtml(company);
    const safeSiret = escapeHtml(siret);
    const safeWebsite = escapeHtml(website);
    const safeBudget = escapeHtml(budget);
    const safeMessage = escapeHtml(message);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffa800; margin: 0; font-size: 24px;">${escapeHtml(typeLabel)}</h1>
          <p style="color: #94a3b8; margin: 10px 0 0 0;">Nouveau message depuis le site</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 120px;">Nom</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 500;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                <a href="mailto:${safeEmail}" style="color: #3b82f6; text-decoration: none;">${safeEmail}</a>
              </td>
            </tr>
            ${safePhone ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Téléphone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                <a href="tel:${safePhone}" style="color: #3b82f6; text-decoration: none;">${safePhone}</a>
              </td>
            </tr>
            ` : ""}
            ${safeCompany ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Entreprise</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${safeCompany}</td>
            </tr>
            ` : ""}
            ${safeSiret ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">SIRET</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-family: monospace;">${safeSiret}</td>
            </tr>
            ` : ""}
            ${safeWebsite ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Site web</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                <span style="color: #3b82f6;">${safeWebsite}</span>
              </td>
            </tr>
            ` : ""}
            ${safeBudget ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Budget</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${safeBudget}</td>
            </tr>
            ` : ""}
          </table>

          <div style="margin-top: 24px;">
            <p style="color: #64748b; margin: 0 0 8px 0; font-size: 14px;">Message :</p>
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="color: #1e293b; margin: 0; white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
            </div>
          </div>
        </div>

        <div style="background: #1e293b; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: #64748b; margin: 0; font-size: 12px;">
            Email envoyé depuis le formulaire de contact du site
          </p>
        </div>
      </div>
    `;

    const textContent = `
${typeLabel}
${"=".repeat(typeLabel.length)}

Nom: ${name}
Email: ${email}
${phone ? `Téléphone: ${phone}` : ""}
${company ? `Entreprise: ${company}` : ""}
${siret ? `SIRET: ${siret}` : ""}
${website ? `Site web: ${website}` : ""}
${budget ? `Budget: ${budget}` : ""}

Message:
${message}

---
Email envoyé depuis le formulaire de contact du site
    `.trim();

    // Envoi de l'email
    await transporter.sendMail({
      from: `"Site Web" <${process.env.SMTP_USER}>`,
      to: "ranaimike@gmail.com",
      replyTo: email,
      subject: `[${typeLabel}] ${name} - ${company || "Particulier"}`,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Log sécurisé sans détails sensibles
    console.error("Erreur envoi email:", error instanceof Error ? error.message : "Erreur inconnue");
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
