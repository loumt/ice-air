"use strict";

const fs = require('fs')
const {app} = require('electron')
const path = require('path')

/**
 * env settings
 */
const mixConfig = require('./constants/ApplicationConstant').CONFIG_FILE
let location = {
  exe: path.dirname(app.getPath('exe')),
  DEV_TOOL: 0
}
try {
  let configFile = path.join(location.exe, mixConfig)
  if (fs.existsSync(configFile)){
    let configContent = fs.readFileSync(configFile)
    let configObject = JSON.parse(configContent.toString())
    Object.assign(location,configObject)
  }
}catch(err){
}
module.exports = location

