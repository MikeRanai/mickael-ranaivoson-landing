// Vérification serveur d'un token Cloudflare Turnstile.
// Si TURNSTILE_SECRET_KEY n'est pas configuré, on ne bloque pas (dégradation
// gracieuse en local / si la clé manque) — le honeypot reste actif en amont.
const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(
  token: string | undefined | null,
  ip?: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // non configuré : on laisse passer
  if (!token) return false;

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    });
    const data = (await res.json().catch(() => null)) as
      | { success?: boolean }
      | null;
    return Boolean(data?.success);
  } catch {
    // En cas d'indisponibilité de Cloudflare, on ne bloque pas un vrai client.
    return true;
  }
}
