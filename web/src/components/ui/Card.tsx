"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
  accentColor?: string;
  onClick?: () => void;
}

export function Card({
  children,
  className = "",
  accent = false,
  accentColor,
  onClick,
}: CardProps) {
  const accentClasses = accent ? "border-l-4 border-l-primary" : "";
  const customStyle = accentColor ? { borderLeftColor: accentColor } : undefined;

  return (
    <div
      className={cn(
        "bg-white/70 backdrop-blur-xl border border-white/30 rounded-xl p-6 shadow-md transition-all duration-300 ease-in-out",
        "hover:shadow-xl hover:-translate-y-[6px] hover:border-primary/20",
        accentClasses,
        onClick && "cursor-pointer",
        className
      )}
      style={customStyle}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CardImage({ src, alt, className = "" }: CardImageProps) {
  return (
    <div className={cn("relative h-48 w-full", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={cn("mt-6 pt-4 border-t border-border", className)}>
      {children}
    </div>
  );
}
