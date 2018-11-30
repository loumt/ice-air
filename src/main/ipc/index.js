"use strict";
import assert from 'assert'
import IpcConstants from './IpcConstants'
import IpcClipboard from './libs/IpcClipboard'
import IpcWindow from './libs/IpcWindow'
import IpcTray from './libs/IpcTray'
import IpcOthers from './libs/IpcOthers'
import IpcUpdate from './libs/IpcUpdate'
import IpcConfig from './libs/IpcConfig'
import IpcSystem from './libs/IpcSystem'
import IpcLocalRDP from './libs/IpcLocalRDP'

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

export default {
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
  'update':({ipcMain,mainWindow})=>{
    let ipcHandler = IpcUpdate.getInstance(mainWindow)
    for(let operation in IpcConstants.Instruction.Update){
      inject(ipcMain,ipcHandler,IpcConstants.Instruction.Update[operation])
    }
  },
  'config':({ipcMain,mainWindow,tray})=>{
    let ipcHandler = IpcConfig.getInstance(mainWindow,tray)
    for(let operation in IpcConstants.Instruction.Config){
      inject(ipcMain,ipcHandler,IpcConstants.Instruction.Config[operation])
    }
  },
  'system': ({ipcMain,mainWindow,app})=>{
    let ipcHandler = IpcSystem.getInstance(app,mainWindow)
    for(let operation in IpcConstants.Instruction.System){
      inject(ipcMain,ipcHandler,IpcConstants.Instruction.System[operation])
    }
  },
  'localRdp':({ipcMain,mainWindow})=>{
    let ipcHandler = IpcLocalRDP.getInstance(mainWindow)
    for(let operation in IpcConstants.Instruction.LocalRdp){
      inject(ipcMain,ipcHandler,IpcConstants.Instruction.LocalRdp[operation])
    }
  }
}