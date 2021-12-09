module.exports = {
  purge: [],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        98: '400px',
        100: '480px',
        108: '640px',
      },
      boxShadow: {
        top: '0 10px 15px 12px rgba(0, 0, 0, 0.1), 0 4px 6px 8px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        authentication: "url('/media/authentication/authentication.svg')",
        'authentication-dark':
          "url('/media/authentication/authentication-dark.svg')",
      },
    },
    fontSize: {
      xxs: ['.62rem', '.75rem'],
      xs: ['.75rem', '1rem'],
      sm: ['.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.75rem'],
      xl: ['1.25rem', '1.75rem'],
      '2xl': ['1.5rem', '2rem'],
      '2.16xl': ['1.75rem', '2.25rem'],
      '3xl': ['1.875rem', '2.25rem'],
      '4xl': ['2.25rem', '2.5rem'],
      '4.5xl': ['2.5rem', '3.25rem'],
      '5xl': ['3rem', '3rem'],
      '6xl': ['3.75rem', '1'],
      '7xl': ['4.5rem', '1'],
      '8xl': ['6rem', '1'],
      '9xl': ['8rem', '1'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
