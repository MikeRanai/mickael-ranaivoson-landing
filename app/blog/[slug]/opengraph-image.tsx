import { ImageResponse } from "next/og";
import sharp from "sharp";
import { getPostBySlug } from "@/actions/blog-public.actions";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
// Le type déclaré ici devient `og:image:type`. Il doit correspondre à ce que la
// route renvoie réellement, sinon les scrapers stricts (LinkedIn) refusent
// l'image — la route sert `X-Content-Type-Options: nosniff`, donc ils ne
// peuvent pas deviner le vrai type. On reste en JPEG : les covers sont des
// photos, où le PNG pèse ~7× plus lourd. Le fallback est converti plus bas.
export const contentType = "image/jpeg";

const CACHE_HEADER =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

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
  const post = await getPostBySlug(slug);

  if (post?.coverImage) {
    const upstream = await fetch(ogCoverUrl(post.coverImage), {
      cache: "force-cache",
    });
    // On ne relaie que du JPEG : une cover non-Cloudinary passe par `fetch`
    // sans transformation et pourrait renvoyer du PNG ou du WebP, ce qui
    // contredirait le type déclaré. Dans ce cas on préfère le fallback.
    if (
      upstream.ok &&
      upstream.body &&
      upstream.headers.get("Content-Type")?.startsWith("image/jpeg")
    ) {
      return new Response(upstream.body, {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": CACHE_HEADER,
        },
      });
    }
  }

  const title = post?.title ?? "Blog";
  const fallback = new ImageResponse(
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

  // `ImageResponse` ne sait produire que du PNG : on convertit pour honorer le
  // `contentType` déclaré. Si sharp échoue, on renvoie le PNG tel quel — une
  // image au type imprécis reste préférable à une 500.
  try {
    const jpeg = await sharp(Buffer.from(await fallback.arrayBuffer()))
      .jpeg({ quality: 88 })
      .toBuffer();
    return new Response(new Uint8Array(jpeg), {
      status: 200,
      headers: { "Content-Type": "image/jpeg", "Cache-Control": CACHE_HEADER },
    });
  } catch {
    return fallback;
  }
}
