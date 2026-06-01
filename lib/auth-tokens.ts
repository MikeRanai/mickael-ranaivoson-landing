import { createHash, randomBytes } from "node:crypto";

// Durée de validité d'un lien de connexion par email.
export const LOGIN_TOKEN_TTL_MS = 1000 * 60 * 15; // 15 minutes

// Jeton brut (envoyé dans l'email, jamais stocké en clair).
export function generateLoginToken(): string {
  return randomBytes(32).toString("base64url");
}

// Hash stocké en base : une fuite de la table ne permet pas de se connecter.
export function hashLoginToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}
