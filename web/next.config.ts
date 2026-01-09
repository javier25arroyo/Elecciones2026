import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
  },
  // La app se sirve en la raíz del dominio (http://elecciones2026.lat/),
  // por lo que no usamos basePath/assetPrefix personalizados.
  trailingSlash: true,
  output: "export",
  poweredByHeader: false,
};

export default nextConfig;
