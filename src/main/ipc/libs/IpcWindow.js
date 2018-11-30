"use strict"

import IpcBase from './IpcBase'
/**
 * Ipc > Clipboard  窗口
 * main中AppWindow对象
 */
export default class IpcWindow extends IpcBase{
  constructor(mainWindow) {
    super({mainWindow})
  }

  operation(){
    return (event, type)=>{
      switch (type) {
        case 'hide':
          this.mainWindow.min()
          break
        case 'max-min':
          this.mainWindow.maxOrNot()
          break
        case 'max':
          this.mainWindow.max()
          break;
        case 'min':
          this.mainWindow.min()
          break;
        case 'close':
          console.log('close')
          this.mainWindow.close()
          break
        default:
      }
    }
  }

  setFullScreen(){
    return  () => {
      this.mainWindow.setFullScreen(!this.mainWindow.getFullScreen())
    }
  }


  showWindow(){
    return ()=>{
      this.mainWindow.show()
    }
  }

  restore(){
    return ()=>{
      this.mainWindow.restore()
    }
  }

  reload(){
    return ()=>{
      this.mainWindow.reload()
    }
  }

  getLoginState(){
    return (e)=>{
      e.returnValue = this.mainWindow.getLoginState()
    }
  }

  login(){
    return  (e, state) => {
      this.mainWindow.updateLoginState(state)
    }
  }

  static getInstance(mainWindow) {
    return new IpcWindow(mainWindow)
  }
}
