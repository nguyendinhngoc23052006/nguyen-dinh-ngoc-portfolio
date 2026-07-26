import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  adapter: cloudflare({ imageService: "compile" }),
  integrations: [react()],
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data:",
        "connect-src 'self' https://*.supabase.co https://cloudflareinsights.com",
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
