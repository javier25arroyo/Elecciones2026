import type { NextConfig } from "next";
import path from "node:path";

// Permite builds duales: raíz (producción con dominio personalizado) y GitHub Pages.
// Para GitHub Pages exporta con basePath/assetPrefix (ej. /Elecciones2026).
const basePathEnv = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
const basePath = basePathEnv && basePathEnv !== "/" ? basePathEnv : "";
const assetPrefixEnv = process.env.NEXT_PUBLIC_ASSET_PREFIX?.trim();
const assetPrefix = assetPrefixEnv || basePath || undefined;

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix,
  trailingSlash: true,
  output: "export",
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
