"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Opcional: registrar el error en un servicio de reporte
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-slate-900 px-4 text-center">
      <div className="mb-8 rounded-full bg-red-500/10 p-6 ring-1 ring-red-500/20">
        <svg
          className="h-12 w-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h1 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl">
        Algo salió mal
      </h1>

      <p className="mb-8 max-w-md text-slate-400">
        Ha ocurrido un error inesperado. Por favor, intentá recargar la página.
      </p>

      <Button onClick={reset} variant="primary">
        Intentar de nuevo
      </Button>
    </div>
  );
}
