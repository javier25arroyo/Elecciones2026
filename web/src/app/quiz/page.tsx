import { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/seo.config";

export const metadata: Metadata = {
  title: "Brújula Política | Test Interactivo Elecciones 2026",
  description: SEO_CONFIG.descriptions.quiz,
  keywords: SEO_CONFIG.pageKeywords["/quiz"],
  openGraph: {
    title: "Brújula Política | Test Interactivo",
    description: SEO_CONFIG.descriptions.quiz,
    url: `${SEO_CONFIG.siteUrl}/quiz`,
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
    canonical: `${SEO_CONFIG.siteUrl}/quiz`,
  },
};

export default function QuizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Brújula Política",
            "description": SEO_CONFIG.descriptions.quiz,
            "url": `${SEO_CONFIG.siteUrl}/quiz`,
            "applicationCategory": "EducationalApplication",
          }),
        }}
      />
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Brújula Política
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Descubre tu posición política a través de un test interactivo.
          </p>

          <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">¿Cómo funciona?</h2>
                <p className="text-gray-600 mb-4">
                  Responde preguntas sobre política, economía, seguridad social y otros temas importantes para descubrir tu posición en el espectro político.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Características:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Test rápido: responde preguntas en menos de 5 minutos</li>
                  <li>Test profundo: análisis detallado de tus posiciones políticas</li>
                  <li>Compara tus resultados con los candidatos presidenciales</li>
                  <li>Descubre tu afinidad con cada partido político</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <p className="text-gray-700">
                  Estos tests son herramientas educativas diseñadas para ayudarte a entender mejor tus preferencias políticas antes de votar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
