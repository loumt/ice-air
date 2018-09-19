"use strict"

const IpcBase = require('./IpcBase')
const UpdateHandler = require('./../../update/UpdateHandler')

/**
 * Ipc > Update 更新相关
 * main中AppWindow对象
 */
class IpcUpdate extends IpcBase{
  constructor(mainWindow) {
    super({mainWindow})
  }

  update(){
    return ()=>{
      let updater = new UpdateHandler()
      updater.on('update-deny', () => {
        this.mainWindow.send('update-deny')
      })
      updater.on('update-file-end', () => {
        this.mainWindow.send('update-progress', updater.getUpdatePercent())
      })
      updater.on('update-success', () => {
        this.mainWindow.send('update-success')
      })
      updater.on('update-error', () => {
        this.mainWindow.send('update-error')
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

module.exports = IpcUpdate;