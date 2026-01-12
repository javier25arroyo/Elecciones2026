"use client";
import type { Party } from "@/lib/content";
import * as React from "react";

interface PoliticalCompassProps {
  parties: Party[];
  userVector: { econ: number; social: number; env: number };
  results: { party: Party; percentage: number }[];
}

const AXIS_LABELS = {
  econ: { min: "Estatismo", max: "Liberalismo" },
  social: { min: "Progresismo", max: "Conservadurismo" },
};

export function PoliticalCompass({
  parties,
  userVector,
  results,
}: PoliticalCompassProps) {
  const [activeParty, setActiveParty] = React.useState<Party | null>(null);

  // Normalize vectors to a -10 to 10 scale for plotting
  const scale = (val: number) => val * 10;
  const userPos = { x: scale(userVector.econ), y: scale(userVector.social) };

  const partyPositions = parties.map((p) => {
    // This logic MUST match the `guessPartyVector` in the parent component
    const partyVector = guessPartyVector(p);
    return {
      party: p,
      pos: { x: scale(partyVector.econ), y: scale(partyVector.social) },
      envScore: partyVector.env,
    };
  });

  const getPartyResult = (party: Party) =>
    results.find((r) => r.party.id === party.id);

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        maxWidth: "500px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <svg
        viewBox="-12 -12 24 24"
        style={{
          width: "100%",
          height: "100%",
          overflow: "visible",
          fontFamily: "var(--font-sans)",
        }}
      >
        {/* Grid lines */}
        <line
          x1="-10"
          y1="0"
          x2="10"
          y2="0"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.2"
        />
        <line
          x1="0"
          y1="-10"
          x2="0"
          y2="10"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.2"
        />

        {/* Axis Labels */}
        <text
          x="11"
          y="0.4"
          fill="rgba(255, 255, 255, 0.7)"
          fontSize="1.8"
          textAnchor="start"
        >
          {AXIS_LABELS.econ.max}
        </text>
        <text
          x="-11"
          y="0.4"
          fill="rgba(255, 255, 255, 0.7)"
          fontSize="1.8"
          textAnchor="end"
        >
          {AXIS_LABELS.econ.min}
        </text>
        <text
          x="0"
          y="-10.5"
          fill="rgba(255, 255, 255, 0.7)"
          fontSize="1.8"
          textAnchor="middle"
        >
          {AXIS_LABELS.social.min}
        </text>
        <text
          x="0"
          y="11.5"
          fill="rgba(255, 255, 255, 0.7)"
          fontSize="1.8"
          textAnchor="middle"
        >
          {AXIS_LABELS.social.max}
        </text>

        {/* Party Points */}
        {partyPositions.map(({ party, pos, envScore }, index) => (
          <g
            key={party.id || party.name || index}
            transform={`translate(${pos.x}, ${pos.y})`}
            onMouseEnter={() => setActiveParty(party)}
            onMouseLeave={() => setActiveParty(null)}
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
          >
            <circle
              r={activeParty?.id === party.id ? 1.5 : 1}
              fill={party.accent_color || "white"}
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="0.2"
              style={{ transition: "all 0.2s" }}
            />
            {/* Eco bubble */}
            {envScore > 0.1 && (
              <circle
                r={1 + envScore * 1.5}
                fill="none"
                stroke={party.accent_color || "white"}
                strokeWidth="0.3"
                strokeOpacity="0.7"
              />
            )}
          </g>
        ))}

        {/* User Point */}
        <g transform={`translate(${userPos.x}, ${userPos.y})`}>
          <circle r="1.2" fill="var(--color-accent)" />
          <text
            y="-2"
            fill="white"
            fontSize="1.5"
            fontWeight="bold"
            textAnchor="middle"
          >
            Vos
          </text>
        </g>

        {/* Active Party Tooltip */}
        {activeParty && (
          <g
            transform={`translate(${
              partyPositions.find((p) => p.party.id === activeParty.id)?.pos
                .x || 0
            }, ${
              partyPositions.find((p) => p.party.id === activeParty.id)?.pos
                .y || 0
            })`}
          >
            <rect
              x="-10"
              y="-7"
              width="20"
              height="5"
              fill="rgba(0,0,0,0.8)"
              rx="1"
            />
            <text
              x="0"
              y="-4"
              fill="white"
              fontSize="1.5"
              textAnchor="middle"
              fontWeight="bold"
            >
              {activeParty.name} ({getPartyResult(activeParty)?.percentage}%)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

// This function needs to be kept in sync with the parent component
function guessPartyVector(
  party: Party
): { econ: number; social: number; env: number } {
  const ideology = (party.ideology || "").toLowerCase();
  const values = (party.values || []).join(" ").toLowerCase();

  let econ = 0;
  let social = 0;
  let env = 0;

  if (/(socialismo|trotsk|marx)/.test(ideology)) econ -= 1;
  if (/(social\s*democr|socialdemocr)/.test(ideology)) econ -= 0.6;
  if (/(liberal|libre\s*mercado)/.test(ideology)) econ += 0.8;

  if (/(conserv|cristian|religios)/.test(ideology)) social += 0.85;
  if (/(progresist|izquierd)/.test(ideology)) social -= 0.7;
  if (/(centro)/.test(ideology)) {
    econ *= 0.75;
    social *= 0.75;
  }

  if (
    /(ecolog|ambient|descarbon|biodivers|clim)/.test(ideology + " " + values)
  ) {
    env += 0.8;
  }

  return {
    econ: Math.max(-1, Math.min(1, econ)),
    social: Math.max(-1, Math.min(1, social)),
    env: Math.max(-1, Math.min(1, env)),
  };
}
