const path = require('path')
const {dependencies} = require('./../../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(__filepath) {
    return path.resolve(__dirname, './../../', __filepath)
}

module.exports = {
    mode: 'production',
    target: 'electron-renderer',
    entry: {
        renderer:  resolve('./src/renderer/main.js')
    },
    output: {
        path: resolve('./dist/build'),
        publicPath:'./',
        filename: 'js/[name].[hash:8].js',
        // libraryTarget: 'commonjs'
    },
    externals: {

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
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: true,
                                minimize: true,
                                sourceMap: true
                            }
                        }
                    ]
                })
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
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: 'images',
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
            filename: 'index.html',
            template: resolve('./build/templates/index.html'),
            minify: !{
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            inject: 'body',
            pageOptions: {
                title: 'CloudApp-Client-Renderer'
            }
        }),
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
            filename: '[name].[hash:8].css',
            allChunks: true
        })
    ]
}
