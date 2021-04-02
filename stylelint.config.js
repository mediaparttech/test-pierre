module.exports = {
  extends: [
    'stylelint-config-standard', //
    'stylelint-config-recommended-scss',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
  ],
  plugins: [
    'stylelint-no-unsupported-browser-features', //
  ],
  rules: {
    'color-hex-length': 'long',
    'no-descending-specificity': null,
    'declaration-block-trailing-semicolon': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extend', //
          'at-root',
          'debug',
          'warn',
          'error',
          'if',
          'else',
          'for',
          'each',
          'while',
          'mixin',
          'include',
          'content',
          'return',
          'function',
        ],
      },
    ],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
        ignore: [
          'css-appearance', //
          'css-clip-path',
          'css-gradients',
          'css-masks',
          'css-resize',
          'css-sticky',
          'css-touch-action',
          'css3-cursors',
          'multicolumn',
          'pointer',
          'user-select-none',
          'word-break',
          'wordwrap',
        ],
      },
    ],
  },
}
