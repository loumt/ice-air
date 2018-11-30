'use strict'
const path = require('path')
const notifier = require('./notifier')

process.env.NODE_ENV = 'production'
const {say} = require('cfonts')
const chalk = require('chalk')
const del = require('del')
const packager = require('electron-packager')
const webpack = require('webpack')
const Multispinner = require('multispinner')

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')
const webConfig = require('./webpack.web.config')
const packagerOptions = require('./packager.config')
const globalConfig = require('./config')

const doneLog = chalk.bgGreen.white(' DONE ') + ' '
const errorLog = chalk.bgRed.white(' ERROR ') + ' '
const okayLog = chalk.bgBlue.white(' OKAY ') + ' '
const isCI = process.env.CI || false

if (process.env.BUILD_TARGET === 'clean-electron'){
  clean('electron')
} else if (process.env.BUILD_TARGET === 'clean-packager'){
  clean('pack')
} else if (process.env.BUILD_TARGET === 'web'){
  web()
} else if (process.env.BUILD_TARGET === 'packager'){
  bundleApp()
}else {
  build()
}

function clean(target) {
  del.sync([`dist/${target}/*`])
  console.log(`\n${doneLog}\n`)
  process.exit()
}

function ElectronNotify(msg) {
  notifier({
    title: 'Electron',
    message: msg,
    timeout: 5000
  })
}

function build() {
  greeting()

  del.sync(['dist/electron/*', '!.gitkeep'])

  const tasks = ['main', 'renderer']
  const m = new Multispinner(tasks, {
    preText: 'building',
    postText: 'process'
  })

  let results = ''

  m.on('success', () => {
    process.stdout.write('\x1B[2J\x1B[0f')
    console.log(`\n\n${results}`)
    console.log(`${okayLog}take it away ${chalk.yellow('`electron-packager`')}\n`)
    bundleApp()
  })

  pack(mainConfig).then(result => {
    results += result + '\n\n'
    m.success('main')
  }).catch(err => {
    m.error('main')
    console.log(`\n  ${errorLog}failed to build main process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })

  pack(rendererConfig).then(result => {
    results += result + '\n\n'
    m.success('renderer')
  }).catch(err => {
    m.error('renderer')
    console.log(`\n  ${errorLog}failed to build renderer process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}

function pack(config) {
  return new Promise((resolve, reject) => {
    config.mode = 'production'
    webpack(config, (err, stats) => {
      if (err) reject(err.stack || err)
      else if (stats.hasErrors()) {
        let err = ''

        stats.toString({
          chunks: false,
          colors: true
        })
          .split(/\r?\n/)
          .forEach(line => {
            err += `    ${line}\n`
          })

        reject(err)
      } else {
        resolve(stats.toString({
          chunks: false,
          colors: true
        }))
      }
    })
  })
}

function bundleApp() {
  packagerOptions.mode = 'production'
  packager(packagerOptions).then(appPaths => {
    console.log(`Exe Build In : \n   ${appPaths}`)
    appPaths.forEach(imte => {

    })
    ElectronNotify('Package Success!')
  }).catch(error => {
    console.log(error)
    ElectronNotify(`Package Failure! \n ${error.code}`)
  })
}

function web() {
  del.sync(['dist/web/*', '!.gitkeep'])
  webConfig.mode = 'production'
  webpack(webConfig, (err, stats) => {
    if (err || stats.hasErrors()) console.log(err)

    console.log(stats.toString({
      chunks: false,
      colors: true
    }))

    process.exit()
  })
}

function greeting() {
  const cols = process.stdout.columns
  let text = ''

  if (cols > 85) text = 'lets-build'
  else if (cols > 60) text = 'lets-|build'
  else text = false

  if (text && !isCI) {
    say(text, {
      colors: ['yellow'],
      font: 'simple3d',
      space: false
    })
  } else console.log(chalk.yellow.bold('\n  lets-build'))
  console.log()
}