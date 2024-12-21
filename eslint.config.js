import js from '@eslint/js'
import globals from 'globals'
import prettier from 'eslint-plugin-prettier'
import jest from 'eslint-plugin-jest'

export default [
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      'prettier/prettier': 'warn',
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^__' }],
      'no-console': 'error'
    },
  },
  {
    files: ['src/**/*.test.js'],
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/prefer-expect-assertions': 'off',
    },
  },
]
