const path = require('path')
const _ = require('lodash')
const webpack = require('webpack')
const {dependencies} = require('./../../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {VueLoaderPlugin} = require('vue-loader')

let whiteListModules = ['vue']

function resolve(__filepath) {
  return path.resolve(__dirname, '../..', __filepath)
}

let webpackConfig = {
  mode: 'production',
  target: 'electron-renderer',
  devtool: '#cheap-module-eval-source-map',
  entry: {
    renderer: resolve('./src/renderer/main.js')
  },
  output: {
    path: resolve('./dist/build'),
    filename: 'js/[name].[hash:8].js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    // ...Object.keys(dependencies || {}).filter(d => {
    //   return !whiteListModules.includes(d)
    // })
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.node'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src/renderer'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [resolve('./src/renderer')],
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cssSourceMap: true,
          cacheBusting: true
        }
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
      },
      {
        test: /\.less/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'images',
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'media',
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'fonts',
          name: '[name].[hash:7].[ext]'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CloudApp-Client-Renderer',
      filename: 'app.html',
      template: resolve('./build/templates/index.tpl'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      inject: 'body'
    }),
    new VueLoaderPlugin(),
    // new BabiliPlugin(),
    new MiniCssExtractPlugin({filename: 'styles.css'}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

module.exports = webpackConfig

