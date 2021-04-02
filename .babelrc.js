module.exports = {
  presets: [
    ['@babel/preset-env', { corejs: '3', useBuiltIns: 'usage' }], //
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: 3 }], //
    ['@babel/plugin-syntax-dynamic-import'],
    ['@babel/plugin-transform-spread'],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-private-methods'],
  ],
}
