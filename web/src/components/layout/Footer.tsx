"use client";
import Link from "next/link";
import {
  Heart,
  Flag,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";

const footerLinks = {
  recursos: [
    { href: "#candidatos", label: "Candidatos" },
    { href: "#timeline", label: "Cronograma Electoral" },
    { href: "#educacion", label: "Cómo Votar" },
    { href: "#quiz", label: "Quiz de Afinidad" },
  ],
  legal: [
    { href: "https://www.tse.go.cr", label: "TSE Costa Rica", external: true },
    { href: "/privacidad", label: "Privacidad" },
    { href: "/terminos", label: "Términos" },
  ],
};

const SocialLink = ({ href, icon, text, hoverColor, hoverBgColor }: { href: string, icon: React.ReactNode, text: string, hoverColor: string, hoverBgColor: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white/75 transition-colors duration-200 ${hoverColor} ${hoverBgColor}`}
  >
    {icon}
    {text}
  </a>
);

export function Footer() {
  return (
    <footer className="mt-24 bg-slate-900 border-t border-white/5 text-white">
      <div className="container mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo y descripción */}
          <div className="md:col-span-2 space-y-8">
            <Link href="/" className="inline-flex items-center gap-3 text-white transition-opacity hover:opacity-80">
              <div className="p-2 bg-white/10 rounded-lg ring-1 ring-white/20">
                <Flag className="h-6 w-6" />
              </div>
              <span className="text-3xl font-black font-display tracking-tighter uppercase">Elecciones <span className="text-blue-400">2026</span></span>
            </Link>
            <p className="max-w-md text-lg leading-relaxed text-white/70">
              Plataforma educativa e interactiva diseñada para fortalecer la democracia costarricense. 
              Información clara, accesible y neutral para un electorado más informado.
            </p>
            <div className="flex items-center gap-4 text-sm font-bold text-white/50 uppercase tracking-widest">
              <span className="h-px w-8 bg-white/20" />
              1 de febrero de 2026
            </div>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white">
              Recursos
            </h4>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white">
              Enlaces
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                    {link.external && " ↗"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider y créditos */}
        <div className="mt-12 border-t border-white/10 pt-8 lg:mt-16">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="m-0 text-sm text-white/50">
              © 2026 Info Politic CR. Proyecto educativo sin fines de lucro.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <SocialLink 
                href="https://github.com/javier25arroyo"
                icon={<Github className="h-5 w-5" />}
                text="GitHub"
                hoverColor="hover:text-white"
                hoverBgColor="hover:bg-white/10"
              />
               <SocialLink 
                href="https://www.linkedin.com/in/javier-arroyo-dev"
                icon={<Linkedin className="h-5 w-5" />}
                text="LinkedIn"
                hoverColor="hover:text-[#00A0DF]"
                hoverBgColor="hover:bg-[#0077B5]/20"
              />
               <SocialLink 
                href="https://instagram.com/javier_arroyo25"
                icon={<Instagram className="h-5 w-5" />}
                text="Instagram"
                hoverColor="hover:text-[#E91E63]"
                hoverBgColor="hover:bg-[#E41B7F]/20"
              />
            </div>

            <p className="m-0 inline-flex items-center gap-1.5 text-sm text-white/50">
              Hecho con <Heart className="h-4 w-4 text-red-500" /> para Costa Rica
              <Flag className="h-4 w-4" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
