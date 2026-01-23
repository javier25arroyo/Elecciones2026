import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { Button, LinkButton } from "@/components/ui/Button";
import { 
  ChevronLeft, 
  FileText, 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  CheckCircle2, 
  ExternalLink 
} from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const { parties } = await getContent();
  return parties.map((party) => ({
    id: party.id!,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { parties } = await getContent();
  const party = parties.find((p) => p.id === id);

  if (!party) {
    return {
      title: "Candidato no encontrado",
    };
  }

  const candidateName = party.presidential_candidate?.name || "Candidato";
  
  return {
    title: `${candidateName} | Candidato Elecciones Costa Rica 2026`,
    description: `Conoce las propuestas, biografía y plan de gobierno de ${candidateName}, candidato presidencial por el partido ${party.name} para las Elecciones 2026.`,
    openGraph: {
      title: `${candidateName} - Elecciones Costa Rica 2026`,
      description: `Todo sobre ${candidateName} y sus propuestas para la presidencia de Costa Rica.`,
      images: party.presidential_candidate?.photo_url ? [party.presidential_candidate.photo_url] : [],
    },
  };
}

export default async function CandidatePage({ params }: Props) {
  const { id } = await params;
  const { parties } = await getContent();
  const party = parties.find((p) => p.id === id);

  if (!party) {
    notFound();
  }

  const candidate = party.presidential_candidate;
  const accentColor = party.accent_color || "#2563eb";

  // Helper function to map social icons
  const getSocialIcon = (network: string) => {
    switch (network.toLowerCase()) {
      case 'facebook': return <Facebook className="h-5 w-5" />;
      case 'twitter': 
      case 'x': return <Twitter className="h-5 w-5" />;
      case 'instagram': return <Instagram className="h-5 w-5" />;
      case 'linkedin': return <Linkedin className="h-5 w-5" />;
      case 'youtube': return <Youtube className="h-5 w-5" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-12">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/candidatos" 
            className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Volver a Candidatos
          </Link>
        </div>

        {/* Header Profile Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
          {/* Background Gradient */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{ 
              background: `linear-gradient(to bottom right, ${accentColor}, transparent)` 
            }} 
          />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 p-8 md:p-12 items-center md:items-start">
            {/* Image */}
            <div className="shrink-0 relative group">
              <div 
                className="absolute -inset-1 rounded-full opacity-30 blur-md transition-opacity duration-500 group-hover:opacity-50"
                style={{ backgroundColor: accentColor }}
              />
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-slate-800 shadow-xl bg-slate-800">
                {candidate?.photo_url ? (
                  <Image 
                    src={candidate.photo_url} 
                    alt={candidate.name || party.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-500">
                    <span className="text-4xl font-bold">{party.name.substring(0, 2)}</span>
                  </div>
                )}
              </div>
              {/* Party Logo Overlay */}
              {party.logo_url && (
                <div className="absolute -bottom-2 -right-2 h-16 w-16 overflow-hidden rounded-full border-4 border-slate-900 bg-white p-2 shadow-lg">
                  <Image 
                    src={party.logo_url} 
                    alt={`Logo ${party.name}`}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                  <Badge variant="outline" className="border-white/20 text-white/80">
                    {party.name}
                  </Badge>
                  {party.ideology && (
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border-0">
                      {party.ideology}
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
                  {candidate?.name || "Candidato por definir"}
                </h1>
                <p className="text-xl text-slate-400 font-medium">
                  Candidato Presidencial 2026
                </p>
              </div>

              {/* Formula */}
              {(candidate?.first_vice_president || candidate?.second_vice_president) && (
                <div className="bg-white/5 rounded-xl p-4 md:inline-flex flex-col md:flex-row gap-4 md:gap-8 border border-white/5 text-sm">
                  {candidate.first_vice_president && (
                    <div className="flex flex-col">
                      <span className="text-slate-500 uppercase text-[10px] font-bold tracking-wider">1ª Vicepresidencia</span>
                      <span className="text-slate-200 font-semibold">{candidate.first_vice_president}</span>
                    </div>
                  )}
                  {candidate.second_vice_president && (
                    <div className="flex flex-col">
                      <span className="text-slate-500 uppercase text-[10px] font-bold tracking-wider">2ª Vicepresidencia</span>
                      <span className="text-slate-200 font-semibold">{candidate.second_vice_president}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                {party.plan_url && (
                  <LinkButton 
                    href={party.plan_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Plan de Gobierno
                  </LinkButton>
                )}
                
                {party.official_links && Object.entries(party.official_links).map(([key, url]) => (
                  <LinkButton 
                    key={key} 
                    href={url}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    variant="ghost" 
                    className="p-2 h-10 w-10 text-slate-400 hover:text-white hover:bg-white/10"
                    aria-label={`Visitar ${key}`}
                  >
                    {getSocialIcon(key)}
                  </LinkButton>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Bio */}
            {candidate?.bio && (
              <section aria-labelledby="bio-heading">
                <h2 id="bio-heading" className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 rounded-full bg-blue-500" />
                  Biografía
                </h2>
                <div className="prose prose-invert prose-lg text-slate-300 max-w-none">
                  <p>{candidate.bio}</p>
                </div>
              </section>
            )}

            {/* Pillars / Proposals */}
            {candidate?.pillars && candidate.pillars.length > 0 && (
              <section aria-labelledby="pillars-heading">
                <h2 id="pillars-heading" className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-8 h-1 rounded-full bg-blue-500" />
                  Ejes de Gobierno
                </h2>
                <div className="grid gap-4">
                  {candidate.pillars.map((pillar, idx) => (
                    <div 
                      key={idx}
                      className="flex gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="shrink-0 mt-1">
                        <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {pillar}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Party Details Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">
                Detalles del Partido
              </h3>
              
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-slate-500 mb-1">Valores Principales</dt>
                  <dd className="flex flex-wrap gap-2">
                    {party.values?.map(val => (
                      <span key={val} className="inline-flex items-center rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-white/10">
                        {val}
                      </span>
                    )) || <span className="text-slate-500 italic">No especificado</span>}
                  </dd>
                </div>

                {party.stances && Object.keys(party.stances).length > 0 && (
                  <div className="pt-2">
                    <dt className="text-slate-500 mb-2">Posturas Clave</dt>
                    <dd className="space-y-2">
                      {Object.entries(party.stances).map(([topic, stance]) => (
                        <div key={topic} className="group">
                          <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{topic}</span>
                          <span className="text-slate-300 leading-snug block group-hover:text-white transition-colors">{stance}</span>
                        </div>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Sources */}
            {candidate?.sources && candidate.sources.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-slate-500" />
                  Fuentes
                </h3>
                <ul className="space-y-2">
                  {candidate.sources.map((source, idx) => (
                    <li key={idx}>
                      <a 
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300 hover:underline flex items-start gap-2"
                      >
                        <span className="opacity-50 mt-0.5">•</span>
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
