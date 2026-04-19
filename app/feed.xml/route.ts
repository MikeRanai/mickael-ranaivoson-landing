import { getPublishedPosts } from "@/actions/blog-public.actions";
import { generateExcerpt } from "@/lib/blog-utils";

const BASE_URL = "https://www.mickaelranaivoson.fr";

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getPublishedPosts({ limit: 30 });

  const items = posts
    .map((p) => {
      const date = new Date(p.publishedAt ?? p.createdAt).toUTCString();
      const description = p.excerpt ?? generateExcerpt(p.content, 200);
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${BASE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${p.slug}</guid>
      <pubDate>${date}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Mickaël Ranaivoson</title>
    <link>${BASE_URL}/blog</link>
    <description>Conseils, tutoriels et retours d'expérience sur le développement web, Next.js et le SaaS à La Réunion.</description>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
