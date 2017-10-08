import pxToViewport from 'postcss-px-to-viewport';

export default {
  entry: "src/index.js",
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime"
      ],
      extraPostCSSPlugins: [
        pxToViewport({
          viewportWidth: 360,
          viewportHeight: 640,
          unitPrecision: 5,
          viewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false
        })
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime"
      ],
      extraPostCSSPlugins: [
        pxToViewport({
          viewportWidth: 360,
          viewportHeight: 640,
          unitPrecision: 5,
          viewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false
        })
      ]
    }
  }
}
