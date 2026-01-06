"use client";

import * as React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: 20,
  md: 40,
  lg: 60,
};

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  const pixelSize = sizeMap[size];

  return (
    <div
      className={`spinner ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
      role="status"
      aria-label="Cargando"
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({
  width = "100%",
  height = 20,
  className = "",
  variant = "rectangular",
}: SkeletonProps) {
  const borderRadius =
    variant === "circular"
      ? "50%"
      : variant === "text"
      ? "var(--radius-sm)"
      : "var(--radius-md)";

  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
      aria-hidden="true"
    />
  );
}

// Skeleton para tarjeta de candidato
export function CandidateCardSkeleton() {
  return (
    <div className="card">
      <div className="flex flex-col items-center text-center">
        <Skeleton variant="circular" width={120} height={120} />
        <Skeleton width="60%" height={24} className="mt-lg" />
        <Skeleton width="40%" height={16} className="mt-sm" />
        <Skeleton width="80%" height={14} className="mt-md" />
        <Skeleton width="80%" height={14} className="mt-xs" />
        <Skeleton width={120} height={40} className="mt-lg" />
      </div>
    </div>
  );
}

// Loading overlay
interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export function LoadingOverlay({ isLoading, children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
}
