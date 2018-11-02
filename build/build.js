"use strict";

const isGreeting = process.env.GREET || false;
const del = require('del')
const {say} = require('cfonts')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const pack = require('electron-packager')
const notification = require('./utils/notification').ElectronNotification
const isCI = process.env.CI || false


const mainConfig = require('./config/webpack.main.config')
const rendererConfig = require('./config/webpack.renderer.config')
const packageConfig = require('./config/packager.config')

let BuildTarget = process.env.BUILD_TARGET

switch (BuildTarget) {
  case 'clear':
    clear()
    break
  case 'build-main':
    build(mainConfig)
    break;
  case 'build-renderer':
    let deleteFiles = [path.join(rendererConfig.output.path, '*')]
    let filters = ['main.js', 'cast']
    filters.forEach(f =>{deleteFiles.push(`!${path.join(rendererConfig.output.path, f)}`)})
    del.sync(deleteFiles)
    build(rendererConfig)
    break;
  case 'package':
    packager(packageConfig)
    break;
  default:
    console.log('No Pattern!')
}


function clear() {
  del.sync(['./dist/*'])
}

function ElectronNotify(msg) {
  notification({
    title: 'Electron',
    message: msg
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
  }).catch(error => {
    console.log(error)
    ElectronNotify(`Package Failure! \n ${error.code}`)
  })
}