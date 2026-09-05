import { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/seo.config";
import { QuizRedirect } from "./QuizRedirect";

export const metadata: Metadata = {
  title: "Brújula Política | Test Interactivo Elecciones 2026",
  description: SEO_CONFIG.descriptions.quiz,
  keywords: SEO_CONFIG.pageKeywords["/quiz"],
  openGraph: {
    title: "Brújula Política | Test Interactivo",
    description: SEO_CONFIG.descriptions.quiz,
    url: `${SEO_CONFIG.siteUrl}/#quiz`,
    images: [
      {
        url: SEO_CONFIG.socialImage.url,
        width: parseInt(SEO_CONFIG.socialImage.width),
        height: parseInt(SEO_CONFIG.socialImage.height),
        alt: SEO_CONFIG.socialImage.alt,
      },
    ],
  },
  // El quiz real vive en el home (#quiz); canonical apunta allí.
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}/`,
  },
};

export default function QuizPage() {
  return <QuizRedirect />;
}
