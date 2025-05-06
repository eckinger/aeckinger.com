/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'highlight': '#537D8D',
      },
      fontFamily: {
        'signika': ['Signika', 'sans-serif'],
        'rubik': ['Rubik']
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      const buttons = {
        '.btn-shadow': {
          position: 'absolute',
          top: '0',
          left: '0',
          marginTop: '0.25rem',
          marginLeft: '0.25rem',
          height: '100%',
          width: '100%',
          borderRadius: '0.25rem',
          backgroundColor: '#000',
        },
        // Base button styles (shared between main and main-no-hover)
        '.btn-base': {
          position: 'relative',
          display: 'inline-block',
          height: '100%',
          width: '100%',
          borderRadius: '0.25rem',
          borderWidth: '2px',
          borderColor: '#000',
          backgroundColor: '#fff',
          paddingLeft: '0.75rem',
          paddingRight: '0.75rem',
          paddingTop: '0.25rem',
          paddingBottom: '0.25rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#000',
          transition: 'all 100ms',
        },
        // btn-main with hover
        '.btn-main': {
          '@apply btn-base': {},
          '&:hover': {
            backgroundColor: '#FBBF24', // Yellow-400 in Tailwind
            color: '#111827', // Gray-900 in Tailwind
          },
        },
        // without hover
        '.btn-main-no-hover': {
          '@apply btn-base': {},
        }
      };
      addComponents(buttons);
    }
  ],
}
