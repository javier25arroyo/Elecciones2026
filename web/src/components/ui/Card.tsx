"use client";

import * as React from "react";
import Image from "next/image";

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
  const accentStyle = accentColor
    ? { borderLeftColor: accentColor }
    : undefined;

  return (
    <div
      className={`card ${accent ? "card-accent" : ""} ${className}`}
      style={accentStyle}
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
    <div className={`card-image-wrapper ${className}`}>
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
  return <div className={`mb-md ${className}`}>{children}</div>;
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
  return <div className={`mt-lg pt-md ${className}`} style={{ borderTop: "1px solid var(--color-border)" }}>{children}</div>;
}
