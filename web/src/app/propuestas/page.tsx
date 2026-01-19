import { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/seo.config";

export const metadata: Metadata = {
  title: "Propuestas Políticas Costa Rica 2026 | Planes de Gobierno",
  description: SEO_CONFIG.descriptions.proposals,
  keywords: SEO_CONFIG.pageKeywords["/propuestas"],
  openGraph: {
    title: "Propuestas Políticas Costa Rica 2026",
    description: SEO_CONFIG.descriptions.proposals,
    url: `${SEO_CONFIG.siteUrl}/propuestas`,
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
    canonical: `${SEO_CONFIG.siteUrl}/propuestas`,
  },
};

export default function PropuestasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Propuestas Políticas Costa Rica 2026",
            "description": SEO_CONFIG.descriptions.proposals,
            "url": `${SEO_CONFIG.siteUrl}/propuestas`,
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Inicio",
                  "item": SEO_CONFIG.siteUrl,
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Propuestas",
                  "item": `${SEO_CONFIG.siteUrl}/propuestas`,
                },
              ],
            },
          }),
        }}
      />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Propuestas Políticas Costa Rica 2026
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Analiza y compara las propuestas de los partidos políticos en áreas como educación, economía, seguridad y más.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Educación</h3>
              <p className="text-gray-600">Propuestas de los partidos sobre sistema educativo costarricense.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Economía</h3>
              <p className="text-gray-600">Planes de desarrollo económico y empleo para Costa Rica 2026.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Seguridad</h3>
              <p className="text-gray-600">Estrategias de seguridad ciudadana de los candidatos.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
