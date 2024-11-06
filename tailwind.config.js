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

          DEFAULT: '#2563EB', // Bright blue

          light: '#3B82F6',

           dark: '#1D4ED8',

         },

        accent: {

          DEFAULT: '#EC4899', // Pink

          light: '#F472B6',

          dark: '#DB2777',

        },

        // background: {

        //   DEFAULT: '#FFFFFF',

        //   light: '#F8FAFC',

        //   dark: '#F1F5F9',

        // },

        // surface: {

        //   DEFAULT: '#FFFFFF',

        //   light: '#F8FAFC',

        //   dark: '#F1F5F9',

        // },

        text: {

          DEFAULT: '#1E293B', // Slate-800

          primary: '#0F172A', // Slate-900

          secondary: '#475569', // Slate-600

          light: '#94A3B8', // Slate-400

        },

        border: {

          DEFAULT: '#E2E8F0', // Slate-200

          light: '#F1F5F9', // Slate-100

          dark: '#CBD5E1', // Slate-300

        }

      },

      backgroundImage: {

        'gradient-custom': 'linear-gradient(135deg, #2563EB, #EC4899)',

        'gradient-hover': 'linear-gradient(135deg, #1D4ED8, #DB2777)',

        'gradient-light': 'linear-gradient(135deg, #F8FAFC, #F1F5F9)',

      },

      boxShadow: {

        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',

        'custom-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

      }

    },

  },

  plugins: [],

}
