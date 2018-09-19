"use strict"

const IpcBase = require('./IpcBase')
/**
 * Ipc > Clipboard  窗口
 * main中AppWindow对象
 */
class IpcWindow extends IpcBase{
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
        case 'close':
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

  getLoginState(){
    return (e)=>{
      e.returnValue = this.mainWindow.getLoginState()
    }
  }

  login(){
    return  (e, state) => {
      this.mainWindow.updateLoginState(state || true)
    }
  }

  static getInstance(mainWindow) {
    return new IpcWindow(mainWindow)
  }
}

module.exports = IpcWindow;