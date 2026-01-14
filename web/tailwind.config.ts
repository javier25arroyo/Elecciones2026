import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        "primary-dark": "var(--color-primary-dark)",
        secondary: "var(--color-secondary)",
        "secondary-light": "var(--color-secondary-light)",
        "secondary-dark": "var(--color-secondary-dark)",
        accent: "var(--color-accent)",
        "accent-light": "var(--color-accent-light)",
        "accent-dark": "var(--color-accent-dark)",
        background: "var(--color-background)",
        "background-secondary": "var(--color-background-secondary)",
        "background-dark": "var(--color-background-dark)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        error: "var(--color-error)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        border: "var(--color-border)",
        "border-light": "var(--color-border-light)",
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        display: "var(--font-display)",
      },
      transitionTimingFunction: {
        fast: "var(--transition-fast)",
        normal: "var(--transition-normal)",
        slow: "var(--transition-slow)",
        smooth: "var(--transition-smooth)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        button: "var(--shadow-button)",
        "button-hover": "var(--shadow-button-hover)",
        glow: "var(--shadow-glow)",
        "glow-red": "var(--shadow-glow-red)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "var(--gradient-primary)",
        "gradient-cta": "var(--gradient-cta)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-subtle": "var(--gradient-subtle)",
        "gradient-app": "var(--gradient-app)",
        "gradient-costa-rica": "var(--gradient-costa-rica)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "slide-in-left":
          "slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right":
          "slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shake: "shake 0.4s ease-in-out",
        celebrate: "celebrate 0.5s ease-in-out",
        float: "float 3s ease-in-out infinite",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "page-load-fade":
          "pageLoadFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 3s infinite",
        spin: "spin 0.8s linear infinite",
        skeleton: "skeleton-loading 1.5s infinite",
      },
      keyframes: {
        "skeleton-loading": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-50px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(50px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
        celebrate: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        pageLoadFadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
       zIndex: {
        dropdown: "50",
        sticky: "100",
        modal: "200",
        toast: "300",
      },
    },
  },
  plugins: [],
};
export default config;

