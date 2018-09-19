"use strict"

const IpcBase = require('./IpcBase')
const MouseTool = require('./../../tools/MouseTool')

/**
 * Ipc > Mouse 鼠标动作相关
 * main中AppWindow对象
 */
class IpcMouse extends IpcBase{
  constructor() {
    super()
  }

  mousePosition(){
    return (e) => {
      let position = {
        x: MouseTool.X,
        y: MouseTool.Y
      }
      e.returnValue = position
    }
  }


  static getInstance() {
    return new IpcMouse()
  }
}

module.exports = IpcMouse;