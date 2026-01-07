"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { name: "Inicio", path: "/" },
  { name: "Candidatos", path: "/candidatos" },
  { name: "Propuestas", path: "/propuestas" },
  { name: "Simulador", path: "/simulador" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Izquierda: Logo */}
        <div className="flex flex-1 items-center justify-start">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            <span className="rounded bg-blue-600 px-2 py-0.5 text-xs text-white">CR</span>
            <span className="text-lg">2026</span>
          </Link>
        </div>

        {/* Centro: Navegación Principal */}
        <div className="hidden md:flex md:items-center md:justify-center md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition-colors ${
                pathname === item.path
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Derecha: Espacio vacío para balance + Botón Móvil */}
        <div className="flex flex-1 items-center justify-end">
          {/* Botón Menú Móvil */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded p-2 text-gray-600 hover:bg-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Abrir menú"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-2 md:hidden dark:border-gray-800 dark:bg-black">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === item.path
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
