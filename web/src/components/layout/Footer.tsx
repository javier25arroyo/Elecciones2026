import Link from "next/link";
import {
  FavoriteRounded as FavoriteIcon,
  FlagRounded as FlagRoundedIcon,
} from "@mui/icons-material";

const footerLinks = {
  recursos: [
    { href: "#candidatos", label: "Candidatos" },
    { href: "#timeline", label: "Cronograma Electoral" },
    { href: "#educacion", label: "Cómo Votar" },
    { href: "#quiz", label: "Quiz de Afinidad" },
  ],
  legal: [
    { href: "https://www.tse.go.cr", label: "TSE Costa Rica", external: true },
    { href: "/privacidad", label: "Privacidad" },
    { href: "/terminos", label: "Términos" },
  ],
};

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-background-dark)",
        color: "white",
        marginTop: "var(--spacing-3xl)",
      }}
    >
      <div className="container py-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-xl">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--spacing-sm)",
                textDecoration: "none",
                color: "white",
              }}
            >
              <FlagRoundedIcon sx={{ fontSize: "1.5rem" }} aria-hidden="true" />
              <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>Elecciones 2026</span>
            </Link>
            <p
              className="mt-md"
              style={{ color: "rgba(255, 255, 255, 0.7)", maxWidth: 400 }}
            >
              Plataforma educativa e interactiva sobre las elecciones
              presidenciales de Costa Rica 2026. Información clara, sin sesgos,
              para todos los votantes.
            </p>
            <p
              className="mt-lg"
              style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.875rem" }}
            >
              Fecha de elección: <strong>1 de febrero de 2026</strong>
            </p>
          </div>

          {/* Recursos */}
          <div>
            <h4
              style={{
                color: "white",
                marginBottom: "var(--spacing-md)",
                fontSize: "1rem",
              }}
            >
              Recursos
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {footerLinks.recursos.map((link) => (
                <li key={link.href} style={{ marginBottom: "var(--spacing-sm)" }}>
                  <a
                    href={link.href}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              style={{
                color: "white",
                marginBottom: "var(--spacing-md)",
                fontSize: "1rem",
              }}
            >
              Enlaces
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {footerLinks.legal.map((link) => (
                <li key={link.href} style={{ marginBottom: "var(--spacing-sm)" }}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="footer-link"
                  >
                    {link.label}
                    {link.external && " ↗"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            marginTop: "var(--spacing-2xl)",
            paddingTop: "var(--spacing-lg)",
          }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-md">
            <p
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "0.875rem",
                margin: 0,
              }}
            >
              © 2026 Info Politic CR. Proyecto educativo sin fines de lucro.
            </p>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "0.875rem",
                margin: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Hecho con <FavoriteIcon sx={{ color: "#E63946", fontSize: "1rem" }} aria-hidden="true" /> para Costa Rica
              <FlagRoundedIcon sx={{ fontSize: "1rem" }} aria-hidden="true" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
