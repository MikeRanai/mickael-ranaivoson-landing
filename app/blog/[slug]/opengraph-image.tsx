import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/actions/blog-public.actions";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post?.title ?? "Blog";

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
            Mickael Ranaivoson · Blog
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
