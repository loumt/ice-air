'use strict'
import {app, ipcMain, Menu,session} from 'electron'
import MainWindow from './windows/MainWindow'
import WindowConstant from './constants/WindowConstant'
import Tray from './windows/Tray'
import MenuTool from './tools/MenuTool'
import ConfigTool from'./tools/ConfigTool'
import UpdateHandler from './update/UpdateHandler'
import ipc from'./ipc'

//单应用
const gotTheLock = app.requestSingleInstanceLock()

class AppWindow {
  constructor() {
    this.app = app
    this.ipcMain = ipcMain

    //windows
    this.mainWindow = null
    this.tray = null
  }

  init() {
    if (gotTheLock) {
      app.on('second-instance',(event,commandLine,workingDirectory)=>{
        if(this.mainWindow){
          if (this.mainWindow.isMinimized()){
            this.mainWindow.restore()
          }
          this.mainWindow.showInactive()
        }
      })

      this.initApp()
    }else{
      app.quit()
    }
  }

  initApp() {
    this.app.on('ready', () => {
      this.initMainWindow()
      this.initTray()
      this.initMenu()
      this.initConfig()
      this.initIPC()
    });

    this.app.on('activate', () => {
      if (this.mainWindow == null) {
        this.initMainWindow()
      } else {
        this.mainWindow.show()
      }
    });

    this.app.on('window-all-closed', () => {
      if (this.tray) {
        this.tray.destroy()
      }
      this.app.quit()
    })

    this.app.on('will-quit', () => {
      console.log(`app will quit!`)
    })
  };


  initIPC() {
    ipc.window(this)
    ipc.tray(this)
    ipc.others(this)
    ipc.clipboard(this)
    ipc.update(this)
    ipc.config(this)
    ipc.system(this)
    ipc.localRdp(this)

    ipcMain.on('minmize',(e,state)=>{
      if(state){
        this.mainWindow.getMainWindow().minimize()
      }
    })
    ipcMain.on('maxmize',(e,state)=>{
      if(state){
        this.mainWindow.getMainWindow().maximize()
      }else{
        this.mainWindow.getMainWindow().unmaximize()
      }
    })
    ipcMain.on('fullscreen',(e,state)=>{
      this.mainWindow.getMainWindow().setFullScreen(state)
    })

    ipcMain.on('size',(e,options)=>{
      this.mainWindow.getMainWindow().setSize(Number(options['width']),Number(options['height']))
    })
  }

  initTray() {
    this.tray = new Tray(this)
  }

  initMainWindow() {
    this.mainWindow = new MainWindow()
    this.mainWindow.on('logout',data => {
    })
  }

  initMenu() {
    if (WindowConstant.HIDE_MENU) {
      Menu.setApplicationMenu(null)
    } else {
      let menu = new MenuTool(MenuTool.Type.WINDOW, MenuTool.Type.EDIT).fork()
      app.setApplicationMenu(menu)
    }
  }

  initConfig() {
    let configFile = ConfigTool.getConfigFile()
    ConfigTool.init(configFile)
  }

  /**
   * 更新
   */
  update() {
    let updater = new UpdateHandler()
    updater.on('update-deny', () => {
      this.mainWindow.send('update-deny')
    })
    updater.on('update-file-end', () => {
      this.mainWindow.send('update-progress', updater.getUpdatePercent())
    })
    updater.on('update-success', () => {
      this.mainWindow.send('update-success')
    })
    updater.on('update-error', () => {
      this.mainWindow.send('update-error')
    })
    updater.update();
  }
}

new AppWindow().init();
