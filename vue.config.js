const path = require('path')
const Icons = require('unplugin-icons/webpack')
const Components = require('unplugin-vue-components/webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  // assetsDir: 'static',
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')).set('lin', resolve('src/lin')).set('assets', resolve('src/assets'))
    config.module.rule('ignore').test(/\.md$/).use('ignore-loader').loader('ignore-loader').end()
  },
  configureWebpack: {
    plugins: [
      Components({ /** options **/ }),
      // 使用
      Icons({
        compiler: 'vue3',// 自动安装
        autoInstall: true
      }),
    ],
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.json', '.vue', '.scss', '.html'],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/shared.scss";`,
      },
    },
  },
  devServer: {
    compress: true,
    port: 8080
  },
  // node_modules依赖项es6语法未转换问题
  transpileDependencies: ['vuex-persist'],
}
