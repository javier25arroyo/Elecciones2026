"use client";
import type { Party } from "@/lib/content";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface PoliticalCompassProps {
  parties: Party[];
  userVector: { econ: number; social: number; env: number };
  results: { party: Party; percentage: number }[];
}

const AXIS_LABELS = {
  econ: { min: "Estatismo", max: "Liberalismo" },
  social: { min: "Progresismo", max: "Conservadurismo" },
};

export function PoliticalCompass({ parties, userVector, results }: PoliticalCompassProps) {
  const [activeParty, setActiveParty] = React.useState<Party | null>(null);

  const scale = (val: number) => val * 10;
  const userPos = { x: scale(userVector.econ), y: scale(userVector.social) };

  const partyPositions = parties.map((p) => ({
    party: p,
    pos: { x: scale(guessPartyVector(p).econ), y: scale(guessPartyVector(p).social) },
    envScore: guessPartyVector(p).env,
  }));

  const getPartyResult = (party: Party) => results.find((r) => r.party.id === party.id);

  return (
    <div className="relative mx-auto w-full max-w-[500px] aspect-square">
      <svg viewBox="-14 -14 28 28" className="h-full w-full overflow-visible font-sans">
        {/* Grid lines */}
        <line x1="-10" y1="0" x2="10" y2="0" className="stroke-white/20" strokeWidth="0.2" />
        <line x1="0" y1="-10" x2="0" y2="10" className="stroke-white/20" strokeWidth="0.2" />

        {/* Axis Labels */}
        <text x="11" y="0.4" className="fill-white/70 text-[1.8px]" textAnchor="start">{AXIS_LABELS.econ.max}</text>
        <text x="-11" y="0.4" className="fill-white/70 text-[1.8px]" textAnchor="end">{AXIS_LABELS.econ.min}</text>
        <text x="0" y="-11.2" className="fill-white/70 text-[1.8px]" textAnchor="middle">{AXIS_LABELS.social.min}</text>
        <text x="0" y="11.8" className="fill-white/70 text-[1.8px]" textAnchor="middle">{AXIS_LABELS.social.max}</text>

        {/* Party Points */}
        {partyPositions.map(({ party, pos, envScore }) => (
          <g
            key={party.id}
            transform={`translate(${pos.x}, ${pos.y})`}
            onMouseEnter={() => setActiveParty(party)}
            onMouseLeave={() => setActiveParty(null)}
            className="cursor-pointer transition-transform duration-200"
          >
            <circle
              r={activeParty?.id === party.id ? 1.5 : 1}
              fill={party.accent_color || "white"}
              className="stroke-black/50 transition-all duration-200"
              strokeWidth="0.2"
            />
            {envScore > 0.1 && (
              <circle
                r={1 + envScore * 1.5}
                fill="none"
                stroke={party.accent_color || "white"}
                className="stroke-opacity-70"
                strokeWidth="0.3"
              />
            )}
          </g>
        ))}

        {/* User Point */}
        <g transform={`translate(${userPos.x}, ${userPos.y})`}>
          <circle r="1.2" className="fill-accent" />
          <text y="-2" className="fill-white text-[1.5px] font-bold" textAnchor="middle">Vos</text>
        </g>
        
        {/* Active Party Tooltip */}
        <AnimatePresence>
          {activeParty && (
            <motion.g
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transform={`translate(${partyPositions.find(p => p.party.id === activeParty.id)?.pos.x || 0}, ${partyPositions.find(p => p.party.id === activeParty.id)?.pos.y || 0})`}
            >
              <rect x="-12" y="-8" width="24" height="5" rx="1" className="fill-black/80" />
              <text x="0" y="-5" className="fill-white text-[1.4px] font-bold" textAnchor="middle">
                {activeParty.name} ({getPartyResult(activeParty)?.percentage}%)
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}

// This function needs to be kept in sync with the parent component
function guessPartyVector(party: Party): { econ: number; social: number; env: number } {
  const ideology = (party.ideology || "").toLowerCase();
  const values = (party.values || []).join(" ").toLowerCase();
  let econ = 0, social = 0, env = 0;

  if (/(socialismo|trotsk|marx)/.test(ideology)) econ -= 1;
  if (/(social\s*democr|socialdemocr)/.test(ideology)) econ -= 0.6;
  if (/(liberal|libre\s*mercado)/.test(ideology)) econ += 0.8;
  if (/(conserv|cristian|religios)/.test(ideology)) social += 0.85;
  if (/(progresist|izquierd)/.test(ideology)) social -= 0.7;
  if (/(centro)/.test(ideology)) { econ *= 0.75; social *= 0.75; }
  if (/(ecolog|ambient|descarbon|biodivers|clim)/.test(ideology + " " + values)) env += 0.8;

  return {
    econ: Math.max(-1, Math.min(1, econ)),
    social: Math.max(-1, Math.min(1, social)),
    env: Math.max(-1, Math.min(1, env)),
  };
}
