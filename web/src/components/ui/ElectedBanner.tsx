import Link from "next/link";

export function ElectedBanner() {
  return (
    <div className="mt-14 bg-yellow-400/95 text-black border-b border-yellow-600 shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 text-center text-sm sm:text-base font-semibold">
        Presidenta de Costa Rica 2026-2030: <span className="font-black">Laura Fernández</span> — Partido Pueblo Soberano (PPSO) ·{" "}
        <Link href="/resultados/" className="underline underline-offset-2 hover:no-underline">
          Ver resultados
        </Link>
      </div>
    </div>
  );
}

export default ElectedBanner;
