"use strict";

const fs =require('fs')
const path =require('path')
const pck =require('./../../../package.json')
const initLogger = require('electron-log')

initLogger.transports.file.level = 'warn'
initLogger.transports.file.format = '{h}:{i}:{s}:{ms} {text}'
initLogger.transports.file.maxSize = 5 * 1024 * 1024
initLogger.transports.file.file = path.join(__dirname,'log.txt')
initLogger.transports.file.streamConfig = { flags: 'w' }
initLogger.transports.file.stream = fs.createWriteStream(initLogger.transports.file.file)
initLogger.transports.file.appName = pck.name

module.exports = initLogger