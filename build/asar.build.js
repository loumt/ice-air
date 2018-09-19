"use strict";

const asar = require('asar');
const path = require('path')
const {dependencies} = require('./../package.json')
const fs = require('fs')

const depExclude = ['electron', 'vue', 'vue-electron', 'vue-router']

const resolve = (filePath) => {
    return path.resolve(__dirname, '..', filePath)
}
const output = resolve('./dist/asar/client.asar')

const includes = ['package.json', 'node_modules', 'dist']

const distIncludes = ['build']

let options = {
    unpack: [],
    unpackDir: []
}

//root
fs.readdirSync(resolve('.')).forEach(item => {
    if (!includes.includes(item)) {
        if (fs.statSync(resolve(item)).isDirectory()) {
            options.unpackDir.push(item+ '\\**\\*')
        } else {
            options.unpack.push(item)
        }
    }
})


//dist
fs.readdirSync(resolve('dist')).forEach(item => {
    if (!distIncludes.includes(item)) {
        let dir = path.join('dist', item)
        if (fs.statSync(resolve(dir)).isDirectory()) {
            options.unpackDir.push(dir + '\\**\\*')
        } else {
            options.unpack.push(dir + '\\**\\*')
        }
    }
})

//modules
depExclude.forEach(item=>{
    let dir = path.join('node_modules', item)
    options.unpackDir.push(dir + '\\**\\*')
})

// console.dir(options)


asar.createPackageWithOptions(resolve('./dist/pack/ca-clt-win32-x64/resources/app'), output, {}, function () {
    console.log('done.');
})

// console.log(fs.existsSync(output))
//
// console.log(fs.readdirSync(output))