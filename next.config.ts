import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Фото товарів на Етапі 1 — локальні SVG-заглушки в /public/products (свій контент).
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Нативні модулі (SQLite-драйвер) не можна бандлити — лишаються зовнішніми для сервера.
  serverExternalPackages: ["@prisma/adapter-better-sqlite3", "better-sqlite3"],
};

export default nextConfig;
