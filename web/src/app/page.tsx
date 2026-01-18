import { getContent } from "@/lib/content";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { CandidatesSection } from "@/components/sections/CandidatesSection";

const TimelineSection = dynamic(
  () => import("@/components/sections/TimelineSection").then(mod => ({ default: mod.TimelineSection })),
  { 
    loading: () => <div className="min-h-[400px]" />,
    ssr: true 
  }
);

const EducationSection = dynamic(
  () => import("@/components/sections/EducationSection").then(mod => ({ default: mod.EducationSection })),
  { 
    loading: () => <div className="min-h-[400px]" />,
    ssr: true 
  }
);

const QuizzesSection = dynamic(
  () => import("@/components/sections/QuizzesSection").then(mod => ({ default: mod.QuizzesSection })),
  {
    loading: () => <div className="min-h-[400px]" />,
    ssr: true,
  }
);

export default async function Home() {
  const content = await getContent();
  const deepQuizQuestions = content.deep_quiz?.questions ?? [];
  const quickQuizQuestions = content.quiz?.questions ?? [];

  return (
    <>
      <HeroSection />
      <CandidatesSection parties={content.parties} />
      <TimelineSection />
      <EducationSection />

      <QuizzesSection
        parties={content.parties}
        quickQuestions={quickQuizQuestions.length ? quickQuizQuestions : (content.quiz?.questions ?? [])}
        deepQuestions={deepQuizQuestions}
        deepDescription={content.deep_quiz?.description}
      />
    </>
  );
}
