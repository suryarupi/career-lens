/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          50: '#eff6ff',
          400: '#60a5fa',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },

        // App backgrounds & surfaces
        background: '#0b1220',     // main app bg
        surface: '#0f172a',        // cards / panels
        surfaceSoft: '#111827',    // inner sections

        // Borders & dividers
        border: '#1f2937',

        // Text colors
        text: {
          primary: '#e5e7eb',
          secondary: '#9ca3af',
          muted: '#6b7280',
        },

        // Accents (AI feel)
        accent: {
          cyan: '#22d3ee',
          teal: '#2dd4bf',
        },
      },

      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },

      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,0.35)',
        soft: '0 4px 12px rgba(0,0,0,0.25)',
        glow: '0 0 0 1px rgba(37,99,235,0.4)',
      },

      backdropBlur: {
        glass: '12px',
      },
    },
  },
  plugins: [],
}
    