"use strict";

const asar = require('asar');
const path = require('path')
const packageConfig  = require('./packager.config')
const {dependencies} = require('./../package.json')
const fs = require('fs')

const depExclude = Object.keys(dependencies).filter(item=>{return item.indexOf('vue') !== -1})

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

let {ARCH} = process.env
if(!ARCH){
  return
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

let asarPath = resolve(`./dist/pack/${packageConfig.appname}-win32-${ARCH}/resources/app`)

if(fs.existsSync(asarPath)){
  asar.createPackageWithOptions(asarPath, output, {}, function () {
    console.log('done.');
  })
}else{
  let result = []
  let p = asarPath
  while (!fs.existsSync(p)){
    result.push(`${p} [${fs.existsSync(p)}]`)
    p = path.dirname(p)
  }
  result.push(`${p} [${fs.existsSync(p)}]`)
  result.forEach(item=>{
    console.log(`\t ${item}`)
    // console.log(`\n`)
  })
  console.log('Not Found ! ')
}
