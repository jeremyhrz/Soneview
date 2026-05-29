/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {

      /* ── Brand Colours ───────────────────────────────── */
      colors: {
        'sv-blue':   '#212844',
        'sv-cream':  '#f0e7d5',
        'sv-accent': '#2997ff',   // Apple-blue for CTAs / links
        'sv-gold':   '#e2a84b',   // Premium badge accent
        'sv-light':  '#fcfaf7',   // Near-white cream background
        'sv-dark':   '#0f1120',   // Deepest dark, rich contrast
      },

      /* ── Typography ──────────────────────────────────── */
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Inter',
          '"Segoe UI"',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
      },

      /* ── Border Radius ───────────────────────────────── */
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '3.5rem',
      },

      /* ── Box Shadows ─────────────────────────────────── */
      boxShadow: {
        'apple':    '0 4px 24px rgba(0,0,0,0.06)',
        'card':     '0 2px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.06)',
        'card-lg':  '0 8px 32px rgba(0,0,0,0.08), 0 32px 80px rgba(0,0,0,0.10)',
        'glass':    '0 8px 32px rgba(33,40,68,0.12)',
        'inset-t':  'inset 0 1px 0 rgba(255,255,255,0.12)',
        'float':    '0 0 0 1px rgba(0,0,0,0.01), 0 2px 4px rgba(0,0,0,0.01), 0 8px 32px rgba(0,0,0,0.04)',
        'float-lg': '0 0 0 1px rgba(0,0,0,0.01), 0 4px 8px rgba(0,0,0,0.02), 0 16px 48px rgba(0,0,0,0.06)',
      },

      /* ── Keyframes ───────────────────────────────────── */
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        'anti-gravity': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%':      { transform: 'translateY(-8px) scale(1.02)' },
        },
      },

      /* ── Animations ──────────────────────────────────── */
      animation: {
        'fade-in':  'fadeIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'float':    'float 6s ease-in-out infinite',
        'shimmer':  'shimmer 2.5s linear infinite',
        'anti-gravity': 'anti-gravity 8s ease-in-out infinite',
      },

      /* ── Easing ──────────────────────────────────────── */
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'apple': 'cubic-bezier(0.42, 0, 0.58, 1)',
      },

      /* ── Letter Spacing ──────────────────────────────── */
      letterSpacing: {
        'tighter': '-0.05em',
        'tightest': '-0.08em',
      },
    },
  },
  plugins: [],
}
