"use strict"

const IpcBase = require('./IpcBase')
const ConfigTool = require('./../../tools/ConfigTool')

/**
 * Ipc > Config 配置文件相关
 * main中AppWindow对象
 */
class IpcConfig extends IpcBase{
  constructor(mainWindow) {
    super({mainWindow})
  }

  getConfig(){
    return (e, params) => {
      e.returnValue = ConfigTool.get(params)
    }
  }

  setConfig(){
    return (e, params) => {
      ConfigTool.setAll(params)
      this.mainWindow.send('config-changed')
    }
  }


  static getInstance(mainWindow) {
    return new IpcConfig(mainWindow)
  }
}

module.exports = IpcConfig;