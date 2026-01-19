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
  
  // SEO y Performance optimizaciones
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Cache headers para archivos estáticos
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache para sitemap y robots
      {
        source: "/(sitemap|robots)\\.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
      // Cache para páginas HTML
      {
        source: "/:path*\\.html",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  redirects: async () => {
    return [
      // Redireccionamientos SEO útiles
      {
        source: "/inicio",
        destination: "/",
        permanent: true,
      },
    ];
  },

  rewrites: async () => {
    return {
      beforeFiles: [
        // Reescritura para /sitemap.xml si está en /public
        {
          source: "/sitemap.xml",
          destination: "/sitemap.xml",
        },
        {
          source: "/robots.txt",
          destination: "/robots.txt",
        },
      ],
    };
  },

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
