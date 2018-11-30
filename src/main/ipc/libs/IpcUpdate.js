"use strict"

import IpcBase from './IpcBase'
import UpdateHandler from './../../update/UpdateHandler'
import ExtendTool from './../../tools/ExtendTool'

/**
 * Ipc > Update 更新相关
 * main中AppWindow对象
 */
export default class IpcUpdate extends IpcBase{
  constructor(mainWindow) {
    super({mainWindow})
  }


  getVersionInfo() {
    return async (e)=>{
      let [error, result] = await ExtendTool.to(UpdateHandler.getVersionInfo());
      if (error) {
        return e.returnValue = {error: error}
      }
      e.returnValue = {versionInfo: result}
    }
  }

  update(){
    return ()=>{
      let updater = new UpdateHandler()
      updater.on('update-deny', () => {
        this.mainWindow.send('update-deny')
      }).on('update-file-end', () => {
        this.mainWindow.send('update-progress', updater.getUpdatePercent())
      }).on('update-success', () => {
        this.mainWindow.send('update-success')
      }).on('update-error', (args) => {
        this.mainWindow.send('update-error',args)
      })
      updater.update();
    }
  }

  updateBackend(){
    return ()=>{
      let updater = new UpdateHandler()
      updater.restore(true)
    }
  }


  static getInstance(mainWindow) {
    return new IpcUpdate(mainWindow)
  }
}
