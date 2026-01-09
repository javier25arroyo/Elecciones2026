"use client";

import { Inter, Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const defaultSiteUrl = "https://elecciones2026.lat";
const normalizedSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl).replace(/\/$/, "");
const previewImage = `${normalizedSiteUrl}${basePath}/assets/others/flag-cr.jpg`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="es">
      <head>
        <title>Elecciones Costa Rica 2026 | Información Electoral</title>
        <meta
          name="description"
          content="Plataforma educativa e interactiva sobre las elecciones presidenciales de Costa Rica 2026. Conoce a los candidatos, sus propuestas y participa informadamente."
        />
        <meta
          name="keywords"
          content="elecciones, Costa Rica, 2026, candidatos, presidenciales, votación"
        />
        <meta property="og:title" content="Elecciones Costa Rica 2026 | Información Electoral" />
        <meta
          property="og:description"
          content="Plataforma educativa e interactiva sobre las elecciones presidenciales de Costa Rica 2026. Conoce a los candidatos, sus propuestas y participa informadamente."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={normalizedSiteUrl} />
        <meta property="og:image" content={previewImage} />
        <meta property="og:image:width" content="1633" />
        <meta property="og:image:height" content="980" />
        <meta property="og:image:alt" content="Bandera de Costa Rica" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Elecciones Costa Rica 2026 | Información Electoral" />
        <meta
          name="twitter:description"
          content="Plataforma educativa e interactiva sobre las elecciones presidenciales de Costa Rica 2026. Conoce a los candidatos, sus propuestas y participa informadamente."
        />
        <meta name="twitter:image" content={previewImage} />
        <meta name="twitter:image:alt" content="Bandera de Costa Rica" />
        <link rel="icon" href={`${basePath}/assets/others/FlagCosta_Rica.ico`} />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${mounted ? 'is-mounted' : ''} antialiased min-h-screen flex flex-col bg-gray-50 dark:bg-black/95`}>
        <Header />
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <main id="main-content" className="grow">
          {children}
        </main>
      </body>
    </html>
  );
}
