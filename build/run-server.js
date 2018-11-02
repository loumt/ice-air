"use strict";
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const portFinder = require('portfinder')
const HotMiddleware = require('webpack-hot-middleware')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const chalk = require('chalk')
const path = require('path')
const electron = require('electron')
const {spawn} = require('child_process')
const webpackMainConfig = require('./config/webpack.main.config')
const webpackRendererConfig = require('./config/webpack.renderer.config')
const webpackDevConfig = require('./config/webpack.dev.config')
const notification = require('./utils/notification').ServerNotification

function debug(m, color) {
  console.log(chalk[color](`Hook: ${m}`))
}

let electronProcess = null
let hotMiddleware = null

function startRenderer() {
  return new Promise(resolve => {
    webpackRendererConfig.mode = 'production'
    webpackRendererConfig.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV':'"development"'
    }))
    WebpackDevServer.addDevServerEntrypoints(webpackRendererConfig, webpackDevConfig);

    webpackRendererConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${webpackDevConfig.host}:${webpackDevConfig.port}`]
        },
        onErrors: (severity, errors) => {
          if (severity !== 'error') {
            return;
          }
          const error = errors[0];
          debug(severity + ': ' + error.name, 'red');
          debug(error.file || '', 'red');
        },
        clearConsole: false
      })
    )
    const compiler = webpack(webpackRendererConfig);
    hotMiddleware = HotMiddleware(compiler, {
      log: false,
      heartbeat: 2500
    })

    const server = new WebpackDevServer(compiler, webpackDevConfig);
    //编译结果完成,不论成功或者失败
    compiler.hooks.done.tap('done', stats => {
      debug('done...', 'blue')
      resolve()
    })

    //监听模式下，一个新的编译(compilation)触发之后，执行一个插件，但是是在实际编译开始之前。
    compiler.hooks.watchRun.tapAsync('watchRun', (compilation, done) => {
      debug('watchRun...', 'blue')
      done()
    })

    server.listen(webpackDevConfig.port, webpackDevConfig.host, () => {
      debug('dev server listening on port 8080', 'yellow');
    });
  })
}

function startMain() {
  return new Promise(resolve =>{
    webpackMainConfig.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV':'"development"'
    }))

    let compiler = webpack(webpackMainConfig)
    compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
      debug('compiling...','white')
      done()
    })

    compiler.hooks.done.tap('done', stats => {
      debug('done...', 'white')
    })

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }

      if (electronProcess && electronProcess.kill) {
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()
      }

      resolve()
    })
  })
}


function startElectron() {
  let args = [
    '--inspect=5858',
    path.join(__dirname, '../dist/temp/main.js')
  ]

  electronProcess = spawn(electron, args)

  electronProcess.stdout.on('data', data => {
    debug(data, 'blue')
  })
  electronProcess.stderr.on('data', data => {
    debug(data, 'red')
  })

  electronProcess.on('close', () => {
    process.exit()
  })
}

function init(){
  Promise.all([startRenderer(),startMain()]).then(()=>{
    startElectron()
  }).catch(err=>{
    console.log(err)
  })
}

init()
