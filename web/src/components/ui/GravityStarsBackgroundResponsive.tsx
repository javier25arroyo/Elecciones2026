"use client";

import React, { useEffect, useState } from "react";
import { GravityStarsBackground as Desktop } from "./GravityStarsBackground";
import { GravityStarsBackgroundMobile as Mobile } from "./GravityStarsBackgroundMobile";

interface Props {
  className?: string;
  count?: number; // used as desktop count when provided
  mobileCount?: number; // optional override for mobile; if undefined mobile component uses its own default
  colors?: string[];
}

export const GravityStarsBackground: React.FC<Props> = ({ count, mobileCount, ...rest }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    handle(mq);
    if (mq.addEventListener) mq.addEventListener("change", handle);
    else mq.addListener(handle as any);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handle);
      else mq.removeListener(handle as any);
    };
  }, []);

  if (isMobile) {
    // Only pass mobileCount if provided, otherwise let Mobile use its default (150)
    return typeof mobileCount === "number" ? (
      <Mobile count={mobileCount} {...(rest as any)} />
    ) : (
      <Mobile {...(rest as any)} />
    );
  }

  // Desktop: if count provided, forward it; otherwise default to 70 (recommended)
  const desktopCount = typeof count === "number" ? count : 70;
  return <Desktop count={desktopCount} {...(rest as any)} />;
};
