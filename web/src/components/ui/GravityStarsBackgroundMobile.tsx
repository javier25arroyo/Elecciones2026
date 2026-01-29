"use client";

import React, { useEffect, useRef } from "react";
import { Particle } from "./Particle";

interface GravityStarsBackgroundMobileProps {
  className?: string;
  count?: number;
  colors?: string[];
}

export const GravityStarsBackgroundMobile: React.FC<GravityStarsBackgroundMobileProps> = ({
  className,
  count = 150,
  colors = [
    "rgba(0, 43, 127, 1)",
    "rgba(255, 255, 255, 1)",
    "rgba(206, 17, 38, 1)",
  ],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const mouse = {
      x: -9999,
      y: -9999,
    };

    const init = () => {
      particles = [];
      const width = canvas.width;
      const height = canvas.height;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(width, height, colors));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(mouse, canvas.width, canvas.height);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const cssWidth = window.innerWidth;
      const cssHeight = window.innerHeight;
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      if (t) {
        mouse.x = t.clientX - rect.left;
        mouse.y = t.clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove as EventListener);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, colors]);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} />;
};
