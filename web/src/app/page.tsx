import { getContent } from "@/lib/content";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { CandidatesSection } from "@/components/sections/CandidatesSection";

// Lazy load componentes pesados que no están en el viewport inicial
const TimelineSection = dynamic(
  () => import("@/components/sections/TimelineSection").then(mod => ({ default: mod.TimelineSection })),
  { 
    loading: () => <div style={{ minHeight: "400px" }} />,
    ssr: true 
  }
);

const EducationSection = dynamic(
  () => import("@/components/sections/EducationSection").then(mod => ({ default: mod.EducationSection })),
  { 
    loading: () => <div style={{ minHeight: "400px" }} />,
    ssr: true 
  }
);

const QuizSection = dynamic(
  () => import("@/components/sections/QuizSection").then(mod => ({ default: mod.QuizSection })),
  { 
    loading: () => <div style={{ minHeight: "400px" }} />,
    ssr: true 
  }
);

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <HeroSection />
      <CandidatesSection parties={content.parties} />
      <TimelineSection />
      <EducationSection />
      <QuizSection 
        parties={content.parties} 
        questions={content.quiz?.questions} 
      />
    </>
  );
}
