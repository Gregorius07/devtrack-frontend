/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: {
          base: "#000000",
          card: "#0c0c0e",
          muted: "#171717",
          elevated: "#1f1f23",
          hover: "#26262b",
        },
        border: {
          default: "#333333",
          subtle: "#222222",
          hover: "#4f4f56",
        },
        brand: {
          accent: "#38bdf8",
          purple: "#a855f7",
          emerald: "#10b981",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "Consolas", "monospace"],
      },
      transitionDuration: {
        instant: "150ms",
      },
    },
  },
  plugins: [],
}
