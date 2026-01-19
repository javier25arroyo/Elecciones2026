import { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/seo.config";

export const metadata: Metadata = {
  title: "Educación Cívica | Sistema Electoral Costa Rica 2026",
  description: SEO_CONFIG.descriptions.education,
  keywords: SEO_CONFIG.pageKeywords["/educacion"],
  openGraph: {
    title: "Educación Cívica | Sistema Electoral Costa Rica",
    description: SEO_CONFIG.descriptions.education,
    url: `${SEO_CONFIG.siteUrl}/educacion`,
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
    canonical: `${SEO_CONFIG.siteUrl}/educacion`,
  },
};

export default function EducacionPage() {
  const topics = [
    {
      title: "¿Cómo funciona el voto en Costa Rica?",
      content: "Costa Rica utiliza un sistema de voto secreto directo donde cada ciudadano puede ejercer su derecho al voto libremente.",
    },
    {
      title: "Requisitos para votar",
      content: "Ser ciudadano costarricense, mayor de 18 años y estar en el padrón electoral.",
    },
    {
      title: "El sistema electoral costarricense",
      content: "Conoce cómo funciona nuestro sistema electoral, los requisitos para ser candidato y cómo se cuentan los votos.",
    },
    {
      title: "Derechos y deberes del votante",
      content: "Información sobre tus derechos como ciudadano y tu responsabilidad de participar activamente en el proceso democrático.",
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
            "name": "Educación Cívica",
            "description": SEO_CONFIG.descriptions.education,
            "url": `${SEO_CONFIG.siteUrl}/educacion`,
            "mainEntity": {
              "@type": "ItemList",
              "name": "Temas de Educación Cívica",
              "itemListElement": topics.map((topic, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": topic.title,
              })),
            },
          }),
        }}
      />
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Educación Cívica
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Aprende sobre el sistema electoral costarricense y tu derecho al voto.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.map((topic, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">{topic.title}</h3>
                <p className="text-gray-600">{topic.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
