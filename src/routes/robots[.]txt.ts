import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://hamsons.co.kr";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const robotsTxt = `# Robots.txt for ${SITE_URL}
User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# 네이버 검색봇
User-agent: Yeti
Allow: /

# 구글 검색봇
User-agent: Googlebot
Allow: /

# 빙 검색봇
User-agent: Bingbot
Allow: /
`;

        return new Response(robotsTxt, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
