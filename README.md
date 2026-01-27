<div align="center">

# 🇨🇷 Info Politic 2026

### Guía interactiva para las elecciones presidenciales de Costa Rica

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

<br />

<a href="#-descripción"><img alt="Documento" src="https://img.shields.io/badge/Ver%20proyecto-1E88E5?style=for-the-badge&logo=readthedocs&logoColor=white" /></a>
<a href="../../issues"><img alt="Issues" src="https://img.shields.io/badge/Reportar%20Bug-FF5252?style=for-the-badge&logo=bugsnag&logoColor=white" /></a>
<a href="../../issues"><img alt="Feature" src="https://img.shields.io/badge/Solicitar%20Feature-6D4CFF?style=for-the-badge&logo=githubsponsors&logoColor=white" /></a>

</div>

---

## 🧭 Tabla de contenidos

- [📖 Descripción](#-descripción)
- [✨ Características](#-características)
- [🚀 Tech Stack](#-tech-stack)
- [💻 Instalación y Uso](#-instalación-y-uso)
- [🌐 Deploy en GitHub Pages](#-deploy-en-github-pages)
- [🤝 Contribuir](#-contribuir)
- [📝 Roadmap](#-roadmap)
- [📄 Licencia](#-licencia)

- [🔧 Estructura del proyecto](#-estructura-del-proyecto)

---

## 📖 Descripción

**Info Politic 2026** es una guía cívica digital enfocada en las elecciones presidenciales de Costa Rica 2026. Su objetivo es reunir en un solo lugar información clara y verificable para que cualquier persona pueda comprender el panorama político y participar con criterio.

La plataforma permite **explorar perfiles de partidos y candidaturas**, conocer sus posturas en temas clave, y comparar visiones de país. Además, incluye **quizzes interactivos** que ayudan a identificar afinidades políticas, junto con un **resumen práctico del proceso electoral** (requisitos para votar, fechas importantes y pasos para emitir el voto).

El proyecto prioriza **transparencia, accesibilidad y experiencia de usuario**, con una interfaz moderna y responsiva que funciona bien en móviles y escritorio. Está pensado como un recurso educativo, neutral y fácil de navegar para impulsar una participación informada.

---

## 🔧 Estructura del proyecto

Este repositorio contiene la aplicación web y recursos relacionados. A continuación se muestra la estructura principal y archivos relevantes para contribuir:

- `web/` — Código fuente del frontend (Next.js App Router, TypeScript).
   - `app/` — Rutas y páginas de la aplicación Next.js.
   - `components/` — Componentes UI reutilizables.
   - `lib/` — Utilidades, SEO y helpers.
   - `public/` — Archivos estáticos y assets (banderas, planes, etc.).
   - `.github/` — Workflows y plantillas (en la exportación local pueden aparecer en `web/.github`).

- Archivos de gobernanza y contribución (en `web`):
   - [web/CODE_OF_CONDUCT.md](web/CODE_OF_CONDUCT.md) — Código de conducta del proyecto.
   - [web/CONTRIBUTING.md](web/CONTRIBUTING.md) — Guía para contribuir (flujo de trabajo, estilo de commits, pruebas).
   - [web/.github/ISSUE_TEMPLATE/bug_report.md](web/.github/ISSUE_TEMPLATE/bug_report.md) — Plantilla para reportar bugs.
   - [web/.github/ISSUE_TEMPLATE/feature_request.md](web/.github/ISSUE_TEMPLATE/feature_request.md) — Plantilla para solicitar características.
   - [web/.github/PULL_REQUEST_TEMPLATE.md](web/.github/PULL_REQUEST_TEMPLATE.md) — Plantilla para pull requests.

Si trabajas localmente, entra a `web/` para instalar dependencias y ejecutar el proyecto (ver sección "Instalación y Uso").


## 🧩 Qué encontrarás

- ✅ Perfiles de partidos y candidaturas con posturas clave
- ✅ Quizzes para conocer afinidad política
- ✅ Calendario y requisitos para votar
- ✅ Diseño accesible y enfoque mobile-first
- ✅ Experiencia rápida y visual

---

## ✨ Características

<table>
<tr>
<td width="50%">

### 🗳️ Exploración de Candidatos
Perfiles completos de 20 partidos políticos con:
- Ideología y valores
- Posturas en educación, economía y ambiente
- Fórmula presidencial completa

</td>
<td width="50%">

### 🎯 Quiz Interactivo
Descubre tu afinidad política:
- 10 preguntas rápidas
- Resultados al instante
- Compartible en redes sociales

</td>
</tr>
<tr>
<td width="50%">

### 📚 Guía Cívica
Todo sobre el proceso electoral:
- Requisitos para votar
- Fechas importantes
- Dónde y cómo votar

</td>
<td width="50%">

### 🎨 Diseño Moderno
Experiencia de usuario premium:
- Animaciones suaves
- Mobile-first responsive
- Scroll reveal effects

</td>
</tr>
</table>

---

## 🚀 Tech Stack

```text
Frontend:     Next.js 16 (App Router) + React 19
Lenguaje:     TypeScript 5
Gestión:      pnpm 10+
Estilos:      Tailwind CSS 4 + Lucide React
Animaciones:  Framer Motion
Deploy:       GitHub Pages (Export estático)
```

---

## 💻 Instalación y Uso

### Prerrequisitos
- Node.js 20+
- pnpm 10+

### 🔧 Setup Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/javier25arroyo/info-politic-2026.git
cd info-politic-2026/web

# 2. Instalar dependencias
pnpm install

# 3. Modo desarrollo
pnpm dev
# ➜ Abrir http://localhost:3000
```

### 📈 Google Analytics (GA4)

El proyecto incluye soporte para Google Analytics 4 vía `NEXT_PUBLIC_GA_ID`.

1. En Google Analytics crea una **Propiedad GA4** y un **Web data stream**.
2. Copia el **Measurement ID** (formato `G-XXXXXXXXXX`).
3. Configúralo como variable de entorno:

```bash
# Windows PowerShell (solo para la sesión)
$env:NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"; pnpm dev

# Alternativa: define NEXT_PUBLIC_GA_ID en tu hosting (Vercel/Netlify/etc.)
```

Notas:
- Reporta pageviews también en navegación client-side.
- Si haces deploy con GitHub Actions, guarda `NEXT_PUBLIC_GA_ID` como **Repository Secret** y pásalo al paso de build.

### 📦 Build y Export

```bash
# Build de producción
pnpm build

# Export estático para GitHub Pages
pnpm export
# ➜ Output en web/out/
```

---

## 🌐 Deploy en GitHub Pages

El proyecto está configurado para deploy automático:

1. **Push a `main`** → Workflow se ejecuta automáticamente
2. **Workflow** (`gh-pages.yml`):
   - Instala dependencias con pnpm
   - Ejecuta build con `NEXT_PUBLIC_BASE_PATH`
   - Genera export estático en `web/out`
   - Despliega en GitHub Pages
3. **URL**: `https://[usuario].github.io/info-politic-2026`

> **Nota**: Asegúrate de habilitar GitHub Pages en Settings → Pages → Source: GitHub Actions

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! 🎉

### Pasos para contribuir:

1. **Fork** el proyecto
2. **Crea** una rama para tu feature
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** tus cambios
   ```bash
   git commit -m '✨ Add: Amazing Feature'
   ```
4. **Push** a tu rama
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Abre** un Pull Request

### 📋 Antes de hacer PR:

```bash
pnpm lint    # Verificar código
pnpm build   # Asegurar que compila
```

---

## 📝 Roadmap

- [ ] Sistema de favoritos para candidatos
- [ ] Comparador directo entre 2 candidatos
- [ ] Integración con datos en tiempo real del TSE
- [ ] Modo oscuro
- [ ] Resultados de elecciones en vivo

---

## 📄 Licencia

Este proyecto es de código abierto bajo licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

<div align="center">

### **Javier Arroyo** 🤟🏻

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/javier-arroyo-dev)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/javier25arroyo)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/javier_arroyo25)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:javier25arojas@gmail.com)

*Si te gusta este proyecto, dale una ⭐ en GitHub*

</div>

---

<div align="center">

**Hecho con ❤️ para Costa Rica 🇨🇷**

</div>

