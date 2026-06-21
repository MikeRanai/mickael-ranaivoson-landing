import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/actions/project.actions";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

function ogCoverUrl(url: string): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace(
    "/upload/",
    "/upload/f_jpg,q_auto:good,w_1200,h_630,c_fill,g_auto/"
  );
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  // Une cover Cloudinary → on la proxifie aux dimensions OG. Les chemins locaux
  // (/images/…) ne sont pas proxifiables ici → on retombe sur l'image brandée.
  if (project?.imageUrl?.includes("res.cloudinary.com")) {
    const upstream = await fetch(ogCoverUrl(project.imageUrl), {
      cache: "force-cache",
    });
    if (upstream.ok && upstream.body) {
      return new Response(upstream.body, {
        status: 200,
        headers: {
          "Content-Type": upstream.headers.get("Content-Type") ?? "image/jpeg",
          "Cache-Control":
            "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
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
    size
  );
}
