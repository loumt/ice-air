"use strict";

const path = require('path')
const webpack = require('webpack')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const _ = require('lodash')
const chalk = require('chalk')
const merge = require('webpack-merge')
const portfinder = require('portfinder')
const WebpackDevServer = require('webpack-dev-server')
const webpackWebConfig = require('./webpack.web.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('./../notifier')

const webpackConfig = merge(webpackWebConfig, {
    mode:'development',
    devServer: {
        // clientLogLevel: 'warning',
        // hot: true,
        // historyApiFallback:true,
        // contentBase: path.resolve(__dirname, "./../../dist/web"),
        // compress: true,
        host: 'localhost',
        port: 8585,
        // quiet: true,
        // progress:true,
        // watchOptions: {
        //     poll: false
        // },
        // stats: {
        //     colors: true
        // },
        open: true,
        // overlay: {
        //     warnings: false,
        //     errors: true
        // }
    },
    plugins: [
        new CleanWebpackPlugin(['dist/web']),
        // new webpack.HotModuleReplacementPlugin()
    ]
})

// module.exports = new Promise((resolve, reject) => {
//     portfinder.basePort = webpackConfig.devServer.port
//     portfinder.getPort((err, port) => {
//         if (err) {
//             reject(err)
//         } else {
//             webpackConfig.plugins.push(new FriendlyErrorsPlugin({
//                     compilationSuccessInfo: {
//                         messages: [`Your application is running here: http://${webpackConfig.devServer.host}:${port}`],
//                     },
//                     onErrors: (severity, errors) => {
//                         if (severity !== 'error') {
//                             return;
//                         }
//                         const error = errors[0];
//                         notifier({
//                             title: "Webpack error",
//                             message: severity + ': ' + error.name,
//                             subtitle: error.file || '',
//                             timeout: 4000
//                         });
//                     },
//                     clearConsole: false
//                 })
//             )
//             resolve(webpackConfig)
//         }
//     })
// })

module.exports = {
    host: '127.0.0.1',
    port: 8585,
    open: true,
    quiet:true
}
