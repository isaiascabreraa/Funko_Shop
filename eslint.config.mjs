import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      ecmaVersion: 'latest'
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'comma-dangle': ['error', 'never'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'eol-last': ['error', 'always'],
      camelcase: 'off'
    }
  },

  // Archivos Node.js en CommonJS
  {
    files: [
      'app.js',
      'server.js',
      'src/**/*.js',
      'tests/**/*.test.js'
    ],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node
    }
  },

  // Archivos del frontend (navegador)
  {
    files: ['public/Javascript/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },

  // Tests (Jest)
  {
    files: ['tests/**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
])
