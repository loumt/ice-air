"use strict";

const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const portFinder = require('portfinder')

const webpackWebConfig = require('./config/webpack.web.config')
const webpackDevConfig = require('./config/webpack.dev.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('./notifier')
const chalk = require('chalk')
const path =require('path')
const electron = require('electron')
const {spawn} = require('child_process')
let electronProcess = null
let manualRestart = false

function resolve(filePath){
    return path.resolve(__dirname,'..',filePath)
}

portFinder.basePort = webpackDevConfig.port
portFinder.getPort((err, port) => {
    if (err) {
        console.log(err)
    } else {
        webpackWebConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${webpackDevConfig.host}:${port}`]
                },
                onErrors: (severity, errors) => {
                    if (severity !== 'error') {
                        return;
                    }
                    const error = errors[0];
                    console.log(severity + ': ' + error.name);
                    console.log(error.file || '');
                },
                clearConsole: false
            })
        )


        if (webpackWebConfig.entry.push) { //entry is a Array
            webpackWebConfig.entry.push('webpack-dev-server', `webpack-dev-server/client?http://${webpackDevConfig.host}:${port}/`)
        } else { //entry is a Object(No Array)
            webpackWebConfig.entry['webpack-dev-server'] = `webpack-dev-server/client?http://${webpackDevConfig.host}:${port}/`
        }
        // console.dir(webpackWebConfig.entry)

        let server = new WebpackDevServer(webpack(webpackWebConfig), webpackDevConfig)

        server.listen(port, webpackDevConfig.host, () => {
            ServerNotify(`Server Start [ ${webpackDevConfig.host + ':' + port} ] ! `);

            if(process.env.CIENT){
                startElectron()
            }
        })
    }
})


function ServerNotify(msg) {
    notifier({
        title: 'Server',
        message: msg,
        timeout: 5000
    })
}



/**
 * 开启应用
 */
function startElectron() {
    electronProcess = spawn(electron, ['--inspect=5858', `./src/main/main.js`])

    thislog('Electron ProcessId', electronProcess['pid'],'blue')

    electronProcess.stdout.on('data', data => {
        thislog('electron', data, 'blue')
    })
    electronProcess.stderr.on('data', data => {
        console.log(data.toString())
    })

    electronProcess.on('close', () => {
        if (!manualRestart) process.exit()
    })
}

function thislog(category, data, color) {
    let log = ''
    data = data.toString().split(/\r?\n/)
    data.forEach(line => {
        log += `  ${line}\n`
    })
    if (/[0-9A-z]+/.test(log)) {
        console.log(
            chalk[color].bold(`┏ ${category} -------------------`) +
            '\n\n' +
            log +
            chalk[color].bold('┗ ----------------------------') +
            '\n'
        )
    }
}
