/*
 * @Author: your name
 * @Date: 2021-04-13 14:06:42
 * @LastEditTime: 2021-04-15 15:09:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \freedom\freedomxsh\vue.config.js
 */

'use strict';
// 引入node api
const path = require('path')
// 减少打包资源插件
const CompressionPlugin = require('compression-webpack-plugin')

// 拼接一个当前路径
function resolve (dir){
  return path.join(__dirname,dir)
}
module.exports = {
  // hot: true, // 热加载

  // 所有路径加个根路径
  publicPath:'./',
  // 打包文件
  outputDir:'dist',
  // 静态文件
  assetsDir:'static',
  
  runtimeCompiler: true,
  // eslint 是否在保存的时候交谈
  lintOnSave:false,
  // 是否开启sourcemap文件 就是控制台定位代码位置哪行的
  productionSourceMap:false,
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://localhost:7001',
        // target: 'http://119.3.160.82:9999',
        ws: true,
        changeOrigin: true,
        pathRequiresRewrite: {
          '^/admin': '/'
        }
      },
      '/excel': {
        target: 'http://localhost:7001/public',
        ws: true,
        changeOrigin: true,
        pathRequiresRewrite: {
          '^/excel': '/'
        }
      },
      '/ranqi': {
        target: 'https://10.109.19.12:10443',
        ws: true,
        changeOrigin: true,
        pathRequiresRewrite: {
          '^/ranqi': '/'
        }
      },
      '/rqserver': {
        target: 'http://obs.cn-north-1.myhuaweicloud.com',
        ws: true,
        changeOrigin: true,
        pathRequiresRewrite: {
          '^/rqserver': '/'
        }
      }
    }
  },
   // 可以合拼webpack配置之  在里面进行添加修改删除 接受类型可以是对象可以是fun
   configureWebpack: config=>{
        plugins:[
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false // 不删除源文件
          })
        ]
   },
   // 修改webpack细微配置
   chainWebpack (config) {
    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test

    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .end();
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    // config
    //   // https://webpack.js.org/configuration/devtool/#development
    //   .when(process.env.NODE_ENV === 'development', config =>
    //     config.devtool('cheap-source-map')
    //   );
  }
} 