const path = require('path')
const {version, description,appId} = require('./../../package.json')

module.exports = {
  "asar": false,
  "app-version": version,
  "build-version": version,
  "app-bundle-id": appId,
  dir: path.join(__dirname, '../../'),
  icon: path.join(__dirname, './logo.ico'),
  ignore: /(^\/(src$|test$|docs$|build$|log$))|(^\/(dist\/asar$|dist\/pack$|dist\/test$))|\.gitignore|\.idea|\.babelrc|package-lock.json|README.md/i,
  out: path.join(__dirname, '../../dist/pack'),
  overwrite: true,
  win32metadata: {
    FileDescription: description,
    CompanyName: 'LouMT'
  },
  appname: 'ice-air',
  platform: process.env.PTF_TARGET || "all",
  arch: process.env.ARCH || ''
}