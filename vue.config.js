const path = require('path')
const ip = require('ip')

const Timestamp = new Date().getTime()

function resolve(dir) {
  return path.join(__dirname, dir)
}

const {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devPort,
  // isDev,
} = require('./src/config')

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  // eslint-loader 开发环境下保存的时候检查
  // lintOnSave: process.env.NODE_ENV === 'development',
  // 生产环境不开启源映射，加速生产构建
  productionSourceMap: false,
  // assetsDir: './',
  devServer: {
    hot: true,
    // host: ip.address(),
    host: 'localhost',
    // 配置自动启动浏览器
    open: true,
    port: devPort,
    overlay: {
      warnings: true,
      errors: true,
    }, // 错误、警告在页面弹出
    after: require('./mock/mock-server.js'),
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        // 允许websockets跨域
        changeOrigin: true,
        // 如果要代理 websockets，配置这个参数
        // ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/sass/common/variables.scss";@import "~@/assets/sass/common/mixins.scss";`,
      },
    },
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))

    config.plugin('define').use(require('webpack/lib/DefinePlugin'), [
      {
        'process.env': {
          http_env: JSON.stringify(process.env.http_env),
        },
      },
    ])
  },
  configureWebpack: {
    output: {
      filename: `js/[name].${Timestamp}.js`,
      chunkFilename: `js/[name].${Timestamp}.js`,
    },
  },
}
