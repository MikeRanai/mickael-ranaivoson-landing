/**
 * TopoBackground — motif topographique (lignes de relief) évoquant les
 * cirques de La Réunion. Identité locale, et bien plus léger que des blobs
 * floutés : SVG vectoriel inline (zéro requête réseau) + dégradés radiaux
 * `radial-gradient` (aucune passe de flou GPU, contrairement à `blur-[...]`).
 *
 * Purement décoratif → `aria-hidden`. Aucune animation (neutre pour le LCP
 * et le budget CPU/GPU). Réutilisable section par section via `className`.
 */
/**
 * Variantes de position des halos. On décale gold/bleu sur les 4 diagonales
 * pour casser l'effet répétitif quand plusieurs sections s'enchaînent au scroll.
 * Les chaînes `bg-[radial-gradient(...)]` sont écrites en toutes lettres pour
 * que le JIT Tailwind les détecte (pas de concaténation dynamique de classes).
 */
const GLOW_VARIANTS = {
  // gold haut-droite · bleu bas-gauche (disposition d'origine)
  a: [
    "bg-[radial-gradient(60%_55%_at_75%_15%,rgba(255,168,0,0.10),transparent_70%)]",
    "bg-[radial-gradient(55%_50%_at_10%_85%,rgba(37,99,235,0.10),transparent_70%)]",
  ],
  // miroir horizontal : gold haut-gauche · bleu bas-droite
  b: [
    "bg-[radial-gradient(60%_55%_at_25%_15%,rgba(255,168,0,0.10),transparent_70%)]",
    "bg-[radial-gradient(55%_50%_at_90%_85%,rgba(37,99,235,0.10),transparent_70%)]",
  ],
  // miroir vertical : gold bas-droite · bleu haut-gauche
  c: [
    "bg-[radial-gradient(60%_55%_at_75%_85%,rgba(255,168,0,0.10),transparent_70%)]",
    "bg-[radial-gradient(55%_50%_at_10%_15%,rgba(37,99,235,0.10),transparent_70%)]",
  ],
  // double miroir : gold bas-gauche · bleu haut-droite
  d: [
    "bg-[radial-gradient(60%_55%_at_25%_85%,rgba(255,168,0,0.10),transparent_70%)]",
    "bg-[radial-gradient(55%_50%_at_90%_15%,rgba(37,99,235,0.10),transparent_70%)]",
  ],
} as const;

export function TopoBackground({
  className = "",
  glow = true,
  lines = true,
  variant = "a",
}: {
  className?: string;
  glow?: boolean;
  /** Affiche les lignes de niveau. `false` = halos seuls (sections secondaires). */
  lines?: boolean;
  /** Disposition des halos (a/b/c/d) — alterner d'une section à l'autre. */
  variant?: keyof typeof GLOW_VARIANTS;
}) {
  const [goldGlow, blueGlow] = GLOW_VARIANTS[variant];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Halos statiques (dégradés radiaux, sans filtre de flou) */}
      {glow && (
        <>
          <div className={`absolute inset-0 ${goldGlow}`} />
          <div className={`absolute inset-0 ${blueGlow}`} />
        </>
      )}

      {/* Lignes de niveau — fondu vers les bords via un mask radial */}
      {lines && (
      <svg
        className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,black,transparent_88%)]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="#ffa800" strokeOpacity="0.18" strokeWidth="1.75">
          <path d="M-60 700 C 320 600, 640 660, 960 540 S 1360 470, 1520 520" />
          <path d="M-60 620 C 320 520, 640 580, 960 460 S 1360 390, 1520 440" />
          <path d="M-60 540 C 340 450, 660 500, 980 390 S 1360 320, 1520 370" />
          <path d="M-20 470 C 360 390, 680 430, 1000 330 S 1360 270, 1520 310" />
          <path d="M40 410 C 400 340, 700 370, 1020 285 S 1360 235, 1520 265" />
        </g>
        <g stroke="#94a3b8" strokeOpacity="0.12" strokeWidth="1.75">
          <path d="M-60 660 C 320 560, 640 620, 960 500 S 1360 430, 1520 480" />
          <path d="M-40 580 C 340 485, 660 540, 980 425 S 1360 355, 1520 405" />
          <path d="M0 505 C 360 420, 680 465, 1000 360 S 1360 295, 1520 340" />
        </g>
      </svg>
      )}
    </div>
  );
}

export default TopoBackground;
