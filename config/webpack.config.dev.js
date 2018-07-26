// "use strict";
const webpack = require('webpack');
const path = require('path')

// html 生成
const HtmlWebpackPlugin = require('html-webpack-plugin')

// css自动填充
//let autoprefixer = require('autoprefixer');

// 告别无聊的输出
var DashboardPlugin = require('webpack-dashboard/plugin');

// 多核并行构建
var os = require('os')
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// 公共模块加载
let  { moduleWebpack, resolveWebpack,  devServerWebpack } = require('./webpack.config.common.js')

// 返回到当前工程目录
__dirname = path.resolve(__dirname, '..')

module.exports = {
  devtool: 'source-map',
  cache: true,
  mode: 'development',
  context: path.resolve(__dirname, "src"),
  entry: {
    'main': './index',
  },
  output: {
    filename: 'dist/[name].js',
    chunkFilename: "dist/[id].[name].js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: moduleWebpack,
  resolve: resolveWebpack,
  plugins: [
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     postcss: function () {
    //       return [precss, autoprefixer];
    //     }
    //   }
    // }),
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   minChunks: function(module){
    //     return module.context && module.context.indexOf("node_modules") !== -1;
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "manifest",
    //   minChunks: Infinity
    // }),
     new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                //打包重复出现的代码
                vendor: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'vendor'
                },
                //打包第三方类库
                commons: {
                    name: "commons",
                    chunks: "all",
                    test: /react|reflux/,
                    minChunks: Infinity
                }
            }
        }),

        new webpack.optimize.RuntimeChunkPlugin({
            name: "manifest"
        }),

    // 并行构建
    new HappyPack({
      id: 'babelloader',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
    new HtmlWebpackPlugin({
      title: 'react-reflux',
      template: './index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  devServer: devServerWebpack
}
