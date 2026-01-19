import { Metadata } from "next";
import { SEO_CONFIG, getMetaDescription, generateWebsiteSchema } from "@/lib/seo.config";

export const metadata: Metadata = {
  title: "Candidatos Presidenciales Costa Rica 2026 | Información Completa",
  description: SEO_CONFIG.descriptions.candidates,
  keywords: SEO_CONFIG.pageKeywords["/candidatos"],
  openGraph: {
    title: "Candidatos Presidenciales Costa Rica 2026",
    description: SEO_CONFIG.descriptions.candidates,
    url: `${SEO_CONFIG.siteUrl}/candidatos`,
    images: [
      {
        url: SEO_CONFIG.socialImage.url,
        width: parseInt(SEO_CONFIG.socialImage.width),
        height: parseInt(SEO_CONFIG.socialImage.height),
        alt: SEO_CONFIG.socialImage.alt,
      },
    ],
  },
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/candidatos`,
  },
};

export default function CandidatosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Candidatos Presidenciales Costa Rica 2026",
            "description": SEO_CONFIG.descriptions.candidates,
            "url": `${SEO_CONFIG.siteUrl}/candidatos`,
            "mainEntity": {
              "@type": "ItemList",
              "name": "Candidatos Presidenciales 2026",
            },
          }),
        }}
      />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Candidatos Presidenciales Costa Rica 2026
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Conoce a todos los candidatos presidenciales, sus propuestas y trayectoria política.
          </p>
          <p className="text-gray-600">
            Esta sección se completa automáticamente desde la página principal con toda la información de candidatos.
          </p>
        </div>
      </div>
    </>
  );
}
