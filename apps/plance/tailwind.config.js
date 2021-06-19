const path = require('node:path');

module.exports = {
  mode: 'jit',
  purge: [path.join(__dirname, '**/*.{html,ts}')],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
