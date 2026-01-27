"use client";

import React, { useEffect } from "react";

export default function ConsoleDemocracyMessage() {
  useEffect(() => {
    const msg1 = "Nuestra democracia como costarricenses está en peligro con el continente";
    const msg2 = "Del mismo modo que no sería un esclavo, tampoco sería un amo. Esto expresa mi idea de la democracia. (Abraham Lincoln)";

    console.log("%c" + msg1, "color:#ef4444;font-weight:bold;font-size:14px");
    console.log("%c" + msg2, "color:#60a5fa;font-style:italic");

    // Optional: if URL includes #diputados, scroll into view
    if (typeof window !== "undefined" && window.location.hash === "#diputados") {
      try {
        const el = document.getElementById("diputados");
        if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  return null;
}
