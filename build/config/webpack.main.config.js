const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin');
const {dependencies} = require('./../../package.json')

function resolve(__filepath) {
  return path.resolve(__dirname, './../../', __filepath)
}

let outputFolder = process.env.NODE_ENV === 'development' ? 'temp' : 'build'

const webpackMainConfig = {
  devtool: '#cheap-module-source-map',
  mode: 'production',
  target: 'electron-main',
  entry: {
    main: path.join(__dirname, '../../src/main/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../..', 'dist', outputFolder),
    filename: `[name].js`,
    libraryTarget: 'commonjs2',
    sourceMapFilename: '[name].map'
  },
  externals: [
    ...Object.keys(dependencies || {})
  ],
  resolve: {
    extensions: ['.js', '.json', '.node']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.node$/,
        include: /node_modules/,
        loader: 'node-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'images2',
          name: '[name].[hash:7].[ext]'
        }
      },
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    new BabiliPlugin(),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      parallel: true
    }),
    new CopyWebpackPlugin([
      {from: resolve('src/main/asserts'), to: resolve(`dist/${outputFolder}/cast`)}
    ])
  ]
}

module.exports = webpackMainConfig
