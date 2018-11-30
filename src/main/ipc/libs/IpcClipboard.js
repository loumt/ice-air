"use strict"

import IpcBase from './IpcBase'
import {clipboard} from 'electron'

/**
 * Ipc > Clipboard  剪贴板
 * main中AppWindow对象
 */
export default class IpcClipboard extends IpcBase{
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