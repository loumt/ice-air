const path = require('path')
const pck = require('./../package.json')
const config = require('./config')

module.exports = {
  "asar": config.packager.asar,
  "app-version": pck.version,
  "build-version": pck.version,
  "app-bundle-id": config.packager.appBundleId,
  dir: path.join(__dirname, '../'),
  icon: path.join(__dirname, './icon/favicon.ico'),
  ignore: /(^\/(src$|test$|docs$|build|static$|log$|plugins$))|(^\/(dist\/asar$|dist\/pack$|dist\/test$|dist\/builder$|dist\/web$))|\.gitignore|\.idea|\.babelrc|package-lock.json|electron-builder.json|license.txt|README.md/i,
  out: path.join(__dirname, '../dist/pack'),
  overwrite: true,
  win32metadata: {
    FileDescription: pck.description,
    CompanyName: 'Ice Air'
  },
  appname: pck.productName,
  platform: process.env.PTF_TARGET || "all",
  arch: process.env.ARCH || ''
}