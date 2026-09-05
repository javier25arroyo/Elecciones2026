import { Inter, Poppins } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Header, Footer } from "@/components/layout";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SEO_CONFIG, generateWebsiteSchema, generateElectionSchema } from "@/lib/seo.config";
import { GravityStarsBackground, ElectedBanner } from "@/components/ui";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const defaultSiteUrl = "https://elecciones2026.lat";
const normalizedSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl).replace(/\/$/, "");
const previewImage = `${normalizedSiteUrl}${basePath}/assets/others/flag-cr.jpg`;
const defaultTitle = "Elecciones Costa Rica 2026 | Información Electoral y Candidatos";

// Metadata API en vez de tags <head> manuales: así cada página puede
// sobreescribir title/description/canonical/OG/etc. sin que Next duplique
// las etiquetas (antes había 2x <title> y 2x <link rel="canonical"> por
// página, y las 20 páginas de candidato canonicalizaban al home).
export const metadata: Metadata = {
  metadataBase: new URL(normalizedSiteUrl),
  title: defaultTitle,
  description: SEO_CONFIG.descriptions.home,
  keywords: SEO_CONFIG.keywords.primary.concat(SEO_CONFIG.keywords.secondary),
  authors: [{ name: SEO_CONFIG.organization.name }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: normalizedSiteUrl,
    languages: {
      "es-CR": normalizedSiteUrl,
      es: normalizedSiteUrl,
    },
  },
  openGraph: {
    title: defaultTitle,
    description: SEO_CONFIG.descriptions.home,
    type: "website",
    url: normalizedSiteUrl,
    locale: SEO_CONFIG.locale,
    images: [
      {
        url: previewImage,
        width: Number(SEO_CONFIG.socialImage.width),
        height: Number(SEO_CONFIG.socialImage.height),
        alt: SEO_CONFIG.socialImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: SEO_CONFIG.descriptions.home,
    images: [previewImage],
    site: "@elecciones2026",
  },
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: [{ url: `${basePath}/assets/others/icon-192.png`, sizes: "192x192", type: "image/png" }],
    apple: [{ url: `${basePath}/assets/others/icon-192.png` }],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Elecciones CR 2026",
    "revisit-after": "7 days",
    bingbot: "index, follow",
    copyright: `© 2026 ${SEO_CONFIG.organization.name}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#002B7F",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
});

import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <head>
        {/* Datos estructurados principales */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateElectionSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": SEO_CONFIG.organization.name,
          "url": normalizedSiteUrl,
          "logo": `${normalizedSiteUrl}${basePath}/assets/others/flag-cr.jpg`,
          "sameAs": SEO_CONFIG.organization.sameAs,
          "description": SEO_CONFIG.organization.description,
          "address": { "@type": "PostalAddress", "addressCountry": "CR" },
          "contactPoint": { "@type": "ContactPoint", "contactType": "Customer Service", "email": SEO_CONFIG.publisher.email }
        }) }} />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased min-h-screen flex flex-col`}>
        <GravityStarsBackground count={70} className="fixed inset-0 z-40" />
        <div id="scroll-sentinel" className="absolute top-0 left-0 w-full h-2.5 pointer-events-none opacity-0 z-[-1]" aria-hidden="true" />
        <GoogleAnalytics />
        <Header />
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <ElectedBanner />
        <main id="main-content" className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
