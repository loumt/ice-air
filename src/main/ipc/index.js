"use strict";
const assert = require('assert')
const IpcConstants = require('./IpcConstants')
const IpcClipboard = require('./libs/IpcClipboard')
const IpcWindow = require('./libs/IpcWindow')
const IpcTray = require('./libs/IpcTray')
const IpcOthers = require('./libs/IpcOthers')
const IpcMouse = require('./libs/IpcMouse')
const IpcUpdate = require('./libs/IpcUpdate')
const IpcConfig = require('./libs/IpcConfig')

/**
 * ipc消息注册
 * @param ipcMain  IpcMain对象
 * @param ipcHandler handler libs对象
 * @param Name IpcConstants ... Name 指令名
 * @param Method IpcConstants ... Method 指令对应Handler
 */
function inject(ipcMain,ipcHandler,[Name,Method]){
  assert(ipcMain,'Ipc: IpcMain should be null !')
  assert(ipcHandler,'Ipc: ipcHandler should be null !')
  assert(Name,'Ipc: IpcConstants > Name Prop should be null !')
  assert(Method,'Ipc: IpcConstants > Method Prop should be null !')
  assert(ipcHandler[Method],'Ipc: IpcHandler > Method Fun should be null !')
  assert(ipcHandler[Method](),'Ipc: IpcHandler > Method Fun Return should be null !')
  ipcMain.on(Name, ipcHandler[Method]())
}

module.exports = {
  //ipc-剪贴板
  'clipboard': ({ipcMain}) => {
    let ipcHandler = IpcClipboard.getInstance()
    for(let operation in IpcConstants.Instruction.ClipBoard){
      inject(ipcMain,ipcHandler,IpcConstants.Instruction.ClipBoard[operation])
    }
  },
  //ipc-窗口行为
  'window': ({ipcMain,mainWindow}) => {
    let ipcHandler = IpcWindow.getInstance(mainWindow)
    for(let operation in IpcConstants.Instruction.Window){
      inject(ipcMain,ipcHandler,IpcConstants.Instruction.Window[operation])
    }
  },
  'others':({ipcMain,mainWindow}) =>{
    let ipcHandler = IpcOthers.getInstance(mainWindow)
    for(let operation in IpcConstants.Instruction.Others){
      inject(ipcMain,ipcHandler,IpcConstants.Instruction.Others[operation])
    }
  },
  'tray':({ipcMain,tray})=>{
    let ipcHandler = IpcTray.getInstance(tray)
    for(let operation in IpcConstants.Instruction.Tray){
      inject(ipcMain,ipcHandler,IpcConstants.Instruction.Tray[operation])
    }
  },
  'mouse':({ipcMain})=>{
    let ipcHandler = IpcMouse.getInstance()
    for(let operation in IpcConstants.Instruction.Mouse){
      inject(ipcMain,ipcHandler,IpcConstants.Instruction.Mouse[operation])
    }
  },
  'update':({ipcMain,mainWindow})=>{
    let ipcHandler = IpcUpdate.getInstance(mainWindow)
    for(let operation in IpcConstants.Instruction.Update){
      inject(ipcMain,ipcHandler,IpcConstants.Instruction.Update[operation])
    }
  },
  'config':({ipcMain,mainWindow})=>{
    let ipcHandler = IpcConfig.getInstance(mainWindow)
    for(let operation in IpcConstants.Instruction.Config){
      inject(ipcMain,ipcHandler,IpcConstants.Instruction.Config[operation])
    }
  }
}