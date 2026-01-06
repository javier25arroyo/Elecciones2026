"use client";

import * as React from "react";

type BadgeVariant = "primary" | "secondary" | "accent" | "neutral" | "outline" | "success" | "error";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "badge-primary",
  secondary: "badge-secondary",
  accent: "badge-accent",
  neutral: "badge-neutral",
  outline: "badge-outline",
  success: "badge-secondary", // Using secondary (green)
  error: "badge-accent", // Custom styling below
};

export function Badge({ variant = "primary", children, className = "", style }: BadgeProps) {
  const customStyle: React.CSSProperties = {
    ...(variant === "error" ? { background: "var(--color-error)" } : {}),
    ...style,
  };

  return (
    <span 
      className={`badge ${variantClasses[variant]} ${className}`}
      style={Object.keys(customStyle).length > 0 ? customStyle : undefined}
    >
      {children}
    </span>
  );
}
