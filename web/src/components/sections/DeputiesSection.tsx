"use client";

import * as React from "react";
import { Accordion } from "@/components/ui/Accordion";
import { AvatarGroup } from "@/components/ui/AvatarGroup";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";

interface DeputiesSectionProps {
  data: {
    [province: string]: string[];
  };
  partyName: string;
}

export function DeputiesSection({ data, partyName }: DeputiesSectionProps) {
  const provinces = Object.keys(data);

  if (provinces.length === 0) return null;

  const accordionItems = provinces.map((province) => {
    const candidates = data[province].map((name) => ({ name }));
    
    return {
      id: province,
      title: `${province} (${candidates.length})`,
      content: (
        <div className="space-y-6 pt-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <AvatarGroup 
              items={candidates} 
              limit={8} 
              size="lg" 
              className="justify-start"
            />
            <Badge variant="outline" className="w-fit">
              {candidates.length} Candidatos
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {candidates.map((candidate, idx) => (
              <motion.div
                key={candidate.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 p-3 hover:bg-white/10"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-300">
                  {idx + 1}
                </div>
                <span className="text-sm font-medium text-slate-200 capitalize">
                  {candidate.name.toLowerCase()}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    };
  });

  return (
    <section className="mt-12 space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <h2 className="text-2xl font-black text-white text-center">
          Candidatos a Diputados
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="mx-auto max-w-4xl">
        <Accordion items={accordionItems} allowMultiple />
      </div>
    </section>
  );
}
