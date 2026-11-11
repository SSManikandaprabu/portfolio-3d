/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#040611",
        navy: "#090d20",
        neonPurple: "#a855f7",
        electricBlue: "#3b82f6",
        cyberCyan: "#06b6d4",
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
      },
      boxShadow: {
        neon: "0 0 30px rgba(6, 182, 212, 0.22), 0 0 60px rgba(168, 85, 247, 0.14)",
      },
    },
  },
  plugins: [],
};
