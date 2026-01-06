"use client";

import { Inter, Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import "./globals.css";

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
        <link rel="icon" href="/assets/others/FlagCosta_Rica.ico" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${mounted ? 'is-mounted' : ''}`}>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
