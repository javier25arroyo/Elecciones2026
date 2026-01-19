import { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/seo.config";

export const metadata: Metadata = {
  title: "Cronograma Electoral Costa Rica 2026 | Fechas Importantes",
  description: SEO_CONFIG.descriptions.timeline,
  keywords: SEO_CONFIG.pageKeywords["/cronograma"],
  openGraph: {
    title: "Cronograma Electoral Costa Rica 2026",
    description: SEO_CONFIG.descriptions.timeline,
    url: `${SEO_CONFIG.siteUrl}/cronograma`,
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
    canonical: `${SEO_CONFIG.siteUrl}/cronograma`,
  },
};

export default function CronogramaPage() {
  const events = [
    {
      date: "Enero 2026",
      title: "Preparación de candidaturas",
      description: "Registro de candidatos ante el Tribunal Supremo de Elecciones",
    },
    {
      date: "Febrero 2026",
      title: "Campañas políticas",
      description: "Inicio de campañas de los partidos políticos",
    },
    {
      date: "Febrero 2026",
      title: "Primera ronda electoral",
      description: "Votación de la primera ronda presidencial",
    },
    {
      date: "Abril 2026",
      title: "Segunda ronda (si es necesaria)",
      description: "Votación de balotaje si ningún candidato obtuvo mayoría",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cronograma Electoral Costa Rica 2026",
            "description": SEO_CONFIG.descriptions.timeline,
            "url": `${SEO_CONFIG.siteUrl}/cronograma`,
            "mainEntity": {
              "@type": "ItemList",
              "name": "Fechas Electorales",
              "itemListElement": events.map((event, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": event.title,
                "description": event.description,
              })),
            },
          }),
        }}
      />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cronograma Electoral Costa Rica 2026
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Fechas importantes y eventos clave del proceso electoral costarricense.
          </p>

          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="font-bold text-lg text-blue-600">{event.date}</div>
                </div>
                <div className="flex-grow bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
