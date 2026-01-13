"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId) return;
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      ((...args: unknown[]) => {
        window.dataLayer?.push(args);
      });

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    window.gtag("config", gaId, {
      page_path: url,
    });
  }, [gaId, pathname, searchParams]);

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            // Evita doble conteo: los page_view los mandamos en el useEffect cuando cambie la ruta
            gtag('config', '${gaId}', { send_page_view: false });
          `,
        }}
      />
    </>
  );
}
