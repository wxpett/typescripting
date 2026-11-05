/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#030712',
          black: '#040711',
          darker: '#070d1e',
          dark: '#0c142b',
          card: '#0f172a',
          border: '#1e293b',
          muted: '#475569',
        },
        neon: {
          green: '#00ff88',
          'green-glow': '#00ffaa40',
          cyan: '#00f0ff',
          'cyan-glow': '#00f0ff40',
          red: '#ff3366',
          'red-glow': '#ff336640',
          amber: '#fbbf24',
          purple: '#b026ff',
        },
        jarvis: {
          blue: '#0284c7',
          cyan: '#06b6d4',
          sky: '#38bdf8',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -2px rgba(0, 240, 255, 0.45), 0 0 8px 0px rgba(0, 240, 255, 0.3)',
        'glow-green': '0 0 20px -2px rgba(0, 255, 136, 0.45), 0 0 8px 0px rgba(0, 255, 136, 0.3)',
        'glow-red': '0 0 20px -2px rgba(255, 51, 102, 0.45), 0 0 8px 0px rgba(255, 51, 102, 0.3)',
        'inner-cyber': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(0, 240, 255, 0.05)',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'caret-blink': 'blink 1s step-start infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
