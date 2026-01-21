/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          default: 'var(--color-canvas-default)',
          subtle: 'var(--color-canvas-subtle)',
          overlay: 'var(--color-canvas-overlay)',
        },
        fg: {
          default: 'var(--color-fg-default)',
          muted: 'var(--color-fg-muted)',
          subtle: 'var(--color-fg-subtle)',
          accent: 'var(--color-fg-accent)',
        },
        border: {
          default: 'var(--color-border-default)',
          muted: 'var(--color-border-muted)',
        },
        neutral: {
          emphasis: 'var(--color-neutral-emphasis)',
        },
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}
