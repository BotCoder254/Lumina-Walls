/** @type {import('tailwindcss').Config} */

export default {

  content: [

    "./index.html",

    "./src/**/*.{js,ts,jsx,tsx}",

  ],

  theme: {

    extend: {

      colors: {

        primary: {

          DEFAULT: '#0066FF',

          light: '#3385FF',

          dark: '#0047B3',

        },

        background: {

          DEFAULT: '#000000',

          light: '#1A1A1A',

          dark: '#000000',

        },

        surface: {

          DEFAULT: '#121212',

          light: '#1E1E1E',

          dark: '#0A0A0A',

        },

      },

      backgroundImage: {

        'gradient-custom': 'linear-gradient(to right, #000000, #0066FF)',

        'gradient-dark': 'linear-gradient(to right, #000000, #001F4D)',

      },

    },

  },

  plugins: [],

}
