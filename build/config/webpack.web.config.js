"use strict";

const path = require('path')
const _ = require('lodash')
const webpack = require('webpack')
const {dependencies} = require('./../../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

function resolve(__filepath) {
    return path.resolve(__dirname, './../../', __filepath)
}

let filterModules = [
    'vue',
    'electron',
    'win-mouse',
    'sanitize-filename',
    'node-rdp',
    'nconf',
    'log4js'
]

const webConfig = {
    mode: 'production',
    target: process.env.CIENT ? 'electron-renderer' : 'web',
    entry: {
        app: resolve('./src/renderer/main.js')
    },
    output: {
        path: resolve('./dist/web'),
        filename: 'js/[name].[hash:8].js',
        // libraryTarget: 'commonjs',
        // publicPath:'./'
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
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: 'images',
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: 'fonts',
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: true,
                                import:true,
                                minimize: true,
                                sourceMap: true

                            }
                        }
                    ]
                })
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('./build/templates/index.html'),
            minify: !{
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            inject: 'body',
            pageOptions: {
                title: 'CloudApp'
            }
        }),
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
            filename: '[name].[hash:8].css',
            allChunks: true
        })
    ]
}


module.exports = webConfig