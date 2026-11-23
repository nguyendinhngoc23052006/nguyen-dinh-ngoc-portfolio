import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  // SEO: canonical origin + trailing-slash policy.
  // Search Console flagged /cv → /cv/ 307 redirects under the previous
  // implicit setting; `never` makes /cv the canonical form, so the sitemap,
  // <link rel="canonical">, and internal links all agree with what the site
  // actually serves.
  site: "https://nguyendinhngoc.dev",
  trailingSlash: "never",

  output: "server",
  // The CV PDFs carry the owner's name. The old addresses stay valid for
  // links already sent to employers.
  redirects: {
    "/jade-cv.pdf": { status: 301, destination: "/Nguyen-Dinh-Ngoc-CV-EN.pdf" },
    "/jade-cv-vi.pdf": {
      status: 301,
      destination: "/Nguyen-Dinh-Ngoc-CV-VI.pdf",
    },
  },
  adapter: cloudflare({ imageService: "compile" }),
  integrations: [
    react(),
    sitemap({
      // /cv is meta robots="noindex"; keep it out of the sitemap too.
      // /api/* and /health are Astro endpoints, not indexable pages.
      filter: (page) =>
        !page.includes("/cv") &&
        !page.includes("/api/") &&
        !page.includes("/health"),
    }),
  ],
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data:",
        "connect-src 'self' https://cloudflareinsights.com",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      styleDirective: {
        resources: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
        ],
      },
      scriptDirective: {
        resources: ["'self'", "https://static.cloudflareinsights.com"],
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
