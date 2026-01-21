"use client";

import React, { useEffect, useRef } from "react";

interface GravityStarsBackgroundProps {
  className?: string;
  count?: number;
  colors?: string[];
}

export const GravityStarsBackground: React.FC<GravityStarsBackgroundProps> = ({
  className,
  count = 300, 
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
    
    let mouse = {
      x: -9999,
      y: -9999,
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseX: number;
      baseY: number;
      density: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 1; // slow float
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.density = (Math.random() * 30) + 1;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
      }

      update(mousePos: { x: number; y: number }, canvasWidth: number, canvasHeight: number) {
        let dx = mousePos.x - this.x;
        let dy = mousePos.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        const maxDistance = 150;
        let force = (maxDistance - distance) / maxDistance;

        if (distance < maxDistance) {
           const speed = 2; 
           this.vx += forceDirectionX * force * speed * 0.05;
           this.vy += forceDirectionY * force * speed * 0.05;
        }

        this.vx *= 0.98;
        this.vy *= 0.98;

        this.x += this.vx + (Math.random() - 0.5) * 0.2;
        this.y += this.vy + (Math.random() - 0.5) * 0.2;

        if (this.x < 0) this.x = canvasWidth;
        if (this.x > canvasWidth) this.x = 0;
        if (this.y < 0) this.y = canvasHeight;
        if (this.y > canvasHeight) this.y = 0;
      }
    }

    const init = () => {
      particles = [];
      const width = canvas.width;
      const height = canvas.height;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(width, height));
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
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
        mouse.x = -9999;
        mouse.y = -9999;
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, colors]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
};
