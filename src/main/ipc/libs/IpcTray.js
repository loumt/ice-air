"use strict"

const IpcBase = require('./IpcBase')

/**
 * Ipc > Tray 托盘相关
 * main中AppWindow对象
 */
class IpcTray extends IpcBase{
  constructor(tray) {
    super({tray})
  }

  messageState(){
    return (e)=>{
      e.returnValue = this.tray.getMessageState()
    }
  }

  flashState(){
    return (e)=>{
      e.returnValue = this.tray.getFlashingState()
    }
  }

  receiveMessage(){
    return (e)=>{
      this.tray.initMessageNotify()
    }
  }


  static getInstance(tray) {
    return new IpcTray(tray)
  }
}

module.exports = IpcTray;