import type { Metadata } from "next";
import Link from "next/link";
import { SEO_CONFIG } from "@/lib/seo.config";
import { getContent } from "@/lib/content";

const title = "Resultados Elecciones Costa Rica 2026 | Laura Fernández, presidenta";
const url = `${SEO_CONFIG.siteUrl}/resultados/`;

export const metadata: Metadata = {
  title,
  description: SEO_CONFIG.descriptions.results,
  keywords: SEO_CONFIG.pageKeywords["/resultados"],
  openGraph: {
    title,
    description: SEO_CONFIG.descriptions.results,
    url,
    images: [
      {
        url: SEO_CONFIG.socialImage.url,
        width: parseInt(SEO_CONFIG.socialImage.width),
        height: parseInt(SEO_CONFIG.socialImage.height),
        alt: SEO_CONFIG.socialImage.alt,
      },
    ],
  },
  alternates: { canonical: url },
};

const int = new Intl.NumberFormat("es-CR");
const pct = new Intl.NumberFormat("es-CR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const longDate = new Intl.DateTimeFormat("es-CR", { dateStyle: "long", timeZone: "UTC" });

export default async function ResultadosPage() {
  const { parties, results, elected_president: president } = await getContent();
  if (!results || !president) throw new Error("content.json: faltan `results` o `elected_president`");

  // Falla el build si un nombre de `results.parties` no coincide con `parties`.
  const rows = results.parties.map((r) => {
    const party = parties.find((p) => p.name === r.party);
    if (!party) throw new Error(`content.json: "${r.party}" de results no existe en parties`);
    return { ...r, party };
  });
  const top = rows[0];

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-20 text-white">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="font-display text-4xl font-black sm:text-5xl">
          Resultados Elecciones Costa Rica 2026
        </h1>
        <p className="mt-4 text-lg text-white/80">
          <strong className="text-white">{president.name}</strong>, del {top.party.name}, ganó
          la presidencia en primera ronda con {pct.format(top.pct)} % de los votos válidos, superando el 40 %
          requerido, y asumió como presidenta 2026-2030 el{" "}
          {longDate.format(new Date(president.inauguration))}.
        </p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <dt className="text-sm text-white/60">Participación</dt>
            <dd className="text-3xl font-black">{pct.format(results.participation_pct)} %</dd>
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <dt className="text-sm text-white/60">Votos válidos</dt>
            <dd className="text-3xl font-black">{int.format(results.valid_votes)}</dd>
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <dt className="text-sm text-white/60">Juntas procesadas</dt>
            <dd className="text-3xl font-black">{pct.format(results.juntas_processed_pct)} %</dd>
          </div>
        </dl>

        <h2 className="mt-12 font-display text-2xl font-bold">Votos por partido (elección presidencial)</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl ring-1 ring-white/10">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Votos y porcentaje por partido en la elección presidencial de Costa Rica, 1 de febrero de 2026
            </caption>
            <thead className="bg-white/10 text-white/70">
              <tr>
                <th scope="col" className="px-4 py-3">#</th>
                <th scope="col" className="px-4 py-3">Candidatura</th>
                <th scope="col" className="px-4 py-3 text-right">Votos</th>
                <th scope="col" className="px-4 py-3 text-right">%</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.party.name} className="border-t border-white/10">
                  <td className="px-4 py-3 text-white/60">{i + 1}</td>
                  <td className="px-4 py-3">
                    <Link href={`/candidatos/${r.party.id}/`} className="font-semibold hover:underline">
                      {r.party.presidential_candidate?.name ?? r.party.name}
                    </Link>
                    <div className="text-xs text-white/60">{r.party.name}</div>
                    <div
                      className="mt-2 h-1.5 rounded-full"
                      style={{
                        width: `${(r.pct / top.pct) * 100}%`,
                        backgroundColor: r.party.accent_color ?? "#60a5fa",
                      }}
                      aria-hidden="true"
                    />
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{int.format(r.votes)}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">{pct.format(r.pct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-white/60">
          Fuente:{" "}
          <a href={results.source_url} className="underline" rel="noopener noreferrer">
            {results.source}
          </a>{" "}
          ({longDate.format(new Date(results.cut_date))}, {pct.format(results.juntas_processed_pct)} % de las
          juntas). Cifras provisionales; el resultado oficial lo declara el TSE. Porcentajes sobre votos válidos.
          Proyecto educativo independiente, sin vínculo con el TSE ni con partidos.
        </p>

        <p className="mt-8">
          <Link href="/candidatos/" className="font-semibold text-blue-300 underline">
            Conocé a los 20 candidatos y sus propuestas →
          </Link>
        </p>
      </div>
    </div>
  );
}
