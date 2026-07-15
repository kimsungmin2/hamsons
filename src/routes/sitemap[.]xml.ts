import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";

const SITE_URL = "https://hamsons.co.kr";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];

        // 정적 페이지
        const staticPages = [
          { loc: "/", changefreq: "weekly", priority: "1.0" },
          { loc: "/products", changefreq: "weekly", priority: "0.9" },
          { loc: "/service", changefreq: "monthly", priority: "0.8" },
          { loc: "/rental", changefreq: "monthly", priority: "0.8" },
          { loc: "/about", changefreq: "monthly", priority: "0.7" },
          { loc: "/contact", changefreq: "monthly", priority: "0.7" },
          { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
        ];

        // 제품 상세 페이지 (동적)
        const productPages = products.map((p) => ({
          loc: `/products/${p.id}`,
          changefreq: "monthly",
          priority: "0.8",
        }));

        const allPages = [...staticPages, ...productPages];

        const urls = allPages
          .map(
            (page) => `  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        return new Response(xml, {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
