"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "outline"
  | "success"
  | "error";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const base =
  "inline-block py-1.5 px-3 text-xs font-semibold tracking-wide rounded-full transition-transform duration-150 ease-in-out hover:scale-105";

const variants: Record<BadgeVariant, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  accent: "bg-accent text-white",
  neutral: "bg-background-secondary text-text-secondary",
  outline: "bg-transparent border border-current",
  success: "bg-success text-white",
  error: "bg-error text-white",
};

export function Badge({
  variant = "primary",
  children,
  className = "",
}: BadgeProps) {
  return <span className={cn(base, variants[variant], className)}>{children}</span>;
}