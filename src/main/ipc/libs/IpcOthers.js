"use strict"

import IpcBase from './IpcBase'
import {BrowserWindow} from 'electron'
import ConnectionPool from './../../connections/ConnectionPool'
import MenuItemTool from './../../tools/MenuItemTool'
import pck from './../../../../package.json'

/**
 * Ipc > Other 其他
 * main中AppWindow对象
 */
export default class IpcOthers extends IpcBase {
  constructor(mainWindow) {
    super({mainWindow})
  }

  console() {
    return (e, content) => {
      console.log(content)
    }
  }

  allowLogout() {
    return (e) => {
      e.returnValue = !ConnectionPool.isHasActive()
    }
  }


  rightClickMenu() {
    return () => {
      let menu = new MenuItemTool(MenuItemTool.Type.ELECTRON).fork()
      menu.popup(BrowserWindow.getFocusedWindow())
    }
  }

  getClientVersion() {
    return (e) => {
      e.returnValue = pck.version
      // this.mainWindow.send('send-client-version', pck.version)
    }
  }

  static getInstance(mainWindow) {
    return new IpcOthers(mainWindow)
  }
}
