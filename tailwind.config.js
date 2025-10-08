/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './core/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'satoshi': ['var(--font-satoshi)', 'sans-serif'],
        'zodiak': ['var(--font-zodiak)', 'serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)',
        },
        sidebar: {
          background: 'var(--sidebar-background)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
        slate: 'var(--slate)',
      },
      borderRadius: {
        'sm': 'var(--rounded-sm)',
        'md': 'var(--rounded-md)',
        'lg': 'var(--rounded-lg)',
        'xl': 'var(--rounded-xl)',
        'full': 'var(--rounded-full)',
      },
      fontSize: {
        'xs': 'var(--text-xs)',
        'sm': 'var(--text-sm)',
        'base': 'var(--text-base)',
        'lg': 'var(--text-lg)',
        'xl': 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
      },
      lineHeight: {
        '4': 'var(--leading-4)',
        '5': 'var(--leading-5)',
        '6': 'var(--leading-6)',
        '7': 'var(--leading-7)',
        '8': 'var(--leading-8)',
        '9': 'var(--leading-9)',
        '10': 'var(--leading-10)',
      },
      fontWeight: {
        'normal': 'var(--normal)',
        'medium': 'var(--medium)',
        'semibold': 'var(--semibold)',
        'bold': 'var(--bold)',
      },
      letterSpacing: {
        'tight': 'var(--tight)',
      },
      spacing: {
        '0': 'var(--spacing-0)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
      },
      height: {
        '387': 'var(--height-387)',
        '600': 'var(--height-600)',
      },
      boxShadow: {
        'sm': 'var(--shadow-light)',
        'md': 'var(--shadow-medium)',
        'lg': 'var(--shadow-heavy)',
      },
    },
  },
  plugins: [],
}
