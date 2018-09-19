"use strict";

const isGreeting = process.env.GREET || false;
const del = require('del')
const {say} = require('cfonts')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const pack = require('electron-packager')
const notifier = require('./notifier')
const isCI = process.env.CI || false

const pck = require('./../package.json')

const webConfig = require('./config/webpack.web.config')
const mainConfig = require('./config/webpack.main.config')
const rendererConfig = require('./config/webpack.renderer.config')
const packageConfig = require('./config/packager.config')

let BuildTarget = process.env.BUILD_TARGET

switch (BuildTarget){
    case 'clear':
        clear()
        break
    case 'web':
        del.sync([path.join(webConfig.output.path, '*')])
        build(webConfig)
        break;
    case 'build-main':
        build(mainConfig)
        break;
    case 'build-renderer':
        del.sync([path.join(rendererConfig.output.path, '*'),`!${path.join(rendererConfig.output.path, `main.js`)}`,`!${path.join(rendererConfig.output.path, `cast`)}`])
        build(rendererConfig)
        break;
    case 'packager':
        packager(packageConfig)
        break;
    default:
        console.log('No Pattern!')
}

// if (process.env.BUILD_TARGET === 'clear') {
//     clear()
// } else if (process.env.BUILD_TARGET === 'web') {
//     del.sync([path.join(webConfig.output.path, '*')])
//     build(webConfig)
// }else if (process.env.BUILD_TARGET === 'build-main') {
//     build(mainConfig)
// } else if (process.env.BUILD_TARGET === 'build-renderer') {
//     del.sync([path.join(rendererConfig.output.path, '*'),`!${path.join(rendererConfig.output.path, `main.js`)}`,`!${path.join(rendererConfig.output.path, `cast`)}`])
//     build(rendererConfig)
// } else if (process.env.BUILD_TARGET === 'packager') {
//     packager(packageConfig)
// } else if(process.env.BUILD_TARGET === 'packager') {
//     build(cloudappWebConfig)
// }

function clear() {
    del.sync(['./dist/*'])
}

function ElectronNotify(msg){
    notifier({
        title:'Electron',
        message:msg,
        timeout:5000
    })
}

function greeting() {
    if (!isGreeting) {
        return
    }

    const cols = process.stdout.columns
    let text = ''

    if (cols > 60) {
        text = process.env.BUILD_TARGET || 'Build App...'
    } else {
        text = false
    }

    if (text && !isCI) {
        say(text, {
            colors: ['blue'],
            font: 'simple3d',
            space: false
        })
    } else {
        console.log('Build App...')
    }
}


function build(config) {
    greeting()

    // del.sync([path.join(config.output.path, '*')])

    webpack(config, (err, stats) => {

        if (err) {
            console.log(err.stack || err)
        } else {
            if (stats.hasErrors()) {
                let err = ''

                stats.toString({
                    chunks: false,
                    colors: true
                })
                    .split(/\r?\n/)
                    .forEach(line => {
                        err += `    ${line}\n`
                    })
                ElectronNotify('WebPack Error!')
                console.log(err)
            } else {
                ElectronNotify('WebPack Success!')
                console.log(stats.toString({
                    chunks: false,
                    colors: true
                }))
            }
        }
    })
}

function packager(options) {
    pack(options).then(appPaths => {
        ElectronNotify('Package Success!')
    }).catch(error=>{
        console.log(error)
        ElectronNotify(`Package Failure! \n ${error.code}`)
    })
}