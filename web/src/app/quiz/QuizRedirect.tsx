"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// output: "export" (GitHub Pages) no soporta redirects de servidor, así que
// el bounce se hace en el cliente. router.replace respeta basePath/assetPrefix.
export function QuizRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#quiz");
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
      <p className="text-lg text-slate-600">
        Redirigiendo al quiz…{" "}
        <Link href="/#quiz" className="font-semibold text-blue-600 underline">
          Ir ahora
        </Link>
      </p>
    </div>
  );
}
