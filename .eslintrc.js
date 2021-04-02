module.exports = {
  root: true,
  extends: [
    'standard', //
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:compat/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
  },
  plugins: ['@babel'],
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    polyfills: [
      'closest', //
      'URL',
      'IntersectionObserver',
      'IntersectionObserverEntry',
    ],
  },
  rules: {
    'compat/compat': 'warn',
    '@babel/semi': ['error', 'never'],
  },
}
