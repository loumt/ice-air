const path = require('path')
const pck = require('./../../package.json')

module.exports = {
    "asar": false,
    "app-version":pck.version,
    "build-version":pck.version,
    "app-bundle-id":"fsb234e-a312-124d-5d2s-xc21gs42dsd1",
    dir: path.join(__dirname, '../../'),
    icon: path.join(__dirname, './logo.ico'),
    ignore: /(^\/(tpl$|src$|test$|docs$|build$|log$|implant$))|(^\/(dist\/asar$|dist\/pack$|dist\/test$))|\.gitignore|\.idea|\.babelrc|package-lock.json|README.md/i,
    out: path.join(__dirname, '../../dist/pack'),
    overwrite: true,
    win32metadata:{
        FileDescription:pck.description,
        CompanyName:'ThisCompanyForCloudApp'
    },
    appname: 'ca-clt',
    platform: process.env.PTF_TARGET || "all",
    arch:process.env.ARCH || ''
}