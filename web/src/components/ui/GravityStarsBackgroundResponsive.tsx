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
    const handle = () => setIsMobile(mq.matches);
    handle();
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  if (isMobile) {
    // Only pass mobileCount if provided, otherwise let Mobile use its default (150)
    return typeof mobileCount === "number" ? (
      <Mobile count={mobileCount} {...rest} />
    ) : (
      <Mobile {...rest} />
    );
  }

  // Desktop: if count provided, forward it; otherwise default to 70 (recommended)
  const desktopCount = typeof count === "number" ? count : 70;
  return <Desktop count={desktopCount} {...rest} />;
};
