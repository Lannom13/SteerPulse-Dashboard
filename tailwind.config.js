// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#0EA5E9',
          600: '#0284C7',
        },
        background: '#0f172a',
      },
    },
  },
  plugins: [],
}
