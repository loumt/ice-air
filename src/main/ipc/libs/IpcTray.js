"use strict"

import IpcBase from './IpcBase'

/**
 * Ipc > Tray 托盘相关
 * main中AppWindow对象
 */
export default class IpcTray extends IpcBase{
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

  notification(){
    return (e,options)=>{
      this.tray.displayBalloon(options)
    }
  }


  static getInstance(tray) {
    return new IpcTray(tray)
  }
}
