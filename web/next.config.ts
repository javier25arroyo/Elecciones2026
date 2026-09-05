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

  // Nota: headers/redirects/rewrites NO se aplican con output: "export"
  // (GitHub Pages sirve ficheros estáticos). Los headers de seguridad deben
  // configurarse en el CDN/hosting. Si se migra a Vercel/Netlify, añadirlos aquí.

  // Experimental features para mejor performance
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "clsx",
      "framer-motion",
    ],
  },

  // Webpack optimizaciones
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            // Agrupar vendors
            vendor: {
              filename: "chunks/vendor-[hash].js",
              test: /node_modules/,
              priority: 10,
              reuseExistingChunk: true,
            },
            // Agrupar React
            react: {
              filename: "chunks/react-[hash].js",
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
            },
            // Código compartido
            common: {
              filename: "chunks/common-[hash].js",
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
