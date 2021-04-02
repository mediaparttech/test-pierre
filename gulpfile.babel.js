import { resolve } from 'path'
import { src, dest, series } from 'gulp'
import plumber from 'gulp-plumber'
import replace from 'gulp-replace'
import svgSprite from 'gulp-svg-sprite'

// Configuration
// ––––––––––––––––––––––

const config = {
  srcPath: resolve(__dirname, 'src/icons/*.svg'),
  destPath: {
    src: resolve(__dirname, 'src/views/tools'),
    front: resolve(__dirname, '../templates/nouvelle_formule'),
  },
}

// Gulp tasks
// ––––––––––––––––––––––

const processSvg = () => {
  return src(config.srcPath)
    .pipe(plumber())
    .pipe(
      svgSprite({
        shape: {
          id: {
            generator: 'icon-%s',
          },
          transform: [
            {
              svgo: {
                plugins: [
                  { cleanupAttrs: true },
                  { removeDoctype: true },
                  { removeXMLProcInst: true },
                  { removeComments: true },
                  { removeMetadata: true },
                  { removeTitle: true },
                  { removeDesc: true },
                  { removeUselessDefs: true },
                  { removeEditorsNSData: true },
                  { removeEmptyAttrs: true },
                  { removeHiddenElems: true },
                  { removeEmptyText: true },
                  { removeEmptyContainers: true },
                  { removeViewBox: false },
                  { cleanupEnableBackground: true },
                  { convertStyleToAttrs: true },
                  { convertColors: true },
                  { convertPathData: true },
                  { convertTransform: true },
                  { removeUnknownsAndDefaults: true },
                  { removeNonInheritableGroupAttrs: true },
                  { removeUselessStrokeAndFill: true },
                  { removeUnusedNS: true },
                  { cleanupIDs: true },
                  { cleanupNumericValues: true },
                  { moveElemsAttrsToGroup: true },
                  { moveGroupAttrsToElems: true },
                  { collapseGroups: true },
                  { removeRasterImages: false },
                  { mergePaths: true },
                  { convertShapeToPath: true },
                  { sortAttrs: true },
                  { removeDimensions: true },
                ],
              },
            },
          ],
        },
        mode: {
          symbol: {
            dest: '',
            sprite: '_icons.html.twig',
            inline: true,
          },
        },
        svg: {
          xmlDeclaration: false,
          doctypeDeclaration: false,
          namespaceIDs: false,
          namespaceClassnames: false,
        },
      }),
    )
    .pipe(dest(config.destPath.src))
    .pipe(dest(config.destPath.front))
}

// Gulp exported tasks
// ––––––––––––––––––––––

const iconSprite = series(processSvg)

export { iconSprite }
