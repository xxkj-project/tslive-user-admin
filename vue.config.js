'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

// const TerserPlugin = require('terser-webpack-plugin')

// console.log(path.resolve(__dirname, './src'))
// console.log(path.resolve(__dirname, '/src'))
// console.log(path.resolve(__dirname, 'src'))
// console.log(path.resolve(__dirname, '../src'))
// console.log(path.join(__dirname, './src'))

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title // page title

// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9000 // dev port

const target = {
  url: 'http://127.0.0.1'
}

console.log('-----serverEnv', process.env.VUE_APP_SERVER_ENV)
console.log('-----nodeEnv', process.env.NODE_ENV)
console.log('-----serverUrl', process.env.VUE_APP_SERVER_URL)

const projectName = 'tsuser'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? `/${projectName}/` : '/', // 基本路径
  outputDir: projectName, // 打包后输出文件目录
  assetsDir: 'static', // 静态资源目录
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: false,
    https: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/livecms': {
        target: process.env.VUE_APP_SERVER_URL,
        ws: true,
        changeOrigin: true,
        secure: false
        // pathRewrite: {
        //   '^/livelms': ''
        // }
      }
    }
  },
  // 添加webpack配置
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
    // if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_SERVER_ENV === 'prod') {
    //   // 返回一个将会被合并的对象
    //   return {
    //     optimization: {
    //       minimizer: [
    //         new TerserPlugin({
    //           sourceMap: false,
    //           terserOptions: {
    //             compress: {
    //               drop_console: true
    //             }
    //           }
    //         })
    //       ]
    //     }
    //   }
    // }
  },
  // 修改webpack配置
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.when(process.env.NODE_ENV === 'development', config => config.devtool('source-map'))
    // config.when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))

    // 设置performance预警
    config.when(process.env.NODE_ENV === 'production', config =>
      config.performance
        .hints('warning')
        .maxEntrypointSize(2048000)
        .maxAssetSize(1024000)
    )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          echarts: {
            name: 'chunk-echarts',
            priority: 30,
            test: /[\\/]node_modules[\\/]_?echarts(.*)/
          },
          zrender: {
            name: 'chunk-zrender',
            priority: 29,
            test: /[\\/]node_modules[\\/]_?zrender(.*)/
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          vuedraggableAndLrz: {
            name: 'chunk-vuedraggableAndLrz',
            priority: 15,
            test: /([\\/]node_modules[\\/]_?vuedraggable(.*))|([\\/]node_modules[\\/]_?lrz(.*))/
          },
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          utils: {
            name: 'chunk-utils',
            test: resolve('src/utils'),
            minChunks: 3,
            priority: 8,
            reuseExistingChunk: true
          },
          components: {
            name: 'chunk-components',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
