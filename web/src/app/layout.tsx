import { Inter, Poppins } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SEO_CONFIG, generateWebsiteSchema, generateElectionSchema } from "@/lib/seo.config";
import { GravityStarsBackground } from "@/components/ui";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const defaultSiteUrl = "https://elecciones2026.lat";
const normalizedSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl).replace(/\/$/, "");
const previewImage = `${normalizedSiteUrl}${basePath}/assets/others/flag-cr.jpg`;

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
        {/* Título y descripción dinámicos por página */}
        <title key="title">Elecciones Costa Rica 2026 | Información Electoral y Candidatos</title>
        <meta key="desc" name="description" content={SEO_CONFIG.descriptions.home} />
        <meta key="keywords" name="keywords" content={SEO_CONFIG.keywords.primary.concat(SEO_CONFIG.keywords.secondary).join(", ")} />
        {/* Charset y viewport */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Open Graph */}
        <meta property="og:title" content="Elecciones Costa Rica 2026 | Información Electoral y Candidatos" />
        <meta property="og:description" content={SEO_CONFIG.descriptions.home} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={normalizedSiteUrl} />
        <meta property="og:image" content={previewImage} />
        <meta property="og:image:width" content={SEO_CONFIG.socialImage.width} />
        <meta property="og:image:height" content={SEO_CONFIG.socialImage.height} />
        <meta property="og:image:alt" content={SEO_CONFIG.socialImage.alt} />
        <meta property="og:locale" content={SEO_CONFIG.locale} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Elecciones Costa Rica 2026 | Información Electoral y Candidatos" />
        <meta name="twitter:description" content={SEO_CONFIG.descriptions.home} />
        <meta name="twitter:image" content={previewImage} />
        <meta name="twitter:image:alt" content={SEO_CONFIG.socialImage.alt} />
        <meta name="twitter:site" content="@elecciones2026" />
        {/* Robots and Indexing */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content={SEO_CONFIG.organization.name} />
        <meta name="copyright" content={`© 2026 ${SEO_CONFIG.organization.name}`} />
        {/* Canonical y hreflang dinámicos */}
        <link rel="canonical" href={normalizedSiteUrl} key="canonical" />
        <link rel="alternate" hrefLang="es-CR" href={normalizedSiteUrl} key="hreflang-es-cr" />
        <link rel="alternate" hrefLang="es" href={normalizedSiteUrl} key="hreflang-es" />
        {/* Favicon y manifest */}
        <link rel="icon" href={`${basePath}/assets/others/icon-192.png`} sizes="192x192" type="image/png" />
        <link rel="manifest" href={`${basePath}/manifest.json`} />
        {/* App Colors */}
        <meta name="theme-color" content="#002B7F" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Elecciones CR 2026" />
        <link rel="apple-touch-icon" href={`${basePath}/assets/others/icon-192.png`} />
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
        <main id="main-content" className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
