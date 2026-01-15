"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-slate-200 border-t-primary",
        sizeClasses[size],
        className
      )}
      role="status"
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-skeleton rounded-md bg-[length:200%_100%] bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200",
        className
      )}
      aria-hidden="true"
    />
  );
}

// Skeleton para tarjeta de candidato
export function CandidateCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-white p-6">
      <div className="flex flex-col items-center text-center">
        <Skeleton className="h-32 w-32 rounded-full" />
        <Skeleton className="mt-6 h-6 w-3/5" />
        <Skeleton className="mt-2 h-4 w-2/5" />
        <Skeleton className="mt-4 h-3.5 w-4/5" />
        <Skeleton className="mt-1 h-3.5 w-4/5" />
        <Skeleton className="mt-6 h-10 w-32" />
      </div>
    </div>
  );
}

// Loading overlay
interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export function LoadingOverlay({ isLoading, children, className = "" }: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/80">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
}
