/**
 * Funciones para metadata dinámico y structured data
 * Reutilizable en todas las páginas de la aplicación
 */

export interface MetadataProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url: string;
  structuredData?: Record<string, unknown>;
}

/**
 * Genera metadata para candidatos
 */
export function generateCandidateMetadata(candidate: {
  name: string;
  party: string;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": candidate.name,
    "image": candidate.image,
    "jobTitle": "Candidato Presidencial",
    "affiliation": {
      "@type": "Organization",
      "name": candidate.party,
    },
    "url": candidate.url,
    "description": `${candidate.name}, candidato presidencial por ${candidate.party} para las elecciones Costa Rica 2026`,
  };
}

/**
 * Genera metadata para partidos políticos
 */
export function generatePartyMetadata(party: {
  name: string;
  logo: string;
  url: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "PoliticalParty",
    "name": party.name,
    "logo": party.logo,
    "url": party.url,
    "description": party.description,
  };
}

/**
 * Genera datos de breadcrumb para navegación
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

/**
 * Genera datos FAQPage para preguntas frecuentes
 */
export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/**
 * Genera datos para evento electoral
 */
export function generateElectionEventSchema(event: {
  name: string;
  startDate: string;
  endDate?: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    ...(event.endDate && { "endDate": event.endDate }),
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "organizer": {
      "@type": "Organization",
      "name": "Tribunal Supremo de Elecciones - Costa Rica",
      "url": "https://www.tse.go.cr/",
    },
    "location": {
      "@type": "Place",
      "name": "Costa Rica",
    },
  };
}

/**
 * Hook para obtener metadata basado en keywords del SEO config
 */
export const SEO_KEYWORDS_BY_PAGE: Record<string, string[]> = {
  "/": [
    "elecciones 2026 Costa Rica",
    "candidatos presidenciales",
    "información electoral",
    "voto 2026",
  ],
  "/candidatos": [
    "candidatos Costa Rica 2026",
    "candidatos presidenciales",
    "propuestas políticas",
    "trayectoria política",
  ],
  "/propuestas": [
    "propuestas políticas",
    "planes de gobierno",
    "programas electorales",
    "política económica",
    "educación",
    "seguridad",
  ],
  "/cronograma": [
    "cronograma electoral",
    "fechas elecciones",
    "calendario electoral",
    "primera ronda",
    "segunda ronda",
  ],
  "/educacion": [
    "educación cívica",
    "sistema electoral",
    "derechos del votante",
    "proceso electoral",
    "democracia",
  ],
  "/quiz": [
    "brújula política",
    "test político",
    "posición política",
    "ideología política",
    "afinidad electoral",
  ],
};
