<div align="center">

# 🇨🇷 Info Politic 2026

### Guía interactiva para las elecciones presidenciales de Costa Rica

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

[Ver Demo](#) • [Reportar Bug](../../issues) • [Solicitar Feature](../../issues)

</div>

---

## ✨ Características

<table>
<tr>
<td width="50%">

### 🗳️ Exploración de Candidatos
Perfiles completos de 19 partidos políticos con:
- Ideología y valores
- Posturas en educación, economía y ambiente
- Fórmula presidencial completa

</td>
<td width="50%">

### 🎯 Quiz Interactivo
Descubre tu afinidad política:
- 8 preguntas rápidas
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
Lenguaje:     TypeScript
Gestión:      pnpm
Estilos:      CSS personalizado + MUI Icons
Deploy:       GitHub Pages (Export estático)
```

---

## 💻 Instalación y Uso
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

