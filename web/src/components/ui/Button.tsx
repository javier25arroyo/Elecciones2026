"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold leading-none no-underline transition-all duration-200 ease-smooth relative overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-cta text-white shadow-button hover:-translate-y-0.5 hover:scale-105 hover:shadow-glow-red active:translate-y-0 active:scale-95 active:shadow-sm",
  secondary:
    "bg-transparent text-primary border-2 border-primary hover:bg-primary/5 active:bg-primary/10",
  ghost: "bg-transparent text-primary hover:bg-primary/5 p-2",
};

const sizes: Record<ButtonSize, string> = {
  md: "py-3 px-8",
  sm: "py-2 px-4 text-sm",
  lg: "py-4 px-10 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
          {children}
          {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}

// Link Button para navegación
interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export function LinkButton({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}