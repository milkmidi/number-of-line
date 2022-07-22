const plugin = require('tailwindcss/plugin');

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  jit: true,
  content: ['./src/**/*.{html,js,tsx}'],
  theme: {
    extend: {
      colors: {
        // primary: '#16a085',
      },
    },
  },
  plugins: [
    require('daisyui'),
    plugin(({ addUtilities, matchUtilities, addComponents, addVariant, e, theme }) => {
      addVariant('child', ' & > *');
    }),
  ],
};
