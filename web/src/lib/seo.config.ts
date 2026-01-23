/**
 * Configuración centralizada de SEO
 * Mantén aquí todas las palabras clave, metadatos y configuraciones para fácil mantenimiento
 */

export const SEO_CONFIG = {
  // Dominio principal
  siteUrl: "https://elecciones2026.lat",
  domain: "elecciones2026.lat",
  siteName: "Elecciones Costa Rica 2026",
  
  // Información general
  locale: "es-CR",
  language: "es",
  
  // Palabras clave principales (Long-tail keywords para SEO)
  keywords: {
    primary: [
      "Elecciones 2026",
      "Candidatos 2026",
      "Candidatos Costa Rica",
      "Elecciones Costa Rica",
      "Presidente Costa Rica 2026",
      "Elecciones presidenciales Costa Rica 2026",
      "Papeleta presidencial 2026",
      "Guía electoral Costa Rica",
    ],
    secondary: [
      "propuestas políticas Costa Rica 2026",
      "votación 2026",
      "política Costa Rica",
      "partidos políticos costarricenses",
      "cronograma electoral Costa Rica",
      "brújula política",
      "test político",
      "ideología política",
      "primera ronda elecciones Costa Rica 2026",
      "segunda ronda elecciones Costa Rica 2026",
      "TSE Costa Rica",
      "dónde votar 2026",
    ],
  },

  // Meta descriptions
  descriptions: {
    home: "Tu guía oficial no gubernamental para las Elecciones 2026 en Costa Rica. Conoce a todos los Candidatos a Presidente, sus propuestas, el cronograma electoral y aprende cómo votar informado.",
    candidates: "Lista completa y actualizada de Candidatos Costa Rica 2026. Perfiles detallados, planes de gobierno y trayectoria de los aspirantes a la presidencia.",
    proposals: "Comparador de propuestas de gobierno Elecciones 2026. Economía, seguridad, educación y salud: ¿Qué proponen los candidatos en Costa Rica?",
    timeline: "Calendario oficial de las Elecciones Costa Rica 2026. Fechas clave, debates presidenciales y días de votación.",
    education: "Guía para el votante: Todo lo que necesitas saber sobre las Elecciones en Costa Rica. Requisitos, centros de votación y educación cívica.",
    quiz: "Quiz de Afinidad Política 2026: Descubre qué candidato a la presidencia de Costa Rica se alinea mejor con tus ideas y valores.",
  },

  // Open Graph / Social Media
  socialImage: {
    url: "https://elecciones2026.lat/assets/others/flag-cr.jpg",
    alt: "Bandera de Costa Rica - Elecciones 2026",
    width: "1633",
    height: "980",
  },

  // Estructuras JSON-LD para buscadores
  organization: {
    name: "Info Politic CR",
    url: "https://elecciones2026.lat",
    description: "Proyecto educativo sin fines de lucro para informar sobre las elecciones presidenciales de Costa Rica 2026",
    sameAs: [
      "https://github.com/javier25arroyo",
    ],
  },

  // Palabras clave por página/sección
  pageKeywords: {
    "/": "elecciones 2026 Costa Rica, información electoral, candidatos presidenciales, votación",
    "/candidatos": "candidatos Costa Rica 2026, candidatos presidenciales, propuestas políticas",
    "/propuestas": "propuestas políticas Costa Rica, planes de gobierno 2026, programas electorales",
    "/cronograma": "cronograma electoral Costa Rica 2026, fechas elecciones, calendario electoral",
    "/educacion": "educación cívica, sistema electoral Costa Rica, derechos del votante",
    "/quiz": "brújula política, test político, posición política, ideología",
  },

  // Slugs para páginas
  routes: {
    HOME: "/",
    CANDIDATES: "/candidatos",
    PROPOSALS: "/propuestas",
    TIMELINE: "/cronograma",
    EDUCATION: "/educacion",
    QUIZ: "/quiz",
    PRIVACY: "/privacidad",
    TERMS: "/terminos",
  },

  // Headers para performance
  headers: {
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    "X-UA-Compatible": "IE=edge",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },

  // Contacto / Publisher
  publisher: {
    name: "Info Politic CR",
    email: "contact@elecciones2026.lat",
    country: "Costa Rica",
  },

  // Información de construcción del sitio
  build: {
    framework: "Next.js 16",
    hosted: "vercel.com",
    cdn: "cloudflare",
  },
};

/**
 * Genera canonical URL
 */
export function getCanonicalUrl(path: string = ""): string {
  return `${SEO_CONFIG.siteUrl}${path}`.replace(/\/$/, "") || SEO_CONFIG.siteUrl;
}

/**
 * Genera descripción meta por página
 */
export function getMetaDescription(key: keyof typeof SEO_CONFIG.descriptions): string {
  return SEO_CONFIG.descriptions[key];
}

/**
 * Genera keywords meta por página
 */
export function getPageKeywords(path: string): string {
  return SEO_CONFIG.pageKeywords[path as keyof typeof SEO_CONFIG.pageKeywords] 
    || SEO_CONFIG.keywords.primary.join(", ");
}

/**
 * Genera JSON-LD para artículos de noticias políticas
 */
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.headline,
    "description": article.description,
    "image": article.image,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": {
      "@type": "Organization",
      "name": article.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": SEO_CONFIG.organization.name,
      "logo": {
        "@type": "ImageObject",
        "url": SEO_CONFIG.socialImage.url,
      },
    },
  };
}

/**
 * Genera JSON-LD para el sitio web (Web Site Schema)
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SEO_CONFIG.siteName,
    "description": SEO_CONFIG.descriptions.home,
    "url": SEO_CONFIG.siteUrl,
    "inLanguage": SEO_CONFIG.locale,
    "publisher": {
      "@type": "Organization",
      "name": SEO_CONFIG.organization.name,
      "url": SEO_CONFIG.siteUrl,
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SEO_CONFIG.siteUrl}/#search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Genera JSON-LD para organizaciones (Parties/Partidos)
 */
export function generateOrganizationSchema(party: {
  name: string;
  url: string;
  logo: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "PoliticalParty",
    "name": party.name,
    "url": party.url,
    "logo": party.logo,
    "description": party.description,
  };
}

/**
 * Genera JSON-LD para personas (Candidatos)
 */
export function generatePersonSchema(person: {
  name: string;
  url: string;
  image: string;
  description: string;
  jobTitle: string;
  party: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "url": person.url,
    "image": person.image,
    "description": person.description,
    "jobTitle": person.jobTitle,
    "worksFor": {
      "@type": "Organization",
      "name": person.party,
    },
  };
}

/**
 * Genera JSON-LD para preguntas frecuentes (FAQPage)
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
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
 * Genera JSON-LD específico para la elección (Election Schema)
 * Crítico para aparecer en "Elecciones Costa Rica"
 */
export function generateElectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Election",
    "name": "Elecciones Presidenciales Costa Rica 2026",
    "description": "Elecciones generales para elegir Presidente, Vicepresidentes y Diputados de la República de Costa Rica para el período 2026-2030.",
    "startDate": "2026-02-01",
    "location": {
      "@type": "Country",
      "name": "Costa Rica"
    },
    "candidate": {
      "@type": "Person",
      "name": "Candidatos Presidenciales 2026"
    }
  };
}

/**
 * Genera JSON-LD para eventos electorales
 */
export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    ...(event.endDate && { "endDate": event.endDate }),
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CR",
      },
    },
    "organizer": {
      "@type": "Organization",
      "name": "Tribunal Supremo de Elecciones - Costa Rica",
    },
  };
}
