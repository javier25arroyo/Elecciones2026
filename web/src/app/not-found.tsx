import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-slate-900 px-4 text-center">
      <div className="mb-8 rounded-full bg-white/5 p-6 ring-1 ring-white/10">
        <span className="font-display text-6xl font-black text-white/20">404</span>
      </div>
      
      <h1 className="mb-4 font-display text-4xl font-bold text-white sm:text-5xl">
        Página no encontrada
      </h1>
      
      <p className="mb-8 max-w-md text-lg text-slate-400">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <LinkButton href="/">
          Volver al Inicio
        </LinkButton>
        <LinkButton href="/candidatos" variant="secondary" className="border-white/20 text-white hover:bg-white/5">
          Ver Candidatos
        </LinkButton>
      </div>
    </div>
  );
}
