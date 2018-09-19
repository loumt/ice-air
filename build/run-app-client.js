"use strict";

const chalk = require('chalk')
const electron = require('electron')
const pck =require('./../package.json')
const {spawn} = require('child_process')

let electronProcess = null
let manualRestart = false
/**
 * 开启应用
 */
function startElectron() {
    electronProcess = spawn(electron, ['--inspect=5858', `./dist/build/main.js`])

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

startElectron()