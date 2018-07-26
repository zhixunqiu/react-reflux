'use strict'
const webpack = require('webpack')
const path = require('path')

// 恢复到工程目录
__dirname = path.resolve(__dirname, '..')

// webpack-dev-server 配置
const devServer = {
  port: 3000, // 端口
  host: '0.0.0.0', // 可以以localhost\127.0.0.1\ip访问
  historyApiFallback: true, // H5 history使用
  https: false // https服务开启
 // disableHostCheck: true // host检查关闭
}

module.exports = {
  moduleWebpack: {
    rules: [
      {  
          test: /\.bundle\.jsx$/, 
          include: [
            path.resolve(__dirname, 'src')
          ],  
          use:{
            loader: 'bundle-loader',           
            options: {  
                lazy: true,  
                name: '[name]'  
            }
          } 
      },
      {
        test: [/\.js$/, /\.jsx$/, /\.es6$/],
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: [{
          loader: 'happypack/loader?id=babelloader'
        }]
      },
      {
        test: [/\.less$/, /\.css$/],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'styles')
        ],
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(avi|mp4)\w*/,
        include: [
          path.resolve(__dirname, 'styles')
        ],
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
        include: [
          path.resolve(__dirname, 'styles'),
          path.resolve(__dirname, 'images')
        ],
        exclude: [
          path.resolve(__dirname, 'src')
        ],
        use: [{
          loader: 'url-loader',
          options: {
            limit: 300000
          }
        }]
      }
    ]
  },
  resolveWebpack: {
    alias: {
      Images: path.resolve(__dirname, 'images/'),
      Style: path.resolve(__dirname, 'styles/'),
      Actions: path.resolve(__dirname, 'src/actions'),
      Utils: path.resolve(__dirname, 'src/utils')
    },
    extensions: ['.js', '.jsx', '.es6'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  devServerWebpack: devServer
}