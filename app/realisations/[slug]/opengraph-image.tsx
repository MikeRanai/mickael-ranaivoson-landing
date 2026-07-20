import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/actions/project.actions";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
// PNG et non JPEG : le fallback `ImageResponse` ci-dessous ne sait produire que
// du PNG. Déclarer "image/jpeg" ici faisait émettre `og:image:type=image/jpeg`
// sur une réponse `image/png`, et les scrapers stricts (LinkedIn) refusaient
// l'image — d'autant que la route renvoie `X-Content-Type-Options: nosniff`.
// Toutes les branches doivent donc servir du PNG.
export const contentType = "image/png";

const BASE_URL = "https://www.mickaelranaivoson.fr";
const CACHE_HEADER =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

/**
 * Résout la cover en une URL absolue servant du PNG, ou null si on ne peut pas
 * le garantir (cover absente, ou format local non-PNG comme .webp que Facebook
 * ne sait de toute façon pas afficher).
 */
function ogCoverUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace(
      "/upload/",
      "/upload/f_png,q_auto:good,w_1200,h_630,c_fill,g_auto/"
    );
  }
  if (url.startsWith("/") && url.toLowerCase().endsWith(".png")) {
    return `${BASE_URL}${url}`;
  }
  return null;
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const coverUrl = ogCoverUrl(project?.imageUrl);
  if (coverUrl) {
    const upstream = await fetch(coverUrl, { cache: "force-cache" });
    // On ne relaie que si l'amont confirme du PNG, sinon le type déclaré ment.
    if (
      upstream.ok &&
      upstream.body &&
      upstream.headers.get("Content-Type")?.startsWith("image/png")
    ) {
      return new Response(upstream.body, {
        status: 200,
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": CACHE_HEADER,
        },
      });
    }
  }

  const title = project?.title ?? "Réalisation";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 60%, rgba(255,168,0,0.15) 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#ffa800",
            }}
          />
          <span
            style={{
              color: "#ffa800",
              fontSize: 20,
              textTransform: "uppercase",
              letterSpacing: 4,
              fontWeight: 600,
            }}
          >
            Mickael Ranaivoson · Étude de cas
          </span>
        </div>

        <div
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#94a3b8",
            fontSize: 22,
          }}
        >
          <span>mickaelranaivoson.fr</span>
          <span style={{ color: "#ffa800", fontWeight: 700 }}>
            Développeur Web · La Réunion
          </span>
        </div>
      </div>
    ),
    // Sans ces headers la route repart en `max-age=0, must-revalidate` : chaque
    // scrape régénère l'image (1 à 3 s), au risque du timeout côté scraper.
    { ...size, headers: { "Cache-Control": CACHE_HEADER } }
  );
}
