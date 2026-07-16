"use client";

import { track } from "@vercel/analytics";

export type AnalyticsEventProps = Record<string, string | number | boolean | null>;

// Noms d'événements centralisés : le dashboard Vercel agrège par nom exact,
// on évite les variantes orthographiques en figeant la liste ici.
export const EVENTS = {
  ctaClick: "cta_click",
  contactSubmit: "contact_submit",
  kapLeadSubmit: "kap_lead_submit",
  newsletterSignup: "newsletter_signup",
} as const;

export function trackEvent(name: string, props?: AnalyticsEventProps) {
  // Le tracking ne doit jamais casser l'UX (adblock, script non chargé).
  try {
    track(name, props);
  } catch {
    // no-op
  }
}
