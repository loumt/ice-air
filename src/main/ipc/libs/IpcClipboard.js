"use strict"

const IpcBase = require('./IpcBase')
const {clipboard} = require('electron')

/**
 * Ipc > Clipboard  剪贴板
 * main中AppWindow对象
 */
class IpcClipboard extends IpcBase{
  constructor() {
    super()
  }

  getClipboard() {
    return (e) => {
      e.returnValue = clipboard.readText()
    }
  }

  setClipboard() {
    return (e, content) => {
      clipboard.writeText(content)
    }
  }

  static getInstance() {
    return new IpcClipboard()
  }
}

module.exports = IpcClipboard;