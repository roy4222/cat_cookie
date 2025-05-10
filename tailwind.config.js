/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      // 基礎顏色
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      gray: {
        100: '#F5F5F5', // gray-light
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
      },
      
      // 自定義顏色
      primary: {
        DEFAULT: '#FF9FB5', // 主要粉色
        dark: '#F06292',    // 深粉色
        light: '#FFCDD2',   // 淺粉色
      },
      secondary: {
        DEFAULT: '#FFF9C4', // 主要淺黃色
        dark: '#FFE082',    // 深黃色
      },
      cream: '#FFFDE7',     // 奶油色
      ivory: '#FFFAF0',     // 象牙白
      
      // 功能型顏色
      success: '#A5D6A7',
      info: '#90CAF9',
      warning: '#FFE082',
      error: '#EF9A9A',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'full': '9999px',
      },
    },
  },
  plugins: [],
} 