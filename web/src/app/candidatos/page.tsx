import { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/seo.config";
import { getContent } from "@/lib/content";
import { CandidatesSection } from "@/components/sections/CandidatesSection";

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

export default async function CandidatosPage() {
  const content = await getContent();

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
              "itemListElement": content.parties.map((party, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": party.presidential_candidate?.name || party.name,
                "description": `Candidato del partido ${party.name}. ${party.ideology || ''}`,
              })),
            },
          }),
        }}
      />
      <div className="pt-20">
        <CandidatesSection parties={content.parties} />
      </div>
    </>
  );
}
