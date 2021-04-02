module.exports = {
  plugins: [
    require('postcss-sort-media-queries')({
      sort: 'mobile-first',
    }),
    require('postcss-preset-env')({
      features: {
        customProperties: {
          warnings: false,
        },
      },
    }),
  ],
}
