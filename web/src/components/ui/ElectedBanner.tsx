import React from "react";

export function ElectedBanner() {
  return (
    <div className="bg-yellow-400/95 text-black border-b border-yellow-600 shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 text-center text-sm sm:text-base font-semibold">
        Presidenta electa: <span className="font-black">Laura Fernández</span> — Partido Pueblo Soberano (PPSO)
      </div>
    </div>
  );
}

export default ElectedBanner;
