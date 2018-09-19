"use strict"

const path =require('path')
const fs =require('fs')
const {execFile} =require('child_process')
const packConfig = require('./config/packager.config')

const config = {platform:'win32',arch:'x64'}
let exePath = path.join(packConfig.out,`${packConfig.appname}-${config.platform}-${config.arch}`,`${packConfig.appname}.exe`);
let exist = fs.existsSync(exePath)

console.log('┏ Run App --------------------')
console.log(`  ${exePath} => ${exist}`)
console.log('┗ ----------------------------\n')


let electronProcess = execFile(exePath)
// console.dir(electronProcess)

console.log('┏ App Pid --------------------')
console.log(`  ${electronProcess.pid}`)
console.log('┗ ----------------------------')
