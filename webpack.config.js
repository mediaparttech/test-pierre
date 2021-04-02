const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const chokidar = require('chokidar')

module.exports = (env, argv) => {
  const config = {
    isDevMode: argv.mode === 'development',
    isProdMode: argv.mode === 'production',
    rootPath: resolve(process.cwd()),
    contentFolder: 'content',
    dataFolder: 'data',
    publicFolder: 'public',
    srcFolder: 'src',
  }

  const webpackConfig = {
    // line below is to fix a bug with hot reload
    // => https://github.com/webpack/webpack-dev-server/issues/2758
    target: config.isDevMode ? 'web' : 'browserslist',
    devtool: config.isDevMode ? 'eval-cheap-module-source-map' : 'source-map',
    context: resolve(config.rootPath, config.srcFolder),
    entry: {
      blogs: 'js/pages/blogs.js',
    },
    output: {
      charset: false,
      path: `${config.rootPath}/${config.publicFolder}`,
      publicPath: '',
      filename: `js/[name].js`,
      chunkFilename: `js/[name].js`,
      assetModuleFilename: `[path][name][ext][query]`,
    },
    optimization: {
      minimize: false,
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          default: false,
        },
      },
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: true,
            },
            format: {
              comments: false,
            },
          },
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
    },
    resolve: {
      alias: {
        content: resolve(config.rootPath, config.contentFolder),
        fonts: resolve(config.rootPath, config.srcFolder, 'fonts/'),
        images: resolve(config.rootPath, config.srcFolder, 'images/'),
        js: resolve(config.rootPath, config.srcFolder, 'js/'),
        scss: resolve(config.rootPath, config.srcFolder, 'scss/'),
      },
    },
    devServer: {
      stats: 'minimal',
      open: true,
      overlay: true,
      hot: true,
      liveReload: false,
      compress: true,
      serveIndex: true,
      contentBase: resolve(config.rootPath, config.contentFolder),
      contentBasePublicPath: `/${config.contentFolder}`,
      watchContentBase: true,
      publicPath: '/',
      host: '0.0.0.0',
      port: 3001,
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      },
      before(app, server) {
        // Watch for template and content files change
        chokidar.watch([resolve(config.rootPath, config.dataFolder, '**/*.json'), resolve(config.rootPath, config.srcFolder, 'views/**/*.html.twig')], { ignoreInitial: true }).on('all', () => {
          server.sockWrite(server.sockets, 'content-changed')
        })
      },
    },
    module: {
      rules: [
        {
          test: /\.(mjs|js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.(scss|sass|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: config.isDevMode ? '/' : '../',
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 3,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                implementation: require('sass'),
                sassOptions: {
                  outputStyle: 'expanded',
                },
              },
            },
          ],
        },
        {
          test: /\.(webp|png|jpg|jpeg|gif|svg|ico|woff|woff2|eot|ttf)$/,
          type: 'asset/resource',
        },
        {
          test: /\.twig$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: config.isProdMode,
                sources: {
                  list: [
                    {
                      tag: 'img',
                      attribute: 'src',
                      type: 'src',
                    },
                    {
                      tag: 'img',
                      attribute: 'srcset',
                      type: 'srcset',
                    },
                    {
                      tag: 'img',
                      attribute: 'data-src',
                      type: 'src',
                    },
                    {
                      tag: 'img',
                      attribute: 'data-srcset',
                      type: 'srcset',
                    },
                  ],
                },
              },
            },
            {
              loader: 'twig-html-loader',
              options: {
                data: context => {
                  const data = resolve(config.rootPath, config.dataFolder, 'data.json')

                  context.addDependency(data)

                  return context.fs.readJsonSync(data, { throws: false }) || {}
                },
                namespaces: {
                  views: resolve(config.rootPath, config.srcFolder, 'views'),
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(config.rootPath, config.srcFolder, 'views/pages/blogs/post.html.twig'),
        filename: 'post.html',
        chunks: ['blogs'],
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
      new ESLintPlugin({
        files: ['**/*.{mjs,js}'],
      }),
      new StyleLintPlugin({
        files: ['**/*.{scss,sass,css}'],
      }),
      new CleanTerminalPlugin(),
    ],
  }

  if (config.isProdMode) {
    webpackConfig.plugins.push(
      new CleanWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              'svgo',
              {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            ],
          ],
        },
      }),
      new BeautifyHtmlWebpackPlugin({
        end_with_newline: true,
        preserve_newlines: false,
        max_preserve_newlines: 1,
      }),
      new CopyPlugin({
        patterns: [
          { from: `${config.rootPath}/${config.contentFolder}`, to: `${config.rootPath}/${config.publicFolder}//${config.contentFolder}`, },
        ],
      }),
    )
  }

  return webpackConfig
}
