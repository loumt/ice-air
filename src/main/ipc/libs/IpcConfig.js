"use strict"

import IpcBase from './IpcBase'
import ConfigTool from './../../tools/ConfigTool'
/**
 * Ipc > Config 配置文件相关
 * main中AppWindow对象
 */
export default class IpcConfig extends IpcBase{
  constructor(mainWindow,tray) {
    super({mainWindow,tray})
  }

  getConfig(){
    return (e, params) => {
      e.returnValue = ConfigTool.get(params)
    }
  }

  setConfig(){
    return (e, params) => {
      ConfigTool.save(params['key'],params['value'])
      this.mainWindow.send('config-changed')
    }
  }

  saveConfig(){
    return (e, params) => {
      ConfigTool.setAll(params)
      this.mainWindow.send('config-changed')
    }
  }

  setLanguage(){
    return (e,lang)=>{
      ConfigTool.save(ConfigTool.KEY_CUSTOMER_APP_LANGUAGE,lang)
      this.tray.updateTray(lang)
    }
  }

  getLanguage(){
    return (e)=>{
      e.returnValue =  ConfigTool.get(ConfigTool.KEY_CUSTOMER_APP_LANGUAGE) || 'zh-CN'
    }
  }


  static getInstance(mainWindow,tray) {
    return new IpcConfig(mainWindow,tray)
  }
}
