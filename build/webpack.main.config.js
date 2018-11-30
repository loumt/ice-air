'use strict'

process.env.BABEL_ENV = 'main'

const path = require('path')
const { dependencies } = require('../package.json')
const webpack = require('webpack')

const BabiliWebpackPlugin = require('babili-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const globalConfig  = require('./config')

let mainConfig = {
  mode: process.env.NODE_ENV,
  target: 'electron-main',
  entry: {
    main: path.join(__dirname, '../src/main/main.js'),
    preload: path.join(__dirname, '../src/main/preload/app.js'),
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/electron')
    // path: path.join(__dirname, '../dist/pack/cloudapp-win32-x64/resources/app/dist/electron')
  },
  resolve: {
    extensions: ['.js', '.json', '.node']
  },
  externals: [
    ...Object.keys(dependencies || {})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     outputPath: 'images2',
      //     name: '[name].[hash:7].[ext]'
      //   }
      // }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../src/main/asserts'),
        to: path.join(__dirname, '../dist/electron/cast'),
        ignore: ['.*']
      }
    ])
  ]
}

/**
 * Adjust mainConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  let definePluginOptions = {
    'process.env.NODE_ENV': '"production"',
  }

  //Add Dev Tools
  if(globalConfig.packager.devTool){
    definePluginOptions['process.env.DEV_TOOL'] = '"true"'
  }

  mainConfig.plugins.push(
    new BabiliWebpackPlugin(),
    new webpack.DefinePlugin(definePluginOptions)
  )
}

module.exports = mainConfig
