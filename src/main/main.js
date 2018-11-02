'use strict'
const {app, ipcMain, Menu} = require('electron')
const MainWindow = require('./windows/MainWindow')
const WindowConstant = require('./constants/WindowConstant')
const Tray = require('./windows/Tray')
const MenuTool = require('./tools/MenuTool')
const ConfigTool = require('./tools/ConfigTool')
const defaultConfig = require('./defaultConfig')
const UpdateHandler = require('./update/UpdateHandler')
const ipc = require('./ipc')

class AppWindow {
  constructor() {
    this.app = app
    this.ipcMain = ipcMain
    this.mainWindow = null
    this.tray = null
  }

  init() {
    this.initApp()
  }

  initApp() {
    this.app.on('ready', () => {
      this.initMainWindow()
      this.initTray()
      this.initMenu()
      this.initConfig()
      this.initTask()
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
    ipc.mouse(this)
  }

  initTray() {
    this.tray = new Tray(this)
  }

  initMainWindow() {
    this.mainWindow = new MainWindow()
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
    ConfigTool.init(defaultConfig)
  }

  initTask() {
    //Task1:自动更新
    // this.update()
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
