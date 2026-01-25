import { Spinner } from "@/components/ui/Loading";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" className="border-blue-500 border-t-transparent" />
        <p className="text-sm font-medium text-slate-400 animate-pulse">
          Cargando contenido...
        </p>
      </div>
    </div>
  );
}
