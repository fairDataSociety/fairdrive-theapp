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
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
