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
  plugins: [require('daisyui')],
};
